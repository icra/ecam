<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//input element that we are clicking
			var checkbox=document.getElementById(id);


			//SUBLEVELS: they have classname==id
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(checkbox.checked)
				{
					/**remove disabled*/ elements[i].removeAttribute('disabled')
					/**normal color*/ elements[i].parentNode.style.color=""
				}
				else
				{
					/**uncheck*/elements[i].checked=false
					/**set disabled*/elements[i].setAttribute('disabled',true)
					/**set grey color*/elements[i].parentNode.style.color="#ccc"
					/**set grey bg*/elements[i].parentNode.parentNode.style.backgroundColor=""
					/**modifiy Active Stages*/Global.General["Active Stages"][elements[i].id]=0
				}
				updateOptions(elements[i].id)
			}

			//background color: green or white
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#73AD21":""

			//update Active Stages
			Global.General["Active Stages"][id] = checkbox.checked ? 1 : 0
			
			//update options (called additional info)
			updateOptions(id);

			//redisplay
			updateResult()
		}

		/** Activate stages depending on Global.General["Active Stages"] */
		function activateLevels()
		{
			//go over Levels
			for(stage in Global.General["Active Stages"])
			{
				if(Global["General"]["Active Stages"][stage])
				{
					/**uws is always active*/if(stage=="uws"){continue}
					/**set checked*/document.getElementById(stage).checked=true
					activate(stage)
				}
			}
		}

		function init()
		{
			activateLevels();
			["Water","Waste"].forEach(function(el){updateTechnologiesMenu(el)});
			updateResult();
		}
	</script>
	<style>
		tr.option{transition:all 1.5s}
	</style>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Configuration</h1>
<!--SUBTITLE--><h4>Which stages form your system?</h4>

<div style=content-align:center;width:80%>
	<!--SELECT STAGES-->
	<table id=selectStage class=inline style="font-size:16px;width:35%;margin-right:2em" >
		<!--this table styles--><style>
			#selectStage img{width:40px;vertical-align:middle}
			#selectStage th{width:220px;}
			#selectStage td{text-align:left;padding:0}
			#selectStage label{cursor:pointer;display:block;min-height:100%;padding:0.5em}
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

	<!--QUESTIONS-->
	<table class=inline style="font-size:15px;width:45%" id=questions>
		<tr><th colspan=2 style="text-align:left;font-size:16px">Additional info
		<script>
			for(stage in Global.General.Questions)
			{
				for(question in Global.General.Questions[stage])
				{
					document.write("<tr class=option family="+stage+" style=display:none title="+varsHidByQuestions[question]+"><td>"+question+"?")
					document.write("<td><select onchange=\"updateQuestion('"+stage+"','"+question+"',this.value)\">")
					if(Global.General.Questions[question])
					{
						document.write("<option value=1>Yes");
						document.write("<option value=0>No");
					}
					else
					{
						document.write("<option value=0>No");
						document.write("<option value=1>Yes");
					}
					document.write("</select>")
				}
			}
		</script>

		<!--treatment technologies-->
		<tr class=option family=waterTre style=display:none><td>Technology used in water treatment
		<td><select id=WaterTreatmentTechs></select>
		<tr class=option family=wasteTre style=display:none><td>Technology used in wastewater treatment
		<td><select id=WasteTreatmentTechs></select>
	</table>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='getStarted.php'>Previous</button> 
	<button class="button next" onclick=window.location='stages.php'>Next</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
	/** Update the current Global object
		parameter: menu (string) ["Waste" or "Water"]
	*/
	function setTechnology(menu,selectedTec)
	{
		for(tec in Global.Technologies[menu])
			Global.Technologies[menu][tec]=selectedTec==tec?1:0;
		init();
	}
	function updateQuestion(stage,question,newValue)
	{
		Global.General.Questions[stage][question]=parseInt(newValue)
		init()
	}

	/** Redisplay dropdown menu for technology selection.
		parameter: menu (string) ["Waste" or "Water"]
	*/
	function updateTechnologiesMenu(menu)
	{
		var select=document.querySelector("#"+menu+"TreatmentTechs");
		select.onchange=function(){setTechnology(menu,select.value)}
		/*empty select*/select.innerHTML="";
		for(tec in Global.Technologies[menu])
		{
			var option=document.createElement('option');
			select.appendChild(option);
			option.innerHTML=tec;
			option.value=tec;
			option.selected=Global.Technologies[menu][tec]?true:false;
		}
	}
	/** Hide or show a <tr> of additional info depending on active stages **/
	function updateOptions(family)
	{
		var trs = document.querySelectorAll("[class=option][family="+family+"]");
		for(var i=0;i<trs.length;i++)
		{
			trs[i].style.display = Global.General["Active Stages"][family] ? "" : "none";
			trs[i].style.backgroundColor ='orange';
			setTimeout(function(el){el.style.backgroundColor='';},1,trs[i]);
		}
	}
</script>
