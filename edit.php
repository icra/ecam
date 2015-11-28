<?php
	/** THIS PAGE LETS THE USER MODIFY INPUTS AND SEE AUTOMATICALLY THE OUTPUTS */

	//check specified input
	if(!isset($_GET['level']))die("no level specified");
	//level: 	mandatory
	//sublevel: optional
	$level=$_GET['level'];
	if(isset($_GET['sublevel']))$sublevel=$_GET['sublevel'];
?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
		td.input input{width:95%;font-size:18px}
		td.input{width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script src="js/cookies.js"></script><!--Default Global object here-->
	<script src="js/updateGlobalFromCookies.js"></script><!--Default Global object here-->
	<script>
		/** 
		 * GUI utilities
		 * Note: Comments follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		 */

		//OVERWRITE GLOBAL OBJECT IF GLOBAL COOKIE IS SET
		//if(getCookie("GLOBAL")) Global=JSON.parse(getCookie("GLOBAL"))

		<?php
			if(isset($sublevel))
				echo "var CurrentLevel = Global['$level']['$sublevel']";
			else
				echo "var CurrentLevel = Global['$level'];"
		?>

		/** 
		 * Transform a <td> cell to make modifications to fields from the Global object
		 * @param {element} element - the <td> cell
		 */
		function transformField(element)
		{
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.className='input'
			input.autocomplete='off'
			input.setAttribute('onkeypress',"if(event.which==13){updateField('"+field+"')}")
			//input.setAttribute('onblur',"updateField('"+field+"')")
			input.value=CurrentLevel[field]
			element.appendChild(input)
			input.select()
		}

		/** Redisplay table id=inputs */
		function updateInputs()
		{
			var t=document.getElementById('inputs')
			while(t.rows.length>2)t.deleteRow(-1)
			for(field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="number" )continue
				var newRow=t.insertRow(-1)
				newRow.setAttribute('field',field)
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>"
				newRow.insertCell(-1).innerHTML=Info[field].description
				var newCell=newRow.insertCell(-1)
				newCell.className="input"
				newCell.setAttribute('onclick','transformField(this)')
				newCell.innerHTML=CurrentLevel[field]
				newRow.insertCell(-1).innerHTML=Info[field].unit
				newRow.insertCell(-1).innerHTML=""+
					"<label><input type=radio name="+field+" checked	> Calculated</label> "+
					"<label><input type=radio name="+field+"			> Assumed	</label> "
			}
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs')
			while(t.rows.length>2)t.deleteRow(-1)
			for(field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue
				var newRow=t.insertRow(-1)
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>"
				newRow.insertCell(-1).innerHTML=Info[field].description
				newRow.insertCell(-1).innerHTML=CurrentLevel[field]()
				newRow.insertCell(-1).innerHTML=Info[field].unit
			}
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 */
		function updateField(field)
		{
			var newValue=document.getElementById(field).value //get new value from <input id='field'>
			if(typeof(CurrentLevel[field])=="number")newValue=parseFloat(newValue) //if CurrentLevel[field] is a number, parse float
			CurrentLevel[field]=newValue //update the field
			init() //update tables
		}

		/** Update all tables */
		function init()
		{
			updateInputs()
			updateOutputs()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"loadSaveClear.php"?>

<!-- TODO VOLUMES > ENERGY > EMISSIONS-->
<div style="border:1px solid #ccc;">
	<a href=#>Volumes</a>
	|
	<a href=#>Energy</a> 
	|
	<a href=#>Emissions</a>
	|
	<a href=sankey.php>Sankey Example</a> 
	(not implemented)
</div>

<!--TITLE-->
<?php 
	//Set title for page
	switch($level)
	{
		case "Global": $title="Global"; 		break;
		case "Water":  $title="Water Supply"; break;
		case "Waste":  $title="Wastewater"; 	break;
	}
	if($title!="Global")
		$title=isset($sublevel)?"<a href=edit.php?level=Global>Global</a> &rsaquo; <a href=edit.php?level=$level>$title</a> &rsaquo; $sublevel" : "<a href=edit.php?level=Global>Global</a> &rsaquo; $title";
?>
<h2><a href=stages.php>Stages</a> &rsaquo; <?php echo $title?></h2>

<!--HELP--><h4>Click the grey boxes to edit Inputs. Key Performance Indicators appear in yellow.</h4>

<!--IO-->
<div>
	<!--INPUTS-->
	<table id=inputs class=inline>
		<tr><th colspan=5>INPUTS
		<tr><th>Code<th>Description<th>Current Value<th>Unit<th>Quality
	</table>

	<!--OUTPUTS-->
	<table id=outputs class=inline style=background:yellow>
		<tr><th colspan=4>OUTPUTS - Key Performance Indicators
		<tr><th>Code<th>Description<th>Current Value<th>Unit
	</table>
</div><hr>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
