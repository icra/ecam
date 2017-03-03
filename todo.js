/*Tasks data structure*/
var TODO = {
	Front: //front-end
	[
		"[THURSDAY WITH ANDRES] Organize inputs in substages using filters",
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in the help page an example json file, after I/O structure does not change anymore",
		"[IDEA]    Add the sankey diagram (all water flows) (at 'graphs.js')",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back: //back-end
	[
		"[DONE] Add uncollected wastewater and onsite treatment variables",
		"[DONE] leave only countries in configuration",
		"[DONE] Modify N2O discharge emission",
		"[WAITING IWA]      Jose answers corrections for estimation of Dry weight in sludge produced (kg)",
		"[WAITING IWA]      List of Conversion factor for electricity (kgCO2eq per kWh) for each country",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
