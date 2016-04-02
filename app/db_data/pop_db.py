from models import *
import json

def pop_players():
	with open("players.json") as json_file:
		players = json.load(json_file)
	print("players")

def pop_crimes():
	return 1
def pop_teams():
	return 1
def create_nfla_all():
	pop_players()


print("success")