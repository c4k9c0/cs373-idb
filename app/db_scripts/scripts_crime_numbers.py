import requests, datetime, json

src = 'http://nflarrest.com/api/v1/crime'

src2 = 'http://nflarrest.com/api/v1/team/arrests/'

teams = {'MIN','DEN','CIN','TEN','TB','JAC','IND','CHI','CLE','KC','MIA','SD',
			'BAL','NO','PIT','SEA','SF','OAK','GB','WAS','NE','ATL','CAR','ARI',
			'DET','NYJ','BUF','DAL','PHI','NYG','HOU','STL'}

crimeCount = {}
crime_response = requests.get(src).json()

for crime in crime_response:
	crimeCount[crime['Category'].upper()] = [int(crime['arrest_count']), {}]

print(crimeCount)
for team in teams:
	crime_response = requests.get(src2 + team).json()

	for player in crime_response:
		name = player['Name']
		category = player['Category'].upper()
		team_dic = crimeCount[category][1]

		if team in team_dic:
			team_dic[team] += 1
		else:
			team_dic[team] = 1

			
data = json.loads(json.dumps(crimeCount))


with open('crimes_count.json', 'w') as outfile:
     json.dump(data, outfile)
