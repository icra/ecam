<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG emissions per serviced population, per authorized consumption, per collected wastewater</h1>

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
					'from electricity (Water supply)', 
					'non-electricity (Water supply)', 
					{role:'annotation'} 
				],

				['Water per SP',       WS.wGHG6()||1,  WS.wGHG4()||1,  ''], //ok
				['Wastewater per SP',  WW.wwGHG4()||1, WW.wwGHG6()||1, ''], //ok
				['Water per AC',       WS.wGHG7()||1,  WS.wGHG5()||1,  ''], //ok
				['Wastewater per CW',  WW.wwGHG5()||1, WW.wwGHG7()||1, ''], //ok

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
