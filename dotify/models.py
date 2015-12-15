from datetime import datetime
import requests
import os

import pandas as pd
import sqlalchemy as sa
from sqlalchemy import ForeignKeyConstraint
from sqlalchemy.orm import relationship

from .database import Base, engine
from .resources.countries import countries


class Country(Base):
    __tablename__ = 'countries'

    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(255), nullable=False)


class Song(Base):
    __tablename__ = 'songs'

    id = sa.Column(sa.Integer(), primary_key=True)
    title = sa.Column(sa.String(255))
    artist = sa.Column(sa.String(255))


class TopSong(Base):
    __tablename__ = 'top_songs'

    song_id = sa.Column(sa.Integer(), primary_key=True)
    country_id = sa.Column(sa.Integer(), primary_key=True)
    rank = sa.Column(sa.Integer(), primary_key=True)
    date = sa.Column(sa.DateTime(), primary_key=True)
    ForeignKeyConstraint(['song_id', 'country_id'], ['countries.id', 'songs.id'])


class DailyChart:

    BASE_URL = 'https://spotifycharts.com/api/?download=true&limit=200&country={}&recurrence=weekly&date=latest&type=regional'
    BASE_LOCAL_PATH = os.path.join(os.path.dirname(__file__), 'tmp', '{}_{}.csv')

    def __init__(self, country_name):
        country_abbrev = countries[country_name]['abbrev']
        datetime_string = datetime.now().strftime('%Y%m%d%H%M')
        daily_chart_url = self.BASE_URL.format(country_abbrev)
        self.local_path = self.BASE_LOCAL_PATH.format(datetime_string, country_abbrev)
        self.response = requests.get(daily_chart_url)
        self.dataframe = self._response_to_dataframe()

    def _response_to_dataframe(self):
        self._response_to_local_csv()
        dataframe = pd.read_csv(self.local_path, index_col='Position')
        os.remove(self.local_path)
        return dataframe

    def _response_to_local_csv(self):
        open(self.local_path, 'w').write(self.response.text)


Base.metadata.create_all(engine)
