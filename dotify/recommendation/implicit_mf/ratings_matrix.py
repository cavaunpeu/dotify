import numpy as np
import pandas as pd
from sqlalchemy.sql import func, select

from dotify.database import session
from dotify.models import TopSong


class RatingsMatrix:

    def __init__(self, n_top_songs=1000000, eps=1):
        self.n_top_songs = n_top_songs
        self.eps = eps
        self.R_ui = self._build_R_ui()

    def _build_R_ui(self):
        top_songs_sorted = session.query(TopSong)\
            .order_by(TopSong.date.desc(), TopSong.song_id.desc())\
            .limit(self.n_top_songs)\
            .subquery('top_songs_sorted')

        top_songs = session.query(
            top_songs_sorted.c.country_id,
            top_songs_sorted.c.song_id,
            func.sum(top_songs_sorted.c.streams).label('total_streams'))\
        .group_by(top_songs_sorted.c.country_id, top_songs_sorted.c.song_id)\
        .all()

        from sklearn.preprocessing import MaxAbsScaler

        ratings_matrix = pd.DataFrame(top_songs).pivot(
            'country_id', 'song_id', 'total_streams').fillna(0).astype(float)
        # return np.log(1 + ratings_matrix / self.eps)
        return pd.DataFrame(
            data=MaxAbsScaler().fit_transform(ratings_matrix),
            index=ratings_matrix.index,
            columns=ratings_matrix.columns
        )
