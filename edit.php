<?php
	/* edit.php this page lets the user modify inputs and see automatically the outputs */

	if(!isset($_GET['level'])){die("ERROR: stage not specified");}

	/**
	  * Process input:
	  *  - $level: 	   mandatory {"Water","Waste","UWS"}
	  *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	  */

	$level=$_GET['level'];
	$sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;

	//if someone tries to go "General" (i.e. from variable.php?id=Days)
	if($level=="General") { header("Location: getStarted.php"); }
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		td.input input { margin:0;padding:0;width:95%;}
		td.input { width:80px;text-align:right;color:#666;cursor:cell;transition:all 0.5s}
		tr:not([hl=yes]) td.input {background-color:#eee;}

		table#inputs tr:hover  {background:#ccc;}
		table#outputs tr:hover {background:#ccc;}
		table#outputs th:not(.tableHeader) {background:#c9ab98}
		table#nrgOutputs th:not(.tableHeader) {background:#c9ab98}
		table#otherOutputs th:not(.tableHeader) {background:#c9ab98}
		<?php
			if($level=="Waste")
			{?>
				table#inputs th:not(.tableHeader) {background:#bf5050}
				#inputs a,#inputs a:visited{color:#bf5050}
				#outputs a,#outputs a:visited{color:#bf5050}
				#otherOutputs a,#otherOutputs a:visited{color:#bf5050}
				#nrgOutputs a,#nrgOutputs a:visited{color:#bf5050}
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
		#inputs th, #outputs th, #otherOutputs th, #nrgOutputs th {text-align:left;border:none}
		#inputs td, #outputs td, #otherOutputs td, #nrgOutputs td {border-top:none;border-left:none;border-right:none}
	</style>

	<script>
		/** 
		  * Note: Try to follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		  *
		  */

		<?php
			//establish the stage we are going to be focused
			if($sublevel)
			{
				echo "
					var CurrentLevel = Global['$level']['$sublevel'];
					var substages = Substages['$level']['$sublevel'];";
			}
			else
			{
				echo "var CurrentLevel = Global['$level'];";
			}
		?>

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
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.classList.add('input')
			input.autocomplete='off'
			input.onblur=function(){updateField(field,input.value)}
			input.onkeypress=function(event) { if(event.which==13) {input.onblur()} }
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
				}
			}
			element.appendChild(input)
			input.select()
		}

		/** Redisplay table id=inputs */
		function updateInputs()
		{
			var t=document.getElementById('inputs')
			while(t.rows.length>2){t.deleteRow(-1)}
			for(var field in CurrentLevel)
			{
				/*first check if function*/
				if(typeof(CurrentLevel[field])!="number")
				{
					/*then, check if is calculated variable "c_xxxxxx" */
					if(field.search(/^c_/)==-1) continue;
				}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) continue;

				/*check if field is level3 specific*/if(Level3.isInList(field)) continue;

				//bool for if current field is a calculated variable (CV)
				var isCV = field.search(/^c_/)!=-1;

				/*new row*/var newRow=t.insertRow(-1);

				/*background*/if(isCV){newRow.classList.add('isCV');}

				/*hlInputs for formula and show formula, only if CV*/
				if(isCV)
				{
					var formula = CurrentLevel[field].toString();
					var prettyFormula = Formulas.prettify(formula);
					newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');
					newRow.setAttribute('title',prettyFormula);
				}
				else{
					newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'",CurrentLevel,0)');
				}
				
				/*new ro attribute field=field>*/
				newRow.setAttribute('field',field);

				/*description*/ 
				var newCell=newRow.insertCell(-1);

				newCell.setAttribute('title', Info[field] ? Info[field].explanation : "no explanation");
				newCell.style.cursor='help';

				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description <button onclick=removeGhost('"+field+"')>Remove it</button></span>";
					var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				if(!isCV)
				{
					if(typeof(substages)=="object" && substages.length > 1)
					{
						//this means you are in level 2 and you should NOT be able to modify inputs here
						newCell.style.cursor='help';
						newCell.title="To modify this input, go to 'Substages'. This is because this field now the sum of all fields in substages";
					}
					else
					{
						newCell.className="input";
						newCell.title="Click to modify this input";
						newCell.setAttribute('onclick','transformField(this)');
					}
				}
				else //add an annotation 
				{
					newCell.title=Formulas.prettify(CurrentLevel[field].toString());
				}

				/*value*/
				newCell.innerHTML=(function()
				{
					var value = isCV ? CurrentLevel[field]() : CurrentLevel[field];
					value/=Units.multiplier(field);
					value=format(value);
					return value
				})();

				//check if this cv has estimated data
				var ed=DQ.hasEstimatedData(field) ? " <span title='This equation contains estimated data' class=estimated>&#9888;</span>" : "";
				newCell.innerHTML+=ed;

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(!Info[field])
						return "<span style=color:#ccc>no unit</span>";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}

					if(isCV) 
					{
						return Info[field].unit;
					}
					else
					{
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
				newRow.insertCell(-1).innerHTML=(function(){
					if(isCV)
					{
						return "Calculated";
					}
					else
					{
						var select=document.createElement('select');
						select.setAttribute('onchange','DQ.update("'+field+'",this.value)');
						['Actual','Estimated'].forEach(function(opt)
						{
							var option=document.createElement('option');
							select.appendChild(option);
							option.innerHTML=opt;
							if(Global.Configuration.DataQuality[field]==opt)
								option.setAttribute('selected',true);
								
						});
						return select.outerHTML;
					}
				})();
			}

			//here check if t.rows.length is 2
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#ccc>No inputs</span>";

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',4)
			newTh.style.borderBottom='none';
			newRow.appendChild(newTh);
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

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}
				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);
				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the value
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					if(!Info[field] || Info[field].explanation == "") 
						return "no explanation";
					else
						return Info[field].explanation;
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='This equation contains estimated data'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

					return format(value)+" "+ed+" "+l2w;
				})();

				/*Normalization*/
				(function()
				{
					var level    = '<?php echo $level?>';
					var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';
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
							//special case corinne requested
							if((field=="ws_KPI_GHG_year"||field=="ww_KPI_GHG_year") && category=="volume") return "";

							//else
							var norm=Normalization.normalize(category,field,level,sublevel);
							return format(norm);
						})();
					});

					//if wastewater, also normalize for bod 
					if(level=="Waste")
					{
						newCell=newRow.insertCell(-1);
						newCell.setAttribute('onmouseover',"Formulas.hlField('c_ww_bod_rmvd',1)")
						newCell.setAttribute('onmouseout', "Formulas.hlField('c_ww_bod_rmvd',0)")
						newCell.title=newCell.parentNode.title+"/c_ww_bod_rmvd";
						newCell.innerHTML=(function()
						{
							//special case corinne requested
							if(field=="ww_KPI_GHG_year") return "";

							var value = CurrentLevel[field]()/Units.multiplier(field);
							value/=Global.Waste.c_ww_bod_rmvd();
							return format(value);
						})();
					}
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999>There are no GHG formulas in this level</span>";

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
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

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) continue;

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);
				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the value
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*circle indicator*/ 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.innerHTML=(function()
				{
					var hasIndicator=RefValues.isInside(field);
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
						newCell.title='This formula has no indicator associated';
						return "<span style=color:#ccc>NA</span>";
					}
				})();

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					if(!Info[field] || Info[field].explanation == "") 
						return "no explanation";
					else
						return Info[field].explanation;
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var color = field.search(/^ww/)==0 ? "#bf5050" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='This equation contains estimated data'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

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
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999>There are no formulas in this level</span>";

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

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}
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
					if(!Info[field] || Info[field].explanation == "") 
						return "no explanation";
					else
						return Info[field].explanation;
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var color = field.search(/^ww/)==0 ? "#bf5050" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='This equation contains estimated data'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

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
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999>There are no formulas in this level</span>";

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
			<?php
				if($sublevel || $level=="Energy")
				{
					//old L2
					echo "Graphs.graph5(false,'graph');";

					if($level=='Energy')
					{
						echo "Graphs.graph7(false,'graph2')";
					}
				}
				else
				{
					//old L1
					echo "Graphs.graph4(false,'graph');";
				}
			?>
		}

		/** Update all */
		function init()
		{
			updateInputs();
			updateOutputs();
			updateNrgOutputs();
			updateOtherOutputs();
			Exceptions.apply();
			//when user updates any input, trigger this:
			try{ drawCharts(); }
			catch(e) { console.log(e); }
			updateResult();
		}
	</script>

