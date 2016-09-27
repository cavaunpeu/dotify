import os

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager

from dotify import app
from dotify.database import Base, session
from dotify.models import Country, Operator, CountryVector, SongVector
from dotify.resources.countries import countries
from dotify.resources.operators import OPERATORS
from dotify.top_songs import TopSongsGenerator
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


@manager.command
def insert_top_songs():
    for country_name in countries.keys():
        top_songs_generator = TopSongsGenerator(country_name)

        if not top_songs_generator.daily_chart.dataframe.empty:
            for top_song in top_songs_generator:
                session.add(top_song)

    session.commit()


@manager.command
def compute_latent_vectors():
    implicit_mf = ImplicitMF(ratings_matrix=RatingsMatrix(), f=F, alpha=ALPHA, lmbda=LAMBDA)
    ImplicitMFPipeline(implicit_mf).run()


class DB:
    def __init__(self, metadata):
        self.metadata = metadata


migrate = Migrate(app, DB(Base.metadata))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
