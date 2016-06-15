<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			//
		}
	</script>
	<style>
		#recmm, #nextsteps {margin:1em}
		#recmm td, #nextsteps td {padding:1em}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Dashboard</h1>

<div class=card><?php cardMenu('Next steps') ?>
	<table id=nextsteps class=inline>
		<tr><th>Section<th>Status<th>Action
		<tr><td>Quick Assessment
			<td>Incomplete
			<td>Go to <a href=birds.php>Quick Assessment</a>
		<tr><td>GHG Assessment
			<td style=color:#ccc>Not started
			<td style=color:#ccc>Not started
		<tr><td>Energy performance
			<td style=color:#ccc>Not started
			<td style=color:#ccc>Not started
	</table>
</div>
<div class=card><?php cardMenu('Recommendations to reduce GHG') ?>
	<table id=recmm style="width:80%">
		<tr>
			<td style="background:#0aaff1;color:white;text-align:center">Water supply
			<td style="background:#d71d24;color:white;text-align:center">Wastewater
		<tr>	
			<td style=color:#ccc>N/A (i.e. increase serviced population to P to reduce N kg CO2)
			<td style=color:#ccc>N/A (i.e. increase serviced population to P to reduce N kg CO2)
	</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
