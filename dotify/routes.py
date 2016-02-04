import os

from flask import jsonify, request, render_template

from dotify import app
from dotify.database import session
from dotify.models import Country


@app.route('/', methods=['GET'])
def main():
    return render_template('index.html')


@app.route('/countries', methods=['GET'])
def get_countries():
    countries = [{'name': country.name} for country in session.query(Country)]
    return jsonify({'countries': countries}), 200


@app.route('/songs', methods=['POST'])
def get_songs():
    print(request.get_json())
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
    