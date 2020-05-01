/*
  A Question is a list of variables that are hidden if the answer to the question is NO

  Question object structure:
    1. "variables" (array)      variables hidden if answer is no
    2. "advanced" (boolean)     show only in substages
    3. "otherQuestions" (array) questions hidden if answer is no

  Template:
  "newQuestion":{
    variables:[
      "",
    ],
    advanced:0,
    otherQuestions:[
      "",
    ],
  },
*/

let Questions={
  //wsa
    "wsa_engines":{
      variables:[
        "wsa_fuel_typ",
        "wsa_vol_fuel",
        "wsa_KPI_GHG_fuel_co2",
        "wsa_KPI_GHG_fuel_n2o",
        "wsa_KPI_GHG_fuel_ch4",
        "wsa_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wsa_pumping":{
      variables:[
        "wsa_nrg_pump",
        "wsa_vol_pump",
        "wsa_pmp_head",
        "wsa_pmp_type",
        "wsa_pmp_size",
        "wsa_sta_head",
        "wsa_main_len",
        "wsa_nrg_per_pmp_watr",
        "wsa_KPI_std_nrg_cons",
        "wsa_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wsa_pumping_eff",
      ],
      folded:0,
    },

    "wsa_pumping_eff":{
      variables:[
        "wsa_pmp_flow",
        "wsa_pmp_volt",
        "wsa_pmp_amps",
        "wsa_pmp_pf",
        "c_wsa_pmp_pw",
        "wsa_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[
        "wsa_opportunities",
      ],
      folded:0,
    },

    "wsa_opportunities":{
      variables:[
        "wsa_pmp_exff",
        "wsa_KPI_std_nrg_newp",
        "wsa_KPI_nrg_cons_new",
        "wsa_KPI_nrg_estm_sav",
        "wsa_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //wst
    "wst_engines":{
      variables:[
        "wst_fuel_typ",
        "wst_vol_fuel",
        "wst_KPI_GHG_fuel_co2",
        "wst_KPI_GHG_fuel_n2o",
        "wst_KPI_GHG_fuel_ch4",
        "wst_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wst_pumping":{
      variables:[
        "wst_nrg_pump",
        "wst_vol_pump",
        "wst_pmp_head",
        "wst_sta_head",
        "wst_coll_len",
        "wst_KPI_std_nrg_cons",
        "wst_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wst_pumping_eff",
        "wst_opportunities",
      ],
      folded:0,
    },

    "wst_pumping_eff": {
      variables:[
        "wst_pmp_flow",
        "wst_pmp_volt",
        "wst_pmp_amps",
        "wst_pmp_pf",
        "c_wst_pmp_pw",
        "wst_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wst_opportunities":{
      variables:[
        "wst_pmp_exff",
        "wst_KPI_std_nrg_newp",
        "wst_KPI_nrg_cons_new",
        "wst_KPI_nrg_estm_sav",
        "wst_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wst_treatment_perf":{
      variables:[
        "wst_tst_carr",
        "wst_trea_cap",
        "wst_KPI_capac_util",
        "wst_KPI_tst_carr",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //wsd
    "wsd_engines":{
      variables:[
        "wsd_fuel_typ",
        "wsd_vol_fuel",
        "wsd_KPI_GHG_fuel_co2",
        "wsd_KPI_GHG_fuel_n2o",
        "wsd_KPI_GHG_fuel_ch4",
        "wsd_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wsd_water_eff":{
      variables:[
        "wsd_auth_con",
        "wsd_bill_con",
        "wsd_SL_water_loss",
        "wsd_SL_nr_water",
        "wsd_KPI_nrg_per_m3",
        "wsa_SL_GHG_nrw",
        "wst_SL_GHG_nrw",
        "wsd_SL_GHG_nrw",
        "wsd_SL_ghg_attr"
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wsd_trucks":{
      variables:[
        "wsd_trck_typ",
        "wsd_vol_trck",
        "wsd_KPI_GHG_trck_co2",
        "wsd_KPI_GHG_trck_n2o",
        "wsd_KPI_GHG_trck_ch4",
        "wsd_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wsd_service_perf":{
      variables:[
        "wsd_deli_pts",
        "wsd_ser_cons",
        "wsd_time_pre",
        "wsd_SL_pres_ade",
        "wsd_SL_cont_sup",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wsd_topographic":{
      variables:[
        "wsd_min_pres",
        "wsd_hi_no_el",
        "wsd_lo_no_el",
        "wsd_av_no_el",
        "wsd_wt_el_no",
        "c_wsd_nrg_topo",
        "c_wsd_nrg_natu",
        "c_wsd_nrg_mini",
        "c_wsd_nrg_supp",
        "wsd_KPI_nrg_efficien",
        "wsd_KPI_nrg_topgraph",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wsd_pumping":{
      variables:[
        "wsd_nrg_pump",
        "wsd_vol_pump",
        "wsd_pmp_head",
        "wsd_pmp_size",
        "wsd_sta_head",
        "wsd_main_len",
        "wsd_KPI_std_nrg_cons",
        "wsd_KPI_un_head_loss",
        "wsd_KPI_water_losses",
      ],
      advanced:1,
      otherQuestions:[
        "wsd_pumping_eff",
        "wsd_opportunities",
      ],
      folded:0,
    },

    "wsd_pumping_eff":{
      variables:[
        "wsd_pmp_flow",
        "wsd_pmp_volt",
        "wsd_pmp_amps",
        "wsd_pmp_pf",
        "c_wsd_pmp_pw",
        "wsd_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wsd_opportunities":{
      variables:[
        "wsd_pmp_exff",
        "wsd_KPI_std_nrg_newp",
        "wsd_KPI_nrg_cons_new",
        "wsd_KPI_nrg_estm_sav",
        "wsd_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //wwc
    "wwc_engines":{
      variables:[
        "wwc_fuel_typ",
        "wwc_vol_fuel",
        "wwc_KPI_GHG_fuel_co2",
        "wwc_KPI_GHG_fuel_n2o",
        "wwc_KPI_GHG_fuel_ch4",
        "wwc_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwc_water_eff": {
      variables:[
        "wwc_wet_flow",
        "wwc_dry_flow",
        "wwc_rain_day",
        "c_wwc_vol_infl",
        "wwc_SL_GHG_ii",
        "wwc_SL_fratio",
        "wwc_SL_GHG_inf",
        "wwt_SL_GHG_inf",
        "wwd_SL_GHG_inf",
        "wwc_SL_inf_emis"
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwc_pumping":{
      variables:[
        "wwc_nrg_pump",
        "wwc_vol_pump",
        "wwc_pmp_head",
        "wwc_sta_head",
        "wwc_coll_len",
        "wwc_KPI_std_nrg_cons",
        "wwc_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wwc_pumping_eff",
        "wwc_opportunities",
      ],
      folded:0,
    },

    "wwc_pumping_eff": {
      variables:[
        "wwc_pmp_flow",
        "wwc_pmp_volt",
        "wwc_pmp_amps",
        "wwc_pmp_pf",
        "c_wwc_pmp_pw",
        "wwc_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwc_opportunities":{
      variables:[
        "wwc_pmp_exff",
        "wwc_KPI_std_nrg_newp",
        "wwc_KPI_nrg_cons_new",
        "wwc_KPI_nrg_estm_sav",
        "wwc_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //wwt
    "wwt_engines":{
      variables:[
        "wwt_fuel_typ",
        "wwt_vol_fuel",
        "wwt_KPI_GHG_fuel_co2",
        "wwt_KPI_GHG_fuel_n2o",
        "wwt_KPI_GHG_fuel_ch4",
        "wwt_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwt_producing_biogas":{
      variables:[
        "wwt_biog_pro",
        "wwt_biog_fla",
        "wwt_ch4_biog",
        "wwt_dige_typ",
        "wwt_fuel_dig",
        "wwt_KPI_biog_x_bod",
        "wwt_KPI_GHG_dig_fuel_co2",
        "wwt_KPI_GHG_dig_fuel_n2o",
        "wwt_KPI_GHG_dig_fuel_ch4",
        "wwt_KPI_GHG_dig_fuel",
        "wwt_KPI_GHG_biog",
      ],
      advanced:0,
      otherQuestions:[
        "wwt_valorizing_biogas",
      ],
      folded:0,
    },

    "wwt_valorizing_biogas":{
      variables:[
        "wwt_biog_val",
        "wwt_nrg_biog",
        "c_wwt_nrg_biog",
        "wwt_KPI_nrg_biogas",
        "wwt_KPI_nrg_x_biog",
        "wwt_SL_GHG_avoided",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwt_treatment_perf":{
      variables:[
        "wwt_trea_cap",
        "wwt_tst_cmpl",
        "wwt_tst_cond",
        "wwt_KPI_capac_util",
        "wwt_SL_qual_com",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwt_pumping":{
      variables:[
        "wwt_nrg_pump",
        "wwt_vol_pump",
        "wwt_pmp_head",
        "wwt_sta_head",
        "wwt_coll_len",
        "wwt_KPI_std_nrg_cons",
        "wwt_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wwt_pumping_eff",
        "wwt_opportunities",
      ],
      folded:0,
    },

    "wwt_pumping_eff": {
      variables:[
        "wwt_pmp_flow",
        "wwt_pmp_volt",
        "wwt_pmp_amps",
        "wwt_pmp_pf",
        "c_wwt_pmp_pw",
        "wwt_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwt_opportunities":{
      variables:[
        "wwt_pmp_exff",
        "wwt_KPI_std_nrg_newp",
        "wwt_KPI_nrg_cons_new",
        "wwt_KPI_nrg_estm_sav",
        "wwt_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwt_sludge_mgmt":{
      variables:[
        "wwt_mass_slu",
        "wwt_dryw_slu",
        "wwt_slu_disp",
        "wwt_KPI_sludg_prod",
        "wwt_KPI_dry_sludge",
        "wwt_KPI_GHG_slu",
        "wwt_wr_C_seq_slu",
      ],
      advanced:0,
      otherQuestions:[
        "wwt_slu_storage",
        "wwt_composting",
        "wwt_incineration",
        "wwt_land_application",
        "wwt_landfilling",
        "wwt_stockpiling",
        "wwt_trucks",
      ],
      folded:0,
    },

    "wwt_slu_storage":{
      variables:[
        "wwt_mass_slu_sto",
        "wwt_time_slu_sto",
        "c_wwt_ch4_pot",
        "wwt_slu_storage_ch4",
        "wwt_KPI_ghg_sto_co2eq",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwt_composting":{
      variables:[
        "wwt_mass_slu_comp",
        "wwt_slu_composting_ch4",
        "wwt_slu_composting_n2o",
        "wwt_KPI_ghg_comp_co2eq",
        "wwt_slu_comp_C_seq",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "wwt_incineration":{
      variables:[
        "wwt_mass_slu_inc",
        "wwt_temp_inc",
        "wwt_slu_inciner_ch4",
        "wwt_slu_inciner_n2o",
        "wwt_KPI_ghg_inc_co2eq",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "wwt_land_application":{
      variables:[
        "wwt_mass_slu_app",
        "wwt_slu_la_N_cont",
        "wwt_soil_typ",
        "wwt_slu_landapp_n2o",
        "wwt_KPI_ghg_app_co2eq",
        "wwt_slu_app_C_seq",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "wwt_landfilling":{
      variables:[
        "wwt_mass_slu_land",
        "wwt_slu_lf_N_cont",
        "wwt_slu_lf_TVS",
        "wwt_slu_type",
        "wwt_slu_landfill_ch4",
        "wwt_slu_landfill_n2o",
        "wwt_KPI_ghg_land_co2eq",
        "wwt_slu_land_C_seq",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "wwt_stockpiling":{
      variables:[
        "wwt_mass_slu_stock",
        "wwt_KPI_ghg_stock_co2eq",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "wwt_trucks":{
      variables:[
        "wwt_trck_typ",
        "wwt_vol_tslu",
        "wwt_KPI_ghg_tsludge_co2",
        "wwt_KPI_ghg_tsludge_n2o",
        "wwt_KPI_ghg_tsludge_ch4",
        "wwt_KPI_ghg_tsludge",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwt_correction_factor":{
      variables:[
        "wwt_GHG_tre_n2o",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

  //wwd
    "wwd_engines":{
      variables:[
        "wwd_fuel_typ",
        "wwd_vol_fuel",
        "wwd_KPI_GHG_fuel_co2",
        "wwd_KPI_GHG_fuel_n2o",
        "wwd_KPI_GHG_fuel_ch4",
        "wwd_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwd_trucks":{
      variables:[
        "wwd_trck_typ",
        "wwd_vol_trck",
        "wwd_KPI_GHG_trck_co2",
        "wwd_KPI_GHG_trck_n2o",
        "wwd_KPI_GHG_trck_ch4",
        "wwd_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "wwd_pumping":{
      variables:[
        "wwd_nrg_pump",
        "wwd_vol_pump",
        "wwd_pmp_head",
        "wwd_sta_head",
        "wwd_coll_len",
        "wwd_KPI_std_nrg_cons",
        "wwd_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wwd_pumping_eff",
        "wwd_opportunities",
      ],
      folded:0,
    },

    "wwd_pumping_eff": {
      variables:[
        "wwd_pmp_flow",
        "wwd_pmp_volt",
        "wwd_pmp_amps",
        "wwd_pmp_pf",
        "c_wwd_pmp_pw",
        "wwd_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwd_opportunities":{
      variables:[
        "wwd_pmp_exff",
        "wwd_KPI_std_nrg_newp",
        "wwd_KPI_nrg_cons_new",
        "wwd_KPI_nrg_estm_sav",
        "wwd_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "wwd_water_reuse":{
      variables:[
        "wwd_wr_N_rec",
        "wwd_wr_P_rec",
        "wwd_wr_adnrg",
        "wwd_wr_vol_d",
        "wwd_SL_ghg_non",   //output
        "wwd_wr_GHG_avo_N", //output
        "wwd_wr_GHG_avo_P", //output
        "wwd_wr_GHG_avo",   //output
        "wwd_wr_GHG_avo_d", //output
        "wwd_wr_nrg_sav",   //output
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //fsc
    "fsc_transport":{
      variables:[
        "fsc_nrg_cons",
        "fsc_KPI_GHG_elec",
        "fsc_trck_typ",
        "fsc_vol_trck",
        "fsc_KPI_GHG_trck_co2",
        "fsc_KPI_GHG_trck_n2o",
        "fsc_KPI_GHG_trck_ch4",
        "fsc_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },

    "fsc_pumping":{
      variables:[
        "fsc_nrg_pump",
        "fsc_vol_pump",
        "fsc_pmp_head",
        "fsc_sta_head",
        "fsc_coll_len",
        "fsc_KPI_std_nrg_cons",
        "fsc_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "fsc_pumping_eff",
        "fsc_opportunities",
      ],
      folded:0,
    },

    "fsc_pumping_eff": {
      variables:[
        "fsc_pmp_flow",
        "fsc_pmp_volt",
        "fsc_pmp_amps",
        "fsc_pmp_pf",
        "c_fsc_pmp_pw",
        "fsc_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "fsc_opportunities":{
      variables:[
        "fsc_pmp_exff",
        "fsc_KPI_std_nrg_newp",
        "fsc_KPI_nrg_cons_new",
        "fsc_KPI_nrg_estm_sav",
        "fsc_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

  //fst
    "fst_engines":{
      variables:[
        "fst_fuel_typ",
        "fst_vol_fuel",
        "fst_KPI_GHG_fuel_co2",
        "fst_KPI_GHG_fuel_n2o",
        "fst_KPI_GHG_fuel_ch4",
        "fst_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },
    "fst_transport":{
      variables:[
        "fst_trck_typ",
        "fst_vol_trck",
        "fst_KPI_GHG_trck_co2",
        "fst_KPI_GHG_trck_n2o",
        "fst_KPI_GHG_trck_ch4",
        "fst_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },
    "fst_producing_biogas":{
      variables:[
        "fst_biog_pro",
        "fst_biog_val",
        "fst_biog_fla",
        "fst_ch4_biog",
        "fst_KPI_GHG_biog",
        "fst_nrg_biog",
        "fst_SL_GHG_avoided",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },

    "fst_pumping":{
      variables:[
        "fst_nrg_pump",
        "fst_vol_pump",
        "fst_pmp_head",
        "fst_sta_head",
        "fst_coll_len",
        "fst_KPI_std_nrg_cons",
        "fst_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "fst_pumping_eff",
        "fst_opportunities",
      ],
      folded:0,
    },

    "fst_pumping_eff": {
      variables:[
        "fst_pmp_flow",
        "fst_pmp_volt",
        "fst_pmp_amps",
        "fst_pmp_pf",
        "c_fst_pmp_pw",
        "fst_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "fst_opportunities":{
      variables:[
        "fst_pmp_exff",
        "fst_KPI_std_nrg_newp",
        "fst_KPI_nrg_cons_new",
        "fst_KPI_nrg_estm_sav",
        "fst_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },


  //fsr
    "fsr_engines":{
      variables:[
        "fsr_fuel_typ",
        "fsr_vol_fuel",
        "fsr_KPI_GHG_fuel_co2",
        "fsr_KPI_GHG_fuel_n2o",
        "fsr_KPI_GHG_fuel_ch4",
        "fsr_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },
    "fsr_effluent":{
      variables:[
        "fsr_vol_disc",
        "fsr_n2o_effl",
        "fsr_bod_effl",
        "fsr_ch4_efac",
        "fsr_KPI_GHG_tre_n2o",
        "fsr_KPI_GHG_tre_ch4",
        "fsr_KPI_GHG_tre",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },
    "fsr_transport":{
      variables:[
        "fsr_trck_typ",
        "fsr_vol_trck",
        "fsr_KPI_GHG_trck_co2",
        "fsr_KPI_GHG_trck_n2o",
        "fsr_KPI_GHG_trck_ch4",
        "fsr_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
      folded:0,
    },
    "fsr_landfil":{
      variables:[
        "fsr_fslu_typ_lf",
        "fsr_mass_landfil",
        "fsr_lf_N_cont",
        "fsr_lf_TVS",
        "fsr_disp_typ",
        "fsr_KPI_GHG_landfil_ch4",
        "fsr_KPI_GHG_landfil_n2o",
        "fsr_KPI_GHG_landfil",
        "fsr_ghg_avoided_landfil",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },
    "fsr_landapp":{
      variables:[
        "fsr_fslu_typ_la",
        "fsr_mass_landapp",
        "fsr_la_N_cont",
        "fsr_soil_typ",
        "fsr_KPI_GHG_landapp",
        "fsr_ghg_avoided_landapp",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },
    "fsr_dumping":{
      variables:[
        "fsr_vol_dumping",
        "fsr_dumping_pth",
        "fsr_ch4_efac_dumping",
        "fsr_bod_conc_fs",
        "fsr_KPI_GHG_dumping_ch4",
        "fsr_KPI_GHG_dumping_n2o",
        "fsr_KPI_GHG_dumping",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },
    "fsr_urine":{
      variables:[
        "fsr_N_urine",
        "fsr_KPI_GHG_urine",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },
    "fsr_reuse":{
      variables:[
        "fsr_reused_N",
        "fsr_reused_P",
        "fsr_ghg_avoided_reuse_N",
        "fsr_ghg_avoided_reuse_P",
        "fsr_ghg_avoided_reuse",
      ],
      advanced:0,
      otherQuestions:[ ],
      folded:0,
    },
    "fsr_pumping":{
      variables:[
        "fsr_nrg_pump",
        "fsr_vol_pump",
        "fsr_pmp_head",
        "fsr_sta_head",
        "fsr_coll_len",
        "fsr_KPI_std_nrg_cons",
        "fsr_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "fsr_pumping_eff",
        "fsr_opportunities",
      ],
      folded:0,
    },

    "fsr_pumping_eff": {
      variables:[
        "fsr_pmp_flow",
        "fsr_pmp_volt",
        "fsr_pmp_amps",
        "fsr_pmp_pf",
        "c_fsr_pmp_pw",
        "fsr_KPI_nrg_elec_eff",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },

    "fsr_opportunities":{
      variables:[
        "fsr_pmp_exff",
        "fsr_KPI_std_nrg_newp",
        "fsr_KPI_nrg_cons_new",
        "fsr_KPI_nrg_estm_sav",
        "fsr_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
      folded:0,
    },
};

/*FUNCTIONS for Questions*/

//return the question codes according to an ubication inside "Global".
//ubication is a pointer to a stage, for example "Global.Water.Abstraction"
Questions.get_questions=function(ubication) {
  let questions=[];

  for(let question in this) {
    if(typeof(this[question])=="function")continue;

    //skip fuel engines questions if anyFuelEngines is zero
    if(Global.General.anyFuelEngines==0) {
      if(["wsa_engines",
        "wst_engines",
        "wsd_engines",
        "wwc_engines",
        "wwt_engines",
        "wwd_engines",
        'fst_engines',
        'fsr_engines',
      ].indexOf(question)+1)
        continue;
    }

    //check all codes inside ubication
    for(let i in this[question].variables){
      let code=this[question].variables[i];
      //check if code exists inside ubication
      if(ubication[code]){
        questions.push(question);
        break;
      }
    }
  }

  return questions;
};

//set default values for all questions to 0
Object.keys(Questions).forEach(key=>{
  Global.Configuration.Questions[key]=0;
});

//is the variable "field" inside a question?
Questions.is_inside=function(field){
  //go over all questions
  for(let question in this){
    for(let i in this[question].variables){
      let code=this[question].variables[i];
      if(field===code){
        return question;
        break;
      }
    }
  }
  return false;
};

//check if the input "field" is shown or hidden
Questions.is_hidden=function(field) {
  //go over all questions
  for(let question in this) {
    //if answer is yes, next question: all fields inside should be shown
    if(Global.Configuration.Questions[question]==1){continue;}

    //if answer is no, look for "field" inside
    for(let i in this[question].variables) {
      let code=this[question].variables[i];
      if(code==field) return true;
    }
  }
  return false;
};

//check if the question "field" should be hidden
Questions.is_question_hidden=function(field) {
  //go over all questions
  for(let question in this) {
    if(Global.Configuration.Questions[question]==1){continue;}
    //if answer is no, look for "field" inside
    for(let i in this[question].otherQuestions) {
      let code=this[question].otherQuestions[i];
      if(code==field) return true;
    }
  }
  return false;
};

//-------------v3 / v2 ---------------------------------------

//reset the values and the otherQuestions
Questions.reset_values=function(question, ubication){
  //reset inputs
  Questions[question].variables.forEach(code=>{
    if(typeof(ubication[code])=="number"){
      ubication[code]=0;
      //also reset substages
      substages.forEach(substage=>{substage[code]=0});
    }
  });
  //reset related questions RECURSIVELY
  Questions[question].otherQuestions.forEach(q=>{
    Global.Configuration.Questions[q]=0;
    Questions.resetValues(q,ubication);
  });
};

//Automatic find repeated variables in Questions
Questions.findRepeated=function() {
  //count how many times appears field in Questions
  function countField(field) {
    let n=0;
    //go over all questions
    for(let question in Questions) {
      //go over all questions
      for(let i in Questions[question].variables) {
        //check if code==field
        if(field==Questions[question].variables[i]) n++;
      }
    }
    return n;
  }
  let repeated=[];
  let code;
  //go over all questions and check that appear 1 time
  for(let question in this) {
    for(let i in this[question].variables) {
      code=this[question].variables[i];
      if(countField(code)>1) repeated.push(code);
    }
  }
  //remove duplicates
  return repeated.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
};
