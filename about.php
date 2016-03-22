<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>About</h1>

<div style=max-width:40%;text-align:justify;line-height:2em>
	Developed by <a href=http://icra.cat>ICRA</a> in cooperation with <a href=http://www.iwa-network.org/>IWA</a>,
	GIZ under the WaCCliM project and Cobalt Water.<br>
	The tool was formerly developed in June 2015 as an EXCEL tool by the consortium Global Water Commons (LNEC and University of Valencia) in collaboration with Cobalt Water. 
	We want to acknowledge how extremely valuable The Excel tool has been to enable the development of this web-tool.

	<br><br>
	
	The source code of this project is in <a href=https://github.com/holalluis/ecam>GitHub</a>.
	From there you can download the tool and have it offline. <br>
	You will need a PHP localhost (such as <a href=https://www.apachefriends.org/index.html>XAMPP</a>).<br>
	This software was written entirely using the <a href=http://www.vim.org>Vim</a> editor, inside a <a href=https://www.cygwin.com/>Cygwin</a> terminal. <br>
	Tool coded in HTML/PHP/CSS/Javascript languages. <br>

	<ul style=text-align:left>
		<li>Graphs library: <a target=_blank href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">Google Charts</a>
		<li>Json viewer: <a target=_blank href="https://jsonformatter.curiousconcept.com/">json formatter</a>
	</ul>

	<br>2015-2016 <a href=license.php>License</a>. <br>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
