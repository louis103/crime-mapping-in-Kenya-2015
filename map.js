var map = L.map("map", { zoomControl: false }).setView([0.2521, 37.8219], 6.48);
// [0.2521, 37.8219], 6
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["bar"] });

google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawDoughnutChart);

var geojson;

// adding zoom home functionality
var zoomHome = L.Control.zoomHome({ position: "topleft" });
zoomHome.addTo(map);

// implementing full screen
map.addControl(
  new L.Control.Fullscreen({
    title: {
      false: "View Fullscreen",
      true: "Exit Fullscreen",
    },
  })
);
// Adding a scalebar to our leaflet map
L.control
  .scale({
    metric: true,
    imperial: true,
    maxWidth: 100,
    position: "bottomleft",
  })
  .addTo(map);

//adding our basemaps
var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleSat = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var cartoDB = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    minZoom: 0,
  }
);
// adding basemaps
var baseMaps = {
  OSM: tiles,
  "Google Streets": googleStreets,
  "Google Satellite": googleSat,
  "Google Hybrid": googleHybrid,
  "Google Terrain": googleTerrain,
  CartoDB: cartoDB,
};
// Adding measure options
L.control.polylineMeasure(options).addTo(map);
// Adding auto locate me functionality
L.control.locate().addTo(map);
var control = L.control.layers(baseMaps, {}, { collapsed: false });
control.addTo(map);
// setting up leaflet coordinates viewer
let coordP = L.control.coordProjection({}).addTo(map);
// Adding a geocoder
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);

//   adding zoom functionality
L.Control.boxzoom({
  position: "topleft",
  title: "Click to start zooming map!",
}).addTo(map);

// function to parse integers
function toInteger(val) {
  return parseInt(val);
}
// Initialize info control
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

//TODO: visualize function
function visualizeMap(crimeValue, type) {
  if (type == "Homicide") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Homicide),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.Homicide) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 1
  else if (type == "morality_o") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.morality_o),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.morality_o) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 2
  else if (type == "robbery") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.robbery),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.robbery) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 3
  else if (type == "breakings") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.breakings),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.breakings) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 4
  else if (type == "stock_stef") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.stock_stef),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.stock_stef) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 5
  else if (type == "stealing") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.stealing),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.stealing) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 6
  else if (type == "servant_th") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.servant_th),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.servant_th) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 7
  else if (type == "gta") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.gta),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.gta) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 8
  else if (type == "drugs") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.drugs),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.drugs) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 9
  else if (type == "traffic_of") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.traffic_of),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.traffic_of) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 10
  else if (type == "criminal_d") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.criminal_d),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.criminal_d) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 11
  else if (type == "economic_c") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.economic_c),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.economic_c) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 12
  else if (type == "corruption") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.corruption),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.corruption) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 13
  else if (type == "Offences_l") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Offences_l),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.Offences_l) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 14
  else if (type == "offences_t") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.offences_t),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.offences_t) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 15
  else if (type == "other_fenc") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.other_fenc),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(crimes, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("ke_crime").innerHTML = `${crimeValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="ke_crime">${crimeValue} Cases</h6>` +
        (props
          ? "<b>" +
            "County: " +
            props.ADM1_EN +
            "</b><br />" +
            toInteger(props.other_fenc) +
            " Cases"
          : "Hover over a county!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 16
}
// end of visualize function

// Functionality to change map on different crime selection
let form = document.getElementById("selectForm");
form.onsubmit = function (e) {
  e.preventDefault();
  var selected = document.getElementById("selection_form");
  var value = selected.options[selected.selectedIndex].value;
  switch (value) {
    case "Homicide":
      visualizeMap("Homicide", value);
      break;
    case "morality_o":
      visualizeMap("Immorality", value);
      break;
    case "robbery":
      visualizeMap("Robbery", value);
      break;
    case "breakings":
      visualizeMap("Breakings", value);
      break;
    case "stock_stef":
      visualizeMap("Theft of Stock", value);
      break;
    case "stealing":
      visualizeMap("Stealing", value);
      break;
    case "servant_th":
      visualizeMap("Theft By Servants", value);
      break;
    case "gta":
      visualizeMap("Vehicle Theft", value);
      break;
    case "drugs":
      visualizeMap("Drug Trafficking", value);
      break;
    case "traffic_of":
      visualizeMap("Traffic Offences", value);
      break;
    case "criminal_d":
      visualizeMap("Criminal Damage", value);
      break;
    case "economic_c":
      visualizeMap("Economy Crimes", value);
      break;
    case "corruption":
      visualizeMap("Corruption", value);
      break;
    case "Offences_l":
      visualizeMap("Offences Involving Police Offices", value);
      break;
    case "offences_t":
      visualizeMap("Offences Involving Tourists", value);
      break;
    case "other_fenc":
      visualizeMap("Other Penal Code Offences", value);
      break;
    default:
      visualizeMap("Homicide", "Homicide");
      break;
  }
};

// The start of the main code to be executed!
// START OF FUNCTION TO STYLE MAP LAYOUT
function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

// <!-- logic goes here -->

// var info = L.control();

// info.onAdd = function (map) {
//   this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
//   this.update();
//   return this._div;
// };
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    `<h6 id="ke_crime">Homicide Cases</h6>` +
    (props
      ? "<b>" +
        "County: " +
        props.ADM1_EN +
        "</b><br />" +
        toInteger(props.Homicide) +
        " Cases"
      : "Hover over a county!");
};

