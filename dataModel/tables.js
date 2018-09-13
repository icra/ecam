//Data structure for tabled values or dropdown menus
var Tables = {
	//fuel types for several filters
    "Fuel types": {             //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
      "Diesel"          :{value:0,EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
      "Gasoline/Petrol" :{value:1,EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
      "Natural Gas"     :{value:2,EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
    },

	//wsa
    "wsa_pmp_type":{
      "None":{value:0},
      "External":{value:1},
      "Submersible":{value:2},
    },
    "wsa_pmp_size":{
      "5.6 - 15.7 kW":{value:0},
      "15.7 - 38 kW":{value:1},
      "39 - 96 kW":{value:2},
      "> 96 kW":{value:3},
    },

	//wst
    "wst_disnfctn":{
      "None":{value:0},
      "Chlorination":{value:1},
      "UF":{value:2},
      "MF":{value:3},
      "Ozon":{value:4},
      "UV":{value:5},
    },
    "wst_treatmen":{
      "None":{value:0,},
      "Pre-ox/C/F/S/Filt/Des":{value:1,},
      "Pre-ox/C/F/Filt/Des":{value:2,},
      "C/F/S/Filt/Des":{value:3,},
      "C/F/Filt/Des":{value:4,},
      "Des":{value:5,},
      "Other":{value:6,},
    },

	//wsd
    "wsd_pmp_size":{
      "5.6 - 15.7 kW":{value:0},
      "15.7 - 38 kW":{value:1},
      "39 - 96 kW":{value:2},
      "> 96 kW":{value:3},
    },

	//wwc
    "wwc_pmp_type":{
      "None":{value:0},
      "External":{value:1},
      "Submersible":{value:2},
    },
    "wwc_pmp_size":{
      "5.6 - 15.7 kW":{value:0},
      "15.7 - 38 kW":{value:1},
      "39 - 96 kW":{value:2},
      "> 96 kW":{value:3},
    },

	//wwt
    "wwt_type_tre":{
      "Select":{value:0, ch4_efac:0, bod_rmvd_as_sludge_estm:0},
      "Activated Sludge - Well managed":{value:1,               ch4_efac:0,     bod_rmvd_as_sludge_estm:0.65},
      "Activated Sludge - Minor poorly aerated zones":{value:2, ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
      "Activated Sludge - Some aerated zones":{value:3,         ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.65},
      "Activated Sludge - Not well managed":{value:4,           ch4_efac:0.18,  bod_rmvd_as_sludge_estm:0.65},
      "Aerated Lagoon":{value:5,                                ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
      "Anaerobic Lagoon <2m depth":{value:6,                    ch4_efac:0.12,  bod_rmvd_as_sludge_estm:0.30},
      "Anaerobic Lagoon >2m depth":{value:7,                    ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
      "Anaerobic Lagoon covered":{value:8,                      ch4_efac:0,     bod_rmvd_as_sludge_estm:0.10},
      "Trickling Filter":{value:9,                              ch4_efac:0.036, bod_rmvd_as_sludge_estm:0.65},
      "UASB - CH4 recovery not considered":{value:10,           ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
      "UASB - CH4 recovery considered":{value:11,               ch4_efac:0.0,   bod_rmvd_as_sludge_estm:0.10},
      "Wetlands - Surface flow":{value:12,                      ch4_efac:0.24,  bod_rmvd_as_sludge_estm:0.30},
      "Wetlands - Horizontal subsurface flow":{value:13,        ch4_efac:0.06,  bod_rmvd_as_sludge_estm:0.65},
      "Wetlands - Vertical subsurface flow":{value:14,          ch4_efac:0.006, bod_rmvd_as_sludge_estm:0.65},
      "Imhoff tank":{value:15,                                  ch4_efac:0.48,  bod_rmvd_as_sludge_estm:0.10},
    },

    "wwt_main_tre":{
      "Activated sludge":{value:0},
      "Aerated Lagoon":{value:1},
      "Anaerobic Lagoon":{value:2},
      "Trickling Filter":{value:3},
      "UASB":{value:4},
      "Wetlands":{value:5},
    },
    "wwt_pmp_type":{
      "Archimedean screw":{value:0},
      "Centrifugal pump":{value:1},
      "Propeller pump":{value:2},
      "Vane pump":{value:3},
    },
    "wwt_slu_disp":{
      "Non-digested":{value:0},
      "Digested":{value:1},
    },
    "wwt_slu_type":{
      "Landfill":{value:0},
      "Landfill (with gas recovery)":{value:1},
      "Landfill (flaring)":{value:2},
    },
    "wwt_soil_typ":{
      "Fine-Textured (>30% clay)":{value:0},
      "Coarse-Textured (<30% clay)":{value:1},
    },

	//wwd
    "wwd_reus_typ":{
      "For non-potable use":{value:0},
      "For green areas":{value:1},
      "For industrial use":{value:2},
      "For irrigation with resticted access":{value:3},
      "For irrigation without restricted access":{value:4},
      "For food crop irrigation":{value:5},
      "For fishfarming":{value:6},
    },

  //fsc
    "fsc_type_tre":{
      "Select":{ value:0, ch4_efac:0, ch4_efac_flooding:0, BOD_conc_FS:0, fs_density:1400},
      "Pit latrine without flush water – household":{ value:1, ch4_efac:0.06, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
      "Pit latrine without flush water (lined or unlined) – communal":{ value:2, ch4_efac:0.3, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
      "Pit latrine with flush water use (lined or unlined)":{ value:3, ch4_efac:0.42, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
      "Septic Tank":{ value:4, ch4_efac:0.3, ch4_efac_flooding:0.42, BOD_conc_FS:1.35, fs_density:1100},
      "Fully lined tank without flush water use – household":{ value:5, ch4_efac:0.06 , ch4_efac_flooding:0.42 , BOD_conc_FS:67.8, fs_density:1400},
      "Fully lined tank without flush water use – communal":{ value:6, ch4_efac:0.3 , ch4_efac_flooding:0.42 , BOD_conc_FS:67.8, fs_density:1400},
      "Fully lined tank with flush water use":{ value:7, ch4_efac:0.42 , ch4_efac_flooding:0.42 , BOD_conc_FS:67.8, fs_density:1400},
      "Urine Diverting Dry Toilet (UDDT)":{ value:8, ch4_efac:0.0, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
      "Composting Toilet":{ value:9, ch4_efac:0.0013, ch4_efac_flooding:0.42, BOD_conc_FS:67.8, fs_density:1400},
      "No containment":{ value:10, ch4_efac:0, ch4_efac_flooding:0, BOD_conc_FS:67.8, fs_density:1400},
    },
    "fsc_flooding":{
      "no":{value:0},
      "yes":{value:1},
    },

  //fst
    "fst_type_tre":{
      "No Treatment":{                                     value: 0, ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.0,},
      "Anaerobic Digester":{                               value: 1, ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
      "Imhoff Tanks":{                                     value: 2, ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
      "Anaerobic Reactors - CH4 recovery not considered":{ value: 3, ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
      "Anaerobic Reactors - CH4 recovery considered":{     value: 4, ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.10,},
      "Stabilization Ponds (<2 m depth)":{                 value: 5, ch4_efac:0.12,   bod_rmvd_as_sludge_estm:0.30,},
      "Stabilization Ponds (> 2m depth)":{                 value: 6, ch4_efac:0.48,   bod_rmvd_as_sludge_estm:0.10,},
      "Sludge Drying Beds":{                               value: 7, ch4_efac:0.00,   bod_rmvd_as_sludge_estm:0.0,},
      "Wetlands - surface flow":{                          value: 8, ch4_efac:0.24,   bod_rmvd_as_sludge_estm:0.30,},
      "Wetlands - Horizontal subsurface flow":{            value: 9, ch4_efac:0.06,   bod_rmvd_as_sludge_estm:0.65,},
      "Wetlands - Vertical subsurface flow":{              value:10, ch4_efac:0.006,  bod_rmvd_as_sludge_estm:0.65,},
      "Composting":{                                       value:11, ch4_efac:0.0013, bod_rmvd_as_sludge_estm:0.0,},
      "Activated Sludge (well managed)":{                  value:12, ch4_efac:0.0000, bod_rmvd_as_sludge_estm:0.65,},
      "Activated Sludge - minor poorly aerated zones":{    value:13, ch4_efac:0.06,   bod_rmvd_as_sludge_estm:0.65,},
      "Activated Sludge - Some aerated zones":{            value:14, ch4_efac:0.12,   bod_rmvd_as_sludge_estm:0.65,},
      "Activated Sludge - Not well managed":{              value:15, ch4_efac:0.18,   bod_rmvd_as_sludge_estm:0.65,},
      "Trickling Filter":{                                 value:16, ch4_efac:0.036,  bod_rmvd_as_sludge_estm:0.65,},
    },

  //fsr
    "fsr_type_tre":{
      "Landfilling":{      value:0, },
      "Land application":{ value:1, },
      "Dumping":{          value:2, },
    },
    "fsr_fslu_typ":{ //faecal sludge type for land application and landfilling
      "Untreated":{                     value:0, N_content:0.10, TVS:0.650}, //provisional numbers, waiting for issue #168 TODO
      "Treated":{                       value:1, N_content:0.10, TVS:0.344}, //provisional numbers, waiting for issue #168 TODO
      "Pit humus":{                     value:2, N_content:0.10, TVS:0.100}, //provisional numbers, waiting for issue #168 TODO
      "Dehydrated faeces":{             value:3, N_content:0.10, TVS:0.100}, //provisional numbers, waiting for issue #168 TODO
      "Compost":{                       value:4, N_content:0.10, TVS:0.100}, //provisional numbers, waiting for issue #168 TODO
      "No disposal (open defecation)":{ value:5, N_content:0.10, TVS:0.100}, //provisional numbers, waiting for issue #168 TODO
      "Septic tank sludge":{            value:6, N_content:0.10, TVS:0.100}, //provisional numbers, waiting for issue #168 TODO
    },

    "fsr_soil_typ":{
      "Fine-Textured (>30% clay)":{value:0},
      "Coarse-Textured (<30% clay)":{value:1},
    },
    "fsr_disp_typ":{
      "Landfill":{value:0},
      "Landfill (flaring)":{value:1},
      "Landfill (with gas recovery)":{value:2},
    },
    "fsr_dumping_pth":{
      "Select dumping pathway":{value:0,                 ch4_efac:0},
      "Stagnant sewer or anaerobic water body":{value:1, ch4_efac:0.3},
      "Sear or aerobic water bodies":{value:2,           ch4_efac:0.06},
      "Fast moving well maintained sewers":{value:3,     ch4_efac:0},
    },
}

//copy fuel options for all stages
Tables.wsa_fuel_typ=Tables["Fuel types"]; //engines
Tables.wst_fuel_typ=Tables["Fuel types"]; //engines
Tables.wsd_fuel_typ=Tables["Fuel types"]; //engines
Tables.wwc_fuel_typ=Tables["Fuel types"]; //engines
Tables.wwt_fuel_typ=Tables["Fuel types"]; //engines
Tables.wwd_fuel_typ=Tables["Fuel types"]; //engines
Tables.fst_fuel_typ=Tables["Fuel types"]; //type of fuel fsm treatment engines
Tables.fsr_fuel_typ=Tables["Fuel types"]; //type of fuel fsm treatment engines
Tables.wsd_trck_typ=Tables["Fuel types"]; //trucks
Tables.wwt_trck_typ=Tables["Fuel types"]; //trucks
Tables.wwd_trck_typ=Tables["Fuel types"]; //trucks
Tables.fsc_trck_typ=Tables["Fuel types"]; //type of fuel fsm emptying and transport
Tables.fst_trck_typ=Tables["Fuel types"]; //type of fuel fsm emptying and transport
Tables.fsr_trck_typ=Tables["Fuel types"]; //type of fuel fsm emptying and transport
Tables.wwt_dige_typ=Tables["Fuel types"]; //type of fuel dig
Tables.wwt_appl_typ=Tables["Fuel types"]; //type of fuel app

//copy options for faecal sludge type in fst for landapp and landfill
Tables.fsr_fslu_typ_lf=Tables.fsr_fslu_typ;
Tables.fsr_fslu_typ_la=Tables.fsr_fslu_typ;

//find the option (string) by field (string) and value (float or int)
Tables.find=function(field,value) {
	for(var option in Tables[field]) {
		if(value==Tables[field][option].value) {
			return option;
		}
	}
	return false;
}
