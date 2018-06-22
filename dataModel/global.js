/**
  Main data structure
  This object stores user inputs and has all equations.
  All inputs are saved to cookies (compressed) (see "js/updateGlobalFromCookies.js")
*/
var Global = {
  General:{
    Name:"Untitled system",
    AssessmentPeriodStart:"2019-01-01",
    AssessmentPeriodEnd:"2020-01-01",
    Comments:"",
    Currency:"USD",

    //country related
    Country:"false",
    conv_kwh_co2:0, //conversion factor for grid electricity
    bod_pday: 0, //BOD5 per person per day
    prot_con: 0, //prot consumption per person per year
    //country related

    //do you have fuel engines in any stage?
    anyFuelEngines:0,

    //calculate days and years
    Days:function(){
      var startDate=new Date(Global.General.AssessmentPeriodStart);
      var finalDate=new Date(Global.General.AssessmentPeriodEnd);
      return (finalDate-startDate)/1000/60/60/24;
    },
    Years:function(){return this.Days()/365},

    //total GHG emissions
    TotalGHG:function(){
      return Global.Water.ws_KPI_GHG() + Global.Waste.ww_KPI_GHG();
    },

    //total energy consumed
    TotalNRG:function(){return Global.Water.ws_nrg_cons()+Global.Waste.ww_nrg_cons()},

    /*carbon and nitrogen content based on sludge type and mass*/
    content_C:function(sludge_mass,sludge_type){//<br>
      if(sludge_type=="Non-digested"){//<br>
        return Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*sludge_mass}//<br>
      if(sludge_type=="Digested"){//<br>
        return Cts.ct_oc_vs.value*Cts.ct_vs_dig.value*sludge_mass}//<br>
      else{return 0}
    },
    content_N:function (sludge_mass,sludge_type){//<br>
      if(sludge_type=="Non-digested"){//<br>
        return sludge_mass*0.04}//<br>
      if(sludge_type=="Digested"){//<br>
        return sludge_mass*0.05}//<br>
      else{return 0}
    },
  },

  /**Level 1 - Water Supply*/
  Water:{
    "ws_resi_pop":0,
    "ws_serv_pop":0,
    "ws_nrg_cost":0,
    "ws_run_cost":0,
    ws_nrg_cons:function(){return this.Abstraction.wsa_nrg_cons+this.Treatment.wst_nrg_cons+this.Distribution.wsd_nrg_cons},
    ws_vol_fuel:function(){return this.Abstraction.wsa_vol_fuel+this.Treatment.wst_vol_fuel+this.Distribution.wsd_vol_fuel},
    ws_SL_serv_pop:function(){return 100*Global.Water.ws_serv_pop/Global.Water.ws_resi_pop},
    ws_SL_nrg_cost:function(){return 100*this.ws_nrg_cost/this.ws_run_cost},
    ws_SL_auth_con:function(){return 1000*this.Distribution.wsd_auth_con/this.ws_serv_pop/Global.General.Days()},

    "Abstraction":{
      //no filter
      wsa_nrg_cons:0,
      wsa_vol_conv:0,
      wsa_nrg_per_abs_watr:function(){return this.wsa_nrg_cons/this.wsa_vol_conv},
      wsa_nrg_per_pmp_watr:function(){return this.wsa_nrg_pump/this.wsa_vol_pump},
      //fuel engines?
      wsa_fuel_typ:0,
      wsa_vol_fuel:0,
      //pumping?
      wsa_vol_pump:0,
      wsa_nrg_pump:0,
      //pumping efficiency?
      wsa_sta_head:0,
      wsa_pmp_head:0,
      wsa_main_len:0,
      wsa_pmp_type:0,
      wsa_pmp_size:0,
      wsa_pmp_flow:0, //Measured pump flow L/s
      wsa_pmp_volt:0, //Measured pump voltage V
      wsa_pmp_amps:0, //Measured pump current Amp

      c_wsa_pmp_pw:function(){return this.wsa_pmp_flow*this.wsa_pmp_head*Cts.ct_gravit.value/1000;},
      wsa_KPI_std_nrg_cons:function(){return this.wsa_nrg_pump/(this.wsa_vol_pump*this.wsa_pmp_head/100)},
      wsa_KPI_un_head_loss:function(){return 1000*(this.wsa_pmp_head-this.wsa_sta_head)/this.wsa_main_len},

      wsa_pmp_pf:0.9, //power factor (no unit)
      wsa_KPI_nrg_elec_eff:function(){return 100*this.c_wsa_pmp_pw()/(this.wsa_pmp_volt*this.wsa_pmp_amps*Math.sqrt(3)*this.wsa_pmp_pf/1000)},

      //GHG emissions Abstraction
      wsa_KPI_GHG_elec:function(){return this.wsa_nrg_cons*Global.General.conv_kwh_co2},
      wsa_KPI_GHG_fuel:function(){//<br>
        return this.wsa_KPI_GHG_fuel_co2()+this.wsa_KPI_GHG_fuel_n2o()+this.wsa_KPI_GHG_fuel_ch4();
      },
      wsa_KPI_GHG_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa_fuel_typ)];//<br>
        return this.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wsa_KPI_GHG_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa_fuel_typ)];//<br>
        return this.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      wsa_KPI_GHG_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa_fuel_typ)];//<br>
        return this.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },

      wsa_KPI_GHG:function(){//<br>
        return this.wsa_KPI_GHG_elec()+this.wsa_KPI_GHG_fuel();
      },

      //opportunities
      wsa_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
      wsa_KPI_ghg_estm_red:function(){return Global.General.conv_kwh_co2*this.wsa_KPI_nrg_estm_sav()},
      wsa_KPI_std_nrg_newp:function(){return this.wsa_KPI_nrg_elec_eff()/this.wsa_pmp_exff*this.wsa_KPI_std_nrg_cons()},
      wsa_KPI_nrg_cons_new:function(){return this.wsa_KPI_nrg_elec_eff()/this.wsa_pmp_exff*this.wsa_nrg_pump},
      wsa_KPI_nrg_estm_sav:function(){return this.wsa_nrg_cons-this.wsa_KPI_nrg_cons_new()},
    },

    "Treatment":{
      //no filter
      "wst_nrg_cons":0,
      "wst_vol_trea":0,
      "wst_mass_slu":0,
      "wst_treatmen":0,
      "wst_tst_carr":0,
      "wst_trea_cap":0,
      wst_KPI_nrg_per_m3:function(){return this.wst_nrg_cons/this.wst_vol_trea},
      wst_KPI_slu_per_m3:function(){return this.wst_mass_slu/this.wst_vol_trea},
      wst_KPI_capac_util:function(){return 100*this.wst_vol_trea/this.wst_trea_cap},
      wst_KPI_tst_carr:function(){return this.wst_tst_carr;},
      //fuel engines?
      "wst_fuel_typ":0,
      "wst_vol_fuel":0,
      //water efficiency?
      //pumping efficiency?
      "wst_vol_pump":0,
      "wst_nrg_pump":0,
      "wst_pmp_head":0,
      wst_KPI_std_nrg_cons:function(){return this.wst_nrg_pump/(this.wst_vol_pump*this.wst_pmp_head/100)},
      //wst GHG
      wst_KPI_GHG_elec:function(){return this.wst_nrg_cons*Global.General.conv_kwh_co2},
      wst_KPI_GHG_fuel:function(){return this.wst_KPI_GHG_fuel_co2()+this.wst_KPI_GHG_fuel_n2o()+this.wst_KPI_GHG_fuel_ch4();},
      wst_KPI_GHG_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst_fuel_typ)];//<br>
        return this.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wst_KPI_GHG_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst_fuel_typ)];//<br>
        return this.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      wst_KPI_GHG_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst_fuel_typ)];//<br>
        return this.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },
      wst_KPI_GHG:function(){return this.wst_KPI_GHG_elec()+this.wst_KPI_GHG_fuel();},
    },

    "Distribution":{
      //no filter
      "wsd_nrg_cons":0,
      "wsd_vol_dist":0,
      "wsd_auth_con":0,
      "wsd_bill_con":0,
      wsd_KPI_nrg_per_vd:function(){return this.wsd_nrg_cons/this.wsd_vol_dist},
      wsd_KPI_nrg_per_m3:function(){return this.wsd_nrg_cons/this.wsd_auth_con},
      wsd_SL_nr_water:function(){return 100*(this.wsd_vol_dist-this.wsd_bill_con)/this.wsd_vol_dist;},

      wsa_SL_GHG_nrw:function(){return (Global.Water.Abstraction.wsa_KPI_GHG() * (this.wsd_vol_dist - this.wsd_auth_con) / Global.Water.Abstraction.wsa_vol_conv)},
      wst_SL_GHG_nrw:function(){return (Global.Water.Treatment.wst_KPI_GHG() * (this.wsd_vol_dist - this.wsd_auth_con) / Global.Water.Treatment.wst_vol_trea)},

      wsd_SL_GHG_nrw:function(){return (this.wsd_KPI_GHG() * (this.wsd_vol_dist - this.wsd_auth_con) / this.wsd_vol_dist)},
      wsd_SL_ghg_attr:function(){return this.wsa_SL_GHG_nrw()+this.wst_SL_GHG_nrw()+this.wsd_SL_GHG_nrw()},

      wsd_SL_water_loss:function(){return 100*(this.wsd_vol_dist-this.wsd_auth_con)/this.wsd_vol_dist;},
      //fuel engines?
      "wsd_fuel_typ":0,
      "wsd_vol_fuel":0,
      //water trucks?
      "wsd_trck_typ":0,
      "wsd_vol_trck":0,
      //service performance?
      "wsd_deli_pts":0,
      "wsd_ser_cons":0,
      "wsd_time_pre":0,
      //topographic?
      "wsd_min_pres":0,
      "wsd_hi_no_el":0,
      "wsd_lo_no_el":0,
      "wsd_av_no_el":0,
      "wsd_wt_el_no":0,
      //pumping?
      wsd_vol_pump:0,
      wsd_nrg_pump:0,
      wsd_pmp_size:0,
      wsd_sta_head:0,
      wsd_pmp_head:0,
      wsd_main_len:0,
      //pump efficiency
      wsd_pmp_flow:0, //Measured pump flow L/s
      wsd_pmp_volt:0, //Measured pump voltage V
      wsd_pmp_amps:0, //Measured pump current Amp
      c_wsd_pmp_pw:function(){return this.wsd_pmp_flow*this.wsd_pmp_head*Cts.ct_gravit.value/1000;},
      //opportunities
      wsd_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
      wsd_KPI_nrg_per_m3:function(){return this.wsd_nrg_cons/this.wsd_auth_con},
      wsd_KPI_nrg_per_vd:function(){return this.wsd_nrg_cons/this.wsd_vol_dist},
      wsd_SL_nr_water:function(){
        return 100*(this.wsd_vol_dist-this.wsd_bill_con)/this.wsd_vol_dist;
      },
      wsd_SL_water_loss:function(){
        return 100*(this.wsd_vol_dist-this.wsd_auth_con)/this.wsd_vol_dist;
      },
      wsd_SL_pres_ade:function(){return 100*this.wsd_deli_pts/this.wsd_ser_cons},
      wsd_SL_cont_sup:function(){return 100*this.wsd_time_pre/24},
      c_wsd_nrg_topo:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_hi_no_el-this.wsd_av_no_el)/3600000},
      c_wsd_nrg_natu:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_wt_el_no-this.wsd_lo_no_el)/3600000},
      c_wsd_nrg_mini:function(){return Cts.ct_gravit.value*this.wsd_auth_con*(this.wsd_min_pres+this.wsd_av_no_el-this.wsd_lo_no_el)/3600000},
      c_wsd_nrg_supp:function(){return this.wsd_nrg_cons+this.c_wsd_nrg_natu()},
      wsd_KPI_nrg_efficien:function(){return 100*this.c_wsd_nrg_mini()/this.c_wsd_nrg_supp()},
      wsd_KPI_nrg_topgraph:function(){return 100*this.c_wsd_nrg_topo()/this.c_wsd_nrg_supp()},
      wsd_KPI_std_nrg_cons:function(){return this.wsd_nrg_pump/(this.wsd_vol_pump*this.wsd_pmp_head/100)},
      wsd_KPI_un_head_loss:function(){return 1000*(this.wsd_pmp_head-this.wsd_sta_head)/this.wsd_main_len},
      wsd_KPI_water_losses:function(){return Math.max(0,1000*(this.wsd_vol_dist-this.wsd_auth_con)/(this.wsd_main_len))/Global.General.Years()},

      wsd_pmp_pf:0.9, //power factor (no unit)
      wsd_KPI_nrg_elec_eff:function(){return 100*this.c_wsd_pmp_pw()/(this.wsd_pmp_volt*this.wsd_pmp_amps*Math.sqrt(3)*this.wsd_pmp_pf/1000)},

      wsd_KPI_std_nrg_newp:function(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_KPI_std_nrg_cons()},

      wsd_KPI_nrg_cons_new:function(){return this.wsd_KPI_nrg_elec_eff()/this.wsd_pmp_exff*this.wsd_nrg_pump},
      wsd_KPI_nrg_estm_sav:function(){return this.wsd_nrg_cons-this.wsd_KPI_nrg_cons_new()},
      wsd_KPI_ghg_estm_red:function(){return Global.General.conv_kwh_co2*this.wsd_KPI_nrg_estm_sav()},
      //wsd GHG
      wsd_KPI_GHG_elec:function(){return this.wsd_nrg_cons*Global.General.conv_kwh_co2},
      wsd_KPI_GHG_fuel:function(){//<br>
        return this.wsd_KPI_GHG_fuel_co2()+this.wsd_KPI_GHG_fuel_n2o()+this.wsd_KPI_GHG_fuel_ch4();
      },
      wsd_KPI_GHG_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd_fuel_typ)];//<br>
        return this.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wsd_KPI_GHG_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd_fuel_typ)];//<br>
        return this.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      wsd_KPI_GHG_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd_fuel_typ)];//<br>
        return this.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },
      wsd_KPI_GHG_trck:function(){
        return this.wsd_KPI_GHG_trck_co2()+this.wsd_KPI_GHG_trck_n2o()+this.wsd_KPI_GHG_trck_ch4()
      },
      wsd_KPI_GHG_trck_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd_trck_typ)]; //<br>
        return this.wsd_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wsd_KPI_GHG_trck_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd_trck_typ)]; //<br>
        return this.wsd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles;
      },
      wsd_KPI_GHG_trck_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd_trck_typ)]; //<br>
        return this.wsd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles;
      },
      wsd_KPI_GHG:function(){//<br>
        return this.wsd_KPI_GHG_elec() + this.wsd_KPI_GHG_fuel() + this.wsd_KPI_GHG_trck();
      }
    }
  },

  /**Level 1 - Wastewater*/
  Waste:{
    //ww population related
    "ww_resi_pop":0,
    "ww_onsi_pop":0,
    ww_conn_pop:   function(){return this.Collection.wwc_conn_pop},
    ww_serv_pop:   function(){return this.Treatment.wwt_serv_pop},
    ww_SL_serv_pop:function(){return 100*this.ww_serv_pop()/this.ww_resi_pop},
    ww_SL_treat_m3:function(){return 100*this.ww_serv_pop()/this.ww_conn_pop()},
    ww_uncl_pop:   function(){return Math.max(0,this.ww_resi_pop-this.ww_conn_pop()-this.ww_onsi_pop)},
    ww_untr_pop:   function(){return Math.max(0,this.ww_conn_pop()-this.ww_serv_pop())},

    ww_GHG_avoided : function(){//<br>
      return this.Treatment.wwt_SL_GHG_avoided()+ //<br>
      this.Treatment.wwt_wr_C_seq_slu()+          //<br>
      this.Discharge.wwd_wr_GHG_avo_d()+          //<br>
      this.Discharge.wwd_SL_ghg_non()+            //<br>
      this.Discharge.wwd_wr_GHG_avo();            //<br>
    },

    //energy costs related
    "ww_nrg_cost":0,
    "ww_run_cost":0,
    ww_SL_nrg_cost:function(){return 100*this.ww_nrg_cost/this.ww_run_cost},

    //energy and fuel consumed across ww stages
    ww_nrg_cons:function(){return this.Collection.wwc_nrg_cons+this.Treatment.wwt_nrg_cons+this.Discharge.wwd_nrg_cons},
    ww_vol_fuel:function(){return this.Collection.wwc_vol_fuel+this.Treatment.wwt_vol_fuel+this.Treatment.wwt_fuel_dig+this.Discharge.wwd_vol_fuel},

    //untreated emissions
      ww_KPI_GHG_unt_ch4:function(){return this.ww_untr_pop()*Global.General.bod_pday/1000*Global.General.Days()*Cts.ct_ch4_ef.value*Cts.ct_ch4_eq.value;},//old c_ww52
      ww_KPI_GHG_unt_n2o:function(){return this.ww_untr_pop()*Global.General.prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;},
      ww_KPI_GHG_unt:    function(){return this.ww_KPI_GHG_unt_ch4()+this.ww_KPI_GHG_unt_n2o();},
    //uncollected emissions (outside assessment)
      ww_SL_ghg_unc_ch4:function(){return this.ww_uncl_pop()*Global.General.bod_pday/1000*Global.General.Days()*0.3*Cts.ct_ch4_eq.value;},
      ww_SL_ghg_unc_n2o:function(){return this.ww_uncl_pop()*Global.General.prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;},
      ww_SL_ghg_unc:    function(){return this.ww_SL_ghg_unc_ch4()+this.ww_SL_ghg_unc_n2o();},
    //onsite treatment emissions (outside assessment)
      ww_SL_ghg_ons_ch4:function(){return this.ww_onsi_pop*Global.General.bod_pday/1000*Global.General.Days()*0.3*Cts.ct_ch4_eq.value},
      ww_SL_ghg_ons_n2o:function(){return this.ww_onsi_pop*Global.General.prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;},
      ww_SL_ghg_ons:    function(){return this.ww_SL_ghg_ons_ch4()+this.ww_SL_ghg_ons_n2o();},

    "Collection":{
      //no filter
        "wwc_nrg_cons":0,
        "wwc_conn_pop":0,
        "wwc_vol_conv":0,
        wwc_SL_conn_pop:function(){return 100*this.wwc_conn_pop/Global.Waste.ww_resi_pop},
        wwc_KPI_nrg_per_m3:function(){return this.wwc_nrg_cons/this.wwc_vol_conv},

      //fuel engines?
        "wwc_fuel_typ":0,
        "wwc_vol_fuel":0,
      //water efficiency?
        "wwc_wet_flow":0,
        "wwc_dry_flow":0,
        "wwc_rain_day":0,
        c_wwc_vol_infl:function(){return this.wwc_rain_day/86400*(this.wwc_wet_flow-this.wwc_dry_flow)},
        wwc_SL_GHG_ii:function(){return this.wwc_KPI_nrg_per_m3()*this.c_wwc_vol_infl()*Global.General.conv_kwh_co2},
        wwc_SL_fratio:function(){return this.wwc_wet_flow/this.wwc_dry_flow},
        // improv. for GHG due to I/I in collection, treatment, and discharge
        // substages cal for wwc_SL_inf_emis
        wwc_SL_GHG_inf:function(){return this.wwc_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc_vol_conv},
        wwt_SL_GHG_inf:function(){return Global.Waste.Treatment.wwt_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc_vol_conv},
        wwd_SL_GHG_inf:function(){return Global.Waste.Discharge.wwd_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc_vol_conv},
        wwc_SL_inf_emis:function(){return this.wwc_SL_GHG_inf() + this.wwt_SL_GHG_inf() + this.wwd_SL_GHG_inf()},
      //pumping?
        "wwc_vol_pump":0,
        "wwc_nrg_pump":0,
      //pumping efficiency?
        wwc_pmp_head:0,
        wwc_sta_head:0,
        wwc_coll_len:0,
        wwc_pmp_flow:0, //Measured pump flow L/s
        wwc_pmp_volt:0, //Measured pump voltage V
        wwc_pmp_amps:0, //Measured pump current Amp
        wwc_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
        c_wwc_pmp_pw:function(){return this.wwc_pmp_flow*this.wwc_pmp_head*Cts.ct_gravit.value/1000;},
        wwc_KPI_std_nrg_cons:function(){return this.wwc_nrg_pump/(this.wwc_vol_pump*this.wwc_pmp_head/100)},
        wwc_KPI_un_head_loss:function(){return 1000*(this.wwc_pmp_head-this.wwc_sta_head)/this.wwc_coll_len},

        wwc_pmp_pf:0.9, //power factor (no unit)
        wwc_KPI_nrg_elec_eff:function(){return 100*this.c_wwc_pmp_pw()/(this.wwc_pmp_volt*this.wwc_pmp_amps*Math.sqrt(3)*this.wwc_pmp_pf/1000)},

        wwc_KPI_std_nrg_newp:function(){return this.wwc_KPI_nrg_elec_eff()/this.wwc_pmp_exff*this.wwc_KPI_std_nrg_cons()},

        wwc_KPI_nrg_cons_new:function(){return this.wwc_vol_pump*this.wwc_KPI_std_nrg_newp()/100*this.wwc_pmp_head},
        wwc_KPI_nrg_estm_sav:function(){return this.wwc_nrg_cons-this.wwc_KPI_nrg_cons_new()},
        wwc_KPI_ghg_estm_red:function(){return Global.General.conv_kwh_co2*this.wwc_KPI_nrg_estm_sav()},

      //Collection GHG
        wwc_KPI_GHG_elec:function(){return this.wwc_nrg_cons*Global.General.conv_kwh_co2},
        wwc_KPI_GHG_fuel:function(){//<br>
          return this.wwc_KPI_GHG_fuel_co2()+this.wwc_KPI_GHG_fuel_n2o()+this.wwc_KPI_GHG_fuel_ch4();
        },
        wwc_KPI_GHG_fuel_co2:function(){//<br>
          var fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc_fuel_typ)];//<br>
          return this.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
        },
        wwc_KPI_GHG_fuel_n2o:function(){//<br>
          var fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc_fuel_typ)];//<br>
          return this.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
        },
        wwc_KPI_GHG_fuel_ch4:function(){//<br>
          var fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc_fuel_typ)];//<br>
          return this.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
        },

        //Total wwc Collection
        wwc_KPI_GHG:function(){return this.wwc_KPI_GHG_elec() + this.wwc_KPI_GHG_fuel()},
    },

    "Treatment":{
      //no filter
      "wwt_nrg_cons":0,
      "wwt_serv_pop":0,
      "wwt_vol_trea":0,
      "wwt_type_tre":0,
      "wwt_ch4_efac":0,
      "wwt_bod_infl":0,
      "wwt_bod_effl":0,
      "wwt_bod_slud":0,
      c_wwt_bod_rmvd:function(){return this.wwt_bod_infl-this.wwt_bod_effl},
      wwt_KPI_nrg_per_m3:function(){return this.wwt_nrg_cons/this.wwt_vol_trea},
      wwt_KPI_nrg_per_kg:function(){return this.wwt_nrg_cons/this.c_wwt_bod_rmvd()},
      wwt_SL_vol_pday:function(){return 1000*this.wwt_vol_trea/this.wwt_serv_pop/Global.General.Days()},

      "wwt_GHG_tre_n2o":0,

      //fuel engines?
      "wwt_fuel_typ":0,
      "wwt_vol_fuel":0,
      //treatment performance?
      "wwt_trea_cap":0,
      "wwt_tst_cmpl":0,
      "wwt_tst_cond":0,
      wwt_KPI_capac_util:function(){return 100*this.wwt_vol_trea/this.wwt_trea_cap},
      wwt_SL_qual_com:function(){return 100*this.wwt_tst_cmpl/this.wwt_tst_cond},
      //pmp efficiency?
      "wwt_vol_pump":0,
      "wwt_nrg_pump":0,
      "wwt_pmp_head":0,
      wwt_KPI_nrg_per_pump:function(){return this.wwt_nrg_pump/this.wwt_vol_pump},
      wwt_KPI_std_nrg_cons:function(){return this.wwt_nrg_pump/(this.wwt_vol_pump*this.wwt_pmp_head/100)},
      //producing biogas?
      "wwt_biog_pro":0,
      "wwt_biog_fla":0,
      "wwt_ch4_biog":59,
      wwt_dige_typ:0,//type of fuel dig afegida per mi
      wwt_fuel_dig:0,
      wwt_KPI_biog_x_bod:function(){return this.wwt_biog_pro/this.c_wwt_bod_rmvd()},
      "wwt_nrg_biog":0,

      c_wwt_nrg_biog:function(){return this.wwt_biog_val*this.wwt_ch4_biog/100*Cts.ct_ch4_nrg.value},

      //valorizing biogas?
      "wwt_biog_val":0,
      wwt_KPI_nrg_biogas:function(){return this.wwt_nrg_biog/this.wwt_vol_trea},
      wwt_KPI_nrg_x_biog:function(){return 100*this.wwt_nrg_biog/this.c_wwt_nrg_biog()},
      wwt_SL_GHG_avoided:function(){return this.wwt_nrg_biog*Global.General.conv_kwh_co2},

      //sludge (general)
      wwt_mass_slu:0,
      wwt_dryw_slu:0,
      wwt_slu_disp:0,
      wwt_KPI_sludg_prod:function(){return this.wwt_mass_slu/this.wwt_vol_trea},
      wwt_KPI_dry_sludge:function(){return 100*this.wwt_dryw_slu/this.wwt_mass_slu},
      wwt_wr_C_seq_slu:function(){//<br>
        return this.wwt_slu_comp_C_seq()+//<br>
        this.wwt_slu_app_C_seq()+//<br>
        this.wwt_slu_land_C_seq();
      },

      //storage
      wwt_mass_slu_sto:0,
      wwt_time_slu_sto:0,
      c_wwt_ch4_pot:function(){ //<br>
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        if(sludge_type=="Non-digested"){//<br>
          return this.wwt_mass_slu_sto*0.53*Cts.ct_vs_slu.value*Cts.ct_oc_vs.value*(4/3);//<br>
        }else if(sludge_type=="Digested"){//<br>
          return this.wwt_mass_slu_sto*0.06*Cts.ct_vs_dig.value*Cts.ct_oc_vs.value*(4/3);//<br>
        }else{//<br>
          return 0;//<br>
        }
      },
      wwt_slu_storage_ch4:function(){//<br>
        var f=0;//<br>
        if(5 < this.wwt_time_slu_sto && this.wwt_time_slu_sto < 20) {//<br>
          f=0.03//<br>
        }//<br>
        else if(this.wwt_time_slu_sto >= 20) {//<br>
          f=0.05//<br>
        }//<br>
        return f*this.c_wwt_ch4_pot()*Cts.ct_ch4_eq.value;
      },
      wwt_KPI_ghg_sto_co2eq:function(){return this.wwt_slu_storage_ch4()},
      //composting
      wwt_mass_slu_comp:0,
      wwt_slu_composting_ch4:function(){//<br>
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        if(sludge_type=="Non-digested"){//<br>
          return this.wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value //<br>
        }//<br>
        else if(sludge_type=="Digested"){//<br>
          return this.wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_dig.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value //<br>
        }//<br>
        else
        {
          return 0
        }
      },
      wwt_slu_composting_n2o:function(){return this.wwt_mass_slu_comp*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value},
      wwt_KPI_ghg_comp_co2eq:function(){return this.wwt_slu_composting_ch4()+this.wwt_slu_composting_n2o()},
      //incineration
      wwt_mass_slu_inc:0,
      wwt_temp_inc:0,
      wwt_slu_inciner_ch4:function(){return (4.85/1e5)*this.wwt_mass_slu_inc*Cts.ct_ch4_eq.value},
      wwt_slu_inciner_n2o:function(){//<br>
        if(this.wwt_temp_inc > 1152){//<br>
          return 0 //<br>
        }//<br>
        else{//<br>
          return 0.03*this.wwt_mass_slu_inc*(161.3-0.14*Math.max(1023,this.wwt_temp_inc))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value //<br>
        }//<br>
      },
      wwt_KPI_ghg_inc_co2eq:function(){return this.wwt_slu_inciner_ch4()+this.wwt_slu_inciner_n2o()},
      //land application
      wwt_mass_slu_app:0,
      wwt_soil_typ:0, //Options: ["Fine","Coarse"]
      wwt_slu_landapp_n2o:function(){//<br>
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        var soil_type=Tables.find('wwt_soil_typ',this.wwt_soil_typ);//<br>
        var ratio_CN=Global.General.content_C(this.wwt_mass_slu_app,sludge_type)/Global.General.content_N(this.wwt_mass_slu_app,sludge_type)||0;//<br>
        if(sludge_type=="Non-digested"){//<br>
          if(soil_type=="Fine-Textured"   && ratio_CN < 30){return this.wwt_mass_slu_app*0.03*0.023*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value} //<br>
          if(soil_type=="Coarse-Textured" && ratio_CN < 30){return this.wwt_mass_slu_app*0.03*0.005*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value} //<br>
        }else if(sludge_type=="Digested"){//<br>
          if(soil_type=="Fine-Textured"   && ratio_CN < 30){return this.wwt_mass_slu_app*0.04*0.023*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value} //<br>
          if(soil_type=="Coarse-Textured" && ratio_CN < 30){return this.wwt_mass_slu_app*0.04*0.005*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value} //<br>
        }else{//<br>
          return 0;//<br>
        }
      },
      wwt_KPI_ghg_app_co2eq:function(){return this.wwt_slu_landapp_n2o()},
      //landfilling
      wwt_mass_slu_land:0,
      wwt_slu_type:0,
      wwt_slu_landfill_ch4:function(){//<br>
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        if(sludge_type=="Non-digested"){//<br>
          return this.wwt_mass_slu_land*Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*0.9*Cts.ct_ch4_oc.value*0.5*0.8*0.69*Cts.ct_ch4_eq.value;//<br>
        }else if(sludge_type=="Digested"){//<br>
          return this.wwt_mass_slu_land*Cts.ct_oc_vs.value*Cts.ct_vs_dig.value*0.9*Cts.ct_ch4_oc.value*0.5*0.8*Cts.ct_vs_slu.value*Cts.ct_ch4_eq.value;//<br>
        }else{//<br>
          return 0;//<br>
        }
      },
      wwt_slu_landfill_n2o:function(){//<br>
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        var ratio_CN=Global.General.content_C(this.wwt_mass_slu_land,sludge_type)/Global.General.content_N(this.wwt_mass_slu_land,sludge_type)||0;//<br>
        if(ratio_CN>30){//<br>
          return 0;//<br>
        }else{//<br>
          if(sludge_type=="Non-digested"){ //<br>
            return this.wwt_mass_slu_land*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value //<br>
          }else if(sludge_type=="Digested"){//<br>
            return this.wwt_mass_slu_land*0.04*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value //<br>
          }//<br>
        }
      },
      wwt_KPI_ghg_land_co2eq:function(){
        var sludge_type=Tables.find('wwt_slu_type',this.wwt_slu_type)//<br>
        if(sludge_type=="Landfill"){//<br>
          return this.wwt_slu_landfill_ch4()+this.wwt_slu_landfill_n2o()//<br>
        }//<br>
        if(sludge_type=="Landfill (flaring)"){//<br>
          return 0.02*(this.wwt_slu_landfill_ch4()+this.wwt_slu_landfill_n2o())//<br>
        }//<br>
        if(sludge_type=="Landfill (with gas recovery)")//<br>
        {return 0}//<br>
      },
      //stockpiling
      wwt_mass_slu_stock:0,
      wwt_KPI_ghg_stock_co2eq:function(){return this.wwt_mass_slu_stock*90.3/1000},

      //sludge trucks
      "wwt_trck_typ":0,
      "wwt_vol_tslu":0,

      //wwt GHG
      wwt_KPI_GHG_elec:function(){return this.wwt_nrg_cons*Global.General.conv_kwh_co2},

      wwt_KPI_GHG_fuel:function(){//<br>
        return this.wwt_KPI_GHG_fuel_co2()+this.wwt_KPI_GHG_fuel_n2o()+this.wwt_KPI_GHG_fuel_ch4();
      },
      wwt_KPI_GHG_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt_fuel_typ)];//<br>
        return this.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wwt_KPI_GHG_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt_fuel_typ)];//<br>
        return this.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      wwt_KPI_GHG_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt_fuel_typ)];//<br>
        return this.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },

      wwt_KPI_GHG_tre_ch4:function(){
        return (this.wwt_bod_infl-this.wwt_bod_slud-this.wwt_bod_effl)*this.wwt_ch4_efac*Cts.ct_ch4_eq.value
      },
      wwt_KPI_GHG_tre_n2o:function(){//<br>
        return this.wwt_serv_pop*Cts.ct_fac_ic.value*Cts.ct_n2o_efp.value*Global.General.Years()*1e-3*Cts.ct_n2o_eq.value + this.wwt_GHG_tre_n2o;//<br>
      },
      wwt_KPI_GHG_tre:function(){
        return this.wwt_KPI_GHG_tre_ch4()+this.wwt_KPI_GHG_tre_n2o()
      },


      wwt_KPI_GHG_dig_fuel:function(){//<br>
        return this.wwt_KPI_GHG_dig_fuel_co2()+this.wwt_KPI_GHG_dig_fuel_n2o()+this.wwt_KPI_GHG_dig_fuel_ch4();
      },
      wwt_KPI_GHG_dig_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt_dige_typ)]; //<br>
        return this.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*fuel.EFCO2
      },
      wwt_KPI_GHG_dig_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt_dige_typ)]; //<br>
        return this.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.engines
      },
      wwt_KPI_GHG_dig_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt_dige_typ)]; //<br>
        return this.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.engines
      },

      wwt_KPI_GHG_biog:function(){
        return (this.wwt_biog_pro-this.wwt_biog_val-this.wwt_biog_fla+this.wwt_biog_fla*Cts.ct_ch4_lo.value/100)*this.wwt_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
      },
      wwt_KPI_GHG_slu:function(){
        return this.wwt_KPI_ghg_sto_co2eq()+ //<br>
          this.wwt_KPI_ghg_comp_co2eq()+ //<br>
          this.wwt_KPI_ghg_inc_co2eq()+ //<br>
          this.wwt_KPI_ghg_app_co2eq()+ //<br>
          this.wwt_KPI_ghg_land_co2eq()+ //<br>
          this.wwt_KPI_ghg_stock_co2eq()+ //<br>
          this.wwt_KPI_ghg_tsludge();
      },

      //GHG avoided
      wwt_slu_comp_C_seq:function(){ return this.wwt_mass_slu_comp*0.25; },
      wwt_slu_app_C_seq:function(){  return this.wwt_mass_slu_app*0.25; },
      wwt_slu_land_C_seq:function(){
        var sludge_type=Tables.find('wwt_slu_disp',this.wwt_slu_disp);//<br>
        var VS = (sludge_type=="Digested")? 0.51:0.70;//<br><br>
        return this.wwt_mass_slu_land*(VS)*(0.56)*(0.2)*(44/12);
      },

      wwt_KPI_ghg_tsludge:function(){//<br>
        return this.wwt_KPI_ghg_tsludge_co2()+this.wwt_KPI_ghg_tsludge_n2o()+this.wwt_KPI_ghg_tsludge_ch4()
      },
      wwt_KPI_ghg_tsludge_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt_trck_typ)];//<br>
        return this.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wwt_KPI_ghg_tsludge_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt_trck_typ)];//<br>
        return this.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
      },
      wwt_KPI_ghg_tsludge_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt_trck_typ)];//<br>
        return this.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
      },

      wwt_KPI_GHG:function() {
        return this.wwt_KPI_GHG_elec()+//<br>
          this.wwt_KPI_GHG_fuel()+//<br>
          this.wwt_KPI_GHG_tre()+//<br>
          this.wwt_KPI_GHG_dig_fuel()+//<br>
          this.wwt_KPI_GHG_biog()+//<br>
          this.wwt_KPI_GHG_slu();
      },
    },

    "Discharge":{
      //water reuse
      "wwd_wr_N_rec":0, //N recovered
      "wwd_wr_P_rec":0, //P recovered
      "wwd_wr_adnrg":0, //additional energy
      "wwd_wr_vol_d":0, //volume of reused water displacing potable water

      wwd_wr_GHG_avo_N: function(){ return this.wwd_wr_N_rec*4; },
      wwd_wr_GHG_avo_P: function(){ return this.wwd_wr_P_rec*2; },
      wwd_wr_GHG_avo:   function(){ return this.wwd_wr_GHG_avo_N() + this.wwd_wr_GHG_avo_P(); },
      wwd_wr_nrg_sav:   function(){ //<br>
        return this.wwd_wr_vol_d*( //<br>
          Global.Water.Abstraction.wsa_nrg_per_abs_watr()+ //<br>
          Global.Water.Treatment.wst_KPI_nrg_per_m3()+ //<br>
          Global.Water.Distribution.wsd_KPI_nrg_per_vd() //<br>
        )-this.wwd_wr_adnrg;
      },
      wwd_wr_GHG_avo_d: function(){//<br>
        return this.wwd_wr_nrg_sav()*Global.General.conv_kwh_co2;
      },

      //no filter
      "wwd_nrg_cons":0,
      "wwd_vol_disc":0,
      "wwd_n2o_effl":0,
      "wwd_vol_nonp":0,//Volume of water reused

      "wwd_total_m3":function(){//<br>
        return this.wwd_vol_disc+this.wwd_vol_nonp;
      },

      wwd_KPI_nrg_per_m3:function(){return this.wwd_nrg_cons/this.wwd_vol_disc||0},
      wwd_SL_ghg_non:function(){return this.wwd_n2o_effl/1000*this.wwd_vol_nonp*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value},
      //fuel engines?
      "wwd_fuel_typ":0,
      "wwd_vol_fuel":0,
      //trucks?
      "wwd_trck_typ":0,
      "wwd_vol_trck":0,
      //pumping?
      "wwd_vol_pump":0,
      "wwd_nrg_pump":0,
      //pumping efficiency?
      "wwd_pmp_head":0,
      wwd_KPI_std_nrg_cons:function(){return this.wwd_nrg_pump/(this.wwd_vol_pump*this.wwd_pmp_head/100)},
      //wwd GHG
      wwd_KPI_GHG_elec:function(){return this.wwd_nrg_cons*Global.General.conv_kwh_co2},
      wwd_KPI_GHG_fuel:function(){//<br>
        return this.wwd_KPI_GHG_fuel_co2()+this.wwd_KPI_GHG_fuel_n2o()+this.wwd_KPI_GHG_fuel_ch4();
      },
      wwd_KPI_GHG_fuel_co2:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd_fuel_typ)];//<br>
        return this.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wwd_KPI_GHG_fuel_n2o:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd_fuel_typ)];//<br>
        return this.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
      },
      wwd_KPI_GHG_fuel_ch4:function(){//<br>
        var fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd_fuel_typ)];//<br>
        return this.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
      },
      wwd_KPI_GHG_trck:function(){
        return this.wwd_KPI_GHG_trck_co2()+this.wwd_KPI_GHG_trck_n2o()+this.wwd_KPI_GHG_trck_ch4();
      },
      wwd_KPI_GHG_trck_co2:function(){
        var fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd_trck_typ)];//<br>
        return this.wwd_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
      },
      wwd_KPI_GHG_trck_n2o:function(){
        var fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd_trck_typ)];//<br>
        return this.wwd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles;
      },
      wwd_KPI_GHG_trck_ch4:function(){
        var fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd_trck_typ)];//<br>
        return this.wwd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles;
      },
      wwd_KPI_GHG_tre_n2o:function(){//<br>
        return this.wwd_n2o_effl/1000*this.wwd_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
      },
      wwd_KPI_GHG:function(){
        return this.wwd_KPI_GHG_elec()+this.wwd_KPI_GHG_fuel()+this.wwd_KPI_GHG_trck()+this.wwd_KPI_GHG_tre_n2o();
      },
    },
  },

  /**Configuration: custom user preferences*/
  Configuration:{
    ActiveStages:{
      "water":0, "waterAbs":0, "waterTre":0, "waterDis":0,
      "waste":0, "wasteCol":0, "wasteTre":0, "wasteDis":0,
    },

    //highlight inputs/outputs
    hl:0,

    //remember if question 'x' is expanded or not (in edit.php)
    Expanded:{},

    //custom unit selections for variables are stored here
    Units:{},

    //auxiliar object to store user selections
    Selected: {
      wwt_ch4_efac:"",
      prot_con:"Albania",//country selected for protein consumption
      sludge_estimation_method:"0",
      gwp_reports_index:0,
    },

    //answers for filters ("questions.js")
    "Yes/No": {
      //wsa_pumping:0,
    },
  },

  //TODO check what is this? it takes memory!!!
  Opps:{
    g_nrw_water_vol_dper              :0,
    g_end_user_consumption_dper       :0,
    g_water_reuse_dper                :0,
    g_dw_energy_consumption_dper      :0,
    g_ww_infl_dper                    :0,
    g_ww_grid_energy_consumption_dper :0,
    g_ww_slu_dper                     :0,
    g_ww_water_reuse_dper             :0,
    g_ww_biogas_dper                  :0,
  }
};

//this block is a fix for wrapper equations, so they don't appear incorrectly at variable.php
Global.Water.wsa_KPI_GHG=function(){return Global.Water.Abstraction.wsa_KPI_GHG()};
Global.Water.wst_KPI_GHG=function(){return Global.Water.Treatment.wst_KPI_GHG()};
Global.Water.wsd_KPI_GHG=function(){return Global.Water.Distribution.wsd_KPI_GHG()};
Global.Waste.wwc_KPI_GHG=function(){return Global.Waste.Collection.wwc_KPI_GHG()};
Global.Waste.wwt_KPI_GHG=function(){return Global.Waste.Treatment.wwt_KPI_GHG()};
Global.Waste.wwd_KPI_GHG=function(){return Global.Waste.Discharge.wwd_KPI_GHG()};
Global.Water.ws_KPI_GHG =function(){return this.wsa_KPI_GHG()+this.wst_KPI_GHG()+this.wsd_KPI_GHG()};
Global.Waste.ww_KPI_GHG =function(){return this.wwc_KPI_GHG()+this.wwt_KPI_GHG()+this.wwd_KPI_GHG()+this.ww_KPI_GHG_unt()};
