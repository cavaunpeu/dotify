import os

from flask import jsonify, request, render_template

from dotify import app
from dotify.database import session
from dotify.latent_vectors import SONG_VECTOR_COLLECTION
from dotify.models import Country, Operator, Song, CountryVector, SongVector
from dotify.recommendation.song_generator import SongGenerator as RecommendedSongGenerator


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
    country_vector_objects = session.query(CountryVector).filter(CountryVector.country_id.in_(country_ids)).all()
    operator_objects = session.query(Operator).filter(Operator.id.in_(operator_ids)).all()

    recommended_songs_generator = RecommendedSongGenerator(
        country_vector_objects=country_vector_objects,
        operator_objects=operator_objects,
        song_vector_objects=SONG_VECTOR_COLLECTION.vector_objects
    )
    recommended_songs = [{'artist': artist, 'title': title, 'url': url} for title, artist, url in recommended_songs_generator]
    return jsonify({'songs': recommended_songs}), 200


@app.route('/refresh_song_vectors', methods=['POST'])
def refresh_song_vectors():
    SONG_VECTOR_COLLECTION.refresh()
    return jsonify(), 200
