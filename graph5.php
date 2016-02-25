<!--graph 5-->
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE--><h1>Level 2 - Energy consumption</h1>
<!--graph--><div id=graph></div>
<!--json--><?php include'currentJSON.php'?>

<script>
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		Graphs.graph5(true,'graph');
	}
</script>
