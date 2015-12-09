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
	//1. GLOBAL
		"gV1":
		{
			"description"	:"Assessment period",
			"magnitude"		:"Time",
			"unit"			:"Days",
			"level"			:"Global",
		},
		"gV2":
		{
			"description"	:"Energy costs",
			"magnitude"		:"Currency",
			"unit"			:"USD",
			"level"			:"Global",
		},
		"gV2w":
		{
			"description":"Energy costs of the water utility",
			"magnitude":"Currency",
			"unit":"USD",
			"level":"Global",
		},
		"gV2ww":
		{
			"description":"Energy costs of the wastewater utility",
			"magnitude":"Currency",
			"unit":"USD",
			"level":"Global",
		},
		"gV3":
		{
			"description":"Running costs",
			"magnitude":"Currency",
			"unit":"eur",
			"level":"Global",
		},
		"gV4":
		{
			"description":"Total energy consumed",
			"magnitude":"Energy",
			"unit":"kWh",
			"level":"Global",
		},
		"gV5":
		{
			"description":"Resident population within the utility area of service",
			"magnitude":"inhab",
			"unit":"inhab",
			"level":"Global",
		},
		"gV6":
		{
			"description":"Energy mix consumded",
			"magnitude":"?",
			"unit":"CO2/kWh",
			"level":"Global",
		},
		"gE1":
		{
			"description":"Energy Cost Ratio",
			"magnitude":"?",
			"unit":"N/A",
			"level":"Global",
		},
		"gE2":
		{
			"description":"Per capita energy consumption",
			"magnitude":"?",
			"unit":"kWh/inhab/year",
			"level":"Global",
		},
		"GHG":
		{
			"description":"Per capita GHG emissions",
			"magnitude":"?",
			"unit":"CO2e kg/inhab/year",
			"level":"Global",
		},
	//2. WATER SUPPLY
		"sV1":
		{
			"description":"Volume of Conveyed Water",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Water",
		},
		"sV2":
		{
			"description":"Volume of Treated Water",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Water",
		},
		"sV3":
		{
			"description":"Treated Water quality tests carried out",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV4":
		{
			"description":"Compliance of aesthetic tests",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV5":
		{
			"description":"Compliance of microbiological tests",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV6":
		{
			"description":"Compliance of physical-chemical tests",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV7":
		{
			"description":"Compliance of radioactivity tests",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV8":
		{
			"description":"Volume of authorized consumption",
			"magnitude":"Volume",
			"unit":"m3",
			"level":"Water",
		},
		"sV9":
		{
			"description":"Delivery points with adequate pressure",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV10":
		{
			"description":"Number of service connections",
			"magnitude":"Number",
			"unit":"num",
			"level":"Water",
		},
		"sV11":
		{
			"description":"Time system is pressurised",
			"magnitude":"Time",
			"unit":"hours",
			"level":"Water",
		},
		"sV12":
		{
			"description":"Resident population connected to supply systems",
			"magnitude":"Inhab",
			"unit":"Inhab",
			"level":"Water",
		},
		"sV13":
		{
			"description":"Water supply resident population",
			"magnitude":"inhab",
			"unit":"Inhab",
			"level":"Water",
		},
		"S1":
		{
			"description":"Quality of supplied water",
			"magnitude":"?",
			"unit":"%",
			"level":"Water",
		},
		"S2":
		{
			"description":"Pressure of supply adequacy",
			"magnitude":"?",
			"unit":"%",
			"level":"Water",
		},
		"S3":
		{
			"description":"Continuity of supply",
			"magnitude":"?",
			"unit":"%",
			"level":"Water",
		},
		"S4":
		{
			"description":"Resident population connected to supply system",
			"magnitude":"?",
			"unit":"%",
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
				"magnitude":"?",
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
				"magnitude":"?",
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
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE3" :
			{
				"description":"Standardised Energy Consumption ",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE4" :
			{
				"description":"Energy recovery per conveyed water ",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE5" :
			{
				"description":"Standardized energy recovery ",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE6" :
			{
				"description":"Water losses per mains length ",
				"magnitude":"",
				"unit":"m3/km/d",
				"level":"Water",
				"sublevel":"Abstraction",
			},
			"aE7" :
			{
				"description":"Unit head loss ",
				"magnitude":"",
				"unit":"m/km",
				"level":"Water",
				"sublevel":"Abstraction",
			},
		//2.2 Treatment
			"tV1":
			{
				"description":"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV2"  :
			{
				"description":"Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV3"  :
			{
				"description":"Volume of treated water in WTPs with C/F/S/Filt/Des",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV4"  :
			{
				"description":"Volume of treated water in WTPs with C/F/Filt/Des",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV5"  :
			{
				"description":"Volume of treated water in WTPs with Des",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV6"  :
			{
				"description":"Volume of treated water in WTPs with other sequence",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV7":
			{
				"description":"Energy consumed in WTPs",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV8":
			{
				"description":"Sludge produced in WTPs",
				"magnitude":"",
				"unit":"kg",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tV9":
			{
				"description":"Treatment capacity",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE0":
			{
				"description":"Treatment type (volume per type)",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE01":
			{
				"description":"WTPs with Pre-ox/C/F/S/Filt/Des",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE02":
			{
				"description":"WTPs with Pre-ox/C/F/Filt/Des",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE03":
			{
				"description":"WTPs with C/F/S/Filt/Des",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE04":
			{
				"description":"WTPs with C/F/Filt/Des",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE05":
			{
				"description":"WTPs with Des",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE06":
			{
				"description":"WTPs with other sequence",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE1":
			{
				"description":"Energy consumption per treated water ",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE2":
			{
				"description":"Energy consumption of WTPs per total energy consumption ",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE3":
			{
				"description":"Sludge production",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
			"tE4":
			{
				"description":"Capacity utilisation ",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Treatment",
			},
		//2.3 Distribution
			"dV1":
			{
				"description":"Volume injected",
				"magnitude":"",
				"unit":"m3",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV2":
			{
				"description":"Minimum pressure to be supplied at the distribution nodes",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV3":
			{
				"description":"Highest node elevation",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV4":
			{
				"description":"Lowest node elevation of the stage",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV5":
			{
				"description":"Average nodes elevation",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV6":
			{
				"description":"Water table elevation node",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV7":
			{
				"description":"Energy consumed for pumping distributed water",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV8":
			{
				"description":"[Sum](distributed water volume pumped x pump head in meters)",
				"magnitude":"",
				"unit":"m3 x 100 m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV9":
			{
				"description":"Natural energy provided",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV10":
			{
				"description":"Energy recovered at water distribution",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV11":
			{
				"description":"Minimum required energy by users",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV12":
			{
				"description":"Total supplied energy to the network (natural plus shaft), real system",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV13":
			{
				"description":"Topographic energy supplied to the system",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV14":
			{
				"description":"Total supplied energy to the network, assuming the system has no losses",
				"magnitude":"",
				"unit":"kWh",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV15":
			{
				"description":"Mains lenght",
				"magnitude":"",
				"unit":"km",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dV16":
			{
				"description":"Friction pipe losses",
				"magnitude":"",
				"unit":"m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE1":
			{
				"description":"Energy consumption per authorized consumption",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE2":
			{
				"description":"Energy consumption of authorized consumption per total energy consumption",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE3":
			{
				"description":"Standardised Energy Consumption",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE4":
			{
				"description":"Global water distribution energy efficiency",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE5":
			{
				"description":"Percentage of topographic energy",
				"magnitude":"",
				"unit":"%",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE6":
			{
				"description":"Water losses per mains length",
				"magnitude":"",
				"unit":"m3/km/d",
				"level":"Water",
				"sublevel":"Distribution",
			},
			"dE7":
			{
				"description":"Unit head loss",
				"magnitude":"",
				"unit":"m/km",
				"level":"Water",
				"sublevel":"Distribution",
			},
	//3. WASTEWATER
		"wsV1":
		{
			"description":"Volume of collected wastewater",
			"magnitude":"",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV2":
		{
			"description":"Resident population connected to SE",
			"magnitude":"",
			"unit":"Inhab",
			"level":"Waste",
		},
		"wsV3":
		{
			"description":"Wastewater resident population",
			"magnitude":"",
			"unit":"Inhab",
			"level":"Waste",
		},
		"wsV4":
		{
			"description":"Volume of treatedwastewater",
			"magnitude":"",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV5":
		{
			"description":"Wastewater treated by on-site systems",
			"magnitude":"",
			"unit":"m3",
			"level":"Waste",
		},
		"wsV6":
		{
			"description":"Tests complying with dischargeconsents",
			"magnitude":"",
			"unit":"num",
			"level":"Waste",
		},
		"wsV7":
		{
			"description":"Tests carried out in WWTPs",
			"magnitude":"",
			"unit":"num",
			"level":"Waste",
		},
		"wsV8":
		{
			"description":"Volume of discharged wastewater",
			"magnitude":"",
			"unit":"m3",
			"level":"Waste",
		},
		"wS1":
		{
			"description":"Resident population connected to sewer system",
			"magnitude":"",
			"unit":"%",
			"level":"Waste",
		},
		"wS2":
		{
			"description":"Treated Wastewater in WWTP",
			"magnitude":"",
			"unit":"%",
			"level":"Waste",
		},
		"wS3":
		{
			"description":"WWTP compliance with discharge consents",
			"magnitude":"",
			"unit":"%",
			"level":"Waste",
		},
		//3.1 Collection
			"wcV1":
			{
				"description":"Energy consumed for pumping collected wastewater",
				"magnitude":"",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcV2":
			{
				"description":"collected wastewater volume pumped x pump head in meters",
				"magnitude":"",
				"unit":"m3 x 100m",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE1":
			{
				"description":"Energy consumption per collected wastewater",
				"magnitude":"",
				"unit":"kWh/m3",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE2":
			{
				"description":"Energy consumption of collected wastewater per total energy consumption",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Collection",
			},
			"wcE3":
			{
				"description":"Standardised Energy Consumption",
				"magnitude":"",
				"unit":"kWh/m3/100m",
				"level":"Waste",
				"sublevel":"Collection",
			},
		//3.2 Treatment
			"wtV1":
			{
				"description":"Volume of treated wastewater in WWTPs with trickling filters (TF)",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV2":
			{
				"description":"Volume of treated wastewater in WWTPs with activated sludge (AS)",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV3":
			{
				"description":"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV4":
			{
				"description":"Volume of treated wastewater in WWTPs with AS nitrification and C/F",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV5":
			{
				"description":"Volume of treated wastewater in WWTPs with Laggons",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV6":
			{
				"description":"Volume of treated wastewater in WWTPs with other type of treatment",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV7":
			{
				"description":"Energy consumed in WWTPs",
				"magnitude":"",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV8":
			{
				"description":"BOD mass removed",
				"magnitude":"",
				"unit":"kg BOD",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV9":
			{
				"description":"Energy produced in WWTPs",
				"magnitude":"",
				"unit":"kWh",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV10":
			{
				"description":"Sludge produced in WWTPs",
				"magnitude":"",
				"unit":"kg",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV11":
			{
				"description":"Dry weight in sludge produced",
				"magnitude":"",
				"unit":"% (w/w)",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV12":
			{
				"description":"Treatment capacity",
				"magnitude":"",
				"unit":"m3",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtV13":
			{
				"description":"BOD influent",
				"magnitude":"",
				"unit":"mg/l",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE0":
			{
				"description":"Treatment type (volume per type)",
				"magnitude":"",
				"unit":"% of each treatment",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE01":
			{
				"description":"WWTPs with trickling filters (TF)",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE02":
			{
				"description":"WWTPs with activated sludge (AF)",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE03":
			{
				"description":"WWTPs with AS and Coagulation/Filtration (C/F)",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE04":
			{
				"description":"WWTPs with AS nitrification and C/F ",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE05":
			{
				"description":"WWTPs with Lagoons",
				"magnitude":"",
				"unit":"%",
				"level":"Waste",
				"sublevel":"Treatment",
			},
			"wtE06":
			{
				"description":"WWTPs with other type of treatment",
				"magnitude":"",
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
