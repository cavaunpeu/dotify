import numpy as np
import pandas as pd

from dotify.database import session
from dotify.models import Song, SongVector
from dotify.resources.operators import OPERATORS


class SongGenerator:

    NUM_SONGS_TO_RECOMMEND = 5

    def __init__(self, operator_objects, country_vectors, song_vectors, song_vectors_index):
        self.operator_objects = operator_objects
        self.country_vectors = country_vectors
        self.song_vectors = song_vectors
        self.song_vectors_index = song_vectors_index

    def _compute_aggregate_vector(self):
        aggregate_vector = self.country_vectors.pop(0)
        for operator, vector in zip(self.operator_objects, self.country_vectors):
            aggregate_vector = OPERATORS[operator.id]['function'](aggregate_vector, vector)
        return aggregate_vector

    def _compute_predicted_preferences(self):
        aggregate_vector = self._compute_aggregate_vector()
        return pd.Series( np.array(self.song_vectors) @ np.array(aggregate_vector), index=self.song_vectors_index )

    def __iter__(self):
        predicted_preferences = self._compute_predicted_preferences()

        for song_id, vector in predicted_preferences.sort_values(ascending=False).head(self.NUM_SONGS_TO_RECOMMEND).iteritems():
            song = session.query(Song).filter(Song.id == int(song_id)).first()
            yield (song.title, song.artist, song.url)
