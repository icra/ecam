/*Tasks data structure*/
var TODO = {
	Back://back-end
	[
		"[<b style=background:yellow>DOING NOW</b>] Create a page for individual substages & substage browser",
		"[IDEA]: select Annual protein consumption per capita from general info page",
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
		"[REQUEST] make cells in substage outputs smaller (like inputs above)",
		"[NEED] add units (kg CO2) in global ghg graph (graph4 and graph1)",
		"[SKYPE] Modify n2o from treated formula, convert mg/L to Kg",
		"[SKYPE] See all decimals for constants",
		"[SKYPE] re-add graph of ghg per source in global",
		"[WAIT] formula for sludge emissions in global",
		"[REQUEST] Add biogas questions again in birds.php global ghg assessment",
		"[REQUEST] Dropdown menu in global ghg for sludge disposal method (wwt_slu_type) Land application Landfill Covered landfill with gas recovery 4 Incineration with heat recovery 6 Composting 5 ",
		"[ADD ESTIMATION] formula for biogas flared estimated: ww_serv_pop * ww_bod_pday * ct_bod_kg * ct_biog_g/1000 * Days",
		"[IDEA] add a new 'global warming potential' number in general info while selecting the country",
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
