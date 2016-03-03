/**
	This object stores in arrays the codes of variables that are hidden if answer is NO
*/

var Questions = 
{
	"Are you producing biogas": ["wwt_biog_pro","c_wwt_biog_fla","c_ww_biogas_flar"],
	"Are you valorizing biogas":["wwt_biog_val","c_wwt_nrg_biog","wwt_nrg_biog","wwt_ch4_biog"],
	"Are you producing electrical energy":["wsa_nrg_turb","wwd_nrg_recv","wsg_nrg_prod","wsg_nrg_sold","wsg_heat_nrg","wwg_nrg_prod","wwg_nrg_sold","wsg_heat_nrg"],
	"Do you have fuel engines to run pumps":["ws_vol_fuel","ww_vol_fuel","c_ww_nrg_engines"],
	"Are you using truck transport to convey sludge to the disposal site":["ww_dist_dis","ww_num_trip","c_ww_nrg_tsludge"],
	"Is your topography flat":[],
	"Is any untreated industrial or commercial wastewater connected":[/*it's used to calculate c_wwt_ann_ndis*/],
}

Questions.isHidden = function(field)
{
	//go over all questions
	for(var question in this)
	{
		//if answer is yes, next question
		if(Global.Configuration['Yes/No'][question]==1) continue;

		//if answer is no, look for the field inside
		for(var i in this[question])
		{
			var code=this[question][i];
			if(code==field)
				return true;
		}
	}
	return false;
}
