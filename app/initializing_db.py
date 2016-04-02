#!flask/bin/python
from models import Player, Team, Crime
import requests
import json
from db import db 
from sqlalchemy import *


client_id = '41cc5ad7bb2d44eb8151a17990f1e2ae'
client_secret = 'b1e8450ed87643fe824a25ab2eef358a'
redirect_uri = 'https://example.com/callback'

#DONE
def create_players():

	with open("players.json") as json_file:
		player_json = json.load(json_file)

	for p in player_json:
		player = player_json[p]
		team   = db.session.query(Team).filter_by(name=player['Team']).first()
		player = Player(player['Last_Arrest'],player['Name'],player['Pos'],player['First_Name'],player['Last_Name'],player['Num_Arrests'], team)
		db.session.add(player)

	db.session.commit()

# DONE
def create_teams():
	
	with open("all_teams.json") as json_file:
		team_json = json.load(json_file)
	
	for t in team_json:
		team = team_json[t]
		team = Team(team['City'],team['State'],team['Mascot'],team['Divison'],team['Championships'],t)
		db.session.add(team)
	
	db.session.commit()

def create_crimes():

	with open("crimes.json") as json_file:
		crimes_json = json.load(json_file)

	for p in crimes_json:
		crime_array = crimes_json[p]
		player = db.session.query(Player).filter_by(name=p).first()
		
		for crime in crime_array:
			team = db.session.query(Team).filter_by(name=crime['Team'])
			crime = Crime(crime['Date'],crime['Description'],crime['Position'],crime['Outcome'],crime['Category'],crime['Encounter'], player, team)
			db.session.add(crime)

	db.session.commit()

def create_nfl_db():
	db.drop_all()
	db.create_all()
	create_teams()
	create_players()
	create_crimes()