</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<div id=fixedTopBar>
	<style>
		div#fixedTopBar {
			position:fixed;
			top:0;
			width:100%;
			margin:0;padding:0;
			border-bottom:1px solid #ccc;
			background:white;
		}
	</style>

	<!--NAVBAR--><?php include"navbar.php"?>
	<!--linear diagram--><?php include'linear.php'?>

	<!--TITLE-->
	<?php 
		//Set a navigable title for page
		switch($level)
		{
			case "Water":  $titleLevel="Water supply";break;
			case "Waste":  $titleLevel="Wastewater";break;
			case "Energy": $titleLevel="Energy summary";break;
			default:	   $titleLevel=$level;break;
		}
		if($sublevel)
		{
			switch($sublevel)
			{
				default:	   $titleSublevel=$sublevel;break;
			}
		}
		/*separator*/ $sep="<span style=color:black>&rsaquo;</span>";
		$title=$sublevel ? "<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$titleSublevel (Energy performance)</span>" : "<span style=color:black>$titleLevel</span>";
	?>
	<style> h1 {text-align:left;padding-left:20em;line-height:2.1em} </style>
	<h1><a href=stages.php>Input data</a> <?php echo "$sep $title"?>

		<!--go to level 3 button-->
		<?php
			if($sublevel)
			{
				$color = ($level=="Waste")?"lightcoral":"lightblue";
				echo "
					<span class=inline style='float:right;margin-right:0.5em'>
						<button 
							class=button
							style='background:$color;font-size:12px;vertical-align:middle'
							onclick=window.location='level3.php?level=$level&sublevel=$sublevel'>
								<img src=img/substages.png style='width:40px;margin-right:1em'>
								Substages
						</button> 
						<span style=font-size:12px;color:#666>
							&rarr; Divided in 
							<script>
								var length = Substages['$level']['$sublevel'].length;
								document.write(length)
							</script>
							substage/s
						</span>
					</span>";
			}
		?>
	</h1>
