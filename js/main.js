
var map;
var layers;
var infoBarSlideNumber = 0;


$(document).ready(function () {

	$("#barHeader").html(slides[0].title);
	$("#barBody").html(slides[0].body);

	var defaultBbox = [[43.4375580436,-89.7041416168],[43.4023037086,-89.758644104]];

	map = L.map('map', {
		zoomControl: false
	}).setView([43.4180,-89.7297], 14);

	map.fitBounds(defaultBbox);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

	// hillshade
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a6be40f0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	// alternative, more detailed hillshade. potential to add this when displaying geography layer
	//L.esri.tiledMapLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer').setOpacity(0.3).addTo(map);

	// park boundaries
	L.tileLayer('data/custom-tiles/parksBoundaries/{z}/{x}/{y}.png', {
		bounds: [[43.3434,-89.8143],[43.4838,-89.5938]]
	}).addTo(map);

	//water
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a706dc69/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);
	// roads, trails
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.8eb491cc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').setOpacity(0.8).addTo(map);
	// labels
	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.5dfeaf68/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	var basemaps = {};
	layers = {};


	$(document).on("layeradd", function (e, layer, layerName) {
		$("#legendContent").append("<div class='legendItem'><input type='checkbox' class='legendCheckbox' value='" + layerName + "' checked>" + layerName + "</div>");
	});

	$(document).on("slideChange", function (e, slideId) {

		$.each(layers, function (key, value)
		{
			map.removeLayer(layers[key]);
		});

		// to do: zoom out to bounding box

		switch (slideId) {

			case "welcome":
				map.fitBounds(defaultBbox);
				layers["Trails"].addTo(map);
				layers["Campsites"].addTo(map);
				layers["Campsite Centerpoints"].addTo(map);
				layers["Restrooms"].addTo(map);
				layers["Shelters"].addTo(map);
				layers["Buildings"].addTo(map);
				layers["Boat Launches"].addTo(map);
				layers["Parking Lots"].addTo(map);
			break;

			case "history":
				map.fitBounds(defaultBbox);
				layers["Trails"].addTo(map);
				layers["Buildings"].addTo(map);
				layers["Parking Lots"].addTo(map);
				layers["Historical Points"].addTo(map);
			break;

			case "nativeamerican":
				map.fitBounds(defaultBbox);
				layers["Trails"].addTo(map);
			break;
			
			case "geology":
				map.fitBounds(defaultBbox);
				layers["Trails"].addTo(map);
				layers["Points of Interest"].addTo(map);
			break;

			case "trails":
				map.fitBounds(defaultBbox);
				// to do: style trails differently - make more prominent, add labels at higher zoom
				layers["Trails"].addTo(map);
			break;

			case "fishing":
				map.fitBounds(defaultBbox);
				layers["Boat Launches"].addTo(map);
				map.fitBounds([[43.4277100925, -89.7249126434],[43.4077287885, -89.7392463684]]);
			break;

		}


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
	// default layers added to map on load:
	// Trails, campsites, bathrooms, shelters, campsites, buildings, boat launches
	// layers not shown on load, but shown later:
	// points of interest (?), history points, mounds, bluffs

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

	$.getJSON("data/campsiteOutlines.json", function (data) {
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

	////////////
	// Points //
	////////////

	$.getJSON("data/boatLaunch.json", function (data) {
		layers["Boat Launches"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "boatLaunches",
					html: "<img src='img/boat-launch.svg'>"
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
		});
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
		});
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
					html: "<img src='img/shelter-1.svg'>"
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
					html: "<img src='img/restrooms.svg'>"
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
		    "weight": 0.9,
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

	$(document).on("click", "#rightScroll i", function () {
		
		infoBarSlideNumber++;

		if(infoBarSlideNumber == slides.length)
		{
			infoBarSlideNumber = 0;
		}


		$("#barHeader, #barBody").toggle("slide", "left", 100, function ()
			{
				
			});

		$("#barHeader, #barBody").promise().done(function () {
			$("#barHeader").html(slides[infoBarSlideNumber].title);
			$("#barBody").html(slides[infoBarSlideNumber].body);
			$("#barHeader, #barBody").effect("slide", {direction: "right", mode:"show"}, 200);
		});

		$(document).trigger("slideChange", [slides[infoBarSlideNumber].id]);

	});

	$(document).on("click", "#leftScroll i", function () {
		
		infoBarSlideNumber--;

		if(infoBarSlideNumber == -1)
		{
			infoBarSlideNumber = slides.length - 1;
		}


		$("#barHeader, #barBody").effect("slide", {direction: "right", mode:"hide"}, 100);


		$("#barHeader, #barBody").promise().done(function () {
			$("#barHeader").html(slides[infoBarSlideNumber].title);
			$("#barBody").html(slides[infoBarSlideNumber].body);
			$("#barHeader, #barBody").effect("slide", {direction: "left", mode:"show"}, 200);
		});

		$(document).trigger("slideChange", [slides[infoBarSlideNumber].id]);

	});


});
