<!--footer.php: at the bottom of each page-->

<style>
	#footer {
		text-align:left;
		padding:0.5em 2em 0.5em 2em;
		background:#00aff1;
		line-height:2em;
		color:white;
		overflow:hidden;
		height: 6em;
		box-shadow: 0 1px 2px rgba(0,0,0,.1);
		bottom:0;
	}
	#footer a, #footer a:visited {
		color:white;
	}
</style>

<footer id=footer >
	<img src=img/IWA-logo.png style=height:25px;vertical-align:middle>
	Copyright <?php echo date("Y")?> 
	·
	<a href="http://www.iwa-network.org/" target=_blank>International Water Association</a>
	·
	<a href=about.php><?php write("#about")?></a>
	·
	<a href=help.php><?php write("#help")?></a>
	·
	<a href=mailto:WaCCliM@iwahq.org><?php write("#contact")?>: WaCCliM@iwahq.org</a>
	<br>
	Debug mode &rarr;
	<a href="problems.php">Tasks and problems towards v2.0</a>
	·
	<a href="viewer.php">Data structures</a>
</footer>

