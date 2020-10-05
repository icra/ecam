/*
  Default values for v3 development (backend and frontend)
*/

//FRONTEND ELEMENTS
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;
tier_b.level        = "Waste";
tier_b.sublevel     = "Onsite";
ecam.show('tier_b');

//BACKEND ELEMENTS
//answer yes to all questions
Object.keys(Questions).forEach(key=>{Global.Configuration.Questions[key]=1});

//general
  Global.General.conv_kwh_co2 = 0.7; //conversion factor for grid electricity (kgCO2/kWh)
  Global.General.prot_con     = 22;  //prot consumption                       (kg/person/year)
  Global.General.bod_pday     = 37;  //BOD5                                   (g/person/day)
  Global.General.bod_pday_fs  = 37;  //BOD5 in faecal sludge                  (g/person/day)
//ws
  Global.Water.ws_resi_pop = 1000;
  Global.Water.ws_nrg_cost =    1;
  Global.Water.ws_run_cost =    5;
//wsa
  Global.Water.Abstraction.wsa_vol_conv =  500;
  Global.Water.Abstraction.wsa_nrg_cons = 1000;
  Global.Water.Abstraction.wsa_fuel_typ =    0;
  Global.Water.Abstraction.wsa_vol_fuel = 9e-2;
  Global.Water.Abstraction.wsa_nrg_pump =  700;
  Global.Water.Abstraction.wsa_vol_pump =  400;
  Global.Water.Abstraction.wsa_pmp_head =   30;
  Global.Water.Abstraction.wsa_sta_head =    1;
  Global.Water.Abstraction.wsa_main_len =  1e3;
  Global.Water.Abstraction.wsa_pmp_flow = 5e-3;
  Global.Water.Abstraction.wsa_pmp_volt =  220;
  Global.Water.Abstraction.wsa_pmp_amps =   12;
  Global.Water.Abstraction.wsa_pmp_pf   =  0.9;
  Global.Water.Abstraction.wsa_pmp_exff =   99;
//wst
  Global.Water.Treatment.wst_vol_trea    =    450;
  Global.Water.Treatment.wst_nrg_cons    =   1000;
  Global.Water.Treatment.wst_mass_slu    =   1000;
  Global.Water.Treatment.wst_fuel_typ    =      0;
  Global.Water.Treatment.wst_vol_fuel    =  33e-3;
  Global.Water.Treatment.wst_tst_carr    =     50;
  Global.Water.Treatment.wst_trea_cap    =    5e3;
  Global.Water.Treatment.wst_nrg_pump    =    700;
  Global.Water.Treatment.wst_vol_pump    =    400;
  Global.Water.Treatment.wst_pmp_head    =     30;
  Global.Water.Treatment.wst_sta_head    =      1;
  Global.Water.Treatment.wst_coll_len    =    1e3;
  Global.Water.Treatment.wst_pmp_flow    =   5e-3;
  Global.Water.Treatment.wst_pmp_volt    =    220;
  Global.Water.Treatment.wst_pmp_amps    =     12;
  Global.Water.Treatment.wst_pmp_pf      =    0.9;
  Global.Water.Treatment.wst_pmp_exff    =     99;
//wsd
  Global.Water.Distribution.wsd_serv_pop =    900;
  Global.Water.Distribution.wsd_vol_dist =    400;
  Global.Water.Distribution.wsd_nrg_cons =   1000;
  Global.Water.Distribution.wsd_vol_fuel =  33e-3;
  Global.Water.Distribution.wsd_vol_trck =  33e-3;
  Global.Water.Distribution.wsd_auth_con =    350;
  Global.Water.Distribution.wsd_bill_con =    340;
  Global.Water.Distribution.wsd_deli_pts =    300;
  Global.Water.Distribution.wsd_ser_cons =    500;
  Global.Water.Distribution.wsd_time_pre =     23;
  Global.Water.Distribution.wsd_min_pres =     20;
  Global.Water.Distribution.wsd_hi_no_el =    100;
  Global.Water.Distribution.wsd_lo_no_el =     10;
  Global.Water.Distribution.wsd_av_no_el =     40;
  Global.Water.Distribution.wsd_wt_el_no =     20;
  Global.Water.Distribution.wsd_nrg_pump =    700;
  Global.Water.Distribution.wsd_vol_pump =    400;
  Global.Water.Distribution.wsd_pmp_head =     30;
  Global.Water.Distribution.wsd_sta_head =      1;
  Global.Water.Distribution.wsd_main_len =    1e3;
  Global.Water.Distribution.wsd_pmp_flow =   5e-3;
  Global.Water.Distribution.wsd_pmp_volt =    220;
  Global.Water.Distribution.wsd_pmp_amps =     12;
  Global.Water.Distribution.wsd_pmp_pf   =    0.9;
  Global.Water.Distribution.wsd_pmp_exff =     99;
