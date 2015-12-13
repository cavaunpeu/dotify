"""empty message

Revision ID: 3c7f0189667
Revises: None
Create Date: 2015-12-12 20:00:18.581403

"""

# revision identifiers, used by Alembic.
revision = '3c7f0189667'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'countries',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(255), nullable=False)
    )

def downgrade():
    op.drop_table('countries')
