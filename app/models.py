from sqlalchemy import *

# This is only because models.py has to be in the root.
from db import db
import json

"""
Models for Player
"""

def get_dict(obj):
    # an SQLAlchemy class
    fields = {}
    for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
        data = obj.__getattribute__(field)
        try:
            json.dumps(data) # this will fail on non-encodable values, like other classes
            fields[field] = data
        except TypeError:
            fields[field] = None
    # a json-encodable dict
    return fields

class Player(db.Model):
	__tablename__ = 'Player'

	id     = Column(Integer, primary_key = True)
	last_arrest   = Column(String)
	name          = Column(String)
	pos           = Column(String)
	first_name    = Column(String)
	#team          = db.Column(db.ForeignKey("Team.team_id")) # This is a foriegn key
	last_name     = Column(String)
	num_arrests   = Column(Integer)

	def __init__(self, last_arrest, name, pos, first_name, last_name, num_arrests):
		self.last_arrest = last_arrest
		self.name        = name
		self.pos         = pos
		self.first_name  = first_name
		#self.team        = team
		self.last_name   = last_name
		self.num_arrests  = num_arrests

	def __repr__(self):
		return "<Player(name='%s', pos='%s', last_arrest='%s')>" % (self.name, self.pos, self.last_arrest)

	def serialize(self):
		return get_dict(self)

'''
"""
Models for Team
"""
class Team(db.Model):
	__tablename__ = 'Team'

	team_id       = db.Column(db.Integer, primary_key = True)
	name 		  = db.Column(db.String(80))
	city          = db.Column(db.String(80))
	state         = db.Column(db.String(80))
	mascot        = db.Column(db.String(80))
	division      = db.Column(db.String(80))
	championships = db.Column(db.Integer)

	def __init__(self, team_id, city, state, mascot, division, championships, name):
		self.name 		   = name
		self.team_id       = team_id
		self.city          = city
		self.state         = state
		self.mascot        = mascot
		self.division      = division
		self.championships = championships

"""
Models for Crime
"""
class Crime(db.Model):
	__tablename__ = 'Crime'

	crime_id      = db.Column(db.Integer, primary_key = True)

	team          = db.Column(db.ForeignKey("Team.team_id")) # F Key
	date          = db.Column(db.Date)
	description   = db.Column(db.Text)
	position      = db.Column(db.String(5))
	outcome       = db.Column(db.Text)
	category      = db.Column(db.String(80))
	encounter     = db.Column(db.String(10))
	name  		  = db.Column(db.ForeignKey("Player.player_id"))

	def __init__(self, crime_id, team, date, description, position, outcome, category, encounter, name):
		self.crime_id    = crime_id
		self.team        = team
		self.date        = date
		self.description = description
		self.position    = position
		self.outcome     = outcome
		self.category    = category
		self.encounter   = encounter
		self.name  		 = name
'''