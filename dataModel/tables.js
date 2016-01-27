/**
	Wait for Mario to gather all this information
		Protein per country
		MCF
		N2O emission factor (jose porro external excel)
*/

var Tables = {
	"Fuel types": //EFxxx: [kg/TJ], NCV: [TJ/Gg], FD: [kg/L].
	{
		"Gasoline/Petrol" :{EFCH4:{engines:3,vehicles:3.8},EFN2O:{engines:0.6,vehicles:1.9},EFCO2:69300,FD:0.74,NCV:44.3},
		"Gas/Diesel Oil"  :{EFCH4:{engines:3,vehicles:3.9},EFN2O:{engines:0.6,vehicles:3.9},EFCO2:74100,FD:0.84,NCV:43.0},
		"Natural Gas"     :{EFCH4:{engines:10,vehicles:92},EFN2O:{engines:0.1,vehicles:0.2},EFCO2:56100,FD:0.75,NCV:48.0},
	},

	"Countries":  /* BOD [g/person/day]. Table 6.4 */
	{
		"Africa":37,
		"Egypt":34,
		"Asia, Middle East, Latin America":40,
		"India":34,
		"West Bank and Gaza Strip (Palestine)":50,
		"Japan":42,
		"Brazil":50,
		"Canada, Europe, Russia, Oceania":60,
		"Denmark":62,
		"Germany":62,
		"Greece":57,
		"Italy":60,
		"Sweden":75,
		"Turkey":38,
		"United States":85,
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
