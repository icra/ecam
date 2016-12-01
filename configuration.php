<?php /* configuration.php */ ?>
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
	</script>
	<script>
		function init()
		{
			Sidebar.update();
			Configuration.activateLevels();
			//update linear diagram when clicking configuration
			(function()
			{
				['water','waterAbs','waterTre','waterDis','waste','wasteCol','wasteTre','wasteDis'].forEach(function(stage)
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
			updateResult();
		}
	</script>
	<style>
		h4{margin-bottom:1em}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#configuration')?></h1>
<!--SUBTITLE--><h4 style=margin:0><?php write('#configuration_subtitle')?>
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
</h4>

<div id=main>

<div>
	<!--stages-->
	<div>
		<table id=selectStage>
			<style>
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
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			event.stopPropagation();
			if(Global.Configuration.ActiveStages.water==0 && Global.Configuration.ActiveStages.waste==0)
			{
				var warning=document.querySelector("#inactive_warning")
				warning.classList.add('visible');

				//animation
				warning.style.padding="1em";
				setTimeout(function(){warning.style.padding="0.5em"},1000);
				return;
			}
			window.location="birds.php"; return;
		}
	</script>
	<button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'"><?php write('#previous')?></button><!--
	--><button class="button next" onclick=nextPage()><?php write('#next')?></button>

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

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
