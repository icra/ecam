<!--footer.php: at the bottom of each page-->

<style>
	#footer {
		text-align:center;
		padding:0.5em 2em 0.5em 2em;
		background:white;
		line-height:2em;
		color:white;
		color:#333;
		overflow:hidden;
		height: 6em;
		bottom:0;
	}
	#footer a, #footer a:visited {
		color:white;
		color:#333;
		color:#00aff1;
	}
</style>

<footer id=footer >
	<img src="img/logo-wacclim.jpg" style=height:25px;vertical-align:middle>
	Copyright <?php echo date("Y")?> 
	·
	<a href="http://wacclim.org/" target=_blank>WaCCliM</a>
	·
	<a href=about.php><?php write("#about")?></a>
	·
	<a href=help.php><?php write("#help")?></a>
	·
	<a href=mailto:info@wacclim.org><?php write("#contact")?>: info@wacclim.org</a>
</footer>

