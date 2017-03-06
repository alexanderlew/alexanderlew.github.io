
var allData = [];

// Start application by loading the data
loadData();

var color = d3.scale.ordinal()
    .range(["#4a6887", "#E64347"]);



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
		data.total = data.ba + data.da
		data.latLng = [+data.la, +data.lo];
	});
	
	//Filter data -- only opened stations
	openStations = allData.filter(function(d){
	  return d.st === 1;  
	});
	
    closedStations = allData.filter(function(d){
       return d.st !== 1; 
    });
    
	document.getElementById("station-count").innerHTML = openStations.length;
	 initVis();
	 });
 
}


function initVis() {

  
 // load open street maps 
  var map = L.map("station-map").setView([42.360406, -71.057993], 14);
  
  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


    // Initialize SVG
   map._initPathRoot()
    
    var svg = d3.select("#station-map").select("svg"),
    g = svg.append("g");

    //tool tip open stations
    var tip = d3.tip()
	.attr('class', 'd3-tip')
	.attr()
	.offset([-10, 0])
	.html(function(d) {
	    if(d.data.item==="Bikes"){
	       return "<strong>" + d.data.sta + "<BR><BR> Bikes Available: " + d.data.key + "</strong><BR>Docks Available: "+d.data.other;
	    }
	    else if(d.data.item === "Docks"){
	        return "<strong>" + d.data.sta + "</strong><BR><BR> Bikes Available: " + d.data.other + "<BR><strong>Docks Available: "+d.data.key + "</strong>";
	    }
	});
	
	
	 var tip_closed = d3.tip()
	.attr('class', 'd3-tip')
	.attr()
	.offset([-10, 0])
	.html(function(d) {
	    return "<strong>" + d.s + "</strong><BR><BR> Station temporarily closed";
	});
	
	
    
    svg.call(tip);
    svg.call(tip_closed);
    
    //closed stations.
    var closed = g.selectAll('circle')
      .data(closedStations)
      .enter()
      .append('circle')
      .attr('r', "6")
      .style("fill", "#000000")
      .style("opacity", 0.5)
    .on("mouseover", tip_closed.show)
    .on("mouseout", tip_closed.hide);;
    
    
    //pie chart
    var pie = d3.layout.pie()
    .value(function(d){ return d.key}).sort(null);
    
      
    var pies = g.selectAll(".pie")
      .data(openStations)
      .enter()
      .append("g")
      .attr("class", "pie");
          
      
    pies.selectAll(".slice")
    .data(function(d){
        return pie([{
            key: d.ba,
            tot: d.total,
            item: "Bikes",
            other: d.da,
            sta: d.s
        }, {
            key: d.da,
            tot: d.total,
            item: "Docks",
            other: d.ba,
            sta: d.s
        }]);
    })
    .enter()
    .append("path")
    .attr("d", function(d, i){
        console.log(d);
        return d3.svg.arc().innerRadius(0).outerRadius(d.data.tot).call(d, d);
    })
    .style("fill", function(d, i){
        return color(i);
    })
    .style("opacity", 0.9)
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
        
    
    map.on('viewreset', update);
    update();
    
  function update() {
      pies.attr("transform",
        function(d){
          
          return "translate("+ 
      			map.latLngToLayerPoint(d.latLng).x +","+ 
      			map.latLngToLayerPoint(d.latLng).y +")";
            }
      )
      
    closed.attr("transform",
        function(d){
          
          return "translate("+ 
      			map.latLngToLayerPoint(d.latLng).x +","+ 
      			map.latLngToLayerPoint(d.latLng).y +")";
            }
      )      
      
    }

}