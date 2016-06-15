<!--graph-->
<?php
	if(!isset($_GET['g']))
		die('graph not specified');

	//name of the function
	$g = $_GET['g'];
?>
<!doctype html><html><head>
<?php include'imports.php'?>
<style>
	button.button{margin:1px}
	#graph{margin:3em}
	#graph button{margin:0.5em}
	#graph div.options{margin:1em}
</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#graphs')?></h1>

<!--select-->
Select graph to display 
<select id=g_select onchange="window.location='graph.php?g='+this.value">
<script>
	(function(){
	for(var graph in Graphs)
		document.write("<option>"+graph)
	})();
</script>
</select>

<!--graph--><div id="graph"><?php write('#loading')?></div>

<script>
	google.charts.load('current',{'packages':['corechart','sankey','gauge']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		var g = '<?php echo $g ?>';
		Graphs[g](false,'graph')
		document.querySelector('#g_select').value=g
	}
</script>

<!--foot--><?php include'footer.php'?>
<!--json--><?php include'currentJSON.php'?>
