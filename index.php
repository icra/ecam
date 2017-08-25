<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>function init(){updateResult()}</script>
</head><body onload=init() style=background:#fff>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--main-->
<div id=main> 
	<div id=content>
		<style>
			#content *:not(button){margin:0;padding:0;padding-top:0.7em;padding-bottom:0.7em}
			#content {
			    padding: 0 10em 0 10em;
				text-align:left;
			}
			#content .width_50 .img_resp{
				width: 100%;
				padding-top: 9em;
			}
		</style>

		<!--new title-->
		<div class="width_50">
			<h1 style=font-size:32px>
				Assess you utility's carbon footprint,<br>
				energy consumption and service levels
			</h1>

			<!--new text-->
			<h4 style=font-size:18px;color:#58595b>
				The Energy Performance and Carbon Emissions Assessment
				and Monitoring Tool is designed for assessing the carbon
				emissions of the urban water cycle that are within the
				operational boundaries of water and wastewater utilities and
				prepare these utilities for future reporting needs on climate
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
				Click on 'New' or learn more <a href=about.php target=_blank>here</a>.
			</h4>

			<!--MENU--><div style="padding:1em 0"><?php include'menu.php'?></div>

			<!--chrome warning-->
			<div> 
				<b><?php write('#index_chrome_warning')?></b>
			</div>
			<div>
				<a href="http://wacclim.org/" target=_blank>WaCCliM</a> - <a href=about.php><?php write("#about")?></a> - <a href=help.php><?php write("#help")?></a> - <a href=mailto:info@wacclim.org><?php write("#contact")?>: info@wacclim.org</a>
			</div>
			<img class="license_img" src="img/cc_icon_white_x2.png" alt="">
			<img class="license_img" src="img/attribution_icon_white_x2.png" alt="">
			<img class="license_img" src="img/sa_white_x2.png" alt="">
			<br>
			ECAM by IWA and GIZ, implemented by ICRA for WaCCliM Project* is licensed under a <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
			<div>
				* WaCCliM project is part of the International Climate Initiative (IKI). The German Federal Ministry for the Environment, Nature
				Conservation, Building and Nuclear Safety (BMUB) supports this initiative on the basis of a decision adopted by the German
				Bundestag.
			</div>
		</div>

		<!--picture-->
		<div class="width_50" style="padding:0;text-align:center">
			<img class="img_resp" src="svg/diagram.png">
		</div>
	</div>
</div>

<?php include'footer.php'?>

<!--logos--> 
<div style="background:white;text-align:left;padding:0em 10em;margin-top:50px;"> 
	<img src=img/logos.png width=60%> 
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
