import os, urllib, json, filecmp, shutil

## set params
airtable_url = "<insert the airtable api url for your table>"
airtable_key = "<insert your airtable api key>"
url = "{}?api_key={}".format(airtable_url,airtable_key)
dest_file = "table-data.json"
temp_file = dest_file.replace(".json","-tmp.json")

## retrieve data from airtable and write to file
response = urllib.urlopen(url)
data = json.loads(response.read())
with open(temp_file, "wb") as outfile:
    json.dump(data, outfile, indent=1)

## compare new file to existing file and replace if necessary
if not filecmp.cmp(temp_file,dest_file):
    shutil.copy(temp_file,dest_file)
os.remove(temp_file)