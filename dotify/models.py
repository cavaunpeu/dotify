import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from .database import Base, engine


class Country(Base):
    __tablename__ = 'countries'

    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(255), nullable=False)


class Song(Base):
    __tablename__ = 'songs'

    id = sa.Column(sa.Integer(), primary_key=True)
    title = sa.Column(sa.String(255))
    artist = sa.Column(sa.String(255))


Base.metadata.create_all(engine)
