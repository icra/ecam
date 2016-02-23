<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L2 - GHG</h1>

<table>
	<script>
		//Pointers
		var ws  = Global.Water
		var wsg = Global.Water.General
		var ww  = Global.Waste
		var wwg = Global.Waste.General
		//Values
		var slice_1 = ww.c_ww54();
		var slice_2 = wsg.c_wsg50()*Global.UWS.uw1-wsg.wsg4;
		var slice_3 = ws.c_ws51();
		var slice_4 = (ww.ww3-wwg.wwg2-wwg.wwg4)*Global.UWS.uw1;
		var slice_5 = ww.c_ww57()
		var slice_6 = ww.c_ww55()
		var slice_7 = ww.c_ww51()+ww.c_ww52()
		var slice_8 = ww.Treatment.c_wwt60()
	</script>
	<tr><th>Field                                 <th>Formula             <th>Value (kgCO2)
	<tr><td>GHG from sludge transport             <td>c_ww54              <td><script>document.write(format(slice_1))</script>
	<tr><td>GHG electricyty (water)               <td>c_wsg50*uw1-wsg4    <td><script>document.write(format(slice_2))</script>
	<tr><td>GHG from fuel engines (water)         <td>c_ws51              <td><script>document.write(format(slice_3))</script>
	<tr><td>GHG from electricity (wastewater)     <td>(ww3-wwg2-wwg4)*uw1 <td><script>document.write(format(slice_4))</script>
	<tr><td>GHG from fuel engines (wastewater)    <td>c_ww57              <td><script>document.write(format(slice_5))</script>
	<tr><td>GHG from biogas handling (wastewater) <td>c_ww55              <td><script>document.write(format(slice_6))</script>
	<tr><td>GHG from untreated effluent discharge <td>c_ww51+c_ww52       <td><script>document.write(format(slice_7))</script>
	<tr><td>GHG from treated effluent discharge   <td>c_wwt60             <td><script>document.write(format(slice_8))</script>
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
				['GHG from sludge transport             ', slice_1||1],
				['GHG electricyty (water)               ', slice_2||1],
				['GHG from fuel engines (water)         ', slice_3||1],
				['GHG from electricity (wastewater)     ', slice_4||1],
				['GHG from fuel engines (wastewater)    ', slice_5||1],
				['GHG from biogas handling (wastewater) ', slice_6||1],
				['GHG from untreated effluent discharge ', slice_7||1],
				['GHG from treated effluent discharge   ', slice_8||1],
			]);
			var options= 
			{ 
				width:800,
				height:400,
				title:"GHG emissions per capita",
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
