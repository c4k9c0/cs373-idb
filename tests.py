#No guarantees that this does anything, but for part 1, that's fine.

from unittest import main, TestCase
from models import *
from Flask import *
from sqlalchemy import *

class tests(TestCase):

	def test_read_player_0(self):
		player_name = "Test Name"
		test_player = player(name = player_name)
		self.assertEqual(player_name, test_player.name)

	def test_read_player_1(self):
		player_num_arrests = 3
		player = Players(num_arrests = player_num_arrests)
		self.assertEqual(player_num_arrests, player.num_arrests)

	def test_read_player_2(self):
		player_name = None
		test_player = player(name = player_name)
		self.assertEqual(player_name, test_player.name)

	def test_read_team_0(self):
		team_name = "Test Name"
		test_team = team(name = team_name)
		self.assertEqual(team_name, test_team.name)

	def test_read_team_1(self):
		team_chmp = 6
		test_team = team(championships = team_chmp)
		self.assertEqual(team_chmp, test_team.championships)		

	def test_read_team_2(self):
		team_name = None
		test_team = team(name = team_name)
		self.assertEqual(team_name, test_team.name)

	def test_read_crime_0(self):
		crime_name = "Test Name"
		test_crime = crime(name = crime_name)
		self.assertEqual(crime_name, test_crime.name)

	def test_read_crime_1(self):
		crime_description = "Test Description"
		test_crime = crime(description = crime_description)
		self.assertEqual(crime_description, test_crime.description)

	def test_read_crime_2(self):
		crime_name = None
		test_crime = crime(name = crime_name)
		self.assertEqual(crime_name, test_crime.name)

if __name__ == '__main__':
    main()
