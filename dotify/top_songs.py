from datetime import datetime
import os
import requests

import pandas as pd
from sqlalchemy import exists

from .database import session
from .models import Country, Song, TopSong
from .resources.countries import countries


class DailyChart:

    BASE_URL = 'https://spotifycharts.com/api/?download=true&limit=200&country={}&recurrence=weekly&date=latest&type=regional'
    BASE_LOCAL_PATH = os.path.join(os.path.dirname(__file__), '..', 'tmp', '{}_{}.csv')

    def __init__(self, country_name):
        self.country_name = country_name
        self.country_abbrev = countries[country_name]['abbrev']
        self.current_datetime = datetime.now()
        self.local_path = self._generate_local_path()
        self.response = self._request_daily_chart()
        self.dataframe = self._response_to_dataframe()

    def _generate_local_path(self):
        datetime_string = self.current_datetime.strftime('%Y%m%d%H%M')
        return self.BASE_LOCAL_PATH.format(datetime_string, self.country_abbrev)

    def _request_daily_chart(self):
        daily_chart_url = self.BASE_URL.format(self.country_abbrev)
        return requests.get(daily_chart_url)

    def _response_to_local_csv(self):
        open(self.local_path, 'w').write(self.response.text)

    def _response_to_dataframe(self):
        self._response_to_local_csv()
        dataframe = pd.read_csv(self.local_path, index_col='Position')
        os.remove(self.local_path)
        return dataframe

    def __iter__(self):
        for rank, song in self.dataframe.iterrows():
            yield rank, Song(title=song['Track Name'], artist=song['Artist'])


class TopSongsGenerator:

    def __init__(self, country_name):
        self.daily_chart = DailyChart(country_name)

    @staticmethod
    def _song_exists(song):
        return session.query(exists()\
                .where(Song.title==song.title)\
                .where(Song.artist==song.artist)
        ).scalar()

    @staticmethod
    def _insert_song(song):
        session.add(song)
        session.commit()

    def __iter__(self):
        for rank, song in self.daily_chart:
            if not self._song_exists(song):
                self._insert_song(song)
            yield TopSong(
                song_id=int(session.query(Song.id).filter(Song.title == song.title, Song.artist == song.artist).scalar()),
                country_id=int(session.query(Country.id).filter(Country.name == self.daily_chart.country_name).scalar()),
                rank=int(rank),
                date=self.daily_chart.current_datetime.date()
            )
