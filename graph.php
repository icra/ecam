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
	#graph{margin:3em}
</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#graphs')?></h1>

Pie &amp; Donut
	<button class=button id=graph1  onclick=window.location='graph.php?g=graph1'>1</button><!--
	--><button class=button id=graph4  onclick=window.location='graph.php?g=graph4'>4</button><!--
	--><button class=button id=graph2  onclick=window.location='graph.php?g=graph2'>2</button><!--
	--><button class=button id=graph5  onclick=window.location='graph.php?g=graph5'>5</button><!--
	--><button class=button id=graph7  onclick=window.location='graph.php?g=graph7'>7</button>

Bars
	<button class=button id=graph3a onclick=window.location='graph.php?g=graph3a'>3a</button><!--
	--><button class=button id=graph3b onclick=window.location='graph.php?g=graph3b'>3b</button><!--
	--><button class=button id=graph3c onclick=window.location='graph.php?g=graph3c'>3c</button><!--
	--><button class=button id=graph3d onclick=window.location='graph.php?g=graph3d'>3d</button><!--
	--><button class=button id=graph6  onclick=window.location='graph.php?g=graph6'>6</button>

Water flow
	<button class=button id=sankey  onclick=window.location='graph.php?g=sankey'>Sankey</button>

<!--graph--><div id="graph"><?php write('#loading')?></div>

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