info.addTo(map);

function style(feature) {
  return {
    fillColor: getColor(feature.properties.Homicide),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  info.update(layer.feature.properties);
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
// open sidebar when one county is clicked
function openChartsForSingleCounty(e) {
  map.fitBounds(e.target.getBounds());
  // get map properties
  var countyName = e.target.feature.properties.ADM1_EN;
  // Preparing data for visualization
  var homicide = toInteger(e.target.feature.properties.Homicide);
  var immorality = toInteger(e.target.feature.properties.morality_o);
  var robbery = toInteger(e.target.feature.properties.robbery);
  var breakings = toInteger(e.target.feature.properties.breakings);
  var stock_theft = toInteger(e.target.feature.properties.stock_stef);
  var stealing = toInteger(e.target.feature.properties.stealing);
  var theft_by_servant = toInteger(e.target.feature.properties.servant_th);
  var vehicle_theft = toInteger(e.target.feature.properties.gta);
  var drug_traficking = toInteger(e.target.feature.properties.drugs);
  var traffic = toInteger(e.target.feature.properties.traffic_of);
  var criminal_damage = toInteger(e.target.feature.properties.criminal_d);
  var economy_crimes = toInteger(e.target.feature.properties.economic_c);
  var corruption = toInteger(e.target.feature.properties.corruption);
  var police_offences = toInteger(e.target.feature.properties.Offences_l);
  var tourist_offences = toInteger(e.target.feature.properties.offences_t);
  var penal_codes = toInteger(e.target.feature.properties.other_fenc);
  // creating a data table
  var dataTable = [
    ["Type of Crime", "Recorded Cases"],
    ["Homicide", homicide],
    ["Immorality Offences", immorality],
    ["Robbery", robbery],
    ["Breakings", breakings],
    ["Stock Theft", stock_theft],
    ["Stealing", stealing],
    ["Theft By Servants", theft_by_servant],
    ["Vehicle Theft", vehicle_theft],
    ["Drug Trafficking", drug_traficking],
    ["Traffic Offences", traffic],
    ["Criminal Damages", criminal_damage],
    ["Economy Crimes", economy_crimes],
    ["Corruption", corruption],
    ["Offences by Police Officers", police_offences],
    ["Offences by Tourists", tourist_offences],
    ["Penal Code Offences", penal_codes],
  ];
  // Start of data rendering
  document.getElementById(
    "county"
  ).innerHTML = `Data Visualization For: ${countyName} County Yr 2015.`;
  // Plotting charts before opening sidebar
  drawBarChart(dataTable);
  drawPieChart(dataTable);
  drawDoughnutChart(dataTable);
  document.querySelector(".sidebar").style.width = "520px";
  document.querySelector(".sidebar").style.transition =
    "width 200ms ease-in-out";
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: openChartsForSingleCounty,
  });
}
var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [];
  div.innerHTML += '<h6 style="text-align:center;margin:0;">Crime Cases</h6>';

  // loop through our unemployment intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+" + "<br>");
  }
  div.innerHTML += "<p><i style=background:#ae017e></i>No Data</p>";
  return div;
};

legend.addTo(map);

geojson = L.geoJson(crimes, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);
// END OF FUNCTION TO STYLE MAP LAYOUT

// close sidebar
function closeSidebar() {
  document.querySelector(".sidebar").style.width = "0";
  document.querySelector(".sidebar").style.transition =
    "width 200ms ease-in-out";
}

function drawBarChart(dataTable) {
  var data = new google.visualization.arrayToDataTable(dataTable);
  var options = {
    title: "Crime Mapping",
    width: 500,
    height: 500,
    legend: { position: "none" },
    animation: {
      duration: 1000,
      easing: "inAndOut",
    },
    chart: {
      title: "Crime Mapping BarChart",
      subtitle: "Distribution of Crimes in Kenya",
    },
    bars: "horizontal", // Required for Material Bar Charts.
    colors: ["red", "#004411"],
    axes: {
      x: {
        0: { side: "top", label: "Cases" }, // Top x-axis.
      },
    },
    bar: { groupWidth: "90%" },
  };

  var chart = new google.charts.Bar(document.getElementById("top_x_div"));
  chart.draw(data, options);
}
function drawPieChart(dataTable) {
  var data = google.visualization.arrayToDataTable(dataTable);
  var options = {
    title: "Pie Chart",
    width: 500,
    height: 500,
    animation: {
      duration: 1000,
      easing: "inAndOut",
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
function drawDoughnutChart(dataTable) {
  var data = google.visualization.arrayToDataTable(dataTable);
  var options = {
    title: "Doughnut Chart",
    pieHole: 0.4,
    width: 500,
    height: 500,
    animation: {
      duration: 1000,
      easing: "inAndOut",
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}
function reload() {
  return window.location.reload();
}
