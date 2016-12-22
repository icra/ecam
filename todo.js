/* Tasks data structure*/
var TODO=
{
	Back://back-end
	[
		"Graphs: resurrect all in graph.php",
		"Improve speed using https://developers.google.com/speed/pagespeed/insights/",
		"Calculated variables. <a href=summary.php?type=ccvv>List</a>",
		"debug: Automatic find repeated variables in dataModel/questions.js",
	],
	Front://front-end
	[
		"Filter at the beginning, asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Fix question hide in Global (wait until we finish ww stages)",
		"No manual: FAQ instead: a page JSON file reader structure {Question:Answer,Question:Answer}",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Help resources: json file to download",
		"Translate new features",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
