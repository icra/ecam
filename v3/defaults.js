/*
  Default values for v3 development (backend and frontend)
*/

//FRONTEND ELEMENTS
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;
ecam.show('tier_b');

Scenarios.push(new Ecam());

//BACKEND ELEMENTS
//general
  Global.General.conv_kwh_co2 = 0.7; //conversion factor for grid electricity (kgCO2/kWh)
  Global.General.prot_con     = 22;  //prot consumption                       (kg/person/year)
  Global.General.bod_pday     = 37;  //BOD5                                   (g/person/day)
  Global.General.bod_pday_fs  = 37;  //BOD5 in faecal sludge                  (g/person/day)
//ws
  Global.Water.ws_resi_pop = 1000;
//ww
  Global.Waste.ww_resi_pop = 2000;
  Global.Waste.ww_vol_gene = 150000;
//-----

let substage = Global.Water.Abstraction[0];
Object.keys(Questions).forEach(key=>{substage.Configuration.Questions[key]=1});

//wsa
  substage.wsa_vol_conv = 500;
  substage.wsa_nrg_cons = 1000;
  substage.wsa_nrg_cost = 10;
  substage.wsa_run_cost = 100;
  substage.wsa_fuel_typ = 0;
  substage.wsa_vol_fuel = 9e-2;
  substage.wsa_nrg_pump = 700;
  substage.wsa_vol_pump = 400;
  substage.wsa_pmp_head = 30;
  substage.wsa_sta_head = 1;
  substage.wsa_main_len = 1e3;
  substage.wsa_pmp_flow = 5e-3;
  substage.wsa_pmp_volt = 220;
  substage.wsa_pmp_amps = 12;
  substage.wsa_pmp_pf   = 0.9;
  substage.wsa_pmp_exff = 99;
