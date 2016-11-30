<?php
	if(!isset($_GET['level'])){die("ERROR: stage not specified");}
	/**
	  * Inputs:
	  *  - $level: 	   mandatory {"Water","Waste"}
	  *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	  */
	$level=$_GET['level'];
	$sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;

	//if user tries to go "General" (i.e. from variable.php?id=Days)
	if($level=="General") { header("Location: getStarted.php"); }
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body{background:#F5ECCE}
		td.input input {text-align:right;margin:0;padding:0;width:95%;height:100%}
		td.input {width:80px;text-align:right;color:#666;cursor:cell;line-height:1em}
		tr:not([hl=yes]) td.input {background-color:#eee;}

		table#substages tr[field]:hover  {background:#ccc;}

		/*temporal: hide data quality column
		table#inputs tr td:nth-child(n+4) {background:red;display:none}
        table#inputs tr th:nth-child(n+4) {background:red;display:none}
        */

		table#outputs tr:hover {background:#ccc;}
		table#outputs th:not(.tableHeader) {background:#c9ab98}
		table#outputs th:nth-child(n+2) {text-align:right}
		table#outputs td:nth-child(n+2) {text-align:right}

		table#nrgOutputs th:not(.tableHeader) {background:#c9ab98}
		table#nrgOutputs th:nth-child(2) {text-align:right}
		table#nrgOutputs td:nth-child(2) {text-align:right}

		table#otherOutputs th:not(.tableHeader) {background:#c9ab98}
		table#otherOutputs th:nth-child(2) {text-align:right}
		table#otherOutputs td:nth-child(2) {text-align:right}
		<?php
			if($level=="Waste")
			{?>
				table#inputs th:not(.tableHeader) {background:#d71d24}
				#inputs a,#inputs a:visited{color:#d71d24}
				#outputs a,#outputs a:visited{color:#d71d24}
				#otherOutputs a,#otherOutputs a:visited{color:#d71d24}
				#nrgOutputs a,#nrgOutputs a:visited{color:#d71d24}
			<?php }
		?>
		th.tableHeader
		{
			background:white;
			color:#666;
			font-size:15px;
			padding:0.7em 0 0.2em 0;
			font-weight:normal;
			border:none;
			text-align:left;
		}
		div.substageMenu{
			padding:0.1em;
			border:2px solid #ccc;
			background:#00aff1;
			position:absolute;
			box-shadow: 5px 5px 5px #888;
		}
		input.substageMenu{
			padding:0.5em;
			outline:none;
			font-size:20px;
		}
	</style>

	<script>
		<?php
			//establish the stage we are going to be focused
			if($sublevel)
			{
				echo "
					var CurrentLevel = Global['$level']['$sublevel'];
					var substages = Substages['$level']['$sublevel'];
				";
			}
			else
			{
				echo "var CurrentLevel = Global['$level'];";
				echo "var substages = false;";
			}
		?>

		//namespace for old level3.php structure
		var level3={};

		//remove a variable from the data structure which is no longer inside
		function removeGhost(field)
		{
			CurrentLevel[field]=undefined;
			init();
		}

		/** 
		 * Transform a <td> cell to a <input> to make modifications in the Global object
		 * @param {element} element - the <td> cell
		 */
		function transformField(element)
		{
			element.style.padding=0
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.classList.add('input')
			input.autocomplete='off'
			input.onblur=function(){updateField(field,input.value)}
			input.onkeypress=function(event)
			{ 
				if(event.which==13)input.onblur() //somehow creates an error but does not affect to anything
			}
			//value converted
			var multiplier = Units.multiplier(field);
			var currentValue = CurrentLevel[field]/multiplier;
			input.value=currentValue
			input.onkeydown=function(event)
			{
				switch(event.which)
				{
					case 38: input.value++;break;
					case 40: input.value--;break;
					case 9: //TAB
						setTimeout(function()
						{
							var el=document.querySelector('#inputs tr[field='+field+']').nextSibling.childNodes[1];
							if(el)
								el.onclick();
						},100);
						break;
				}
			}
			element.appendChild(input)
			input.select()
		}

		/** Redisplay table id=inputs */
		function updateInputs()
		{
			for(var field in CurrentLevel)
			{
				//check if this cv has estimated data
				var ed=DQ.hasEstimatedData(field) ? " <span title='<?php write('#variable_this_equation_contains_estimated_data')?>' class=estimated>&#9888;</span>" : "";
				newCell.innerHTML+=ed;

				//data quality
				/*
				newRow.insertCell(-1).innerHTML=(function()
				{
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
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue;
				if(field.search(/^c_/)>=0)continue;
				if(field.search("_KPI_GHG")==-1)continue;

				//hidden ones
				if(field=="ww_KPI_GHG_ne")    continue;
				if(field=="ww_KPI_GHG_ne_unt")continue;
				if(field=="ww_KPI_GHG_ne_tre")continue;

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)>-1){continue;}

				//disable row if specified by questions
				if(Questions.isHidden(field))
				{
					continue
					//disableRow(newRow);
				}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the ABSOLUTE value, not normalized
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description and code*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*value per things*/
				newCell=newRow.insertCell(-1)
					//the first cell will be the value divided by Years
				newCell.setAttribute('title',"("+prettyFormula+")/Years");
				newCell.innerHTML=(function()
				{
					return format(value/Global.General.Years());
				})();

				/*Normalization*/
				(function()
				{
					var level    = '<?php echo $level?>';
					var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';
					if(level=="Energy"){return "NA"}
					//value per resident population
					//value per serviced population
					//value per water volume
					['reside','servic','volume'].forEach(function(category)
					{
						var newCell=newRow.insertCell(-1);

						//determine the field to be highlighted
						var hlfield = (sublevel=='false' || category=='reside' || category=='servic') ? Normalization[level][category] : Normalization[level][sublevel][category];
						newCell.setAttribute('onmouseover',"Formulas.hlField('"+hlfield+"',1)")
						newCell.setAttribute('onmouseout',"Formulas.hlField('"+hlfield+"',0)")

						//the formula shoud change adding "/hlfield"
						newCell.title="("+newCell.parentNode.title+")/"+hlfield;

						newCell.innerHTML=(function()
						{
							//special cases: corinne request
							if(category!='reside' && field.search('_unt')>=0) 
							{
								newCell.title="NA";
								return "<span style=color:#ccc>NA</span>";
							}
							if(field=="ww_KPI_GHG")
							{
								//we have to subtract the untreated from the total
								var minus_untreated = Global.Waste.ww_KPI_GHG() - Global.Waste.ww_KPI_GHG_ne_ch4_unt() - Global.Waste. ww_KPI_GHG_ne_n2o_unt();
								newCell.title="custom formula";

								if(category=='servic')
								{
									return format(minus_untreated/Global.General.Years()/Global.Waste.ww_serv_pop);
								}
								if(category=="volume")
								{
									return format(minus_untreated/Global.Waste.ww_vol_wwtr);
								}
							}

							var norm=Normalization.normalize(category,field,level,sublevel);

							//the fields per inhab and per serv.pop are also per year
							if(category=="reside" || category=="servic")
							{
								norm/=Global.General.Years();
								newCell.title+="/Years"
							}
							return format(norm);
						})();
					});
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
			{
				var newCell=t.insertRow(-1).insertCell(-1)
				newCell.colSpan=6 //7 si ww TODO
				newCell.innerHTML="<span style=color:#999>~All GHG outputs inactive</span>";
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',7)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		function updateNrgOutputs()
		{
			var t=document.getElementById('nrgOutputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue;
				if(field.search(/^c_/)!=-1)continue;
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')<0)continue;

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)>-1){continue;}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field))
				{
					continue
					//disableRow(newRow);
				}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the value
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*circle indicator 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.innerHTML=(function()
				{
					var hasIndicator=RefValues.hasOwnProperty(field);
					if(hasIndicator)
					{
						var indicator=RefValues[field](value);
						newCell.title=indicator;
						var color;
						switch(indicator)
						{
							case "Good":           color="#af0";break;
							case "Acceptable":     color="orange";break;
							case "Unsatisfactory": color="red";break;
							case "Out of range":   color="brown";break;
							default:               color="#ccc";break;
						}
						return "<span style='font-size:20px;color:"+color+"'>&#128308;</span>";
					}
					else{
						newCell.title='<?php write('#edit_no_indicator_associated')?>';
						return "<span style=color:#ccc>NA</span>";
					}
				})();
				*/

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
			{
				var newCell=t.insertRow(-1).insertCell(-1)
				newCell.colSpan=3
				newCell.innerHTML="<span style=color:#999>~All Energy outputs inactive</span>";
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		function updateOtherOutputs()
		{
			var t=document.getElementById('otherOutputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function"){continue;}
				if(field.search(/^c_/)!=-1){continue;}
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')>-1)continue;

				/*these equations are still not clear (tbd in v2)*/
				if(field=="ww_SL_dilution")continue; 
				if(field=="ww_SL_dil_emis")continue; 
				/**/

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)>-1){continue;}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field))
				{
					continue
					//disableRow(newRow);
				}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute now the value for creating the indicator
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
			{
				var newCell=t.insertRow(-1).insertCell(-1)
				newCell.colSpan=3
				newCell.innerHTML="<span style=color:#999>~All Service Level outputs inactive</span>";
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 */
		function updateField(field,newValue)
		{
			newValue=parseFloat(newValue)
			if(isNaN(newValue))newValue=0
			CurrentLevel[field]=newValue*Units.multiplier(field)
			init()
		}

		//depending on stage, draw different charts
		function drawCharts()
		{
			//draw the chart that is selected!!!
			//Graphs.graph4(false,'graph'); //GHG
			//Graphs.graph5(false,'graph'); //Energy
			var button
			button=document.querySelector("div.buttonsGraph button.active")
			if(!button){
				button=document.querySelector("div.buttonsGraph button")
			}
			button.classList.remove('active');
			button.onclick()
		}

		function updateFuelSelection()
		{
			var rows = document.querySelectorAll('#fuelSelection tr[question]')
			for(var i=0;i<rows.length;i++)
			{
				var row = rows[i];
				if(row==null)continue;
				var question = row.getAttribute('question');

				//empty the row
				while(row.cells.length>1){row.deleteCell(-1);}

				//create new select menu
				var select = document.createElement('select');
				row.insertCell(-1).appendChild(select);
				select.setAttribute('onchange',"Global.Configuration.Selected.FuelType['"+question+"']=this.value;init()");

				//disable the row if question is NO
				if(!Global.Configuration["Yes/No"][question])
				{
					select.disabled=true;
					select.parentNode.parentNode.title="<?php write('#inactive')?>";
					select.parentNode.parentNode.classList.add("inactive")
				}
				else
				{
					select.parentNode.parentNode.title=''
					select.parentNode.parentNode.classList.remove('inactive')
				}

				//go over fuel types
				for(var fuel in Tables['Fuel types'])
				{
					var option = document.createElement('option');
					option.innerHTML=fuel;
					if(fuel==Global.Configuration.Selected.FuelType[question])
					{
						option.setAttribute('selected','true')
					}
					select.appendChild(option)
				}
			}
		}

		/** Update all */
		function init()
		{
			level3.updateSubstagesTable()
			updateQuestionsTable()
			updateOutputs()
			updateNrgOutputs()
			updateOtherOutputs()
			Exceptions.apply()
			updateFuelSelection()
			try{drawCharts()}
			catch(e){/*console.log(e)*/}
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Water":case "Waste":  
			$titleLevel=$lang_json["#$level"];break;
		case "Energy": $titleLevel="Energy summary";break;
		default:	   $titleLevel=$level;break;
	}
	if($sublevel)
	{
		switch($sublevel)
		{
			default: $titleSublevel="<span style='font-size:26px'>".$lang_json["#$sublevel"]."</span>";break;
		}
	}
	/*separator*/ $sep="<span style=color:black>&rsaquo;</span>";
	$title = $sublevel 
		? 
		"<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$titleSublevel</span>" 
		: 
		"<span style=color:black>$titleLevel</span>";
?>
<style> h1 {text-align:left;padding-left:17em;line-height:2.1em;border-bottom:1px solid #ccc;background:white} </style>
<h1><a href=stages.php><script>document.write(Global.General.Name)</script></a> <?php echo "$sep $title"?></h1></center>

<!--main container-->
<div>
	<!--container for questions and assessment info-->
	<div>
		<!--questions-->
		<div class="card inline">
			<?php cardMenu($lang_json['#questions']." (<a href=questions.php>info</a>)")?> 
			<table style=margin:0.5em id=questions class=inline></table>
			<script>
				function updateQuestionsTable()
				{
					var t = document.querySelector('#questions');
					while(t.rows.length>0)t.deleteRow(-1);
					var questions = Questions.getQuestions(CurrentLevel);

					//hide whole table if no questions
					if(questions.length==0) t.parentNode.style.display="none" 

					for(var q in questions)
					{
						var question = questions[q];
						var currentAnswer = Global.Configuration["Yes/No"][question];
						var checked = currentAnswer ? "checked":"";

						//reset values that are inputs
						if(!currentAnswer)
							for(var i in Questions[question])
							{
								var code=Questions[question][i];
								if(typeof(CurrentLevel[code])=="number") CurrentLevel[code]=0;
							}

						var newRow = t.insertRow(-1);
						newRow.style.background = currentAnswer ? "lightgreen" : "";
						newRow.setAttribute('question',question);
						newRow.onmouseover=function(){hlQuestionFields(this.getAttribute('question'),1)}
						newRow.onmouseout=function(){hlQuestionFields(this.getAttribute('question'),0)}
						newRow.insertCell(-1).innerHTML=translate(question)+"?";
						newRow.insertCell(-1).innerHTML=(function()
						{
							var ret="<label>"+
									"<?php write('#no')?> "+
									"<input name='"+question+"' type=radio value=0 onclick=setQuestion('"+question+"',0) checked></label> "+
									"<label><?php write('#yes')?> "+
									"<input name='"+question+"' type=radio value=1 onclick=setQuestion('"+question+"',1) "+checked+"></label> ";
							return ret;
						})();
					}
				}

				//highlight fields linked to the question
				function hlQuestionFields(question,hl)
				{
					var fields=Questions[question]; //array
					for(var i in fields)
						Formulas.hlField(fields[i],hl)
				}

				function setQuestion(question,newValue)
				{
					if(newValue)
						Global.Configuration['Yes/No'][question]=1;
					else //if(confirm("WARNING! Inputs from this question will be reseted to zero. Continue?"))
						Global.Configuration['Yes/No'][question]=0;
					init()
					hlQuestionFields(question,1)
				}
			</script>
			<?php 
				//fuel options for water and wastewater only
				if($level!="Energy")
				{
					?>
					<table id=fuelSelection class=inline>
						<tr><td colspan=2>
							<img src=img/fuel.png> <?php write('#configuration_fuel_options')?> (<a href=fuelInfo.php>info</a>)</legend>
						<style>
							#fuelSelection {margin:0.5em 0.5em 0.5em 0;}
							#fuelSelection tr.inactive {background:#f6f6f6;color:#aaa}
							#fuelSelection img {width:20px;vertical-align:middle}
						</style>
						<?php
							if($level=="Water" && !$sublevel)
							{ 
								?>
								<tr question=engines_in_water><td><?php write('#configuration_engines')?>
								<?php 
							}
							else if($level=="Waste" && !$sublevel)
							{
								?>
								<tr question=engines_in_waste>     <td><?php write('#configuration_engines')?>
								<tr question=truck_transport_waste><td><?php write('#configuration_vehicles')?>
								<?php 
							}
							else if($level=="Water" && $sublevel=="Abstraction")
							{
								?>
								<tr question=wsa_engines><td><?php write('#configuration_engines')?>
								<?php 
							}
							else if($level=="Water" && $sublevel=="Treatment")
							{
								?>
								<tr question=wst_engines><td><?php write('#configuration_engines')?>
								<?php 
							}
						?>
					</table>
					<?php
				}
			?>
		</div>

		<!--random tip-->
		<div class="card inline" style="text-align:center">
			<?php cardMenu("Tip")?>
			<div style=padding:0.5em>
				<span id=tip style="font-style:italic"><script>document.write(Tips.random())</script></span>
				&emsp;
				<button onclick="document.querySelector('#tip').innerHTML=Tips.random()">Another</button>
			</div>
		</div>
	</div>

	<!--SUBSTAGES-->
	<div class=card style=text-align:left>
		<?php cardMenu("
			INPUTS 
			&mdash; 
			Substages: <span id=counter>0</span>
			&mdash; 
			Assessment Period: <script>document.write(Global.General.Days())</script> days
		")?>
		<table id=substages style="margin:0.5em"> 
			<tr><td colspan=2 style="min-width:260px;text-align:right">
				<!--new substage button-->
				<button onclick=level3.newSubstage() class=button style="background:#af0;box-shadow: 0 1px 2px rgba(0,0,0,.1);">
					+ <?php write('#level3_new_substage')?>
				</button>
				<button class=button onclick=level3.toggleViewSum()>View sum only</button>
				<script>
					level3.toggleViewSum=function()
					{
						var newDisplay=document.querySelector('#substages td.input').style.display=='none' ? '':'none';
						var n=substages.length;
						var tr=document.querySelector('#substages tr');//fist tr
						for(var i=0;i<n;i++) tr.cells[i+1].style.display=newDisplay
						var tr=document.querySelector('#substages tr:last-child');//last tr
						for(var i=0;i<n;i++) tr.cells[i+1].style.display=newDisplay
						var collection=document.querySelectorAll('#substages td.input');
						for(var i=0;i<collection.length;i++) collection[i].style.display=newDisplay
					}
				</script>
		</table>
		<script>
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
						newTH.style.cursor="pointer";newTH.style.width="120px";
						newTH.innerHTML=""+
							"<?php write('#substage')?> "+(parseInt(s)+1)+" "+
							"<div style=font-weight:bold>"+substages[s].name+"</div>";
						newTH.setAttribute('onclick','level3.showSubstageMenu('+s+',event)');
						newTH.title="<?php write('#level3_click_to_modify_the_name')?>";
						t.rows[0].appendChild(newTH);
					}
					//TOTAL header
					var newTH = document.createElement('th');
					t.rows[0].appendChild(newTH);
					newTH.innerHTML="&sum; Sum of substages";

					//UNIT header
					var newTH = document.createElement('th');
					t.rows[0].appendChild(newTH);
					newTH.innerHTML="<?php write('#level3_unit')?>";
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

					//go over inputs array we've just created
					for(var input in inputs)
					{
						/*variable code*/
						var code=inputs[input];
						
						/*is a calculated variable*/
						var isCV=typeof(CurrentLevel[code])=="function" ? true : false;

						//copy the function inside current substage
						if(isCV) 
						{
							for(var s in substages)
								substages[s][code]=CurrentLevel[code]; 
						}

						/*if assessment type is simple, hide L3 variables*/
						if(Global.Configuration.Assessment['<?php echo "$level']['$sublevel"?>']=="simple")
						{
							if(Level3.list.indexOf(code)>-1) continue;
						}

						//if is an option, continue (will show at the end of the table)
						if(Info[code].magnitude=="Option") continue;

						/*new row*/
						var newRow=t.insertRow(-1);
						newRow.setAttribute('field',code);
						if(Questions.isHidden(code)) disableRow(newRow);

						/*background color*/ if(isCV) newRow.classList.add('isCV');

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
						newCell.style.textAlign='left';newCell.style.fontSize='10px';
						newCell.innerHTML=(function()
						{
							var extra = Level3.list.indexOf(code)>-1 ? "(<span style=font-size:10px><?php write('#level3_advanced')?></span>)" : "" ;
							return extra+" <a href=variable.php?id="+code+">"+code+"</a>";
						})();

						/*2nd cell: variable name*/
						var newCell=newRow.insertCell(-1);
						newCell.style.textAlign="left";newCell.style.cursor="help";
						newCell.setAttribute('title', translate(code+'_expla'));
						newCell.innerHTML=translate(code+'_descr');

						//3rd cell and so on: go over substages
						var multiplier=Units.multiplier(code);
						for(var s in substages)
						{
							var newCell=newRow.insertCell(-1);

							if(isCV)
							{
								newCell.innerHTML=format(substages[s][code]()/multiplier);
								newCell.title=prettyFormula;
							}
							else
							{
								newCell.classList.add("input");
								newCell.setAttribute('onclick','level3.transformField(this)');
								newCell.setAttribute('substage',s);
								newCell.innerHTML=format(substages[s][code]/multiplier);
							}
						}

						//SUM OF SUBSTAGES = LEVEL 2
						var sum=level3.sumAll(code);

						//some variables are averaged instead of summed up
						if(Averaged.isAveraged(code)) 
							sum/=substages.length;

						//BUG FIX: only update real inputs
						if(!isCV) CurrentLevel[code]=sum;

						//LEVEL 2 current value
						var newCell=newRow.insertCell(-1);
						newCell.style.textAlign="center";newCell.style.fontWeight="bold";
						newCell.innerHTML=(function()
						{
							if(isCV) 
								return format(CurrentLevel[code]()/multiplier);
							else
							{
								var isAvg = Averaged.isAveraged(code) ? " (average)": "";

								return format(CurrentLevel[code]/multiplier)+isAvg;
							}
						})();

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

					//go over inputs "magnitude==option"
					for(var input in inputs)
					{
						/*variable code*/
						var code=inputs[input];
						
						//if is an option, continue (will show at the end of the table)
						if(Info[code].magnitude!="Option") continue;

						/*new row*/
						var newRow=t.insertRow(-1);
						newRow.setAttribute('field',code);
						if(Questions.isHidden(code)) disableRow(newRow);

						/*1st cell: show code*/
						var newCell=newRow.insertCell(-1);
						newCell.style.textAlign='left';
						newCell.style.fontSize='10px';
						newCell.innerHTML=(function()
						{
							var extra = Level3.list.indexOf(code)>-1 ? "(<span style=font-size:10px><?php write('#level3_advanced')?></span>)" : "" ;
							return extra+" <a href=variable.php?id="+code+">"+code+"</a>";
						})();

						/*2nd cell: variable name*/
						var newCell=newRow.insertCell(-1);
						newCell.style.textAlign="left";newCell.style.cursor="help";
						newCell.setAttribute('title', translate(code+'_expla'));
						newCell.innerHTML=translate(code+'_descr');

						//3rd cell and so on: go over substages
						for(var s in substages)
						{
							var newCell=newRow.insertCell(-1);
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
									option.innerHTML=op+" ("+value+")";
									if(substages[s][code]==value) 
									{
										option.selected=true;
									}
								}
							})();
						}
					}

					//last row: delete substage
					var newRow=t.insertRow(-1);
					var newCell=newRow.insertCell(-1);
					newCell.style.border="none";newCell.colSpan=2;
					for(var s in substages)
					{
						newCell=newRow.insertCell(-1);
						newCell.style.textAlign='center';
						var str=""+
							"<button class=button onclick=level3.deleteSubstage("+s+") title='<?php write('#level3_delete_substage')?>' style='margin:0;'>&#9003;</button>"
						newCell.innerHTML=str
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
				/*substage default name*/ this.name="<?php write('#name')?>";
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
				input.autocomplete='off'
				input.setAttribute('onkeypress',"if(event.which==13){level3.updateSubstage("+substage+",'"+field+"',this.value)}")
				input.setAttribute('onblur',"level3.updateSubstage("+substage+",'"+field+"',this.value)") //now works
				input.onkeydown=function(event)
				{
					switch(event.which)
					{
						case 38: input.value++;break;
						case 40: input.value--;break;
						case 9: //TAB
							setTimeout(function()
							{
								var el=document.querySelector('#inputs tr[field='+field+']').nextSibling.childNodes[1];
								if(el)
									el.onclick();
							},100);
							break;
					}
				}
				//value converted
				var multiplier = Units.multiplier(field);
				input.value=substages[substage][field]/multiplier;
				element.appendChild(input)
				input.select()
			}
			//update a field of the substage[index]
			level3.updateSubstage=function(index,field,newValue)
			{
				newValue=parseFloat(newValue);
				if(isNaN(newValue))newValue=0;
				var multiplier=Units.multiplier(field);
				substages[index][field]=multiplier*newValue;
				init();
			}
		</script>
	</div>

	<!--Edit.php-->
	<div class=card>
		<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button>
			OUTPUTS
			<!--button toggle outputs/graph display-->
			<script>
				function toggleGraph(event,thisB)
				{
					event.stopPropagation();
					var graph=document.querySelector('#graph_container')
					var ioCon=document.querySelector('#outputs_container')
					if(graph.style.display=='none') 
					{
						ioCon.style.display='none';
						graph.style.display='';
						thisB.classList.add('active');

					}
					else
					{
						ioCon.style.display='';
						graph.style.display='none';
						thisB.classList.remove('active');
					}
					init()
				}
			</script>
			<button 
				id=btn_toggle class=toggle 
				onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleGraph(event,this)">
				VIEW GRAPH
			</button>
		</div>

		<!--Outputs-->
		<div id=ioContainer>
			<!--Outputs-->
			<div id=outputs_container class=inline style="width:40%;margin-left:0.5em;margin-bottom:2em">
				<!--GHG-->
				<table id=outputs style="width:100%;background:#f6f6f6;margin-bottom:0.5em;">
					<tr><th colspan=7 class=tableHeader>
						OUTPUTS — <?php write('#edit_ghg_emissions')?> &mdash;
						<!--show conv factor-->
						<span>Conversion factor: 
							<script>
								(function(){
									var c = Global.General.conv_kwh_co2;
									var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' title='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+"</span>" : format(c); 
									document.write(str)
								})();
							</script> 
							kg CO<sub>2</sub>/kWh
						</span>
					<tr>
						<th style=width:10%><?php write('#edit_origin')?>
						<th style=width:17%>Kg CO<sub>2</sub> during the assessment period
						<th style=width:17%><?php write('#edit_value_per_year')?><br>kg CO<sub>2</sub>/<?php write('#year')?>
						<th style=width:17%><?php write('#edit_per_inhab')?><br>kg CO<sub>2</sub>/<?php write('#year')?>/inhab
						<th style=width:17%><?php write('#edit_per_serv_pop')?><br>kg CO<sub>2</sub>/<?php write('#year')?>/serv.pop
						<th style=width:17%><?php write('#edit_per_water_volume')?><br>kg CO<sub>2</sub>/m<sup>3</sup>
				</table>

				<!--energy performance-->
				<table id=nrgOutputs style="width:100%;background:#f6f6f6;">
					<tr><th colspan=4 class=tableHeader>OUTPUTS — Energy performance
					<tr>
						<!--
						<th title=Performance style=cursor:help><?php write('#edit_benchmark')?>
						-->
						<th><?php write('#edit_description')?>
						<th><?php write('#edit_current_value')?>
						<th><?php write('#edit_unit')?>
				</table>

				<!--other (SL indicators)-->
				<table id=otherOutputs style="width:100%;background:#f6f6f6;margin-top:0.5em;margin-bottom:0.5em">
					<tr><th colspan=4 class=tableHeader>OUTPUTS — <?php write('#edit_service_level_indicators') ?>
					<tr>
						<th><?php write('#edit_description')?>
						<th><?php write('#edit_current_value')?>
						<th><?php write('#edit_unit')?>
				</table>
			</div>

			<!--GRAPHS-->
			<div id=graph_container class=inline style="width:55%;margin-left:0.5em;margin-bottom:2em">
				<!--choose graph type buttons-->
				<?php include'buttonsGraphType.php'?>
				<!--actual graph-->
				<div id=graph><?php write('#loading')?></div>
				<script>
					google.charts.load('current',{'packages':['corechart']});
					google.charts.setOnLoadCallback(drawCharts);
				</script>
				<style>
					#graph div.options{padding:1em}
					#graph button {margin:0.2em}
					#graph {text-align:center}
					#graph * {margin:auto}
				</style>
			</div>
		</div>
	</div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
/** If no substages (==first time entering level3: create one substage with L2 values*/
(function checkIfNoSubstages()
{
	if(substages.length==0)
	{
		//create a substage
		substages.push(new level3.Substage());
	}
	//if there is already one substage
	if(substages.length==1)
	{
		//make the first substage have L2 values
		level3.getInputs().forEach(function(field)
		{
			substages[0][field]=CurrentLevel[field];
		});
	}
})();
</script>
