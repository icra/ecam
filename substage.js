/*
Substage Class
	Fields
	Methods
*/

function Substage()
{
	this.name = "name"
	/*01. WATER SUPPLY*/
		this.sV1  = 0	//Volume of Conveyed Water (m3)
		this.sV2  = 0	//Volume of Treated Water (m3)
		this.sV3  = 0	//Treated Water quality tests carried out (num)
		this.sV4  = 0	//Compliance of aesthetic tests (num)
		this.sV5  = 0	//Compliance of microbiological tests (num)
		this.sV6  = 0	//Compliance of physical-chemical tests (num)
		this.sV7  = 0	//Compliance of radioactivity tests (num)
		this.sV8  = 0	//Volume of authorized consumption (m3)
		this.sV9  = 0	//Delivery points with adequate pressure (num)
		this.sV10 = 0	//Number of service connections (num)
		this.sV11 = 0	//Time system is pressurised (hour)
		this.sV12 = 0	//Resident population connected to supply systems (Inhab)
		this.sV13 = 0	//Water supply resident population (Inhab)
	/*02. WASTEWATER*/
		this.wsV1 = 0	//Volume of collected wastewater								(m3)
		this.wsV2 = 0	//Resident population connected to SE		(Inhab)
		this.wsV3 = 0	//Wastewater resident population 			(Inhab)
		this.wsV4 = 0	//Volume of treated wastewater				(m3)
		this.wsV5 = 0	//Wastewater treated by on-site systems		(m3)
		this.wsV6 = 0	//Tests complying with discharge consents	(num)
		this.wsV7 = 0	//Tests carried out in WWTPs				(num)
		this.wsV8 = 0	//Volume of discharged wastewater			(m3)
	/*03. WATER ABSTRACTION*/
		this.aV1  = 0	//Energy consumed for pumping abstracted water (kWh)
		this.aV2  = 0	//abstracted water volume pumped x pump head in meters (m3 x 100m)
		this.aV3  = 0	//Energy recovered in abstracted water (kWh)
		this.aV4  = 0	//turbine water volume pumped x turbine head in meters (m3 x 100m)
		this.aV5  = 0	//Water losses (m3)
		this.aV6  = 0	//Mains lenght (km)
		this.aV7  = 0	//Friction pipe losses (m)
	/*04. WATER TREATMENT*/
		this.tV1  = 0	//Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des	(m3)
		this.tV2  = 0	//Volume of treated water in WTPs with  Pre-ox/C/F/Filt/Des		(m3)
		this.tV3  = 0	//Volume of treated water in WTPs with C/F/S/Filt/Des 			(m3)
		this.tV4  = 0	//Volume of treated water in WTPs with C/F/Filt/Des				(m3)
		this.tV5  = 0	//Volume of treated water in WTPs with Des						(m3)
		this.tV6  = 0	//Volume of treated water in WTPs with other sequence 			(m3)
		this.tV7  = 0	//Energy consumed in WTPs										(kWh)
		this.tV8  = 0	//Sludge produced in WTPs 										(kg)
		this.tV9  = 0	//Treatment capacity											(m3)
	/*05. WATER DISTRIBUTION*/
		this.dV1  = 0	//Volume injected (m3)
		this.dV2  = 0	//Minimum pressure to be supplied at the distribution nodes (m)
		this.dV3  = 0	//Highest node elevation (m)
		this.dV4  = 0	//Lowest node elevation of the stage (m)
		this.dV5  = 0	//Average nodes elevation (m)
		this.dV6  = 0	//Water table elevation node (m)
		this.dV7  = 0	//Energy consumed for pumping distributed water (kWh)
		this.dV8  = 0	//[Sum](distributed water volume pumped x pump head in meters) (m3 x 100 m)
		this.dV9  = 0	//Natural energy provided (kWh)
		this.dV10 = 0	//Energy recovered at water distribution (kWh)
		this.dV11 = 0	//Minimum required energy by users (kWh)
		this.dV12 = 0	//Total supplied energy to the network (natural plus shaft), real system (kWh)
		this.dV13 = 0	//Topographic energy supplied to the system (kWh)
		this.dV14 = 0	//Total supplied energy to the network, assuming the system has no losses (kWh)
		this.dV15 = 0	//Mains lenght (km)
		this.dV16 = 0	//Friction pipe losses (m)
	/*06. WASTEWATER COLLECTION*/ 
		this.wcV1 = 0	//Energy consumed for pumping collected wastewater				(kWh)
		this.wcV2 = 0	//collected wastewater volume pumped x pump head in meters		(m3 x 100m)
	/*07. WASTEWATER TREATMENT*/
		this.wtV1  = 0	//Volume of treated wastewater in WWTPs with trickling filters (TF)					(m3)
		this.wtV2  = 0	//Volume of treated wastewater in WWTPs with activated sludge (AS)					(m3)
		this.wtV3  = 0	//Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F) 	(m3)
		this.wtV4  = 0	//Volume of treated wastewater in WWTPs with AS nitrification and C/F				(m3)
		this.wtV5  = 0	//Volume of treated wastewater in WWTPs with Laggons 								(m3)
		this.wtV6  = 0	//Volume of treated wastewater in WWTPs with other type of treatment 				(m3)
		this.wtV7  = 0	//Energy consumed in WWTPs															(kWh)
		this.wtV8  = 0	//BOD mass removed 																	(kg BOD)
		this.wtV9  = 0	//Energy produced in WWTPs 															(kWh)
		this.wtV10 = 0	//Sludge produced in WWTPs 															(kg)
		this.wtV11 = 0	//Dry weight in sludge produced														(% (w/w))
		this.wtV12 = 0	//Treatment capacity																(m3)
		this.wtV13 = 0	//BOD influent																		(mg/l)
	/*08. WASTEWATER DISCHARGE */
		this.wdV1 = 0	//Energy consumed for pumping discharged wastewater	 			(kWh)
		this.wdV2 = 0	//discharged wastewater volume pumped x pump head in meters) 	(m3 x 100m)
		this.wdV3 = 0	//Energy recovered in wastewater discharged	 					(kWh)
		this.wdV4 = 0	//turbine water volume pumped x  turbine head in meters) 		(m3 x 100m)
	/*09. DIRECT EMISSIONS */
		this.dD1 = 0	//Direct CO2 emitted in urban drinking water system from on-site engines 	(kg CO2)	 	 	 	 
		this.dW1 = 0	//Direct CO2 emitted in wastewater stages from on-site engines	 			(kg CO2)	 	 	 	 
		this.dM1 = 0	//Methane (CH4) emitted	 													(kg CO2)	 	 	 	 
		this.dN1 = 0	//Nitrous oxide (N2O) emitted 												(kg CO2)	 	 	 	 
	/*10. INDIRECT EMISSIONS */
		this.iS1 = 0	//Indirect CO2e emitted in sludge transport	 		(kg CO2e)
		this.iN1 = 0	//Indirect CO2e emitted from wastewater effluent	(kg CO2e)
}

