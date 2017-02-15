<?php
/* All Global PHP Functions */
    
    
//requirements
require("../includes/config.php");


function liststations($Line)
{
 
        //Query all stations
        $rows = CS50::query("SELECT * FROM Stops WHERE Line = ?",$Line);
        
        // iterate through each station, printing out the options.
        
        foreach($rows as $rows)
        {
            print("<option value='{$rows["Code"]}'>{$rows["Name"]}</option>");
        }
}

function stationlabel($Line, $Station_ID)
{

    //Query All Blue Line Stations
    $rows = CS50::query("SELECT Name FROM Stops WHERE Line = ? AND Code = ?", $Line, $Station_ID);
    echo($rows[0]["Name"]);

    
}


?>