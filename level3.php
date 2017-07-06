<script>
	/* SUBSTAGES */
	//namespace for level3.php structure
	var level3={};
	/** INPUTS redisplay */
	level3.updateSubstagesTable=function()
	{
		/*table element*/
		var t=document.getElementById('substages');
		while(t.rows[0].cells.length>1)t.rows[0].deleteCell(-1);

		/*table headers */
			//go over substages: create a column for each
			for(var s in substages)
			{
				var newTH = document.createElement('th');
				newTH.style.cursor="pointer";
				newTH.style.width="90px";
				newTH.innerHTML=""+
					"Substage "+(parseInt(s)+1)+" "+
					"<div style=font-weight:bold>"+substages[s].name+"</div>";
				newTH.setAttribute('onclick','level3.showSubstageMenu('+s+',event)');
				newTH.setAttribute('caption',"<?php write('#level3_click_to_modify_the_name')?>");
				t.rows[0].appendChild(newTH);
			}
			//TOTAL header only if substages.length==1
			if(substages.length>1)
			{
				var newTH = document.createElement('th');
				t.rows[0].appendChild(newTH);
				newTH.innerHTML="&sum; Sum";
				newTH.rowSpan=2;
			}

			//UNIT header
			var newTH = document.createElement('th');
			t.rows[0].appendChild(newTH);
			newTH.innerHTML="<?php write('#level3_unit')?>";
			newTH.rowSpan=2;
		/*end headers*/

		/*update table body*/
			while(t.rows.length>1)t.deleteRow(-1)

			//each row corresponds to a variable of the current stage
			var inputs=level3.getInputs();

			//find calculated variables
			var cvs=[];
			(function()
			{
				for(var f in CurrentLevel)
				{
					if(f.search(/^c_/)!=-1) {cvs.push(f);}
				}
				inputs=inputs.concat(cvs);
			})();

			//first row: delete substage button
			var newRow=t.insertRow(-1);
			var newCell=newRow.insertCell(-1);
			newCell.style.border="none";
			newCell.colSpan=2;
			newCell.innerHTML="<span style=font-size:10px>Inputs</span>";
			for(var s in substages)
			{
				newCell=newRow.insertCell(-1);
				newCell.classList.add('outputValue');
				newCell.style.textAlign='center';
				var str=""+
					"<a href='substage.php?level=<?php echo $level?>&sublevel=<?php echo $sublevel?>&index="+s+"'>Details</a>"+
					" | "+
					"<a href=# onclick=\"level3.deleteSubstage("+s+");return false\" caption='<?php write('#level3_delete_substage')?>'>Delete</a>"+
					"";
				newCell.innerHTML=str
			}

			//go over normal inputs and then dropdown menus
			//1. go over inputs array we've just created
			for(var input in inputs)
			{
				/*variable code*/
				var code=inputs[input];
				
				/*Skip if is level2 only*/
				if(Level2only.list.indexOf(code)+1) continue;

				//skip if filtered
				if(Questions.isHidden(code)) continue;

				//is a calculated variable?
				var isCV=typeof(CurrentLevel[code])=="function" ? true : false;

				//copy the function inside substages
				if(isCV) 
				{
					for(var s in substages) 
						substages[s][code]=CurrentLevel[code]; 
				}

				//if is an option, continue (will show at the end of the table)
				if(Info[code]&&Info[code].magnitude=="Option") continue;

				/*new row*/
				var newRow=t.insertRow(-1);
				newRow.setAttribute('field',code);

				//mouse over listener for highlighting
				if(isCV)
				{
					var formula=CurrentLevel[code].toString();
					var prettyFormula=Formulas.prettify(formula);
					newRow.setAttribute('onmouseover','Formulas.hlInputs("'+code+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+code+'",CurrentLevel,0)');
				}
				else
				{
					newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+code+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+code+'",CurrentLevel,0)');
				}

				/*1st cell: show code*/
				var newCell=newRow.insertCell(-1);
				newCell.classList.add('variableCode');
				if(isCV) newCell.classList.add('isCV');
				newCell.innerHTML=(function()
				{
					return "<a href=variable.php?id="+code+">"+code+"</a>";
				})();
				//show question it belongs
				(function(){
					var question=Questions.isInside(code);
					if(question)
					{
						newCell.innerHTML+=" <span class='advanced'>"+question.substring(4)+"</span>";
					}
				})()

				/*2nd cell: variable name*/
				var newCell=newRow.insertCell(-1);
				newCell.style.textAlign="left";
				newCell.setAttribute('title', translate(code+'_expla'));
				newCell.innerHTML=(function(){
					var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ? 
						" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
					return translate(code+'_descr')+warning;
				})();

				//3rd cell and so on: go over substages
				var multiplier=Units.multiplier(code);
				for(var s in substages)
				{
					var newCell=newRow.insertCell(-1);
					newCell.setAttribute('substage',s);
					newCell.classList.add("input");

					if(isCV)
					{
						newCell.innerHTML=format(substages[s][code]()/multiplier);
						newCell.setAttribute('title',prettyFormula);
						newCell.classList.add("CV");
					}
					else
					{
						newCell.setAttribute('onclick','level3.transformField(this)');
						newCell.innerHTML=format(substages[s][code]/multiplier);
					}
				}

				//sum all inputs of this kind
				var sum=level3.sumAll(code);
				//some variables are averaged instead of summed up
				if(Averaged.isAveraged(code)) sum/=substages.length;

				//LEVEL 2 current value
				if(substages.length>1)
				{
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign="center";newCell.style.fontWeight="bold";
					newCell.innerHTML=(function()
					{
						if(isCV) 
						{
							return format(CurrentLevel[code]()/multiplier);
						}
						else
						{
							var isAvg = Averaged.isAveraged(code) ? " (average)": "";
							return format(sum/multiplier)+isAvg;
						}
					})();
					//UPDATE -> SUM OF SUBSTAGES to LEVEL 2
					//only update real inputs
					if(!isCV) CurrentLevel[code]=sum;
				}

				//Unit for current input
				newRow.insertCell(-1).innerHTML=(function()
				{
					//check if unit is entered in "Info"
					if(!Info[code]) return "undefined";
					//check if unit is currency
					if(Info[code].magnitude=="Currency") { return Global.General.Currency; }
					//if no magnitude, return unit string
					if(Units[Info[code].magnitude]===undefined) { return Info[code].unit }

					//look for current unit
					var currentUnit = Global.Configuration.Units[code] || Info[code].unit

					//create a <select> for unit changing
					var str="<select onchange=Units.selectUnit('"+code+"',this.value)>";
					for(unit in Units[Info[code].magnitude])
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
			//2. go over inputs "magnitude==option"
			for(var input in inputs)
			{
				/*variable code*/
				var code=inputs[input];
				
				//if not option, continue
				if(Info[code] && Info[code].magnitude!="Option") continue;

				/*Skip if is level2 only*/
				if(Level2only.list.indexOf(code)+1) continue;

				/*new row*/
				var newRow=t.insertRow(-1);
				newRow.setAttribute('field',code);

				if(Questions.isHidden(code)){newRow.style.display='none'}

				/*1st cell: show code*/
				var newCell=newRow.insertCell(-1);
				newCell.classList.add('variableCode');
				newCell.innerHTML=(function()
				{
					return "<a href=variable.php?id="+code+">"+code+"</a>";
				})();
				//show question it belongs
				(function(){
					var question=Questions.isInside(code);
					if(question)
					{
						newCell.innerHTML+=" <span class='advanced'>"+question.substring(4)+"</span>";
					}
				})()

				/*2nd cell: variable name*/
				var newCell=newRow.insertCell(-1);
				newCell.style.textAlign="left";
				newCell.setAttribute('title', translate(code+'_expla'));
				newCell.innerHTML=(function(){
					var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ? 
						" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
					return translate(code+'_descr')+warning;
				})();

				//3rd cell and so on: go over substages
				for(var s in substages)
				{
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign='left';
					newCell.classList.add("input");
					newCell.setAttribute('substage',s);
					(function()
					{
						var select=document.createElement('select');
						newCell.appendChild(select)
						if(substages.length==1)
							select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);CurrentLevel["'+code+'"]=parseInt(this.value);init()')
						else
							select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);init()')
						for(var op in Tables[code])
						{
							var option = document.createElement('option');
							var value = parseInt(Tables[code][op].value);
							select.appendChild(option);
							option.value=value;
							option.innerHTML="("+value+") "+op;
							if(substages[s][code]==value) 
							{
								option.selected=true;
							}
						}
					})();
				}
			}
		/*end update body*/

		/*update substage counter*/ 
		document.getElementById('counter').innerHTML=substages.length
	}
	level3.getInputs=function()
	{
		var inputs=[];
		for(var field in CurrentLevel)
		{
			if(typeof(CurrentLevel[field])!="number" ){continue;}
			inputs.push(field);
		}
		return inputs;
	}
	level3.sumAll=function(code)
	{
		var sum=0;
		for(var s in substages){sum+=parseFloat(substages[s][code])}
		return sum;
	}
	/** new Substage class for storing all variables that correspond to current stage */
	level3.Substage=function()
	{
		/*get a list of variables for this level*/ var inputs=level3.getInputs();
		/*substage default name*/ this.name="<?php write("#$sublevel")?> "+(parseInt(substages.length)+1);
		//init with zero values, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
		for(var i in inputs){this[inputs[i]]=0;}
	}
	/** New substage button pushed */
	level3.newSubstage=function()
	{
		event.stopPropagation(); //this is to see the memory progress
		//check memory usage
		if(document.cookie.length>=8100)
		{
			alert("<?php write('#level3_error_memory_full')?> ("+document.cookie.length+" bytes used)");
			return
		}
		substages.push(new level3.Substage());
		init();

		//visual efect (color blink new stage)
		(function(){
			var els=document.querySelectorAll('td[substage="'+parseInt(substages.length-1)+'"]');
			for(var i=0;i<els.length;i++)
			{
				els[i].style.background='lightgreen';
				els[i].style.transition='background 1s';
			}
			setTimeout(function(){
				for(var i=0;i<els.length;i++)
				{
					els[i].style.background='';
				}
			},500);
		})();
	}
	/** button delete substage pushed */
	level3.deleteSubstage=function(index)
	{
		if(substages.length==1)
		{
			alert("<?php write('#level3_error_cannot_delete_last_substage')?>");
			return;
		}
		substages.splice(index,1);

		//bug fix: caption onmouseout does not trigger, do it manually
		document.querySelector("#caption").style.display='none';

		init();
	}
	/** update substage name */
	level3.changeName=function(index,newValue)
	{
		substages[index].name=newValue;
		init();
	}
	/** make appear a menu for changing substage[index] name */
	level3.showSubstageMenu=function(index,ev)
	{
		//new div element
		var div = document.createElement('div')
		document.body.appendChild(div)
		div.className="substageMenu"
		//get mouse coordinates
		div.style.top=ev.pageY+"px"
		div.style.left=ev.pageX+"px"
		//add to screen
		div.innerHTML="<div style=color:white><?php write('#level3_new_name')?> "+(index+1)+":</div>"
		//new input element
		var input = document.createElement('input')
		div.appendChild(input)
		input.className="substageMenu"
		input.placeholder='New name'
		input.value=substages[index].name
		//onblur: remove it
		input.onblur=function(){document.body.removeChild(div)}
		//on enter pressed (13) hide it
		input.onkeypress=function(ev){if(ev.which==13)div.style.display='none'}
		//onchange: update name
		input.onchange=function(){level3.changeName(index,input.value)}
		input.select()
	}
	//transform a cell to make it editable
	level3.transformField=function(element)
	{
		element.removeAttribute('onclick')
		var field=element.parentNode.getAttribute('field')
		var substage=element.getAttribute('substage')
		element.innerHTML=""
		var input=document.createElement('input')
		element.appendChild(input);
		input.autocomplete='off'
		input.setAttribute('onkeypress',"if(event.which==13){this.onblur()}")
		input.setAttribute('onblur',"level3.updateSubstage("+substage+",'"+field+"',this.value)") //now works
		input.onkeydown=function(event)
		{
			function updateChart()
			{
				//problem: this only updates if we are plotting inputs. WHY?
				var newValue=parseFloat(input.value);
				if(isNaN(newValue))newValue=0;
				var multiplier=Units.multiplier(field);
				substages[substage][field]=multiplier*newValue;

				//SUM OF SUBSTAGES = LEVEL 2
				var sum=level3.sumAll(field);

				//some variables are averaged instead of summed up
				if(Averaged.isAveraged(field)) sum/=substages.length;

				//only update real inputs
				if(typeof(CurrentLevel[field])!="function") CurrentLevel[field]=sum;

				//try to draw charts
				drawCharts();
			}
			switch(event.which)
			{
				case 38: //up key
					if(!event.shiftKey){input.value++;updateChart();} 
					break;
				case 40: //down key
					if(!event.shiftKey){input.value--;updateChart();} 
					break;
				case  9: //TAB key
					setTimeout(function()
					{
						var el;//element to be clicked
						if(event.shiftKey) //shift+tab navigates back 
							el=document.querySelector('#substages tr[field='+field+'] td[substage="'+(parseInt(substage)-1)+'"]')
						else
							el=document.querySelector('#substages tr[field='+field+'] td[substage="'+(parseInt(substage)+1)+'"]')
						if(el){el.onclick();}
					},100);
					break;
			}
		}
		//value converted
		var multiplier = Units.multiplier(field);
		input.value=substages[substage][field]/multiplier;
		input.select();
	}
	//update a field of the substage[index]
	level3.updateSubstage=function(index,field,newValue)
	{
		newValue=parseFloat(newValue);
		if(isNaN(newValue))newValue=0;
		var multiplier=Units.multiplier(field);
		substages[index][field]=multiplier*newValue;

		//update level2 also
		var sum=level3.sumAll(field);
		//some variables are averaged instead of summed up
		if(Averaged.isAveraged(field)) sum/=substages.length;
		CurrentLevel[field]=sum;

		init();
	}
	/** Redisplay outputs */
	level3.updateOutputs=function()
	{
		var t=document.getElementById('substages');

		//copy all functions to each substage
		for(var field in CurrentLevel)
		{
			//only functions
			if(typeof(CurrentLevel[field])!="function") continue;
			//IMPORTANT: for this to work all formulas that refer to internal variables should refer to them with "this" keyword
			for(var s in substages)
				substages[s][field]=CurrentLevel[field];
		}

		//add a row for separation
		var newRow=t.insertRow(-1);
		var newCell=newRow.insertCell(-1)
		newCell.colSpan=4+substages.length;
		newCell.innerHTML="<span style=font-size:10px>Outputs</span>";

		//go over CurrentLevel
		for(var field in CurrentLevel)
		{
			//only functions
			if(typeof(CurrentLevel[field])!="function") continue;

			//exclude service level indicators
			if(field.search('_SL_')>-1) continue;

			//exclude _KPI_GHG if checkbox is enabled
			var isGHG=(field.search('_KPI_GHG')+1) ? true : false;
			if(isGHG) 
				if(!document.querySelector('#showGHGss').checked)
					continue;

			//exclude the "level2only" variables
			if(Level2only.hasOwnProperty(field)) continue;

			/*check if should be hidden according to questions*/
			if(Questions.isHidden(field)) continue;

			//if is calculated variable, not show it
			if(field.search(/^c_/)>=0) continue;

			//new row
			var newRow=t.insertRow(-1);
			newRow.setAttribute('field',field);

			//set highlighting 
			newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
			newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

			//1st cell: show code identifier
			var newCell=newRow.insertCell(-1);
			newCell.classList.add('variableCode'); 
			newCell.classList.add('output');
			newCell.innerHTML=(function()
			{
				var ghg=isGHG                        ? "<span class='advanced ghg' caption='GHG'>GHG</span>":"";
				var nrg=field.search('_nrg_')+1      ? "<span class='advanced nrg' caption='Energy performance'>NRG</span>":""; 
				return "<a caption='"+translate(field+'_expla')+"' href=variable.php?id="+field+">"+field+"</a>"+ghg+nrg;
			})();
			//show question it belongs
			(function(){
				var question=Questions.isInside(field);
				if(question)
				{
					newCell.innerHTML+=" <span class='advanced'>"+question.substring(4)+"</span>";
				}
			})()

			//2nd cell: description
			newRow.insertCell(-1).innerHTML=translate(field+'_descr');

			//get equation formula
			var formula=CurrentLevel[field].toString();
			var prettyFormula=Formulas.prettify(formula);

			//3rd cell and so on: values.
			for(var s in substages)
			{
				//new cell
				var newCell=newRow.insertCell(-1);
				//title for mouseover show formula
				//newCell.setAttribute('title',prettyFormula);
				//value
				newCell.classList.add('outputValue');
				newCell.innerHTML=(function()
				{
					//compute value and bechmark it
					var value=substages[s][field]()/Units.multiplier(field);

					//color circle benchmarking (TO DO: extract function from here)
					var indicator=(function()
					{
						if(!RefValues.hasOwnProperty(field)) return "";
						var text=RefValues[field](substages[s]);
						var color;
						switch(text)
						{
							case "Good":           color="#af0";break;
							case "Acceptable":     color="orange";break;
							case "Unsatisfactory": color="red";break;
							case "Out of range":   color="brown";break;
							default:               color="#ccc";break;
						}
						return "<span caption='Benchmarking: "+text+"' class=circle style='background:"+color+"'></span>";
					})();
					return "<span style='display:inline-block;width:75%'>"+format(value)+"</span> "+indicator;
				})();
			}

			//level 2 value
			if(substages.length>1)
			{
				var newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',prettyFormula);
				newCell.style.fontWeight="bold";
				newCell.style.background="white";
				newCell.innerHTML=format(CurrentLevel[field]()/Units.multiplier(field));
			}

			//unit
			newRow.insertCell(-1).innerHTML=(function()
			{
				return Info[field] ? Info[field].unit : "<span style=color:#ccc>no unit</span>";
			})();

		}

		//if no active equations show warning
		if(t.rows.length<2)
		{
			var newCell=t.insertRow(-1).insertCell(-1)
			newCell.colSpan=4+substages.length;
			newCell.innerHTML="<i style=color:#999>~No active outputs</i>";
		}

		//final row empty ()
		t.insertRow(-1).insertCell(-1).colSpan=4+substages.length;
	}
