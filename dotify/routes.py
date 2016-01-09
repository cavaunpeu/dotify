import os

from flask import jsonify, render_template

from dotify import app
from dotify.database import session
from dotify.models import Country


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/countries')
def get_countries():
    countries = [{'name': country.name} for country in session.query(Country)]
    return jsonify({'countries': countries}), 200
