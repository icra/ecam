/* inputs with equations */
var Recommendations={
  /*FSM*/
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

  /*WW*/
    /*wwc*/
    /*wwt*/
      "wwt_biog_pro":function(){return Global.Waste.Treatment.wwt_serv_pop*Global.General.bod_pday*Global.General.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000;},
      "wwt_biog_fla":function(){
        if(Global.Configuration['Yes/No'].wwt_valorizing_biogas){
          return 0;
        }else{
          return Global.Waste.Treatment.wwt_biog_pro;
        }
      },
      "wwt_biog_val":function(){return Global.Waste.Treatment.wwt_biog_pro},
      "wwt_ch4_biog":function(){return 59},
      "wwt_bod_infl":function(){return Global.General.bod_pday/1000*Global.Waste.ww_serv_pop()*Global.General.Days()},
      "wwt_bod_effl":function(){return 0.10*Global.Waste.Treatment.wwt_bod_infl},
      //SM
      "wwt_mass_slu":function(){
        if(Global.Configuration['Yes/No'].wwt_producing_biogas){
          var b=0.6;
        }else{
          var b=1;
        }
        return b*0.55*Global.General.bod_pday*Global.Waste.ww_serv_pop()*0.9*1e-3*1.176*Global.General.Days();//<br>
      },
      "wwt_dryw_slu"      :function(){return 0.04*Global.Waste.Treatment.wwt_mass_slu},
      "wwt_mass_slu_comp" :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_inc"  :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_app"  :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_land" :function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_mass_slu_stock":function(){return Global.Waste.Treatment.wwt_dryw_slu},
      "wwt_temp_inc"      :function(){return 1023},
    /*wwd*/

  /*WS*/
    /*wsa*/
    /*wst*/
    /*wsd*/
};
Global.Recommendations=Recommendations;//enable formula search in Recommendations
