var Info =
{
	//1. GLOBAL
		"gV1":
		{
			"description":"Assessment period",
			"unit":"days",
		},
		"gV2":
		{
			"description":"Energy costs",
			"unit":"Currency",
		},
		"gV2w":
		{
			"description":"Energy costs of the water utility",
			"unit":"Currency",
		},
		"gV2ww":
		{
			"description":"Energy costs of the wastewater utility",
			"unit":"Currency",
		},
		"gV3":
		{
			"description":"Running costs",
			"unit":"eur",
		},
		"gV4":
		{
			"description":"Total energy consumed",
			"unit":"kWh",
		},
		"gV5":
		{
			"description":"Resident population within the utility area of service",
			"unit":"inhab",
		},
		"gV6":
		{
			"description":"Energy mix consumded",
			"unit":"CO2/kWh",
		},
		"gE1":
		{
			"description":"Energy Cost Ratio",
			"unit":"N/A",
		},
		"gE2":
		{
			"description":"Per capita energy consumption",
			"unit":"kWh/inhab/year",
		},
		"GHG":
		{
			"description":"Per capita GHG emissions",
			"unit":"CO2e kg/inhab/year",
		},
	//2. WATER SUPPLY
		"sV1":
		{
			"description":"Volume of Conveyed Water",
			"unit":"m3",
		},
		"sV2":
		{
			"description":"Volume of Treated Water",
			"unit":"m3",
		},
		"sV3":
		{
			"description":"Treated Water quality tests carried out",
			"unit":"num",
		},
		"sV4":
		{
			"description":"Compliance of aesthetic tests",
			"unit":"num",
		},
		"sV5":
		{
			"description":"Compliance of microbiological tests",
			"unit":"num",
		},
		"sV6":
		{
			"description":"Compliance of physical-chemical tests",
			"unit":"num",
		},
		"sV7":
		{
			"description":"Compliance of radioactivity tests",
			"unit":"num",
		},
		"sV8":
		{
			"description":"Volume of authorized consumption",
			"unit":"m3",
		},
		"sV9":
		{
			"description":"Delivery points with adequate pressure",
			"unit":"num",
		},
		"sV10":
		{
			"description":"Number of service connections",
			"unit":"num",
		},
		"sV11":
		{
			"description":"Time system is pressurised",
			"unit":"hour",
		},
		"sV12":
		{
			"description":"Resident population connected to supply systems",
			"unit":"Inhab",
		},
		"sV13":
		{
			"description":"Water supply resident population",
			"unit":"Inhab",
		},
		"S1":
		{
			"description":"Quality of supplied water",
			"unit":"%",
		},
		"S2":
		{
			"description":"Pressure of supply adequacy",
			"unit":"%",
		},
		"S3":
		{
			"description":"Continuity of supply",
			"unit":"%",
		},
		"S4":
		{
			"description":"Resident population connected to supply system",
			"unit":"%",
		},
		//2.1 Abstraction
			"aV1" :
			{
				"description":"Energy consumed for pumping abstracted water",
				"unit":"kWh",
			},
			"aV2" :
			{
				"description":"abstracted water volume pumped x pump head in meters",
				"unit":"m3 x 100m",
			},
			"aV3" :
			{
				"description":"Energy recovered in abstracted water",
				"unit":"kWh",
			},
			"aV4" :
			{
				"description":"turbine water volume pumped x turbine head in meters",
				"unit":"m3 x 100m",
			},
			"aV5" :
			{
				"description":"Water losses",
				"unit":"m3",
			},
			"aV6" :
			{
				"description":"Mains lenght",
				"unit":"km",
			},
			"aV7" :
			{
				"description":"Friction pipe losses",
				"unit":"m",
			},
			"aE1" :
			{
				"description":"Energy consumption per conveyed water ",
				"unit":"kWh/m3",
			},
			"aE2" :
			{
				"description":"Energy consumption of abstracted water per total energy consumption ",
				"unit":"%",
			},
			"aE3" :
			{
				"description":"Standardised Energy Consumption ",
				"unit":"kWh/m3/100m",
			},
			"aE4" :
			{
				"description":"Energy recovery per conveyed water ",
				"unit":"kWh/m3",
			},
			"aE5" :
			{
				"description":"Standardized energy recovery ",
				"unit":"kWh/m3/100m",
			},
			"aE6" :
			{
				"description":"Water losses per mains length ",
				"unit":"m3/km/d",
			},
			"aE7" :
			{
				"description":"Unit head loss ",
				"unit":"m/km",
			},
		//2.2 Treatment
			"tV1"  :
			{
				"description":"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",
				"unit":"m3",
			},
			"tV2"  :
			{
				"description":"Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des",
				"unit":"m3",
			},
			"tV3"  :
			{
				"description":"Volume of treated water in WTPs with C/F/S/Filt/Des",
				"unit":"m3",
			},
			"tV4"  :
			{
				"description":"Volume of treated water in WTPs with C/F/Filt/Des",
				"unit":"m3",
			},
			"tV5"  :
			{
				"description":"Volume of treated water in WTPs with Des",
				"unit":"m3",
			},
			"tV6"  :
			{
				"description":"Volume of treated water in WTPs with other sequence",
				"unit":"m3",
			},
			"tV7":
			{
				"description":"Energy consumed in WTPs",
				"unit":"kWh",
			},
			"tV8":
			{
				"description":"Sludge produced in WTPs",
				"unit":"kg",
			},
			"tV9":
			{
				"description":"Treatment capacity",
				"unit":"m3",
			},
			"tE0":
			{
				"description":"Treatment type (volume per type)",
				"unit":"%",
			},
			"tE01":
			{
				"description":"WTPs with Pre-ox/C/F/S/Filt/Des",
				"unit":"%",
			},
			"tE02":
			{
				"description":"WTPs with Pre-ox/C/F/Filt/Des",
				"unit":"%",
			},
			"tE03":
			{
				"description":"WTPs with C/F/S/Filt/Des",
				"unit":"%",
			},
			"tE04":
			{
				"description":"WTPs with C/F/Filt/Des",
				"unit":"%",
			},
			"tE05":
			{
				"description":"WTPs with Des",
				"unit":"%",
			},
			"tE06":
			{
				"description":"WTPs with other sequence",
				"unit":"%",
			},
			"tE1":
			{
				"description":"Energy consumption per treated water ",
				"unit":"%",
			},
			"tE2":
			{
				"description":"Energy consumption of WTPs per total energy consumption ",
				"unit":"%",
			},
			"tE3":
			{
				"description":"Sludge production",
				"unit":"%",
			},
			"tE4":
			{
				"description":"Capacity utilisation ",
				"unit":"%",
			},
		//2.3 Distribution
			"dV1":
			{
				"description":"Volume injected",
				"unit":"m3",
			},
			"dV2":
			{
				"description":"Minimum pressure to be supplied at the distribution nodes",
				"unit":"m",
			},
			"dV3":
			{
				"description":"Highest node elevation",
				"unit":"m",
			},
			"dV4":
			{
				"description":"Lowest node elevation of the stage",
				"unit":"m",
			},
			"dV5":
			{
				"description":"Average nodes elevation",
				"unit":"m",
			},
			"dV6":
			{
				"description":"Water table elevation node",
				"unit":"m",
			},
			"dV7":
			{
				"description":"Energy consumed for pumping distributed water",
				"unit":"kWh",
			},
			"dV8":
			{
				"description":"[Sum](distributed water volume pumped x pump head in meters)",
				"unit":"m3 x 100 m",
			},
			"dV9":
			{
				"description":"Natural energy provided",
				"unit":"kWh",
			},
			"dV10":
			{
				"description":"Energy recovered at water distribution",
				"unit":"kWh",
			},
			"dV11":
			{
				"description":"Minimum required energy by users",
				"unit":"kWh",
			},
			"dV12":
			{
				"description":"Total supplied energy to the network (natural plus shaft), real system",
				"unit":"kWh",
			},
			"dV13":
			{
				"description":"Topographic energy supplied to the system",
				"unit":"kWh",
			},
			"dV14":
			{
				"description":"Total supplied energy to the network, assuming the system has no losses",
				"unit":"kWh",
			},
			"dV15":
			{
				"description":"Mains lenght",
				"unit":"km",
			},
			"dV16":
			{
				"description":"Friction pipe losses",
				"unit":"m",
			},
			"dE1":
			{
				"description":"Energy consumption per authorized consumption",
				"unit":"kWh/m3",
			},
			"dE2":
			{
				"description":"Energy consumption of authorized consumption per total energy consumption",
				"unit":"%",
			},
			"dE3":
			{
				"description":"Standardised Energy Consumption",
				"unit":"kWh/m3/100m",
			},
			"dE4":
			{
				"description":"Global water distribution energy efficiency",
				"unit":"%",
			},
			"dE5":
			{
				"description":"Percentage of topographic energy",
				"unit":"%",
			},
			"dE6":
			{
				"description":"Water losses per mains length",
				"unit":"m3/km/d",
			},
			"dE7":
			{
				"description":"Unit head loss",
				"unit":"m/km",
			},
	//3. WASTEWATER
		"wsV1":
		{
			"description":"Volume of collected wastewater",
			"unit":"m3",
		},
		"wsV2":
		{
			"description":"Resident population connected to SE",
			"unit":"Inhab",
		},
		"wsV3":
		{
			"description":"Wastewater resident population",
			"unit":"Inhab",
		},
		"wsV4":
		{
			"description":"Volume of treatedwastewater",
			"unit":"m3",
		},
		"wsV5":
		{
			"description":"Wastewater treated by on-site systems",
			"unit":"m3",
		},
		"wsV6":
		{
			"description":"Tests complying with dischargeconsents",
			"unit":"num",
		},
		"wsV7":
		{
			"description":"Tests carried out in WWTPs",
			"unit":"num",
		},
		"wsV8":
		{
			"description":"Volume of discharged wastewater",
			"unit":"m3",
		},
		"wS1":
		{
			"description":"Resident population connected to sewer system",
			"unit":"%",
		},
		"wS2":
		{
			"description":"Treated Wastewater in WWTP",
			"unit":"%",
		},
		"wS3":
		{
			"description":"WWTP compliance with discharge consents",
			"unit":"%",
		},
		//3.1 Collection
			"wcV1":
			{
				"description":"Energy consumed for pumping collected wastewater",
				"unit":"kWh",
			},
			"wcV2":
			{
				"description":"collected wastewater volume pumped x pump head in meters",
				"unit":"m3 x 100m",
			},
			"wcE1":
			{
				"description":"Energy consumption per collected wastewater",
				"unit":"kWh/m3",
			},
			"wcE2":
			{
				"description":"Energy consumption of collected wastewater per total energy consumption",
				"unit":"%",
			},
			"wcE3":
			{
				"description":"Standardised Energy Consumption",
				"unit":"kWh/m3/100m",
			},
		//3.2 Treatment
			"wtV1":
			{
				"description":"Volume of treated wastewater in WWTPs with trickling filters (TF)",
				"unit":"m3",
			},
			"wtV2":
			{
				"description":"Volume of treated wastewater in WWTPs with activated sludge (AS)",
				"unit":"m3",
			},
			"wtV3":
			{
				"description":"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)",
				"unit":"m3",
			},
			"wtV4":
			{
				"description":"Volume of treated wastewater in WWTPs with AS nitrification and C/F",
				"unit":"m3",
			},
			"wtV5":
			{
				"description":"Volume of treated wastewater in WWTPs with Laggons",
				"unit":"m3",
			},
			"wtV6":
			{
				"description":"Volume of treated wastewater in WWTPs with other type of treatment",
				"unit":"m3",
			},
			"wtV7":
			{
				"description":"Energy consumed in WWTPs",
				"unit":"kWh",
			},
			"wtV8":
			{
				"description":"BOD mass removed",
				"unit":"kg BOD",
			},
			"wtV9":
			{
				"description":"Energy produced in WWTPs",
				"unit":"kWh",
			},
			"wtV10":
			{
				"description":"Sludge produced in WWTPs",
				"unit":"kg",
			},
			"wtV11":
			{
				"description":"Dry weight in sludge produced",
				"unit":"% (w/w)",
			},
			"wtV12":
			{
				"description":"Treatment capacity",
				"unit":"m3",
			},
			"wtV13":
			{
				"description":"BOD influent",
				"unit":"mg/l",
			},
			"wtE0":
			{
				"description":"Treatment type (volume per type)",
				"unit":"% of each treatment",
			},
			"wtE01":
			{
				"description":"WWTPs with trickling filters (TF)",
				"unit":"%",
			},
			"wtE02":
			{
				"description":"WWTPs with activated sludge (AF)",
				"unit":"%",
			},
			"wtE03":
			{
				"description":"WWTPs with AS and Coagulation/Filtration (C/F)",
				"unit":"%",
			},
			"wtE04":
			{
				"description":"WWTPs with AS nitrification and C/F ",
				"unit":"%",
			},
			"wtE05":
			{
				"description":"WWTPs with Lagoons",
				"unit":"%",
			},
			"wtE06":
			{
				"description":"WWTPs with other type of treatment",
				"unit":"%",
			},
			"wtE1":
			{
				"description":"Energy consumption per treated wastewater",
				"unit":"kWh/m3",
			},
			"wtE2":
			{
				"description":"Energy consumption of WWTPs per total energy consumption",
				"unit":"%",
			},
			"wtE3":
			{
				"description":"Energy consumption per mass removed",
				"unit":"kWh/Kg BOD",
			},
			"wtE4":
			{
				"description":"Energy production",
				"unit":"kWh/m3",
			},
			"wtE5":
			{
				"description":"Sludge production",
				"unit":"kg/m3",
			},
			"wtE6":
			{
				"description":"Dry weight in sludge production",
				"unit":"%",
			},
			"wtE7":
			{
				"description":"Capacity utilisation ",
				"unit":"%",
			},
		//3.3 Discharge
			"wdV1":
			{
				"description":"Energy consumed for pumping dischargedwastewater",
				"unit":"kWh",
			},
			"wdV2":
			{
				"description":"discharged wastewater volume pumped x pump head inmeters",
				"unit":"m3 x 100m",
			},
			"wdV3":
			{
				"description":"Energy recovered in wastewaterdischarged",
				"unit":"kWh",
			},
			"wdV4":
			{
				"description":"turbine water volume pumped x  turbine head inmeters",
				"unit":"m3 x 100m",
			},
			"wdE1":
			{
				"description":"Energy consumption per discharged wastewater",
				"unit":"kWh/m3",
			},
			"wdE2":
			{
				"description":"Energy consumption of discharged wastewater per total energy consumption",
				"unit":"%",
			},
			"wdE3":
			{
				"description":"Standardised Energy Consumption",
				"unit":"kWh/m3/100m",
			},
			"wdE4":
			{
				"description":"Energy recovery per discharged water",
				"unit":"kWh/m3",
			},
			"wdE5":
			{
				"description":"Standardized energy recovery",
				"unit":"kWh/m3/100m",
			},
	//4. EMISSIONS
		"dD1":
		{
			"description":"Direct CO2 emitted in urban drinking water system from on-site engines",
			"unit":"kg CO2",
		},
		"dW1":
		{
			"description":"Direct CO2 emitted in wastewater stages from on-site engines",
			"unit":"kg CO2",
		},
		"dM1":
		{
			"description":"Methane (CH4) emitted",
			"unit":"kg CO2",
		},
		"dN1":
		{
			"description":"Nitrous oxide (N2O) emitted",
			"unit":"kg CO2",
		},
		/*4.1. DIRECT EMISSIONS*/
			"g_dGHG":
			{
				"description":"Total direct GHG Emissions per capita",
				"unit":"CO2e Kg/Inhab/year",
			},
			"s_dGHG":
			{
				"description":"Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water", 
				"unit":"CO2e Kg/m3",
			},
			"ws_dGHG":
			{
				"description":"Direct GHG emissions in wastewater stages per volume of treated wastewater", 
				"unit":"CO2e Kg/ m3",
			},
			"wt_dGHG":
			{
				"description":"Direct GHG emissions in wastewater treatment per BOD eliminated", 
				"unit":"CO2e Kg/ BODremoved",
			},
		/*4.2. INDIRECT EMISSIONS*/
			"iS1":
			{
				"description":"Indirect CO2e emitted in sludge transport",
				"unit":"kg CO2e",
			},
			"iN1":
			{
				"description":"Indirect CO2e emitted from wastewater effluent",
				"unit":"kg CO2e",
			},
			"ws_iGHG1":
			{
				"description":"Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet", 
				"unit":"CO2e kg / % DW",
			},
			"wt_iGHG1":
			{
				"description":"Sludge transport indirect GHG Emissions per dry weight of sludge", 
				"unit":"CO2e Kg/ m3",
			},
}
