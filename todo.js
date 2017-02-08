/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[1] [PENDING] Discuss graphs, skype with IWA",
		"[2] [PENDING] Create new cookies that remember folding of sections while using the tool",
		"[3] [PENDING] Make cells in substage outputs smaller (like inputs above)",
		"[WAITING IWA] Select country data from configuration",
		"[WAIT]        Translation after v2 is complete in english",
		"[WAIT]        Upload example json file after structure does not change anymore",
		"[IDEA]        Include link to IPCC book and references (page,chapter) in equations",
		"[IDEA]        Resurrect flow diagram (file 'graphs.js' sankey diagram)",
	],
	Back://back-end
	[
		"[WAITING IWA] Clarification for non revenue water formula ",
		"[WAITING IWA] Formula for infiltration and inflow GHG is wrong",
		"[WAITING IWA] Formula for <a href=variable.php?id=wst_KPI_GHG_slud>wst_KPI_GHG_slud</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[IDEA]        Improve speed, changing stage simply modifying the variable CurrentLevel, then calling init() function (works very good but needs work)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