/*01. WATER SUPPLY*/
	Substage.prototype.S1=function()	//Quality of supplied water (%)
	{return 100*(this.sV4+this.sV5+this.sV6+this.sV7)/this.sV3}

	Substage.prototype.S2=function() 	//Pressure of supply adequacy (%)
	{return 100*this.sV9/this.sV10}

	Substage.prototype.S3=function() 	//Continuity of supply (%)
	{return 100*this.sV11/24/Global.gV1}

	Substage.prototype.S4=function()	//Resident population connected to supply system (%)
	{return 100*this.sV12/this.sV13}
/*02. WASTEWATER*/
	Substage.prototype.wS1=function() 	//Resident population connected to sewer system (%)
	{return 100*this.wsV2/this.wsV3}

	Substage.prototype.wS2=function() 	//Treated Wastewater in WWTP (%)
	{
		return -1 //TODO (es complex)
	}

	Substage.prototype.wS3=function() 	//WWTP compliance with discharge consents (%)
	{return 100*this.wsV7/this.wsV6}
/*03. WATER ABSTRACTION*/
	Substage.prototype.aE1=function()	//Energy consumption per conveyed water (kWh/m3)
	{return this.aV1/this.sV1}

	Substage.prototype.aE2=function()	//Energy consumption of abstracted water per total energy consumption (%)
	{return 100*this.aV1/Global.gV4}

	Substage.prototype.aE3=function() 	//Standardised Energy Consumption (kWh/m3/100m)
	{return this.aV1/this.aV2}

	Substage.prototype.aE4=function()	//Energy recovery per conveyed water (kWh/m3)
	{return this.aV3/this.sV1}

	Substage.prototype.aE5=function()	//Standardized energy recovery (kWh/m3/100m)
	{return this.aV3/this.aV4}

	Substage.prototype.aE6=function() 	//Water losses per mains length (m3/km/d)
	{return this.aV5/Global.gV1/this.aV6}

	Substage.prototype.aE7=function() 	//Unit head loss (m/km)
	{return this.aV7/this.aV6}
