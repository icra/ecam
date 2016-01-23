/**
	Wait for Mario to gather all this information
		Fuel types
		Protein per country
		MCF
		N2O emission factor (jose porro external excel)
*/

var Tables = {
	"Fuel types": //(kg/TJ) but NCV (TJ/Gg)
	{
		"Gas / Diesel Oil"  :{ "EFCO2":74100, "EFCH4":3, "EFN2O":0.6, "NCV":43,   },
		"Gasoline / Petrol" :{ "EFCO2":69300, "EFCH4":3, "EFN2O":0.6, "NCV":44.3, },
		"Natural Gas"       :{ "EFCO2":56100, "EFCH4":1, "EFN2O":0.1, "NCV":48,   },
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
