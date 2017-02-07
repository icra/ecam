/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[PENDING] Re-add graph of ghg per source in global",
		"[PENDING] Resurrect flow diagram (file 'graphs.js' sankey diagram)",
		"[WAITING IWA] Select country data from configuration",
		"[WAIT] Translation, after v2 is complete in english",
		"[WAIT] Upload example json file after structure does not change anymore",
		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] Create new cookies that remember folding of sections while using the tool",
		"[IDEA] Make cells in substage outputs smaller (like inputs above)",
		"[IDEA] Graphs with benchmark circles (difficult). Color graphs with green/orange/red ",
	],
	Back://back-end
	[
		"[BUG] non revenue water emissions is not ok",
		"[PENDING] program the fuel question in configuration to take effect",
		"[BUG] treated wastewater (ww_vol_wwtr) should not be in wastewater L1, fix normalization",
		"[WAIT] Opportunities page, wait for structure v2 does not change anymore, otherwise can't code it",
		"[WAITING IWA] Formula for direct sludge emissions in wst",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
