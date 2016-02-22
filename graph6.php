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
	<tr><td>aE1  <td><script>document.write(format(aE))</script>
	<tr><td>tE1  <td><script>document.write(format(tE))</script>
	<tr><td>dE1  <td><script>document.write(format(dE))</script>
	<tr><td>wcE1 <td><script>document.write(format(wcE))</script>
	<tr><td>wtE1 <td><script>document.write(format(wtE))</script>
	<tr><td>wdE1 <td><script>document.write(format(wdE))</script>
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
				[Info.aE1.description, aE||1],
				[Info.tE1.description, tE||1],
				[Info.dE1.description, dE||1],
				[Info.wcE1.description, wcE||1],
				[Info.wtE1.description, wtE||1],
				[Info.wdE1.description, wdE||1],
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
