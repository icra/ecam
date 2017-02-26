/*Tasks data structure*/
var TODO = {
	Front: //front-end
	[
		"[PENDING] Organize inputs in substages using filters",
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Remember folding of sections (cookies)",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in the help page an example json file, after I/O structure does not change anymore",
		"[IDEA]    Add the sankey diagram (all water flows) (at 'graphs.js')",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back: //back-end
	[
		"[NOT READ]    Mail from Andres (uncollected wastewater)",
		"[PENDING]     wsd: not clear how to calculate Non revenue water for Abstraction and Treatment",
		"[PENDING]     wwd Discharge pumping efficiency - not implemented (not requested by IWA)",
		"[WAITING IWA] Default value for Dry weight in sludge produced (kg)",
		"[WAITING IWA] CH4 emission factor for 'Anaerobic Lagoon covered' treatment type. see all <a href=variable.php?id=c_wwt_ch4_efac>here</a>",
		"[WAITING IWA] Conversion factor for electricity (kgCO2eq per kWh) for each country",
		"[WAITING IWA] BOD per person per day (g/person/day) for each country",
		"[WAITING IWA] What to do with Energy Summary?",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
