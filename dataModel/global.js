var Global = {
	General:{
		"Name":"My system",
		"Location":"Canada, Europe, Russia, Oceania",
		"Assessment Period Start":"2016-01-01",
		"Assessment Period End":"2016-01-31",
		Days:function()
		{
			var startDate = new Date(Global.General["Assessment Period Start"])
			var finalDate = new Date(Global.General["Assessment Period End"])
			return (finalDate-startDate)/1000/60/60/24;
		},
		"Comments":"",
		"Currency":"USD",
	},

	/** Level 1 - Urban water system */
	UWS:{"uw1":0,},

	/** Level 1 - Water Supply*/
	Water:
	{
		"ws_serv_pop":0,
		"ws_resi_pop":0,
		"ws_nrg_cost":0,
		"ws_run_cost":0,
		"ws_nrg_cons":0,
		"ws_vol_auth":0,
		"ws_non_revw":0,
		"ws_vol_fuel":0,
		c_ws_nrg_fuel:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water];
			return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000;
		},

		"General":{
			"wsg_nrg_prod":0,
			"wsg_nrg_sold":0,
			"wsg_heat_nrg":0,
		},
		"Abstraction":{
			"wsa1":0,
			"wsa2":0,
			"wsa3":0,
			"wsa_nrg_prod":0,
			"wsa_nrg_sold":0,
			"wsa_heat_nrg":0,
			"wsa_GHGe"    :function(){return (this.wsa1-this.wsa_nrg_sold-this.wsa_heat_nrg)*Global.UWS.uw1},
			/*<Level3>*/
			"wsa4":0,
			"wsa5":0,
			"wsa6":0,
			"wsa7":0,
			"wsa8":0,
			"wsa9":0,
			"wsa10":0,
			c_wsa50:function(){return this.wsa5*this.wsa4/100},
			/*</Level3>*/
		},
		"Treatment":{
			"wst1":0,
			"wst2":0,
			/*<Level3>*/
			"wst3":0,
			"wst4":0,
			"wst5":0,
			"wst6":0,
			"wst7":0,
			"wst8":0,
			"wst9":0,
			"wst10":0,
			"wst11":0,
			"wst12":0,
			"wst13":0,
			"wst14":0,
			"wst15":0,
			"wst16":0,
			c_wst50:function(){return 100*this.wst16/this.wst4||0},
			/*</Level3>*/
		},
		"Distribution":{
			"wsd5":0,
			"wsd6":0,
			"wsd7":0,
			"wsd8":0,
			"wsd20":0,
			"wsd1":0,
			/*<Level3>*/
			"wsd2":0,
			"wsd3":0,
			"wsd4":0,
			"wsd9":0,
			"wsd10":0,
			"wsd11":0,
			"wsd12":0,
			"wsd13":0,
			"wsd14":0,
			"wsd15":0,
			"wsd16":0,
			"wsd17":0,
			"wsd18":0,
			"wsd19":0,
			c_wsd50:function(){return 9810*this.wsd9*(this.wsd14-this.wsd12)},
			c_wsd51:function(){return 9810*Global.Water.ws7*(this.wsd10+this.wsd13-this.wsd12)},
			c_wsd52:function(){return this.wsd1+this.c_wsd50()},
			c_wsd53:function(){return 9810*this.wsd9*(this.wsd11-this.wsd13)},
			c_wsd54:function(){return this.wsd15*this.wsd16/100},
			/*</Level3*/
		}
	},

	/** Level 1 - Wastewater*/
	Waste:{
		"ww5" :0,
		"ww6" :0,
		"ww7" :0,
		"ww15":0,
		"ww4" :0,
		"ww1" :0,
		"ww2" :0,
		"ww3" :0,
		"ww11":0,
		"ww14":40,  //default BOD lbosch added 
		"ww10":0,
		"ww8" :0,
		"ww9" :0,
		"ww13":3.2, //protein lbosch added

		c_ww50:function()
		{
			if(Global.Configuration["Yes/No"]["Are you valorizing biogas"]==0)
				return this.ww7*this.ww14*0.9*0.4*Global.General.Days()/1000;
			else
				return 0;
		},

		c_ww56:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste];
			return this.ww11*fuel.FD/1000*fuel.NCV/1000;
		},
		c_ww58:function(){return this.ww8*2*this.ww9*0.25*0.84*43/1000000/1000},

		"General":{
			"wwg1":0,
			"wwg2":0,
			"wwg3":0,
			"wwg4":0,
			"wwg5":0,
			c_wwg50:function(){return Global.Waste.ww3+this.wwg1+this.wwg3-this.wwg2-this.wwg4},
			c_wwg51:function(){return Global.Waste.Collection.wwc2+Global.Waste.Treatment.wwt9+Global.Waste.Discharge.wwd3},
			c_wwg52:function(){return this.wwg5/3600000*Global.UWS.uw1},
		},
		"Collection":{
			"wwc1":0,
			"wwc2":0,
			c_wwc51:function()
			{
				if(Global.Waste.Treatment.wwt8==0)
					return 0;
				else
					return (Global.Waste.ww14*Global.Waste.ww7*Global.General.Days()/Global.Waste.Treatment.wwt1*Global.Waste.Treatment.wwt8/1000)-Global.Waste.ww4*Global.Waste.ww7/Global.Waste.ww6||0
			},
			/*<Level3>*/
			"wwc3":0,
			"wwc4":0,
			c_wwc50:function(){return this.wwc3*this.wwc4/100},
			/*</Level3>*/
		},
		"Treatment":{
			"wwt8":0,
			"wwt9":0,
			"wwt1":0,
			"wwt10":0,
			"wwt6":0,
			"wwt5":0,
			"wwt2":0,
			"wwt3":0,
			"wwt11":0,
			"wwt12":0,
			c_wwt50:function(){return this.wwt2-this.wwt3},
			c_wwt51:function(){return 298*Global.Waste.ww7*3.2/1000*Global.General.Days()/365},
			c_wwt52:function(){return Global.Waste.c_ww53()},
			c_wwt53:function(){return this.wwt2*this.wwt12*10*3600000/100;},
			c_wwt54:function(){return this.wwt1-this.wwt10;},
			c_wwt55:function(){return 298*this.wwt5*0.005*44/28},
			c_wwt56:function(){return 298*this.c_wwt58()*0.005*44/28},
			c_wwt57:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].wasteTre];
				return Global.Waste.ww8*2*Global.Waste.ww9*0.25*fuel.FD*fuel.NCV/1000/1000;
			},	
			c_wwt58:function(){
				var findcom=Global.Configuration['Yes/No']["Is any untreated industrial or commercial wastewater connected"] ? 1.25 : 1;
				return this.wwt6*(Global.Waste.Discharge.wwd1-this.wwt8)/this.wwt8*1.1*findcom||0;
			},
			c_wwt59:function(){return 0.02*this.c_wwt50()*0.59*0.66*34},
			/*<Level3>*/
			"wwt15":0,
			"wwt16":0,
			"wwt17":0,
			"wwt18":0,
			"wwt19":0,
			"wwt20":0,
			"wwt21":0,
			"wwt22":0,
			"wwt23":0,
			"wwt24":0,
			"wwt25":0,
			c_wwt61:function(){return 100*this.wwt15/this.wwt16||0},
			/*</Level3>*/
		},
		"Discharge":{
			"wwd1":0,
			"wwd3":0,
			"wwd4":0,
			/*<Level3>*/
			"wwd5":0,
			"wwd6":0,
			"wwd7":0,
			"wwd8":0,
			c_wwd50:function(){return this.wwd5*this.wwd6/100},
			c_wwd51:function(){return this.wwd7*this.wwd8/100},
			/*</Level3>*/
		},
	},

	/** Substages Arrays For Level 3 */
	Substages:
	{
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

	/** Configuration: Active Stages, questions, Technologies and Units */
	Configuration:{
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
		Units:{ }, //custom unit selections for variables are stored here

		/** Calculated or "estimated" assumptions are added here. (calculated is default, so only estimated is added here) */
		DataQuality:{ },

		Selected:
		{
			"Fuel type":
			{
				"water":    "Gas/Diesel Oil",
				"waste":    "Gas/Diesel Oil",
				"wasteTre": "Gas/Diesel Oil",
			},
			"Country"      : "Africa",
			"Technologies" : {"waterTre":"None","wasteTre":"None"},
		},
		"Yes/No":
		{
			"Are you producing biogas"                                           :0,
			"Are you valorizing biogas"                                          :0,
			"Are you producing electrical energy"                                :0,
			"Do you have fuel engines to run pumps"                              :0,
			"Are you using truck transport to convey sludge to the disposal site":0,
			"Is your topography flat"                                            :0,
			"Is any untreated industrial or commercial wastewater connected"          :0,
		},
	},
};

