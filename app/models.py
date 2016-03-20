from sqlalchemy import *
from flask_app import db


"""
Models for Crimes
"""
class Crimes(db.Model):
	__tablename__ = 'crimes'
	crimes_id = Column(Integer, primary_key=True)

"""
Models for Players
"""
class Players(db.Model):
	__tablename__ = 'players'
	players_id = Column(Integer, primary_key=True)

"""
Models for Teams
"""
class Teams(db.Model):
	__tablename__ = 'teams'
	teams_id = Column(Integer, primary_key=True)
