
// SVG drawing area

var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 600 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Date parser (https://github.com/mbostock/d3/wiki/Time-Formatting)
var formatDate = d3.time.format("%Y");

// Scales
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);


   

// Initialize data
loadData();

// FIFA world cup
var data;


// Load CSV file
function loadData() {
	d3.csv("data/fifa-world-cup.csv", function(error, csv) {

		csv.forEach(function(d){
			// Convert string to 'date object'
			d.YEAR = +d.YEAR
			
			// formatDate.parse(d.YEAR);
			// i couldn't get the number to display as the %Y in the ticks
			// see below at my error notes.
			
			// Convert numeric values to 'numbers'
			d.TEAMS = +d.TEAMS;
			d.MATCHES = +d.MATCHES;
			d.GOALS = +d.GOALS;
			d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
			d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
		});

		// Store csv data in global variable
		data = csv;
		
		// Draw the visualization for the first time
		updateVisualization();
	});
}


// Render visualization
function updateVisualization() {

	console.log(data);
	
	//get selections
	var selectBox = document.getElementById("data-type");
	var data_select = selectBox.options[selectBox.selectedIndex].value;
	
	var selectBox = document.getElementById("year-lower");
	var year_min = selectBox.options[selectBox.selectedIndex].value;
	
	var selectBox = document.getElementById("year-upper");
	var year_max = selectBox.options[selectBox.selectedIndex].value;
	
	
	//Filter the data
 	data_filtered = data.filter(function(d){
		return d.YEAR >= year_min && d.YEAR <= year_max;
	});
	
	
	//
	//create Axes function
	yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
	
	xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(data_filtered.length)
	.tickFormat(d3.format("d"));
	// .tickFormat(d3.time.format("%Y"));
	// couldn't figure out how to get the date to work properly-- kept on getting an error with
	// the above function, so i ended up just converting the dates back to regular numbers	
	
	
	//define axes scales
	y.domain([0, d3.max(data_filtered, function(d){
		return d[data_select];
		})
	]);
	
	x.domain([d3.min(data_filtered,function(d){return d.YEAR}), 
	d3.max(data_filtered, function(d){return d.YEAR;})
	]);
	
	//tip function
	var tip = d3.tip()
	.attr('class', 'd3.tip')
	.offset([-10, 0])
	.html(function(d) {
	return "<strong>" + d.EDITION + "</strong>, " + d[data_select];
	});

svg.call(tip);
	
	//line function
	var line = d3.svg.line()
    .x(function(d) { return x(d.YEAR);})
    .y(function(d) { return y(d[data_select]); })
    .interpolate("linear");

	// remove old paths  	
	d3.selectAll("path")
	.remove();



var path = svg.append("path")
	.datum(data_filtered)
	.attr("class", "line")
	.attr("d", line(data_filtered))
	.attr("stroke-width", 2);
	
	//make scales
	
    var yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");
    
    var xAxisGroup = svg.append("g")
    .attr("class","x-axis axis")
    .attr("transform", "translate(0," + (height) + ")");
    
    svg.select(".y-axis")
    .transition()
    .duration(800)
    .call(yAxis);
    
    svg.select(".x-axis")
    .transition()
    .duration(800)
    .call(xAxis);
	
	 //make svg
	 var circle = svg.selectAll("circle")
	 .data(data_filtered);
	 
	circle.enter().append("circle")
	.attr("class", "circle");
	
	circle
		.transition()
		.duration(800)
	    .attr("cx", function(d) { return x(d.YEAR); })
	    .attr("cy", function(d) { return y(d[data_select]);})
	    .attr("r", "3")
	    .attr("fill", "#3C8070");
	    
	    
circle.on("mouseover", tip.show)
	    .on("mouseout", tip.hide)
		.on("click", showEdition);
	
	 // EXIT 
	circle
    .exit()
    .transition()
    .duration(800)
    .remove();

	
}


// Show details for a specific FIFA World Cup
function showEdition(d){
	var Stats = "<h3>"+ d.EDITION + "</h3>"
	Stats +="<table><tr><th>Winner </th><th>" + d.WINNER + "</th></tr>"
	Stats +="<tr><th>Goals </th><th>" + d.GOALS + "</th></tr>"
	Stats +="<tr><th>Matches </th><th>" + d.MATCHES + "</th></tr>"
	Stats +="<tr><th>Teams </th><th>" + d.TEAMS + "</th></tr>"
	Stats +="<tr><th>Average Attendance </th><th>" + d.AVERAGE_ATTENDANCE + "</th></tr>"
	Stats += "</table";
	
	document.getElementById("stats").innerHTML = Stats;
}
