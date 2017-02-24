/*Tasks data structure*/
var TODO = {
	Front: //front-end
	[
		"[PENDING] Remember folding of sections (cookies)",
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in 'help' an example json file after I/O structure does not change anymore",
		"[IDEA]    Add somewhere the water flow diagram (at 'graphs.js', function sankey)",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
		"[IDEA]    Add a into variable.php the question it belongs to (filter)",
		"[IDEA]    Add a into variable.php the current benchmarking if any"
	],
	Back: //back-end
	[
		"[PENDING]     wsd: not clear how to calculate Non revenue water for Abstraction and Treatment",
		"[PENDING]     wwd Discharge: pumping efficiency not implemented",
		"[PENDING]     Fix code of sludge CO2eq variable codes so they don't appear at GHG summary",
		"[PENDING]     Ask IWA what to do with Energy Summary",
		"[WAITING IWA] Default value for Dry weight in sludge produced (kg)",
		"[WAITING IWA] Conversion factor for electricity (kgCO2eq per kWh) for each country",
		"[WAITING IWA] BOD per person per day (g/person/day) for each country",
		"[WAITING IWA] CH4 emission factor for 'Anaerobic Lagoon covered' treatment type. see all <a href=variable.php?id=c_wwt_ch4_efac>here</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
