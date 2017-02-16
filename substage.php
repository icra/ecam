<?php
	/* 
		All substage's info
		Inputs: level, sublevel, index
	*/
	if(!isset($_GET['index'])) die('index not defined');
	$level    = $_GET['level'] or die('level not defined');
	$sublevel = $_GET['sublevel'] or die ('sublevel not defined');
	$index    = $_GET['index'];
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		<?php
			//set the substage pointer and parent stage
			echo "
				var substage = Substages['$level']['$sublevel'][$index];
				var sublevel = Global['$level']['$sublevel'];
			";
		?>

		/** Update all */
		function init()
		{
			//copy all functions from parent sublevel into the substage
			for(var field in sublevel)
			{
				if(typeof(sublevel[field])!="function") continue;
				substage[field]=sublevel[field];
			}
			//redisplay table
			updateSubstage();
			Caption.listeners();
			updateResult();
		}

		//redisplay table
		function updateSubstage()
		{
			var t=document.querySelector('table#substage');
			for(var field in substage)
			{
				if(typeof(substage[field])=="string") continue;

				//new row
				var newRow=t.insertRow(-1);

				//description
				newRow.setAttribute('caption', translate(field+"_descr"));

				//code
				newRow.insertCell(-1).innerHTML=field;

				//value
				newRow.insertCell(-1).innerHTML=(function()
				{
					var value;
					if(typeof(substage[field])=="number")
					{
						value=substage[field]/Units.multiplier(field);

						if(Info[field].magnitude=="Option")
						{
							return Tables.find(field,value);
						}
					}
					else if(typeof(substage[field])=="function")
					{
						value=substage[field]();
					}
					return format(value);
				})();

				//units
				newRow.insertCell(-1).innerHTML=(function()
				{
					return Info[field] ? Info[field].unit : "<span style=color:#ccc>no unit</span>";
				})();
			}
		}
	</script>
	<style>
		h1{
			text-align: left;
			line-height: 2.1em;
			border-bottom: 1px solid #ccc;
			background: white;
		}
		#substage tr td:first-child {font-family:monospace;font-size:11px}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE-->
	<h1>
		<a href=sources.php><script>document.write(Global.General.Name)</script></a> 
		&rsaquo;
		<?php echo "<a href='edit.php?level=$level'>$level</a>"?>
		&rsaquo;
		<?php echo "<a href='edit.php?level=$level&sublevel=$sublevel'>$sublevel</a>"?>
		&rsaquo;
		<span style=color:black;font-size:26px>
			Substage <?php echo (1+$index)?>
			&mdash; <script>document.write(substage.name)</script>
		</span>
	</h1>
	</center>
<!--END TITLE-->

<!--go back to overview-->
<div style=text-align:center;padding:0.5em>
	<a href=substages.php>&larr; Substages overview</a>
</div>

<!--subtitle-->
<h3 style=text-align:center>All inputs and outputs from substage "<script>document.write(substage.name)</script>"</h3>

<!--main container-->
<div>
	<!--substage table-->
	<table id=substage style=margin:auto;margin-top:0.5em>
		<tr><th>Variable<th>Current Value<th>Units
	</table>
</div>
<!--end main container-->

<!--CURRENT JSON--><?php include'currentJSON.php'?>
