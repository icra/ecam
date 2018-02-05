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
			<h1 class="blue_h1" style=padding-bottom:0px>
				<?php write("#a_toolkit_for_utilities")?>
			<h1 class="green_h1" style=font-size:32px>
				<?php write("#assess_your_utility")?>
			</h1>

			<!--new text-->
			<h4 style=font-size:18px;color:#58595b>
				<?php write("#index_description")?>
			</h4>
			<h4 style=font-size:18px;color:#58595b>
				<?php write("#ecam_is_a_free_and")?>
				<a target=_blank href=//github.com/holalluis/ecam>
					<?php write("#open_source")?>
				</a>
				<?php write("#tool_developed_as_part_of_the")?>
				<a target=_blank href=//wacclim.org/>
					<?php write("#wacclim_project")?>
				</a>
			</h4>

			<h4 style=font-size:18px;color:#58595b>
				<?php write("#first_time_using_ecam")?>
				<a href=help.php target=_blank>
					<?php write("#here")?>.
				</a>
			</h4>

			<!--MENU BUTTONS--><div style="padding:1em 0"><?php include'menu.php'?></div>

			<!--chrome warning-->
			<div class="chrome_big">
				<b><?php write('#index_chrome_warning')?></b>
			</div>
			<br>
			<br>
			<div>
				<a class="blue_links" href="http://wacclim.org/" target=_blank>WaCCliM</a> - <a class="blue_links" href=about.php><?php write("#about")?></a> - <a class="blue_links" href=help.php><?php write("#help")?></a> - <a class="blue_links" href=mailto:info@wacclim.org><?php write("#contact")?>: info@wacclim.org</a>
			</div>
			<!-- <img class="license_img" src="img/cc_icon_white_x2.png" alt="">
			<img class="license_img" src="img/attribution_icon_white_x2.png" alt="">
			<img class="license_img" src="img/sa_white_x2.png" alt=""> -->
			<img class="license_img license_img-big" src="img/CC_license_small.png" alt="">
			<br>
				<?php write("#ecam_by_iwa_giz_icra")?>
			<a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">
				<?php write("#creative_commons_attr")?>
			</a>.
			<div style=font-size:smaller>
				<?php write("#wacclim_is_part_of_IKI")?>
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
	<img src=img/logos.png>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
