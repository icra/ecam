<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - GHG</h1>

<table>
	<script>
		//pointers
		var ws = Global.Water;
		var ww = Global.Waste;
		var uw1 = Global.UWS.uw1;
		var Days = Global.General.Days();

		var wsNon=ws.c_ws51()*365/Days;
		var wsYes=ws.ws5*uw1*365/Days;
		var wwNon=(ww.c_ww57()+ww.c_ww55()+ww.c_ww53()+ww.c_ww51()+ww.c_ww52()+ww.c_ww54())*365/Days;
		var wwYes=ww.ww3*uw1*365/Days;
	</script>
	<tr><th>Slice             <th>Formula                                              <th>Value (kgCO2/year)
	<tr><td>ws non electrical <td>c_ws51*365/Days                                      <td><script>document.write(format(wsNon)) </script>
	<tr><td>ws     electrical <td>ws5*uw1*365/Days                                     <td><script>document.write(format(wsYes)) </script>
	<tr><td>ww non electrical <td>(c_ww57+c_ww55+c_ww53+c_ww51+c_ww52+c_ww54)*365/Days <td><script>document.write(format(wwNon)) </script>
	<tr><td>ww     electrical <td>ww3*uw1*365/Days                                     <td><script>document.write(format(wwYes)) </script>
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
				["ws non electrical", wsNon],
				["ws electrical",     wsYes],
				["ww non electrical", wwNon],
				["ww electrical",     wwYes],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"L1 GHG",
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
