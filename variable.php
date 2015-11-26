<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
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

<!--TITLE--><h2><a href=allVariables.php>All variables</a> > <?php echo $id?></h2>

<table style=text-align:left>
	<tr><th>Active
		<td style=background:#af0>True
	<tr><th>Level
		<td>1 (Water Supply)
	<tr><th>Description
		<td>
		<script>
			document.write(Info["<?php echo $id?>"].description)
		</script>
	<tr><th>Magnitude
		<td>Flow
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
	<tr><th>Value
		<td>
		<script>
			document.write("<input value='"+0+"'> <button>Save</button>")
		</script>
</table>
