<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - Energy consumption</h1>

<table>
	<script>
		//pointer
		var Days=Global.General.Days();
		//values
		var ws=Global.Water.ws5*365/Days;
		var ww=Global.Waste.ww3*365/Days;
	</script>
	<tr><th>Slice        <th>Formula                                      <th>Value (kWh/year)
	<tr><td>Water supply <td><a href=variable.php?id=ws5>ws5</a>*365/Days <td><script>document.write(format(ws))</script>
	<tr><td>Wastewater   <td><a href=variable.php?id=ww3>ww3</a>*365/Days <td><script>document.write(format(ww))</script>
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
				["Water supply", ws],
				["Wastewater",   ww],
			]);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"L1 Energy consumption",
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
