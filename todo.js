/* tasks items structure*/
var TODO=
{
	Back:
	[
		"'Natural Gas bug': space characters in json file do not save correctly",
		"Remake <a href=benchmark.php>Benchmark</a> data structure",
		"Create Opportunities data structure from zero",
		"Calculated variables: separate from inputs, or remove them. <a href=summary.php?type=ccvv>List</a>",
	],
	Front:
	[
		"Move advanced filters to the substage table (Andrés)",
		"Create select menu for options in variable.php for variables that are magnitude:Option",
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
