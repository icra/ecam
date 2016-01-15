/** CODE TO DEAL WITH VARIABLE DESCRIPTIONS */

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
			"magnitude"	  : string,
			"unit"		  : string,
		},

 	then, the function "locateVariable" helps to locate the level and sublevel
*/

var Info = {
	//L1 UWS
	"uw1":{description:"Conversion factor for grid electricity",magnitude:"Conversion",unit:"kgCO2e/kWh",},

	//L1 WATER SUPPLY
	"ws1":{description:"Serviced population within the water utility area of service",                           magnitude:"People",  unit:"People",},
	"ws2":{description:"Resident population within the water utility area of service",                           magnitude:"People",  unit:"People",},
	"ws3":{description:"Energy costs during the entire assessment period",                                       magnitude:"Currency",unit:"USD",},
	"ws4":{description:"Running costs during the entire assessment period",                                      magnitude:"Currency",unit:"USD",},
	"ws5":{description:"Total energy consumed from the grid (from power bills) during the assessment period",    magnitude:"Energy",  unit:"kWh",},
	"ws6":{description:"Total volume produced for urban drinking water system",                                  magnitude:"Volume",  unit:"m3",},
	"ws7":{description:"Volume of authorized consumption",                                                       magnitude:"Volume",  unit:"m3",},
	"ws8":{description: "Water loss from leaks in the distribution system, as known or estimated by the Utility",magnitude:"Percent", unit:"%",},
	"ws9":{description:"Volume of Fuel consumed",                                                                magnitude:"Volume",  unit:"m3",},

	//L2 Water Supply General
	// wsg1 Water-related electrical energy produced by the utility (renewable energy) during the assessment period	kWh
	// wsg2 Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period	kWh
	// wsg3 Non-water related renewable electricity production by the utility 	kWh
	// wsg4 Non-water related renewable electricity sold by the utility	kWh
	// wsg5 Heat energy, calculated from steam production and gas flow rates, provided to neighboring  districts for heating or cooling	J
	"wsg1":{description:"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg2":{description:"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg3":{description:"Non-water related renewable electricity production by the utility",magnitude:"Energy",unit:"kWh",},
	"wsg4":{description:"Non-water related renewable electricity sold by the utility",magnitude:"Energy",unit:"kWh",},
	"wsg5":{description:"Heat energy, calculated from steam production and gas flow rates, provided to neighboring  districts for heating or cooling",magnitude:"Energy",unit:"Joule",},

	//L2 Water Abstraction
	// wsa1 Electric energy consumed for pumping abstracted water (from the grid and self-produced)	kWh
	// wsa2 Volume of conveyed water	m3
	// wsa3 Energy recovered in abstracted water	kWh
	"wsa1":{description:"Electric energy consumed for pumping abstracted water (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},
	"wsa2":{description:"Volume of conveyed water",magnitude:"Volume",unit:"m3",},
	"wsa3":{description:"Energy recovered in abstracted water",magnitude:"Energy",unit:"kWh",},

		//L3 Water Abstraction
		// wsa4[n]  Pumping head in each pumping system	m
		// wsa5[n]  Volume pumped in each Pumping System	m3
		// wsa6[n]  enter turbine water volume pumped	m3
		// wsa7[n]  enter turbine head	m
		// wsa8[n]  Water losses	m3
		// wsa9[n]  Mains lenght	km
		// wsa10[n] Friction pipe losses	m
		"wsa4" :{description:"Pumping head in each pumping system", magnitude:"Head",     unit:"m",},
		"wsa5" :{description:"Volume pumped in each Pumping System",magnitude:"Head",     unit:"m3",},
		"wsa6" :{description:"Enter turbine water volume pumped",   magnitude:"Volume",   unit:"m3",},
		"wsa7" :{description:"Enter turbine head",                  magnitude:"Head",     unit:"m",},
		"wsa8" :{description:"Water losses",                        magnitude:"Volume",   unit:"m3",},
		"wsa9" :{description:"Mains lenght",                        magnitude:"Distance", unit:"km",},
		"wsa10":{description:"Friction pipe losses",                magnitude:"Head",     unit:"m",},

	//L2 Water Treatment
	// wst1	Volume of treated water	m3
	// wst2	Electric energy consumed in WTPs (from the grid and self-produced)	kWh
	"wst1":{description:"Volume of treated water",                                           magnitude:"Volume", unit:"m3",},
	"wst2":{description:"Electric energy consumed in WTPs (from the grid and self-produced)",magnitude:"Energy", unit:"kWh",},
		
		//L3 Water Treatment
		// wst3[n]  Treated water quality tests carried out	no.
		// wst4[n]  Compliance of aesthetic tests	no.
		// wst5[n]  Compliance of microbiological tests	no.
		// wst6[n]  Compliance of physical-chemical tests	no.
		// wst7[n]  Compliance of radioactivity tests	no.
		// wst8[n]  Volume of treated water in WTPs with SELECTED TECHNOLOGY //TBD
		// wst14[n] Sludge produced in WTPs 	kg
		// wst15[n] Treatment capacity	m3
		"wst3" :{description:"Treated water quality tests carried out",                 magnitude:"Number", unit:"number",},
		"wst4" :{description:"Compliance of aesthetic tests",                           magnitude:"Number", unit:"number",},
		"wst5" :{description:"Compliance of microbiological tests",                     magnitude:"Number", unit:"number",},
		"wst6" :{description:"Compliance of physical-chemical tests",                   magnitude:"Number", unit:"number",},
		"wst7" :{description:"Compliance of radioactivity tests",                       magnitude:"Number", unit:"number",},
		"wst8" :{description:"Volume of treated water in WTPs with SELECTED TECHNOLOGY",magnitude:"Volume", unit:"m3",},
		"wst14":{description:"Sludge produced in WTPs",                                 magnitude:"Mass",   unit:"kg",},
		"wst15":{description:"Treatment capacity",                                      magnitude:"Volume", unit:"m3",},

	//L2 Water Distribution
	// wsd1	Electric energy consumed for pumping distributed water (from the grid and self-produced)	kWh
	"wsd1":{description:"Electric energy consumed for pumping distributed water (from the grid and self produced)", magnitude:"Energy", unit:"kWh", },
		
		//L3 Water Distribution
		// wsd2[n]  Delivery points with adequate pressure	no.
		// wsd3[n]  Number of service connections	no.
		// wsd4[n]  Time system is pressurised 	hour
		// wsd5[n]  Resident population connected to supply systems	Inhab.
		// wsd6[n]  Serviced population  in supply systems	serv. Pop.
		// wsd7[n]  System input volume 	m3
		// wsd8[n]  Non-revenue water 	m3
		// wsd9[n]  Volume injected	m3
		// wsd10[n] Minimum pressure to be supplied at the distribution nodes	m
		// wsd11[n] Highest node elevation	m asl
		// wsd12[n] Lowest node elevation of the stage	m asl
		// wsd13[n] Average nodes elevation	m asl
		// wsd14[n] Water table elevation node	m
		// wsd15[n] distributed water pumped 	m3
		// wsd16[n] pump head	m
		// wsd17[n] Energy recovered at water distribution	kWh
		// wsd18[n] Mains length	km
		// wsd19[n] Friction pipe losses	m
		"wsd2" :{description:"Delivery points with adequate pressure",                    magnitude:"Number",    unit:"number",},
		"wsd3" :{description:"Number of service connections",                             magnitude:"Number",    unit:"number",},
		"wsd4" :{description:"Time system is pressurised",                                magnitude:"Time",      unit:"hour",},
		"wsd5" :{description:"Resident population connected to supply systems",           magnitude:"Population",unit:"Inhab.",},
		"wsd6" :{description:"Serviced population in supply systems",                     magnitude:"Population",unit:"serv. Pop.",},
		"wsd7" :{description:"System input volume",                                       magnitude:"Volume",    unit:"m3",},
		"wsd8" :{description:"Non-revenue water",                                         magnitude:"Volume",    unit:"m3",},
		"wsd9" :{description:"Volume injected",                                           magnitude:"Volume",    unit:"m3",},
		"wsd10":{description:"Minimum pressure to be supplied at the distribution nodes	",magnitude:"Pressure",  unit:"m",},
		"wsd11":{description:"Highest node elevation",                                    magnitude:"Volume",    unit:"m asl",},
		"wsd12":{description:"Lowest node elevation of the stage",                        magnitude:"Volume",    unit:"m asl",},
		"wsd13":{description:"Average nodes elevation",                                   magnitude:"Volume",    unit:"m asl",},
		"wsd14":{description:"Water table elevation node",                                magnitude:"Volume",    unit:"m",},
		"wsd15":{description:"distributed water pumped",                                  magnitude:"Volume",    unit:"m3",},
		"wsd16":{description:"pump head",                                                 magnitude:"Volume",    unit:"m",},
		"wsd17":{description:"Energy recovered at water distribution",                    magnitude:"Volume",    unit:"kWh",},
		"wsd18":{description:"Mains length",                                              magnitude:"Volume",    unit:"km",},
		"wsd19":{description:"Friction pipe losses",                                      magnitude:"Volume",    unit:"m",},

	//L1 WASTEWATER
	"ww1" :{description:"Energy costs of the wastewater utility",                                             magnitude:"Currency",      unit:"USD",},
	"ww2" :{description:"Running costs of the utility related to the urban wastewater system",                magnitude:"Currency",      unit:"USD",},
	"ww3" :{description:"Total energy consumed from the grid (from power bills) during the assessment period",magnitude:"Energy",        unit:"kWh",},
	"ww4" :{description:"Total volume processed through urban wastewater system",                             magnitude:"Volume",        unit:"m3",},
	"ww5" :{description:"Resident population within the wastewater utility area of service",                  magnitude:"People",        unit:"People",},
	"ww6" :{description:"Resident population connected to Sewer System (SE)",                                 magnitude:"People",        unit:"People",},
	"ww7" :{description:"Serviced population in sewer and WWTP system",                                       magnitude:"People",        unit:"People",},
	"ww8" :{description:"Number of trips to disposal site",                                                   magnitude:"Number",        unit:"Number",},
	"ww9" :{description:"Distance to disposal site",                                                          magnitude:"Distance",      unit:"km",},
	"ww10":{description:"Enter nitrogen effluent limit",                                                      magnitude:"Concentration", unit:"mg/L",},
	"ww11":{description:"Volume of Fuel consumed",                                                            magnitude:"Volume",        unit:"L",},

	//L2 Wastewater General
	// wwg1	Water-related electrical energy produced by the utility (renewable energy) during the assessment period	kWh
	// wwg2	Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period	kWh
	// wwg3	Non-water related renewable electricity production by the utility 	kWh
	// wwg4	Non-water related renewable electricity sold by the utility	kWh
	// wwg5	Heat energy, provided to neighboring  districts for heating or cooling	J
	"wwg1":{description:"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",      magnitude:"Energy",unit:"kWh",},
	"wwg2":{description:"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wwg3":{description:"Non-water related renewable electricity production by the utility",                                            magnitude:"Energy",unit:"kWh",},
	"wwg4":{description:"Non-water related renewable electricity sold by the utility",                                                  magnitude:"Energy",unit:"kWh",},
	"wwg5":{description:"Heat energy, provided to neighboring  districts for heating or cooling",                                       magnitude:"Energy",unit:"Joule",},

	//L2 Wastewater Collection
	// wwc1	Volume of wastewater conveyed to treatment or to an outfall for untreated discharge	m3	
	// wwc2	Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)	kWh	
	"wwc1":{description:"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge",             magnitude:"Volume",unit:"m3",},
	"wwc2":{description:"Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},

		//L3 Wastewater Collection
		// wwc3[n] volume pumped	m3
		// wwc4[n] pump head	m
		"wwc3":{description:"Volume pumped",magnitude:"Volume",unit:"m3",},
		"wwc4":{description:"Pump head",    magnitude:"Head",  unit:"m",},

	//L2 Wastewater Treatment
	// wwt2	 Biogas produced	Nm3
	// wwt8	 Volume of treated wastewater	m3
	// wwt9	 Electric energy consumed in WWTPs (from the grid and self-produced)	kWh
	// wwt10 BOD effluent (average)	kg BOD
	// wwt11 Electrical energy produced in WWTPs from biogas valorization	kWh
	// wwt12 % methane in biogas	%
	// wwt13 BOD influent (average)	mg/L
	// wwt14 BOD mass removed 	kg BOD
	"wwt2" :{description:"Biogas produced",                                                    magnitude:"Volume",       unit:"m3",},
	"wwt8" :{description:"Volume of treated wastewater",                                       magnitude:"Volume",       unit:"m3",},
	"wwt9" :{description:"Electric energy consumed in WWTPs (from the grid and self-produced)",magnitude:"Energy",       unit:"kWh",},
	"wwt10":{description:"BOD effluent (average)",                                             magnitude:"Mass",         unit:"kg",},
	"wwt11":{description:"Electrical energy produced in WWTPs from biogas valorization",       magnitude:"Energy",       unit:"kWh",},
	"wwt12":{description:"Fraction of methane in biogas",                                      magnitude:"Fraction",     unit:"%",},
	"wwt13":{description:"BOD influent (average)",                                             magnitude:"Concentration",unit:"mg/L",},
	"wwt14":{description:"BOD mass removed",                                                   magnitude:"Mass",         unit:"kg",},

		//L3 Wastewater Treatment
		// wwt15[n] Tests complying with discharge consents	no.
		// wwt16[n] Tests carried out in WWTPs	no.
		// wwt17[n] Volume of treated wastewater in WWTPs with trickling filters (TF)	m3
		// wwt23[n] Sludge produced in WWTPs (total weight)	kg
		// wwt24[n] Dry weight in sludge produced	% (w/w)
		// wwt25[n] Treatment capacity	m3
		"wwt15":{description:"Tests complying with discharge consents",                       magnitude:"Number",  unit:"number",},
		"wwt16":{description:"Tests carried out in WWTPs",                                    magnitude:"Number",  unit:"number",},
		"wwt17":{description:"Volume of treated wastewater in WWTPs with SELECTED TECHNOLOGY",magnitude:"Volume",  unit:"m3",},
		"wwt23":{description:"Sludge produced in WWTPs (total weight)",                       magnitude:"Mass",    unit:"kg",},
		"wwt24":{description:"Dry weight in sludge produced",                                 magnitude:"Fraction",unit:"% w/w",},
		"wwt25":{description:"Treatment capacity",                                            magnitude:"Volume",  unit:"m3",},

	//L2 Wastewater Discharge
	//	wwd1	Volume of discharged wastewater	m3
	//	wwd2	Volume of discharged wastewater without treatment	m3
	//	wwd3	Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)	kWh
	//	wwd4	Energy recovered in wastewater discharged	kWh
	"wwd1":{description:"Volume of discharged wastewater",                                                             magnitude:"Volume",unit:"m3",},
	"wwd2":{description:"Volume of discharged wastewater without treatment",                                           magnitude:"Volume",unit:"m3",},
	"wwd3":{description:"Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},
	"wwd4":{description:"Energy recovered in wastewater discharged",                                                   magnitude:"Energy",unit:"kWh",},
		
		//L3 Wastewater Discharge
		//   wwd5[n] Enter volume pumped	
		//   wwd6[n] Enter head pumped against	
		//   wwd7[n] Enter turbine water volume pumped	m3
		//   wwd8[n] Enter turbine head	m
		"wwd5":{description:"Enter volume pumped",              magnitude:"Volume",unit:"m3",},
		"wwd6":{description:"Enter head pumped against",        magnitude:"Head",  unit:"m",},
		"wwd7":{description:"Enter turbine water volume pumped",magnitude:"Volume",unit:"m3",},
		"wwd8":{description:"Enter turbine head",               magnitude:"Head",  unit:"m3",},
}
