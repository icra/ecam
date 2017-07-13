<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		var Configuration = {}; //namespace

		/** Enable or disable stage <input type=checkbox id=id> */
		Configuration.activate=function(id)
		{
			//hide warning "all inactive"
			document.querySelector("#inactive_warning").classList.remove('visible');

			//checkbox that has been clicked
			var checkbox=document.getElementById(id);

			//update Active Stages
			Global.Configuration.ActiveStages[id]=checkbox.checked ? 1 : 0;

			//reset all variables to zero if !checked
			if(!checkbox.checked)
			{
				//if(!confirm("WARNING: All the inputs for this stage will be set to 0, and all the substages (if any) will be removed. Continue? This cannot be undone"))
				if(0)
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
			if(["water","waste"].indexOf(id)>-1 && !checkbox.checked)
			{
				var elements=document.querySelectorAll("table#selectStage input[class="+id+"]")
				for(var i=0;i<elements.length;i++)
				{
					var alias=elements[i].id;
					elements[i].checked=false;
					this.activate(alias);
				}
			}

			//if a level 2 stage is activated, activate L1 if not active
			if(["waterAbs","waterTre","waterDis","wasteCol","wasteTre","wasteDis"].indexOf(id)>-1 && checkbox.checked)
			{
				var l1=checkbox.getAttribute('class');
				document.getElementById(l1).checked=true;
				this.activate(l1);
			}

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

		/** set visuals depending on Global.Configuration.ActiveStages */
		Configuration.activateLevels=function()
		{
			for(var stage in Global.Configuration.ActiveStages)
			{
				if(stage=="")continue;
				if(Global.Configuration.ActiveStages[stage]==1)
				{
					/**set checked*/document.getElementById(stage).checked=true;
					/**set checked*/document.getElementById(stage).parentNode.style.backgroundColor='lightgreen'
					/**set checked*/document.getElementById(stage).parentNode.parentNode.style.backgroundColor='lightgreen'
				}
				else if(Global.Configuration.ActiveStages[stage]==0)
				{
					/**set checked*/document.getElementById(stage).checked=false;
					/**set checked*/document.getElementById(stage).parentNode.style.backgroundColor=''
					/**set checked*/document.getElementById(stage).parentNode.parentNode.style.backgroundColor=''
				}
			}
		}

		Configuration.defaults=function()
		{
			//default country
			document.querySelector('#country').value=Global.General.Country;

			var variables=document.querySelectorAll('table#general_inputs input[id]');
			for(var i=0;i<variables.length;i++)
			{
				var id=variables[i].id;
				var loc=locateVariable(id);
				var obj = loc.sublevel ? Global[loc.level][loc.sublevel] : Global[loc.level];
				//update value
				variables[i].value=obj[id]
			}

			//default anyFuelEngines
			if(Global.General.anyFuelEngines)
				document.querySelector("input[name=anyFuelEngines][ans='1']").checked=true;
		}
	</script>
	<script>
		function init()
		{
			Sidebar.update();
			Configuration.activateLevels();
			Configuration.defaults();
			//update linear diagram when clicking configuration
			(function()
			{
				['waterAbs','waterTre','waterDis','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
				{
					var img=document.querySelector('#linearDiagram img[stage='+stage+']')
					if(Global.Configuration.ActiveStages[stage])
					{
						img.src="img/"+stage+".png";
						img.classList.remove('inactive');
					}
					else
					{
						img.src="img/"+stage+"-off.png";
						img.classList.add('inactive');
					}
				})
			})();
			Caption.listeners();
			showGWPconstants();
			updateResult();
		}

		//update a field
		function update(obj,field,newValue) {
			newValue=parseFloat(newValue);
			if(isNaN(newValue))newValue=0;
			obj[field]=newValue;
			init();
		}
	</script>
	<style> h4{margin-bottom:1em} </style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--> <?php include'navbar.php' ?>
<!--linear--> <?php include'linear.php' ?>
<!--caption--><?php include'caption.php'?>
<!--title--><h1><?php write('#configuration')?></h1>
<!--subtitle--><h4 style=margin:0;margin-bottom:1em><?php write('#configuration_subtitle')?></h4>

<!--main container-->
<div id=main>

<!--activate stages table-->
<div class=inline style="max-width:50%">
	<!--stages-->
	<div>
		<table id=selectStage>
			<style>
				#selectStage {
					box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05);
				}
				#selectStage img{width:40px;vertical-align:middle}
				#selectStage th{width:220px;}
				#selectStage td{text-align:left;padding:0}
				#selectStage td[rowspan='3']{text-align:center;}
				#selectStage label{cursor:pointer;display:block;min-height:100%;padding:0.5em}
			</style>
			<tr>
				<th><?php write('#quick_assessment')?>
				<th><?php write('#energy_performance')?>
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
	</div>

	<!--btn activate all-->
	<div>
		<button class=button onclick="activateAllStages()"><?php write('#configuration_activate_all')?></button>
		<script>
			function activateAllStages()
			{
				event.stopPropagation();
				['water','waste','waterAbs','waterTre','waterDis','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
				{
					var checkbox=document.querySelector("table#selectStage #"+stage).checked=true
					Configuration.activate(stage)
				});
			}
		</script>
	</div>
