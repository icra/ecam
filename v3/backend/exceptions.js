/*
  - 'exceptions' are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option.
*/
let Exceptions={
  wwc_ch4_efac_col:{ table:"type_of_sewer",      table_field:function(){return "ch4_efac"}, },
  wwc_ch4_efac_cso:{ table:"type_of_water_body", table_field:function(){return "ch4_efac"}, },
  wwt_ch4_efac_tre:{ table:"type_of_treatment",  table_field:function(){return "ch4_efac"}, },
  wwt_ch4_efac_dis:{ table:"type_of_water_body", table_field:function(){return "ch4_efac"}, },

  wwo_ch4_efac_con:{ //depends on ch4_efac_flooding
    table:"Type of containment",
    table_field:function(stage){
      if(stage.wwo_flooding){
        return "ch4_efac_flooding";
      }else{
        return "ch4_efac";
      }
    },
  },

  wwo_ch4_efac_unt:{ table:"type_of_water_body", table_field:function(){return "ch4_efac"}, },
  wwo_ch4_efac_dis:{ table:"type_of_water_body", table_field:function(){return "ch4_efac"}, },

  wwt_bod_slud:{
    table:"type_of_treatment",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},
    percent_of:function(stage){
      return stage.wwt_bod_infl;
    },
  },

  wwo_fdensity:{    table:"Type of containment", table_field:function(){return "fs_density"}, },
  wwo_bod_conc_fs:{ table:"Type of containment", table_field:function(){return "BOD_conc_FS"}, },
};
