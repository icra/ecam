<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<h2>Graph 1: GHG per capita</h2>
<div>To do: ask Which kpi go inside</div>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!--graph--><div id=graph></div>

<script>
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		var data = google.visualization.arrayToDataTable([
			['Stage', 'Emissions'],
			['Work',     8],
			['Eat',      4],
			['Sleep',    10],
		]);
		var options = 
		{ 
			title:'My Daily Activities',
			height:400,
		};
		var chart=new google.visualization.PieChart(document.getElementById('graph'));
		chart.draw(data, options);
	}
</script>
