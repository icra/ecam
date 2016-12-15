/* tasks items structure*/
var TODO=
{
	Back:
	[
		"Recode <a href=benchmark.php>Benchmark</a> data structure",
		"Create Opportunities data structure from zero",
		"Deal with calculated variables. <a href=summary.php?type=ccvv>List</a>",
	],
	Front:
	[
		"<span style='background:yellow'>NOW</span> New graph for wsd_KPI_std_nrg_cons",
		"Fix yes/no question in global",
		"Filter at the beginning (configuration page?), asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
		"Graphs: add benchmark circles (difficult). Idea color graphs with green/orange/red ",
		"Help resources: example json file and manual",
		"Translate new features",
	],
};

/*write tasks inside a <ul>*/
TODO.list=function(arr)
{
	arr.forEach(function(task)
	{
		document.write("<li>"+task);
	});
};
