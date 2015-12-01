<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		td{
			text-align:left}
	</style>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//you can't activate global, it is always active
			if(id=="global")return

			//input element that we are clicking
			var checkbox = document.getElementById(id)

			//background color = green or white depending on checkbox
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#73AD21":""

			//SUBELEMENTS: THEY HAVE CLASSNAME=CHECKBOX.ID
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
				}
			}

			//update Global.General["Active Stages"][id]
			var newState=checkbox.checked?1:0
			Global.General["Active Stages"][id]=newState
			updateResult()
		}

		/** Activate stages depending on Global.General["Active Stages"] */
		function activateLevels()
		{
			//go over Levels
			for(stage in Global.General["Active Stages"])
			{
				if(stage=="global")continue
				if(Global["General"]["Active Stages"][stage])
				{
					//set checkbox as checked
					document.getElementById(stage).checked=true
					activate(stage)
				}
			}
		}

		function init()
		{
			activateLevels()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"menu.php"?>
<!--TITLE--><h2>CONFIGURATION OF YOUR SYSTEM</h2>
<!--SUBTITLE--><h4>Activate the stages which correspond to your system.</h4>

<!--SELECT STAGES-->
<style>
	#selectStage img
	{
		width:50px;
	}
</style>
<table style="font-size:19px" id=selectStage>
	<tr style=color:#444><th>Level 1<th>Level 2
	<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=water onchange=activate(this.id)> Water Supply	</label>
		<td>
			<img src=img/waterAbs.png>
			<label style=color:#ccc><input type=checkbox disabled id=waterAbs class=water onchange=activate(this.id)> Abstraction	</label> 
		<tr><td>
			<img src=img/waterTre.png>
			<label style=color:#ccc><input type=checkbox disabled id=waterTre class=water onchange=activate(this.id)> Treatment		</label> 
		<tr><td>
			<img src=img/waterDis.png>
			<label style=color:#ccc><input type=checkbox disabled id=waterDis class=water onchange=activate(this.id)> Distribution	</label> 
	<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=waste onchange=activate(this.id)> Wastewater	</label>
		<td>
			<img src=img/wasteCol.png>
			<label style=color:#ccc><input type=checkbox disabled id=wasteCol class=waste onchange=activate(this.id)> Collection	</label> 
		<tr><td>
			<img src=img/wasteTre.png>
			<label style=color:#ccc><input type=checkbox disabled id=wasteTre class=waste onchange=activate(this.id)> Treatment		</label> 
		<tr><td>
			<img src=img/wasteDis.png>
			<label style=color:#ccc><input type=checkbox disabled id=wasteDis class=waste onchange=activate(this.id)> Discharge		</label> 
</table><hr>

<!--SYSTEM DESCRIPTION QUESTIONNAIRE-->
<table class=inline>
	<tr><th colspan=2>SYSTEM DESCRIPTION (not implemented)
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
