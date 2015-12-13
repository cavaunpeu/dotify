import os

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager

from dotify import app
from dotify.database import Base, session
from dotify.models import Country, Song
from resources.countries import countries


manager = Manager(app)


@manager.command
def run():
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)


class DB:
    def __init__(self, metadata):
        self.metadata = metadata


migrate = Migrate(app, DB(Base.metadata))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
