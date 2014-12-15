/*

/////////////////////////////////////
// The Devil's Lake State Park Map //
// Cartography 575 Final Project   //
// Completed December 2014         //
/////////////////////////////////////

Contributors:

	Caitlin Wolters - coding, design, custom tiles - wolters.caitlin@gmail.com

	Natalie Amend - design

	Jaron McCallum - content

*/


var map, layers, basemaps;

$(document).ready(function () {

	////////////////////////
	// Map Initialization //
	//////////////////////// 

	// default bounding box of the initial view of the map
	var defaultBbox = [[43.43,-89.71],[43.405,-89.75]];

	map = L.map('map', {
		zoomControl: false,
		maxBounds: [[43.48503732537239,-89.6070671081543], [43.37311218382002,-89.8267936706543]],
		minZoom: 13
	}).setView([43.4180,-89.7297], 14);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

	///////////////
	// Functions //
	///////////////

	function openLegend() {
		$("#legendContent").show();
		$("#legendChevron.fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	}

	function closeLegend() {
		$("#legendContent").hide();
		$("#legendChevron.fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	}

	/////////////////////
	// Event Listeners //
	/////////////////////

	$(document).on("layeradd", function (e, layer, layerName, addToLegend, layerIcon) {

		if(addToLegend == true)
		{
			if(layerIcon)
			{
				$("#legendContent").append("<div class='legendItem' name='" + layerName + "'><img src='" + layerIcon + "'>" + layerName + "</div>");
			}
			else
			{
				$("#legendContent").append("<div class='legendItem'>" + layerName + "</div>");
			}
			
		}
	});

	$(document).on("slideChange", function (e, slideId, slideNumber) {

		$("#barBody").toggle("slide", "left", 100);

		$("#barHeader, #barBody").promise().done(function () {
			$("#barBody").html(slides[slideNumber].body);
			$("#barHeader, #barBody").effect("slide", {direction: "right", mode:"show"}, 200);
		});

		$.each(layers, function (key, value)
		{
			map.removeLayer(layers[key]);
		});

		$(".legendItem").hide();

		// to do: zoom out to bounding box

		switch (slideId) {

			case "home":

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");

				map.fitBounds(defaultBbox);

				map.removeLayer(basemaps["trail labels"]);

				basemaps.bathymetry.setOpacity(0.3);
				basemaps.trails.setOpacity(0.5);

				layers["Trails"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Campsites"].addTo(map);
					
				layers["Campgrounds"].addTo(map);
					$(".legendItem[name='Campgrounds']").show();

				layers["Restrooms"].addTo(map);
					$(".legendItem[name='Restrooms']").show();

				layers["Shelters"].addTo(map);
					$(".legendItem[name='Shelters']").show();

				layers["Buildings"].addTo(map);
					$(".legendItem[name='Buildings']").show();

				layers["Parking Lots"].addTo(map);
					$(".legendItem[name='Parking Lots']").show();

			break;

			case "history":

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");

				map.fitBounds(defaultBbox);

				map.removeLayer(basemaps["trail labels"]);

				basemaps.trails.setOpacity(0.5);
				basemaps.bathymetry.setOpacity(0.3);

				layers["Trails"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Buildings"].addTo(map);
					$(".legendItem[name='Buildings']").show();

				layers["Historical Points"].addTo(map);
					$(".legendItem[name='Historical Points']").show();

				$(".")
			break;

			case "nativeamerican":

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");

				map.removeLayer(basemaps["trail labels"]);

				map.fitBounds(defaultBbox);

				basemaps.trails.setOpacity(0.5);
				basemaps.bathymetry.setOpacity(0.3);

				layers["Trails"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Native American Mounds"].addTo(map);
					$(".legendItem[name='Native American Mounds']").show();
			break;
			
			case "geology":

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");

				map.fitBounds(defaultBbox);

				map.removeLayer(basemaps["trail labels"]);

				basemaps.trails.setOpacity(0.5);
				basemaps.bathymetry.setOpacity(0.3);

				layers["Trails"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Points of Interest"].addTo(map);
					$(".legendItem[name='Points of Interest']").show();
			break;

			case "trails":

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");
				
				map.fitBounds(defaultBbox);
				
				basemaps["trail labels"].addTo(map);
				basemaps.trails.setOpacity(1);
				map.removeLayer(basemaps["bluff labels"]);
				basemaps.bathymetry.setOpacity(0.3);

				layers["Trails"].addTo(map);
					$(".legendItem[name='Trails']").show();

			break;

			case "fishing":

				map.removeLayer(basemaps["trail labels"]);

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");

				basemaps.trails.setOpacity(0.5);
				basemaps.bathymetry.setOpacity(0.8);

				map.fitBounds([[43.4277100925, -89.7249126434],[43.4077287885, -89.7392463684]]);

				layers["Boat Launches"].addTo(map);
					$(".legendItem[name='Boat Launches']").show();

				$(".legendItem[name='Bathymetry']").show();

				
			break;

			case "explore":

				map.removeLayer(basemaps["trail labels"]);

				$(".legendItem").removeClass("selected");
				$(".legendItem").removeClass("disabled");
				$(".legendItem").addClass("disabled");

				openLegend();

				map.fitBounds(defaultBbox);
				basemaps.trails.setOpacity(0.5);
				basemaps.bathymetry.setOpacity(0.3);

				layers["Campsites"].addTo(map);

				layers["Trails"].addTo(map);

				$(".legendItem[name='Campgrounds']").show();

				$(".legendItem[name='Restrooms']").show();

				$(".legendItem[name='Shelters']").show();

				$(".legendItem[name='Buildings']").show();

				$(".legendItem[name='Parking Lots']").show();

				$(".legendItem[name='Boat Launches']").show();

				$(".legendItem[name='Points of Interest']").show();

				$(".legendItem[name='Historical Points']").show();

			break;

		}
	});

	$(document).on("click","#legendChevron.fa-chevron-down", openLegend);

	$(document).on("click","#legendChevron.fa-chevron-up", closeLegend);

	$(document).on("click", "#barHeader li a", function (e) {

		e.preventDefault();

		$("li.selected").removeClass("selected");

		$(this).parent().addClass("selected");

		var slideId = $(this).attr("data-slide-id");

		// find our slide based on the id
		for(var x = 0; x < slides.length; x++)
		{
			if (slides[x].id == slideId)
			{
				$(document).trigger("slideChange", [slideId, x]);
			}
		}
	});

	$(document).on("click", ".legendItem.selected", function (e) {
		$(this).removeClass("selected").addClass("disabled");
		var layerToTurnOff = $(this).attr("name");
		map.removeLayer(layers[layerToTurnOff]);
	});

	$(document).on("click", ".legendItem.disabled", function (e) {
		$(this).removeClass("disabled").addClass("selected");
		var layerToTurnOn = $(this).attr("name");
		map.addLayer(layers[layerToTurnOn]);
	});


	//////////////////////
	// add all our data //
	//////////////////////

		////////////////////////////
		// Basemaps / Tile Layers // 
		////////////////////////////
		// {
			basemaps = {
				"hillshade": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a6be40f0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw'),
				"alternateHillshade": L.esri.tiledMapLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer').setOpacity(0.3).addTo(map),
				"parks boundaries": L.tileLayer('data/custom-tiles/boundaries/{z}/{x}/{y}.png', {
					bounds: [[43.3377,-89.8235],[43.4741,-89.5952]]
				}).setOpacity(0.4).addTo(map),
				"water": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a706dc69/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map),
				"roads": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.8eb491cc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').setOpacity(0.8).addTo(map),
				"trails": L.tileLayer('data/custom-tiles/trails/{z}/{x}/{y}.png', {
					bounds: [[43.3377,-89.8235],[43.4741,-89.5952]]
				}).setOpacity(0.5).addTo(map),
				"bluff labels": L.tileLayer('data/custom-tiles/bluffLabels/{z}/{x}/{y}.png').addTo(map),
				"trail labels": L.tileLayer('data/custom-tiles/trail-labels/{z}/{x}/{y}.png', {
					bounds: [[43.3620,-89.782],[43.4531,-89.599]]
				}).setOpacity(0.7),
				"labels": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.5dfeaf68/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map),
				"bathymetry": L.tileLayer('data/custom-tiles/bathymetry/{z}/{x}/{y}.png', {
					bounds: [[43.4082,-89.7383],[43.4266,-89.7254]]
				}).setOpacity(0.3).addTo(map)
			};

			// populated below
			layers = {};
		// }

		////////////////////////
		// Overlays: Polygons //
		////////////////////////
		// {

			$.getJSON("data/buildings.json", function (data) {
				var style = {
					"color": "#7e7e7e",
				    "weight": 0,
				    "fillOpacity": 0.5
				};
				layers["Buildings"] = L.geoJson(data, {
					style: style,
					onEachFeature: function (feature, layer) {
						layer.setStyle({clickable: false})
					}
				}).addTo(map);
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Buildings"], "Buildings", true, "img/buildings.svg"]);
			});

			$.getJSON("data/campsiteOutlines.json", function (data) {
				var style = {
					"color": "#333333",
				    "weight": 0,
				    "opacity": 0.3
				};
				layers["Campsites"] = L.geoJson(data, { 
					style: style,
					onEachFeature: function (feature, layer) {
						layer.setStyle({clickable: false})
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Campsites"], "Campsites", false]);
			});
		// }

		//////////////////////
		// Overlays: Points //
		//////////////////////
		// {

			$.getJSON("data/boatLaunch.json", function (data) {
				layers["Boat Launches"] = L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "boatLaunches",
							html: "<img src='img/boat-launch-NPS.svg'>" // I do think these should be static sizes---the vh makes them too responsive + small on other screens. can edit in CSS>
						});
						return L.marker(latlng, {
							icon: marker
						})
					},
					onEachFeature: function(feature, layer) {
						layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Boat Launches"], "Boat Launches", true, 'img/boat-launch-NPS.svg']);
			});

			$.getJSON("data/historicalPoints.json", function (data) {
				layers["Historical Points"] = L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "historicalPoints",
							//html: "<img src='img/historical-points.svg'>"
						});
						return L.marker(latlng, {
							icon: marker
						})
					},
					onEachFeature: function(feature, layer) {
						if(feature.properties.Name != null)
						{
							if(feature.properties.image)
							{
								if(feature.properties.Description)
								{
									layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='description'>" + feature.properties.Description + "</div><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
								}
								else
								{
									layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
								}
								
							}
							else
							{
								if(feature.properties.Description)
								{
									layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='description'>" + feature.properties.Description + "</div></center>");
								}
								else
								{
									layer.bindPopup("<center><h3>" + feature.properties.Name + "</center></h3>");
								}
								
							}
						}
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Historical Points"], "Historical Points", true, 'img/old/historical-points.svg']);
			});

			$.getJSON("data/mounds.json", function (data) {
				layers["Native American Mounds"] = L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "mounds",
							html: "<img src='img/mounds-NPSish.svg'>"
						});
						return L.marker(latlng, {
							icon: marker
						})
					},
					onEachFeature: function(feature, layer) {
						layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br>" + feature.properties.Description + "<div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Native American Mounds"], "Native American Mounds", true, 'img/mounds-NPSish.svg']);
			});

			$.getJSON("data/pointsOfInterest.json", function (data) {
				layers["Points of Interest"] = L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "pointsOfInterest",
							html: "<img src='img/geology-NPS.svg'>"
						});
						return L.marker(latlng, {
							icon: marker
						})
					},
					onEachFeature: function(feature, layer) {
						layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Points of Interest"], "Points of Interest", true, 'img/geology-NPS.svg']);
			});

			$.getJSON("data/campsiteCenterpoints.json", function (data) {
				layers["Campgrounds"] = L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "campsiteCenterpoints",
							html: "<img src='img/campsites-NPS.svg'>"
						});
						return L.marker(latlng, {
							icon: marker
						})
					},
					onEachFeature: function(feature, layer) {
						layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br><div class='popupImage'><img src='" + feature.properties.image + "'</div></center>");
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Campgrounds"], "Campgrounds", true, 'img/campsites-NPS.svg']);
			});

			$.getJSON("data/shelters.json", function (data) {
				layers["Shelters"]= L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "shelters",
							html: "<img src='img/shelters-1-NPS.svg'>"
						});
						return L.marker(latlng, {
							icon: marker, 
							clickable: false
						})
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Shelters"], "Shelters", true, 'img/shelters-1-NPS.svg']);
			});

			$.getJSON("data/parkingLots.json", function (data) {
				layers["Parking Lots"]= L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "parkingLots",
							//html: "<img src='img/'>"
						});
						return L.marker(latlng, {
							icon: marker
						})
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Parking Lots"], "Parking Lots", true]);
			});

			$.getJSON("data/restrooms.json", function (data) {
				layers["Restrooms"]= L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var marker = L.divIcon({
							className: "restrooms",
							html: "<img src='img/restrooms-NPS.svg'>"
						});
						return L.marker(latlng, {
							icon: marker, 
							clickable: false
						})
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Restrooms"], "Restrooms", true, 'img/restrooms-NPS.svg']);
			});

		// }

		/////////////////////////
		// Overlays: Polylines //
		/////////////////////////
		// {

			// these are actually not visible, but just provide clicking functionality
			$.getJSON("data/trails.json", function (data) {

				style = {
					"color": "#856363",
				    "weight": 25,
				    "opacity": 0.01
				};
				layers["Trails"] = L.geoJson(data, {
					className: "trails",
					style: style,
					onEachFeature: function (feature, layer) {
						if(feature.properties.name != null)
						{
							if(feature.properties.image)
							{
								if(feature.properties.Description)
								{
									layer.bindPopup("<center><h3>" + feature.properties.name + "</h3><br><h4>" + feature.properties.Difficulty + "</h4><br><div class='description'>" + feature.properties.Description + "</div><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
								}
								else
								{
									layer.bindPopup("<center><h3>" + feature.properties.name + "</h3><br><div class='popupImage'><img src='" + feature.properties.image + "'></div></center>");
								}
								
							}
							else
							{
								if(feature.properties.Description)
								{
									layer.bindPopup("<center><h3>" + feature.properties.name + "</h3><br><h4>" + feature.properties.Difficulty + "</h4></center>");
								}
								else
								{
									layer.bindPopup("<center><h3>" + feature.properties.name + "</center></h3>");
								}
								
							}
						}
					}
				});
			}).complete(function() {
				$(document).trigger("layeradd", [layers["Trails"], "Trails", true, "img/trail-curvy.svg"]);
			});

		// }

});

$(window).load(function() {
	$("a[data-slide-id='home']").click();
});
