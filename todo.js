/*Tasks data structure*/
var TODO = {
	Back://back-end
	[
		"[<b style=background:yellow>DOING NOW</b>] Create a page for individual substages & substage browser",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=wsa_SL_water_losses>wsa_SL_water_losses</a>",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=ww_SL_dilution>ww_SL_dilution</a>",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=ww_SL_dil_emis>ww_SL_dil_emis</a>",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
		"[IDEA] Graphs: resurrect flow diagram",
		"[IDEA] Create new cookies that remember folding of cards while using the tool",
		"[WAIT] c_wwt_nrg_tran bug units TJ to kWh to solve",
	],
	Front://front-end
	[
		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] FAQ: a JSON file reader. structure {Question:Answer,Question:Answer}",
		"[WAIT] Translation - after v2 is complete in english",
		"[WAIT] upload example json file after v2",
		"[IWA WANTS] Graphs with benchmark circles (difficult). Idea color graphs with green/orange/red ",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
