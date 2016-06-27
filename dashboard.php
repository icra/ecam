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

<div class="card" style="text-align:left"><?php cardMenu('Next steps') ?>
	<ol style=margin:1em>
		<li>Go to Quick assessment
		<li>Go to GHG assessment
		<li>Go to Energy performance
		<li>Go to Opportunities to see the possible GHG emissions reduction
	</ol>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
