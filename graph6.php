<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L2 - Energy consumption per water volume</h1>

<table>
	<script>
		var aE = Global.Water.Abstraction.aE1();
		var tE = Global.Water.Treatment.tE1();
		var dE = Global.Water.Distribution.dE1();
		var wcE = Global.Waste.Collection.wcE1();
		var wtE = Global.Waste.Treatment.wtE1();
		var wdE = Global.Waste.Discharge.wdE1();
	</script>
	<tr><th>KPI  <th>Value (kWh/m<sup>3</sup>)
	<tr><td><a href=variable.php?id=aE1>aE1</a>	 <td><script>document.write(format(aE))</script>
	<tr><td><a href=variable.php?id=tE1>tE1</a>	 <td><script>document.write(format(tE))</script>
	<tr><td><a href=variable.php?id=dE1>dE1</a>	 <td><script>document.write(format(dE))</script>
	<tr><td><a href=variable.php?id=wcE1>wcE1</a> <td><script>document.write(format(wcE))</script>
	<tr><td><a href=variable.php?id=wtE1>wtE1</a> <td><script>document.write(format(wtE))</script>
	<tr><td><a href=variable.php?id=wdE1>wdE1</a> <td><script>document.write(format(wdE))</script>
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
				['Stage', 'Emissions'],
				[Info.aE1.description, aE],
				[Info.tE1.description, tE],
				[Info.dE1.description, dE],
				[Info.wcE1.description, wcE],
				[Info.wtE1.description, wtE],
				[Info.wdE1.description, wdE],
			]);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"Energy consumption per water volume",
				slices:
				{
					0:{ color: '#66cef5' },
					1:{ color: '#0083b3' },
					2:{ color: '#cceffc' },
					3:{ color: '#b67800' },
					4:{ color: '#f8c666' },
					5:{ color: '#fad999' },
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
