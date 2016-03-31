from flask import Flask, send_file
from flask_sqlalchemy import SQLAlchemy
import logging
import os
import json
import models

from flask import Flask, render_template, request, redirect, url_for
from flask.ext.script import Manager
from flask.ext.sqlalchemy import SQLAlchemy


logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)
logger.debug("Welcome to Carina Guestbook")


SQLALCHEMY_DATABASE_URI = \
    '{engine}://{username}:{password}@{hostname}/{database}'.format(
        engine='mysql+pymysql',
        username=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        hostname=os.getenv('MYSQL_HOST'),
        database=os.getenv('MYSQL_DATABASE'))

logger.debug("The log statement below is for educational purposes only. Do *not* log credentials.")
logger.debug("%s", SQLALCHEMY_DATABASE_URI)

app = Flask(__name__, static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

manager = Manager(app)
db = SQLAlchemy(app)


# app = Flask(__name__, static_url_path='')

# db = SQLAlchemy(app)

@app.route('/')
def index():
    return send_file('index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1')

# class Guest(db.Model):
#     __tablename__ = 'guests'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(256), nullable=False)

#     def __repr__(self):
#         return "[Guest: id={}, name={}]".format(self.id, self.name)

####################################################################

@manager.command
def create_db():
    logger.debug("create_db")
    app.config['SQLALCHEMY_ECHO'] = True
    create_nfla_all()

@manager.command
def create_dummy_data():
    logger.debug("create_test_data")
    app.config['SQLALCHEMY_ECHO'] = True
    guest = Guest(name='Steve')
    db.session.add(guest)
    db.session.commit()

@manager.command
def drop_db():
    logger.debug("drop_db")
    app.config['SQLALCHEMY_ECHO'] = True
    db.drop_all()

def pop_players():
    with open("db_data/players.json") as json_file:
        players = json.load(json_file)

    pkey = 1
    for p in players:
        player = Player(player_id=pkey, last_arrest=p['Last_Arrest'], name=p['Name'], pos=p['Pos'], first_name=p['First_Name'], team=p['Team'], last_name=p['Last_Name'], num_arrests=p['Num_Arrests'])
        db.session.add(player)
        print(player)
        pkey+=1
    db.session.commit()


def pop_crimes():
    return 1
def pop_teams():
    return 1
def create_nfla_all():
    db.create_all()
    pop_players()

if __name__ == '__main__':
    manager.run()
    print("hello")

pop_players()