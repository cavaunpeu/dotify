import os

from flask import jsonify, request, render_template

from dotify import app
from dotify.database import session
from dotify.models import Country, Operator


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


@app.route('/songs', methods=['POST'])
def get_songs():
    operator_ids = request.get_json()['operator_ids']
    country_ids = request.get_json()['country_ids']
    return jsonify(
        {
            'songs': [
                {
                    'artist': 'J Alvarez',
                    'title': 'La Pregunta'
                }
            ]
        }
    ), 200
    