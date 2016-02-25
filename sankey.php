<!--sankey diagram-->
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE--><h2>Sankey diagram (water flow in the whole cycle)</h2>
<!--graph--><div id="graph"></div>
<!--json--><?php include'currentJSON.php'?>

<script>
	google.charts.load('current', {'packages':['sankey']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart()
	{
		Graphs.sankey(true,'graph');
	}
</script>
