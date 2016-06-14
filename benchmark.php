<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Benchmarking</h1>

<div style=text-align:left;padding:0.5em>
	<script>
		for(var f in RefValues)
		{
			document.write(f+"<br>");
			document.write("<span style=background:#fafafa>"+RefValues[f]+"</span><br>");
			document.write('&emsp;Test it <input value=0 size=5 onchange="alert(RefValues.'+f+'(parseFloat(this.value)));this.focus()"><br><br>')
		}
	</script>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
