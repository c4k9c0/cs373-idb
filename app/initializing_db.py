#!flask/bin/python
from models import Player
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

def show_tracks(tracks,sp):
	artistids = []
	albumids = []
	stored_tracks=[]
	for i, item in enumerate(tracks['items']):
		track = item['track']
		#album = item['album']
		#artists = item['artists']

		#print (track)
		title = track['name']
		artist_name = track['artists'][0]['name']
		albumid = track['album']['id']
		artistid = track['artists'][0]['id']
		album = sp.album(albumid)
		artist = sp.artist(artistid)
		if (artistid in artistids):
			pass
		else:
			artistids.append(artistid)
		if (albumid in albumids):
			pass
		else:
			albumids.append(albumid)
			duration_ms=0
			for tracky in album["tracks"]["items"]:
				duration_ms += tracky["duration_ms"]
			duration = duration_ms
			albumni = Album(album['name'], album['artists'][0]['name'], album['release_date'], duration, album['tracks']['total'], album['href'], album['id'])
			db.session.add(albumni)
		album = sp.album(albumid)
		albumni= Album.query.filter(Album.name== album['name']).first()
		release_date = album['release_date']
		albumname = track['album']['name']
		duration = track['duration_ms']
		spotifyuri = track['href']
		spotifyid = track['id']
		track_number = track['track_number']

		#print (title, artist_name, albumname, duration, release_date, spotifyid, spotifyuri, '\n')
		#print (albumni.id)
		track = Track(title, artist_name, release_date, albumname, duration, spotifyuri, spotifyid, albumni.id)
		stored_tracks.append(track)
		#print (i, track['artists'][0]['name'], track['name'], track['album']['name'])
		#    def __init__(self, name, artist_name , date, length, num_tracks, spotify_uri, spotify_id):
		   # def __init__(self, title, artist_name, release, album, duration, spotify_uri, spotify_id):
	#print (albumids)

	for i in range(0,5):
		album = sp.album(albumids[i])
		artist = sp.artist(artistids[i])
		artist = Artist(artist['name'], 1, album['name'], album['tracks']['items'][0]['name'], artist['popularity'], artist['href'], artist['id'])
		#tracksy= Track.query.filter(Track.artist_name== artist.name).all()
		albums= Album.query.filter(Album.artist_name==artist.name).all()
		for alb in albums:
			alb.artists.append(artist)
		for track in stored_tracks:
			if artist.name==track.artist_name:
				track.artists2.append(artist)
		#self, name, artist_name , date, length, num_tracks, spotify_uri, spotify_id
		db.session.add(artist)
		
	print (artistids)
	for track in stored_tracks:
		db.session.add(track)
	db.session.commit()

def create_players():
	player = Player('never', 'Charlie Cox', 'Running back', 'Charlie', 'Cox', 0)
	db.session.add(player)
	db.session.commit()
	test = db.session.query(Player).filter_by(name='Charlie Cox').first()
	print('TEST IS')
	print(test)


def create_nfl_db():
	print('HERE')

	#db.drop_all()
	db.create_all()

	create_players()

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
