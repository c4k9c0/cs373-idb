import requests, datetime, json

src = 'http://nflarrest.com/api/v1/team/arrests/'

teams = {'MIN','DEN','CIN','TEN','TB','JAC','IND','CHI','CLE','KC','MIA','SD',
			'BAL','NO','PIT','SEA','SF','OAK','GB','WAS','NE','ATL','CAR','ARI',
			'DET','NYJ','BUF','DAL','PHI','NYG','HOU','STL'}

arrests = {}

for team in teams:
	crime_response = requests.get(src + team).json()

	#print(team)
	#print(crime_response)

	for player in crime_response:
		name = player['Name']

		if name in arrests:
			crime = {
				"Date":player['Date'],
				"Team":player['Team'],
				"Position":player['Position'],
				"Encounter":player['Encounter'],
				"Category":player['Category'],
				"Description":player['Description'],
				"Outcome":player['Outcome']
			}
			arrests[name].append(crime)
		else:
			arrests[name] = []
			crime = {
				"Date":player['Date'],
				"Team":player['Team'],
				"Position":player['Position'],
				"Encounter":player['Encounter'],
				"Category":player['Category'],
				"Description":player['Description'],
				"Outcome":player['Outcome']			
			}
			arrests[name].append(crime)

print(arrests["Ricky Williams"])
			
data = json.loads(json.dumps(arrests))

print(data['Ricky Williams'])

with open('crimes.json', 'w') as outfile:
    json.dump(data, outfile)

