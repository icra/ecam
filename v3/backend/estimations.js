/* estimations: inputs with equations */
//they should be moved inside the Ecam global class for consistency
let Estimations={
  /*FSM
    //fsc
      //influent BOD
      fsc_bod_infl(){
        return Global.General.bod_pday_fs/1000*Global.Waste.Collection.fsc_onsi_pop*Global.Days();
      },
      //sludge emptied
      fsc_fslu_emp(){ return Cts.ct_fs_prod.value*Global.Waste.Collection.fsc_onsi_pop*Global.Days()/Global.Waste.Collection.fsc_fdensity*Global.Faecl.Containment.fsc_cont_emp/100; },
      //BOD removed as FS
      fsc_bod_rmvd(){ return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_bod_conc_fs; },
    //fst
      //influent and effluent BOD
      fst_bod_infl(){ return Global.Faecl.Containment.fsc_bod_rmvd; },
      fst_bod_effl(){ return 0.10*Global.Faecl.Treatment.fst_bod_infl; },
      //biogas
      fst_biog_pro(){return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;},
      fst_ch4_biog(){return 59; },
    //fsr
      //volume dumped
      fsr_vol_dumping(){return Global.Faecl.Containment.fsc_fslu_emp},
      //mass sent to landapp
      fsr_mass_landapp(){
        let fslu_typ_la=Tables.find('fsr_fslu_typ_la',Global.Faecl.Reuse.fsr_fslu_typ_la);
        let total_solids=Tables.fsr_fslu_typ_la[fslu_typ_la].total_solids;
        return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*total_solids;
      },
      //mass sent to landfilling
      fsr_mass_landfil(){
        let fslu_typ_lf=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);
        let total_solids=Tables.fsr_fslu_typ_lf[fslu_typ_lf].total_solids;
        return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*total_solids;
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

  /*WW*/
    //200-300L of generated wastewater per person per day to m3
    ww_vol_gene(){return 0.2*Global.Waste.ww_resi_pop*Global.Days();},

    /*wwc*/
      wwc_vol_coll(){return 0.2*Global.Waste.Collection.wwc_conn_pop*Global.Days();},
      wwc_vol_coll_unt(){return Global.Waste.Collection.wwc_vol_coll - Global.Waste.Collection.wwc_vol_coll_tre;},
      wwc_vol_unco(){return Global.Waste.ww_vol_gene - Global.Waste.Collection.wwc_vol_coll;},
      wwc_vol_unco_unt(){return Global.Waste.Collection.wwc_vol_unco - Global.Waste.Collection.wwc_vol_unco_ons;},
      fsc_open_pop(){return Global.Waste.ww_resi_pop - Global.Waste.Collection.wwc_conn_pop - Global.Waste.Collection.fsc_onsi_pop;},

    /*wwt*/
      wwc_vol_conv(){return Global.Waste.Collection.wwc_vol_coll;},
      wwt_n2o_efac(){return 3.2},
      wwt_slu_lf_TVS(){
        let slu_disp=Tables.get_row('wwt_slu_disp',Global.Waste.Treatment.wwt_slu_disp);
        return slu_disp.TVS;
      },
      wwt_slu_la_N_cont(){
        let slu_disp=Tables.get_row('wwt_slu_disp',Global.Waste.Treatment.wwt_slu_disp);
        return slu_disp.la_N_cont;
      },
      wwt_slu_lf_N_cont(){
        let slu_disp=Tables.get_row('wwt_slu_disp',Global.Waste.Treatment.wwt_slu_disp);
        return slu_disp.la_N_cont;
      },
      wwt_biog_pro(){return Global.Waste.Treatment.wwt_serv_pop*Global.General.bod_pday*Global.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000;},
      wwt_biog_fla(){
        if(Global.Configuration.Questions.wwt_valorizing_biogas){
          return 0;
        }else{
          return Global.Waste.Treatment.wwt_biog_pro;
        }
      },
      wwt_biog_val(){return Global.Waste.Treatment.wwt_biog_pro},
      wwt_ch4_biog(){return 59},
      wwt_bod_infl(){
        let P   = Global.wwt.wwt_serv_pop;
        let BOD = Global.General.bod_pday;
        return P * BOD * 0.001 * Global.Days();
      },
      //SM
      wwt_mass_slu(){
        let b=1;
        if(Global.Configuration.Questions.wwt_producing_biogas){
          b=0.6;
        }
        return b*0.55*Global.General.bod_pday*Global.wwt.wwt_serv_pop*0.9*1e-3*1.176*Global.Days();
      },
      wwt_dryw_slu(){ return 0.04*Global.Waste.Treatment.wwt_mass_slu},
      wwt_temp_inc(){ return 1023},
};