<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG bar graph</h1>

<table>
	<script>
		var WS = Global.Water
		var WW = Global.Waste
		//BAR 1 - wGHG1
		var slice_1 = WS.ws5*Global.UWS.uw1/WS.ws2;
		var slice_2 = WS.c_ws51()/WS.ws2;
		//BAR 2 - wwGHG1
		var slice_3 = WW.ww3*Global.UWS.uw1/WW.ww5;
		var slice_4 = WW.c_ww57()/WW.ww5;
		var slice_5 = WW.c_ww55()/WW.ww5;
		var slice_6 = WW.c_ww53()/WW.ww5;
		var slice_7 = WW.c_ww51()/WW.ww5;
		var slice_8 = WW.c_ww52()/WW.ww5;
		var slice_9 = WW.c_ww54()/WW.ww5;
		//BAR 3 - wGHG2
		var slice_10 = WS.ws5*Global.UWS.uw1/WS.ws1;
		var slice_11 = WS.c_ws51()/WS.ws1;
		//BAR 4 - wwGHG2
		var slice_12 = WW.ww3*Global.UWS.uw1/WW.ww7;
		var slice_13 = WW.c_ww57()/WW.ww7;
		var slice_14 = WW.c_ww55()/WW.ww7;
		var slice_15 = WW.c_ww53()/WW.ww7;
		var slice_16 = WW.c_ww51()/WW.ww7;
		var slice_17 = WW.c_ww52()/WW.ww7;
		var slice_18 = WW.c_ww54()/WW.ww7;
		//BAR 5 - wGHG3
		var slice_19 = WS.ws5*Global.UWS.uw1/WS.ws7;
		var slice_20 = WS.c_ws51()/WS.ws7;
		//BAR 6 - wwGHG3
		var slice_21 = WW.ww3*Global.UWS.uw1/WW.ww4;
		var slice_22 = WW.c_ww57()/WW.ww4;
		var slice_23 = WW.c_ww55()/WW.ww4;
		var slice_24 = WW.c_ww53()/WW.ww4;
		var slice_25 = WW.c_ww51()/WW.ww4;
		var slice_26 = WW.c_ww52()/WW.ww4;
		var slice_27 = WW.c_ww54()/WW.ww4;
	</script>
	<tr><th>WS per capita (wGHG1)  <td> ws5*uw1/ws2 <td>c_ws51/ws2
	<tr><th>WW per capita (wwGHG1) <td> ww3*uw1/ww5 <td>c_ww57/ww5 <td>c_ww55/ww5 <td>c_ww53/ww5 <td>c_ww51/ww5 <td>c_ww52/ww5 <td>c_ww54/ww5
	<tr><th>WS per SP (wGHG2)      <td> ws5*uw1/ws1 <td>c_ws51/ws1
	<tr><th>WW per SP (wwGHG2)     <td> ww3*uw1/ww7 <td>c_ww57/ww7 <td>c_ww55/ww7 <td>c_ww53/ww7 <td>c_ww51/ww7 <td>c_ww52/ww7 <td>c_ww54/ww7
	<tr><th>WS per AC (wGHG3)      <td> ws5*uw1/ws7 <td>c_ws51/ws7
	<tr><th>WW per CW (wwGHG3)     <td> ww3*uw1/ww4 <td>c_ww57/ww4 <td>c_ww55/ww4 <td>c_ww53/ww4 <td>c_ww51/ww4 <td>c_ww52/ww4 <td>c_ww54/ww4
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
						'Non-electricity', 
						'Fuel used in engines',
						'Untreated sewage',
						'Treated sewage discharged to river',
						'Biogas production flared or released',
						'Sludge transport',
						{role:'annotation'} 
				],
				['Water per capita',
					slice_1||1,
					slice_2||1,
					0, 0, 0, 0, 0, ''
				],
				['Wastewater per capita',
					slice_3||1,
					slice_4||1,
					slice_5||1,
					slice_6||1,
					slice_7||1,
					slice_8||1,
					slice_9||1,
					''
				],
				['Water per SP',
					slice_10||1,
					slice_11||1,
					0, 0, 0, 0, 0, ''
				],
				['Wastewater per SP', 
					slice_12||1,
					slice_13||1,
					slice_14||1,
					slice_15||1,
					slice_16||1,
					slice_17||1,
					slice_18||1,
					''
				],
				['Water per AC',     
					slice_19||1,
					slice_20||1,
					0, 0, 0, 0, 0, ''
				],
				['Wastewater per SP', 
					slice_21||1,
					slice_22||1,
					slice_23||1,
					slice_24||1,
					slice_25||1,
					slice_26||1,
					slice_27||1,
					''
				],
			]);
			var options=
			{
				title:"GHG serviced population & authorized consumption",
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
			};
			var view=new google.visualization.DataView(data);
			var chart=new google.visualization.BarChart(document.getElementById("graph"));
			chart.draw(view, options);
		}
	</script>
	<div id="graph"></div>
<!--graph ends here-->

<!--link to reference-->
<a href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts</a>
