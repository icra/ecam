
/* inputs with equations */

var Recommendations={
  //FS emptied
  "fsc_fslu_emp":function(){
    return 0.3*Global.Faecl.fs_onsi_pop*Global.General.Days()/Global.Faecl.Containment.fsc_fdensity*Global.Faecl.Containment.fsc_cont_emp/100;
  },

  //BOD removed as FS
  "fsc_bod_rmvd":function(){
    return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_bod_conc_fs;
  },

  //Influent BOD load (containment)
  "fsc_bod_infl":function(){
    return Global.General.bod_pday/1000*Global.Faecl.fs_onsi_pop*Global.General.Days();
  },
  //Influent BOD load (treatment)
  "fst_bod_infl":function(){
    return Global.Faecl.Containment.fsc_bod_rmvd;
  },
  //Effluent BOD load (treatment)
  "fst_bod_effl":function(){
    return 0.10*Global.Faecl.Treatment.fst_bod_infl;
  },

  //Biogas produced in fst
  "fst_biog_pro":function(){
    return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;
  },
  //Biogas produced in fst
  "fst_ch4_biog":function(){
    return 59;
  },
};

Global.Recommendations=Recommendations; //enable formula search in Recommendations
