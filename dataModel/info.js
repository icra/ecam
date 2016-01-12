/** FUNCTIONS TO DEAL WITH VARIABLE DESCRIPTIONS AND UNITS */

/** Find a variable code, e.g 'gV2' inside 'Global' and tell where it is */
function locateVariable(code)
{
	var localization={}; //e.g {"level":"Water","sublevel":"Abstraction"}
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
						localization={"level":level,"sublevel":field};
						return localization;
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
	return false;
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
	"uw1":{
		"description":"Conversion factor for grid electricity",
		"magnitude":"Conversion",
		"unit":"kgCO2e/kWh",
	},
	"Energy Costs":{
		"description":"Energy Costs",
		"magnitude":"Currency",
		"unit":"USD",
	},
	"Running Costs":{
		"description":"Running Costs",
		"magnitude":"Currency",
		"unit":"USD",
	},

	//2. WATER SUPPLY
	"ws1":{
		"description":"Serviced population within the water utility area of service",
		"magnitude":"People",
		"unit":"People",
	},
	"ws2":{
		"description":"Resident population within the water utility area of service",
		"magnitude":"People",
		"unit":"People",
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
		"unit":"m3",
	},

	//2.0 Water Supply General
	//    wsg1 Water-related electrical energy produced by the utility (renewable energy) during the assessment period	kWh
	//    wsg2 Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period	kWh
	//    wsg3 Non-water related renewable electricity production by the utility 	kWh
	//    wsg4 Non-water related renewable electricity sold by the utility	kWh
	//    wsg5 Heat energy, calculated from steam production and gas flow rates, provided to neighboring  districts for heating or cooling	J
	"wsg1":{
		"description":"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wsg2":{
		"description":"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wsg3":{
		"description":"Non-water related renewable electricity production by the utility",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wsg4":{
		"description":"Non-water related renewable electricity sold by the utility",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wsg5":{
		"description":"Heat energy, calculated from steam production and gas flow rates, provided to neighboring  districts for heating or cooling",
		"magnitude":"Energy",
		"unit":"Joule",
	},

	//2.1 Abstraction
	//		wsa1	Electric energy consumed for pumping abstracted water (from the grid and self-produced)	kWh
	//		wsa2	Volume of conveyed water	m3
	//		wsa3	Energy recovered in abstracted water	kWh
	"wsa1":{
		"description":"Energy consumed for pumping abstracted water",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wsa2":{
		"description":"Volume of conveyed water",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wsa3":{
		"description":"Energy recovered in abstracted water",
		"magnitude":"Energy",
		"unit":"kWh",
	},

	//2.2 Treatment
	//	wst1	Volume of treated water	m3
	//	wst2	Electric energy consumed in WTPs (from the grid and self-produced)	kWh
	"wst1":{
		"description":"Volume of treated water",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wst2":{
		"description":"Electric energy consumed in WTPs (from the grid and self-produced)",
		"magnitude":"Energy",
		"unit":"kWh",
	},

	//2.3 Distribution
	//	wsd1	Electric energy consumed for pumping distributed water (from the grid and self-produced)	kWh
	"wsd1":{
		"description":"Electric energy consumed for pumping distributed water (from the grid and self produced)",
		"magnitude":"Energy",
		"unit":"kWh",
	},

//3. WASTEWATER
	"ww1":{
		"description":"Energy costs of the wastewater utility",
		"magnitude":"Currency",
		"unit":"USD",
	},
	"ww2":{
		"description":"Running costs of the utility related to the urban wastewater system",
		"magnitude":"Currency",
		"unit":"USD",
	},
	"ww3":{
		"description":"Total energy consumed from the grid (from power bills) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"ww4":{
		"description":"Total volume processed through urban wastewater system",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"ww5":{
		"description":"Resident population within the wastewater utility area of service",
		"magnitude":"People",
		"unit":"People",
	},
	"ww6":{
		"description":"Resident population connected to Sewer System (SE)",
		"magnitude":"People",
		"unit":"People",
	},
	"ww7":{
		"description":"Serviced population in sewer and WWTP system",
		"magnitude":"People",
		"unit":"People",
	},
	"ww8":{
		"description":"Number of trips to disposal site",
		"magnitude":"Number",
		"unit":"Number",
	},
	"ww9" :{
		"description":"Distance to disposal site",
		"magnitude":"Distance",
		"unit":"km",
	},
	"ww10":{
		"description":"Enter nitrogen effluent limit",
		"magnitude":"Concentration",
		"unit":"mg/L",
	},
	"ww11" :{
		"description":"Volume of Fuel consumed",
		"magnitude":"Volume",
		"unit":"L",
	},

	//3.0 Wastewater General
	//	wwg1	Water-related electrical energy produced by the utility (renewable energy) during the assessment period	kWh
	//	wwg2	Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period	kWh
	//	wwg3	Non-water related renewable electricity production by the utility 	kWh
	//	wwg4	Non-water related renewable electricity sold by the utility	kWh
	//	wwg5	Heat energy, provided to neighboring  districts for heating or cooling	J
	"wwg1":{
		"description":"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wwg2":{
		"description":"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wwg3":{
		"description":"Non-water related renewable electricity production by the utility",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wwg4":{
		"description":"Non-water related renewable electricity sold by the utility",
		"magnitude":"Energy",
		"unit":"kWh",
	},
	"wwg5":{
		"description":"Heat energy, provided to neighboring  districts for heating or cooling",
		"magnitude":"Energy",
		"unit":"Joule",
	},

	//3.1 Collection
	//	wwc1	Volume of wastewater conveyed to treatment or to an outfall for untreated discharge	m3	
	//	wwc2	Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)	kWh	
	"wwc1":{
		"description":"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge",
		"magnitude":"Volume",
		"unit":"m3",
	},
	"wwc2":{
		"description":"Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)",
		"magnitude":"Energy",
		"unit":"kWh",
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