/*========================*/
/* PERFORMANCE INDICATORS */
/*========================*/

	Global.Water.gE1w   = function(){return 100*this.ws3/this.ws4||0}		

/*========================================================================================*/

	Global.Water.wGHGe   = function(){return this.ws5*Global.UWS.uw1} 
	Global.Water.wGHGne  = function(){
		var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].water];
		return this.c_ws_nrg_fuel()*(fuel.EFCO2+298*fuel.EFN2O.engines+34*fuel.EFCH4.engines);
	} 

/*========================================================================================*/

	Global.Water.wS1    = function(){return Global.Water.Treatment.wS1_L2()}
	Global.Water.wS2    = function(){return Global.Water.Distribution.wS2_L2()}
	Global.Water.wS3    = function(){return Global.Water.Distribution.wS3_L2()}
	Global.Water.wS4    = function(){return 100*this.ws1/this.ws2||0}
	Global.Water.wS5    = function()
	{
		if(Global.Water.Abstraction.wsa2==0)
		{
			return this.ws8;
		}
		else 
		{
			return (100*this.ws7/Global.Water.Abstraction.wsa2)||0; 
		}
	}
	Global.Water.wS6             = function(){return this.ws7/this.ws1/Global.General.Days()||0}

	Global.Waste.gE1ww           = function(){return 100*this.ww1/this.ww2||0}
	Global.Waste.wwGHGe          = function(){return this.ww3*Global.UWS.uw1}

	Global.Waste.wwGHGne_ch4_wwt = function(){return ((this.Treatment.wwt1-this.Treatment.c_wwt54())*0.06+0.02*this.c_ww50()*0.59*0.66)*34} //old c_ww55
	Global.Waste.wwGHGne_n2o_tre = function(){return 298*this.ww10*this.ww15/1000*0.005*(44/28)} //old c_ww53
	Global.Waste.wwGHGne_tsludge = function(){return this.c_ww58()*(74100+34*3.9+298*3.9)}       //old c_ww54
	Global.Waste.wwGHGne_ch4_unt = function(){return (this.ww6-this.ww7)*this.ww14/1000*Global.General.Days()*0.06*34}                      //old c_ww52
	Global.Waste.wwGHGne_n2o_unt = function(){return (this.ww6-this.ww7)*this.ww13*Global.General.Days()/365*0.16*1.1*1.25*0.005*44/28*298} //old c_ww51
	Global.Waste.wwGHGne_engines = function(){
		var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type'].waste];
		return this.c_ww56()*(fuel.EFCO2+34*fuel.EFCH4.engines+298*fuel.EFN2O.engines)
	} //old c_ww57

