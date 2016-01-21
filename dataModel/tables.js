/**
	wait for mario to gather all this information
		fuel types
		protein per country
		MCF
		n2o emission factor (jose porro external excel)
*/
var Tables =
{
	"Fuel types": //units: all (kg/TJ) but NCV (TJ/Gg)
	{
		"Gasoline / Petrol":{
			EFCO2:69300,
			EFCH4:3,
			EFN2O:0.6,
			NCV:44.3,
		},
		"Gas / Diesel Oil":{
			EFCO2:74100,
			EFCH4:3,
			EFN2O:0.6,
			NCV:43,
		},
		"Natural Gas":{
			EFCO2:56100,
			EFCH4:1,
			EFN2O:0.1,
			NCV:48,
		},
	},

	"BOD":  /* [g/person/day]. Table 6.4 */
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

	//Methane conversion factor
	"MCF":
	{
		"":0,	
	},
}
