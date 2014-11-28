
$(document).ready(function () {


	var map = L.map('map').setView([43.4180,-89.7297], 13);

	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.2yxv8n84,nps.jhd2e8lb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);


});

//https://a.tiles.mapbox.com/v4/nps.2yxv8n84,nps.jhd2e8lb/5/6/12.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6IkdfeS1OY1UifQ.K8Qn5ojTw4RV1GwBlsci-Q