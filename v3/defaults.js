/*
  Default values for v3 development (backend and frontend)
*/

/*FRONTEND*/

//page elements
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 1;

//page views
fuel_table.visible      = 1
tier_b.visible          = 0;
summary_ghg.visible     = 0;
landing.visible         = false;
select_scenario.visible = false;
configuration.visible   = false;
report.visible          = false;
constants.visible       = false;
emission_tree.visible   = false;
summary_nrg.visible     = false;
tier_a.visible          = false;
variable.visible        = false;
development.visible     = false;
more.visible            = false;

/*BACKEND*/

//general variables
Global.General.conv_kwh_co2 = 0.7; //conversion factor for grid electricity (kgCO2/kWh)
Global.General.prot_con     = 22;  //prot consumption                       (kg/person/year)
Global.General.bod_pday     = 37;  //BOD5                                   (g/person/day)
Global.General.bod_pday_fs  = 37;  //BOD5 in faecal sludge                  (g/person/day)

//activate all stages
Structure.forEach(s=>{
  Global.Configuration.ActiveStages[s.alias]=true;
});

//yes to all yes/no questions
//Object.keys(Questions).forEach(key=>{Global.Configuration.Questions[key] = 1;});

//level 1 (ws, ww, fs)
Global.Water.ws_resi_pop               = 1000; //resident population
Global.Water.Distribution.wsd_serv_pop =  900; //serviced population
Global.Waste.ww_resi_pop               = 2000; //resident population
Global.Waste.Collection.wwc_conn_pop   = 1900; //connected population
Global.Waste.Treatment.wwt_serv_pop    = 1800; //serviced population
Global.Faecl.fs_resi_pop               =  100; //resident population
Global.Faecl.Containment.fsc_onsi_pop  =   90; //people with onsite containment

//Water Abstraction
Global.Water.Abstraction.wsa_nrg_cons = 1000; //kWh
Global.Water.Abstraction.wsa_vol_conv =  500; //m3

//Wastewater Treatment
Global.Waste.Treatment.wwt_bod_infl = 100; //kg
