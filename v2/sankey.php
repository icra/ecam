<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init(){
			Graphs.sankey(false,'graph')
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>

<h1>Sankey diagam</h1>

<div id=graph style=width:80%>Loading...</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>
	google.charts.load('current',{'packages':['corechart','sankey']});
	google.charts.setOnLoadCallback(init)
</script>
