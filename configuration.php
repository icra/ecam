<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<script>
		/** Enable or disable stage <input type=checkbox id=id> */
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
					/**modifiy Active Stages*/Global.Configuration["Active Stages"][elements[i].id]=0
				}
				updateOptions(elements[i].id)
			}

			//background color: green or white
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#73AD21":""

			//update Active Stages
			Global.Configuration["Active Stages"][id] = checkbox.checked ? 1 : 0
			
			//update options (questions in the right)
			updateOptions(id);

			//redisplay current json
			updateResult()
		}

		/** Activate stages depending on Global.Configuration["Active Stages"] */
		function activateLevels()
		{
			//go over Levels
			for(stage in Global.Configuration["Active Stages"])
			{
				if(Global.Configuration["Active Stages"][stage])
				{
					/**uws is always active*/if(stage=="uws"){continue}
					/**set checked*/document.getElementById(stage).checked=true
					activate(stage)
				}
			}
		}

		/** Update the current Global object
			parameter: menu (string) ["Waste" or "Water"]
		*/
		function updateQuestion(stage,question,newValue)
		{
			Global.Configuration.Questions[stage][question]=parseInt(newValue)
			init()
		}
		function setTechnology(stage,selectedTec)
		{
			for(tec in Global.Configuration.Technologies[stage])
			{
				Global.Configuration.Technologies[stage][tec] = selectedTec==tec ? 1:0;
			}
			init();
		}
		/** Hide or show a <tr> of additional info depending on active stages **/
		function updateOptions(family)
		{
			var newDisplay=Global.Configuration["Active Stages"][family] ? "" : "none"; 
			var trs = document.querySelectorAll("[class=option][family="+family+"]");
			for(var i=0;i<trs.length;i++)
			{
				trs[i].style.display = newDisplay;
				if(newDisplay=='none')continue;
				trs[i].style.backgroundColor ='orange';
				/*cool visual efect*/setTimeout(function(el){el.style.backgroundColor='';},1,trs[i]);
			}
		}

		function init()
		{
			activateLevels();
			updateResult();
		}
	</script>
	<style> tr.option{transition:all 1.5s} </style>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Configuration</h1>
<!--SUBTITLE--><h4>Which stages form your system?</h4>

<!--MAIN-->
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
		<tr><th colspan=3 style="text-align:left;font-size:16px">Additional info
		<script>
			for(stage in Global.Configuration.Questions)
			{
				document.write(""+
					"<tr><td colspan=3 style=font-size:11px;background:#eee>"+stage+
					" ("+Object.keys(Global.Configuration.Questions[stage]).length+")"
				)
				for(question in Global.Configuration.Questions[stage])
				{
					document.write("<tr class=option family="+stage+" style=display:none title="+varsHidByQuestions[question]+"><td>"+question+"?")
					document.write("<td><select onchange=\"updateQuestion('"+stage+"','"+question+"',this.value)\">")
					if(Global.Configuration.Questions[stage][question])
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
			<tr><th colspan=3 style="text-align:left;font-size:16px">Treatment technologies
		<script>
			for(stage in Global.Configuration.Technologies)
			{
				document.write("<tr class=option family="+stage+" style=display:none><td>Technology used in "+stage+" Treatment");
				document.write("<td><select onchange=setTechnology('"+stage+"',this.value)>");
				for(tec in Global.Configuration.Technologies[stage])
				{
					document.write("<option value='"+tec+"'>"+tec);
				}
				document.write("</select>");
			}
		</script>
	</table>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='getStarted.php'>Previous</button> 
	<button class="button next" onclick=window.location='stages.php'>Next</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
