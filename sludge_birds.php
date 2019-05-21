<!--estimation of sludge produced in wwt (birds.php)-->
<select id=sludge_estimation>
  <option value=0>    <?php write('#none') ?>
  <option value=comp> <?php write('#comp') ?>
  <option value=inc>  <?php write('#inc')  ?>
  <option value=app>  <?php write('#app')  ?>
  <option value=land> <?php write('#land') ?>
  <option value=stock><?php write('#stock')?>
</select>

<script>
  //onchange listener: sludge disposal method
  //apply estimations for sludge disposal method selected
  (function(){
    let sludge_estimation=document.getElementById('sludge_estimation');
    sludge_estimation.addEventListener('change',function(){
      //method picked
      let method=this.value;
      //save selection in Configuration
      Global.Configuration.Selected.sludge_estimation_method=method;
      //reset all filters and mass of sludge for all methods
      Global.Waste.Treatment['wwt_mass_slu']             = 0;
      Global.Waste.Treatment['wwt_mass_slu_comp']        = 0;
      Global.Waste.Treatment['wwt_mass_slu_inc']         = 0;
      Global.Waste.Treatment['wwt_mass_slu_app']         = 0;
      Global.Waste.Treatment['wwt_mass_slu_land']        = 0;
      Global.Waste.Treatment['wwt_mass_slu_stock']       = 0;
      Global.Configuration['Yes/No'].wwt_sludge_mgmt     = 0;
      Global.Configuration['Yes/No'].wwt_composting      = 0;
      Global.Configuration['Yes/No'].wwt_incineration    = 0;
      Global.Configuration['Yes/No'].wwt_land_application= 0;
      Global.Configuration['Yes/No'].wwt_landfilling     = 0;
      Global.Configuration['Yes/No'].wwt_stockpiling     = 0;
      Global.Waste.Treatment.wwt_temp_inc                = 0; //K Fluidized Bed Reactor Temperature

      //configuration sludge management
      Global.Configuration['Yes/No'].wwt_sludge_mgmt = (method=='0') ? 0 : 1;

      switch(method){
        case "comp":   Global.Configuration['Yes/No'].wwt_composting      =1;break;
        case "inc":    Global.Configuration['Yes/No'].wwt_incineration    =1;break;
        case "app":    Global.Configuration['Yes/No'].wwt_land_application=1;break;
        case "land":   Global.Configuration['Yes/No'].wwt_landfilling     =1;break;
        case "stock":  Global.Configuration['Yes/No'].wwt_stockpiling     =1;break;
        default: alert('Error in sludge method');return;break;
      }

      //estimation for wwt_mass_slu and dry weight
      Global.Waste.Treatment.wwt_mass_slu = Recommendations.wwt_mass_slu();
      Global.Waste.Treatment.wwt_dryw_slu = Recommendations.wwt_dryw_slu();

      //set sludge for the disposal method selected equal to dry weight
      Global.Waste.Treatment['wwt_mass_slu_'+method] = Global.Waste.Treatment.wwt_dryw_slu;

      //estimation for inicineration
      Global.Waste.Treatment.wwt_temp_inc      = method=='inc'  ? Recommendations.wwt_temp_inc() : 0;
      //estimations for landfilling
      Global.Waste.Treatment.wwt_slu_lf_N_cont = method=='land' ? Recommendations.wwt_slu_lf_N_cont() : 0;
      Global.Waste.Treatment.wwt_slu_lf_TVS    = method=='land' ? Recommendations.wwt_slu_lf_TVS()    : 0;
      //estimations for land application
      Global.Waste.Treatment.wwt_slu_la_N_cont = method=='app'  ? Recommendations.wwt_slu_la_N_cont() : 0;

      //end
      init();
    });
  })();
</script>
