<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<style>
		img{margin:1em}
	</style>
	<script>
		function init()
		{
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1 class=blue style="font-size:33px;padding-bottom:0">ECAM</h1>
<!--SUBTITLE--><h3>Energy performance and carbon emissions assessment and monitoring tool </h3>
<!--LATEST UPD--><div style="max-width:20%;background:#d7bfaf"><?php echo "Latest update: ".date("F d Y, H:i:s.",filemtime("index.php"))?></div>

<!--DESCRIPTION--><div style="font-size:17px;color:#333;max-width:75%;text-align:justify">
	The web-based ECAM tool is part of the knowledge platform provided by the <a href="http://www.iwa-network.org/WaCCliM/">WaCCliM project</a>. 
	The ECAM tool helps utilities to evaluate their operations in terms of GHG emissions and energy use based on their own data. 
	The results are compared with known benchmarks so that inefficiencies can be highlighted, 
	and decision makers may initiate improvements in the most compromising stages within the utility.
	This tool is free and open source.
</div>

<!--MENU--><div style=padding:1em><?php include'menu.php'?></div>

<!--FIRST TIME?-->
<h4 style=font-size:19px>
First time using ECAM Web Tool? Click "New System" or learn more in <a href=resources.php>Resources</a>
</h4>
<!--DIAGRAM--><?php include'diagram_home.php'?>

<!--LOGOS-->
<div style="text-align:left;background:#00aff1;padding:0;margin-top:1em">
	<!--iwa--><img src=img/IWA-logo.png width=100px>
</div>
<!--giz--><img src=img/giz.png>
<!--bmb--><img src=img/BMUB.png width=13%>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
