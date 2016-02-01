var Global = {
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
		c_ws50:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
			return this.ws9*fuel.FD*fuel.NCV/1000/1000
		},
		c_ws51:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
			return this.c_ws50()*(fuel.EFCO2+298*fuel.EFN2O.engines+34*fuel.EFCH4.engines);
		},
		"General":{
			"wsg1":0,
			"wsg2":0,
			"wsg3":0,
			"wsg4":0,
			"wsg5":0,
			c_wsg50:function(){return Global.Water.ws5+this.wsg1+this.wsg3-this.wsg2-this.wsg4},
			c_wsg51:function(){return Global.Water.Abstraction.wsa1+Global.Water.Treatment.wst2+Global.Water.Distribution.wsd1},
			c_wsg52:function(){return "TBD LCorominas to advise"},
		},
		"Abstraction":{
			"wsa1":0,
			"wsa2":0,
			"wsa3":0,
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
			"wsd1":0,
			/*<Level3>*/
			"wsd2":0,
			"wsd3":0,
			"wsd4":0,
			"wsd5":0,
			"wsd6":0,
			"wsd7":0,
			"wsd8":0,
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
		"ww12":0,
		"ww13":3.2, //protein lbosch added
		"ww14":40,  //default BOD lbosch added 
		c_ww50:function(){return this.ww7/1000*22*Global.General.Days()-this.ww12},
		c_ww51:function(){return (this.ww5-this.ww7)*this.ww13*0.16*1.1*1.25*0.005*44/28*298},
		c_ww52:function(){return (this.ww5-this.ww7)*(40/1000*365)*0.06*34},
		c_ww53:function(){return 298*this.ww10*0.005*(44/28)},
		c_ww54:function(){return this.c_ww58()*(74100+34*3.9+298*3.9)},
		c_ww55:function(){return 0.02*this.c_ww50()*0.59*0.66*34},
		c_ww56:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
			return this.ww11*fuel.FD/1000*fuel.NCV/1000;
		},
		c_ww57:function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
			return this.c_ww56()*(fuel.EFCO2+34*fuel.EFCH4.engines+298*fuel.EFN2O.engines)
		},
		c_ww58:function(){return this.ww8*2*this.ww9*0.25*0.84*43/1000000},
		"General":{
			"wwg1":0,
			"wwg2":0,
			"wwg3":0,
			"wwg4":0,
			"wwg5":0,
			c_wwg50:function(){return Global.Water.ws3 + (this.wwg1+this.wwg3)-(this.wwg2+this.wwg4)},
			c_wwg51:function(){return Global.Waste.Collection.wwc2+Global.Waste.Treatment.wwt9+Global.Waste.Discharge.wwd3},
			c_wwg52:function(){return "TBD LCorominas to advise"},
		},
		"Collection":{
			"wwc2":0,
			/*<Level3>*/
			"wwc3":0,
			"wwc4":0,
			c_wwc50:function(){return this.wwc3*this.wwc4/100},
			c_wwc51:function(){return (Global.Waste.ww14*Global.Waste.ww7*Global.General.Days()/Global.Waste.ww13/1000000-Global.Waste.ww4*Global.Waste.ww7/Global.Waste.ww6)||0}
			/*</Level3>*/
		},
		"Treatment":{
			"wwt1":0,
			"wwt2":0,
			"wwt3":0,
			"wwt5":0,
			"wwt6":0,
			"wwt8":0,
			"wwt9":0,
			"wwt10":0,
			"wwt11":0,
			"wwt12":0,
			"wwt13":0,
			"wwt14":0,
			c_wwt50:function(){return this.wwt2-this.wwt3},
			c_wwt51:function(){return 298*Global.Waste.ww7*3.2/1000*Global.General.Days()/365},
			c_wwt52:function(){return (Global.Waste.ww5-Global.Waste.ww7)*Global.Waste.ww14*365*0.06*34/1000},
			c_wwt53:function(){return this.wwt2*this.wwt12*10*3600000/100;},
			c_wwt54:function()
			{
				var f=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
				return this.c_wwt57()*(f.EFCO2+34*f.EFCH4.vehicles+298*f.EFN2O.vehicles);
			},
			c_wwt55:function(){return 298*this.wwt5*0.005*44/28},
			c_wwt56:function(){return 298*this.c_wwt58()*0.005*44/28},
			c_wwt57:function(){
				var fuel=Tables['Fuel types'][Global.Configuration.Selected['Fuel type']];
				return Global.Waste.ww11*fuel.FD*fuel.NCV/1000/1000;
			},	
			c_wwt58:function()
			{
				//if answer is yes, factor=1.25. If no, factor=1
				var factor=Global.Configuration['Yes/No']['Is any untreated industrial or commercial water connected']? 1.25 : 1; 
				//if wwt6 is zero, Nload=ww13*0.16, otherwise Nload=wwt6
				var Nload = this.wwt6==0 ? (Global.Waste.ww13*0.16) : this.wwt6;
				return (Global.Waste.ww5-Global.Waste.ww7)*Nload*1.1*factor;
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
			c_wwt60:function(){return 100*this.wwt15/this.wwt16||0},
			/*</Level3>*/
		},
		"Discharge":{
			"wwd1":0,
			"wwd2":0,
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

	/** Configuration: Active Stages, questions, Technologies and Units */
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
		"Units":{ }, //custom unit selections for variables are stored here
		"Selected":{
			"Fuel type"    : "Gas/Diesel Oil",
			"Country"      : "Africa",
			"Technologies" : {"Water":"None","Wastewater":"None"},
		},
		"Yes/No":{
			"Are you producing biogas"                                  :0,
			"Are you producing electrical energy"                       :0,
			"Do you have fuel engines to run pumps"                     :0,
			"Is your topography flat"                                   :0,
			"Is any untreated industrial or commercial water connected" :0,
		},
	},
}

