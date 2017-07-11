/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[WAIT] Graphs",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page,chapter,book) to equations (IPCC, BEAM, ...?)",
	],
	Back://back-end
	[
		"[TODO] add tasks from last meeting (6-7-17, 7-7-17)",
		"[RANJIN] add estimations for biogas produced and valorised",
		"[WAIT] Translation will be done after v2 in english is complete (IWA should say this)",
		"[IDEA] Avoid document.write function when possible",
		"[IDEA] function to check if two constant codes are repeated",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
