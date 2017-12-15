<?php
	if(!isset($_GET['id'])) die("Constant not defined");
	$id=$_GET['id']; //constant code
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script> 
		/* Global variable "id" */
		var id="<?php echo $id?>"; 
	</script>
</head><body><center>
<?php 
	include'sidebar.php';
	include'navbar.php';
	include'linear.php';
?>
<h1>
	<a href=constants.php>All constants</a> &rsaquo; 
	<span style=color:black>Constant</span>
</h1>

<!--description-->
<div><script>document.write(Cts[id].descr)</script></div>

<!--value and unit-->
<div style="padding:2em 0">
	<!--try to avoid document.write-->
	<script>
		document.write(id+" = ")
		document.write("<span style=font-size:42px;color:black>"+Cts[id].value+" </span>")
		document.write(Cts[id].unit)
	</script>
</div>

<!--separation--><div style="border:1px solid #ccc;margin:0.5em 0"></div>

<!--constant used in-->
<div style="margin:1em 0"> This constant is used in the following equations </div>
<table>
	<script>
		var i=1;//counter for outputs
		Formulas.outputsPerInput(id).forEach(function(equation){
			document.write("<tr><td>"+i+".<td><a href=variable.php?id="+equation+">"+equation+"</a>");
			document.write("<td>"+translate(equation+"_descr"));
			i++;
		});
		if(i==1){ document.write("<tr><td style=color:#666>~Constant not used. Consider removing it"); }
	</script>
</table>
