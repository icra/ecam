/**
	Codes of variables that are hidden if answer is NO

	Question object structure: 
		1. "variables" (array)      variables hidden if answer is no
		2. "advanced" (boolean)     show only in substages
		3. "otherQuestions" (array) questions hidden if answer is no
	
	Template:
	"newQuestion":{
		variables:[ 
			"",
		],
		advanced:0,
		otherQuestions:[
			"",
		],
	},
*/
var Questions = {
	"wsa_pumping":{
		variables:[ 
			"wsa_vol_pump",
			"wsa_nrg_per_pmp_watr",
			"wsa_KPI_GHG_elec", 
			"wsa_nrg_cons",
		],
		advanced:0,
		otherQuestions:[
			"wsa_pumping_efficiency",
		],
	},
	"wsa_engines":{
		variables:[
			"wsa_vol_fuel",
			"wsa_KPI_GHG_ne",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wsa_pumping_efficiency":{
		variables:[
			"wsa_pmp_head",
			"wsa_main_len",
			"wsa_fri_loss",
			"wsa_KPI_un_head_loss",
			"wsa_KPI_std_nrg_cons",
			"wsa_KPI_std_elec_eff",
			"wsa_pmp_type",
			"wsa_pmp_size",
		],
		advanced:1,
		otherQuestions:[],
	},
	"wsa_producing_energy":{
		variables:[
			"wsa_nrg_turb",
			"wsa_KPI_nrg_recovery",
		],
		advanced:1,
		otherQuestions:[],
	},
	"wst_engines":{
		variables:[
			"wst_vol_fuel",
			"wst_KPI_GHG_fuel",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wst_pumping_efficiency":{
		variables:[ 
			"wst_vol_pump",
			"wst_pmp_head",
			"c_wst_vol_head",
			"wst_KPI_std_nrg_cons",
		],
		advanced:1,
		otherQuestions:[],
	},
	"wst_treatment_performance":{
		variables:[ 
			"wst_bod_infl",
			"wst_bod_effl",
			"wst_nrg_disn",
			"wst_KPI_nrg_disnfc",
			"wst_KPI_slu_per_m3",
		],
		advanced:1,
		otherQuestions:[ ],
	},
	"wsd_pumping":{
		variables:[
			"wsd_nrg_cons",
			"wsd_vol_pump",
			"wsd_KPI_nrg_per_m3",
			"wsd_KPI_std_nrg_cons",
			"wsd_pmp_head",
			"c_wsd_vol_head",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wsd_engines":{
		variables:[
			"wsd_vol_fuel",
			"wsd_KPI_GHG_ne_fuel",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wsd_trucks":{
		variables:[
			"wsd_vol_trck",
			"wsd_KPI_GHG_ne_trck",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wsd_topographic":{
		variables:[
			"wsd_hi_no_el",
			"wsd_lo_no_el",
			"wsd_av_no_el",
			"wsd_wt_el_no",
			"c_wsd_nrg_topo",
			"c_wsd_nrg_natu",
			"wsd_KPI_nrg_topgraph",
		],
		advanced:0,
		otherQuestions:[],
	},
	"truck_transport_waste":{
		variables:[
			"ww_dist_dis",
			"ww_num_trip",
			"c_ww_nrg_tsludge",
			"ww_KPI_GHG_ne_tsludge"
			],
		advanced:0,
		otherQuestions:[],
	},
	"producing_biogas":{
		variables:[
			"ww_biog_pro",
			"wwt_biog_pro",
			"c_ww_biogas_flar",
			"wwt_KPI_biog_x_bod",
		],
		advanced:0,
		otherQuestions:[],
	},
	"valorizing_biogas":{
		variables:[
			"wwt_biog_val",
			"ww_biog_val",
			"wwt_nrg_biog",
			"wwt_ch4_biog",
			"c_wwt_nrg_biog",
			"wwt_KPI_nrg_biogas",
			"wwt_KPI_nrg_x_biog",
		],
		advanced:0,
		otherQuestions:[],
	},
	"wwt_sludge_mgmt":{
		variables:[
			"wwt_mass_slu",
			"wwt_dryw_slu",
		],
		advanced:0,
		otherQuestions:[],
	},
};

Questions.isHidden=function(field)
{
	//go over all questions
	for(var question in this)
	{
		//if answer is yes, next question: all fields inside should be shown
		if(Global.Configuration['Yes/No'][question]==1){continue;}

		//if answer is no, look for "field" inside
		var code;
		for(var i in this[question].variables)
		{
			code=this[question].variables[i];
			if(code==field) return true;
		}
	}
	return false;
}

//return the codes according to an ubication inside "Global". ubication is a pointer to object
Questions.getQuestions=function(ubication)
{
	var code,questions=[];
	//go over all questions
	for(var question in this)
	{
		if(typeof(this[question])=="function")continue;
		//check all codes inside
		for(var i in this[question].variables)
		{
			code=this[question].variables[i];
			//check if exists inside ubication
			if(ubication[code]!=undefined)
			{
				questions.push(question);
				break;
			}
		}
	}
	return questions;
}

//check if the question "field" should be hidden
Questions.isHiddenQuestion=function(field)
{
	//go over all questions
	for(var question in this)
	{
		//if answer is yes, next question: all fields inside should be shown
		if(Global.Configuration['Yes/No'][question]==1){continue;}

		//if answer is no, look for "field" inside
		var code;
		for(var i in this[question].otherQuestions)
		{
			code=this[question].otherQuestions[i];
			if(code==field) return true;
		}
	}
	return false;
}
