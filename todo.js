/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[PENDING]     Create cookies to remember folding of sections",
		"[PENDING]     Cells in substage outputs smaller (to match inputs above)",
		"[PENDING]     Discuss graphs, skype with IWA",
		"[WAITING IWA] Country data (EF electricity, bod/person/day, protein consumption/year)",
		"[WAIT]        Translation after v2 in english is complete",
		"[WAIT]        Example json file after structure does not change anymore",
		"[IDEA]        Add link to IPCC book PDF and references (page,chapter) in equations",
		"[IDEA]        Water flow diagram (in 'graphs.js', 'sankey' function)",
	],
	Back://back-end
	[
		"[WAITING IWA] Sludge management check implementation iteration 1",
		"[WAITING IWA] Infiltration and inflow is not clear",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[IDEA]        Set to zero engine fuel volumes when user selects 'No' in Configuration",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
