<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#about')?></h1>

<div style=max-width:40%;text-align:justify;line-height:2em>
	<?php write('#about_credits')?>

	<ul style=text-align:left>
		<li><?php write('#about_graphs_lib')?>: <a target=_blank href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">Google Charts</a>
		<li><?php write('#about_json_viewer')?>: <a target=_blank href="https://jsonformatter.curiousconcept.com/">json formatter</a>
	</ul>

	<br>2015-2016 <a href='license.php'><?php write('#about_license')?></a>. <br>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
