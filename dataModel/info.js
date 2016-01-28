/** CODE TO DEAL WITH VARIABLE DESCRIPTIONS */

/** 
	Info: object to store all variable descriptions and units
	Format:
		"code":{
			"description" : string,
			"magnitude"	  : string,
			"unit"		  : string,
		},

 	then, the function "Info.locateVariable" helps to locate the level and sublevel
*/

var Info = {
	//L1 UWS
	"uw1":{description:"Conversion factor for grid electricity",magnitude:"Conversion",unit:"kgCO2e/kWh",},
	c_uw50:{description:"Energy Costs",magnitude:"Currency",unit:"USD"},
	c_uw51:{description:"Running Costs",magnitude:"Currency",unit:"USD"},
	c_uw52:{description:"Total electric energy consumed from the grid and from self-production",magnitude:"Energy",unit:"kWh"},

	//L1 WATER SUPPLY
	"ws1":{description:"Serviced population within the water utility area of service",                           magnitude:"People",  unit:"People",},
	"ws2":{description:"Resident population within the water utility area of service",                           magnitude:"People",  unit:"People",},
	"ws3":{description:"Energy costs during the entire assessment period",                                       magnitude:"Currency",unit:"USD",},
	"ws4":{description:"Running costs during the entire assessment period",                                      magnitude:"Currency",unit:"USD",},
	"ws5":{description:"Total energy consumed from the grid (from power bills) during the assessment period",    magnitude:"Energy",  unit:"kWh",},
	"ws6":{description:"Total volume produced for urban drinking water system",                                  magnitude:"Volume",  unit:"m3",},
	"ws7":{description:"Volume of authorized consumption",                                                       magnitude:"Volume",  unit:"m3",},
	"ws8":{description:"Water loss from leaks in the distribution system, as known or estimated by the Utility", magnitude:"Percent", unit:"%",},
	"ws9":{description:"Volume of Fuel consumed",                                                                magnitude:"Volume",  unit:"m3",},
	c_ws50:{description:"Energ Fuel Cons (engines)",                                                             magnitude:"Energy",  unit:"TJ",},
	c_ws51:{description:"Direct CO2 emitted in wastewater stages from on-site engines",                          magnitude:"Mass",    unit:"kg",},

	//L2 Water Supply General
	"wsg1":{description:"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg2":{description:"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg3":{description:"Non-water related renewable electricity production by the utility",    magnitude:"Energy",unit:"kWh",},
	"wsg4":{description:"Non-water related renewable electricity sold by the utility",          magnitude:"Energy",unit:"kWh",},
	"wsg5":{description:"Heat energy, provided to neighboring districts for heating or cooling",magnitude:"Energy",unit:"Joule",},
	c_wsg50:{description:"Net total process related grid energy consumed by the utility related to the urban drinking water system",magnitude:"Energy",unit:"kWh"},
	c_wsg51:{description:"Net total process related grid energy consumed by the utility",       magnitude:"Energy",unit:"kWh"},
	c_wsg52:{description:"Non process related grid energy consumed by the utility",             magnitude:"Energy",unit:"kWh"},

	//L2 Water Abstraction
	"wsa1":{description:"Electric energy consumed for pumping abstracted water (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},
	"wsa2":{description:"Volume of conveyed water",magnitude:"Volume",unit:"m3",},
	"wsa3":{description:"Energy recovered in abstracted water",magnitude:"Energy",unit:"kWh",},

		//L3 Water Abstraction
		"wsa4" :{description:"Pumping head in each pumping system", magnitude:"Head",     unit:"m",},
		"wsa5" :{description:"Volume pumped in each Pumping System",magnitude:"Head",     unit:"m3",},
		"wsa6" :{description:"Enter turbine water volume pumped",   magnitude:"Volume",   unit:"m3",},
		"wsa7" :{description:"Enter turbine head",                  magnitude:"Head",     unit:"m",},
		"wsa8" :{description:"Water losses",                        magnitude:"Volume",   unit:"m3",},
		"wsa9" :{description:"Mains lenght",                        magnitude:"Distance", unit:"km",},
		"wsa10":{description:"Friction pipe losses",                magnitude:"Head",     unit:"m",},
		c_wsa50:{description:"[Sum](abstracted water volume pumped x pump head in meters)",magnitude:"Volume x Head",unit:"m3 x 100m"},

	//L2 Water Treatment
	"wst1":{description:"Volume of treated water",                                           magnitude:"Volume", unit:"m3",},
	"wst2":{description:"Electric energy consumed in WTPs (from the grid and self-produced)",magnitude:"Energy", unit:"kWh",},
		
		//L3 Water Treatment
		"wst3" :{description:"Treated water quality tests carried out",                   magnitude:"Number",    unit:"number",},
		"wst4" :{description:"Compliance of aesthetic tests",                             magnitude:"Number",    unit:"number",},
		"wst5" :{description:"Compliance of microbiological tests",                       magnitude:"Number",    unit:"number",},
		"wst6" :{description:"Compliance of physical-chemical tests",                     magnitude:"Number",    unit:"number",},
		"wst7" :{description:"Compliance of radioactivity tests",                         magnitude:"Number",    unit:"number",},
		"wst8" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",magnitude:"Volume",    unit:"m3",},	
		"wst9" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/Filt/Des",  magnitude:"Volume",    unit:"m3",},	
		"wst10":{description:"Volume of treated water in WTPs with C/F/S/Filt/Des",       magnitude:"Volume",    unit:"m3",},
		"wst11":{description:"Volume of treated water in WTPs with C/F/Filt/Des",         magnitude:"Volume",    unit:"m3",},
		"wst12":{description:"Volume of treated water in WTPs with Des",                  magnitude:"Volume",    unit:"m3",},
		"wst13":{description:"Volume of treated water in WTPs with other",                magnitude:"Volume",    unit:"m3",},
		"wst14":{description:"Sludge produced in WTPs",                                   magnitude:"Mass",      unit:"kg",},
		"wst15":{description:"Treatment capacity",                                        magnitude:"Volume",    unit:"m3",},
		"wst16":{description:"Tests complying with discharge consents",                   magnitude:"Number",    unit:"number",},
		c_wst50:{description:"Percentage of tests complying with regulations",            magnitude:"Percentage",unit:"%"},

	//L2 Water Distribution
	"wsd1":{description:"Electric energy consumed for pumping distributed water (from the grid and self produced)", magnitude:"Energy", unit:"kWh", },
		
		//L3 Water Distribution
		"wsd2" :{description:"Delivery points with adequate pressure",                                  magnitude:"Number",    unit:"number",},
		"wsd3" :{description:"Number of service connections",                                           magnitude:"Number",    unit:"number",},
		"wsd4" :{description:"Time system is pressurised",                                              magnitude:"Time",          unit:"hour",},
		"wsd5" :{description:"Resident population connected to supply systems",                         magnitude:"Population",    unit:"Inhab.",},
		"wsd6" :{description:"Serviced population in supply systems",                                   magnitude:"Population",    unit:"serv. Pop.",},
		"wsd7" :{description:"System input volume",                                                     magnitude:"Volume",        unit:"m3",},
		"wsd8" :{description:"Non-revenue water",                                                       magnitude:"Volume",        unit:"m3",},
		"wsd9" :{description:"Volume injected",                                                         magnitude:"Volume",        unit:"m3",},
		"wsd10":{description:"Minimum pressure to be supplied at the distribution nodes	",              magnitude:"Pressure",      unit:"m",},
		"wsd11":{description:"Highest node elevation",                                                  magnitude:"Volume",        unit:"m asl",},
		"wsd12":{description:"Lowest node elevation of the stage",                                      magnitude:"Volume",        unit:"m asl",},
		"wsd13":{description:"Average nodes elevation",                                                 magnitude:"Volume",        unit:"m asl",},
		"wsd14":{description:"Water table elevation node",                                              magnitude:"Volume",        unit:"m",},
		"wsd15":{description:"Distributed water pumped",                                                magnitude:"Volume",        unit:"m3",},
		"wsd16":{description:"Pump head",                                                               magnitude:"Volume",        unit:"m",},
		"wsd17":{description:"Energy recovered at water distribution",                                  magnitude:"Volume",        unit:"kWh",},
		"wsd18":{description:"Mains length",                                                            magnitude:"Volume",        unit:"km",},
		"wsd19":{description:"Friction pipe losses",                                                    magnitude:"Volume",        unit:"m",},
		c_wsd50:{description:"Natural energy provided (gravity energy from supply to distribution)",    magnitude:"Energy",        unit:"kWh"},
		c_wsd51:{description:"Minimum required energy for the system to operate by users (theoretical)",magnitude:"Energy",        unit:"kWh"},
		c_wsd52:{description:"Total supplied energy to the network (natural plus shaft), real system",  magnitude:"Energy",        unit:"kWh"},
		c_wsd53:{description:"Topographic energy supplied to the system",                               magnitude:"Energy",        unit:"kWh"},
		c_wsd54:{description:"[Sum](distributed water volume pumped x pump head in meters)",            magnitude:"Volume x head", unit:"m3x100m"},

	//L1 WASTEWATER
	"ww1" :{description:"Energy costs of the wastewater utility",                                             magnitude:"Currency",      unit:"USD",},
	"ww2" :{description:"Running costs of the utility related to the urban wastewater system",                magnitude:"Currency",      unit:"USD",},
	"ww3" :{description:"Total energy consumed from the grid (from power bills) during the assessment period",magnitude:"Energy",        unit:"kWh",},
	"ww4" :{description:"Total volume of wastewater collected prior to dilution",                             magnitude:"Volume",        unit:"m3",},
	"ww5" :{description:"Resident population within the wastewater utility area of service",                  magnitude:"People",        unit:"People",},
	"ww6" :{description:"Resident population connected to Sewer System (SE)",                                 magnitude:"People",        unit:"People",},
	"ww7" :{description:"Serviced population in sewer and WWTP system",                                       magnitude:"People",        unit:"People",},
	"ww8" :{description:"Number of trips to disposal site",                                                   magnitude:"Number",        unit:"Number",},
	"ww9" :{description:"Distance to disposal site",                                                          magnitude:"Distance",      unit:"km",},
	"ww10":{description:"Enter nitrogen effluent limit",                                                      magnitude:"Concentration", unit:"mg/L",},
	"ww11":{description:"Volume of Fuel consumed",                                                            magnitude:"Volume",        unit:"L",},
	"ww12":{description:"Amount of recovered biogas",                                                         magnitude:"Volume",        unit:"m3",},
	"ww13":{description:"Annual per capita protein consumption <select onchange=Global.Waste.ww13=parseFloat(this.value);init()><option value=0>--select country--<option value=20.8>Thailand (20.8)<option value=24.5>Peru (24.5)<option value=33.6>Mexico (33.6)</select>", magnitude:"Annual per capita consumption",   unit:"kg/person/year",},
	"ww14":{description:"BOD per person per day", magnitude:"Mass/inhab/time",   unit:"g/person/day",},
	c_ww50:{description:"Biogas production based in the population",magnitude:"Volume",unit:"Nm3"},
	c_ww51:{description:"N2O emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kg"},
	c_ww52:{description:"CH4 emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kg"},
	c_ww53:{description:"N2O emitted from wastewater effluent discharged",magnitude:"Mass",unit:"kg"},
	c_ww54:{description:"Indirect CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion",magnitude:"Mass",unit:"kg"},
	c_ww55:{description:"Methane (CO2e) emitted in wastewater treatment plants",magnitude:"Mass",unit:"kg"},
	c_ww56:{description:"Energy fuel cons",magnitude:"Energy",unit:"kWh"},
	c_ww57:{description:"Direct CO2 emitted in wastewater stages from on-site engines (KPI)",magnitude:"Mass",unit:"kg"},
	c_ww58:{description:"Energy fuel cons (sludge)",magnitude:"Energy",unit:"kWh",},

	//L2 Wastewater General
	"wwg1":{description:"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",      magnitude:"Energy",unit:"kWh",},
	"wwg2":{description:"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wwg3":{description:"Non-water related renewable electricity production by the utility",                                            magnitude:"Energy",unit:"kWh",},
	"wwg4":{description:"Non-water related renewable electricity sold by the utility",                                                  magnitude:"Energy",unit:"kWh",},
	"wwg5":{description:"Heat energy, provided to neighboring  districts for heating or cooling",                                       magnitude:"Energy",unit:"Joule",},
	c_wwg50:{description:"Total electrical energy consumed from the grid and from self-production related to the urban wastewater system",magnitude:"Energy",unit:"kWh",},
	c_wwg51:{description:"Net total process related grid energy consumed by the utility",magnitude:"Energy",unit:"kWh",},

	//L2 Wastewater Collection
	"wwc2":{description:"Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},

		//L3 Wastewater Collection
		"wwc3" :{description:"Volume pumped",                                    magnitude:"Volume",unit:"m3",},
		"wwc4" :{description:"Pump head",                                        magnitude:"Head",  unit:"m",},
		c_wwc50:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m",},
		c_wwc51:{description:"Volume of dilution from Infiltration and Inflow",  magnitude:"Volume",unit:"m3",},

	//L2 Wastewater Treatment
	"wwt1" :{description:"Wastewater load (BOD)",magnitude:"Mass",unit:"kg",},
	"wwt2" :{description:"Biogas produced",magnitude:"Volume",unit:"m3",},
	"wwt3" :{description:"Biogas valorised",magnitude:"Volume",unit:"m3",},
	"wwt5" :{description:"TN effluent concentration",magnitude:"Concentration",unit:"mg/L",},
	"wwt6" :{description:"Influent nitrogen load",magnitude:"Mass",unit:"kg",},
	"wwt8" :{description:"Volume of treated wastewater",                                                    magnitude:"Volume",       unit:"m3",},
	"wwt9" :{description:"Electric energy consumed in WWTPs (from the grid and self-produced)",             magnitude:"Energy",       unit:"kWh",},
	"wwt10":{description:"BOD effluent (average)",                                                          magnitude:"Mass",         unit:"kg",},
	"wwt11":{description:"Electrical energy produced in WWTPs from biogas valorization",                    magnitude:"Energy",       unit:"kWh",},
	"wwt12":{description:"Fraction of methane in biogas",                                                   magnitude:"Fraction",     unit:"%",},
	"wwt13":{description:"BOD influent (average)",                                                          magnitude:"Concentration",unit:"mg/L",},
	"wwt14":{description:"BOD mass removed",                                                                magnitude:"Mass",         unit:"kg",},
	c_wwt50:{description:"Biogas flared",                                                                   magnitude:"Volume",       unit:"Nm3"},
	c_wwt51:{description:"Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e",  magnitude:"Mass",         unit:"kg"},
	c_wwt52:{description:"CH4 emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kg"},
	c_wwt53:{description:"Total Energy content of biogas valorized in the Co-generator",                    magnitude:"Energy",       unit:"kWh"},
	c_wwt54:{description:"Indirect CO2e emitted in sludge transport",                                       magnitude:"Mass",         unit:"kg"},
	c_wwt55:{description:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent",magnitude:"Mass",         unit:"kg"},
	c_wwt56:{description:"N2O emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kg",},
	c_wwt57:{description:"Energ Fuel Cons(iS1)",                                                            magnitude:"Mass",         unit:"kg"},
	c_wwt58:{description:"Total annual amount of nitrogen discharged directly to aquatic environment",      magnitude:"Mass",         unit:"kg",},
	c_wwt59:{description:"Methane (CO2e) emitted in wastewater treatment plants",                           magnitude:"Mass",            unit:"kg",},

		//L3 Wastewater Treatment
		"wwt15":{description:"Tests complying with discharge consents",                                        magnitude:"Number",  unit:"number",},
		"wwt16":{description:"Tests carried out in WWTPs",                                                     magnitude:"Number",  unit:"number",},
		"wwt17":{description:"Volume of treated wastewater in WWTPs with trickling filters (TF)",              magnitude:"Volume",  unit:"m3",},
		"wwt18":{description:"Volume of treated wastewater in WWTPs with activated sludge (AS)",               magnitude:"Volume",  unit:"m3",},
		"wwt19":{description:"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)", magnitude:"Volume",  unit:"m3",},
		"wwt20":{description:"Volume of treated wastewater in WWTPs with AS nitrification and C/F",            magnitude:"Volume",  unit:"m3",},
		"wwt21":{description:"Volume of treated wastewater in WWTPs with Laggons",                             magnitude:"Volume",  unit:"m3",},
		"wwt22":{description:"Volume of treated wastewater in WWTPs with other",                               magnitude:"Volume",  unit:"m3",},
		"wwt23":{description:"Sludge produced in WWTPs (total weight)",                                        magnitude:"Mass",    unit:"kg",},
		"wwt24":{description:"Dry weight in sludge produced",                                                  magnitude:"Fraction",unit:"% w/w",},
		"wwt25":{description:"Treatment capacity",                                                             magnitude:"Volume",  unit:"m3",},
		c_wwt60:{description:"Percentage of test complying with regulations",                                  magnitude:"Percentage",unit:"%",},

	//L2 Wastewater Discharge
	"wwd1":{description:"Volume of discharged wastewater",                                                             magnitude:"Volume",unit:"m3",},
	"wwd2":{description:"Volume of discharged wastewater without treatment",                                           magnitude:"Volume",unit:"m3",},
	"wwd3":{description:"Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},
	"wwd4":{description:"Energy recovered in wastewater discharged",                                                   magnitude:"Energy",unit:"kWh",},
		
		//L3 Wastewater Discharge
		"wwd5" :{description:"Enter volume pumped",                              magnitude:"Volume",       unit:"m3"},
		"wwd6" :{description:"Enter head pumped against",                        magnitude:"Head",         unit:"m"},
		"wwd7" :{description:"Enter turbine water volume pumped",                magnitude:"Volume",       unit:"m3"},
		"wwd8" :{description:"Enter turbine head",                               magnitude:"Head",         unit:"m3"},
		c_wwd50:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m"},
		c_wwd51:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m"},
	
	//PERFORMANCE INDICATORS LEVEL 1
	wS4	   :{description:"Resident population connected to supply system",		                                                           magnitude:"Percent",           unit:"%"},
	wS5	   :{description:"Non-revenue water by volume",                                                                                    magnitude:"Percent",           unit:"%"},	
	gE1w   :{description:"Energy costs ratio",                                                                                             magnitude:"Ratio",             unit:"-"},
	gE2w   :{description:"Energy consumption for the urban drinking water system per capita",	                                           magnitude:"Energy/inhab/time", unit:"kWh/inhab/year"},
	gE3w   :{description:"Energy consumption for the urban drinking water system per serviced population",	                               magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop/year"},
	gE4w   :{description:"Energy consumption for the urban drinking water system per authorized consumption",	                           magnitude:"Energy/Volume",     unit:"kWh/m3"},
	wGHG1  :{description:"Drinking water GHG emissions per capita",                                                                        magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wGHG2  :{description:"Drinking water GHG emissions per serviced population",                                                           magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG3  :{description:"Drinking water GHG emissions per authorized consumption",                                                        magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG4  :{description:"GHG emissions from utility activities other than those from electricity consumption per serviced population",    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG5  :{description:"GHG emissions from utility activities other than those from electricity consumption per authorized consumption", magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG6  :{description:"GHG emissions from electricity consumption per serviced population",  	                                       magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG7  :{description:"GHG emissions from electricity consumption per authorized consumption",  	                                       magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wwS1   :{description:"Resident population connected to sewer system",                                                                  magnitude:"Percent",           unit:"%"},
	wwS2   :{description:"Treated Wastewater in WWTP",                                                                                     magnitude:"Percent",           unit:"%"},
	gE1ww  :{description:"Energy costs ratio",                                                                                             magnitude:"Percent",           unit:"%"},
	gE2ww  :{description:"Energy consumption for the urban wastewater system per capita",	                                               magnitude:"Energy/inhab/time", unit:"kWh/inhab./year"},
	gE3ww  :{description:"Energy consumption for the urban wastewater system per serviced population",	                                   magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop./year"},
	gE4ww  :{description:"Energy consumption for the urban wastewater system per collected wastewater volume", 	                           magnitude:"Energy/Volume",     unit:"kWh/m3"},
	wwGHG1 :{description:"GHG emissionsfrom Wastewater system per capita",                                                                 magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wwGHG2 :{description:"GHG emissionsfrom Wastewater system per serviced population",                                                    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wwGHG3 :{description:"GHG emissionsfrom Wastewater system per collected wastewater volume",	                                           magnitude:"Mass/inhab/time",   unit:"kgCO2e/m3"},
	wwGHG7 :{description:"GHG emissions from electricity consumption per collected wastewater",	                                           magnitude:"Mass/inhab/time",   unit:"kgCO2e/m3"},
}
