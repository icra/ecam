<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L2 - GHG emissions per capita</h1>

<table>
	<script>
		var ws = Global.Water.General.wGHG1_L2();
		var ww = Global.Waste.General.wwGHG1_L2();
	</script>
	<tr><th>KPI    <th>Value (kgCO2/inhab/year)
	<tr><td><a href=variable.php?id=wGHG1_L2>wGHG1_L2</a>   <td><script>document.write(format(ws)) </script>
	<tr><td><a href=variable.php?id=wwGHG1_L2>wwGHG1_L2</a> <td><script>document.write(format(ww))</script>
</table>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var data=google.visualization.arrayToDataTable
			([
				['Stage','Emissions'],
				[Info.wGHG1.description +" (Water supply)", ws||1],
				[Info.wwGHG1.description+" (Wastewater)",   ww||1],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"GHG emissions per capita",
				slices:
				{
					0:{color:'#0aaeef'},
					1:{color:'#f3a000'},
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
