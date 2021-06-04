/*
  - 'exceptions' are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option.
*/
let Exceptions={
  wwc_ch4_efac_col:{table:"type_of_sewer",                table_field(){return "ch4_efac"}},
  wwc_ch4_efac_cso:{table:"type_of_water_body",           table_field(){return "ch4_efac"}},
  wwc_n2o_efac_cso:{table:"N2O EF effluent (Table 6.8A)", table_field(){return "n2o_efac"}},

  wwo_ch4_efac_dumping:{table:"type_of_water_body",           table_field(){return "ch4_efac"}},
  wwo_n2o_efac_dumping:{table:"N2O EF effluent (Table 6.8A)", table_field(){return "n2o_efac"}},
  wwo_n2o_efac_opd:{    table:"N2O EF effluent (Table 6.8A)", table_field(){return "n2o_efac"}},

  wwt_slu_sto_TVS:{  table:"Type of sludge disposed", table_field(){return "TVS"}},
  wwt_slu_sto_f_CH4:{table:"Type of sludge disposed", table_field(){return "f_ch4"}},

  wwt_slu_comp_TVS:{   table:"Type of sludge disposed", table_field(){return "TVS"}},
  wwt_slu_comp_N_cont:{table:"Type of sludge disposed", table_field(){return "N_cont"}},

  wwt_slu_inc_N_cont:{table:"Type of sludge disposed", table_field(){return "N_cont"}},

  wwt_slu_la_TVS:{   table:"Type of sludge disposed", table_field(){return "TVS"}},
  wwt_slu_la_N_cont:{table:"Type of sludge disposed", table_field(){return "N_cont"}},
  wwt_slu_la_EF:{    table:"Soil type",               table_field(){return "f_la"}},

  wwt_slu_lf_TVS:{   table:"Type of sludge disposed", table_field(){return "TVS"}},
  wwt_slu_lf_N_cont:{table:"Type of sludge disposed", table_field(){return "N_cont"}},
  wwt_slu_lf_MCF:{table:"Type of landfill", table_field(){return "MCF"}},
  wwo_lf_MCF:{table:"Type of landfill", table_field(){return "MCF"}},

  wwo_la_N_to_N2O:{
    table:"Soil type",
    table_field:function(){return "f_la"},
  },
  wwo_la_N_cont:{
    table:"Type of faecal sludge",
    table_field:function(){return "N_content"},
  },
  wwo_lf_N_cont:{
    table:"Type of faecal sludge",
    table_field:function(){return "N_content"},
  },
  wwo_lf_TVS:{
    table:"Type of faecal sludge",
    table_field:function(){return "TVS"},
  },
  wwo_mass_landapp:{
    table:"Type of faecal sludge",
    table_field:function(){return "total_solids"},
    percent_of:function(stage){return stage.wwo_fslu_emp*stage.wwo_fdensity},
  },

  wwo_bod_slud:{
    table:"Type of onsite treatment",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},
    percent_of:function(stage){return stage.wwo_bod_infl},
  },

  //wwt effluent BOD estimation
  wwt_bod_effl:{
    table:"WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)",
    table_field:function(){return "bod_effl"},
    percent_of:function(stage){return stage.wwt_bod_infl},
  },

  //wwo effluent BOD estimation
  wwo_bod_effl:{
    table:"WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)",
    table_field:function(){return "bod_effl"},
    percent_of:function(stage){return stage.wwo_bod_infl},
  },

  wwo_bod_rmvd:{
    table:"WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)",
    table_field:function(){return "bod_rmvd"},
    percent_of:function(stage){return stage.wwo_bod_cont},
  },

  //wwt effluent TN estimation
  wwt_tn_effl:{
    table:"WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)",
    table_field:function(){return "N_effl"},
    percent_of:function(stage){return stage.wwt_tn_infl},
  },

  //wwo effluent TN estimation
  wwo_tn_effl:{
    table:"WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)",
    table_field:function(){return "N_effl"},
    percent_of:function(stage){return stage.wwo_tn_infl},
  },

  //Emission Factors (EF)
  wwt_ch4_efac_tre:{table:"type_of_treatment",            table_field:function(){return "ch4_efac"}, },
  wwt_ch4_efac_dis:{table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },
  wwt_n2o_efac_tre:{table:"N2O EF plants (Table 6.8A)",   table_field:function(){return "n2o_efac"}, },
  wwt_n2o_efac_dis:{table:"N2O EF effluent (Table 6.8A)", table_field:function(){return "n2o_efac"}, },
  wwo_n2o_efac_tre:{table:"N2O EF plants (Table 6.8A)",   table_field:function(){return "n2o_efac"}, },
  wwo_n2o_efac_dis:{table:"N2O EF effluent (Table 6.8A)", table_field:function(){return "n2o_efac"}, },
  wwo_ch4_efac_dis:{table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },

  wwo_ch4_efac_con:{
    table:"Type of containment",
    table_field:function(stage){
      if(stage && stage.wwo_flooding){
        return "ch4_efac_flooding"
      }else{
        return "ch4_efac"
      }
    },
  },

  wwo_ch4_efac_tre:{
    table:"Type of onsite treatment",
    table_field:function(stage){return "ch4_efac"},
  },

  wwt_bod_slud:{
    table:"REMOVAL OF ORGANIC COMPONENT FROM WASTEWATER AS SLUDGE (KREM) ACCORDING TO TREATMENT TYPE (Table 6.6A)",
    table_field:function(){return "K_rem"},
    table_field_unit:function(){return "kgBOD/kg dry mass sludge"},
    conversion:function(stage){return stage.wwt_mass_slu},
  },

  wwt_mass_slu:{
    table:"Sludge characteristics in each stage of the treatment process",
    table_field:function(){return "gSS_inh_day"},
    table_field_unit:function(){return "gSS/inhabitant/day"},
    conversion:function(stage){
      //convert gSS/inh/day to kgSS
      let pop  = stage.wwt_serv_pop; //population
      let days = Global.Days();      //days
      return pop*days/1000;
    },
  },

  wwo_fdensity:{    table:"Type of containment", table_field:function(){return "fs_density" },},
  wwo_bod_conc_fs:{ table:"Type of containment", table_field:function(){return "BOD_conc_FS"},},
};
