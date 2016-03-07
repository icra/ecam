<!--birds eye view-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table#inputs input {width:60px;transition:all 1s;border:1px solid #ccc}
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
			Graphs.graph3(false,'graph3');
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

			var days=Global.General.Days();
			switch(field)
			{
				/** L/person/day -> m3 */
				case 'ws_vol_auth':
					value = value*days*Global.Water.ws_resi_pop/1000; break;

				/** x per month -> x */
				case 'ws_nrg_cons':
				case 'ws_nrg_cost':
				case 'ws_run_cost':
				case 'ww_nrg_cons':
				case 'ww_nrg_cost':
				case 'ww_run_cost':
					value = value*days/30; break;

				/** L per month -> m3 */
				case 'ws_vol_fuel':
					value = value*days/30/1000; break;

				/** m3 per day -> m3 */
				case 'ww_vol_wwtr':
					value = value*days; break;

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
				var L1 = field.search("ws")==0 ? "Water" : "Waste";

				//the value we are going to put in the input
				var value = Global[L1][field];

				var days=Global.General.Days();
				//modify value according to each case
				switch(field)
				{
					/** L/person/day -> m3 */
					case 'ws_vol_auth':
						value = value/days/Global.Water.ws_resi_pop*1000||0; break;

					/** x per month -> x */
					case 'ws_nrg_cons':
					case 'ws_nrg_cost':
					case 'ws_run_cost':
					case 'ww_nrg_cons':
					case 'ww_nrg_cost':
					case 'ww_run_cost':
						value = value/days*30; break;

					/** L per month -> m3 */
					case 'ws_vol_fuel':
						value = value/days*30*1000; break;

					/** m3 per day -> m3 */
					case 'ww_vol_wwtr':
						value = value/days; break;

					default:break;
				}
				//set the value
				input.value=value;
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
<!--TITLE--><h1>Bird's eye view of <script>document.write(Global.General.Name)</script></h1>
</center>

<!--inputs table-->
<div class=inline style="margin-left:10px;width:40%;">
	<div>Assessment period: <script>document.write(Global.General.Days())</script> days</div> 
	<div>Conversion factor: <script>document.write(format(Global.General.conv_kwh_co2))</script> kg CO<sub>2</sub>/kWh</div> 
	<div style="color:#666;font-size:16px;margin:0.5em 0 0.5em 0">INPUTS - Enter typical values from your daily operation</div>
	<table id=inputs>
		<tr><th colspan=3>Water supply
			<tr stage=water class=hidden><td>Resident population                              <td><input id='ws_resi_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=water class=hidden><td>Serviced population                              <td><input id='ws_serv_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=water class=hidden><td>Drinking water consumed per person per day       <td><input id='ws_vol_auth' onchange="BEV.updateField(this)"> <td>L/person/day
			<tr stage=water class=hidden><td>Energy consumed from the grid per month          <td><input id='ws_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/month
			<tr stage=water class=hidden><td>Monthly energy costs                             <td><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=water class=hidden><td>Monthly running costs                            <td><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=water class=hidden><td>Monthly volume of fuel consumed                  <td><input id='ws_vol_fuel' onchange="BEV.updateField(this)"> <td>L/month
			<tr stage=water class=hidden><td>Percentage of non revenue water                  <td><input id='ws_non_revw' onchange="BEV.updateField(this)"> <td>%
			<tr indic=water class=hidden><td colspan=3> Stage not active
		<tr><th colspan=3 style=background:#bf5050>Wastewater
			<tr stage=waste class=hidden><td>Resident population                              <td><input id='ww_resi_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden><td>Population connected                             <td><input id='ww_conn_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden><td>Serviced population                              <td><input id='ww_serv_pop' onchange="BEV.updateField(this)"> <td>People
			<tr stage=waste class=hidden><td>Treated wastewater daily flow                    <td><input id='ww_vol_wwtr' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>/day
			<tr stage=waste class=hidden><td>Energy consumed from the grid per month          <td><input id='ww_nrg_cons' onchange="BEV.updateField(this)"> <td>kWh/month
			<tr stage=waste class=hidden><td>Monthly running costs                            <td><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=waste class=hidden><td>Monthly energy costs                             <td><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>/month
			<tr stage=waste class=hidden><td>Number of trips to sludge disposal site per week <td><input id='ww_num_trip' onchange="BEV.updateField(this)"> <td>trips
			<tr stage=waste class=hidden><td>distance to disposal site                        <td><input id='ww_dist_dis' onchange="BEV.updateField(this)"> <td>km
			<tr stage=waste class=hidden><td>TN effluent limit                                <td><input id='ww_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
			<tr stage=waste class=hidden><td>Monthly volume of fuel consumed                  <td><input id='ww_vol_fuel' onchange="BEV.updateField(this)"> <td>L/month
			<tr stage=waste class=hidden><td>Annual protein consumption per capita            <td><input id='ww_prot_con' onchange="BEV.updateField(this)"> <td>kg/person/day
			<tr indic=waste class=hidden><td colspan=3> Stage not active
	</table>
</div>

<!--graphs-->
<div id=graphs class=inline style="width:55%;">
	<style> 
		#graphs table{margin:auto}
		#graphs button{display:block;margin:auto} 
	</style>
	<div id=graph1 class=inline style=max-width:45%></div>
	<div id=graph2 class=inline style=max-width:45%></div>
	<div id=graph3 style=margin-top:2px></div>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(init)
	</script>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
