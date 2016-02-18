<?php /*index.php: main page*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateResult()
		}
	</script>
</head><body onload=init()><center style=background:#bce3f8>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<div id=main style="padding:0 25em 0 10em;text-align:left">
	<style>
		#main *:not(button){margin:0;padding:0;padding-top:0.7em;padding-bottom:0.7em}
	</style>
	<!--TITLE--><h1 class=blue style="text-align:left;font-size:30px;"><b>ECAM</b> Web Tool</h1>

	<!--DESCRIPTION--><div style="color:#58595b;font-size:18px;text-align:left">
		This tool evaluates utilities's operations in terms of GHG emissions and energy usage based on their own data. <br>
		ECAM is part of the knowledge platform provided by the <a href="http://www.iwa-network.org/WaCCliM/">WaCCliM project</a>. 
		This tool is free and open source.
	</div>

	<!--FIRST TIME?-->
	<h4 style=font-size:18px;color:#58595b>
		First time using ECAM Web Tool? Click on "New system" or learn more in <a href=about.php>About</a>.
	</h4>

	<!--MENU--><div style=padding:1em><?php include'menu.php'?></div>

	<ul>
	<!--LATEST UPD--><li><?php echo "Latest update: ".date("F d Y, H:i:s",filemtime("index.php"))?>.
	<!--WARNING--><li>Please use Google Chrome. Tool not tested in other browsers.
	</ul>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--LOGOS-->
<div style="background:#fff;padding:0;margin:0">
	<!--giz--><img src=img/giz.png>
	<!--bmb--><img src=img/BMUB.png width=13%>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
