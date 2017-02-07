/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"<b style=background:yellow>[DOING NOW]</b> Select Annual protein consumption per capita from general info page",

		"[PENDING] Compare v1 and v2 results to see if they match",
		"[PENDING] Re-add graph of ghg per source in global",
		"[PENDING] Resurrect flow diagram (file 'graphs.js' sankey diagram)",

		"[ASK IWA] Emission factor electricity and BOD5 for all countries",
		"[ASK IWA] Global Warming potential",

		"[AESTHETIC] Make cells in substage outputs smaller (like inputs above)",
		"[AESTHETIC] Graphs with benchmark circles (difficult). Idea color graphs with green/orange/red ",

		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] Create new cookies that remember folding of sections while using the tool",
		"[WAIT] Translation, after v2 is complete in english",
		"[WAIT] Upload example json file after structure does not change anymore",
	],
	Back://back-end
	[
		"[PENDING] program the fuel question in configuration to take effect",

		"[BUG] treated wastewater (ww_vol_wwtr) should not be in wastewater L1, fix normalization",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
		"[WAIT] Opportunities page",
		"[WAITING IWA] Formula for direct sludge emissions in wst",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
