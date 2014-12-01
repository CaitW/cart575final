
var map;
var layers;


$(document).ready(function () {

	map = L.map('map').setView([43.4180,-89.7297], 14);

	L.Icon.Default.imagePath = "img";

	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.2yxv8n84,nps.jhd2e8lb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	layers = {
		buildings: L.geoJson(),
		campsites: L.geoJson(),
		historicalPoints: L.geoJson(),
		pointsOfInterest: L.geoJson(),
		shelters: L.geoJson(),
		trails: L.geoJson()
	};

	$.each(layers, function (index) {
		layers[index].addTo(map);
	});

	// add all our data

	$.getJSON("data/buildings.json", function (data) {
		layers.buildings.addData(data);
	});

	$.getJSON("data/campsites.json", function (data) {
		layers.campsites.addData(data);
	});

	$.getJSON("data/historicalPoints.json", function (data) {
		layers.historicalPoints.addData(data);
	});

	$.getJSON("data/pointsOfInterest.json", function (data) {
		layers.pointsOfInterest.addData(data);
	});

	$.getJSON("data/shelters.json", function (data) {
		layers.shelters.addData(data);
	});

	$.getJSON("data/trails.json", function (data) {
		layers.trails.addData(data);
	});


});