/*PERFORMANCE INDICATORS -- LEVEL 1*/
//L1 Water
Global.Water.wS4    = function(){return 100*this.ws1/this.ws2||0}
Global.Water.wS5    = function(){return 100*this.ws7/this.ws6||0}
Global.Water.gE1w   = function(){return this.ws3/this.ws4||0}		
Global.Water.gE2w   = function(){return this.ws5*365/Global.General.Days()/this.ws2||0}
Global.Water.gE3w   = function(){return this.ws5*365/Global.General.Days()/this.ws1||0}
Global.Water.gE4w   = function(){return this.ws5/this.ws7||0}
Global.Water.wGHG1  = function(){return (this.ws5*Global.UWS.uw1+this.c_ws51())*365/Global.General.Days()/this.ws2||0} 
Global.Water.wGHG2  = function(){return (this.ws5*Global.UWS.uw1+this.c_ws51())*365/Global.General.Days()/this.ws1||0}	
Global.Water.wGHG3  = function(){return (this.ws5*Global.UWS.uw1+this.c_ws51())/this.ws7||0}
Global.Water.wGHG4  = function(){return this.c_ws51()/this.ws1||0}
Global.Water.wGHG5  = function(){return this.c_ws51()/this.ws7||0}
Global.Water.wGHG6  = function(){return (this.ws5*Global.UWS.uw1)/this.ws1||0}
Global.Water.wGHG7  = function(){return (this.ws5*Global.UWS.uw1)/this.ws7||0}

