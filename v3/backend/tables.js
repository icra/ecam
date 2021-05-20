//Data structure for tabled values or dropdown menus
//used for two kinds of variables:
// 1. nominal variables (strings) with magnitude==Option
// 2. numeric variables inside Exceptions
let Tables={
  "Fuel type":[//            EF (kg/TJ)                                                                      FD (kg/L) NCV (TJ/Gg)
    {name:"Diesel",          EFCH4:{engines: 3,vehicles:3.9}, EFN2O:{engines:0.6,vehicles:3.9}, EFCO2:74100, FD:0.84,  NCV:43.0},
    {name:"Gasoline/Petrol", EFCH4:{engines: 3,vehicles:3.8}, EFN2O:{engines:0.6,vehicles:1.9}, EFCO2:69300, FD:0.74,  NCV:44.3},
    {name:"Natural Gas",     EFCH4:{engines:10,vehicles:92 }, EFN2O:{engines:0.1,vehicles:0.2}, EFCO2:56100, FD:0.75,  NCV:48.0},
  ],

  "Pump type":[
    {name:"External"   },
    {name:"Submersible"},
  ],

  "Pump size":[
    {name:"5.6 - 15.7 kW"},
    {name:"15.7 - 38 kW" },
    {name:"39 - 96 kW"   },
    {name:"> 96 kW"      },
  ],

  "Potabilization chain":[
    {name:"None"},
    {name:"Pre-ox/C/F/S/Filt/Des"},
    {name:"Pre-ox/C/F/Filt/Des"},
    {name:"C/F/S/Filt/Des"},
    {name:"C/F/Filt/Des"},
    {name:"Des"},
    {name:"Other"},
  ],

  //ipcc 2019, table 6.3 (updated) EF (kgCH4/kgBOD)
  "type_of_water_body":[
    {name:"Water body undefined",                                                                   ch4_efac:0     },
    {name:"Discharge to aquatic environments (Tier 1)",                                             ch4_efac:0.068 },
    {name:"Discharge to aquatic environments other than reservoirs, lakes, and estuaries (Tier 2)", ch4_efac:0.021 },
    {name:"Discharge to reservoirs, lakes, and estuaries (Tier 2)",                                 ch4_efac:0.114 },
    {name:"Stagnant sewer or anaerobic water body",                                                 ch4_efac:0.3   },
    {name:"Flowing sewer (open or closed)",                                                         ch4_efac:0     },
    {name:"Soil infiltration",                                                                      ch4_efac:0     },
  ],

  "type_of_sewer":[
    {name:"Type of sewer undefined",                ch4_efac:0},
    {name:"Stagnant sewer or anaerobic water body", ch4_efac:0.3},
    {name:"Flowing sewer (open or closed)",         ch4_efac:0},
  ],

  //ipcc 2019, table 6.3 (updated) EF (kgCH4/kgBOD)
  "type_of_treatment":[
    {name:"Type of treatment undefined",                                  ch4_efac:0,     },
    {name:"Centralised, aerobic, treatment plant",                        ch4_efac:0.018, },
    {name:"Anaerobic Reactor - CH4 recovery not considered",              ch4_efac:0.48,  },
    {name:"Anaerobic Reactor - CH4 recovery considered",                  ch4_efac:0.14,  },
    {name:"Anaerobic shallow lagoon and facultative lagoons (<2m depth)", ch4_efac:0.12,  },
    {name:"Anaerobic deep lagoon (>2m depth)",                            ch4_efac:0.48,  },
    {name:"Anaerobic Lagoon covered",                                     ch4_efac:0,     },
    {name:"Wetlands - Surface flow",                                      ch4_efac:0.24,  },
    {name:"Wetlands - Horizontal subsurface flow",                        ch4_efac:0.06,  },
    {name:"Wetlands - Vertical subsurface flow",                          ch4_efac:0.006, },
    {name:"Activated Sludge - Well managed",                              ch4_efac:0,     },
    {name:"Activated Sludge - Minor poorly aerated zones",                ch4_efac:0.06,  },
    {name:"Activated Sludge - Some aerated zones",                        ch4_efac:0.12,  },
    {name:"Activated Sludge - Not well managed",                          ch4_efac:0.18,  },
    {name:"Aerated Lagoon",                                               ch4_efac:0.06,  },
    {name:"Trickling Filter",                                             ch4_efac:0.036, },
  ],

  "Type of onsite treatment":[
    {name:"Type of treatment undefined",                      ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.0,},
    {name:"Anaerobic Digester",                               ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Imhoff Tanks",                                     ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Anaerobic Reactors - CH4 recovery not considered", ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Anaerobic Reactors - CH4 recovery considered",     ch4_efac:0.14,   bod_rmvd_as_sludge_estm:0.10,},
    {name:"Stabilization Ponds (<2m depth)",                  ch4_efac:0.12,   bod_rmvd_as_sludge_estm:0.30,},
    {name:"Stabilization Ponds (>2m depth)",                  ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
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


  "N2O EF plants (Table 6.8A)":[
    {name:"Type of treatment undefined",           n2o_efac:0      },
    {name:"Centralised, aerobic, treatment plant", n2o_efac:0.016  },
    {name:"Anaerobic reactor",                     n2o_efac:0      },
    {name:"Anaerobic lagoons",                     n2o_efac:0      },
    {name:"Septic tank",                           n2o_efac:0      },
    {name:"Septic tank + land dispersal field",    n2o_efac:0.0045 },
    {name:"Latrine",                               n2o_efac:0      },
  ],

  "N2O EF effluent (Table 6.8A)":[
    {name:"Discharge undefined",                                                                              n2o_efac:0.000},
    {name:"Freshwater, estuarine, and marine discharge (Tier 1)",                                             n2o_efac:0.005},
    {name:"Nutrient-impacted and/or hypoxic freshwater, estuarine, and marine discharge (Tier 3, if needed)", n2o_efac:0.019},
  ],

  "REMOVAL OF ORGANIC COMPONENT FROM WASTEWATER AS SLUDGE (KREM) ACCORDING TO TREATMENT TYPE (Table 6.6A)":[
    {name:"Mechanical treatment plants (primary sedimentation sludge)",                                                                                 K_rem:0.50},
    {name:"Aerobic treatment plants with primary treatment (mixed primary and secondary sludge, untreated or treated aerobically)",                     K_rem:0.80},
    {name:"Aerobic treatment plants with primary treatment and anaerobic sludge digestion (mixed primary and secondary sludge, treated anaerobically)", K_rem:1.00},
    {name:"Aerobic wastewater treatment plants without separate primary treatment",                                                                     K_rem:1.16},
  ],

  "WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)":[
    {name:"Untreated systems",                                                     bod_effl:1,    N_effl:1.00},
    {name:"Primary (mechanical treatment plants)",                                 bod_effl:0.60, N_effl:0.90},
    {name:"Primary + Secondary (biological treatment plants)",                     bod_effl:0.15, N_effl:0.60},
    {name:"Primary + Secondary + Tertiary (advanced biological treatment plants)", bod_effl:0.10, N_effl:0.20},
  ],

  "WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)":[
    {name:"Untreated systems",                                                                        bod_rmvd:0,     N_effl:1.00 },
    {name:"Septic tank/septic system",                                                                bod_rmvd:0.625, N_effl:0.85 },
    {name:"Septic tank/septic system + land dispersal field",                                         bod_rmvd:0.625, N_effl:0.32 },
    {name:"Latrines – Dry climate, groundwater table lower than latrine, small family (3–5 persons)", bod_rmvd:0.1,   N_effl:0.88 },
    {name:"Latrines – Dry climate, groundwater table lower than latrine, communal (many users)",      bod_rmvd:0.5,   N_effl:0.88 },
    {name:"Latrines – Wet climate/flush water use, groundwater table higher than latrine",            bod_rmvd:0.7,   N_effl:0.88 },
  ],

  //Andreoli et al table 2.2
  "Sludge characteristics in each stage of the treatment process":[
    {name:"Type of treatment undefined",                                     gSS_inh_day:0},
    {name:"Primary treatment (conventional)",                                gSS_inh_day:(35+45)/2},
    {name:"Primary treatment (septic tanks)",                                gSS_inh_day:(20+30)/2},
    {name:"Facultative pond",                                                gSS_inh_day:(20+25)/2},
    {name:"Anaerobic pond – facultative pond (anaerobic pond)",              gSS_inh_day:(20+45)/2},
    {name:"Anaerobic pond – facultative pond (facultative pond)",            gSS_inh_day:( 6+10)/2},
    {name:"Anaerobic pond – facultative pond (total)",                       gSS_inh_day:(26+55)/2},
    {name:"Facultative aerated lagoon",                                      gSS_inh_day:( 8+13)/2},
    {name:"Complete-mix aerat.lagoon – sedim. pond",                         gSS_inh_day:(11+13)/2},
    {name:"Septic tank+anaerobic filter (septic tank)",                      gSS_inh_day:(20+30)/2},
    {name:"Septic tank+anaerobic filter (anaerobic filter)",                 gSS_inh_day:( 7+9 )/2},
    {name:"Septic tank+anaerobic filter (total)",                            gSS_inh_day:(27+39)/2},
    {name:"Conventional activated sludge (primary sludge)",                  gSS_inh_day:(35+45)/2},
    {name:"Conventional activated sludge (secondary sludge)",                gSS_inh_day:(25+35)/2},
    {name:"Conventional activated sludge (mixed sludge)",                    gSS_inh_day:(60+80)/2},
    {name:"Activated sludge extended aeration",                              gSS_inh_day:(40+45)/2},
    {name:"High rate trickling filter (primary sludge)",                     gSS_inh_day:(35+45)/2},
    {name:"High rate trickling filter (secondary sludge)",                   gSS_inh_day:(20+30)/2},
    {name:"High rate trickling filter (mixed sludge)",                       gSS_inh_day:(55+75)/2},
    {name:"Submerged aerated biofilter (primary sludge)",                    gSS_inh_day:(35+45)/2},
    {name:"Submerged aerated biofilter (secondary sludge)",                  gSS_inh_day:(25+35)/2},
    {name:"Submerged aerated biofilter (mixed sludge)",                      gSS_inh_day:(60+80)/2},
    {name:"UASB Reactor",                                                    gSS_inh_day:(12+18)/2},
    {name:"UASB+activated sludge (anaerobic sludge (UASB))",                 gSS_inh_day:(12+18)/2},
    {name:"UASB+activated sludge (aerobic sludge (activated sludge))",       gSS_inh_day:( 8+14)/2},
    {name:"UASB+activated sludge (mixed sludge)",                            gSS_inh_day:(20+32)/2},
    {name:"UASB+aerobic biofilm reactor (anaerobic sludge (UASB))",          gSS_inh_day:(12+18)/2},
    {name:"UASB+aerobic biofilm reactor (aerobic sludge (aerobic reactor))", gSS_inh_day:( 6+12)/2},
    {name:"UASB+aerobic biofilm reactor (mixed sludge)",                     gSS_inh_day:(18+30)/2},
  ],

  "Type of sludge disposed":[
    {name:"Non-digested", f_ch4:0.53, la_N_cont:3, TVS:0.70},
    {name:"Digested",     f_ch4:0.06, la_N_cont:4, TVS:0.51},
  ],

  "Type of landfill":[
    {name:"Landfill",                     ratio:1},
    {name:"Landfill (with gas recovery)", ratio:0.02},
    {name:"Landfill (flaring)",           ratio:0},
  ],

  //f_la: N transformed to N2O-N
  "Soil type":[
    {name:"Soil type undefined",         f_la:0.000},
    {name:"Fine-Textured (>30% clay)",   f_la:0.023},
    {name:"Coarse-Textured (<30% clay)", f_la:0.005},
  ],

  "Type of containment":[
    {name:"Containment undefined",                                          ch4_efac:0,      ch4_efac_flooding:0,     BOD_conc_FS:0,    fs_density:0   },
    {name:"No containment (open defecation)",                               ch4_efac:0.027,  ch4_efac_flooding:0.027, BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – household", ch4_efac:0.06,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – communal",  ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine with flush water use (lined or unlined)",            ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Septic tank (with or without dispersal field)",                  ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:1.35, fs_density:1100},
    {name:"Fully lined tank without flush water use – not water tight",     ch4_efac:0.3,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Fully lined tank without flush water use – water tight",         ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Fully lined tank with flush water use - water tight or untight", ch4_efac:0.42,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Urine Diverting Dry Toilet (UDDT)",                              ch4_efac:0.0,    ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Composting Toilet",                                              ch4_efac:0.0013, ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
    {name:"Imhoff tank",                                                    ch4_efac:0.48,   ch4_efac_flooding:0.42,  BOD_conc_FS:67.8, fs_density:1400},
  ],

  "Flooding containment":[
    {name:"no"},
    {name:"yes"},
  ],

  //for land application and landfilling
  "Type of faecal sludge":[
    {name:"Type of faecal sludge undefined", N_content:0.00, TVS:0.000, total_solids:0.00},
    {name:"Untreated faecal sludge",         N_content:0.24, TVS:0.700, total_solids:0.04},
    {name:"Treated faecal sludge",           N_content:3.00, TVS:0.400, total_solids:0.22},
    {name:"Pit humus",                       N_content:4.00, TVS:0.650, total_solids:0.07},
    {name:"Dehydrated faeces",               N_content:3.00, TVS:0.700, total_solids:0.27},
    {name:"Compost",                         N_content:3.00, TVS:0.800, total_solids:0.08},
    {name:"Septic tank sludge",              N_content:0.03, TVS:0.600, total_solids:0.02},
  ],
};

//get row object by "table" (string) and "index" (integer)
Tables.get_row=function(table, index){
  let t=Tables[table]; //array

  //check if table exists
  if(!t       ) throw `Table "${table}" does not exist`;
  if(!t[index]) throw `Table.${table}[${index}] does not exist`;

  //checks passed: return row
  return t[index];
};
