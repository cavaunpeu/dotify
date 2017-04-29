from dotify.database import session
from dotify.models import CountryVector, SongVector


class ImplicitMFPipeline:

    def __init__(self, implicit_mf):
        self.implicit_mf = implicit_mf

    def run(self):
        self.implicit_mf.run()
        self._insert_country_vectors()
        self._insert_song_vectors()

    def _insert_country_vectors(self):
        session.query(CountryVector).delete()
        for country_id, country_vector in self.implicit_mf.country_vectors.vectors.iterrows():
            session.add(CountryVector(country_id=int(country_id), **country_vector))
        session.commit()

    def _insert_song_vectors(self):
        session.query(SongVector).delete()
        for song_id, song_vector in self.implicit_mf.song_vectors.vectors.iterrows():
            session.add(SongVector(song_id=int(song_id), **song_vector))
        session.commit()
