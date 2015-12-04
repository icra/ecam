<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		th,td{padding:1.5em}
	</style>
	<script src="js/cookies.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>

<?php
	//specified input
	if(!isset($_GET['id']))die('no input specified');
	$id=$_GET['id'];
?>

<!--TITLE--><h2><?php echo $id?></h2>

<h4>Detailed info</h4>

<!--VARIABLE INFO-->
<table style="text-align:left">
	<tr><th>Active 
		<td style=background:#af0>True (not implemented)
	<tr><th>Level
		<td>1 (Water Supply) (not implemented)
	<tr><th>Description
		<td>
		<script>
			document.write(Info["<?php echo $id?>"].description)
		</script>
	<tr><th>Magnitude
		<td>Flow (not implemented)
	<tr><th>Unit 
		<td>
			<script>
				document.write(Info["<?php echo $id?>"].unit)
			</script>
			<select>
				<option>m3/day
				<option>m3/h
				<option>m3/s
				<option>L/day
				<option>L/h
				<option>L/s
			</select>
			(not implemented)
	<tr><th>Value
		<td>not implemented
</table>
