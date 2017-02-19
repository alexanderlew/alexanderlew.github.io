
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

	// Hubway XML station feed
	var url = 'https://secure.thehubway.com/data/stations.json';

	$.getJSON(url).done(function(jsonData){
	 
	allData = jsonData.stations;
	console.log(allData);
	
	//Convert to numbers
	allData.forEach(function(data){
		data.la = +data.la;
		data.lo = +data.lo;
		data.ba = +data.ba;
		data.da = +data.da;	
	});

	document.getElementById("station-count").innerHTML = allData.length;
	 createVis();
	 });
	
	
	 
}


function createVis() {


stationMap = new StationMap("station-map", allData, [42.360406, -71.057993]);


}