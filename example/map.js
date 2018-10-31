// create map and add mapbox
var map = L.map('map', {attributionControl: false})
map.setView([30, -90], 10);

var credits = L.control.attribution().addTo(map);
credits.addAttribution('© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>');

// make and add basemap layer from mapbox
var mapbox_api_key = "pk.eyJ1IjoibGVnaW9uZ2lzIiwiYSI6ImNqbnc3ODVraDAwMW0za21lOG9oZG9meGcifQ.6_w6aZZf2QezFrGO-VLl8Q"
var dark_bm = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?'
    +'access_token='+mapbox_api_key,
    {maxNativeZoom:18,maxZoom:19}
);
dark_bm.addTo(map)

// this could also be a real url, but it would need to contain your airtable api key
// example below uses a local file that is frequently updated on the server.
var url = "table-data.json";

// get table contents and create cluster layer from it
var markers = L.markerClusterGroup();
$.getJSON(url, function(result){
    $.each(result.records, function(index){
        var recordData = result.records[index]["fields"];
        var popupContent = `
        <div>
            <h3>${recordData['name']}</h3>
            <h4>Address: ${recordData['address']}</h4>
            <h4>Hours: ${recordData['hours']}</h4>
        </div>`;
        var marker = L.marker([recordData['latitude'], recordData['longitude']]);
        marker.bindPopup(popupContent, {
            width: "350px"
        });
        markers.addLayer(marker);
    });
    map.addLayer(markers);
});
