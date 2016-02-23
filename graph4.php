<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 2 - GHG</h1>

<table>
	<script>
		//Pointers
		var ws   = Global.Water
		var wsg  = Global.Water.General
		var ww   = Global.Waste
		var wwg  = Global.Waste.General
		var Days = Global.General.Days()
		//Values
		var slice_1 = ww.c_ww54()*365/Days;
		var slice_2 = (wsg.c_wsg50()*Global.UWS.uw1-wsg.wsg4)*365/Days;
		var slice_3 = ws.c_ws51()*365/Days;
		var slice_4 = (ww.ww3-wwg.wwg2-wwg.wwg4)*Global.UWS.uw1*365/Days;
		var slice_5 = ww.c_ww57()*365/Days; 
		var slice_6 = ww.c_ww55()*365/Days;
		var slice_7 = (ww.c_ww51()+ww.c_ww52())*365/Days;
		var slice_8 = ww.Treatment.c_wwt60()*365/Days;
	</script>
	<tr><th>Field                                 <th>Formula                      <th>Value (kgCO2/year)
	<tr><td>GHG from sludge transport             <td>c_ww54*365/Days              <td><script>document.write(format(slice_1))</script>
	<tr><td>GHG electricyty (water)               <td>(c_wsg50*uw1-wsg4)*365/Days  <td><script>document.write(format(slice_2))</script>
	<tr><td>GHG from fuel engines (water)         <td>c_ws51*365/Days              <td><script>document.write(format(slice_3))</script>
	<tr><td>GHG from electricity (wastewater)     <td>(ww3-wwg2-wwg4)*uw1*365/Days <td><script>document.write(format(slice_4))</script>
	<tr><td>GHG from fuel engines (wastewater)    <td>c_ww57*365/Days              <td><script>document.write(format(slice_5))</script>
	<tr><td>GHG from biogas handling (wastewater) <td>c_ww55*365/Days              <td><script>document.write(format(slice_6))</script>
	<tr><td>GHG from untreated effluent discharge <td>(c_ww51+c_ww52)*365/Days     <td><script>document.write(format(slice_7))</script>
	<tr><td>GHG from treated effluent discharge   <td>c_wwt60*365/Days             <td><script>document.write(format(slice_8))</script>
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
				['Stage','Emissions'],
				['GHG from sludge transport             ', slice_1],
				['GHG electricyty (water)               ', slice_2],
				['GHG from fuel engines (water)         ', slice_3],
				['GHG from electricity (wastewater)     ', slice_4],
				['GHG from fuel engines (wastewater)    ', slice_5],
				['GHG from biogas handling (wastewater) ', slice_6],
				['GHG from untreated effluent discharge ', slice_7],
				['GHG from treated effluent discharge   ', slice_8],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"L2 GHG",
				slices:
				{
					0:{color:'#d0afbe'},
					1:{color:'#bca613'},
					2:{color:'#453f1c'},
					3:{color:'#89375c'},
					4:{color:'#451c2e'},
					5:{color:'#b8879d'},
					6:{color:'#672945'},
					7:{color:'#a15f7d'},
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
