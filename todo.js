/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[TODO] summary of estimations in birds eye view",
		"[WAIT] Graphs",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[TODO] Avoid document.write function when possible",
		"[WAIT] Translation will be done after v2 in english is complete (IWA should say this)",
		"[IDEA] function to check if two constant codes are repeated",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
