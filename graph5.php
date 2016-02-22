<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG emissions per serviced population, per authorized consumption, per collected wastewater</h1>

<table>
	<script>
		var WS = Global.Water.General;
		var WW = Global.Waste.General;
	</script>
	<tr><th>KPI       <th>Value (kgCO2/inhab/year)
	<tr><td>wGHG6_L2  <td><script>document.write(format(WS.wGHG6_L2()))</script>
	<tr><td>wGHG4_L2  <td><script>document.write(format(WS.wGHG4_L2()))</script>
	<tr><td>wGHG7_L2  <td><script>document.write(format(WS.wGHG7_L2()))</script>
	<tr><td>wGHG5_L2  <td><script>document.write(format(WS.wGHG5_L2()))</script>
	<tr><td>wwGHG4_L2 <td><script>document.write(format(WW.wwGHG4_L2()))</script>
	<tr><td>wwGHG8    <td><script>document.write(format(WW.wwGHG8()))</script>
	<tr><td>wwGHG14   <td><script>document.write(format(WW.wwGHG14()))</script>
	<tr><td>wwGHG12   <td><script>document.write(format(WW.wwGHG12()))</script>
	<tr><td>wwGHG10   <td><script>document.write(format(WW.wwGHG10()))</script>
	<tr><td>wwGHG16   <td><script>document.write(format(WW.wwGHG16()))</script>
	<tr><td>wwGHG5_L2 <td><script>document.write(format(WW.wwGHG5_L2()))</script>
	<tr><td>wwGHG9    <td><script>document.write(format(WW.wwGHG9()))</script>
	<tr><td>wwGHG15   <td><script>document.write(format(WW.wwGHG15()))</script>
	<tr><td>wwGHG13   <td><script>document.write(format(WW.wwGHG13()))</script>
	<tr><td>wwGHG11   <td><script>document.write(format(WW.wwGHG11()))</script>
	<tr><td>wwGHG17   <td><script>document.write(format(WW.wwGHG17()))</script>
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
				['Water per SP',      
					WS.wGHG6_L2()||1,  
					WS.wGHG4_L2()||1,            0,0,0,0,0, ''],
				['Wastewater per SP', 
					WW.wwGHG4_L2()||1, 
					Global.Waste.wwGHG6()||1, 
					WW.wwGHG8()||1, 
					WW.wwGHG14()||1, 
					WW.wwGHG12()||1, 
					WW.wwGHG10()||1, 
					WW.wwGHG16()||1, ''], 
				['Water per AC',     
					WS.wGHG7_L2()||1,  
					WS.wGHG5_L2()||1,            0,0,0,0,0, ''],
				['Wastewater per SP', 
					WW.wwGHG5_L2()||1, 
					Global.Waste.wwGHG7()||1, 
					WW.wwGHG9()||1, 
					WW.wwGHG15()||1, 
					WW.wwGHG13()||1, 
					WW.wwGHG11()||1, 
					WW.wwGHG17()||1, ''], 
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
