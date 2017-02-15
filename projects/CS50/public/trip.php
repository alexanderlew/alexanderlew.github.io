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

<div class="estimatetitle">Arrivals by Trip</div>

<div class = "stationnametableblank"> 
	<span class="stationnametext"> Trip no.
	    <?php echo $_GET['trip_id'] ?>
	     </span>
</div>
<div class=timetable>
    <div class="timetext1">Next Arrivals</div>
    <div id= "time" class= "timetext2"></div>
</div>
<div><BR></div>
<div class = "directionbar">
    <div class="directiontext"> 
    Next stations    
    </div>
</div>

<p id = predictiontext0></p>


</div>

<script>
    //Time of last load/update
    var d = new Date();
	var time = d.toLocaleString();
	document.getElementById("time").innerHTML = time;


	//Trip code from GET:
    var trip_id = "<?php echo $_GET['trip_id'] ?>";

	// predict trip
	predicttrip(trip_id);

</script>

</body>
</html>
