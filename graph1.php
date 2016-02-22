<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - GHG emissions</h1>

<table>
	<script>
		var ws = Global.Water;
		var ww = Global.Waste;

		wsNon=ws.c_ws51();
		wsYes=ws.ws5*Global.UWS.uw1;
		wwNon=ww.c_ww57()+ww.c_ww55()+ww.c_ww53()+ww.c_ww51()+ww.c_ww52()+ww.c_ww54();
		wwYes=ww.ww3*Global.UWS.uw1;

	</script>
	<tr><th>field             <th>Value (kgCO2/inhab/year)
	<tr><td>ws NON electrical <td><script>document.write(format(wsNon)) </script>
	<tr><td>ws     electrical <td><script>document.write(format(wsYes)) </script>
	<tr><td>ww NON electrical <td><script>document.write(format(wwNon)) </script>
	<tr><td>ww     electrical <td><script>document.write(format(wwYes)) </script>
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
				["ws non electrical", wsNon||1],
				["ws electrical",     wsYes||1],
				["ww non electrical", wwNon||1],
				["ww electrical",     wwYes||1],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"GHG emissions",
				slices:
				{
					0:{ color: '#0aaeef' },
					1:{ color: '#0aaeef' },
					2:{ color: '#f3a000' },
					3:{ color: '#f3a000' },
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
