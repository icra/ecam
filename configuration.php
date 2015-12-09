<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css">
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//input element that we are clicking
			var checkbox=document.getElementById(id)

			//background color = green or white depending on checkbox
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#73AD21":""

			//SUBELEMENTS: they have classname==id
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

			//update select in system description
			updateSelect('systemDescription')
		}

		/** Activate stages depending on Global.General["Active Stages"] */
		function activateLevels()
		{
			//go over Levels
			for(stage in Global.General["Active Stages"])
			{
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
			updateSelect('systemDescription')
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--nav stages--><?php include'youAreHere.php'?>
<!--TITLE--><h2>Configuration</h2>
<!--SUBTITLE--><h4>Click to activate the stages of your system.</h4>

<!--SELECT STAGES-->
<table style="font-size:16px" id=selectStage>
	<!--this table styles--><style>
		#selectStage img{width:40px;vertical-align:middle}
		#selectStage th{width:220px;}
		#selectStage td{text-align:left;}
		#selectStage label{cursor:pointer}
	</style>
	<tr><th>Level 1<th>Level 2
	<tr><td rowspan=3 style="text-align:center"> 
		<label>
			<input type=checkbox id=water onchange=activate(this.id)> 
			<img src=img/water.png> 
			Water Supply
		</label>
			<td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=waterAbs class=water onchange=activate(this.id)> 
					<img src=img/waterAbs.png>
					Abstraction
				</label> 
			<tr><td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=waterTre class=water onchange=activate(this.id)> 
					<img src=img/waterTre.png>
					Treatment
				</label> 
			<tr><td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=waterDis class=water onchange=activate(this.id)> 
					<img src=img/waterDis.png>
					Distribution	
				</label> 
	<tr><td rowspan=3 style="text-align:center"> 
		<label>
			<input type=checkbox id=waste onchange=activate(this.id)> 
			<img src=img/waste.png>
			Wastewater	
		</label>
			<td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=wasteCol class=waste onchange=activate(this.id)> 
					<img src=img/wasteCol.png>
					Collection
				</label> 
			<tr><td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=wasteTre class=waste onchange=activate(this.id)> 
					<img src=img/wasteTre.png>
					Treatment		
				</label> 
			<tr><td>
				<label style=color:#ccc>
					<input type=checkbox disabled id=wasteDis class=waste onchange=activate(this.id)>
					<img src=img/wasteDis.png>
					Discharge
				</label> 
</table>

<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='getStarted.php'>Previous</button> 
	<button class="button next" onclick=window.location='stages.php'>Next</button>
</div>

<hr>

<!--SYSTEM DESCRIPTION QUESTIONNAIRE-->
<table class=inline>
	<tr><th colspan=2>ADDITIONAL SYSTEM INFO (not implemented)
	<tr><th>Select stage						<th> 
		<select id=systemDescription>
			<script>
				//this should be automatically updated, now it's fixed
				function updateSelect(id)
				{
					var select = document.getElementById(id)
					var options = ""
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
								case "waste":field="Wastewater (Level 1)";break;
								case "wasteCol":field="Wastewater Collection (Level 2)";break;
								case "wasteTre":field="Wastewater Treatment (Level 2)";break;
								case "wasteDis":field="Wastewater Discharge (Level 2)";break;
							}
							options+="<option>"+field+"</option>"
						}
					}
					select.innerHTML=options
				}
			</script>
		</select>
	<tr> <td>Is your system producing energy?  	<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your topography flat?  			<td> <select> <option>No <option>Yes </select>
	<tr> <td>Do you want other emissions?		<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your system doing X?  			<td> <select> <option>No <option>Yes </select>
	<tr> <td>Is your system doing Y?  			<td> <select> <option>No <option>Yes </select>
</table>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
