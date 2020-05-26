function apply_fsm_estimations(){
  console.log('applying estimations to FSM');

  //order matters
  /*FSC*/{
    let fsc=Global.Faecl.Containment;
    let cont_typ=Tables.find('fsc_type_tre',fsc.fsc_type_tre); //containment type (string)
    Global.Configuration.Selected.fsc_ch4_efac    = cont_typ;
    Global.Configuration.Selected.fsc_fdensity    = cont_typ;
    Global.Configuration.Selected.fsc_bod_conc_fs = cont_typ;
    fsc.fsc_ch4_efac    = Tables.fsc_type_tre[cont_typ][fsc.fsc_flooding?'ch4_efac_flooding':'ch4_efac'];
    fsc.fsc_fdensity    = Tables.fsc_type_tre[cont_typ].fs_density;
    fsc.fsc_bod_conc_fs = Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
    fsc.fsc_bod_infl    = Recommendations.fsc_bod_infl();
    fsc.fsc_fslu_emp    = Recommendations.fsc_fslu_emp();
    fsc.fsc_bod_rmvd    = Recommendations.fsc_bod_rmvd();
  }
  /*FST*/{
    let fst=Global.Faecl.Treatment;
    let type_tre=Tables.find('fst_type_tre',fst.fst_type_tre); //treatment type (string)
    Global.Configuration.Selected.fst_ch4_efac = type_tre;
    Global.Configuration.Selected.fst_bod_slud = type_tre;
    fst.fst_ch4_efac = Tables.fst_type_tre[type_tre].ch4_efac;
    fst.fst_bod_infl = Recommendations.fst_bod_infl();
    fst.fst_bod_effl = Recommendations.fst_bod_effl();
    fst.fst_bod_slud = Tables.fst_type_tre[type_tre].bod_rmvd_as_sludge_estm*fst.fst_bod_infl;
  }
  /*FSR*/{
    let fsr=Global.Faecl.Reuse;
    //if landapp
    if(Global.Configuration['Yes/No'].fsr_landapp){
      fsr.fsr_fslu_typ_la  = fsr.fsr_fslu_typ;
      fsr.fsr_mass_landapp = Recommendations.fsr_mass_landapp();
      fsr.fsr_la_N_cont    = Recommendations.fsr_la_N_cont();
    }
    //if landfill
    if(Global.Configuration['Yes/No'].fsr_landfil){
      fsr.fsr_fslu_typ_lf  = fsr.fsr_fslu_typ;
      fsr.fsr_mass_landfil = Recommendations.fsr_mass_landfil();
      fsr.fsr_lf_N_cont    = Recommendations.fsr_lf_N_cont();
      fsr.fsr_lf_TVS       = Recommendations.fsr_lf_TVS();
    }
    //dumping
    if(Global.Configuration['Yes/No'].fsr_dumping){
      fsr.fsr_vol_dumping = Recommendations.fsr_vol_dumping();
      let fsc=Global.Faecl.Containment;
      let cont_typ=Tables.find('fsc_type_tre',fsc.fsc_type_tre); //containment type (string)
      fsr.fsr_bod_conc_fs = Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
    }
  }
  init();
}

/*NUMERIC INPUTS LISTENERS*/
  //onchange fsc_vol_trck (volume of fuel consumed)
  document.querySelector('#inputs input#fs_vol_trck').addEventListener('change',function(){
    let value=parseFloat((this.value));
    if(value){
      Global.Configuration['Yes/No'].fsc_transport=1; //activate filter for fsc_transport
      Global.Configuration['Yes/No'].fst_transport=1; //activate filter for fst_transport
      Global.Configuration['Yes/No'].fsr_transport=1; //activate filter for fsr_transport
    }
    updateResult(); //write cookies
  });
  //onchange fsc_cont_emp (% containments emptied)
  document.querySelector('#inputs input#fsc_cont_emp').addEventListener('change',function(){
    Global.Faecl.Containment.fsc_cont_emp=parseFloat(this.value);
    apply_fsm_estimations();
  });
  //user selects yes or no for flooding
  document.querySelectorAll('input[name=fsc_flooding][type=radio]').forEach(el=>{
    el.addEventListener('click',function(){
      Global.Faecl.Containment.fsc_flooding=parseInt(this.value);
      apply_fsm_estimations();
    });
  });

