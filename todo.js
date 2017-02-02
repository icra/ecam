/*Tasks data structure*/
var TODO = {
	Back://back-end
	[
		"[<b style=background:yellow>DOING NOW</b>] Create a page for individual substages & substage browser",
		"[MISSING] options for wwt_slu_disp Sludge type disposed of",
		"[MISSING] options for wwt_slu_type Disposal type",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=wwd_KPI_nrg_sav>wwd_KPI_nrg_sav</a>",
		"[REQUESTED TO IWA] formula <a href=variable.php?id=wwd_KPI_ghg_red>wwd_KPI_ghg_red</a>",
		"[IDEA] edit.php, change stage simply modifying the variable CurrentLevel, then call init() function (works very good but needs work)",
		"[IDEA] Graphs: resurrect flow diagram",
		"[IDEA] Create new cookies that remember folding of sections while using the tool",
		"[WAIT] c_wwt_nrg_tran bug: units TJ to kWh",
	],
	Front://front-end
	[
		"[IDEA] List not used constants in debugging utility",
		"[IDEA] Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"[IDEA] FAQ: a JSON file reader. structure {Question:Answer,Question:Answer}",
		"[WAIT] Translation - after v2 is complete in english",
		"[WAIT] upload example json file after v2",
		"[IWA WANTS] Graphs with benchmark circles (difficult). Idea color graphs with green/orange/red ",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
