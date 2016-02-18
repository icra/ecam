<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG emissions per capita</h1>

<table>
	<script>
		var ws = Global.Water.wGHG1()
		var ww = Global.Waste.wwGHG1()
	</script>
	<tr><th>KPI    <th>Value (kgCO2/inhab/year)
	<tr><td><a href=variable.php?id=wGHG1>wGHG1</a>   <td><script>document.write(format(ws)) </script>
	<tr><td><a href=variable.php?id=wwGHG1>wwGHG1</a> <td><script>document.write(format(ww))</script>
</table>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var data=google.visualization.arrayToDataTable([
				['Stage', 'Emissions'],
				[Info.wGHG1.description+" (Water supply)", Global.Water.wGHG1()],
				[Info.wwGHG1.description+" (Wastewater)",  Global.Waste.wwGHG1()],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"GHG emissions per capita",
				slices:
				{
					0:{ color: '#0aaeef' },
					1:{ color: '#f3a000' },
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
