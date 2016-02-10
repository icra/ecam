<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<h2>Sankey diagram</h2>

<script src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}"> </script>

<!--sankey goes here-->
<div id="sankey"></div>

<script>
	google.setOnLoadCallback(drawChart);
	function drawChart()
	{
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

<div>
Still not implemented, pending more precise explanation
</div>
