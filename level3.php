<?php
	/* level3.php: this page lets the user edit level 3*/

	//check user GET inputs (level & sublevel)
	if(!isset($_GET['level']))		die("ERROR: level not specified");
	if(!isset($_GET['sublevel']))	die("ERROR: sublevel not specified");

	/*
	 * level: 	 mandatory. possible values: {"Water","Wastewater"}
	 * sublevel: mandatory. possible values: {"Abstraction","Treatment","Distribution","Collection","Treatment","Discharge"}
	 */
	$level=$_GET['level'];
	$sublevel=$_GET['sublevel'];
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		td{text-align:left}
		th{vertical-align:middle}
		table#substages td:not(.level2){text-align:right}
		td.input input { margin:0;padding:0;width:95%;}
		td.input{width:80px;text-align:right;background-color:#eee;cursor:cell}
		#outputs tr:hover { background:#ccc; }
		#outputs th{background:#d7bfaf;text-align:left}
		#outputs td, #outputs th{border-left:none;border-top:none;border-right:none}
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
		td.level2{color:white;text-align:center}
		<?php
			if($level=="Waste")
			{
				?>
					th{background:#bf5050}
					a,a:visited{color:#bf5050}
					td.level2{background:#bf5050}
				<?php
			}
			else
			{
				?>
					td.level2{background:#00aff1}
				<?php 
			}
		?>
	</style>

	<script>
		<?php
			/** establish the level 2 stage we are going to be focused, since substages of level 3 have the same variables*/
			echo "var CurrentStage = Global['$level']['$sublevel'];";
		?>

		/** Array to store all Substage objects */
		var substages=[];

		<?php
			//Read "substages" current object
			echo "var substages=Substages['$level']['$sublevel'];";
		?>

		/** Returns array of strings which are input identifiers for current stage, e.g ["aV1","av2"] */
		function getInputs()
		{
			var inputs=[];
			for(var field in CurrentStage)
			{
				if(typeof(CurrentStage[field])!="number" ){continue;}
				inputs.push(field);
			}
			return inputs;
		}

		/** Substage class for storing all variables that correspond to current stage */
		function Substage()
		{
			/*get a list of variables for this level*/ var inputs=getInputs();
			/*substage default name*/ this.name="<?php write('#name')?>";
			//make the object look like, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
			for(var i in inputs){this[inputs[i]]=0;}
		}

		/** New substage button pushed */
		function newSubstage()
		{
			event.stopPropagation(); //this is to see the memory progress

			//check memory usage
			if(document.cookie.length>=8100)
			{
				alert("<?php write('#level3_error_memory_full')?> ("+document.cookie.length+" bytes used)");
				return
			}

			substages.push(new Substage());
			init();
		}

		/** button delete substage pushed */
		function deleteSubstage(index)
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
		function changeName(index,newValue)
		{
			substages[index].name=newValue;
			init();
		}

		/** make appear a menu for changing substage[index] name */
		function showSubstageMenu(index,ev)
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
			input.placeholder='<?php write('#level3_new_name_short')?>'
			input.value=substages[index].name
			//onblur: remove it
			input.onblur=function(){document.body.removeChild(div)}
			//on enter pressed (13) hide it
			input.onkeypress=function(ev){if(ev.which==13)div.style.display='none'}
			//onchange: update name
			input.onchange=function(){changeName(index,input.value)}
			input.select()
		}

		/** compute the sum of all substages for a particular variable code*/
		function sumAll(code)
		{
			var sum=0;
			for(var s in substages){sum+=parseFloat(substages[s][code])}
			return sum;
		}

		/** update substages table */
		function updateSubstagesTable()
		{
			/*table element*/ var t=document.getElementById('substages');
			/*table headers */
				while(t.rows[0].cells.length>1)t.rows[0].deleteCell(-1);
				//go over substages: create a column for each
				for(var s in substages)
				{
					var newTH = document.createElement('th');
					newTH.style.cursor="pointer";
					newTH.style.width="120px";
					newTH.innerHTML=""+
						"<?php write('#substage')?> "+(parseInt(s)+1)+" "+
						"<div style=font-weight:bold>"+substages[s].name+"</div>";
					newTH.setAttribute('onclick','showSubstageMenu('+s+',event)');
					newTH.title="<?php write('#level3_click_to_modify_the_name')?>";
					t.rows[0].appendChild(newTH);
				}
				//TOTAL header
				var newTH = document.createElement('th');
				newTH.innerHTML="&sum; <?php write('#level3_TOTAL')?>";
				t.rows[0].appendChild(newTH);

				//UNIT header
				var newTH = document.createElement('th');
				newTH.innerHTML="<?php write('#level3_unit')?>";
				t.rows[0].appendChild(newTH);
			/*end headers*/

			/*update table body*/
				while(t.rows.length>1)t.deleteRow(-1)
				//each row corresponds to a variable of the current stage
				var inputs=getInputs();
				//Calculated variables
				var cvs=[];
				(function()
				{
					for(var f in CurrentStage)
					{
						//if "c_" is found, add f to cvs
						if(f.search(/^c_/)!=-1){cvs.push(f);}
					}
				})();

				inputs=inputs.concat(cvs);

				for(var input in inputs)
				{
					/*variable code*/
					var code=inputs[input];
					
					/*is a calculated variable*/
					var isCV=code.search(/^c_/)>=0 ? true : false;

					//copy the function inside current substage
					if(isCV) 
					{
						for(var s in substages)
							substages[s][code]=CurrentStage[code]; 
					}

					/*if assessment type is simple, hide L3 variables*/
					if(Global.Configuration.Assessment['<?php echo $level?>']['<?php echo $sublevel?>']=="simple")
					{
						if(Level3.isInList(code)) continue;
					}

					/*new row*/
					var newRow=t.insertRow(-1);
					newRow.setAttribute('field',code);

					if(Questions.isHidden(code)) disableRow(newRow);

					/*bg color*/ if(isCV)newRow.classList.add('isCV');

					//highlight fields if is a CV
					if(isCV)
					{
						var formula=CurrentStage[code].toString();
						var prettyFormula=Formulas.prettify(formula);
						newRow.setAttribute('onmouseover','Formulas.hlInputs("'+code+'",CurrentStage,1)');
						newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+code+'",CurrentStage,0)');
					}
					else
					{
						newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+code+'",CurrentStage,1)');
						newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+code+'",CurrentStage,0)');
					}

					/*code*/
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign='left';
					newCell.style.fontSize='10px';
					newCell.innerHTML=(function()
					{
						var extra = Level3.isInList(code) ? "(<span style=font-size:10px><?php write('#level3_advanced')?></span>)" : "" ;
						return extra+" <a href=variable.php?id="+code+">"+code+"</a>";
					})();

					/*variable description*/
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign="left";
					newCell.style.cursor="help";
					newCell.setAttribute('title', translate(code+'_expla'));
					newCell.innerHTML=translate(code+'_descr');

					//values: go over substages
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
							newCell.className="input";
							newCell.setAttribute('onclick','transformField(this)');
							newCell.setAttribute('substage',s);
							newCell.innerHTML=format(substages[s][code]/multiplier);
						}
					}

					//SUM OF SUBSTAGES = LEVEL 2
					var sum=sumAll(code);

					//some variables are averaged instead of summed up
					if(Averaged.isAveraged(code)) sum/=substages.length;

					//only update real inputs
					if(!isCV) CurrentStage[code]=sum;

					//LEVEL 2 current value
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign="center";
					newCell.style.fontWeight="bold";
					newCell.innerHTML=(function()
					{
						if(isCV) 
							return format(CurrentStage[code]()/multiplier);
						else
						{
							var isAvg = Averaged.isAveraged(code) ? " (average)": "";

							return format(CurrentStage[code]/multiplier)+isAvg;
						}
					})();

					//Unit for current input
					newRow.insertCell(-1).innerHTML=(function()
					{
						if(!Info[code])
							return "undefined";

						if(Info[code].magnitude=="Currency")
						{
							return Global.General.Currency;
						}

						var str="<select onchange=Units.selectUnit('"+code+"',this.value)>";
						if(Units[Info[code].magnitude]===undefined)
						{
							return Info[code].unit
						}
						var currentUnit = Global.Configuration.Units[code] || Info[code].unit
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

				//Options
				var newRow = t.insertRow(-1)
				var newCell = newRow.insertCell(-1)
				newCell.style.border="none"
				newCell.colSpan=2
				for(s in substages)
				{
					newCell=newRow.insertCell(-1);
					newCell.style.textAlign='center'
					var str=""+
						"<button class=button onclick=deleteSubstage("+s+") title='<?php write('#level3_delete_substage')?>'>&#9003;</button>"
					newCell.innerHTML=str
				}
			/*end update body*/
			/*update counter*/ document.getElementById('counter').innerHTML=substages.length
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs');
			while(t.rows.length>1) t.deleteRow(-1);

			//new row
			var newRow=t.insertRow(-1);

			//headers
				['<?php write('#level3_code')?>','<?php write('#level3_description')?>'].forEach(function(element)
				{
					var newTH=document.createElement('th'); newRow.appendChild(newTH);
					newTH.innerHTML=element;
				});
				for(var s in substages)
				{
					var newTH=document.createElement('th'); 
					newRow.appendChild(newTH);
					newTH.innerHTML="<?php write('#substage')?> "+(parseInt(s)+1)+" "+
					"<div style=font-weight:bold>"+substages[s].name+"</div>"
				};
				['&sum; <?php write('#level3_TOTAL')?>','<?php write('#level3_unit')?>'].forEach(function(element)
				{
					var newTH=document.createElement('th'); newRow.appendChild(newTH);
					newTH.innerHTML=element;
				});
			//end headers

			var inputs=getInputs();
			var cvs=[];
			(function(){
				for(var f in CurrentStage)
				{
					//if "c_" is found, add f to cvs
					if(f.search(/^c_/)>=0){cvs.push(f);}
				}
			})();
			for(var field in CurrentStage)
			{
				//only functions
				if(typeof(CurrentStage[field])!="function"){continue;}

				/*if assessment type is simple, hide L3 variables*/
				if(Global.Configuration.Assessment['<?php echo $level?>']['<?php echo $sublevel?>']=="simple")
				{
					if(Level3.isInList(field)) continue;
				}

				//exclude the "level2only" variables
				if(Level2only.isInList(field)){continue;}

				//skip field "modification" (auxiliar variable)
				if(field=="modification"){continue;}

				//new row
				var newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) disableRow(newRow);

				newRow.setAttribute('title',translate(field+'_expla'));

				//if is calculated variable, hide it (no continue bc we need it)
				if(field.search(/^c_/)>=0) newRow.style.display='none';

				//set highlighting 
				var formula=CurrentStage[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentStage,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentStage,0)');

				//show code
				newRow.insertCell(-1).innerHTML=(function()
				{
					var extra = Level3.isInList(field) ? "(<?php write('#level3_advanced')?>)" : "" ;
					return extra+" <a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
				})();

				//description
				newRow.insertCell(-1).innerHTML = translate(field+'_descr');

				/** value: Compute CurrentStage[field]() for each substage*/
				(function()
				{
					//the formula will be modified starting by the current field formula
					var modification=formula; //string

					//create an array of inputs and calculated variables to replace the formula
					//go over this stage's inputs to gradually modify the formula
					inputs.concat(cvs).forEach(function(input)
					{
						var regexp=new RegExp('(.)this.('+input+')(\\D)','g');
						modification=modification.replace(regexp,'$1substages[0].$2$3');
					});

					for(var s in substages)
					{
						var modificationSubstage=modification.replace(/\[0\]/g,'['+s+']');
						eval("CurrentStage['modification']="+modificationSubstage+";");

						//value
						var newCell=newRow.insertCell(-1);
						newCell.title=prettyFormula;

						newCell.innerHTML=(function()
						{
							var value=CurrentStage['modification']()/Units.multiplier(field);
							var indicator=(function()
							{
								var hasIndicator=RefValues.isInside(field);
								if(hasIndicator)
								{
									var text=RefValues[field](value);
									var color;
									switch(text)
									{
										case "Good":           color="#af0";break;
										case "Acceptable":     color="orange";break;
										case "Unsatisfactory": color="red";break;
										case "Out of range":   color="brown";break;
										default:               color="#ccc";break;
									}
									return "<span title='"+text+"' style='font-size:20px;color:"+color+"'>&#128308;</span>";
								}
								else{return "";}
							})();
							return indicator+" "+format(value);
						})();
					}
				})();

				//level 2 value
				var newCell=newRow.insertCell(-1);
				newCell.title=prettyFormula;
				newCell.innerHTML=(function()
				{
					var value=format(CurrentStage[field]()/Units.multiplier(field));
					return '<b>'+value+'</b>';
				})();

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
					return Info[field] ? Info[field].unit : "<span style=color:#ccc>no unit</span>";
				})();
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',42)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		//transform a cell to make it editable
		function transformField(element)
		{
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			var substage=element.getAttribute('substage')
			element.innerHTML=""
			var input=document.createElement('input')
			input.autocomplete='off'
			input.setAttribute('onkeypress',"if(event.which==13){updateSubstage("+substage+",'"+field+"',this.value)}")
			input.setAttribute('onblur',"updateSubstage("+substage+",'"+field+"',this.value)") //now works
			//value converted
			var multiplier = Units.multiplier(field);
			input.value=substages[substage][field]/multiplier;
			element.appendChild(input)
			input.select()
		}

		//update a field of the substage[index]
		function updateSubstage(index,field,newValue)
		{
			newValue=parseFloat(newValue);
			if(isNaN(newValue))newValue=0;
			var multiplier=Units.multiplier(field);
			substages[index][field]=multiplier*newValue;
			init();
		}

		/** Update all tables */
		function init()
		{
			updateAssessmentMenu();
			updateSubstagesTable();
			updateOutputs();
			Sidebar.update();
			updateResult();
			try{
				drawCharts();
			}
			catch(e)
			{
				console.log(e);
			}
		}
	</script>
</head><body onload=init() style="background:#F5ECCE"><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<!--TITLE-->
<?php 
	//Navigable <h1>title</h1>
	switch($level)
	{
		case "Water": $titleLevel="<a href=edit.php?level=$level>".$lang_json['#Water']."</a>";break;
		case "Waste": $titleLevel="<a href=edit.php?level=$level>".$lang_json['#Waste']."</a>";break;
	}
	/*Separator*/$sep="<span style=color:black>&rsaquo;</span>";
	$titleSublevel="<a href=edit.php?level=$level&sublevel=$sublevel>".$lang_json["#$sublevel"]."</a>";
	$title="<a href=stages.php>Input data</a> $sep $titleLevel $sep $titleSublevel $sep <span style=color:black>".$lang_json['#substages']."</a>";
?>
<style> h1 {text-align:left;padding-left:17em;border-bottom:1px solid #ccc;background:white} </style>
<!--TITLE--><h1><?php echo $title?>
	<!--type of assessment--><?php include'assessmentType.php'?>
</h1>

<!--HELP--><h4 class=inline style=line-height:0.1em><?php write('#level3_split_this_stage')?></h4>

<!--SUBSTAGES TABLE-->
<div class=card><?php cardMenu('Substages')?>
	<table id=substages style=margin:1em> <tr>
		<td colspan=2 style="text-align:center;min-width:400px;table-layout:fixed">
			<!--substages counter-->
			<div class=inline style="border-radius:1em;padding:0.5em;border:1px solid #ccc;vertical-align:middle"><?php write('#substages')?>: <span id=counter>0</span></div>
			<!--new substage button-->
			<button onclick=newSubstage() class=button>+ <?php write('#level3_new_substage')?></button>
	</table>
</div>

<!--OUTPUTS TABLE-->
<div class=card><?php cardMenu($lang_json['#level3_results_kpis'])?>
	<table id=outputs class=inline style=background:#f6f6f6> 
		<tr><th colspan=42 style="background:white;border:none;color:black;padding-bottom:0.7em;font-size:17px">
	</table>
</div>

<!--display graphs-->
<div class=card><?php cardMenu('Graphs')?>
	<div id=graph style="margin:1em;padding:1em" >Graphs here</div>
	<style>
		#graph div.options {padding:1em}
		#graph button {margin:0.5em}
	</style>
	<script>
		function drawCharts()
		{
			Graphs.graph7(false,'graph')
		}
		google.charts.load('current',{'packages':['corechart','sankey']});
		google.charts.setOnLoadCallback(drawCharts);
	</script>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
/** If no substages (first time entering advanced assessment, create one substage with L2 values*/
(function checkIfNoSubstages()
{
	if(substages.length==0)
	{
		//create a substage
		substages.push(new Substage());
	}
	//if there is already one substage
	if(substages.length==1)
	{
		//make the first substage have L2 values
		getInputs().forEach(function(field)
		{
			substages[0][field] = CurrentStage[field]
		});
	}
})();
</script>
