import unittest

import pandas as pd
from pandas.util.testing import assert_frame_equal

from dotify.recommendation.implicit_mf.implicit_mf import ImplicitMF


class DummyRatingsMatrix:

    R_ui = pd.DataFrame(
        {
            1: {1: 1364973.0, 2: 314212.0, 3: 66063.0},
            2: {1: 711472.0,  2: 230473.0, 3: 46565.0},
            3: {1: 490783.0,  2: 299550.0, 3: 16729.0},
            4: {1: 214863.0,  2: 130691.0, 3: 0.0},
            5: {1: 0.0,       2: 0.0,      3: 0.0},
            6: {1: 1166051.0, 2: 286639.0, 3: 18594.0},
            7: {1: 0.0,       2: 0.0,      3: 0.0},
            8: {1: 0.0,       2: 206199.0, 3: 0.0}
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

    def test_implicit_mf_return_correct_country_vectors(self):
        implicit_mf = ImplicitMF(ratings_matrix=DummyRatingsMatrix(), f=self.LATENT_FEATURES, alpha=self.ALPHA, lmbda=self.LAMBDA, n_iterations=self.N_ITERATIONS)
        implicit_mf.run()

        assert_frame_equal(implicit_mf.country_vectors.vectors, self.EXPECTED_COUNTRY_VECTORS)