//L1 Wastewater
Global.Waste.wwS1   = function(){return 100*this.ww6/this.ww5||0}
Global.Waste.wwS2   = function(){return 100*this.ww7/this.ww6||0}
Global.Waste.gE1ww  = function(){return 100*this.ww1/this.ww2||0}
Global.Waste.gE2ww  = function(){return this.ww3*365/Global.General.Days()/this.ww5||0}
Global.Waste.gE3ww  = function(){return this.ww3*365/Global.General.Days()/this.ww7||0}
Global.Waste.gE4ww  = function(){return this.ww3/this.ww4||0}
Global.Waste.wwGHG1 = function(){return (this.ww3*Global.UWS.uw1+this.c_ww57()+this.c_ww55()+this.c_ww53()+this.c_ww51()+this.c_ww52()+this.c_ww54())*365/Global.General.Days()/this.ww5||0}
Global.Waste.wwGHG2 = function(){return (this.ww3*Global.UWS.uw1+this.c_ww57()+this.c_ww55()+this.c_ww53()+this.c_ww51()+this.c_ww52()+this.c_ww54())*365/Global.General.Days()/this.ww7||0}
Global.Waste.wwGHG3 = function(){return (this.ww3*Global.UWS.uw1+this.c_ww57()+this.c_ww55()+this.c_ww53()+this.c_ww51()+this.c_ww52()+this.c_ww54())/this.ww4||0}	
Global.Waste.wwGHG4	= function(){return this.ww3*Global.UWS.uw1/Global.Waste.ww7||0}
Global.Waste.wwGHG5	= function(){return this.ww3*Global.UWS.uw1/Global.Waste.ww4||0}
Global.Waste.wwGHG6 = function(){return (this.c_ww57()+this.c_ww55()+this.c_ww53()+this.c_ww51()+this.c_ww52()+this.c_ww54())/this.ww7||0}
Global.Waste.wwGHG7 = function(){return (this.c_ww57()+this.c_ww55()+this.c_ww53()+this.c_ww51()+this.c_ww52()+this.c_ww54())/this.ww4||0}

/*PERFORMANCE INDICATORS -- LEVEL 2*/

/*
	$Corinne says: The below service indicators can only be calculated when Level 3 is documented. 
	Display at level one with a warning explaining that these service levels indicators 
	are necessary to document (by going to level 3) 
	when comparing utilities to one another.			

	$lbosch says: now I make the function return -1 to indicate this idea
	codes that are in L1 and L2 with same code:
		wS1 wS2 wS3 wwS3 gE2w gE3w gE4w wGHG1 wGHG2 wGHG3 wGHG4 wGHG5 wGHG6 wGHG7
		gE3ww gE4ww wwGHG1 wwGHG2 wwGHG3 wwGHG4 wwGHG5 wwGHG6 wwGHG7

	$Corinne says: When Level 2 data is documented, overwrite the Level 1 Pis with the result of the  formula shown below.
		If level 2 is not documented or not all necessary variables are documented 
		then display Level 1 PI result in the level 2 outputs			
	
	$lbosch says: I need a exact definition of what "level 2 data is documented" means
*/

Global.Water.wS1              = function(){return Global.Water.Treatment.wS1()}
Global.Water.wS2              = function(){return Global.Water.Distribution.wS2()}
Global.Water.wS3              = function(){return Global.Water.Distribution.wS3()}
Global.Waste.wwS3             = function(){return Global.Waste.Treatment.wwS3()}

Global.Water.Treatment.wS1    = function(){return 100*(this.wst4+this.wst5+this.wst6+this.wst7)/this.wst3||0}
Global.Water.Distribution.wS2 = function(){return 100*this.wsd2/this.wsd3||0}
Global.Water.Distribution.wS3 = function(){return 100*this.wsd4/24/Global.General.Days()}
Global.Waste.Treatment.wwS3	  = function(){return 100*this.wwt15/this.wwt16||0}

