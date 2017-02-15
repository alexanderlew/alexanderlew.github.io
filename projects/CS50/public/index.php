<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>T Tracker</title>
<link href="css/styles.css" rel="stylesheet" type="text/css">
</head>

<body>

<div style = "background: #4F4F4F">
<span class="title">T Tracker</span>
<BR>
<span class="subtitle">CS50 Final Project </span>
</div>

<div><BR></div>

<div class="estimatetitle"> Pick a stop, get real time predictions</div>

<div><BR></div>

<div class="selectline"> 
         <div class = "stationnametableblue"> 
            <span class="stationnametext">
              BLUE LINE
            </span>
        </div>
<div><BR><BR><BR></div>

    <form action="blue.php" method="get">
        <div class = "form-group">
        <select name="station" id="station">
        
        <?php
        //requirements
        include_once("../includes/include.php"); 
        
        //Query All Blue Line Stations
        liststations("Blue");
        ?>
        
        </select>
        </div>

        <div class="form-group">
            <button class="btn btn-default" type="submit">
                Go
            </button>
        </div>
  </form>
  
<div><BR><BR></div>
  
    <div class = "stationnametablegreen"> 
        <span class="stationnametext">
          GREEN LINE
        </span>
    </div>

<div><BR><BR><BR></div>

    <form action="green.php" method="get">
        <div class = "form-group">
        <select name="station" id="station">
        
        <?php
        //requirements
        include_once("../includes/include.php"); 
        
        //Query All Red Line Stations
        liststations("Green");
        ?>
        
        </select>
        </div>

        <div class="form-group">
            <button class="btn btn-default" type="submit">
                Go
            </button>
        </div>
  </form> 
<div><BR><BR></div> 
    <div class = "stationnametableorange"> 
        <span class="stationnametext">
          ORANGE LINE
        </span>
    </div>
<div><BR><BR><BR></div>
    
    <form action="orange.php" method="get">
        <div class = "form-group">
        <select name="station" id="station">
        
        <?php
        //requirements
        include_once("../includes/include.php"); 
        
        //Query All Red Line Stations
        liststations("Orange");
        ?>
        
        </select>
        </div>

        <div class="form-group">
            <button class="btn btn-default" type="submit">
                Go
            </button>
        </div>
  </form>  
  
  <div><BR><BR></div>
    <div class = "stationnametablered"> 
        <span class="stationnametext">
          RED LINE
        </span>
    </div>
<div><BR><BR><BR></div>
  
    <form action="red.php" method="get">
        <div class = "form-group">
        <select name="station" id="station">
        
        <?php
        //requirements
        include_once("../includes/include.php"); 
        
        //Query All Red Line Stations
        liststations("Red");
        ?>
        
        </select>
        </div>

        <div class="form-group">
            <button class="btn btn-default" type="submit">
                Go
            </button>
        </div>
    </form>  
</div>

<div><BR></div><div><BR></div>

<div class="estimatetitle"> See Live Map</div>

<a href="map.html">
    <img src="../img/map_image.png" alt="Map" style="width:500px; padding-left:10px">
</a>

<div class="estimatetitle"> About</div>
<div class=selectline>This website shows when the next trains will arrive using the MBTA real time information feed.</div>

    
</div></div>

</body>
</html>
