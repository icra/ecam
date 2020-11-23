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

  //type of water disinfection
  "Disinfection type":[
    {name:"None"},
    {name:"Chlorination"},
    {name:"UF"},
    {name:"MF"},
    {name:"Ozon"},
    {name:"UV"},
  ],

  //type of potabilization chain
  "Potabilization chain":[
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
  "type_of_water_body":[
    {name:"Select",                                                                                 ch4_efac:0},
    {name:"Discharge to aquatic environments (Tier 1)",                                             ch4_efac:0.068},
    {name:"Discharge to aquatic environments other than reservoirs, lakes, and estuaries (Tier 2)", ch4_efac:0.021},
    {name:"Discharge to reservoirs, lakes, and estuaries (Tier 2)",                                 ch4_efac:0.114},
    {name:"Stagnant sewer or anaerobic water body",                                                 ch4_efac:0.3},
    {name:"Flowing sewer (open or closed)",                                                         ch4_efac:0},
    {name:"Soil infiltration",                                                                      ch4_efac:0},
  ],

  "type_of_sewer":[
    {name:"Select",                                 ch4_efac:0},
    {name:"Stagnant sewer or anaerobic water body", ch4_efac:0.3},
    {name:"Flowing sewer (open or closed)",         ch4_efac:0},
  ],

	//types of treatment
  //ipcc 2019, table 6.3 (updated) EF (kgCH4/kgBOD)
  "type_of_treatment":[
    {name:"Select treatment type",                                          ch4_efac:0,     bod_rmvd_as_sludge_estm:0   },
    {name:"Centralised, aerobic, treatment plant",                          ch4_efac:0.018, bod_rmvd_as_sludge_estm:0.65},
    {name:"Anaerobic Reactor - CH4 recovery not considered",                ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Reactor - CH4 recovery considered",                    ch4_efac:0.14,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Lagoon <2m depth",                                     ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.30},
    {name:"Anaerobic Lagoon >2m depth",                                     ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
    {name:"Anaerobic Lagoon covered",                                       ch4_efac:0,     bod_rmvd_as_sludge_estm:0.10},
    {name:"Wetlands - Surface flow",                                        ch4_efac:0.24,  bod_rmvd_as_sludge_estm:0.30},
    {name:"Wetlands - Horizontal subsurface flow",                          ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Wetlands - Vertical subsurface flow",                            ch4_efac:0.006, bod_rmvd_as_sludge_estm:0.65},
    {name:"Septic tank (with or without dispersal field)",                  ch4_efac:0.3,   bod_rmvd_as_sludge_estm:0.65},
    {name:"Pit latrine without flush water (lined or unlined) – household", ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine without flush water (lined or unlined) – communal",  ch4_efac:0.3,   bod_rmvd_as_sludge_estm:0.65, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
    {name:"Pit latrine with flush water use (lined or unlined)",            ch4_efac:0.42,  bod_rmvd_as_sludge_estm:0.65, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
    {name:"Activated Sludge - Well managed",                                ch4_efac:0,     bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Minor poorly aerated zones",                  ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Some aerated zones",                          ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Activated Sludge - Not well managed",                            ch4_efac:0.18,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Aerated Lagoon",                                                 ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
    {name:"Trickling Filter",                                               ch4_efac:0.036, bod_rmvd_as_sludge_estm:0.65},
    {name:"Imhoff tank",                                                    ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
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

  "N2O EF plants (Table 6.8A)":[
    {name:"Select treatment type",                 n2o_efac:0      },
    {name:"Centralised, aerobic, treatment plant", n2o_efac:0.016  },
    {name:"Anaerobic reactor",                     n2o_efac:0      },
    {name:"Anaerobic lagoons",                     n2o_efac:0      },
    {name:"Septic tank",                           n2o_efac:0      },
    {name:"Septic tank + land dispersal field",    n2o_efac:0.0045 },
    {name:"Latrine",                               n2o_efac:0      },
  ],

  "N2O EF effluent (Table 6.8A)":[
    {name:"Select",                                                                                           n2o_efac:0    },
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
    {name:"Untreated systems",                                                                        bod_effl:1,     N_effl:1.00 },
    {name:"Septic tank/septic system",                                                                bod_effl:0.375, N_effl:0.85 },
    {name:"Septic tank/septic system + land dispersal field",                                         bod_effl:0.375, N_effl:0.32 },
    {name:"Latrines – Dry climate, groundwater table lower than latrine, small family (3–5 persons)", bod_effl:0.9,   N_effl:0.88 },
    {name:"Latrines – Dry climate, groundwater table lower than latrine, communal (many users)",      bod_effl:0.5,   N_effl:0.88 },
    {name:"Latrines – Wet climate/flush water use, groundwater table higher than latrine",            bod_effl:0.3,   N_effl:0.88 },
  ],

  //Andreoli et al table 2.2
  "Sludge characteristics in each stage of the treatment process":[
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

  //pump types 2
  "wwt_pmp_type":[
    {name:"Archimedean screw"},
    {name:"Centrifugal pump"},
    {name:"Propeller pump"},
    {name:"Vane pump"},
  ],

  //type of sludge disposed
  "Type of sludge disposed":[
    {name:"Non-digested", f_ch4:0.53, la_N_cont:3, TVS:0.70},
    {name:"Digested",     f_ch4:0.06, la_N_cont:4, TVS:0.51},
  ],

  //type of landfill
  "Type of landfill":[
    {name:"Landfill",                     ratio:1},
    {name:"Landfill (with gas recovery)", ratio:0.02},
    {name:"Landfill (flaring)",           ratio:0},
  ],

  //type of soil
  "Soil type":[
    {name:"Fine-Textured (>30% clay)",   f_la:0.023},
    {name:"Coarse-Textured (<30% clay)", f_la:0.005},
  ],

	//type of water reuse
  "wwt_reus_typ":[
    {name:"For non-potable use"},
    {name:"For green areas"},
    {name:"For industrial use"},
    {name:"For irrigation with resticted access"},
    {name:"For irrigation without restricted access"},
    {name:"For food crop irrigation"},
    {name:"For fishfarming"},
  ],

  //type of containment
  "Type of containment":[
    {name:"Select",                                                         ch4_efac:0,      ch4_efac_flooding:0,     BOD_conc_FS:0,    fs_density:0   },
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
  "Flooding containment":[
    {name:"no"},
    {name:"yes"},
  ],

  //type of onsite treatment
  "Type of onsite treatment":[
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
  "Type of disposal":[
    {name:"No disposal (open defecation)"},
    {name:"Landfilling"},
    {name:"Land application"},
    {name:"Dumping"},
  ],

  //type of faecal sludge for land application and landfilling
  "Type of faecal sludge":[
    {name:"Untreated",          N_content:0.24, TVS:0.700, total_solids:0.04},
    {name:"Treated",            N_content:3.00, TVS:0.400, total_solids:0.22},
    {name:"Pit humus",          N_content:4.00, TVS:0.650, total_solids:0.07},
    {name:"Dehydrated faeces",  N_content:3.00, TVS:0.700, total_solids:0.27},
    {name:"Compost",            N_content:3.00, TVS:0.800, total_solids:0.08},
    {name:"Septic tank sludge", N_content:0.03, TVS:0.600, total_solids:0.02},
  ],
};

//copy tables to all variables with magnitude=='Option'
//TODO: remove this section in favour of using the field 'table' in Info
/*
Tables.wwo_soil_typ      = Tables["Soil type"];
Tables.wwt_soil_typ      = Tables["Soil type"];
Tables.wwo_fslu_typ      = Tables["Type of faecal sludge"];
Tables.wwo_fslu_typ_lf   = Tables["Type of faecal sludge"];
Tables.wwo_fslu_typ_la   = Tables["Type of faecal sludge"];
Tables.wwt_slu_type      = Tables["Type of landfill"];
Tables.wwo_lf_type       = Tables["Type of landfill"];
Tables.wwo_dumping_pth   = Tables["type_of_water_body"];
Tables.wsa_fuel_typ      = Tables["Fuel type"];
Tables.wst_fuel_typ      = Tables["Fuel type"];
Tables.wsd_fuel_typ      = Tables["Fuel type"];
Tables.wsd_trck_typ      = Tables["Fuel type"];
Tables.wwc_fuel_typ      = Tables["Fuel type"];
Tables.wwt_fuel_typ      = Tables["Fuel type"];
Tables.wwt_trck_typ      = Tables["Fuel type"];
Tables.wwt_dige_typ      = Tables["Fuel type"];
Tables.wwt_reus_trck_typ = Tables["Fuel type"];
Tables.wwo_fuel_typ      = Tables["Fuel type"];
Tables.wwo_trck_typ      = Tables["Fuel type"];
Tables.wsa_pmp_type      = Tables["Pump type"];
Tables.wsa_pmp_size      = Tables["Pump size"];
Tables.wsd_pmp_size      = Tables["Pump size"];
Tables.wst_treatmen      = Tables["Potabilization chain"];
Tables.wwo_type_tre      = Tables["Type of onsite treatment"];
Tables.wwo_type_dis      = Tables["Type of disposal"];
Tables.wwo_type_con      = Tables["Type of containment"];
Tables.wwo_flooding      = Tables["Flooding containment"];
Tables.wwt_slu_disp      = Tables["Type of sludge disposed"];
*/

//get object by "table" (string) and "index" (integer)
Tables.get_row=function(table, index){
  let t=Tables[table]; //array
  if(!t) return false;
  return t[index]||false;
};
