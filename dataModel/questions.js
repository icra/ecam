/**
	This object stores in arrays the codes of variables that are hidden if answer is NO
*/

var Questions = 
{
	"engines_in_water":[
		"ws_vol_fuel",
		"ws_KPI_GHG_ne",
	],

	"engines_in_waste":[
		"ww_vol_fuel",
		"c_ww_nrg_engines",
		"ww_KPI_GHG_ne_engines",

	],

	"truck_transport_waste":[
		"ww_dist_dis",
		"ww_num_trip",
		"c_ww_nrg_tsludge",
		"ww_KPI_GHG_ne_tsludge"
	],

	"producing_energy_waterAbs":[
		"wsa_nrg_turb",
		"wsa_vol_turb",
		"wsa_trb_head",
		"c_wsa_trb_head",
		"wsa_KPI_nrg_recovery",
		"wsd_nrg_recv",
	],

	"topographic_energy":[
		"wsd_hi_no_el",
		"wsd_lo_no_el",
		"wsd_av_no_el",
		"wsd_wt_el_no",
		"c_wsd_nrg_topo",
	],

	"industrial_wasteTre":[
		/*it's only used to calculate c_wwt_ann_ndis*/ 
	],

	"producing_biogas": [
		"ww_biog_pro",
		"wwt_biog_pro",
		"c_ww_biogas_flar",
		"wwt_KPI_biog_x_bod",
	],

	"valorizing_biogas":[
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

//return the codes according to an ubication inside "Global"
Questions.getQuestions=function(ubication)
{
	var questions=[];
	//go over all questions
	for(var question in this)
	{
		//check all codes inside
		for(var input in this[question])
		{
			var code = this[question][input]
			//check if exists inside ubication
			if(ubication[code])
			{
				questions.push(question)
				break;
			}
		}
	}
	return questions;
}
