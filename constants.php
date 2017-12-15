<?php /*constants.php: information about constants*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include"linear.php"?>
<!--TITLE--><h1><?php write('#constants')?></h1>

<!--constants-->
<div id=main style=margin-bottom:3em;font-family:monospace>
<table>
	<tr><th><?php write('#Code')?>
	<th><?php write('#Value')?>
	<th><?php write('#Description')?>
	<th><?php write('#Unit')?>
	<script>
		for(var ct in Cts)
		{
			document.write("<tr>"+
				"<td><a href=constant.php?id="+ct+">"+ct+"</a>"+
				"<td align=right title='"+Cts[ct].value+"'>"+format(Cts[ct].value)+
				"<td><small>"+Cts[ct].descr+"</small>"+
				"<td>"+(function(){ 
					return (Cts[ct].unit == "?????" ? "<span style=background:red>"+Cts[ct].unit+"</span>" : Cts[ct].unit); 
				}()) +
			"");
		}
	</script>
</table>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
