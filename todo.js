/* tasks items structure*/
var TODO=
{
	Back:
	[
		"'Natural Gas bug': space characters in json file do not save correctly",
		"Recode <a href=benchmark.php>Benchmark</a> data structure",
		"Create Opportunities data structure from zero",
		"Deal with calculated variables. <a href=summary.php?type=ccvv>List</a>",
	],
	Front:
	[
		"fix yes/no question in global",
		"new graph for wsd_KPI_std_nrg_cons",
		"Population in Global again",
		"Graphs: add benchmark circles (difficult)",
		"Filter at the beginning (configuration page?), asking if there are fuel engines at any point, to hide all fuel related filters, inputs and outputs (Andrés)",
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
