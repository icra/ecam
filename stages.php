<?php 
	/** THIS PAGES LETS THE USER NAVIGATE THROUGH ACTIVE STAGES */

	/** Prints a Level 2 stage for the navigation table. All parameters are strings */
	function printL2stage($alias,$level,$sublevel)
	{
		echo "<td stage=$alias>
			<img src=img/$alias.png>
			<a title='Active Stage' href='edit.php?level=$level&sublevel=$sublevel'>$sublevel</a>
			<td> <a href=level3.php?level=$level&sublevel=$sublevel>Substages</a> 
			(<script>document.write(Global.Level3.$level.$sublevel.length)</script>)";
	}
?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		td{vertical-align:middle;padding:1.5em;font-size:15px}
	</style>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		/** Color the edit table according to cookies */
		function turnOffLinks()
		{
			//go over elements that have the stage attribute
			var elements=document.querySelectorAll("[stage]")
			for(var i=0;i<elements.length;i++)
			{
				var stage=elements[i].getAttribute('stage')
				//Select non active stages
				if(!Global.General["Active Stages"][stage]) 
				{
					//remove link inside
					elements[i].innerHTML=elements[i].textContent
					elements[i].style.color="#aaa"
					elements[i].style.backgroundColor="#efefef"
					elements[i].style.fontSize="12px"
					//add title attribute
					elements[i].setAttribute('title','Inactive Stage')
					elements[i].style.cursor='not-allowed'
					//substages
					if(stage!="water" && stage!="waste")
					{
						var nextSibling = elements[i].nextSibling
						nextSibling.innerHTML="Substages"
						nextSibling.style.fontSize="12px"
						nextSibling.style.color="#aaa"
						nextSibling.style.backgroundColor="#efefef"
					}
				}
			}
		}

		function init()
		{
			turnOffLinks()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--YOU ARE HERE--><?php include"youAreHere.php"?>
<!--TITLE--><h1>Stages Overview</h1>
<!--HELP--><h4>Click the stage where you want to input data. To activate stages go to <a href=configuration.php>Configuration</a>.</h4>

<!--Navigation Table (for active stages)-->
<table style="text-align:center" id=navigationTable>
	<!--this table style--><style>
		#navigationTable img{width:40px;vertical-align:middle}
	</style>
	<tr>
		<th style="font-size:13px" colspan=2>Level 1
		<th style="font-size:13px">Level 2
		<th style="font-size:13px">Level 3
	<tr><td rowspan=6><img src=img/waterAbs.png><a title="Active Stage"	href="edit.php?level=Global">Global</a></td>
		<td rowspan=3 stage=water><img src=img/waterAbs.png><a title="Active Stage" href="edit.php?level=Water">Water Supply</a>
			<?php printL2stage('waterAbs','Water','Abstraction')?>
		<tr>
			<?php printL2stage('waterTre','Water','Treatment')?>
		<tr>
			<?php printL2stage('waterDis','Water','Distribution')?>
	<tr><td rowspan=3 stage=waste><img src=img/wasteCol.png><a title="Active Stage" href="edit.php?level=Waste">Wastewater</a>
			<?php printL2stage('wasteCol','Waste','Collection')?>
		<tr>
			<?php printL2stage('wasteTre','Waste','Treatment')?>
		<tr>
			<?php printL2stage('wasteDis','Waste','Discharge')?>
</table>

<!--prev & next buttons-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='configuration.php'>Previous</button> 
	<button class="button next" onclick=window.location='allInputs.php'>Next</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