</div>

<!--other questions-->
<div class=inline style="max-width:45%;padding:0em 1em 1em 1em">
	<style> 
		#main fieldset{margin:0 0 1.4em 0;padding:0.9em;border:1px solid #aaa} 
	</style>

	<!--select country-->
	<fieldset>
		<legend>Select country
			<select id=country onchange=selectCountry(this)>
				<option value="false">--select--</option>
				<script>for(var country in Countries){document.write("<option>"+country)}</script>
			</select>
			<a href=countries.php>Info</a>
			<script>
				function selectCountry(select)
				{
					var country=select.value
					if(country=="false") return;
					Global.General.Country=country;
					Global.Configuration.Selected.wwc_prot_con=country;
					['conv_kwh_co2','wwc_prot_con','wwc_bod_pday'].forEach(function(code)
					{
						var input=document.querySelector("table#general_inputs input#"+code)
						input.value=Countries[country][code];
						input.onchange();
					});
					init();
				}
			</script>
		</legend>

		<table id=general_inputs>
			<tr>
				<td><?php write('#conv_kwh_co2_descr')?>
				<td><input id=conv_kwh_co2 onchange="update(Global.General,'conv_kwh_co2',this.value)">
				<td>kg<sub>CO<sub>2</sub></sub>/kWh
			<tr>
				<td><?php write('#wwc_prot_con_descr')?>
				<td><input id=wwc_prot_con onchange="update(Global.Waste.Collection,'wwc_prot_con',this.value)">
				<td>kg/person/year
			<tr>
				<td><?php write('#wwc_bod_pday_descr')?>
				<td><input id=wwc_bod_pday onchange="update(Global.Waste.Collection,'wwc_bod_pday',this.value)">
				<td>g/person/day
		</table>

	</fieldset>

	<!--fuel engines in any stage-->
	<fieldset>
		<legend>Do you have fuel engines in any stage?</legend>
		<label> No  <input type=radio name=anyFuelEngines ans=0 onclick=update(Global.General,this.name,0) checked></label> &emsp; 
		<label> Yes <input type=radio name=anyFuelEngines ans=1 onclick=update(Global.General,this.name,1)></label>
	</fieldset>

	<!--global warming potential-->
	<?php include'gwp.php'?>
</div>

<!--prev & next buttons-->
<div style=margin:1em> 
	<button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'"><?php write('#previous')?></button><!--
	--><button class="button next" onclick="event.stopPropagation();window.location='inhabitants.php'"><?php write('#next')?></button>

	<div id=inactive_warning>
		<b><?php write('#configuration_active_stages_error')?></b>
	</div>
	<style>
		#inactive_warning {
			background:red;
			transition:all 1s;
			display:none;
		}
		#inactive_warning.visible {
			display:block;
		}
	</style>
</div>

</div>

<!--json--><?php include'currentJSON.php'?>
