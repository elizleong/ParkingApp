<!DOCTYPE html>
<html>

<script>
//getting data for meters
 function loadJSONMeters(callback) {   
    var xobjMeters = new XMLHttpRequest();
        xobjMeters.overrideMimeType("application/json");
    xobjMeters.open('GET', 'https://data.sfgov.org/api/views/6cqg-dxku/rows.json?accessType=DOWNLOAD', true); // Replace 'my_data' with the path to your file
    xobjMeters.onreadystatechange = function () {
          if (xobjMeters.readyState == 4 && xobjMeters.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobjMeters.responseText);
          }
    };
    xobjMeters.send(null);  
 }
 
 var metersDataJSON_list = []; 
 
function metersData (){
	var actualMeters_JSON;
		loadJSONMeters(function(response) {
		// Parse JSON string into object
		actual_JSONMeters = JSON.parse(response);
		
		//console.log(actual_JSONMeters.data[0]);
		
		
		for(var i = 0; i < actual_JSONMeters.data.length; i++){
			var actualMetersJSON_object = {
				"meters" : actual_JSONMeters.data[i],
				"metersStreetName" : actual_JSONMeters.data[i][8],
				"daysMeterOperating" : actual_JSONMeters.data[i][15],	
				"timeMeterStart" : actual_JSONMeters.data[i][16],
				"timeMeterEnd" : actual_JSONMeters.data[i][17],
				"timeMeterLimit" : actual_JSONMeters.data[i][19],
				"colorMeterRule" : actual_JSONMeters.data[i][11]
			}
			metersDataJSON_list.push(actualMetersJSON_object);
			console.log(metersDataJSON_list);
		}
		
	});
}
metersData();
</script>

</html>
