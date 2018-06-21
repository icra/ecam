<select id=main_treatment_type style="font-size:smaller"></select>
<script>
  //select treatment type: add options and onchange event listener 
  (function(){
    var select=document.getElementById('main_treatment_type');

    //add options
    Object.keys(Tables.wwt_type_tre).forEach(key=>{
      var value=Tables.wwt_type_tre[key].value;
      var option=document.createElement('option');
      option.value=value;
      option.innerHTML=translate(key);
      select.appendChild(option);
    });

    select.addEventListener('change',function(){
      var value=this.value;

      //set treatment type in wwt
      Global.Waste.Treatment.wwt_type_tre=parseInt(value);

      var treatment=Tables.find('wwt_type_tre',parseInt(value));

      //set ch4 efac
      Global.Waste.Treatment.wwt_ch4_efac=Tables.wwt_type_tre[treatment].ch4_efac;

      //BOD estimation: Assume g/person/day * 0.001 * population * days
      //bod_pday*1e-3*ww_serv_pop*Days
      var bod_estimation=Global.General.bod_pday*1e-3*Global.Waste.ww_serv_pop()*Global.General.Days();

      //Influent
      Global.Waste.Treatment.wwt_bod_infl=bod_estimation;

      //Effluent BOD: Assume 90% removal
      Global.Waste.Treatment.wwt_bod_effl=0.10*bod_estimation;

      //estimation of bod removed as sludge estimation (wwt_bod_slud)
      var type=Tables.find("wwt_type_tre",Global.Waste.Treatment.wwt_type_tre);
      var percent=Tables.wwt_type_tre[type].bod_rmvd_as_sludge_estm;
      var estimation=percent*Global.Waste.Treatment.wwt_bod_infl;
      Global.Waste.Treatment.wwt_bod_slud=estimation;

      //log
      console.log("CH4 efac: "+Global.Waste.Treatment.wwt_ch4_efac+" kg CH4 / kg BOD");
      console.log("BOD estimations");
      console.log("  - BOD influent: "+Global.Waste.Treatment.wwt_bod_infl+" kg");
      console.log("  - BOD effluent: "+Global.Waste.Treatment.wwt_bod_effl+" kg");
      console.log("  - BOD removed as sludge ("+percent*100+"% for "+type+"): "+Global.Waste.Treatment.wwt_bod_slud+" kg");

      init();
    });
  })();
</script>
