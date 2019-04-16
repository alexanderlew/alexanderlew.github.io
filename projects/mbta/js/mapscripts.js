var map;

var infowindow;

//time between position updates
var time = 15000;

// markers for map
var markers = [];

var styles= [

		//desaturate all others to fade in background.
		{
			featureType: "administrative",

			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		},{
			featureType: "landscape",


			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		},
		{
			featureType: "landscape",

			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		}, {
			featureType: "poi",

			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		},{
			featureType: "poi",
			elementType: "labels",
			stylers: [
			{visibility: 'off'}
			]
		}
		,{
			featureType: "road",

			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		}, {
			featureType: "water",

			stylers: [
			{saturation:-20},
			{hue: '#00ffe6'}
			]
		}


    ];




function initMap() {
    map = new google.maps.Map(document.getElementById('station-map'), {
      center: {lat: 42.3581756, lng: -71.0581317},
      zoom: 15,
      styles: styles
    });

    var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);

    infowindow = new google.maps.InfoWindow();

	configure()
}

function addTrains(Line){
    var url = 'https://api-v3.mbta.com/vehicles?include=trip&filter%5Broute%5D=' + Line + '&api_key=43a4d6b0306640078e6d57dfbef81e34';

	//retrieve JSON of locations
	$.getJSON(url).done(function(JSONdata, textStatus, jqHXR){

		data = JSONdata.data;
		included = JSONdata.included;

		//Iterate through each trip.

		data.forEach(function(trip){
			var lat = trip.attributes.latitude;
			var long = trip.attributes.longitude;
			var bearing = Number(trip.attributes.bearing);

			//find headsign:
			var destObj = included.filter(function(item){
				return item.id === trip.relationships.trip.data.id;
			});

			var dest = destObj[0].attributes.headsign;
				console.log(dest);
			var LatLng = new google.maps.LatLng(lat,long);

						//Define symbol + color based off what line we are requesting.
            var color;
			//define color based on line.
			if(Line == "Blue"){
			color = "#2f5da6";
			}
			else if(Line == "Green-B" || Line == "Green-C" || Line =="Green-D" || Line == "Green-E"){
			color = "#008150";
			}
			else if(Line == "Orange"){
			color = "#fd8a03";
			}
			else if(Line == "Red"){
			color = "#fa2d27";
			}

			//define custom icon
			var vehicle_icon = {
			path: 'M 5,3.8 5.1,19.5 2.7,16.5 0.3,19.5 0.3,3.8 2.6,0.4 z',
			fillColor: color,
			fillOpacity: 1,
			strokeColor: '#4c4c4c',
			rotation: bearing,
			scale: 1.5
			};

			//Create marker

			var marker = new MarkerWithLabel({
			position: LatLng,
			map: map,
			icon: vehicle_icon,
			labelClass: "labels",
			labelContent: dest,

			});

			//place markers on map
			marker.setMap(map);

			//update the global marker array:
			markers.push(marker);

		});
		/*
		for(var i = 0; i < data.direction[i].trip.length; j++){

			var lat = data.direction[i].trip[j].vehicle.vehicle_lat;
			var long = data.direction[i].trip[j].vehicle.vehicle_lon;
			var bearing = Number(data.direction[i].trip[j].vehicle.vehicle_bearing);
			var dest = data.direction[i].trip[j].trip_headsign;

			var LatLng = new google.maps.LatLng(lat,long);


			//Define symbol + color based off what line we are requesting.
            var color;
			//define color based on line.
			if(Line == "Blue"){
			color = "#2f5da6";
			}
			else if(Line == "Green-B" || Line == "Green-C" || Line =="Green-D" || Line == "Green-E"){
			color = "#008150";
			}
			else if(Line == "Orange"){
			color = "#fd8a03";
			}
			else if(Line == "Red"){
			color = "#fa2d27";
			}

			//define custom icon
			var vehicle_icon = {
			path: 'M 5,3.8 5.1,19.5 2.7,16.5 0.3,19.5 0.3,3.8 2.6,0.4 z',
			fillColor: color,
			fillOpacity: 1,
			strokeColor: '#4c4c4c',
			rotation: bearing,
			scale: 1.5
			};

			//Create marker

			var marker = new MarkerWithLabel({
			position: LatLng,
			map: map,
			icon: vehicle_icon,
			labelClass: "labels",
			labelContent: dest,

			});

			//place markers on map
			marker.setMap(map);

			//update the global marker array:
			markers.push(marker);


		}*/

	});



}


// Function to remove trains
function removeTrains() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}


function configure()
{
	//First add all trains
	addTrains("Blue");
	addTrains("Green-B");
	addTrains("Green-C");
	addTrains("Green-D");
	addTrains("Green-E");
    addTrains("Orange");
    addTrains("Red");

    //then run every 10 seconds, first removing, then adding markers again with
    // new locations.
	setInterval(function(){
	//First remove any markers if they exist.
	removeTrains();

	//Add trains back in with new locations.
	addTrains("Blue");
	addTrains("Green-B");
	addTrains("Green-C");
	addTrains("Green-D");
	addTrains("Green-E");
    addTrains("Orange");
    addTrains("Red");
	}, time);
}