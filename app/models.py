from sqlalchemy import *
from app import db

"""
Models for Players
"""
class Players(db.Model):
	__tablename__ = 'players'

	player_id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	team = db.Column(db.String(5))
	position = db.Column(db.String(5))
	arrests = db.Column(db.Integer)
	last_arrest = db.Column(db.Date)

	def __init__(self, player_id, name, team, position, arrests, last_arrest):
		self.player_id = player_id
		self.name = name
		self.team = team
		self.position = position
		self.arrests = arrests
		self.last_arrest = last_arrest



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

