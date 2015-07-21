var meterGPSJSON_list = [];
	
	function loadJSONmeterGPS(callback) {   
		var xobjmeterGPS = new XMLHttpRequest();
			xobjmeterGPS.overrideMimeType("application/json");
		xobjmeterGPS.open('GET', 'https://data.sfgov.org/api/views/28my-4796/rows.json?accessType=DOWNLOAD', true); // Replace 'my_data' with the path to your file
		xobjmeterGPS.onreadystatechange = function () {
			  if (xobjmeterGPS.readyState == 4 && xobjmeterGPS.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xobjmeterGPS.responseText);
			  }
		};
		xobjmeterGPS.send(null);  
	}
	
  	
  	//meter data:
  		function meterGPSData() {
		var actual_JSONmeterGPS;
		loadJSONmeterGPS(function(response) {
			// Parse JSON string into object
			actual_JSONmeterGPS= JSON.parse(response);
			
			for(var i = 0; i < actual_JSONmeterGPS.data.length; i++){
			 	var actualJSONmeterGPS_object = {
					"metersGPS" : actual_JSONmeterGPS.data[i],
					"meterAddress" : actual_JSONmeterGPS.data[i][18] + "" + actual_JSONmeterGPS.data[i][19],
					"meterCapColor" : actual_JSONmeterGPS.data[i][11],
					"meterLatitude" : actual_JSONmeterGPS.data[i][23][1],	
					"meterLongitude" : actual_JSONmeterGPS.data[i][23][2],
				}		
				meterGPSJSON_list.push(actualJSONmeterGPS_object);
			}
			
			createmeterGPSElements();
			mapStuffmeterGPS(geojson2);
		});
	}
	
meterGPSData();
