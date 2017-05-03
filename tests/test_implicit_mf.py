import unittest

import pandas as pd
from pandas.util.testing import assert_frame_equal

from dotify.database import session
from dotify.recommendation.implicit_mf.implicit_mf import ImplicitMF
from dotify.recommendation.implicit_mf.pipeline import ImplicitMFPipeline
from dotify.models import Song, SongVector, CountryVector
from dotify.latent_vectors import SongVectorCollection, CountryVectorCollection, VectorCollection


DUMMY_SONGS = pd.DataFrame({
    1: {'Track Name': 'skittles', 'Artist': 'reeses',  'URL': 'kitkat'},
    2: {'Track Name': 'pizza',    'Artist': 'pasta',   'URL': 'pepperoni'},
    3: {'Track Name': 'sashimi',  'Artist': 'unagi',   'URL': 'crab'},
    4: {'Track Name': 'morocco',  'Artist': 'algeria', 'URL': 'tunisia'},
    5: {'Track Name': 'cairo',    'Artist': 'beirut',  'URL': 'mosul'},
    6: {'Track Name': 'iphone',   'Artist': 'android', 'URL': 'windows'},
    7: {'Track Name': 'levis',    'Artist': 'buffalo', 'URL': 'no clue'},
    8: {'Track Name': 'nyc',      'Artist': 'sf',      'URL': 'la'},
}).T


class DummyRatingsMatrix:

    R_ui = pd.DataFrame(
        {
            1: {1: 14.126645938800742, 2: 12.657826378868172, 3: 11.098379248125871},
            2: {1: 13.475092747794811, 2: 12.347893336791996, 3: 10.748625940082194},
            3: {1: 13.103759391450506, 2: 12.610039965847344, 3: 9.7249587939808695},
            4: {1: 12.277760548820957, 2: 11.780598688863687, 3: 0.0},
            5: {1: 0.0, 2: 0.0, 3: 0.0},
            6: {1: 13.969134241810684, 2: 12.565982351978835, 3: 9.830648006359171},
            7: {1: 0.0, 2: 0.0, 3: 0.0},
            8: {1: 0.0, 2: 12.236601850564996, 3: 0.0}
        }
    )


class TestImplicitMF(unittest.TestCase):

    LATENT_FEATURES = 5
    LATENT_FEATURE_NAMES = ['dim_0', 'dim_1', 'dim_2', 'dim_3', 'dim_4']
    ALPHA = 10e0
    LAMBDA = 25e1
    N_ITERATIONS = 3

    EXPECTED_COUNTRY_VECTORS = pd.DataFrame(
        {
            'dim_0': {1: -0.098151211574858038, 2: -0.10074358591530883, 3: -0.075499954145285111},
            'dim_1': {1: 0.0090693670454986709, 2: 0.01051162624746879, 3: 0.0062395411761012529},
            'dim_2': {1: 0.22612085893073433, 2: 0.23579015413509541, 3: 0.17232631352855812},
            'dim_3': {1: -0.032034591486792829, 2: -0.03300589053126271, 3: -0.024964147874802271},
            'dim_4': {1: -0.77886329530171627, 2: -0.8050757157420847, 3: -0.59677397755144379}
        }
    )
    EXPECTED_SONG_VECTORS = pd.DataFrame(
        {
            'dim_0': {1: -0.073471489685433544, 2: -0.072131218749204196, 3: -0.070974800976172453, 4: -0.057686930532980102, 5: 0.0, 6: -0.071961912455110771, 7: 0.0, 8: -0.036630184849776329},
            'dim_1': {1: 0.0068812183124358625, 2: 0.0067599595521328475, 3: 0.0066812930564791647, 4: 0.0056697030783678312, 5: 0.0, 6: 0.0067667663651392136, 7: 0.0, 8: 0.0038244483293922819},
            'dim_2': {1: 0.16972801507589663, 2: 0.16664458704733526, 3: 0.16405191555318974, 4: 0.13394142510494544, 5: 0.0, 6: 0.16630879361318535, 7: 0.0, 8: 0.085739868376249473},
            'dim_3': {1: -0.024099409333460473, 2: -0.023660010131547761, 3: -0.023276261726736629, 4: -0.018862699440375851, 5: 0.0, 6: -0.023598085983679289, 7: 0.0, 8: -0.01200082839578122},
            'dim_4': {1: -0.58376113966498233, 2: -0.57313154359919505, 3: -0.56406141744385385, 4: -0.45935557494534784, 5: 0.0, 6: -0.57186826288808235, 7: 0.0, 8: -0.29273465622788053}
        }
    )

    def test_implicit_mf_return_correct_country_vectors(self):
        implicit_mf = ImplicitMF(
            ratings_matrix=DummyRatingsMatrix(), f=self.LATENT_FEATURES, alpha=self.ALPHA, lmbda=self.LAMBDA, n_iterations=self.N_ITERATIONS
        )
        implicit_mf.run()

        assert_frame_equal(implicit_mf.country_vectors.vectors, self.EXPECTED_COUNTRY_VECTORS)

    def test_implicit_mf_return_correct_song_vectors(self):
        implicit_mf = ImplicitMF(
            ratings_matrix=DummyRatingsMatrix(), f=self.LATENT_FEATURES, alpha=self.ALPHA, lmbda=self.LAMBDA, n_iterations=self.N_ITERATIONS
        )
        implicit_mf.run()

        assert_frame_equal(implicit_mf.song_vectors.vectors, self.EXPECTED_SONG_VECTORS)


