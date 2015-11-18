/** 01. WATER SUPPLY*/
var WaterSupply =
	{
		/** INPUTS */
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
		/** OUTPUTS */
			"S1":function() //Quality of supplied water (%)
			{
				return 100*(this.sV4+this.sV5+this.sV6+this.sV7)/this.sV3
			},

			"S2":function() //Pressure of supply adequacy (%)
			{
				return 100*this.sV9/this.sV10
			},

			"S3":function() //Continuity of supply (%)
			{
				return 100*this.sV11/24/Global.gV1
			},

			"S4":function()	//Resident population connected to supply system (%)
			{
				return 100*this.sV12/this.sV13
			},
		/**Descriptions*/
			"descriptions":
			{
				"sV1"  	: "Volume of Conveyed Water (m3)",
				"sV2"  	: "Volume of Treated Water (m3)",
				"sV3"  	: "Treated Water quality tests carried out (num)",
				"sV4"  	: "Compliance of aesthetic tests (num)",
				"sV5"  	: "Compliance of microbiological tests (num)",
				"sV6"  	: "Compliance of physical-chemical tests (num)",
				"sV7"  	: "Compliance of radioactivity tests (num)",
				"sV8"  	: "Volume of authorized consumption (m3)",
				"sV9"  	: "Delivery points with adequate pressure (num)",
				"sV10" 	: "Number of service connections (num)",
				"sV11" 	: "Time system is pressurised (hour)",
				"sV12" 	: "Resident population connected to supply systems (Inhab)",
				"sV13" 	: "Water supply resident population (Inhab)",
				"S1"	: "Quality of supplied water (%)",
				"S2"	: "Pressure of supply adequacy (%)",
				"S3"	: "Continuity of supply (%)",
				"S4"	: "Resident population connected to supply system (%)",
			}
	}
/** 02. WASTEWATER*/
var WasteWater =
	{
		"wsV1" : 0, //Volume of collected wastewater								(m3)
		"wsV2" : 0, //Resident population connected to SE		(Inhab)
		"wsV3" : 0, //Wastewater resident population 			(Inhab)
		"wsV4" : 0, //Volume of treated wastewater				(m3)
		"wsV5" : 0, //Wastewater treated by on-site systems		(m3)
		"wsV6" : 0, //Tests complying with discharge consents	(num)
		"wsV7" : 0, //Tests carried out in WWTPs				(num)
		"wsV8" : 0, //Volume of discharged wastewater			(m3)
		"wS1":function() 	//Resident population connected to sewer system (%)
		{
			return 100*this.wsV2/this.wsV3
		},
		"wS2":function() 	//Treated Wastewater in WWTP (%)
		{
			return "not implemented" //TODO (es complex)
		},
		"wS3":function() 	//WWTP compliance with discharge consents (%)
		{
			return 100*this.wsV7/this.wsV6
		},
		"descriptions":
		{
			"wsV1"  : "Volume of collected wastewater (m3)",
			"wsV2"  : "Resident population connected to SE (Inhab)",
			"wsV3"  : "Wastewater resident population (Inhab)",
			"wsV4"  : "Volume of treated wastewater	(m3)",
			"wsV5"  : "Wastewater treated by on-site systems (m3)",
			"wsV6"  : "Tests complying with discharge consents(num)",
			"wsV7"  : "Tests carried out in WWTPs (num)",
			"wsV8"  : "Volume of discharged wastewater (m3)",
			"wS1"	: "Resident population connected to sewer system (%)",
			"wS2"	: "Treated Wastewater in WWTP (%)",
			"wS3"	: "WWTP compliance with discharge consents (%)",
		},
	}

