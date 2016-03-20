from sqlalchemy import *
from app import db

"""
Models for Players
"""
class Players(db.Model):
	__tablename__ = 'players'

	player_id = db.Column(db.Integer, primary_key=True)

	last_arrest = db.Column(db.Date)
	name = db.Column(db.String(80))
	pos = db.Column(db.String(5))
	first_name = db.Column(db.String(80))
	team = db.Column(db.String(5))
	last_name = db.Column(db.String(80))
	num_arrests = db.Column(db.Integer)



	def __init__(self, player_id, last_arrest, name, pos, first_name, team, last_name, num_arrests):
		self.player_id = player_id
		self.last_arrest = last_arrest
		self.name = name
		self.pos = pos
		self.first_name = first_name
		self.team = team
		self.last_name = last_name
		self.num_arrest = num_arrest

"""
Models for Teams
"""
class Teams(db.Model):
	__tablename__ = 'teams'

	teams_id = db.Column(db.Integer, primary_key=True)


"""
Models for Crimes
"""
class Crimes(db.Model):
	__tablename__ = 'crimes'

	crimes_id = db.Column(db.Integer, primary_key=True)

