/*
  A Question is a list of variables that are hidden if the answer to the
  question is NO

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
let Questions={
  //wsa
    "wsa_engines":{
      variables:[
        "wsa_fuel_typ",
        "wsa_vol_fuel",
        "wsa_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
    },
    "wsa_pumping":{
      variables:[
        "wsa_nrg_pump",
        "wsa_vol_pump",
        "wsa_pmp_head",
        "wsa_pmp_type",
        "wsa_pmp_size",
        "wsa_sta_head",
        "wsa_main_len",
        "wsa_nrg_per_pmp_watr",
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
        "wsa_pmp_pf",
        "wsa_pmp_pw",
        "wsa_KPI_nrg_elec_eff",
        "wsa_pmp_exff",
        "wsa_KPI_std_nrg_newp",
        "wsa_KPI_nrg_cons_new",
        "wsa_KPI_nrg_estm_sav",
        "wsa_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[ ],
    },
    "wsa_costs":{
      variables:[
        "wsa_nrg_cost",
        "wsa_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },
  //wst
    "wst_engines":{
      variables:[
        "wst_fuel_typ",
        "wst_vol_fuel",
        "wst_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
    },
    "wst_treatment_perf":{
      variables:[
        "wst_tst_carr",
        "wst_trea_cap",
        "wst_KPI_capac_util",
        "wst_KPI_tst_carr",
      ],
      advanced:1,
      otherQuestions:[],
    },
    "wst_pumping":{
      variables:[
        "wst_nrg_pump",
        "wst_vol_pump",
        "wst_pmp_head",
        "wst_sta_head",
        "wst_coll_len",
        "wst_KPI_std_nrg_cons",
        "wst_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wst_pumping_eff",
      ],
    },
    "wst_pumping_eff": {
      variables:[
        "wst_pmp_flow",
        "wst_pmp_volt",
        "wst_pmp_amps",
        "wst_pmp_pf",
        "wst_pmp_pw",
        "wst_KPI_nrg_elec_eff",
        "wst_pmp_exff",
        "wst_KPI_std_nrg_newp",
        "wst_KPI_nrg_cons_new",
        "wst_KPI_nrg_estm_sav",
        "wst_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
    },
    "wst_costs":{
      variables:[
        "wst_nrg_cost",
        "wst_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

  //wsd
    "wsd_engines":{
      variables:[
        "wsd_fuel_typ",
        "wsd_vol_fuel",
        "wsd_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wsd_trucks":{
      variables:[
        "wsd_trck_typ",
        "wsd_vol_trck",
        "wsd_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wsd_water_eff":{
      variables:[
        "wsd_auth_con",
        "wsd_bill_con",
        "wsd_SL_water_loss",
        "wsd_SL_nr_water",
        "wsd_KPI_nrg_per_m3",
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
        "wsd_nrg_topo",
        "wsd_nrg_natu",
        "wsd_nrg_mini",
        "wsd_nrg_supp",
        "wsd_KPI_nrg_efficien",
        "wsd_KPI_nrg_topgraph",
      ],
      advanced:1,
      otherQuestions:[],
    },

    "wsd_pumping":{
      variables:[
        "wsd_nrg_pump",
        "wsd_vol_pump",
        "wsd_pmp_head",
        "wsd_pmp_size",
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
        "wsd_pmp_pf",
        "wsd_pmp_pw",
        "wsd_KPI_nrg_elec_eff",
        "wsd_pmp_exff",
        "wsd_KPI_std_nrg_newp",
        "wsd_KPI_nrg_cons_new",
        "wsd_KPI_nrg_estm_sav",
        "wsd_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
    },
    "wsd_costs":{
      variables:[
        "wsd_nrg_cost",
        "wsd_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

  //wwc
    "wwc_engines":{
      variables:[
        "wwc_fuel_typ",
        "wwc_vol_fuel",
        "wwc_KPI_GHG_fuel",
      ],
      advanced:0,
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
        "wwc_pmp_pf",
        "wwc_pmp_pw",
        "wwc_KPI_nrg_elec_eff",
        "wwc_pmp_exff",
        "wwc_KPI_std_nrg_newp",
        "wwc_KPI_nrg_cons_new",
        "wwc_KPI_nrg_estm_sav",
        "wwc_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
    },
    "wwc_costs":{
      variables:[
        "wwc_nrg_cost",
        "wwc_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

  //wwt
    "wwt_engines":{
      variables:[
        "wwt_fuel_typ",
        "wwt_vol_fuel",
        "wwt_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwt_producing_biogas":{
      variables:[
        "wwt_biog_pro",
        "wwt_biog_fla",
        "wwt_biog_val",
        "wwt_biog_lkd",
        "wwt_biog_sold",

        "wwt_ch4_biog",
        "wwt_dige_typ",
        "wwt_fuel_dig",
        "wwt_nrg_biog",

        "wwt_moles_biogas_produced",
        "wwt_biogas_usage",
        "wwt_nrg_biog_val",

        "wwt_ghg_avoided_biogas",

        "wwt_KPI_GHG_dig_fuel",
        "wwt_KPI_GHG_biog",
      ],
      advanced:0,
      otherQuestions:[
      ],
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

    "wwt_pumping":{
      variables:[
        "wwt_nrg_pump",
        "wwt_vol_pump",
        "wwt_pmp_head",
        "wwt_sta_head",
        "wwt_coll_len",
        "wwt_KPI_nrg_per_pump",
        "wwt_KPI_std_nrg_cons",
        "wwt_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wwt_pumping_eff",
      ],
    },

    "wwt_pumping_eff": {
      variables:[
        "wwt_pmp_flow",
        "wwt_pmp_volt",
        "wwt_pmp_amps",
        "wwt_pmp_pf",
        "wwt_pmp_pw",
        "wwt_KPI_nrg_elec_eff",
        "wwt_pmp_exff",
        "wwt_KPI_std_nrg_newp",
        "wwt_KPI_nrg_cons_new",
        "wwt_KPI_nrg_estm_sav",
        "wwt_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
    },

    "wwt_reuse_trucks":{
      variables:[
        "wwt_reus_trck_typ",
        "wwt_reus_vol_trck",
        "wwt_KPI_GHG_reus_trck",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwt_water_reuse":{
      variables:[
        "wwt_wr_N_rec",
        "wwt_wr_P_rec",
        "wwt_ghg_avoided_reuse_water",   //output
      ],
      advanced:1,
      otherQuestions:[],
    },

    "wwt_sludge_mgmt":{
      variables:[
        "wwt_mass_slu",
        "wwt_bod_slud",
        "wwt_KPI_sludg_prod",
        "wwt_KPI_GHG_slu",
        "wwt_ghg_avoided_sequestration",
      ],
      advanced:0,
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
        "wwt_slu_sto_TVS",
        "wwt_slu_sto_f_CH4",
        "wwt_slu_sto_EF",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwt_composting":{
      variables:[
        "wwt_mass_slu_comp", //input
        "wwt_slu_comp_emis_treated_or_piles_covered", //input
        "wwt_slu_comp_solids_content", //input
        "wwt_slu_comp_TVS", //input
        "wwt_slu_comp_N_cont", //input
        "wwt_slu_comp_low_CN_EF", //input

        "wwt_ghg_avoided_sequestration_composting", //output
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwt_incineration":{
      variables:[
        "wwt_mass_slu_inc",
        "wwt_temp_inc",
        "wwt_slu_inc_N_cont",
        "wwt_slu_inc_SNCR",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwt_land_application":{
      variables:[
        "wwt_mass_slu_app",//input
        "wwt_slu_la_solids_content",//input
        "wwt_slu_la_TVS",//input
        "wwt_slu_la_N_cont",//input
        "wwt_slu_la_EF",//input
        "wwt_ghg_avoided_sequestration_landapp",//output
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwt_landfilling":{
      variables:[
        "wwt_mass_slu_land",//input
        "wwt_slu_lf_TVS",//input
        "wwt_slu_lf_N_cont",//input
        "wwt_slu_lf_MCF",//input
        "wwt_slu_lf_low_CN_EF",//input

        "wwt_ghg_avoided_sequestration_landfil",//output
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwt_stockpiling":{
      variables:[
        "wwt_mass_slu_stock",
        "wwt_slu_sp_lifespan",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwt_trucks":{
      variables:[
        "wwt_trck_typ",
        "wwt_vol_tslu",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwt_costs":{
      variables:[
        "wwt_nrg_cost",
        "wwt_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

  //Onsite
    "wwo_engines":{
      variables:[
        "wwo_fuel_typ",
        "wwo_vol_fuel",
        "wwo_KPI_GHG_fuel",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwo_pumping":{
      variables:[
        "wwo_nrg_pump",
        "wwo_vol_pump",
        "wwo_pmp_head",
        "wwo_sta_head",
        "wwo_coll_len",
        "wwo_KPI_std_nrg_cons",
        "wwo_KPI_un_head_loss",
      ],
      advanced:1,
      otherQuestions:[
        "wwo_pumping_eff",
      ],
    },

    "wwo_pumping_eff": {
      variables:[
        "wwo_pmp_flow",
        "wwo_pmp_volt",
        "wwo_pmp_amps",
        "wwo_pmp_pf",
        "wwo_pmp_pw",
        "wwo_KPI_nrg_elec_eff",
        "wwo_pmp_exff",
        "wwo_KPI_std_nrg_newp",
        "wwo_KPI_nrg_cons_new",
        "wwo_KPI_nrg_estm_sav",
        "wwo_KPI_ghg_estm_red",
      ],
      advanced:1,
      otherQuestions:[],
    },

    "wwo_transport":{
      variables:[
        "wwo_trck_typ",
        "wwo_vol_trck",
        "wwo_KPI_GHG_trck",
      ],
      advanced:0,
      otherQuestions:[],
    },

    "wwo_producing_biogas":{
      variables:[
        "wwo_ghg_avoided_biogas",

        "wwo_biog_pro",
        "wwo_biog_fla",
        "wwo_biog_val",
        "wwo_biog_lkd",
        "wwo_biog_sold",

        "wwo_ch4_biog",
        "wwo_dige_typ",
        "wwo_fuel_dig",
        "wwo_nrg_biog",

        "wwo_moles_biogas_produced",
        "wwo_biogas_usage",
        "wwo_nrg_biog_val",

        "wwo_KPI_GHG_dig_fuel",
        "wwo_KPI_GHG_biog",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_landfil":{
      variables:[
        "wwo_mass_landfil",//input
        "wwo_lf_TVS",//input
        "wwo_lf_N_cont",//input
        "wwo_lf_MCF",//input
        "wwo_lf_low_CN_EF",//input

        "wwo_KPI_GHG_landfil",//output
        "wwo_ghg_avoided_landfil",//output
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_landapp":{
      variables:[
        "wwo_mass_landapp",
        "wwo_la_solids_content",
        "wwo_la_TVS",
        "wwo_la_N_cont",
        "wwo_la_N_to_N2O",
        "wwo_KPI_GHG_landapp",
        "wwo_ghg_avoided_landapp",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_dumping":{
      variables:[
        "wwo_vol_dumping",
        "wwo_N_dumping",
        "wwo_ch4_efac_dumping",
        "wwo_n2o_efac_dumping",
        "wwo_KPI_GHG_dumping",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_urine":{
      variables:[
        "wwo_N_urine",//input
        "wwo_N_urine_EF",//input
        "wwo_KPI_GHG_urine",//output
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_reuse":{
      variables:[
        "wwo_reused_N",
        "wwo_reused_P",
        "wwo_ghg_avoided_reuse",
      ],
      advanced:0,
      otherQuestions:[ ],
    },

    "wwo_costs":{
      variables:[
        "wwo_nrg_cost",
        "wwo_run_cost",
      ],
      advanced:0,
      otherQuestions:[ ],
    },
};

/*Questions functions*/

