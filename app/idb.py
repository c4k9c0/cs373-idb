from flask import Flask, render_template, send_file
from flask import jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
from db import db, app , manager
from models import Player
import subprocess
import requests
import json
from datetime import timedelta
from initializing_db import create_nfl_db

# --------------
# get_album_data
# --------------

@app.route('/get_albums')
def get_album_data():
    #11wzEOXFI1wgBHxKcsbacJ Chet Faker 1998 Melbourne Edition 
    #3vNsiDEAnZRleKelEgdet1 Atlast Bound Lullaby 
    #6bfkwBrGYKJFk6Z4QVyjxd Jack U Skrillex and Diplo present Jack \u00dc
    albums = requests.get(
        'https://api.spotify.com/v1/albums/?ids=11wzEOXFI1wgBHxKcsbacJ,3vNsiDEAnZRleKelEgdet1,6bfkwBrGYKJFk6Z4QVyjxd').json()

    # Parse JSON information to append needed items
    for album in albums["albums"]:

        # Get album cover
        album["col_img"] = album["images"][len(album["images"]) - 1]["url"]

        # Get artist(s)
        names = ""
        for artist in album["artists"]:
            names += artist["name"] + ', '
        album["artist_name"] = names.rstrip(', ')

        # Get number of tracks
        album["num_tracks"] = len(album["tracks"]["items"])

        # Get length (duration) of album
        duration_ms = 0
        for track in album["tracks"]["items"]:
            duration_ms += track["duration_ms"]
        duration = timedelta(milliseconds = duration_ms)

        # Convert milliseconds to a human-readable time
        minutes = str(duration.seconds // 60)
        seconds = str(duration.seconds % 60).zfill(2)
        album["length"] = minutes + ":" + seconds

    return jsonify(albums)

# -----------------
# Mock up API stubs
# -----------------

# This references data base e
@app.route('/api')
def artist_table(page):
    '''
    json = {'page': page}
    json['artists'] = []

    psize = DEFAULT_PAGE_SIZE
    if 'psize' in request.args:
        psize = int(request.args['psize'])
        json['psize'] = psize

    i = 0
    while i < psize:
        json['artists'].append({'id': i, 'name': 'artist ' + str(i)})
        i += 1
    '''
    return send_file('index.html')

@app.route('/artists')
def artists():
    # Get specified artists by their ids
    if 'ids' in request.args:
        ids = request.args.get('ids').split(',')
        return jsonify({"ids": ids})
    
    # Get arbitrary artists
    else:
        return jsonify({"artists": [{},{},{}]})

@app.route('/albums/<int:page>')
def album_table(page):
    json = {'page': page}
    json['albums'] = []

    psize = DEFAULT_PAGE_SIZE
    if 'psize' in request.args:
        psize = int(request.args['psize'])
        json['psize'] = psize

    i = 0
    while i < psize:
        json['albums'].append({'id': i, 'name': 'album ' + str(i)})
        i += 1
    return jsonify(json)

@app.route('/albums')
def albums():
    # Get specified albums by their ids
    if 'ids' in request.args:
        ids = request.args.get('ids').split(',')
        return jsonify({"ids": ids})
    # Get arbitrary albums if none specified
    else:
        return jsonify({"albums": [{},{},{}]})

@app.route('/tracks/<int:page>')
def track_table(page):
    json = {'page': page}
    json['tracks'] = []

    psize = DEFAULT_PAGE_SIZE
    if 'psize' in request.args:
        psize = int(request.args['psize'])
        json['psize'] = psize

    i = 0
    while i < psize:
        json['tracks'].append({'id': i, 'name': 'track ' + str(i)})
        i += 1
    return jsonify(json)

@app.route('/tracks')
def tracks():
    # Get specified tracks by their ids
    if 'ids' in request.args:
        ids = request.args.get('ids').split(',')
        return jsonify({"ids": ids})
    # Get arbitrary tracks if none specified
    else:
        return jsonify({"tracks": [{},{},{}]})

@manager.command
def create_db():
    #logger.debug("create_db")
    app.config['SQLALCHEMY_ECHO'] = True
    create_nfl_db()


@manager.command
def drop_db():
    logger.debug("drop_db")
    app.config['SQLALCHEMY_ECHO'] = True
    db.drop_all()


# ---------
# run_tests
# ---------
'''
@app.route('/run_tests')
def run_tests():
    output = subprocess.getoutput("make test")
    return json.dumps({'output': str(output)})
'''

@app.route('/dumby/data', methods=['GET'])
def dumb():
    create_db()
    test = db.session.query(Player).filter_by(name='Charlie Cox').first()
    return jsonify({'player':test.serialize()})


@app.route('/')
def index():
    return send_file('index.html')


if __name__ == "__main__":
    
    #test = db.session.query(Player).filter_by(name='Charlie Cox').first()
    print('right hurrr')
    #print(test)
    manager.run()
    #create_db()
    #Commenting out this for now based on what
    # was in the Carina tutorial
    # app.run(host='0.0.0.0', debug=True)