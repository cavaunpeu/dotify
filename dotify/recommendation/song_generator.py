import numpy as np
import pandas as pd

from dotify.database import session
from dotify.models import Song, SongVector
from dotify.resources.operators import OPERATORS


class SongGenerator:

    DIMENSION_COLUMN_PREFIX = 'dim_'
    NUM_SONGS_TO_RECOMMEND = 5

    def __init__(self, country_vector_objects, operator_objects, song_vector_objects):
        self.country_vector_objects = country_vector_objects
        self.operator_objects = operator_objects
        self.song_vector_objects = song_vector_objects
        self.country_vectors = self._extract_country_vectors()
        self.song_vectors = self._extract_song_vectors()

    def _compute_aggregate_vector(self):
        aggregate_vector = self.country_vectors.pop(0)
        for operator, vector in zip(self.operator_objects, self.country_vectors):
            aggregate_vector = OPERATORS[operator.id]['function'](aggregate_vector, vector)
        return aggregate_vector

    def _extract_country_vectors(self):
        return [pd.Series(self._extract_numeric_vector(vector_object), name=vector_object.country_id, index=self._vector_dimension_names) for vector_object in self.country_vector_objects]

    def _extract_song_vectors(self):
        return [pd.Series(self._extract_numeric_vector(vector_object), name=vector_object.song_id, index=self._vector_dimension_names) for vector_object in self.song_vector_objects]

    def _extract_numeric_vector(self, vector_object):
        return [getattr(vector_object, dimension_name) for dimension_name in self._vector_dimension_names]

    def __iter__(self):
        aggregate_vector = self._compute_aggregate_vector()
        predicted_preferences = pd.DataFrame(self.song_vectors).apply(lambda vec: np.dot(vec, aggregate_vector), axis=1)
        for song_id, vector in predicted_preferences.sort_values(ascending=False).head(self.NUM_SONGS_TO_RECOMMEND).iteritems():
            song = session.query(Song).filter(Song.id == int(song_id)).first()
            yield (song.title, song.artist, song.url)

    @property
    def _number_of_vector_dimensions(self):
        return len([var for var in vars(self.country_vector_objects[0]) if var.startswith(self.DIMENSION_COLUMN_PREFIX)])

    @property
    def _vector_dimension_names(self):
        return ['dim_{}'.format(dim_index) for dim_index in range(self._number_of_vector_dimensions)]