//return the question codes according to an ubication inside "Global".
//ubication is a pointer to a stage, for example "Global.Water.Abstraction[0]"
Questions.get_questions=function(ubication) {
  if(!ubication) return [];

  let questions=[];

  for(let question in this) {
    if(typeof(this[question])=="function") continue;
    //check all codes inside ubication
    for(let i in this[question].variables){
      let code=this[question].variables[i];
      //check if code exists inside ubication
      if(ubication[code]!=undefined){
        questions.push(question);
        break;
      }
    }
  }

  return questions;
};

//is the variable "field" inside a question?
Questions.is_inside=function(field){
  //go over all questions
  for(let question in this){
    for(let i in this[question].variables){
      let code=this[question].variables[i];
      if(field===code){
        return question;
        break;
      }
    }
  }
  return false;
};

//check if variable "field" is shown or hidden according to questions
Questions.is_hidden=function(field, substage){
  if(!substage) return false;

  //go over all questions
  for(let question in this) {
    //if answer is yes, next question: all fields inside should be shown
    if(substage.Configuration.Questions[question]){continue;}

    //if answer is no, look for "field" inside
    for(let i in this[question].variables) {
      let code=this[question].variables[i];
      if(code==field) return true;
    }
  }
  return false;
};

//check if the question "field" should be hidden
Questions.is_question_hidden=function(field, substage){
  if(!substage) return false;

  //go over all questions
  for(let question in this) {
    if(substage.Configuration.Questions[question]==1){continue;}
    //if answer is no, look for "field" inside
    for(let i in this[question].otherQuestions) {
      let code=this[question].otherQuestions[i];
      if(code==field) return true;
    }
  }
  return false;
};

