<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		// Opportunities: potential GHG reductions
		var Opps = [
		];

		//render opportunities table
		function renderOpps(){
			//TODO
		}

		function init(){
			//renderOpps();
			document.getElementById('TotalGHG').innerHTML=format(Global.General.TotalGHG());
			updateResult();
		}
	</script>
	<style>
		#root #container_TotalGHG {
			font-size:18px;
		}
	</style>
</head><body onload=init()><center>
<!--includes-->
	<!--sidebar--><?php include'sidebar.php'?>
	<!--navbar--><?php include'navbar.php'?>
	<!--linear--><?php include'linear.php'?>
<!--title--><h1><?php write('#opps_title')?></h1>

<div id=root>
	<!--total ghg indicator-->
	<p id=container_TotalGHG>
		<?php write('#System wide GHG emissions')?>: 
		<span id=TotalGHG><?php write('#Loading')?>...</span> 
		kg CO<sub>2</sub>e
	</p>

	<!--opps table-->
	<div>
		<table id=opps>
			<tr>
				<th><?php write('#Opportunities')?>
				<th><?php write('#Related variable')?>
				<th><?php write('#Current value')?>
				<th><?php write('#Unit')?>
				<th>kg CO<sub>2</sub>e 
					<?php write('#reduction per 1 percent change of current value')?>
			<tr>
				<script>
					//name
					document.write("<td>Reduce Non revenue water volume <td><a href=variable.php?id=wsd_SL_nr_water>wsd_SL_nr_water</a>");
					var val=Global.Water.Distribution.wsd_SL_nr_water();
					var unit=Info.wsd_SL_nr_water.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * Global.Water.Distribution.wsd_SL_ghg_attr();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					//name
					document.write("<td>Reduce End user consumption <td><a href=variable.php?id=wsd_auth_con>wsd_auth_con</a>");
					var val=Global.Water.Distribution.wsd_auth_con;
					var unit=Info.wsd_auth_con.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * val * Global.Water.Distribution.wsd_KPI_nrg_per_m3() * Global.General.conv_kwh_co2;
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Reduce water supply energy consumption <td><a href=variable.php?id=ws_nrg_cons>ws_nrg_cons</a>");
					var val=Global.Water.ws_nrg_cons();
					var unit=Info.ws_nrg_cons.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * val * Global.General.conv_kwh_co2;
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
					//TODO
				</script>
			<tr>
				<script>
					//name
					document.write("<td>Reduce Infiltration and inflow<td><a href=variable.php?id=c_wwc_vol_infl>c_wwc_vol_infl</a>");
					var val=Global.Waste.Collection.c_wwc_vol_infl();
					var unit=Info.c_wwc_vol_infl.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * Global.Waste.Collection.wwc_SL_GHG_ii();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Reduce wastewater supply energy consumption <td><a href=variable.php?id=ww_nrg_cons>ww_nrg_cons</a>");
					var val=Global.Waste.ww_nrg_cons();
					var unit=Info.ww_nrg_cons.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * val * Global.General.conv_kwh_co2;
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Reduce biogas flared<td><a href=variable.php?id=wwt_KPI_GHG_biog>wwt_KPI_GHG_biog</a>");
					var val=Global.Waste.Treatment.wwt_KPI_GHG_biog();
					var unit=Info.wwt_KPI_GHG_biog.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * val * Global.Waste.Treatment.wwt_KPI_GHG_biog();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Reduce sludge disposal<td>wwt_mass_slu_comp+wwt_mass_slu_inc+wwt_mass_slu_app<br>+wwt_mass_slu_land+wwt_mass_slu_stock");
					//value + unit
					var val=(function(){
						return Global.Waste.Treatment.wwt_mass_slu_comp +
									 Global.Waste.Treatment.wwt_mass_slu_inc  +
									 Global.Waste.Treatment.wwt_mass_slu_app  +
									 Global.Waste.Treatment.wwt_mass_slu_land +
									 Global.Waste.Treatment.wwt_mass_slu_stock
					})();
					var unit="kg sludge";
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					//modify inputs, get the value, then restore them
					Global.Waste.Treatment.wwt_mass_slu_comp *=0.01;
					Global.Waste.Treatment.wwt_mass_slu_inc  *=0.01;
					Global.Waste.Treatment.wwt_mass_slu_app  *=0.01;
					Global.Waste.Treatment.wwt_mass_slu_land *=0.01;
					Global.Waste.Treatment.wwt_mass_slu_stock*=0.01;
					var emissions=Global.Waste.Treatment.wwt_KPI_GHG_slu();
					Global.Waste.Treatment.wwt_mass_slu_comp *=100;
					Global.Waste.Treatment.wwt_mass_slu_inc  *=100;
					Global.Waste.Treatment.wwt_mass_slu_app  *=100;
					Global.Waste.Treatment.wwt_mass_slu_land *=100;
					Global.Waste.Treatment.wwt_mass_slu_stock*=100;
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Increase wastewater treatment coverage<td><a href=variable.php?id=ww_serv_pop>ww_serv_pop</a>");
					//value + unit
					var val=Global.Waste.ww_serv_pop;
					var unit=Info.ww_serv_pop.unit;
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions=(function(){
						//modify serv pop and recalc GHGs that depend on it
						var ret=Global.Waste.Collection.wwc_KPI_GHG_unt_ch4();
						ret+=Global.Waste.Collection.wwc_KPI_GHG_unt_n2o();
						ret+=Global.Waste.Treatment.wwt_KPI_GHG_tre_n2o();
						Global.Waste.ww_serv_pop*=1.01;
						ret-=Global.Waste.Collection.wwc_KPI_GHG_unt_ch4();
						ret-=Global.Waste.Collection.wwc_KPI_GHG_unt_n2o();
						ret-=Global.Waste.Treatment.wwt_KPI_GHG_tre_n2o();
						//undo change in serv pop
						Global.Waste.ww_serv_pop/=1.01;
						return ret;
					})();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			<tr>
				<script>
					document.write("<td>Reduce wastewater discharged to water body <br>(wastewater reuse)<td><a href=variable.php?id=wwd_vol_disc>wwd_vol_disc</a>");
					//value + unit
					var val=Global.Waste.Discharge.wwd_vol_disc;
					var unit=Info.wwd_vol_disc.unit;
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions=0.01 * Global.Waste.Discharge.wwd_KPI_GHG_tre_n2o();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			</tr>
		</table>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
