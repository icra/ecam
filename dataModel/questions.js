/**
	This object stores in arrays the codes of variables that are hidden if answer is NO
*/

var Questions = 
{
	"Do you have fuel engines to run pumps":[
		"ws_vol_fuel",
		"ws_KPI_GHG_ne",
		"ww_vol_fuel",
		"c_ww_nrg_engines"
	],

	"Are you producing electrical energy":[
		"wsa_nrg_turb",
		"wwd_nrg_recv",
		"wsg_nrg_prod",
		"wsg_nrg_sold",
		"wwg_nrg_prod",
		"wwg_nrg_sold",
	],

	"Is your topography non-flat":[
		"wsd_hi_no_el",
		"wsd_lo_no_el",
		"wsd_av_no_el",
		"wsd_wt_el_no",
		"c_wsd_nrg_topo",
	],

	"Are you using truck transport to convey sludge to the disposal site":[
		"ww_dist_dis",
		"ww_num_trip",
		"c_ww_nrg_tsludge"
	],

	"Is any untreated industrial or commercial wastewater connected":[ 
		/*it's only used to calculate c_wwt_ann_ndis*/ 
	],

	"Are you producing biogas": [
		"c_ww_biogas_flar",
		"c_wwt_biog_fla",
		"wwt_biog_pro",
		"wwt_KPI_biog_x_bod",
	],

	"Are you valorizing biogas":[
		"wwt_biog_val",
		"c_wwt_nrg_biog",
		"wwt_nrg_biog",
		"wwt_ch4_biog",
		"wwt_KPI_nrg_biogas",
		"wwt_KPI_nrg_x_biog",
	],
}

Questions.isHidden=function(field)
{
	//go over all questions
	for(var question in this)
	{
		//if answer is yes, next question: all fields inside should be shown
		if(Global.Configuration['Yes/No'][question]==1)continue;

		//if answer is no, look for "field" inside
		for(var i in this[question])
		{
			var code=this[question][i];
			if(code==field) return true;
		}
	}
	return false;
}
