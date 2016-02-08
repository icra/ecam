<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<div class=inline style=max-width:30%>
	<h2>GHG1 graph 1</h2>
	<canvas id="ghg1" width="400" height="200"></canvas>
	<script>
		var ctx = document.getElementById("ghg1").getContext("2d");
		var wGHG1 = Global.Water.wGHG1();
		var wwGHG1 = Global.Waste.wwGHG1();
		var data = [
			{
				value: wGHG1||1,
				color: "#af0",
				highlight: "#af0",
				label: "wGHG1 (kgCO2/inhab/year)"
			},
			{
				value: wwGHG1||1,
				color: "#d00",
				highlight: "#f00",
				label: "wwGHG1 (kgCO2/inhab/year)"
			},
		];
		var pie = new Chart(ctx).Pie(data);
	</script>
</div>

<div class=inline style=max-width:30%>
	<h2>GHG1 graph 2</h2>
	<canvas id="ghg2" width="400" height="200"></canvas>
	<script>
		/*
		The bar graph for GHG emissions per type: 
		use only 1 graph and show two vertical axis (not shown here): 
		one per serviced population and the other one per m3. 
		(The proportions remain the same whether you present the indicator with one or the other denominator)
		Serviced population: wGHG4, wGHG6, wwGHG6, wwGHG4						 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 
		Authorized consumption values: wGHG5, wGHG7, wwGHG7, wwGHG5<br>
		*/
		var ctx=document.getElementById("ghg2").getContext("2d");
		var data = {
			labels: ["Serviced Population", "Authorized consumption"],
			datasets:[
				{
					fillColor: "repeating-linear-gradient(-55deg,#222,#222 5px,#333 10px,#333 15px)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data: [65, 59]
				},
				{
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: [28, 48]
				}
			],
		};

		new Chart(ctx).Bar(data,{});
	</script>
</div>

<!--sankey diagram-->
<div>
	<h2>Sankey diagram</h2>
	<script src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}"> </script>
	<!--diagram--><div id="sankey"></div>
	<script>
		//diagram creation
		google.setOnLoadCallback(drawChart);
		function drawChart(){
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'From');
			data.addColumn('string', 'To');
			data.addColumn('number', 'Weight');
			data.addRows([
				['wAbstraction', 	'wTreatment', 		Global.Water.Abstraction.wsa2||1],
				['wTreatment', 		'wDistribution', 	Global.Water.Treatment.wst1||1],
				['wDistribution', 	'USERS', 			Global.Water.Distribution.wsd9||1],
				['USERS',			'wwCollection',		Global.Waste.Collection.wwc3||1],
				['wwCollection',	'wwTreatment',		Global.Waste.Treatment.wwt8||1],
				['wwTreatment',		'wwDischarge',		Global.Waste.Discharge.wwd1||1],
			]);
			// Sets chart options.
			var options = {"width":"900",};
			// Instantiates and draws our chart, passing in options.
			var chart = new google.visualization.Sankey(document.getElementById('sankey'));
			chart.draw(data,options);
		}
	</script>
	<a href="https://developers.google.com/chart/interactive/docs/gallery/sankey">https://developers.google.com/chart/interactive/docs/gallery/sankey</a>
	<br>
	<a href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts</a>
</div>
<!--FOOTER--><?php include'footer.php'?>
