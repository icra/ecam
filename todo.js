/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[WAIT]    Discuss graphs with IWA",
		"[WAIT]    Translation after v2 in english is complete",
		"[WAIT]    Add in the help page an example json file, after I/O structure does not change anymore",
		"[IDEA]    Add the sankey diagram (all water flows) (at 'graphs.js')",
		"[IDEA]    Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[DONE] GHG summary, modify units (easy, but time consuming)",
		"[PENDING] wwt Treatment - hide energy for land application, fuel for land application and related outputs (long)",
		"[PENDING] wwt Treatment - hide CO2 for each disposal method",
		"[PENDING] Energy summary only for consumption (easy, but time consuming)",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
