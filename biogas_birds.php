<!--wwt are you producing biogas-->
<tr stage=waste class=hidden>
	<td><?php write('#wwt_producing_biogas')?>?
	<td><label><?php write('#no')?>  <input name=wwt_producing_biogas type=radio onclick="BEV.updateProducingBiogas(0)" ans=0 checked></label>
	<td><label><?php write('#yes')?> <input name=wwt_producing_biogas type=radio onclick="BEV.updateProducingBiogas(1)" ans=1></label>
</tr>

<!--wwt are you valorizing biogas-->
<tr stage=waste class=hidden>
	<td><?php write('#wwt_valorizing_biogas')?>?
	<td><label><?php write('#no')?>  <input name=wwt_valorizing_biogas type=radio onclick="BEV.updateValorizingBiogas(0)" ans=0 checked></label>
	<td><label><?php write('#yes')?> <input name=wwt_valorizing_biogas type=radio onclick="BEV.updateValorizingBiogas(1)" ans=1></label>
</tr>

<script>
	//estimations hand coded
	BEV.updateProducingBiogas=function(newValue){
		if(newValue){
			//Estimation for "producing_biogas" and "not valorizing biogas"
			Global.Waste.Treatment.wwt_biog_pro = Global.Waste.ww_serv_pop() * Global.General.bod_pday*Cts.ct_bod_kg.value*Cts.ct_biog_g.value*Global.General.Days()/1000;
			Global.Waste.Treatment.wwt_ch4_biog = 59; //default of 59 of ch4 in biogas
		}
		else{
			Global.Waste.Treatment.wwt_biog_pro=0;
			Global.Waste.Treatment.wwt_biog_val=0;
		}
		BEV.updateQuestion('wwt_producing_biogas',newValue);
	}

	BEV.updateValorizingBiogas=function(newValue){
		if(newValue){
			//if valorizing: assume it equal to biogas produced
			Global.Waste.Treatment.wwt_biog_val = Global.Waste.Treatment.wwt_biog_pro;
		}
		else{
			Global.Waste.Treatment.wwt_biog_val=0;
		}
		BEV.updateQuestion('wwt_valorizing_biogas',newValue);
	}
</script>
