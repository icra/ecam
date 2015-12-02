<?php
	/** THIS PAGE LETS THE USER EDIT LEVEL 3*/

	//check user GET inputs (level & sublevel)
	if(!isset($_GET['level']))		die("ERROR: level not specified");
	if(!isset($_GET['sublevel']))	die("ERROR: sublevel not specified");

	/*
	 * level: 		mandatory. possible values: {"Water","Wastewater"}
	 * sublevel: 	mandatory. possible values: {"Abstraction","Treatment","Distribution","Collection","Treatment","Discharge"}
	 */
	$level=$_GET['level'];
	$sublevel=$_GET['sublevel'];
?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
		th{vertical-align:middle}
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script src="js/cookies.js"></script><!--basic cookie functions here-->
	<script src="js/updateGlobalFromCookies.js"></script><!--update Global object from cookie "GLOBAL" here-->
	<script>
		<?php
			//establish the level 2 stage we are going to be focused, since substages of level 3 have the same variables
			echo "var CurrentStage = Global['$level']['$sublevel']";
		?>

		/** Returns an array of strings which are input identifiers for current stage, e.g ["aV1","av2"] */
		function getInputs()
		{
			var inputs = [] //empty array
			for(field in CurrentStage)
			{
				if(typeof(CurrentStage[field])!="number" )continue
				inputs.push(field)
			}
			return inputs
		}

		/** Array to store all Substage objects */
		var substages = []

		/** Substage class for storing all variables that correspond to current stage */
		function Substage()
		{
			//get a list of inputs for this level
			var inputs = getInputs()
			//default name
			this.name = "Substage "+(substages.length+1)
			//now make the object look like, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
			for(i in inputs)this[inputs[i]]=0
		}

		/** button new substage pushed */
		function newSubstage()
		{
			substages.push(new Substage()) //add a new substage to the array "substages"
			updateSubstagesTable()
		}

		/** button delete substage pushed */
		function deleteSubstage(index)
		{
			substages.splice(index,1)
			updateSubstagesTable()
		}

		/** update substages table */
		function updateSubstagesTable()
		{
			/*table element*/ var t = document.getElementById('substages')

			/*update table header */
				while(t.rows[0].cells.length>1)t.rows[0].deleteCell(-1)
				//go over substages: create a column for each
				for(s in substages)
				{
					var newTH = document.createElement('th')
					newTH.innerHTML="Substage "+(parseInt(s)+1)
					t.rows[0].appendChild(newTH)
				}
				//TOTAL header
				var newTH = document.createElement('th')
				newTH.innerHTML="TOTAL"
				newTH.style.backgroundColor="#eee"
				newTH.style.color="#333"
				t.rows[0].appendChild(newTH)
			/*end update header*/

			/*update table body*/
				while(t.rows.length>1)t.deleteRow(-1)
				//each row corresponds to a variable of the current stage
				var inputs = getInputs()
				for(input in inputs)
				{
					var newRow = t.insertRow(-1)
					var newCell = newRow.insertCell(-1)
					newCell.innerHTML=inputs[input]
					for(s in substages)
					{
						newRow.insertCell(-1).innerHTML="0"
					}
					//total value for input i
					newRow.insertCell(-1).innerHTML="<span style=background-color:#ccc>0</span>"
				}
				//Options
				var newRow = t.insertRow(-1)
				var newCell = document.createElement('th');newRow.appendChild(newCell)
				newCell.innerHTML="Options"
				for(s in substages)
				{
					var str=""+
						"<button style='vertical-align:middle'>&larr;</button>"+
						"<button style='vertical-align:middle' class=delete onclick=deleteSubstage("+s+")></button>"+
						"<button style='vertical-align:middle'>&rarr;</button>"
					newRow.insertCell(-1).innerHTML=str
				}
				newRow.insertCell(-1)
			/*end update body*/

			/*update counter*/ document.getElementById('counter').innerHTML=substages.length
		}

		/** Update all tables */
		function init()
		{
			/*for debugging*/ newSubstage()
			updateSubstagesTable()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"menu.php"?>
<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Water": $titleLevel="<a href=edit.php?level=$level>Water Supply</a>";break;
		case "Waste": $titleLevel="<a href=edit.php?level=$level>Wastewater</a>";break;
	}
	$sep="<span style=color:black>&rsaquo;</span>";
	$titleSublevel="<a href=edit.php?level=$level&sublevel=$sublevel>$sublevel</a>";
	$title="<a href=stages.php>Stages</a> $sep $titleLevel $sep $titleSublevel $sep <span style=color:black>Substages (Level 3)</a>";
?>
<!--TITLE--><h1><?php echo $title?></h1>
<!--HELP--><h4>Here you can subdivide your stage into substages</h4>
<!--new substage button--><button onclick=newSubstage()>+ New Substage</button>
<!--substages counter--><div class=inline style="border:1px solid #ccc">Substages: <span id=counter>0</span></div>

<!--ALL SUBSTAGES-->
<table id=substages style=margin:1em>
	<tr><td style="padding:1em;background:#eee;color:#333">&darr; Inputs \ Substages &rarr; 
</table>

<?php die()?>

<!--PLOTS-->
<div class=inline style="border:1px solid #000;width:45%;margin:1em">
	SOME PLOTS HERE (to be implemented at the end)<br>
	<img border=1 src="img/plot-example.png" width=50%>
	<br>
	<a href=sankey.php>Sankey Example</a> 
	(not implemented)
	<button>Export</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
