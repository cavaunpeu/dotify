import os

from flask import jsonify, request, render_template

from dotify import app
from dotify.database import session
from dotify.latent_vectors import SONG_VECTOR_COLLECTION, COUNTRY_VECTOR_COLLECTION
from dotify.models import Country, Operator, Song, CountryVector, SongVector
from dotify.recommendation.song_generator import SongGenerator as RecommendedSongGenerator


def filter_country_vectors(country_vectors, country_ids):
    country_vectors_dict = {vector.name: vector for vector in country_vectors}
    return [country_vectors_dict[country_id] for country_id in country_ids]


@app.route('/', methods=['GET'])
def main():
    return render_template('main.html')


@app.route('/info', methods=['GET'])
def info():
    return render_template('info.html')


@app.route('/countries', methods=['GET'])
def get_countries():
    countries = [{'id': country.id, 'name': country.name, 'value': country.value} for country in session.query(Country)]
    return jsonify({'countries': countries}), 200


@app.route('/operators', methods=['GET'])
def get_operators():
    operators = [{'id': operator.id, 'name': operator.name, 'value': operator.value} for operator in session.query(Operator)]
    return jsonify({'operators': operators}), 200


@app.route('/recommended_songs', methods=['POST'])
def get_recommended_songs():
    country_ids = request.get_json()['country_ids']
    operator_ids = request.get_json()['operator_ids']
    operator_objects = session.query(Operator).filter(Operator.id.in_(operator_ids)).all()
    country_vectors = filter_country_vectors(country_vectors=COUNTRY_VECTOR_COLLECTION.numeric_vectors, country_ids=country_ids)

    recommended_songs_generator = RecommendedSongGenerator(
        operator_objects=operator_objects,
        country_vectors=country_vectors,
        song_vectors=SONG_VECTOR_COLLECTION.numeric_vectors
    )
    recommended_songs = [{'artist': artist, 'title': title, 'url': url} for title, artist, url in recommended_songs_generator]
    return jsonify({'songs': recommended_songs}), 200


@app.route('/refresh_latent_vectors', methods=['POST'])
def refresh_latent_vectors():
    SONG_VECTOR_COLLECTION.refresh()
    COUNTRY_VECTOR_COLLECTION.refresh()
    return jsonify(), 200
