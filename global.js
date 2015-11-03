/* Global namespace for global variables */

var Global =
{
	substages:new Array(),

	//GENERAL DATA
	name:"",				//name of the system
	location:"",			//Location
	assessmentPeriod:"",	//month and year
	comments:"",			//comments

	//GLOBAL
	gV1:31,				//Assessment period											(days)
	gV2:108239,			//Energy costs												(Euro)
	gV3:635242,			//Running costs												(Euro)
	gV4:1501779,		//Total energy consumed										(kWh)
	gV5:368475,			//Resident population within the utility area of service	(Inhab)
	gV6:0.225,			//Energy mix consumed										(CO2/kWh)

	gE1:function()		//Energy Cost Ratio
	{return this.gV2/this.gV3},

	gE2:function()		//Per capita energy consumption 							(kWh/Inhab/year)
	{return this.gV4*365/this.gV1/this.gV5},

	GHG:function()		//Per capita GHG emissions									(CO2e kg/ inInhab/year)	
	{
		return (this.gV4*this.gV6) //TODO
	}
}

