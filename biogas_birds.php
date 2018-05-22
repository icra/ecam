<!--wwt are you producing biogas-->
<tbody class=biogas_birds>
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_producing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>
        <input name=wwt_producing_biogas type=radio value=0 checked>
      </label>
      <label><?php write('#yes')?>
        <input name=wwt_producing_biogas type=radio value=1>
      </label>
    </td>
  </tr>

  <!--wwt are you valorizing biogas-->
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_valorizing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>
        <input name=wwt_valorizing_biogas type=radio value=0 checked>
      </label>
      <label><?php write('#yes')?>
        <input name=wwt_valorizing_biogas type=radio value=1>
      </label>
    </td>
  </tr>
</tbody>

<script>
  //add listeners
  (function(){
    document.querySelectorAll('input[name=wwt_producing_biogas][type=radio]').forEach(el=>{
      el.addEventListener('click',function(){
        var newValue=parseInt(this.value);
        Global.Configuration['Yes/No'].wwt_producing_biogas=newValue;
        Global.Waste.Treatment.wwt_biog_pro = Global.Estimations.estm_wwt_biog_pro();
        Global.Waste.Treatment.wwt_ch4_biog = Global.Estimations.estm_wwt_ch4_biog();
        Global.Waste.Treatment.wwt_biog_fla = Global.Estimations.estm_wwt_biog_fla();
        if(!newValue){
          Global.Configuration['Yes/No'].wwt_valorizing_biogas=0;
          Global.Waste.Treatment.wwt_biog_val=Global.Estimations.estm_wwt_biog_val();
        }
        init();
      });
    });

    document.querySelectorAll('input[name=wwt_valorizing_biogas][type=radio]').forEach(el=>{
      el.addEventListener('click',function(){
        var newValue=parseInt(el.value);
        Global.Configuration['Yes/No'].wwt_valorizing_biogas=newValue;
        Global.Waste.Treatment.wwt_biog_val = Global.Estimations.estm_wwt_biog_val();
        Global.Waste.Treatment.wwt_biog_fla = Global.Estimations.estm_wwt_biog_fla();
        init();
      });
    });
  })();
</script>

