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
<!--TITLE--><h1><script>document.write(Global.General.Name)</script></h1>
<!--SUBTITLE--><h4 style=margin-top:0>
	<?php write('#stages_this_is_an_overview_of_your_system')?> <a href=configuration.php><?php write('#configuration')?></a>.</h4>

<div id=main>

<!--level 3 overview-->
<div style=margin-bottom:3em>
	<table id=l3overview>
		<tr><th><?php write('#stages_stage')?>
			<th><?php write('#stages_num_of_substages')?>
		<script>
			function tableRow(alias,level,sublevel,name)
			{
				document.write("<tr><td><a stage="+alias+" href=edit.php?level="+level+"&sublevel="+sublevel+">"+name+
					"<td>"+Substages[level][sublevel].length+
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
				if(Global.Configuration.ActiveStages[stage]==0)
				{
					links[i].parentNode.parentNode.style.backgroundColor='#eee';
					links[i].parentNode.parentNode.title="Inactive";
					links[i].style.pointerEvents='none';
					links[i].style.color='#999';
				}
			}
		})();
	</script>
</div>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
