### description

This is a proof-of-concept that shows how an [Airtable](https://airtable.com) "base" can be used as the data backend for a web map built with LeafletJS.

For security reasons, a caching layer is implemented. A python script is used to download the airtable content into a .json file, and leaflet reads that file directly. This keeps your airtable api key out of the Leaflet request, and also gives you control over how frequently your app hits the airtable api.

Suggested implementation of this caching is to make a cronjob/scheduled task that runs `update_table_data.py` frequently, creating a close-to-realtime link between your table and your map.

### view the example

1. Create a new airtable base, and make a table that has the following headers:

        name,address,hours,latitude,longitude
    
    There is no geocoding implmented; you must fill out the latitude and longitude fields.
2. Publish the table to the web
2. Clone/download this repo contents
3. Go to https://airtable.com/api and view the api for your new base
3. In `update_table_data.py`, insert the necessary credentials from the api page
4. Run `python update_table_data.py`
5. Open index.html in a browser

Be careful not to commit your api key to version control.

