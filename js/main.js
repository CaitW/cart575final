
$(document).ready(function () {


	var map = L.map('map').setView([43.4180,-89.7297], 13);

	L.tileLayer('data/tileserver/tiles/{z}/{x}/{y}.png').addTo(map);


});