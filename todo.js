/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[PENDING]     Create cookies to remember folding of sections",
		"[PENDING]     Cells in substage outputs smaller (to match inputs above)",
		"[PENDING]     Discuss graphs, skype with IWA",
		"[WAITING IWA] Select country data from configuration",
		"[WAIT]        Translation after v2 is complete in english",
		"[WAIT]        Upload example json file after structure does not change anymore",
		"[IDEA]        Include link to IPCC book PDF and references (page,chapter) in equations",
		"[IDEA]        Resurrect flow diagram (file 'graphs.js' sankey diagram)",
	],
	Back://back-end
	[
		"[WAITING IWA] Infiltration and inflow is not clear",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[IDEA]        Set to zero engine fuel volumes when user selects 'No' in Configuration",
		"[IDEA]        Improve speed, changing stage simply modifying the variable CurrentLevel, then calling init() function (works very good but needs work)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
