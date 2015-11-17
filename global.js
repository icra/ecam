/* Global namespace for global variables */

var Global =
{
	//GENERAL DATA
	"name"				: "Name of the system",
	"location"			: "City",
	"assessmentPeriod"	: "January 2016",
	"comments"			: "comments",

	//INPUTS
	"gV1" : 31, 	 //Assessment period (days)
	"gV2" : 108239,	 //Energy costs (Euro)
	"gV3" : 635242,	 //Running costs (Euro)
	"gV4" : 1501779, //Total energy consumed (kWh)
	"gV5" : 368475,	 //Resident population within the utility area of service (Inhab)
	"gV6" : 0.225,	 //Energy mix consumed (CO2/kWh)

	//OUTPUTS
	"gE1":function()
	{
		return this.gV2/this.gV3
	},

	"gE2":function()		
	{
		return this.gV4*365/this.gV1/this.gV5
	},

	"GHG":function()
	{
		return this.gV4*this.gV6
	},

	//DESCRIPTIONS
	"descriptions":
	{
		"gV1" : "Assessment period (days)",
		"gV2" : "Energy costs (eur)",
		"gV3" : "Running costs (eur)",
		"gV4" : "Total energy consumed (kWh)",
		"gV5" : "Resident population within the utility area of service (inhab)",
		"gV6" : "Energy mix consumded (CO2/kWh)",
		"gE1" : "Energy Cost Ratio",
		"gE2" : "Per capita energy consumption (kWh/inhab/year)",
		"GHG" : "Per capita GHG emissions (CO2e kg/inhab/year)"
	},
}
