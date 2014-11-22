
$(document).ready(function () {


	var map = L.map('map').setView([43.4149, -89.7262], 14);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);


});