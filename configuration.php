<?php /*configuration.php: active stages of your system*/ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		var Configuration = {};
		/** Enable or disable stage <input type=checkbox id=id> */

		Configuration.activate=function(id)
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
				this.activate(l1);
			}

			//background color: green or white
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"lightgreen":""

			//update Active Stages
			Global.Configuration["Active Stages"][id] = checkbox.checked ? 1 : 0

			init();
		}

		/** Activate stages depending on Global.Configuration["Active Stages"] */
		Configuration.activateLevels=function()
		{
			for(var stage in Global.Configuration["Active Stages"])
			{
				/**skip is always active*/
				switch(stage){case 'uws':continue;break;}
				if(Global.Configuration["Active Stages"][stage])
				{
					/**set checked*/document.getElementById(stage).checked=true;
					this.activate(stage);
				}
			}
		}
	</script>
	<script>
		/**
		  * Functions related to Additional info
		  *
		  */

		/** Modify any field of Global and init() */
		function updateField(object,field,newValue)
		{
			if(typeof(object[field])=="number"){newValue=parseFloat(newValue);}
			object[field]=newValue;
			init();
		}

		function updateQuestionsTable()
		{
			var t = document.querySelector('#questions');
			while(t.rows.length>0)t.deleteRow(-1);
			for(var question in Global.Configuration["Yes/No"])
			{
				//check for biogas valorised
				if(Global.Configuration["Yes/No"]["Are you producing biogas"]==0 && question=="Are you valorizing biogas")
				{
					Global.Configuration["Yes/No"]["Are you valorizing biogas"]=0;
					continue;
				}

				var currentAnswer = Global.Configuration["Yes/No"][question];
				var checked = currentAnswer ? "checked":"";
				var newRow = t.insertRow(-1);
				newRow.insertCell(-1).innerHTML=question+"?"
				newRow.insertCell(-1).innerHTML=(function()
				{
					var r="<label>No "+
							"<input name='"+question+"' type=radio value=0 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" checked></label> "+
							"<label>Yes "+
							"<input name='"+question+"' type=radio value=1 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" "+checked+"></label> ";
					return r;
				})();
			}
		}

		function updateUW1(newValue)
		{
			document.querySelector('#uw1').value=newValue;
			updateField(Global.General,'conv_kwh_co2',newValue);
		}

		function updateFuelSelectionVisibility()
		{
			//if engines or transport is on, make fuel selection visible

			var engines = Global.Configuration["Yes/No"]["Do you have fuel engines to run pumps"];
			var transport = Global.Configuration["Yes/No"]["Are you using truck transport to convey sludge to the disposal site"];
			var display = (engines || transport) ? "" : "none";
			document.querySelector('#fuel').style.display=display;
		}

		function redisplayUW1menu()
		{
			//input element
			document.querySelector('#uw1').value=Global.General.conv_kwh_co2;
			//select element
			var select = document.querySelector('#countryUW1');
			//go over options and select the one with same value as uw1
			for(var i=1;i<select.childNodes.length;i++)
			{
				if(parseFloat(select.childNodes.item(i).value)==Global.General.conv_kwh_co2)
				{
					select.childNodes.item(i).setAttribute('selected','true');
					return;
				}
			}
			//if we go out of the list make it custom
			select.value="custom";
		}

		function updateFuelSelection()
		{
			['water','waste','wasteTre'].forEach(function(stage)
			{
				var row = document.querySelector('#fuelSelection tr[stage='+stage+']')

				while(row.cells.length>1){row.deleteCell(-1);}

				//new select menu
				var select = document.createElement('select');
				row.insertCell(-1).appendChild(select);

				select.setAttribute('onchange',"updateField(Global.Configuration.Selected['Fuel type'],'"+stage+"',this.value)");

				if(Global.Configuration["Active Stages"][stage]==0)
				{
					select.disabled=true;
					select.parentNode.parentNode.title="Inactive stage";
					select.parentNode.parentNode.className="inactive"
				}
				else
					select.parentNode.parentNode.className=""

				//go over fuel types
				for(var fuel in Tables['Fuel types'])
				{
					var option = document.createElement('option');
					option.innerHTML=fuel;
					if(fuel==Global.Configuration.Selected["Fuel type"][stage])
					{
						option.setAttribute('selected','true')
					}
					select.appendChild(option)
				}
			});
		}

		function updateCurrency()
		{
			document.getElementById('currency').innerHTML=Global.General.Currency
		}
	</script>
	<script>
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
		function init()
		{
			redisplayUW1menu();
			updateCurrency();
			updateFuelSelectionVisibility();
			updateFuelSelection();
			updateQuestionsTable();
			Sidebar.update();
			updateResult();
		}
	</script>
	<style>
		fieldset{margin:0 0 1.5em 0;padding:0.8em;border:1px solid #aaa}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Configuration</h1>

<!--activate all
-->
<div style=margin:0.5em>
	<button class=button onclick="activateAllStages()">activate all</button>
	<script>
		function activateAllStages()
		{
			event.stopPropagation();
			['waterGen','waterAbs','waterTre','waterDis','wasteGen','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
			{
				/**set checked*/document.getElementById(stage).checked=true;
				Configuration.activate(stage);
			});
			Global.General.conv_kwh_co2=1;
			Global.Configuration['Yes/No']["Are you producing biogas"]=1;
			Global.Configuration['Yes/No']["Are you valorizing biogas"]=1;
			Global.Configuration['Yes/No']["Are you producing electrical energy"]=1;
			Global.Configuration['Yes/No']["Do you have fuel engines to run pumps"]=1;
			Global.Configuration['Yes/No']["Are you using truck transport to convey sludge to the disposal site"]=1;
			Global.Configuration['Yes/No']["Is your topography flat"]=1;
			Global.Configuration['Yes/No']["Is any untreated industrial or commercial wastewater connected"]=1;
			init();
		}
	</script>
<div>

<!--SUBTITLE--><h4>Click on the left table to activate stages. The table on the right contains additional information about your system</h4>

<!--CONFIGURATION (STAGES)-->
<div class=inline style=margin-right:2em>
	<!--SELECT STAGE-->
	<table id=selectStage class=inline>
		<style>
			#selectStage img{width:40px;vertical-align:middle}
			#selectStage th{width:220px;}
			#selectStage td{text-align:left;padding:0}
			#selectStage td[rowspan='3']{text-align:center;}
			#selectStage label{cursor:pointer;display:block;min-height:100%;padding:0.5em}
		</style>
		<tr><th>Preview <th>Insight
			<?php 
				function printL1stage($alias,$name)
				{
					echo "<tr><td rowspan=4 style=text-align:center> 
						<label>
							<input type=checkbox id=$alias onchange=Configuration.activate(this.id)> 
							<img src=img/$alias.png> $name
						</label>";
				}
				function printL2stage($class,$alias,$name,$newRow)
				{
					if($newRow){echo "<tr>";}
					echo "<td>
						<label>
							<input type=checkbox id=$alias class=$class onchange=Configuration.activate(this.id)> 
							<img src=img/$alias.png> $name
						</label>";
				}

				printL1stage("water","Water supply");
				printL2stage("water","waterGen","General",     false);
				printL2stage("water","waterAbs","Abstraction", true);
				printL2stage("water","waterTre","Treatment",   true);
				printL2stage("water","waterDis","Distribution",true);

				printL1stage('waste',"Wastewater");
				printL2stage("waste","wasteGen","General",   false);
				printL2stage("waste","wasteCol","Collection",true);
				printL2stage("waste","wasteTre","Treatment", true);
				printL2stage("waste","wasteDis","Discharge", true);
			?>
	</table>
</div>

<!--QUESTIONS & ADDITIONAL INFO-->
<div style=text-align:left class=inline>
	<!--conv_kwh_co2-->
	<fieldset>
		<legend> Conversion factor for grid electricity (<a href=variable.php?id=conv_kwh_co2>info</a>) </legend>
		<table><tr><th>
			<select id=countryUW1 onchange=updateUW1(this.value)>
				<option value=0>--enter custom value or select country--
				<option value=0.237721212>Peru
				<option value=0.626742612>Thailand
				<option value=0.452483345>Mexico
				<option value=custom>--CUSTOM--
			</select>
			<td>Current value <input style=width:80px id=uw1 value=0 onchange=updateUW1(this.value)> (kg CO<sub>2</sub>)/kWh
		</table>
	</fieldset>

	<!--currency: 3 letters-->
	<fieldset>
		<legend>Currency: <span id=currency></span></legend>
		Write new currency (3 letters max):
		<input size=3 maxlength=3 placeholder="new" onchange=updateField(Global.General,"Currency",this.value)>
	</fieldset>

	<!--questions-->
	<fieldset>
		<legend>Additional questions (<a href=questions.php>info</a>)</legend>
		<table id=questions>
			<style>
				#questions td{border-top:none;border-left:none;border-right:none}
			</style>
		</table>
	</fieldset>

	<!--fuel-->
	<fieldset id=fuel style=display:none>
		<legend>Fuel options (<a href=fuelInfo.php>info</a>)</legend>
		<table id=fuelSelection class=inline>
			<style>
				#fuelSelection tr.inactive {background:#ccc;color:#999}
			</style>
			<tr><th>Stage<th>Selected Fuel type
			<tr stage=water>   <td>Level 1 - Water supply (engines)
			<tr stage=waste>   <td>Level 1 - Wastewater (engines)
			<tr stage=wasteTre><td>Level 2 - Wastewater treatment (vehicles)
		</table>
	</fieldset>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin-top:4em> 
	<button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'">Previous</button> 
	
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			event.stopPropagation();

			//window.location="birds.php"; return;

			if(Global.Configuration['Active Stages'].water==1){window.location="edit.php?level=Water";return;}
			if(Global.Configuration['Active Stages'].waste==1){window.location="edit.php?level=Waste";return;}
			alert("ERROR! There are no active stages. Click on the left table to activate them.");
		}
	</script>
	<button class="button next" onclick=nextPage()>Next</button>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script> Configuration.activateLevels(); </script>
