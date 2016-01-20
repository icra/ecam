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
	"ws8":{description: "Water loss from leaks in the distribution system, as known or estimated by the Utility",magnitude:"Percent", unit:"%",},
	"ws9":{description:"Volume of Fuel consumed",                                                                magnitude:"Volume",  unit:"m3",},

	//L2 Water Supply General
	"wsg1":{description:"Water-related electrical energy produced by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg2":{description:"Water-related renewable electrical energy sold by the utility (renewable energy) during the assessment period",magnitude:"Energy",unit:"kWh",},
	"wsg3":{description:"Non-water related renewable electricity production by the utility",magnitude:"Energy",unit:"kWh",},
	"wsg4":{description:"Non-water related renewable electricity sold by the utility",magnitude:"Energy",unit:"kWh",},
	"wsg5":{description:"Heat energy, provided to neighboring districts for heating or cooling",magnitude:"Energy",unit:"Joule",},
	c_wsg50:{description:"Net total process related grid energy consumed by the utility related to the urban drinking water system",magnitude:"Energy",unit:"kWh"},
	c_wsg51:{description:"Net total process related grid energy consumed by the utility",magnitude:"Energy",unit:"kWh"},

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

	//L2 Water Treatment
	"wst1":{description:"Volume of treated water",                                           magnitude:"Volume", unit:"m3",},
	"wst2":{description:"Electric energy consumed in WTPs (from the grid and self-produced)",magnitude:"Energy", unit:"kWh",},
		
		//L3 Water Treatment
		"wst3" :{description:"Treated water quality tests carried out",                   magnitude:"Number", unit:"number",},
		"wst4" :{description:"Compliance of aesthetic tests",                             magnitude:"Number", unit:"number",},
		"wst5" :{description:"Compliance of microbiological tests",                       magnitude:"Number", unit:"number",},
		"wst6" :{description:"Compliance of physical-chemical tests",                     magnitude:"Number", unit:"number",},
		"wst7" :{description:"Compliance of radioactivity tests",                         magnitude:"Number", unit:"number",},
		"wst8" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des",magnitude:"Volume", unit:"m3",},	
		"wst9" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/Filt/Des",  magnitude:"Volume", unit:"m3",},	
		"wst10":{description:"Volume of treated water in WTPs with C/F/S/Filt/Des",       magnitude:"Volume", unit:"m3",},
		"wst11":{description:"Volume of treated water in WTPs with C/F/Filt/Des",         magnitude:"Volume", unit:"m3",},
		"wst12":{description:"Volume of treated water in WTPs with Des",                  magnitude:"Volume", unit:"m3",},
		"wst13":{description:"Volume of treated water in WTPs with other",                magnitude:"Volume", unit:"m3",},
		"wst14":{description:"Sludge produced in WTPs",                                   magnitude:"Mass",   unit:"kg",},
		"wst15":{description:"Treatment capacity",                                        magnitude:"Volume", unit:"m3",},

	//L2 Water Distribution
	"wsd1":{description:"Electric energy consumed for pumping distributed water (from the grid and self produced)", magnitude:"Energy", unit:"kWh", },
		
		//L3 Water Distribution
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
		"wsd15":{description:"Distributed water pumped",                                  magnitude:"Volume",    unit:"m3",},
		"wsd16":{description:"Pump head",                                                 magnitude:"Volume",    unit:"m",},
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
	c_ww50:{description:"Population",magnitude:"People",unit:"people"},
	c_ww51:{description:"N2O emissions from untreated wastewater direct discharge",magnitude:"",unit:""},
	c_ww52:{description:"CH4 emissions from untreated wastewater direct discharge",magnitude:"",unit:""},
	c_ww53:{description:"N2O emitted from wastewater effluent discharged",magnitude:"",unit:""},
	c_ww54:{description:"Indirect CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion",magnitude:"",unit:""},
	c_ww55:{description:"Methane (CO2e) emitted in wastewater treatment plants",magnitude:"?",unit:"?"},
	c_ww56:{description:"Energy fuel cons",magnitude:"Energy",unit:"kWh"},
	c_ww57:{description:"Direct CO2 emitted in wastewater stages from on-site engines (KPI)",magnitude:"?",unit:"?"},
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
	"wwc1":{description:"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge",             magnitude:"Volume",unit:"m3",},
	"wwc2":{description:"Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},

		//L3 Wastewater Collection
		"wwc3":{description:"Volume pumped",magnitude:"Volume",unit:"m3",},
		"wwc4":{description:"Pump head",    magnitude:"Head",  unit:"m",},

	//L2 Wastewater Treatment
	"wwt1" :{description:"Wastewater load (BOD)",magnitude:"Mass",unit:"kg",},
	"wwt2" :{description:"Biogas produced",magnitude:"Volume",unit:"m3",},
	"wwt3" :{description:"Biogas valorised",magnitude:"Volume",unit:"m3",},
	"wwt4" :{description:"<span style=color:red>Fuel type</span>",magnitude:"",             unit:"",},
	"wwt5" :{description:"TN effluent concentration",magnitude:"Concentration",unit:"mg/L",},
	"wwt6" :{description:"Influent nitrogen load",magnitude:"Mass",unit:"kg",},
	"wwt7" :{description:"<span style=color:red>Geographical location</span>",magnitude:"",unit:"",},
	"wwt8" :{description:"Volume of treated wastewater",                                                    magnitude:"Volume",       unit:"m3",},
	"wwt9" :{description:"Electric energy consumed in WWTPs (from the grid and self-produced)",             magnitude:"Energy",       unit:"kWh",},
	"wwt10":{description:"BOD effluent (average)",                                                          magnitude:"Mass",         unit:"kg",},
	"wwt11":{description:"Electrical energy produced in WWTPs from biogas valorization",                    magnitude:"Energy",       unit:"kWh",},
	"wwt12":{description:"Fraction of methane in biogas",                                                   magnitude:"Fraction",     unit:"%",},
	"wwt13":{description:"BOD influent (average)",                                                          magnitude:"Concentration",unit:"mg/L",},
	"wwt14":{description:"BOD mass removed",                                                                magnitude:"Mass",         unit:"kg",},
	c_wwt50:{description:"Biogas flared",                                                                   magnitude:"Volume",       unit:"Nm3"},
	c_wwt51:{description:"Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e",  magnitude:"",             unit:""},
	c_wwt52:{description:"CH4 emissions from untreated wastewater direct discharge",                        magnitude:"",             unit:""},
	c_wwt53:{description:"Total Energy content of biogas valorized in the Co-generator",                    magnitude:"Energy",       unit:"kWh"},
	c_wwt54:{description:"Indirect CO2e emitted in sludge transport",                                       magnitude:"",             unit:""},
	c_wwt55:{description:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent",magnitude:"",             unit:""},
	c_wwt56:{description:"N2O emissions from untreated wastewater direct discharge",                        magnitude:"",             unit:"",},
	c_wwt57:{description:"Energ Fuel Cons(iS1)",                                                            magnitude:"",             unit:""},
	c_wwt58:{description:"Total annual amount of nitrogen discharged directly to aquatic environment",      magnitude:"",             unit:"kg N/yr",},

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

	//L2 Wastewater Discharge
	"wwd1":{description:"Volume of discharged wastewater",                                                             magnitude:"Volume",unit:"m3",},
	"wwd2":{description:"Volume of discharged wastewater without treatment",                                           magnitude:"Volume",unit:"m3",},
	"wwd3":{description:"Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)",magnitude:"Energy",unit:"kWh",},
	"wwd4":{description:"Energy recovered in wastewater discharged",                                                   magnitude:"Energy",unit:"kWh",},
		
		//L3 Wastewater Discharge
		"wwd5":{description:"Enter volume pumped",              magnitude:"Volume",unit:"m3",},
		"wwd6":{description:"Enter head pumped against",        magnitude:"Head",  unit:"m",},
		"wwd7":{description:"Enter turbine water volume pumped",magnitude:"Volume",unit:"m3",},
		"wwd8":{description:"Enter turbine head",               magnitude:"Head",  unit:"m3",},
}
