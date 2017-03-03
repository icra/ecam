<!--estimation of sludge produced in wwt (birds.php)-->
<select id=sludge_estimation onchange=sludge_estimation()>
	<option value=0>None
	<option value=comp>Composting
	<option value=inc>Incineration
	<option value=app>Land application
	<option value=land>Landfilling
	<option value=stock>Stockpiling
</select>

<script>
	/*mass of sludge (kg) estimated (Global)*/
	//For example if we have incineration selected:
	//wwt_mass_slu_inc = sludge
	function sludge_estimation() 
	{
		//method picked
		var method=document.querySelector('#sludge_estimation').value;

		//save selection in Configuration
		Global.Configuration.Selected.sludge_estimation_method=method;

		//reset all
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

		//default values for other inputs
		if(method=="inc")
		{
			Global.Waste.Treatment.wwt_temp_inc=750; //K Fluidized Bed Reactor Temperature
		}

		//kg of sludge estimated
		var mass_est=0.55*Global.Waste.Treatment.wwt_vol_trea/Global.General.Days()*171*1e-3*1.176;
		console.log('Method selected: '+method);
		console.log('Estimated mass of sludge: '+mass_est+' kg');
		Global.Waste.Treatment['wwt_mass_slu']=mass_est;
		Global.Waste.Treatment['wwt_mass_slu_'+method]=mass_est;

		//kg of dry weight estimated
		/*
			For GHG emissions related to Sludge disposal use this equation to estimate dry weight of sludge produced/disposed in the case of no biogas production as well as biogas production:
			Kg dry weight sludge disposed no biogas = 
			Kg dry weight sludge disposed biogas = 

			[0.55*(wwt_vol_trea/days)*(wwc_bod_pday*ww_resi_pop*days/wwt_vol_trea - (wwc_bod_pday*ww_resi_pop*days/wwt_vol_trea*0.1))*10^-3*1.176]/4*days
			[0.55*(wwt_vol_trea/days)*(wwc_bod_pday*ww_resi_pop*days/wwt_vol_trea - (wwc_bod_pday*ww_resi_pop*days/wwt_vol_trea*0.1))*10^-3*1.176*0.6/4*days
		*/
		var dry_est = 0; //??? TODO

		//end
		init();
	}
</script>
