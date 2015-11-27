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
		table{display:inline-block;vertical-align:top;}
		input.input{width:95%;font-size:18px}
		td.input{max-height:3em;width:200px;overflow:auto;text-align:right;color:#666;background-color:#eee;cursor:cell}
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script>
		/** 
		 * GUI utilities
		 * Note: Comments follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		 */
		<?php
			if(isset($sublevel))
				echo "var CurrentLevel = Global['$level']['$sublevel']";
			else
				echo "var CurrentLevel = Global['$level'];"
		?>

		/** Generate a json/text file of the Global object */
		function saveToFile()
		{
			var link=document.createElement('a')
			link.href="data:text/json;charset=utf-8,"+JSON.stringify(Global)
			link.download="data.json"
			link.click()
		}

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

		/** Stringify Global object and display it */
		function updateResult()
		{
			document.getElementById('global').innerHTML=JSON.stringify(Global,null,"    ")
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

<!--TITLE-->
<?php 
	//Set title for page
	$title=$level;
	switch($level)
	{
		case "Water":  $title="Water Supply"; break;
		case "Waste":  $title="Wastewater"; 	break;
		case "Global": $title="Global"; 		break;
	}
	$title=isset($sublevel)? "<a href=edit.php?level=$level>$title</a> &rsaquo; $sublevel" : "$title";
?>
<h2><a href=stages.php>Stages</a> &rsaquo; <?php echo $title?></h2>
<h4>Click fields to change values</h4>

<!--MENU-->
<div>
	<!--LOAD-->
	<button><label for=loadfile>&#128194; Load</label></button> |
	<input type=file id=loadfile style=display:none accept=".json" onchange="alert('under construction')">
	<!--SAVE--><button onclick=saveToFile()>&#128190; Save</button>
</div>


<!--VOLUMES > ENERGY > EMISSIONS-->
<div style="background:#eee;">
	<a href=#>Volumes</a>
	|
	<a href=#>Energy</a> 
	|
	<a href=#>Emissions</a>
	(not implemented)
</div>

<!--SANKEY--> <div><a href=sankey.php>Sankey Example</a> (not implemented)</div>

<!--IO-->
<div>
	<!--INPUTS-->
	<table id=inputs>
		<tr><th colspan=5>INPUTS
		<tr><th>Code<th>Description<th>Current Value<th>Unit<th>Quality
	</table>

	<!--OUTPUTS-->
	<table id=outputs style=background:yellow>
		<tr><th colspan=4>OUTPUTS - Key Performance Indicators
		<tr><th>Code<th>Description<th>Current Value<th>Unit
	</table>
</div>

<!--CURRENT GLOBAL OBJECT IN JSON-->
<div style="text-align:left;border:1px solid #ccc;margin:1em">
	<pre><b>Raw Data</b><br><span id=global></span></pre>
</div>
