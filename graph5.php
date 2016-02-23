<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L2 - Energy consumption</h1>

<table>
	<script>
		var slice_1 = Global.Water.Abstraction.wsa1
		var slice_2 = Global.Water.Treatment.wst2;
		var slice_3 = Global.Water.Distribution.wsd1;
		var slice_4 = Global.Waste.Collection.wwc2;
		var slice_5 = Global.Waste.Treatment.wwt9;
		var slice_6 = Global.Waste.Discharge.wwd3;
	</script>
	<tr><th>Formula <th>Value (kWh/m<sup>3</sup>)
	<tr><td><a href=variable.php?id=wsa1>wsa1</a><td><script>document.write(format(slice_1))</script>
	<tr><td><a href=variable.php?id=wst2>wst2</a><td><script>document.write(format(slice_2))</script>
	<tr><td><a href=variable.php?id=wsd1>wsd1</a><td><script>document.write(format(slice_3))</script>
	<tr><td><a href=variable.php?id=wwc2>wwc2</a><td><script>document.write(format(slice_4))</script>
	<tr><td><a href=variable.php?id=wwt9>wwt9</a><td><script>document.write(format(slice_5))</script>
	<tr><td><a href=variable.php?id=wwd3>wwd3</a><td><script>document.write(format(slice_6))</script>
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
				["Water Abstraction",     slice_1||1],
				["Water Treatment",       slice_2||1],
				["Water Distribution",    slice_3||1],
				["Wastewater Collection", slice_4||1],
				["Wastewater Treatment",  slice_5||1],
				["Wastewater Dis", slice_6||1],
			]);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"Energy consumption per stage",
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