/*USER SELECTS*/
  //user selects main containment type
  document.querySelector('#inputs select#fsc_type_tre').addEventListener('change',function(){
    Global.Faecl.Containment.fsc_type_tre=parseInt(this.value);
    apply_fsm_estimations();
  });
  //user selects main treatment type
  document.querySelector('#inputs select#fst_type_tre').addEventListener('change',function(){
    Global.Faecl.Treatment.fst_type_tre=parseInt(this.value);
    apply_fsm_estimations();
  });
  //user selects main disposal type
  document.querySelector('#inputs select#fsr_type_tre').addEventListener('change',function(){
    Global.Faecl.Reuse.fsr_type_tre=parseInt(this.value);
    let fsr=Global.Faecl.Reuse;
    //reset FSR filters and inputs
    Global.Configuration['Yes/No'].fsr_landapp=0;
    Global.Configuration['Yes/No'].fsr_landfil=0;
    Global.Configuration['Yes/No'].fsr_dumping=0;
    fsr.fsr_fslu_typ_la  = 0;
    fsr.fsr_fslu_typ_lf  = 0;
    fsr.fsr_mass_landapp = 0;
    fsr.fsr_mass_landfil = 0;
    fsr.fsr_vol_dumping  = 0;
    fsr.fsr_bod_conc_fs  = 0;
    let type_dis=Tables.find('fsr_type_tre',fsr.fsr_type_tre);
    let filter={
      "Landfilling":      "fsr_landfil",
      "Land application": "fsr_landapp",
      "Dumping":          "fsr_dumping",
    }[type_dis];
    if(filter)Global.Configuration['Yes/No'][filter]=1;

    apply_fsm_estimations();
  });
  //user selects type of faecal sludge disposed
  document.querySelector('#inputs select#fsr_fslu_typ').addEventListener('change',function(){
    Global.Faecl.Reuse.fsr_fslu_typ=parseInt(this.value);
    apply_fsm_estimations();
  });

//user selects yes or no for FSM biogas
  document.querySelectorAll('input[name=fst_producing_biogas][type=radio]').forEach(el=>{
    el.addEventListener('click',function(){
      let newValue=parseInt(this.value);
      Global.Configuration['Yes/No'][this.name]=newValue;

      //apply estimations for fst biogas
      if(newValue){
        Global.Faecl.Treatment.fst_biog_pro = Recommendations.fst_biog_pro();
        Global.Faecl.Treatment.fst_ch4_biog = Recommendations.fst_ch4_biog();
        Global.Faecl.Treatment.fst_biog_val = 0;
        Global.Faecl.Treatment.fst_biog_fla = Recommendations.fst_biog_pro();
      }else{
        Global.Configuration['Yes/No'].fst_valorizing_biogas=0;
        Global.Faecl.Treatment.fst_biog_pro = 0;
        Global.Faecl.Treatment.fst_biog_val = 0;
        Global.Faecl.Treatment.fst_biog_fla = 0;
        Global.Faecl.Treatment.fst_ch4_biog = 0;
      }
      init();
    });
  });

  document.querySelectorAll('input[name=fst_valorizing_biogas][type=radio]').forEach(el=>{
    el.addEventListener('click',function(){
      let newValue=parseInt(this.value);
      Global.Configuration['Yes/No'][this.name]=newValue;

      //apply estimations for fst biogas valorization
      if(newValue){
        Global.Faecl.Treatment.fst_biog_val = Global.Faecl.Treatment.fst_biog_pro; //valorized is produced
        Global.Faecl.Treatment.fst_biog_fla = 0;                                   //flared is zero
      }else{
        Global.Faecl.Treatment.fst_biog_val = 0;                                   //valorized is zero
        Global.Faecl.Treatment.fst_biog_fla = Global.Faecl.Treatment.fst_biog_pro; //flared is produced
      }
      init();
    });
  });
