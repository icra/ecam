/*
  Main data structure object. Stores user inputs and has all equations.
*/

//A "scenario" is an object of class Ecam
class Ecam{
  constructor(){
    this.General={
      version              : "3.0.0",
      Name                 : `New system ${1+Scenarios.length}`,
      AssessmentPeriodStart: "2020-01-01",
      AssessmentPeriodEnd  : "2020-12-31",
      Comments             : "",
      Currency             : "USD", //default currency
      Country              : false, //selected country name (string)
      conv_kwh_co2         : 0,     //electricity conversion (kgCO2/kWh)
      prot_con             : 0,     //prot consumption (kg/person/year)
      bod_pday             : 0,     //BOD5 (g/person/day)
      bod_pday_fs          : 0,     //BOD5 in faecal sludge (g/person/day)
      equations:[
        "Days",
        "Years",
        "TotalGHG",
        "TotalNRG",
      ],
    },

    /*Level 1 - Water Supply*/
    this.Water={
      ws_resi_pop:0,
      ws_serv_pop:0,
      ws_nrg_cost:0,
      ws_run_cost:0,

      equations:[
        "wsa_KPI_GHG",
        "wst_KPI_GHG",
        "wsd_KPI_GHG",
        "ws_KPI_GHG",

        "ws_nrg_cons",
        "ws_vol_fuel",
        "ws_SL_serv_pop",
        "ws_SL_nrg_cost",
        "ws_SL_auth_con",
      ],

      Abstraction:{
        wsa_nrg_cons:0,
        wsa_vol_conv:0,
        wsa_fuel_typ:0,
        wsa_vol_fuel:0,
        wsa_vol_pump:0,
        wsa_nrg_pump:0,
        wsa_sta_head:0,
        wsa_pmp_head:0,
        wsa_main_len:0,
        wsa_pmp_type:0,
        wsa_pmp_size:0,
        wsa_pmp_flow:0, //Measured pump flow L/s
        wsa_pmp_volt:0, //Measured pump voltage V
        wsa_pmp_amps:0, //Measured pump current Amp
        wsa_pmp_pf:0.9, //power factor (no unit)
        wsa_pmp_exff:0, //Expected electromechanical efficiency of new pump % C

        equations:[
          "wsa_KPI_GHG_elec",
          "wsa_KPI_GHG_fuel",
          "wsa_KPI_GHG_fuel_co2",
          "wsa_KPI_GHG_fuel_n2o",
          "wsa_KPI_GHG_fuel_ch4",
          "wsa_KPI_GHG",

          "wsa_nrg_per_abs_watr",
          "wsa_nrg_per_pmp_watr",
          "c_wsa_pmp_pw",
          "wsa_KPI_std_nrg_cons",
          "wsa_KPI_un_head_loss",
          "wsa_KPI_nrg_elec_eff",
          "wsa_KPI_ghg_estm_red",
          "wsa_KPI_std_nrg_newp",
          "wsa_KPI_nrg_cons_new",
          "wsa_KPI_nrg_estm_sav",
        ],
      },

      Treatment:{
        wst_nrg_cons:0,
        wst_vol_trea:0,
        wst_mass_slu:0,
        wst_treatmen:0,
        wst_tst_carr:0,
        wst_trea_cap:0,
        wst_fuel_typ:0,
        wst_vol_fuel:0,
        wst_vol_pump:0,
        wst_nrg_pump:0,
        wst_pmp_head:0,
        wst_sta_head:0,
        wst_coll_len:0,
        wst_pmp_flow:0,
        wst_pmp_volt:0,
        wst_pmp_amps:0,
        wst_pmp_pf:0.9,
        wst_pmp_exff:0,
        equations:[
          "wst_KPI_GHG_elec",
          "wst_KPI_GHG_fuel",
          "wst_KPI_GHG_fuel_co2",
          "wst_KPI_GHG_fuel_n2o",
          "wst_KPI_GHG_fuel_ch4",
          "wst_KPI_GHG",

          "wst_KPI_nrg_per_m3",
          "wst_KPI_slu_per_m3",
          "wst_KPI_capac_util",
          "wst_KPI_tst_carr",
          "wst_KPI_std_nrg_cons",
          "wst_KPI_un_head_loss",
          "c_wst_pmp_pw",
          "wst_KPI_nrg_elec_eff",
          "wst_KPI_std_nrg_newp",
          "wst_KPI_nrg_cons_new",
          "wst_KPI_nrg_estm_sav",
          "wst_KPI_ghg_estm_red",
        ],
      },

      Distribution:{
        wsd_nrg_cons:0,
        wsd_vol_dist:0,
        wsd_auth_con:0,
        wsd_bill_con:0,
        wsd_fuel_typ:0,
        wsd_vol_fuel:0,
        wsd_trck_typ:0,
        wsd_vol_trck:0,
        wsd_deli_pts:0,
        wsd_ser_cons:0,
        wsd_time_pre:0,
        wsd_min_pres:0,
        wsd_hi_no_el:0,
        wsd_lo_no_el:0,
        wsd_av_no_el:0,
        wsd_wt_el_no:0,
        wsd_vol_pump:0,
        wsd_nrg_pump:0,
        wsd_pmp_size:0,
        wsd_sta_head:0,
        wsd_pmp_head:0,
        wsd_main_len:0,
        wsd_pmp_flow:0, //Measured pump flow L/s
        wsd_pmp_volt:0, //Measured pump voltage V
        wsd_pmp_amps:0, //Measured pump current Amp
        wsd_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
        wsd_pmp_pf:0.9, //power factor (no unit)
        equations:[
          "wsd_KPI_GHG_elec",
          "wsd_KPI_GHG_fuel",
          "wsd_KPI_GHG_fuel_co2",
          "wsd_KPI_GHG_fuel_n2o",
          "wsd_KPI_GHG_fuel_ch4",
          "wsd_KPI_GHG_trck",
          "wsd_KPI_GHG_trck_co2",
          "wsd_KPI_GHG_trck_n2o",
          "wsd_KPI_GHG_trck_ch4",
          "wsd_KPI_GHG",

          "wsd_KPI_nrg_per_vd",
          "wsd_KPI_nrg_per_m3",
          "wsd_SL_nr_water",
          "wsa_SL_GHG_nrw",
          "wst_SL_GHG_nrw",
          "wsd_SL_GHG_nrw",
          "wsd_SL_ghg_attr",
          "wsd_SL_water_loss",
          "c_wsd_pmp_pw",
          "wsd_KPI_nrg_per_m3",
          "wsd_KPI_nrg_per_vd",
          "wsd_SL_nr_water",
          "wsd_SL_water_loss",
          "wsd_SL_pres_ade",
          "wsd_SL_cont_sup",
          "c_wsd_nrg_topo",
          "c_wsd_nrg_natu",
          "c_wsd_nrg_mini",
          "c_wsd_nrg_supp",
          "wsd_KPI_nrg_efficien",
          "wsd_KPI_nrg_topgraph",
          "wsd_KPI_std_nrg_cons",
          "wsd_KPI_un_head_loss",
          "wsd_KPI_water_losses",
          "wsd_KPI_nrg_elec_eff",
          "wsd_KPI_std_nrg_newp",
          "wsd_KPI_nrg_cons_new",
          "wsd_KPI_nrg_estm_sav",
          "wsd_KPI_ghg_estm_red",
        ],
      },
    };

    /*Level 1 - Wastewater*/
    this.Waste={
      ww_resi_pop:0,
      ww_nrg_cost:0,
      ww_run_cost:0,

      equations:[
        "wwc_KPI_GHG",
        "wwt_KPI_GHG",
        "wwd_KPI_GHG",
        "ww_KPI_GHG_unt_ch4",
        "ww_KPI_GHG_unt_n2o",
        "ww_KPI_GHG_unt",
        "ww_KPI_GHG",

        "ww_conn_pop",
        "ww_serv_pop",
        "ww_uncl_pop",
        "ww_untr_pop",
        "ww_SL_serv_pop",
        "ww_SL_treat_m3",
        "ww_SL_nrg_cost",
        "ww_nrg_cons",
        "ww_vol_fuel",
        "ww_SL_ghg_unc_ch4",
        "ww_SL_ghg_unc_n2o",
        "ww_SL_ghg_unc",
        "ww_GHG_avoided",
      ],

      Collection:{
        wwc_nrg_cons:0,
        wwc_conn_pop:0,
        wwc_vol_conv:0,
        ww_ch4_efac_unt:0.06, //emission factor for untreated wastewater
        ww_ch4_efac_unc:0.3,  //emission factor for uncollected wastewater
        wwc_fuel_typ:0,
        wwc_vol_fuel:0,
        wwc_wet_flow:0,
        wwc_dry_flow:0,
        wwc_rain_day:0,
        wwc_vol_pump:0,
        wwc_nrg_pump:0,
        wwc_pmp_head:0,
        wwc_sta_head:0,
        wwc_coll_len:0,
        wwc_pmp_flow:0, //Measured pump flow L/s
        wwc_pmp_volt:0, //Measured pump voltage V
        wwc_pmp_amps:0, //Measured pump current Amp
        wwc_pmp_exff:0, //Expected electromechanical efficiency of new pump % C
        wwc_pmp_pf:0.9, //power factor (no unit)

        equations:[
          "wwc_KPI_GHG_elec",
          "wwc_KPI_GHG_fuel",
          "wwc_KPI_GHG_fuel_co2",
          "wwc_KPI_GHG_fuel_n2o",
          "wwc_KPI_GHG_fuel_ch4",
          "wwc_KPI_GHG",

          "wwc_SL_conn_pop",
          "wwc_KPI_nrg_per_m3",
          "c_wwc_vol_infl",
          "wwc_SL_GHG_ii",
          "wwc_SL_fratio",
          "wwc_SL_GHG_inf",
          "wwt_SL_GHG_inf",
          "wwd_SL_GHG_inf",
          "wwc_SL_inf_emis",
          "c_wwc_pmp_pw",
          "wwc_KPI_std_nrg_cons",
          "wwc_KPI_un_head_loss",
          "wwc_KPI_nrg_elec_eff",
          "wwc_KPI_std_nrg_newp",
          "wwc_KPI_nrg_cons_new",
          "wwc_KPI_nrg_estm_sav",
          "wwc_KPI_ghg_estm_red",
        ],
      },

      Treatment:{
        wwt_nrg_cons:0,
        wwt_serv_pop:0,
        wwt_vol_trea:0,
        wwt_type_tre:0,
        wwt_ch4_efac:0,
        wwt_bod_infl:0,
        wwt_bod_effl:0,
        wwt_bod_slud:0,
        wwt_GHG_tre_n2o:0,
        wwt_fuel_typ:0,
        wwt_vol_fuel:0,
        wwt_trea_cap:0,
        wwt_tst_cmpl:0,
        wwt_tst_cond:0,
        wwt_vol_pump:0,
        wwt_nrg_pump:0,
        wwt_pmp_head:0,
        wwt_sta_head:0,
        wwt_coll_len:0,
        wwt_pmp_flow:0,
        wwt_pmp_volt:0,
        wwt_pmp_amps:0,
        wwt_pmp_pf:0.9,
        wwt_pmp_exff:0,
        wwt_biog_pro:0,
        wwt_biog_fla:0,
        wwt_ch4_biog:59,
        wwt_dige_typ:0,
        wwt_fuel_dig:0,
        wwt_nrg_biog:0,
        wwt_biog_val:0,
        wwt_mass_slu:0,
        wwt_dryw_slu:0,
        wwt_slu_disp:0,
        wwt_mass_slu_sto:0,
        wwt_time_slu_sto:0,
        wwt_mass_slu_comp:0,
        wwt_mass_slu_inc:0,
        wwt_temp_inc:0,
        wwt_mass_slu_app:0,
        wwt_soil_typ:0,      //Option: ["Fine","Coarse"]
        wwt_slu_la_N_cont:0, //Total Nitrogen (% of dry weight)
        wwt_mass_slu_land:0,
        wwt_slu_lf_N_cont:0,
        wwt_slu_lf_TVS:0,
        wwt_slu_type:0,
        wwt_mass_slu_stock:0,
        wwt_trck_typ:0,
        wwt_vol_tslu:0,

        equations:[
          "wwt_KPI_GHG_elec",
          "wwt_KPI_GHG_fuel",
          "wwt_KPI_GHG_fuel_co2",
          "wwt_KPI_GHG_fuel_n2o",
          "wwt_KPI_GHG_fuel_ch4",
          "wwt_KPI_GHG_tre_ch4",
          "wwt_KPI_GHG_tre_n2o",
          "wwt_KPI_GHG_tre",
          "wwt_KPI_GHG_dig_fuel",
          "wwt_KPI_GHG_dig_fuel_co2",
          "wwt_KPI_GHG_dig_fuel_n2o",
          "wwt_KPI_GHG_dig_fuel_ch4",
          "wwt_KPI_GHG_biog",
          "wwt_KPI_GHG_slu",
          "wwt_KPI_GHG",

          "c_wwt_bod_rmvd",
          "wwt_KPI_nrg_per_m3",
          "wwt_KPI_nrg_per_kg",
          "wwt_SL_vol_pday",
          "wwt_KPI_capac_util",
          "wwt_SL_qual_com",
          "wwt_KPI_nrg_per_pump",
          "wwt_KPI_std_nrg_cons",
          "wwt_KPI_un_head_loss",
          "c_wwt_pmp_pw",
          "wwt_KPI_nrg_elec_eff",
          "wwt_KPI_std_nrg_newp",
          "wwt_KPI_nrg_cons_new",
          "wwt_KPI_nrg_estm_sav",
          "wwt_KPI_ghg_estm_red",
          "wwt_KPI_biog_x_bod",
          "c_wwt_nrg_biog",
          "wwt_KPI_nrg_biogas",
          "wwt_KPI_nrg_x_biog",
          "wwt_SL_GHG_avoided",
          "wwt_KPI_sludg_prod",
          "wwt_KPI_dry_sludge",
          "wwt_wr_C_seq_slu",
          "c_wwt_ch4_pot",
          "wwt_slu_storage_ch4",
          "wwt_KPI_ghg_sto_co2eq",
          "wwt_slu_composting_ch4",
          "wwt_slu_composting_n2o",
          "wwt_KPI_ghg_comp_co2eq",
          "wwt_slu_inciner_ch4",
          "wwt_slu_inciner_n2o",
          "wwt_KPI_ghg_inc_co2eq",
          "wwt_slu_landapp_n2o",
          "wwt_KPI_ghg_app_co2eq",
          "wwt_slu_landfill_ch4",
          "wwt_slu_landfill_n2o",
          "wwt_KPI_ghg_land_co2eq",
          "wwt_KPI_ghg_stock_co2eq",
          "wwt_slu_comp_C_seq",
          "wwt_slu_app_C_seq",
          "wwt_slu_land_C_seq",
          "wwt_KPI_ghg_tsludge",
          "wwt_KPI_ghg_tsludge_co2",
          "wwt_KPI_ghg_tsludge_n2o",
          "wwt_KPI_ghg_tsludge_ch4",
        ],
      },

      Discharge:{
        wwd_wr_N_rec:0, //N recovered
        wwd_wr_P_rec:0, //P recovered
        wwd_wr_adnrg:0, //additional energy
        wwd_wr_vol_d:0, //volume of reused water displacing potable water
        wwd_nrg_cons:0,
        wwd_fuel_typ:0,
        wwd_vol_fuel:0,
        wwd_trck_typ:0,
        wwd_vol_trck:0,
        wwd_vol_pump:0,
        wwd_nrg_pump:0,
        wwd_pmp_head:0,
        wwd_sta_head:0,
        wwd_coll_len:0,
        wwd_pmp_flow:0,
        wwd_pmp_volt:0,
        wwd_pmp_amps:0,
        wwd_pmp_pf:0.9,
        wwd_pmp_exff:0,
        wwd_vol_disc:0,
        wwd_bod_effl:0,
        wwd_n2o_effl:0,
        wwd_ch4_efac:0.06,
        wwd_vol_nonp:0,//Volume of water reused
        equations:[
          "wwd_KPI_GHG_elec",
          "wwd_KPI_GHG_fuel",
          "wwd_KPI_GHG_fuel_co2",
          "wwd_KPI_GHG_fuel_n2o",
          "wwd_KPI_GHG_fuel_ch4",
          "wwd_KPI_GHG_trck",
          "wwd_KPI_GHG_trck_co2",
          "wwd_KPI_GHG_trck_n2o",
          "wwd_KPI_GHG_trck_ch4",
          "wwd_KPI_GHG_tre_n2o",
          "wwd_KPI_GHG_tre_ch4",
          "wwd_KPI_GHG_tre",
          "wwd_KPI_GHG",

          "wwd_wr_GHG_avo_N",
          "wwd_wr_GHG_avo_P",
          "wwd_wr_GHG_avo",
          "wwd_wr_nrg_sav",
          "wwd_wr_GHG_avo_d",
          "wwd_KPI_nrg_per_m3",
          "wwd_SL_ghg_non",
          "wwd_KPI_std_nrg_cons",
          "wwd_KPI_un_head_loss",
          "c_wwd_pmp_pw",
          "wwd_KPI_nrg_elec_eff",
          "wwd_KPI_std_nrg_newp",
          "wwd_KPI_nrg_cons_new",
          "wwd_KPI_nrg_estm_sav",
          "wwd_KPI_ghg_estm_red",
          "wwd_total_m3",
        ],
      },
    };

    /*Level 1 - Faecal Sludge Management*/
    this.Faecl={
      fs_resi_pop:0, //resident population
      fs_onsi_pop:0, //onsite population
      equations:[
        "fsc_KPI_GHG",
        "fst_KPI_GHG",
        "fsr_KPI_GHG",
        "fs_KPI_GHG",

        "fs_serv_pop",
        "fs_nrg_cons",
        "fs_vol_trck",
        "fs_SL_serv_pop",
      ],

      Containment:{
        fsc_type_tre:0,    //hidden (treatment type)
        fsc_nrg_cons:0,    //energy consumed
        fsc_bod_infl:0,    //influent bod load
        fsc_flooding:0,    //yes/no
        fsc_ch4_efac:0,    //ch4 emission factor
        fsc_cont_emp:0,    //containments emptied
        fsc_fdensity:0,    //density of faecal sludge
        fsc_fslu_emp:0,    //FS emptied
        fsc_bod_conc_fs:0, //[BOD] in FS
        fsc_bod_rmvd:0,    //bod removed as FS
        fsc_trck_typ:0,    //type of fuel
        fsc_vol_trck:0,    //fuel consumed
        fsc_nrg_pump:0,
        fsc_vol_pump:0,
        fsc_pmp_head:0,
        fsc_sta_head:0,
        fsc_coll_len:0,
        fsc_pmp_flow:0,
        fsc_pmp_volt:0,
        fsc_pmp_amps:0,
        fsc_pmp_pf:0.9,
        fsc_pmp_exff:0,
        equations:[
          "fsc_KPI_GHG_elec",
          "fsc_KPI_GHG_cont",
          "fsc_KPI_GHG_trck_co2",
          "fsc_KPI_GHG_trck_n2o",
          "fsc_KPI_GHG_trck_ch4",
          "fsc_KPI_GHG_trck",
          "fsc_KPI_GHG",
          "fsc_KPI_std_nrg_cons",
          "fsc_KPI_un_head_loss",
          "c_fsc_pmp_pw",
          "fsc_KPI_nrg_elec_eff",
          "fsc_KPI_std_nrg_newp",
          "fsc_KPI_nrg_cons_new",
          "fsc_KPI_nrg_estm_sav",
          "fsc_KPI_ghg_estm_red",
        ],
      },

      Treatment:{
        fst_nrg_cons:0,
        fst_ch4_efac:0,
        fst_vol_fuel:0, //fuel consumed
        fst_fuel_typ:0, //type of fuel
        fst_trck_typ:0, //type of fuel
        fst_vol_trck:0, //fuel consumed
        fst_biog_pro:0,
        fst_biog_val:0,
        fst_biog_fla:0,
        fst_ch4_biog:59,
        fst_nrg_biog:0,
        fst_bod_infl:0,
        fst_bod_effl:0,
        fst_type_tre:0,
        fst_bod_slud:0,
        fst_nrg_pump:0,
        fst_vol_pump:0,
        fst_pmp_head:0,
        fst_sta_head:0,
        fst_coll_len:0,
        fst_pmp_flow:0,
        fst_pmp_volt:0,
        fst_pmp_amps:0,
        fst_pmp_pf:0.9,
        fst_pmp_exff:0,
        equations:[
          "fst_KPI_GHG_elec",
          "fst_KPI_GHG_fuel_co2",
          "fst_KPI_GHG_fuel_n2o",
          "fst_KPI_GHG_fuel_ch4",
          "fst_KPI_GHG_fuel",
          "fst_KPI_GHG_trck_co2",
          "fst_KPI_GHG_trck_n2o",
          "fst_KPI_GHG_trck_ch4",
          "fst_KPI_GHG_trck",
          "fst_KPI_GHG_biog",
          "fst_KPI_GHG_tre_ch4",
          "fst_KPI_GHG_tre_n2o",
          "fst_KPI_GHG_tre",
          "fst_KPI_GHG",
          "fst_SL_GHG_avoided",
          "fst_KPI_std_nrg_cons",
          "fst_KPI_un_head_loss",
          "c_fst_pmp_pw",
          "fst_KPI_nrg_elec_eff",
          "fst_KPI_std_nrg_newp",
          "fst_KPI_nrg_cons_new",
          "fst_KPI_nrg_estm_sav",
          "fst_KPI_ghg_estm_red",
        ],
      },

      Reuse:{
        fsr_type_tre:0,         //main type of disposal
        fsr_fslu_typ:0,         //main type of faecal sludge
        fsr_nrg_cons:0,
        fsr_fuel_typ:0,         //type of fuel
        fsr_vol_fuel:0,         //fuel consumed
        fsr_trck_typ:0,         //type of fuel
        fsr_vol_trck:0,         //fuel consumed
        fsr_mass_landapp:0,     //dry weight sent to land application
        fsr_soil_typ:0,         //soil type for land application
        fsr_fslu_typ_la:0,      //type of faecal sludge disposed landapp
        fsr_la_N_cont:0,        //N content of faecal sludge
        fsr_mass_landfil:0,     //dry weight sent to landfilling
        fsr_disp_typ:0,         //disposal type for landfilling
        fsr_fslu_typ_lf:0,      //type of faecal sludge disposed landfil
        fsr_lf_N_cont:0,        //N content of faecal sludge
        fsr_lf_TVS:0,           //TVS content of faecal sludge
        fsr_vol_dumping:0,      //volume dumped
        fsr_ch4_efac_dumping:0, //emission factor depending on dumping pathway
        fsr_dumping_pth:0,      //dumping pathway
        fsr_bod_conc_fs:0,      //[BOD] in FS
        fsr_vol_disc:0,
        fsr_bod_effl:0,
        fsr_ch4_efac:0,
        fsr_n2o_effl:0,
        fsr_N_urine:0,
        fsr_reused_N:0,
        fsr_reused_P:0,
        fsr_nrg_pump:0,
        fsr_vol_pump:0,
        fsr_pmp_head:0,
        fsr_sta_head:0,
        fsr_coll_len:0,
        fsr_pmp_flow:0,
        fsr_pmp_volt:0,
        fsr_pmp_amps:0,
        fsr_pmp_pf:0.9,
        fsr_pmp_exff:0,
        equations:[
          "fsr_KPI_GHG_elec",
          "fsr_KPI_GHG_fuel_co2",
          "fsr_KPI_GHG_fuel_n2o",
          "fsr_KPI_GHG_fuel_ch4",
          "fsr_KPI_GHG_fuel",
          "fsr_KPI_GHG_trck_co2",
          "fsr_KPI_GHG_trck_n2o",
          "fsr_KPI_GHG_trck_ch4",
          "fsr_KPI_GHG_trck",
          "fsr_KPI_GHG_landapp",
          "fsr_KPI_GHG_landfil_n2o",
          "fsr_KPI_GHG_landfil_ch4",
          "fsr_KPI_GHG_landfil",
          "fsr_KPI_GHG_dumping_n2o",
          "fsr_KPI_GHG_dumping_ch4",
          "fsr_KPI_GHG_dumping",
          "fsr_KPI_GHG_tre_n2o",
          "fsr_KPI_GHG_tre_ch4",
          "fsr_KPI_GHG_tre",
          "fsr_KPI_GHG_urine",
          "fsr_KPI_GHG",
          "fsr_ghg_avoided_landapp",
          "fsr_ghg_avoided_landfil",
          "fsr_ghg_avoided_reuse_N",
          "fsr_ghg_avoided_reuse_P",
          "fsr_ghg_avoided_reuse",
          "fsr_KPI_std_nrg_cons",
          "fsr_KPI_un_head_loss",
          "c_fsr_pmp_pw",
          "fsr_KPI_nrg_elec_eff",
          "fsr_KPI_std_nrg_newp",
          "fsr_KPI_nrg_cons_new",
          "fsr_KPI_nrg_estm_sav",
          "fsr_KPI_ghg_estm_red",
          "fsr_ghg_avoided_land",
        ],
      },
    };

    //aliases for level 2: minimize code of equations
      this.wsa = this.Water.Abstraction;
      this.wst = this.Water.Treatment;
      this.wsd = this.Water.Distribution;
      this.wwc = this.Waste.Collection;
      this.wwt = this.Waste.Treatment;
      this.wwd = this.Waste.Discharge;
      this.fsc = this.Faecl.Containment;
      this.fst = this.Faecl.Treatment;
      this.fsr = this.Faecl.Reuse;

    /*user preferences*/
    this.Configuration={
      ActiveStages:{
        "water":false, "waterAbs":false, "waterTre":false, "waterDis":false,
        "waste":false, "wasteCol":false, "wasteTre":false, "wasteDis":false,
        "faecl":false, "faeclCon":false, "faeclTre":false, "faeclReu":false,
      },

      //user selected units for inputs
      Units:{
        //code:unit
      },

      //auxiliar object to store user selections
      Selected:{
        gwp_reports_index:0,
      },

      //answers for filters (see "questions.js")
      Questions:{
        //wwt_valorizing_biogas: 0,
        //fst_valorizing_biogas: 0,
      },

      FoldedQuestions:[
        //keys of folded questions
      ],
    };

    //set default values for all questions to 0
    Object.keys(Questions).filter(key=>{
      return typeof(Questions[key])=='object'
    }).forEach(key=>{
      this.Configuration.Questions[key]=0;
    });

    /*Tier A backend (inputs and outputs only)*/
    this.Tier_A={
      //water supply
      Water:{
        //ws inputs
          ws_nrg_cons:  0, //kWh - energy consumed from the grid
          ws_vol_fuel:  0, //L   - volume of fuel consumed (engines)
          wsd_vol_dist: 0, //m3  - volume of water injected to distribution
          ws_run_cost:  0, //$   - total running costs
          ws_nrg_cost:  0, //$   - energy cost

        //ws outputs
          ws_KPI_GHG(){ //ws total ghg emissions
            return this.ws_KPI_GHG_elec()+this.ws_KPI_GHG_fuel();
          },
          ws_KPI_GHG_elec(){ //ws ghg from electricity
            return this.ws_nrg_cons*Global.General.conv_kwh_co2;
          },
          ws_KPI_GHG_fuel(){ //ws ghg from fuel engines (CO2 + N2O + CH4)
            return this.ws_KPI_GHG_fuel_co2()+this.ws_KPI_GHG_fuel_n2o()+this.ws_KPI_GHG_fuel_ch4();
          },
          ws_KPI_GHG_fuel_co2(){ //ws ghg from fuel engines (CO2)
            let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
            return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
          },
          ws_KPI_GHG_fuel_n2o(){ //ws ghg from fuel engines (N2O)
            let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
            return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
          },
          ws_KPI_GHG_fuel_ch4(){ //ws ghg from fuel engines (CH4)
            let fuel=Tables['Fuel types'].Diesel; //assume diesel as fuel type
            return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
          },
      },

      //wastewater
      Waste:{
        //ww inputs
          ww_nrg_cons:               0, //kWh      - energy consumed from the grid
          ww_vol_fuel:               0, //L        - volume of fuel consumed (engines)
          wwt_vol_trea:              0, //m3       - volume of treated water
          wwd_vol_disc:              0, //m3       - volume of discharged effluent to water body
          wwd_n2o_effl:              0, //mg/L     - total nitrogen concentration in the effluent
          ww_run_cost:               0, //$        - total running costs
          ww_nrg_cost:               0, //$        - energy cost
          wwt_producing_biogas:      0, //yes/no   - are you producing biogas?
          wwt_valorizing_biogas:     0, //yes/no   - are you valorizing biogas?
          wwt_type_tre:              0, //dropdown - select main treatment type
          ww_sludge_disposal_method: 0, //dropdown - select sludge disposal method

        //ww outputs (ghg emissions)
          ww_KPI_GHG() { //ww total ghg emissions
            return this.ww_KPI_GHG_elec()+
              this.ww_KPI_GHG_fuel()+
              this.ww_KPI_GHG_biog()+
              this.ww_KPI_GHG_tre()+
              this.ww_KPI_GHG_slu();
          },
          ww_KPI_GHG_elec(){ //ww ghg from electricity
            return this.ww_nrg_cons*Global.General.conv_kwh_co2;
          },
          ww_KPI_GHG_fuel(){ //ww ghg from fuel engines (CO2 + N2O + CH4)
            return this.ww_KPI_GHG_fuel_co2()+this.ww_KPI_GHG_fuel_n2o()+this.ww_KPI_GHG_fuel_ch4();
          },
          ww_KPI_GHG_fuel_co2(){ //ww ghg from fuel engines (CO2)
            let fuel=Tables['Fuel types'].Diesel;
            return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
          },
          ww_KPI_GHG_fuel_n2o(){ //ww ghg from fuel engines (N2O)
            let fuel=Tables['Fuel types'].Diesel;
            return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
          },
          ww_KPI_GHG_fuel_ch4(){ //ww ghg from fuel engines (CH4)
            let fuel=Tables['Fuel types'].Diesel;
            return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
          },
          ww_KPI_GHG_biog(){ //ww ghg from biogas
            let ww_biog_pro = this.wwt_producing_biogas  ? Global.Waste.Treatment.wwt_serv_pop*Global.General.bod_pday*Global.Days()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value/1000 : 0;
            let ww_biog_val = this.wwt_valorizing_biogas ? ww_biog_pro : 0;
            let ww_biog_fla = this.wwt_valorizing_biogas ? 0           : ww_biog_pro;
            let ww_ch4_biog = 59;
            return (ww_biog_pro - ww_biog_val - ww_biog_fla + ww_biog_fla*Cts.ct_ch4_lo.value/100)*ww_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
          },
          ww_KPI_GHG_tre(){ //ww ghg from treatment (Treatment and Discharge stages)
            return this.wwt_KPI_GHG_tre() + this.wwd_KPI_GHG_tre();
          },
          wwt_KPI_GHG_tre(){ //ww ghg from treatment (Treatment) (CH4 + N2O)
            return this.wwt_KPI_GHG_tre_ch4()+this.wwt_KPI_GHG_tre_n2o();
          },
          wwt_KPI_GHG_tre_ch4(){ //ww ghg from treatment (Treatment) (CH4)
            let wwt_type_tre = this.wwt_type_tre;   //number
            let wwt_bod_infl = this.wwt_bod_infl(); //number
            let wwt_bod_effl = this.wwt_bod_effl(); //number
            let wwt_bod_slud = this.wwt_bod_slud(); //number
            let wwt_ch4_efac = this.wwt_ch4_efac(); //number
            return (wwt_bod_infl-wwt_bod_slud-wwt_bod_effl)*wwt_ch4_efac*Cts.ct_ch4_eq.value; //number
          },
          wwt_KPI_GHG_tre_n2o(){ //ww ghg from treatment (Treatment) (N2O)
            return Global.Waste.Treatment.wwt_serv_pop*Cts.ct_fac_ic.value*Cts.ct_n2o_efp.value*Global.Years()*1e-3*Cts.ct_n2o_eq.value;
          },
          wwd_KPI_GHG_tre(){ //ww ghg from treatment (Discharge) (CH4 + N2O)
            return this.wwd_KPI_GHG_tre_ch4()+this.wwd_KPI_GHG_tre_n2o();
          },
          wwd_KPI_GHG_tre_ch4(){ //ww ghg from treatment (Discharge) (CH4)
            return this.wwt_bod_effl()*this.wwt_ch4_efac()*Cts.ct_ch4_eq.value;
          },
          wwd_KPI_GHG_tre_n2o(){ //ww ghg from treatment (Discharge) (N2O)
            return this.wwd_n2o_effl/1000*this.wwd_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
          },
          ww_KPI_GHG_slu(){ //ww ghg from sludge management
            return this.wwt_KPI_GHG_slu_comp()+
              this.wwt_KPI_GHG_slu_inc()+
              this.wwt_KPI_GHG_slu_landapp()+
              this.wwt_KPI_GHG_slu_landfill()+
              this.wwt_KPI_GHG_slu_stock();
          },
          wwt_KPI_GHG_slu_comp(){ //ww ghg from sludge management (composting) (CH4 + N2O)
            return this.wwt_KPI_GHG_slu_comp_ch4()+this.wwt_KPI_GHG_slu_comp_n2o();
          },
          wwt_KPI_GHG_slu_comp_ch4(){ //ww ghg from sludge management (composting) (CH4)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'comp') return 0;

            let wwt_mass_slu_comp = this.wwt_dryw_slu();
            return wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value;
          },
          wwt_KPI_GHG_slu_comp_n2o(){ //ww ghg from sludge management (composting) (N2O)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'comp') return 0;

            let wwt_mass_slu_comp = this.wwt_dryw_slu();
            return wwt_mass_slu_comp*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
          },
          wwt_KPI_GHG_slu_inc(){ //ww ghg from sludge management (incineration) (CH4 + N2O)
            return this.wwt_KPI_GHG_slu_inc_ch4()+this.wwt_KPI_GHG_slu_inc_n2o();
          },
          wwt_KPI_GHG_slu_inc_ch4(){ //ww ghg from sludge management (incineration) (CH4)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'inc') return 0;

            let wwt_mass_slu_inc = this.wwt_dryw_slu();
            return (4.85/1e5)*wwt_mass_slu_inc*Cts.ct_ch4_eq.value;
          },
          wwt_KPI_GHG_slu_inc_n2o(){ //ww ghg from sludge management (incineration) (N2O)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'inc') return 0;

            let wwt_temp_inc = 1023; //temperature assumed in tier A
            let wwt_mass_slu_inc = this.wwt_dryw_slu();
            return 0.03*wwt_mass_slu_inc*(161.3-0.14*Math.max(1023,wwt_temp_inc))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
          },
          wwt_KPI_GHG_slu_landapp(){ //ww ghg from sludge management (land application) (N2O)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'app') return 0;

            let sludge_type       = "Non-digested";
            let soil_type         = "Fine-Textured (>30% clay)";
            let wwt_slu_la_N_cont = Tables.wwt_slu_disp[sludge_type].la_N_cont;
            let wwt_mass_slu_la   = this.wwt_dryw_slu();
            let ratio_CN          = Global.content_C(wwt_mass_slu_la,sludge_type)/Global.content_N(wwt_mass_slu_la,sludge_type)||0;
            if(ratio_CN>=30){return 0;}
            return wwt_mass_slu_la*wwt_slu_la_N_cont/100*0.023*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
          },
          wwt_KPI_GHG_slu_landfill(){ //ww ghg from sludge management (landfilling) (CH4 + N2O)
            return this.wwt_KPI_GHG_slu_landfill_ch4()+this.wwt_KPI_GHG_slu_landfill_n2o();
          },
          wwt_KPI_GHG_slu_landfill_ch4(){ //ww ghg from sludge management (landfilling) (CH4)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'land') return 0;

            let wwt_mass_slu_lf = this.wwt_dryw_slu();
            let sludge_type     = "Non-digested"; //tier A assumption
            let wwt_slu_lf_TVS  = Tables.wwt_slu_disp[sludge_type].TVS;
            return wwt_mass_slu_lf*Cts.ct_oc_vs.value*wwt_slu_lf_TVS/100*Cts.ct_lf_unc.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_lf.value/100*Cts.ct_DOCfra.value/100*Cts.ct_d3y_lf.value/100*Cts.ct_ch4_eq.value;
          },
          wwt_KPI_GHG_slu_landfill_n2o(){ //ww ghg from sludge management (landfilling) (N2O)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'land') return 0;

            let wwt_mass_slu_lf   = this.wwt_dryw_slu();
            let sludge_type       = "Non-digested"; //tier A assumption
            let wwt_slu_lf_N_cont = Tables.wwt_slu_disp[sludge_type].la_N_cont;
            let ratio_CN          = Global.content_C(wwt_mass_slu_lf,sludge_type)/Global.content_N(wwt_mass_slu_lf,sludge_type)||0;

            if(ratio_CN>30){
              return 0;
            }else{
              return wwt_mass_slu_lf*wwt_slu_lf_N_cont/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
            }
          },
          wwt_KPI_GHG_slu_stock(){ //ww ghg from sludge management (stockpiling)
            let sludge_disposal_method = Tables.find('ww_sludge_disposal_method',this.ww_sludge_disposal_method);
            if(sludge_disposal_method != 'stock') return 0;

            return this.wwt_dryw_slu()*90.3/1000;
          },

        //ww estimations
          wwt_bod_infl(){ //ww estimation: influent BOD based on population
            return Global.General.bod_pday/1000*Global.ww_serv_pop()*Global.Days(); //number
          },
          wwt_bod_effl(){ //ww estimation: effluent BOD (10%)
            return 0.1 * this.wwt_bod_infl();
          },
          wwt_bod_slud(){ //ww estimation: bod removed as sludge based on treatment type
            let type_tre = Tables.find('wwt_type_tre', this.wwt_type_tre); //string
            var percent  = Tables.wwt_type_tre[type_tre].bod_rmvd_as_sludge_estm; //number
            return percent*this.wwt_bod_infl(); //number
          },
          wwt_ch4_efac(){ //ww estimation: CH4 emission factor based on treatment type
            let type_tre = Tables.find('wwt_type_tre', this.wwt_type_tre); //string
            return Tables.wwt_type_tre[type_tre].ch4_efac; //number
          },
          wwt_dryw_slu(){ //ww estimation: mass of dry sludge produced (4% of wet sludge produced)
            let b = this.wwt_producing_biogas ? 0.6 : 1;
            let wwt_mass_slu = b*0.55*Global.General.bod_pday*Global.ww_serv_pop()*0.9*1e-3*1.176*Global.Days();
            return 0.04*wwt_mass_slu;
          },
      },

      //faecal sludge management
      Faecl:{
        //fs inputs
          fs_nrg_cons:           0, //kWh      - energy consumed from the grid
          fs_vol_trck:           0, //L        - volume of fuel consumed (truck transport)
          fsc_cont_emp:          0, //%        - containments emptied
          fsc_flooding:          0, //yes/no   - is the containment experiencing flooding or groundwater infiltration?
          fsc_type_tre:          0, //dropdown - main containment type
          fst_type_tre:          0, //dropdown - main treatment type
          fst_producing_biogas:  0, //yes/no   - are you producing biogas?
          fst_valorizing_biogas: 0, //yes/no   - are you valorizing biogas?
          fsr_n2o_effl:          0, //number   - nitrogen load in the effluent
          fsr_type_tre:          0, //dropdown - main disposal type
          fsr_fslu_typ:          0, //dropdown - type of faecal sludge disposed

        //OUTPUTS (EMISSIONS AND ESTIMATIONS)
          //fs total ghg
          fs_KPI_GHG(){
            return this.fs_KPI_GHG_elec()+
              this.fs_KPI_GHG_trck()+
              this.fsc_KPI_GHG_cont()+
              this.fst_KPI_GHG_tre()+
              this.fst_KPI_GHG_biog()+
              this.fsr_KPI_GHG_landfil()+
              this.fsr_KPI_GHG_landapp()+
              this.fsr_KPI_GHG_dumping();
          },

          //fs ghg elec
          fs_KPI_GHG_elec(){return this.fs_nrg_cons*Global.General.conv_kwh_co2;},

          //fs ghg trck
            fs_KPI_GHG_trck(){
              return this.fs_KPI_GHG_trck_co2()+
              this.fs_KPI_GHG_trck_n2o()+
              this.fs_KPI_GHG_trck_ch4();
            },
            fs_KPI_GHG_trck_co2(){
              let fuel=Tables['Fuel types'].Diesel;
              return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
            },
            fs_KPI_GHG_trck_n2o(){
              let fuel=Tables['Fuel types'].Diesel;
              return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
            },
            fs_KPI_GHG_trck_ch4(){
              let fuel=Tables['Fuel types'].Diesel;
              return this.fs_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
            },

          //fsc ghg cont
            fsc_KPI_GHG_cont(){
              return (this.fsc_bod_infl()-this.fsc_bod_rmvd())*this.fsc_ch4_efac()*Cts.ct_ch4_eq.value;
            },

          //fst ghg tre
            fst_KPI_GHG_tre(){
              return this.fst_KPI_GHG_tre_ch4()+this.fst_KPI_GHG_tre_n2o();
            },
            fst_KPI_GHG_tre_ch4(){
              return (this.fst_bod_infl()-this.fst_bod_slud()-this.fst_bod_effl())*this.fst_ch4_efac()*Cts.ct_ch4_eq.value;
            },
            fst_KPI_GHG_tre_n2o(){
              return 0; //to be defined (TBD TODO)
            },

          //fst ghg biogas
            fst_KPI_GHG_biog(){
              let fst_ch4_biog = 59; //%
              return (this.fst_biog_pro()-this.fst_biog_val()-this.fst_biog_fla()+this.fst_biog_fla()*Cts.ct_ch4_lo.value/100)*fst_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
            },

          //fsr ghg landfill
            fsr_KPI_GHG_landfil(){
              return this.fsr_KPI_GHG_landfil_n2o()+
                this.fsr_KPI_GHG_landfil_ch4();
            },
            fsr_KPI_GHG_landfil_n2o(){
              let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
              if(fsr_type_tre!="Landfilling") return 0;

              return this.fsr_mass_landfil()*this.fsr_lf_N_cont()/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
            },
            fsr_KPI_GHG_landfil_ch4(){
              let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
              if(fsr_type_tre!="Landfilling") return 0;

              return this.fsr_mass_landfil()*this.fsr_lf_TVS()/100*Cts.ct_oc_vs.value*Cts.ct_DOCfra.value/100*Cts.ct_lf_unc.value*Cts.ct_ch4_C.value*Cts.ct_ch4_lf.value/100*Cts.ct_d3y_lf.value/100*Cts.ct_ch4_eq.value;
            },

          //fsr ghg landapp
            fsr_KPI_GHG_landapp(){
              let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
              if(fsr_type_tre!="Land application") return 0;

              let N_transformed_to_N2O=0.023;
              return this.fsr_mass_landapp()*this.fsr_la_N_cont()/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
            },

          //fsr ghg dumping
            fsr_KPI_GHG_dumping(){
              return this.fsr_KPI_GHG_dumping_n2o()+this.fsr_KPI_GHG_dumping_ch4();
            },
            fsr_KPI_GHG_dumping_n2o(){
              let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
              if(fsr_type_tre!="Dumping") return 0;

              return this.fsr_vol_dumping()*this.fsr_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
            },
            fsr_KPI_GHG_dumping_ch4(){
              let fsr_type_tre = Tables.find('fsr_type_tre',this.fsr_type_tre);
              if(fsr_type_tre!="Dumping") return 0;

              let fsr_ch4_efac_dumping = 0.3; //kgCH4/kgBOD
              return this.fsr_vol_dumping()*this.fsr_bod_conc_fs()*fsr_ch4_efac_dumping*Cts.ct_ch4_eq.value;
            },

          //fsm estimations
            fsc_bod_infl(){ return Global.General.bod_pday_fs/1000*Global.Faecl.fs_onsi_pop*Global.Days(); },
            fsc_bod_rmvd(){ return this.fsc_fslu_emp()*this.fsc_bod_conc_fs(); },
            fsc_bod_conc_fs(){
              let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //containment type (string)
              return Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
            },
            fsc_fslu_emp(){ return Cts.ct_fs_prod.value*Global.Faecl.fs_onsi_pop*Global.Days()/this.fsc_fdensity()*this.fsc_cont_emp/100; },
            fsc_fdensity(){
              let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //string
              return Tables.fsc_type_tre[cont_typ].fs_density;
            },
            fsc_ch4_efac(){
              let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //string
              return Tables.fsc_type_tre[cont_typ][this.fsc_flooding?'ch4_efac_flooding':'ch4_efac'];
            },
            fst_bod_infl(){ return this.fsc_bod_rmvd(); },
            fst_bod_slud(){
              let type_tre=Tables.find('fst_type_tre',this.fst_type_tre); //string
              return Tables.fst_type_tre[type_tre].bod_rmvd_as_sludge_estm*this.fst_bod_infl();
            },
            fst_bod_effl(){ return 0.10*this.fst_bod_infl(); },
            fst_ch4_efac(){
              let type_tre=Tables.find('fst_type_tre',this.fst_type_tre); //string
              return Tables.fst_type_tre[type_tre].ch4_efac;
            },
            fst_biog_pro(){
              if(this.fst_producing_biogas){
                return this.fst_bod_infl()*Cts.ct_bod_kg.value*Cts.ct_biog_g.value;
              }else{
                return 0;
              }
            },
            fst_biog_val(){
              if(this.fst_valorizing_biogas){
                return this.fst_biog_pro();
              }else{
                return 0;
              }
            },
            fst_biog_fla(){
              return this.fst_valorizing_biogas ? 0 : this.fst_biog_pro();
            },
            fsr_mass_landfil(){
              let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
              let total_solids=Tables.fsr_fslu_typ_lf[fsr_fslu_typ].total_solids;
              return this.fsc_fslu_emp()*this.fsc_fdensity()*total_solids;
            },
            fsr_lf_N_cont(){
              let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
              return Tables.fsr_fslu_typ_lf[fsr_fslu_typ].N_content;
            },
            fsr_lf_TVS(){
              let fsr_fslu_typ=Tables.find('fsr_fslu_typ_lf',this.fsr_fslu_typ);
              return 100*Tables.fsr_fslu_typ_lf[fsr_fslu_typ].TVS;
            },
            fsr_mass_landapp(){
              let fsr_fslu_typ=Tables.find('fsr_fslu_typ_la',this.fsr_fslu_typ);
              let total_solids=Tables.fsr_fslu_typ_la[fsr_fslu_typ].total_solids;
              return this.fsc_fslu_emp()*this.fsc_fdensity()*total_solids;
            },
            fsr_la_N_cont(){
              let fsr_fslu_typ=Tables.find('fsr_fslu_typ_la',this.fsr_fslu_typ);
              return Tables.fsr_fslu_typ_la[fsr_fslu_typ].N_content;
            },
            fsr_vol_dumping(){return this.fsc_fslu_emp()},
            fsr_bod_conc_fs(){
              let cont_typ=Tables.find('fsc_type_tre',this.fsc_type_tre); //containment type (string)
              return Tables.fsc_type_tre[cont_typ].BOD_conc_FS;
            },
      },
    };

    //Arrays of substages (for level 3)
    //TODO v3
    this.Substages={
      "Water":{
        "Abstraction":  [], //wsa
        "Treatment":    [], //wst
        "Distribution": [], //wsd
      },
      "Waste":{
        "Collection":   [], //wwc
        "Treatment":    [], //wwt
        "Discharge":    [], //wwd
      },
      "Faecl":{
        "Containment":  [], //fsc
        "Treatment":    [], //fst
        "Reuse":        [], //fsr
      },
    };
  }

