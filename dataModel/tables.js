
var Tables = 
{
	"Fuel types": //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
	{
		"Diesel"          :{EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
		"Gasoline/Petrol" :{EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
		"Natural Gas"     :{EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
	},

	"Countries":
	{
		"Peru":0,
		"Thailand":0,
		"Mexico":0,
		"Other":0,
	},

	/** Technologies for wst and wwt (table not used right now). I was told that this will be used for benchmarking */
	"Technologies":{
		"Water":{
			"None":{},
			"Pre-ox/C/F/S/Filt/Des":{},
			"Pre-ox/C/F/Filt/Des":{},
			"C/F/S/Filt/Des":{},
			"C/F/Filt/Des":{},
			"Des":{},
			"Other":{},
		},
		"Waste":{
			"None":{},
			"Trickling filters (TF)":{},
			"Activated sludge (AS)":{},
			"AS and Coagulation/Filtration (C/F)":{},
			"AS nitrification and C/F":{},
			"Laggons":{},
			"Other":{},
		},
	},
}
