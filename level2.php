<!--fragment inside edit.php-->
<style>
	span[expanded]{transition:transform 0.15s;}
	span[expanded='0']{transform:rotate(-90deg);}
</style>
<script>
	//namespace to remember folding of questions (not saved to cookies)
	var Expanded={
		//"question":1,
	}
</script>
<script>
	var level2 = {};//namespace

	level2.toggleQuestionVisibility=function(btn,question)
	{
		var currentState=Expanded[question]||1;//expanded by default

		//toggle html attribute
		if(currentState) {btn.setAttribute('expanded','0')}
		else             {btn.setAttribute('expanded','1')}

		//modify "Expanded" object
		if(currentState) {Expanded[question]=0}
		else             {Expanded[question]=1}

		//hide or show fields
		var trs=document.querySelectorAll('tr[field][question='+question+']');
		var newDisplay = currentState ? 'none':'';
		for(var i=0;i<trs.length;i++)
		{
			trs[i].style.display=newDisplay;
		}
	}

	/** 
	 * Transform a <td> cell to a <input> to make modifications in the Global object
	 * @param {element} element - the <td> cell
	 */
	level2.transformField=function(element) {
		element.removeAttribute('onclick');
		element.innerHTML="";

		var field=element.parentNode.getAttribute('field');
		var input=document.createElement('input');
		element.appendChild(input);
		input.id=field;
		input.classList.add('input');
		input.autocomplete='off';
		//value converted
		var multiplier = Units.multiplier(field);
		var currentValue = CurrentLevel[field]/multiplier;
		input.value=currentValue;

		input.onblur=function(){level2.updateField(field,input.value)};
		input.onkeypress=function(event) { 
			if(event.which==13) input.onblur() //somehow creates an error but does not affect to anything
		}
		input.onkeydown=function(event) {
			function updateChart()
			{
				//problem: this only updates if we are plotting inputs. WHY?
				var newValue=parseFloat(input.value);
				if(isNaN(newValue))newValue=0;
				newValue*=Units.multiplier(field);
				//only update real inputs
				if(typeof(CurrentLevel[field])!="function")
				{
					CurrentLevel[field]=newValue;
					if(substages.length==1) substages[0][field]=newValue;
				}
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
				case  9: //TAB
					setTimeout(function()
					{
						var el=document.querySelector('#inputs tr[field='+field+']').nextSibling.childNodes[2];
						if(el && el.onclick){el.onclick();}
					},100);
					break;
			}
		}
		input.select();
	}

	//draw a dropdown menu in inputs table
	level2.createDropdown=function(field,table,question) {

		question=question||false; //question it belongs to

		var code=field;
		var t=table;

		//if is an option, continue (will show at the end of the table)
		/*new row*/
		var newRow=t.insertRow(-1);
		newRow.setAttribute('field',code);

		//question it belongs to
		if(question)
		{
			newRow.setAttribute('question',question)
			if(!Expanded[question])
			{
				newRow.style.display='none';
			}
		}

		/*1st cell: show code*/
		var newCell=document.createElement('th');
		newRow.append(newCell);
		newCell.classList.add('variableCode');
		newCell.innerHTML=(function()
		{
			return "<a style=font-size:10px href=variable.php?id="+code+">"+code+"</a>";
		})();

		/*2nd cell: variable name*/
		var newCell=newRow.insertCell(-1);
		newCell.style.textAlign="left";
		newCell.setAttribute('title', translate(code+'_expla'));
		newCell.innerHTML=(function()
		{
			var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ? 
				" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
			return translate(code+"_descr")+warning;
		})();

		//3rd cell: value
		var newCell=newRow.insertCell(-1);
		newCell.colSpan=2;
		(function() {
			var select=document.createElement('select');
			newCell.appendChild(select)
			select.setAttribute('onchange','level2.updateField("'+code+'",this.value)'); 
			for(var op in Tables[code]) {
				var option=document.createElement('option');
				var value=parseInt(Tables[code][op].value);
				select.appendChild(option);
				option.value=value;
				option.innerHTML="("+value+") "+op;
				if(CurrentLevel[code]==value) { option.selected=true; }
			}
		})();
	}

	//draw an input in inputs table
	level2.createInput=function(field,table,question) {
		
		question=question||false; //code of the question it belongs to

		//if dropdown, call create dropdown instead
		if(Info[field] && Info[field].magnitude=="Option") {
			level2.createDropdown(field,table,question);
			return;
		};

		//bool for if current field is a calculated variable (CV)
		var isCV = field.search(/^c_/)+1;

		/*if is a function and not a cv, exit*/
		if(typeof(CurrentLevel[field])!="number" && !isCV) return;

		/*new row*/
		var t=table;
		var newRow=t.insertRow(-1);

		//question it belongs
		if(question)
		{
			newRow.setAttribute('question',question)
			if(!Expanded[question])
			{
				newRow.style.display='none';
			}
		}

		/*class*/
		if(isCV) newRow.classList.add('isCV');

		/*hlInputs for formula and show formula, only if CV*/
		if(isCV) {
			var formula = CurrentLevel[field].toString();
			var prettyFormula = Formulas.prettify(formula);
			newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
			newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');
			newRow.setAttribute('title',prettyFormula);
		}
		else {
			newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'",CurrentLevel,1)');
			newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'",CurrentLevel,0)');
		}
		
		/*new attribute field=field>*/
		newRow.setAttribute('field',field);

		/*code*/ 
		var newCell=document.createElement('th');
		newRow.append(newCell);
		newCell.classList.add('variableCode');
		if(isCV)newCell.classList.add('isCV');
		newCell.innerHTML=(function() {
			//warning for variable not used
			var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
			return code;
		})();

		/*description*/ 
		var newCell=newRow.insertCell(-1);
		newCell.setAttribute('title', translate(field+"_expla"));
		newCell.innerHTML=(function(){
			var warning=(Formulas.outputsPerInput(field).length==0 && Utils.usedInBenchmarks(field).length==0) ? 
				" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
			return translate(field+"_descr")+warning;
		})();

		//editable cell if not CV
		var newCell=newRow.insertCell(-1);
		if(!isCV) {
			if(typeof(substages)=="object" && substages.length > 1 && !(Level2only.list.indexOf(field)+1))
			{
				//this means you are in level 2 and you should NOT be able to modify inputs here
				newCell.setAttribute('caption',"This value is the sum of all substages. Click here to scroll to substages");
				newCell.classList.add('non-editable');
				newCell.onclick=function()
				{
					//make sure that section is not folded
					document.querySelector('#substageInputs_container').classList.remove('folded');

					//navigate to substages to modify the input
					var f=this.parentNode.getAttribute('field');
					var sscon=document.querySelector('#substages').parentNode;
					sscon.scrollIntoView();
					setTimeout(function(){sscon.classList.remove('folded')},300);
					setTimeout(function(){
						document.querySelector('#substages tr[field='+f+'] td[substage]').onclick();
					},600);
				};
			}
			else //normal case: substages==1, user can modify level2
			{
				newCell.classList.add("input");
				newCell.setAttribute('caption',"<?php write('#edit_click_to_modify')?>");
				newCell.setAttribute('onclick','level2.transformField(this)');
			}
		}
		else {
			//field is calculated variable, so show formula
			newCell.title=Formulas.prettify(CurrentLevel[field].toString());
			newCell.style.textAlign="right";
		}

		/*value*/
		newCell.innerHTML=(function() {
			var value = isCV ? CurrentLevel[field]() : CurrentLevel[field];
			value/=Units.multiplier(field);
			value=format(value);
			return value
		})();

		//check if this cv has estimated data
		var ed=DQ.hasEstimatedData(field) ? 
			" <span title='<?php write('#variable_this_equation_contains_estimated_data')?>' class=estimated>&#9888;</span>" 
			: "";
		newCell.innerHTML+=ed;

		//unit
		newRow.insertCell(-1).innerHTML=(function() {
			if(!Info[field]) return "<span style=color:#ccc>no unit</span>";

			if(Info[field].magnitude=="Currency") { return Global.General.Currency; }

			if(isCV) {
				return Info[field].unit;
			}
			else {
				var str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
				if(Units[Info[field].magnitude]===undefined)
				{
					return Info[field].unit
				}
				var currentUnit = Global.Configuration.Units[field] || Info[field].unit
				for(var unit in Units[Info[field].magnitude])
				{
					if(unit==currentUnit)
						str+="<option selected>"+unit+"</option>";
					else
						str+="<option>"+unit+"</option>";
				}
				str+="</select>"
				return str
			}
		})();

		//data quality
		/*
		newRow.insertCell(-1).innerHTML=(function() {
			if(isCV) { return "Calculated" }
			else
			{
				var select=document.createElement('select');
				select.setAttribute('onchange','DQ.update("'+field+'",this.value)');
				['Actual','Estimated'].forEach(function(opt)
				{
					var option=document.createElement('option');
					select.appendChild(option);
					option.value=opt;
					option.innerHTML=translate(opt);
					if(Global.Configuration.DataQuality[field]==opt)
					{
						option.setAttribute('selected',true);
					}
				});
				return select.outerHTML;
			}
		})();
		*/
	}

	//create a question in inputs table
	level2.createQuestion=function(question,table) {
		if(Questions.isHiddenQuestion(question)) return;

		var t=table;
		var checked = Global.Configuration["Yes/No"][question];

		//new row
		var newRow=t.insertRow(-1);
		newRow.setAttribute('question',question);
		newRow.onmouseover=function(){hlQuestionFields(this.getAttribute('question'),1)}
		newRow.onmouseout=function(){hlQuestionFields(this.getAttribute('question'),0)}
		newRow.style.background = checked ? "lightgreen" : "#eee";

		//1st cell: show question
		var newCell=newRow.insertCell(-1);
		newCell.colSpan=2;
		newCell.style.paddingRight="1em";
		newCell.style.textAlign="right";
		newCell.innerHTML=(function()
		{
			var ret="";
			if(checked)
			{
				var expanded = Expanded[question] || 1;//expanded by default
				ret+="<span style=float:left;cursor:pointer onclick=level2.toggleQuestionVisibility(this,'"+question+"') expanded="+expanded+">&#9660;</span>"
			}
			ret+=translate(question)+"?";
			return ret;
		})()

		//2nd cell: show yes no
		var newCell=newRow.insertCell(-1);
		newCell.colSpan=2;
		newCell.innerHTML=(function() {
			var checked_n = checked ? "" : "checked";
			var checked_y = checked ? "checked" : "";
			var str = ""+
			"&emsp; "+
			"<label>No  <input type=radio name='"+question+"' onclick=setQuestion('"+question+"',0) "+checked_n+"></label>"+
			"&emsp; "+
			"<label>Yes <input type=radio name='"+question+"' onclick=setQuestion('"+question+"',1) "+checked_y+"></label>"+
			"";
			return str;
		})();

		//show variables
		if(checked) {
			Questions[question].variables.forEach(function(field) {
				/*check if level3 only*/
				if((Level3.list.indexOf(field)+1)==0)
				{
					level2.createInput(field,table,question);
				}
			});
		}
	}

	/** Redisplay table id=inputs */
	level2.updateInputs=function() {
		var t=document.getElementById('inputs');
		while(t.rows.length>2){t.deleteRow(-1)}

		//variables without questions associated 
		for(var field in CurrentLevel) {
			/*check if current question answers make it inactive*/
			if(Questions.isInside(field)) continue;

			/*first check if function*/
			if(typeof(CurrentLevel[field])!="number") {
				/*then, check if is calculated variable "c_xxxxxx" */
				if(field.search(/^c_/)==-1) continue;
			}

			/*check if level3 only*/
			if(Level3.list.indexOf(field)+1) continue;

			//create input
			level2.createInput(field,t);
		}

		//go over questions of this level, advanced=0
		Questions.getQuestions(CurrentLevel).forEach(function(question) {
			if(!Questions[question].advanced) {
				level2.createQuestion(question,t);
			}
		});

		//here check if table is empty (==t.rows.length is 2)
		if(t.rows.length<3) {
			var newCell=t.insertRow(-1).insertCell(-1);
			newCell.colSpan=4;
			newCell.innerHTML="<span style=color:#999>~All inputs inactive</span>";
		}

		//bottom line decoration with the color of W/WW
		var newRow=t.insertRow(-1);
		var newTh=document.createElement('th');
		newTh.setAttribute('colspan',4);
		newTh.style.borderBottom='none';
		newRow.appendChild(newTh);
	}

	/**
	 * Update a field from the Global object
	 * @param {string} field - The field of the CurrentLevel object
	 * @param {number} newValue - new numeric value of the field
	 */
	level2.updateField=function(field,newValue) {
		newValue=parseFloat(newValue);
		if(isNaN(newValue))newValue=0;
		CurrentLevel[field]=newValue*Units.multiplier(field);
		//if field is not level 2 only
		if(!(Level2only.list.indexOf(field)+1))
		{
			//also update stage if substages==1
			if(substages.length==1) 
				substages[0][field]=newValue*Units.multiplier(field);
		}
		init();
	}
</script>

<table id=inputs style="width:99%">
	<tr><th colspan=5 class=tableHeader> INPUTS &mdash; 
	Enter values for 
	<?php if($sublevel){echo $sublevel;}else{echo $level;} ?>
	stages
	<tr>
		<th>Code
		<th style="width:100% !important">Description
		<th>Current value
		<th><?php write('#edit_unit')?>
	<tr><td colspan=4 style=color:#ccc><i>Loading...</i>
</table>

<style>
	table#inputs .non-editable {
		text-align:center;
		cursor:pointer;
		transition:background 1s;
	}
	#inputs .non-editable:hover {
		background:#eaeeea;
	}
	#inputs .non-editable:before {
		content:' ∑';
		float:left;
		color:#999;
	}
	#inputs .non-editable:hover:before {
		color:black;
		content:' ∑';
	}
	#inputs th.tableHeader {
		background:white;
		color:#666;
		font-size:15px;
		padding:0.7em 0 0.2em 0;
		font-weight:normal;
		border:none;
		text-align:left;
	}
</style>
