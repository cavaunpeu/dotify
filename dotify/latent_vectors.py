from abc import ABCMeta, abstractmethod
from datetime import datetime

import pandas as pd

from dotify.database import session
from dotify.models import SongVector, CountryVector


class VectorCollection(metaclass=ABCMeta):

    REFRESH_WINDOW_IN_SECONDS = 16 * 3600
    DIMENSION_COLUMN_PREFIX = 'dim_'

    # TODO: move this into a __call__ method; as is, things
    # break when trying to reset our database
    def __init__(self):
        self._vector_objects = self._query_all_vectors()
        self._numeric_vectors = self._extract_numeric_vectors()
        self._reset_query_timestamp()

    def refresh(self):
        time_since_last_query = (datetime.now() - self._query_timestamp).total_seconds()
        if time_since_last_query > self.REFRESH_WINDOW_IN_SECONDS:
            self._vector_objects = self._query_all_vectors()
            self._reset_query_timestamp()

    @abstractmethod
    def _extract_numeric_vectors(self):
        pass

    def _reset_query_timestamp(self):
        self._query_timestamp = datetime.now()

    def _query_all_vectors(self):
        return session.query(self._model).all()

    def _extract_single_numeric_vector(self, vector_object):
        return [getattr(vector_object, dimension_name) for dimension_name in self._vector_dimension_names]

    @property
    def vector_objects(self):
        return self._vector_objects

    @property
    def numeric_vectors(self):
        return self._numeric_vectors

    @property
    def _number_of_vector_dimensions(self):
        return len([var for var in vars(self.vector_objects[0]) if var.startswith(self.DIMENSION_COLUMN_PREFIX)])

    @property
    def _vector_dimension_names(self):
        return ['dim_{}'.format(dim_index) for dim_index in range(self._number_of_vector_dimensions)]

    @property
    @abstractmethod
    def _model(self):
        pass


class SongVectorCollection(VectorCollection):

    @property
    def index(self):
        return [song_object.song_id for song_object in self.vector_objects]

    @property
    def _model(self):
        return SongVector

    def _extract_numeric_vectors(self):
        return [pd.Series(self._extract_single_numeric_vector(vector_object), name=vector_object.song_id, index=self._vector_dimension_names) for vector_object in self.vector_objects]


class CountryVectorCollection(VectorCollection):

    @property
    def _model(self):
        return CountryVector

    def _extract_numeric_vectors(self):
        return [pd.Series(self._extract_single_numeric_vector(vector_object), name=vector_object.country_id, index=self._vector_dimension_names) for vector_object in self.vector_objects]


SONG_VECTOR_COLLECTION = SongVectorCollection()
COUNTRY_VECTOR_COLLECTION = CountryVectorCollection()
