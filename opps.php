<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			//
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Opportunities to reduce GHG emissions</h1>

<div class="card inline" style="background:#0aaff1">
	<?php cardMenu('Water supply') ?>
	<ul style=margin:1em;text-align:left>
		<li>N/A (i.e. increase serviced population to P to reduce N kg CO2)
	</ul>
</div>
<div class="card inline" style="background:#d71d24">
	<?php cardMenu('Wastewater') ?>
	<ul style=margin:1em;text-align:left>
		<li>N/A (i.e. increase serviced population to P to reduce N kg CO2)
	</ul>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
