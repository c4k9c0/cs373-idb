from sqlalchemy import *
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

# This is only because models.py has to be in the root.
from app.db import db
import json
from sqlalchemy.orm import relationship

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

	id     = Column(Integer, Sequence('player_id_seq'), primary_key = True)
	
	last_arrest   = db.Column(String(15))
	name          = db.Column(String(30))
	pos           = db.Column(String(10))
	first_name    = db.Column(String(15))
	team_id       = db.Column(Integer, ForeignKey("Team.id"))
	
	last_name     = db.Column(String(15))
	num_arrests   = db.Column(Integer)
	
	team 	 	  = relationship("Team")


	def __init__(self, last_arrest, name, pos, first_name, last_name, num_arrests, team):
		self.last_arrest = last_arrest
		self.name        = name
		self.pos         = pos
		self.first_name  = first_name
		self.last_name   = last_name
		self.team_id     = team.id
		self.num_arrests = num_arrests
		self.team 		 = team

	def __repr__(self):
		return "<Player(name='%s', pos='%s', last_arrest='%s')>" % (self.name, self.pos, self.last_arrest)

	def serialize(self):
		return get_dict(self)


"""
Models for Team
"""
class Team(db.Model):
	__tablename__ = 'Team'

	id       	  = db.Column(Integer, Sequence('team_id_seq'), primary_key = True)
	city          = db.Column(String(20))
	state         = db.Column(String(20))
	mascot        = db.Column(String(20))
	division      = db.Column(String(20))
	championships = db.Column(Integer)
	name 		  = db.Column(String(20))

	def __init__(self, city, state, mascot, division, championships, name):
		self.city          = city
		self.state         = state
		self.mascot        = mascot
		self.division      = division
		self.championships = championships
		self.name 		   = name

	def __repr__(self):
		return "<Team(mascot='%s', mascot='%s', city='%s', id='%d')>" % (self.mascot, self.mascot, self.city, self.id)

	def serialize(self):
		return get_dict(self)



"""
Models for Crime
"""

class Crime(db.Model):
	__tablename__ = 'Crime'

	id      = db.Column(db.Integer, Sequence('crime_id_seq'),primary_key = True)

	player_id  	  = db.Column(ForeignKey("Player.id"))
	team_id       = db.Column(ForeignKey("Team.id"))
	
	date          = db.Column(String(15))
	description   = db.Column(String(200))
	position      = db.Column(String(20))
	outcome       = db.Column(String(200))
	category      = db.Column(String(50))
	encounter     = db.Column(String(50))

	player   = relationship("Player")
	team 	  = relationship("Team")


	def __init__(self, date, description, position, outcome, category, encounter, player, team):
	
		self.player_id   = player.id
		self.team_id 	 = team.id

		self.date        = date
		self.description = description
		self.position    = position
		self.outcome     = outcome
		self.category    = category
		self.encounter   = encounter
		
		self.player 	 = player
		self.team 	     = team

	def __repr__(self):
		return "<Crime(date='%s', description='%s', position='%s')>" % (self.date, self.description, self.position)

	def serialize(self):
		return get_dict(self)