  //===========================================================================
  // ALL EQUATIONS
  //===========================================================================

  //GENERAL FUNCTIONS
    //get assesment period duration (in days)
    Days(){
      let startDate=new Date(this.General.AssessmentPeriodStart);
      let finalDate=new Date(this.General.AssessmentPeriodEnd);
      //add 1 day to include the whole final date
      //for example: from january 1st to december 31th is 365 days
      return 1+(finalDate-startDate)/1000/60/60/24;
    }

    //get assesment period duration (in years)
    Years(){
      return this.Days()/365;
    }

    //calculate total GHG emissions
    TotalGHG(){
      return this.ws_KPI_GHG()+this.ww_KPI_GHG()+this.fs_KPI_GHG();
    }

    //calculate total energy consumed
    TotalNRG(){
      return this.ws_nrg_cons()+this.ww_nrg_cons()+this.fs_nrg_cons();
    }

    /*carbon content based on sludge type and mass*/
    content_C(sludge_mass,sludge_type){
      if(sludge_type=="Non-digested"){
        return Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*sludge_mass}
      if(sludge_type=="Digested"){
        return Cts.ct_oc_vs.value*Cts.ct_vs_dig.value*sludge_mass}
      else{return 0}
    }

    /*nitrogen content based on sludge type and mass*/
    content_N(sludge_mass,sludge_type){
      if(sludge_type=="Non-digested"){
        return sludge_mass*0.04}
      if(sludge_type=="Digested"){
        return sludge_mass*0.05}
      else{return 0}
    }

