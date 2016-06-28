/**
 * Opportunities:
 * Equations that show to the user the potential GHG reductions
 */
var Opps = 
{
	Waste:{
		ww_ch4_unt:function(idealServPop)
		/** 
		 * first example: methane from untreated WW GHG reduction if serviced population is "idealServPop"
		 */
		{
			var current = Global.Waste.ww_KPI_GHG_ne_ch4_unt(); //current emissions
			var newGHGs = (Global.Waste.ww_conn_pop-idealServPop)*Global.Waste.ww_bod_pday/1000*Global.General.Days()*0.06*34;
			var reduction = current - newGHGs;
			return reduction;
		},
	},
}
