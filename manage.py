import os

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager

from dotify import app
from dotify.database import Base, session
from dotify.models import Country, Song, DailyChart, TopSong
from dotify.resources.countries import countries


manager = Manager(app)


@manager.command
def run():
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)


@manager.command
def insert_countries():
    for country_name in countries.keys():
        country = Country(
            id=countries[country_name]['id'],
            name=country_name
        )
        session.add(country)
    session.commit()


@manager.command
def insert_top_songs():
    for country_name in countries.keys():
        daily_chart = DailyChart(country_name)
        for top_song in daily_chart.dataframe.iterrows():
            song_title, song_artist = top_song[1]['Track Name'], top_song[1]['Artist']
            song = session.query(Song).filter_by(title=song_title, artist=song_artist).first()
            if not song:
                song = Song(title=song_title, artist=song_artist)
                session.add(song)
    session.commit()


class DB:
    def __init__(self, metadata):
        self.metadata = metadata


migrate = Migrate(app, DB(Base.metadata))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