/*03. WATER ABSTRACTION*/
var WaterAbstraction =
	{
		"aV1" : 0, //Energy consumed for pumping abstracted water (kWh)
		"aV2" : 0, //abstracted water volume pumped x pump head in meters (m3 x 100m)
		"aV3" : 0, //Energy recovered in abstracted water (kWh)
		"aV4" : 0, //turbine water volume pumped x turbine head in meters (m3 x 100m)
		"aV5" : 0, //Water losses (m3)
		"aV6" : 0, //Mains lenght (km)
		"aV7" : 0, //Friction pipe losses (m)
		"aE1":function() //Energy consumption per conveyed water (kWh/m3) 
		{
			return this.aV1/this.sV1
		},
		"aE2":function() //Energy consumption of abstracted water per total energy consumption (%) 
		{
			return 100*this.aV1/Global.gV4
		},
		"aE3":function() //Standardised Energy Consumption (kWh/m3/100m) 
		{
			return this.aV1/this.aV2
		},
		"aE4":function() //Energy recovery per conveyed water (kWh/m3) 
		{
			return this.aV3/this.sV1
		},
		"aE5":function() //Standardized energy recovery (kWh/m3/100m) 
		{
			return this.aV3/this.aV4
		},
		"aE6":function() //Water losses per mains length (m3/km/d) 
		{
			return this.aV5/Global.gV1/this.aV6
		},
		"aE7":function() //Unit head loss (m/km) 
		{
			return this.aV7/this.aV6
		},
		"descriptions":
		{
			"aV1" : "Energy consumed for pumping abstracted water (kWh)",
			"aV2" : "abstracted water volume pumped x pump head in meters (m3 x 100m)",
			"aV3" : "Energy recovered in abstracted water (kWh)",
			"aV4" : "turbine water volume pumped x turbine head in meters (m3 x 100m)",
			"aV5" : "Water losses (m3)",
			"aV6" : "Mains lenght (km)",
			"aV7" : "Friction pipe losses (m)",
			"aE1" : "Energy consumption per conveyed water (kWh/m3) ",
			"aE2" : "Energy consumption of abstracted water per total energy consumption (%) ",
			"aE3" : "Standardised Energy Consumption (kWh/m3/100m) ",
			"aE4" : "Energy recovery per conveyed water (kWh/m3) ",
			"aE5" : "Standardized energy recovery (kWh/m3/100m) ",
			"aE6" : "Water losses per mains length (m3/km/d) ",
			"aE7" : "Unit head loss (m/km) ",
		},
	}

/*04. WATER TREATMENT*/
var WaterTreatment =
	{
		"tV1"  : 0, //Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des	(m3)
		"tV2"  : 0, //Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des		(m3)
		"tV3"  : 0, //Volume of treated water in WTPs with C/F/S/Filt/Des 			(m3)
		"tV4"  : 0, //Volume of treated water in WTPs with C/F/Filt/Des				(m3)
		"tV5"  : 0, //Volume of treated water in WTPs with Des						(m3)
		"tV6"  : 0, //Volume of treated water in WTPs with other sequence 			(m3)
		"tV7"  : 0, //Energy consumed in WTPs										(kWh)
		"tV8"  : 0, //Sludge produced in WTPs 										(kg)
		"tV9"  : 0, //Treatment capacity											(m3)
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
		"descriptions":
		{
			"tV1"  : "Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des (m3)",
			"tV2"  : "Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des (m3)",
			"tV3"  : "Volume of treated water in WTPs with C/F/S/Filt/Des (m3)",
			"tV4"  : "Volume of treated water in WTPs with C/F/Filt/Des (m3)",
			"tV5"  : "Volume of treated water in WTPs with Des (m3)",
			"tV6"  : "Volume of treated water in WTPs with other sequence (m3)",
			"tV7"  : "Energy consumed in WTPs (kWh)",
			"tV8"  : "Sludge produced in WTPs (kg)",
			"tV9"  : "Treatment capacity (m3)",
			"tE0"  : "Treatment type (volume per type) ",
			"tE01" : "WTPs with Pre-ox/C/F/S/Filt/Des",
			"tE02" : "WTPs with Pre-ox/C/F/Filt/Des",
			"tE03" : "WTPs with C/F/S/Filt/Des",
			"tE04" : "WTPs with C/F/Filt/Des",
			"tE05" : "WTPs with Des",
			"tE06" : "WTPs with other sequence",
			"tE1"  : "Energy consumption per treated water ",
			"tE2"  : "Energy consumption of WTPs per total energy consumption ",
			"tE3"  : "Sludge production",
			"tE4"  : "Capacity utilisation ",
		}
	}
