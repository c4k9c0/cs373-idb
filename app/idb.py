from flask import Flask, render_template, send_file
from flask import jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
from db import db, app , manager
from models import Player, Team, Crime
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
    #logger.debug("drop_db")
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

#----------
# API
#----------

# All Teams - DONE
@app.route('/api/teams', methods=['GET'])
def teams():
    teams_json = {}
    teams = db.session.query(Team).all()
    for team in teams:
        teams_json[team.name] = team.serialize()

    return jsonify(teams_json)

#Single Team - DONE
@app.route('/api/teams/<team_name>', methods=['GET'])
def single_team(team_name):
    team = db.session.query(Team).filter_by(name=team_name).first()
    return jsonify({team.name:team.serialize()})

#All Crimes
@app.route('/api/crimes', methods=['GET'])
def crimes():
    crimes_json = {}
    crimes = db.session.query(Crime).all()
    for crime in crimes:
        player_name = crime.player.name
        if(crime.player.name in crimes_json):
            crimes_json[player_name].append(crime.serialize())
        else:
            crimes_json[player_name] = [crime.serialize()]
    return jsonify(crimes_json)
    #need team name, player name

#Single Crime
@app.route('/api/crimes/<crime_name>', methods=['GET'])
def single_crime(crime_name):
    return 1

#Crimes by player
@app.route('/api/crimes/player/<player_name>', methods=['GET'])
def crime_player(player_name):
    return 1

#Crimes by team
@app.route('/api/crimes/team/<team_name>', methods=['GET'])
def crime_team(team_name):
    return 1

#All Players - DONE
@app.route('/api/players', methods=['GET'])
def players():
    # team_name because I don't want team to be overwritten
    players_json = {}
    players = db.session.query(Player).all()
    for player in players:
        players_json[player.name] = player.serialize()
        players_json[player.name]['team_name'] = player.team.name

    return jsonify(players_json)

#Single Player - DONE
@app.route('/api/players/<player_name>', methods=['GET'])
def single_player(player_name):

    player = db.session.query(Player).filter_by(name=player_name).first()
    player_json = player.serialize()
    player_json['team_name'] = player.team.name
    return jsonify({'player':player_json})

@app.route('/')
def index():
    return send_file('index.html')

if __name__ == "__main__":
    create_db()
    manager.run()
    #Commenting out this for now based on what
    # was in the Carina tutorial
    # app.run(host='0.0.0.0', debug=True)