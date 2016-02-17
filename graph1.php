<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<table>
	<script>
		var ws = format(Math.floor(1e2*Global.Water.wGHG1())/1e2);
		var ww = format(Math.floor(1e2*Global.Waste.wwGHG1())/1e2);
	</script>
	<tr><th>KPI    <th>Value
	<tr><td><a href=variable.php?id=wGHG1>wGHG1</a>   <td><script>document.write(ws) </script>
	<tr><td><a href=variable.php?id=wwGHG1>wwGHG1</a> <td><script>document.write(ww)</script>
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
