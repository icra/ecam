<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		th,td{padding:1.5em}
		td.th{background:#00aff1;color:white;vertical-align:middle}
		td.input{color:#666;background-color:#eee;cursor:cell}
		td.input input{font-size:18px}
	</style>
	<script src="dataModel/info.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script src="js/formulas.js"></script>
	<script>
		function init()
		{
			updateInfoTable()
			updateResult()
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 * @param {float} newValue - The new value of the field
		 */
		function updateField(field,newValue)
		{
			//if CurrentLevel[field] is a number, parse float
			if(typeof(currentStage[field])=="number")
				newValue=parseFloat(newValue) 
			/*update the object*/currentStage[field]=newValue
			/*update views*/init()
		}

		/** Refresh table id=info */
		function updateInfoTable()
		{
			var t=document.getElementById('info')
			while(t.rows.length>0)t.deleteRow(-1)
			var newRow,newCell

			//Stage
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Stage"
			newCell=newRow.insertCell(-1)
			newCell.innerHTML="<a href=edit.php?level="+level+">"+levelAlias+"</a>"
			if(sublevel!=undefined)
				newCell.innerHTML+=" &rsaquo; <a href=edit.php?level="+level+"&sublevel="+sublevel+">"+sublevel+"</a>"

			//Type (input or output)
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Type"
			newRow.insertCell(-1).innerHTML=typeof(currentStage[id])=="function"?"Output":"Input"

			//Description
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Description"
			newRow.insertCell(-1).innerHTML=Info[id]?Info[id].description:"<span style=color:#ccc>no description</span>"

			//Magnitude
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Magnitude"
			newRow.insertCell(-1).innerHTML=Info[id].magnitude

			//Value
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Value"
			newCell=newRow.insertCell(-1)
			if(typeof(currentStage[id])=="function")
			{
				var aux="<b>Formula</b>: "+prettify(currentStage[id].toString())+
					"<br><br>"+
					"<b>Current Value</b>: "+currentStage[id]()
				newCell.innerHTML=aux
				//add a row with matched variables in formula
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Inputs involved"
				newCell=newRow.insertCell(-1)
				var matches=idsPerFormula(currentStage[id].toString())
				var aux=""
				matches.forEach(function(match)
				{
					aux+="<div><a href=variable.php?id="+match+">"+match+"</a> </div>"
				})
				newCell.innerHTML=aux
			}
			else
			{
				newCell.innerHTML=currentStage[id]
				newCell.className='input'
				newCell.setAttribute('onclick',"transformField(this)")
			}

			//Unit
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Unit"
			newRow.insertCell(-1).innerHTML=Info[id].unit
		}

		/** 
		 * Add a <input> to a <td> cell to make modifications in the Global object
		 * @param {element} element - the <td> cell
		 */
		function transformField(element)
		{
			element.removeAttribute('onclick')
			element.innerHTML=""
			var input=document.createElement('input')
			input.className='input'
			input.autocomplete='off'
			input.setAttribute('onkeypress',"if(event.which==13){updateField('"+id+"',this.value)}")
			input.setAttribute('onblur',"updateField('"+id+"',this.value)") //now works ok!
			input.value=currentStage[id]
			element.appendChild(input)
			input.select()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--YOU ARE HERE--><?php include"youAreHere.php"?>
<?php
	//specified input
	if(!isset($_GET['id']))die('no input specified');
	$id=$_GET['id'];
	//make the id variable live in javascript scope
	echo "<script>var id='$id';</script>";
?>

<script>
	//Define some global variables
	if(!Info[id])
	{
		document.write("<div>ERROR. Variable not defined in dataModel/Info.js</div>")
		window.stop()
	}
	var level 		 = Info[id].level
	var sublevel 	 = Info[id].sublevel
	var currentStage = sublevel ? Global[level][sublevel] : Global[level]
	//make the user see "Water Supply" instead of "Water"
	var levelAlias
	switch(level)
	{
		case "Water":levelAlias="Water Supply";break
		case "Waste":levelAlias="Wastewater";break
		default:levelAlias=level;break;
	}
</script>

<!--TITLE--><h1><?php echo $id?></h1>
<!--subtitle--><h4>Detailed info</h4>
<!--VARIABLE INFO--><table style="text-align:left" id=info></table>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
