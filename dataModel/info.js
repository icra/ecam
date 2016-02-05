/** CODE TO DEAL WITH VARIABLE DESCRIPTIONS */

/** 
	Info: object to store all variable descriptions and units
	Format:
		"code":{
			"description" : string,
			"magnitude"	  : string,
			"unit"		  : string,
			"explanation" : string, (defined at the end)
		},

 	then, the function "Info.locateVariable" helps to locate the level and sublevel
*/

var Info = {
	//L1 UWS
	"uw1" :{description:"Conversion factor for grid electricity",                                 magnitude:"Conversion",unit:"kgCO2e/kWh",},
	c_uw50:{description:"Energy costs",                                                           magnitude:"Currency",  unit:"USD"},
	c_uw51:{description:"Running costs",                                                          magnitude:"Currency",  unit:"USD"},
	c_uw52:{description:"Total electrical energy consumed from the grid and from self-production",magnitude:"Energy",    unit:"kWh"},

	//L1 WATER SUPPLY
	"ws1":{description:"Serviced population",                                              magnitude:"People",  unit:"People",},
	"ws2":{description:"Resident population",                                              magnitude:"People",  unit:"People",},
	"ws3":{description:"Energy costs",                                                     magnitude:"Currency",unit:"USD",},
	"ws4":{description:"Running costs ",                                                   magnitude:"Currency",unit:"USD",},
	"ws5":{description:"Energy consumed from the grid",                                    magnitude:"Energy",  unit:"kWh",},
	"ws6":{description:"Total volume produced for urban drinking water system",            magnitude:"Volume",  unit:"m3",},
	"ws7":{description:"Volume of authorized consumption",                                 magnitude:"Volume",  unit:"m3",},
	"ws8":{description:"Percent of Non Revenue Water",                                     magnitude:"Percent", unit:"%",},
	"ws9":{description:"Volume of Fuel consumed",                                          magnitude:"Volume",  unit:"m3",},
	c_ws50:{description:"Energ Fuel Cons (engines)",                                       magnitude:"Energy",  unit:"TJ",},
	c_ws51:{description:"Direct CO2 emitted in driking water stages from on-site engines", magnitude:"Mass",    unit:"kg",},

	//L2 Water Supply General
	"wsg1":{description:"Water-related energy produced",                                   magnitude:"Energy",unit:"kWh",},
	"wsg2":{description:"Water-related energy produced sold to the grid",                  magnitude:"Energy",unit:"kWh",},
	"wsg3":{description:"Non-water related energy produced",                               magnitude:"Energy",unit:"kWh",},
	"wsg4":{description:"Non-water related energy produced sold to the grid",              magnitude:"Energy",unit:"kWh",},
	"wsg5":{description:"Heat energy valorized from water",                                magnitude:"Energy",unit:"Joule",},
	c_wsg50:{description:"Total electrical energy consumed from the grid and from self-production related to the urban drinking water system",magnitude:"Energy",unit:"kWh"},
	c_wsg51:{description:"Net total process related energy consumed by the utility related to the urban drinking water system",magnitude:"Energy",unit:"kWh"},
	c_wsg52:{description:"<b style=color:red>TBD</b> GHG emission offset from using the Heat energy from water instead of fuel for neighboring  districts for heating or cooling",magnitude:"Energy",unit:"kWh"},

	//L2 Water Abstraction
	"wsa1":{description:"Total electric energy consumption",        magnitude:"Energy",unit:"kWh",},
	"wsa2":{description:"Volume of conveyed water",                 magnitude:"Volume",unit:"m3",},
	"wsa3":{description:"Electric energy produced from turbines",   magnitude:"Energy",unit:"kWh",},

		//L3 Water Abstraction
		"wsa4" :{description:"Pumping head in each pumping system",  magnitude:"Head",     unit:"m",},
		"wsa5" :{description:"Volume pumped in each Pumping System", magnitude:"Head",     unit:"m3",},
		"wsa6" :{description:"Turbine water volume",                 magnitude:"Volume",   unit:"m3",},
		"wsa7" :{description:"Turbine head",                         magnitude:"Head",     unit:"m",},
		"wsa8" :{description:"Water losses",                         magnitude:"Volume",   unit:"m3",},
		"wsa9" :{description:"Mains lenght",                         magnitude:"Distance", unit:"km",},
		"wsa10":{description:"Friction pipe losses",                 magnitude:"Head",     unit:"m",},
		c_wsa50:{description:"[Sum](abstracted water volume pumped x pump head in meters)",magnitude:"Volume x Head",unit:"m3 x 100m"},

	//L2 Water Treatment
	"wst1":{description:"Volume of treated water", magnitude:"Volume", unit:"m3",},
	"wst2":{description:"Total energy consumed",   magnitude:"Energy", unit:"kWh",},
		
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
		c_wst50:{description:"Percentage of tests complying with regulations",            magnitude:"Percent",   unit:"%"},

	//L2 Water Distribution
	"wsd1"  :{description:"Total energy consumed",                                              magnitude:"Energy",     unit:"kWh", },
	"wsd5"  :{description:"Resident population connected to the drinking water supply systems", magnitude:"Population", unit:"Inhab",},
	"wsd6"  :{description:"Serviced population in supply systems",                              magnitude:"Population", unit:"serv. Pop.",},
	"wsd7"  :{description:"Distribution system input volume",                                   magnitude:"Volume",     unit:"m3",},
	"wsd8"  :{description:"Non-revenue water in distribution system",                           magnitude:"Volume",     unit:"m3",},
	"wsd20" :{description:"Volume of authorized consumption",                                   magnitude:"Volume",     unit:"m3",},
		
		//L3 Water Distribution
		"wsd2" :{description:"Delivery points with adequate pressure",                                  magnitude:"Number",    unit:"number",},
		"wsd3" :{description:"Number of service connections",                                           magnitude:"Number",    unit:"number",},
		"wsd4" :{description:"Time system is pressurised",                                              magnitude:"Time",          unit:"hour",},
		"wsd9" :{description:"Volume injected",                                                         magnitude:"Volume",        unit:"m3",},
		"wsd10":{description:"Minimum pressure to be supplied at the distribution nodes	",              magnitude:"Pressure",      unit:"m",},
		"wsd11":{description:"Highest node elevation",                                                  magnitude:"Distance",        unit:"m asl",},
		"wsd12":{description:"Lowest node elevation of the stage",                                      magnitude:"Distance",        unit:"m asl",},
		"wsd13":{description:"Average nodes elevation",                                                 magnitude:"Distance",        unit:"m asl",},
		"wsd14":{description:"Water table elevation node",                                              magnitude:"Distance",        unit:"m",},
		"wsd15":{description:"Distributed water pumped",                                                magnitude:"Volume",        unit:"m3",},
		"wsd16":{description:"Pump head",                                                               magnitude:"Head",        unit:"m",},
		"wsd17":{description:"Energy recovered at water distribution",                                  magnitude:"Energy",        unit:"kWh",},
		"wsd18":{description:"Mains length",                                                            magnitude:"Distance",        unit:"km",},
		"wsd19":{description:"Friction pipe losses",                                                    magnitude:"Head",        unit:"m",},
		c_wsd50:{description:"Natural energy provided (gravity energy from supply to distribution)",    magnitude:"Energy",        unit:"kWh"},
		c_wsd51:{description:"Minimum required energy for the system to operate by users (theoretical)",magnitude:"Energy",        unit:"kWh"},
		c_wsd52:{description:"Total supplied energy to the network (natural plus shaft), real system",  magnitude:"Energy",        unit:"kWh"},
		c_wsd53:{description:"Topographic energy supplied to the system",                               magnitude:"Energy",        unit:"kWh"},
		c_wsd54:{description:"[Sum](distributed water volume pumped x pump head in meters)",            magnitude:"Volume x head", unit:"m3x100m"},

	//L1 WASTEWATER
	"ww1" :{description:"Energy costs",                                 magnitude:"Currency",      unit:"USD",},
	"ww2" :{description:"Running costs",                                magnitude:"Currency",      unit:"USD",},
	"ww3" :{description:"Energy consumed from the grid",                magnitude:"Energy",        unit:"kWh",},
	"ww4" :{description:"Volume of collected wastewater",               magnitude:"Volume",        unit:"m3",},
	"ww5" :{description:"Resident population",                          magnitude:"People",        unit:"People",},
	"ww6" :{description:"Population connected to sewers",               magnitude:"People",        unit:"People",},
	"ww7" :{description:"Serviced population in wastewater system",     magnitude:"People",        unit:"People",},
	"ww8" :{description:"Number of trips to sludge disposal site",      magnitude:"Number",        unit:"Number",},
	"ww9" :{description:"Distance to sludge disposal site",             magnitude:"Distance",      unit:"km",},
	"ww10":{description:"Total Nitrogen concentration effluent limit",  magnitude:"Concentration", unit:"mg/L",},
	"ww11":{description:"Volume of Fuel consumed",                      magnitude:"Volume",        unit:"L",},
	"ww12":{description:"Amount of recovered biogas",                   magnitude:"Volume",        unit:"m3",},
	"ww13":{description:"Annual per capita protein consumption <select id=ww13options onchange=Global.Waste.ww13=parseFloat(this.value);init()> <option value=0>--select country--<option value=20.8>Thailand (20.8)<option value=24.5>Peru (24.5)<option value=33.6>Mexico (33.6) </select> ", magnitude:"Annual per capita consumption",   unit:"kg/person/year",},
	"ww14":{description:"BOD5 per person per day", magnitude:"Mass/inhab/time",   unit:"g/person/day",},
	"ww15":{description:"Treated wastewater volume", magnitude:"Volume",   unit:"m3",},
	c_ww50:{description:"Biogas flared",magnitude:"Volume",unit:"Nm3"},
	c_ww51:{description:"N2O emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kg"},
	c_ww52:{description:"CH4 emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kg"},
	c_ww53:{description:"N2O emitted from treated wastewater effluent discharged",magnitude:"Mass",unit:"kg"},
	c_ww54:{description:"CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion",magnitude:"Mass",unit:"kgCO2e"},
	c_ww55:{description:"Methane (CO2e) emitted in wastewater treatment plants",magnitude:"Mass",unit:"kgCO2e"},
	c_ww56:{description:"Energy of fuel consumed for onsite engines",magnitude:"Energy",unit:"kWh"},
	c_ww57:{description:"Direct CO2 emitted in wastewater stages from on-site engines",magnitude:"Mass",unit:"kgCO2e"},
	c_ww58:{description:"Energy of fuel consumed for sludge transport",magnitude:"Energy",unit:"kWh",},

	//L2 Wastewater General
	"wwg1":{description:"Water-related energy produced",                  magnitude:"Energy",unit:"kWh",},
	"wwg2":{description:"Water-related energy produced sold to the grid", magnitude:"Energy",unit:"kWh",},
	"wwg3":{description:"Non-water related energy produced",                                            magnitude:"Energy",unit:"kWh",},
	"wwg4":{description:"Non-water related energy produced sold to the grid",                                                  magnitude:"Energy",unit:"kWh",},
	"wwg5":{description:"Heat energy valorized from wastewater",                                       magnitude:"Energy",unit:"Joule",},
	c_wwg50:{description:"Total electrical energy consumed from the grid and from self-production related to the wastewater system",magnitude:"Energy",unit:"kWh",},
	c_wwg51:{description:"Net total process related grid energy consumed by the utility related to the wastewater system",magnitude:"Energy",unit:"kWh",},
	c_wwg52:{description:"<b style=color:red>TBD</b> GHG emission offset from using the Heat energy from wastewater instead of fuel for neighboring districts for heating or cooling",magnitude:"Energy",unit:"kWh",},

	//L2 Wastewater Collection
	"wwc1":{description:"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge",magnitude:"Energy",unit:"kWh",},
	"wwc2":{description:"Total electric energy consumption",magnitude:"Energy",unit:"kWh",},

		//L3 Wastewater Collection
		"wwc3" :{description:"Volume pumped",                                    magnitude:"Volume",unit:"m3",},
		"wwc4" :{description:"Pump head",                                        magnitude:"Head",  unit:"m",},
		c_wwc50:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m",},
		c_wwc51:{description:"Volume of dilution from Infiltration and Inflow",  magnitude:"Volume",unit:"m3",},

	//L2 Wastewater Treatment
	"wwt1" :{description:"Wastewater load (BOD)",magnitude:"Mass",unit:"kg",},
	"wwt2" :{description:"Biogas produced",magnitude:"Volume",unit:"m3",},
	"wwt3" :{description:"Biogas valorised",magnitude:"Volume",unit:"m3",},
	"wwt5" :{description:"Effluent TN load",magnitude:"Concentration",unit:"mg/L",},
	"wwt6" :{description:"Total nitrogen load in the influent",magnitude:"Mass",unit:"kg",},
	"wwt8" :{description:"Volume of treated wastewater",                                                    magnitude:"Volume",       unit:"m3",},
	"wwt9" :{description:"Total electric energy consmption",                                                magnitude:"Energy",       unit:"kWh",},
	"wwt10":{description:"Effluent BOD5",                                                                   magnitude:"Mass",         unit:"kg",},
	"wwt11":{description:"Electrical energy produced from biogas valorization",                             magnitude:"Energy",       unit:"kWh",},
	"wwt12":{description:"Fraction of methane in biogas",                                                   magnitude:"Fraction",     unit:"%",},
	"wwt13":{description:"Influent BOD5 concentration",                                                     magnitude:"Concentration",unit:"mg/L",},
	"wwt14":{description:"BOD mass removed",                                                                magnitude:"Mass",         unit:"kg",},
	c_wwt50:{description:"Biogas flared",                                                                   magnitude:"Volume",       unit:"Nm3"},
	c_wwt51:{description:"Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e",  magnitude:"Mass",         unit:"kg"},
	c_wwt52:{description:"CH4 emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kg"},
	c_wwt53:{description:"Total Energy content of biogas valorized in the Co-generator",                    magnitude:"Energy",       unit:"kWh"},
	c_wwt54:{description:"BOD5 mass removed",                                                               magnitude:"Mass",         unit:"kg"},
	c_wwt55:{description:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent",magnitude:"Mass",         unit:"kg"},
	c_wwt56:{description:"N2O emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kg",},
	c_wwt57:{description:"Energy equivalent of fuel usage in the truck to disposal site",                   magnitude:"Mass",         unit:"kg"},
	c_wwt58:{description:"Total annual amount of nitrogen discharged directly to aquatic environment",      magnitude:"Mass",         unit:"kg",},
	c_wwt59:{description:"Methane (CO2e) emitted in wastewater treatment plants",                           magnitude:"Mass",         unit:"kg",},
	c_wwt60:{description:"N2O emitted from treated wastewater effluent discharged",							magnitude:"Mass",         unit:"kg",},

		//L3 Wastewater Treatment
		"wwt15":{description:"Number of water quality tests complying",                                        magnitude:"Number",  unit:"number",},
		"wwt16":{description:"Number of water quality tests conducted",                                        magnitude:"Number",  unit:"number",},
		"wwt17":{description:"Volume of treated wastewater in WWTPs with trickling filters (TF)",              magnitude:"Volume",  unit:"m3",},
		"wwt18":{description:"Volume of treated wastewater in WWTPs with activated sludge (AS)",               magnitude:"Volume",  unit:"m3",},
		"wwt19":{description:"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)", magnitude:"Volume",  unit:"m3",},
		"wwt20":{description:"Volume of treated wastewater in WWTPs with AS nitrification and C/F",            magnitude:"Volume",  unit:"m3",},
		"wwt21":{description:"Volume of treated wastewater in WWTPs with Laggons",                             magnitude:"Volume",  unit:"m3",},
		"wwt22":{description:"Volume of treated wastewater in WWTPs with other",                               magnitude:"Volume",  unit:"m3",},
		"wwt23":{description:"Sludge produced in WWTPs (total weight)",                                        magnitude:"Mass",    unit:"kg",},
		"wwt24":{description:"Dry weight in sludge produced",                                                  magnitude:"Fraction",unit:"% w/w",},
		"wwt25":{description:"Treatment capacity",                                                             magnitude:"Volume",  unit:"m3",},
		c_wwt61:{description:"Percentage of test complying with regulations",                                  magnitude:"Percent",unit:"%",},

	//L2 Wastewater Discharge
	"wwd1":{description:"Volume of discharged wastewater",                            magnitude:"Volume",unit:"m3",},
	"wwd2":{description:"Volume of discharged wastewater without treatment",          magnitude:"Volume",unit:"m3",},
	"wwd3":{description:"Electric energy consumed for pumping discharged wastewater", magnitude:"Energy",unit:"kWh",},
	"wwd4":{description:"Energy recovered during wastewater discharge",               magnitude:"Energy",unit:"kWh",},
		
		//L3 Wastewater Discharge
		"wwd5" :{description:"Pumped volume",                                    magnitude:"Volume",       unit:"m3"},
		"wwd6" :{description:"Enter head pumped against",                        magnitude:"Head",         unit:"m"},
		"wwd7" :{description:"Enter turbine water volume pumped",                magnitude:"Volume",       unit:"m3"},
		"wwd8" :{description:"Enter turbine head",                               magnitude:"Head",         unit:"m3"},
		c_wwd50:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m"},
		c_wwd51:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m"},
	
	//PERFORMANCE INDICATORS LEVEL 1
	gE1w    :{description:"Energy costs",                                                                                             magnitude:"Percent",           unit:"%"},
	gE1ww   :{description:"Energy costs",                                                                                             magnitude:"Percent",           unit:"%"},
	gE2w    :{description:"Energy consumption per capita",	                                            magnitude:"Energy/inhab/time", unit:"kWh/inhab/year"},
	gE2ww   :{description:"Energy consumption per capita",	                                                magnitude:"Energy/inhab/time", unit:"kWh/inhab./year"},
	gE3w    :{description:"Energy consumption per serviced population",	                                magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop/year"},
	gE3ww   :{description:"Energy consumption per serviced population",	                                    magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop./year"},
	gE4w    :{description:"Energy consumption per authorized consumption",	                            magnitude:"Energy/Volume",     unit:"kWh/m3"},
	gE4ww   :{description:"Energy consumption per collected wastewater volume", 	                        magnitude:"Energy/Volume",     unit:"kWh/m3"},
	wGHG1   :{description:"GHG emissions per capita",                                                                        magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wGHG2   :{description:"GHG emissions per serviced population",                                                           magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG3   :{description:"GHG emissions per authorized consumption",                                                        magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG4   :{description:"GHG emissions from other activities than electricity consumption per serviced population",    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG5   :{description:"GHG emissions from other activities than electricity consumption per authorized consumption", magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG6   :{description:"GHG emissions from electricity consumption per serviced population",  	                                        magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG7   :{description:"GHG emissions from electricity consumption per authorized consumption",  	                                    magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wS4	    :{description:"Proportion of resident population receiving service",		                                                            magnitude:"Percent",           unit:"%"},
	wS5	    :{description:"Non-revenue water by volume",                                                                                    magnitude:"Percent",           unit:"%"},	
	wwGHG1  :{description:"GHG emissions per capita",                                                                magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wwGHG2  :{description:"GHG emissions per serviced population",                                                   magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wwGHG3  :{description:"GHG emissions per collected wastewater volume",	                                        magnitude:"Mass/inhab/time",   unit:"kgCO2e/m3"},
	wwGHG4  :{description:"GHG emissions from electricity consumption per collected wastewater",                                            magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year",},
	wwGHG5  :{description:"GHG emissions from electricity consumption per serviced population",                                             magnitude:"Mass/Volume",       unit:"kgCO2e/m3",},
	wwGHG6  :{description:"GHG emissions from other activities than electricity consumption per serviced population",    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year",},
	wwGHG7  :{description:"GHG emissions from other activities than electricity consumption per collected wastewater", magnitude:"Mass/Volume",       unit:"kgCO2e/m3",},
	wwS1    :{description:"Proportion of resident population receiving service",                                                                  magnitude:"Percent",           unit:"%",},
	wwS2    :{description:"Collected wastewater treated",                                                                                     magnitude:"Percent",           unit:"%",},

	//PERFORMANCE INDICATORS LEVEL 2
	wS1	    :{description:"Percentage of quality compliance",                                                                               magnitude:"Percent",         unit:"%",},
	wS2	    :{description:"Percentage os supply pressure adequacy",                                                                             magnitude:"Percent",         unit:"%",},
	wS3	    :{description:"Continuity of supply",                                                                                    magnitude:"Percent",         unit:"%",},
	wwGHG8	:{description:"GHG emissions from fuel engines per serviced population",                            magnitude:"Mass/inhab/time", unit:"kgCO2e/serv.Pop/year",},
	wwGHG9	:{description:"GHG emissions from fuel engines per collected wastewater volume",                    magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG10	:{description:"GHG emissions from biogas flaring at the WWTP per serviced population",                                  magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG11	:{description:"GHG emissions from biogas flaring at the WWTP per collected wastewater volume",                          magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG12	:{description:"GHG emissions from the discharge of treated effluent to waterbodies per serviced population",             magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG13	:{description:"GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume",     magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG14	:{description:"GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population",         magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG15	:{description:"GHG emissions from the discharge of untreated wastewater to waterbodies per collected wastewater volume", magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG16	:{description:"GHG emissions from sludge transport per serviced population",                                             magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG17	:{description:"GHG emissions from sludge transport per collected wastewater volume",                                     magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwS3    :{description:"Percentage of quality compliance",                                                                 magnitude:"Percent",         unit:"%",},
	wwS4	:{description:"Percent dilution in the sewer system",                                                                    magnitude:"Percent",unit:"%",},


	//L2 and L3 PIs
	aE1	 :{description:"Energy consumption per abstracted water",                                   magnitude:"Energy/Volume",unit:"kWh/m3",},
	aE2	 :{description:"Energy consumption of abstracted water per total energy consumption",       magnitude:"Percent",unit:"%",},
	aE3	 :{description:"Standardised Energy Consumption",                                           magnitude:"Energy",unit:"kWh/m3/100m",},
	aE4	 :{description:"Energy recovery per conveyed water",                                        magnitude:"Energy/Volume",unit:"kWh/m3",},
	aE5	 :{description:"Standardized energy recovery",                                              magnitude:"Energy/Volume",unit:"kWh/m3/100m",},
	aE6	 :{description:"Water losses per mains length",                                             magnitude:"Volume/",unit:"m3/km/days",},
	aE7	 :{description:"Unit head loss",                                                            magnitude:"Headloss/Distance",unit:"m/km",},
	tE01 :{description:"WTPs with Pre-ox/C/F/S/Filt/Des",                                           magnitude:"Percent",unit:"%",},
	tE02 :{description:"WTPs with Pre-ox/C/F/Filt/Des",                                             magnitude:"Percent",unit:"%",},
	tE03 :{description:"WTPs with C/F/S/Filt/Des",                                                  magnitude:"Percent",unit:"%",},
	tE04 :{description:"WTPs with C/F/Filt/Des",                                                    magnitude:"Percent",unit:"%",},
	tE05 :{description:"WTPs with Des",                                                             magnitude:"Percent",unit:"%",},
	tE06 :{description:"WTPs with other sequence",                                                  magnitude:"Percent",unit:"%",},
	tE1	 :{description:"Energy consumption per treated water",                                      magnitude:"Energy/Volume",unit:"kWh/m3",},
	tE2	 :{description:"Energy consumption of WTPs per total energy consumption",                   magnitude:"Percent",unit:"%",},
	tE3	 :{description:"Sludge production per treated water",                                       magnitude:"Mass/Volume",unit:"kg/m3",},
	tE4	 :{description:"Capacity utilisation",                                                      magnitude:"Percent",unit:"%",},
	dE1	 :{description:"Energy consumption per authorized consumption",                             magnitude:"Energy/Volume",unit:"kWh/m3",},
	dE2	 :{description:"Energy consumption of authorized consumption per total energy consumption", magnitude:"Percent",unit:"%",},
	dE3	 :{description:"Standardised Energy Consumption",                                           magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m",},
	dE4	 :{description:"Global water distribution energy efficiency",                               magnitude:"Percent",unit:"%",},
	dE5	 :{description:"Percentage of topographic energy",                                          magnitude:"Percent",unit:"%",},
	dE6	 :{description:"<span style=color:red>Formula TBD</span> Water losses per mains length",    magnitude:"Volume/Distance/Time",unit:"m3/km/days",},
	dE7	 :{description:"Unit head loss",                                                            magnitude:"Percent",unit:"m/km",},

	//disappeared ones
	wcE1  :{description:"Energy consumption per conveying wastewater to treatment",                 magnitude:"Energy/Volume",unit:"kWh/m3",},
	wcE2  :{description:"Energy consumption of collected wastewater per total energy consumption",  magnitude:"Percent",unit:"%",},
	wcE3  :{description:"Standardised Energy Consumption",                                          magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m",},
	wtE01 :{description:"WTPs with trickling filters (TF)",                                         magnitude:"Percent",unit:"%",},
	wtE02 :{description:"WTPs with activated sludge (AS)",                                          magnitude:"Percent",unit:"%",},
	wtE03 :{description:"WTPs with AS and Coagulation/Filtration (C/F)",                            magnitude:"Percent",unit:"%",},
	wtE04 :{description:"WTPs with AS nitrification and C/F",                                       magnitude:"Percent",unit:"%"},
	wtE05 :{description:"WWTPs with Lagoons",                                                       magnitude:"Percent",unit:"%",},
	wtE06 :{description:"WWTPs with other type of treatment",                                       magnitude:"Percent",unit:"%",},
	wtE1  :{description:"Energy consumption per treated wastewater",                                magnitude:"Energy/Volume",unit:"kWh/m3",},
	wtE2  :{description:"Energy consumption of WWTPs per total energy consumption",                 magnitude:"Percent",      unit:"%",},
	wtE3  :{description:"Energy consumption per BOD5 mass removed",                                 magnitude:"Energy/Mass",  unit:"kWh/Kg BOD removed",},
	wtE4  :{description:"Energy production from biogas",                                            magnitude:"Energy/Volume",unit:"kWh/m3",},
	wtE5  :{description:"Biogas produced per mass removed",                                         magnitude:"Volume/Mass",unit:"Nm3/kg BOD removed",},
	wtE6  :{description:"Electrical energy produced per total available energy in biogas",          magnitude:"Percent",unit:"%",},
	wtE7  :{description:"Sludge production (total weight)",                                         magnitude:"Mass/Volume",unit:"kg/m3",},
	wtE8  :{description:"<span style=color:red>Formula TBD</span> Dry weight in sludge production", magnitude:"Percent",unit:"% DW",},
	wtE9  :{description:"Capacity utilisation",                                                     magnitude:"Percent",unit:"%",},
	wdE1  :{description:"Energy consumption per discharged wastewater",                             magnitude:"Energy/Volume",unit:"kWh/m3",},
	wdE2  :{description:"Energy consumption of discharged wastewater per total energy consumption", magnitude:"Percent",unit:"%",},
	wdE3  :{description:"Standardised energy consumption",                                          magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m",},
	wdE4  :{description:"Energy recovery per discharged water",                                     magnitude:"Energy/Volume",unit:"kWh/m3",},
	wdE5  :{description:"Standardized energy recovery",                                             magnitude:"Energy/Volume/Head",unit:"kWh/m3/100m",},
}

/* below explanation still not checked:
c_uw51	Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) during the assessment period, regarding the water cycle
	c_uw52	Total eletrical energy consumed from the grid and from self-production
	c_wsa50_n	Sum, for all the pumps of the water abstracted system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100 
	c_wsd51_n	This energy takes into account the node consumption elevation plus the minimum pressure required by the users 
	c_wsd52_n	The energy provided to a system can be natural and shaft (pumping energy). With the provided expression the energy is precisely calculated
	c_wsd53_n	This is the energy supplied to the system because its irregular topography 
	c_wsg50	Total energy consumed by drinking water utility 
	c_wsg51	Ultimately this number is multiplied by EF gV9
	c_wsg52	CO2e of heat used for District heating or cooling from urban  drinking water system
	c_ww50	The Biogas flared is calculated based on the amount of biogas produced under good operating conditions of the plant and the anaerobic digestor if biogas is NOT recovered to produce energy
	c_ww51	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment.  Based upon nitrogen in the WWTP influent multiplied by default emission factor
	c_ww52	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment.  Based upon BOD in the WWTP influent multiplied by default emission factor
	c_ww53	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent.  Based upon nitrogen in the WWTP effluent multiplied by default emission factor
	c_ww54	Indirect CO2e emitted from sludge transport off-site.  Based upon sum of CO2, CH4 and N2O emission from mobile combustion
	c_ww55	Methane (CO2e) emitted in wastewater treatment plants
	c_ww57	Total direct CO2e  emitted from on-site engines in wastewater stages based upon sum of CO2, CH4 and N2O emission from stationary combustion 
	c_ww58	The fuel consumption is calculated assuming 2 times distance to disposal site (round tryp)  time the number of trips times an average diesel  consumption of 25 L per 100 km
	c_wwc50_n	Sum, for all the pumps of the wastewater collection system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100 
	c_wwc51	This volume is calculated  based on a mass balance on the BOD load. It considers the volume of collected wastewater prior to dilution, the ratio between the population connected to sewers and the serviced population,  and the standard country specific BOD input to sewers in g/ pers/ day. The other side of the mass balance considers the  volume of treated wastewater and the BOD load in the treatment plant influent. 
	c_wwd50_n	Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100
	c_wwd51_n	Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100
	c_wwg50	Total energy consumed in wastewater cycle  
	c_wwg52	CO2e of heat used for District heating or cooling from urban wastewater system 
	c_wwt50	
	c_wwt50_n	
	c_wwt51	Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e using the conversion factor of  298 kg of CO2 per kg of N2O.  
	c_wwt51_n	Sum of energy content of biogas used in cogeneration during the assessment period by all wastewater treatment plants managed by the undertaking 
	c_wwt52	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment.  Based upon BOD in the WWTP influent multiplied by default emission factor 
	c_wwt53	Sum of energy content of biogas used in cogeneration during the assessment period by all wastewater treatment plants managed by the undertaking 
	c_wwt54	This is calculated from the difference in BOD mass from the influent with BOD mass from the effluent over the assessment period.  
	c_wwt55	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent
	c_wwt56	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment.  Based upon nitrogen in the WWTP influent multiplied by default emission factor 
	c_wwt57	Energy equivalent of fuel usage in the truck to disposal site. This assumes a truck fuel consumption of 25 L/100km
	c_wwt58	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment.  Based upon nitrogen in the WWTP influent multiplied by default emission factor 
	c_wwt59	Methane (CO2e) emitted in wastewater treatment plants 
	c_wwt60	Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent.  Based upon nitrogen in the WWTP effluent multiplied by default emission factor
	uw1	Ratio of CO2 emission per energy consumed
	ws1	Number of permanent residents within the service area managed by the undertaking which are connected to the water supply system  
	ws2	Number of permanent residents within the water utility area of service
	ws3	Costs from electric energy consumption for the entire water supply utilty, based on the electricity bill during the entire assessment period
	ws4	Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to water supply within the service area managed by the undertaking during the entire assessment period
	ws5	Total energy consumed from the grid for the entire water supply utilty, based on the electricity bill during the entire assessment period.
	ws6	This is used for PI and volume diagram.  If not known volume is calculated based upon serviced population 
	ws7	Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported
	ws8	Percentage of the abstracted water Volume that is lost due to leaks or illegal connection to the distribution system , At level 1, enter the percentage as known or estimated by the utility. At level 2, the non revenue water indicator  (wS5) will be calculated based on a mass balance.
	ws9	Fuel consumption in water supply, for instance, due to the use of on-site generators or devices that work on fuel.
	wsa1	Electric energy consumption including both from the grid and self-produced, for water abstraction, by the undertaking during the entire assessment period
	wsa10_n	All friction losses (including the local ones in valves and accessories) must be included
	wsa11_n	 Insert the 5 range categories
	wsa12_n	 Submersible or external
	wsa1_n	Electric energy consumption including both from the grid and self-produced, for the water abstraction unit, by the undertaking during the entire assessment period
	wsa2	Sum of the volume of water conveyed that are the responsibility of the water utility, during the assessment period
	wsa2_n	Sum of the volume of water conveyed (gravity or pumped) in the water abstraction unit that are the responsibility of the undertaking, during the assessment period
	wsa3	Sum of energy recovered during the assessment period by all turbines for abstracted water managed by the undertaking
	wsa3_n	Sum of the energy recovered at turbine(s) managed by the undertaking to produce electricity, for each abstraction system unit
	wsa4_n	 Head at which the water is pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period
	wsa5_n	 Volume of water pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period
	wsa6_n	 Sum of volume passing through a turbine managed by the undertaking to produce electricity, for each abstraction system unit
	wsa7_n	 Head at which the water is falling through turbines in each water abstraction unit that are the responsibility of the undertaking, during the assessment period
	wsa8_n	Difference between system abstracted volume and  the volume entering the water treatment plant and/or entering directly the distribution system
	wsa9_n	Total transmission and distribution mains length (there are not service connections at the abstraction and conveyance stage)
	wsd1	Electric energy consumption including both from the grid and self-produced, for water distribution during the entire assessment period
	wsd10_n	According the standards, a minimum pressure must be provided to the consumers (20 - 30 m) , for each water distribution unit
	wsd11_n	Is the elevation of the highest node of the network, , for each water distribution unit
	wsd12_n	Is the elevation of the lowest node of the stage, for each water distribution unit
	wsd13_n	The average elevation of the network. If necessary it could be calculated as sum of lowest and the highest node elevation of the network divided by two, for each water distribution unit
	wsd14_n	It is the elevation of the water table to calculate the natural energy provided to the system, for each water distribution unit
	wsd15_n	 Volume of water in the drinking water distribution system which requires pumping, for each distribution unit
	wsd17_n	Total energy recovered during the assessment period by each water distribution unit 
	wsd18_n	Total transmission and distribution mains length (service connections not included), for each water distribution unit at the reference date
	wsd19_n	Friction losses (including the local ones in valves and accessories), for each water distribution unit at the reference date.
	wsd1_n	Sum of energy consumed during the assessment period by each pumping station managed by the undertaking
	wsd20	 Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported
	wsd20_n	"Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported
	wsd2_n	Number of delivery points that receive and are likely to receive pressure equal to or above the guaranteed or declared target level at the peak demand hour (but not when demand is abnormal).
	wsd3_n	Total number of service connections, at the reference date
	wsd4_n	Amount of time of the year the system is pressurised 
	wsd5	Number of permanent residents within the water utility area of service
	wsd5_n	Resident population connected to each water distribution system managed by the undertaking, at the reference date
	wsd6	Number of permanent residents within the service area managed by the undertaking which are connected to the water supply system  
	wsd6_n	Resident population connected to each water distribution unit managed by the undertaking, at the reference date
	wsd7	The water volume entering the distribution system from the water treatment or directly from abstraction during the assessment period 
	wsd7_n	The water volume entering the distribution system from the water treatment or directly from abstraction during the assessment period 
	wsd8	Difference between the distribution system input volume and the authorized consumption (including exported water) during the assessment period for each water distribution unit
	wsd8_n	Difference between the distribution system input volume and the authorized consumption (including exported water) during the assessment period for each water distribution unit
	wsd9_n	Volume injected to the water distribution stage, for each water distribution unit
	wsg1	Water-related energy produced in the urban drinking water system, by the undertaking during the entire assessment period
	wsg2	Water-related energy produced in the urban drinking water system sold to the grid, by the undertaking during the entire assessment period
	wsg3	Non-water-related energy produced in the urban drinking water system (e.g. solar, wind), by the undertaking during the entire assessment period
	wsg4	Non-water-related energy produced in the urban drinking water system (e.g. solar, wind) sold to the grid, by the undertaking during the entire assessment period
	wsg5	 Heat energy produced from a heat pump using  water from the urban drinking water system or urban wastewater system. The heat energy may be provided to utility building or neighboring districts
	wst1	Sum of the volume of water treated by water treatment plants that are the responsibility of the water undertaking, during the assessment period
	wst10_n	Sum of the volume of water treated by WTPs with C/F/S/Filt/Des 
	wst11_n	Sum of the volume of water treated by WTPs with C/F/Filt/Des
	wst12_n	Sum of the volume of water treated by WTPs with Des
	wst13_n	Sum of the volume of water treated by WTPs with other sequence 
	wst14_n	Sludge produced during the assessment period by each urban water treatment plant managed by the undertaking
	wst15_n	The treatment capacity of each WTP or on site system facility that are the responsibility of the wastewater undertaking, during the assessment period
	wst16_n	Number of tests in treated wastewater treatment plants that comply with discharge consents during the assessment period
	wst1_n	Sum of the volume of water treated by WTPs that are the responsibility of the water undertaking, during the assessment period
	wst2	Electric energy consumption including both from the grid and self-produced, by all water treatment plants during the entire assessment period 
	wst2_n	Energy consumed during the assessment period by each urban water treatment plant managed by the undertaking
	wst3_n	Number of treated water tests carried out during the assessment period
	wst4_n	Number of aesthetic tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation
	wst5_n	Number of microbiological tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation
	wst6_n	Number of physical-chemical tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation
	wst7_n	Number of radioactivity tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation
	wst8_n	Sum of the volume of water treated by WTPs with Pre-oxidation  (Pre-ox) ,  Coagulation (C), Filtration (F), Sedimentation (S), Filtration (Filt) and  Desinfection (Des)
	wst9_n	Sum of the volume of water treated by WTPs with Pre-ox/C/F/Filt/Des
	ww1	Costs from electric energy consumption for the entire wastewater utilty, based on the electricity bill during the entire assessment period.
	ww10Regulatory limit for total nitrogen concentration at the effluent of the WWTP 
	ww11	Fuel consumption in the wastewater system during the assessment period. Fuel consumption may be due to the use of on-site generators, pumps or engines that work on fuel.
	ww12	The reply to this question is used to estimate of the GHG emissions related to methane emissions at the WWTP when handling biogas. 
	ww13	Protein consumption per capita per year. The default value is provided after selection of country. If you have a specific factor that applies to your region you can provide.
	ww14	This represents the average Biochemical oxygen demand  (BOD5) that each resident connected to the sewer system eliminates in the wastewater produced every day. The default value is provided after selection of country. This default value shall be adjusted if local studies provide more accurate estimates
	ww15	treated wastewater volume (m3) 
	ww2	Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to wastewater management within the service area managed by the undertaking during the entire assessment period
	ww3	Total electric energy consumed from the grid related to wastewater management within the service area managed by the undertaking during the entire assessment period
	ww4	Volume of wastewater discharged from water consumers (households, industries, etc.) to the sewer system during the assessment period and prior to any dilution from growndwater infiltration  or surface water inflow, and prior to any overflows to sewage to the natural environment.
	ww5	Number of permanent residents within the area of service for wastewater services managed by the undertaking (whether they are connected or not) , at the reference date 
	ww6	Number of permanent residents within the service area managed by the undertaking which are connected to the sewer system , at the reference date 
	ww7	Number permanent residents within the service area managed by the undertaking which wastewater is collected and treated, at the reference date
	ww8	Number of truck trips to dispose sludge from the WWTP to the disposal site during the assessment period. Note that round trips to the disposal site shall be counted as 1  trip 
	ww9	Distance between the WWTP and the disposal site. If there are more than one disposal sites, use an average value. Note that the tool calculates the round trip distance as twice the distance to the disposal site.
	wwc1	Sum of energy consumed by all pumping stations for conveying wastewater to the wastewater treatment plant managed by the undertaking, during the assessment period
	wwc1_n	Collected wastewater, corresponding to the volume of domestic, commercial and industrial outputs to the sewer system during the assessment period (pumped or not)
	wwc2	Sum of energy consumed by all pumping stations for conveying wastewater to the wastewater treatment plant managed by the undertaking, during the assessment period
	wwc2_n	Energy consumed during the assessment period by each pumping station for conveying wastewater to treatment managed by the undertaking
	wwd1	Sum of the volume of wastewater discharged that are the responsibility of the wastewater undertaking, during the assessment period. This includes all the wastewater collected, whether it is conveyed to treatment or discharged untreated
	wwd1_n	Volume of wastewater discharged by each wastewater treatment plant that are the responsibility of the undertaking, during the assessment period. This includes all the wastewater collected, whether it is conveyed to treatment or discharged untreated
	wwd2	Sum of the volume of wastewater discharged without treatment that are the responsibility of the wastewater undertaking, during the assessment period
	wwd2_n	Sum of the volume of wastewater discharged without treatment that are the responsibility of the wastewater undertaking, during the assessment period, by each wastewater treatment plant
	wwd3	Electric energy consumed during the assessment period by all pumping stations to discharge wastewater to the receiving water body (electric energy from the grid and self-produced)
	wwd3_n	Sum of energy consumed (from the grid or self-produced) during the assessment period by all each pumping stations for discharged wastewater managed by the undertaking
	wwd4	Energy recovered during the assessment period by all turbines using discharged wastewater, managed by the undertaking
	wwd4_n	Sum of energy recovered during the assessment period by all turbines for wastewater discharged managed by the undertaking
	wwg1	Water-related electrical energy produced by the wastewater treatment utility (renewable energy) during the assessment period
	wwg2	Water-related renewable electrical energy sold by the wastewater treatment utility (renewable energy) during the assessment period
	wwg3	Non-water related renewable electricity production (e.g. solar or wind) by the wastewater treatment utility during the assessment period
	wwg4	Non-water-related renewable electrical energy sold by the wastewater treatment utility (renewable energy) during the assessment period
	wwg5	Heat energy produced from a heat pump using  wastewater from the urban drinking water system system. The heat energy may be provided to utility building or neighboring districts
	wwt10	Total BOD5 load exiting the WWTP during the assessment period. It can be estimated by multiplying the average BOD5 concentration in the effluent by the volume treated. If this is done daily and summed over the duration of the assessment period the value will be most accurate. This is used to calculate wwt14 
	wwt10_n	Average of BOD5 influent concentration during the assessment period by each wastewater treatment plant managed by the undertaking 
	wwt11	Sum of electrical energy produced during the assessment period by all wastewater treatment plants managed by the undertaking
	wwt11_n	Energy produced from biogas valorization during the assessment period by each wastewater treatment plant managed by the undertaking
	wwt12	Percent of the methane content in the produced biogas
	wwt13	BOD5 concentration at the influent of the wastewater treatment plants during the assessment period managed by the undertaking; average over the assessment period
	wwt14_n	BOD mass removed during the assessment period by each wastewater treatment plant managed by the undertaking
	wwt15_n	Number of tests in each wastewater treatment plant that comply with discharge consents during the assessment period
	wwt16_n	Number of tests carried out in each treated wastewater treatment plant during the assessment period
	wwt17_n	Sum of the volume of wastewater treated by WWTPs with trickling filters (TF)
	wwt18_n	Sum of the volume of wastewater treated by WWTPs with activated sludge (AS)
	wwt19_n	Sum of the volume of wastewater treated by WWTPs with AS and Coagulation/Filtration (C/F) 
	wwt2	Sum of biogas produced during the assessment period by all wastewater treatment plants managed by the undertaking
	wwt20_n	Sum of the volume of wastewater treated by WWTPs with AS nitrification and C/F
	wwt21_n	Sum of the volume of wastewater treated by WWTPs with Laggons
	wwt22_n	Sum of the volume of wastewater treated by WWTPs with other type of treatment 
	wwt23_n	Sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking
	wwt24_n	Average of dry weight in sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking 
	wwt25_n	Treatment capacity of each WWTP that are the responsibility of the wastewater undertaking, during the assessment period
	wwt2_n	Biogas produced during the assessment period by each wastewater treatment plant managed by the undertaking
	wwt3	Volume of biogas used to generate electricity or for heating (i.e. the anaerobic digester) at the wastewater treatment plant, over the assessment period
	wwt5	Total nitrogen load in treated effluent prior to discharge during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.
	wwt6	Total nitrogen load entering the WWTP during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.
	wwt8	Sum of the volume of wastewater treated by all WWTPs that are the responsibility of the wastewater undertaking, during the assessment period
	wwt8_n	Volume of treated wastewater by each unit, over the assessment period
	wwt9	Total energy consumed during the assessment period by all wastewater treatment plants managed by the undertaking
	wwt9_n	Sum of energy consumed during the assessment period by all wastewater treatment plants managed by the undertaking
*/

//Explanations. Syntax: Info.code.explanation=explanation
Info.c_uw50.explanation="Total cost of electrical energy within the period of assessment, regarding the water cycle";
Info.c_uw51.explanation="Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) during the assessment period, regarding the water cycle";
Info.c_uw52.explanation="Total eletrical energy consumed from the grid and from self-production";
Info.c_ws50.explanation="";
Info.c_ws51.explanation="";
Info.c_wsa50.explanation="Sum, for all the pumps of the water abstracted system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100";
Info.c_wsd50.explanation="";
Info.c_wsd51.explanation="This energy takes into account the node consumption elevation plus the minimum pressure required by the users";
Info.c_wsd52.explanation="The energy provided to a system can be natural and shaft (pumping energy). With the provided expression the energy is precisely calculated.";
Info.c_wsd53.explanation="This is the energy supplied to the system because its irregular topography";
Info.c_wsd54.explanation="";
Info.c_wsg50.explanation="Total energy consumed by drinking water utility ";
Info.c_wsg51.explanation="Ultimately this number is multiplied by EF gV9";
Info.c_wst50.explanation="";
Info.c_ww50.explanation="";
Info.c_ww51.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment.  Based upon nitrogen in the WWTP influent multiplied by default emission factor";
Info.c_ww52.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment.  Based upon BOD in the WWTP influent multiplied by default emission factor";
Info.c_ww53.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent.  Based upon nitrogen in the WWTP effluent multiplied by default emission factor";
Info.c_ww54.explanation="Indirect CO2e emitted from sludge transport off-site.  Based upon sum of CO2, CH4 and N2O emission from mobile combustion";
Info.c_ww55.explanation="Methane (CO2e) emitted in wastewater treatment plants";
Info.c_ww56.explanation="";
Info.c_ww57.explanation="Total direct CO2e  emitted from on-site engines in wastewater stages based upon sum of CO2, CH4 and N2O emission from stationary combustion ";
Info.c_ww58.explanation="";
Info.c_wwc50.explanation="Sum, for all the pumps of the wastewater collection system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100";
Info.c_wwd50.explanation="Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100";
Info.c_wwd51.explanation="Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100";
Info.c_wwg50.explanation="Total energy consumed in wastewater cycle ";
Info.c_wwg51.explanation="Ultimately this number is multiplied by EF gV9";
Info.c_wwt50.explanation="";
Info.c_wwt51.explanation="Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e using the conversion factor of  298 kg of CO2 per kg of N2O. ";
Info.c_wwt52.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment.  Based upon BOD in the WWTP influent multiplied by default emission factor";
Info.c_wwt53.explanation="Sum of energy content of biogas used in cogeneration during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.c_wwt54.explanation="Indirect CO2e emitted from sludge transport off-site.  Based upon sum of CO2, CH4 and N2O emission from mobile combustion";
Info.c_wwt55.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent.";
Info.c_wwt56.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment.  Based upon nitrogen in the WWTP influent multiplied by default emission factor";
Info.c_wwt57.explanation="";
Info.c_wwt58.explanation="";
Info.c_wwt59.explanation="Methane (CO2e) emitted in wastewater treatment plants";
Info.c_wwt60.explanation="";
Info.uw1.explanation="Ratio of CO2 emission per energy consumed";
Info.ws1.explanation="Resident population connected to the supply systems managed by the undertaking, at the reference date";
Info.ws2.explanation="Resident population connected managed by the utility, at the reference date";
Info.ws3.explanation="Total cost of electrical energy within the period of assessment, regarding the water cycle";
Info.ws4.explanation="Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) during the assessment period, regarding the water cycle";
Info.ws5.explanation="Includes process and non-process grid energy consumption ";
Info.ws6.explanation="This is used for PI and volume diagram.  If not known volume is calculated based upon serviced population ";
Info.ws7.explanation="Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported";
Info.ws8.explanation="";
Info.ws9.explanation="";
Info.wsa1.explanation="";
Info.wsa10.explanation="All friction losses (including the local ones in valves and accessories) must be included";
Info.wsa2.explanation="Sum of the volume of water conveyed that are the responsibility of the water utility, during the assessment period";
Info.wsa3.explanation="Sum of energy recovered during the assessment period by all turbines for abstracted water managed by the undertaking";
Info.wsa4.explanation="";
Info.wsa5.explanation="";
Info.wsa6.explanation="";
Info.wsa7.explanation="";
Info.wsa8.explanation="Difference between system abstracted volume and  output volume";
Info.wsa9.explanation="Total transmission and distribution mains length (there are not service connections at the abstraction and conveyance stage)";
Info.wsd1.explanation="Sum of energy consumed during the assessment period by all pumping stations for distributed water managed by the undertaking";
Info.wsd10.explanation="According the standards, a minimum pressure must be provided to the consumers (20 - 30 m).";
Info.wsd11.explanation="Is the elevation of the highest node of the network ";
Info.wsd12.explanation="Is the elevation of the lowest node of the stage";
Info.wsd13.explanation="The average elevation of the network. If necessary it could be calculated as sum of lowest and the highest node elevation of the network divided by two. ";
Info.wsd14.explanation="It is the elevation of the water table to calculate the natural energy provided to the system";
Info.wsd15.explanation="";
Info.wsd16.explanation="";
Info.wsd17.explanation="Sum of energy recovered during the assessment period by all turbines for distribution water ";
Info.wsd18.explanation="Total transmission and distribution mains length (service connections not included), at the reference date";
Info.wsd19.explanation="All friction losses (including the local ones in valves and accessories) must be included";
Info.wsd2.explanation="Number of delivery points that receive and are likely to receive pressure equal to or above the guaranteed or declared target level at the peak demand hour (but not when demand is abnormal).";
Info.wsd3.explanation="Total number of service connections, at the reference date";
Info.wsd4.explanation="Amount of time of the year the system is pressurised";
Info.wsd5.explanation="Resident population connected to the supply systems managed by the undertaking, at the reference date";
Info.wsd6.explanation="Resident population connected to the supply systems managed by the undertaking, at the reference date";
Info.wsd7.explanation="The water volume input of the global system during the assessment period";
Info.wsd8.explanation="Difference between the system input volume and the billed authorized consumption (including exported water) during the assessment period";
Info.wsd9.explanation="Volume injected to the water distribution stage ";
Info.wsg1.explanation="Energy produced in urban Drinking Water System";
Info.wsg2.explanation="used to calculate gV11w and update Level 1";
Info.wsg3.explanation="Solar or wind electrical energy production in urban Drinking Water System";
Info.wsg4.explanation="used to calculate gV11w and update Level 1";
Info.wsg5.explanation="CO2e of heat used for District heating or cooling from urban  drinking water system";
Info.wst1.explanation="Sum of the volume of water treated by WTPs that are the responsibility of the water undertaking, during the assessment period";
Info.wst10.explanation="Sum of the volume of water treated by WTPs with C/F/S/Filt/Des ";
Info.wst11.explanation="Sum of the volume of water treated by WTPs with C/F/Filt/Des";
Info.wst12.explanation="Sum of the volume of water treated by WTPs with Des";
Info.wst13.explanation="Sum of the volume of water treated by WTPs with other sequence ";
Info.wst14.explanation="Sum of sludge produced during the assessment period by all water treatment plants managed by the undertaking";
Info.wst15.explanation="Sum of the treatment capacities of WTPs or on site system facilities that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wst16.explanation="Number of tests in treated wastewater treatment plants that comply with discharge consents during the assessment period";
Info.wst2.explanation="Sum of energy consumed during the assessment period by all water treatment plants managed by the undertaking";
Info.wst3.explanation="Number of treated water tests carried out during the assessment period";
Info.wst4.explanation="Number of aesthetic tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst5.explanation="Number of microbiological tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst6.explanation="Number of physical-chemical tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst7.explanation="Number of radioactivity tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst8.explanation="Sum of the volume of water treated by WTPs with Pre-oxidation  (Pre-ox) ,  Coagulation (C), Filtration (F), Sedimentation (S), Filtration (Filt) and  Desinfection (Des)";
Info.wst9.explanation="Sum of the volume of water treated by WTPs with Pre-ox/C/F/Filt/Des";
Info.ww1.explanation="Total cost of electrical energy within the period of assessment, regarding the water cycle";
Info.ww10.explanation="";
Info.ww11.explanation="";
Info.ww12.explanation="";
Info.ww2.explanation="Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) during the assessment period, regarding the water cycle";
Info.ww3.explanation="Includes process and non-process grid energy consumption ";
Info.ww4.explanation="This is used for PI and volume diagram.  If not known volume is calculated based upon serviced population ";
Info.ww5.explanation="Resident population connected managed by the utility, at the reference date";
Info.ww6.explanation="Resident population connected to the sewer systems managed by the undertaking, at the reference date";
Info.ww7.explanation="Resident population managed by the undertaking which wastewater is collected and treated, at the reference date";
Info.ww8.explanation="";
Info.ww9.explanation="";
Info.wwc2.explanation="Sum of energy consumed during the assessment period by all pumping stations for conveying wastewater to treatment managed by the undertaking";
Info.wwc3.explanation="";
Info.wwc4.explanation="";
Info.wwd1.explanation="Sum of the volume of wastewater discharged that are the responsibility of the wastewater undertaking, during the assessment period. This includes all the wastewater collected, whether it is conveyed to treatment or discharged untreated";
Info.wwd2.explanation="Sum of the volume of wastewater discharged without treatment that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wwd3.explanation="Sum of energy consumed during the assessment period by all pumping stations for discharged wastewater managed by the undertaking";
Info.wwd4.explanation="Sum of energy recovered during the assessment period by all turbines for wastewater discharged managed by the undertaking";
Info.wwd5.explanation="";
Info.wwd6.explanation="";
Info.wwd7.explanation="";
Info.wwd8.explanation="";
Info.wwg1.explanation="Energy produced in urban Wastewater System ";
Info.wwg2.explanation="used to calculate gV11ww and update Level 1";
Info.wwg3.explanation="Solar or wind electrical energy production in urban Wastewater System";
Info.wwg4.explanation="used to calculate gV11ww and update Level 1";
Info.wwg5.explanation="CO2e of heat used for District heating or cooling from urban wastewater system";
Info.wwt10.explanation="Average of BOD influent during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt11.explanation="Sum of energy produced during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt12.explanation="Percent of the methane contect in the produced biogas";
Info.wwt13.explanation="Average of BOD influent during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt14.explanation="Sum of BOD mass removed during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt15.explanation="Number of tests in treated wastewater treatment plants that comply with discharge consents during the assessment period";
Info.wwt16.explanation="Number of tests carried out in treated wastewater treatment plants during the assessment period";
Info.wwt17.explanation="Sum of the volume of wastewater treated by WWTPs with trickling filters (TF)";
Info.wwt18.explanation="Sum of the volume of wastewater treated by WWTPs with activated sludge (AS)";
Info.wwt19.explanation="Sum of the volume of wastewater treated by WWTPs with AS and Coagulation/Filtration (C/F) ";
Info.wwt2.explanation="Sum of biogas produced during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt20.explanation="Sum of the volume of wastewater treated by WWTPs with AS nitrification and C/F";
Info.wwt21.explanation="Sum of the volume of wastewater treated by WWTPs with Laggons";
Info.wwt22.explanation="Sum of the volume of wastewater treated by WWTPs with other type of treatment ";
Info.wwt23.explanation="Sum of sludge produced during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt25.explanation="Sum of the treatment capacities of WWTPs or on site system facilities that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wwt3.explanation="";
Info.wwt5.explanation="";
Info.wwt6.explanation="";
Info.wwt8.explanation="Sum of the volume of wastewater treated by WWTPs or by on site system facilities that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wwt9.explanation="Sum of energy consumed during the assessment period by all wastewater treatment plants managed by the undertaking";

//KPI explanations
/*
	wS4	Percentage of the resident population that are connected to the urban drinking water system managed by the undertaking, also referred to as "serviced population"
	wS5	Percentage of the system input volume that corresponds to non-revenue water in relation with the total volume entering the urban drinking water system at the abstraction stage
	gE1w	Proportion of the utility energy costs referred to the total running costs related to urban drinking water system
	gE2w	Energy consumption per inhabitant within the urban drinking water system serviced by the water utility
	gE3w	Energy consumption in urban drinking water system per serviced population in the area that is the responsibility of the water utility
	gE4w	Energy consumption in urban drinking water system per authorized consumption 
	wGHG1	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility
	wGHG2	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per serviced population in the area that is the responsibility of the water utility
	wGHG3	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per authorized consumption 
	wGHG4	Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per serviced population in the area that is the responsibility of the water utility
	wGHG5	Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per authorized consumption 
	wGHG6	Total of all GHG Emissions related to grid energy consumption  per serviced population in the area that is the responsibility of the water utility
	wGHG7	Total of all GHG Emissions related to grid energy consumption  per authorized consumption 
	wwS1	Percentage of the resident population that are connected to the sewer systems and which wastewater is treated by the undertaking
	wwS2	Percentage of the collected sewage prior to dilution or overflows in the sewer system that are treated in wastewater treatment plants
	gE1ww	Proportion of the utility energy costs referred to the total running costs
	gE2ww	Energy consumption in urban wastewater system per inhabitant living permanently in the area that is the responsibility of the water utility
	gE3ww	Energy consumption in urban wastewater system per serviced population in the area that is the responsibility of the water utility
	gE4ww	Energy consumption in urban wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG1	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per inhabitant living permanently in the area that is the responsibility of the undertaking
	wwGHG2	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per serviced population in the area that is the responsibility of the undertaking
	wwGHG3	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG4	Total of all GHG Emissions related to grid energy consumption per serviced population in the area that is the responsibility of the water utility
	wwGHG5	Total of all GHG Emissions related to grid energy consumption  per collected wastewater prior to any infiltration and inflow or overflows in the sewer system
	wwGHG6	Total of all GHG Emissions not related to grid energy consumption  per serviced population in the area that is the responsibility of the water utility
	wwGHG7	Total of all GHG Emissions not related to grid energy consumption per collected wastewater prior to any infiltration and inflow or overflows in the sewer system
		
	wS1	Percentage of the total number of treated water quality tests performed that comply with the applicable standards or legislation
	wS2	Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure
	wS3	Percentage of hours when the (intermittent supply) system is pressurised
	wwS3	Percentage of water quality tests carried out in wastewater treatment plants that comply with discharge consents
	wwS4	Percentage of Infiltration and inflow water entering the sewer system compared to the volume of collected wastewater prior to dilution
		
	gE2w	Energy consumption from grid and self produced in urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility
	gE3w	Energy consumption from grid and self produced in urban drinking water system per serviced population in the area that is the responsibility of the water utility
	gE4w	Energy consumption from grid and self produced in urban drinking water system per authorized consumption
	wGHG1	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility
	wGHG2	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per serviced population in the area that is the responsibility of the water utility
	wGHG3	All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per authorized consumption 
	wGHG4	GHG Emissions from onsite engines / serviced population in the area that is the responsibility of the water utility
	wGHG5	
	wGHG6	GHG Emissions from electricity consumption minus renewable energy produced and sold  in all stages of urban drinking water system per serviced population
	wGHG7	GHG Emissions from electricity consumption minus renewable energy produced and sold  in all stages of urban drinking water system per authorized consumption 
		
	gE2ww	Energy consumption from grid and self produced in urban wastewater system per inhabitant living permanently in the area that is the responsibility of the water utility
	gE3ww	Energy consumption from grid and self produced in urban wastewater per serviced population in the area that is the responsibility of the water utility
	gE4ww	Energy consumption from grid and self produced in urban wastewater per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG1	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per inhabitant living permanently in the area that is the responsibility of the water utility
	wwGHG2	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per serviced population in the area that is the responsibility of the water utility
	wwGHG3	All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG4	Total of all GHG Emissions related to grid energy consumption minus the renewable energy produced and sold by the undertaking per serviced population in the area that is the responsibility of the water utility
	wwGHG5	Total of all GHG Emissions related to grid energy consumption minus the renewable energy produced and sold by the undertaking per collected wastewater prior to any infiltration and inflow or overflows in the sewer system
	wwGHG8	Direct CO2 emitted in wastewater stages from on-site engines per serviced population in the area that is the responsibility of the water utility
	wwGHG9	GHG emissions from fuel engines in the wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG10	GHG emissions from biogas flaring at the wastewater treatment plant per serviced population in the area that is the responsibility of the water utility
	wwGHG11	GHG emissions from biogas flaring at the wastewater treatment plant per wastewater volume collected by the undertaking prior to dilution in the sewer 
	wwGHG12	GHG emissions from the discharge of treated effluent to waterbodies per serviced population
	wwGHG13	GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume
	wwGHG14	GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population
	wwGHG15	GHG emissions from the discharge of untreated wastewater to waterbodies per collected wastewater volume
	wwGHG16	GHG emissions from sludge transport per serviced population
	wwGHG17	GHG emissions from sludge transport per collected wastewater volume
		
		
	aE1	Unit energy consumption per abstracted water in water abstraction and conveyance (gravity or pumped)
	aE2	Relative weight of the energy consumption in abstracted water with regard to the Total energy consumed from the grid and self produced in the water and wastewater systems
	aE3	Average energy consumption per pumping water per head
	aE4	Unit energy recovered in water conveyance
	aE5	Represents an average energy turbine efficiency
	aE6	Total (apparent and real) water losses, expressed in terms of annual volume lost per mains length
	aE7	Unit energy friction loss in the conveyance system 
	tE0	Percentage of each treatment type, in terms of volume treated, of all WTPs assessed
	tE0.1	
	tE0.2	
	tE0.3	
	tE0.4	
	tE0.5	
	tE0.6	
	tE1	Unit energy consumption per treated water in water treatment plants
	tE2	Percentage of energy consumed in water treatment per Total energy consumed from the grid and self produced in the water and wastewater systems
	tE3	Unit sludge production per treated water in water treatment plants
	tE4	Percentage of treatment capacity utilized
	wS1	Percentage of the total number of treated water tests performed that comply with
	dE1	the applicable standards or legislation
	dE2	Unit energy consumption per authorized consumption in water distribution
	dE3	Relative weight of the energy consumption in authorized consumption with regard to the Total energy consumed from the grid and self produced in the water and wastewater systems
	dE4	Average energy consumption per pumping water per head
	dE5	Integrate all system distribution inefficiencies (pumps, friction, leaks and others). Compliments, giving a more complete information dE3 
	dE6	Percentage of energy provided to the system due to the terrain topography 
	dE7	Total water losses (apparent and real), expressed in terms of annual volume lost per mains length
	wS2	Unit energy friction loss in the conveyance system 
	wS3	Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure
	wcE1	Percentage of hours when the (intermittent supply) system is pressurised
	wcE2	Unit energy consumption per conveyed wastewater to treatment
	wcE3	Percentage of energy consumed in wastewater collection with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems
	wwS4	Percentage of Infiltration and inflow water entering the sewer system compared to the volume of collected wastewater prior to dilution
	wtE0	Average energy consumption per pumping wastewater per head
	wtE0.1	Percentage of each treatment type, in terms of volume treated, of all WWTPs assessed
	wtE0.2	
	wtE0.3	
	wtE0.4	
	wtE0.5	
	wtE0.6	
	wtE1	
	wtE2	Unit energy consumption per treated wastewater in wastewater treatment plants
	wtE3	Percentage of energy consumed in wastewater treatment with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems
	wtE4	Unit energy consumption per BOD mass removed in wastewater treatment plants
	wtE5	Unit energy production per treated wastewater in wastewater treatment plants
	wtE6	Unit biogas produced per BOD mass removed in wastewater treatment plants
	wtE7	Percentage of the electrical energy produced related to the available energy in biogas
	wtE8	Unit sludge production per treated wastewater in wastewater treatment plants
	wtE9	Percentage of dry weight of sludge that comes out from the WWTP to disposal
	wwS3	Percentage of wastewater treatment capacity utilized
	wdE1	Percentage of the tests carried out in wastewater treatment plants that comply with discharge consents
	wdE2	Unit energy consumption per discharged wastewater in wastewater interception and discharged
	wdE3	Percentage of energy consumed in wastewater discharged with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems
	wdE4	Average energy consumption per pumping discharged wastewater per head
	wdE5	Unit energy recovered in water discharge
*/

Info.aE1.explanation="Unit energy consumption per conveyed water in water abstraction and conveyance";
Info.aE2.explanation="Relative weight of the energy consumption in abstracted water with regard to the global utility system";
Info.aE3.explanation="Average energy consumption per pumping water per head";
Info.aE4.explanation="Unit energy recovered in water conveyance";
Info.aE5.explanation="Represents an average energy turbine efficiency";
Info.aE6.explanation="Total (apparent and real) losses, expressed in terms of annual volume lost per mains length";
Info.aE7.explanation="Unit energy friction loss in the conveyance system";
Info.dE1.explanation="Unit energy consumption per authorized consumption in water distribution";
Info.dE2.explanation="Relative weight of the energy consumption in authorized consumption with regard to the global utility system";
Info.dE3.explanation="Average energy consumption per pumping water per head";
Info.dE4.explanation="Integrate all system distribution inefficiencies (pumps, friction, leaks and others). Compliments, giving a more complete information dE3";
Info.dE5.explanation="Percentage of energy provided to the system due to the terrain topography";
Info.dE6.explanation="Total (apparent and real) losses, expressed in terms of annual volume lost per mains length";
Info.dE7.explanation="Unit energy friction loss in the conveyance system";
Info.gE1w.explanation="Proportion of the utility energy costs referred to the total running costs";
Info.gE1ww.explanation="Proportion of the utility energy costs referred to the total running costs";
Info.gE2w.explanation="Energy consumption in urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.gE2ww.explanation="Energy consumption from grid and self produced in urban wastewater system per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.gE3w.explanation="Energy consumption in urban drinking water system per serviced population in the area that is the responsibility of the water utility";
Info.gE3ww.explanation="Energy consumption in urban wastewater system per serviced population in the area that is the responsibility of the water utility";
Info.gE4w.explanation="Energy consumption in urban drinking water system per per authorized consumption";
Info.gE4ww.explanation="Energy consumption in urban wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer";
Info.tE01.explanation="";
Info.tE02.explanation="";
Info.tE03.explanation="";
Info.tE04.explanation="";
Info.tE05.explanation="";
Info.tE06.explanation="";
Info.tE1.explanation="Unit energy consumption per treated water in water treatment plants";
Info.tE2.explanation="Percentage of energy consumed in water treatment";
Info.tE3.explanation="Unit sludge production per treated water in water treatment plants";
Info.tE4.explanation="Percentage of treatment capacity utilized";
Info.wGHG1.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of drinking water supply per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.wGHG2.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of drinking water supply per serviced population in the area that is the responsibility of the water utility";
Info.wGHG3.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of drinking water supply per authorized consumption";
Info.wGHG4.explanation="Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per serviced population in the area that is the responsibility of the water utility";
Info.wGHG5.explanation="Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per authorized consumption ";
Info.wGHG6.explanation="Total of all GHG Emissions related to grid energy consumption per serviced population in the area that is the responsibility of the water utility";
Info.wGHG7.explanation="Total of all GHG Emissions related to grid energy consumption per authorized consumption ";
Info.wS1.explanation="Percentage of the total number of treated water tests performed that comply with the applicable standards or legislation";
Info.wS2.explanation="Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure";
Info.wS3.explanation="Percentage of hours when the (intermittent supply) system is pressurised";
Info.wS4.explanation="Percentage of the resident population that are connected to the supply systems managed by the undertaking";
Info.wS5.explanation="Percentage of the system input volume that corresponds to non-revenue water";
Info.wwGHG1.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of wastewater service per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.wwGHG2.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of wastewater service per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG3.explanation="All GHG Emissions (from electricity consumption and other emisions) in all stages of wastewater service per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG4.explanation="Total of all GHG Emissions related to grid energy consumption per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG5.explanation="Total of all GHG Emissions related to grid energy consumption minus the renewable energy produced and sold per collected wastewater prior to any infiltration and inflow or overflows in the sewer system";
Info.wwGHG6.explanation="Total of all GHG Emissions not related to grid energy consumption per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG7.explanation="Total of all GHG Emissions not related to grid energy consumption per collected wastewater prior to any infiltration and inflow or overflows in the sewer system";
Info.wwGHG8.explanation="GHG emissions from fuel engines in the wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG9.explanation="GHG emissions from fuel engines in the wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG10.explanation="GHG emissions from from biogas handling at the wastewater treatment plant per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG11.explanation="GHG emissions from from biogas handling at the wastewater treatment plant per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG12.explanation="GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume";
Info.wwGHG13.explanation="GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume";
Info.wwGHG14.explanation="GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population";
Info.wwGHG15.explanation="GHG emissions from the discharge of untreated wastewater to waterbodies per collected wastewater volume";
Info.wwGHG16.explanation="GHG emissions from sludge transport per serviced population";
Info.wwGHG17.explanation="GHG emissions from sludge transport per collected wastewater volume";
Info.wwS1.explanation="Percentage of the resident population that are connected to the sewer systems managed by the undertaking";
Info.wwS2.explanation="Percentage of the collected sewage that are treated in wastewater treatment plants";
Info.wwS3.explanation="Percentage of the tests carried out in wastewater treatment plants that comply with discharge consents";
Info.wwS4.explanation="percent of Infiltration and inflow water entering the sewer system compared to the volume of collected wastewater prior to dilution";
