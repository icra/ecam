
var Tables = 
{
	"Fuel types": //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
	{
		"Diesel"          :{EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
		"Gasoline/Petrol" :{EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
		"Natural Gas"     :{EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
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

	"Technologies":{//TODO
		"Waste":{
			"None":{},
			"Primary treatment (PT)":{},
			"Trickling filters (TF)":{},
			"Activated sludge (AS)":{},
			"AS and Coagulation/Filtration (C/F)":{},
			"AS nitrification and C/F":{},
			"Aerated Laggons":{},
			"Anaerobic Laggons":{},
			"UASB":{},
			"Artificial Wetlands":{},
			"Other":{},
		},
	},
}

Tables.find=function(field,value)
{
	for(var option in Tables[field])
	{
		if(value==Tables[field][option].value)
			return option
	}
	return false
}

