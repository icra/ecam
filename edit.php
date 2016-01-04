<?php
	/** THIS PAGE LETS THE USER MODIFY INPUTS AND SEE AUTOMATICALLY THE OUTPUTS */

	//check specified input
	if(!isset($_GET['level']))die("ERROR: stage not specified");
	//level: 	mandatory {"Water","Wastewater","Global"}
	//sublevel: optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	$level=$_GET['level'];
	if(isset($_GET['sublevel']))
	{
		$sublevel=$_GET['sublevel'];
		$isLevel3enabled=true;
	}
	else $isLevel3enabled=false;
?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<?php include'imports.php'?>
	<style>
		td.input input{width:95%;font-size:18px}
		td.input{width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
	</style>
	<script>
		/** 
		 * GUI utilities
		 * Note: Comments follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		 */

		<?php
			//establish the stage we are going to be focused
			if(isset($sublevel))
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
			input.className='input'
			input.autocomplete='off'
			input.setAttribute('onkeypress',"if(event.which==13){updateField('"+field+"',this.value)}")
			input.setAttribute('onblur',"updateField('"+field+"',this.value)") //now works ok!
			input.value=CurrentLevel[field]
			element.appendChild(input)
			input.select()
		}

		/** Redisplay table id=inputs */
		function updateInputs()
		{
			var t=document.getElementById('inputs')
			while(t.rows.length>2)t.deleteRow(-1)
			for(field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="number" )continue
				var newRow=t.insertRow(-1)
				newRow.setAttribute('field',field)
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>"
				newRow.insertCell(-1).innerHTML= Info[field] ? Info[field].description : "<span style=color:#ccc>not defined</span>"
				var newCell=newRow.insertCell(-1)
				newCell.className="input"
				newCell.setAttribute('onclick','transformField(this)')
				newCell.innerHTML=CurrentLevel[field]
				newRow.insertCell(-1).innerHTML= Info[field] ? Info[field].unit : "<span style=color:#ccc>not defined</span>"
				newRow.insertCell(-1).innerHTML=""+
					"<label><input type=radio name="+field+" checked	> Calculated</label> "+
					"<label><input type=radio name="+field+"			> Assumed	</label> "
			}
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs')
			while(t.rows.length>2)t.deleteRow(-1)
			for(field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue
				var newRow=t.insertRow(-1)
				var formula=CurrentLevel[field].toString()
				newRow.setAttribute('title',field+"="+prettify(formula))
				newRow.setAttribute('onmouseover',"hlFields('"+formula+"',1)")
				newRow.setAttribute('onmouseout',"hlFields('"+formula+"',0)")
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>"
				newRow.insertCell(-1).innerHTML=Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>"
				newRow.insertCell(-1).innerHTML=(CurrentLevel[field]() || 0) //if nan, outputs 0
				newRow.insertCell(-1).innerHTML=Info[field]?Info[field].unit:"<span style=color:#ccc>no unit</span>"
			}
		}

		/**
		 * Hihghlight a field
		 * @param {array of strings} fields - the variable codes we want to highlight e.g. ['sV1','sV2']
		 * @param {boolean} hl - turn on/off highlighting
		 */
		function hlFields(formula,hl)
		{
			var fields=idsPerFormula(formula)
			for(field in fields)
			{
				var element=document.querySelector('[field='+fields[field]+']')
				if(element)
					element.style.backgroundColor=hl?"#af0":""
			}
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 */
		function updateField(field,newValue)
		{
			if(typeof(CurrentLevel[field])=="number")newValue=parseFloat(newValue) //if CurrentLevel[field] is a number, parse float
			CurrentLevel[field]=newValue //update the field
			init() //update tables and write cookies
		}

		/** Update all tables */
		function init()
		{
			updateInputs()
			updateOutputs()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--STAGES--><?php include"navStages.php"?>

<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Water":  $titleLevel="Water Supply";break;
		case "Waste":  $titleLevel="Wastewater";break;
		default:	   $titleLevel=$level;break;
	}
	$sep="<span style=color:black>&rsaquo;</span>";
	$title=isset($sublevel) ? "<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$sublevel</span>" : "<span style=color:black>$titleLevel</span>";
?>
<h1><a href=stages.php>Input data</a> <?php echo "$sep $title"?></h1>

<!--GO TO LEVEL 2 OR 3-->
<div>
	<?php
		if($isLevel3enabled) //means that we are in level 2
		{
			echo "<button class='button next'
				style='background:lightblue;'
				onclick=window.location='level3.php?level=$level&sublevel=$sublevel'>
				Go to Level 3 Substages
				</button>";
		}
		else //means that we are in level 1
		{
			//create buttons to navigate to level 2
			switch($level)
			{
				case "Water": 
					echo '
						<button stage=waterAbs class="button next" onclick=window.location="edit.php?level=Water&sublevel=Abstraction" 	style=background:lightblue> Water Abstraction	</button> 
						<button stage=waterTre class="button next" onclick=window.location="edit.php?level=Water&sublevel=Treatment" 	style=background:lightblue> Water Treatment	</button>
						<button stage=waterDis class="button next" onclick=window.location="edit.php?level=Water&sublevel=Distribution" style=background:lightblue> Water Distribution	</button>';
						break;
				case "Waste": 
					echo '
						<button stage=wasteCol class="button next" onclick=window.location="edit.php?level=Waste&sublevel=Collection" 	style=background:lightblue> Wastewater Collection	</button> 
						<button stage=wasteTre class="button next" onclick=window.location="edit.php?level=Waste&sublevel=Treatment" 	style=background:lightblue> Wastewater Treatment	</button>
						<button stage=wasteDis class="button next" onclick=window.location="edit.php?level=Waste&sublevel=Discharge" 	style=background:lightblue> Wastewater Discharge	</button>';
						break;
			}
		}
	?>
	<script>
		/** Disable nav buttons according to current configuration */
		function turnOffButtons()
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
		}
		turnOffButtons()
	</script>
</div>

<!--HELP--><h4>Here you can edit the inputs for this stage. The Indicators (in yellow) will be updated automatically.</h4>

<!--OPTIONS FOR THIS LEVEL-->
<div>
	<button class=button>Water Flows +</button>
	<button class=button>Energy use and production +</button>
	<button class=button>GHG Emissions +</button>
	<img src=img/co2.png style="width:40px;vertical-align:middle">
</div>

<!--IO-->
<div>
	<!--INPUTS-->
	<table id=inputs class=inline>
		<tr><th colspan=5>INPUTS
		<tr><th>Code<th>Description<th>Current Value<th>Unit<th>Data Quality
	</table>

	<!--OUTPUTS-->
	<table id=outputs class=inline style=background:yellow>
		<tr><th colspan=4>OUTPUTS
		<tr><th>Code<th>Description<th>Current Value<th>Unit
	</table>
</div><hr>

<!--PLOTS-->
<div class=inline style="border:1px solid #000;width:45%;margin:1em">
	SOME PLOTS HERE (to be implemented at the end)<br>
	<img border=1 src="img/plot-example.png" width=50%>
	<br>
	<a href=sankey.php>Sankey Example</a> 
	(not implemented)
	<button>Export</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
