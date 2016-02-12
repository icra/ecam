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

<!--level 3 overview-->
<fieldset class=inline>
	<legend>Level 3 overview</legend>
	<table>
		<tr><th>Stage<th>#Substages
		<tr><td><a href=level3.php?level=Water&sublevel=Abstraction >Water Abstraction    </a> <td><script>document.write(Global.Substages.Water.Abstraction.length)</script>
		<tr><td><a href=level3.php?level=Water&sublevel=Treatment   >Water Treatment      </a> <td><script>document.write(Global.Substages.Water.Treatment.length)</script>
		<tr><td><a href=level3.php?level=Water&sublevel=Distribution>Water Distribution   </a> <td><script>document.write(Global.Substages.Water.Distribution.length)</script>
		<tr><td><a href=level3.php?level=Waste&sublevel=Collection  >Wastewater Collection</a> <td><script>document.write(Global.Substages.Waste.Collection.length)</script>
		<tr><td><a href=level3.php?level=Waste&sublevel=Treatment   >Wastewater Treatment </a> <td><script>document.write(Global.Substages.Waste.Treatment.length)</script>
		<tr><td><a href=level3.php?level=Waste&sublevel=Discharge   >Wastewater Discharge </a> <td><script>document.write(Global.Substages.Waste.Discharge.length)</script>
	</table>
</fieldset>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
