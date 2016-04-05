import json
from unittest import main, TestCase
from models import Player, Team, Crime
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from db import db, app

class team_tests(TestCase):

	def setUp(self):
		db.drop_all()
		db.create_all()

	def test_insert_team(self):
		team = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
		self.assertEqual(team.name, "DAL")
	
	def test_read_team(self):
		team = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
		db.session.add(team)
		db.session.commit()
		test_team = db.session.query(Team).filter_by(name="DAL").first()
		self.assertEqual(test_team.name, "DAL")
	
	def test_read_many_team(self):
		team = Team("Houston", "Texas", "Texans", "AFC", 0, "HOU")
		team2 = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
		db.session.add(team)
		db.session.add(team2)
		db.session.commit()
		test_team = db.session.query(Team).filter_by(state="Texas").all()
		self.assertEqual(len(test_team), 2)

	def tearDown(self):
		db.drop_all()

class player_tests(TestCase):

	def setUp(self):
		db.drop_all()
		db.create_all()
		team = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
		db.session.add(team)
		db.session.commit()

	def test_insert_player(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
		self.assertEqual(player.name, "A.J. Jefferson")
	
	def test_read_player(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
		db.session.add(player)
		db.session.commit()
		test_player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		self.assertEqual(test_player.name, "A.J. Jefferson")
	
	def test_read_many_player(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
		player2 = Player("2007-05-18", "A.J. Nicholson", "LB", "A.J.", "Nicholson", 2, team)
		db.session.add(player)
		db.session.add(player2)
		db.session.commit()
		test_player = db.session.query(Player).filter_by(first_name="A.J.").all()
		self.assertEqual(len(test_player), 2)

	def test_relation_player(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
		self.assertEqual(player.team.name, "DAL")

	def tearDown(self):
		db.drop_all()

class crime_tests(TestCase):

	def setUp(self):
		db.drop_all()
		db.create_all()
		team = Team("Dallas", "Texas", "Cowboys", "NFC", 6, "DAL")
		db.session.add(team)
		db.session.commit()
		player = Player("2013-11-25", "A.J. Jefferson", "CB", "A.J.", "Jefferson", 1, team)
		db.session.add(player)
		db.session.commit()

	def test_insert_crime(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
		self.assertEqual(crime.category, "Domestic Violence")
	
	def test_read_crime(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
		db.session.add(crime)
		db.session.commit()
		test_crime = db.session.query(Crime).filter_by(category="Domestic Violence").first()
		self.assertEqual(test_crime.category, "Domestic Violence")
	
	def test_read_many_crime(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
		crime2 = Crime("2013-11-25", "Description", "CB", "Outcome", "DUI", "encounter", player, team)
		db.session.add(crime)
		db.session.add(crime2)
		db.session.commit()
		test_crime = db.session.query(Crime).filter_by(description="Description").all()
		self.assertEqual(len(test_crime), 2)

	def test_relation_crime0(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
		self.assertEqual(crime.team.name, "DAL")

	def test_relation_crime1(self):
		team = db.session.query(Team).filter_by(name="DAL").first()
		player = db.session.query(Player).filter_by(name="A.J. Jefferson").first()
		crime = Crime("2013-11-25", "Description", "CB", "Outcome", "Domestic Violence", "encounter", player, team)
		self.assertEqual(crime.player.name, "A.J. Jefferson")		

	def tearDown(self):
		db.drop_all()
if __name__ == '__main__':
	main()