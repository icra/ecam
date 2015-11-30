<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		td{text-align:left}
	</style>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//input element that we are clicking
			var checkbox  = document.getElementById(id)

			//background color = green or white depending on checkbox
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#af0":""

			//enable link if checbox.checked //TODO
			if(checkbox.checked)
			{
				//add link
			}
			else
			{
				//remove link
			}


			//sub elements: they have className=checkbox.id
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(checkbox.checked)
				{
					elements[i].removeAttribute('disabled')
					elements[i].parentNode.style.color=""
				}
				else
				{
					elements[i].checked=false
					elements[i].setAttribute('disabled',true)
					elements[i].parentNode.style.color="#ccc"
					elements[i].parentNode.parentNode.style.backgroundColor=""
					//modifiy Global Active Stages
					Global.General["Active Stages"][elements[i].id]=0
					//hide inputs corresponding to sublevels
					inputVisibility(elements[i].id,checkbox.checked)
					//set input count to 0
					document.querySelector("[count='"+elements[i].id+"']").innerHTML=0
				}
			}

			//show or hide inputs corresponding to this level
			inputVisibility(id,checkbox.checked)

			//change the "<span count=id>number</span>" for this level
			var count = checkbox.checked ? document.querySelectorAll("[family='"+id+"']").length:0
			document.querySelector("[count='"+id+"']").innerHTML=count

			//update Global.General["Active Stages"][id]
			var newState = checkbox.checked ? 1:0
			Global.General["Active Stages"][id]=newState
			updateResult()
		}

		/** Activate stages depending on cookies */
		function activateLevels()
		{
			//go over Levels
			for(stage in Global.General["Active Stages"])
			{
				if(Global["General"]["Active Stages"][stage])
				{
					//check level checkbox
					document.getElementById(stage).checked=true
					activate(stage)
				}
			}
		}

		//** Create rows and columns for a table with specified object
		function tableRows(object,name,family)
		{
			//return string
			var ret="<tr><td colspan=5 style='background:#eee;font-weight:bold'>"+name
			ret+=": <span count="+family+">0</span>"
			for(variable in object)
			{
				//only numbers
				if(typeof(object[variable])!="number")continue

				ret+="<tr style=display:none family='"+family+"'>"+
					"<td style='font-weight:bold'><a class=blue href=variable.php?id="+variable+">"+variable+"</a>"+
					"<td>"+Info[variable].description
			}
			return ret
		}

		//** Display or hide inputs of the specified family (string) and display (true or false) */
		function inputVisibility(family,display)
		{
			//style.display string
			display=display?"":"none"
			//select elements: <tr family=family>
			var elements=document.querySelectorAll("tr[family='"+family+"']")
			//loop elements
			for(var i=0;i<elements.length;i++)
			{
				fadeIn(elements[i],0)
				elements[i].style.display=display
			}
		}

		function init()
		{
			activateLevels()
			updateResult()
		}

		function fadeIn(element,val)
		{
			element.style.opacity=val
			if(val<1)
			{
				val+=0.1
				setTimeout(function(){fadeIn(element,val)},30)
			}
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"loadSaveClear.php"?>
<!--TITLE--><h2>Configuration of your system</h2>
<!--SUBTITLE--><h4>Activate the stages which correspond to your system.</h4>

<!--SELECT LEVELS-->
<div class=inline style="width:20%">
	<table style=font-size:15px>
		<tr style=color:#444><th>Level 1<th>Level 2
		<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=water onchange=activate(this.id)> Water Supply	</label>
			<td>
				<label style=color:#ccc><input type=checkbox disabled id=waterAbs class=water onchange=activate(this.id)> Abstraction	</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=waterTre class=water onchange=activate(this.id)> Treatment		</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=waterDis class=water onchange=activate(this.id)> Distribution	</label> 
		<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=waste onchange=activate(this.id)> Wastewater	</label>
			<td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteCol class=waste onchange=activate(this.id)> Collection	</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteTre class=waste onchange=activate(this.id)> Treatment		</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteDis class=waste onchange=activate(this.id)> Discharge		</label> 
	</table>
</div>

<!--AVAILABLE INPUTS
<div class=inline style="width:75%;text-align:left">
	<h4>Enabled Inputs Sorted By Stage (Summary)</h4>
	<div class=inline style="font-size:11px;width:35%;padding:0">
	<table style=width:100%>
		<tr><th colspan=2>Level 1 Inputs
		<script>
			document.write(tableRows(Global.Water,"Water Supply","water"))
			document.write(tableRows(Global.Waste,"Wastewater","waste"))
		</script>
	</table>
	</div>
	<div class=inline style="font-size:11px;width:55%;padding:0">
		<table style=";width:100%">
			<tr><th colspan=2>Level 2 Inputs
			<script>
				document.write(tableRows(Global.Water.Abstraction,	"Water Abstraction",	"waterAbs"))
				document.write(tableRows(Global.Water.Treatment,	"Water Treatment",		"waterTre"))
				document.write(tableRows(Global.Water.Distribution,	"Water Distribution",	"waterDis"))
				document.write(tableRows(Global.Waste.Collection,	"Wastewater Collection","wasteCol"))
				document.write(tableRows(Global.Waste.Treatment,	"Wastewater Treatment",	"wasteTre"))
				document.write(tableRows(Global.Waste.Discharge,	"Wastewater Discharge",	"wasteDis"))
			</script>
		</table>
	</div>
</div>
--><hr>

<!--SYSTEM DESCRIPTION QUESTIONNAIRE-->
<h3>System description (not implemented)</h3>
<table class=inline>
	<tr><th>Select stage						<th> 
		<select>
			<script>
				//this should be automatically updated, now it's fixed
				function updateSystemDescriptionSelectStage()
				{
					for(field in Global.General["Active Stages"])
					{
						if(Global.General["Active Stages"][field])
						{
							switch(field)
							{
								case "water":field="Water Supply (Level 1)";break;
								case "waterAbs":field="Water Abstraction (Level 2)";break;
								case "waterTre":field="Water Treatment (Level 2)";break;
								case "waterDis":field="Water Distribution (Level 2)";break;
								case "wasteCol":field="Wastewater Collection (Level 2)";break;
								case "wasteTre":field="Wastewater Treatment (Level 2)";break;
								case "wasteDis":field="Wastewater Discharge (Level 2)";break;
							}
							document.write("<option>"+field+"</option>")
						}
					}
				}
				updateSystemDescriptionSelectStage()
			</script>
		</select>
	<tr> <td>Is your system producing energy?  	<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your topography flat?  			<td> <select> <option>No <option>Yes </select>
	<tr> <td>Do you want other emissions?		<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your system doing X?  			<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your system doing Y?  			<td> <select> <option>No <option>Yes </select>
</table>
<!--TBD
	<table class=inline>
		<tr><td rowspan=3>Water supply
			<td>Abstraction
			<tr><td>Treatment
			<tr><td>Distribution
		<tr><td rowspan=3>Wastewater
			<td>Collection
			<tr><td>Treatment
			<tr><td>Discharge
	</table>
-->

<!--CURRENT JSON--><?php include'currentJSON.php'?>
