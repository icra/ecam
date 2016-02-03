<!--navbar.php: menu of sections at the top of each page-->

<div id=navbar>
	<?php
		/** void: echo a link if the current web page is not the one in the link's href */
		function nlink($href,$name)
		{
			if(strpos($_SERVER['PHP_SELF'],$href)) 
				echo "<div class=active-tab><a href='$href' style=color:black>$name</a></div>";
			else 
				echo "<div class=inactive-tab><a href='$href'>$name</a></div>";
		}

		nlink("index.php","ECAM - Energy performance and Carbon emissions Assessment and Monitoring Tool");
	?>
</div>

<style>
	#navbar {
		text-align:center;
		background:#00aff1;
		color:white;
		padding:0.2em 0em 0em 0em;
		font-size:17px;
	}
	#navbar div.active-tab, #navbar div.inactive-tab {margin:0 0 0;display:inline-block}
	#navbar div.active-tab{ background:white; }
	#navbar a {color:white;}
	#navbar a:hover {text-decoration:none;}
</style>
