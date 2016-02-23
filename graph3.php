<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - GHG bar graph</h1>

<table>
	<script>
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var Days = Global.General.Days();
		var uw1 = Global.UWS.uw1;
	
		//3 graphs: 2 bars each = 6 bars

		//BAR 1
		var slice_1  = WS.c_ws51()*365/Days/WS.ws2;
		var slice_2  = WS.ws5*uw1*365/Days/WS.ws2;
		//BAR 2
		var slice_3  = (WW.c_ww57()+WW.c_ww55()+WW.c_ww53()+WW.c_ww51()+WW.c_ww52()+WW.c_ww54())*365/Days/WW.ww5||0;
		var slice_4  = WW.ww3*uw1*365/Days/WW.ww5;
		//BAR 3
		var slice_5  = WS.wGHG4();
		var slice_6  = WS.wGHG6();
		//BAR 4
		var slice_7  = WW.wwGHG6();
		var slice_8  = WW.wwGHG4();
		//BAR 5
		var slice_9  = WS.wGHG5();
		var slice_10 = WS.wGHG7();
		//BAR 6
		var slice_11 = WW.wwGHG7();
		var slice_12 = WW.wwGHG5();

/*----------------------------- above this line is ok ------------------------------------*/
	</script>
	<tr><th>GHG           <th>Non electrical (formula)                                 <th>Value                                             <th>Electrical (formula) <th>Value
	<tr><th>WS per capita <td>c_ws51*365/Days/ws2                                      <td><script>document.write(format(slice_1)) </script> <td>ws5*uw1*365/Days/ws2 <td><script>document.write(format(slice_2)) </script>
	<tr><th>WW per capita <td>(c_ww57+c_ww55+c_ww53+c_ww51+c_ww52+c_ww54)*365/Days/ww5 <td><script>document.write(format(slice_3)) </script> <td>ww3*uw1*365/Days/ww5 <td><script>document.write(format(slice_4)) </script>
	<tr><th>WS per SP     <td>wGHG4                                                    <td><script>document.write(format(slice_5)) </script> <td>wGHG6                <td><script>document.write(format(slice_6)) </script>
	<tr><th>WW per SP     <td>wwGHG6                                                   <td><script>document.write(format(slice_7)) </script> <td>wwGHG4               <td><script>document.write(format(slice_8)) </script>
	<tr><th>WS per AC     <td>wGHG5                                                    <td><script>document.write(format(slice_9)) </script> <td>wGHG7                <td><script>document.write(format(slice_10))</script>
	<tr><th>WW per CW     <td>wwGHG7                                                   <td><script>document.write(format(slice_11))</script> <td>wwGHG5               <td><script>document.write(format(slice_12))</script>
</table>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var data=google.visualization.arrayToDataTable
			([
				[ 
					'Emission type', 
					'Non-electrical related', 
					'Electrical related', 
					{role:'annotation'} 
				],

				['WS per capita', slice_1 , slice_2 , ''],
				['WW per capita', slice_3 , slice_4 , ''],
				['WS per SP',     slice_5 , slice_6 , ''],
				['WW per SP',     slice_7 , slice_8 , ''],
				['WS per AC',     slice_9 , slice_10, ''],
				['WW per CW',     slice_11, slice_12, ''],
			]);
			var options=
			{
				title:"L1 GHG",
				width:1000,
				height:500,
				legend:{position:'right',maxLines:100},
				isStacked:true,
				colors: ['#00aeef','#bca613', '#f3a000', '#89375c'],
			};
			var view=new google.visualization.DataView(data);
			var chart=new google.visualization.ColumnChart(document.getElementById("graph"));
			chart.draw(view, options);
		}
	</script>
	<div id="graph"></div>
<!--graph ends here-->
