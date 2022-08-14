
    
    // Add console.log to check to see if our code is working.//
//console.log("working"); tile layer helps it load faster when it needs to interpret largs bits of data.
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_Key
  });
  let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_Key
  });
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  //create the earthquake layer. 
  let earthquakes = new L.layerGroup();
  //define object that contains the overlays, the overlay visible all the time
  let overlays = {
    Earthquakes: earthquakes
  };
  // Create a base layer that holds both maps.
  let baseMaps = {
    "Light" : light,
    "Dark": dark,
    "Satellite Streets" : satelliteStreets,
    "Streets": streets
  };
  // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
      center: [39.5, -98.5],
      zoom: 3,
      layers: [satelliteStreets]
  })
  // Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps, overlays).addTo(map);
  // import earthquake data
  // Retrieve the earthquake GeoJSON data.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  
  // This function determines the radius of the earthquake marker based on its magnitude.
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into 2 seperate functions
  // to calculate the radius and color
  function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    };
    
  // This function determines the color of the circle based on the magnitude of the earthquake.
  function getColor(magnitude) {
      if (magnitude > 5) {
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
    }
  
  
  // Creating a GeoJSON layer with the retrieved data.
      L.geoJSON(data, {
  
   // We turn each feature into a circleMarker on the map.
      
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
          // We set the style for each circleMarker using our styleInfo function.
          style: styleInfo,
  //popup for each circle Marker to display magnitude & location info after marker created
          onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
  
      }).addTo(earthquakes);
  });
    //create the legendary legend

    let legend = L.control({
      position: "bottomright"
    });
    // Then add all the details for the legend
      legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"
        ];
      // Looping through our intervals to generate a label with a colored square for each interval.
      for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
      }
      return div;
      };
      // Finally, we our legend to the map.
      legend.addTo(map);
