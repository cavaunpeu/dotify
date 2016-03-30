import os


class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    WEBPACK_MANIFEST_PATH = os.path.join(os.path.dirname(__file__), 'static', 'manifest.json')
    DEBUG = True


class ProductionConfig(DevelopmentConfig):
    WEBPACK_ASSETS_URL = '/static/js/'
    DEBUG = False


CONFIG = ProductionConfig if os.environ.get('DOTIFY_ENV') == 'production' else DevelopmentConfig
