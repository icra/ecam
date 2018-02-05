<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body {background:#F5ECCE}
		h1{
			background:white;
			border:none;
			box-shadow:0 1px 2px rgba(0,0,0,.5);
			line-height:2.1em;
			text-align:left;
		}
		/*
			legend colors for graphs
		*/
		span.circle{display:none}
		span.circle{float:right}
	</style>
	<style>
		table#inputs th, #inputs td {text-align:left;}
		#inputs th, #inputs td {border-left:none;border-right:none}
		#inputs input.edited {background:lightgreen;}
		#inputs td.input, #inputs td.output {
			width:70px;
			border:1px solid #aaa;
			color:#666;
			background:#eee;
			padding:0 !important;
		}
		#inputs input[id] {
			background:inherit;
			border:none;
			text-align:right;
			cursor: cell;
			line-height:1em;
			width:95%;
			height:24px;
			display:block;
		}
		#inputs input[type=radio] {
			display:auto;
			line-height:1em;
			width:95%;
			height:24px;
			padding:0.2em;
		}
		#inputs input:focus {
			background:white;
		}
		#inputs tr.hidden {display:none}
		/**indication "not active"**/
		#inputs tr[indic]{text-align:center;color:#999;background:#eee}
	</style>
	<style>
		b[caption]{cursor:default}
	</style>
	<script>
		function init() {
			BEV.showActive();
			BEV.updateDefaults();
			BEV.defaultQuestions();
			BEV.defaultSludge();

			//default treatment type
			document.querySelector('#main_treatment_type').value=Global.Waste.Treatment.wwt_type_tre;

			drawCharts();
			updateResult();
			Caption.listeners();

			//first input click
			var first=document.querySelector('#inputs input[id]');
			if(first.value=="0") first.click()
		}

		function drawCharts() {
			Graphs.ghg_by_source(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.ws_cost('graph3');
			Graphs.ww_cost('graph4');
			Graphs.gauge('graph5', Global.Water.ws_SL_serv_pop()||0, translate("ws_SL_serv_pop_descr"));
			Graphs.gauge('graph6', Global.Waste.ww_SL_serv_pop()||0, translate("ww_SL_serv_pop_descr"));
			Graphs.gauge('graph7', Global.Water.Distribution.wsd_SL_nr_water()||0, translate("wsd_SL_nr_water_descr"));
			Graphs.gauge('graph8', Global.Water.ws_SL_auth_con()||0, translate("ws_SL_auth_con_descr"),Info.ws_SL_auth_con.unit,0,200); //with unit and limits
		}

		var BEV={}; //'Birds Eye View' namespace

		//Generic f for updating internal values
		BEV.update=function(obj,field,newValue) {
			if(obj[field]===undefined) { alert('field '+field+' undefined'); return; }
			//newValue may be a string from input.value, it should be a float
			newValue=parseFloat(newValue);
			obj[field]=newValue;
		}

		//Specific behaviour for each formula when user inputs data
		BEV.updateField=function(input)
		{
			//get info from the input element
			var field = input.id;
			var value = parseFloat(input.value.replace(",","")); //replace commmas for copy paste easyness

			value*=Units.multiplier(field);

			//if value is not a number, set to zero
			if(isNaN(value))value=0;

      console.log(value);

			//get L1 name: "Water" or "Waste"
			var L1 = field.search("ws")==0 ? "Water" : "Waste";
			var L2 = false;
			L2 = field.search("wsa_")==0 ? "Abstraction"  : L2;
			L2 = field.search("wst_")==0 ? "Treatment"    : L2;
			L2 = field.search("wsd_")==0 ? "Distribution" : L2;
			L2 = field.search("wwc_")==0 ? "Collection"   : L2;
			L2 = field.search("wwt_")==0 ? "Treatment"    : L2;
			L2 = field.search("wwd_")==0 ? "Discharge"    : L2;

			//update
			if(L2)
				this.update(Global[L1][L2],field,value);
			else
				this.update(Global[L1],field,value);

			//add a color to the field
			input.classList.add('edited');
			init();
		}

		//Display default values from the table
		BEV.updateDefaults=function()
		{
			var inputs = document.querySelectorAll('#inputs input');
			for(var i=0; i<inputs.length; i++)
			{
				var input = inputs[i];
				var field = input.id; 

				//set the longer description in the input <td> element
				input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');

				var L1 = field.search("ws")==0 ? "Water" : "Waste";
				var L2 = false;
				L2 = field.search("wsa_")==0 ? "Abstraction"  : L2;
				L2 = field.search("wst_")==0 ? "Treatment"    : L2;
				L2 = field.search("wsd_")==0 ? "Distribution" : L2;
				L2 = field.search("wwc_")==0 ? "Collection"   : L2;
				L2 = field.search("wwt_")==0 ? "Treatment"    : L2;
				L2 = field.search("wwd_")==0 ? "Discharge"    : L2;

				//the value we are going to put in the input
				var value = L2 ? Global[L1][L2][field] : Global[L1][field];
				if(typeof(value)=="function"){
					var value = L2 ? Global[L1][L2][field]() : Global[L1][field]();
				}
				if(!value)value=0;
				value/=Units.multiplier(field);
				//set the value
				input.value=format(value);
			}
		}

		//producing biogas and valorizing biogas default values
		BEV.defaultQuestions=function() 
		{
			//valorizing
			var val = Global.Configuration["Yes/No"].wwt_valorizing_biogas;
			//producing
			var pro = Global.Configuration["Yes/No"].wwt_producing_biogas;

			if(pro)
			{
				document.querySelector('input[name=wwt_producing_biogas][ans="1"]').checked=true;
			}
			else
			{
				document.querySelector('input[name=wwt_valorizing_biogas][ans="0"]').checked=true;
				Global.Configuration["Yes/No"].wwt_valorizing_biogas=0;
			}
			if(val && pro)
			{
				document.querySelector('input[name=wwt_valorizing_biogas][ans="1"]').checked=true;
			}
		}

		BEV.defaultSludge=function()
		{
			document.querySelector('#sludge_estimation').value=Global.Configuration.Selected.sludge_estimation_method;
		}

		BEV.updateQuestion=function(code,newValue)
		{
			Global.Configuration['Yes/No'][code]=newValue;
			init();
		}

		//only show water/wastewater inputs if active
		BEV.showActive=function() {
			['water','waste'].forEach(function(stage) {
				if(Global.Configuration.ActiveStages[stage]==1) {
					//show all rows with stage=stage
					var rows = document.querySelectorAll('#inputs tr[stage='+stage+']');
					for(var i=0; i<rows.length; rows[i++].classList.remove('hidden')){}
				}else{
					//show "Stage not active"
					document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
				}
			});
			BEV.hideFuelConsumed();
		}

		BEV.hideFuelConsumed=function()
		{
			if(Global.General.anyFuelEngines==0)
			{
				['ws_vol_fuel','ww_vol_fuel'].forEach(function(field)
				{
					document.querySelector('#inputs tr[stage] input[id='+field+']').parentNode.parentNode.classList.add('hidden');
				});
			}
		}
	</script>
	<script>
		//"fake" input that updates an output
		BEV.updateOutput=function(input)
		{
			var field=input.id;
			var value=parseFloat(input.value)*Units.multiplier(field);
			//spred the value among the stages
			//get L1 name: "Water" or "Waste"
			var L1=field.search("ws_")==0 ? "Water" : "Waste";
			if(L1=="Water")
			{
				//count active stages
				var wsa=Global.Configuration.ActiveStages.waterAbs;
				var wst=Global.Configuration.ActiveStages.waterTre;
				var wsd=Global.Configuration.ActiveStages.waterDis;
				var n=wsa+wst+wsd;
				if(n==0){alert("Error: no Water stages active, go back to Configuration");return}
				Global.Water.Abstraction [field.replace("ws_","wsa_")]=wsa*value/n;
				Global.Water.Treatment   [field.replace("ws_","wst_")]=wst*value/n;
				Global.Water.Distribution[field.replace("ws_","wsd_")]=wsd*value/n;
			}
			else if(L1=="Waste")
			{
				//count active stages
				var wwc=Global.Configuration.ActiveStages.wasteCol;
				var wwt=Global.Configuration.ActiveStages.wasteTre;
				var wwd=Global.Configuration.ActiveStages.wasteDis;
				var n=wwc+wwt+wwd;
				if(n==0){alert("Error: no Wastewater stages active, go back to Configuration");return}
				Global.Waste.Collection[field.replace("ww_","wwc_")]=wwc*value/n;
				Global.Waste.Treatment [field.replace("ww_","wwt_")]=wwt*value/n;
				Global.Waste.Discharge [field.replace("ww_","wwd_")]=wwd*value/n;
			}
			input.classList.add('edited');
			init();
		}
	</script>
</head><body>

<center>
	<!--sidebar--><?php include'sidebar.php'?>
	<!--navbar--><?php include'navbar.php'?>
	<!--linear--><?php include'linear.php'?>
	<!--caption--><?php include'caption.php'?>
</center>

<!--TITLE-->
<h1>
	<?php write('#quick_assessment')?>
	&mdash;
	<?php write('#initial_estimation_description')?>
	<span style="font-size:13px;color:#666;float:right">
		<span><a href=variable.php?id=Days>        <?php write('#assessment_period')?></a>
		<script>document.write(Global.General.Days())</script> <?php write('#days')?></span>
		·
		<span><a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>
			<script>
				(function(){
					var c = Global.General.conv_kwh_co2;
					var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' caption='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+" &#9888;</span>" : format(c); 
					document.write(str)
				})();
			</script> kg CO<sub>2</sub>/kWh
		</span>
	</span>
</h1>

<!--content-->
<div>
	<div class=inline style=width:35%>
		<!--inputs-->
		<div class="card"><?php cardMenu($lang_json['#inputs'].' &mdash; '.$lang_json['#enter_values'])?>
			<!--table-->
			<table id=inputs style=width:100%>
				<!--WATER-->
				<tr><th colspan=3 style="background:#0aaff1">
					<img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>

					<!--water population-->
					<span style=float:right>
						<img src=img/inhabitants.png width=25 caption="Water supply population" style=vertical-align:middle>
            <b caption="<?php write('#ws_serv_pop_descr')?>" id=ws_serv_pop onclick=window.location='inhabitants.php'>0</b> /
            <b caption="<?php write('#ws_resi_pop_descr')?>" id=ws_resi_pop onclick=window.location='inhabitants.php'>0</b>
            <script>
              document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop);
              document.querySelector('#ws_resi_pop').innerHTML=format(Global.Water.ws_resi_pop);
            </script>
            <style>
              #ws_serv_pop, #ws_resi_pop { cursor:pointer; }
            </style>
					</span>

					<tr stage=water class=hidden><td style=width:40%><?php write('#nrg_cons')?><td class=output><input id='ws_nrg_cons' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ws_nrg_cons'].unit)</script>
					<tr stage=water class=hidden><td><?php write('#vol_fuel')?><td class=output><input id='ws_vol_fuel' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ws_vol_fuel'].unit)</script>

					<tr stage=water class=hidden> <td><?php write('#wsd_vol_dist_descr')?><td class=input><input id='wsd_vol_dist' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
					<tr stage=water class=hidden><td><?php write('#wsd_auth_con_descr')?> <td class=input><input id='wsd_auth_con' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
					<tr stage=water class=hidden><td><?php write('#wsd_bill_con_descr')?> <td class=input><input id='wsd_bill_con' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>

					<tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td class=input><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
					<tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td class=input><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
					<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
				<!--WASTEWATER-->
				<tr><th colspan=3 style=background:#d71d24>
					<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>

					<!--wastewater population-->
					<span style=float:right>
						<img src=img/inhabitants.png width=25 caption="Wastewater population" style="vertical-align:middle">
            <b caption="<?php write('#ww_serv_pop_descr')?>" id=ww_serv_pop onclick=window.location='inhabitants.php'>0</b> /
            <b caption="<?php write('#ww_conn_pop_descr')?>" id=ww_conn_pop onclick=window.location='inhabitants.php'>0</b> /
            <b caption="<?php write('#ww_resi_pop_descr')?>" id=ww_resi_pop onclick=window.location='inhabitants.php'>0</b>
            <script>
              document.querySelector('#ww_serv_pop').innerHTML=format(Global.Waste.ww_serv_pop);
              document.querySelector('#ww_conn_pop').innerHTML=format(Global.Waste.ww_conn_pop);
              document.querySelector('#ww_resi_pop').innerHTML=format(Global.Waste.ww_resi_pop);
            </script>
            <style>
              #ww_serv_pop, #ww_conn_pop, #ww_resi_pop { cursor:pointer; }
            </style>
					</span>

					<!--energy consumed from the grid-->
					<tr stage=waste class=hidden><td><?php write('#ww_nrg_cons_descr') ?><td class=output><input id='ww_nrg_cons' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ww_nrg_cons'].unit)</script>

					<!--volume of fuel consumed-->
					<tr stage=waste class=hidden><td><?php write('#vol_fuel')?><td class=output><input id='ww_vol_fuel' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ww_vol_fuel'].unit)</script>

					<!--treated wastewater volume-->
					<tr stage=waste class=hidden><td><?php write('#wwt_vol_trea_descr')?><td class=input><input id='wwt_vol_trea' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>

					<!--discharged wastewater volume-->
					<tr stage=waste class=hidden><td><?php write('#wwd_vol_disc_descr')?><td class=input><input id='wwd_vol_disc' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>

					<!--energy costs-->
					<tr stage=waste class=hidden><td><?php write('#birds_ww_run_cost')?><td class=input><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
					<tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cost')?><td class=input><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>

					<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>

					<!--wwt n2o in effluent-->
					<tr stage=waste class=hidden>
						<td><?php write('#birds_ww_n2o_effl')?> 
						<td class=input><input id='wwd_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
							<span class=circle style=background:#b8879d></span>
						</td>
					</tr>

					<?php include'biogas_birds.php'?>

					<!--sludge management-->
					<tr stage=waste class=hidden>
						<td colspan=3>
							<?php write('#select_main_treatment_type')?>
							<p>
								<?php include'treatment_birds.php'?>
							</p>
						</td>
					</tr>

					<!--sludge management-->
					<tr stage=waste class=hidden>
						<td colspan=3>
							<?php write('#select_sludge_disposal_method')?>
							<p>
								<?php include'sludge_birds.php'?>
							</p>
						</td>
					</tr>
			</table>

			<script>
        //add onfocus listener to all input elements
				(function(){
					var inputs=document.querySelectorAll("#inputs input[id]")
					for(var i=0;i<inputs.length;i++) {
						inputs[i].onfocus=function() {
							this.value=parseFloat(this.value.replace(/,/g,''));
							this.select()
						}
						inputs[i].onblur=function(){init()}
					}
				})();
			</script>
		</div>

		<!--PREV & NEXT BUTTONS-->
		<div style=margin:1em;text-align:center>
			<script>
				//find first available stage to start entering data
				function nextPage()
				{
					event.stopPropagation();
					//go to first active substage
					var location;
					if(Global.Configuration.ActiveStages.waterAbs)
						location = "edit.php?level=Water&sublevel=Abstraction";
					else if(Global.Configuration.ActiveStages.waterTre)
						location = "edit.php?level=Water&sublevel=Treatment";
					else if(Global.Configuration.ActiveStages.waterDis)
						location = "edit.php?level=Water&sublevel=Distribution";
					else if(Global.Configuration.ActiveStages.wasteCol)
						location = "edit.php?level=Waste&sublevel=Collection";
					else if(Global.Configuration.ActiveStages.wasteTre)
						location = "edit.php?level=Waste&sublevel=Treatment";
					else if(Global.Configuration.ActiveStages.wasteDis)
						location = "edit.php?level=Waste&sublevel=Discharge";
					else if(Global.Configuration.ActiveStages.water)
						location = "edit.php?level=Water";
					else if(Global.Configuration.ActiveStages.waste)
						location = "edit.php?level=Waste";
					else
					{
						alert("<?php write('#configuration_active_stages_error')?>");
						return;
					}
					window.location=location;
				}
			</script>
			<button class="button prev" onclick="event.stopPropagation();window.location='inhabitants.php'"><?php write('#previous')?></button><!--
			--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
		</div>
	</div>

	<!--graphs-->
	<div class="card inline" style="width:63%">
		<?php cardMenu($lang_json['#figures'])?>
		<div id=graphs>
			<style> 
				#graphs table{margin:auto !important;margin-bottom:0.5em !important}
				#graphs div div {text-align:center;position:relative} 
				#graphs div.options {text-align:center;padding:1em}
				#graphs div[graph] {
					display:inline-block;
					text-align:center;
					vertical-align:top;
					width:50%;
					margin-left:-5px;
					margin-bottom:-1px;
					border:1px solid #ddd;
					padding:0;
				}
			</style>

			<div style=text-align:center>
				<div graph id=graph1><?php write('#loading')?></div>
				<div graph id=graph2><?php write('#loading')?></div>
				<!---->
				<div graph id=graph3><?php write('#loading')?></div>
				<div graph id=graph4><?php write('#loading')?></div>
				<div graph id=graph5><?php write('#loading')?></div>
				<div graph id=graph6><?php write('#loading')?></div>
				<!---->
				<div graph id=graph7><?php write('#loading')?></div>
				<div graph id=graph8><?php write('#loading')?></div>
				<!---->
				<div style="width:98%;padding:1em 0;margin-bottom:1em;border:none">
					<?php write('#for_further_details_go_to_detailed')?>
					<b>
						<?php write('#energy_performance')?>
					</b> (<a href=#>&uarr;</a>)
				</div>
				<div style="text-align:left;padding-left:10px">
					<?php write('#see_also')?>:
					<ul>
						<li> <a href='estimations.php'><?php write('#summary_of_estimations_at_this_level')?></a> </li>
						<li> <a href='non_revenue_water.php'><?php write('#about_nrw')?></a> </li>
						<li> <a href='authorized_consumption.php'><?php write('#about_auc')?></a> </li>
						<li> <a href='fuelInfo.php'><?php write('#about_fuel')?></a> </li>
						<li> <a href=sankey.php><?php write('#sankey_diagram')?></a>
					</ul>
				</div>
				<script>
					(function(){
						//hide inactive graphs
						if(Global.Configuration.ActiveStages.water==0) {
							document.querySelector("#graph3").style.display="none"
							document.querySelector("#graph5").style.display="none"
							document.querySelector("#graph7").style.display="none"
							document.querySelector("#graph8").style.display="none"
						}
						if(Global.Configuration.ActiveStages.waste==0) {
							document.querySelector("#graph4").style.display="none"
							document.querySelector("#graph6").style.display="none"
						}
					})();
				</script>
			</div>
		</div>
	</div>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>
	google.charts.load('current',{'packages':['corechart','gauge','bar']});
	google.charts.setOnLoadCallback(init)
</script>
