/**
 * Opportunities:
 * Equations that show to the user the potential GHG reductions
 */
var Opps = 
{
	Water:{
		nonRevenueWater:function()
		{
			//equations from IWA are not clear
			return 0
		},
	},
	Waste:{
		ww_ch4_unt:function(idealServPop)
		/** 
		 * methane from untreated WW GHG reduction if serviced population is "idealServPop"
		 */
		{
			var current = Global.Waste.ww_KPI_GHG_ne_ch4_unt(); //current emissions
			var newGHGs = (Global.Waste.ww_conn_pop-idealServPop)*Global.Waste.ww_bod_pday/1000*Global.General.Days()*0.06*34;
			var reduction = current - newGHGs;
			return reduction;
		},
		ww_n2o_unt:function(idealServPop)
		/**
		 * n2o from untreated WW
		 */
		{
			var current = Global.Waste.ww_KPI_GHG_ne_n2o_unt(); //current emissions
			var newGHGs = (Global.Waste.ww_conn_pop-idealServPop)*Global.Waste.ww_prot_con*Global.General.Years()*0.16*1.1*1.25*0.005*44/28*298;
			var reduction = current - newGHGs;
			return reduction;
		},
	},
}
