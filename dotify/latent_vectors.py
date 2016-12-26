from datetime import datetime

from dotify.database import session
from dotify.models import SongVector


class SongVectorsCollection:

    REFRESH_WINDOW_IN_SECONDS = 16 * 3600

    def __init__(self):
        self._vector_objects = self._query_song_vectors()
        self._reset_query_timestamp()

    def refresh(self):
        time_since_last_query = (datetime.now() - self._query_timestamp).total_seconds()
        if time_since_last_query > self.REFRESH_WINDOW_IN_SECONDS:
            self._vector_objects = self._query_song_vectors()
            self._reset_query_timestamp()

    def _reset_query_timestamp(self):
        self._query_timestamp = datetime.now()

    @staticmethod
    def _query_song_vectors():
        return session.query(SongVector).all()


SONG_VECTOR_COLLECTION = SongVectorsCollection()
