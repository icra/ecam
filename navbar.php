<?php
	function nlink($href,$name)
	//void: echo a link if the current web page is not the one in the link's href 
	{
		if($href==$_SERVER['PHP_SELF']) 
			echo "<a href='$href' style=color:black>$name</a>";
		else 
			echo "<a href='$href'>$name</a>";
		echo " &#9474 ";
	}	
?>

<div style=background:#dfffff;font-size:19px;padding:1em>
	<?php
		//menu symbol (3 bars)
		echo "&#9776; "; 
		//links
		nlink("/ecam/index.php","&#8962; HOME");
		nlink("/ecam/getStarted.php","Get Started");
		nlink("/ecam/configuration.php","Configuration");
		nlink("/ecam/inputs.php","Inputs");
		//nlink("/ecam/outputs.php","Outputs");
		nlink("/ecam/allVariables.php","All variables");
		nlink("/ecam/summary.php","Summary Example");
	?>
</div>
