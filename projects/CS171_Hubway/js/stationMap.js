
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

var greyIcon = new L.icon({
  iconUrl: "img/marker-icon-grey.png",
  shadowUrl: "img/marker-grey-shadow.png",
  
  iconSize:     [25, 41], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [12, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 0],  // the same for the shadow
    popupAnchor: [0, 7]
  
  
});


StationMap = function(_parentElement, _data, _mapPosition) {
  this.parentElement = _parentElement;
  this.data = _data;
  console.log(this.data);
  this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
  var vis = this;
  
 // load open street maps 
  vis.map = L.map("station-map").setView([42.360406, -71.057993], 14);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(vis.map);
	
	
// load mbta json
$.getJSON("data/MBTA-Lines.json", function(data){
	L.geoJson(data, {
	  style: styleLine,
	  weight: 4
	}).addTo(vis.map);

});
	
	
	
    vis.wrangleData();
}


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
  var vis = this;

  // Currently no data wrangling/filtering needed
  // vis.displayData = vis.data;

  // Update the visualization
  vis.updateVis();
}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
var vis = this;

console.log(vis.data);

//define where markers are


//define popup
   L.Icon.Default.imagePath = 'img'; 

vis.data.forEach(function(data){

  if(data.st == 1){
  vis.popupContent = "<strong>" + data.s + "</strong>";
  vis.popupContent += "<BR> bikes: " + data.ba;
  vis.popupContent += ", docks: " + data.da;
  vis.marker = L.marker([data.la, data.lo]).bindPopup(vis.popupContent)
  .addTo(vis.map);
  }
  else{
    vis.popupContent = "<strong>" + data.s + "</strong>";
  vis.popupContent += "<BR> station currently closed.";
    vis.marker = L.marker([data.la, data.lo], {icon: greyIcon}).bindPopup(vis.popupContent)
  .addTo(vis.map);
  }

	
});
}


function styleLine (feature){
  
  switch (feature.properties.LINE){
    case "ORANGE": return {color: "#fd8a03"};
    case "RED": return {color: "#fa2d27"};
    case "GREEN": return {color: "#008150"};
    case "SILVER": return {color: "#9a9c9d"};
    case "BLUE": return {color: "#2f5da6"};
    
  }
  
}	