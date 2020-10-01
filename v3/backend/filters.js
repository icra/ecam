//filters for inputs and questions
let Filters = {
"Population":[
  "ws_resi_pop",  //variable
  "wsd_serv_pop", //variable

  "ww_resi_pop",  //variable
  "wwc_conn_pop", //variable
  "wwt_serv_pop", //variable

  "wwo_onsi_pop", //variable
  "wwo_open_pop", //variable
],
"Water volumes":[
  "wsa_vol_conv",      //variable
  "wst_vol_trea",      //variable
  "wsd_vol_dist",      //variable
  "wsd_water_eff",     //question

  "ww_vol_gene",       //variable
  "wwc_vol_coll",      //variable
  "wwc_vol_coll_tre",  //variable
  "wwc_vol_coll_unt",  //variable

  "wwt_vol_trea",      //variable
  "wwd_vol_disc",      //variable
  "wwd_vol_nonp",      //variable

  "wwo_vol_unco",      //variable
  "wwo_vol_unco_ons",  //variable
  "wwo_vol_unco_unt",  //variable
  "wwo_vol_unco_tre",  //variable
  "wwo_vol_disc",      //variable
],
"Emission factors":[
  "wwc_ch4_efac_col",
  "wwc_ch4_efac_cso",

  "wwt_ch4_efac",
  "wwd_ch4_efac",
  "wwt_n2o_efac",
  "wwd_n2o_efac",

  "wwo_ch4_efac_unt",
  "wwo_ch4_efac_con",
  "wwo_ch4_efac_tre",
  "wwo_n2o_efac_tre",
  "wwo_ch4_efac_dis",
  "wwo_n2o_efac_dis",
],
"Operational parameters":[
  "ws_nrg_cost", //variable
  "ws_run_cost", //variable
  "ww_nrg_cost", //variable
  "ww_run_cost", //variable

  "wst_treatmen", //variable
  "wst_treatment_perf",    //question
  "wsd_water_eff",         //question
  "wsd_service_perf",      //question
  "wsd_topographic",       //question
  "wwt_producing_biogas",  //question
  "wwt_valorizing_biogas", //question
  "wwt_treatment_perf",    //question

  "wwt_bod_infl", //variable
  "wwt_bod_effl", //variable
  "wwt_bod_slud", //variable
  "wwd_n2o_effl", //variable

  "wwo_producing_biogas", //question

  "wwo_type_con",    //variable
  "wwo_flooding",    //variable
  "wwo_cont_emp",
  "wwo_fdensity",
  "wwo_fslu_emp",
  "wwo_type_tre",
  "wwo_bod_infl",
  "wwo_bod_rmvd",
  "wwo_bod_conc_fs",
  "wwo_bod_slud",
  "wwo_bod_effl",
  "wwo_n2o_effl",
  "wwo_type_dis",
  "wwo_fslu_typ",
],
"Fuel consumption":[
  "wsa_engines", //question
  "wst_engines", //question
  "wsd_engines", //question
  "wwc_engines", //question
  "wwt_engines", //question
  "wwd_engines", //question
  "wwo_engines", //question

  "wwt_producing_biogas", //question

  "wsd_trucks",    //question
  "wwt_trucks",    //question
  "wwd_trucks",    //question

  "wwo_transport", //question
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

  "wsa_pumping", //question
  "wst_pumping", //question
  "wsd_pumping", //question
  "wwc_pumping", //question
  "wwt_pumping", //question
  "wwd_pumping", //question
  "wwo_pumping", //question

  "wsa_pumping_eff", //question
  "wst_pumping_eff", //question
  "wsd_pumping_eff", //question
  "wwc_pumping_eff", //question
  "wwt_pumping_eff", //question
  "wwd_pumping_eff", //question
  "wwo_pumping_eff", //question
],
"Discharge":[
  "wwc_ch4_efac_cso", //variable
  "wwc_vol_coll_unt", //variable
  "wwd_vol_disc",     //variable
  "wwd_vol_nonp",     //variable
  "wwd_ch4_efac",     //variable
  "wwd_n2o_efac",     //variable
  "wwt_bod_effl",     //variable
  "wwd_n2o_effl",     //variable

  "wwd_water_reuse",  //question
  "wwd_trucks",       //question

  "wwo_vol_unco_unt", //variable
  "wwo_vol_disc",     //variable
  "wwo_ch4_efac_dis", //variable
  "wwo_n2o_efac_dis", //variable
  "wwo_bod_effl",     //variable
  "wwo_n2o_effl",     //variable
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
  "wwo_landfil",          //question
  "wwo_landapp",          //question
  "wwo_dumping",          //question
  "wwo_urine",            //question
  "wwo_reuse",            //question
],
};
