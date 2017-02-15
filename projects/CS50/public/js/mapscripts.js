/* global google */
/* global _ */
/**
 * mapscripts.js
 *
 * CS50 Final Project
 * Google Maps train tracker!
 */

// Google Map
var map;

// markers for map
var markers = [];

// info window
var info = new google.maps.InfoWindow();

// execute when the DOM is fully loaded
$(function() {

    // styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [
       
        //show transit lines
        {
            featureType:"transit.line",
            elementType: "geometry",
            
			stylers:[
            {visibility: 'on'},
            {saturation: 0}
                ]
        },
		
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

    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: {lat: 42.3581756, lng: -71.0581317}, // Boston
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 18,
        panControl: true,
        styles: styles,
        zoom: 15,
        zoomControl: true
    };

    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // initiate map
    map = new google.maps.Map(canvas, options);
    
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    // configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});

/**
 * Adds trains(markers) to the page
 */
function addTrains(Line)
{
    // find location of the all trains for this line.
    var url = 'http://realtime.mbta.com/developer/api/v2/vehiclesbyroute?api_key=wX9NwuHnZU2ToO7GmGR9uw&route=' + Line + '&format=JSON'
	
	//retrieve JSON of locations
	$.getJSON(url).done(function(data, textStatus, jqHXR){
		
		//Iterate through each direction
		for(var i = 0;  i < data.direction.length; i++){
			
			//Iterate through each trip.
			for(var j = 0; j < data.direction[i].trip.length; j++){
				
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
					
			}
		}
	
	});


}

// Function to remove trains
function removeTrains() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}
	


/**
 * Configures application.
 */
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
	}, 10000);
}

// JavaScript Document