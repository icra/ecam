//defaults for v3 development

/*FRONTEND*/

//components
ecam_logo.visible    = 1;
linear_menu.visible  = 0;
sidebar.visible      = 0;

//views
tier_a.visible       = 1;
constants.visible    = 0;
landing.visible      = 0;
summary_ghg.visible  = 0;
summary_nrg.visible  = 0;
tier_b.visible       = 0;
variable.visible     = 0;
development.visible  = 0;

/*BACKEND*/
Global.General.anyFuelEngines= 1;

//level 1
Global.Water.ws_resi_pop             = 1000; //people
Global.Water.ws_serv_pop             =  900; //people
Global.Waste.ww_resi_pop             = 2000; //people
Global.Waste.Collection.wwc_conn_pop = 1900; //people
Global.Waste.Treatment.wwt_serv_pop  = 1800; //people
Global.Faecl.fs_resi_pop             = 100; //people
Global.Faecl.fs_onsi_pop             =  90; //people

//general info
Global.General.conv_kwh_co2 = 0.7; //conversion factor for grid electricity (kgCO2/kWh)
Global.General.prot_con     = 22;  //prot consumption                       (kg/person/year)
Global.General.bod_pday     = 37;  //BOD5                                   (g/person/day)
Global.General.bod_pday_fs  = 37;  //BOD5 in faecal sludge                  (g/person/day)

//level 2 Water Abstraction
Global.Water.Abstraction.wsa_nrg_cons = 1000; //kWh
Global.Water.Abstraction.wsa_vol_conv =  500; //m3

//level 2 Wastewater Treatment
Global.Waste.Treatment.wwt_bod_infl = 100; //kg