//ww
  Global.Waste.ww_resi_pop =   2000;
  Global.Waste.ww_vol_gene = 150000;
  Global.Waste.ww_nrg_cost =      1;
  Global.Waste.ww_run_cost =      5;
//wwc
  Global.Waste.Collection.wwc_conn_pop     =   1900;
  Global.Waste.Collection.wwc_vol_coll     =    2e5;
  Global.Waste.Collection.wwc_vol_coll_tre =    1e5;
  Global.Waste.Collection.wwc_vol_coll_unt =     10;
  Global.Waste.Collection.wwc_ch4_efac_col =    0.3;
  Global.Waste.Collection.wwc_ch4_efac_cso =    0.3;
  Global.Waste.Collection.wwc_nrg_cons     =   1000;
  Global.Waste.Collection.wwc_vol_fuel     =    0.3;
  Global.Waste.Collection.wwc_nrg_pump     =    700;
  Global.Waste.Collection.wwc_vol_pump     =    400;
  Global.Waste.Collection.wwc_pmp_head     =     30;
  Global.Waste.Collection.wwc_sta_head     =      1;
  Global.Waste.Collection.wwc_coll_len     =    1e3;
  Global.Waste.Collection.wwc_pmp_flow     =   5e-3;
  Global.Waste.Collection.wwc_pmp_volt     =    220;
  Global.Waste.Collection.wwc_pmp_amps     =     12;
  Global.Waste.Collection.wwc_pmp_pf       =    0.9;
  Global.Waste.Collection.wwc_pmp_exff     =     99;
//wwt
  Global.Waste.Treatment.wwt_serv_pop  =   1800;
  Global.Waste.Treatment.wwt_vol_trea  =    1e5;
  Global.Waste.Treatment.wwd_vol_disc  =    9e4;
  Global.Waste.Treatment.wwd_vol_nonp  =    1e3;
  Global.Waste.Treatment.wwt_bod_infl  =   20e3;
  Global.Waste.Treatment.wwt_bod_slud  =    1e3;
  Global.Waste.Treatment.wwt_bod_effl  =    100;
  Global.Waste.Treatment.wwd_n2o_effl  =     10;
  Global.Waste.Treatment.wwt_ch4_efac  =    0.3;
  Global.Waste.Treatment.wwt_n2o_efac  =    3.2;
  Global.Waste.Treatment.wwd_ch4_efac  =    0.3;
  Global.Waste.Treatment.wwd_n2o_efac  =    3.2;
  Global.Waste.Treatment.wwt_nrg_cons  =    1e3;
  Global.Waste.Treatment.wwt_vol_fuel  =    0.3;
  Global.Waste.Treatment.wwt_biog_pro  =    8e3;
  Global.Waste.Treatment.wwt_fuel_dig  =    0.1;
  Global.Waste.Treatment.wwt_biog_val  =    8e3;
  Global.Waste.Treatment.wwt_nrg_biog  =    500;
  Global.Waste.Treatment.wwt_trea_cap  =    5e5;
  Global.Waste.Treatment.wwt_tst_cmpl  =      5;
  Global.Waste.Treatment.wwt_tst_cond  =      6;
  Global.Waste.Treatment.wwt_nrg_pump  =    700;
  Global.Waste.Treatment.wwt_vol_pump  =    400;
  Global.Waste.Treatment.wwt_pmp_head  =     30;
  Global.Waste.Treatment.wwt_sta_head  =      1;
  Global.Waste.Treatment.wwt_coll_len  =    1e3;
  Global.Waste.Treatment.wwt_pmp_flow  =   5e-3;
  Global.Waste.Treatment.wwt_pmp_volt  =    220;
  Global.Waste.Treatment.wwt_pmp_amps  =     12;
  Global.Waste.Treatment.wwt_pmp_pf    =    0.9;
  Global.Waste.Treatment.wwt_pmp_exff  =     99;
  Global.Waste.Treatment.wwd_vol_trck  =    0.3;
  Global.Waste.Treatment.wwd_wr_N_rec  =     30;
  Global.Waste.Treatment.wwd_wr_P_rec  =     30;
  Global.Waste.Treatment.wwd_wr_adnrg  =     30;
  Global.Waste.Treatment.wwd_wr_vol_d  =     30;
  Global.Waste.Treatment.wwt_mass_slu  =    1e3;
  Global.Waste.Treatment.wwt_dryw_slu  =    5e2;
  Global.Waste.Treatment.wwt_mass_slu_sto   =    40;
  Global.Waste.Treatment.wwt_time_slu_sto   =    40;
  Global.Waste.Treatment.wwt_mass_slu_comp  =    40;
  Global.Waste.Treatment.wwt_mass_slu_inc   =    40;
  Global.Waste.Treatment.wwt_temp_inc       =    40;
  Global.Waste.Treatment.wwt_mass_slu_app   =    40;
  Global.Waste.Treatment.wwt_slu_la_N_cont  =     3;
  Global.Waste.Treatment.wwt_mass_slu_land  =    40;
  Global.Waste.Treatment.wwt_slu_lf_N_cont  =     3;
  Global.Waste.Treatment.wwt_slu_lf_TVS     =   0.7;
  Global.Waste.Treatment.wwt_mass_slu_stock =    40;
  Global.Waste.Treatment.wwt_vol_tslu       =   0.4;
