// Add console.log to check to see if our code is working.//
//console.log("working"); tile layer helps it load faster when it needs to interpret largs bits of data.
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_Key
});
// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [dark]
})
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// import airport data

let airportData = "https://raw.githubusercontent.com/Jblueart/Mapping_earthquake/main/majorAirports.json";
//grabbing geoJson data
d3.json(airportData).then(function(data) {
    console.log(data);

    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup( "<h2>" + feature.properties.city + "</h2>"+"<hr></hr>"+"<h3>" + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});    
    //creating a geojson layer w/data
   // L.geoJson(data).addTo(map);

//let airport = airportData.map(data   => (properties:{("Feature")name: "", city:""}));
//console.log(airport);
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
// Create the map object with center at the San Francisco airport.
// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {


//loop through the cities array & create a marker for each
  
    // We turn each feature into a marker on the map.
   // pointToLayer: function(feature, latlng) {
     // console.log(feature);
    //  return L.marker(latlng)
   //   .bindPopup("<h2>" + feature.properties.city + "</h2>"+"<hr></hr>"+"<h3>" + feature.properties.name + "</h3>");
  //  }

  //}).addTo(map);
