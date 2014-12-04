
var map;
var layers;


$(document).ready(function () {

	map = L.map('map', {
		zoomControl: false
	}).setView([43.4180,-89.7297], 14);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

	// hillshade
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a6be40f0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);
	// park boundaries
	L.tileLayer('data/custom-tiles/parksBoundaries/{z}/{x}/{y}.png').addTo(map);
	//water
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a706dc69/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);
	// roads, trails
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.8eb491cc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);
	// labels
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.5dfeaf68/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	var basemaps = {};
	layers = {};


	$(document).on("layeradd", function (e, layer, layerName) {
		$("#legendContent").append("<div class='legendItem'><input type='checkbox' class='legendCheckbox' value='" + layerName + "' checked>" + layerName + "</div>");
	});

	$(document).on("change", ".legendCheckbox", function (e) {
		if($(this).prop("checked"))
		{
			var layerName = $(this).val();
			map.addLayer(layers[layerName]);
		}
		else
		{
			var layerName = $(this).val();
			map.removeLayer(layers[layerName]);
		}
	});

	// add all our data

	//////////////
	// Polygons //
	//////////////

	$.getJSON("data/buildings.json", function (data) {
		var style = {
			"color": "#7e7e7e",
		    "weight": 0,
		    "opacity": 0.9
		};
		layers["Buildings"] = L.geoJson(data, {
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Buildings"], "Buildings"]);
	});

	$.getJSON("data/campsites.json", function (data) {
		var style = {
			"color": "#333333",
		    "weight": 0,
		    "opacity": 0.3
		};
		layers["Campsites"] = L.geoJson(data, { 
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Campsites"], "Campsites"]);
	});

/*
	$.getJSON("data/bluffs.json", function (data) {
		var style = {
			"color": "#000000",
		    "weight": 0,
		    "opacity": 0.65
		};
		layers["Bluffs"] = L.geoJson(data, { 
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Bluffs"], "Bluffs"]);
	});
*/

	////////////
	// Points //
	////////////

	$.getJSON("data/boatLaunch.json", function (data) {
		layers["Boat Launches"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "boatLaunches",
					//html: "<img src='img/historical-points.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Boat Launches"], "Boat Launches"]);
	});

	$.getJSON("data/historicalPoints.json", function (data) {
		layers["Historical Points"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "historicalPoints",
					//html: "<img src='img/historical-points.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br>" + feature.properties.Description + "</center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Historical Points"], "Historical Points"]);
	});

	$.getJSON("data/pointsOfInterest.json", function (data) {
		layers["Points of Interest"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "pointsOfInterest",
					html: "<img src='img/points-of-interest.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Points of Interest"], "Points of Interest"]);
	});

	$.getJSON("data/campsiteCenterpoints.json", function (data) {
		layers["Campsite Centerpoints"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "campsiteCenterpoints",
					html: "<img src='img/campsites.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Campsite Centerpoints"], "Campsite Centerpoints"]);
	});

	$.getJSON("data/shelters.json", function (data) {
		layers["Shelters"]= L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "shelters",
					html: "<img src='img/shelters.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Shelters"], "Shelters"]);
	});

	$.getJSON("data/parkingLots.json", function (data) {
		layers["Parking Lots"]= L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "parkingLots",
					//html: "<img src='img/shelters.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Parking Lots"], "Parking Lots"]);
	});

	$.getJSON("data/restrooms.json", function (data) {
		layers["Restrooms"]= L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "restrooms",
					//html: "<img src='img/shelters.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Restrooms"], "Restrooms"]);
	});

	///////////////
	// Polylines //
	///////////////

	$.getJSON("data/trails.json", function (data) {

		var style = {
			"color": "#856363",
		    "weight": 0.75,
		    "opacity": 0.65
		};
		layers["Trails"] = L.geoJson(data, {
			className: "trails",
			style: style,
			onEachFeature: function (feature, layer) {
				if(feature.properties.name != null)
				{
					layer.bindPopup("<center><h3>" + feature.properties.name + "</center></h3>");
				}
			}
		}).addTo(map);

	}).complete(function() {
		$(document).trigger("layeradd", [layers["Trails"], "Trails"]);
	});



	$(document).on("click","#legendChevron.fa-chevron-down", function () {
		$("#legendContent").show();
		$("#legendChevron.fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	});

	$(document).on("click","#legendChevron.fa-chevron-up", function () {
		$("#legendContent").hide();
		$("#legendChevron.fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	});

});
