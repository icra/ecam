/*Tasks data structure*/
var TODO = {
	Back://back-end
	[
		"Unwrap wrapping ghg variables, like wsa_KPI_GHG_ne",
		"Cookies that remember folding of cards while using the tool",
		"Graphs: resurrect flow diagram",
		"Improve speed using https://developers.google.com/speed/pagespeed/insights/",
		"c_wwt_nrg_tran bug units TJ to kWh to solve",
	],
	Front://front-end
	[
		"Include a link to IPCC book in PDF and references (page or chapter) in equations",
		"FAQ: a JSON file reader. structure {Question:Answer,Question:Answer}",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Translate new features after v2",
		"Help page: upload an example json file to download after v2",
	],
};

/*list tasks inside a <ul>*/
TODO.list=function(arr){arr.forEach(function(task){document.write("<li>"+task)})};