//reset the values and the otherQuestions
Questions.reset_values=function(question, substage){
  if(!substage) throw new Error('substage undefined');

  //reset inputs
  Questions[question].variables.forEach(code=>{
    if(typeof(substage[code])=="number"){
      substage[code]=0;
    }
  });
  //reset related questions RECURSIVELY
  Questions[question].otherQuestions.forEach(key=>{
    Questions.reset_values(key, substage);
  });
};

Questions.find_repeated_variables=function(){
  //count how many times appears field in Questions
  function count(code) {
    let n=0;
    Object.keys(Questions).forEach(question=>{
      if(typeof(Questions[question])=='function') return;
      Questions[question].variables.forEach(v=>{
        if(v==code) n++;
      });
    })
    return n;
  }

  let repeated_variables=[];

  Object.keys(Questions).forEach(question=>{
    if(typeof(Questions[question])=='function') return;
    Questions[question].variables.forEach(code=>{
      if(count(code)>1){
        repeated_variables.push(code);
      }
    });
  });

  return Array.from(new Set(repeated_variables));
};

Questions.find_inexisting_variables=function(){
  let inexisting_variables=[];
  Object.keys(Questions).forEach(question=>{
    if(typeof(Questions[question])=='function') return;
    Questions[question].variables.forEach(code=>{
      if(!locate_variable(code)){
        inexisting_variables.push(code);
      }
    });
  });
  return Array.from(new Set(inexisting_variables));
};
