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
	<link rel=stylesheet href="css.css"><style>
		td.input input{width:95%;font-size:18px}
		td.input{width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script src="js/cookies.js"></script><!--basic cookie functions here-->
	<script src="js/updateGlobalFromCookies.js"></script><!--update Global object from cookie "GLOBAL" here-->
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
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+Info[field].description+"</a>"
				var newCell=newRow.insertCell(-1)
				newCell.className="input"
				newCell.setAttribute('onclick','transformField(this)')
				newCell.innerHTML=CurrentLevel[field]
				newRow.insertCell(-1).innerHTML=Info[field].unit
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
				newRow.insertCell(-1).innerHTML="<a href=variable.php?id="+field+">"+field+"</a>"
				newRow.insertCell(-1).innerHTML=Info[field].description
				newRow.insertCell(-1).innerHTML=CurrentLevel[field]()
				newRow.insertCell(-1).innerHTML=Info[field].unit
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
<!--YOU ARE HERE--><?php include"youAreHere.php"?>

<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Global": $titleLevel="Global";break;
		case "Water":  $titleLevel="Water Supply";break;
		case "Waste":  $titleLevel="Wastewater";break;
	}
	$sep="<span style=color:black>&rsaquo;</span>";
	$title=isset($sublevel) ? "<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$sublevel</span>" : "<span style=color:black>$titleLevel</span>";
?>
<h1><a href=stages.php>Stages</a> <?php echo "$sep $title"?></h1>

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
				if(!Global.General["Active Stages"][elements[i].getAttribute('stage')]) 
				{
					elements[i].setAttribute('disabled',true)
					elements[i].setAttribute('title','Inactive stage. Go to Configuration to enable it')
				}
			}
		}
		turnOffButtons()
	</script>
</div>

<!--HELP--><h4>Here you can edit the inputs for this stage (grey fields). The Key Performance Indicators (yellow) will be updated automatically.</h4>

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
		<tr><th>Code<th>Description<th>Current Value<th>Unit<th>Data Quality (not implemented)
	</table>

	<!--OUTPUTS-->
	<table id=outputs class=inline style=background:yellow>
		<tr><th colspan=4>OUTPUTS - Key Performance Indicators
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
