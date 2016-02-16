from datetime import datetime
import requests
import os

import pandas as pd
import sqlalchemy as sa
from sqlalchemy import ForeignKey, ForeignKeyConstraint
from sqlalchemy.orm import relationship

from .database import Base, engine
from .resources.countries import countries


class Country(Base):
    __tablename__ = 'countries'

    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(255), nullable=False)
    value = sa.Column(sa.String(255), nullable=False)


class Operator(Base):
    __tablename__ = 'operators'

    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(255), nullable=False)
    value = sa.Column(sa.String(255), nullable=False)


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
    ForeignKeyConstraint(['song_id', 'country_id'], ['songs.id', 'countries.id'])


class CountryVector(Base):
    __tablename__ = 'country_vectors'

    country_id = sa.Column(sa.Integer(), ForeignKey('countries.id'), primary_key=True)
    dim_0  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_1  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_2  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_3  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_4  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_5  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_6  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_7  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_8  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_9  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_10 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_11 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_12 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_13 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_14 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_15 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_16 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_17 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_18 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_19 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_20 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_21 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_22 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_23 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_24 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_25 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_26 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_27 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_28 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_29 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))


class SongVector(Base):
    __tablename__ = 'song_vectors'

    song_id = sa.Column(sa.Integer(), ForeignKey('songs.id'), primary_key=True)
    dim_0  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_1  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_2  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_3  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_4  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_5  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_6  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_7  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_8  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_9  = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_10 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_11 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_12 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_13 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_14 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_15 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_16 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_17 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_18 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_19 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_20 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_21 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_22 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_23 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_24 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_25 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_26 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_27 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_28 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    dim_29 = sa.Column(sa.Float(precision=11, decimal_return_scale=10))
    ForeignKeyConstraint(['song_id'], ['song.id'])


Base.metadata.create_all(engine)

