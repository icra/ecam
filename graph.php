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
	button.button.selected {background:lightgreen}
</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>

<button class=button id=graph1 onclick=window.location='graph.php?g=graph1'>GHG (Preview)</button>
<button class=button id=graph4 onclick=window.location='graph.php?g=graph4'>GHG (Insight)</button>
<button class=button id=graph3 onclick=window.location='graph.php?g=graph3'>GHG normalized (Preview)</button>
<button class=button id=graph6 onclick=window.location='graph.php?g=graph6'>GHG normalized (Insight)</button>
<button class=button id=graph2 onclick=window.location='graph.php?g=graph2'>Energy (Preview)</button>
<button class=button id=graph5 onclick=window.location='graph.php?g=graph5'>Energy (Insight)</button>
<button class=button id=graph7 onclick=window.location='graph.php?g=graph7'>Energy (Substages)</button>
<button class=button id=sankey onclick=window.location='graph.php?g=sankey'>Sankey (Insight)</button>

<!--TITLE--><h1>Graphs</h1>
<!--graph--><div id="graph"></div>

<script>
	google.charts.load('current',{'packages':['corechart','sankey']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		var g = '<?php echo $g ?>';
		Graphs[g](true,'graph')
		document.getElementById('<?php echo $g?>').classList.add('selected');
	}
</script>

<!--foot--><?php include'footer.php'?>
<!--json--><?php include'currentJSON.php'?>
