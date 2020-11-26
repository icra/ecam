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
  "wwt_vol_disc",      //variable
  "wwt_vol_nonp",      //variable

  "wwo_vol_unco",      //variable
  "wwo_vol_unco_ons",  //variable
  "wwo_vol_unco_unt",  //variable
  "wwo_vol_unco_tre",  //variable
  "wwo_vol_disc",      //variable
],
"Emission factors":[
  "wwc_ch4_efac_col",
  "wwc_ch4_efac_cso",
  "wwc_n2o_efac_col",
  "wwc_n2o_efac_cso",

  "wwt_ch4_efac_tre",
  "wwt_ch4_efac_dis",
  "wwt_n2o_efac_tre",
  "wwt_n2o_efac_dis",

  "wwo_ch4_efac_unt",
  "wwo_ch4_efac_con",
  "wwo_ch4_efac_tre",
  "wwo_ch4_efac_dis",
  "wwo_n2o_efac_tre",
  "wwo_n2o_efac_dis",
],
"Operational parameters":[
  "ws_nrg_cost", //input
  "ws_run_cost", //input
  "ww_nrg_cost", //input
  "ww_run_cost", //input

  "wst_treatmen",          //input
  "wst_treatment_perf",    //question
  "wsd_water_eff",         //question
  "wsd_service_perf",      //question
  "wsd_topographic",       //question
  "wwt_treatment_perf",    //question
  "wwt_mass_slu", //input

  "wwc_bod", //input
  "wwc_tn",  //input

  "wwt_bod_infl", //input
  "wwt_bod_effl", //input
  "wwt_bod_slud", //input
  "wwt_tn_infl", //input
  "wwt_tn_effl", //input

  "wwo_producing_biogas", //question

  "wwo_type_con",
  "wwo_flooding",
  "wwo_cont_emp",
  "wwo_fdensity",
  "wwo_fslu_emp",
  "wwo_type_tre",
  "wwo_bod_infl",
  "wwo_bod_rmvd",
  "wwo_bod_conc_fs",
  "wwo_bod_slud",
  "wwo_bod_effl",
  "wwo_tn_infl",
  "wwo_tn_effl",
  "wwo_type_dis",
  "wwo_fslu_typ",
],
"Fuel consumption":[
  "wsa_engines", //question
  "wst_engines", //question
  "wsd_engines", //question
  "wwc_engines", //question
  "wwt_engines", //question
  "wwo_engines", //question

  "wwt_producing_biogas", //question

  "wsd_trucks",    //question
  "wwt_trucks",    //question
  "wwt_reuse_trucks", //question

  "wwo_transport", //question
],
"Energy performance":[
  "wsa_nrg_cons", //variable
  "wst_nrg_cons", //variable
  "wsd_nrg_cons", //variable
  "wwc_nrg_cons", //variable
  "wwt_nrg_cons", //variable
  "wwo_nrg_cons", //variable

  "wsa_pumping", //question
  "wst_pumping", //question
  "wsd_pumping", //question
  "wwc_pumping", //question
  "wwt_pumping", //question
  "wwo_pumping", //question

  "wsa_pumping_eff", //question
  "wst_pumping_eff", //question
  "wsd_pumping_eff", //question
  "wwc_pumping_eff", //question
  "wwt_pumping_eff", //question
  "wwo_pumping_eff", //question
],
"Biogas":[
  "wwt_producing_biogas", //question
],
"Discharge":[
  "wwc_vol_coll_unt", //variable
  "wwc_ch4_efac_cso", //variable
  "wwc_n2o_efac_cso", //variable

  "wwt_vol_disc",     //variable
  "wwt_vol_nonp",     //variable
  "wwt_ch4_efac_dis", //variable
  "wwt_n2o_efac_dis", //variable
  "wwt_bod_effl",     //variable
  "wwt_tn_effl",      //variable
  "wwt_water_reuse",  //question
  "wwo_vol_unco_unt", //variable
  "wwo_vol_disc",     //variable
  "wwo_ch4_efac_dis", //variable
  "wwo_n2o_efac_dis", //variable
  "wwo_bod_effl",     //variable
  "wwo_tn_effl",      //variable
],
"Sludge management":[
  "wst_mass_slu",         //input

  "wwt_mass_slu",//input
  "wwt_bod_slud",//input

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
"Costs":[
  "wsa_nrg_cost",
  "wst_nrg_cost",
  "wsd_nrg_cost",
  "wwc_nrg_cost",
  "wwt_nrg_cost",
  "wwo_nrg_cost",
  "wsa_run_cost",
  "wst_run_cost",
  "wsd_run_cost",
  "wwc_run_cost",
  "wwt_run_cost",
  "wwo_run_cost",
],
};
