import os

from flask import render_template
from react.render import render_component

from dotify import app, recommended_songs_path


@app.route("/")
def main():
    return render_template('index.html')
