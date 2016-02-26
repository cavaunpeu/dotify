import numpy as np

from .vectors import CountryVectors, SongVectors


class ImplicitMF:

    def __init__(self, ratings_matrix, f, alpha, lmbda, n_iterations=10):
        self.country_vectors = CountryVectors(ratings_matrix, f)
        self.song_vectors = SongVectors(ratings_matrix, f)
        self.P_ui = ratings_matrix.R_ui > 0
        self.C_ui = 1 + alpha*np.log(1 + ratings_matrix.R_ui)
        self.lmbda = lmbda
        self.n_iterations = n_iterations

    def run(self):
        for i in range(self.n_iterations):
            self._update_country_vectors()
            self._update_song_vectors()

    def _update_country_vectors(self):
        YtY = self._compute_ZtZ(self.song_vectors.vectors)
        for country in self.country_vectors.vectors.index:
            Cu = np.diag(self.C_ui.ix[country])
            Pu = self.P_ui.ix[country]
            YtCuY = self._compute_ZtCuZ(YtY, self.song_vectors.vectors, Cu)
            Xu = self._compute_updated_record(self.song_vectors.vectors, YtCuY, Cu, Pu)

            self.country_vectors.vectors.ix[country] = Xu

    def _update_song_vectors(self):
        XtX = self._compute_ZtZ(self.country_vectors.vectors)
        for song in self.song_vectors.vectors.index:
            Cu = np.diag(self.C_ui[song])
            Pu = self.P_ui[song]
            XtCuX = self._compute_ZtCuZ(XtX, self.country_vectors.vectors, Cu)
            Yu = self._compute_updated_record(self.country_vectors.vectors, XtCuX, Cu, Pu)

            self.song_vectors.vectors.ix[song] = Yu

    def _compute_ZtCuZ(self, ZtZ, vectors, Cu):
        I = self._compute_I(len(Cu))
        return ZtZ + np.dot(
            vectors.T,
            np.dot(Cu - I, vectors)
        )

    def _compute_updated_record(self, vectors, ZtCuZ, Cu, Pu):
        I = self._compute_I(len(ZtCuZ))
        return np.dot(
            np.dot(
                np.dot(
                    np.linalg.inv(ZtCuZ + self.lmbda*I), vectors.T
                ),
                Cu
            ),
            Pu
        )

    @staticmethod
    def _compute_ZtZ(vectors):
        return np.dot(vectors.T, vectors)

    @staticmethod
    def _compute_I(size):
        return np.eye(size)
