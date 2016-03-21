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

	"Are you producing electrical energy in your drinking water system":[
		"wsa_nrg_turb",
		"wsa_KPI_nrg_recovery",
	],

	"Are you producing electrical energy in your wastewater system":[
		"wwd_nrg_recv",
	],

	"Do you want to investigate topographic energy":[
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

	"Are industrial or commercial users connected to the sewer system without pre-treatment":[
		/*it's only used to calculate c_wwt_ann_ndis*/ 
	],

	"Are you producing biogas": [
		"ww_biog_pro",
		"c_ww_biogas_flar",
		"wwt_biog_pro",
		"wwt_KPI_biog_x_bod",
	],

	"Are you valorizing biogas":[
		"wwt_biog_val",
		"ww_biog_val",
		"wwt_nrg_biog",
		"wwt_ch4_biog",
		"c_wwt_nrg_biog",
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
