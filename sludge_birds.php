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

		//default values for inicineration
		if(method=="inc")
		{
			Global.Waste.Treatment.wwt_temp_inc=750; //K Fluidized Bed Reactor Temperature
		}

		//estimation of kg of sludge (wwt_mass_slu)
		(function(){
			var mass_est=0.55*Global.Waste.Treatment.wwt_vol_trea/Global.General.Days()*171*(1e-3)*1.176;
			console.log('Method selected: '+method);
			console.log('Estimated mass of sludge (wwt_mass_slu & wwt_mass_slu_'+method+'): '+mass_est+' kg');
			Global.Waste.Treatment['wwt_mass_slu']=mass_est;
			Global.Waste.Treatment['wwt_mass_slu_'+method]=mass_est;
		})();

		//estimation of kg of dry weight (wwt_dryw_slu)
		(function(){
			var dry_est=(function(){
				var wwt_vol_trea=Global.Waste.Treatment.wwt_vol_trea;
				var Days=Global.General.Days();
				var wwc_bod_pday=Global.Waste.Collection.wwc_bod_pday;
				var ww_resi_pop=Global.Waste.ww_resi_pop;
				return 0.55*0.9*wwc_bod_pday*ww_resi_pop*(1e-3)*1.176/4*Days;
			})();
			var biogas=Global.Configuration['Yes/No'].wwt_producing_biogas;
			if(biogas){
				dry_est*=0.6;
			}
			console.log('Estimated mass of dry weight sludge (wwt_dryw_slu): '+dry_est+' kg');
			Global.Waste.Treatment['wwt_dryw_slu']=dry_est;
		})();

		//end
		init();
	}
</script>
