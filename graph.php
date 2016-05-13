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
	#graph button{margin:0.5em}
	#graph div.options{margin:1em}
</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#graphs')?></h1>

Pie &amp; Donut
	<button class=button id=graph1  onclick=window.location='graph.php?g=graph1'>GHG</button><!--
	--><button class=button id=graph4  onclick=window.location='graph.php?g=graph4'>GHG detailed</button><!--
	--><button class=button id=graph2  onclick=window.location='graph.php?g=graph2'>NRG</button><!--
	--><button class=button id=graph5  onclick=window.location='graph.php?g=graph5'>NRG detailed</button><!--
	--><button class=button id=graph7  onclick=window.location='graph.php?g=graph7'>NRG substages</button>

Bars
	<button class=button id=graph3a onclick=window.location='graph.php?g=graph3a'>CO2/year</button><!--
	--><button class=button id=graph3b onclick=window.location='graph.php?g=graph3b'>CO2/year<br>per serviced population</button><!--
	--><button class=button id=graph3c onclick=window.location='graph.php?g=graph3c'>CO2/year<br>per resident population</button><!--
	--><button class=button id=graph3d onclick=window.location='graph.php?g=graph3d'>CO2 per m3</button>

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
