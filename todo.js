/* Tasks data structure*/
var TODO=
{
	Back:
	[
		"<b style=background:yellow>NOW</b> Opportunities in Abstraction",
		"Recode <a href=benchmark.php>Benchmark</a> data structure",
		"Deal with calculated variables. <a href=summary.php?type=ccvv>List</a>",
	],
	Front:
	[
		"Filter at the beginning (configuration page?), asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Fix yes/no question in global",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Help resources: example json file and manual",
		"Translate new features",
	],
};

/*write tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
