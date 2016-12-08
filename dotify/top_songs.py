from datetime import datetime
import logging
import os
import requests

import pandas as pd
from sqlalchemy import exists

from .database import session
from .models import Country, Song, TopSong
from .resources.countries import countries


LOG_FILE = os.path.join(os.path.dirname(__file__), '..', 'log', 'top_songs.log')


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.FileHandler(LOG_FILE)
logger.addHandler(handler)


class DailyChart:

    BASE_URL = 'https://spotifycharts.com/regional/{}/daily'
    BASE_LOCAL_PATH = os.path.join(os.path.dirname(__file__), '..', 'tmp', '{}_{}.csv')

    def __init__(self, country_name, date=None):
        self.date = date
        self.country_name = country_name
        self.country_abbrev = countries[country_name]['abbrev']
        self.current_datetime = datetime.now()
        self.download_url = self._generate_download_url()
        self.local_path = self._generate_local_path()

    def download(self):
        self.response = requests.get(self.download_url)
        self.dataframe = self._response_to_dataframe() if self._valid_response else pd.DataFrame()

    def _generate_download_url(self):
        return os.path.join(
            self.BASE_URL.format(self.country_abbrev),
            self.date if self.date else 'latest',
            'download'
        )

    def _generate_local_path(self):
        datetime_string = self.current_datetime.strftime('%Y%m%d%H%M')
        return self.BASE_LOCAL_PATH.format(datetime_string, self.country_abbrev)

    def _response_to_local_csv(self):
        open(self.local_path, 'w').write(self.response.text)

    def _response_to_dataframe(self):
        self._response_to_local_csv()
        dataframe = pd.read_csv(self.local_path, index_col='Position')
        dataframe.dropna(inplace=True)
        os.remove(self.local_path)
        return dataframe

    @property
    def _valid_response(self):
        return self.response.status_code == 200 and \
            self.response.headers['Content-Type'] == 'text/csv;charset=UTF-8'

    def __iter__(self):
        for rank, song in self.dataframe.iterrows():
            yield (rank, song['Streams']), Song(title=song['Track Name'], artist=song['Artist'], url=song['URL'])


class TopSongsGenerator:

    def __init__(self, country_name, date=None):
        self.date = date
        self.daily_chart = DailyChart(country_name=country_name, date=date)
        self.daily_chart.download()

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
        for (rank, streams), song in self.daily_chart:
            if not self._song_exists(song):
                self._insert_song(song)
            yield TopSong(
                song_id=int(session.query(Song.id).filter(Song.title == song.title, Song.artist == song.artist).scalar()),
                country_id=int(session.query(Country.id).filter(Country.name == self.daily_chart.country_name).scalar()),
                rank=int(rank),
                streams=int(streams),
                date=self.date or self.daily_chart.current_datetime.date()
            )
