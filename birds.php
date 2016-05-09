<!--birds eye view:quick assessment view-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table#inputs input {width:70px;transition:all 1s;border:1px solid #ccc}
		table#inputs input.edited {background:lightgreen;}
		table#inputs tr.hidden {display:none}
		table#inputs tr[indic]{text-align:center;color:#999;background:#eee}
		table#inputs th{text-align:left}
	</style>
	<script>
		function init()
		{
			drawCharts();
			Exceptions.apply();
			BEV.showActive();
			BEV.updateDefaults();
			updateResult();
		}

		function drawCharts()
		{
			Graphs.graph1(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.graph3a(false,'graph3a');
			Graphs.graph3b(false,'graph3b');
			Graphs.graph3c(false,'graph3c');
			Graphs.graph3d(false,'graph3d');
		}

		var BEV={};

		//Generic f for updating internal values
		BEV.update=function(obj,field,newValue)
		{
			if(obj[field]===undefined)
			{
				alert('field '+field+' undefined');
				return;
			}

			//newValue may be a string from input.value, it should be a float
			newValue=parseFloat(newValue);

			//update
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
				input.parentNode.parentNode.childNodes[0].title=Info[field].explanation;

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
				if(Global.Configuration['Active Stages'][stage]==1)
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
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#birds_quick_assessment_of')?> [<script>document.write(Global.General.Name)</script>]</h1>
</center>

<!--inputs table-->
<div class=inline style="margin-left:10px;width:30%;">
	<!--assessment period-->
	<div><a href=variable.php?id=Days>        <?php write('#assessment_period')?></a>: <script>document.write(Global.General.Days())</script> <?php write('#days')?></div> 
	<!--conversion factor-->
	<div><a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>: <script>document.write(format(Global.General.conv_kwh_co2))</script> kg CO<sub>2</sub>/kWh</div> 
	<!--description-->
	<div style="color:#666;font-size:16px;margin:0.5em 0 0.5em 0">INPUTS - <?php write('#birds_enter_typical')?></div>
	<table id=inputs>
		<tr><th colspan=3>
				<img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Water')?>
			<tr stage=water class=hidden><td>Resident population                      <td><input id='ws_resi_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=water class=hidden><td>Serviced population                      <td><input id='ws_serv_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=water class=hidden><td>Annual average authorized consumption    <td><input id='ws_vol_auth' onchange="BEV.updateField(this)"> <td>m3/year
			<tr stage=water class=hidden><td>Energy consumed from the grid per month  <td><input id='ws_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/month
			<tr stage=water class=hidden><td>Monthly energy costs                     <td><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=water class=hidden><td>Monthly running costs                    <td><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=water class=hidden><td>Monthly volume of fuel consumed          <td><input id='ws_vol_fuel' onchange="BEV.updateField(this)"> <td>L/month
			<tr stage=water class=hidden><td>Percentage of non revenue water          <td><input id='ws_non_revw' onchange="BEV.updateField(this)"> <td>%
			<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
		<tr><th colspan=3 style=background:#d71d24>
				<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
			<tr stage=waste class=hidden><td>Resident population                      <td><input id='ww_resi_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden><td>Population connected                     <td><input id='ww_conn_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden>
				<td>Serviced population                      
					<span 
						title="The serviced population in the wastewater system is the population connected to the sewer and which wastewater reaches the treatment plant to be treated prior to discharge. This input is not a known value for the typical utility ECAM-Tool-user. It needs to be calculated using the input 'BOD load in the influent',in kg BOD mg/L multiplied by the  “Volume of treated wastewater” in m3 divided by the utility specific standard value of  “BOD per person” in g of BOD/pers/day. The tool proposes a default value per country, based on the IPCC recommendations" 
						style="color:orange;cursor:help">(note)</span>
				<td><input id='ww_serv_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden><td>Treated wastewater daily flow            <td><input id='ww_vol_wwtr' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>/day
			<tr stage=waste class=hidden><td>Energy consumed from the grid per month  <td><input id='ww_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/month
			<tr stage=waste class=hidden><td>Monthly energy costs                     <td><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=waste class=hidden><td>Monthly running costs                    <td><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=waste class=hidden><td>Trips to sludge disposal site per week   <td><input id='ww_num_trip' onchange="BEV.updateField(this)"> <td>trips/week
			<tr stage=waste class=hidden><td>Distance to disposal site                <td><input id='ww_dist_dis' onchange="BEV.updateField(this)"> <td>km
			<tr stage=waste class=hidden>
				<td>Average Total Nitrogen at discharge 
					<span title="ECAM stores the total kg internally, not the concentration. You need to enter the 'Treated wastewater daily flow' first" style=color:orange;cursor:help>(note)</span>
				<td> <input id='ww_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
			<tr stage=waste class=hidden><td>Monthly volume of fuel consumed          <td><input id='ww_vol_fuel' onchange="BEV.updateField(this)"> <td>L/month
			<tr stage=waste class=hidden><td>Annual protein consumption per capita    <td><input id='ww_prot_con' onchange="BEV.updateField(this)"> <td>kg/person/year
			<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
	</table>
</div>

<!--graphs-->
<div id=graphs class=inline style="width:65%;">
	<style> 
		#graphs table{margin:auto}
		#graphs button{display:block;margin:auto} 
		#graphs div[id^=graph] {border:1px solid #ccc}
	</style>

	<div id=graph1 class=inline style=width:49%><?php write('#loading')?></div>
	<div id=graph2 class=inline style=width:49%><?php write('#loading')?></div>
	<!--graph 3 container-->
	<div style=margin-top:2px>
		<div id=graph3a class=inline style=width:49%><?php write('#loading')?></div>
		<div id=graph3b class=inline style=width:49%><?php write('#loading')?></div>
	</div>
	<div style=margin-top:2px>
		<div id=graph3c class=inline style=width:49%><?php write('#loading')?></div>
		<div id=graph3d class=inline style=width:49%><?php write('#loading')?></div>
	</div>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(init)
	</script>
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin-top:4em;text-align:center> 
	<button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'"><?php write('#previous')?></button> 
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			event.stopPropagation();
			//default location to go
			var location = "edit.php?level=Water";
			if(Global.Configuration['Active Stages'].water==0 && Global.Configuration['Active Stages'].waste==0)
			{
				alert("<?php write('#configuration_active_stages_error')?>");
				return;
			}
			if(Global.Configuration['Active Stages'].water==0)
			{
				location = "edit.php?level=Waste";
			}
			window.location=location;
		}
	</script>
	<button class="button next" onclick=nextPage()><?php write('#next')?></button>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
