from sqlalchemy import *
from app import db

"""
Models for Players
"""
class Players(db.Model):
	__tablename__ = 'players'

	player_id     = db.Column(db.Integer, primary_key = True)

	last_arrest   = db.Column(db.Date)
	name          = db.Column(db.String(80))
	pos           = db.Column(db.String(5))
	first_name    = db.Column(db.String(80))
	team          = db.Column(db.String(5))
	last_name     = db.Column(db.String(80))
	num_arrests   = db.Column(db.Integer)



	def __init__(self, player_id, last_arrest, name, pos, first_name, team, last_name, num_arrests):
		self.player_id   = player_id
		self.last_arrest = last_arrest
		self.name        = name
		self.pos         = pos
		self.first_name  = first_name
		self.team        = team
		self.last_name   = last_name
		self.num_arrest  = num_arrest

"""
Models for Teams
"""
class Teams(db.Model):
	__tablename__ = 'teams'

	team_id       = db.Column(db.Integer, primary_key = True)
    city          = db.Column(db.String(80))
    state         = db.Column(db.String(80))
    mascot        = db.Column(db.String(80))
    division      = db.Column(db.String(80))
    championships = db.Column(db.Integer)

    def __init__(self, team_id, city, state, mascot, division, championships):
        self.team_id       = team_id
        self.city          = city
        self.state         = state
        self.mascot        = mascot
        self.division      = division
        self.championships = championships

"""
Models for Crimes
"""
class Crimes(db.Model):
	__tablename__ = 'crimes'

	crime_id      = db.Column(db.Integer, primary_key = True)

	team          = db.Column(db.String(5))
	date          = db.Column(db.Date)
	description   = db.Column(db.Text)
    position      = db.Column(db.String(5))
    outcome       = db.Column(db.Text)
    category      = db.Column(db.String(80))
    encounter     = db.Column(db.String(10))

    def __init__(self, crime_id, team, date, description, position, outcome, category, encounter):
        self.crime_id    = crime_id
        self.team        = team
        self.date        = date
        self.description = description
        self.position    = position
        self.outcome     = outcome
        self.category    = category
        self.encounter   = encounter

