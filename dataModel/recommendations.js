/* inputs with equations */
var Recommendations={
  //fsc sludge emptied
  "fsc_fslu_emp":function(){ return 0.3*Global.Faecl.fs_onsi_pop*Global.General.Days()/Global.Faecl.Containment.fsc_fdensity*Global.Faecl.Containment.fsc_cont_emp/100; },
  //fsc BOD removed as FS
  "fsc_bod_rmvd":function(){ return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_bod_conc_fs; },
  //fsc influent BOD
  "fsc_bod_infl":function(){ return Global.General.bod_pday/1000*Global.Faecl.fs_onsi_pop*Global.General.Days(); },

  //fst influent and effluent BOD
  "fst_bod_infl":function(){ return Global.Faecl.Containment.fsc_bod_rmvd; },
  "fst_bod_effl":function(){ return 0.10*Global.Faecl.Treatment.fst_bod_infl; },
  //fst biogas
  "fst_biog_pro":function(){return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;},
  "fst_ch4_biog":function(){return 59; },
  "fst_biog_fla":function(){return 0; }, //TODO
  "fst_biog_val":function(){return 0; }, //TODO
};

Global.Recommendations=Recommendations; //enable formula search in Recommendations

