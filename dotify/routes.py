import os

from flask import jsonify, request, render_template

from dotify import app
from dotify.database import session
from dotify.models import Country, Operator, CountryVector, Song, SongVector
from dotify.recommendation.song_generator import SongGenerator as RecommendedSongGenerator


@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


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
    recommended_songs = [{'artist': artist, 'title': title, 'url': url} for title, artist, url in RecommendedSongGenerator(country_vector_objects, operator_objects)]
    return jsonify({'songs': recommended_songs}), 200
    