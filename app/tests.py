import json
from unittest import main, TestCase
from models import Player, Team, Crime
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from db import db, app

class team_tests(TestCase):

	def setUp(self):
		db.create_all()

	def test_insert_team(self):
		team = Team("Arlington", "Test State", "Possums", "NFC", 6, "ARL")
		db.session.add(team)
		db.session.commit()
		self.assertEqual(team.name, "ARL")
		db.session.delete(team)
		db.session.commit()
	
	def test_read_team(self):
		team = Team("Arlington", "Test State", "Possums", "NFC", 6, "ARL")
		db.session.add(team)
		db.session.commit()
		test_team = db.session.query(Team).filter_by(name="ARL").first()
		self.assertEqual(test_team.name, "ARL")
		db.session.delete(test_team)
		db.session.commit()

	
	def test_read_many_team(self):
		team = Team("Spring", "Test State", "Owls", "AFC", 0, "SPR")
		team2 = Team("Arlington", "Test State", "Possums", "NFC", 6, "ARL")
		db.session.add(team)
		db.session.add(team2)
		db.session.commit()
		test_team = db.session.query(Team).filter_by(state="Test State").all()
		self.assertEqual(len(test_team), 2)
		db.session.delete(team)
		db.session.delete(team2)
		db.session.commit()

class player_tests(TestCase):

	def setUp(self):
		db.create_all()

	def test_insert_player(self):
		team = Team("Arlington", "Texas", "Possums", "NFC", 6, "ARL")
		db.session.add(team)
		db.session.commit()
		player = Player("2013-11-25", "Santa Claus", "CB", "A.J.", "Jefferson", 1, team)
		db.session.add(player)
		db.session.commit()
		self.assertEqual(player.name, "Santa Claus")
		db.session.delete(player)	
		db.session.commit()
		db.session.delete(team)
		db.session.commit()
	
	# def test_read_player(self):
	# 	team = Team("Arlington", "Texas", "Possums", "NFC", 6, "ARL")
	# 	db.session.add(team)
	# 	db.session.commit()
	# 	player = Player("2013-11-25", "Santa Claus", "CB", "A.J.", "Jefferson", 1, team)
	# 	db.session.add(player)
	# 	db.session.commit()
	# 	test_player = db.session.query(Player).filter_by(name="Santa Claus").first()
	# 	self.assertEqual(test_player.name, "Santa Claus")
	# 	db.session.delete(team)
	# 	db.session.delete(player)

	# 	db.session.commit()
	
	# def test_read_many_player(self):
	# 	team = Team("Arlington", "Texas", "Possums", "NFC", 6, "ARL")
	# 	db.session.add(team)
	# 	db.session.commit()
	# 	player = Player("2013-11-25", "Santa Claus 1", "CB", "Santa", "Jefferson", 1, team)
	# 	player2 = Player("2007-05-18", "Santa Claus", "LB", "Santa", "Nicholson", 2, team)
	# 	db.session.add(player)
	# 	db.session.add(player2)
	# 	db.session.commit()
	# 	test_player = db.session.query(Player).filter_by(first_name="Santa").all()
	# 	self.assertEqual(len(test_player), 2)
	# 	db.session.delete(team)
	# 	db.session.delete(player)
	# 	db.session.delete(player2)

	# 	db.session.commit()

	# def test_relation_player(self):
	# 	team = Team("Arlington", "Texas", "Possums", "NFC", 6, "ARL")
	# 	db.session.add(team)
	# 	db.session.commit()
	# 	team = db.session.query(Team).filter_by(name="ARL").first()
	# 	player = Player("2013-11-25", "Santa", "CB", "A.J.", "Jefferson", 1, team)
	# 	db.session.add(player)
	# 	db.session.commit()
	# 	self.assertEqual(player.team.name, "ARL")
	# 	db.session.delete(team)
	# 	db.session.delete(player)
	# 	db.session.commit()

# class crime_tests(TestCase):

# 	# def create_app(self):
# 	# 	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
# 	# 	return app

# 	def setUp(self):
# 		db.create_all()
# 		team = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
# 		db.session.add(team)
# 		db.session.commit()
# 		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
# 		db.session.add(player)
# 		db.session.commit()

# 	def test_insert_crime(self):
# 		team = db.session.query(Team).filter_by(name="DAL").first()
# 		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
# 		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
# 		self.assertEqual(crime.category, "Domestic Violence")
	
# 	def test_read_crime(self):
# 		team = db.session.query(Team).filter_by(name="DAL").first()
# 		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
# 		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
# 		db.session.add(crime)
# 		db.session.commit()
# 		test_crime = db.session.query(Crime).filter_by(category="Domestic Violence").first()
# 		self.assertEqual(test_crime.category, "Domestic Violence")
	
# 	def test_read_many_crime(self):
# 		team = db.session.query(Team).filter_by(name="DAL").first()
# 		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
# 		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
# 		crime2 = Crime("2013-11-25", "Description", "CB", "Outcome", "DUI", "encounter", player, team)
# 		db.session.add(crime)
# 		db.session.add(crime2)
# 		db.session.commit()
# 		test_crime = db.session.query(Crime).filter_by(description="Description").all()
# 		self.assertEqual(len(test_crime), 2)

# 	def test_relation_crime0(self):
# 		team = db.session.query(Team).filter_by(name="DAL").first()
# 		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
# 		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
# 		self.assertEqual(crime.team.name, "DAL")

# 	def test_relation_crime1(self):
# 		team = db.session.query(Team).filter_by(name="DAL").first()
# 		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
# 		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
# 		self.assertEqual(crime.player.name, "A.J. Jefferson")		

# 	def tearDown(self):
# 		db.session.remove()
# 		db.drop_all()


if __name__ == '__main__':
	main()