from datetime import datetime, timedelta
import os

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Command, Manager, Option
from sqlalchemy import exists

from dotify import app
from dotify.database import Base, session
from dotify.models import Country, Operator, TopSong, CountryVector, SongVector
from dotify.resources.countries import countries
from dotify.resources.operators import OPERATORS
from dotify.top_songs import TopSongsGenerator, logger
from dotify.recommendation.implicit_mf.ratings_matrix import RatingsMatrix
from dotify.recommendation.implicit_mf.implicit_mf import ImplicitMF
from dotify.recommendation.implicit_mf.pipeline import Pipeline as ImplicitMFPipeline


manager = Manager(app)


F = 30
ALPHA = 10e0
LAMBDA = 25e1


@manager.command
def run():
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)


@manager.command
def insert_countries():
    for country_name in countries.keys():
        country = Country(
            id=countries[country_name]['id'],
            name=country_name,
            value=country_name
        )
        session.add(country)
    session.commit()


@manager.command
def insert_operators():
    for operator_id in OPERATORS.keys():
        operator = Operator(
            id=operator_id,
            name=OPERATORS[operator_id]['name'],
            value=OPERATORS[operator_id]['value']
        )
        session.add(operator)
    session.commit()


@manager.option('-d', '--start-date', help='Backfill to this date')
def backfill_top_songs(start_date):
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.now()
    current_date = start_date

    while current_date < end_date:
        InsertTopSongs().run(date=current_date)
        logger.info( current_date.strftime('%Y-%m-%d') + ' √' )
        current_date += timedelta(days=1)


@manager.command
def compute_latent_vectors():
    implicit_mf = ImplicitMF(ratings_matrix=RatingsMatrix(), f=F, alpha=ALPHA, lmbda=LAMBDA)
    ImplicitMFPipeline(implicit_mf).run()


class InsertTopSongs(Command):

    option_list = (
        Option('-d', '--date', help='If no date passed, today\'s date is used'),
    )

    def run(self, date):
        for country_name in countries.keys():
            top_songs_generator = TopSongsGenerator(country_name=country_name, date=date)
            if not top_songs_generator.daily_chart.dataframe.empty:

                for top_song in top_songs_generator:
                    if not self._top_song_exists(top_song):
                        session.add(top_song)

                session.commit()

    @staticmethod
    def _top_song_exists(top_song):
        return session.query(exists()\
            .where(TopSong.song_id==top_song.song_id)\
            .where(TopSong.country_id==top_song.country_id)\
            .where(TopSong.rank==top_song.rank)\
            .where(TopSong.streams==top_song.streams)\
            .where(TopSong.date==top_song.date)
        ).scalar()


manager.add_command('insert_top_songs', InsertTopSongs())


class DB:
    def __init__(self, metadata):
        self.metadata = metadata


migrate = Migrate(app, DB(Base.metadata))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
