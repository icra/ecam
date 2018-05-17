<!--wwt are you producing biogas-->
<tbody class=biogas_birds>
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_producing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>
        <input name=wwt_producing_biogas type=radio onclick="BEV.updateProducingBiogas(0)" ans=0 checked>
      </label>
      <label><?php write('#yes')?>
        <input name=wwt_producing_biogas type=radio onclick="BEV.updateProducingBiogas(1)" ans=1>
      </label>
    </td>
  </tr>

  <!--wwt are you valorizing biogas-->
  <tr stage=waste class=hidden>
    <td><?php write('#wwt_valorizing_biogas')?>?
    <td colspan=2>
      <label><?php write('#no')?>
        <input name=wwt_valorizing_biogas type=radio onclick="BEV.updateValorizingBiogas(0)" ans=0 checked>
      </label>
      <label><?php write('#yes')?>
        <input name=wwt_valorizing_biogas type=radio onclick="BEV.updateValorizingBiogas(1)" ans=1>
      </label>
    </td>
  </tr>
</tbody>

<script>
	//apply estimations from "dataModel/estimations.js"
	BEV.updateProducingBiogas=function(newValue){
    newValue=parseInt(newValue);
    Global.Configuration['Yes/No'].wwt_producing_biogas=newValue;
    Global.Waste.Treatment.wwt_biog_pro = Global.Estimations.estm_wwt_biog_pro();
    Global.Waste.Treatment.wwt_ch4_biog = Global.Estimations.estm_wwt_ch4_biog();
    if(!newValue){
      BEV.updateValorizingBiogas(newValue);
    }
    init();
	}

	BEV.updateValorizingBiogas=function(newValue){
    newValue=parseInt(newValue);
    Global.Configuration['Yes/No'].wwt_valorizing_biogas=newValue;
    Global.Waste.Treatment.wwt_biog_val=Global.Estimations.estm_wwt_biog_val();
    init();
	}
</script>
