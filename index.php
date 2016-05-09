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
	<!--TITLE--><h1 class=blue style="text-align:left;font-size:30px;"><b>ECAM</b> <?php write("#index_web_tool")?>

	<span style=color:#bf5050>(beta)</span>
	
	</h1>

	<!--DESCRIPTION--><div style="color:#58595b;font-size:18px;text-align:left">
		<?php write('#index_description')?>
	</div>

	<!--FIRST TIME?-->
	<h4 style=font-size:18px;color:#58595b>
		<?php write('#index_first_time_using')?>
		<a href=about.php><?php write('#about')?></a>.
	</h4>

	<!--MENU--><div style=padding:1em><?php include'menu.php'?></div>

	<ul>
	<!--WARNING--><li><b><?php write('#index_chrome_warning')?></b>
	<!--LATEST UPD--><li><?php write('#index_latest_update');echo ": ".date("F d Y, H:i:s",filemtime("index.php"))?>.
	</ul>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--LOGOS-->
<div style="background:#fff;padding:0;margin:0">
	<!--giz--><img src=img/giz.png>
	<!--bmb--><img src=img/BMUB.png width=13%>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
