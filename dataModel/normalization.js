var Normalization =
{
	//data structure to perform normalization: the code is the denominator
	Water:
	{
		reside:"ws_resi_pop",
		servic:"ws_serv_pop",
		volume:"ws_vol_auth",
		energy:"ws_nrg_cons",
		General:     {volume:"ws_vol_auth",  energy:"ws_nrg_cons"},
		Abstraction: {volume:"wsa_vol_conv", energy:"wsa_nrg_cons" },
		Treatment:   {volume:"wst_vol_trea", energy:"wst_nrg_cons" },
		Distribution:{volume:"wsd_vol_dist", energy:"wsd_nrg_cons" },
	},
	Waste:
	{
		reside:"ww_resi_pop",
		servic:"ww_serv_pop",
		volume:"ww_vol_wwtr",
		energy:"ww_nrg_cons",
		General:   {volume:"ww_vol_wwtr",  energy:"ww_nrg_cons"},
		Collection:{volume:"wwc_vol_conv", energy:"wwc_nrg_cons"},
		Treatment: {volume:"wwt_vol_trea", energy:"wwt_nrg_cons"},
		Discharge: {volume:"wwd_vol_disc", energy:"wwd_nrg_cons"},
	},

	/*normalize
		category: (string) reside,servic,volume or energy
		field: (string) numerator
		level: (string) Water,Waste
		sublevel: (string) Abstraction,Collection,Treatment,Distribution,Discharge
	*/
	normalize:function(category,field,level,sublevel)
	{
		//location
		var loc = locateVariable(field);

		//stage pointer
		var sta = loc.sublevel ?  Global[loc.level][loc.sublevel] : Global[loc.level];

		//numerator
		var num = sta[field]();

		//divisor
		var divisor = (sublevel=='false' || category=='reside' || category=='servic') ? this[level][category] : this[level][sublevel][category];
		var loc = locateVariable(divisor);
		var div = loc.sublevel ?  Global[loc.level][loc.sublevel][divisor] : Global[loc.level][divisor];
		return num/div;
	},
}
