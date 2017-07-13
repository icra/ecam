<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>function init(){updateResult()}</script>
</head><body onload=init() style=background:#bce3f8>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--main-->
<div id=main> 
	<div id=content>
		<style>
			#content *:not(button){margin:0;padding:0;padding-top:0.7em;padding-bottom:0.7em}
			#content {
				padding:0 25em 0 10em;
				text-align:left;
			}
		</style>

		<!--new title-->
		<h1 style=font-size:32px>
			Assess you utility's carbon footprint,<br>
			energy consumption and service levels
		</h1>

		<!--new text-->
		<h4 style=font-size:18px;color:#58595b>
			The Energy Performance and Carbon Emissions Assessment and Monitoring Tool is <br>
			designed for assessing the carbon emissions that utilities can control within the<br>
			urban water cycle and prepare these utilities for future reporting needs on climate<br>
			mitigation.
		</h4>
		<h4 style=font-size:18px;color:#58595b>
			ECAM is a free and 
			<a target=_blank href=//github.com/holalluis/ecam>open source</a>
			tool developed as part of the
			<a target=_blank href=http://wacclim.org/>WaCCliM project</a>.
		</h4>

		<h4 style=font-size:18px;color:#58595b>
			First time using ECAM? 
			Click on 'New' or learn more in <a href=about.php target=_blank>About</a>.
		</h4>

		<!--MENU--><div style="padding:1em 0"><?php include'menu.php'?></div>

		<!--chrome warning-->
		<div> 
			<b><?php write('#index_chrome_warning')?></b>
		</div>

		<!--picture-->
		<div style="padding:0;text-align:center">
			<img src=svg/diagram.png style=width:70%>
		</div>
	</div>
</div>

<?php include'footer.php'?>

<!--logos--> 
<div style=background:white;text-align:center> 
	<img src=img/logos.png width=40%> 
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
