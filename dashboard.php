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
<h1>Dashboard</h1>

<div class="card inline" style="width:32%;text-align:left"><?php cardMenu('Next steps') ?>
	<ol style=margin:1em>
		<li>Go to Quick assessment
		<li>Go to GHG assessment
		<li>Go to Energy performance
	</ol>
</div>

<div class="card inline" style="width:32%;"><?php cardMenu('Recommendations to reduce GHG') ?>
	<div class=card style="background:#0aaff1">
		<?php cardMenu('Water supply') ?>
		<ul style=margin:1em;text-align:left>
			<li>N/A (i.e. increase serviced population to P to reduce N kg CO2)
		</ul>
	</div>
	<div class=card style="background:#d71d24">
		<?php cardMenu('Wastewater') ?>
		<ul style=margin:1em;text-align:left>
			<li>N/A (i.e. increase serviced population to P to reduce N kg CO2)
		</ul>
	</div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
