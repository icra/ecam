<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var data=google.visualization.arrayToDataTable
			([
				[ 
					'Emission type', 
					'from electricity (Water supply)', 
					'non-electricity (Water supply)', 
					'from electricity (Wastewater)', 
					'non-electricity (Wastewater)', 
					{role:'annotation'} 
				],
				['GHG per serviced population',    Global.Water.wGHG6(), Global.Water.wGHG4(), Global.Waste.wwGHG4(), Global.Waste.wwGHG6(), '' ],
				['GHG per authorized consumption', Global.Water.wGHG7(), Global.Water.wGHG5(), Global.Waste.wwGHG5(), Global.Waste.wwGHG7() , ''],
			]);
			var options=
			{
				title:"GHG serviced population & authorized consumption",
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
