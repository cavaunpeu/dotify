"""empty message

Revision ID: 3047304eb52
Revises: 3c7f0189667
Create Date: 2015-12-13 11:11:48.689629

"""

# revision identifiers, used by Alembic.
revision = '3047304eb52'
down_revision = '3c7f0189667'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'top_songs',
        sa.Column('country_id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.DateTime(), primary_key=True),
        sa.Column('rank', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(255)),
        sa.Column('artist', sa.String(255))
    )

def downgrade():
    op.drop_table('top_songs')
