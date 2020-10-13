/* estimations: inputs with equations */
//they should be moved inside the Ecam global class for consistency
let Estimations={
  //ww
    //200L of generated wastewater per person per day
    ww_vol_gene(stage){return 0.2*stage.ww_resi_pop*Global.Days();},
  //wwc
    wwc_vol_coll    (substage){return 0.2*substage.wwc_conn_pop*Global.Days();},
    wwc_vol_coll_unt(substage){return substage.wwc_vol_coll - substage.wwc_vol_coll_tre;},
    wwc_vol_coll_tre(substage){return substage.wwc_vol_coll - substage.wwc_vol_coll_unt;},
  //wwt
    wwt_n2o_efac(substage){return 3.2},
    wwd_n2o_efac(substage){return 3.2},
    wwt_slu_lf_TVS(substage){
      let slu_disp=Tables.get_row('wwt_slu_disp',substage.wwt_slu_disp);
      return slu_disp.TVS;
    },
    wwt_slu_la_N_cont(substage){
      let slu_disp=Tables.get_row('wwt_slu_disp',substage.wwt_slu_disp);
      return slu_disp.la_N_cont;
    },
    wwt_slu_lf_N_cont(substage){
      let slu_disp=Tables.get_row('wwt_slu_disp',substage.wwt_slu_disp);
      return slu_disp.la_N_cont;
    },
    wwt_biog_pro(substage){return substage.wwt_serv_pop*Global.General.bod_pday*Global.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000;},
    wwt_biog_fla(substage){
      if(substage.Configuration.Questions.wwt_valorizing_biogas){
        return 0;
      }else{
        return substage.wwt_biog_pro;
      }
    },
    wwt_biog_val(substage){return substage.wwt_biog_pro - substage.wwt_biog_fla},
    wwt_ch4_biog(substage){return 59},
    wwt_bod_infl(substage){
      let P   = substage.wwt_serv_pop;
      let BOD = Global.General.bod_pday;
      return P * BOD * 0.001 * Global.Days();
    },
    wwt_mass_slu(substage){
      let b=1;
      if(substage.Configuration.Questions.wwt_producing_biogas){
        b=0.6;
      }
      return b*0.55*Global.General.bod_pday*substage.wwt_serv_pop*0.9*1e-3*1.176*Global.Days();
    },
    wwt_dryw_slu(substage){ return 0.04*substage.wwt_mass_slu},
    wwt_temp_inc(substage){ return 1023},
  //wwo
    wwo_vol_unco(substage){return 0.2*substage.wwo_onsi_pop*Global.Days()},
    wwo_vol_unco_unt(substage){return substage.wwo_vol_unco - substage.wwo_vol_unco_ons;},
    //0.3kg/person/day
    wwo_fslu_emp(substage){
      return 0.3 * substage.wwo_onsi_pop * Global.Days()/substage.wwo_fdensity * substage.wwo_cont_emp/100; 
    },
  //wwo
    wwo_bod_infl(substage){
      return Global.General.bod_pday_fs/1000*substage.wwo_onsi_pop*Global.Days();
    },
  /*
  wwo_fslu_emp(){ return Cts.ct_fs_prod.value*Global.Waste.Collection.wwo_onsi_pop*Global.Days()/Global.Waste.Collection.wwo_fdensity*Global.Faecl.Containment.wwo_cont_emp/100; },
  wwo_bod_rmvd(){ return Global.Faecl.Containment.wwo_fslu_emp*Global.Faecl.Containment.wwo_bod_conc_fs; },

  //fst
  //influent and effluent BOD
  fst_bod_infl(){ return Global.Faecl.Containment.wwo_bod_rmvd; },
  fst_bod_effl(){ return 0.10*Global.Faecl.Treatment.fst_bod_infl; },
  //biogas
  fst_biog_pro(){return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;},
  fst_ch4_biog(){return 59; },

  //fsr
  //volume dumped
  fsr_vol_dumping(){return Global.Faecl.Containment.wwo_fslu_emp},
  //mass sent to landapp
  fsr_mass_landapp(){
    let fslu_typ_la=Tables.find('fsr_fslu_typ_la',Global.Faecl.Reuse.fsr_fslu_typ_la);
    let total_solids=Tables.fsr_fslu_typ_la[fslu_typ_la].total_solids;
    return Global.Faecl.Containment.wwo_fslu_emp*Global.Faecl.Containment.wwo_fdensity*total_solids;
  },
  //mass sent to landfilling
  fsr_mass_landfil(){
    let fslu_typ_lf=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);
    let total_solids=Tables.fsr_fslu_typ_lf[fslu_typ_lf].total_solids;
    return Global.Faecl.Containment.wwo_fslu_emp*Global.Faecl.Containment.wwo_fdensity*total_solids;
  },
  //N content of FS
  fsr_la_N_cont(){
    let fslu_typ=Tables.find('fsr_fslu_typ_la',Global.Faecl.Reuse.fsr_fslu_typ_la);
    return Tables.fsr_fslu_typ_la[fslu_typ].N_content;
  },
  //N content of FS
  fsr_lf_N_cont(){
    let fslu_typ=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);
    return Tables.fsr_fslu_typ_lf[fslu_typ].N_content;
  },
  //TVS content of FS
  fsr_lf_TVS(){
    let fslu_typ=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);
    return 100*Tables.fsr_fslu_typ_lf[fslu_typ].TVS;
  },
  */
};
