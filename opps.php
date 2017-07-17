<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		/*opportunities page: has to be recoded again after v2 due to structure changes*/
		/**
		 * Opportunities:
		 * Equations that show to the user the potential GHG reductions
		 */
		function init() {
			Caption.listeners();
			updateResult();
		}
		var Opps = {}; //oportunities coded here
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<h1>Opportunities to reduce GHG emissions</h1>

<div id=root>

<!--Opportunities-->
<div>
	<table>
		<tr><td>hola
	</table>
</div>

</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
