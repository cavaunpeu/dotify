import os

from flask import Flask
from flask_webpack import Webpack


webpack = Webpack()

app = Flask(__name__)

config_path = os.environ.get('CONFIG_PATH', 'dotify.config.CONFIG')
app.config.from_object(config_path)
webpack.init_app(app)


from . import routes
