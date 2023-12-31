"""message

Revision ID: 62557f60cfe8
Revises: 
Create Date: 2023-09-12 19:25:14.871311

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62557f60cfe8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sounds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sound', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.Text(), nullable=False),
    sa.Column('hash', sa.Text(), nullable=False),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('saved_sounds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('sound_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sound_id'], ['sounds.id'], name=op.f('fk_saved_sounds_sound_id_sounds')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_saved_sounds_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('scores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('sound_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sound_id'], ['sounds.id'], name=op.f('fk_scores_sound_id_sounds')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_scores_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scores')
    op.drop_table('saved_sounds')
    op.drop_table('users')
    op.drop_table('sounds')
    # ### end Alembic commands ###
