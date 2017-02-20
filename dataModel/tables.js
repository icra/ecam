
var Tables = 
{
	//fuel types
	"Fuel types": //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
	{
		"Diesel"          :{value:0,EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
		"Gasoline/Petrol" :{value:1,EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
		"Natural Gas"     :{value:2,EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
	},
	
	//wsa
	"wsa_watr_src":{
		"Groundwater":{value:0},
		"Surface":{value:1},
		"Rainwater":{value:2},
	},
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
		"Activated Sludge - Well managed":{value:0,               ch4_efac:0},
		"Activated Sludge - Minor poorly aerated zones":{value:1, ch4_efac:0.06},
		"Activated Sludge - Some aerated zones":{value:2,         ch4_efac:0.12},
		"Activated Sludge - Not well managed":{value:3,           ch4_efac:0.18},
		"Aerated Lagoon":{value:4,                                ch4_efac:0.18},
		"Anaerobic Lagoon <2m depth":{value:5,                    ch4_efac:0.12},
		"Anaerobic Lagoon >2m depth":{value:6,                    ch4_efac:0.48},
		"Anaerobic Lagoon covered":{value:7,                      ch4_efac:0}, //MISSING VALUE
		"Trickling Filter":{value:8,                              ch4_efac:0.036},
		"UASB - CH4 recovery not considered":{value:9,            ch4_efac:0.48},
		"UASB - CH4 recovery considered":{value:10,               ch4_efac:0.3},
		"Wetlands - Surface flow":{value:11,                      ch4_efac:0.24},
		"Wetlands - Horizontal subsurface flow":{value:12,        ch4_efac:0.06},
		"Wetlands - Vertical subsurface flow":{value:13,          ch4_efac:0.006},
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
		"Primary":{value:0},
		"Digested":{value:1},
	},
	"wwt_slu_type":{
		"Covered landfill with gas recovery":{value:0},
		"Covered landfill (flaring)":{value:1},
		/*"Land application":{value:0},
		"Open landfill":{value:1},
		"Incineration with heat recovery":{value:4},
		"Composting":{value:5},
		"Stockpiling":{value:6},
		"Other":{value:7},
		*/
	},
	"wwt_soil_typ":{
		"Fine-Textured":{value:0},
		"Coarse-Textured":{value:1},
		"Other":{value:2},
	},

	//wwd
	"wwd_reus_typ":{
		"Volume of water discharged for non-potable use":{value:0},
		"Volume of reused water for green areas":{value:1},
		"Volume of reused water for industrial use":{value:2},
		"Volume of reused water for irrigation with resticted access":{value:3},
		"Volume of reused water for irrigation without restricted access":{value:4},
		"Volume of reused water food crop irrigation":{value:5},
		"Volume of reused water for fishfarming":{value:6},
	},
}

//copy fuel options for all stages
Tables.wsa_fuel_typ=Tables["Fuel types"];
Tables.wst_fuel_typ=Tables["Fuel types"];
Tables.wsd_fuel_typ=Tables["Fuel types"];
Tables.wwc_fuel_typ=Tables["Fuel types"];
Tables.wwt_fuel_typ=Tables["Fuel types"];
Tables.wwd_fuel_typ=Tables["Fuel types"];
Tables.wsd_trck_typ=Tables["Fuel types"]; //trucks
Tables.wwt_trck_typ=Tables["Fuel types"]; //trucks
Tables.wwd_trck_typ=Tables["Fuel types"]; //trucks
Tables.wwt_dige_typ=Tables["Fuel types"]; //type of fuel dig afegida per mi
Tables.wwt_appl_typ=Tables["Fuel types"]; //type of fuel app afegida per mi

//find the option name by value
Tables.find=function(field,value)
{
	for(var option in Tables[field])
	{
		if(value==Tables[field][option].value)
			return option
	}
	return false
}
