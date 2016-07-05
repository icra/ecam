<?php /* configuration.php */ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		var Configuration = {}; //namespace

		/** Enable or disable stage <input type=checkbox id=id> */
		Configuration.activate=function(id)
		{
			//checkbox that has been clicked
			var checkbox=document.getElementById(id);

			if(!checkbox.checked)
			{
				if(!confirm("WARNING: All the inputs for this stage will be set to 0, and all the substages (if any) will be removed. Continue? This cannot be undone"))
				{
					checkbox.checked=true;
					return
				}
				switch(id)
				{
					case "water": 		
						this.reset(Global.Water);              
						this.reset(Global.Water.Abstraction);  Substages.Water.Abstraction=[]; 
						this.reset(Global.Water.Treatment);    Substages.Water.Treatment=[];   
						this.reset(Global.Water.Distribution); Substages.Water.Distribution=[];
						break;
					case "waste": 		
						this.reset(Global.Waste);
						this.reset(Global.Waste.Collection);   Substages.Waste.Collection=[];
						this.reset(Global.Waste.Treatment);    Substages.Waste.Treatment=[]; 
						this.reset(Global.Waste.Discharge);    Substages.Waste.Discharge=[]; 
						break;
					case "waterAbs": 	this.reset(Global.Water.Abstraction);  Substages.Water.Abstraction=[];  break;
					case "waterTre": 	this.reset(Global.Water.Treatment);    Substages.Water.Treatment=[];    break;
					case "waterDis": 	this.reset(Global.Water.Distribution); Substages.Water.Distribution=[]; break;
					case "wasteCol": 	this.reset(Global.Waste.Collection);   Substages.Waste.Collection=[];   break;
					case "wasteTre": 	this.reset(Global.Waste.Treatment);    Substages.Waste.Treatment=[];    break;
					case "wasteDis": 	this.reset(Global.Waste.Discharge);    Substages.Waste.Discharge=[];    break;
				}
			}

			//if a level 1 is deactivated, deactivate the corresponding level 2 ones
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(!checkbox.checked)
				{
					/**uncheck*/elements[i].checked=false;
					/**remove green color*/elements[i].parentNode.parentNode.style.backgroundColor="";
					/**modifiy Active Stages*/Global.Configuration.ActiveStages[elements[i].id]=0
				}
			}

			//if a level 2 stage is activated, activate L1 if not active
			if(checkbox.getAttribute('class') && checkbox.checked)
			{
				var l1=checkbox.getAttribute('class');
				/**set checked*/document.getElementById(l1).checked=true;
				this.activate(l1);
			}

			//background color: green or white
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"lightgreen":"";

			//update Active Stages
			Global.Configuration.ActiveStages[id] = checkbox.checked ? 1 : 0;

			init();
		}

		/** Set all inputs inside the object to 0 */
		Configuration.reset=function(obj)
		{
			for(var field in obj)
			{
				if(typeof(obj[field])=="number")
					obj[field]=0;
			}
			updateResult();
		}

		/** Activate stages depending on Global.Configuration.ActiveStages */
		Configuration.activateLevels=function()
		{
			for(var stage in Global.Configuration.ActiveStages)
			{
				if(Global.Configuration.ActiveStages[stage])
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
			if(typeof(object[field])=="number")
			{
				newValue=parseFloat(newValue);
				if(isNaN(newValue))newValue=0;
			}
			object[field]=newValue;
			init();
		}

		function updateUW1(newValue)
		{
			document.querySelector('#uw1').value=newValue;
			updateField(Global.General,'conv_kwh_co2',newValue);
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

		function updateCurrency()
		{
			document.getElementById('currency').innerHTML=Global.General.Currency
		}
	</script>
	<script>
		function init()
		{
			redisplayUW1menu();
			updateCurrency();
			Sidebar.update();
			updateResult();
		}
	</script>
	<style>
		h4{margin-bottom:2em}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#configuration')?></h1>
<!--SUBTITLE--><h4><?php write('#configuration_subtitle')?></h4>

<div id=main>

<div>
	<!--left: STAGES-->
	<div class=inline style=margin-left:auto>
		<table id=selectStage>
			<style>
				#selectStage img{width:40px;vertical-align:middle}
				#selectStage th{width:220px;}
				#selectStage td{text-align:left;padding:0}
				#selectStage td[rowspan='3']{text-align:center;}
				#selectStage label{cursor:pointer;display:block;min-height:100%;padding:0.5em}
			</style>
			<tr><th><?php write('#ghg_assessment')?><th><?php write('#energy_performance')?>
				<?php 
					function printL1stage($alias,$name)
					{
						echo "<tr><td rowspan=3 style=text-align:center> 
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

					printL1stage("water",$lang_json['#Water']);
					printL2stage("water","waterAbs",$lang_json["#Abstraction"], false);
					printL2stage("water","waterTre",$lang_json["#Treatment"],   true);
					printL2stage("water","waterDis",$lang_json["#Distribution"],true);

					printL1stage("waste",$lang_json['#Waste']);
					printL2stage("waste","wasteCol",$lang_json["#Collection"],false);
					printL2stage("waste","wasteTre",$lang_json["#Treatment"], true);
					printL2stage("waste","wasteDis",$lang_json["#Discharge"], true);
				?>
		</table>

		<!--activate all debug button -->
		<div style="margin:0.5em 0 0.5em 0">
			<button class=button onclick="activateAllStages()"><?php write('#configuration_activate_all')?></button>
			<script>
				function activateAllStages()
				{
					event.stopPropagation();
					['water','waste','waterAbs','waterTre','waterDis','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
					{
						Global.Configuration.ActiveStages[stage]=1;
						var checkbox = document.getElementById(stage)
						checkbox.checked=true;
						checkbox.parentNode.parentNode.style.backgroundColor="lightgreen";
					});

					Global.General.conv_kwh_co2=1;

					init();
				}
			</script>
		</div>
	</div>

	<!--right: ADDITIONAL INFO-->
	<div class=inline style="width:35%;text-align:left;margin-left:1em">
		<style> fieldset{margin:0 0 1.4em 0;padding:0.9em;border:1px solid #aaa} </style>
		<!--conv_kwh_co2-->
		<fieldset>
			<legend style=cursor:help title="<?php write('#conv_kwh_co2_expla')?>"><?php write('#conv_kwh_co2_descr')?></legend>
			<table><tr><td style=border:none>
				<select id=countryUW1 onchange=updateUW1(this.value)>
					<option value=0>--<?php write('#configuration_enter_custom_value')?>--
					<option value=0.237721212>Peru
					<option value=0.626742612>Thailand
					<option value=0.452483345>Mexico
					<option value=custom>--<?php write('#configuration_custom')?>--
				</select>
				<td style=border:none><input id=uw1 value=0 style="width:80px" onchange=updateUW1(this.value)> kg CO<sub>2</sub>/kWh
			</table>
		</fieldset>

		<!--currency: 3 letters-->
		<fieldset>
			<legend><?php write('#currency')?>: <span id=currency style="color:black;font-weight:bold"></span></legend>
			<?php write('#configuration_new_currency')?>:
			<input size=3 maxlength=3 placeholder="ccc" onchange=updateField(Global.General,"Currency",this.value)>
		</fieldset>
	</div>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin-top:4em> 
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			event.stopPropagation();
			if(Global.Configuration.ActiveStages.water==0 && Global.Configuration.ActiveStages.waste==0)
			{
				alert("<?php write('#configuration_active_stages_error')?>");
				return;
			}
			if(Global.General.conv_kwh_co2==0)
			{
				alert("<?php write('#configuration_conv_error')?>");
				document.getElementById('uw1').style.background='red'
				return;
			}
			window.location="dashboard.php"; return;
		}
	</script>
	<button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'"><?php write('#previous')?></button><!--
	--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
</div>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>Configuration.activateLevels()</script>
