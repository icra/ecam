<?php /*index.php: main page*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1 class=blue style="font-size:33px;padding-bottom:0">ECAM Web Tool</h1>

<!--DESCRIPTION--><div style="font-size:17px;color:#333;max-width:75%;text-align:justify">
	Helps utilities to evaluate their operations in terms of GHG emissions and energy use based on their own data. 
	Is part of the knowledge platform provided by the <a href="http://www.iwa-network.org/WaCCliM/">WaCCliM project</a>. 
	This tool is free and open source.
</div>

<!--FIRST TIME?-->
<h4 style=font-size:19px>
First time using ECAM Web Tool? Click "Create new system" or learn more in <a href=about.php>About</a>
</h4>

<!--MENU--><div style=padding:1em><?php include'menu.php'?></div>

<!--LATEST UPD--><span style="background:yellow"><?php echo "Latest update: ".date("F d Y, H:i:s",filemtime("index.php"))?></span>
<!--WARNING--><span style=background:orange>Please use Google Chrome. Tool not tested in other browsers.</span><br>
<!--DIAGRAM--><?php include'diagram_home.php'?>
<!--FOOTER--><?php include'footer.php'?>
<!--LOGOS-->
<div style="background:#fff;padding:0;margin-top:1em">
	<!--giz--><img src=img/giz.png>
	<!--bmb--><img src=img/BMUB.png width=13%>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
