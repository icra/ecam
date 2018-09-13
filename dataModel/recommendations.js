/* inputs with equations */
var Recommendations={
  /*fsc*/
    //influent BOD
    "fsc_bod_infl":function(){ return Global.General.bod_pday/1000*Global.Faecl.fs_onsi_pop*Global.General.Days(); },
    //sludge emptied
    "fsc_fslu_emp":function(){ return 0.3*Global.Faecl.fs_onsi_pop*Global.General.Days()/Global.Faecl.Containment.fsc_fdensity*Global.Faecl.Containment.fsc_cont_emp/100; },
    //BOD removed as FS
    "fsc_bod_rmvd":function(){ return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_bod_conc_fs; },

  /*fst*/
    //influent and effluent BOD
    "fst_bod_infl":function(){ return Global.Faecl.Containment.fsc_bod_rmvd; },
    "fst_bod_effl":function(){ return 0.10*Global.Faecl.Treatment.fst_bod_infl; },
    //biogas
    "fst_biog_pro":function(){return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;},
    "fst_ch4_biog":function(){return 59; },

  /*fsr*/
    //volume dumped
    "fsr_vol_dumping":function(){return Global.Faecl.Containment.fsc_fslu_emp},
    //mass sent to landapp
    "fsr_mass_landapp":function(){
      var fslu_typ=Tables.find('fsr_fslu_typ_la',Global.Faecl.Reuse.fsr_fslu_typ_la);
      var dry_weight=Tables.fsr_fslu_typ_la[fslu_typ].dry_weight;
      return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*dry_weight;
     },
    //mass sent to landfilling
    "fsr_mass_landfil":function(){
      var fslu_typ=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);
      var dry_weight=Tables.fsr_fslu_typ_lf[fslu_typ].dry_weight;
      return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*dry_weight;
     },
};
Global.Recommendations=Recommendations; //enable formula search in Recommendations