//L2 Water stages
Global.Water.General.gE2w     = function(){return this.c_wsg50()*365/Global.General.Days()/Global.Water.ws2||0}
Global.Water.General.gE3w     = function(){return this.c_wsg50()*365/Global.General.Days()/Global.Water.ws1||0}
Global.Water.General.gE4w     = function(){return this.c_wsg50()/Global.Water.ws7||0}
Global.Water.General.wGHG1    = function(){return ((Global.Water.ws5-this.wsg2-this.wsg4)*Global.UWS.uw1+Global.Water.c_ws51()-this.c_wsg52())*365/Global.General.Days()/Global.Water.ws2||0}
Global.Water.General.wGHG2    = function(){return ((Global.Water.ws5-this.wsg2-this.wsg4)*Global.UWS.uw1+Global.Water.c_ws51()-this.c_wsg52())*365/Global.General.Days()/Global.Water.ws1||0}
Global.Water.General.wGHG3    = function(){return ((Global.Water.ws5-this.wsg2-this.wsg4)*Global.UWS.uw1+Global.Water.c_ws51()-this.c_wsg52())*365/Global.General.Days()/Global.Water.ws7||0}
Global.Water.General.wGHG4    = function(){return Global.Water.wGHG4()}
Global.Water.General.wGHG5    = function(){return Global.Water.wGHG5()}
Global.Water.General.wGHG6    = function(){return (this.c_wsg50()*Global.UWS.uw1-this.c_wsg52())/Global.Water.ws1||0}
Global.Water.General.wGHG6    = function(){return (this.c_wsg50()*Global.UWS.uw1-this.c_wsg52())/Global.Water.ws7||0}
Global.Water.Abstraction.aE1  = function(){return this.wsa1/this.wsa2||0}
Global.Water.Abstraction.aE2  = function(){return 100*this.wsa1/Global.UWS.c_uw52()||0}
Global.Water.Abstraction.aE3  = function(){return this.wsa1/this.c_wsa50()||0}
Global.Water.Abstraction.aE4  = function(){return this.wsa3/this.wsa2||0}
Global.Water.Abstraction.aE5  = function(){return this.wsa3/this.wsa6||0} 
Global.Water.Abstraction.aE6  = function(){return this.wsa8/Global.General.Days()/this.wsa9||0}
Global.Water.Abstraction.aE7  = function(){return this.wsa10/this.wsa9||0}
Global.Water.Treatment.tE01	  = function(){return 100*this.wst8 /this.wst1||0}
Global.Water.Treatment.tE02	  = function(){return 100*this.wst9 /this.wst1||0}
Global.Water.Treatment.tE03	  = function(){return 100*this.wst10/this.wst1||0}
Global.Water.Treatment.tE04	  = function(){return 100*this.wst11/this.wst1||0}
Global.Water.Treatment.tE05	  = function(){return 100*this.wst12/this.wst1||0}
Global.Water.Treatment.tE06	  = function(){return 100*this.wst13/this.wst1||0}
Global.Water.Treatment.tE1    = function(){return this.wst2/this.wst1||0}
Global.Water.Treatment.tE2    = function(){return 100*this.wst2/Global.UWS.c_uw52()||0}
Global.Water.Treatment.tE3    = function(){return this.wst14/this.wst1||0}
Global.Water.Treatment.tE4    = function(){return 100*this.wst1/this.wst15||0}
Global.Water.Distribution.dE1 = function(){return this.wsd1/Global.Water.ws7||0}
Global.Water.Distribution.dE2 = function(){return 100*this.wsd1/Global.UWS.c_uw52()||0}
Global.Water.Distribution.dE3 = function(){return this.wsd1/this.c_wsd54()||0}
Global.Water.Distribution.dE4 = function(){return 100*this.c_wsd51()/(this.c_wsd52()-this.wsd17)||0}
Global.Water.Distribution.dE5 = function(){return 100*this.c_wsd53()/(this.c_wsd52()-this.wsd17)||0}
Global.Water.Distribution.dE6 = function(){return (this.wsd9-this.wsd4)/Global.General.Days()/this.wsd18||0}

