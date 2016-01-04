import os

from flask import Flask


app = Flask(__name__)
config_path = os.environ.get('CONFIG_PATH', 'dotify.config.DevelopmentConfig')
app.config.from_object(config_path)

recommended_songs_path = os.path.join(os.path.dirname(__file__),
        'static', 'components', 'RecommendedSongs.jsx')


from . import views
