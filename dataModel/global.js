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
		"uw1":0,
		"Energy Costs":function(){return Global.Water.ws4+Global.Waste.ww1},
		"Running Costs":function(){return Global.Water.ws5+Global.Waste.ww2},
	},

	/** 02. Water Supply*/
	"Water":{
		"ws1":0,
		"ws2":0,
		"ws3":0,
		"ws4":0,
		"ws5":0,
		"ws6":0,
		"ws7":0,
		"ws8":0,
		"ws9":0,
		"test":function(){return this.ws1+this.ws2},

		"General":{
			"wsg1":0,
			"wsg2":0,
			"wsg3":0,
			"wsg4":0,
			"wsg5":0,
		},
		"Abstraction":{
			"wsa1":0,
			"wsa2":0,
			"wsa3":0,
		},
		"Treatment":{
			"wst1":0,
			"wst2":0,
		},
		"Distribution":{
			"wsd1":0,
		}
	},

	/** 03. Wastewater*/
	"Waste":{
		"ww1" :0,
		"ww2" :0,
		"ww3" :0,
		"ww4" :0,
		"ww5" :0,
		"ww6" :0,
		"ww7" :0,
		"ww8" :0,
		"ww9" :0,
		"ww10":0,
		"ww11":0,
		"N2O emissions from untreated wastewater direct discharge":function(){return "not_implemented"},
		"CH4 emissions from untreated wastewater direct discharge":function(){return "not_implemented"},

		"General":{
			"wwg1":0,
			"wwg2":0,
			"wwg3":0,
			"wwg4":0,
			"wwg5":0,
		},

		"Collection":{
			"wwc1":0,
			"wwc2":0,
		},
		"Treatment":{
			"wwt1":0,
			//CONTINUA AQUI
		},
		"Discharge":{
			"wsV7":0,	//Volume of discharged wastewater	m3
			"wsV8":0,	//Volume of discharged wastewater without treatment	m3
			"wdV1":0,	//Electric energy consumed for pumping discharged wastewater (from the grid and self-produced)	kWh
			"wdV3":0,	//Energy recovered in wastewater discharged	kWh
			"wdV2":0,	//[Sum](discharged wastewater volume pumped x pump head in meters)	m3 x 100 m
			"wdV4":0,	//[Sum](turbine water volume pumped x  turbine head in meters)	m3 x 100 m
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
			"waterGen":1,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteGen":1,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		},
		/** YES/NO questions for all stages*/
		"Questions":{
			"water":{
				/*
				//TODO
				"Do you have fuel engines to run pumps" :
				{
					"answer":0,
					"list":['ws9','ww11'],
				},
				*/
				"Do you have fuel engines to run pumps" :0,
				"Is your topography flat"               :0,
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
