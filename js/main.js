
var map;
var layers;


$(document).ready(function () {

	map = L.map('map', {
		zoomControl: false
	}).setView([43.4180,-89.7297], 14);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.2yxv8n84,nps.jhd2e8lb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	layers = {};

	// add all our data

	$.getJSON("data/buildings.json", function (data) {
		var style = {
			"color": "#ff7800",
		    "weight": 5,
		    "opacity": 0.65
		};
		layers["Buildings"] = L.geoJson(data, {
			style: style
		}).addTo(map);
	});

	$.getJSON("data/campsites.json", function (data) {
		var style = {
			"color": "#cccccc",
		    "weight": 5,
		    "opacity": 0.65
		};
		layers["Campsites"] = L.geoJson(data, { 
			style: style
		}).addTo(map);
	});

	$.getJSON("data/historicalPoints.json", function (data) {
		layers["Historical Points"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "historicalPoints"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup(feature.properties.Name + "<br>" + feature.properties.Description);
			}
		}).addTo(map);
	});

	$.getJSON("data/pointsOfInterest.json", function (data) {
		layers["Points of Interest"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "pointsOfInterest"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup(feature.properties.Name);
			}
		}).addTo(map);
	});

	$.getJSON("data/shelters.json", function (data) {
		layers["Shelters"]= L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "shelters"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	});

	$.getJSON("data/trails.json", function (data) {
		var style = {
			"color": "#ff7800",
		    "weight": 5,
		    "opacity": 0.65
		};
		layers["Trails"] = L.geoJson(data, {
			className: "trails",
			style: style
		}).addTo(map);
	}).complete(function(){
		// create the legend once we've gotten all our JSON items 
		// need better solution for this
		$.each(layers, function (index)
		{
			$("#legendContent").append("<div class='legendItem'><input type='checkbox' class='legendCheckbox'>" + index + "</div>");
		});
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
