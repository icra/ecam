<!--footer.php: at the bottom of each page-->

<style>
	div#footer * {vertical-align:middle;margin:0}
	#footer {
		text-align:left;
		margin-top:3em;
		padding:0.5em 2em 0.5em 2em;
		background:#00aff1;
		line-height:2em;
		color:white;
		min-height:5em;
	}
	#footer a, #footer a:visited {
		color:white;
	}
</style>

<div id=footer >
	<img src=img/IWA-logo.png style=height:25px>
	Copyright <?php echo date("Y")?> 
	<a href="http://www.iwa-network.org/" target=_blank>International Water Association</a>
	·
	<a href=about.php>
		<?php write("#about")?>
	</a>
	·
	<a href=help.php>
		<?php write("#help")?>
	</a>
	·
	<a href=mailto:WaCCliM@iwahq.com>
		Contact
	</a>
</div>

