<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG</h1>

<table>
	<tr><th>Variable<th>Value
	<tr>???<th>???
</table>
<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var WS = Global.Water;
			var WW = Global.Waste;

			var data=google.visualization.arrayToDataTable
			([
				[ 
					'Emission type', 
					'Category 1', 
					'Category 2', 
					{role:'annotation'} 
				],

				['????', 1, 1, ''],
				['????', 1, 1, ''],
			]);
			var options=
			{
				title:"GHG L1",
				width:1000,
				height:500,
				legend:{position:'right',maxLines:100},
				isStacked:true,
				colors: ['#00aeef','#bca613', '#f3a000', '#89375c'],
			};
			var view=new google.visualization.DataView(data);
			var chart=new google.visualization.BarChart(document.getElementById("graph"));
			chart.draw(view, options);
		}
	</script>
	<div id="graph"></div>
<!--graph ends here-->


<!--link to reference-->
<a href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts</a>
