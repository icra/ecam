<?php
	/*variable.php: page for viewing info of a unique variable, when the user clicks the code, for example in "edit.php" or "level3.php"  */

	//specified code for input 
	if(!isset($_GET['id'])){die('no input specified');}
	$id=$_GET['id'];
?>
<!doctype html><html><head>
	<?php include'imports.php'?>

	<!--prettify benchmark code-->
	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

	<style>
		#info th,#info td{padding:1em}
		#info td.th{background:#00aff1;color:white;vertical-align:middle}
		#info td.input{color:#666;background-color:#eee;cursor:cell}
		#info td.input input {margin:0;padding:0;width:95%;}
		.variableCode { font-family:monospace; }
		<?php
			if(preg_match("/ww/",$id))
			{ 
				?>
				#info td.th{background:#d71d24}
				#info a,#info a:visited,h1{color:#bf5050}
			  <?php 
			}
		?>
		/** table "used to calculate" and "inputs involved" */
		table#bminv td, table#utc td, table#ininv td{padding:2px 5px 2px 7px;border:none}
		.unit{color:#aaa}
		#info .constant a {color:blue; !important}
		.fuel {color:#088A29}
		.fuel a {font-weight:bold;color:#088A29;}
		.fuel:first-child {cursor:help}
		pre.prettyprint {margin:0.5em;padding:1em}
	</style>

	<script>
		var id='<?php echo $id?>'; //make the id variable live in javascript scope

		function init()
		{
			updateInfoTable();
			Exceptions.apply();
			Caption.listeners();
			updateResult();
			PR.prettyPrint();
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
			newCell.innerHTML="<?php write('#variable_stage')?>"
			newCell=newRow.insertCell(-1)
			if(sublevel)
			{
				var url = "edit.php";
				newCell.innerHTML+="&larr; <a href="+url+"?level="+level+"&sublevel="+sublevel+">"+levelAlias+": "+sublevelAlias+"</a>"
			}
			else newCell.innerHTML="<?php write('#variable_go_back_to')?> <a href=edit.php?level="+level+">"+levelAlias+"</a>"
			//Explanation
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="<?php write('#variable_explanation')?>"
			newRow.insertCell(-1).innerHTML=(function()
			{
				//var exp = Info[id].explanation
				var exp = translate(id+"_expla")
				if(exp=="")
					return "<span style=color:#999>No explanation</span>";
				else
					return exp;
			})();

			//Type (input or output)
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="<?php write('#variable_type')?>"
			newRow.insertCell(-1).innerHTML=(function(){
				if(typeof(currentStage[id])=="function")
				{
					var pretf = Formulas.prettify(currentStage[id].toString());
					var ret = "Output <div><pre class=prettyprint style='padding:1em;background:#eee'><b><?php write('#variable_formula')?>:</b>"+pretf+"<pre></div>";
					return ret;
				}
				else
				{
					return "Input";
				}
			})();

			//Is "id" level 3 specific?
			if(Level3.list.indexOf(id)>-1)
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="<?php write('#variable_advanced')?>"
				newRow.insertCell(-1).innerHTML="YES";
			}

			//if output: show inputs involved
			if(typeof(currentStage[id])=="function")
			{
				//add a row with matched variables in formula
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="<?php write('#variable_inputs_involved')?>"
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function(){
					var matches=Formulas.idsPerFormula(currentStage[id].toString())
					var ret="<table id=ininv>"
					matches.forEach(function(match)
					{
						//means this is a constant
						if(match.substring(0,3)=="ct_")
						{
							ret+="<tr><td class=constant caption='CONSTANT: "+Cts[match].descr+"'><a href=constant.php?id="+match+">"+match+"</a><td>"+Cts[match].value+"<td class=unit>"+Cts[match].unit;
						}
						else if(Global.Configuration.Selected.FuelType.hasOwnProperty(match))
						{
							var fuel = Global.Configuration.Selected.FuelType[match]
							ret+="<tr><td class=fuel><a href=fuelInfo.php>Fuel selected</a>:<td><b>"+fuel+"</b>";
							ret+="<tr><td class=fuel caption='Fuel density       '> fuel.FD             <td>"+Tables["Fuel types"][fuel].FD             +"<td class=unit>kg/L";
							ret+="<tr><td class=fuel caption='Net calorific value'> fuel.NCV            <td>"+Tables["Fuel types"][fuel].NCV            +"<td class=unit>TJ/Gg";
							ret+="<tr><td class=fuel caption='CO2 emission factor'> fuel.EFCO2          <td>"+Tables["Fuel types"][fuel].EFCO2          +"<td class=unit>kg<sub>CO<sub>2</sub></sub>/TJ";
							ret+="<tr><td class=fuel caption='CH4 emission factor'> fuel.EFCH4.engines  <td>"+Tables["Fuel types"][fuel].EFCH4.engines  +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
							ret+="<tr><td class=fuel caption='CH4 emission factor'> fuel.EFCH4.vehicles <td>"+Tables["Fuel types"][fuel].EFCH4.vehicles +"<td class=unit>kg<sub>CH<sub>4</sub></sub>/TJ";
							ret+="<tr><td class=fuel caption='N2O emission factor'> fuel.EFN2O.engines  <td>"+Tables["Fuel types"][fuel].EFN2O.engines  +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
							ret+="<tr><td class=fuel caption='N2O emission factor'> fuel.EFN2O.vehibles <td>"+Tables["Fuel types"][fuel].EFN2O.vehicles +"<td class=unit>kg<sub>N<sub>2</sub>O</sub>/TJ";
						}
						else //normal inputs
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
							currValueF=format(currValue);

							//handle dropdowns
							if(Info[match].magnitude=="Option")
							{
								currValueF=Tables.find(match,currValue);
							}

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

							/**
							  *
							  *	BUG here: c_wwt_nrg_tran: it is a function with unit=TJ (multiplier!=1) //TODO
								*	the way it is now shows kWh with the TJ value
							  *
							  */

							var estimated = Global.Configuration.DataQuality[match]=="Estimated" ? "<span class=estimated caption='<?php write('#variable_estimated')?>'>&#9888;</span>" : "";

							ret+="<tr>"+
								"<td class=variableCode><a style='color:"+color+"' href=variable.php?id="+match+" "+
								"caption='INPUT: "+translate(match+"_descr")+"'"+
								">"+match+"</a> "+
								"<td caption='"+currValue+"' style=cursor:help>"+currValueF+"<td><span class=unit>"+currentUnit+"</span> "+
								estimated;
						}
					});
					ret+="</table>";
					return ret;
				})();
			}

			//Current Value
			newRow=t.insertRow(-1);
			newCell=newRow.insertCell(-1);
			newCell.className='th';
			newCell.innerHTML="Current value";
			newCell=newRow.insertCell(-1);
			if(typeof(currentStage[id])=="function")
			{
				newCell.innerHTML=(function()
				{
					var unit=Info[id].magnitude=="Currency"?Global.General.Currency : Info[id].unit;
					var currValue=currentStage[id]()/Units.multiplier(id);
					currValueF=format(currValue);
					newCell.setAttribute('caption',currValue);
					newCell.style.cursor='help';
					return currValueF+" &emsp;<span class=unit>"+unit+"</span>";
				})();
			}
			else
			{
				newCell.innerHTML=format(currentStage[id]/Units.multiplier(id));

				//get substages
				if(typeof(currSubstage)=="object" && currSubstage.length > 1)
				{
					newCell.setAttribute('caption','Go to Substages to modify this input');
				}
				else{
					newCell.className='input'
					//if input has magnitude Option
					if(Info[id].magnitude=="Option")
					{
						var select=document.createElement('select');
						newCell.innerHTML="";
						newCell.appendChild(select);
						select.setAttribute('onchange','currentStage["'+id+'"]=parseInt(this.value);init()')
						for(var op in Tables[id])
						{
							var option = document.createElement('option');
							var value = parseInt(Tables[id][op].value);
							select.appendChild(option);
							option.value=value;
							option.innerHTML="("+value+") "+op;
							if(currentStage[id]==value) 
							{
								option.selected=true;
							}
						}
					}
					else
					{
						newCell.setAttribute('onclick',"transformField(this)")
					}
				}
			}

			//Magnitude
			newRow=t.insertRow(-1)
			newCell=newRow.insertCell(-1)
			newCell.className='th'
			newCell.innerHTML="<?php write('#variable_magnitude')?>"
			newRow.insertCell(-1).innerHTML=Info[id].magnitude

			//Select units -- only inputs!
			if(typeof(currentStage[id])=='number')
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="<?php write('#variable_unit')?>"
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
			newCell.innerHTML="<?php write('#variable_is_used_to_calculate')?>"
			newCell=newRow.insertCell(-1)
			newCell.innerHTML=(function()
			{
				//look for the code "id" inside each output
				var outputsPerInput=Formulas.outputsPerInput(id);
				//if is not used to calculate anything, hide row
				if(outputsPerInput.length==0) 
				{
					return "<span style=color:#999><?php write('#variable_nothing')?></span>";
				}

				var ret="<table id=utc>";
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
					currValueF=format(currValue);

					var pretf = Formulas.prettify(match_stage[output].toString());

					var color = output.search('ww')==-1 ? "#0aaff1":"#bf5050";

					var estimated = DQ.hasEstimatedData(output) ? "<span class=estimated caption='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span> " : "";

					ret+="<tr>"+
						" <td class=variableCode><a style='color:"+color+"' caption='["+match_localization.toString()+"] "+translate(output+"_descr")+"'"+
						" href=variable.php?id="+output+">"+output+"</a>"+
						"<td caption='"+pretf+"' style=cursor:help>"+
						currValueF+"<td> <span class=unit>"+currentUnit+"</span> "+estimated;
				});
				ret+="</table>";

				return ret;
			})();

			//If input:is used in benchmarking?
			if(typeof(currentStage[id])=='number')
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Benchmarks where is used"
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//find if input is used in benchmark
					var benchmarks=Utils.usedInBenchmarks(id);
					if(benchmarks.length==0) return "<span style=color:#999>None</span>";
					var ret="<table id=bminv>";
					benchmarks.forEach(function(bm)
					{
						ret+="<tr><td><a caption='"+translate(bm+"_descr")+"' href=variable.php?id="+bm+">"+bm+"</a>";
					});
					ret+="</table>";
					return ret;
				})();
			}

			//Is "id" benchmarked?
			if(RefValues.hasOwnProperty(id))
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="Is benchmarked?"
				newRow.insertCell(-1).innerHTML="YES (<a href=benchmark.php>Benchmark summary</a>)"+
					"<div class='card'>"+
					"	<div class=menu onclick=this.parentNode.classList.toggle('folded')>"+
					"		<button></button> See formula"+
					"	</div>"+
					"	<pre class='prettyprint'>"+RefValues[id].toString().replace(/	/g,'  ')+"</pre>"+
					"</div>"+
					"";
			}

			//Contains estimated data?
			if(DQ.hasEstimatedData(id))
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="<?php write('#variable_warning')?>"
				newRow.insertCell(-1).innerHTML="<span class=estimated>&#9888;</span> <?php write('#variable_this_equation_contains_estimated_data')?> ";
			}

			if(typeof(currentStage[id])=='number' && Global.Configuration.DataQuality[id]=="Estimated")
			{
				newRow=t.insertRow(-1)
				newCell=newRow.insertCell(-1)
				newCell.className='th'
				newCell.innerHTML="<?php write('#variable_warning')?>"
				newRow.insertCell(-1).innerHTML="<span class=estimated>&#9888;</span> <?php write('#variable_this_input_is_considered_estimated')?> ";
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
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<script>
	if(!Info[id])
	{
		document.write("<div>ERROR. Variable not defined in dataModel/Info.js</div>")
		window.stop()
	}

	//Define some necessary global variables
	var localization = locateVariable(id);
	var level 		 = localization.level;
	var sublevel 	 = localization.sublevel;
	var currentStage = sublevel ? Global[level][sublevel] : Global[level];
	var currSubstage = sublevel ? Substages[level][sublevel] : Substages[level];

	//make the user see "Water Supply" instead of "Water"
	var levelAlias;
	switch(level)
	{
		case "Water":levelAlias="<?php write('#Water')?>";break;
		case "Waste":levelAlias="<?php write('#Waste')?>";break;
		default:levelAlias=level;break;
	}

	if(sublevel)
	{
		var sublevelAlias;
		switch(sublevel)
		{
			case "Abstraction":sublevelAlias="<?php write('#Abstraction')?>";break;
			case "Treatment":sublevelAlias="<?php write('#Treatment')?>";break;
			case "Distribution":sublevelAlias="<?php write('#Distribution')?>";break;
			case "Collection":sublevelAlias="<?php write('#Collection')?>";break;
			case "Discharge":sublevelAlias="<?php write('#Discharge')?>";break;
		}
	}
</script>

<!--TITLE--><h1>
	<span style=color:#999><?php write('#variable_detailed_info')?>: </span>
	<script>document.write(translate(id+'_descr')+" ("+id+")")</script>
</h1>

<div id=main>
	<!--VARIABLE INFO-->
	<table style="text-align:left;width:50%;margin-bottom:3em" id=info></table>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
