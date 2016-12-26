from datetime import datetime

from dotify.database import session
from dotify.models import SongVector


class SongVectorsCollection:

    def __init__(self):
        self.vector_objects = session.query(SongVector).all()
        self._query_timestamp = datetime.now()
        self.count = 0

    def refresh(self):
        self.count += 1
        print(self.count)


SONG_VECTOR_COLLECTION = SongVectorsCollection()
