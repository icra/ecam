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
		td.input       { width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}

		/*tables*/
		table#outputs tr:hover { background:#ccc; }
		table#outputs th:not(.tableHeader) {background:#d7bfaf}
		<?php
			if($level=="Waste")
			{?>
				table#inputs th:not(.tableHeader) {background:#bf5050}
				#inputs a,#inputs a:visited{color:#bf5050}
				#outputs a,#outputs a:visited{color:#bf5050}
			<?php }
		?>
		th.tableHeader
		{
			background:white;
			color:#000;
			font-size:17px;
			padding-bottom:0.7em;
			font-weight:normal;
		}

		#inputs th, #outputs th{text-align:left;border:none}
		#inputs td, #outputs td{border-top:none;border-left:none;border-right:none}
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
				echo "var CurrentLevel = Global['$level']['$sublevel']";
			}
			else
			{
				echo "var CurrentLevel = Global['$level'];";
			}
		?>

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
			input.onkeypress=function(event){if(event.which==13){input.onblur()}}
			//value converted
			var multiplier = Units.multiplier(field);
			var currentValue = CurrentLevel[field]/multiplier;
			input.value=currentValue
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
					if(field.search('c_')==-1) continue;
				}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) continue;

				/*check if field is level3 specific*/if(Level3.isInList(field)) continue;

				//bool for if current field is a calculated variable (CV)
				var isCV = field.search('c_')!=-1;

				/*new row*/var newRow=t.insertRow(-1);

				/*background*/if(isCV){newRow.classList.add('isCV');}

				/*hlFields for formula and show formula, only if CV*/
				if(isCV)
				{
					var formula = CurrentLevel[field].toString();
					var prettyFormula = Formulas.prettify(formula);
					newRow.setAttribute('onmouseover','Formulas.hlFields("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlFields("'+field+'",CurrentLevel,0)');
					newRow.setAttribute('title',prettyFormula);
				}
				else{
					newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'",CurrentLevel,0)');
				}
				
				/*attribute field==field>*/newRow.setAttribute('field',field);
				/*description*/ 
				var newCell=newRow.insertCell(-1);

				/*hotfix for non-existing variables (for example: when structure is updated)*/
				if(Info[field]===undefined)
				{
					CurrentLevel[field]=undefined; //remove it
					continue;
				}

				newCell.setAttribute('title',Info[field].explanation);
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var code = "<a href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();
				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				if(!isCV)
				{
					newCell.className="input";
					newCell.setAttribute('onclick','transformField(this)');
				}
				else newCell.style.textAlign='center'

				/*value*/
				newCell.innerHTML=format((function()
				{
					if(isCV)
						return CurrentLevel[field]();
					else
						return CurrentLevel[field];
				})()/Units.multiplier(field));

				//check if this cv has estimated data
				var ed=DQ.hasEstimatedData(field) ? " <span title='This equation contains estimated data' class=estimated>&#9888;</span>" : "";
				newCell.innerHTML+=ed;

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
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
						if(Info[field]===undefined)
						{
							return "<span style=color:#ccc>no unit</span>";
						}
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
				if(typeof(CurrentLevel[field])!="function"){continue;}
				if(field.search('c_')!=-1){continue;}

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}
				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);
				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlFields("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlFields("'+field+'",CurrentLevel,0)');

				//compute now the value for creating the indicator
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*circle indicator*/ 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.style.cursor='help';
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
							default:               color="#ccc";break;
						}
						return "<span style='font-size:20px;color:"+color+"'>&#128308;</span>";
					}
					else return "<span style=color:#ccc>-</span>";
				})();
				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',Info[field].explanation);
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var code = "<a href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					value=format(value);

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='This equation contains estimated data'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

					return value+" "+ed+" "+l2w;
				})();
				/*unit*/ newRow.insertCell(-1).innerHTML=Info[field]?Info[field].unit:"<span style=color:#ccc>no unit</span>";
			}
			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',4)
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
			if(typeof(CurrentLevel[field])=="number")newValue=parseFloat(newValue) //if CurrentLevel[field] is a number, parse float
			//if a unit change is set, get it:
			var multiplier = Units.multiplier(field);
			CurrentLevel[field]=multiplier*newValue; //update the field
			init(); //update tables and write cookies
		}

		/** Update all tables */
		function init()
		{
			updateInputs();
			updateOutputs();
			Exceptions.apply();
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

	<!--TITLE-->
	<?php 
		//Set a navigable title for page
		switch($level)
		{
			case "Water":  $titleLevel="Water Supply";break;
			case "Waste":  $titleLevel="Wastewater";break;
			default:	   $titleLevel=$level;break;
		}
		if($sublevel)
		{
			switch($sublevel)
			{
				case "General":$titleSublevel="Energy use and production";break;
				default:	   $titleSublevel=$sublevel;break;
			}
		}
		/*separator*/ $sep="<span style=color:black>&rsaquo;</span>";
		$title=$sublevel ? "<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$titleSublevel (Level 2)</span>" : "<span style=color:black>$titleLevel (Level 1)</span>";
	?>
	<style> h1 {text-align:left;padding-left:20em} </style>
	<h1><a href=stages.php>Input data</a> <?php echo "$sep $title"?></h1>
</div>

<!--separator--><div style=margin-top:135px></div>
<!--linear diagram--><?php include'linear.php'?>
<!--go to level 3 button-->
<?php
	if($sublevel)
	{
		if($sublevel!="General")
		{
			$color = ($level=="Waste")?"lightcoral":"lightblue";
			echo "<button 
					class=button
					style='background:$color;'
					onclick=window.location='level3.php?level=$level&sublevel=$sublevel'>
						Go to $sublevel Level 3
					</button> 
					&rarr;
					<span>
						<script>
							var length = Global.Substages['$level']['$sublevel'].length;
							document.write(length)
						</script>
						substages inside
					</span>
				";
		}
	}
?>
<!--HELP--><h4>Enter data corresponding to this stage. The results are calculated as you enter data.</h4>

<!--IO-->
<div style=text-align:left;>
	<!--INPUTS-->
	<table id=inputs class=inline style="max-width:46%">
		<tr><th colspan=5 class=tableHeader>INPUTS <?php include'inputType.php'?>
		<tr>
			<th>Description
			<th>Current value
			<th>Unit
			<th>Data quality
	</table>

	<!--PI-->
	<table id=outputs class=inline style="max-width:50%;background:#f6f6f6;">
		<tr><th colspan=5 class=tableHeader>RESULTS - Key performance indicators
		<tr>
			<th title=Performance style=cursor:help>P
			<th>Description
			<th>Current value
			<th>Unit
	</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
