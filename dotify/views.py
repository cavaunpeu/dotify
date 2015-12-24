import os

from flask import render_template
from react.render import render_component

from dotify import app, recommended_songs_path


@app.route("/")
def hello():
    # TODO: write a thing that wraps all this into `RecommendedSongsRenderer`
    rendered = render_component(
        path=recommended_songs_path,
        props={
            'songs': [
                {'artist': 'Dude', 'title': 'Hey Ma'},
                {'artist': 'Kanye', 'title': 'Yes!'}
            ]
        },
        to_static_markup=True
    )
    return render_template('index.html', rendered=rendered)

@app.route("/form")
def form():
    return render_template('index.html')
