/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[NOW]         Add a warning when a input is not used",
		"[2] [PENDING] Ask feedback for how to do graphs.",
		"[3] [PENDING] Create new cookies that remember folding of sections while using the tool",
		"[4] [IDEA]    Make cells in substage outputs smaller (like inputs above)",
		"[WAITING IWA] Select country data from configuration",
		"[WAIT]        Translation, after v2 is complete in english",
		"[WAIT]        Upload example json file after structure does not change anymore",
		"[IDEA]        Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA]        Resurrect flow diagram (file 'graphs.js' sankey diagram)",
	],
	Back://back-end
	[
		"[1] [PENDING] Program the fuel question in configuration to take effect",
		"[BUG]         Clarification on Non revenue water formula ",
		"[BUG]         Formula for infiltration and inflow GHG is wrong",
		"[PENDING]     Go through non used inputs -> see right list",
		"[WAIT]        Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[WAITING IWA] Formula for <a href=variable.php?id=wst_KPI_GHG_slud>wst_KPI_GHG_slud</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] Formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA]        Edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