/*========================================================================================*/

	Global.Waste.wwS1   = function(){return 100*this.ww7/this.ww5||0}
	Global.Waste.wwS2   = function(){return 100*this.ww7/this.ww6||0}
	Global.Waste.wwS3   = function(){return Global.Waste.Treatment.wwS3_L2()}
	Global.Waste.wwS4   = function(){return Global.Waste.Collection.wwS4_L2()}
	Global.Waste.wwS5   = function(){return this.ww15/this.ww7/Global.General.Days()||0}

	Global.Water.Abstraction.wsa_E3  = function(){return this.wsa1/this.c_wsa50()||0}
	Global.Water.Abstraction.wsa_E4  = function(){return this.wsa3/this.wsa2||0}
	Global.Water.Abstraction.wsa_E5  = function(){return this.wsa3/this.wsa6||0} 
	Global.Water.Abstraction.wsa_E6  = function(){return this.wsa8/Global.General.Days()/this.wsa9||0}
	Global.Water.Abstraction.wsa_E7  = function(){return this.wsa10/this.wsa9||0}

	Global.Water.Treatment.tE01	  = function(){return 100*this.wst8 /this.wst1||0}
	Global.Water.Treatment.tE02	  = function(){return 100*this.wst9 /this.wst1||0}
	Global.Water.Treatment.tE03	  = function(){return 100*this.wst10/this.wst1||0}
	Global.Water.Treatment.tE04	  = function(){return 100*this.wst11/this.wst1||0}
	Global.Water.Treatment.tE05	  = function(){return 100*this.wst12/this.wst1||0}
	Global.Water.Treatment.tE06	  = function(){return 100*this.wst13/this.wst1||0}
	Global.Water.Treatment.tE1    = function(){return this.wst2/this.wst1||0}
	Global.Water.Treatment.tE2    = function(){return -1}
	Global.Water.Treatment.tE3    = function(){return this.wst14/this.wst1||0}
	Global.Water.Treatment.tE4    = function(){return 100*this.wst1/this.wst15||0}
	Global.Water.Treatment.wS1_L2     = function(){return 100*(this.wst4+this.wst5+this.wst6+this.wst7)/this.wst3||0}

	Global.Water.Distribution.dE1 = function(){return this.wsd1/Global.Water.ws7||0}
	Global.Water.Distribution.dE2 = function(){return -1}
	Global.Water.Distribution.dE3 = function(){return this.wsd1/this.c_wsd54()||0}
	Global.Water.Distribution.dE4 = function(){return 100*this.c_wsd51()/(this.c_wsd52()-this.wsd17)||0}
	Global.Water.Distribution.dE5 = function(){return 100*this.c_wsd53()/(this.c_wsd52()-this.wsd17)||0}
	Global.Water.Distribution.dE6 = function(){return (this.wsd9-this.wsd4)/Global.General.Days()/this.wsd18||0}
	Global.Water.Distribution.dE7 = function(){return this.wsd19/this.wsd18||0}
	Global.Water.Distribution.wS2_L2  = function(){return 100*this.wsd2/this.wsd3||0}
	Global.Water.Distribution.wS3_L2  = function(){return 100*this.wsd4/24/Global.General.Days()}

	Global.Waste.General.wwGHG1_L2    = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww5||0}
	Global.Waste.General.wwGHG2_L2    = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww7||0} 
	Global.Waste.General.wwGHG3_L2    = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG4_L2    = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG5_L2    = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG8	  = function(){return Global.Waste.c_ww57()*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG9	  = function(){return Global.Waste.c_ww57()/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG10  = function(){return Global.Waste.c_ww55()*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG11  = function(){return Global.Waste.c_ww55()/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG12  = function(){return Global.Waste.c_ww53()*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG13  = function(){return Global.Waste.Treatment.c_wwt55()/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG14  = function(){return (Global.Waste.c_ww51()+Global.Waste.c_ww52())*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG15  = function(){return (Global.Waste.c_ww51()+Global.Waste.c_ww52())/Global.Waste.ww4||0}
	Global.Waste.General.wwGHG16  = function(){return Global.Waste.c_ww54()*365/Global.General.Days()/Global.Waste.ww7||0}
	Global.Waste.General.wwGHG17  = function(){return Global.Waste.c_ww54()/Global.Waste.ww4||0}

	Global.Waste.Collection.wcE1  = function(){return this.wwc2/this.wwc1||0}
	Global.Waste.Collection.wcE2  = function(){return -1}
	Global.Waste.Collection.wcE3  = function(){return this.wwc2/this.c_wwc50()||0}
	Global.Waste.Collection.wwS4_L2   = function(){return 100*this.c_wwc51()/Global.Waste.ww4||0}

	Global.Waste.Treatment.wtE01  = function(){return 100*this.wwt17/this.wwt8||0}
	Global.Waste.Treatment.wtE02  = function(){return 100*this.wwt18/this.wwt8||0}
	Global.Waste.Treatment.wtE03  = function(){return 100*this.wwt19/this.wwt8||0}
	Global.Waste.Treatment.wtE04  = function(){return 100*this.wwt20/this.wwt8||0}
	Global.Waste.Treatment.wtE05  = function(){return 100*this.wwt21/this.wwt8||0}
	Global.Waste.Treatment.wtE06  = function(){return 100*this.wwt26/this.wwt8||0}
	Global.Waste.Treatment.wtE1	  = function(){return this.wwt9/this.wwt8||0}
	Global.Waste.Treatment.wtE2	  = function(){return -1}
	Global.Waste.Treatment.wtE3	  = function(){return this.wwt9/this.c_wwt54()||0}
	Global.Waste.Treatment.wtE4	  = function(){return this.wwt11/Global.Waste.ww8||0}
	Global.Waste.Treatment.wtE5	  = function(){return this.wwt2/this.c_wwt54()||0}
	Global.Waste.Treatment.wtE6	  = function(){return this.wwt11/this.c_wwt53()||0}
	Global.Waste.Treatment.wtE7	  = function(){return this.wwt23/Global.Waste.ww8||0}
	Global.Waste.Treatment.wtE8	  = function()
	{
		var arr=Global.Substages.Waste.Treatment;
		return this.wwt24/arr.length||0;
	}
	Global.Waste.Treatment.wtE9	  = function(){return this.wwt8/this.wwt25||0;}
	Global.Waste.Treatment.wwS3_L2    = function(){return 100*this.wwt15/this.wwt16||0}

	Global.Waste.Discharge.wdE1	  = function(){return this.wwd3/this.wwd1||0}
	Global.Waste.Discharge.wdE2	  = function(){return -1}
	Global.Waste.Discharge.wdE3	  = function()
	{
		if(this.wwd5==0)
			return 0;
		else
			return this.wwd3/this.c_wwd50()||0;
	}
	Global.Waste.Discharge.wdE4	  = function(){return this.wwd4/this.wwd1||0}
	Global.Waste.Discharge.wdE5	  = function()
	{
		if(this.wwd7==0)
			return 0;
		else
			return this.wwd4/this.c_wwd51()||0;
	}