class TestImplicitMFPipeline(unittest.TestCase):

    def _extract_single_numeric_vector(self, vector_object):
        return [getattr(vector_object, dimension_name) for dimension_name in TestImplicitMF.LATENT_FEATURE_NAMES]

    def _extract_numeric_vectors(self, vector_objects, id_col):
        return pd.DataFrame(
            data=[
                self._extract_single_numeric_vector(vector_object) for vector_object in vector_objects
            ],
            columns=TestImplicitMF.LATENT_FEATURE_NAMES,
            index=[getattr(vector_object, id_col) for vector_object in vector_objects]
        )

    def _setUp_songs(self):
        for song_id, song in DUMMY_SONGS.iterrows():
            session.add(
                Song(id=int(song_id), title=song['Track Name'], artist=song['Artist'], url=song['URL'])
            )
        session.commit()

    def setUp(self):
        self._setUp_songs()

    def tearDown(self):
        session.query(CountryVector).delete()
        session.query(SongVector).delete()
        session.query(Song).delete()
        session.commit()

    def test_implicit_mf_pipeline_inserts_correct_country_vectors(self):
        implicit_mf = ImplicitMF(
            ratings_matrix=DummyRatingsMatrix(),
            f=TestImplicitMF.LATENT_FEATURES,
            alpha=TestImplicitMF.ALPHA,
            lmbda=TestImplicitMF.LAMBDA,
            n_iterations=TestImplicitMF.N_ITERATIONS
        )
        pipeline = ImplicitMFPipeline(implicit_mf=implicit_mf)
        pipeline.run()

        country_vector_objects = session.query(CountryVector).all()
        actual_country_vectors = self._extract_numeric_vectors(
            vector_objects=country_vector_objects,
            id_col='country_id'
        )

        assert_frame_equal(actual_country_vectors, TestImplicitMF.EXPECTED_COUNTRY_VECTORS)


class TestLatentVectors(unittest.TestCase):

    def test_song_vectors_collection_inherits_from_vector_collection(self):
        self.assertTrue(issubclass(SongVectorCollection, SongVectorCollection))

    def test_country_vectors_collection_inherits_from_vector_collection(self):
        self.assertTrue(issubclass(CountryVectorCollection, VectorCollection))
