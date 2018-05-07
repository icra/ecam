<!--estimation of sludge produced in wwt (birds.php)-->
<select id=sludge_estimation onchange=sludge_estimation()>
	<option value=0><?php write('#none')?>
	<option value=comp><?php write('#comp')?>
	<option value=inc><?php write('#inc')?>
	<option value=app><?php write('#app')?>
	<option value=land><?php write('#land')?>
	<option value=stock><?php write('#stock')?>
</select>

<script>
	/*mass of sludge (kg) estimated (Global)*/
	//For example if we have incineration selected:
	//wwt_mass_slu_inc = dry weight estimation
	function sludge_estimation() {
		//method picked
		var method=document.querySelector('#sludge_estimation').value;

		//save selection in Configuration
		Global.Configuration.Selected.sludge_estimation_method=method;

		//reset all filters and mass of sludge for all methods
		Global.Waste.Treatment['wwt_mass_slu']=0;
		Global.Waste.Treatment['wwt_mass_slu_comp']=0;
		Global.Waste.Treatment['wwt_mass_slu_inc']=0;
		Global.Waste.Treatment['wwt_mass_slu_app']=0;
		Global.Waste.Treatment['wwt_mass_slu_land']=0;
		Global.Waste.Treatment['wwt_mass_slu_stock']=0;
		Global.Configuration['Yes/No'].wwt_sludge_mgmt=0;
		Global.Configuration['Yes/No'].wwt_composting=0;
		Global.Configuration['Yes/No'].wwt_incineration=0;
		Global.Configuration['Yes/No'].wwt_land_application=0;
		Global.Configuration['Yes/No'].wwt_landfilling=0;
		Global.Configuration['Yes/No'].wwt_stockpiling=0;
		Global.Waste.Treatment.wwt_temp_inc=0; //K Fluidized Bed Reactor Temperature

		//if method==none end
		if(method=="0") { init(); return; }

		//activate filters for sludge management
		Global.Configuration['Yes/No'].wwt_sludge_mgmt=1;
		switch(method)
		{
			case "comp":   Global.Configuration['Yes/No'].wwt_composting=1;break;
			case "inc":    Global.Configuration['Yes/No'].wwt_incineration=1;break;
			case "app":    Global.Configuration['Yes/No'].wwt_land_application=1;break;
			case "land":   Global.Configuration['Yes/No'].wwt_landfilling=1;break;
			case "stock":  Global.Configuration['Yes/No'].wwt_stockpiling=1;break;
			default: alert('Error in sludge method');return;break;
		}

		//default value for inicineration
		if(method=="inc")
		{
			Global.Waste.Treatment.wwt_temp_inc=1023;
		}

		//estimation of kg of sludge (wwt_mass_slu)
		(function(){
			var wwt_vol_trea=Global.Waste.Treatment.wwt_vol_trea;
			var Days=Global.General.Days();
			var bod_pday=Global.General.bod_pday;
			var ww_serv_pop=Global.Waste.ww_serv_pop();

			//kg of sludge estimation formula simplified
			/*
				Jose Porr mail:
				Btw, here is the full sludge production equation with references and units…
				Sludge produced (estimated at initial assessment versus actual values at detailed assessment):
				(kgTSS) = 0.55 * (wwt_vol_trea/Days) * (bod_pday*ww_serv_pop*days/wwt_vol_trea*(1-0.1)) * 1e-3 * 1.176 * (days)
				Where:
				•	x 0.55 : ratio of g volatile suspended solids to g of substrate (BOD) removed per Metcalf and Eddy (2003).
				•	x 0.1: Assumes 10% of the influent BOD load escapes treatment and leaves the wwtp in the effluent
				•	x 1e-3: Unit conversion factor kg/g
				•	x 1.176: Conversion factor, ratio of total suspended solids to volatile suspended solids (g TSS/ g VSS )in typical activated sludge per Metcalf and Eddy (2003).  
				•	Ap: Assessment period in days
			*/
			var mass_est=0.55*bod_pday*ww_serv_pop*(1-0.1)*1e-3*1.176*Days;

			//modification if producing biogas
			var biogas=Global.Configuration['Yes/No'].wwt_producing_biogas;
			if(biogas){
				mass_est*=0.6;
			}
			console.log('Estimated mass of sludge (wwt_mass_slu): '+mass_est+' kg');
			Global.Waste.Treatment['wwt_mass_slu']=mass_est;
		})();

		//estimation of kg of dry weight (wwt_dryw_slu)
		(function(){
			var dry_est=0.04*Global.Waste.Treatment.wwt_mass_slu;
			console.log('Estimated mass of dry weight sludge (wwt_dryw_slu): '+dry_est+' kg');
			//set the estimation for dry weight
			Global.Waste.Treatment['wwt_dryw_slu']=dry_est;
			//set the estimation for the method equal to dry weight
			Global.Waste.Treatment['wwt_mass_slu_'+method]=dry_est;
		})();

		//end
		init();
	}
</script>
