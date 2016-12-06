/**
 * Opportunities:
 * Equations that show to the user the potential GHG reductions
 */
var Opps = 
{
	//non revenue water
	nrw:function(ideal) //ideal non revenue water (%)
	{
		var current = Global.Water.ws_SL_nrw_emis();
		var newGHGs = ideal*Global.Water.ws_KPI_GHG()/100;
		var reduction = current-newGHGs;
		return reduction;
	},

	//authorized consumption
	auc:function(ideal) //ideal authorized consumption (m3)
	{
		var current = Global.Water.ws_SL_auc_emis();
		var factor = Global.Water.ws_SL_auc_emis()/Global.Water.Distribution.wsd_auth_con;
		//electricity has to be here not volume
		var newGHGs = factor*ideal;
		var reduction = current-newGHGs;
		return reduction;
	},

	//untreated wastewater
	unt:function(ideal) //ideal serviced population
	{
		var reduction = 0;

		//ch4
			var current = Global.Waste.ww_KPI_GHG_ne_ch4_unt(); //current emissions
			var newGHGs = (Global.Waste.ww_conn_pop-ideal)*Global.Waste.ww_bod_pday/1000*Global.General.Days()*0.06*34;
			reduction += current - newGHGs;
		//n2o
			var current = Global.Waste.ww_KPI_GHG_ne_n2o_unt(); //current emissions
			var newGHGs = (Global.Waste.ww_conn_pop-ideal)*Global.Waste.ww_prot_con*Global.General.Years()*0.16*1.1*1.25*0.005*44/28*298;
			reduction += current - newGHGs;

		return reduction
	},
}
