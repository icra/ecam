var Units =
{
	/*Modify or add a unit change in Global.Configuration.Units*/
	selectUnit:function(field,newUnit)
	{
		Global.Configuration.Units[field]=newUnit;
		init()
	},

	/* return a multiplier for a field */
	multiplier:function(field)
	{
		if(Units[Info[field].magnitude]===undefined){return 1}
		if(Global.Configuration.Units[field]===undefined){return 1}
		var m=Units[Info[field].magnitude][Global.Configuration.Units[field]];
		return m;
	},

	/** CONVERSION BETWEEN MAGNITUDES */
	"Distance":{
		cm:0.01,
		m:1,
		km:1000,
	},
	"Mass":{ 
		g:0.001,
		kg:1,
	},
	"Time":{ 
		sec:1,
		min:60,
		hour:3600,
	},
	//derived magnitudes from mass,distance and time
	"Volume":{ 
		m3:1,
		L:0.001,
	},
	"Flow":{ 
		"m3/s":1,
		"L/s":0.001,
	},
	"Energy":{
		Joule:1,
		kWh:3600000,
	},
	"Currency":{
		USD:1,
		EUR:1,
	},
}