//wwo
  Global.Waste.Onsite.wwo_onsi_pop         =   50;
  Global.Waste.Onsite.wwo_open_pop         =   50;
  Global.Waste.Onsite.wwo_vol_unco         =  3e3;
  Global.Waste.Onsite.wwo_vol_unco_ons     =  2e3;
  Global.Waste.Onsite.wwo_vol_unco_unt     =  1e3;
  Global.Waste.Onsite.wwo_vol_unco_tre     =  2e3;
  Global.Waste.Onsite.wwo_vol_disc         =  1.5e3;
  Global.Waste.Onsite.wwo_ch4_efac_unt     =  0.068;
  Global.Waste.Onsite.wwo_ch4_efac_con     =  0.3;
  Global.Waste.Onsite.wwo_ch4_efac_tre     =  0.3;
  Global.Waste.Onsite.wwo_n2o_efac_tre     =  3.2;
  Global.Waste.Onsite.wwo_ch4_efac_dis     =  0.3;
  Global.Waste.Onsite.wwo_n2o_efac_dis     =  3.2;
  Global.Waste.Onsite.wwo_nrg_cons         =  1e3;
  Global.Waste.Onsite.wwo_cont_emp         =   40;
  Global.Waste.Onsite.wwo_fdensity         =  940;
  Global.Waste.Onsite.wwo_fslu_emp         =   10;
  Global.Waste.Onsite.wwo_bod_infl         =  100;
  Global.Waste.Onsite.wwo_bod_rmvd         =   10;
  Global.Waste.Onsite.wwo_bod_slud         =   10;
  Global.Waste.Onsite.wwo_bod_effl         =   10;
  Global.Waste.Onsite.wwo_n2o_effl         =   10;
  Global.Waste.Onsite.wwo_vol_fuel         =  0.2;
  Global.Waste.Onsite.wwo_nrg_pump         =    700;
  Global.Waste.Onsite.wwo_vol_pump         =    400;
  Global.Waste.Onsite.wwo_pmp_head         =     30;
  Global.Waste.Onsite.wwo_sta_head         =      1;
  Global.Waste.Onsite.wwo_coll_len         =    1e3;
  Global.Waste.Onsite.wwo_pmp_flow         =   5e-3;
  Global.Waste.Onsite.wwo_pmp_volt         =    220;
  Global.Waste.Onsite.wwo_pmp_amps         =     12;
  Global.Waste.Onsite.wwo_pmp_pf           =    0.9;
  Global.Waste.Onsite.wwo_pmp_exff         =     99;
  Global.Waste.Onsite.wwo_vol_trck         =    0.1;
  Global.Waste.Onsite.wwo_biog_pro         =    100;
  Global.Waste.Onsite.wwo_biog_val         =     10;
  Global.Waste.Onsite.wwo_biog_fla         =     90;
  Global.Waste.Onsite.wwo_nrg_biog         =    100;
  Global.Waste.Onsite.wwo_mass_landfil     =    40;
  Global.Waste.Onsite.wwo_lf_N_cont        =     3;
  Global.Waste.Onsite.wwo_lf_TVS           =   0.7;
  Global.Waste.Onsite.wwo_mass_landapp     =     10;
  Global.Waste.Onsite.wwo_la_N_cont        =      3;
  Global.Waste.Onsite.wwo_vol_dumping      =     10;
  Global.Waste.Onsite.wwo_ch4_efac_dumping =  0.1;
  Global.Waste.Onsite.wwo_bod_conc_fs      =  67.8;
  Global.Waste.Onsite.wwo_N_urine          =  40;
  Global.Waste.Onsite.wwo_reused_N         =  10;
  Global.Waste.Onsite.wwo_reused_P         =  20;
//----------------------------------------------
