<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - Energy consumption</h1>

<table>
	<script>
		var ws = Global.Water.ws5;
		var ww = Global.Waste.ww3;
	</script>
	<tr><th>Formula  <th>Value (kWh)
	<tr><td><a href=variable.php?id=ws5>ws5</a> <td><script>document.write(format(ws))</script>
	<tr><td><a href=variable.php?id=ww3>ww3</a> <td><script>document.write(format(ww))</script>
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
				["ws5: "+Info.ws5.description+" (Water supply)", ws||1],
				["ww3: "+Info.ww3.description+" (Wastewater)",  ww||1],
			]);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"Energy consumption",
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