/*04. WATER TREATMENT*/
	Substage.prototype.tE0 =function(){} 	//Treatment type (volume per type) 
	Substage.prototype.tE01=function(){}	//WTPs with Pre-ox/C/F/S/Filt/Des
	Substage.prototype.tE02=function(){}	//WTPs with Pre-ox/C/F/Filt/Des
	Substage.prototype.tE03=function(){}	//WTPs with C/F/S/Filt/Des
	Substage.prototype.tE04=function(){}	//WTPs with C/F/Filt/Des
	Substage.prototype.tE05=function(){}	//WTPs with Des
	Substage.prototype.tE06=function(){}	//WTPs with other sequence
	Substage.prototype.tE1 =function(){}	//Energy consumption per treated water 
	Substage.prototype.tE2 =function(){}	//Energy consumption of WTPs per total energy consumption 
	Substage.prototype.tE3 =function(){}	//Sludge production
	Substage.prototype.tE4 =function(){}	//Capacity utilisation 
/*05. WATER DISTRIBUTION*/
	Substage.prototype.dE1=function(){}		//Energy consumption per authorized consumption 
	Substage.prototype.dE2=function(){}		//Energy consumption of authorized consumption per total energy consumption
	Substage.prototype.dE3=function(){}		//Standardised Energy Consumption
	Substage.prototype.dE4=function(){}		//Global water distribution energy efficiency
	Substage.prototype.dE5=function(){}		//Percentage of topographic energy
	Substage.prototype.dE6=function(){}		//Water losses per mains length 
	Substage.prototype.dE7=function(){}		//Unit head loss 
/*06. WASTEWATER COLLECTION*/
	Substage.prototype.wcE1=function(){}	//Energy consumption per collected wastewater 
	Substage.prototype.wcE2=function(){}	//Energy consumption of collected wastewater per total energy consumption
	Substage.prototype.wcE3=function(){}	//Standardised Energy Consumption
/*07. WASTEWATER TREATMENT*/
	Substage.prototype.wtE0	=function(){}	//Treatment type (volume per type) 
	Substage.prototype.wtE01=function(){}	//WWTPs with trickling filters (TF)
	Substage.prototype.wtE02=function(){}	//WWTPs with activated sludge (AS)
	Substage.prototype.wtE03=function(){}	//WWTPs with AS and Coagulation/Filtration (C/F)
	Substage.prototype.wtE04=function(){}	//WWTPs with AS nitrification and C/F 
	Substage.prototype.wtE05=function(){}	//WWTPs with Lagoons
	Substage.prototype.wtE06=function(){}	//WWTPs with other type of treatment
	Substage.prototype.wtE1	=function(){}	//Energy consumption per treated wastewater 
	Substage.prototype.wtE2	=function(){}	//Energy consumption of WWTPs per total energy consumption 
	Substage.prototype.wtE3	=function(){}	//Energy consumption per mass removed  
	Substage.prototype.wtE4	=function(){}	//Energy production 
	Substage.prototype.wtE5	=function(){}	//Sludge production
	Substage.prototype.wtE6	=function(){}	//Dry weight in sludge production
	Substage.prototype.wtE7	=function(){}	//Capacity utilisation 
/*08. WASTEWATER DISCHARGE*/
	Substage.prototype.wdE1=function(){}	//Energy consumption per discharged wastewater 
	Substage.prototype.wdE2=function(){}	//Energy consumption of discharged wastewater per total energy consumption
	Substage.prototype.wdE3=function(){}	//Standardised Energy Consumption
	Substage.prototype.wdE4=function(){}	//Energy recovery per discharged water
	Substage.prototype.wdE5=function(){}	//Standardized energy recovery
/*09. DIRECT EMISSIONS*/
	Substage.prototype.g_dGHG  =function(){}	//Total direct GHG Emissions per capita 
	Substage.prototype.s_dGHG  =function(){}	//Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water 
	Substage.prototype.ws_dGHG =function(){}	//Direct GHG emissions in wastewater stages per volume of treated wastewater 
	Substage.prototype.wt_dGHG =function(){}	//Direct GHG emissions in wastewater treatment per BOD eliminated 
/*10. INDIRECT EMISSIONS*/
	Substage.prototype.wt_iGHG1=function(){}	//Sludge transport indirect GHG Emissions per dry weight of sludge
	Substage.prototype.wt_iGHG1=function(){}	//Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet
