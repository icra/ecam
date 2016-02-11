<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<h2>Graph 2: GHG per stage</h2>
<div>Ask which kpi go inside</div>

<script src="https://www.gstatic.com/charts/loader.js"></script>
<!--graph--><div id="graph"></div>

<script>
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		var data = google.visualization.arrayToDataTable([
			['Stage', 
				'Water', 
				'Wastewater', 
				'Water Abstraction', 
				'Water Treatment', 
				'Water Distribution', 
				'Waste Collection', 
				'Waste Treatment', 
				'Waste Discharge', 
				{ role: 'annotation' } ],
			['Level 1', 54, 55, 0,  0,  0,  0, 0,0,''],
			['Level 2', 10, 24, 20, 32, 18, 5, 0,0,''],
		]);
		var options = 
		{
			width:800,
			height:400,
			legend:{position:'top',maxLines:9},
			isStacked:true
		};
		var view=new google.visualization.DataView(data);
		var chart=new google.visualization.BarChart(document.getElementById("graph"));
		chart.draw(view, options);
	}
</script>
<a href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts</a>
