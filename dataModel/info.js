/** 
  *
  * DESCRIPTIONS, MAGNITUDES AND UNITS (for inputs, calculated variables and PIs)
  *
  */

/** 
	"Info" is a one level depth object that stores all variable descriptions and units

	Format:
		"variable code":
		{
			"description" : string,
			"magnitude"	  : string,
			"unit"		  : string,
			"explanation" : string, (defined at the end)
		},
*/

var Info = {
	//L0 GENERAL
	"Days":{description:"Assessment period",magnitude:"Time",unit:"days"},
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
	"wsa1":{description:"Total electric energy consumption",      magnitude:"Energy",unit:"kWh",},
	"wsa2":{description:"Volume of conveyed water",               magnitude:"Volume",unit:"m3",},
	"wsa3":{description:"Electric energy produced from turbines", magnitude:"Energy",unit:"kWh",},
	//L3 Water Abstraction
	"wsa4" :{description:"Pumping head in each pumping system",                        magnitude:"Head",         unit:"m",},
	"wsa5" :{description:"Volume pumped in each Pumping System",                       magnitude:"Head",         unit:"m3",},
	"wsa6" :{description:"Turbine water volume",                                       magnitude:"Volume",       unit:"m3",},
	"wsa7" :{description:"Turbine head",                                               magnitude:"Head",         unit:"m",},
	"wsa8" :{description:"Water losses",                                               magnitude:"Volume",       unit:"m3",},
	"wsa9" :{description:"Mains lenght",                                               magnitude:"Distance",     unit:"km",},
	"wsa10":{description:"Friction pipe losses",                                       magnitude:"Head",         unit:"m",},
	c_wsa50:{description:"[Sum](abstracted water volume pumped x pump head in meters)",magnitude:"Volume x Head",unit:"m3 x 100m"},
	//L2 Water Treatment
	"wst1":{description:"Volume of treated water", magnitude:"Volume", unit:"m3",},
	"wst2":{description:"Total energy consumed",   magnitude:"Energy", unit:"kWh",},
	//L3 Water Treatment
	"wst3" :{description:"Treated water quality tests carried out",                   magnitude:"Number",  unit:"number",},
	"wst4" :{description:"Compliance of aesthetic tests",                             magnitude:"Number",  unit:"number",},
	"wst5" :{description:"Compliance of microbiological tests",                       magnitude:"Number",  unit:"number",},
	"wst6" :{description:"Compliance of physical-chemical tests",                     magnitude:"Number",  unit:"number",},
	"wst7" :{description:"Compliance of radioactivity tests",                         magnitude:"Number",  unit:"number",},
	"wst8" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",magnitude:"Volume",  unit:"m3",},	
	"wst9" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/Filt/Des",  magnitude:"Volume",  unit:"m3",},	
	"wst10":{description:"Volume of treated water in WTPs with C/F/S/Filt/Des",       magnitude:"Volume",  unit:"m3",},
	"wst11":{description:"Volume of treated water in WTPs with C/F/Filt/Des",         magnitude:"Volume",  unit:"m3",},
	"wst12":{description:"Volume of treated water in WTPs with Des",                  magnitude:"Volume",  unit:"m3",},
	"wst13":{description:"Volume of treated water in WTPs with other",                magnitude:"Volume",  unit:"m3",},
	"wst14":{description:"Sludge produced in WTPs",                                   magnitude:"Mass",    unit:"kg",},
	"wst15":{description:"Treatment capacity",                                        magnitude:"Volume",  unit:"m3",},
	"wst16":{description:"Tests complying with discharge consents",                   magnitude:"Number",  unit:"number",},
	c_wst50:{description:"Percentage of tests complying with regulations",            magnitude:"Percent", unit:"%"},
	//L2 Water Distribution
	"wsd1"  :{description:"Total energy consumed",                                              magnitude:"Energy",     unit:"kWh", },
	"wsd5"  :{description:"Resident population connected to the drinking water supply systems", magnitude:"Population", unit:"People",},
	"wsd6"  :{description:"Serviced population in supply systems",                              magnitude:"Population", unit:"People",},
	"wsd7"  :{description:"Distribution system input volume",                                   magnitude:"Volume",     unit:"m3",},
	"wsd8"  :{description:"Non-revenue water in distribution system",                           magnitude:"Volume",     unit:"m3",},
	"wsd20" :{description:"Volume of authorized consumption",                                   magnitude:"Volume",     unit:"m3",},
	//L3 Water Distribution
	"wsd2" :{description:"Delivery points with adequate pressure",                                  magnitude:"Number",        unit:"number",},
	"wsd3" :{description:"Number of service connections",                                           magnitude:"Number",        unit:"number",},
	"wsd4" :{description:"Time system is pressurised",                                              magnitude:"Time",          unit:"hour",},
	"wsd9" :{description:"Volume injected",                                                         magnitude:"Volume",        unit:"m3",},
	"wsd10":{description:"Minimum pressure to be supplied at the distribution nodes	",              magnitude:"Pressure",      unit:"m",},
	"wsd11":{description:"Highest node elevation",                                                  magnitude:"Distance",      unit:"m asl",},
	"wsd12":{description:"Lowest node elevation of the stage",                                      magnitude:"Distance",      unit:"m asl",},
	"wsd13":{description:"Average nodes elevation",                                                 magnitude:"Distance",      unit:"m asl",},
	"wsd14":{description:"Water table elevation node",                                              magnitude:"Distance",      unit:"m",},
	"wsd15":{description:"Distributed water pumped",                                                magnitude:"Volume",        unit:"m3",},
	"wsd16":{description:"Pump head",                                                               magnitude:"Head",          unit:"m",},
	"wsd17":{description:"Energy recovered at water distribution",                                  magnitude:"Energy",        unit:"kWh",},
	"wsd18":{description:"Mains length",                                                            magnitude:"Distance",      unit:"km",},
	"wsd19":{description:"Friction pipe losses",                                                    magnitude:"Head",          unit:"m",},
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
	"ww13":{description:"Annual per capita protein consumption <select id=ww13options onchange=Global.Waste.ww13=parseFloat(this.value);init()> <option value=0>--select country--<option value=20.8>Thailand (20.8)<option value=24.5>Peru (24.5)<option value=33.6>Mexico (33.6) </select> ", magnitude:"Annual per capita consumption",   unit:"kg/person/year",},
	"ww14":{description:"BOD5 per person per day", magnitude:"Mass/inhab/time",   unit:"g/person/day",},
	"ww15":{description:"Treated wastewater volume", magnitude:"Volume",   unit:"m3",},
	c_ww50:{description:"Biogas flared",magnitude:"Volume",unit:"Nm3"},
	c_ww51:{description:"N2O emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kgCO2e"},
	c_ww52:{description:"CH4 emissions from untreated wastewater direct discharge",magnitude:"Mass",unit:"kgCO2e"},
	c_ww53:{description:"N2O emitted from treated wastewater effluent discharged",magnitude:"Mass",unit:"kgCO2e"},
	c_ww54:{description:"CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion",magnitude:"Mass",unit:"kgCO2e"},
	c_ww55:{description:"Methane (CO2e) emitted in wastewater treatment plants",magnitude:"Mass",unit:"kgCO2e"},
	c_ww56:{description:"Energy of fuel consumed for onsite engines",magnitude:"Energy",unit:"kWh"},
	c_ww57:{description:"Direct CO2 emitted in wastewater stages from on-site engines",magnitude:"Mass",unit:"kgCO2e"},
	c_ww58:{description:"Energy of fuel consumed for sludge transport",magnitude:"Energy",unit:"kWh",},

	//L2 Wastewater General
	"wwg1":{description:"Water-related energy produced",                                               magnitude:"Energy",unit:"kWh",},
	"wwg2":{description:"Water-related energy produced sold to the grid",                              magnitude:"Energy",unit:"kWh",},
	"wwg3":{description:"Non-water related energy produced",                                           magnitude:"Energy",unit:"kWh",},
	"wwg4":{description:"Non-water related energy produced sold to the grid",                          magnitude:"Energy",unit:"kWh",},
	"wwg5":{description:"Heat energy valorized from wastewater",                                       magnitude:"Energy",unit:"Joule",},
	c_wwg50:{description:"Total electrical energy consumed from the grid and from self-production related to the wastewater system",magnitude:"Energy",unit:"kWh",},
	c_wwg51:{description:"Net total process related grid energy consumed by the utility related to the wastewater system",magnitude:"Energy",unit:"kWh",},
	c_wwg52:{description:"GHG emission offset from using the Heat energy from wastewater instead of fuel for neighboring districts for heating or cooling",magnitude:"Mass",unit:"kg",},

	//L2 Wastewater Collection
	"wwc1":{description:"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge",magnitude:"Volume",unit:"m3",},
	"wwc2":{description:"Total electric energy consumption",magnitude:"Energy",unit:"kWh",},

		//L3 Wastewater Collection
		"wwc3" :{description:"Volume pumped",                                    magnitude:"Volume",unit:"m3",},
		"wwc4" :{description:"Pump head",                                        magnitude:"Head",  unit:"m",},
		c_wwc50:{description:"[Sum] (water volume pumped x pump head in meters)",magnitude:"Volume x head",unit:"m3 x 100m",},
		c_wwc51:{description:"Volume of dilution from Infiltration and Inflow",  magnitude:"Volume",unit:"m3",},

	//L2 Wastewater Treatment
	"wwt1" :{description:"Influent BOD5 load",magnitude:"Mass",unit:"kg",},
	"wwt2" :{description:"Biogas produced",magnitude:"Volume",unit:"Nm3",},
	"wwt3" :{description:"Biogas valorised",magnitude:"Volume",unit:"Nm3",},
	"wwt5" :{description:"Effluent TN load",magnitude:"Mass",unit:"kg",},
	"wwt6" :{description:"Total nitrogen load in the influent",magnitude:"Mass",unit:"kg",},
	"wwt8" :{description:"Volume of treated wastewater",                                                    magnitude:"Volume",       unit:"m3",},
	"wwt9" :{description:"Total electric energy consumption",                                                magnitude:"Energy",       unit:"kWh",},
	"wwt10":{description:"Effluent BOD5",                                                                   magnitude:"Mass",         unit:"kg",},
	"wwt11":{description:"Electrical energy produced from biogas valorization",                             magnitude:"Energy",       unit:"kWh",},
	"wwt12":{description:"Percentage of methane in biogas",                                                 magnitude:"Percentage",   unit:"%",},
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
	"wwd1":{description:"Volume of treated or untreated discharged wastewater",       magnitude:"Volume",unit:"m3",},
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
	gE1w    :{description:"Energy costs",                                                                                magnitude:"Percent",           unit:"%"},
	gE1ww   :{description:"Energy costs",                                                                                magnitude:"Percent",           unit:"%"},
	gE2w    :{description:"Energy consumption per capita",	                                                             magnitude:"Energy/inhab/time", unit:"kWh/inhab/year"},
	gE2ww   :{description:"Energy consumption per capita",	                                                             magnitude:"Energy/inhab/time", unit:"kWh/inhab./year"},
	gE3w    :{description:"Energy consumption per serviced population",	                                                 magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop/year"},
	gE3ww   :{description:"Energy consumption per serviced population",	                                                 magnitude:"Energy/inhab/time", unit:"kWh/serv.Pop./year"},
	gE4w    :{description:"Energy consumption per authorized consumption",	                                             magnitude:"Energy/Volume",     unit:"kWh/m3"},
	gE4ww   :{description:"Energy consumption per collected wastewater volume",                                          magnitude:"Energy/Volume",     unit:"kWh/m3"},
	wGHG1   :{description:"GHG emissions per capita",                                                                    magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wGHG2   :{description:"GHG emissions per serviced population",                                                       magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG3   :{description:"GHG emissions per authorized consumption",                                                    magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG4   :{description:"GHG emissions from other activities than electricity consumption per serviced population",    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG5   :{description:"GHG emissions from other activities than electricity consumption per authorized consumption", magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wGHG6   :{description:"GHG emissions from electricity consumption per serviced population",  	                     magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wGHG7   :{description:"GHG emissions from electricity consumption per authorized consumption",  	                 magnitude:"Mass/Volume",       unit:"kgCO2e/m3"},
	wS4	    :{description:"Proportion of resident population receiving service",		                                 magnitude:"Percent",           unit:"%"},
	wS5	    :{description:"Non-revenue water by volume",                                                                 magnitude:"Percent",           unit:"%"},	
	wS6     :{description:"Authorized consumption per pers per day",                                                     magnitude:"Volume/inhab/time", unit:"m3/inhab/day"},
	wwGHG1  :{description:"GHG emissions per capita",                                                                    magnitude:"Mass/inhab/time",   unit:"kgCO2e/inhab/year"},
	wwGHG2  :{description:"GHG emissions per serviced population",                                                       magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year"},
	wwGHG3  :{description:"GHG emissions per collected wastewater volume",	                                             magnitude:"Mass/inhab/time",   unit:"kgCO2e/m3"},
	wwGHG4  :{description:"GHG emissions from electricity consumption per serviced population",                          magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year",},
	wwGHG5  :{description:"GHG emissions from electricity consumption per collected wastewater",                         magnitude:"Mass/Volume",       unit:"kgCO2e/m3",},
	wwGHG6  :{description:"GHG emissions from other activities than electricity consumption per serviced population",    magnitude:"Mass/inhab/time",   unit:"kgCO2e/serv.Pop/year",},
	wwGHG7  :{description:"GHG emissions from other activities than electricity consumption per collected wastewater",   magnitude:"Mass/Volume",       unit:"kgCO2e/m3",},
	wwS1    :{description:"Proportion of resident population receiving service",                                         magnitude:"Percent",           unit:"%",},
	wwS2    :{description:"Collected wastewater treated",                                                                magnitude:"Percent",           unit:"%",},
	wwS5    :{description:"Treated wastewater per pers per day",                                                         magnitude:"Volume/inhab/time", unit:"m3/inhab/day",},

	//PERFORMANCE INDICATORS LEVEL 2
	wS1	    :{description:"Percentage of quality compliance",                                                                        magnitude:"Percent",         unit:"%",},
	wS2	    :{description:"Percentage of supply pressure adequacy",                                                                  magnitude:"Percent",         unit:"%",},
	wS3	    :{description:"Continuity of supply",                                                                                    magnitude:"Percent",         unit:"%",},
	wwGHG8	:{description:"GHG emissions from fuel engines per serviced population",                                                 magnitude:"Mass/inhab/time", unit:"kgCO2e/serv.Pop/year",},
	wwGHG9	:{description:"GHG emissions from fuel engines per collected wastewater volume",                                         magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG10	:{description:"GHG emissions from biogas flaring at the WWTP per serviced population",                                   magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG11	:{description:"GHG emissions from biogas flaring at the WWTP per collected wastewater volume",                           magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG12	:{description:"GHG emissions from the discharge of treated effluent to waterbodies per serviced population",             magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG13	:{description:"GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume",     magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG14	:{description:"GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population",         magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG15	:{description:"GHG emissions from the discharge of untreated wastewater to waterbodies per collected wastewater volume", magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwGHG16	:{description:"GHG emissions from sludge transport per serviced population",                                             magnitude:"Mass/inhab",      unit:"kgCO2e/serv.pop",},
	wwGHG17	:{description:"GHG emissions from sludge transport per collected wastewater volume",                                     magnitude:"Mass/Volume",     unit:"kgCO2e/m3",},
	wwS3    :{description:"Percentage of quality compliance",                                                                        magnitude:"Percent",         unit:"%",},
	wwS4	:{description:"Percent dilution in the sewer system",                                                                    magnitude:"Percent",         unit:"%",},


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
} //end Info

//Explanations. Syntax: Info.code.explanation=explanation
Info.Days.explanation="Period of time adopted for the assessment of the data and of the PI"
Info.c_wsa50.explanation="Sum, for all the pumps of the water abstracted system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100";
Info.c_wsd51.explanation="This energy takes into account the node consumption elevation plus the minimum pressure required by the users";
Info.c_wsd52.explanation="The energy provided to a system can be natural and shaft (pumping energy). With the provided expression the energy is precisely calculated";
Info.c_wsd53.explanation="This is the energy supplied to the system because its irregular topography";
Info.c_wsg50.explanation="Total energy consumed by drinking water utility";
Info.c_wsg51.explanation="Ultimately this number is multiplied by EF gV9";
Info.c_wsg52.explanation="CO2e of heat used for District heating or cooling from urban drinking water system";
Info.c_ww50.explanation="The Biogas flared is calculated based on the amount of biogas produced under good operating conditions of the plant and the anaerobic digestor if biogas is NOT recovered to produce energy";
Info.c_ww51.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor";
Info.c_ww52.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment. Based upon BOD in the WWTP influent multiplied by default emission factor";
Info.c_ww53.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent. Based upon nitrogen in the WWTP effluent multiplied by default emission factor";
Info.c_ww54.explanation="Indirect CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion";
Info.c_ww55.explanation="Methane (CO2e) emitted in wastewater treatment plants";
Info.c_ww57.explanation="Total direct CO2e emitted from on-site engines in wastewater stages based upon sum of CO2, CH4 and N2O emission from stationary combustion ";
Info.c_ww58.explanation="The fuel consumption is calculated assuming 2 times distance to disposal site (round tryp) time the number of trips times an average diesel consumption of 25 L per 100 km";
Info.c_wwc50.explanation="Sum, for all the pumps of the wastewater collection system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100 ";
Info.c_wwc51.explanation="This volume is calculated based on a mass balance on the BOD load. It considers the volume of collected wastewater prior to dilution, the ratio between the population connected to sewers and the serviced population, and the standard country specific BOD input to sewers in g/ pers/ day. The other side of the mass balance considers the volume of treated wastewater and the BOD load in the treatment plant influent. ";
Info.c_wwd50.explanation="Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100";
Info.c_wwd51.explanation="Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100";
Info.c_wwg50.explanation="Total energy consumed in wastewater cycle  ";
Info.c_wwg52.explanation="CO2e of heat used for District heating or cooling from urban wastewater system ";
Info.c_wwt50.explanation="";
Info.c_wwt51.explanation="Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e using the conversion factor of 298 kg of CO2 per kg of N2O.";
Info.c_wwt52.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment. Based upon BOD in the WWTP influent multiplied by default emission factor ";
Info.c_wwt53.explanation="Sum of energy content of biogas used in cogeneration during the assessment period by all wastewater treatment plants managed by the undertaking ";
Info.c_wwt54.explanation="This is calculated from the difference in BOD mass from the influent with BOD mass from the effluent over the assessment period.";
Info.c_wwt55.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent";
Info.c_wwt56.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor ";
Info.c_wwt57.explanation="Energy equivalent of fuel usage in the truck to disposal site. This assumes a truck fuel consumption of 25 L/100km";
Info.c_wwt58.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor ";
Info.c_wwt59.explanation="Methane (CO2e) emitted in wastewater treatment plants ";
Info.c_wwt60.explanation="Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent. Based upon nitrogen in the WWTP effluent multiplied by default emission factor";
Info.uw1.explanation="Ratio of CO2 emission per energy consumed";
Info.ws1.explanation="Number of permanent residents within the service area managed by the undertaking which are connected to the water supply system";
Info.ws2.explanation="Number of permanent residents within the water utility area of service";
Info.ws3.explanation="Costs from electric energy consumption for the entire water supply utilty, based on the electricity bill during the entire assessment period";
Info.ws4.explanation="Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to water supply within the service area managed by the undertaking during the entire assessment period";
Info.ws5.explanation="Total energy consumed from the grid for the entire water supply utilty, based on the electricity bill during the entire assessment period.";
Info.ws7.explanation="Sum of the volume of metered and/or non-metered water that during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported";
Info.ws8.explanation="Percentage of the abstracted water Volume that is lost due to leaks or illegal connection to the distribution system , At level 1, enter the percentage as known or estimated by the utility. At level 2, the non revenue water indicator (wS5) will be calculated based on a mass balance.";
Info.ws9.explanation="Fuel consumption in water supply, for instance, due to the use of on-site generators or devices that work on fuel.";
Info.wsa1.explanation="Electric energy consumption including both from the grid and self-produced, for the water abstraction unit, by the undertaking during the entire assessment period";
Info.wsa2.explanation="Sum of the volume of water conveyed (gravity or pumped) in the water abstraction unit that are the responsibility of the undertaking, during the assessment period";
Info.wsa3.explanation="Sum of energy recovered during the assessment period by all turbines for abstracted water managed by the undertaking";
Info.wsa4.explanation="Head at which the water is pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period";
Info.wsa5.explanation="Volume of water pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period";
Info.wsa6.explanation="Sum of volume passing through a turbine managed by the undertaking to produce electricity, for each abstraction system unit";
Info.wsa7.explanation="Head at which the water is falling through turbines in each water abstraction unit that are the responsibility of the undertaking, during the assessment period";
Info.wsa8.explanation="Difference between system abstracted volume and the volume entering the water treatment plant and/or entering directly the distribution system";
Info.wsa9.explanation="Total transmission and distribution mains length (there are not service connections at the abstraction and conveyance stage)";
Info.wsa10.explanation="All friction losses (including the local ones in valves and accessories) must be included";
Info.wsd1.explanation="Electric energy consumption including both from the grid and self-produced, for water distribution during the entire assessment period";
Info.wsd2.explanation="Number of delivery points that receive and are likely to receive pressure equal to or above the guaranteed or declared target level at the peak demand hour (but not when demand is abnormal).";
Info.wsd3.explanation="Total number of service connections, at the reference date";
Info.wsd4.explanation="Amount of time of the year the system is pressurised ";
Info.wsd5.explanation="Resident population connected to each water distribution system managed by the undertaking, at the reference date";
Info.wsd6.explanation="Resident population connected to each water distribution unit managed by the undertaking, at the reference date";
Info.wsd7.explanation="The water volume entering the distribution system from the water treatment or directly from abstraction during the assessment period ";
Info.wsd8.explanation="Difference between the distribution system input volume and the authorized consumption (including exported water) during the assessment period for each water distribution unit";
Info.wsd9.explanation=" Volume injected to the water distribution stage, for each water distribution unit";
Info.wsd10.explanation="According the standards, a minimum pressure must be provided to the consumers (20 - 30 m) , for each water distribution unit";
Info.wsd11.explanation="Is the elevation of the highest node of the network, , for each water distribution unit";
Info.wsd12.explanation="Is the elevation of the lowest node of the stage, for each water distribution unit";
Info.wsd13.explanation="The average elevation of the network. If necessary it could be calculated as sum of lowest and the highest node elevation of the network divided by two, for each water distribution unit";
Info.wsd14.explanation="It is the elevation of the water table to calculate the natural energy provided to the system, for each water distribution unit";
Info.wsd15.explanation="Volume of water in the drinking water distribution system which requires pumping, for each distribution unit";
Info.wsd17.explanation="Total energy recovered during the assessment period by each water distribution unit ";
Info.wsd18.explanation="Total transmission and distribution mains length (service connections not included), for each water distribution unit at the reference date";
Info.wsd19.explanation="Friction losses (including the local ones in valves and accessories), for each water distribution unit at the reference date.";
Info.wsd20.explanation="Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported";
Info.wsg1.explanation="Water-related energy produced in the urban drinking water system, by the undertaking during the entire assessment period";
Info.wsg2.explanation="Water-related energy produced in the urban drinking water system sold to the grid, by the undertaking during the entire assessment period";
Info.wsg3.explanation="Non-water-related energy produced in the urban drinking water system (e.g. solar, wind), by the undertaking during the entire assessment period";
Info.wsg4.explanation="Non-water-related energy produced in the urban drinking water system (e.g. solar, wind) sold to the grid, by the undertaking during the entire assessment period";
Info.wsg5.explanation="Heat energy produced from a heat pump using water from the urban drinking water system or urban wastewater system. The heat energy may be provided to utility building or neighboring districts";
Info.wst1.explanation="Sum of the volume of water treated by WTPs that are the responsibility of the water undertaking, during the assessment period";
Info.wst10.explanation="Sum of the volume of water treated by WTPs with C/F/S/Filt/Des ";
Info.wst11.explanation="Sum of the volume of water treated by WTPs with C/F/Filt/Des";
Info.wst12.explanation="Sum of the volume of water treated by WTPs with Des";
Info.wst13.explanation="Sum of the volume of water treated by WTPs with other sequence ";
Info.wst14.explanation="Sludge produced during the assessment period by each urban water treatment plant managed by the undertaking";
Info.wst15.explanation="The treatment capacity of each WTP or on site system facility that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wst16.explanation="Number of tests in treated wastewater treatment plants that comply with discharge consents during the assessment period";
Info.wst2.explanation="Energy consumed during the assessment period by each urban water treatment plant managed by the undertaking";
Info.wst3.explanation="Number of treated water tests carried out during the assessment period";
Info.wst4.explanation="Number of aesthetic tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst5.explanation="Number of microbiological tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst6.explanation="Number of physical-chemical tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst7.explanation="Number of radioactivity tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation";
Info.wst8.explanation="Sum of the volume of water treated by WTPs with Pre-oxidation (Pre-ox) ,Coagulation (C), Filtration (F), Sedimentation (S), Filtration (Filt) and Desinfection (Des)";
Info.wst9.explanation="Sum of the volume of water treated by WTPs with Pre-ox/C/F/Filt/Des";
Info.ww1.explanation="Costs from electric energy consumption for the entire wastewater utilty, based on the electricity bill during the entire assessment period.";
Info.ww10.explanation="Regulatory limit for total nitrogen concentration at the effluent of the WWTP ";
Info.ww11.explanation="Fuel consumption in the wastewater system during the assessment period. Fuel consumption may be due to the use of on-site generators, pumps or engines that work on fuel.";
Info.ww13.explanation="Protein consumption per capita per year. The default value is provided after selection of country. If you have a specific factor that applies to your region you can provide.";
Info.ww14.explanation="This represents the average Biochemical oxygen demand (BOD5) that each resident connected to the sewer system eliminates in the wastewater produced every day. The default value is provided after selection of country. This default value shall be adjusted if local studies provide more accurate estimates";
Info.ww15.explanation="treated wastewater volume (m3) ";
Info.ww2.explanation="Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to wastewater management within the service area managed by the undertaking during the entire assessment period";
Info.ww3.explanation="Total electric energy consumed from the grid related to wastewater management within the service area managed by the undertaking during the entire assessment period";
Info.ww4.explanation="Volume of wastewater discharged from water consumers (households, industries, etc.) to the sewer system during the assessment period and prior to any dilution from growndwater infiltration or surface water inflow, and prior to any overflows to sewage to the natural environment.";
Info.ww5.explanation="Number of permanent residents within the area of service for wastewater services managed by the undertaking (whether they are connected or not) , at the reference date ";
Info.ww6.explanation="Number of permanent residents within the service area managed by the undertaking which are connected to the sewer system , at the reference date ";
Info.ww7.explanation="Number permanent residents within the service area managed by the undertaking which wastewater is collected and treated, at the reference date";
Info.ww8.explanation="Number of truck trips to dispose sludge from the WWTP to the disposal site during the assessment period. Note that round trips to the disposal site shall be counted as 1 trip ";
Info.ww9.explanation="Distance between the WWTP and the disposal site. If there are more than one disposal sites, use an average value. Note that the tool calculates the round trip distance as twice the distance to the disposal site.";
Info.wwc1.explanation="Collected wastewater, corresponding to the volume of domestic, commercial and industrial outputs to the sewer system during the assessment period (pumped or not)";
Info.wwc2.explanation="Energy consumed during the assessment period by each pumping station for conveying wastewater to treatment managed by the undertaking";
Info.wwc3.explanation="";
Info.wwd1.explanation="Volume of wastewater discharged by each wastewater treatment plant that are the responsibility of the undertaking, during the assessment period. This includes all the wastewater collected, whether it is conveyed to treatment or discharged untreated";
Info.wwd3.explanation="Sum of energy consumed (from the grid or self-produced) during the assessment period by all each pumping stations for discharged wastewater managed by the undertaking";
Info.wwd4.explanation="Sum of energy recovered during the assessment period by all turbines for wastewater discharged managed by the undertaking";
Info.wwg1.explanation="Water-related electrical energy produced by the wastewater treatment utility (renewable energy) during the assessment period";
Info.wwg2.explanation="Water-related renewable electrical energy sold by the wastewater treatment utility (renewable energy) during the assessment period";
Info.wwg3.explanation="Non-water related renewable electricity production (e.g. solar or wind) by the wastewater treatment utility during the assessment period";
Info.wwg4.explanation="Non-water-related renewable electrical energy sold by the wastewater treatment utility (renewable energy) during the assessment period";
Info.wwg5.explanation="Heat energy produced from a heat pump using wastewater from the urban drinking water system system. The heat energy may be provided to utility building or neighboring districts";
Info.wwt1.explanation="BOD load entering the WWTP during the assessment period. It can be estimated by multiplying the average BOD concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate";
Info.wwt2.explanation="Biogas produced during the assessment period by each wastewater treatment plant managed by the undertaking";
Info.wwt3.explanation="Volume of biogas used to generate electricity or for heating (i.e. the anaerobic digester) at the wastewater treatment plant, over the assessment period";
Info.wwt5.explanation="Total nitrogen load in treated effluent prior to discharge during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.";
Info.wwt6.explanation="Total nitrogen load entering the WWTP during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.";
Info.wwt8.explanation="Volume of treated wastewater by each unit, over the assessment period";
Info.wwt8.explanation="Sum of the volume of wastewater treated by all WWTPs that are the responsibility of the wastewater undertaking, during the assessment period";
Info.wwt9.explanation="Total energy consumed during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt10.explanation="Average of BOD5 influent concentration during the assessment period by each wastewater treatment plant managed by the undertaking ";
Info.wwt11.explanation="Energy produced from biogas valorization during the assessment period by each wastewater treatment plant managed by the undertaking";
Info.wwt11.explanation="Sum of electrical energy produced during the assessment period by all wastewater treatment plants managed by the undertaking";
Info.wwt12.explanation="Percent of the methane content in the produced biogas";
Info.wwt14.explanation="BOD mass removed during the assessment period by each wastewater treatment plant managed by the undertaking";
Info.wwt15.explanation="Number of tests in each wastewater treatment plant that comply with discharge consents during the assessment period";
Info.wwt16.explanation="Number of tests carried out in each treated wastewater treatment plant during the assessment period";
Info.wwt17.explanation="Sum of the volume of wastewater treated by WWTPs with trickling filters (TF)";
Info.wwt18.explanation="Sum of the volume of wastewater treated by WWTPs with activated sludge (AS)";
Info.wwt19.explanation="Sum of the volume of wastewater treated by WWTPs with AS and Coagulation/Filtration (C/F) ";
Info.wwt20.explanation="Sum of the volume of wastewater treated by WWTPs with AS nitrification and C/F";
Info.wwt21.explanation="Sum of the volume of wastewater treated by WWTPs with Laggons";
Info.wwt22.explanation="Sum of the volume of wastewater treated by WWTPs with other type of treatment ";
Info.wwt23.explanation="Sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking";
Info.wwt24.explanation="Average of dry weight in sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking ";
Info.wwt25.explanation="Treatment capacity of each WWTP that are the responsibility of the wastewater undertaking, during the assessment period";

//KPI explanations
Info.aE1.explanation="Unit energy consumption per abstracted water in water abstraction and conveyance (gravity or pumped)";
Info.aE2.explanation="Relative weight of the energy consumption in abstracted water with regard to the Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.aE3.explanation="Average energy consumption per pumping water per head";
Info.aE4.explanation="Unit energy recovered in water conveyance";
Info.aE5.explanation="Represents an average energy turbine efficiency";
Info.aE6.explanation="Total (apparent and real) water losses, expressed in terms of annual volume lost per mains length";
Info.aE7.explanation="Unit energy friction loss in the conveyance system ";
Info.dE1.explanation="the applicable standards or legislation";
Info.dE2.explanation="Unit energy consumption per authorized consumption in water distribution";
Info.dE3.explanation="Relative weight of the energy consumption in authorized consumption with regard to the Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.dE4.explanation="Average energy consumption per pumping water per head";
Info.dE5.explanation="Integrate all system distribution inefficiencies (pumps, friction, leaks and others). Compliments, giving a more complete information dE3 ";
Info.dE6.explanation="Percentage of energy provided to the system due to the terrain topography ";
Info.dE7.explanation="Total water losses (apparent and real), expressed in terms of annual volume lost per mains length";
Info.gE1w.explanation="Proportion of the utility energy costs referred to the total running costs related to urban drinking water system";
Info.gE1ww.explanation="Proportion of the utility energy costs referred to the total running costs";
Info.gE2w.explanation="Energy consumption from grid and self produced in urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.gE2ww.explanation="Energy consumption from grid and self produced in urban wastewater system per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.gE3w.explanation="Energy consumption from grid and self produced in urban drinking water system per serviced population in the area that is the responsibility of the water utility";
Info.gE3ww.explanation="Energy consumption from grid and self produced in urban wastewater per serviced population in the area that is the responsibility of the water utility";
Info.gE4w.explanation="Energy consumption from grid and self produced in urban drinking water system per authorized consumption";
Info.gE4ww.explanation="Energy consumption from grid and self produced in urban wastewater per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.tE01.explanation=" ";
Info.tE02.explanation=" ";
Info.tE03.explanation=" ";
Info.tE04.explanation=" ";
Info.tE05.explanation=" ";
Info.tE06.explanation=" ";
Info.tE1.explanation="Unit energy consumption per treated water in water treatment plants";
Info.tE2.explanation="Percentage of energy consumed in water treatment per Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.tE3.explanation="Unit sludge production per treated water in water treatment plants";
Info.tE4.explanation="Percentage of treatment capacity utilized";
Info.wGHG1.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per inhabitant living permanently in the area that is the responsibility of the water utility";
Info.wGHG2.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per serviced population in the area that is the responsibility of the water utility";
Info.wGHG3.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of urban drinking water system per authorized consumption ";
Info.wGHG4.explanation="Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per serviced population in the area that is the responsibility of the water utility";
Info.wGHG5.explanation="Total of all GHG Emissions not related to grid energy consumption (fuel engines emissions) per authorized consumption ";
Info.wGHG6.explanation="Total of all GHG Emissions related to grid energy consumption per serviced population in the area that is the responsibility of the water utility";
Info.wGHG7.explanation="Total of all GHG Emissions related to grid energy consumption per authorized consumption ";
Info.wS1.explanation="Percentage of the total number of treated water tests performed that comply with";
Info.wS2.explanation="Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure";
Info.wS3.explanation="Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure";
Info.wS4.explanation="Percentage of the resident population that are connected to the urban drinking water system managed by the undertaking, also referred to as 'serviced population'";
Info.wS5.explanation="Percentage of the system input volume that corresponds to non-revenue water in relation with the total volume entering the urban drinking water system at the abstraction stage";
Info.wcE1.explanation="Percentage of hours when the (intermittent supply) system is pressurised";
Info.wcE2.explanation="Unit energy consumption per conveyed wastewater to treatment";
Info.wcE3.explanation="Percentage of energy consumed in wastewater collection with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.wdE1.explanation="Percentage of the tests carried out in wastewater treatment plants that comply with discharge consents";
Info.wdE2.explanation="Unit energy consumption per discharged wastewater in wastewater interception and discharged";
Info.wdE3.explanation="Percentage of energy consumed in wastewater discharged with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.wdE4.explanation="Average energy consumption per pumping discharged wastewater per head";
Info.wdE5.explanation="Unit energy recovered in water discharge";
Info.wtE01.explanation="Percentage of each treatment type, in terms of volume treated, of all WWTPs assessed";
Info.wtE02.explanation="";
Info.wtE03.explanation="";
Info.wtE04.explanation="";
Info.wtE05.explanation="";
Info.wtE06.explanation="";
Info.wtE1.explanation="";
Info.wtE2.explanation="Unit energy consumption per treated wastewater in wastewater treatment plants";
Info.wtE3.explanation="Percentage of energy consumed in wastewater treatment with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems";
Info.wtE4.explanation="Unit energy consumption per BOD mass removed in wastewater treatment plants";
Info.wtE5.explanation="Unit energy production per treated wastewater in wastewater treatment plants";
Info.wtE6.explanation="Unit biogas produced per BOD mass removed in wastewater treatment plants";
Info.wtE7.explanation="Percentage of the electrical energy produced related to the available energy in biogas";
Info.wtE8.explanation="Unit sludge production per treated wastewater in wastewater treatment plants";
Info.wtE9.explanation="Percentage of dry weight of sludge that comes out from the WWTP to disposal";
Info.wwGHG1.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per inhabitant living permanently in the area that is the responsibility of the undertaking";
Info.wwGHG10.explanation="GHG emissions from biogas flaring at the wastewater treatment plant per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG11.explanation="GHG emissions from biogas flaring at the wastewater treatment plant per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG12.explanation="GHG emissions from the discharge of treated effluent to waterbodies per serviced population";
Info.wwGHG13.explanation="GHG emissions from the discharge of treated effluent to waterbodies per collected wastewater volume";
Info.wwGHG14.explanation="GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population";
Info.wwGHG15.explanation="GHG emissions from the discharge of untreated wastewater to waterbodies per collected wastewater volume";
Info.wwGHG16.explanation="GHG emissions from sludge transport per serviced population";
Info.wwGHG17.explanation="GHG emissions from sludge transport per collected wastewater volume";
Info.wwGHG2.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per serviced population in the area that is the responsibility of the undertaking";
Info.wwGHG3.explanation="All GHG Emissions (from electricity consumption and other emissions) in all stages of wastewater service per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwGHG4.explanation="Total of all GHG Emissions related to grid energy consumption minus the renewable energy produced and sold by the undertaking per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG5.explanation="Total of all GHG Emissions related to grid energy consumption per collected wastewater prior to any infiltration and inflow or overflows in the sewer system";
Info.wwGHG6.explanation="Total of all GHG Emissions not related to grid energy consumption per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG7.explanation="Total of all GHG Emissions not related to grid energy consumption per collected wastewater prior to any infiltration and inflow or overflows in the sewer system";
Info.wwGHG8.explanation="Direct CO2 emitted in wastewater stages from on-site engines per serviced population in the area that is the responsibility of the water utility";
Info.wwGHG9.explanation="GHG emissions from fuel engines in the wastewater system per wastewater volume collected by the undertaking prior to dilution in the sewer ";
Info.wwS1.explanation="Percentage of the resident population that are connected to the sewer systems and which wastewater is treated by the undertaking";
Info.wwS2.explanation="Percentage of the collected sewage prior to dilution or overflows in the sewer system that are treated in wastewater treatment plants";
Info.wwS3.explanation="Percentage of water quality tests carried out in wastewater treatment plants that comply with discharge consents";
Info.wwS4.explanation="Percentage of Infiltration and inflow water entering the sewer system compared to the volume of collected wastewater prior to dilution";
Info.wS6.explanation="Volume of authorized consumption per serviced person in the service area managed by the undertaking divided by the duration of the assessment period";
Info.wwS5.explanation="Volume of treated wastewater per serviced person in the service area managed by the undertaking divided by the duration of the assessment period"; 
