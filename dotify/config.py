import os


class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = 'postgresql://willwolf@localhost:5432/dotify'
    WEBPACK_MANIFEST_PATH = os.path.join(os.path.dirname(__file__), '..', 'build', 'manifest.json')
    DEBUG = True
