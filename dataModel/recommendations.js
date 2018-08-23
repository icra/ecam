
/* inputs with equations */

var Recommendations={
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

  //BOD removed as sludge
  "fst_bod_slud":function(){
    var bod_rmvd_as_sludge=Tables.fst_type_tre[Tables.find('fst_type_tre',Global.Faecl.Treatment.fst_type_tre)].bod_rmvd_as_sludge_estm;//<br>
    return Global.Faecl.Treatment.fst_bod_infl*bod_rmvd_as_sludge;
  },

  //Biogas produced in fst
  "fst_biog_pro":function(){
    return Global.Faecl.Treatment.fst_bod_infl*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;
  },
};

Global.Recommendations=Recommendations; //enable formula search in Recommendations
