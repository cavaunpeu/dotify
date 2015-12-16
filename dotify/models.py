from datetime import datetime
import requests
import os

import pandas as pd
import sqlalchemy as sa
from sqlalchemy import ForeignKeyConstraint
from sqlalchemy.orm import relationship

from .database import Base, engine
from .resources.countries import countries


class Country(Base):
    __tablename__ = 'countries'

    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(255), nullable=False)


class Song(Base):
    __tablename__ = 'songs'

    id = sa.Column(sa.Integer(), primary_key=True)
    title = sa.Column(sa.String(255))
    artist = sa.Column(sa.String(255))


class TopSong(Base):
    __tablename__ = 'top_songs'

    song_id = sa.Column(sa.Integer(), primary_key=True)
    country_id = sa.Column(sa.Integer(), primary_key=True)
    rank = sa.Column(sa.Integer(), primary_key=True)
    date = sa.Column(sa.DateTime(), primary_key=True)
    ForeignKeyConstraint(['song_id', 'country_id'], ['songs.id', 'country.id'])


Base.metadata.create_all(engine)

