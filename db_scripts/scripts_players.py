import requests, datetime, json

teams = {'MIN','DEN','CIN','TEN','TB','JAC','IND','CHI','CLE','KC','MIA','SD',
			'BAL','NO','PIT','SEA','SF','OAK','GB','WAS','NE','ATL','CAR','ARI',
			'DET','NYJ','BUF','DAL','PHI','NYG','HOU','STL'}

assert len(teams) == 32

players = {}

src = 'http://nflarrest.com/api/v1/team/arrests/'
counter = 1

for team in teams:
	team_response = requests.get(src + team)
	team_response = team_response.json()

	for player in team_response:
		name = player['Name']
		#print(name)
		if name in players:
			# seen this guy before
			temp = player['Date'];

			excisting_date = datetime.datetime.strptime(players[name]['Last_Arrest'], '%Y-%m-%d');
			new_date = datetime.datetime.strptime(player['Date'], '%Y-%m-%d');

			if new_date > excisting_date:
				players[name]['Last_Arrest'] = temp
				players[name]['Team'] = player['Team']
		else:
			name_parts = name.split(' ')

			tmp_name = name

			team = player['Team']
			if '\'' in name:
				tmp_name = tmp_name.replace("'","\\'")
				#print (name)

			num_arrests = requests.get('http://nflarrest.com/api/v1/player/search/?term=' + tmp_name).json();
			
			num_arrests = num_arrests[0]['arrest_count']

			position = player['Position']
			last_arrest = player['Date']
		
			players[name] = {}
			players[name]['Name'] = name
			players[name]['Num_Arrests'] = num_arrests
			players[name]['First_Name'] = name_parts[0]
			players[name]['Last_Name'] = name_parts[1]
			players[name]['Team'] = team
			players[name]['Pos'] = position
			players[name]['Last_Arrest'] = last_arrest
			players[name]['id'] = counter
			counter += 1

data = json.loads(json.dumps(players))

print(data["Ricky Williams"])

with open('players.json', 'w') as outfile:
    json.dump(data, outfile)
