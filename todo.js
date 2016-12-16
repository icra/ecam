/* Tasks data structure*/
var TODO=
{
	Back:
	[
		"<b>NOW</b> Recode <a href=benchmark.php>Benchmark</a> data structure",
		"<b>NOW</b> wsa_std_nrg_cons benchmark: argument should be pointer to object instead of value",
		"Opportunities in Abstraction",
		"Calculated variables. <a href=summary.php?type=ccvv>List</a>",
	],
	Front:
	[
		"Filter at the beginning, asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Fix question in Global",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Help resources: json file and manual to download",
		"Translate new features",
	],
};

/*write tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
