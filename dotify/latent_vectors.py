from abc import ABCMeta, abstractmethod
from datetime import datetime

from dotify.database import session
from dotify.models import SongVector, CountryVector


class VectorCollection(metaclass=ABCMeta):

    REFRESH_WINDOW_IN_SECONDS = 16 * 3600

    def __init__(self):
        self._vector_objects = self._query_all_vectors()
        self._reset_query_timestamp()

    def refresh(self):
        time_since_last_query = (datetime.now() - self._query_timestamp).total_seconds()
        if time_since_last_query > self.REFRESH_WINDOW_IN_SECONDS:
            self._vector_objects = self._query_all_vectors()
            self._reset_query_timestamp()

    def _reset_query_timestamp(self):
        self._query_timestamp = datetime.now()

    def _query_all_vectors(self):
        return session.query(self.model).all()

    @property
    def vector_objects(self):
        return self._vector_objects

    @property
    @abstractmethod
    def model(self):
        pass


class SongVectorCollection(VectorCollection):

    @property
    def model(self):
        return SongVector


class CountryVectorCollection(VectorCollection):

    @property
    def model(self):
        return CountryVector


SONG_VECTOR_COLLECTION = SongVectorCollection()
COUNTRY_VECTOR_COLLECTION = CountryVectorCollection()
