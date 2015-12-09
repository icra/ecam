<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		th,td{padding:1.5em}
	</style>
	<script src="dataModel/info.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--YOU ARE HERE--><?php include"youAreHere.php"?>
<?php
	//specified input
	if(!isset($_GET['id']))die('no input specified');
	$id=$_GET['id'];
	//make the id variable live in javascript scope
	echo "<script>var id='$id';</script>";
?>

<script>
	//Define some global variables
	var level 		 = Info[id].level
	var sublevel 	 = Info[id].sublevel
	var currentStage = sublevel ? Global[level][sublevel] : Global[level]
	//make the user see "Water Supply" instead of "Water"
	var levelAlias
	switch(level)
	{
		case "Water":levelAlias="Water Supply";break
		case "Waste":levelAlias="Wastewater";break
		default:levelAlias=level;break;
	}
</script>

<!--TITLE--><h1><?php echo $id?></h1>

<h4>Detailed info</h4>

<!--VARIABLE INFO-->
<table style="text-align:left">
	<tr><th>Stage
	<td><script>
		document.write("<a href=edit.php?level="+level+">"+levelAlias+"</a>")
		if(sublevel!=undefined)
			document.write(" &rsaquo; <a href=edit.php?level="+level+"&sublevel="+sublevel+">"+sublevel+"</a>")
	</script>
	<tr><th>Description
	<td><script>document.write(Info[id].description)</script>
	<tr><th>Magnitude
	<td><script>document.write(Info[id].magnitude)</script>
	<tr><th>Value
	<td><script>
		if(typeof(currentStage[id])=="function")
		{
			document.write("<b>Formula</b>: ")
			document.write(currentStage[id])
			document.write("<br><br>")
			document.write("<b>Current Value</b>: ")
			document.write(currentStage[id]())
		}
		else
			document.write(currentStage[id])
	</script>
	<tr><th>Unit 
	<td><script>document.write(Info[id].unit)</script>
</table>