/*05. WATER DISTRIBUTION*/
var WaterDistribution =
	{
		"dV1 "  : 0	//Volume injected (m3)
		"dV2 "  : 0	//Minimum pressure to be supplied at the distribution nodes (m)
		"dV3 "  : 0	//Highest node elevation (m)
		"dV4 "  : 0	//Lowest node elevation of the stage (m)
		"dV5 "  : 0	//Average nodes elevation (m)
		"dV6 "  : 0	//Water table elevation node (m)
		"dV7 "  : 0	//Energy consumed for pumping distributed water (kWh)
		"dV8 "  : 0	//[Sum](distributed water volume pumped x pump head in meters) (m3 x 100 m)
		"dV9 "  : 0	//Natural energy provided (kWh)
		"dV10"  : 0	//Energy recovered at water distribution (kWh)
		"dV11"  : 0	//Minimum required energy by users (kWh)
		"dV12"  : 0	//Total supplied energy to the network (natural plus shaft), real system (kWh)
		"dV13"  : 0	//Topographic energy supplied to the system (kWh)
		"dV14"  : 0	//Total supplied energy to the network, assuming the system has no losses (kWh)
		"dV15"  : 0	//Mains lenght (km)
		"dV16"  : 0	//Friction pipe losses (m)
		"dE1"   :function(){}		//Energy consumption per authorized consumption 
		"dE2"	:function(){}		//Energy consumption of authorized consumption per total energy consumption
		"dE3"	:function(){}		//Standardised Energy Consumption
		"dE4"	:function(){}		//Global water distribution energy efficiency
		"dE5"	:function(){}		//Percentage of topographic energy
		"dE6"	:function(){}		//Water losses per mains length 
		"dE7"	:function(){}		//Unit head loss 
		"descriptions":
		{
			"dV1"  : "Volume injected (m3)",
			"dV2"  : "Minimum pressure to be supplied at the distribution nodes (m)",
			"dV3"  : "Highest node elevation (m)",
			"dV4"  : "Lowest node elevation of the stage (m)",
			"dV5"  : "Average nodes elevation (m)",
			"dV6"  : "Water table elevation node (m)",
			"dV7"  : "Energy consumed for pumping distributed water (kWh)",
			"dV8"  : "[Sum](distributed water volume pumped x pump head in meters) (m3 x 100 m)",
			"dV9"  : "Natural energy provided (kWh)",
			"dV10" : "Energy recovered at water distribution (kWh)",
			"dV11" : "Minimum required energy by users (kWh)",
			"dV12" : "Total supplied energy to the network (natural plus shaft), real system (kWh)",
			"dV13" : "Topographic energy supplied to the system (kWh)",
			"dV14" : "Total supplied energy to the network, assuming the system has no losses (kWh)",
			"dV15" : "Mains lenght (km)",
			"dV16" : "Friction pipe losses (m)",
			"dE1"  : "Energy consumption per authorized consumption ",
			"dE2"  : "Energy consumption of authorized consumption per total energy consumption",
			"dE3"  : "Standardised Energy Consumption",
			"dE4"  : "Global water distribution energy efficiency",
			"dE5"  : "Percentage of topographic energy",
			"dE6"  : "Water losses per mains length ",
			"dE7"  : "Unit head loss ",
		}
	}
/*06. WASTEWATER COLLECTION*/ 
var WastewaterCollection =
	{
		"wcV1" : 0,				//Energy consumed for pumping collected wastewater				(kWh)
		"wcV2" : 0,				//collected wastewater volume pumped x pump head in meters		(m3 x 100m)
		"wcE1" : function(){},  //Energy consumption per collected wastewater 
		"wcE2" : function(){},  //Energy consumption of collected wastewater per total energy consumption
		"wcE3" : function(){},  //Standardised Energy Consumption
		"descriptions" :
		{
			"wcV1" : "Energy consumed for pumping collected wastewater (kWh)",
			"wcV2" : "collected wastewater volume pumped x pump head in meters (m3 x 100m)",
			"wcE1" : "Energy consumption per collected wastewater",
			"wcE2" : "Energy consumption of collected wastewater per total energy consumption",
			"wcE3" : "Standardised Energy Consumption",
		}
	}

