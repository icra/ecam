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

<button class=button id=graph1  onclick=window.location='graph.php?g=graph1'>GHG 1</button>
<button class=button id=graph4  onclick=window.location='graph.php?g=graph4'>GHG 2</button>
<button class=button id=graph3a onclick=window.location='graph.php?g=graph3a'>GHG per year</button>
<button class=button id=graph3b onclick=window.location='graph.php?g=graph3b'>GHG per year per serv.pop. </button>
<button class=button id=graph3c onclick=window.location='graph.php?g=graph3c'>GHG per year per resi.pop. </button>
<button class=button id=graph3d onclick=window.location='graph.php?g=graph3d'>GHG per m3 </button>
<button class=button id=graph6  onclick=window.location='graph.php?g=graph6'>GHG TBD</button>
<button class=button id=graph2  onclick=window.location='graph.php?g=graph2'>Energy 1</button>
<button class=button id=graph5  onclick=window.location='graph.php?g=graph5'>Energy 2</button>
<button class=button id=graph7  onclick=window.location='graph.php?g=graph7'>Energy (Substages)</button>
<button class=button id=sankey  onclick=window.location='graph.php?g=sankey'>Sankey (Energy performance)</button>

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
