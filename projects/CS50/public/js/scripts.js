// Scripts for the T Tracker


// Declare function to find predictions using Station ID, Line, and Direction_Code
function predict(Stop_ID, Line, Direction_Code) {
	
	//define JSON URL
	var url = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop=' 
                + Stop_ID + '&format=json';
				
	$.getJSON(url).done(function(data, textStatus, jqHXR){
		
		//when trains are no longer running, data is undefined. In this case, early exit
		// from function, showing no predictions. Cases where trains are still
		// running but no data is pushed from the T are addressed further down.
		
		if(typeof(data.mode) == 'undefined'){
		var PredictFail = "<div class= 'arrivalbarleft'><span class='arrivaltext'> No Predictions </span><BR></div><div class='arrivalbarright'></div><div><BR></div>";
	
			//Change template depending on what direction was requested.
			if(Direction_Code == 0){
			document.getElementById("predictiontext0").innerHTML = PredictFail;
			return;
			}
			
			else if(Direction_Code == 1){
				document.getElementById("predictiontext1").innerHTML = PredictFail;
				return;
			}
		}

		else{
							
			// create array to store predictions
			var  predictarray = [];
			
			// Loop through modes. MBTA misfiled the modes at Park Street, causing there to be two subway arrays.
			// This was not the case at other interchange stations. Weird. 
			for(var h = 0; h < data.mode.length; h++){
				
				// Ensure the mode is subway.
				if(data.mode[h].mode_name == "Subway"){
					
					//console
					console.log("Mode: Subway OK");
					
					//iterate to find the request line. 
					for(var i = 0; i < data.mode[h].route.length; i++){
						
						//if line is correct (and for Green Line, check all branches)
						if((data.mode[h].route[i].route_id == Line) || (Line == "Green" && (data.mode[h].route[i].route_id == "Green-B" 
						|| data.mode[h].route[i].route_id == "Green-C" || data.mode[h].route[i].route_id == "Green-D" || 
						data.mode[h].route[i].route_id == "Green-E"))){
							console.log("Line found");
							
							//iterate through directions
							for(var j = 0; j < data.mode[h].route[i].direction.length; j++ ){
								
								//find selected direction
								if(data.mode[h].route[i].direction[j].direction_id == Direction_Code){
									console.log("Direction found");
									
									//iterate through the trips, docprinting out destination, trip id, and prediction.
									for(var k = 0; k < data.mode[h].route[i].direction[j].trip.length; k++){
										
										//define local variables with needed info
										var id = data.mode[h].route[i].direction[j].trip[k].trip_id;
										var dest = data.mode[h].route[i].direction[j].trip[k].trip_headsign;
										var pre_away_min = Math.floor((data.mode[h].route[i].direction[j].trip[k].pre_away)/60);
										
										console.log(id);
										console.log(dest);
										console.log(pre_away_min);
										// Add information into array.
										
										predictarray.push([pre_away_min, dest, id]);
										
									}
			
								}
			
							}
									
						}
						
					}
					
					
				}
			}
		}
	
	//Sort the array
	predictarray.sort(sortFunction);
	
	console.log(predictarray);
	
	//Build HTML
	//Declare variable
	var PredictHTML = "<div><BR></div>";
	
	//Iterate through the array
	if(predictarray.length > 0){
	
		for(var l = 0; l < predictarray.length; l++){
			//Print the HTML of predictions in stylized format.
			PredictHTML+= "<div class= 'arrivalbarleft'><span class='arrivaltext'>" + predictarray[l][1] 
			+ "</span><BR><span class='subtext'><a href='trip.php"+"?trip_id=" 
			+ predictarray[l][2]+"'>Track this trip</a></span></div><div class='arrivalbarright'><div class = 'minutestext'>" + predictarray[l][0] + " min" + "</div></div><div><BR></div>";	
		}
	}
	//If no trips in this direction were found, then return no predictions.
	else if(predictarray.length == 0) {
		PredictHTML = "<div class= 'arrivalbarleft'><span class='arrivaltext'> No Predictions </span><BR></div><div class='arrivalbarright'></div><div><BR></div>";
	}
	
	console.log(PredictHTML);
	
	//Define where to add such predictions on template.
	// Then add HTML to those locations.
	if(Direction_Code == 0){
	document.getElementById("predictiontext0").innerHTML = PredictHTML;
	}
	
	else if(Direction_Code == 1){
		document.getElementById("predictiontext1").innerHTML = PredictHTML;
	}	

	});
	
}


// Tracking by Trip: track any individual train by trip id number, linked from the stop page
function predicttrip(TripID){
	
	////define JSON URL
	var url = 'http://realtime.mbta.com/developer/api/v2/predictionsbytrip?api_key=wX9NwuHnZU2ToO7GmGR9uw&trip=' 
                + TripID + '&format=json';
				
	$.getJSON(url).done(function(data, textStatus, jqHXR){
		
		// Initiate temp storage of HTML upon which to build
		var PredictHTML = "<div><BR></div>";
		
		//iterate through next stops
		for(var i = 0; i < data.stop.length; i++){
			var next_station = data.stop[i].stop_name;
			var predict_arr = Math.floor((data.stop[i].pre_away)/60);
			
			console.log(next_station);
			console.log(predict_arr);
		
		// build listing of next stop and time + formatted.	
			PredictHTML+= "<div class= 'arrivalbarleft'><span class='arrivaltext'>" 
							+ next_station + "</span><BR></div><div class='arrivalbarright'><div class = 'minutestext'>" 
							+ predict_arr + " min" + "</div></div><div><BR></div>";
						
		}
		// Replace text
		document.getElementById("predictiontext0").innerHTML = PredictHTML;
		
	}).fail(function(data,textStatus,jqHXR){
		console.log("No trip found")
		
		// If fail (trip already completed or not yet departed from terminal), no predictions found.
		var Predict_Fail = "<div><BR></div> <div class= 'arrivalbarleft'><span class='arrivaltext'>" + "Trip Not Found" + "</span><BR></div><div class='arrivalbarright'><div class = 'minutestext'></div></div><div><BR></div>";
		
		document.getElementById("predictiontext0").innerHTML = Predict_Fail;						
	})
	
}


function sortFunction(a, b) {
	if(a[0] === b[0]) {
		return 0;
	}
	else if(a[0] < b[0]){
		return -1;
	}
	else{
		return 1;
	}	

}
	
