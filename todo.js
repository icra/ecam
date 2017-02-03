/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[REQUEST] Re-add graph of ghg per source in global",
		"[REQUEST] Add biogas question again in birds.php global ghg assessment",
		"[REQUEST] Formula for biogas flared estimated: ww_serv_pop * ww_bod_pday * ct_bod_kg * ct_biog_g/1000 * Days",
		"[REQUEST]: Select Annual protein consumption per capita from general info page",
		"[REQUEST]: Separate page for opportunities",
		"[IDEA] Add a new 'global warming potential' number in general info while selecting the country",
		"[IDEA] Automatic list of not used constants in debugging utility",
		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] Resurrect flow diagram (file 'graphs.js' sankey diagram)",
		"[WAIT] Formula for sludge emissions in global",
		"[WAIT] Translation - after v2 is complete in english",
		"[WAIT] Upload example json file after v2",
		"[AESTHETIC] Make cells in substage outputs smaller (like inputs above)",
		"[AESTHETIC] Graphs with benchmark circles (difficult). Idea color graphs with green/orange/red ",
	],
	Back://back-end
	[
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[WAITING IWA] formula for <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
		"[IDEA] Create new cookies that remember folding of sections while using the tool",
		"[WAIT] c_wwt_nrg_tran bug: units TJ to kWh",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