</script>

<!--advanced questions-->
<?php 
	$folded=isset($_COOKIE['Folded_adv_questions_container'])?"folded":"";?>
<div id=adv_questions_container class="card <?php echo $folded?>">
	<div class=menu onclick=fold(this.parentNode)>
		<button></button>
		<b>Advanced Assessment: Questions (<a href=questions.php>info</a>)</b> 
	</div>
	<div style=padding:0.5em;>
		<table id=adv_questions></table>
		<style> 
			#adv_questions td {padding:0.3em 0.618em;text-align:left}
		</style>
	</div>
</div>

<!--substages container-->
<?php 
	if(isset($_COOKIE['Folded_substageInputs_container']))
	{
		$folded="folded";
	}
	else
	{
		$folded="";
	}
?>
<div id=substageInputs_container class="card <?php echo $folded?>" style="text-align:left">
	<!--menu-->
	<div class=menu onclick=fold(this.parentNode)>
		<button></button>
		<b>Advanced Assessment: Substages</b>
		Substages <b><span id=counter class=number>0</span></b>
		&mdash; 
		<a href=substages.php>Overview</a>

		<!--button toggle outputs/graph display-->
		<button 
			class=btn_toggle 
			onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#substages','#substageGraphs')"
		>VIEW GRAPH</button>
	</div>

	<!--substages table-->
	<div style=padding:0.5em>
		<table id=substages> 
			<tr><td colspan=2 style="min-width:260px;text-align:right;border:none">
				<!--view all-->
				<label style=float:left>
					<input id=viewAll type=checkbox onclick=level3.toggleViewSum() checked> 
					View all stages &emsp;
					<script>
						level3.toggleViewSum=function()
						{
							var newDisplay=document.querySelector('#substages td.input').style.display=='none' ? '':'none';
							var n=substages.length;

							var tr=document.querySelector('#substages tr');//first tr
							for(var i=0;i<n;i++) tr.cells[i+1].style.display=newDisplay;

							var collection=document.querySelectorAll('#substages td.input');
							for(var i=0;i<collection.length;i++) collection[i].style.display=newDisplay;
							var collection=document.querySelectorAll('#substages td.outputValue');
							for(var i=0;i<collection.length;i++) collection[i].style.display=newDisplay;
						}
					</script>
				</label>

				<!--show ghgs checkbox-->
				<div style=float:left;margin-bottom:0.5em>
					<label onclick="event.stopPropagation();init()"><input type=checkbox id=showGHGss checked> Show GHG</label>
				</div>

				<!--new substage button-->
				<button onclick=level3.newSubstage() class="button add" style="padding:auto;background:lightgreen;box-shadow: 0 1px 2px rgba(0,0,0,.1);">
					Add substage
				</button>
		</table>
	</div>

	<!--Substage graphs-->
	<div id=substageGraphs style=padding:1em;display:none>
		<div class=buttonsGraph><!--
			--><button class="left"    onclick="buttonsGraph(this);Graphs.wsa_KPI_std_nrg_cons(false,'substageGraph')">Standardized energy consumption</button><!--
			--><button class="middle"  onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
			--><button class="right"   onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
			-->
		</div>
		<div id=substageGraph style=text-align:center>Click a graph to display</div>
	</div>
</div>
