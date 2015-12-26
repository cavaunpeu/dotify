import os

from flask import render_template
from react.render import render_component

from dotify import app, recommended_songs_path


@app.route("/")
def main():
    return render_template('index.html')

@app.route("/test")
def test():
    country_dropdown_path = os.path.join(os.path.dirname(__file__),
        'static', 'components', 'CountryDropdown.jsx')
    countries = [
        {'id': 1, 'name': 'This'},
        {'id': 2, 'name': 'Hey'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
        {'id': 3, 'name': 'Colombia'},
    ]
    rendered = render_component(country_dropdown_path, props={'countries': countries})
    return render_template('index.html', rendered=rendered)
