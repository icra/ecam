<?php /*configuration.php: active stages of your system*/ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		var Configuration = {}; //namespace

		/** Enable or disable stage <input type=checkbox id=id> */
		Configuration.activate=function(id)
		{
			//checkbox that has been clicked
			var checkbox=document.getElementById(id);

			//if a level 1 is deactivated, deactivate the corresponding level 2 ones
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(!checkbox.checked)
				{
					/**uncheck*/elements[i].checked=false;
					/**remove green color*/elements[i].parentNode.parentNode.style.backgroundColor="";
					/**modifiy Active Stages*/Global.Configuration["Active Stages"][elements[i].id]=0
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
			Global.Configuration["Active Stages"][id] = checkbox.checked ? 1 : 0;

			init();
		}

		/** Activate stages depending on Global.Configuration["Active Stages"] */
		Configuration.activateLevels=function()
		{
			for(var stage in Global.Configuration["Active Stages"])
			{
				if(Global.Configuration["Active Stages"][stage])
				{
					console.log(stage)
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

		function updateQuestionsTable()
		{
			var t = document.querySelector('#questions');
			while(t.rows.length>0)t.deleteRow(-1);

			for(var question in Global.Configuration["Yes/No"])
			{
				var currentAnswer = Global.Configuration["Yes/No"][question];
				var checked = currentAnswer ? "checked":"";
				var newRow = t.insertRow(-1);
				newRow.insertCell(-1).innerHTML=translate(question)+"?";
				newRow.insertCell(-1).innerHTML=(function()
				{
					var as = Global.Configuration['Active Stages'];
					switch(question)
					{
						case "valorizing_biogas":
							if(Global.Configuration["Yes/No"]["producing_biogas"]==0)
							{
								makeInactive(question,newRow);
								newRow.title="<?php write('#configuration_only_if')?> ['producing_biogas'] is [<?php write('#yes')?>]";
								return "<?php write('#Inactive')?>";
							}
							break;
						case "producing_biogas":
							if(as.waste==0 && as.wasteTre==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [ww] or [wwt]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "producing_energy_waterAbs":
							if(as.waterAbs==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [wsa]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "engines_in_water":
							if(as.water==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [ws]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "engines_in_waste":
							if(as.waste==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [ww]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "truck_transport_waste":
							if(as.waste==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [ww]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "topographic_energy":
							if(as.waterDis==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [wsd]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
						case "industrial_wasteTre":
							if(as.wasteTre==0)
							{
								makeInactive(question,newRow);
								newRow.title= "<?php write('#configuration_only_if')?> [wwt]"; 
								return "<?php write('#Inactive')?>";
							}
							break;
					}
					//above code works but it should be moved

					var ret="<label>"+
							"<?php write('#no')?> "+
							"<input name='"+question+"' type=radio value=0 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" checked></label> "+
							"<label><?php write('#yes')?> "+
							"<input name='"+question+"' type=radio value=1 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" "+checked+"></label> ";
					return ret;
				})();
			}
		}

		function makeInactive(question,newRow)
		{
			Global.Configuration["Yes/No"][question]=0;
			newRow.style.backgroundColor='#f6f6f6';
			newRow.style.color='#aaa';
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
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#configuration')?></h1>
<!--SUBTITLE--><h4><?php write('#configuration_subtitle')?></h4>
<div style="padding:0;margin-bottom:1em;background:#d7bfaf;height:5px"></div>

<!--container-->
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

					printL1stage("water",$Languages[$lang]['#Water']);
					printL2stage("water","waterAbs",$Languages[$lang]["#Abstraction"], false);
					printL2stage("water","waterTre",$Languages[$lang]["#Treatment"],   true);
					printL2stage("water","waterDis",$Languages[$lang]["#Distribution"],true);

					printL1stage("waste",$Languages[$lang]['#Waste']);
					printL2stage("waste","wasteCol",$Languages[$lang]["#Collection"],false);
					printL2stage("waste","wasteTre",$Languages[$lang]["#Treatment"], true);
					printL2stage("waste","wasteDis",$Languages[$lang]["#Discharge"], true);
				?>
		</table>

		<!--activate all debug button -->
		<div style="margin:0.5em 0 0.5em 0">
			<button class=button onclick="activateAllStages()"><?php write('#configuration_activate_all')?></button>
			<script>
				function activateAllStages()
				{
					event.stopPropagation();
					['waterAbs','waterTre','waterDis','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
					{
						/**set checked*/document.getElementById(stage).checked=true;
						Configuration.activate(stage);
					});
					Global.General.conv_kwh_co2=1;
					for(var question in Global.Configuration['Yes/No'])
					{
						Global.Configuration['Yes/No'][question]=1;
					}
					init();
				}
			</script>
		</div>
	</div>

	<!--right: ADDITIONAL INFO-->
	<div class=inline style="width:50%;text-align:left;margin-left:1em">
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
				<td style=border:none> <input style=width:80px id=uw1 value=0 onchange=updateUW1(this.value)> kg CO<sub>2</sub>/kWh
			</table>
		</fieldset>

		<!--currency: 3 letters-->
		<fieldset>
			<legend><?php write('#currency')?>: <span id=currency style="color:black;font-weight:bold"></span></legend>
			<?php write('#configuration_new_currency')?>:
			<input size=3 maxlength=3 placeholder="ccc" onchange=updateField(Global.General,"Currency",this.value)>
		</fieldset>

		<!--questions-->
		<fieldset>
			<legend><?php write('#configuration_additional_questions')?> (<a href=questions.php>info</a>)</legend>
			<table id=questions>
				<style>
					#questions td{padding:0.65em;border-top:none;border-left:none;border-right:none}
				</style>
			</table>
		</fieldset>

		<!--fuel-->
		<fieldset id=fuel style=display:none>
			<legend><?php write('#configuration_fuel_options')?> (<a href=fuelInfo.php>info</a>)</legend>
			<table id=fuelSelection class=inline>
				<style>
					#fuelSelection tr.inactive {background:#ccc;color:#999}
				</style>
				<tr><th><?php write('#configuration_stage')?><th><?php write('#configuration_selected_fuel')?>
				<tr stage=water>   <td><?php write('#ghg_assessment')?> - <?php write('#Water')?> (<?php write('#configuration_engines')?>)
				<tr stage=waste>   <td><?php write('#ghg_assessment')?> - <?php write('#Waste')?> (<?php write('#configuration_engines')?>)
				<tr stage=wasteTre><td><?php write('#energy_performance')?> - <?php write('#Waste')?>:<?php write('#Treatment')?> (<?php write('#configuration_vehicles')?>)
			</table>
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
			if(Global.Configuration['Active Stages'].water==0 && Global.Configuration['Active Stages'].waste==0)
			{
				alert("<?php write('#configuration_active_stages_error')?>");
				return;
			}
			window.location="birds.php"; return;
		}
	</script>
	<button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'"><?php write('#previous')?></button><!--
	--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script> Configuration.activateLevels(); </script>
