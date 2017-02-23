/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[PENDING]     Create cookies to remember folding of sections",
		"[PENDING]     Discuss graphs with IWA",
		"[WAIT]        Translation after v2 in english is complete",
		"[WAIT]        Example json file after I/O structure does not change anymore",
		"[IDEA]        Water flow diagram (in 'graphs.js', 'sankey' function)",
		"[IDEA]        Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[PENDING]     <b>NOW</b> - wsa,wst,wsd,wwc - pink table for pump efficiency equations in 'mail.txt'",
		"[WAITING IWA] Conversion factor for electricity for each country",
		"[WAITING IWA] BOD per person per day for each country",
		"[WAITING IWA] Infiltration and inflow is not clear (WW Collection)",
		"[WAITING IWA] CH4 emission factor for 'Anaerobic Lagoon covered' treatment type. see all <a href=variable.php?id=c_wwt_ch4_efac>here</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[IDEA]        Set to zero engine fuel volumes when user selects 'No' in Configuration",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
