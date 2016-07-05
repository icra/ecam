<!--birds eye view:quick assessment view-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body {background:#e9ebee}
		table#inputs input {width:70px;transition:background 1s;border:1px solid #ccc}
		table#inputs input.edited {background:lightgreen;}
		table#inputs tr.hidden {display:none}
		table#inputs tr[indic]{text-align:center;color:#999;background:#eee}
		table#inputs th{text-align:left;border:none}
		table#inputs td {border-left:none;border-right:none;border-bottom:none}
		h1{background:white}
	</style>
	<script>
		function init()
		{
			BEV.showActive();
			BEV.updateDefaults();
			updateResult();
			drawCharts();
		}

		function drawCharts()
		{
			Graphs.graph1(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.ws_cost('graph3');
			Graphs.ww_cost('graph4');
			Graphs.gauge('graph5', [ [translate("Water"),Global.Water.ws_SL_serv_pop()||0], ], translate("ws_SL_serv_pop_descr")+" (%)");
			Graphs.gauge('graph6', [ [translate("Waste"),Global.Waste.ww_SL_serv_pop()||0], ], translate("ww_SL_serv_pop_descr")+" (%)");
		}

		var BEV={}; //'Birds Eye View' namespace

		//Generic f for updating internal values
		BEV.update=function(obj,field,newValue)
		{
			if(obj[field]===undefined) { alert('field '+field+' undefined'); return; }

			//newValue may be a string from input.value, it should be a float
			newValue=parseFloat(newValue);
			obj[field]=newValue;
		}

		//Specific behaviours for each formula when user inputs data
		BEV.updateField=function(input)
		{
			//get info from the input element
			var field = input.id;
			var value = parseFloat(input.value);

			//if value is not a number, set to zero
			if(isNaN(value))value=0;

			var days=Global.General.Days();
			switch(field)
			{
				/** x per month -> x */
				case 'ws_nrg_cons':
				case 'ws_nrg_cost':
				case 'ws_run_cost':
				case 'ww_nrg_cons':
				case 'ww_nrg_cost':
				case 'ww_run_cost':
					value = value*days/30; break;

				/** trips/week -> trips */
				case 'ww_num_trip':
					value = value*days/7; break;

				/** L per month -> m3 */
				case 'ws_vol_fuel':
				case 'ww_vol_fuel':
					value = value*days/30/1000; break;

				/** m3 per year -> m3 */
				case 'ws_vol_auth':
					value = value*days/365; break;

				/** m3 per day -> m3 */
				case 'ww_vol_wwtr':
					value = value*days; break;

				/** km -> m */
				case 'ww_dist_dis':
					value = value*1000; break;

				/** mg/L -> kg */
				case 'ww_n2o_effl':
					value = value*Global.Waste.ww_vol_wwtr/1000; break;

				default:break;
			}
			//get L1 name: "Water" or "Waste"
			var L1 = field.search("ws")==0 ? "Water" : "Waste";
			//update
			this.update(Global[L1],field,value);
			//add a color to the field
			input.classList.add('edited');
			init();
		}

		//Refresh default values from the table
		BEV.updateDefaults=function()
		{
			var inputs = document.querySelectorAll('table#inputs input');
			for(var i=0; i<inputs.length; i++)
			{
				var input = inputs[i];
				var field = input.id; 

				//set the longer description in the input <td> element
				input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');

				var L1 = field.search("ws")==0 ? "Water" : "Waste";

				//the value we are going to put in the input
				var value = Global[L1][field];

				var days=Global.General.Days();
				//modify value according to each case
				switch(field)
				{
					/** x per month -> x */
					case 'ws_nrg_cons':
					case 'ws_nrg_cost':
					case 'ws_run_cost':
					case 'ww_nrg_cons':
					case 'ww_nrg_cost':
					case 'ww_run_cost':
						value = value/days*30; break;

					/** trips/week -> trips */
					case 'ww_num_trip':
						value = value/days*7; break;

					/** L per month -> m3 */
					case 'ws_vol_fuel':
					case 'ww_vol_fuel':
						value = value/days*30*1000; break;

					/** m3 per year -> m3 */
					case 'ws_vol_auth':
						value = value*365/days; break;

					/** m3 per day -> m3 */
					case 'ww_vol_wwtr':
						value = value/days; break;

					/** km -> m */
					case 'ww_dist_dis':
						value = value/1000; break;

					/** mg/L -> kg */
					case 'ww_n2o_effl':
						value = 1000*value/Global.Waste.ww_vol_wwtr||0; break;

					default:break;
				}
				//set the value
				input.value=format(value);
			}
		}

		BEV.showActive=function()
		{
			['water','waste'].forEach(function(stage)
			{
				if(Global.Configuration.ActiveStages[stage]==1)
				{
					//show all rows with stage=stage
					var rows = document.querySelectorAll('table#inputs tr[stage='+stage+']');
					for(var i=0; i<rows.length; rows[i++].classList.remove('hidden')){}
				}
				else //show "Stage not active"
				{
					document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
				}
			});
		}

		function makeInactive(input)
		{
			input.setAttribute('disabled',true)
			input.style.background="#eee"
			var tr = input.parentNode.parentNode;
			tr.style.background="#eee"
			tr.title="<?php write('#Inactive')?>"
			tr.style.color="#888"
		}

		//list of inputs that are here (unused by now)
		var QAinputs = 
		[
			Global.Water.ws_resi_pop,
			Global.Water.ws_serv_pop,
			Global.Water.ws_vol_auth,
			Global.Water.ws_nrg_cons,
			Global.Water.ws_nrg_cost,
			Global.Water.ws_run_cost,
			Global.Water.ws_vol_fuel,
			Global.Waste.ww_resi_pop,
			Global.Waste.ww_conn_pop,
			Global.Waste.ww_serv_pop,
			Global.Waste.ww_vol_wwtr,
			Global.Waste.ww_nrg_cons,
			Global.Waste.ww_nrg_cost,
			Global.Waste.ww_run_cost,
			Global.Waste.ww_vol_fuel,
			Global.Waste.ww_num_trip,
			Global.Waste.ww_dist_dis,
			Global.Waste.ww_n2o_effl,
			Global.Waste.ww_prot_con,
		];
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#birds_quick_assessment_of')?> 
	<b onclick=window.location='getStarted.php'>
		<script>document.write(Global.General.Name)</script>
	</b>
	<span style="font-size:12px;color:#666">
		|
		<span><a href=variable.php?id=Days>        <?php write('#assessment_period')?></a>: <script>document.write(Global.General.Days())</script> <?php write('#days')?></span> 
		|
		<span><a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>: 
			<script>
				(function(){
					var c = Global.General.conv_kwh_co2;
					var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' title='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+" &#9888;</span>" : format(c); 
					document.write(str)
				})();
			</script> kg CO<sub>2</sub>/kWh</span> 
	</span>
</h1></center>

<div id=main>

<!--inputs-->
<div class="card inline" style="width:35%"><?php cardMenu("Inputs - Enter typical values from your daily operation")?>
	<!--table-->
	<table id=inputs style=width:100%>
		<tr><th colspan=3>
			<img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Water')?>
			<tr stage=water class=hidden><td><?php write('#ws_resi_pop_descr')?> <td><input id='ws_resi_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=water class=hidden><td><?php write('#ws_serv_pop_descr')?> <td><input id='ws_serv_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=water class=hidden><td><?php write('#birds_ws_vol_auth')?> <td><input id='ws_vol_auth' onchange="BEV.updateField(this)"> <td>m3/<?php write('#birds_year')?>
			<tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cons')?> <td><input id='ws_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/<?php write('#birds_month')?>
			<tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/<?php write('#birds_month')?>
			<tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/<?php write('#birds_month')?>
			<tr stage=water class=hidden><td><?php write('#birds_ws_vol_fuel')?> <td><input id='ws_vol_fuel' onchange="BEV.updateField(this)"> <td>L/<?php write('#birds_month')?>
			<script>
				//fuel depends on question #engines_in_water
				(function(){
					if(Global.Configuration["Yes/No"]['engines_in_water']==0)
					{
						var input = document.querySelector('#ws_vol_fuel');
						makeInactive(input);
					}
				})();
			</script>
			<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
		<tr><th colspan=3 style=background:#d71d24>
			<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
			<tr stage=waste class=hidden><td><?php write('#ww_resi_pop_descr')?><td><input id='ww_resi_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=waste class=hidden><td><?php write('#ww_conn_pop_descr')?><td><input id='ww_conn_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=waste class=hidden>
				<td><?php write('#ww_serv_pop_descr')?>
					<span title="<?php write('#birds_ww_serv_pop_note')?>" style="color:orange;cursor:help">(<?php write('#birds_note')?>)</span>
				<td><input id='ww_serv_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=waste class=hidden><td><?php write('#birds_ww_vol_wwtr')?> <td><input id='ww_vol_wwtr' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>/day
			<tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cons')?> <td><input id='ww_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/<?php write('#birds_month')?>
			<tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cost')?> <td><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/<?php write('#birds_month')?>
			<tr stage=waste class=hidden><td><?php write('#birds_ww_run_cost')?> <td><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/<?php write('#birds_month')?>
			<tr stage=waste class=hidden><td><?php write('#birds_ww_vol_fuel')?><td><input id='ww_vol_fuel' onchange="BEV.updateField(this)"> <td>L/<?php write('#birds_month')?>
			<tr stage=waste class=hidden><td><?php write('#birds_ww_num_trip')?> <td><input id='ww_num_trip' onchange="BEV.updateField(this)"> <td><?php write('#birds_trips_week')?>
			<tr stage=waste class=hidden><td><?php write('#ww_dist_dis_descr')?> <td><input id='ww_dist_dis' onchange="BEV.updateField(this)"> <td>km
			<script>
				//fuel depends on question #engines_in_waste
				//trips and distance depend on question #truck_transport_waste
				(function(){
					if(Global.Configuration["Yes/No"]['engines_in_waste']==0)
					{
						var input = document.querySelector('#ww_vol_fuel');
						makeInactive(input);
					}
					if(Global.Configuration["Yes/No"]['truck_transport_waste']==0)
					{
						['#ww_num_trip','#ww_dist_dis'].forEach(function(id)
						{
							var input = document.querySelector(id);
							makeInactive(input);
						})
					}
				})();
			</script>
			<tr stage=waste class=hidden>
				<td><?php write('#birds_ww_n2o_effl')?> 
					<span title="<?php write('#birds_ww_n2o_effl_note')?>" style=color:orange;cursor:help>(<?php write('#birds_note')?>)</span>
				<td><input id='ww_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
			<tr stage=waste class=hidden><td><?php write('#birds_ww_prot_con')?><td><input id='ww_prot_con' onchange="BEV.updateField(this)"> <td>kg/<?php write('#birds_people')?>/<?php write('#birds_year')?>
			<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
	</table>
</div>

<!--graphs-->
<div class="card inline" style="width:63%"><?php cardMenu($lang_json['#graphs'])?>
	<div id=graphs>
		<style> 
			#graphs table{margin:auto !important}
			#graphs button{margin:0.5em;margin-top:0;font-size:10px} 
			#graphs div div {text-align:center;position:relative} 
			#graphs div.options {text-align:center;padding:1em}
			#graphs div[graph] {
				display:inline-block;
				text-align:center;
				vertical-align:top;
				width:49%;
				margin-left:-4px;
				margin-bottom:-1px;
				border:1px solid #ddd;
				padding:0;
			}
		</style>

		<div style=margin-top:2px;text-align:center>
			<div graph id=graph1><?php write('#loading')?></div>
			<div graph id=graph2><?php write('#loading')?></div>
			<!---->
			<div graph id=graph3><?php write('#loading')?></div>
			<div graph id=graph4><?php write('#loading')?></div>
			<!---->
			<div graph id=graph5></div>
			<div graph id=graph6></div>
			<div graph style="width:98%;padding:1em 0;margin-bottom:1em;border:none">
				For further details &amp; opportunities to reduce GHG emissions go to 
				<b>GHG Assessment</b> and 
				<b>Energy Performance</b> (&uarr;)
			</div>
		</div>
		<script>
			google.charts.load('current',{'packages':['corechart','gauge']});
			google.charts.setOnLoadCallback(init)
		</script>
	</div>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin-top:1em;text-align:center> 
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			event.stopPropagation();
			//default location to go
			var location = "edit.php?level=Water";
			if(Global.Configuration.ActiveStages.water==0 && Global.Configuration.ActiveStages.waste==0)
			{
				alert("<?php write('#configuration_active_stages_error')?>");
				return;
			}
			if(Global.Configuration.ActiveStages.water==0)
			{
				location = "edit.php?level=Waste";
			}
			window.location=location;
		}
	</script>
	<button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'"><?php write('#previous')?></button><!--
	--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
</div>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

