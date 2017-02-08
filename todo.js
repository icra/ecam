/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[2] [PENDING] Graphs with benchmark circles (difficult). Color graphs with green/orange/red ",
		"[3] [PENDING] Create new cookies that remember folding of sections while using the tool",
		"[4] [IDEA] Make cells in substage outputs smaller (like inputs above)",
		"[WAITING IWA] Select country data from configuration",
		"[WAIT] Translation, after v2 is complete in english",
		"[WAIT] Upload example json file after structure does not change anymore",
		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] Resurrect flow diagram (file 'graphs.js' sankey diagram)",
	],
	Back://back-end
	[
		"[PENDING] ask what is infiltration and inflow GHG and if it adds up a new emission",
		"[1] [PENDING] program the fuel question in configuration to take effect",
		"[PENDING] Go through non used inputs -> see right list",
		"[BUG] non revenue water emissions should not be in wsd, should be in ws because is general",
		"[WAIT] Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[WAITING IWA] Formula for <a href=variable.php?id=wst_KPI_GHG_slud>wst_KPI_GHG_slud</a>",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
