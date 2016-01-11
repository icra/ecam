/** 
	NAMESPACE GLOBAL
	EXAMPLES OF VARIABLE ACCESSING
*/

var Global = {
	/** 00. General data of the system */
	"General":{
		"Name":"Default system name",
		"Location":"Default system location",
		"Assessment Period Start":"2016-01-01",
		"Assessment Period End":"2016-01-31",
		"Days":function()
		{
			var startDate = new Date(Global.General["Assessment Period Start"])
			var finalDate = new Date(Global.General["Assessment Period End"])
			return (finalDate-startDate)/1000/60/60/24;
		},
		"Comments":"Write comments here",
	},

	/** 01. Urban water system (former Global) */
	"UWS":{
		"uw1":0, //Conversion factor for grid electricity	kg CO2e/kWh
		"test":function(){return this.uw1+100},
	},

	/** 02. Water Supply*/
	"Water":{
		"ws1":0, //Serviced population within the water utility area of service	serv. Pop.
		"ws2":0, //Resident population within the water utility area of service	Inhab.
		"ws3":0, //Energy costs during the entire assessment period	Currency
		"ws4":0, //Running costs during the entire assessment period	Currency
		"ws5":0, //Total energy consumed from the grid (from power bills) during the assessment period	kWh
		"ws6":0, //Total volume produced for urban drinking water system	m3
		"ws7":0, //Volume of authorized consumption	m3
		"ws8":0, //Water loss from leaks in the distribution system, as known or estimated by the Utility	%
		"ws9":0, //Volume of Fuel consumed 	L
		"test":function(){return this.ws1+this.ws2},

		"Abstraction":{
			"aV1" : 0, //Energy consumed for pumping abstracted water (kWh)
			"sV1" : 0, //Volume of conveyed water (m3)
			"aV3" : 0, //Energy recovered in abstracted water (kWh)
			"aV2" :	0, //[Sum](abstracted water volume pumped x pump head in meters)	m3 x 100 m
			"aV4" :	0, //[Sum](turbine water volume pumped x  turbine head in meters)	m3 x 100 m
			"aV5" :	0, //Water losses	m3
			"aV6" :	0, //Mains lenght	km
			"aV7" :	0, //Friction pipe losses	m
			"aE1":function(){return this.aV1+this.sV1}, 	//Energy consumption per conveyed water (kWh/m3) 
			"aE2":function(){return 100*this.aV1}, 			//Energy consumption of abstracted water per total energy consumption (%) 
			"aE3":function(){return this.aV1/this.aV2}, 			//Standardised Energy Consumption (kWh/m3/100m) 
			"aE4":function(){return this.aV3/this.sV1}, 			//Energy recovery per conveyed water (kWh/m3) 
			"aE5":function(){return this.aV3/this.aV4}, 			//Standardized energy recovery (kWh/m3/100m) 
			"aE6":function(){return this.aV5/Global.gV1/this.aV6 }, //Water losses per mains length (m3/km/d) 
			"aE7":function(){return this.aV7/this.aV6}, 			//Unit head loss (m/km) 
		},
		"Treatment":{
			"sV2" : 0, //Volume of Treated Water (m3)
			"tV7" : 0, //Electric energy consumed in WTPs (from the grid and self-produced)	kWh
			"sV3" :	0, //Treated water quality tests carried out	no.
			"sV4" :	0, //Compliance of aesthetic tests	no.
			"sV5" :	0, //Compliance of microbiological tests	no.
			"sV6" :	0, //Compliance of physical-chemical tests	no.
			"sV7" :	0, //Compliance of radioactivity tests	no.
			"tV1" :	0, //Volume of treated water in WTPs with selected technology
			"tV8" :	0, //Sludge produced in WTPs 	kg
			"tV9" :	0, //Treatment capacity	m3
			"tE0"  :function(){return "not_implemented"}, 	//WTPs with selected technology
			"tE1"  :function(){return "not_implemented"},	//Energy consumption per treated water 
			"tE2"  :function(){return "not_implemented"},	//Energy consumption of WTPs per total energy consumption 
			"tE3"  :function(){return "not_implemented"},	//Sludge production
			"tE4"  :function(){return "not_implemented"},	//Capacity utilisation 
		},
		"Distribution":{
			"dV7"  : 0,	//Energy consumed for pumping distributed water (kWh)
			"sV9"  : 0,	//Delivery points with adequate pressure	no.
			"sV10" : 0,	//Number of service connections	no.
			"sV11" : 0,	//Time system is pressurised 	hour
			"sV12" : 0,	//Resident population connected to supply systems	Inhab.
			"sV13" : 0,	//Serviced population  in supply systems	serv. Pop.
			"sV14" : 0,	//System input volume 	m3
			"sV15" : 0,	//Non-revenue water 	m3
			"dV1"  : 0,	//Volume injected	m3
			"dV2"  : 0,	//Minimum pressure to be supplied at the distribution nodes	m
			"dV3"  : 0,	//Highest node elevation	m
			"dV4"  : 0,	//Lowest node elevation of the stage	m
			"dV5"  : 0,	//Average nodes elevation	m
			"dV6"  : 0,	//Water table elevation node	m
			"dV7"  : 0,	//Electric energy consumed for pumping distributed water (from the grid and self-produced)	kWh
			"dV8"  : 0,	//[Sum](distributed water volume pumped x pump head in meters)	m3 x 100 m
			"dV9"  : 0,	//Natural energy provided (gravity energy from supply to distribution) 	kWh
			"dV10" : 0,	//Energy recovered at water distribution	kWh
			"dV11" : 0,	//Minimum required energy for the system to operate by users (theoretical)	kWh
			"dV12" : 0,	//Total supplied energy to the network (natural plus shaft), real system	kWh
			"dV13" : 0,	//Topographic energy supplied to the system	kWh
			"dV14" : 0,	//Mains length	km
			"dV15" : 0,	//Friction pipe losses	m
			"dE1"  :function(){return "not_implemented"},		//Energy consumption per authorized consumption 
			"dE2"  :function(){return "not_implemented"},		//Energy consumption of authorized consumption per total energy consumption
			"dE3"  :function(){return "not_implemented"},		//Standardised Energy Consumption
			"dE4"  :function(){return "not_implemented"},		//Global water distribution energy efficiency
			"dE5"  :function(){return "not_implemented"},		//Percentage of topographic energy
			"dE6"  :function(){return "not_implemented"},		//Water losses per mains length 
			"dE7"  :function(){return "not_implemented"},		//Unit head loss 
		}
	},

	/** 03. Wastewater*/
	"Waste":{
		"ww1" :0,  //Energy costs of the wastewater utility	Currency
		"ww2" :0,  //Running costs of the utility related to the urban wastewater system	Currency
		"ww3" :0,  //Total energy consumed from the grid (from power bills) during the assessment period	kWh
		"ww4" :0,  //Total volume processed through urban wastewater water system	m3
		"ww5" :0,  //Resident population within the wastewater utility area of service	Inhab.
		"ww6" :0,  //Resident population connected to sewer system (SE)	Inhab.
		"ww7" :0,  //Serviced population in sewer and WWTP system	serv. Pop.
		"ww8" :0,  //Volume of Fuel consumed 	L
		"ww9" :0,  //km to disposal site 	km
		"ww10":0,  //Enter nitrogen effluent limit 	mg/L
		"test":function(){return this.ww1+this.ww2},

		"Collection":{
			"wsV1":0,										 //Volume of wastewater conveyed to treatment or to an outfall for untreated discharge	(m3)
			"wcV1":0,										 //Electric energy consumed for conveying wastewater to treatment (from the grid and self-produced)	(kWh)
			"wcV2":0,										 //[Sum](collected wastewater volume pumped x pump head in meters)	m3 x 100 m
			"test wwc":function(){return this.wsV1+1}, //Energy consumption per collected wastewater 
		},
		"Treatment":{
			"dN1" 	: 0,	//Nitrous oxide (N2O) emitted 	kg CO2e
			"wtV7"  : 0,	//Energy consumed in WWTPs							(kWh)
			"wtV8"  : 0,	//BOD mass removed 									(kg BOD)
			"wtV9"	: 0,	//Electrical energy produced in WWTPs from biogas valorization	kWh
			"wtV10"	: 0,	//Biogas produced	Nm3
			"wtV11"	: 0,	//Total Energy content of biogas valorized in the Co-generator	kWh
			"wtV15"	: 0,	//BOD influent (average)	mg/L
			"wsV5"  : 0,	//Tests complying with discharge consents	no.
			"wsV6"  : 0,	//Tests carried out in WWTPs	no.
			"wtV1"  : 0,	//Volume of treated wastewater in WWTPs with selected technology m3
			"wtV12" : 0,	//Sludge produced in WWTPs (total weight)	kg
			"wtV13" : 0,	//Dry weight in sludge produced	% (w/w)
			"wtV14" : 0,	//Treatment capacity	m3
			"wtE0"  :function(){return "not_implemented"},	//Treatment type (volume per type) 
			"wtE01" :function(){return "not_implemented"},	//WWTPs with trickling filters (TF)
			"wtE02" :function(){return "not_implemented"},	//WWTPs with activated sludge (AS)
			"wtE03" :function(){return "not_implemented"},	//WWTPs with AS and Coagulation/Filtration (C/F)
			"wtE04" :function(){return "not_implemented"},	//WWTPs with AS nitrification and C/F 
			"wtE05" :function(){return "not_implemented"},	//WWTPs with Lagoons
			"wtE06" :function(){return "not_implemented"},	//WWTPs with other type of treatment
			"wtE1"  :function(){return "not_implemented"},	//Energy consumption per treated wastewater 
			"wtE2"  :function(){return "not_implemented"},	//Energy consumption of WWTPs per total energy consumption 
			"wtE3"  :function(){return "not_implemented"},	//Energy consumption per mass removed  
			"wtE4"  :function(){return "not_implemented"},	//Energy production 
			"wtE5"  :function(){return "not_implemented"},	//Sludge production
			"wtE6"  :function(){return "not_implemented"},	//Dry weight in sludge production
			"wtE7"  :function(){return "not_implemented"},	//Capacity utilisation 
		},
		"Discharge":{
			"wsV7":	0,	//Volume of discharged wastewater	m3
			"wsV8":	0,	//Volume of discharged wastewater without treatment	m3
			"wdV1":	0,	//Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)	kWh
			"wdV3":	0,	//Energy recovered in wastewater discharged	kWh
			"wdV2": 0,	//[Sum](discharged wastewater volume pumped x pump head in meters)	m3 x 100 m
			"wdV4": 0,	//[Sum](turbine water volume pumped x  turbine head in meters)	m3 x 100 m
			"wdE1":function(){return "not_implemented"},	//Energy consumption per discharged wastewater 
			"wdE2":function(){return "not_implemented"},	//Energy consumption of discharged wastewater per total energy consumption
			"wdE3":function(){return "not_implemented"},	//Standardised Energy Consumption
			"wdE4":function(){return "not_implemented"},	//Energy recovery per discharged water
			"wdE5":function(){return "not_implemented"},	//Standardized energy recovery
		},
	},

	/** Substages For Level 3 */
	"Level3":{
		"Water":{
			"Abstraction":[],
			"Treatment":[],
			"Distribution":[],
		},
		"Waste":{
			"Collection":[],
			"Treatment":[],
			"Discharge":[],
		},
	},

	"Configuration":{
		"Active Stages":{
			"uws":1,
			"water":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		},
		/** YES/NO questions for all stages*/
		"Questions":{
			"water":{
				"Do you have fuel engines to run pumps" : 0,
				"Is your topography flat"               : 0,
			},
			"waterAbs":{
				//
			},
			"waterTre":{
				//
			},
			"waterDis":{
				//
			},
			"waste":{
				"Are you producing biogas"              : 0,
				"Are you producing electrical energy"   : 0,
			},
			"wasteCol":{
				//
			},
			"wasteTre":{
				//
			},
			"wasteDis":{
				//
			},
		},
		/** Technologies for Water/Waste Treatment */
		"Technologies":{
			"waterTre":{
				"None":1,
				"Pre-ox/C/F/S/Filt/Des":0,
				"Pre-ox/C/F/Filt/Des":0,
				"C/F/S/Filt/Des":0,
				"C/F/Filt/Des":0,
				"Des":0,
				"Other":0,
			},
			"wasteTre":{
				"None":1,
				"Trickling filters (TF)":0,
				"Activated sludge (AS)":0,
				"AS and Coagulation/Filtration (C/F)":0,
				"AS nitrification and C/F":0,
				"Laggons":0,
				"Other":0,
			},
		},
		"Units":{
			//custom unit selections for variables will be stored here
		},
	},
}
