<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#root {
			margin:1em;
			text-align:left;
			font-family:monospace;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1>Summary of estimations at Initial GHG assessment</h1>
<div id=root>

<b><u>Equations for input estimations based on other inputs:</u></b>
<h3>1. Estimations performed when answering biogas questions (produced and valorised)</h3>
<div id=biogas></div>

<h3>2. Estimations performed when the main treatment type is chosen</h3>
<div id=treatment></div>

<h3>3. Estimations performed when the sludge disposal method is chosen</h3>
<div id=disposal></div>

FSM
<h3>4. Estimations performed in Faecal Sludge Management</h3>
<div id=fsm></div>

<script>
  let estimations = {
    biogas:{
      wwt_biog_pro: Recommendations.wwt_biog_pro,
      wwt_ch4_biog: Recommendations.wwt_ch4_biog,
      wwt_biog_pro: Recommendations.wwt_biog_pro,
      wwt_biog_val: Recommendations.wwt_biog_val,
    },
    treatment:{
      wwt_ch4_efac: Global.Estimations.estm_wwt_ch4_efac,
      wwt_bod_infl: Recommendations.wwt_bod_infl,
      wwt_bod_effl: Recommendations.wwt_bod_effl,
      wwt_bod_slud: Global.Estimations.estm_wwt_bod_slud,
      wwd_bod_effl: Recommendations.wwd_bod_effl,
    },
    disposal:{
      wwt_mass_slu      : Recommendations.wwt_mass_slu,
      wwt_dryw_slu      : Recommendations.wwt_dryw_slu,
      wwt_temp_inc      : Recommendations.wwt_temp_inc,
      wwt_slu_lf_N_cont : Recommendations.wwt_slu_lf_N_cont,
      wwt_slu_lf_TVS    : Recommendations.wwt_slu_lf_TVS,
      wwt_slu_la_N_cont : Recommendations.wwt_slu_la_N_cont,
    },
    fsm:{
      fsc_bod_infl     : Recommendations.fsc_bod_infl,
      fsc_fslu_emp     : Recommendations.fsc_fslu_emp,
      fsc_bod_rmvd     : Recommendations.fsc_bod_rmvd,
      fst_bod_infl     : Recommendations.fst_bod_infl,
      fst_bod_effl     : Recommendations.fst_bod_effl,
      fst_biog_pro     : Recommendations.fst_biog_pro,
      fst_ch4_biog     : Recommendations.fst_ch4_biog,
      fsr_mass_landapp : Recommendations.fsr_mass_landapp,
      fsr_la_N_cont    : Recommendations.fsr_la_N_cont,
      fsr_mass_landfil : Recommendations.fsr_mass_landfil,
      fsr_lf_N_cont    : Recommendations.fsr_lf_N_cont,
      fsr_lf_TVS       : Recommendations.fsr_lf_TVS,
      fsr_vol_dumping  : Recommendations.fsr_vol_dumping,
    },
  };
  Object.keys(estimations).forEach(key=>{
    let div_container = document.querySelector("#root div#"+key);
    Object.entries(estimations[key]).forEach(([key,fn])=>{
      let div = document.createElement('div'); div_container.appendChild(div);
      div.style.borderBottom="1px solid #ccc";
      div.innerHTML=`<b>${translate(key+'_descr')}</b> &rarr; ${key} = `;
      div.innerHTML+=Formulas.prettify(fn.toString());
    });
  });
</script>


<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
