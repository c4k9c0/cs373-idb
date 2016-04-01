#!flask/bin/python
from models import Player, Crime, Team
import requests
import spotipy
import spotipy.util as util
from db import db 
from sqlalchemy import *


client_id = '41cc5ad7bb2d44eb8151a17990f1e2ae'
client_secret = 'b1e8450ed87643fe824a25ab2eef358a'
redirect_uri = 'https://example.com/callback'


#export (SPOTIPY_CLIENT_ID=client_id)
#export (SPOTIPY_CLIENT_SECRET=client_secret)
#export (SPOTIPY_REDIRECT_URI=redirect_uri)

def create_players(team):
	player = Player('9-27-2005', 'Ricky Williams', 'RB', 'Ricky', 'Williams', team.id, 3, team)
	db.session.add(player)
	db.session.commit()

def create_teams():
	team = Team('Dallas', 'Texas', 'Cowboys', 'NFC', 6)
	db.session.add(team)
	db.session.commit()
	#create_players(team)

def create_nfl_db():
	print('HERE')

	#db.drop_all()
	db.create_all()

	create_teams()

	#scope = 'user-library-read'

	#username='jorgmuno'

	#token = util.prompt_for_user_token(username, scope, client_id, client_secret, redirect_uri)
'''
	if token:
	    sp = spotipy.Spotify(auth=token)
	    playlists = sp.user_playlists(username)
	    for playlist in playlists['items']:
	        if playlist['owner']['id'] == username:
	            print (playlist['name'])
	            print ('  total tracks', playlist['tracks']['total'])
	            results = sp.user_playlist(username, playlist['id'],
	                fields="tracks,next")
	            tracks = results['tracks']
	            show_tracks(tracks,sp)
	            while tracks['next']:
	                tracks = sp.next(tracks)
	                show_tracks(tracks,sp)
	            #print(results)
	else:
	    print ("Can't get token for", username)

'''
#authorization = "Authorization: Basic" + client_id + ":" + client_secret"
	



#db.drop_all()
#db.create_all()
#artist = Artist("Atlas Bound", 8, "Lullaby", "Landed on Mars", 42, "alsjdflkasjd", "http")
#requests.get("https://accounts.spotify.com/authorize/?client_id=41cc5ad7bb2d44eb8151a17990f1e2ae&response_type=code")
#auth = requests.get("https://accounts.spotify.com/authorize/?client_id=41cc5ad7bb2d44eb8151a17990f1e2ae&response_type=code&redirect_uri=https%3A%2F%2Fexample.com/callback")
#playlist = requests.get("https://api.spotify.com/v1/users/jorgmuno/playlists/30jvRmnVQu9W98Zn9h7H6v")
#token = requests.post(authorization "https://accounts.spotify.com/api/token")
#"Authorization: Basic ZjM...zE=" -d grant_type=authorization_code -d code=MQCbtKe...44KN -d redirect_uri=https%3A%2F%2Fwww.foo.com%2Fauth https://accounts.spotify.com/api/token
#Authorization: Basic <base64 encoded client_id:client_secret


#db.session.add(artist)

#db.session.commit()




#if __name__ == "__main__":
	#create_sweetmusic_db()
	#print("hello")
	#print(auth)
	#print(token)
#Status API Training Shop Blog About
