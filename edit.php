<?php
	/** THIS PAGE LETS THE USER MODIFY INPUTS AND SEE AUTOMATICALLY THE OUTPUTS */

	//check specified input: level and sublevel
	if(!isset($_GET['level'])){die("ERROR: stage not specified");}

	//level: 	 mandatory {"Water","Waste","UWS"}
	//sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	$level=$_GET['level'];
	$sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;
?>
<!doctype html><html><head>
	<title>ECAM Web App</title>
	<?php include'imports.php'?>
	<style>
		td.input input { width:95%;font-size:18px}
		td.input       { width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
		table#outputs tr:hover { background:orange; }
		<?php
			if($level=="Waste")
			{?>
				th{background:#bf5050}
				a,a:visited{color:#bf5050}
			<?php }
		?>
		/* GO TO L2 BUTTONS*/
		button img {margin:0;vertical-align:middle;width:20px;padding:0} /*icons inside buttons to navigate to Level2*/
	</style>
	<script>
		/** 
		 * GUI utilities
		 * Note: Comments follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		 */

		<?php
			//establish the stage we are going to be focused
			if($sublevel)
				echo "var CurrentLevel = Global['$level']['$sublevel']";
			else
				echo "var CurrentLevel = Global['$level'];";
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
			for(field in CurrentLevel)
			{
				/*first check if function*/
				if(typeof(CurrentLevel[field])!="number")
				{
					/*then, check if is calculated variable "c_xxxxxx" */
					if(field.search('c_')==-1){continue};
				}

				/*check if field is level3 specific*/if(Level3.isInList(field)){continue;}

				//bool for if current field is a calculated variable (CV)
				var isCV = field.search('c_')!=-1

				/*new row*/var newRow=t.insertRow(-1);

				/*background*/if(isCV){newRow.classList.add('isCV');}

				/*hlFields for formula and show formula, only if CV*/
				if(isCV)
				{
					var formula = CurrentLevel[field].toString();
					var prettyFormula = Formulas.prettify(formula);
					newRow.setAttribute('onmouseover','Formulas.hlFields("'+prettyFormula+'",1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlFields("'+prettyFormula+'",0)');
					newRow.setAttribute('title',prettyFormula);
				}
				
				/*attribute field==field>*/newRow.setAttribute('field',field);
				/*code*/ newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>";
				/*description*/ newRow.insertCell(-1).innerHTML= Info[field] ? Info[field].description : "<span style=color:#ccc>not defined</span>";
				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				if(!isCV)
				{
					newCell.className="input";
					newCell.setAttribute('onclick','transformField(this)');
				}
				else newCell.style.textAlign='center'

				/*value*/newCell.innerHTML=(function(){
					if(isCV)
						return CurrentLevel[field]()/Units.multiplier(field);
					else
						return CurrentLevel[field]/Units.multiplier(field);
				})();
				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
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
						for(unit in Units[Info[field].magnitude])
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
						var select = document.createElement('select');
						['Actual','Estimated'].forEach(function(opt)
						{
							var option=document.createElement('option');
							option.innerHTML=opt;
							select.appendChild(option);
						});
						return select.outerHTML;
					}
				})();
			}
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
				newRow.setAttribute('onmouseover','Formulas.hlFields("'+prettyFormula+'",1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlFields("'+prettyFormula+'",0)');
				/*code*/ newRow.insertCell(-1).innerHTML=(function(){
					return "<a href=variable.php?id="+field+">"+field+"</a>";
				})();
				/*description*/ newRow.insertCell(-1).innerHTML=Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
				/*value*/ newRow.insertCell(-1).innerHTML=CurrentLevel[field]()/Units.multiplier(field);
				/*unit*/ newRow.insertCell(-1).innerHTML=Info[field]?Info[field].unit:"<span style=color:#ccc>no unit</span>";
				/*circle indicator*/ 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.innerHTML=(function(){
					var colors=['red','orange','green'];
					/*random one for now*/var color = colors[Math.floor(Math.random()*colors.length)];
					return "<span style=font-size:20px;color:"+color+">&#9899;</span>";
				})();
			}
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
			updateResult();
		}
	</script>