</div>

<!--separator--><div style=margin-top:200px></div>

<!--IO-->
<div id=io>
	<!--INPUTS-->
	<table id=inputs class=inline 
		style="
			margin-left:auto;max-width:47%;
			<?php if($level=="Energy")echo "display:none;"; ?>
		">
		<tr><th colspan=5 class=tableHeader>INPUTS
		<tr>
			<th>Description
			<th>Current value
			<th>Unit
			<th>Data quality
	</table>
	<!--OUTPUTS-->
	<div class=inline style="max-width:47%;margin-left:1em">
		<!--GHG-->
		<table id=outputs style="width:100%;background:#f6f6f6;
				<?php if($sublevel || $level=="Energy") echo "display:none;"; ?>
			">
			<tr><th colspan=7 class=tableHeader>OUTPUTS — Greenhouse gas emissions (GHG) |
			<!--assessment info-->
			<span style="text-align:left;font-size:11px">
				<a href=variable.php?id=Days >Assessment period</a>: <script>document.write(format(Global.General.Days()))</script> days
				|
				<a href=variable.php?id=conv_kwh_co2 title="Conversion factor for grid electricity">Conversion factor</a>: <script>document.write(format(Global.General.conv_kwh_co2))</script> kgCO<sub>2</sub>/kWh
			</span>
			<tr>
				<th>Origin
				<th style=width:20%>Value (kgCO<sub>2</sub>eq)
				<th style=width:20%>Per inhab (kgCO<sub>2</sub>eq/inhab)
				<th style=width:20%>Per serv. pop. (kgCO<sub>2</sub>eq/serv.pop)
				<th style=width:20%>Per water volume (kgCO<sub>2</sub>eq/m<sup>3</sup>)
				<?php
					if($level=="Waste" && !$sublevel)
					{
						?>
							<th style=width:20%>Per BOD removed (kgCO<sub>2</sub>eq/kg)
						<?php
					}
				?>
		</table>

		<!--energy performance-->
		<table id=nrgOutputs style="width:100%;background:#f6f6f6;margin-top:1em">
			<tr><th colspan=4 class=tableHeader>OUTPUTS — Energy performance
			<tr>
				<th title=Performance style=cursor:help>Benchmark
				<th>Description
				<th>Current value
				<th>Unit
		</table>

		<!--other-->
		<table id=otherOutputs style="width:100%;background:#f6f6f6;margin-top:1em">
			<tr><th colspan=4 class=tableHeader>OUTPUTS —
				<?php if($sublevel) echo "Context "; else echo "Service level "; ?> indicators
			<tr>
				<th>Description
				<th>Current value
				<th>Unit
		</table>
	</div>
</div>

<!--GRAPHS-->
<div id=graph style="margin:1em;padding:1em;border:1px solid #ccc;max-width:60%" >Graphs here</div>

<?php
	if($level=='Energy')
	{ ?>
		<div id=graph2 style="margin:1em;padding:1em;border:1px solid #ccc;max-width:60%" >Substages graph</div>
	  <?php
	}
?>
<script>
	google.charts.load('current',{'packages':['corechart']});
	google.charts.setOnLoadCallback(drawCharts);
</script>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
