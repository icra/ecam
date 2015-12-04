<?php
	function nlink($href,$name)
	//void: echo a link if the current web page is not the one in the link's href 
	{
		if($href==$_SERVER['PHP_SELF']) 
			echo "<div class=active-tab><a href='$href' style=color:black>$name</a></div>";
		else 
			echo "<div class=inactive-tab><a href='$href'>$name</a></div>";
		//echo " &#9474 ";
	}	
?>
<style>
	.active-tab, .inactive-tab{
		margin:0 0 0;
		display:inline-block;
	}
	.active-tab{
		background:white;
	}

	#navbar a {
		color:white;	
	}

</style>

<div id=navbar style="background:#00aff1;color:white;padding:0.6em 0em 0em 0em;font-size:18px">
	<?php
		//menu symbol (3 bars)
		echo "&#9776; "; 
		//links
		nlink("/ecam/index.php","&#8962; HOME");
		nlink("/ecam/getStarted.php","Get Started");
		nlink("/ecam/configuration.php","Configuration");
		nlink("/ecam/stages.php","Stages");
		nlink("/ecam/allInputs.php","All Inputs");
		nlink("/ecam/summary.php","All Indicators");
		nlink("/ecam/help.php","Help");
	?>
</div>
