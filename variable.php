<?php
	/*variable.php: page for viewing info of a unique variable */

	//specified input
	if(!isset($_GET['id'])){die('no input specified');}
	$id=$_GET['id'];
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#info th,#info td{padding:1em}
		#info td.th{background:#00aff1;color:white;vertical-align:middle}
		#info td.input{color:#666;background-color:#eee;cursor:cell}
		#info td.input input{font-size:16px}
		<?php
			if(preg_match("/ww/",$id))
			{?>
				td.th{background:#bf5050}
				#info a,#info a:visited,h1{color:#bf5050}
			<?php }
		?>
	</style>
	<script>
		var id='<?php echo $id?>'; //make the id variable live in javascript scope

		function init()
		{
			updateInfoTable();
			Exceptions.apply();
			updateResult();
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 * @param {float} newValue - The new value of the field
		 */
		function updateField(field,newValue)
		{
			//if CurrentLevel[field] is a number, parse float
			if(typeof(currentStage[field])=="number"){ newValue=parseFloat(newValue);}
			//if a unit change is set, get it:
			var multiplier = Units.multiplier(field);
			/*update the object*/currentStage[field]=multiplier*newValue
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
			if(sublevel!=0)
			{
				var url = Level3.isInList(id) ? "level3.php" : "edit.php";

				var sublevelName=sublevel=="General" ? "Energy" : sublevel;
				newCell.innerHTML+=" &rsaquo; <a href="+url+"?level="+level+"&sublevel="+sublevel+">"+sublevelName+"</a>"
			}

			//Type (input or output)
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Type"
			newRow.insertCell(-1).innerHTML=typeof(currentStage[id])=="function"? ("Output <br><br><b>Formula:</b> "+Formulas.prettify(currentStage[id].toString())) : "Input"

			//Is "id" level 3 specific?
			if(Level3.isInList(id))
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Level 3 only?"
				newRow.insertCell(-1).innerHTML="YES"
			}

			//Magnitude
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Magnitude"
			newRow.insertCell(-1).innerHTML=Info[id].magnitude

			//Explanation
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Explanation"
			newRow.insertCell(-1).innerHTML=Info[id].explanation

			//if output, show inputs involved, else show outputs involved
			if(typeof(currentStage[id])=="function")
			{
				//add a row with matched variables in formula
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Inputs involved in the formula"
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function(){
					var matches=Formulas.idsPerFormula(currentStage[id].toString())
					var ret=""
					matches.forEach(function(match)
					{
						var match_localization = locateVariable(match)
						var match_level = match_localization.level
						var match_sublevel = match_localization.sublevel
						var match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level]
						var currentUnit= (Info[match].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[match]||Info[match].unit);
						//matches can be either numbers or other functions
						var currValue = typeof(match_stage[match])=="function" ? match_stage[match]() : match_stage[match];
						currValue/=Units.multiplier(match);
						var color = match.search('ww')==-1 ? "#0aaff1":"#bf5050";
						ret+="<div>"+
							match_localization.toString()+
							"<a style='color:"+color+"' href=variable.php?id="+match+" title='"+Info[match].description+"'>"+match+"</a> "+
							" = "+currValue+" "+currentUnit+
							"</div>"
					});
					return ret;
				})();
			}
			else //means is a input, so we will look for involved outputs
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Is used to calculate"
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function(){
					//look for the code "id" inside each output
					var ret="";
					Formulas.outputsPerInput(id).forEach(function(output)
					{
						var match_localization = locateVariable(output)
						var match_level = match_localization.level
						var match_sublevel = match_localization.sublevel
						var match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level]
						var currentUnit= (Info[output].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[output]||Info[output].unit);
						var formula = Formulas.prettify(match_stage[output].toString());
						var currValue = match_stage[output]()/Units.multiplier(output);
						currValue=format(currValue);
						var color = output.search('ww')==-1 ? "#0aaff1":"#bf5050";
						ret+="<div>"+
							match_localization.toString()+
							" <a style='color:"+color+"' title='"+Info[output].description+
							"' href=variable.php?id="+output+">"+output+"</a> = "+
							"<span style=color:#666>"+formula+"</span> = "+currValue+" "+currentUnit+
							"</div>";
					});
					return ret;
				})();
			}

			//Value
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Value"
			newCell=newRow.insertCell(-1)
			if(typeof(currentStage[id])=="function")
			{
				newCell.innerHTML=(function()
				{
					var unit=Info[id].magnitude=="Currency"?Global.General.Currency : Info[id].unit;
					var currValue=currentStage[id]()/Units.multiplier(id);
					currValue=format(currValue);
					return currValue+" "+unit;
				})();
			}
			else
			{
				newCell.innerHTML=currentStage[id]/Units.multiplier(id);

				//if this input is level 3 only, should not be modified here
				if(!Level3.isInList(id))
				{
					newCell.className='input'
					newCell.setAttribute('onclick',"transformField(this)")
				}
			}

			//Select units -- only inputs!
			if(typeof(currentStage[id])=='number')
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Unit"
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(Info[id].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					var str="<select onchange=Units.selectUnit('"+id+"',this.value)>";
					if(Units[Info[id].magnitude]===undefined)
					{
						return Info[id].unit
					}
					var currentUnit = Global.Configuration.Units[id] || Info[id].unit
					for(unit in Units[Info[id].magnitude])
					{
						if(unit==currentUnit)
							str+="<option selected>"+unit+"</option>";
						else
							str+="<option>"+unit+"</option>";
					}
					str+="</select>"
					return str
				})();
			}
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
			var multiplier = Units.multiplier(id);
			var currentValue = currentStage[id]/multiplier;
			input.value=currentValue
			element.appendChild(input)
			input.select()
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<script>
	if(!Info[id])
	{
		document.write("<div>ERROR. Variable not defined in dataModel/Info.js</div>")
		window.stop()
	}
	//Define some global variables
	var localization = locateVariable(id)
	var level 		 = localization.level
	var sublevel 	 = localization.sublevel
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
<!--subtitle--><h4>Detailed info</h4>
<!--TITLE--><h1><script>document.write("["+id+"]: "+Info[id].description)</script></h1>
<!--VARIABLE INFO--><table style="text-align:left;width:50%" id=info></table>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
