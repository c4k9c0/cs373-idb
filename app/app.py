import logging
import os
import json
# import models

from flask import Flask, render_template, request, redirect, url_for, send_file
from flask.ext.script import Manager
from flask.ext.sqlalchemy import SQLAlchemy



logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)
logger.debug("Welcome to Carina Guestbook")

'''
SQLALCHEMY_DATABASE_URI = \
    '{engine}://{username}:{password}@{hostname}/{database}'.format(
        engine='mysql+pymysql',
        username='guestbook-admin',
        password='my-guestbook-admin-password',
        hostname='pythonwebapp_ab',
        database='guestbook')
        #username=os.getenv('MYSQL_USER'),
        #password=os.getenv('MYSQL_PASSWORD'),
        #hostname=os.getenv('MYSQL_HOST'),
        #database=os.getenv('MYSQL_DATABASE'))
'''

SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'

SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'

logger.debug("The log statement below is for educational purposes only. Do *not* log credentials.")
logger.debug("%s", SQLALCHEMY_DATABASE_URI)

app = Flask(__name__, static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

manager = Manager(app)
manager.add_command("runserver", Server(host="0.0.0.0", use_debugger=True))
db = SQLAlchemy(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    logger.debug("index")

    # if request.method == 'POST':
    #     name = request.form['name']
    #     guest = Guest(name=name)
    #     db.session.add(guest)
    #     db.session.commit()
    #     return redirect(url_for('index'))

    return send_file('index.html')

@manager.command
def create_db():
    logger.debug("create_db")
    app.config['SQLALCHEMY_ECHO'] = True
    db.create_all()
    pop_players()

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
    logger.debug("pop_players committed")


def pop_crimes():
    return 1
def pop_teams():
    return 1
# def create_nfla_all():
#     db.create_all()
#     pop_players()

if __name__ == '__main__':
    create_db()
    manager.run()