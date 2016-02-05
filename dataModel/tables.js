var Tables = {
	"Fuel types": //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
	{
		"Gas/Diesel Oil"  :{EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
		"Gasoline/Petrol" :{EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
		"Natural Gas"     :{EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
	},

	"Countries": //selection for: location and conversion factor uw1
	{
		"Africa":0,
		"Egypt":0,
		"Asia, Middle East, Latin America":0,
		"India":0,
		"West Bank and Gaza Strip (Palestine)":0,
		"Japan":0,
		"Brazil":0,
		"Canada, Europe, Russia, Oceania":0,
		"Denmark":0,
		"Germany":0,
		"Greece":0,
		"Italy":0,
		"Sweden":0,
		"Turkey":0,
		"United States":0,
	},

	/** Technologies for Water/Waste Treatment */
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
