/** 
	NAMESPACE GLOBAL
	EXAMPLES OF VARIABLE ACCESSING

	Global.gV1

	Global.Water.sV1
	Global.Water.Abstraction.aV1
	Global.Water.Treatment.tV1
	Global.Water.Distribution.dV1

	Global.Waste.wsV1
	Global.Waste.Collection.wcV1
	Global.Waste.Treatment.wtV1
	Global.Waste.Collection.wdV1

	Global.Emissions.dD1
	Global.Emissions.Direct.g_dGHG
	Global.Emissions.Indirect.iS1
*/

var Global =
{
	"General":
	{
		"Name":"Sedacusco",
		"Location":"Cusco",
		"Assessment Period Start":"2016-01-01",
		"Assessment Period End":"2016-01-31",
		"Days":function()
		{
			var startDate = new Date(Global.General["Assessment Period Start"])
			var finalDate = new Date(Global.General["Assessment Period End"])
			return (finalDate-startDate)/1000/60/60/24;
		},
		"Comments":"Write comments here",
		/** These fields have the same name as the cookies they enable (boolean) */
		"Active Stages":
		{
			"global":1,
			"water":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		}
	},

	"Global":	/** 01. GLOBAL */
	{
		/** Inputs */
		"gV1" : function(){return Global.General.Days()}, 	 //Assessment period (days)
		"gV2" : 108239,	 //Energy costs (Euro)
		"gV2w": 0,
		"gV2ww":0,
		"gV3" : 635242,	 //Running costs (Euro)
		"gV4" : 1501779, //Total energy consumed (kWh)
		"gV5" : 368475,	 //Resident population within the utility area of service (Inhab)
		"gV6" : 0.225,	 //Energy mix consumed (CO2/kWh)
		/** Outputs */
		"gE1":function() { return this.gV2/this.gV3 },
		"gE2":function() { return this.gV4*365/this.gV1()/this.gV5 },
		"GHG":function() { return "not implemented" },
	},

	/** SUB LEVELS */
	"Water":	/** 02. Water Supply*/
	{
		/** Inputs */
		"sV1"  : 0, //Volume of Conveyed Water (m3)
		"sV2"  : 0, //Volume of Treated Water (m3)
		"sV3"  : 0, //Treated Water quality tests carried out (num)
		"sV4"  : 0, //Compliance of aesthetic tests (num)
		"sV5"  : 0, //Compliance of microbiological tests (num)
		"sV6"  : 0, //Compliance of physical-chemical tests (num)
		"sV7"  : 0, //Compliance of radioactivity tests (num)
		"sV8"  : 0, //Volume of authorized consumption (m3)
		"sV9"  : 0, //Delivery points with adequate pressure (num)
		"sV10" : 0, //Number of service connections (num)
		"sV11" : 0, //Time system is pressurised (hour)
		"sV12" : 0, //Resident population connected to supply systems (Inhab)
		"sV13" : 0, //Water supply resident population (Inhab)
		/** Outputs */
		"S1":function() { return 100*(this.sV4+this.sV5+this.sV6+this.sV7)/this.sV3 },	//Quality of supplied water (%)
		"S2":function() { return 100*this.sV9/this.sV10 }, 								//Pressure of supply adequacy (%)
		"S3":function() { return 100*this.sV11/24/this.gV1 }, 							//Continuity of supply (%)
		"S4":function()	{ return 100*this.sV12/this.sV13 }, 							//Resident population connected to supply system (%)
		/** Stages */
		/* 2.1. Water Abstraction*/
		"Abstraction":
		{
			/** Inputs */
			"aV1" : 0, //Energy consumed for pumping abstracted water (kWh)
			"aV2" : 0, //abstracted water volume pumped x pump head in meters (m3 x 100m)
			"aV3" : 0, //Energy recovered in abstracted water (kWh)
			"aV4" : 0, //turbine water volume pumped x turbine head in meters (m3 x 100m)
			"aV5" : 0, //Water losses (m3)
			"aV6" : 0, //Mains lenght (km)
			"aV7" : 0, //Friction pipe losses (m)
			/** Outputs */
			"aE1":function() { return this.aV1/this.sV1 }, 				//Energy consumption per conveyed water (kWh/m3) 
			"aE2":function() { return 100*this.aV1/Global.gV4 }, 		//Energy consumption of abstracted water per total energy consumption (%) 
			"aE3":function() { return this.aV1/this.aV2 }, 				//Standardised Energy Consumption (kWh/m3/100m) 
			"aE4":function() { return this.aV3/this.sV1 }, 				//Energy recovery per conveyed water (kWh/m3) 
			"aE5":function() { return this.aV3/this.aV4 }, 				//Standardized energy recovery (kWh/m3/100m) 
			"aE6":function() { return this.aV5/Global.gV1/this.aV6 }, 	//Water losses per mains length (m3/km/d) 
			"aE7":function() { return this.aV7/this.aV6 }, 				//Unit head loss (m/km) 
		},
		/* 2.2. Water Treatment*/
		"Treatment":
		{
			/** Inputs */
			"tV1"  : 0, //Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des	(m3)
			"tV2"  : 0, //Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des		(m3)
			"tV3"  : 0, //Volume of treated water in WTPs with C/F/S/Filt/Des 			(m3)
			"tV4"  : 0, //Volume of treated water in WTPs with C/F/Filt/Des				(m3)
			"tV5"  : 0, //Volume of treated water in WTPs with Des						(m3)
			"tV6"  : 0, //Volume of treated water in WTPs with other sequence 			(m3)
			"tV7"  : 0, //Energy consumed in WTPs										(kWh)
			"tV8"  : 0, //Sludge produced in WTPs 										(kg)
			"tV9"  : 0, //Treatment capacity											(m3)
			/** Outputs */
			"tE0"  :function(){},	//Treatment type (volume per type) 
			"tE01" :function(){},	//WTPs with Pre-ox/C/F/S/Filt/Des
			"tE02" :function(){},	//WTPs with Pre-ox/C/F/Filt/Des
			"tE03" :function(){},	//WTPs with C/F/S/Filt/Des
			"tE04" :function(){},	//WTPs with C/F/Filt/Des
			"tE05" :function(){},	//WTPs with Des
			"tE06" :function(){},	//WTPs with other sequence
			"tE1"  :function(){},	//Energy consumption per treated water 
			"tE2"  :function(){},	//Energy consumption of WTPs per total energy consumption 
			"tE3"  :function(){},	//Sludge production
			"tE4"  :function(){},	//Capacity utilisation 
		},
		/* 2.3. Water Distribution*/
		"Distribution":
		{
			/** Inputs */
			"dV1"  : 0,	//Volume injected (m3)
			"dV2"  : 0,	//Minimum pressure to be supplied at the distribution nodes (m)
			"dV3"  : 0,	//Highest node elevation (m)
			"dV4"  : 0,	//Lowest node elevation of the stage (m)
			"dV5"  : 0,	//Average nodes elevation (m)
			"dV6"  : 0,	//Water table elevation node (m)
			"dV7"  : 0,	//Energy consumed for pumping distributed water (kWh)
			"dV8"  : 0,	//[Sum](distributed water volume pumped x pump head in meters) (m3 x 100 m)
			"dV9"  : 0,	//Natural energy provided (kWh)
			"dV10" : 0,	//Energy recovered at water distribution (kWh)
			"dV11" : 0,	//Minimum required energy by users (kWh)
			"dV12" : 0,	//Total supplied energy to the network (natural plus shaft), real system (kWh)
			"dV13" : 0,	//Topographic energy supplied to the system (kWh)
			"dV14" : 0,	//Total supplied energy to the network, assuming the system has no losses (kWh)
			"dV15" : 0,	//Mains lenght (km)
			"dV16" : 0,	//Friction pipe losses (m)
			/** Outputs */
			"dE1"   :function(){},		//Energy consumption per authorized consumption 
			"dE2"	:function(){},		//Energy consumption of authorized consumption per total energy consumption
			"dE3"	:function(){},		//Standardised Energy Consumption
			"dE4"	:function(){},		//Global water distribution energy efficiency
			"dE5"	:function(){},		//Percentage of topographic energy
			"dE6"	:function(){},		//Water losses per mains length 
			"dE7"	:function(){},		//Unit head loss 
		}
	},

	"Waste": 	/** 03. Wastewater*/
	{
		/** Inputs */
		"wsV1" : 0, //Volume of collected wastewater (m3)
		"wsV2" : 0, //Resident population connected to SE (Inhab)
		"wsV3" : 0, //Wastewater resident population (Inhab)
		"wsV4" : 0, //Volume of treated wastewater (m3)
		"wsV5" : 0, //Wastewater treated by on-site systems (m3)
		"wsV6" : 0, //Tests complying with discharge consents (num)
		"wsV7" : 0, //Tests carried out in WWTPs (num)
		"wsV8" : 0, //Volume of discharged wastewater (m3)
		/** Outputs */
		"wS1":function() { return 100*this.wsV2/this.wsV3 }, 	//Resident population connected to sewer system (%)
		"wS2":function() { return "not implemented" }, 			//Treated Wastewater in WWTP (%)
		"wS3":function() { return 100*this.wsV7/this.wsV6 }, 	//WWTP compliance with discharge consents (%)
		/** Stages */
		/* 3.1. WASTEWATER COLLECTION*/ 
		"Collection":
		{
			/** Inputs */
			"wcV1" : 0,				//Energy consumed for pumping collected wastewater				(kWh)
			"wcV2" : 0,				//collected wastewater volume pumped x pump head in meters		(m3 x 100m)
			/** Outputs */
			"wcE1" : function(){},  //Energy consumption per collected wastewater 
			"wcE2" : function(){},  //Energy consumption of collected wastewater per total energy consumption
			"wcE3" : function(){},  //Standardised Energy Consumption
		},
		/* 3.2. WASTEWATER TREATMENT*/
		"Treatment":
		{
			"wtV1"  : 0,			//Volume of treated wastewater in WWTPs with trickling filters (TF)					(m3)
			"wtV2"  : 0,			//Volume of treated wastewater in WWTPs with activated sludge (AS)					(m3)
			"wtV3"  : 0,			//Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F) 	(m3)
			"wtV4"  : 0,			//Volume of treated wastewater in WWTPs with AS nitrification and C/F				(m3)
			"wtV5"  : 0,			//Volume of treated wastewater in WWTPs with Laggons 								(m3)
			"wtV6"  : 0,			//Volume of treated wastewater in WWTPs with other type of treatment 				(m3)
			"wtV7"  : 0,			//Energy consumed in WWTPs															(kWh)
			"wtV8"  : 0,			//BOD mass removed 																	(kg BOD)
			"wtV9"  : 0,			//Energy produced in WWTPs 															(kWh)
			"wtV10" : 0,			//Sludge produced in WWTPs 															(kg)
			"wtV11" : 0,			//Dry weight in sludge produced														(% (w/w))
			"wtV12" : 0,			//Treatment capacity																(m3)
			"wtV13" : 0,			//BOD influent																		(mg/l)
			"wtE0" :function(){},	//Treatment type (volume per type) 
			"wtE01":function(){},	//WWTPs with trickling filters (TF)
			"wtE02":function(){},	//WWTPs with activated sludge (AS)
			"wtE03":function(){},	//WWTPs with AS and Coagulation/Filtration (C/F)
			"wtE04":function(){},	//WWTPs with AS nitrification and C/F 
			"wtE05":function(){},	//WWTPs with Lagoons
			"wtE06":function(){},	//WWTPs with other type of treatment
			"wtE1" :function(){},	//Energy consumption per treated wastewater 
			"wtE2" :function(){},	//Energy consumption of WWTPs per total energy consumption 
			"wtE3" :function(){},	//Energy consumption per mass removed  
			"wtE4" :function(){},	//Energy production 
			"wtE5" :function(){},	//Sludge production
			"wtE6" :function(){},	//Dry weight in sludge production
			"wtE7" :function(){},	//Capacity utilisation 
		},
		/* 3.3. WASTEWATER DISCHARGE */
		"Discharge":
		{
			"wdV1": 0,				//Energy consumed for pumping discharged wastewater	 			(kWh)
			"wdV2": 0,				//discharged wastewater volume pumped x pump head in meters) 	(m3 x 100m)
			"wdV3": 0,				//Energy recovered in wastewater discharged	 					(kWh)
			"wdV4": 0,				//turbine water volume pumped x  turbine head in meters) 		(m3 x 100m)
			"wdE1":function(){},	//Energy consumption per discharged wastewater 
			"wdE2":function(){},	//Energy consumption of discharged wastewater per total energy consumption
			"wdE3":function(){},	//Standardised Energy Consumption
			"wdE4":function(){},	//Energy recovery per discharged water
			"wdE5":function(){},	//Standardized energy recovery
		},
	},

	"Emissions": /** 04. Emissions */
	{
		"dD1" : 0, //Direct CO2 emitted in urban drinking water system from on-site engines 	(kg CO2)	 	 	 	 
		"dW1" : 0, //Direct CO2 emitted in wastewater stages from on-site engines	 			(kg CO2)	 	 	 	 
		"dM1" : 0, //Methane (CH4) emitted	 													(kg CO2)	 	 	 	 
		"dN1" : 0, //Nitrous oxide (N2O) emitted 												(kg CO2)	 	 	 	 
		/*4.1. DIRECT EMISSIONS*/
		"Direct":
		{
			"g_dGHG":	function(){}, //Total direct GHG Emissions per capita 
			"s_dGHG":	function(){}, //Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water 
			"ws_dGHG":	function(){}, //Direct GHG emissions in wastewater stages per volume of treated wastewater 
			"wt_dGHG":	function(){}, //Direct GHG emissions in wastewater treatment per BOD eliminated 
		},
		/*4.2. INDIRECT EMISSIONS*/
		"Indirect":
		{
			"iS1"		: 0,			//Indirect CO2e emitted in sludge transport	 		(kg CO2e)
			"iN1"		: 0,			//Indirect CO2e emitted from wastewater effluent	(kg CO2e)
			"ws_iGHG1"	: function(){},	//Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet
			"wt_iGHG1"	: function(){},	//Sludge transport indirect GHG Emissions per dry weight of sludge
		}
	},
}

