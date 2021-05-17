//filters for inputs and questions
let Filters={
"General":[
  "ws_resi_pop",
  "ww_resi_pop",
  "ww_vol_gene",

  "wst_mass_slu",
  "wst_treatment",
  "wst_vol_trea",
  "wst_treatment_perf",

  "wsd_service_perf",
  "wsd_topographic",
  "wsd_water_eff",

  "wwt_treatment_perf",

  "wwo_onsi_pop", //variable
  "wwo_open_pop", //variable
  "wwo_vol_unco", //variable
  "wwo_costs", //question
],

"GHG Emissions":[
  //wsa Abstraction
    "wsa_vol_conv", //input
    "wsa_nrg_cons", //input
    "wsa_conv_kwh", //input
    "wsa_engines",  //question
  //wst Treatment
    "wst_nrg_cons", //input
    "wst_conv_kwh", //input
    "wst_engines",  //question
  //wsd Distribution
    "wsd_serv_pop", //variable
    "wsd_vol_dist", //variable
    "wsd_nrg_cons", //variable
    "wsd_conv_kwh", //input
    "wsd_engines",  //question
    "wsd_trucks",   //question
  //wwc Collection
    "wwc_conn_pop", //input
    "wwc_vol_coll", //input
    "wwc_vol_coll_unt", //input
    "wwc_vol_coll_tre", //input
    "wwc_bod", //input
    "wwc_tn", //input
    "wwc_ch4_efac_cso", //input
    "wwc_ch4_efac_col", //input
    "wwc_n2o_efac_cso", //input
    "wwc_n2o_efac_col", //input
    "wwc_nrg_cons", //input
    "wwc_conv_kwh", //input
    "wwc_engines", //question
  //wwt Treatment
    "wwt_serv_pop", //input
    "wwt_vol_trea", //input
    "wwt_vol_nonp", //input
    "wwt_vol_disc", //input
    "wwt_bod_infl", //input
    "wwt_bod_effl", //input
    "wwt_tn_infl", //input
    "wwt_tn_effl", //input
    "wwt_ch4_efac_tre", //input
    "wwt_ch4_efac_dis", //input
    "wwt_n2o_efac_tre", //input
    "wwt_n2o_efac_dis", //input
    "wwt_nrg_cons", //input
    "wwt_conv_kwh", //input
    "wwt_engines", //question
    "wwt_producing_biogas", //question
    "wwt_reuse_trucks", //question
    "wwt_water_reuse", //question
],

"Pump Efficiency":[
  //wsa
  "wsa_pumping",     //question
  "wsa_pumping_eff", //question
  //wst
  "wst_pumping",     //question
  "wst_pumping_eff", //question
  //wsd
  "wsd_pumping",     //question
  "wsd_pumping_eff", //question
  //wwc
  "wwc_pumping",     //question
  "wwc_pumping_eff", //question
  //wwt
  "wwt_pumping",     //question
  "wwt_pumping_eff", //question
],

"Sludge Management":[
  "wwt_serv_pop",         //input
  "wwt_bod_infl",         //input
  "wwt_bod_effl",         //input
  "wwt_sludge_mgmt",      //question
  "wwt_slu_storage",      //question
  "wwt_composting",       //question
  "wwt_incineration",     //question
  "wwt_land_application", //question
  "wwt_landfilling",      //question
  "wwt_stockpiling",      //question
  "wwt_trucks",           //question
],

//Onsite sanitation
"Containment":[
  "wwo_bod_cont",
  "wwo_bod_rmvd",
  "wwo_cont_emp",
  "wwo_fslu_emp",
  "wwo_fdensity",
  "wwo_bod_conc_fs",
  "wwo_tn_infl",
  "wwo_flooding",
  "wwo_ch4_efac_con",
],

"Treatment":[
  "wwo_bod_infl", //variable
  "wwo_bod_slud", //variable
  "wwo_bod_effl", //variable
  "wwo_ch4_efac_tre", //variable
  "wwo_n2o_efac_tre", //variable
  "wwo_ch4_efac_dis", //variable
  "wwo_n2o_efac_dis", //variable
  "wwo_producing_biogas", //question
  "wwo_tn_effl", //variable
],

"Disposal / Enduse":[
  "wwo_transport", //question
  "wwo_landfil", //question
  "wwo_landapp", //question
  "wwo_dumping", //question
  "wwo_urine", //question
  "wwo_reuse", //question
],

"Open Defecation":[
  "wwo_open_pop", //variable
  "wwo_n2o_efac_opd", //variable
  "wwo_prot_con", //variable
],

"Energy Performance":[
  //wsa Abstraction
  "wsa_vol_conv", //input
  "wsa_nrg_cons", //input
  "wsa_conv_kwh", //input
  "wsa_engines",  //question
  "wsa_pumping",  //question
  //wst Treatment
  "wst_nrg_cons", //input
  "wst_conv_kwh", //input
  "wst_engines",  //question
  "wst_pumping",  //question
  //wsd
  "wsd_serv_pop", //variable
  "wsd_vol_dist", //variable
  "wsd_nrg_cons", //variable
  "wsd_conv_kwh", //variable
  "wsd_engines",  //question
  "wsd_trucks",   //question
  "wsd_pumping",  //question
  //wwc
  "wwc_nrg_cons", //input
  "wwc_conv_kwh", //input
  "wwc_engines", //question
  "wwc_pumping", //question
  //wwt
  "wwt_nrg_cons", //input
  "wwt_conv_kwh", //input
  "wwt_engines", //question
  //wwo
  "wwo_nrg_cons", //input
  "wwo_conv_kwh", //input
  "wwo_engines", //question
  "wwo_producing_biogas", //question
  "wwo_pumping",     //question
  "wwo_pumping_eff", //question

  //biogas production
  "wwt_producing_biogas", //question
  "wwo_producing_biogas", //question
],

"Costs":[
  "ws_nrg_cost",
  "ws_run_cost",
  "ww_nrg_cost",
  "ww_run_cost",
  "wsa_costs",
  "wst_costs",
  "wsd_costs",
  "wwc_costs",
  "wwt_costs",
],

};
