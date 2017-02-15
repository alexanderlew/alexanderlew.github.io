<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>T Tracker</title>
<link href="../css/styles.css" rel="stylesheet" type="text/css">

<script src="../js/scripts.js"></script>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>

</head>

<body>

    <div style = "background: #4F4F4F">
    <span class="title"> <a href = /index.php> T Tracker </a></span>
    <BR>
    <span class="subtitle">CS50 Final Project </span>
    </div>
    
    <div class = "frame">
        <div><BR></div>
        
        <div class="estimatetitle">
        Estimated Train Times 
        </div>
        
        <div class = "stationnametablegreen"> 
            <span class="stationnametext">
                <?php
                //requirements
                require("../includes/include.php");
                
                stationlabel("Green",$_GET['station']);
                
                ?>

            </span>
        </div>
        <div class=timetable>
            <div class="timetext1">Next Arrivals</div>
            <div id= "time" class= "timetext2"></div>
        </div>
        <div class = "directionbar">
            <div class="directiontext"> 
            Westbound    
            </div>
        </div>
        
        <div><BR></div>
        <p id = predictiontext0></p>
    
    <div class = "directionbar">
    	<div class="directiontext"> 
    	Eastbound    
    	</div>
	</div>
    
    <div><BR></div>
    	<p id = predictiontext1></p>
    </div>

<script type='text/javascript'>
//Scripts
	//Station code from GET:
    var station_id = "<?php echo $_GET['station'] ?>";
	
	//Get time of last refresh
	var d = new Date();
	var time = d.toLocaleString();
	document.getElementById("time").innerHTML = time;
	
	// predict direction 0
	predict(station_id,"Green","0");
	// prediction direction 1
	predict(station_id,"Green","1");
</script>   

</body>
</html>
