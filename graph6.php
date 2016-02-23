<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 2 - GHG bar graph</h1>

<table>
	<script>
		//pointers
		var ws   = Global.Water;
		var ww   = Global.Waste;
		var wsg  = Global.Water.General;
		var wwg  = Global.Waste.General;
		var uw1  = Global.UWS.uw1;
		var Days = Global.General.Days();

		//BAR 1
		var slice_1 = (ws.ws5-wsg.wsg2-wsg.wsg4)*uw1*365/Days/ws.ws2;
		var slice_2 = (ws.c_ws51()-wsg.c_wsg52())*365/Days/ws.ws2;
		//BAR 2
		var slice_3 = ((ww.ww3-wwg.wwg2-wwg.wwg4)*uw1-wwg.c_wwg52())*365/Days/ww.ww5;
		var slice_4 = ww.c_ww57()*365/Days/ww.ww5;
		var slice_5 = ww.c_ww55()*365/Days/ww.ww5;
		var slice_6 = ww.c_ww53()*365/Days/ww.ww5;
		var slice_7 = (ww.c_ww51()+ww.c_ww52())*365/Days/ww.ww5;
		var slice_8 = ww.c_ww54()*365/Days/ww.ww5;
		//BAR 3
		var slice_9  = wsg.wGHG6_L2();
		var slice_10 = wsg.wGHG4_L2();
		//BAR 4
		var slice_11 = wwg.wwGHG4_L2()
		var slice_12 = wwg.wwGHG8()
		var slice_13 = wwg.wwGHG10()
		var slice_14 = wwg.wwGHG12()
		var slice_15 = wwg.wwGHG14()
		var slice_16 = wwg.wwGHG16()
		//BAR 5
		var slice_17 = wsg.wGHG7_L2();
		var slice_18 = wsg.wGHG5_L2();
		//BAR 6
		var slice_19 = wwg.wwGHG5_L2();
		var slice_20 = wwg.wwGHG9();
		var slice_21 = wwg.wwGHG11();
		var slice_22 = wwg.wwGHG13();
		var slice_23 = wwg.wwGHG15();
		var slice_24 = wwg.wwGHG17();
	</script>

	<tr><th>Bar		      <th>From electricity (formula)                 <th>From electricity (value)                          <th>Fuel used in engines (formula) <th>Fuel used in engines (value)                      <th>Biogas (formula)    <th>Biogas (value)                                    <th>Treated (formula)   <th>Treated (value)                                   <th>Untreated (formula)          <th>Untreated (value)                                 <th>Sludge transport (formula) <th>Sludge transport (value)
	<tr><th>WS per capita <td>(ws5-wsg2-wsg4)*uw1*365/Days/ws2           <td><script>document.write(format(slice_1)) </script> <td>(c_ws51-c_wsg52)*365/Days/ws2  <td><script>document.write(format(slice_2)) </script>
	<tr><th>WW per capita <td>((ww3-wwg2-wwg4)*uw1-c_wwg52)*365/Days/ww5 <td><script>document.write(format(slice_3)) </script> <td>c_ww57*365/Days/ww5            <td><script>document.write(format(slice_4)) </script> <td>c_ww55*365/Days/ww5 <td><script>document.write(format(slice_5)) </script> <td>c_ww53*365/Days/ww5 <td><script>document.write(format(slice_6)) </script> <td>(c_ww51+c_ww52)*365/Days/ww5 <td><script>document.write(format(slice_7)) </script> <td>c_ww54*365/Days/ww5        <td><script>document.write(format(slice_8)) </script>
	<tr><th>WS per SP     <td>wGHG6_L2                                   <td><script>document.write(format(slice_9)) </script> <td>wGHG4_L2                       <td><script>document.write(format(slice_10))</script>                                                                                                                                                                                                                                                                                  
	<tr><th>WW per SP     <td>wwGHG4_L2                                  <td><script>document.write(format(slice_11))</script> <td>wwGHG8                         <td><script>document.write(format(slice_12))</script> <td>wwGHG10             <td><script>document.write(format(slice_12))</script> <td>wwGHG12             <td><script>document.write(format(slice_13))</script> <td>wwGHG14                      <td><script>document.write(format(slice_14))</script> <td>wwGHG16                    <td><script>document.write(format(slice_15))</script>
	<tr><th>WS per AC     <td>wGHG7_L2                                   <td><script>document.write(format(slice_17))</script> <td>wGHG5_L2                       <td><script>document.write(format(slice_18))</script>                                                                                                                                                                                                                                                                                 
	<tr><th>WW per CW     <td>wwGHG5_L2                                  <td><script>document.write(format(slice_19))</script> <td>wwGHG9                         <td><script>document.write(format(slice_20))</script> <td>wwGHG11             <td><script>document.write(format(slice_21))</script> <td>wwGHG13             <td><script>document.write(format(slice_22))</script> <td>wwGHG15                      <td><script>document.write(format(slice_23))</script> <td>wwGHG17                    <td><script>document.write(format(slice_24))</script>
</table>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{

			var data=google.visualization.arrayToDataTable([
				[ 'Emission type', 
						'From electricity', 
						'Fuel used in engines',
						'Biogas production flared or released',
						'Treated sewage discharged to river',
						'Untreated sewage',
						'Sludge transport',
						{role:'annotation'} 
				],
				['WS per capita',
					slice_1,
					slice_2,
					0, 0, 0, 0, ''
				],
				['WW per capita',
					slice_3,
					slice_4,
					slice_5,
					slice_6,
					slice_7,
					slice_8,
					''
				],
				['WS per SP',
					slice_9 ,
					slice_10,
					0, 0, 0, 0, ''
				],
				['WW per SP', 
					slice_11,
					slice_12,
					slice_13,
					slice_14,
					slice_15,
					slice_16,
					''
				],
				['WS per AC',     
					slice_17,
					slice_18,
					0, 0, 0, 0, ''
				],
				['WW per SP', 
					slice_19,
					slice_20,
					slice_21,
					slice_22,
					slice_23,
					slice_24,
					''
				],
			]);
			var options=
			{
				title:"L2 GHG",
				width:1000,
				height:500,
				legend:{position:'right',maxLines:100},
				isStacked:true,
				colors: [
					'#bca613', 
					'#aaa',
					'#451c2e',
					'#672945',
					'#a15f7d',
					'#b8879d',
					'#d0afbe',
				],
				series:
				{
					0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
					1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
				},
				axes:
				{
					x:
					{
						distance: {label: 'parsecs'}, // Bottom x-axis.
						brightness: {side: 'top', label: 'apparent magnitude'} // Top x-axis.
					},
				}
			}
			var view=new google.visualization.DataView(data);
			var chart=new google.visualization.ColumnChart(document.getElementById("graph"));
			chart.draw(view, options);
		}
	</script>
	<div id="graph"></div>
<!--graph ends here-->
