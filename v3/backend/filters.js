//filters for inputs and questions
let Filters = {
"Population":[
  "ws_resi_pop",  //variable
  "wsd_serv_pop", //variable
  "ww_resi_pop",  //variable
  "wwc_conn_pop", //variable
  "fsc_onsi_pop", //variable
  "fsc_open_pop", //variable
  "wwt_serv_pop", //variable
  "wwo_serv_pop", //variable
],
"Water volumes":[
  "wsa_vol_conv",      //variable
  "wst_vol_trea",      //variable
  "wsd_vol_dist",      //variable

  "ww_vol_gene",       //variable

  "wwc_vol_coll",      //variable
  "wwc_vol_coll_tre",  //variable
  "wwc_vol_coll_unt",  //variable
  "wwc_vol_unco",      //variable
  "wwc_vol_unco_ons",  //variable
  "wwc_vol_unco_unt",  //variable

  "wwt_vol_trea",      //variable
  "wwo_vol_trea",      //variable

  "wwd_vol_disc",      //variable
  "wwd_vol_nonp",      //variable
  "fsr_vol_disc",      //variable
],
"Emission factors":[
  "ww_ch4_efac_unt",
  "ww_ch4_efac_unc",
  "ww_ch4_efac_col",
  "fsc_ch4_efac",
  "wwt_n2o_efac",
  "wwt_ch4_efac",
  "wwd_ch4_efac",
  "fst_ch4_efac",
  "fst_n2o_efac",
],
"Operational parameters":[
  "ws_nrg_cost", //variable
  "ws_run_cost", //variable
  "ww_nrg_cost", //variable
  "ww_run_cost", //variable

  "wst_treatment_perf",    //question
  "wsd_water_eff",         //question
  "wsd_service_perf",      //question
  "wsd_topographic",       //question
  "wwt_producing_biogas",  //question
  "wwt_valorizing_biogas", //question
  "wwt_treatment_perf",    //question

  "wwt_bod_infl", //variable
  "wwt_bod_effl", //variable
  "wwd_bod_effl", //variable
  "wwt_bod_slud", //variable
  "wwd_n2o_effl", //variable

  "fst_producing_biogas", //question

  "fsc_type_tre",    //variable
  "fsc_bod_infl",    //variable
  "fsc_flooding",    //variable
  "fsc_cont_emp",    //variable
  "fsc_fdensity",    //variable
  "fsc_fslu_emp",    //variable
  "fsc_bod_conc_fs", //variable
  "fsc_bod_rmvd",    //variable
  "fst_bod_infl",    //variable
  "fst_bod_effl",    //variable
  "fst_type_tre",    //variable
  "fst_bod_slud",    //variable
  "fsr_type_tre",    //variable
  "fsr_fslu_typ",    //variable
],
"Fuel consumption":[
  "wsa_engines", //question
  "wst_engines", //question
  "wsd_engines", //question
  "wwc_engines", //question
  "wwt_engines", //question
  "wwd_engines", //question
  "fst_engines", //question
  "fsr_engines", //question

  "wwt_producing_biogas", //question

  "wsd_trucks",    //question
  "wwd_trucks",    //question
  "fst_transport", //question
  "fsr_transport", //question
],
"Energy performance":[
  "wsa_nrg_cons",       //variable
  "wst_nrg_cons",       //variable
  "wsd_nrg_cons",       //variable
  "wwc_nrg_cons",       //variable
  "wwt_nrg_cons",       //variable
  "wwd_nrg_cons",       //variable
  "wwo_nrg_cons",       //variable
  "fst_nrg_cons",       //variable
  "fsr_nrg_cons",       //variable

  "wsa_pumping",        //question
  "wst_pumping",        //question
  "wsd_pumping",        //question
  "wwc_pumping",        //question
  "wwt_pumping",        //question
  "wwd_pumping",        //question
  "fsc_pumping",        //question
  "fst_pumping",        //question
  "fsr_pumping",        //question

  "wsa_pumping_eff",    //question
  "wst_pumping_eff",    //question
  "wsd_pumping_eff",    //question
  "wwc_pumping_eff",    //question
  "wwt_pumping_eff",    //question
  "wwd_pumping_eff",    //question
  "fsc_pumping_eff",    //question
  "fst_pumping_eff",    //question
  "fsr_pumping_eff",    //question

  "fsc_transport",      //question
],
"Discharge":[
  "fsc_open_pop",     //variable (Transport)
  "wwc_vol_unco_unt", //variable (Transport)
  "wwc_vol_coll_unt", //variable (Transport)
  "ww_ch4_efac_unt",  //variable (Transport)

  "wwd_vol_disc",     //variable (Treatment)
  "wwd_vol_nonp",     //variable (Treatment)
  "wwd_ch4_efac",     //variable (Treatment)
  "wwt_bod_effl",     //variable (Treatment)
  "wwd_bod_effl",     //variable (Treatment)
  "wwd_n2o_effl",     //variable (Treatment)
  "wwd_water_reuse",  //question (Treatment)
  "wwd_trucks",       //question (Treatment)
  "fsr_vol_disc",     //variable (Onsite)
],
"Sludge management":[
  "wst_mass_slu",         //variable
  "wwt_sludge_mgmt",      //question
  "wwt_slu_storage",      //question
  "wwt_composting",       //question
  "wwt_incineration",     //question
  "wwt_land_application", //question
  "wwt_landfilling",      //question
  "wwt_stockpiling",      //question
  "wwt_trucks",           //question
  "fsr_landfil",          //question
  "fsr_landapp",          //question
  "fsr_dumping",          //question
  "fsr_urine",            //question
  "fsr_reuse",            //question
],
};
