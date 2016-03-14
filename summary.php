<?php
	/**summary.php: summary for inputs or outputs */

	if(!isset($_GET['type']))
		die('Error. type not specified<br>Try: <a href=summary.php?type=input>Inputs</a> or <a href=summary.php?type=output>Outputs</a> or <a href=summary.php?type=ccvv>calculated variables</a>');
	
	//tipus de variable: inputs o outputs
	$type=$_GET['type'];

	//check correct $type value
	if($type!="input" && $type!="output" && $type!="ccvv")
		die('Error. type must be "inputs", "outputs" or "ccvv"');

	//if ccvv (calculated variables, create a boolean $ccvv)
	if($type=="ccvv")
	{
		$type="output";
		$ccvv=true;
	}
	else
		$ccvv=false;
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateLevel1();
			updateLevel2();
			updateCounts();
			Exceptions.apply();
			updateResult();
		}

		function updateLevel1()
		{
			var t=document.querySelector("[level='1']")
			while(t.rows.length>1)t.deleteRow(-1)
			t.innerHTML+=tableRows(Global.Water,"Water supply", "water", "edit.php?level=Water")
			t.innerHTML+=tableRows(Global.Waste,"Wastewater",   "waste", "edit.php?level=Waste")
			if(t.rows.length<2) t.insertRow(-1).insertCell(-1).innerHTML="no active stages";
		}

		function updateLevel2()
		{
			var t=document.querySelector("[level='2']");
			while(t.rows.length>1)t.deleteRow(-1);

			t.innerHTML+=tableRows(Global.Water.General,      "Water General",	       "waterGen", "edit.php?level=Water&sublevel=General")
			t.innerHTML+=tableRows(Global.Water.Abstraction,  "Water Abstraction",	   "waterAbs", "edit.php?level=Water&sublevel=Abstraction")
			t.innerHTML+=tableRows(Global.Water.Treatment,	  "Water Treatment",	   "waterTre", "edit.php?level=Water&sublevel=Treatment")
			t.innerHTML+=tableRows(Global.Water.Distribution, "Water Distribution",	   "waterDis", "edit.php?level=Water&sublevel=Distribution")
			t.innerHTML+=tableRows(Global.Waste.General,      "Wastewater General",	   "wasteGen", "edit.php?level=Waste&sublevel=General")
			t.innerHTML+=tableRows(Global.Waste.Collection,	  "Wastewater Collection", "wasteCol", "edit.php?level=Waste&sublevel=Collection")
			t.innerHTML+=tableRows(Global.Waste.Treatment,	  "Wastewater Treatment",  "wasteTre", "edit.php?level=Waste&sublevel=Treatment")
			t.innerHTML+=tableRows(Global.Waste.Discharge,	  "Wastewater Discharge",  "wasteDis", "edit.php?level=Waste&sublevel=Discharge")

			if(t.rows.length<2) t.insertRow(-1).insertCell(-1).innerHTML="No active stages";
		}

		function updateCounts()
		{
			for(family in Global.Configuration["Active Stages"])
			{
				var count=document.querySelectorAll("[family='"+family+"']").length;
				if(count!=0)document.querySelector("[count='"+family+"']").innerHTML = count;
			}
		}

		//** Create rows and columns for a table with specified object
		function tableRows(object,name,family,href)
		{
			//make link or not depending on active 
			if(Global.Configuration["Active Stages"][family]==0){return "";}

			//color blue or red
			var color = family.search('waste')==-1 ? "#00aff1" : "#bf5050";

			//return string
			var ret="<tr><td colspan=4 style='background:#ccc;font-weight:bold'>";
			ret+="<a href="+href+" style='color:"+color+"'>"+name+":</a> "

			//create a input/output count for the stage
			ret+="<span count="+family+">0</span> <?php echo $type?>s"

			//fill rows
			for(var variable in object)
			{
				//only go over type specified
				<?php
					switch($type)
					{
						case "input":$typeof="number";break;
						case "output":$typeof="function";break;
					}
				?>
				if(typeof(object[variable])!="<?php echo $typeof?>"){continue;}

				<?php 
					//Skip calculated variables depending on $ccvv
					if($type=="output")
					{
						if($ccvv)
							echo "if(variable.search('^c_')==-1){continue;}";
						else
							echo "if(variable.search('^c_')!=-1){continue;}";
					}
				?>

				var description=Info[variable] ? Info[variable].description : "<span style=color:#ccc>no description</span>";
				var unit = Info[variable] ? (Global.Configuration.Units[variable] || Info[variable].unit) : "<span style=color:#ccc>no unit</a>"
				var multiplier = Units.multiplier(variable);
				ret+="<tr field='"+variable+"' family='"+family+"'>"+
					"<td style='font-weight:bold'><a style='color:"+color+"' href=variable.php?id="+variable+">"+variable+"</a>"+
					"<td>"+description+
					"<td style=text-align:right>"+format(object[variable]<?php if($type=="output"){echo "()";}?>/multiplier)+
					"<td>"+unit
			}
			return ret;
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include"linear.php"?>
<!--TITLE--><h1>Summary — All <?php echo $type?>s</h1>
<!--STAGES--><?php include"activeStages.php"?>

<!--AVAILABLE INPUTS-->
<div class=inline style="text-align:left">
	<h4>All active <?php echo $type?>s (sorted by stage)</h4>
	<!--level 1-->
	<div class=inline style="font-size:11px;width:45%;padding:0">
		<table style="width:100%" level=1><tr><th colspan=4>GHG assessment</table>
	</div>
	<!--level 2-->
	<div class=inline style="font-size:11px;width:45%;padding:0">
		<table style="width:100%" level=2><tr><th colspan=4>Energy performance</table>
	</div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