////wst
//  substage.Water.Treatment.wst_vol_trea = 450;
//  substage.Water.Treatment.wst_nrg_cons = 1000;
//  substage.Water.Treatment.wst_mass_slu = 1000;
//  substage.Water.Treatment.wst_fuel_typ = 0;
//  substage.Water.Treatment.wst_vol_fuel = 33e-3;
//  substage.Water.Treatment.wst_tst_carr = 50;
//  substage.Water.Treatment.wst_trea_cap = 5e3;
//  substage.Water.Treatment.wst_nrg_pump = 700;
//  substage.Water.Treatment.wst_vol_pump = 400;
//  substage.Water.Treatment.wst_pmp_head = 30;
//  substage.Water.Treatment.wst_sta_head = 1;
//  substage.Water.Treatment.wst_coll_len = 1e3;
//  substage.Water.Treatment.wst_pmp_flow = 5e-3;
//  substage.Water.Treatment.wst_pmp_volt = 220;
//  substage.Water.Treatment.wst_pmp_amps = 12;
//  substage.Water.Treatment.wst_pmp_pf   = 0.9;
//  substage.Water.Treatment.wst_pmp_exff = 99;
////wsd
//  substage.Water.Distribution.wsd_serv_pop = 900;
//  substage.Water.Distribution.wsd_vol_dist = 400;
//  substage.Water.Distribution.wsd_nrg_cons = 1000;
//  substage.Water.Distribution.wsd_vol_fuel = 33e-3;
//  substage.Water.Distribution.wsd_vol_trck = 33e-3;
//  substage.Water.Distribution.wsd_auth_con = 350;
//  substage.Water.Distribution.wsd_bill_con = 340;
//  substage.Water.Distribution.wsd_deli_pts = 300;
//  substage.Water.Distribution.wsd_ser_cons = 500;
//  substage.Water.Distribution.wsd_time_pre = 23;
//  substage.Water.Distribution.wsd_min_pres = 20;
//  substage.Water.Distribution.wsd_hi_no_el = 100;
//  substage.Water.Distribution.wsd_lo_no_el = 10;
//  substage.Water.Distribution.wsd_av_no_el = 40;
//  substage.Water.Distribution.wsd_wt_el_no = 20;
//  substage.Water.Distribution.wsd_nrg_pump = 700;
//  substage.Water.Distribution.wsd_vol_pump = 400;
//  substage.Water.Distribution.wsd_pmp_head = 30;
//  substage.Water.Distribution.wsd_sta_head = 1;
//  substage.Water.Distribution.wsd_main_len = 1e3;
//  substage.Water.Distribution.wsd_pmp_flow = 5e-3;
//  substage.Water.Distribution.wsd_pmp_volt = 220;
//  substage.Water.Distribution.wsd_pmp_amps = 12;
//  substage.Water.Distribution.wsd_pmp_pf   = 0.9;
//  substage.Water.Distribution.wsd_pmp_exff = 99;
////wwc
//  substage.Waste.Collection.wwc_conn_pop     = 1900;
//  substage.Waste.Collection.wwc_vol_coll     = 2e5;
//  substage.Waste.Collection.wwc_vol_coll_tre = 1e5;
//  substage.Waste.Collection.wwc_vol_coll_unt = 10;
//  substage.Waste.Collection.wwc_ch4_efac_col = 0.3;
//  substage.Waste.Collection.wwc_ch4_efac_cso = 0.3;
//  substage.Waste.Collection.wwc_nrg_cons     = 1000;
//  substage.Waste.Collection.wwc_vol_fuel     = 0.3;
//  substage.Waste.Collection.wwc_nrg_pump     = 700;
//  substage.Waste.Collection.wwc_vol_pump     = 400;
//  substage.Waste.Collection.wwc_pmp_head     = 30;
//  substage.Waste.Collection.wwc_sta_head     = 1;
//  substage.Waste.Collection.wwc_coll_len     = 1e3;
//  substage.Waste.Collection.wwc_pmp_flow     = 5e-3;
//  substage.Waste.Collection.wwc_pmp_volt     = 220;
//  substage.Waste.Collection.wwc_pmp_amps     = 12;
//  substage.Waste.Collection.wwc_pmp_pf       = 0.9;
//  substage.Waste.Collection.wwc_pmp_exff     = 99;
////wwt
//  substage.Waste.Treatment.wwt_serv_pop       = 1800;
//  substage.Waste.Treatment.wwt_vol_trea       = 1e5;
//  substage.Waste.Treatment.wwd_vol_disc       = 9e4;
//  substage.Waste.Treatment.wwd_vol_nonp       = 1e3;
//  substage.Waste.Treatment.wwt_bod_infl       = 20e3;
//  substage.Waste.Treatment.wwt_bod_slud       = 1e3;
//  substage.Waste.Treatment.wwt_bod_effl       = 100;
//  substage.Waste.Treatment.wwd_n2o_effl       = 10;
//  substage.Waste.Treatment.wwt_ch4_efac       = 0.3;
//  substage.Waste.Treatment.wwt_n2o_efac       = 3.2;
//  substage.Waste.Treatment.wwd_ch4_efac       = 0.3;
//  substage.Waste.Treatment.wwd_n2o_efac       = 3.2;
//  substage.Waste.Treatment.wwt_nrg_cons       = 1e3;
//  substage.Waste.Treatment.wwt_vol_fuel       = 0.3;
//  substage.Waste.Treatment.wwt_biog_pro       = 8e3;
//  substage.Waste.Treatment.wwt_fuel_dig       = 0.1;
//  substage.Waste.Treatment.wwt_biog_val       = 8e3;
//  substage.Waste.Treatment.wwt_nrg_biog       = 500;
//  substage.Waste.Treatment.wwt_trea_cap       = 5e5;
//  substage.Waste.Treatment.wwt_tst_cmpl       = 5;
//  substage.Waste.Treatment.wwt_tst_cond       = 6;
//  substage.Waste.Treatment.wwt_nrg_pump       = 700;
//  substage.Waste.Treatment.wwt_vol_pump       = 400;
//  substage.Waste.Treatment.wwt_pmp_head       = 30;
//  substage.Waste.Treatment.wwt_sta_head       = 1;
//  substage.Waste.Treatment.wwt_coll_len       = 1e3;
//  substage.Waste.Treatment.wwt_pmp_flow       = 5e-3;
//  substage.Waste.Treatment.wwt_pmp_volt       = 220;
//  substage.Waste.Treatment.wwt_pmp_amps       = 12;
//  substage.Waste.Treatment.wwt_pmp_pf         = 0.9;
//  substage.Waste.Treatment.wwt_pmp_exff       = 99;
//  substage.Waste.Treatment.wwd_vol_trck       = 0.3;
//  substage.Waste.Treatment.wwd_wr_N_rec       = 30;
//  substage.Waste.Treatment.wwd_wr_P_rec       = 30;
//  substage.Waste.Treatment.wwd_wr_adnrg       = 30;
//  substage.Waste.Treatment.wwd_wr_vol_d       = 30;
//  substage.Waste.Treatment.wwt_mass_slu       = 1e3;
//  substage.Waste.Treatment.wwt_dryw_slu       = 5e2;
//  substage.Waste.Treatment.wwt_mass_slu_sto   = 40;
//  substage.Waste.Treatment.wwt_time_slu_sto   = 40;
//  substage.Waste.Treatment.wwt_mass_slu_comp  = 40;
//  substage.Waste.Treatment.wwt_mass_slu_inc   = 40;
//  substage.Waste.Treatment.wwt_temp_inc       = 40;
//  substage.Waste.Treatment.wwt_mass_slu_app   = 40;
//  substage.Waste.Treatment.wwt_slu_la_N_cont  = 3;
//  substage.Waste.Treatment.wwt_mass_slu_land  = 40;
//  substage.Waste.Treatment.wwt_slu_lf_N_cont  = 3;
//  substage.Waste.Treatment.wwt_slu_lf_TVS     = 0.7;
//  substage.Waste.Treatment.wwt_mass_slu_stock = 40;
//  substage.Waste.Treatment.wwt_vol_tslu       = 0.4;
////wwo
//  substage.Waste.Onsite.wwo_onsi_pop         = 50;
//  substage.Waste.Onsite.wwo_open_pop         = 50;
//  substage.Waste.Onsite.wwo_vol_unco         = 3e3;
//  substage.Waste.Onsite.wwo_vol_unco_ons     = 2e3;
//  substage.Waste.Onsite.wwo_vol_unco_unt     = 1e3;
//  substage.Waste.Onsite.wwo_vol_unco_tre     = 2e3;
//  substage.Waste.Onsite.wwo_vol_disc         = 1.5e3;
//  substage.Waste.Onsite.wwo_ch4_efac_unt     = 0.068;
//  substage.Waste.Onsite.wwo_ch4_efac_con     = 0.3;
//  substage.Waste.Onsite.wwo_ch4_efac_tre     = 0.3;
//  substage.Waste.Onsite.wwo_n2o_efac_tre     = 3.2;
//  substage.Waste.Onsite.wwo_ch4_efac_dis     = 0.3;
//  substage.Waste.Onsite.wwo_n2o_efac_dis     = 3.2;
//  substage.Waste.Onsite.wwo_nrg_cons         = 1e3;
//  substage.Waste.Onsite.wwo_cont_emp         = 40;
//  substage.Waste.Onsite.wwo_fdensity         = 940;
//  substage.Waste.Onsite.wwo_fslu_emp         = 10;
//  substage.Waste.Onsite.wwo_bod_infl         = 100;
//  substage.Waste.Onsite.wwo_bod_rmvd         = 10;
//  substage.Waste.Onsite.wwo_bod_slud         = 10;
//  substage.Waste.Onsite.wwo_bod_effl         = 10;
//  substage.Waste.Onsite.wwo_n2o_effl         = 10;
//  substage.Waste.Onsite.wwo_vol_fuel         = 0.2;
//  substage.Waste.Onsite.wwo_nrg_pump         = 700;
//  substage.Waste.Onsite.wwo_vol_pump         = 400;
//  substage.Waste.Onsite.wwo_pmp_head         = 30;
//  substage.Waste.Onsite.wwo_sta_head         = 1;
//  substage.Waste.Onsite.wwo_coll_len         = 1e3;
//  substage.Waste.Onsite.wwo_pmp_flow         = 5e-3;
//  substage.Waste.Onsite.wwo_pmp_volt         = 220;
//  substage.Waste.Onsite.wwo_pmp_amps         = 12;
//  substage.Waste.Onsite.wwo_pmp_pf           = 0.9;
//  substage.Waste.Onsite.wwo_pmp_exff         = 99;
//  substage.Waste.Onsite.wwo_vol_trck         = 0.1;
//  substage.Waste.Onsite.wwo_biog_pro         = 100;
//  substage.Waste.Onsite.wwo_biog_val         = 10;
//  substage.Waste.Onsite.wwo_biog_fla         = 90;
//  substage.Waste.Onsite.wwo_nrg_biog         = 100;
//  substage.Waste.Onsite.wwo_mass_landfil     = 40;
//  substage.Waste.Onsite.wwo_lf_N_cont        = 3;
//  substage.Waste.Onsite.wwo_lf_TVS           = 0.7;
//  substage.Waste.Onsite.wwo_mass_landapp     = 10;
//  substage.Waste.Onsite.wwo_la_N_cont        = 3;
//  substage.Waste.Onsite.wwo_vol_dumping      = 10;
//  substage.Waste.Onsite.wwo_ch4_efac_dumping = 0.1;
//  substage.Waste.Onsite.wwo_bod_conc_fs      = 67.8;
//  substage.Waste.Onsite.wwo_N_urine          = 40;
//  substage.Waste.Onsite.wwo_reused_N         = 10;
//  substage.Waste.Onsite.wwo_reused_P         = 20;
//--------------------------------------------------

