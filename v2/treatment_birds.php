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

      //apply estimations
      Global.Configuration.Selected.wwt_ch4_efac=treatment;
      Global.Configuration.Selected.wwt_bod_slud=treatment;
      Global.Configuration.Selected.wwd_ch4_efac="Sea and aerobic water bodies";

      Global.Waste.Treatment.wwt_ch4_efac=Global.Estimations.estm_wwt_ch4_efac();
      Global.Waste.Treatment.wwt_bod_infl=Global.Recommendations.wwt_bod_infl();
      Global.Waste.Treatment.wwt_bod_effl=Global.Recommendations.wwt_bod_effl();
      Global.Waste.Treatment.wwt_bod_slud=Global.Estimations.estm_wwt_bod_slud();
      Global.Waste.Discharge.wwd_bod_effl=Global.Recommendations.wwd_bod_effl();

      //log
      console.log("CH4 efac: "+Global.Waste.Treatment.wwt_ch4_efac+" kg CH4 / kg BOD");
      console.log("BOD estimations");
      console.log("  - BOD influent: "+Global.Waste.Treatment.wwt_bod_infl+" kg");
      console.log("  - BOD effluent: "+Global.Waste.Treatment.wwt_bod_effl+" kg");
      console.log("  - BOD removed as sludge (for "+treatment+"): "+Global.Waste.Treatment.wwt_bod_slud+" kg");

      init();
    });
  })();
</script>
