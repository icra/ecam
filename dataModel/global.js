var Global = {
	/** General data of the system */
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

	/** Level 1 - Urban water system */
	"UWS":{
		"uw1":0,
		"c_uw1":function(){return Global.Water.ws4+Global.Waste.ww1},
		"c_uw2":function(){return Global.Water.ws4+Global.Waste.ww2},
		"c_uw3":function(){return Global.Water.General.c_wsg1()+Global.Waste.General.c_wwg1()},
	},

	/** Level 1 - Water Supply*/
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
		"General":{
			"wsg1":0,
			"wsg2":0,
			"wsg3":0,
			"wsg4":0,
			"wsg5":0,
			c_wsg1:function(){return Global.Water.Abstraction.wsa1+Global.Water.Treatment.wst2+Global.Water.Distribution.wsd1},
			c_wsg2:function(){return Global.Water.ws5-Global.Water.General.wsg4-Global.Water.General.wsg6},
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

	/** Level 1 - Wastewater*/
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
		"General":{
			"wwg1":0,
			"wwg2":0,
			"wwg3":0,
			"wwg4":0,
			"wwg5":0,
			c_wwg1:function(){return Global.Waste.Collection.wwc2+Global.Waste.Treatment.wwt22+Global.Waste.Discharge.wwd3},
			c_wwg2:function(){return Global.Waste.ww3-Global.Waste.General.wwg4-Global.Waste.General.wwg6},
		},
		"Collection":{
			"wwc1":0,
			"wwc2":0,
		},
		"Treatment":{
			"wwt1":0,
			"wwt2":0,
			"wwt3":0,
			"wwt4":0,
			"wwt5":0,
			"wwt6":0,
			"wwt7":0,
			"wwt8":0,
			"wwt9":0,
			"wwt10":0,
			"wwt11":0,
			"wwt12":0,
			"wwt13":0,
			"wwt14":0,
			c_wwt1:function(){return this.wwt2-this.wwt3},
			c_wwt2:function(){return "implementation&nbsp;not&nbsp;clear"},
			c_wwt3:function(){return "implementation&nbsp;not&nbsp;clear"},
			c_wwt4:function(){return "implementation&nbsp;not&nbsp;clear"},
			c_wwt5:function(){return this.wwt5*0.005*44/28},
		},
		"Discharge":{
			"wwd1":0,
			"wwd2":0,
			"wwd3":0,
			"wwd4":0,
		},
	},

	/** Substages Arrays For Level 3 */
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

	/** Configuration: Active Stages, Questions, Technologies and Units */
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
		"Units":{},//custom unit selections for variables will be stored here
	},
}
