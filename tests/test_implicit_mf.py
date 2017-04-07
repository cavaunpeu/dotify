import unittest

import pandas as pd
from pandas.util.testing import assert_frame_equal

from dotify.recommendation.implicit_mf.implicit_mf import ImplicitMF


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
        implicit_mf = ImplicitMF(ratings_matrix=DummyRatingsMatrix(), f=self.LATENT_FEATURES, alpha=self.ALPHA, lmbda=self.LAMBDA, n_iterations=self.N_ITERATIONS)
        implicit_mf.run()

        assert_frame_equal(implicit_mf.country_vectors.vectors, self.EXPECTED_COUNTRY_VECTORS)

    def test_implicit_mf_return_correct_song_vectors(self):
        implicit_mf = ImplicitMF(ratings_matrix=DummyRatingsMatrix(), f=self.LATENT_FEATURES, alpha=self.ALPHA, lmbda=self.LAMBDA, n_iterations=self.N_ITERATIONS)
        implicit_mf.run()

        assert_frame_equal(implicit_mf.song_vectors.vectors, self.EXPECTED_SONG_VECTORS)
