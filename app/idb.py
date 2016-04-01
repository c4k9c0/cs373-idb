from flask import Flask, render_template, send_file
from flask import jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
from db import db, app , manager
from models import Player, Team
import subprocess
import requests
import json
from datetime import timedelta
from initializing_db import create_nfl_db

@manager.command
def create_db():
    #logger.debug("create_db")
    app.config['SQLALCHEMY_ECHO'] = True
    create_nfl_db()


@manager.command
def drop_db():
    logger.debug("drop_db")
    app.config['SQLALCHEMY_ECHO'] = True
    db.drop_all()

# ---------
# run_tests
# ---------
'''
@app.route('/run_tests')
def run_tests():
    output = subprocess.getoutput("make test")
    return json.dumps({'output': str(output)})
'''

@app.route('/dummy/data', methods=['GET'])
def dumb():
    test = db.session.query(Team).filter_by(mascot='Cowboys').first()
    return jsonify({'player':test.serialize()})


@app.route('/')
def index():
    return send_file('index.html')


if __name__ == "__main__":

    #print(test)
    create_db()
    manager.run()
    #Commenting out this for now based on what
    # was in the Carina tutorial
    # app.run(host='0.0.0.0', debug=True)