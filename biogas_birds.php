<tbody class=biogas_birds>
  <!--wwt producing biogas-->
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_producing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>  <input name=wwt_producing_biogas type=radio value=0 checked></label>
      <label><?php write('#yes')?> <input name=wwt_producing_biogas type=radio value=1></label>
    </td>
  </tr>

  <!--wwt valorizing biogas-->
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_valorizing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>  <input name=wwt_valorizing_biogas type=radio value=0 checked></label>
      <label><?php write('#yes')?> <input name=wwt_valorizing_biogas type=radio value=1></label>
    </td>
  </tr>
</tbody>

<script>
  //click listeners modify backend
  document.querySelectorAll('input[name=wwt_producing_biogas][type=radio]').forEach(el=>{
    el.addEventListener('click',function(){
      var newValue=parseInt(this.value);
      Global.Configuration['Yes/No'].wwt_producing_biogas=newValue;
      if(newValue){
        Global.Waste.Treatment.wwt_biog_pro = Recommendations.wwt_biog_pro();
        Global.Waste.Treatment.wwt_ch4_biog = Recommendations.wwt_ch4_biog();
        Global.Waste.Treatment.wwt_biog_fla = Recommendations.wwt_biog_pro();
        Global.Waste.Treatment.wwt_biog_val = 0;
      }else{
        Global.Waste.Treatment.wwt_biog_pro = 0;
        Global.Waste.Treatment.wwt_ch4_biog = 0;
        Global.Waste.Treatment.wwt_biog_fla = 0;
        Global.Waste.Treatment.wwt_biog_val = 0;
        Global.Configuration['Yes/No'].wwt_valorizing_biogas=0;
      }
      init();
    });
  });
  document.querySelectorAll('input[name=wwt_valorizing_biogas][type=radio]').forEach(el=>{
    el.addEventListener('click',function(){
      var newValue=parseInt(el.value);
      Global.Configuration['Yes/No'].wwt_valorizing_biogas=newValue;
      if(newValue){
        Global.Waste.Treatment.wwt_biog_val = Recommendations.wwt_biog_pro();
        Global.Waste.Treatment.wwt_biog_fla = 0;
      }else{
        Global.Waste.Treatment.wwt_biog_val = 0;
        Global.Waste.Treatment.wwt_biog_fla = Recommendations.wwt_biog_pro();
      }
      init();
    });
  });
</script>