/*07. WASTEWATER TREATMENT*/
var WastewaterTreatment =
	{
			"wtV1 " : 0	//Volume of treated wastewater in WWTPs with trickling filters (TF)					(m3)
			"wtV2 " : 0	//Volume of treated wastewater in WWTPs with activated sludge (AS)					(m3)
			"wtV3 " : 0	//Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F) 	(m3)
			"wtV4 " : 0	//Volume of treated wastewater in WWTPs with AS nitrification and C/F				(m3)
			"wtV5 " : 0	//Volume of treated wastewater in WWTPs with Laggons 								(m3)
			"wtV6 " : 0	//Volume of treated wastewater in WWTPs with other type of treatment 				(m3)
			"wtV7 " : 0	//Energy consumed in WWTPs															(kWh)
			"wtV8 " : 0	//BOD mass removed 																	(kg BOD)
			"wtV9 " : 0	//Energy produced in WWTPs 															(kWh)
			"wtV10" : 0	//Sludge produced in WWTPs 															(kg)
			"wtV11" : 0	//Dry weight in sludge produced														(% (w/w))
			"wtV12" : 0	//Treatment capacity																(m3)
			"wtV13" : 0	//BOD influent																		(mg/l)
			"wtE0	=function(){}	//Treatment type (volume per type) 
			"wtE01=function(){}	//WWTPs with trickling filters (TF)
			"wtE02=function(){}	//WWTPs with activated sludge (AS)
			"wtE03=function(){}	//WWTPs with AS and Coagulation/Filtration (C/F)
			"wtE04=function(){}	//WWTPs with AS nitrification and C/F 
			"wtE05=function(){}	//WWTPs with Lagoons
			"wtE06=function(){}	//WWTPs with other type of treatment
			"wtE1	=function(){}	//Energy consumption per treated wastewater 
			"wtE2	=function(){}	//Energy consumption of WWTPs per total energy consumption 
			"wtE3	=function(){}	//Energy consumption per mass removed  
			"wtE4	=function(){}	//Energy production 
			"wtE5	=function(){}	//Sludge production
			"wtE6	=function(){}	//Dry weight in sludge production
			"wtE7	=function(){}	//Capacity utilisation 
	}
/*08. WASTEWATER DISCHARGE */
var WastewaterDischarge =
	{
			this.wdV1 = 0	//Energy consumed for pumping discharged wastewater	 			(kWh)
			this.wdV2 = 0	//discharged wastewater volume pumped x pump head in meters) 	(m3 x 100m)
			this.wdV3 = 0	//Energy recovered in wastewater discharged	 					(kWh)
			this.wdV4 = 0	//turbine water volume pumped x  turbine head in meters) 		(m3 x 100m)
			/*08. WASTEWATER DISCHARGE*/
				Substage.prototype.wdE1=function(){}	//Energy consumption per discharged wastewater 
				Substage.prototype.wdE2=function(){}	//Energy consumption of discharged wastewater per total energy consumption
				Substage.prototype.wdE3=function(){}	//Standardised Energy Consumption
				Substage.prototype.wdE4=function(){}	//Energy recovery per discharged water
				Substage.prototype.wdE5=function(){}	//Standardized energy recovery
	}
/*09. DIRECT EMISSIONS */
var DirectEmissions = 
	{
			this.dD1 = 0	//Direct CO2 emitted in urban drinking water system from on-site engines 	(kg CO2)	 	 	 	 
			this.dW1 = 0	//Direct CO2 emitted in wastewater stages from on-site engines	 			(kg CO2)	 	 	 	 
			this.dM1 = 0	//Methane (CH4) emitted	 													(kg CO2)	 	 	 	 
			this.dN1 = 0	//Nitrous oxide (N2O) emitted 												(kg CO2)	 	 	 	 
	}
	/*09. DIRECT EMISSIONS*/
		Substage.prototype.g_dGHG  =function(){}	//Total direct GHG Emissions per capita 
		Substage.prototype.s_dGHG  =function(){}	//Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water 
		Substage.prototype.ws_dGHG =function(){}	//Direct GHG emissions in wastewater stages per volume of treated wastewater 
		Substage.prototype.wt_dGHG =function(){}	//Direct GHG emissions in wastewater treatment per BOD eliminated 
/*10. INDIRECT EMISSIONS */
var IndirectEmissions =
	{
			this.iS1 = 0	//Indirect CO2e emitted in sludge transport	 		(kg CO2e)
			this.iN1 = 0	//Indirect CO2e emitted from wastewater effluent	(kg CO2e)
	}
	/*10. INDIRECT EMISSIONS*/
		Substage.prototype.wt_iGHG1=function(){}	//Sludge transport indirect GHG Emissions per dry weight of sludge
		Substage.prototype.wt_iGHG1=function(){}	//Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet
