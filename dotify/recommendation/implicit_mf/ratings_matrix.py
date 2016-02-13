import pandas as pd
from sqlalchemy.sql import func

from dotify.database import session
from dotify.models import TopSong


class RatingsMatrix:

    def __init__(self):
        self.R_ui = self._build_R_ui()

    def _build_R_ui(self):
        top_songs = session.query(
            TopSong.country_id,
            TopSong.song_id,
            (1. / func.sum(TopSong.rank)).label('normalized_rank')
        ).group_by(TopSong.country_id, TopSong.song_id).all()
        return pd.DataFrame(top_songs).pivot('country_id', 'song_id', 'normalized_rank').fillna(0)
