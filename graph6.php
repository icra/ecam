<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 2 - GHG bar graph</h1>

<!--graph starts here-->
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			//pointers
			var ws   = Global.Water;
			var ww   = Global.Waste;
			var wsg  = Global.Water.General;
			var wwg  = Global.Waste.General;
			var uw1  = Global.UWS.uw1;
			var Days = Global.General.Days();
			//3 graphs * 8 slices per graph = 24 slices. 2 bars per graph = 6 bars
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
			//actual graph data
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
			}
			var view=new google.visualization.DataView(data);
			var chart=new google.visualization.ColumnChart(document.getElementById("graph"));
			chart.draw(view, options);

			//create a table (as a string)
			var table=""+
			"<table>"+
				"<tr><th>Bar		   <th>From electricity (formula)                 <th>From electricity (value) <th>Fuel used in engines (formula) <th>Fuel used in engines (value) <th>Biogas (formula)    <th>Biogas (value)      <th>Treated (formula)   <th>Treated (value)     <th>Untreated (formula)          <th>Untreated (value)   <th>Sludge transport (formula) <th>Sludge transport (value)"+
				"<tr><th>WS per capita <td>(ws5-wsg2-wsg4)*uw1*365/Days/ws2           <td>"+format(slice_1 )+     "<td>(c_ws51-c_wsg52)*365/Days/ws2  <td>"+format(slice_2 )+
				"<tr><th>WW per capita <td>((ww3-wwg2-wwg4)*uw1-c_wwg52)*365/Days/ww5 <td>"+format(slice_3 )+     "<td>c_ww57*365/Days/ww5            <td>"+format(slice_4 )+         "<td>c_ww55*365/Days/ww5 <td>"+format(slice_5 )+"<td>c_ww53*365/Days/ww5 <td>"+format(slice_6) +"<td>(c_ww51+c_ww52)*365/Days/ww5 <td>"+format(slice_7) +"<td>c_ww54*365/Days/ww5        <td>"+format(slice_8) +
				"<tr><th>WS per SP     <td>wGHG6_L2                                   <td>"+format(slice_9 )+     "<td>wGHG4_L2                       <td>"+format(slice_10)+
				"<tr><th>WW per SP     <td>wwGHG4_L2                                  <td>"+format(slice_11)+     "<td>wwGHG8                         <td>"+format(slice_12)+         "<td>wwGHG10             <td>"+format(slice_12)+"<td>wwGHG12             <td>"+format(slice_13)+"<td>wwGHG14                      <td>"+format(slice_14)+"<td>wwGHG16                    <td>"+format(slice_15)+
				"<tr><th>WS per AC     <td>wGHG7_L2                                   <td>"+format(slice_17)+     "<td>wGHG5_L2                       <td>"+format(slice_18)+
				"<tr><th>WW per CW     <td>wwGHG5_L2                                  <td>"+format(slice_19)+     "<td>wwGHG9                         <td>"+format(slice_20)+         "<td>wwGHG11             <td>"+format(slice_21)+"<td>wwGHG13             <td>"+format(slice_22)+"<td>wwGHG15                      <td>"+format(slice_23)+"<td>wwGHG17                    <td>"+format(slice_24)+
			"</table>";
			var div = document.createElement('div');
			div.innerHTML=table;
			document.getElementById('graph').appendChild(div);
		}
	</script>
	<div id="graph"></div>
<!--graph ends here-->
