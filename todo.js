/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[PENDING]     Create cookies to remember folding of sections",
		"[PENDING]     Cells in substage outputs smaller (to match inputs above)",
		"[PENDING]     Discuss graphs with IWA",
		"[WAITING IWA] Country data (EF electricity, bod/person/day, protein consumption/year)",
		"[WAIT]        Translation after v2 in english is complete",
		"[WAIT]        Example json file after I/O structure does not change anymore",
		"[IDEA]        Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
		"[IDEA]        Water flow diagram (in 'graphs.js', 'sankey' function)",
	],
	Back://back-end
	[
		"[WAIT]        I had specified that new codes had to be the same length in characters, in sludge management they are longer and this creates visualization problems",
		"[WAITING IWA] Sludge management check implementation",
		"[WAITING IWA] Infiltration and inflow is not clear",
		"[WAITING IWA] CH4 emission factor for 'Anaerobic Lagoon covered' treatment type",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[IDEA]        Set to zero engine fuel volumes when user selects 'No' in Configuration",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
