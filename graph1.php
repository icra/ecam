<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Level 1 - GHG</h1>

<div id=graph class=inline style="border:1px solid"></div>

<?php include'currentJSON.php'?>

<script>
	google.charts.load('current', {'packages':['corechart']});
	Graphs.graph1();
</script>
