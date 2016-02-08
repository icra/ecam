<?php 
	/* stages.php: this pages lets the user navigate through active stages */
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script> 
		function init() 
		{ 
			updateResult()
		} 
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<style> h1 {text-align:left;padding-left:20em} </style>
<!--TITLE--><h1>Input data</h1>
<!--linear diagram--><?php include'linear.php'?>
<!--SUBTITLE--><h4>This is an overview of the active stages of your system. Click on a stage to input data. To activate more stages go to <a href=configuration.php>Configuration</a>.</h4>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
