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

	WaCCliM project is part of the <a target=_blank href="https://www.international-climate-initiative.com/">International Climate Initiative (IKI)</a>. 
	The German Federal Ministry for the Environment, Nature Conservation, 
	Building and Nuclear Safety (BMUB) supports this initiative on the basis of a decision adopted by the German Bundestag.

	<br><br>
	<h3>Special acknowledgements</h3>

	ECAM tool is the result of a collaborative effort. WaCCliM project team thanks
	<ul>
		<li>Members of the WaCCliM Taskforce and WaCCliM Expert pool for their voluntary
		contribution, providing scientific input and peer-review of ECAM.</li>
		<li>REaCH project (CTM2015-66892-R (MINECO/FEDER, UE), funded by the Spanish
		Ministry of Economy and Competitiveness and FEDER, for their support to ICRA.</li>
	</ul>

	<br><br> 

	This software is <a href=https://github.com/holalluis/ecam>open source</a>.
	
	<br>

	Charts used: <a target=_blank href="https://google-developers.appspot.com/chart/">Google Charts</a>

	<br>

	2015-<?php echo date("Y")?> <a href='license.php'><?php write('#about_license')?></a>. <br>
<!-- 	<img class="license_img" src="img/cc_icon_white_x2.png" alt="">
	<img class="license_img" src="img/attribution_icon_white_x2.png" alt="">
	<img class="license_img" src="img/sa_white_x2.png" alt=""> -->
	<img class="license_img license_img-big" src="img/CC_license_big.png" alt="">
	<br><br>
	ECAM by IWA and GIZ, implemented by ICRA for WaCCliM Project* is licensed under
	a <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>. Based on a work
	at <a target="_blank" href="https://creativecommons.org/choose/www.wacclim.org">www.wacclim.org</a>. Permissions beyond the scope of this license may be available
	at <a target="_blank" href="https://creativecommons.org/choose/info@wacclim.org">info@wacclim.org</a>.
</div>

</div>
<div class="footer_wrap">
	<!--FOOTER--><?php include'footer.php'?>
</div>

<!--logos--> 
<div style=background:white;text-align:center;margin-top:50px;> 
	<img src=img/logos_about.png width=45%>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
