import unittest

import pandas as pd

from dotify.models import SongVector, CountryVector
from dotify.latent_vectors import SongVectorCollection, CountryVectorCollection, VectorCollection


class TestLatentVectors(unittest.TestCase):

    def test_song_vectors_collection_inherits_from_vector_collection(self):
        self.assertTrue(issubclass(SongVectorCollection, VectorCollection))

    def test_country_vectors_collection_inherits_from_vector_collection(self):
        self.assertTrue(issubclass(CountryVectorCollection, VectorCollection))

    def test_correct_song_vectors_returned(self):
        pass

    def test_correct_country_vectors_returned(self):
        pass
