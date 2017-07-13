/*Tasks data structure*/
var TODO = {
	Front://front-end
	[
		"[RANJIN] Graphs requests, add here from paper notes after meeting",

		"[LLUIS] make a page to display authorized consumption per person per day indicators (good,acceptable,bad)",

		"[WAIT] Sankey diagram (all water flows) (at 'graphs.js')",
		"[WAIT] Add references (page, chapter, book) to equations (IPCC, BEAM, ...?)",
		"[WAIT] Add in the help page an example json file, after I/O structure does not change anymore",
	],
	Back://back-end
	[
		"[DONE] add estimations for biogas produced and valorised",

		"[JOSE] fix non revenue water formulas",

		"[LLUIS] create constants for numbers in <a href=variable.php?id=c_wwt_nrg_biog>c_wwt_nrg_biog</a> (energy content in biogas valorized)",
		"[LLUIS] create a list with formulas that have numbers that have to be turned into constants",
		"[LLUIS] add tasks from last meeting (6-7-17, 7-7-17) from paper notes",

		"[WAIT] Translation will be done after v2 in english is complete (IWA should say this)",

		"[IDEA] Avoid document.write function when possible",
		"[IDEA] function to check if two constant codes are repeated",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
