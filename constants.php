<?php /*constants.php: information about constants*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Constants</h1>

<!--constants-->
<div id=main style=margin-bottom:3em>
<table>
	<tr><th>Constant<th>Description<th>Value<th>Unit
	<script>
		for(var ct in Cts)
		{
			document.write("<tr>"+
				"<td>"+ct+
				"<td>"+Cts[ct].descr+
				"<td>"+Cts[ct].value+
				"<td>"+(function(){ 
					return (Cts[ct].unit == "?????" ? "<span style=background:red>"+Cts[ct].unit+"</span>" : Cts[ct].unit); 
				}()) +
			"");
		}
	</script>
</table>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
