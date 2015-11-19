<?php
	function nlink($href,$name)
	//void: echo a link if the current web page is not the one in the link's href 
	{
		if($href==$_SERVER['PHP_SELF']) 
				echo "<a href='$href' style=color:black>$name</a>";
		else 	echo "<a href='$href'>$name</a>";
		echo " &#9474 ";
	}	
?>

<div style=background:#AFEEEE;font-size:19px;padding:1em>
	<?php
		//menu symbol (3 bars)
		echo "&#9776; "; 
		//links
		nlink("index.php","&#127968; HOME");
		nlink("getStarted.php","Get Started");
		nlink("allVariables.php","All variables");
		nlink("#","Read the manual");
		nlink("#","Video tutorial");
		nlink("#","Load your system");
	?>
</div>

<hr>
