/** FUNCTIONS TO DEAL WITH VARIABLE DESCRIPTIONS AND UNITS */

/** Find a variable code, e.g 'gV2' inside 'Global' and tell where it is */
function locateVariable(code)
{
	var localization = {} //e.g {"level":"Water","sublevel":"Abstraction"}
	for(level in Global)
	{
		for(field in Global[level])
		{
			if(typeof(Global[level][field])=='object')
			{
				for(subfield in Global[level][field])
				{
					if(code==subfield)
					{
						localization = {"level":level,"sublevel":field}
						return localization
					}
				}
			}
			else
			{
				if(code==field)
				{
					localization = {"level":level,"sublevel":0}
					return localization
				}
			}
		}
	}
	return false
}

/** 
	Info: object to store all variable descriptions and units
	Format:
		"code":{
			"description" : string,
			"magnitude"	: string,
			"unit"		: string,
		},

 	then, the function "locateVariable" helps to locate the level and sublevel
 */
var Info = {
	//1. UWS
	"uw1":{"description":"Energy costs", 		 "magnitude":"Currency", "unit":"USD"},

	//2. WATER SUPPLY
	"ws1":{
		"description":"Serviced population within the water utility area of service",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"ws2":{
		"description":"Resident population within the water utility area of service",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"ws3":{
		"description":"Energy costs during the entire assessment period",
		"magnitude":"Currency",
		"unit":"USD",
	},
	"ws4":{
		"description":"Running costs during the entire assessment period",
		"magnitude":"Currency",
		"unit":"USD",
	},
	"ws5":{
		"description":"Total energy consumed from the grid (from power bills) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"ws6":{
		"description":"Total volume produced for urban drinking water system",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"ws7":{
		"description":"Volume of authorized consumption",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"ws8":{
		"description": "Water loss from leaks in the distribution system, as known or estimated by the Utility",
		"magnitude":"Percent",
		"unit":"%",
	},
	"ws9":{
		"description":"Volume of Fuel consumed",
		"magnitude":"Volume",
		"unit":"L",
	},

	//2.1 Abstraction
	"aV1":{
		"description":"Energy consumed for pumping abstracted water",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"sV1":{
		"description":"Volume of conveyed water",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"aV3":{
		"description":"Energy recovered in abstracted water",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"aV2":{
		"description":"Abstracted water volume pumped x pump head in meters",
		"magnitude":"undefined",
		"unit":"m3 x 100m",
	},
	"aV4":{
		"description":"Turbine water volume pumped x turbine head in meters",
		"magnitude":"undefined",
		"unit":"m3 x 100m",
	},
	"aV5":{
		"description":"Water losses",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"aV6":{
		"description":"Mains lenght",
		"magnitude":"Distance",
		"unit":"km",
	},
	"aV7":{
		"description":"Friction pipe losses",
		"magnitude":"Headloss",
		"unit":"m",
	},
	"aE1":{
		"description":"Energy consumption per conveyed water ",
		"magnitude":"Energy/Volume",
		"unit":"kWh/m3",
	},
	"aE2":{
		"description":"Energy consumption of abstracted water per total energy consumption ",
		"magnitude":"undefined",
		"unit":"%",
	},
	"aE3":{
		"description":"Standardised Energy Consumption ",
		"magnitude":"undefined",
		"unit":"kWh/m3/100m",
	},
	"aE4":{
		"description":"Energy recovery per conveyed water ",
		"magnitude":"undefined",
		"unit":"kWh/m3",
	},
	"aE5":{
		"description":"Standardized energy recovery ",
		"magnitude":"undefined",
		"unit":"kWh/m3/100m",
	},
	"aE6":{
		"description":"Water losses per mains length ",
		"magnitude":"undefined",
		"unit":"m3/km/d",
	},
	"aE7":{
		"description":"Unit head loss ",
		"magnitude":"undefined",
		"unit":"m/km",
	},

	//2.2 Treatment
	"tV1":{
		"description":"Volume of treated water in WTPs with selected technology",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"tV7":{
		"description":"Electric energy consumed in WTPs (from the grid and self-produced)",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"tV8":{
		"description":"Sludge produced in WTPs",
		"magnitude":"Mass",
		"unit":"kg",
	},
	"tV9":{
		"description":"Treatment capacity",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"sV2":{
		"description":"Volume of Treated Water",
		"magnitude":"Volume",
		"unit":"m3",
	}, 
	"sV3":{
		"description":"Treated water quality tests carried out",
		"magnitude":"number",
		"unit":"number",
	},
	"sV4":{ 
		"description":"Compliance of aesthetic tests",
		"magnitude":"number",
		"unit":"number",
	},
	"sV5":{ 
		"description":"Compliance of microbiological tests",
		"magnitude":"number",
		"unit":"number",
	},
	"sV6":{ 
		"description":"Compliance of physical-chemical tests",
		"magnitude":"number",
		"unit":"number",
	},
	"sV7":{ 
		"description":"Compliance of radioactivity tests",
		"magnitude":"number",
		"unit":"number",
	},
	"tE0":
	{
		"description":"WTPs with selected technology",
		"magnitude":"not specified",
		"unit":"%",
	},
	"tE1":
	{
		"description":"Energy consumption per treated water ",
		"magnitude":"undefined",
		"unit":"%",
	},
	"tE2":
	{
		"description":"Energy consumption of WTPs per total energy consumption ",
		"magnitude":"undefined",
		"unit":"%",
	},
	"tE3":
	{
		"description":"Sludge production",
		"magnitude":"undefined",
		"unit":"%",
	},
	"tE4":
	{
		"description":"Capacity utilisation ",
		"magnitude":"undefined",
		"unit":"%",
	},

//2.3 Distribution
	"dV7":{
		"description":"Electric energy consumed for pumping distributed water",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"sV9":{
		"description":"Delivery points with adequate pressure",
		"magnitude":"Amount",	
		"unit":"#",
	},
	"sV10":{
		"description":"Number of service connections",
		"magnitude":"Amount",
		"unit":"#",
	},
	"sV11":{
		"description":"Time system is pressurised",
		"magnitude":"Time",
		"unit":"hours",
	},
	"sV12":{
		"description":"Resident population connected to supply systems",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"sV13":{
		"description":"Serviced population in supply systems",
		"magnitude":"Population",
		"unit":"People",
	},
	"sV14":{
		"description":"System input volume",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"sV15":{
		"description":"Non-revenue water",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"dV1":{
		"description":"Volume injected",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"dV2":{
		"description":"Minimum pressure to be supplied at the distribution nodes",
		"magnitude":"Pressure",
		"unit":"m",
	},
	"dV3":{
		"description":"Highest node elevation",
		"magnitude":"Distance",
		"unit":"m",
	},
	"dV4":{
		"description":"Lowest node elevation of the stage",
		"magnitude":"Distance",
		"unit":"m",
	},
	"dV5":{
		"description":"Average nodes elevation",
		"magnitude":"Distance",
		"unit":"m",
	},
	"dV6":{
		"description":"Water table elevation node",
		"magnitude":"Distance",
		"unit":"m",
	},
	"dV8":{
		"description":"[Sum](distributed water volume pumped x pump head in meters)",
		"magnitude":"undefined",
		"unit":"m3 x 100 m",
	},
	"dV9":{
		"description":"Natural energy provided",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"dV10":{
		"description":"Energy recovered at water distribution",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"dV11":{
		"description":"Minimum required energy by users",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"dV12":{
		"description":"Total supplied energy to the network (natural plus shaft), real system",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"dV13":{
		"description":"Topographic energy supplied to the system",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"dV14":{
		"description":"Mains length",
		"magnitude":"Distance",
		"unit":"km",
	},
	"dV15":{
		"description":"Friction pipe losses",
		"magnitude":"Headloss",
		"unit":"m",
	},

	"dE1":
	{
		"description":"Energy consumption per authorized consumption",
		"magnitude":"undefined",
		"unit":"kWh/m3",
	},
	"dE2":
	{
		"description":"Energy consumption of authorized consumption per total energy consumption",
		"magnitude":"Ratio",
		"unit":"%",
	},
	"dE3":
	{
		"description":"Standardised Energy Consumption",
		"magnitude":"Ratio",
		"unit":"kWh/m3/100m",
	},
	"dE4":
	{
		"description":"Global water distribution energy efficiency",
		"magnitude":"Ratio",
		"unit":"%",
	},
	"dE5":
	{
		"description":"Percentage of topographic energy",
		"magnitude":"Ratio",
		"unit":"%",
	},
	"dE6":
	{
		"description":"Water losses per mains length",
		"magnitude":"Ratio",
		"unit":"m3/km/d",
	},
	"dE7":
	{
		"description":"Unit head loss",
		"magnitude":"Ratio",
		"unit":"m/km",
	},

//3. WASTEWATER
	"ww1":{
		"description":"Energy costs of the wastewater utility",
		"magnitude":"currency",
		"unit":"USD",
	},
	"ww2":{
		"description":"Running costs of the utility related to the urban wastewater system",
		"magnitude":"currency",
		"unit":"USD",
	},
	"ww3":{
		"description":"Total energy consumed from the grid (from power bills) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"ww4":{
		"description":"Total volume processed in urban wastewater system",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"ww5":{
		"description":"Resident population within the wastewater utility area of service",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"ww6":{
		"description":"Resident population connected to Sewer System (SE)",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"ww7":{
		"description":"Serviced population in sewer and WWTP system",
		"magnitude":"Inhab",
		"unit":"Inhab",
	},
	"ww8" :{
		"description":"Volume of Fuel consumed",
		"magnitude":"Volume",
		"unit":"L",
	},
	"ww9" :{
		"description":"Km to disposal site",
		"magnitude":"Distance",
		"unit":"km",
	},
	"ww10":{
		"description":"Enter nitrogen effluent limit",
		"magnitude":"Concentration",
		"unit":"mg/L",
	},

//3.1 Collection
	"wsV1":{
		"description":"Volume of collected wastewater",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wcV1":
	{
		"description":"Energy consumed for pumping collected wastewater",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wcV2":
	{
		"description":"collected wastewater volume pumped x pump head in meters",
		"magnitude":"Ratio",
		"unit":"m3 x 100m",
	},
	"wcE1":
	{
		"description":"Energy consumption per collected wastewater",
		"magnitude":"Ratio",
		"unit":"kWh/m3",
	},
	"wcE2":
	{
		"description":"Energy consumption of collected wastewater per total energy consumption",
		"magnitude":"Ratio",
		"unit":"%",
	},
	"wcE3":
	{
		"description":"Standardised Energy Consumption",
		"magnitude":"Ratio",
		"unit":"kWh/m3/100m",
	},

//3.2 Treatment
	"dN1": {
		"description":"Nitrous oxide (N2O) emitted",
		"magnitude":"Mass",
		"unit":"kg CO2",
	},
	"wtV7": {
		"description":"Energy consumed in WWTPs",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wtV8": {
		"description":"BOD mass removed",
		"magnitude":"Mass",
		"unit":"kg BOD",
	},
	"wtV9": {
		"description":"Energy produced in WWTPs",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wtV10": {
		"description":"Sludge produced in WWTPs",
		"magnitude":"Mass",
		"unit":"kg",
	},
	"wtV11": {
		"description":"Dry weight in sludge produced",
		"magnitude":"Ratio",
		"unit":"% (w/w)",
	},
	"wtV15":{
		"description":"BOD influent (average)",
		"magnitude":"Concentration",
		"unit":"mg/L",
	},
	"wsV5":{
		"description":"Tests complying with discharge consents",
		"magnitude":"Score",
		"unit":"Score",
	},
	"wsV6":{
		"description":"Tests carried out in WWTPs",
		"magnitude":"Score",
		"unit":"Score",
	},
	"wtV1":{
		"description":"Volume of treated wastewater in WWTPs with selected technology",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wtV12":{
		"description":"Sludge produced in WWTPs (total weight)",
		"magnitude":"Mass",
		"unit":"kg",
	},
	"wtV13":{
		"description":"Dry weight in sludge produced",
		"magnitude":"% (w/w)",
		"unit":"kg/kg",
	},
	"wtV14":{
		"description":"Treatment capacity",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wtE0":
	{
		"description":"WWTPs with selected technology",
		"magnitude":"Ratio",
		"unit":"%",
	},
	"wtE1":
	{
		"description":"Energy consumption per treated wastewater",
		"magnitude":"Energy/Volume",
		"unit":"kWh/m3",
	},
	"wtE2":
	{
		"description":"Energy consumption of WWTPs per total energy consumption",
		"magnitude":"Energy/Energy",
		"unit":"%",
	},
	"wtE3":
	{
		"description":"Energy consumption per mass removed",
		"magnitude":"Energy/Mass",
		"unit":"kWh/Kg BOD",
	},
	"wtE4":
	{
		"description":"Energy production",
		"magnitude":"Energy/Volume",
		"unit":"kWh/m3",
	},
	"wtE5":
	{
		"description":"Sludge production",
		"magnitude":"Concentration",
		"unit":"kg/m3",
	},
	"wtE6":
	{
		"description":"Dry weight in sludge production",
		"magnitude":"% w/w",
		"unit":"%",
	},
	"wtE7":
	{
		"description":"Capacity utilisation ",
		"magnitude":"",
		"unit":"%",
	},

//3.3 Discharge
	"wsV7":
	{
		"description":"Volume of discharged wastewater",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wsV8":
	{
		"description":"Volume of discharged wastewater without treatment",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wdV1":
	{
		"description":"Electric energy consumed for pumping discharge dwastewater (from the grid and self-produced)",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wdV2":
	{
		"description":"[Sum] discharged wastewater volume pumped x pump head in meters",
		"magnitude":"Volume",
		"unit":"m3 x 100m",
	},
	"wdV3":
	{
		"description":"Energy recovered in wastewater discharged",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wdV4":
	{
		"description":"[Sum] turbine water volume pumped x turbine head inmeters",
		"magnitude":"Volume",
		"unit":"m3 x 100m",
	},

	"wdE1":
	{
		"description":"Energy consumption per discharged wastewater",
		"magnitude":"Energy/Volume",
		"unit":"kWh/m3",
	},
	"wdE2":
	{
		"description":"Energy consumption of discharged wastewater per total energy consumption",
		"magnitude":"",
		"unit":"%",
	},
	"wdE3":
	{
		"description":"Standardised Energy Consumption",
		"magnitude":"",
		"unit":"kWh/m3/100m",
	},
	"wdE4":
	{
		"description":"Energy recovery per discharged water",
		"magnitude":"",
		"unit":"kWh/m3",
	},
	"wdE5":
	{
		"description":"Standardized energy recovery",
		"magnitude":"",
		"unit":"kWh/m3/100m",
	},
}
