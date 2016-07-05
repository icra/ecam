<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		div.benchmark{
			margin:0.5em;
			padding:0.5em;
			border:1px solid #ddd;
		}
		span.bm {font-weight:bold}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Benchmarking</h1>

<div id=main>

<div style=text-align:left;padding:0.5em>
	<script>
		for(var f in RefValues)
		{
			//locate equation
			var loc = locateVariable(f)
			var obj
			if(loc.sublevel)
				obj = Global[loc.level][loc.sublevel]
			else
				obj = Global[loc.level]

			//current value
			var value = format(obj[f]());

			document.write("<div class=benchmark>");
			document.write("<a href=variable.php?id="+f+" title='"+translate(f+"_descr")+"'>"+f+"</a><br>");
			document.write("<span style=background:#fafafa>"+RefValues[f]+"</span><br>");
			document.write('<div style=margin-top:0.5em>Current status: <span class=bm>'+RefValues[f](0)+"</span> ("+value+")</div>")
			document.write("</div>");
		}
	</script>
</div>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
