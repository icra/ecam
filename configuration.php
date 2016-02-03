<?php /*configuration.php: active stages of your system*/ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>tr.option{transition:all 1.5s}</style>
	<script>
		/** Enable or disable stage <input type=checkbox id=id> */
		function activate(id)
		{
			//checkbox that has been clicked
			var checkbox=document.getElementById(id);

			//SUBLEVELS corresponding to the checkbox have classname==id
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(checkbox.checked)
				{
					/**normal color*/ elements[i].parentNode.style.color=""
				}
				else
				{
					/**uncheck*/elements[i].checked=false
					/**remove green color*/elements[i].parentNode.parentNode.style.backgroundColor=""
					/**modifiy Active Stages*/Global.Configuration["Active Stages"][elements[i].id]=0
				}
			}

			//if level 2 is activated, activate L1 if not active
			if(checkbox.getAttribute('class') && checkbox.checked)
			{
				var l1=checkbox.getAttribute('class');
				/**set checked*/document.getElementById(l1).checked=true;
				activate(l1);
			}

			//background color: green or white
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#73AD21":""

			//update Active Stages
			Global.Configuration["Active Stages"][id] = checkbox.checked ? 1 : 0
			
			//redisplay current json
			updateResult()
		}

		/** Activate stages depending on Global.Configuration["Active Stages"] */
		function activateLevels()
		{
			for(var stage in Global.Configuration["Active Stages"])
			{
				/**skip is always active*/
				switch(stage){case 'uws':continue;break;}
				if(Global.Configuration["Active Stages"][stage])
				{
					/**set checked*/document.getElementById(stage).checked=true;
					activate(stage);
				}
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
<!--sidebar--><?php include'sidebar.php'?>
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
				function printL1stage($alias,$name)
				{
					echo "<tr><td rowspan=4 style=text-align:center> 
						<label>
							<input type=checkbox id=$alias onchange=activate(this.id)> 
							<img src=img/$alias.png>$name
						</label>";
				}
				function printL2stage($class,$alias,$name,$newRow)
				{
					if($newRow){echo "<tr>";}
					echo "<td>
						<label>
							<input type=checkbox id=$alias class=$class onchange=activate(this.id)> 
							<img src=img/$alias.png>
							$name
						</label>";
				}
				printL1stage("water","Water supply");
				printL2stage("water","waterGen","Energy use and production", false);
				printL2stage("water","waterAbs","Abstraction", true);
				printL2stage("water","waterTre","Treatment",   true);
				printL2stage("water","waterDis","Distribution",true);
				printL1stage('waste',"Wastewater");
				printL2stage("waste","wasteGen","Energy use and production",false);
				printL2stage("waste","wasteCol","Collection",true);
				printL2stage("waste","wasteTre","Treatment", true);
				printL2stage("waste","wasteDis","Discharge", true);
			?>
	</table>
</div>
<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='getStarted.php'>Previous</button> 
	<button class="button next" onclick=window.location='stages.php'>Next</button>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
