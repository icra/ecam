<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			Caption.listeners();
			updateResult();
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<h1>GHG Sources</h1>

<div id=main>

<!--ghg sources column-->
<div style=width:60%>
	<!--sources of ghg-->
	<?php include'ghg_sources.php'?>

	<!--Catalog of Solutions-->
	<div class=card id=CoS><?php cardMenu("IWA Catalogue of solutions")?>
		<div style="text-align:left;padding:1.0em">
		This catalogue offers inspiring water, climate and energy solutions for each stage.
		</div>
		<a href="http://www.iwa-network.org/water-climate-energy-solutions/public/" target=_blank>
			IWA Catalogue of solutions
		</a>
		<style>
			#CoS a{
				display:block;
				margin:0.5em;
				color:white;
				font-weight:bold;
				border:1px solid #ccc;
				padding:1em;
				background:#0aaff1;
				border-radius:0.5em;
			}
		</style>
	</div>
</div>

</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