</head><body onload=init()><center>

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
	<h1><a href=stages.php>Input data</a> <?php echo "$sep $title"?></h1>
</div>

<!--separator--><div style=margin-top:100px></div>

<!--HELP--><h4>Here you can edit the inputs for this stage. The Indicators (in yellow) will be updated automatically.</h4>

<!--GO TO LEVEL 2 OR 3-->
<div style=margin:0;padding:0>
	<?php
		if($sublevel)
		{
			if($sublevel!="General")
			{
				$color=$level=="Waste"?"lightcoral":"lightblue";
				echo "<button 
						class=button
						style='background:$color;'
						onclick=window.location='level3.php?level=$level&sublevel=$sublevel'>
							Level 3 Substages
						</button> 
					";
			}
		}
		else //means that we are in level 1
		{
			//create buttons to navigate to level 2
			switch($level)
			{
				case "Water": 
					echo 'Level 2
						<button stage=waterGen class=button onclick=window.location="edit.php?level=Water&sublevel=General" 		style=background:lightblue> <img src=img/waterGen.png> Energy use and production </button> 
						<button stage=waterAbs class=button onclick=window.location="edit.php?level=Water&sublevel=Abstraction" 	style=background:lightblue> <img src=img/waterAbs.png> Abstraction	</button> 
						<button stage=waterTre class=button onclick=window.location="edit.php?level=Water&sublevel=Treatment" 	style=background:lightblue> <img src=img/waterTre.png> Treatment	</button>
						<button stage=waterDis class=button onclick=window.location="edit.php?level=Water&sublevel=Distribution" style=background:lightblue> <img src=img/waterDis.png> Distribution	</button>';
						break;
				case "Waste": 
					echo 'Level 2
						<button stage=wasteGen class=button onclick=window.location="edit.php?level=Waste&sublevel=General" 		style=background:lightcoral> <img src=img/wasteGen.png> Energy use and production </button> 
						<button stage=wasteCol class=button onclick=window.location="edit.php?level=Waste&sublevel=Collection" 	style=background:lightcoral> <img src=img/wasteCol.png> Collection	</button> 
						<button stage=wasteTre class=button onclick=window.location="edit.php?level=Waste&sublevel=Treatment" 	style=background:lightcoral> <img src=img/wasteTre.png> Treatment	</button>
						<button stage=wasteDis class=button onclick=window.location="edit.php?level=Waste&sublevel=Discharge" 	style=background:lightcoral> <img src=img/wasteDis.png> Discharge	</button>';
						break;
			}
		}
	?>
	<script>
		/** Disable nav buttons according to current configuration */
		(function()
		{
			//go over buttons that have the stage attribute
			var elements=document.querySelectorAll("[stage]")
			for(var i=0;i<elements.length;i++)
			{
				//Select non active stages
				if(0==Global.Configuration["Active Stages"][elements[i].getAttribute('stage')]) 
				{
					elements[i].setAttribute('disabled',true)
					elements[i].setAttribute('title','Inactive stage. Go to Configuration to enable it')
				}
			}
		})();
	</script>
</div>

<!--IO-->
<div>
	<!--INPUTS-->
	<table id=inputs class=inline style="max-width:49%">
		<tr><th colspan=5>INPUTS <?php include'inputType.php'?>
		<tr>
			<th>Code
			<th>Description
			<th>Current Value
			<th>Unit
			<th>Data Quality
	</table>

	<!--PI-->
	<table id=outputs class=inline style=max-width:49%;background:yellow;>
		<tr><th colspan=5>OUTPUTS (Performance indicators)
		<tr>
			<th>Code
			<th>Description
			<th>Current Value
			<th>Unit
			<th>Indicator
	</table>
</div>

<!--PLOTS
<div class=inline style="border:1px solid #000;width:45%;margin:1em">
	SOME PLOTS HERE (to be implemented at the end)<br>
	<img border=1 src="img/plot-example.png" width=50%>
	<br>
	<a href=sankey.php>Sankey Example</a> 
	(not implemented)
	<button>Export</button>
</div>
-->

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
