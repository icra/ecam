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
<!--TITLE--><h1><?php write('#edit_input_data')?></h1>
<hr>
<!--SUBTITLE--><h4><?php write('#stages_this_is_an_overview_of_your_system')?> <a href=configuration.php><?php write('#configuration')?></a>.</h4>

<!--level 3 overview-->
<fieldset class=inline>
	<legend><?php write('#stages_system_assessment_overview')?></legend>
	<table id=l3overview>
		<tr><th><?php write('#stages_stage')?>
			<th><?php write('#stages_num_of_substages')?>
			<th><?php write('#stages_type_of_assessment')?>
		<script>
			function tableRow(alias,level,sublevel,name)
			{
				document.write("<tr><td><a stage="+alias+" href=level3.php?level="+level+"&sublevel="+sublevel+">"+name+
					"<td>"+Substages[level][sublevel].length+
					"<td>"+translate("assessment_"+Global.Configuration.Assessment[level][sublevel])+
					"")
			}
			tableRow('waterAbs','Water','Abstraction' ,'<?php write('#Water'); echo ": "; write('#Abstraction')?>');
			tableRow('waterTre','Water','Treatment'   ,'<?php write('#Water'); echo ": "; write('#Treatment')?>');
			tableRow('waterDis','Water','Distribution','<?php write('#Water'); echo ": "; write('#Distribution')?>');
			tableRow('wasteCol','Waste','Collection'  ,'<?php write('#Waste'); echo ": "; write('#Collection')?>');
			tableRow('wasteTre','Waste','Treatment'   ,'<?php write('#Waste'); echo ": "; write('#Treatment')?>');
			tableRow('wasteDis','Waste','Discharge'   ,'<?php write('#Waste'); echo ": "; write('#Discharge')?>');
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
