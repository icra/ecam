<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script 
		src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}">
	</script>
</head><body><center>
<!--navbar--><?php include'navbar.php'?>
<!--title--><h1>Sankey diagram example</h1>
<!--diagram--><div id="sankey"></div>

<script>
	//diagram creation
	google.setOnLoadCallback(drawChart);
	function drawChart(){
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'From');
		data.addColumn('string', 'To');
		data.addColumn('number', 'Weight');
		data.addRows([
			['W Abstraction', 	'W Treatment', 		100],
			['W Treatment', 	'W Distribution', 	80],
			['W Distribution', 	'USERS', 			50],
			['USERS',			'WW Collection',	150],
			['WW Collection',	'WW Treatment',		100],
			['WW Treatment',	'WW Discharge', 	60],
		]);

		// Sets chart options.
		var options = {"width":"900",};

		// Instantiates and draws our chart, passing in options.
		var chart = new google.visualization.Sankey(document.getElementById('sankey'));
		chart.draw(data,options);
	}
</script>

<a href="https://developers.google.com/chart/interactive/docs/gallery/sankey">https://developers.google.com/chart/interactive/docs/gallery/sankey</a>
