/* inputs with equations */
var Recommendations={
  /*FSM*/
    /*fsc*/
      //influent BOD
      "fsc_bod_infl":function(){ return Global.General.bod_pday/1000*Global.Faecl.fs_onsi_pop*Global.General.Days(); },
      //sludge emptied
      "fsc_fslu_emp":function(){ return Cts.ct_fs_prod.value*Global.Faecl.fs_onsi_pop*Global.General.Days()/Global.Faecl.Containment.fsc_fdensity*Global.Faecl.Containment.fsc_cont_emp/100; },
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
      "fsr_mass_landapp":function(){//<br>
        var fslu_typ_la=Tables.find('fsr_fslu_typ_la',Global.Faecl.Reuse.fsr_fslu_typ_la);//<br>
        var dry_weight=Tables.fsr_fslu_typ_la[fslu_typ_la].dry_weight;//<br>
        return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*dry_weight;//<br>
      },
      //mass sent to landfilling
      "fsr_mass_landfil":function(){//<br>
        var fslu_typ_lf=Tables.find('fsr_fslu_typ_lf',Global.Faecl.Reuse.fsr_fslu_typ_lf);//<br>
        var dry_weight=Tables.fsr_fslu_typ_lf[fslu_typ_lf].dry_weight;//<br>
        return Global.Faecl.Containment.fsc_fslu_emp*Global.Faecl.Containment.fsc_fdensity*dry_weight;//<br>
      },

  /*WW*/
    /*wwc*/
    /*wwt*/
      "wwt_biog_pro":function(){return Global.Waste.Treatment.wwt_serv_pop*Global.General.bod_pday*Global.General.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000;},
      "wwt_biog_fla":function(){//<br>
        if(Global.Configuration['Yes/No'].wwt_valorizing_biogas){//<br>
          return 0;//<br>
        }else{//<br>
          return Global.Waste.Treatment.wwt_biog_pro;//<br>
        }
      },
      "wwt_biog_val":function(){return Global.Waste.Treatment.wwt_biog_pro},
      "wwt_ch4_biog":function(){return 59},
      "wwt_bod_infl":function(){return Global.General.bod_pday/1000*Global.Waste.ww_serv_pop()*Global.General.Days()},
      "wwt_bod_effl":function(){return 0.10*Global.Waste.Treatment.wwt_bod_infl},
      //SM
      "wwt_mass_slu":function(){//<br>
        if(Global.Configuration['Yes/No'].wwt_producing_biogas){//<br>
          var b=0.6;//<br>
        }else{//<br>
          var b=1;//<br>
        }//<br>
        return b*0.55*Global.General.bod_pday*Global.Waste.ww_serv_pop()*0.9*1e-3*1.176*Global.General.Days();//<br>
      },
      "wwt_dryw_slu"      :function(){return 0.04*Global.Waste.Treatment.wwt_mass_slu},
      "wwt_mass_slu_sto"  :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_comp" :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_inc"  :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_app"  :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_land" :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_stock":function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_temp_inc"      :function(){return 1023},
    /*wwd*/
    "wwd_bod_effl":function(){return Global.Waste.Treatment.wwt_bod_effl},

  /*WS*/
    /*wsa*/
    /*wst*/
    /*wsd*/
};
Global.Recommendations=Recommendations;//enable formula search in Recommendations
