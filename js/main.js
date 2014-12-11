
var map, layers, basemaps;
var infoBarSlideNumber = 0;


$(document).ready(function () {

	// append the contents of our first slide
	$("#barHeader").html(slides[0].title);
	$("#barBody").html(slides[0].body);

	// default bounding box of the initial view of the map
	var defaultBbox = [[43.4375580436,-89.7041416168],[43.4023037086,-89.758644104]];

	map = L.map('map', {
		zoomControl: false,
		maxBounds: [[43.45503732537239,-89.6070671081543], [43.37311218382002,-89.8267936706543]]
	}).setView([43.4180,-89.7297], 15);

	map.fitBounds(defaultBbox);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

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

	$(document).on("slideChange", function (e, slideId) {

		$.each(layers, function (key, value)
		{
			map.removeLayer(layers[key]);
		});

		$(".legendItem").hide();

		// to do: zoom out to bounding box

		switch (slideId) {

			case "welcome":
				map.fitBounds(defaultBbox);

				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Campsites"].addTo(map);
					$(".legendItem[name='Campsite Centerpoints']").show();

				layers["Campsite Centerpoints"].addTo(map);

				layers["Restrooms"].addTo(map);
					$(".legendItem[name='Restrooms']").show();

				layers["Shelters"].addTo(map);
					$(".legendItem[name='Shelters']").show();

				layers["Buildings"].addTo(map);
					$(".legendItem[name='Buildings']").show();

				layers["Parking Lots"].addTo(map);
				layers["Parking Lot Polygons"].addTo(map);
					$(".legendItem[name='Parking Lots']").show();

			break;

			case "history":
				map.fitBounds(defaultBbox);

				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Buildings"].addTo(map);
					$(".legendItem[name='Buildings']").show();

				layers["Parking Lots"].addTo(map);
					$(".legendItem[name='Parking Lots']").show();

				layers["Historical Points"].addTo(map);
					$(".legendItem[name='Historical Points']").show();
			break;

			case "nativeamerican":
				map.fitBounds(defaultBbox);

				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Native American Mounds"].addTo(map);
					$(".legendItem[name='Native American Mounds']").show();
			break;
			
			case "geology":
				map.fitBounds(defaultBbox);

				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
					$(".legendItem[name='Trails']").show();

				layers["Points of Interest"].addTo(map);
			break;

			case "trails":
				map.fitBounds(defaultBbox);
				// to do: style trails differently - make more prominent, add labels at higher zoom
				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
					$(".legendItem[name='Trails']").show();
			break;

			case "fishing":
				map.fitBounds([[43.4277100925, -89.7249126434],[43.4077287885, -89.7392463684]]);

				layers["Boat Launches"].addTo(map);
					$(".legendItem[name='Boat Launches']").show();

				layers["Bathymetry"].addTo(map);

				
			break;

			case "plantsAnimals":

				layers["Trails"].addTo(map);
				layers["Trails Hover"].addTo(map);
						$(".legendItem[name='Trails']").show();

				layers["Oak Forest"].addTo(map);
				layers["East Bluff"].addTo(map);
				layers["Parfreys Glen"].addTo(map);
				layers["South Bluff Devils Nose"].addTo(map);


			break;

		}
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

	//////////////////////
	// add all our data //
	//////////////////////

		////////////////////////////
		// Basemaps / Tile Layers // 
		////////////////////////////

		basemaps = {
			"hillshade": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a6be40f0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw'),
			"alternateHillshade": L.esri.tiledMapLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer').setOpacity(0.3).addTo(map),
			"parks boundaries": L.tileLayer('data/custom-tiles/parksBoundaries/{z}/{x}/{y}.png', {
					bounds: [[43.3843,-89.7729],[43.4482,-89.65]]
				}).addTo(map),
			"water": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.a706dc69/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map),
			"roads": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.8eb491cc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').setOpacity(0.8).addTo(map),
			"labels": L.tileLayer('https://a.tiles.mapbox.com/v4/nps.5dfeaf68/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map)
		};

		// populated below
		layers = {};

		////////////////////////
		// Overlays: Polygons //
		////////////////////////

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

		$.getJSON("data/parkingLotPolygons.json", function (data) {
			var style = {
				"color": "#fff",
			    "weight": 0,
			    "fillOpacity": 0.3
			};
			layers["Parking Lot Polygons"] = L.geoJson(data, {
				style: style,
				onEachFeature: function (feature, layer) {
					layer.setStyle({clickable: false})
				}
			}).addTo(map);
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Parking Lot Polygons"], "Parking Lot Polygons", false]);
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

		$.getJSON("data/areas/devilsLakeOakForest.json", function (data) {
			var style = {
				"color": "#7e7e7e",
			    "weight": 0,
			    "fillOpacity": 0.5
			};
			layers["Oak Forest"] = L.geoJson(data, {
				style: style,
				onEachFeature: function (feature, layer) {
					layer.setStyle({clickable: false})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Oak Forest"], "Oak Forest", false]);
		});

		$.getJSON("data/areas/eastBluff.json", function (data) {
			var style = {
				"color": "#7e7e7e",
			    "weight": 0,
			    "fillOpacity": 0.5
			};
			layers["East Bluff"] = L.geoJson(data, {
				style: style,
				onEachFeature: function (feature, layer) {
					layer.setStyle({clickable: false})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["East Bluff"], "East Bluff", false]);
		});

		$.getJSON("data/areas/parfreysGlen.json", function (data) {
			var style = {
				"color": "#7e7e7e",
			    "weight": 0,
			    "fillOpacity": 0.5
			};
			layers["Parfreys Glen"] = L.geoJson(data, {
				style: style,
				onEachFeature: function (feature, layer) {
					layer.setStyle({clickable: false})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Parfreys Glen"], "Parfreys Glen", false]);
		});

		$.getJSON("data/areas/southBluffDevilsNose.json", function (data) {
			var style = {
				"color": "#7e7e7e",
			    "weight": 0,
			    "fillOpacity": 0.5
			};
			layers["South Bluff Devils Nose"] = L.geoJson(data, {
				style: style,
				onEachFeature: function (feature, layer) {
					layer.setStyle({clickable: false})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["South Bluff Devils Nose"], "South Bluff Devils Nose", false]);
		});

		//////////////////////
		// Overlays: Points //
		//////////////////////

		$.getJSON("data/boatLaunch.json", function (data) {
			layers["Boat Launches"] = L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					var marker = L.divIcon({
						className: "boatLaunches",
						html: "<img src='img/boat-launch.svg'>" // I do think these should be static sizes---the vh makes them too responsive + small on other screens. can edit in CSS>
					});
					return L.marker(latlng, {
						icon: marker,
						clickable: false
					})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Boat Launches"], "Boat Launches", true, 'img/boat-launch.svg']);
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
					layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br>" + feature.properties.Description + "</center>");
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Historical Points"], "Historical Points", true, 'img/historical-points.svg']);
		});

		$.getJSON("data/mounds.json", function (data) {
			layers["Native American Mounds"] = L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					var marker = L.divIcon({
						className: "mounds",
						html: "<img src='img/mound.svg'>"
					});
					return L.marker(latlng, {
						icon: marker
					})
				},
				onEachFeature: function(feature, layer) {
					layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br>" + feature.properties.Description + "</center>");
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Native American Mounds"], "Native American Mounds", true, 'img/historical-points.svg']);
		});

		$.getJSON("data/pointsOfInterest.json", function (data) {
			layers["Points of Interest"] = L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					var marker = L.divIcon({
						className: "pointsOfInterest",
						html: "<img src='img/points-of-interest.svg'>"
					});
					return L.marker(latlng, {
						icon: marker
					})
				},
				onEachFeature: function(feature, layer) {
					layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Points of Interest"], "Points of Interest", true, 'img/points-of-interest.svg']);
		});

		$.getJSON("data/campsiteCenterpoints.json", function (data) {
			layers["Campsite Centerpoints"] = L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					var marker = L.divIcon({
						className: "campsiteCenterpoints",
						html: "<img src='img/campsites.svg'>"
					});
					return L.marker(latlng, {
						icon: marker
					})
				},
				onEachFeature: function(feature, layer) {
					layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Campsite Centerpoints"], "Campsite Centerpoints", true, 'img/campsites.svg']);
		});

		$.getJSON("data/shelters.json", function (data) {
			layers["Shelters"]= L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					var marker = L.divIcon({
						className: "shelters",
						html: "<img src='img/shelter-1.svg'>"
					});
					return L.marker(latlng, {
						icon: marker, 
						clickable: false
					})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Shelters"], "Shelters", true, 'img/shelter-1.svg']);
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
						html: "<img src='img/restrooms.svg'>"
					});
					return L.marker(latlng, {
						icon: marker, 
						clickable: false
					})
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Restrooms"], "Restrooms", true, 'img/restrooms.svg']);
		});

		/////////////////////////
		// Overlays: Polylines //
		/////////////////////////

		var defaultTrailsStyle = {
				"color": "#856363",
			    "weight": 0.9,
			    "opacity": 0.65
			};

		var highlightedTrailsStyle = {
			"color": "#856363",
		    "weight": 1.5,
		    "opacity": 0.65
		}

		$.getJSON("data/trails.json", function (data) {

			layers["Trails"] = L.geoJson(data, {
				style: defaultTrailsStyle
			});

			style = {
				"color": "#856363",
			    "weight": 25,
			    "opacity": 0.01
			};
			layers["Trails Hover"] = L.geoJson(data, {
				className: "trails",
				style: style,
				onEachFeature: function (feature, layer) {
					if(feature.properties.name != null)
					{
						layer.bindPopup("<center><h3>" + feature.properties.name + "</center></h3>");
					}
				}
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Trails"], "Trails", true, "img/trail-curvy.svg"]);
		});

		$.getJSON("data/bathymetry.json", function (data) {

			var style = {
				"color": "#90CAF9",
			    "weight": 0.9,
			    "opacity": 0.65
			}

			layers["Bathymetry"] = L.geoJson(data, {
				className: "bathymetry",
				style: style
			});
		}).complete(function() {
			$(document).trigger("layeradd", [layers["Bathymetry"], "Bathymetry", false]);
		});


});

$(window).load(function() {
	$(document).trigger("slideChange", "welcome");
});
