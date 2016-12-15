<!doctype html><html><head>
<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--title--><h1><a href=development.php>Development</a> &rsaquo; Current JSON file</h1>

<!--form for json formatter-->
<form action="https://jsonformatter.curiousconcept.com/process" method=POST>
	<input name=jsondata type=hidden>
	<input name=jsonstandard value=1 type=hidden>
	<input name=jsontemplate value=1 type=hidden>
</form>

<button onclick=document.forms[0].submit() style=margin-bottom:1em>Validate with JSON formatter</button>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
	updateResult();
	document.querySelector('#currentJson').style.display="block"
	document.querySelector('input[name=jsondata]').value=JSON.stringify(Global)
</script>
