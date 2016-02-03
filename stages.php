<?php 
	/* stages.php: this pages lets the user navigate through active stages */

	//parse cookie "GLOBAL" to see if stage $stages[name] is 0 or 1
	$stages=json_decode($_COOKIE['GLOBAL'],true)["Configuration"]["Active Stages"];

	/** Prints a Level 1 stage for the navigation table. All parameters are strings */
	function printL1stage($alias,$level)
	{
		global $stages;
		$active=$stages[$alias];
		switch($level)
		{
			case "Water":$levelAlias="Water supply";$color="default";break;
			case "Waste":$levelAlias="Wastewater";$color="#bf5050";break;
			default:$levelAlias=$level;break;
		}
		if($active)
			echo "
				<td colspan=4 onclick=window.location='edit.php?level=$level'>
					<img src=img/$alias.png>
					<a href='edit.php?level=$level' style=color:$color>$levelAlias</a>
			";
		else echo "<td colspan=4 class=inactive title='Inactive'> <img src=img/$alias.png> $levelAlias";
	}

	/** Prints a Level 2 stage for the navigation table. All parameters are strings */
	function printL2stage($alias,$level,$sublevel)
	{
		global $stages;
		switch($sublevel)
		{
			case "General":
				$sublevelName="Energy use and production";break;
			default:
				$sublevelName=$sublevel;break;
		}
		$active=$stages[$alias];
		$color=$level=="Waste"?"#bf5050":"default";
		if($active)
			echo "
				<td onclick=window.location='edit.php?level=$level&sublevel=$sublevel'>
					<img src=img/$alias.png>
					<a title='Active Stage' href='edit.php?level=$level&sublevel=$sublevel' style=color:$color>$sublevelName</a>";
		else
			echo "
				<td class=inactive title='Inactive'>
				<img src=img/$alias.png> $sublevelName";
	}
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#navigationTable td{vertical-align:middle;padding:0.7em;font-size:15px}
		td.inactive
		{
			color:#aaa;
			background-color:#e8e8e8;
			font-size:12px;
		}
		table a:hover{text-decoration:none}
	</style>
	<script> 
		function init() 
		{ 
			updateResult()
		} 
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Input data</h1>
<!--SUBTITLE--><h4>This is an overview of your system. Click the stage you want to edit. To activate/deactivate stages, go to <a href=configuration.php>Configuration</a>.</h4>

<!--NAVIGATION TABLE-->
<table id=navigationTable class=inline style="text-align:center;margin:1em">
	<!--this table style--><style>
		#navigationTable img{width:35px;vertical-align:middle}
		#navigationTable td:not(.inactive){cursor:pointer}
		#navigationTable td:not(.inactive):hover{background:lightgreen;transition:all 0.5s}
		#navigationTable td.empty{background:#e8e8e8;cursor:default}
	</style>
	<!--stages menu-->
	<tr>
		<td onclick=window.location='edit.php?level=UWS' colspan=8>
		<img src=img/uws.png> <a href=edit.php?level=UWS title="Urban Water System">Urban water cycle</a></td>
	<tr>
		<?php 
			printL1stage('water','Water');
			printL1stage('waste','Waste');
			?><tr><?php 
			printL2stage('waterGen','Water','General');
			printL2stage('waterAbs','Water','Abstraction');
			printL2stage('waterTre','Water','Treatment');
			printL2stage('waterDis','Water','Distribution');
			printL2stage('wasteGen','Waste','General');
			printL2stage('wasteCol','Waste','Collection');
			printL2stage('wasteTre','Waste','Treatment');
			printL2stage('wasteDis','Waste','Discharge');
		?>
</table>

<!--DIAGRAM--><?php //include'diagram.php'?>
<!--PREV BUTTON--><div><button class="button prev" onclick=window.location='configuration.php'>Previous</button></div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
