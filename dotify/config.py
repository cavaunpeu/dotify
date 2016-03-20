import os


class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    WEBPACK_MANIFEST_PATH = os.path.join(os.path.dirname(__file__), '..', 'build', 'manifest.json')
    DEBUG = True
