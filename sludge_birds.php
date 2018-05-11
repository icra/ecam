<!--estimation of sludge produced in wwt (birds.php)-->
<select id=sludge_estimation onchange="sludge_estimation()" style="font-size:smaller">
  <option value=0><?php write('#none')?>
  <option value=comp><?php write('#comp')?>
  <option value=inc><?php write('#inc')?>
  <option value=app><?php write('#app')?>
  <option value=land><?php write('#land')?>
  <option value=stock><?php write('#stock')?>
</select>

<script>
  //call estimations sludge related
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
    if(method=="0"){init();return;}

    //activate filters for sludge management
    Global.Configuration['Yes/No'].wwt_sludge_mgmt=1;
    switch(method){
      case "comp":   Global.Configuration['Yes/No'].wwt_composting=1;break;
      case "inc":    Global.Configuration['Yes/No'].wwt_incineration=1;break;
      case "app":    Global.Configuration['Yes/No'].wwt_land_application=1;break;
      case "land":   Global.Configuration['Yes/No'].wwt_landfilling=1;break;
      case "stock":  Global.Configuration['Yes/No'].wwt_stockpiling=1;break;
      default: alert('Error in sludge method');return;break;
    }

    //estimation for inicineration
    Global.Waste.Treatment.wwt_temp_inc=Global.Estimations.estm_wwt_temp_inc();

    //estimation for wwt_mass_slu
    Global.Waste.Treatment.wwt_mass_slu=Global.Estimations.estm_wwt_mass_slu();
    console.log('Estimated mass of sludge (wwt_mass_slu): '+Global.Waste.Treatment.wwt_mass_slu+' kg');

    //estimation of kg of dry weight (wwt_dryw_slu)
    Global.Waste.Treatment.wwt_dryw_slu=Global.Estimations.estm_wwt_dryw_slu();
    console.log('Estimated mass of dry weight sludge (wwt_dryw_slu): '+dry_est+' kg');
    Global.Waste.Treatment['wwt_mass_slu_'+method]=Global.Waste.Treatment.wwt_dryw_slu;

    //end
    init();
  }
</script>
