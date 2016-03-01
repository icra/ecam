var Normalization =
{
	//empty data structure to perform normalization
	Water:
	{
		reside:0,
		servic:0,
		volume:0,
		energy:0,
		Abstraction: {volume:0, energy:0 },
		Treatment:   {volume:0, energy:0 },
		Distribution:{volume:0, energy:0 },
	},
	Waste:
	{
		reside:0,
		servic:0,
		volume:0,
		energy:0,
		Collection:{volume:0, energy:0},
		Treatment: {volume:0, energy:0},
		Discharge: {volume:0, energy:0},
	},

	//fill data structure: Get values from the user data
	update:function()
	{
		this.Water={
			reside: Global.Water.ws_resi_pop,
			servic: Global.Water.ws_serv_pop,
			volume: Global.Water.ws_vol_auth,
			energy: Global.Water.ws_nrg_cons,
			Abstraction: {volume: Global.Water.Abstraction.wsa_vol_conv,  energy:Global.Water.Abstraction.wsa_nrg_cons},
			Treatment:   {volume: Global.Water.Treatment.wst_vol_trea,    energy:Global.Water.Treatment.wst_nrg_cons},
			Distribution:{volume: Global.Water.Distribution.wsd_vol_dist, energy:Global.Water.Distribution.wsd_nrg_cons},
		};
		this.Waste={
			reside: Global.Waste.ww_resi_pop,
			servic: Global.Waste.ww_serv_pop,
			volume: Global.Waste.ww_vol_wwtr,
			energy: Global.Waste.ww_nrg_cons,
			Collection:{volume:Global.Waste.Collection.wwc_vol_conv, energy:Global.Waste.Collection.wwc_nrg_cons},
			Treatment: {volume:Global.Waste.Treatment.wwt_vol_trea,  energy:Global.Waste.Treatment.wwt_nrg_cons},
			Discharge: {volume:Global.Waste.Discharge.wwd_vol_disc,  energy:Global.Waste.Discharge.wwd_nrg_cons},
		};
	},

	/*normalize
		category: (string) reside,servic,volume,energy
		num: (float) numerator
		level: (string) Water,Waste
		sublevel: (string) Abstraction,Collection,Treatment,Distribution,Discharge
	*/
	normalize:function(category,num,level,sublevel)
	{
		//get latest data from user
		this.update();
		//get divisor
		var div = (sublevel=='false') ? this[level][category] : this[level][sublevel][category];
		return num/div;
	},
}
