/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[WAIT] Discuss graphs with IWA",
		"[WAIT] Translation after v2 in english is complete",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[DONE] GHG summary, modify units (easy, but time consuming)",
		"[DONE] Energy summary only for consumption (easy, but time consuming)",
		"[DONE] Hide energy for land application, fuel for land application and related outputs",
		"[PENDING] wwt Treatment - hide CO2 for each disposal method",
		"[WAITING IWA] kWh to CO2 factor for each country",
		"[WAITING JOSE] Formulas for estimation of mass of sludge produced are wrong",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
