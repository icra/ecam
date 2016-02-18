<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L1 - GHG emissions per serviced population, per authorized consumption, per collected wastewater</h1>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var WS = Global.Water.General;
			var WW = Global.Waste.General;

			var data=google.visualization.arrayToDataTable
			([
				[ 
					'Emission type', 
						'From electricity', 
						'Non-electricity', 
						'Fuel used in engines',
						'Untreated sewage',
						'Treated sewage discharged to river',
						'Biogas production flared or released',
						'Sludge transport',
						{role:'annotation'} 
				],
				['Water per SP',      WS.wGHG6(),  WS.wGHG4(),            0,0,0,0,0, ''],
				['Wastewater per SP', WW.wwGHG4(), Global.Waste.wwGHG6(), WW.wwGHG8(), WW.wwGHG14(), WW.wwGHG12(), WW.wwGHG10(), WW.wwGHG16(), ''], 
				['Water per AC',      WS.wGHG7(),  WS.wGHG5(),            0,0,0,0,0, ''],
				['Wastewater per SP', WW.wwGHG5(), Global.Waste.wwGHG7(), WW.wwGHG9(), WW.wwGHG15(), WW.wwGHG13(), WW.wwGHG11(), WW.wwGHG17(), ''], 
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
