import json

categories = {}
with open('crimes.json') as data_file:    
    data = json.load(data_file)

    for player in data:
    	for record in data[player]:
    		category = record['Category']
    		if category in categories:
    			categories[category] += 1
    		else:
    			categories[category] = 1

data = json.loads(json.dumps(categories))


with open('crimes_category.json', 'w') as outfile:
     json.dump(data, outfile)
