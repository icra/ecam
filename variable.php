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
		#info td.input input {margin:0;padding:0;width:95%;}
		<?php
			if(preg_match("/ww/",$id))
			{ ?>
				td.th{background:#bf5050}
				#info a,#info a:visited,h1{color:#bf5050}
			  <?php 
			}
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
			newValue = parseFloat(newValue);
			newValue = (isNaN(newValue)) ? 0 : newValue;
			var multiplier = Units.multiplier(field);
			currentStage[field] = multiplier*newValue;
			init();
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
			if(sublevel!=0)
			{
				var url = Level3.isInList(id) ? "level3.php" : "edit.php";
				newCell.innerHTML+="<a href="+url+"?level="+level+"&sublevel="+sublevel+">"+levelAlias+" "+sublevel+"</a>"
			}
			else newCell.innerHTML="Go back to <a href=edit.php?level="+level+">"+levelAlias+"</a>"
			//Explanation
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Explanation"
			newRow.insertCell(-1).innerHTML=(function()
			{
				var exp = Info[id].explanation
				if(exp=="")
					return "<span style=color:#999>No explanation</span>";
				else
					return exp;
			})();


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
				newCell.innerHTML="Advanced"
				newRow.insertCell(-1).innerHTML="YES";
			}

			//if output: show inputs involved
			if(typeof(currentStage[id])=="function")
			{
				//add a row with matched variables in formula
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Inputs involved"
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
						if(Info[match])
						{
							var currentUnit= (Info[match].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[match]||Info[match].unit);
						}
						else var currentUnit = "no unit";
						//matches can be either numbers or other functions
						var currValue = typeof(match_stage[match])=="function" ? match_stage[match]() : match_stage[match];
						currValue=format(currValue);
						var color = match.search('ww')==-1 ? "#0aaff1":"#bf5050";

						//here we have to show the internal value of inputs, not the multiplied by the unit multiplier
						var multiplier=Units.multiplier(match);
						if(multiplier!=1)
						{
							var magnitude=Info[match].magnitude;
							for(var unit in Units[magnitude])
							{
								if(Units[magnitude][unit]==1)
								{
									currentUnit=unit;
									break;
								}
							}
							
						}

						ret+="<div>"+
							"<a style='color:"+color+"' href=variable.php?id="+match+" "+
							"title='["+match_localization.toString()+"] "+Info[match].description+"'"+
							">"+match+"</a> "+
							" = "+currValue+" "+currentUnit+
							"</div>"
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
				newCell.innerHTML=format(currentStage[id]/Units.multiplier(id));

				//get substages
				if(typeof(currSubstage)=="object" && currSubstage.length > 1)
				{
					newCell.title='Go to substages to edit this value (sum)'
				}
				else{
					newCell.className='input'
					newCell.setAttribute('onclick',"transformField(this)")
				}
			}

			//Magnitude
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Magnitude"
			newRow.insertCell(-1).innerHTML=Info[id].magnitude

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

			//Is used to calculate
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="Is used to calculate"
			newCell=newRow.insertCell(-1)
			newCell.innerHTML=(function()
			{
				//look for the code "id" inside each output
				var ret="";
				var outputsPerInput=Formulas.outputsPerInput(id);

				//if is not used to calculate anything, hide row
				if(outputsPerInput.length==0) 
				{
					return "<span style=color:#999>Nothing</span>";
				}

				outputsPerInput.forEach(function(output)
				{
					var match_localization = locateVariable(output);
					var match_level = match_localization.level;
					var match_sublevel = match_localization.sublevel;
					var match_stage = match_sublevel ? Global[match_level][match_sublevel] : Global[match_level];
					if(Info[output])
					{
						var currentUnit= (Info[output].magnitude=="Currency") ? Global.General.Currency : (Global.Configuration.Units[output]||Info[output].unit);
					}
					else var currentUnit = "no unit";
					var currValue = match_stage[output]()/Units.multiplier(output);
					currValue=format(currValue);
					var color = output.search('ww')==-1 ? "#0aaff1":"#bf5050";
					ret+="<div>"+
						" <a style='color:"+color+"' title='["+match_localization.toString()+"] "+Info[output].description+"'"+
						" href=variable.php?id="+output+">"+output+"</a> = "+
						currValue+" "+currentUnit+
						"</div>";
				});
				return ret;
			})();

			//Contains estimated data?
			if(DQ.hasEstimatedData(id))
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Warning"
				newRow.insertCell(-1).innerHTML="<span class=estimated>&#9888;</span> This equation contains estimated data in at least one input";
			}

			if(typeof(currentStage[id])=='number' && Global.Configuration.DataQuality[id]=="Estimated")
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Warning"
				newRow.insertCell(-1).innerHTML="<span class=estimated>&#9888;</span> This input is considered estimated data by the user";
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
<!--linear diagram--><?php include'linear.php'?>

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
	var currSubstage = sublevel ? Substages[level][sublevel] : Substages[level]
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
<!--TITLE--><h1><script>document.write(Info[id].description+" ("+id+")")</script></h1>
<!--VARIABLE INFO--><table style="text-align:left;width:50%" id=info></table>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
