<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css">
	<style>
		th,td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
</head><body><center>

<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE AND SUBTITLE-->
<h2 onclick=window.location.reload()>Get Started</h2>

<!--FORM-->
<table style="text-align:left;box-shadow:0 9px 5px -5px rgba(0,0,0,0.3);">
	<b>GENERAL DATA</b>
	<tr><th>Name				<td><input value="Sedacusco">
	<tr><th>Location			<td><input value="Cusco">
	<tr><th>Assessment Period	<td><input value="January 2016">
	<tr><th>Comments			<td><textarea rows=5 cols=50>Comments</textarea>
</table>

<!--SAVE--><button>Save</button>

