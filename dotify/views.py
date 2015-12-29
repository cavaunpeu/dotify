import os

from flask import render_template

from dotify import app


@app.route("/")
def main():
    return render_template('index.html')
