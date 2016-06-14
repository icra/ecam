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
		#recmm td, #nextsteps td {padding:1.5em}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Dashboard</h1>

<div class=card><?php cardMenu('Next steps') ?>
	<table id=nextsteps class=inline>
		<tr><td>Quick Assessment
			<td>Incomplete
		<tr><td>GHG Assessment
			<td>Not started
		<tr><td>Energy performance
			<td>Not started
	</table>
</div>
<div class=card><?php cardMenu('Recommendations to reduce GHG') ?>
	<table id=recmm class=inline>
		<tr><td>Quick Assessment
			<td>Input data
		<tr><td>GHG Assessment
			<td>N/A
		<tr><td>Energy performance
			<td>N/A
	</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
