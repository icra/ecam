//Data structure for tabled values or dropdown menus
//used for two kinds of variables:
// 1. nominal variables (strings) with magnitude==Option
// 2. numeric variables inside Exceptions
let Tables = {
	//fuel types
  "Fuel type":[             //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
    {name:"Diesel",          EFCH4:{engines:3,vehicles:3.9}, EFN2O:{engines:0.6,vehicles:3.9}, EFCO2:74100, FD:0.84, NCV:43.0},
    {name:"Gasoline/Petrol", EFCH4:{engines:3,vehicles:3.8}, EFN2O:{engines:0.6,vehicles:1.9}, EFCO2:69300, FD:0.74, NCV:44.3},
    {name:"Natural Gas",     EFCH4:{engines:10,vehicles:92}, EFN2O:{engines:0.1,vehicles:0.2}, EFCO2:56100, FD:0.75, NCV:48.0},
  ],

  //pump types
  "Pump type":[
    {name:"None"       },
    {name:"External"   },
    {name:"Submersible"},
  ],

  //pump sizes
  "Pump size":[
    {name:"5.6 - 15.7 kW"},
    {name:"15.7 - 38 kW" },
    {name:"39 - 96 kW"   },
    {name:"> 96 kW"      },
  ],

  //type of disinfectio
  "wst_disnfctn":[
    {name:"None"},
    {name:"Chlorination"},
    {name:"UF"},
    {name:"MF"},
    {name:"Ozon"},
    {name:"UV"},
  ],

  //type of potabilization chain
  "wst_treatmen":[
    {name:"None"},
    {name:"Pre-ox/C/F/S/Filt/Des"},
    {name:"Pre-ox/C/F/Filt/Des"},
    {name:"C/F/S/Filt/Des"},
    {name:"C/F/Filt/Des"},
    {name:"Des"},
    {name:"Other"},
  ],

  //types of water bodies
  //ipcc 2019, table 6.3 (updated) EF (kgCH4/kgBOD)
  "ww_ch4_efac":[
    {name:"Select",                                                                                 ch4_efac:0},
    {name:"Discharge to aquatic environments (Tier 1)",                                             ch4_efac:0.068},
    {name:"Discharge to aquatic environments other than reservoirs, lakes, and estuaries (Tier 2)", ch4_efac:0.021},
    {name:"Discharge to reservoirs, lakes, and estuaries (Tier 2)",                                 ch4_efac:0.114},
    {name:"Stagnant sewer or anaerobic water body",                                                 ch4_efac:0.3},
    {name:"Flowing sewer (open or closed)",                                                         ch4_efac:0},
    {name:"Soil infiltration",                                                                      ch4_efac:0},

  ],

	//types of treatment
  //ipcc 2019, table 6.3 (updated) EF (kgCH4/kgBOD)
  "wwt_type_tre":[
    {name:"Select treatment type",                           ch4_efac:0,     bod_rmvd_as_sludge_estm:0   },
    {name:"Centralised, aerobic, treatment plant",           ch4_efac:0.018, bod_rmvd_as_sludge_estm:0.65},
    {name:"Anaerobic Reactor - CH4 recovery not considered", ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Reactor - CH4 recovery considered",     ch4_efac:0.14,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Lagoon <2m depth",                      ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.30},
    {name:"Anaerobic Lagoon >2m depth",                      ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Lagoon covered",                        ch4_efac:0,     bod_rmvd_as_sludge_estm:0.10},
    {name:"Wetlands - Surface flow",                         ch4_efac:0.24,  bod_rmvd_as_sludge_estm:0.30},
    {name:"Wetlands - Horizontal subsurface flow",           ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Wetlands - Vertical subsurface flow",             ch4_efac:0.006, bod_rmvd_as_sludge_estm:0.65},
    {name:"Septic tank",                                     ch4_efac:0.3,   bod_rmvd_as_sludge_estm:0.65},
    {name:"Septic tank + land dispersal field",              ch4_efac:0.3,   bod_rmvd_as_sludge_estm:0.65},
    {name:"Pit latrine without flush water (lined or unlined) – household", ch4_efac:0.06,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – communal",  ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine with flush water use (lined or unlined)",            ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},

    {name:"Activated Sludge - Well managed",                 ch4_efac:0,     bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Minor poorly aerated zones",   ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Some aerated zones",           ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Not well managed",             ch4_efac:0.18,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Aerated Lagoon",                                  ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Trickling Filter",                                ch4_efac:0.036, bod_rmvd_as_sludge_estm:0.65},
    {name:"Imhoff tank",                                     ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
  ],

  //types of main treatments
  "wwt_main_tre":[
    {name:"Activated sludge"},
    {name:"Aerated Lagoon"},
    {name:"Anaerobic Lagoon"},
    {name:"Trickling Filter"},
    {name:"Anaerobic Reactor"},
    {name:"Wetlands"},
  ],

  //pump types 2
  "wwt_pmp_type":[
    {name:"Archimedean screw"},
    {name:"Centrifugal pump"},
    {name:"Propeller pump"},
    {name:"Vane pump"},
  ],

  //type of sludge disposed
  "wwt_slu_disp":[
    {name:"Non-digested", f_ch4:0.53, la_N_cont:3, TVS:0.70},
    {name:"Digested",     f_ch4:0.06, la_N_cont:4, TVS:0.51},
  ],

  //type of landfill
  "wwt_slu_type":[
    {name:"Landfill",                     ratio:1},
    {name:"Landfill (with gas recovery)", ratio:0.02},
    {name:"Landfill (flaring)",           ratio:0},
  ],

  //type of soil
  "wwt_soil_typ":[
    {name:"Fine-Textured (>30% clay)",   f_la:0.023},
    {name:"Coarse-Textured (<30% clay)", f_la:0.005},
  ],

	//type of water reuse
  "wwd_reus_typ":[
    {name:"For non-potable use"},
    {name:"For green areas"},
    {name:"For industrial use"},
    {name:"For irrigation with resticted access"},
    {name:"For irrigation without restricted access"},
    {name:"For food crop irrigation"},
    {name:"For fishfarming"},
  ],

  //type of containment
  "fsc_type_tre":[
    {name:"No containment (open defecation)",                               ch4_efac:0.027,  ch4_efac_flooding:0.027, BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – household", ch4_efac:0.06,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – communal",  ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine with flush water use (lined or unlined)",            ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Septic System",                                                  ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:1.35, fs_density:1100},
    {name:"Fully lined tank without flush water use – not water tight",     ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Fully lined tank without flush water use – water tight",         ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Fully lined tank with flush water use - water tight or untight", ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Urine Diverting Dry Toilet (UDDT)",                              ch4_efac:0.0,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Composting Toilet",                                              ch4_efac:0.0013, ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
  ],
  //containment is flooding?
  "fsc_flooding":[
    {name:"no"},
    {name:"yes"},
  ],
  //type of onsite treatment
  "fst_type_tre":[
    {name:"No Treatment",                                     ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.0,},
    {name:"Anaerobic Digester",                               ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Imhoff Tanks",                                     ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Anaerobic Reactors - CH4 recovery not considered", ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Anaerobic Reactors - CH4 recovery considered",     ch4_efac:0.14,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Stabilization Ponds (<2 m depth)",                 ch4_efac:0.12,   bod_rmvd_as_sludge_estm:0.30,},
    {name:"Stabilization Ponds (> 2m depth)",                 ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Sludge Drying Beds",                               ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.0,},
    {name:"Wetlands - surface flow",                          ch4_efac:0.24,   bod_rmvd_as_sludge_estm:0.30,},
    {name:"Wetlands - Horizontal subsurface flow",            ch4_efac:0.06,   bod_rmvd_as_sludge_estm:0.65,},
    {name:"Wetlands - Vertical subsurface flow",              ch4_efac:0.006,  bod_rmvd_as_sludge_estm:0.65,},
    {name:"Composting",                                       ch4_efac:0.0013, bod_rmvd_as_sludge_estm:0.0,},
    {name:"Activated Sludge (well managed)",                  ch4_efac:0.0000, bod_rmvd_as_sludge_estm:0.65,},
    {name:"Activated Sludge - minor poorly aerated zones",    ch4_efac:0.06,   bod_rmvd_as_sludge_estm:0.65,},
    {name:"Activated Sludge - Some aerated zones",            ch4_efac:0.12,   bod_rmvd_as_sludge_estm:0.65,},
    {name:"Activated Sludge - Not well managed",              ch4_efac:0.18,   bod_rmvd_as_sludge_estm:0.65,},
    {name:"Trickling Filter",                                 ch4_efac:0.036,  bod_rmvd_as_sludge_estm:0.65,},
  ],
  //type of disposal
  "fsr_type_tre":[
    {name:"No disposal (open defecation)"},
    {name:"Landfilling"},
    {name:"Land application"},
    {name:"Dumping"},
  ],
  //type of faecal sludge for land application and landfilling
  "fsr_fslu_typ":[
    {name:"Untreated",          N_content:0.24, TVS:0.700, total_solids:0.04},
    {name:"Treated",            N_content:3.00, TVS:0.400, total_solids:0.22},
    {name:"Pit humus",          N_content:4.00, TVS:0.650, total_solids:0.07},
    {name:"Dehydrated faeces",  N_content:3.00, TVS:0.700, total_solids:0.27},
    {name:"Compost",            N_content:3.00, TVS:0.800, total_solids:0.08},
    {name:"Septic tank sludge", N_content:0.03, TVS:0.600, total_solids:0.02},
  ],
}

//copy tables
Tables.wsa_fuel_typ=Tables["Fuel type"]; //engines
Tables.wst_fuel_typ=Tables["Fuel type"]; //engines
Tables.wsd_fuel_typ=Tables["Fuel type"]; //engines
Tables.wwc_fuel_typ=Tables["Fuel type"]; //engines
Tables.wwt_fuel_typ=Tables["Fuel type"]; //engines
Tables.wwd_fuel_typ=Tables["Fuel type"]; //engines
Tables.fst_fuel_typ=Tables["Fuel type"]; //type of fuel fsm treatment engines
Tables.fsr_fuel_typ=Tables["Fuel type"]; //type of fuel fsm treatment engines
Tables.wsd_trck_typ=Tables["Fuel type"]; //trucks
Tables.wwt_trck_typ=Tables["Fuel type"]; //trucks
Tables.wwd_trck_typ=Tables["Fuel type"]; //trucks
Tables.fsc_trck_typ=Tables["Fuel type"]; //type of fuel fsm emptying and transport
Tables.fst_trck_typ=Tables["Fuel type"]; //type of fuel fsm emptying and transport
Tables.fsr_trck_typ=Tables["Fuel type"]; //type of fuel fsm emptying and transport
Tables.wwt_dige_typ=Tables["Fuel type"]; //type of fuel dig
Tables.wwt_appl_typ=Tables["Fuel type"]; //type of fuel app
Tables.fsr_fslu_typ_lf=Tables.fsr_fslu_typ;
Tables.fsr_fslu_typ_la=Tables.fsr_fslu_typ;
Tables.fsr_soil_typ=Tables.wwt_soil_typ;
Tables.fsr_ch4_efac=Tables.ww_ch4_efac;
Tables.fsr_dumping_pth=Tables.ww_ch4_efac;
Tables.fsr_disp_typ=Tables.wwt_slu_type;

//get object by "table" (string) and "index" (integer)
Tables.get_row=function(table, index){
  let arr = Tables[table]; //array
  if(!arr) return false;
  return arr[index] || false;
}
