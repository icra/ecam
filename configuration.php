<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<style> tr.option{transition:all 1.5s} </style>
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
				/**skip is always active*/
				switch(stage){case 'uws':case 'waterGen':case 'wasteGen':continue;break;}
				if(Global.Configuration["Active Stages"][stage])
				{
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

		function stageName(stage)
		{
			var r; //returned string
			switch(stage)
			{
				case "water":	 r="<b>L1</b> Water Supply";break;
				case "waterAbs": r="<b>L2</b> Water Abstraction";break;
				case "waterTre": r="<b>L2</b> Water Treatment";break;
				case "waterDis": r="<b>L2</b> Water Distribution";break;
				case "waste":	 r="<b>L1</b> Wastewater";break;
				case "wasteCol": r="<b>L2</b> Wastewater Collection";break;
				case "wasteTre": r="<b>L2</b> Wastewater Treatment";break;
				case "wasteDis": r="<b>L2</b> Wastewater Discharge";break;
				default: r=stage;break;
			}
			return r;
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Configuration</h1>
<!--SUBTITLE--><h4>Which stages form your system? Click to activate stages.</h4>

<!--MAIN CONTAINER-->
<div>
	<!--SELECT STAGE-->
	<table id=selectStage class=inline style="" >
		<tr><th>Level 1<th>Level 2
			<!--this table styles--><style>
				#selectStage img{width:40px;vertical-align:middle}
				#selectStage th{width:220px;}
				#selectStage td{text-align:left;padding:0}
				#selectStage td[rowspan='3']{text-align:center;}
				#selectStage label{cursor:pointer;display:block;min-height:100%;padding:0.5em}
			</style>
			<?php 
				function printL2stage($class,$alias,$name,$newRow)
				{
					if($newRow){echo "<tr>";}
					echo "<td>
						<label style=color:#ccc>
							<input type=checkbox disabled id=$alias class=$class onchange=activate(this.id)> 
							<img src=img/$alias.png>
							$name
						</label>";
				}
				function printL1stage($alias,$name)
				{
					echo "<tr><td rowspan=3> 
						<label>
							<input type=checkbox id=$alias onchange=activate(this.id)> 
							<img src=img/$alias.png>$name
						</label>";
				}
				printL1stage("water","water",   "Water supply");
				printL2stage("water","waterAbs","Abstraction", false);
				printL2stage("water","waterTre","Treatment",   true);
				printL2stage("water","waterDis","Distribution",true);
				printL1stage("waste",'waste',  "Wastewater");
				printL2stage("waste","wasteCol","Collection",false);
				printL2stage("waste","wasteTre","Treatment", true);
				printL2stage("waste","wasteDis","Discharge", true);
			?>
	</table>

	<!--QUESTIONS-->
	<table class=inline id=questions style="width:45%">
		<tr><th colspan=3 style="text-align:left;font-size:16px">Additional info
		<script>
			for(stage in Global.Configuration.Questions)
			{
				document.write(""+
					"<tr><td colspan=3 style=background:#c6c6c6>"+stageName(stage)+
					" ("+Object.keys(Global.Configuration.Questions[stage]).length+" questions)"
				)
				for(question in Global.Configuration.Questions[stage])
				{
					document.write("<tr class=option family="+stage+" style=display:none><td>&emsp;&emsp; "+question+"?")
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
					document.write("<td>"+Questions.varsPerQuestion[question])
				}
			}
		</script>
			<tr><th colspan=3 style="text-align:left;font-size:16px">Water/Wastewater treatment technology
		<script>
			for(stage in Global.Configuration.Technologies)
			{
				document.write("<tr class=option family="+stage+" style=display:none><td colspan=2>&emsp; &emsp; Technology used in "+stageName(stage));
				document.write("<td><select onchange=setTechnology('"+stage+"',this.value)>");
				for(tec in Global.Configuration.Technologies[stage])
				{
					var selected = Global.Configuration.Technologies[stage][tec];
					if(selected)
						document.write("<option value='"+tec+"' selected=true>"+tec);
					else
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

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
