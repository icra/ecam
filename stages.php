<?php 
	/* stages.php: this pages lets the user navigate through active stages */
	//it's visible when the user clicks on the "input data" menu 
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
<!--linear diagram--><?php include'linear.php'?>
<style> h1 {text-align:left;padding-left:20em} </style>
<!--TITLE--><h1>Input data</h1>
<hr>
<!--SUBTITLE--><h4>This is an overview of the active stages of your system. Click on a stage to input data. To activate more stages go to <a href=configuration.php>Configuration</a>.</h4>

<!--level 3 overview-->
<fieldset class=inline>
	<legend>System assessment overview</legend>
	<table id=l3overview>
		<tr><th>Stage
			<th>Nº of substages
			<th>Type of assessment
		<script>
			function tableRow(alias,level,sublevel,name)
			{
				document.write("<tr><td><a stage="+alias+" href=level3.php?level="+level+"&sublevel="+sublevel+">"+name+
					"<td>"+Substages[level][sublevel].length+
					"<td>"+Global.Configuration.Assessment[level][sublevel]+
					"")
			}
			tableRow('waterAbs','Water','Abstraction' ,'Water Abstraction');
			tableRow('waterTre','Water','Treatment'   ,'Water Treatment');
			tableRow('waterDis','Water','Distribution','Water Distribution');
			tableRow('wasteCol','Waste','Collection'  ,'Wastewater Collection');
			tableRow('wasteTre','Waste','Treatment'   ,'Wastewater Treatment');
			tableRow('wasteDis','Waste','Discharge'   ,'Wastewater Discharge');
		</script>
	</table>
	<script>
		(function()
		{
			//set inactive stages in grey
			var links=document.querySelectorAll("#l3overview a[stage]");
			for(var i=0;i<links.length;i++)
			{
				var stage = links[i].getAttribute('stage');
				if(Global.Configuration['Active Stages'][stage]==0)
				{
					links[i].parentNode.parentNode.style.backgroundColor='#eee';
					links[i].parentNode.parentNode.title="Inactive";
					links[i].style.pointerEvents='none';
					links[i].style.color='#999';
				}
			}
		})();
	</script>
</fieldset>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
