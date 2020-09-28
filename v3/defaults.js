/*
  Default values for v3 development (backend and frontend)
*/

//frontend elements
ecam_logo.visible   = 1;
linear_menu.visible = 1;
stages_menu.visible = 0;

//default page to show
tier_b.level="Waste";
tier_b.sublevel="Treatment";
ecam.show('tier_b');

/* BACKEND */

//yes to all yes/no questions
//Object.keys(Questions).forEach(key=>{Global.Configuration.Questions[key]=1});

//general variables
Global.General.conv_kwh_co2 = 0.7; //conversion factor for grid electricity (kgCO2/kWh)
Global.General.prot_con     = 22;  //prot consumption                       (kg/person/year)
Global.General.bod_pday     = 37;  //BOD5                                   (g/person/day)
Global.General.bod_pday_fs  = 37;  //BOD5 in faecal sludge                  (g/person/day)

//Water supply
Global.Water.ws_resi_pop               = 1000; //resident population
Global.Water.Abstraction.wsa_nrg_cons  = 1000; //kWh
Global.Water.Abstraction.wsa_vol_conv  =  500; //m3
Global.Water.Distribution.wsd_serv_pop =  900; //serviced population

//Wastewater
Global.Waste.ww_resi_pop                 =   2000; //resident population
Global.Waste.ww_vol_gene                 = 150000; //wastewater generated
Global.Waste.Collection.wwc_conn_pop     =   1900; //connected population
Global.Waste.Collection.wwc_vol_coll     =    2e5;
Global.Waste.Collection.wwc_vol_coll_tre =    1e5;

Global.Waste.Treatment.wwt_serv_pop      =   1800;
Global.Waste.Treatment.wwt_vol_trea      =    1e5;
Global.Waste.Treatment.wwd_vol_disc      =    9e4;
Global.Waste.Treatment.wwd_vol_nonp      =    1e3;
