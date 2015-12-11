/** Format:

 	code:
 	{
 		description : string,
		magnitude	: string,
		unit		: string,
		level		: string,
		sublevel 	: string, [optional]
 	},

 */
var Info =
{
	//1. UWS
	"gV1":{
		"description"	:"Assessment period",
		"magnitude"		:"Time",
		"unit"			:"Days",
		"level"			:"UWS",
	},
	"gV2":{
		"description"	:"Energy costs",
		"magnitude"		:"Currency",
		"unit"			:"USD",
		"level"			:"UWS",
	},
	"gV3":{
		"description":"Running costs",
		"magnitude":"Currency",
		"unit":"eur",
		"level":"UWS",
	},
	"gV9":{
		"description":"Energy mix emissions",
		"magnitude":"Ratio",
		"unit":"kg CO2/kWh",
		"level":"UWS",
	},

	//2. WATER SUPPLY
	"sV13":{
		"description":"Serviced population in supply systems",
		"magnitude":"Inhab",
		"unit":"Inhab",
		"level":"Water",
	},
	"gV8w":{
		"description":"Resident population within the water utility area of service",
		"magnitude":"Inhab",
		"unit":"Inhab",
		"level":"Water",
	},
	"gV2w":{
		"description":"Energy costs of the water utility",
		"magnitude":"Currency",
		"unit":"USD",
		"level":"Water",
	},
	"gV3w":{
		"description":"Running costs of the utility related to the urban drinking water system",
		"magnitude":"Currency",
		"unit":"USD",
		"level":"Water",
	},
	"gV10w":{
		"description":"Total energy consumed from the grid (from power bills) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
		"level":"Water",
	},
	"dV1":{
		"description":"Total volume produced for urban drinking water system",
		"magnitude":"Volume",
		"unit":"m3",
		"level":"Water",
	},
	"sV8":{
		"description":"Volume of authorized consumption",
		"magnitude":"Volume",
		"unit":"m3",
		"level":"Water",
	},
	"dD1":{
		"description":"Direct CO2 emitted in urban drinking water system from on-site engines",
		"magnitude":"kg CO2",
		"unit":"Mass",
		"level":"Water",
	},
	"gV4w":{
		"description":"Total eletrical energy consumed from the grid and from self-production related to the urban drinking water system (kWh)",
		"magnitude":"",
		"unit":"",
		"level":"Water",
	},
	"gV11w":{
		"description":"Net total process related grid energy consumed by the utility 	(kWh)",
		"magnitude":"",
		"unit":"",
		"level":"Water",
	},
	"gV5w":{
		"description":"Electrical energy produced by the utility  in urban drinking water system		(kWh)",
		"magnitude":"",
		"unit":"",
		"level":"Water",
	},
	"gV6w":{
		"description":"Non water related Renewable electricity production by the utility in urban drinking water system	(kWh)",
		"magnitude":"",
		"unit":"",
		"level":"Water",
	},
	"gV7w":{
		"description":"CO2e of heat used for District heating or cooling from urban  drinking water system	(kg CO2)",
		"magnitude":"",
		"unit":"",
		"level":"Water",
	},

		//2.1 Abstraction
			"aV1" :
			{
				"description":"Energy consumed for pumping abstracted water",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV2" :
			{
				"description":"abstracted water volume pumped x pump head in meters",
				"magnitude":"undefined",
				"unit":"m3 x 100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV3" :
			{
				"description":"Energy recovered in abstracted water",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV4" :
			{
				"description":"turbine water volume pumped x turbine head in meters",
				"magnitude":"undefined",
				"unit":"m3 x 100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV5" :
			{
				"description":"Water losses",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV6" :
			{
				"description":"Mains lenght",
				"magnitude":"Distance",
				"unit":"km",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aV7" :
			{
				"description":"Friction pipe losses",
				"magnitude":"Headloss",
				"unit":"m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE1" :
			{
				"description":"Energy consumption per conveyed water ",
				"magnitude":"Energy/Volume",
				"unit":"kWh/m3",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE2" :
			{
				"description":"Energy consumption of abstracted water per total energy consumption ",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE3" :
			{
				"description":"Standardised Energy Consumption ",
				"magnitude":"undefined",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE4" :
			{
				"description":"Energy recovery per conveyed water ",
				"magnitude":"undefined",
				"unit":"kWh/m3",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE5" :
			{
				"description":"Standardized energy recovery ",
				"magnitude":"undefined",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE6" :
			{
				"description":"Water losses per mains length ",
				"magnitude":"undefined",
				"unit":"m3/km/d",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE7" :
			{
				"description":"Unit head loss ",
				"magnitude":"undefined",
				"unit":"m/km",
				"level":"Water",
				"sublevel":"Abstraction",
			},
		//2.2 Treatment
			"tV1":
			{
				"description":"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV2"  :
			{
				"description":"Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV3"  :
			{
				"description":"Volume of treated water in WTPs with C/F/S/Filt/Des",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV4"  :
			{
				"description":"Volume of treated water in WTPs with C/F/Filt/Des",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV5"  :
			{
				"description":"Volume of treated water in WTPs with Des",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV6"  :
			{
				"description":"Volume of treated water in WTPs with other sequence",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV7":
			{
				"description":"Energy consumed in WTPs",
				"magnitude":"undefined",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV8":
			{
				"description":"Sludge produced in WTPs",
				"magnitude":"undefined",
				"unit":"kg",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV9":
			{
				"description":"Treatment capacity",
				"magnitude":"undefined",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE0":
			{
				"description":"Treatment type (volume per type)",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE01":
			{
				"description":"WTPs with Pre-ox/C/F/S/Filt/Des",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE02":
			{
				"description":"WTPs with Pre-ox/C/F/Filt/Des",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE03":
			{
				"description":"WTPs with C/F/S/Filt/Des",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE04":
			{
				"description":"WTPs with C/F/Filt/Des",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE05":
			{
				"description":"WTPs with Des",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE06":
			{
				"description":"WTPs with other sequence",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE1":
			{
				"description":"Energy consumption per treated water ",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE2":
			{
				"description":"Energy consumption of WTPs per total energy consumption ",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE3":
			{
				"description":"Sludge production",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE4":
			{
				"description":"Capacity utilisation ",
				"magnitude":"undefined",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
		//2.3 Distribution
			"dV1":
			{
				"description":"Volume injected",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV2":
			{
				"description":"Minimum pressure to be supplied at the distribution nodes",
				"magnitude":"Pressure",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV3":
			{
				"description":"Highest node elevation",
				"magnitude":"Distance",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV4":
			{
				"description":"Lowest node elevation of the stage",
				"magnitude":"Distance",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV5":
			{
				"description":"Average nodes elevation",
				"magnitude":"Distance",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV6":
			{
				"description":"Water table elevation node",
				"magnitude":"Distance",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV7":
			{
				"description":"Energy consumed for pumping distributed water",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV8":
			{
				"description":"[Sum](distributed water volume pumped x pump head in meters)",
				"magnitude":"undefined",
				"unit":"m3 x 100 m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV9":
			{
				"description":"Natural energy provided",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV10":
			{
				"description":"Energy recovered at water distribution",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV11":
			{
				"description":"Minimum required energy by users",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV12":
			{
				"description":"Total supplied energy to the network (natural plus shaft), real system",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV13":
			{
				"description":"Topographic energy supplied to the system",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV14":
			{
				"description":"Total supplied energy to the network, assuming the system has no losses",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV15":
			{
				"description":"Mains lenght",
				"magnitude":"Distance",
				"unit":"km",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV16":
			{
				"description":"Friction pipe losses",
				"magnitude":"Headloss",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE1":
			{
				"description":"Energy consumption per authorized consumption",
				"magnitude":"undefined",
				"unit":"kWh/m3",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE2":
			{
				"description":"Energy consumption of authorized consumption per total energy consumption",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE3":
			{
				"description":"Standardised Energy Consumption",
				"magnitude":"Ratio",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE4":
			{
				"description":"Global water distribution energy efficiency",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE5":
			{
				"description":"Percentage of topographic energy",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE6":
			{
				"description":"Water losses per mains length",
				"magnitude":"Ratio",
				"unit":"m3/km/d",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE7":
			{
				"description":"Unit head loss",
				"magnitude":"Ratio",
				"unit":"m/km",
				"level":"Water",
				"sublevel":"Distribution",
			},
	//3. WASTEWATER
		"wsV1":
		{
			"description":"Volume of collected wastewater",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV2":
		{
			"description":"Resident population connected to SE",
			"magnitude":"Inhab",
			"unit":"Inhab",
			"level":"Waste",
		},
		"wsV3":
		{
			"description":"Wastewater resident population",
			"magnitude":"Inhab",
			"unit":"Inhab",
			"level":"Waste",
		},
		"wsV4":
		{
			"description":"Volume of treatedwastewater",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV5":
		{
			"description":"Wastewater treated by on-site systems",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV6":
		{
			"description":"Tests complying with dischargeconsents",
			"magnitude":"Number",
			"unit":"num",
			"level":"Waste",
		},
		"wsV7":
		{
			"description":"Tests carried out in WWTPs",
			"magnitude":"Number",
			"unit":"num",
			"level":"Waste",
		},
		"wsV8":
		{
			"description":"Volume of discharged wastewater",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Waste",
		},
		"wS1":
		{
			"description":"Resident population connected to sewer system",
			"magnitude":"Ratio",
			"unit":"%",
			"level":"Waste",
		},
		"wS2":
		{
			"description":"Treated Wastewater in WWTP",
			"magnitude":"Ratio",
			"unit":"%",
			"level":"Waste",
		},
		"wS3":
		{
			"description":"WWTP compliance with discharge consents",
			"magnitude":"Ratio",
			"unit":"%",
			"level":"Waste",
		},
		//3.1 Collection
			"wcV1":
			{
				"description":"Energy consumed for pumping collected wastewater",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcV2":
			{
				"description":"collected wastewater volume pumped x pump head in meters",
				"magnitude":"Ratio",
				"unit":"m3 x 100m",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE1":
			{
				"description":"Energy consumption per collected wastewater",
				"magnitude":"Ratio",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE2":
			{
				"description":"Energy consumption of collected wastewater per total energy consumption",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE3":
			{
				"description":"Standardised Energy Consumption",
				"magnitude":"Ratio",
				"unit":"kWh/m3/100m",
				"level":"Waste",
				"sublevel":"Collection",
			},
		//3.2 Treatment
			"wtV1":
			{
				"description":"Volume of treated wastewater in WWTPs with trickling filters (TF)",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV2":
			{
				"description":"Volume of treated wastewater in WWTPs with activated sludge (AS)",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV3":
			{
				"description":"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV4":
			{
				"description":"Volume of treated wastewater in WWTPs with AS nitrification and C/F",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV5":
			{
				"description":"Volume of treated wastewater in WWTPs with Laggons",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV6":
			{
				"description":"Volume of treated wastewater in WWTPs with other type of treatment",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV7":
			{
				"description":"Energy consumed in WWTPs",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV8":
			{
				"description":"BOD mass removed",
				"magnitude":"Mass",
				"unit":"kg BOD",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV9":
			{
				"description":"Energy produced in WWTPs",
				"magnitude":"Energy",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV10":
			{
				"description":"Sludge produced in WWTPs",
				"magnitude":"Mass",
				"unit":"kg",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV11":
			{
				"description":"Dry weight in sludge produced",
				"magnitude":"Ratio",
				"unit":"% (w/w)",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV12":
			{
				"description":"Treatment capacity",
				"magnitude":"Volume",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV13":
			{
				"description":"BOD influent",
				"magnitude":"Concentration",
				"unit":"mg/l",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE0":
			{
				"description":"Treatment type (volume per type)",
				"magnitude":"Ratio",
				"unit":"% of each treatment",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE01":
			{
				"description":"WWTPs with trickling filters (TF)",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE02":
			{
				"description":"WWTPs with activated sludge (AF)",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE03":
			{
				"description":"WWTPs with AS and Coagulation/Filtration (C/F)",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE04":
			{
				"description":"WWTPs with AS nitrification and C/F ",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE05":
			{
				"description":"WWTPs with Lagoons",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE06":
			{
				"description":"WWTPs with other type of treatment",
				"magnitude":"Ratio",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE1":
			{
				"description":"Energy consumption per treated wastewater",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE2":
			{
				"description":"Energy consumption of WWTPs per total energy consumption",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE3":
			{
				"description":"Energy consumption per mass removed",
				"magnitude":"",
				"unit":"kWh/Kg BOD",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE4":
			{
				"description":"Energy production",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE5":
			{
				"description":"Sludge production",
				"magnitude":"",
				"unit":"kg/m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE6":
			{
				"description":"Dry weight in sludge production",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE7":
			{
				"description":"Capacity utilisation ",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
		//3.3 Discharge
			"wdV1":
			{
				"description":"Energy consumed for pumping dischargedwastewater",
				"magnitude":"",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdV2":
			{
				"description":"discharged wastewater volume pumped x pump head inmeters",
				"magnitude":"",
				"unit":"m3 x 100m",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdV3":
			{
				"description":"Energy recovered in wastewaterdischarged",
				"magnitude":"",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdV4":
			{
				"description":"turbine water volume pumped x  turbine head inmeters",
				"magnitude":"",
				"unit":"m3 x 100m",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdE1":
			{
				"description":"Energy consumption per discharged wastewater",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdE2":
			{
				"description":"Energy consumption of discharged wastewater per total energy consumption",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdE3":
			{
				"description":"Standardised Energy Consumption",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdE4":
			{
				"description":"Energy recovery per discharged water",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Discharge",
			},
			"wdE5":
			{
				"description":"Standardized energy recovery",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Waste",
				"sublevel":"Discharge",
			},

	//4. EMISSIONS
		"dD1":
		{
			"description":"Direct CO2 emitted in urban drinking water system from on-site engines",
			"magnitude":"",
			"unit":"kg CO2",
		},
		"dW1":
		{
			"description":"Direct CO2 emitted in wastewater stages from on-site engines",
			"magnitude":"",
			"unit":"kg CO2",
		},
		"dM1":
		{
			"description":"Methane (CH4) emitted",
			"magnitude":"",
			"unit":"kg CO2",
		},
		"dN1":
		{
			"description":"Nitrous oxide (N2O) emitted",
			"magnitude":"",
			"unit":"kg CO2",
		},
		/*4.1. DIRECT EMISSIONS*/
			"g_dGHG":
			{
				"description":"Total direct GHG Emissions per capita",
				"magnitude":"",
				"unit":"CO2e Kg/Inhab/year",
			},
			"s_dGHG":
			{
				"description":"Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water", 
				"magnitude":"",
				"unit":"CO2e Kg/m3",
			},
			"ws_dGHG":
			{
				"description":"Direct GHG emissions in wastewater stages per volume of treated wastewater", 
				"magnitude":"",
				"unit":"CO2e Kg/ m3",
			},
			"wt_dGHG":
			{
				"description":"Direct GHG emissions in wastewater treatment per BOD eliminated", 
				"magnitude":"",
				"unit":"CO2e Kg/ BODremoved",
			},
		/*4.2. INDIRECT EMISSIONS*/
			"iS1":
			{
				"description":"Indirect CO2e emitted in sludge transport",
				"magnitude":"",
				"unit":"kg CO2e",
			},
			"iN1":
			{
				"description":"Indirect CO2e emitted from wastewater effluent",
				"magnitude":"",
				"unit":"kg CO2e",
			},
			"ws_iGHG1":
			{
				"description":"Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet", 
				"magnitude":"",
				"unit":"CO2e kg / % DW",
			},
			"wt_iGHG1":
			{
				"description":"Sludge transport indirect GHG Emissions per dry weight of sludge", 
				"magnitude":"",
				"unit":"CO2e Kg/ m3",
			},
}
