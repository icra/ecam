/* Tasks data structure*/
var TODO=
{
	Back://back-end
	[
		"Graphs: resurrect flow diagram",
		"Calculated variables. <a href=summary.php?type=ccvv>List</a>",
		"Find repeated variables in dataModel/questions.js",
		"Improve speed using https://developers.google.com/speed/pagespeed/insights/",
	],
	Front://front-end
	[
		"Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"Filter at the beginning, asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Fix biogas question hide in Global (wait until we finish ww stages)",
		"F.A.Q.: a page JSON file reader structure {Question:Answer,Question:Answer}",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Translate new features after v2",
		"Help page: upload an example json file to download",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
