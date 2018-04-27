var Units={
	/*Modify or add a unit change in Global.Configuration.Units*/
	selectUnit:function(field,newUnit){
		Global.Configuration.Units[field]=newUnit;
		//call init if it exists, common function everywhere
		if(typeof(init)=='function')
		{
			init();
		}
	},

	/* return a multiplier for a field */
	multiplier:function(field)
	{
		//if magnitude is not inside Units, multiplier is 1
		if(Info[field]===undefined){return 1}
		if(Units[Info[field].magnitude]===undefined){return 1}

		//look for current unit: first inside configuration, if not, in Info[field]
		var currentUnit = Global.Configuration.Units[field] || Info[field].unit;

		//multiplier is in Units[magnitude][unit]
		return Units[Info[field].magnitude][currentUnit] || 1;
	},

	/** CONVERSION BETWEEN MAGNITUDES */
	"Distance":{
		m:1,
		cm:0.01,
		km:1000,
	},
	"Mass":{ 
		kg:1,
		g:0.001,
	},
	"Time":{ 
		sec:1,
		min:60,
		hour:3600,
		day:86400,
		month:365*86400/12,
	},
	//derived magnitudes from mass,distance and time
	"Volume":{ 
		m3:1,
		L:0.001,
		dam3:1000,
		hm3:1000000,
		km3:1000000000,
	},
	"Flow":{ 
		"m3/s":1,
		"L/s":0.001,
		"m3/day":1/86400,
	},
	"Energy":{
		kWh:1,
		MWh:1000,
    GWh:1000000,
		Joule:1/3600000,
		TJ:1e7/36,
	},
}
