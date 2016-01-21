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
		c_uw50:function(){return Global.Water.ws3+Global.Waste.ww1},
		c_uw51:function(){return Global.Water.ws4+Global.Waste.ww2},
		c_uw52:function(){return Global.Water.General.c_wsg50()+Global.Waste.General.c_wwg50()},
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
			c_wsg50:function(){return Global.Water.Abstraction.wsa1+Global.Water.Treatment.wst2+Global.Water.Distribution.wsd1},
			c_wsg51:function(){return this.c_wsg50()-(this.wsg1+this.wsg3-this.wsg2-this.wsg4)},
			c_wsg52:function(){return this.ws5-this.c_wsg51()},
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
		c_ww50:function(){return this.ww7},
		c_ww51:function(){return "ww7 x protein consumption x 0.16 x 1.1 x 1.25"},
		c_ww52:function(){return 34*this.ww7*(40/1000*365)*0.06},
		c_ww53:function(){return 298*this.ww10*0.005*(44/28)},
		c_ww54:function(){return 74100*this.c_ww58() + 34*3.9*this.c_ww58() + 298*3.9*this.c_ww58()},
		c_ww55:function(){return 34*this.ww7*(40/1000*365)*0.48},
		c_ww56:function(){return "((ww11 x FD)/1000) x NCV/1000"},
		c_ww57:function(){return "(c_ww56 x EF-CO2)+ (c_ww56 x EF-N2O) x 298 + (c_ww56 x EFCH4) x 34"},
		c_ww58:function(){return this.ww8*2*this.ww9*0.25*43/1000000},
		"General":{
			"wwg1":0,
			"wwg2":0,
			"wwg3":0,
			"wwg4":0,
			"wwg5":0,
			c_wwg50:function(){return Global.Waste.Collection.wwc2+Global.Waste.Treatment.wwt9+Global.Waste.Discharge.wwd3},
			c_wwg51:function(){return this.c_wwg50()-(this.wwg1+this.wwg3-this.wwg2-this.wwg4)},
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
			c_wwt50:function(){return this.wwt2-this.wwt3},
			c_wwt51:function(){return "(((ww7  x (3.2,by default protein consumption)/1000) x (Ap/365))) x 298"},
			c_wwt52:function(){return "(ww7 x (40,by default BOD,/1000 x 365) x 0.06) x 34"},
			c_wwt53:function(){return "wwt2 x wwt12 x EVM"},
			c_wwt54:function(){return 74100*this.c_wwt57()+34*3.9*this.c_wwt57()+298*3.9*this.c_wwt57()},
			c_wwt55:function(){return 298*this.wwt5*0.005*44/28},
			c_wwt56:function(){return 298*this.c_wwt58*0.005*44/28},
			c_wwt57:function(){return "((ww11 xFD)/1000) x NCV/1000"},	
			c_wwt58:function(){return Global.Waste.ww7*this.wwt7*0.16*1.1*1.25},
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
			"waterGen":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteGen":0,
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
			"waterAbs":{ },
			"waterTre":{ },
			"waterDis":{ },
			"waste":{
				"Are you producing biogas"              : 0,
				"Are you producing electrical energy"   : 0,
			},
			"wasteCol":{ },
			"wasteTre":{ },
			"wasteDis":{ },
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
		"Units":{},//custom unit selections for variables are stored here
	},
}
