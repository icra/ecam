/* ESTIMATIONS: INPUTS WITH EQUATIONS ASSOCIATED*/
//maybe they can be moved inside the Ecam global class for consistency TODO
let Estimations={
  //wwt sludge revision june 2021
  wwt_slu_sto_EF(substage){
    let storage_time = substage.wwt_time_slu_sto; //days
    if     (storage_time<5)  return 0;
    else if(storage_time<20) return 3;
    else                     return 5;
  },

  //ws
    ws_nrg_cost(stage){ //energy cost
      let wsa = Global.Water.Abstraction .map(s=>s.wsa_nrg_cost).sum();
      let wst = Global.Water.Treatment   .map(s=>s.wst_nrg_cost).sum();
      let wsd = Global.Water.Distribution.map(s=>s.wsd_nrg_cost).sum();
      return wsa+wst+wsd;
    },
    ws_run_cost(stage){ //total cost
      let wsa = Global.Water.Abstraction .map(s=>s.wsa_run_cost).sum();
      let wst = Global.Water.Treatment   .map(s=>s.wst_run_cost).sum();
      let wsd = Global.Water.Distribution.map(s=>s.wsd_run_cost).sum();
      return wsa+wst+wsd;
    },
  //ww
    ww_nrg_cost(stage){
      let wwc = Global.Waste.Collection.map(s=>s.wwc_nrg_cost).sum();
      let wwt = Global.Waste.Treatment .map(s=>s.wwt_nrg_cost).sum();
      let wwo = Global.Waste.Onsite    .map(s=>s.wwo_nrg_cost).sum();
      return wwc+wwt+wwo;
    },
    ww_run_cost(stage){
      let wwc = Global.Waste.Collection.map(s=>s.wwc_run_cost).sum();
      let wwt = Global.Waste.Treatment .map(s=>s.wwt_run_cost).sum();
      let wwo = Global.Waste.Onsite    .map(s=>s.wwo_run_cost).sum();
      return wwc+wwt+wwo;
    },

  //emission factors for grid electricity
    wsa_conv_kwh(stage){return Global.General.conv_kwh_co2},
    wst_conv_kwh(stage){return Global.General.conv_kwh_co2},
    wsd_conv_kwh(stage){return Global.General.conv_kwh_co2},
    wwc_conv_kwh(stage){return Global.General.conv_kwh_co2},
    wwt_conv_kwh(stage){return Global.General.conv_kwh_co2},
    wwo_conv_kwh(stage){return Global.General.conv_kwh_co2},

  //ww
    //ww: 200L person per day
    ww_vol_gene(stage){return 0.2*stage.ww_resi_pop*Global.Days();},

  //wwc
    wwc_vol_coll(substage){return 0.2*substage.wwc_conn_pop*Global.Days();},
    wwc_vol_coll_tre(substage){return substage.wwc_vol_coll - substage.wwc_vol_coll_unt;},
    wwc_vol_coll_unt(substage){return substage.wwc_vol_coll - substage.wwc_vol_coll_tre;},

    wwc_tn(substage){
      let P          = substage.wwc_conn_pop; //population
      let Protein    = Global.General.prot_con; //kg protein/person/year
      let Years      = Global.Years(); //years
      let F_NPR      = Cts.ct_F_NPR.value;
      let N_HH       = Global.General.N_HH;
      let F_NON_CON  = Global.General.F_NON_CON;
      let F_IND_COM  = Global.General.F_IND_COM;
      return P * Protein * Years * F_NPR * N_HH * F_NON_CON * F_IND_COM; //kgN
    },
    wwc_bod(substage){
      let P   = substage.wwc_conn_pop; //population
      let BOD = Global.General.bod_pday; //g/person/day
      return P * BOD * 0.001 * Global.Days(); //kg
    },

  //wwt
    wwt_biog_fla(substage){
      return 100-substage.wwt_biog_val-substage.wwt_biog_lkd-substage.wwt_biog_sold;
    },
    wwt_biog_val(substage){
      return 100-substage.wwt_biog_fla-substage.wwt_biog_lkd-substage.wwt_biog_sold;
    },
    wwt_biog_lkd(substage){
      return 100-substage.wwt_biog_val-substage.wwt_biog_fla-substage.wwt_biog_sold;
    },
    wwt_biog_sold(substage){
      return 100-substage.wwt_biog_val-substage.wwt_biog_fla-substage.wwt_biog_lkd;
    },

    wwt_vol_trea(substage){return 0.2*substage.wwt_serv_pop*Global.Days();},
    wwt_vol_disc(substage){return substage.wwt_vol_trea - substage.wwt_vol_nonp;},
    wwt_tn_infl(substage){
      let P          = substage.wwt_serv_pop; //population served
      let Protein    = Global.General.prot_con; //kg protein/person/year
      let Years      = Global.Years(); //years
      let F_NPR      = Cts.ct_F_NPR.value;
      let N_HH       = Global.General.N_HH;
      let F_NON_CON  = Global.General.F_NON_CON;
      let F_IND_COM  = Global.General.F_IND_COM;
      return P * Protein * Years * F_NPR * N_HH * F_NON_CON * F_IND_COM;
    },

    //estimation for biogas produced
    wwt_biog_pro(substage){
      let wwt_mass_slu    = substage.wwt_mass_slu;  //kg  | mass of combined sludge to digestion
      let VS_to_digestion = wwt_mass_slu    * 0.80; //kg  | VS to digestion: 80% of sludge mass
      let VS_destroyed    = VS_to_digestion * 0.60; //kg  | VS destroyed: 60% of VS
      let biogas_volume   = VS_destroyed    * 0.80; //Nm3 | biogas produced (volume)
      return biogas_volume;
    },

    wwt_bod_infl(substage){
      let P   = substage.wwt_serv_pop; //population
      let BOD = Global.General.bod_pday; //g/person/day
      return P * BOD * 0.001 * Global.Days(); //kg
    },

  //wwo
    //0.3kg/person/day
    wwo_fslu_emp(substage){
      let population    = substage.wwo_onsi_pop; //population with onsite treatment
      let kg_person_day = 0.3; //kg/person/day
      let days          = Global.Days(); //days
      let density       = substage.wwo_fdensity; //kg/m3
      let cont_emp      = substage.wwo_cont_emp/100; //fraction
      return kg_person_day * population * days / density * cont_emp;
    },

  //wwo
    wwo_bod_cont(substage){
      let P   = substage.wwo_onsi_pop; //population
      let BOD = Global.General.bod_pday; //g/person/day
      return P * BOD * 0.001 * Global.Days(); //kg
    },

    wwo_bod_infl(substage){
      return substage.wwo_bod_rmvd;
    },

    wwo_bod_rmvd(substage){
      return substage.wwo_fslu_emp*substage.wwo_bod_conc_fs;
    },

    wwo_biog_fla(substage){
      return 100-substage.wwo_biog_val-substage.wwo_biog_lkd-substage.wwo_biog_sold;
    },
    wwo_biog_val(substage){
      return 100-substage.wwo_biog_fla-substage.wwo_biog_lkd-substage.wwo_biog_sold;
    },
    wwo_biog_lkd(substage){
      return 100-substage.wwo_biog_val-substage.wwo_biog_fla-substage.wwo_biog_sold;
    },
    wwo_biog_sold(substage){
      return 100-substage.wwo_biog_val-substage.wwo_biog_fla-substage.wwo_biog_lkd;
    },

    wwo_opd_tn(substage){
      let P         = substage.wwo_open_pop; //people
      let Protein   = Global.General.prot_con; //kg/person/year
      let Years     = Global.Years(); //years
      let F_NPR     = Cts.ct_F_NPR.value; //kgN/kgProtein
      let N_HH      = Global.General.N_HH; //adimensional
      let F_NON_CON = Global.General.F_NON_CON; //adimensional
      let F_IND_COM = Global.General.F_IND_COM; //adimensional
      return P * Protein * Years * F_NPR * N_HH * F_NON_CON * F_IND_COM;
    },

    wwt_nrg_biog(substage){
      return substage.wwt_nrg_biog_eff/100*substage.wwt_nrg_biog_val();
    },
};
