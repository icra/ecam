/**
	This object stores in arrays the codes of variables that are hidden if answer is NO
*/

var Questions = 
{
	"pumping_for_distribution":[
		"wsd_nrg_cons",
		"wsd_vol_pump",
		"wsd_pmp_head",
		"c_wsd_vol_head",
		"wsd_KPI_nrg_per_m3",
		"wsd_KPI_std_nrg_cons",
	],

	"water_conduction":[
		"wsa_wat_loss",
		"wsa_main_len",
		"wsa_fri_loss",
		"wsa_KPI_water_losses",
		"wsa_KPI_un_head_loss",
	],

	"pumping_for_abstraction":[
		"wsa_nrg_cons",
		"wsa_vol_pump",
		"wsa_pmp_head",
		"wsa_KPI_nrg_per_m3",
		"wsa_KPI_std_nrg_cons",
	],

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
		"wsa_KPI_std_nrg_recv",	
	],

	"topographic_energy":[
		"wsd_hi_no_el",
		"wsd_lo_no_el",
		"wsd_av_no_el",
		"wsd_wt_el_no",
		"c_wsd_nrg_topo",
		"c_wsd_nrg_natu",
		"wsd_KPI_nrg_topgraph",
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
			if(ubication[code]!=undefined)
			{
				questions.push(question)
				break;
			}
		}
	}
	return questions;
}
