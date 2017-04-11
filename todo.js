/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[WAIT] IWA did not specify graphs",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[WAIT] Translation after v2 in english is complete",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