//L2 Waste stages
Global.Waste.General.gE2ww   = function(){return this.c_wwg50()*365/Global.General.Days()/Global.Waste.ww5||0}
Global.Waste.General.gE3ww   = function(){return this.c_wwg50()*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.gE4ww   = function(){return this.c_wwg50()/Global.Waste.ww4||0}
Global.Waste.General.wwGHG1  = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww5||0}
Global.Waste.General.wwGHG2  = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww7||0} 
Global.Waste.General.wwGHG3  = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1+Global.Waste.c_ww57()+Global.Waste.c_ww55()+Global.Waste.c_ww53()+Global.Waste.c_ww51()+Global.Waste.c_ww52()+Global.Waste.c_ww54()-this.c_wwg52())/Global.Waste.ww4||0}
Global.Waste.General.wwGHG4	 = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG5	 = function(){return ((Global.Waste.ww3-this.wwg2-this.wwg4)*Global.UWS.uw1-this.c_wwg52())*365/Global.General.Days()/Global.Waste.ww4||0}
Global.Waste.General.wwGHG8	 = function(){return Global.Waste.c_ww57()*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG9	 = function(){return Global.Waste.c_ww57()/Global.Waste.ww4||0}
Global.Waste.General.wwGHG10 = function(){return Global.Waste.c_ww55()*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG11 = function(){return Global.Waste.c_ww55()/Global.Waste.ww4||0}
Global.Waste.General.wwGHG12 = function(){return Global.Waste.c_ww53()*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG13 = function(){return Global.Waste.c_ww53()/Global.Waste.ww4||0}
Global.Waste.General.wwGHG14 = function(){return (Global.Waste.c_ww51()+Global.Waste.c_ww52())*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG15 = function(){return (Global.Waste.c_ww51()+Global.Waste.c_ww52())/Global.Waste.ww4||0}
Global.Waste.General.wwGHG16 = function(){return Global.Waste.c_ww54()*365/Global.General.Days()/Global.Waste.ww7||0}
Global.Waste.General.wwGHG17 = function(){return Global.Waste.c_ww54()/Global.Waste.ww4||0}
Global.Waste.General.wwS4	 = function(){return Global.Waste.Collection.c_wwc50()/Global.Waste.ww4||0}
Global.Waste.Collection.wcE1 = function(){return this.wwc2/this.wwc1||0}
Global.Waste.Collection.wcE2 = function(){return 100*this.wwc2/Global.UWS.c_uw52()||0}
Global.Waste.Collection.wcE3 = function(){return this.wwc2/this.c_wwc50()||0}
Global.Waste.Treatment.wtE01 = function(){return 100*this.wwt17/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE02 = function(){return 100*this.wwt18/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE03 = function(){return 100*this.wwt19/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE04 = function(){return 100*this.wwt20/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE05 = function(){return 100*this.wwt21/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE06 = function(){return 100*this.wwt26/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE1	 = function(){return this.wwt9/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE2	 = function(){return 100*this.wwt9/Global.UWS.c_uw52()||0}
Global.Waste.Treatment.wtE3	 = function(){return this.wwt9/this.wwt14||0}
Global.Waste.Treatment.wtE4	 = function(){return this.wwt11/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE5	 = function(){return this.wwt2/this.wwt14||0}
Global.Waste.Treatment.wtE6	 = function(){return this.wwt11/this.c_wwt53()||0}
Global.Waste.Treatment.wtE7	  = function(){return this.wwt23/Global.Waste.ww4||0}
Global.Waste.Treatment.wtE8	  = function(){return this.ww24}
Global.Waste.Treatment.wwS3	  = function(){return this.wwt15/this.wwt16||0}
Global.Waste.Treatment.wtE9	 = function(){return 100*Global.Waste.ww4/this.wwt25||0}
Global.Waste.Discharge.wdE1	 = function(){return this.wwd3/this.wwd1||0}
Global.Waste.Discharge.wdE2	 = function(){return 100*this.wwd3/Global.UWS.c_uw52()||0}
Global.Waste.Discharge.wdE3	  = function(){return this.wwd3/this.wwd5||0}
Global.Waste.Discharge.wdE4	 = function(){return this.wwd4/this.wwd1||0}
Global.Waste.Discharge.wdE5	  = function(){return this.wwd4/this.wwd7||0}
