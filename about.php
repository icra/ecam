<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#about')?></h1>

<div id=main>

<!--paragraph-->
<div style=max-width:40%;text-align:justify;line-height:2em>
	<?php //write('#about_credits')?>
	The web interface and new features for the ECAM tool were developed by 

	<a target=_blank href='http://www.icra.cat/'>ICRA</a>, 
	<a target=_blank href='http://www.iwa-network.org'>IWA</a>, and 
	<a target=_blank href='https://www.giz.de/en/html/index.html'>GIZ</a> under the 
	<a target=_blank href='http://www.iwa-network.org/WaCCliM/es/'>WaCCliM project</a>.

	<br><br>

	This tool was first developed within the project in 2015 as an Excel tool by the consortium Urban Water Commons 
	(<a target=_blank href='http://www.lnec.pt/pt/'>LNEC</a> and 
	 <a target=_blank href='http://www.ita.upv.es/index-es.php'>ITA, Universitat Politècnica de València)</a> in collaboration with 
	 <a target=_blank href='http://www.cobaltwater-global.com/'>Cobalt Water Global</a>. 
	 
	The Excel tool laid the foundation and basic equations for the web-tool. 

	<br><br>

	This project is part of the <a target=_blank href="https://www.international-climate-initiative.com/">International Climate Initiative (IKI)</a>. 
	The German Federal Ministry for the Environment, Nature Conservation, 
	Building and Nuclear Safety (BMUB) supports this initiative on the basis of a decision adopted by the German Bundestag.

	<br><br> 

	This software is open source (<a target=_blank href='https://github.com/holalluis/ecam'>GitHub</a>). 
	You can use it offline in your browser if you download the source package and use a localhost (like 
	<a target=_blank href='https://www.apachefriends.org/index.html'>XAMPP</a>).
	
	<br><br>

	<?php write('#about_graphs_lib')?> <a target=_blank href="https://google-developers.appspot.com/chart/">Google Charts</a>

	<br><br>

	2015-<?php echo date("Y")?> <a href='license.php'><?php write('#about_license')?></a>. <br>

	<br><br>

</div>

</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
