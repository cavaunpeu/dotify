import unittest

import pandas as pd

from dotify.models import SongVector, CountryVector


class TestLatentVectors(unittest.TestCase):

    def query(self, model):
        if model == SongVector:
            return MockSongVectors
        if model == CountryVector:
            return MockCountryVectors

class TestLatentVectors(unittest.TestCase):

    def test_correct_song_vectors_returned(self):
        pass

    def test_correct_country_vectors_returned(self):
        pass
