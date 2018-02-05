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
var Questions={
	//wsa
		"wsa_engines":{
			variables:[
				"wsa_fuel_typ",
				"wsa_vol_fuel",
				"wsa_KPI_GHG_fuel",
				"wsa_KPI_GHG_fuel_co2",
				"wsa_KPI_GHG_fuel_n2o",
				"wsa_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wsa_pumping":{
			variables:[
				"wsa_pmp_type",    // comment for the sake of making it eq.
				"wsa_pmp_size",
				"wsa_nrg_pump",
				"wsa_vol_pump",
				"wsa_pmp_head",
				"wsa_sta_head",
				"wsa_main_len",
				"wsa_KPI_std_nrg_cons",
				"wsa_KPI_un_head_loss",
			],
			advanced:1,
			otherQuestions:[
				"wsa_pumping_eff",
			],
		},

		"wsa_pumping_eff":{
			variables:[
				"wsa_pmp_flow",
        "wsa_pmp_volt",
        "wsa_pmp_amps",
				"c_wsa_pmp_pw",
				"wsa_KPI_nrg_elec_eff",
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

		"wsa_opportunities":{
			variables:[
				"wsa_pmp_exff",
				"wsa_KPI_std_nrg_newp",
				"wsa_KPI_nrg_cons_new",
				"wsa_KPI_nrg_estm_sav",
				"wsa_KPI_ghg_estm_red",
			],
			advanced:1,
			otherQuestions:[],
		},

	//wst
		"wst_engines":{
			variables:[
				"wst_fuel_typ",
				"wst_vol_fuel",
				"wst_KPI_GHG_fuel",
				"wst_KPI_GHG_fuel_co2",
				"wst_KPI_GHG_fuel_n2o",
				"wst_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wst_pumping_eff":{
			variables:[
				"wst_vol_pump",
				"wst_nrg_pump",
				"wst_pmp_head",
				"wst_KPI_std_nrg_cons",
				"wst_KPI_std_elec_eff",
			],
			advanced:1,
			otherQuestions:[],
		},

	//wsd
		"wsd_engines":{
			variables:[
				"wsd_fuel_typ",
				"wsd_vol_fuel",
				"wsd_KPI_GHG_fuel",
				"wsd_KPI_GHG_fuel_co2",
				"wsd_KPI_GHG_fuel_n2o",
				"wsd_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wsd_trucks":{
			variables:[
				"wsd_trck_typ",
				"wsd_vol_trck",
				"wsd_KPI_GHG_trck",
				"wsd_KPI_GHG_trck_co2",
				"wsd_KPI_GHG_trck_n2o",
				"wsd_KPI_GHG_trck_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wsd_service_perf":{
			variables:[
				"wsd_deli_pts",
				"wsd_ser_cons",
				"wsd_time_pre",
				"wsd_SL_pres_ade",
				"wsd_SL_cont_sup",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wsd_topographic":{
			variables:[
				"wsd_min_pres",
				"wsd_hi_no_el",
				"wsd_lo_no_el",
				"wsd_av_no_el",
				"wsd_wt_el_no",
				"c_wsd_nrg_topo",
				"c_wsd_nrg_natu",
				"c_wsd_nrg_mini",
				"c_wsd_nrg_supp",
				"wsd_KPI_nrg_efficien",
				"wsd_KPI_nrg_topgraph",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wsd_pumping":{
			variables:[
				"wsd_pmp_size",
				"wsd_nrg_pump",
				"wsd_vol_pump",
				"wsd_pmp_head",
				"wsd_sta_head",
				"wsd_main_len",
				"wsd_KPI_std_nrg_cons",
				"wsd_KPI_un_head_loss",
        "wsd_KPI_water_losses",
			],
			advanced:1,
			otherQuestions:[
				"wsd_pumping_eff",
			],
		},

		"wsd_pumping_eff":{
			variables:[
				"wsd_pmp_flow",
				"wsd_pmp_volt",
				"wsd_pmp_amps",
				"c_wsd_pmp_pw",
				"wsd_KPI_nrg_elec_eff",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wsd_water_eff":{
			variables:[
				"wsd_SL_GHG_nrw",
				"wst_SL_GHG_nrw",
				"wsa_SL_GHG_nrw",
				"wsd_SL_ghg_attr"
			],
			advanced:1,
			otherQuestions:[],
		},

		"wsd_opportunities":{
			variables:[
				"wsd_pmp_exff",
				"wsd_KPI_std_nrg_newp",
				"wsd_KPI_nrg_cons_new",
				"wsd_KPI_nrg_estm_sav",
				"wsd_KPI_ghg_estm_red",
			],
			advanced:1,
			otherQuestions:[],
		},

	//wwc
		"wwc_engines":{
			variables:[
				"wwc_fuel_typ",
				"wwc_vol_fuel",
				"wwc_KPI_GHG_fuel",
				"wwc_KPI_GHG_fuel_co2",
				"wwc_KPI_GHG_fuel_n2o",
				"wwc_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wwc_water_eff": {
			variables:[
				"wwc_wet_flow",
				"wwc_dry_flow",
				"wwc_rain_day",
				"c_wwc_vol_infl",
				"wwc_SL_GHG_ii",
				"wwc_SL_fratio",
				"wwc_SL_GHG_inf",
				"wwt_SL_GHG_inf",
				"wwd_SL_GHG_inf",
				"wwc_SL_inf_emis"
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwc_pumping":{
			variables:[
				"wwc_nrg_pump",
				"wwc_vol_pump",
				"wwc_pmp_head",
				"wwc_sta_head",
				"wwc_coll_len",
				"wwc_KPI_std_nrg_cons",
				"wwc_KPI_std_elec_eff",
				"wwc_KPI_un_head_loss",
			],
			advanced:1,
			otherQuestions:[
				"wwc_pumping_eff",
			],
		},

		"wwc_pumping_eff": {
			variables:[
				"wwc_pmp_flow",
				"wwc_pmp_volt",
				"wwc_pmp_amps",
				"c_wwc_pmp_pw",
				"wwc_KPI_nrg_elec_eff",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwc_opportunities":{
			variables:[
				"wwc_pmp_exff",
				"wwc_KPI_std_nrg_newp",
				"wwc_KPI_nrg_cons_new",
				"wwc_KPI_nrg_estm_sav",
				"wwc_KPI_ghg_estm_red",
			],
			advanced:1,
			otherQuestions:[],
		},

	//wwt
		"wwt_engines":{
			variables:[
				"wwt_fuel_typ",
				"wwt_vol_fuel",
				"wwt_KPI_GHG_fuel",
				"wwt_KPI_GHG_fuel_co2",
				"wwt_KPI_GHG_fuel_n2o",
				"wwt_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wwt_treatment_perf":{
			variables:[
				"wwt_trea_cap",
				"wwt_tst_cmpl",
				"wwt_tst_cond",
				"wwt_KPI_capac_util",
				"wwt_SL_qual_com",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwt_pumping_eff":{
			variables:[
				"wwt_vol_pump",
				"wwt_nrg_pump",
				"wwt_pmp_head",
				"wwt_KPI_nrg_per_pump",
				"wwt_KPI_std_nrg_cons",
				"wwt_KPI_std_elec_eff",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwt_producing_biogas":{
			variables:[
				"wwt_biog_pro",
				"wwt_ch4_biog",
				"c_wwt_biog_fla",
				"wwt_dige_typ",
				"wwt_fuel_dig",
				"wwt_KPI_biog_x_bod",
				"wwt_KPI_GHG_dig_fuel",
				"wwt_KPI_GHG_dig_fuel_co2",
				"wwt_KPI_GHG_dig_fuel_n2o",
				"wwt_KPI_GHG_dig_fuel_ch4",
				"wwt_KPI_GHG_biog",
			],
			advanced:1,
			otherQuestions:[
				"wwt_valorizing_biogas",
			],
		},

		"wwt_valorizing_biogas":{
			variables:[
				"wwt_biog_val",
				"wwt_nrg_biog",
				"c_wwt_nrg_biog",
				"wwt_KPI_nrg_biogas",
				"wwt_KPI_nrg_x_biog",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwt_sludge_mgmt":{
			variables:[
				"wwt_mass_slu",
				"wwt_dryw_slu",
				"wwt_slu_disp",
				"wwt_KPI_sludg_prod",
				"wwt_KPI_dry_sludge",
				"wwt_KPI_GHG_slu",
			],
			advanced:1,
			otherQuestions:[
				"wwt_slu_storage",
				"wwt_composting",
				"wwt_incineration",
				"wwt_land_application",
				"wwt_landfilling",
				"wwt_stockpiling",
				"wwt_trucks",
			],
		},

		"wwt_slu_storage":{
			variables:[
				"wwt_mass_slu_sto",
				"wwt_time_slu_sto",
				"c_wwt_ch4_pot",
				"wwt_slu_storage_ch4",
				"wwt_KPI_ghg_sto_co2eq",
			],
			advanced:1,
			otherQuestions:[],
		},

		"wwt_composting":{
			variables:[
				"wwt_mass_slu_comp",
				"wwt_slu_composting_ch4",
				"wwt_slu_composting_n2o",
				"wwt_KPI_ghg_comp_co2eq",
			],
			advanced:1,
			otherQuestions:[
			],
		},

		"wwt_incineration":{
			variables:[
				"wwt_mass_slu_inc",
				"wwt_temp_inc",
				"wwt_slu_inciner_ch4",
				"wwt_slu_inciner_n2o",
				"wwt_KPI_ghg_inc_co2eq",
			],
			advanced:1,
			otherQuestions:[
			],
		},

		"wwt_land_application":{
			variables:[
				"wwt_mass_slu_app",
				"wwt_soil_typ",
				"wwt_slu_landapp_n2o",
				"wwt_KPI_ghg_app_co2eq",
			],
			advanced:1,
			otherQuestions:[
			],
		},

		"wwt_landfilling":{
			variables:[
				"wwt_mass_slu_land",
				"wwt_slu_type",
				"wwt_slu_landfill_ch4",
				"wwt_slu_landfill_n2o",
				"wwt_KPI_ghg_land_co2eq",
			],
			advanced:1,
			otherQuestions:[
			],
		},

		"wwt_stockpiling":{
			variables:[
				"wwt_mass_slu_stock",
				"wwt_KPI_ghg_stock_co2eq",
			],
			advanced:1,
			otherQuestions:[
			],
		},

		"wwt_trucks":{
			variables:[
				"wwt_trck_typ",
				"wwt_num_trip",
				"wwt_dist_dis",
				"wwt_KPI_ghg_tsludge",
				"wwt_KPI_ghg_tsludge_co2",
				"wwt_KPI_ghg_tsludge_n2o",
				"wwt_KPI_ghg_tsludge_ch4",
			],
			advanced:1,
			otherQuestions:[],
		},

	//wwd
		"wwd_engines":{
			variables:[
				"wwd_fuel_typ",
				"wwd_vol_fuel",
				"wwd_KPI_GHG_fuel",
				"wwd_KPI_GHG_fuel_co2",
				"wwd_KPI_GHG_fuel_n2o",
				"wwd_KPI_GHG_fuel_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wwd_trucks":{
			variables:[
				"wwd_trck_typ",
				"wwd_vol_trck",
				"wwd_KPI_GHG_trck",
				"wwd_KPI_GHG_trck_co2",
				"wwd_KPI_GHG_trck_n2o",
				"wwd_KPI_GHG_trck_ch4",
			],
			advanced:0,
			otherQuestions:[],
		},

		"wwd_pumping":{
			variables:[
				"wwd_vol_pump",
				"wwd_nrg_pump",
				"wwd_pmp_head",
				"wwd_main_len",
				"wwd_KPI_std_nrg_cons",
			],
			advanced:1,
			otherQuestions:[],
		},
};

//FUNCTIONS for Questions
//check if the "field" is inside questions
Questions.isInside=function(field) {
	//go over all questions
	var code;
	for(var question in this)
	{
		for(var i in this[question].variables)
		{
			code=this[question].variables[i];
			if(field===code) return question;
		}
	}
	return false;
}

//check if the "field" is shown or hidden
Questions.isHidden=function(field) {
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
Questions.getQuestions=function(ubication) {
	var code,questions=[];
	//go over all questions
	for(var question in this)
	{
		if(typeof(this[question])=="function")continue;
		//skip fuel engines questions if anyFuelEngines is zero
		if(Global.General.anyFuelEngines==0)
		{
			if(["wsa_engines","wst_engines","wsd_engines","wwc_engines","wwt_engines","wwd_engines"].indexOf(question)+1)
				continue
		}
		//check all codes inside ubication
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
Questions.isHiddenQuestion=function(field) {
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

//Automatic find repeated variables in Questions
Questions.findRepeated=function() {
	//count how many times appears field in Questions
	function countField(field)
	{
		var n=0;
		//go over all questions
		for(var question in Questions)
		{
			//go over all questions
			for(var i in Questions[question].variables)
			{
				//check if code==field
				if(field==Questions[question].variables[i]) n++;
			}
		}
		return n;
	}
	var repeated=[];
	var code;
	//go over all questions and check that appear 1 time
	for(var question in this)
	{
		for(var i in this[question].variables)
		{
			code=this[question].variables[i];
			if(countField(code)>1) repeated.push(code);
		}
	}
	//remove duplicates
	return repeated.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
}
