/* Tasks data structure*/
var TODO=
{
	Back:
	[
		"Fix placing of titles above benchmarking, do not overlap",
		"In variable.php show if a variable is used only for benchmark (like 'wsa_pmp_size')",
		"<b>NOW</b> EXCEL Water Distribution",
		"Calculated variables. <a href=summary.php?type=ccvv>List</a>",
		"No manual, do FAQ instead: a page which is a JSON file reader with a structure {Question:Answer,Question:Answer}",
	],
	Front:
	[
		"Filter at the beginning, asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Fix question in Global",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Help resources: json file to download",
		"Translate new features",
	],
};

/*write tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
