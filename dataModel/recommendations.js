
/* inputs with equations */

var Recommendations={
  //Influent BOD load
  "fsc_bod_infl":function(){
    return Global.General.bod_pday/1000*Global.Faecl.fs_onsi_pop*Global.General.Days();
  },
};
