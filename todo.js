/*Tasks data structure*/
var TODO = {
	Front: //front-end
	[
		"[PENDING] Organize inputs in substages using filters",
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in the help page an example json file, after I/O structure does not change anymore",
		"[IDEA]    Add the sankey diagram (all water flows) (at 'graphs.js')",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back: //back-end
	[
		"[SHOULD BE ADDED?] Mail from Andres (uncollected wastewater)",
		"[PENDING]          wsd: not clear how to calculate Non revenue water for Abstraction and Treatment",
		"[PENDING]          wwd Discharge pumping efficiency - not implemented (not requested by IWA)",
		"[WAITING IWA]      Jose provides default value for Dry weight in sludge produced (kg)",
		"[WAITING IWA]      Value of CH4 emission factor for type of treatment 'Anaerobic Lagoon covered', <a href=variable.php?id=c_wwt_ch4_efac>see all</a>",
		"[WAITING IWA]      List of Conversion factor for electricity (kgCO2eq per kWh) for each country",
		"[WAITING IWA]      List of BOD per person per day (g/person/day) for each country",
		"[WAITING IWA]      What to do with Energy Summary?",
		"[WAIT]             Opportunities: wait for structure v2 is finished, otherwise can't code it",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
