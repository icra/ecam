<?php
	/** THIS PAGE LETS THE USER EDIT LEVEL 3*/

	//check user GET inputs (level & sublevel)
	if(!isset($_GET['level']))		die("ERROR: level not specified");
	if(!isset($_GET['sublevel']))	die("ERROR: sublevel not specified");

	/*
	 * level: 		mandatory. possible values: {"Water","Wastewater"}
	 * sublevel: 	mandatory. possible values: {"Abstraction","Treatment","Distribution","Collection","Treatment","Discharge"}
	 */
	$level=$_GET['level'];
	$sublevel=$_GET['sublevel'];
?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<?php include'imports.php'?>
	<style>
		td{text-align:left}
		th{vertical-align:middle}
		table#substages td:not(.level2){text-align:right}
		td.input input{outline:none;width:40px;font-size:18px}
		td.input{width:80px;text-align:right;background-color:#eee;cursor:cell}
		table#outputs tr:hover { background:orange; }
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
			{?>
				th{background:#bf5050}
				a,a:visited{color:#bf5050}
				td.level2{background:#bf5050}
			<?php }
			else
			{?>
				td.level2{background:#00aff1}
			<?php }
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
			echo "substages=Global.Level3['$level']['$sublevel'];";
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
			/*substage default name*/ this.name="S"+(substages.length+1);
			//make the object look like, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
			for(i in inputs){this[inputs[i]]=0;}
		}

		/** New substage button pushed */
		function newSubstage()
		{
			substages.push(new Substage()) //add a new substage to the array "substages"
			init()
		}

		/** button delete substage pushed */
		function deleteSubstage(index)
		{
			substages.splice(index,1)
			init()
		}

		/** update substage name */
		function changeName(index,newValue)
		{
			substages[index].name=newValue
			init()
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
			div.innerHTML="<div style=color:white>New name for substage "+(index+1)+":</div>"
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
			input.onchange=function(){changeName(index,input.value)}
			input.select()
		}

		/** compute the sum of all substages for a particular variable code*/
		function sumAll(code)
		{
			var sum=0;
			for(s in substages){sum+=parseFloat(substages[s][code])}
			return sum;
		}

		/** update substages table */
		function updateSubstagesTable()
		{
			/*table element*/ var t=document.getElementById('substages');

			/*update table header */
				while(t.rows[0].cells.length>1)t.rows[0].deleteCell(-1)
				//go over substages: create a column for each
				for(s in substages)
				{
					var newTH = document.createElement('th');
					newTH.style.cursor="pointer";
					newTH.style.width="120px";
					newTH.innerHTML=""+
						"Substage "+(parseInt(s)+1)+" "+
						"<div style=font-weight:bold>"+substages[s].name+"</div>";
					newTH.setAttribute('onclick','showSubstageMenu('+s+',event)');
					t.rows[0].appendChild(newTH);
				}
				//TOTAL header
				var newTH = document.createElement('th');
				newTH.innerHTML="&sum; TOTAL";
				t.rows[0].appendChild(newTH);
				//LEVEL2 header
				var newTH = document.createElement('th');
				newTH.innerHTML="LEVEL 2";
				t.rows[0].appendChild(newTH);
				//DIFFERENCE BETWEEN LEVEL 2 and sum of substages
				var newTH=document.createElement('th');
				newTH.innerHTML="Difference";
				newTH.style.backgroundColor='orange';
				t.rows[0].appendChild(newTH);
				//UNIT header
				var newTH = document.createElement('th');
				newTH.innerHTML="Unit";
				t.rows[0].appendChild(newTH);
			/*end update header*/

			/*update table body*/
				while(t.rows.length>1)t.deleteRow(-1)
				//each row corresponds to a variable of the current stage
				var inputs=getInputs();
				for(input in inputs)
				{
					/*variable code*/var code=inputs[input];
					var newRow=t.insertRow(-1);
					newRow.setAttribute('field',code);
					var newCell=newRow.insertCell(-1);
					/*link and name*/newCell.innerHTML="<a href=variable.php?id="+code+">"+code+"</a>";
					/*variable description*/
					var newCell=newRow.insertCell(-1);
					newCell.style.textAlign="left";
					newCell.style.fontSize="10px";
					newCell.innerHTML=Info[code]?Info[code].description:"<span style=color:#ccc>not defined</span>";
					//go over substages
					var multiplier=Units.multiplier(code);
					for(var s in substages)
					{
						var newCell=newRow.insertCell(-1);
						newCell.className="input";
						newCell.setAttribute('onclick','transformField(this)');
						newCell.setAttribute('substage',s);
						newCell.innerHTML=substages[s][code]/multiplier;
					}
					//SUM OF SUBSTAGES
					var sum=sumAll(code);
					var newCell=newRow.insertCell(-1);
					newCell.innerHTML=sum/multiplier;
					//LEVEL 2 current value
					var newCell=newRow.insertCell(-1);
					newCell.classList.add('level2');
					newCell.innerHTML=CurrentStage[code]/multiplier;
					//DIFFERENCE BETWEEN LEVEL 2 and sum of substages
					var diff=Math.abs(parseFloat(CurrentStage[code])-sumAll(code))/multiplier
					var newCell=newRow.insertCell(-1)
					newCell.style.backgroundColor=diff==0?"#af0":""
					newCell.innerHTML=diff
					//Unit for current input
					newRow.insertCell(-1).innerHTML=(function()
					{
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
					var str=""+
						"<button class=delete onclick=deleteSubstage("+s+") title='Delete substage'></button>"
					newRow.insertCell(-1).innerHTML=str
				}
			/*end update body*/

			/*update counter*/ document.getElementById('counter').innerHTML=substages.length
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs')
			while(t.rows.length>1){t.deleteRow(-1)}
			var newRow=t.insertRow(-1);

			['Code','Description'].forEach(function(element)
			{
				var newTH=document.createElement('th'); newRow.appendChild(newTH);
				newTH.innerHTML=element;
			});

			for(s in substages)
			{
				var newTH=document.createElement('th'); 
				newRow.appendChild(newTH);
				newTH.innerHTML="Substage "+(parseInt(s)+1)+" "+
				"<div style=font-weight:bold>"+substages[s].name+"</div>"
			};

			['LEVEL 2','Unit'].forEach(function(element)
			{
				var newTH=document.createElement('th'); newRow.appendChild(newTH);
				newTH.innerHTML=element;
			});

			var inputs=getInputs();
			for(var field in CurrentStage)
			{
				//only functions
				if(typeof(CurrentStage[field])!="function"){continue;}
				//skip the field called "modification" created to help calculate functions for each substage
				if(field=="modification"){continue;}

				var newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);
				var formula=CurrentStage[field].toString();
				newRow.setAttribute('onmouseover',"Formulas.hlFields('"+formula+"',1)");
				newRow.setAttribute('onmouseout',"Formulas.hlFields('"+formula+"',0)");
				newRow.setAttribute('title',Formulas.prettify(formula));
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>";
				newRow.insertCell(-1).innerHTML=Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";

				/** Compute CurrentStage[field]() for each substage*/
				(function(){
					//the formula will be modified starting by the current field formula
					var modification=formula;

					//go over this stage's inputs to gradually modify the formula
					inputs.forEach(function(input)
					{
						var regexp=new RegExp('(.)this.('+input+')(\\D)','g');
						modification=modification.replace(regexp,'$1substages[0].$2$3');
					});

					//show original formula, if it has been changed
					if(modification!=formula){console.log("Original: "+formula);}

					for(s in substages)
					{
						var modificationSubstage=modification.replace(/\[0\]/g,'['+s+']');
						//show changes, if any
						if(modificationSubstage!=formula)
						{
							console.log(' +Modification for substage['+s+']: '+modificationSubstage)
						}
						eval("CurrentStage['modification']="+modificationSubstage+";");
						newRow.insertCell(-1).innerHTML=CurrentStage['modification']()/Units.multiplier(field);
					}
				})();

				/*value from level 2*/ newRow.insertCell(-1).innerHTML=CurrentStage[field]()/Units.multiplier(field)||0;
				/*unit*/ newRow.insertCell(-1).innerHTML=Info[field] ? Info[field].unit : "<span style=color:#ccc>no unit</span>";
			}
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
			return
		}

		//update a field of the substage[index]
		function updateSubstage(index,field,newValue)
		{
			//if CurrentStage[field] is a number, parse float
			if(typeof(CurrentStage[field])=="number"){newValue=parseFloat(newValue);}
			var multiplier=Units.multiplier(field);
			substages[index][field]=multiplier*newValue;
			init()//update tables and write cookies
		}

		/** Update all tables */
		function init()
		{
			updateSubstagesTable()
			updateOutputs()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE-->
<?php 
	//Navigable <h1>title</h1>
	switch($level)
	{
		case "Water": $titleLevel="<a href=edit.php?level=$level>Water Supply</a>";break;
		case "Waste": $titleLevel="<a href=edit.php?level=$level>Wastewater</a>";break;
	}
	/*Separator*/$sep="<span style=color:black>&rsaquo;</span>";
	$titleSublevel="<a href=edit.php?level=$level&sublevel=$sublevel>$sublevel</a>";
	$title="<a href=stages.php>Input data</a> $sep $titleLevel $sep $titleSublevel $sep <span style=color:black>Substages (Level 3)</a>";
?>
<!--TITLE--><h1><?php echo $title?></h1>
<!--HELP--><h4>You can subdivide "<?php echo "$level $sublevel"?>" in different substages</h4>
<!--new substage button--><button onclick=newSubstage() class=button>+ New Substage</button>
<!--substages counter--><div class=inline style="border:1px solid #ccc;vertical-align:middle">Substages: <span id=counter>0</span></div>
<!--SUBSTAGES TABLE--><table id=substages style=margin:1em><tr><td style=border:none colspan=2></table>
<!--OUTPUTS TABLE--><table id=outputs class=inline style=background:yellow> <tr><th colspan=42>OUTPUTS </table>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
