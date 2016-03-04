<!--graph-->
<?php
	if(!isset($_GET['g']))
		die('graph not specified');

	//name of the function
	$g = $_GET['g'];
?>
<!doctype html><html><head>
<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<table><tr>
	<td><button onclick=Graphs.graph1(true,'graph')>L1 GHG    </button>
	<td><button onclick=Graphs.graph2(true,'graph')>L1 NRG    </button>
	<td><button onclick=Graphs.graph3(true,'graph')>L1 GHG bar</button>
	<td><button onclick=Graphs.graph4(true,'graph')>L2 GHG    </button>
	<td><button onclick=Graphs.graph5(true,'graph')>L2 NRG    </button>
	<td><button onclick=Graphs.graph6(true,'graph')>L2 GHG bar</button>
	<td><button onclick=Graphs.graph7(true,'graph')>L3 NRG    </button>
	<td><button onclick=Graphs.sankey(true,'graph')>Sankey    </button>
</table>

<!--TITLE--><h1>Graphs</h1>
<!--graph--><div id="graph"></div>
<!--json--><?php include'currentJSON.php'?>

<script>
	google.charts.load('current',{'packages':['corechart','sankey']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() 
	{
		var g = '<?php echo $g ?>';
		Graphs[g](true,'graph')
	}
</script>