  //L1 WS WATER EQUATIONS
    ws_KPI_GHG(){
      return this.wsa_KPI_GHG()+this.wst_KPI_GHG()+this.wsd_KPI_GHG();
    }
    ws_nrg_cons(){
      return this.wsa.wsa_nrg_cons
            +this.wst.wst_nrg_cons
            +this.wsd.wsd_nrg_cons;
    }
    ws_vol_fuel(){
      return this.wsa.wsa_vol_fuel
            +this.wst.wst_vol_fuel
            +this.wsd.wsd_vol_fuel;
    }
    ws_SL_serv_pop(){
      return 100*this.Water.ws_serv_pop/this.Water.ws_resi_pop;
    }
    ws_SL_nrg_cost(){
      return 100*this.Water.ws_nrg_cost/this.Water.ws_run_cost;
    }
    ws_SL_auth_con(){
      return 1e3*this.wsd.wsd_auth_con/
        this.Water.ws_serv_pop/
        this.Days();
    }

  //  L2 WSA WATER ABSTRACTION EQUATIONS
    wsa_nrg_per_abs_watr(){
      return this.wsa.wsa_nrg_cons/
        this.wsa.wsa_vol_conv;
    }
    wsa_nrg_per_pmp_watr(){
      return this.wsa.wsa_nrg_pump/
        this.wsa.wsa_vol_pump;
    }
    c_wsa_pmp_pw(){
      return this.wsa.wsa_pmp_flow*
        this.wsa.wsa_pmp_head*
        Cts.ct_gravit.value/1000;
    }
    wsa_KPI_std_nrg_cons(){
      return this.wsa.wsa_nrg_pump/(
        this.wsa.wsa_vol_pump*
        this.wsa.wsa_pmp_head/100
      );
    }
    wsa_KPI_un_head_loss(){
      return 1e3*(
        this.wsa.wsa_pmp_head
        -this.wsa.wsa_sta_head
      )/this.wsa.wsa_main_len;
    }
    wsa_KPI_nrg_elec_eff(){
      return 100*this.c_wsa_pmp_pw()/(
        this.wsa.wsa_pmp_volt
        *this.wsa.wsa_pmp_amps
        *Math.sqrt(3)*this.wsa.wsa_pmp_pf/1000
      );
    }
    wsa_KPI_GHG_elec(){
      return this.wsa.wsa_nrg_cons*this.General.conv_kwh_co2;
    }
    wsa_KPI_GHG_fuel(){
      return this.wsa_KPI_GHG_fuel_co2()
        +this.wsa_KPI_GHG_fuel_n2o()
        +this.wsa_KPI_GHG_fuel_ch4();
    }
    wsa_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa.wsa_fuel_typ)];
      return this.wsa.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wsa_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa.wsa_fuel_typ)];
      return this.wsa.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wsa_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wsa_fuel_typ',this.wsa.wsa_fuel_typ)];
      return this.wsa.wsa_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }
    wsa_KPI_GHG(){
      return this.wsa_KPI_GHG_elec()+this.wsa_KPI_GHG_fuel();
    }
    wsa_KPI_ghg_estm_red(){
      return this.General.conv_kwh_co2*this.wsa_KPI_nrg_estm_sav();
    }
    wsa_KPI_std_nrg_newp(){
      return this.wsa_KPI_nrg_elec_eff()/
        this.wsa.wsa_pmp_exff*
        this.wsa_KPI_std_nrg_cons();
    }
    wsa_KPI_nrg_cons_new(){
      return this.wsa_KPI_nrg_elec_eff()/
        this.wsa.wsa_pmp_exff*
        this.wsa.wsa_nrg_pump;
    }
    wsa_KPI_nrg_estm_sav(){
      return this.wsa.wsa_nrg_cons - this.wsa_KPI_nrg_cons_new();
    }

  //  L2 WST WATER TREATMENT EQUATIONS
    wst_KPI_nrg_per_m3(){return this.wst.wst_nrg_cons/this.wst.wst_vol_trea}
    wst_KPI_slu_per_m3(){return this.wst.wst_mass_slu/this.wst.wst_vol_trea}
    wst_KPI_capac_util(){return 100*this.wst.wst_vol_trea/this.wst.wst_trea_cap}
    wst_KPI_tst_carr(){return this.wst.wst_tst_carr;}
    wst_KPI_std_nrg_cons(){return this.wst.wst_nrg_pump/(this.wst.wst_vol_pump*this.wst.wst_pmp_head/100)}
    wst_KPI_un_head_loss(){return 1e3*(this.wst.wst_pmp_head-this.wst.wst_sta_head)/this.wst.wst_coll_len}
    c_wst_pmp_pw(){return this.wst.wst_pmp_flow*this.wst.wst_pmp_head*Cts.ct_gravit.value/1000;}
    wst_KPI_nrg_elec_eff(){return 100*this.c_wst_pmp_pw()/(this.wst.wst_pmp_volt*this.wst.wst_pmp_amps*Math.sqrt(3)*this.wst.wst_pmp_pf/1000)}
    wst_KPI_std_nrg_newp(){return this.wst_KPI_nrg_elec_eff()/this.wst.wst_pmp_exff*this.wst_KPI_std_nrg_cons()}
    wst_KPI_nrg_cons_new(){return this.wst.wst_vol_pump*this.wst_KPI_std_nrg_newp()/100*this.wst.wst_pmp_head}
    wst_KPI_nrg_estm_sav(){return this.wst.wst_nrg_cons-this.wst_KPI_nrg_cons_new()}
    wst_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wst_KPI_nrg_estm_sav()}

    wst_KPI_GHG(){return this.wst_KPI_GHG_elec()+this.wst_KPI_GHG_fuel();}
    wst_KPI_GHG_elec(){return this.wst.wst_nrg_cons*this.General.conv_kwh_co2}
    wst_KPI_GHG_fuel(){return this.wst_KPI_GHG_fuel_co2()+this.wst_KPI_GHG_fuel_n2o()+this.wst_KPI_GHG_fuel_ch4();}
    wst_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst.wst_fuel_typ)];
      return this.wst.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wst_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst.wst_fuel_typ)];
      return this.wst.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wst_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wst_fuel_typ',this.wst.wst_fuel_typ)];
      return this.wst.wst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }

  //  L2 WSD WATER DISTRIBUTION EQUATIONS
    wsd_KPI_nrg_per_vd(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_vol_dist}
    wsd_KPI_nrg_per_m3(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_auth_con}
    wsd_SL_nr_water(){return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_bill_con)/this.wsd.wsd_vol_dist;}
    wsa_SL_GHG_nrw(){return (this.wsa_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wsa.wsa_vol_conv)}
    wst_SL_GHG_nrw(){return (this.wst_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wst.wst_vol_trea)}
    wsd_SL_GHG_nrw(){return (this.wsd_KPI_GHG() * (this.wsd.wsd_vol_dist - this.wsd.wsd_auth_con) / this.wsd.wsd_vol_dist)}
    wsd_SL_ghg_attr(){return this.wsa_SL_GHG_nrw()+this.wst_SL_GHG_nrw()+this.wsd_SL_GHG_nrw()}
    wsd_SL_water_loss(){return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/this.wsd.wsd_vol_dist;}
    c_wsd_pmp_pw(){return this.wsd.wsd_pmp_flow*this.wsd.wsd_pmp_head*Cts.ct_gravit.value/1000;}
    wsd_KPI_nrg_per_m3(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_auth_con}
    wsd_KPI_nrg_per_vd(){return this.wsd.wsd_nrg_cons/this.wsd.wsd_vol_dist}
    wsd_SL_nr_water(){
      return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_bill_con)/this.wsd.wsd_vol_dist;
    }
    wsd_SL_water_loss(){
      return 100*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/this.wsd.wsd_vol_dist;
    }
    wsd_SL_pres_ade(){return 100*this.wsd.wsd_deli_pts/this.wsd.wsd_ser_cons}
    wsd_SL_cont_sup(){return 100*this.wsd.wsd_time_pre/24}
    c_wsd_nrg_topo(){return Cts.ct_gravit.value*this.wsd.wsd_vol_dist*(this.wsd.wsd_hi_no_el-this.wsd.wsd_av_no_el)/3600000}
    c_wsd_nrg_natu(){return Cts.ct_gravit.value*this.wsd.wsd_vol_dist*(this.wsd.wsd_wt_el_no-this.wsd.wsd_lo_no_el)/3600000}
    c_wsd_nrg_mini(){return Cts.ct_gravit.value*this.wsd.wsd_auth_con*(this.wsd.wsd_min_pres+this.wsd.wsd_av_no_el-this.wsd.wsd_lo_no_el)/3600000}
    c_wsd_nrg_supp(){return this.wsd.wsd_nrg_cons+this.c_wsd_nrg_natu()}
    wsd_KPI_nrg_efficien(){return 100*this.c_wsd_nrg_mini()/this.c_wsd_nrg_supp()}
    wsd_KPI_nrg_topgraph(){return 100*this.c_wsd_nrg_topo()/this.c_wsd_nrg_supp()}
    wsd_KPI_std_nrg_cons(){return this.wsd.wsd_nrg_pump/(this.wsd.wsd_vol_pump*this.wsd.wsd_pmp_head/100)}
    wsd_KPI_un_head_loss(){return 1000*(this.wsd.wsd_pmp_head-this.wsd.wsd_sta_head)/this.wsd.wsd_main_len}
    wsd_KPI_water_losses(){return Math.max(0,1000*(this.wsd.wsd_vol_dist-this.wsd.wsd_auth_con)/(this.wsd.wsd_main_len))/this.Years()}
    wsd_KPI_nrg_elec_eff(){return 100*this.c_wsd_pmp_pw()/(this.wsd.wsd_pmp_volt*this.wsd.wsd_pmp_amps*Math.sqrt(3)*this.wsd.wsd_pmp_pf/1000)}

    wsd_KPI_std_nrg_newp(){return this.wsd_KPI_nrg_elec_eff()/this.wsd.wsd_pmp_exff*this.wsd_KPI_std_nrg_cons()}

    wsd_KPI_nrg_cons_new(){return this.wsd_KPI_nrg_elec_eff()/this.wsd.wsd_pmp_exff*this.wsd.wsd_nrg_pump}
    wsd_KPI_nrg_estm_sav(){return this.wsd.wsd_nrg_cons-this.wsd_KPI_nrg_cons_new()}
    wsd_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wsd_KPI_nrg_estm_sav()}

    //wsd GHG
    wsd_KPI_GHG_elec(){return this.wsd.wsd_nrg_cons*this.General.conv_kwh_co2}
    wsd_KPI_GHG_fuel(){
      return this.wsd_KPI_GHG_fuel_co2()+this.wsd_KPI_GHG_fuel_n2o()+this.wsd_KPI_GHG_fuel_ch4();
    }
    wsd_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd.wsd_fuel_typ)];
      return this.wsd.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wsd_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd.wsd_fuel_typ)];
      return this.wsd.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wsd_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_fuel_typ',this.wsd.wsd_fuel_typ)];
      return this.wsd.wsd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }
    wsd_KPI_GHG_trck(){
      return this.wsd_KPI_GHG_trck_co2()+this.wsd_KPI_GHG_trck_n2o()+this.wsd_KPI_GHG_trck_ch4();
    }
    wsd_KPI_GHG_trck_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd.wsd_trck_typ)];
      return this.wsd.wsd_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wsd_KPI_GHG_trck_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd.wsd_trck_typ)];
      return this.wsd.wsd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles;
    }
    wsd_KPI_GHG_trck_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wsd_trck_typ',this.wsd.wsd_trck_typ)];
      return this.wsd.wsd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles;
    }
    wsd_KPI_GHG(){
      return this.wsd_KPI_GHG_elec() + this.wsd_KPI_GHG_fuel() + this.wsd_KPI_GHG_trck();
    }

  //L1 WW WASTE EQUATIONS
    ww_conn_pop(){return this.wwc.wwc_conn_pop}
    ww_serv_pop(){return this.wwt.wwt_serv_pop}
    ww_uncl_pop(){return Math.max(0,this.Waste.ww_resi_pop-this.ww_conn_pop()-this.Faecl.fs_onsi_pop)}
    ww_untr_pop(){return Math.max(0,this.ww_conn_pop()-this.ww_serv_pop())}
    ww_SL_serv_pop(){return 100*this.ww_serv_pop()/this.Waste.ww_resi_pop}
    ww_SL_treat_m3(){return 100*this.ww_serv_pop()/this.ww_conn_pop()}
    ww_SL_nrg_cost(){return 100*this.Waste.ww_nrg_cost/this.Waste.ww_run_cost}
    ww_nrg_cons(){return this.wwc.wwc_nrg_cons+this.wwt.wwt_nrg_cons+this.wwd.wwd_nrg_cons}
    ww_vol_fuel(){return this.wwc.wwc_vol_fuel+this.wwt.wwt_vol_fuel+this.wwt.wwt_fuel_dig+this.wwd.wwd_vol_fuel}
    ww_KPI_GHG_unt_ch4(){return this.ww_untr_pop()*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_unt*Cts.ct_ch4_eq.value;}
    ww_KPI_GHG_unt_n2o(){return this.ww_untr_pop()*this.General.prot_con*this.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;}
    ww_KPI_GHG_unt(){return this.ww_KPI_GHG_unt_ch4()+this.ww_KPI_GHG_unt_n2o();}
    ww_SL_ghg_unc_ch4(){return this.ww_uncl_pop()*this.General.bod_pday/1000*this.Days()*this.wwc.ww_ch4_efac_unc*Cts.ct_ch4_eq.value;}
    ww_SL_ghg_unc_n2o(){return this.ww_uncl_pop()*this.General.prot_con*this.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;}
    ww_SL_ghg_unc(){return this.ww_SL_ghg_unc_ch4()+this.ww_SL_ghg_unc_n2o();}
    ww_GHG_avoided(){
      return this.wwt_SL_GHG_avoided()+
      this.wwt_wr_C_seq_slu()+
      this.wwd_wr_GHG_avo_d()+
      this.wwd_SL_ghg_non()+
      this.wwd_wr_GHG_avo()+
      this.fst_SL_GHG_avoided()+
      this.fsr_ghg_avoided_reuse()+
      this.fsr_ghg_avoided_land();
    }

    ww_KPI_GHG(){
      return this.wwc_KPI_GHG()+this.wwt_KPI_GHG()+this.wwd_KPI_GHG()+this.ww_KPI_GHG_unt();
    }

  //  L2 WWC WASTE COLLECTION EQUATIONS
    wwc_SL_conn_pop(){return 100*this.wwc.wwc_conn_pop/this.Waste.ww_resi_pop}
    wwc_KPI_nrg_per_m3(){return this.wwc.wwc_nrg_cons/this.wwc.wwc_vol_conv}
    c_wwc_vol_infl(){return this.wwc.wwc_rain_day/86400*(this.wwc.wwc_wet_flow-this.wwc.wwc_dry_flow)}
    wwc_SL_GHG_ii(){return this.wwc_KPI_nrg_per_m3()*this.c_wwc_vol_infl()*this.General.conv_kwh_co2}
    wwc_SL_fratio(){return this.wwc.wwc_wet_flow/this.wwc.wwc_dry_flow}
    wwc_SL_GHG_inf(){return this.wwc_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc.wwc_vol_conv}
    wwt_SL_GHG_inf(){return this.wwt_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc.wwc_vol_conv}
    wwd_SL_GHG_inf(){return this.wwd_KPI_GHG_elec() * this.c_wwc_vol_infl() / this.wwc.wwc_vol_conv}
    wwc_SL_inf_emis(){return this.wwc_SL_GHG_inf() + this.wwt_SL_GHG_inf() + this.wwd_SL_GHG_inf()}
    c_wwc_pmp_pw(){return this.wwc.wwc_pmp_flow*this.wwc.wwc_pmp_head*Cts.ct_gravit.value/1000;}
    wwc_KPI_std_nrg_cons(){return this.wwc.wwc_nrg_pump/(this.wwc.wwc_vol_pump*this.wwc.wwc_pmp_head/100)}
    wwc_KPI_un_head_loss(){return 1000*(this.wwc.wwc_pmp_head-this.wwc.wwc_sta_head)/this.wwc.wwc_coll_len}
    wwc_KPI_nrg_elec_eff(){return 100*this.c_wwc_pmp_pw()/(this.wwc.wwc_pmp_volt*this.wwc.wwc_pmp_amps*Math.sqrt(3)*this.wwc.wwc_pmp_pf/1000)}
    wwc_KPI_std_nrg_newp(){return this.wwc_KPI_nrg_elec_eff()/this.wwc.wwc_pmp_exff*this.wwc_KPI_std_nrg_cons()}
    wwc_KPI_nrg_cons_new(){return this.wwc.wwc_vol_pump*this.wwc_KPI_std_nrg_newp()/100*this.wwc.wwc_pmp_head}
    wwc_KPI_nrg_estm_sav(){return this.wwc.wwc_nrg_cons-this.wwc_KPI_nrg_cons_new()}
    wwc_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wwc_KPI_nrg_estm_sav()}

    //wwc Collection GHG emissions
    wwc_KPI_GHG(){return this.wwc_KPI_GHG_elec()+this.wwc_KPI_GHG_fuel()}
    wwc_KPI_GHG_elec(){
      return this.wwc.wwc_nrg_cons*this.General.conv_kwh_co2;
    }
    wwc_KPI_GHG_fuel(){
      return this.wwc_KPI_GHG_fuel_co2()
            +this.wwc_KPI_GHG_fuel_n2o()
            +this.wwc_KPI_GHG_fuel_ch4();
    }
    wwc_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc.wwc_fuel_typ)];
      return this.wwc.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wwc_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc.wwc_fuel_typ)];
      return this.wwc.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wwc_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwc_fuel_typ',this.wwc.wwc_fuel_typ)];
      return this.wwc.wwc_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }

  //  L2 WWT WASTE TREATMENT EQUATIONS
    c_wwt_bod_rmvd(){return this.wwt.wwt_bod_infl-this.wwt.wwt_bod_effl}
    wwt_KPI_nrg_per_m3(){return this.wwt.wwt_nrg_cons/this.wwt.wwt_vol_trea}
    wwt_KPI_nrg_per_kg(){return this.wwt.wwt_nrg_cons/this.c_wwt_bod_rmvd()}
    wwt_SL_vol_pday(){return 1000*this.wwt.wwt_vol_trea/this.wwt.wwt_serv_pop/this.Days()}
    wwt_KPI_capac_util(){return 100*this.wwt.wwt_vol_trea/this.wwt.wwt_trea_cap}
    wwt_SL_qual_com(){return 100*this.wwt.wwt_tst_cmpl/this.wwt.wwt_tst_cond}
    wwt_KPI_nrg_per_pump(){return this.wwt.wwt_nrg_pump/this.wwt.wwt_vol_pump}
    wwt_KPI_std_nrg_cons(){return this.wwt.wwt_nrg_pump/(this.wwt.wwt_vol_pump*this.wwt.wwt_pmp_head/100)}
    wwt_KPI_un_head_loss(){return 1000*(this.wwt.wwt_pmp_head-this.wwt.wwt_sta_head)/this.wwt.wwt_coll_len}
    c_wwt_pmp_pw(){return this.wwt.wwt_pmp_flow*this.wwt.wwt_pmp_head*Cts.ct_gravit.value/1000;}
    wwt_KPI_nrg_elec_eff(){return 100*this.c_wwt_pmp_pw()/(this.wwt.wwt_pmp_volt*this.wwt.wwt_pmp_amps*Math.sqrt(3)*this.wwt.wwt_pmp_pf/1000)}
    wwt_KPI_std_nrg_newp(){return this.wwt_KPI_nrg_elec_eff()/this.wwt.wwt_pmp_exff*this.wwt_KPI_std_nrg_cons()}
    wwt_KPI_nrg_cons_new(){return this.wwt.wwt_vol_pump*this.wwt_KPI_std_nrg_newp()/100*this.wwt.wwt_pmp_head}
    wwt_KPI_nrg_estm_sav(){return this.wwt.wwt_nrg_cons-this.wwt_KPI_nrg_cons_new()}
    wwt_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wwt_KPI_nrg_estm_sav()}
    wwt_KPI_biog_x_bod(){return this.wwt.wwt_biog_pro/this.c_wwt_bod_rmvd()}
    c_wwt_nrg_biog(){return this.wwt.wwt_biog_val*this.wwt.wwt_ch4_biog/100*Cts.ct_ch4_nrg.value}
    wwt_KPI_nrg_biogas(){return this.wwt.wwt_nrg_biog/this.wwt.wwt_vol_trea}
    wwt_KPI_nrg_x_biog(){return 100*this.wwt.wwt_nrg_biog/this.c_wwt_nrg_biog()}
    wwt_SL_GHG_avoided(){return this.wwt.wwt_nrg_biog*this.General.conv_kwh_co2}

    //sludge
    wwt_KPI_sludg_prod(){return this.wwt.wwt_mass_slu/this.wwt.wwt_vol_trea}
    wwt_KPI_dry_sludge(){return 100*this.wwt.wwt_dryw_slu/this.wwt.wwt_mass_slu}
    wwt_wr_C_seq_slu(){
      return this.wwt_slu_comp_C_seq()+
      this.wwt_slu_app_C_seq()+
      this.wwt_slu_land_C_seq();
    }
    c_wwt_ch4_pot(){
      let sludge_type=Tables.find('wwt_slu_disp',this.wwt.wwt_slu_disp);
      if(sludge_type=="Non-digested"){
        return this.wwt.wwt_mass_slu_sto*0.53*Cts.ct_vs_slu.value*Cts.ct_oc_vs.value*(4/3);
      }else if(sludge_type=="Digested"){
        return this.wwt.wwt_mass_slu_sto*0.06*Cts.ct_vs_dig.value*Cts.ct_oc_vs.value*(4/3);
      }else{
        return 0;
      }
    }
    wwt_slu_storage_ch4(){
      let f=0;
      if(5 < this.wwt.wwt_time_slu_sto && this.wwt.wwt_time_slu_sto < 20) {
        f=0.03
      }
      else if(this.wwt.wwt_time_slu_sto >= 20) {
        f=0.05
      }
      return f*this.c_wwt_ch4_pot()*Cts.ct_ch4_eq.value;
    }
    wwt_KPI_ghg_sto_co2eq(){return this.wwt_slu_storage_ch4()}
    wwt_slu_composting_ch4(){
      let sludge_type=Tables.find('wwt_slu_disp',this.wwt.wwt_slu_disp);
      if(sludge_type=="Non-digested"){
        return this.wwt.wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_slu.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value
      } else if(sludge_type=="Digested"){
        return this.wwt.wwt_mass_slu_comp*Cts.ct_oc_vs.value*Cts.ct_vs_dig.value*Cts.ct_ch4_up.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_eq.value
      } else { return 0 }
    }
    wwt_slu_composting_n2o(){return this.wwt.wwt_mass_slu_comp*0.03*0.015*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value}
    wwt_KPI_ghg_comp_co2eq(){return this.wwt_slu_composting_ch4()+this.wwt_slu_composting_n2o()}
    wwt_slu_inciner_ch4(){return (4.85/1e5)*this.wwt.wwt_mass_slu_inc*Cts.ct_ch4_eq.value}
    wwt_slu_inciner_n2o(){
      if(this.wwt.wwt_temp_inc > 1152){
        return 0
      }
      else{
        return 0.03*this.wwt.wwt_mass_slu_inc*(161.3-0.14*Math.max(1023,this.wwt.wwt_temp_inc))*0.01*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value
      }
    }
    wwt_KPI_ghg_inc_co2eq(){return this.wwt_slu_inciner_ch4()+this.wwt_slu_inciner_n2o()}
    wwt_slu_landapp_n2o(){
      let sludge_type=Tables.find('wwt_slu_disp',this.wwt.wwt_slu_disp);
      let soil_type=Tables.find('wwt_soil_typ',this.wwt.wwt_soil_typ);
      let ratio_CN=this.content_C(this.wwt.wwt_mass_slu_app,sludge_type)/this.content_N(this.wwt.wwt_mass_slu_app,sludge_type)||0;
      if(ratio_CN>=30){return 0;}
      if(soil_type=="Fine-Textured (>30% clay)"  ){return this.wwt.wwt_mass_slu_app*this.wwt.wwt_slu_la_N_cont/100*0.023*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value}
      if(soil_type=="Coarse-Textured (<30% clay)"){return this.wwt.wwt_mass_slu_app*this.wwt.wwt_slu_la_N_cont/100*0.005*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value}
    }
    wwt_KPI_ghg_app_co2eq(){return this.wwt_slu_landapp_n2o()}
    wwt_slu_landfill_ch4(){
      return this.wwt.wwt_mass_slu_land*Cts.ct_oc_vs.value*this.wwt.wwt_slu_lf_TVS/100*Cts.ct_lf_unc.value*Cts.ct_ch4_oc.value*Cts.ct_ch4_lf.value/100*Cts.ct_DOCfra.value/100*Cts.ct_d3y_lf.value/100*Cts.ct_ch4_eq.value;
    }
    wwt_slu_landfill_n2o(){
      let sludge_type=Tables.find('wwt_slu_disp',this.wwt.wwt_slu_disp);
      let ratio_CN=this.content_C(this.wwt.wwt_mass_slu_land,sludge_type)/this.content_N(this.wwt.wwt_mass_slu_land,sludge_type)||0;
      if(ratio_CN>30){
        return 0;
      }else{
        return this.wwt.wwt_mass_slu_land*this.wwt.wwt_slu_lf_N_cont/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
      }
    }
    wwt_KPI_ghg_land_co2eq(){
      let sludge_type=Tables.find('wwt_slu_type',this.wwt.wwt_slu_type)
      if(sludge_type=="Landfill"){
        return this.wwt_slu_landfill_ch4()+this.wwt_slu_landfill_n2o()
      }
      if(sludge_type=="Landfill (flaring)"){
        return 0.02*(this.wwt_slu_landfill_ch4()+this.wwt_slu_landfill_n2o())
      }
      if(sludge_type=="Landfill (with gas recovery)")
      {return 0}
    }
    wwt_KPI_ghg_stock_co2eq(){return this.wwt.wwt_mass_slu_stock*90.3/1000}

    //wwt ghg emissions
    wwt_KPI_GHG_elec(){return this.wwt.wwt_nrg_cons*this.General.conv_kwh_co2}

    wwt_KPI_GHG_fuel(){
      return this.wwt_KPI_GHG_fuel_co2()+this.wwt_KPI_GHG_fuel_n2o()+this.wwt_KPI_GHG_fuel_ch4();
    }
    wwt_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt.wwt_fuel_typ)];
      return this.wwt.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wwt_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt.wwt_fuel_typ)];
      return this.wwt.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wwt_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_fuel_typ',this.wwt.wwt_fuel_typ)];
      return this.wwt.wwt_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }

    wwt_KPI_GHG_tre_ch4(){
      return (
        this.wwt.wwt_bod_infl
       -this.wwt.wwt_bod_slud
       -this.wwt.wwt_bod_effl
      )*this.wwt.wwt_ch4_efac
      *Cts.ct_ch4_eq.value;
    }
    wwt_KPI_GHG_tre_n2o(){
      if(this.Configuration.ActiveStages.wasteTre){
        return this.wwt.wwt_serv_pop
          *Cts.ct_fac_ic.value
          *Cts.ct_n2o_efp.value
          *this.Years()
          *1e-3
          *Cts.ct_n2o_eq.value
          +this.wwt.wwt_GHG_tre_n2o;
      }else{
        return 0;
      }
    }
    wwt_KPI_GHG_tre(){
      return this.wwt_KPI_GHG_tre_ch4()+this.wwt_KPI_GHG_tre_n2o()
    }


    wwt_KPI_GHG_dig_fuel(){
      return this.wwt_KPI_GHG_dig_fuel_co2()
            +this.wwt_KPI_GHG_dig_fuel_n2o()
            +this.wwt_KPI_GHG_dig_fuel_ch4();
    }
    wwt_KPI_GHG_dig_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt.wwt_dige_typ)];
      return this.wwt.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*fuel.EFCO2
    }
    wwt_KPI_GHG_dig_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt.wwt_dige_typ)];
      return this.wwt.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.engines
    }
    wwt_KPI_GHG_dig_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_dige_typ',this.wwt.wwt_dige_typ)];
      return this.wwt.wwt_fuel_dig*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.engines
    }

    wwt_KPI_GHG_biog(){
      return (
         this.wwt.wwt_biog_pro
        -this.wwt.wwt_biog_val
        -this.wwt.wwt_biog_fla
        +this.wwt.wwt_biog_fla*Cts.ct_ch4_lo.value/100
      )*this.wwt.wwt_ch4_biog/100
      *Cts.ct_ch4_m3.value
      *Cts.ct_ch4_eq.value;
    }

    wwt_KPI_GHG_slu(){
      return this.wwt_KPI_ghg_sto_co2eq()+
        this.wwt_KPI_ghg_comp_co2eq()+
        this.wwt_KPI_ghg_inc_co2eq()+
        this.wwt_KPI_ghg_app_co2eq()+
        this.wwt_KPI_ghg_land_co2eq()+
        this.wwt_KPI_ghg_stock_co2eq()+
        this.wwt_KPI_ghg_tsludge();
    }

    wwt_slu_comp_C_seq(){ return this.wwt.wwt_mass_slu_comp*Cts.ct_C_seqst.value; }
    wwt_slu_app_C_seq(){  return this.wwt.wwt_mass_slu_app*Cts.ct_C_seqst.value; }
    wwt_slu_land_C_seq(){
      let sludge_type=Tables.find('wwt_slu_disp',this.wwt.wwt_slu_disp);
      let VS = (sludge_type=="Digested")? 0.51:0.70;
      return this.wwt.wwt_mass_slu_land*(VS)*(0.56)*(0.2)*(44/12);
    }

    wwt_KPI_ghg_tsludge(){
      return this.wwt_KPI_ghg_tsludge_co2()
            +this.wwt_KPI_ghg_tsludge_n2o()
            +this.wwt_KPI_ghg_tsludge_ch4();
    }
    wwt_KPI_ghg_tsludge_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt.wwt_trck_typ)];
      return this.wwt.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wwt_KPI_ghg_tsludge_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt.wwt_trck_typ)];
      return this.wwt.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
    }
    wwt_KPI_ghg_tsludge_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwt_trck_typ',this.wwt.wwt_trck_typ)];
      return this.wwt.wwt_vol_tslu*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
    }

    wwt_KPI_GHG(){
      return this.wwt_KPI_GHG_elec()
            +this.wwt_KPI_GHG_fuel()
            +this.wwt_KPI_GHG_tre()
            +this.wwt_KPI_GHG_dig_fuel()
            +this.wwt_KPI_GHG_biog()
            +this.wwt_KPI_GHG_slu();
    }

  //  L2 WWD WASTE DISCHARGE EQUATIONS
    wwd_wr_GHG_avo_N(){ return this.wwd.wwd_wr_N_rec*Cts.ct_cr_forN.value; }
    wwd_wr_GHG_avo_P(){ return this.wwd.wwd_wr_P_rec*Cts.ct_cr_forP.value; }
    wwd_wr_GHG_avo(){ return this.wwd_wr_GHG_avo_N() + this.wwd_wr_GHG_avo_P(); }
    wwd_wr_nrg_sav(){
      return this.wwd.wwd_wr_vol_d*(
         this.wsa_nrg_per_abs_watr()
        +this.wst_KPI_nrg_per_m3()
        +this.wsd_KPI_nrg_per_vd()
      ) - this.wwd.wwd_wr_adnrg;
    }
    wwd_wr_GHG_avo_d(){
      return this.wwd_wr_nrg_sav()*this.General.conv_kwh_co2;
    }
    wwd_KPI_nrg_per_m3(){return this.wwd.wwd_nrg_cons/this.wwd.wwd_vol_disc||0}
    wwd_SL_ghg_non(){return this.wwd.wwd_n2o_effl/1000*this.wwd.wwd_vol_nonp*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value}
    wwd_KPI_std_nrg_cons(){return this.wwd_nrg_pump/(this.wwd_vol_pump*this.wwd_pmp_head/100)}
    wwd_KPI_un_head_loss(){return 1000*(this.wwd.wwd_pmp_head-this.wwd.wwd_sta_head)/this.wwd.wwd_coll_len}
    c_wwd_pmp_pw(){return this.wwd.wwd_pmp_flow*this.wwd.wwd_pmp_head*Cts.ct_gravit.value/1000;}
    wwd_KPI_nrg_elec_eff(){return 100*this.c_wwd_pmp_pw()/(this.wwd.wwd_pmp_volt*this.wwd.wwd_pmp_amps*Math.sqrt(3)*this.wwd.wwd_pmp_pf/1000)}
    wwd_KPI_std_nrg_newp(){return this.wwd_KPI_nrg_elec_eff()/this.wwd.wwd_pmp_exff*this.wwd_KPI_std_nrg_cons()}
    wwd_KPI_nrg_cons_new(){return this.wwd.wwd_vol_pump*this.wwd_KPI_std_nrg_newp()/100*this.wwd.wwd_pmp_head}
    wwd_KPI_nrg_estm_sav(){return this.wwd.wwd_nrg_cons-this.wwd_KPI_nrg_cons_new()}
    wwd_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.wwd_KPI_nrg_estm_sav()}

    wwd_KPI_GHG_elec(){return this.wwd.wwd_nrg_cons*this.General.conv_kwh_co2}
    wwd_KPI_GHG_fuel(){
      return this.wwd_KPI_GHG_fuel_co2()+this.wwd_KPI_GHG_fuel_n2o()+this.wwd_KPI_GHG_fuel_ch4();
    }
    wwd_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd.wwd_fuel_typ)];
      return this.wwd.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wwd_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd.wwd_fuel_typ)];
      return this.wwd.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    wwd_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_fuel_typ',this.wwd.wwd_fuel_typ)];
      return this.wwd.wwd_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }
    wwd_KPI_GHG_trck(){
      return this.wwd_KPI_GHG_trck_co2()+this.wwd_KPI_GHG_trck_n2o()+this.wwd_KPI_GHG_trck_ch4();
    }
    wwd_KPI_GHG_trck_co2(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd.wwd_trck_typ)];
      return this.wwd.wwd_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    wwd_KPI_GHG_trck_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd.wwd_trck_typ)];
      return this.wwd.wwd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles;
    }
    wwd_KPI_GHG_trck_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('wwd_trck_typ',this.wwd.wwd_trck_typ)];
      return this.wwd.wwd_vol_trck*fuel.FD*fuel.NCV/1000*Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles;
    }
    wwd_KPI_GHG_tre_n2o(){
      return this.wwd.wwd_n2o_effl/1000*this.wwd.wwd_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
    }
    wwd_KPI_GHG_tre_ch4(){
      return this.wwd.wwd_bod_effl*this.wwd.wwd_ch4_efac*Cts.ct_ch4_eq.value;
    }
    wwd_KPI_GHG_tre(){
      return this.wwd_KPI_GHG_tre_ch4()+this.wwd_KPI_GHG_tre_n2o();
    }
    wwd_total_m3(){
      return this.wwd.wwd_vol_disc+this.wwd.wwd_vol_nonp;
    }
    wwd_KPI_GHG(){
      return this.wwd_KPI_GHG_elec()
            +this.wwd_KPI_GHG_fuel()
            +this.wwd_KPI_GHG_trck()
            +this.wwd_KPI_GHG_tre();
    }

  //L1 FS FAECL EQUATIONS
    fs_serv_pop(){
      return this.Faecl.fs_onsi_pop;
    }
    fs_nrg_cons(){
      return this.fsc.fsc_nrg_cons+this.fst.fst_nrg_cons+this.fsr.fsr_nrg_cons;
    }
    fs_vol_trck(){
      return this.fsc.fsc_vol_trck+this.fst.fst_vol_trck+this.fsr.fsr_vol_trck;
    }
    fs_SL_serv_pop(){return 100*this.Faecl.fs_onsi_pop/this.Faecl.fs_resi_pop}
    fs_KPI_GHG(){
      return this.fsc_KPI_GHG()
            +this.fst_KPI_GHG()
            +this.fsr_KPI_GHG();
    }

  //  L2 FSC FAECL CONTAINMENT EQUATIONS
    fsc_KPI_GHG(){
      return this.fsc_KPI_GHG_elec()
            +this.fsc_KPI_GHG_cont()
            +this.fsc_KPI_GHG_trck();
    }
    fsc_KPI_GHG_elec(){
      return this.fsc.fsc_nrg_cons*this.General.conv_kwh_co2;
    }
    fsc_KPI_GHG_cont(){
      return (this.fsc.fsc_bod_infl-this.fsc.fsc_bod_rmvd)*this.fsc.fsc_ch4_efac*Cts.ct_ch4_eq.value;
    }
    fsc_KPI_GHG_trck_co2(){
      let fuel=Tables['Fuel types'][Tables.find('fsc_trck_typ',this.fsc.fsc_trck_typ)];
      return this.fsc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    fsc_KPI_GHG_trck_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('fsc_trck_typ',this.fsc.fsc_trck_typ)];
      return this.fsc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
    }
    fsc_KPI_GHG_trck_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('fsc_trck_typ',this.fsc.fsc_trck_typ)];
      return this.fsc.fsc_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
    }
    fsc_KPI_GHG_trck(){return this.fsc_KPI_GHG_trck_co2()+this.fsc_KPI_GHG_trck_n2o()+this.fsc_KPI_GHG_trck_ch4()}
    fsc_KPI_std_nrg_cons(){return this.fsc.fsc_nrg_pump/(this.fsc.fsc_vol_pump*this.fsc.fsc_pmp_head/100)}
    fsc_KPI_un_head_loss(){return 1000*(this.fsc.fsc_pmp_head-this.fsc.fsc_sta_head)/this.fsc.fsc_coll_len}
    c_fsc_pmp_pw(){return this.fsc.fsc_pmp_flow*this.fsc.fsc_pmp_head*Cts.ct_gravit.value/1000;}
    fsc_KPI_nrg_elec_eff(){return 100*this.c_fsc_pmp_pw()/(this.fsc.fsc_pmp_volt*this.fsc.fsc_pmp_amps*Math.sqrt(3)*this.fsc.fsc_pmp_pf/1000)}
    fsc_KPI_std_nrg_newp(){return this.fsc_KPI_nrg_elec_eff()/this.fsc.fsc_pmp_exff*this.fsc_KPI_std_nrg_cons()}
    fsc_KPI_nrg_cons_new(){return this.fsc.fsc_vol_pump*this.fsc_KPI_std_nrg_newp()/100*this.fsc.fsc_pmp_head}
    fsc_KPI_nrg_estm_sav(){return this.fsc.fsc_nrg_cons-this.fsc_KPI_nrg_cons_new()}
    fsc_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fsc_KPI_nrg_estm_sav()}

  //  L2 FST FAECL TREATMENT EQUATIONS
    fst_KPI_GHG_elec(){return this.fst.fst_nrg_cons*this.General.conv_kwh_co2}
    fst_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('fst_fuel_typ',this.fst.fst_fuel_typ)];
      return this.fst.fst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    fst_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('fst_fuel_typ',this.fst.fst_fuel_typ)];
      return this.fst.fst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    fst_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('fst_fuel_typ',this.fst.fst_fuel_typ)];
      return this.fst.fst_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }
    fst_KPI_GHG_fuel(){return this.fst_KPI_GHG_fuel_co2()+this.fst_KPI_GHG_fuel_n2o()+this.fst_KPI_GHG_fuel_ch4()}
    fst_KPI_GHG_trck_co2(){
      let fuel=Tables['Fuel types'][Tables.find('fst_trck_typ',this.fst.fst_trck_typ)];
      return this.fst.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    fst_KPI_GHG_trck_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('fst_trck_typ',this.fst.fst_trck_typ)];
      return this.fst.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
    }
    fst_KPI_GHG_trck_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('fst_trck_typ',this.fst.fst_trck_typ)];
      return this.fst.fst_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
    }
    fst_KPI_GHG_trck(){return this.fst_KPI_GHG_trck_co2()+this.fst_KPI_GHG_trck_n2o()+this.fst_KPI_GHG_trck_ch4()}
    fst_KPI_GHG_biog(){
      return (this.fst.fst_biog_pro-this.fst.fst_biog_val-this.fst.fst_biog_fla+this.fst.fst_biog_fla*Cts.ct_ch4_lo.value/100)*this.fst.fst_ch4_biog/100*Cts.ct_ch4_m3.value*Cts.ct_ch4_eq.value;
    }
    fst_SL_GHG_avoided(){
      return this.fst.fst_nrg_biog*this.General.conv_kwh_co2;
    }
    fst_KPI_GHG_tre_ch4(){
      return (this.fst.fst_bod_infl-this.fst.fst_bod_slud-this.fst.fst_bod_effl)*this.fst.fst_ch4_efac*Cts.ct_ch4_eq.value;
    }
    fst_KPI_GHG_tre_n2o(){
      return 0; //to be defined (TBD)
    }
    fst_KPI_GHG_tre(){
      return this.fst_KPI_GHG_tre_ch4()+this.fst_KPI_GHG_tre_n2o();
    }
    fst_KPI_std_nrg_cons(){return this.fst.fst_nrg_pump/(this.fst.fst_vol_pump*this.fst.fst_pmp_head/100)}
    fst_KPI_un_head_loss(){return 1000*(this.fst.fst_pmp_head-this.fst.fst_sta_head)/this.fst.fst_coll_len}
    c_fst_pmp_pw(){return this.fst.fst_pmp_flow*this.fst.fst_pmp_head*Cts.ct_gravit.value/1000;}
    fst_KPI_nrg_elec_eff(){return 100*this.c_fst_pmp_pw()/(this.fst.fst_pmp_volt*this.fst.fst_pmp_amps*Math.sqrt(3)*this.fst_pmp_pf/1000)}
    fst_KPI_std_nrg_newp(){return this.fst_KPI_nrg_elec_eff()/this.fst.fst_pmp_exff*this.fst_KPI_std_nrg_cons()}
    fst_KPI_nrg_cons_new(){return this.fst.fst_vol_pump*this.fst_KPI_std_nrg_newp()/100*this.fst.fst_pmp_head}
    fst_KPI_nrg_estm_sav(){return this.fst.fst_nrg_cons-this.fst_KPI_nrg_cons_new()}
    fst_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fst_KPI_nrg_estm_sav()}
    fst_KPI_GHG(){
      return this.fst_KPI_GHG_elec()
            +this.fst_KPI_GHG_trck()
            +this.fst_KPI_GHG_biog()
            +this.fst_KPI_GHG_fuel()
            +this.fst_KPI_GHG_tre();
    }

  //  L2 FSR FAECL REUSE EQUATIONS
    fsr_KPI_GHG(){
      return this.fsr_KPI_GHG_elec()
            +this.fsr_KPI_GHG_fuel()
            +this.fsr_KPI_GHG_trck()
            +this.fsr_KPI_GHG_landapp()
            +this.fsr_KPI_GHG_landfil()
            +this.fsr_KPI_GHG_dumping()
            +this.fsr_KPI_GHG_tre()
            +this.fsr_KPI_GHG_urine();
    }
    fsr_KPI_GHG_elec(){return this.fsr.fsr_nrg_cons*this.General.conv_kwh_co2}
    fsr_KPI_GHG_fuel_co2(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_fuel_typ',this.fsr.fsr_fuel_typ)];
      return this.fsr.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    fsr_KPI_GHG_fuel_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_fuel_typ',this.fsr.fsr_fuel_typ)];
      return this.fsr.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFN2O.engines*Cts.ct_n2o_eq.value;
    }
    fsr_KPI_GHG_fuel_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_fuel_typ',this.fsr.fsr_fuel_typ)];
      return this.fsr.fsr_vol_fuel*fuel.FD*fuel.NCV/1000*fuel.EFCH4.engines*Cts.ct_ch4_eq.value;
    }
    fsr_KPI_GHG_fuel(){return this.fsr_KPI_GHG_fuel_co2()+this.fsr_KPI_GHG_fuel_n2o()+this.fsr_KPI_GHG_fuel_ch4()}
    fsr_KPI_GHG_trck_co2(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_trck_typ',this.fsr.fsr_trck_typ)];
      return this.fsr.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCO2;
    }
    fsr_KPI_GHG_trck_n2o(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_trck_typ',this.fsr.fsr_trck_typ)];
      return this.fsr.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFN2O.vehicles*Cts.ct_n2o_eq.value;
    }
    fsr_KPI_GHG_trck_ch4(){
      let fuel=Tables['Fuel types'][Tables.find('fsr_trck_typ',this.fsr.fsr_trck_typ)];
      return this.fsr.fsr_vol_trck*fuel.FD*fuel.NCV/1000*fuel.EFCH4.vehicles*Cts.ct_ch4_eq.value;
    }
    fsr_KPI_GHG_trck(){return this.fsr_KPI_GHG_trck_co2()+this.fsr_KPI_GHG_trck_n2o()+this.fsr_KPI_GHG_trck_ch4()}
    fsr_KPI_GHG_landapp(){
      let soil_type=Tables.find('fsr_soil_typ',this.fsr.fsr_soil_typ);
      let N_transformed_to_N2O=0;
      if(soil_type=="Fine-Textured (>30% clay)"  ) N_transformed_to_N2O=0.023;
      if(soil_type=="Coarse-Textured (<30% clay)") N_transformed_to_N2O=0.050;
      return this.fsr.fsr_mass_landapp*this.fsr.fsr_la_N_cont/100*N_transformed_to_N2O*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
    }
    fsr_ghg_avoided_landapp(){return this.fsr.fsr_mass_landapp*Cts.ct_C_seqst.value}
    fsr_KPI_GHG_landfil_n2o(){
      let disp_type=Tables.find('fsr_disp_typ',this.fsr.fsr_disp_typ);
      let emission=this.fsr.fsr_mass_landfil*this.fsr.fsr_lf_N_cont/100*Cts.ct_n2o_lf.value/100*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value
      if(disp_type=="Landfill"){
        return emission;
      }
      if(disp_type=="Landfill (flaring)"){
        return 0.02*emission;
      }
      if(disp_type=="Landfill (with gas recovery)"){
        return 0;
      }
    }
    fsr_KPI_GHG_landfil_ch4(){
      let emission=this.fsr.fsr_mass_landfil*this.fsr.fsr_lf_TVS/100*Cts.ct_oc_vs.value*Cts.ct_DOCfra.value/100*Cts.ct_lf_unc.value*Cts.ct_ch4_C.value*Cts.ct_ch4_lf.value/100*Cts.ct_d3y_lf.value/100* Cts.ct_ch4_eq.value;
      let disp_type=Tables.find('fsr_disp_typ',this.fsr.fsr_disp_typ);
      if(disp_type=="Landfill"){
        return emission;
      }
      if(disp_type=="Landfill (flaring)"){
        return 0.02*emission;
      }
      if(disp_type=="Landfill (with gas recovery)"){
        return 0;
      }
    }
    fsr_KPI_GHG_landfil(){
      return this.fsr_KPI_GHG_landfil_n2o()+this.fsr_KPI_GHG_landfil_ch4();
    }
    fsr_ghg_avoided_landfil(){
      let fslu_type=Tables.find('fsr_fslu_typ_lf',this.fsr.fsr_fslu_typ_lf);
      let TVS=Tables.fsr_fslu_typ_lf[fslu_type].TVS;
      return this.fsr.fsr_mass_landfil*TVS*Cts.ct_oc_vs.value*Cts.ct_u_org_f.value*Cts.ct_co2_C.value;
    }
    fsr_KPI_GHG_dumping_n2o(){
      return this.fsr.fsr_vol_dumping*this.fsr.fsr_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value;
    }
    fsr_KPI_GHG_dumping_ch4(){
      return this.fsr.fsr_vol_dumping*this.fsr.fsr_bod_conc_fs*this.fsr.fsr_ch4_efac_dumping*Cts.ct_ch4_eq.value;
    }
    fsr_KPI_GHG_dumping(){
      return this.fsr_KPI_GHG_dumping_n2o()+this.fsr_KPI_GHG_dumping_ch4();
    }
    fsr_KPI_GHG_tre_n2o(){
      return this.fsr.fsr_n2o_effl/1000*this.fsr.fsr_vol_disc*Cts.ct_n2o_eq.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value;
    }
    fsr_KPI_GHG_tre_ch4(){
      return this.fsr.fsr_bod_effl*this.fsr.fsr_ch4_efac*Cts.ct_ch4_eq.value;
    }
    fsr_KPI_GHG_tre(){
      return this.fsr_KPI_GHG_tre_ch4()+this.fsr_KPI_GHG_tre_n2o();
    }
    fsr_KPI_GHG_urine(){return this.fsr.fsr_N_urine*Cts.ct_n2o_co.value*0.01}

    fsr_ghg_avoided_reuse_N(){return this.fsr.fsr_reused_N*Cts.ct_cr_forN.value}
    fsr_ghg_avoided_reuse_P(){return this.fsr.fsr_reused_P*Cts.ct_cr_forP.value}
    fsr_ghg_avoided_reuse(){return this.fsr_ghg_avoided_reuse_N()+this.fsr_ghg_avoided_reuse_P();}
    fsr_KPI_std_nrg_cons(){return this.fsr.fsr_nrg_pump/(this.fsr.fsr_vol_pump*this.fsr.fsr_pmp_head/100)}
    fsr_KPI_un_head_loss(){return 1000*(this.fsr.fsr_pmp_head-this.fsr.fsr_sta_head)/this.fsr.fsr_coll_len}
    c_fsr_pmp_pw(){return this.fsr.fsr_pmp_flow*this.fsr.fsr_pmp_head*Cts.ct_gravit.value/1000;}
    fsr_KPI_nrg_elec_eff(){return 100*this.c_fsr_pmp_pw()/(this.fsr.fsr_pmp_volt*this.fsr.fsr_pmp_amps*Math.sqrt(3)*this.fsr.fsr_pmp_pf/1000)}
    fsr_KPI_std_nrg_newp(){return this.fsr_KPI_nrg_elec_eff()/this.fsr.fsr_pmp_exff*this.fsr_KPI_std_nrg_cons()}
    fsr_KPI_nrg_cons_new(){return this.fsr.fsr_vol_pump*this.fsr_KPI_std_nrg_newp()/100*this.fsr.fsr_pmp_head}
    fsr_KPI_nrg_estm_sav(){return this.fsr.fsr_nrg_cons-this.fsr_KPI_nrg_cons_new()}
    fsr_KPI_ghg_estm_red(){return this.General.conv_kwh_co2*this.fsr_KPI_nrg_estm_sav()}
    fsr_ghg_avoided_land(){
      return this.fsr_ghg_avoided_landapp()
            +this.fsr_ghg_avoided_landfil();
    }
};

//create array of systems (TODO: rename Scenarios to Systems)
let Scenarios=[];

//default system
let Global=new Ecam();
Scenarios.push(Global);
