/*
  - 'exceptions' are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option.
*/

let Exceptions={
  wwc_ch4_efac_col:{
    table:"type_of_sewer",
    table_field:function(){return "ch4_efac"},
  },
  wwc_ch4_efac_cso:{
    table:"type_of_water_body",
    table_field:function(){return "ch4_efac"},
  },
  wwt_ch4_efac:{
    table:"type_of_treatment",
    table_field:function(){return "ch4_efac"},
  },
  wwd_ch4_efac:{
    table:"type_of_water_body",
    table_field:function(){return "ch4_efac"},
  },
  fsc_ch4_efac:{ //depends on ch4_efac_flooding
    table:"fsc_type_tre",
    table_field:function(){
      if(Global.Waste.Collection.fsc_flooding){
        return "ch4_efac_flooding";
      }else{
        return "ch4_efac";
      }
    },
  },
  fst_ch4_efac:{
    table:"fst_type_tre",
    table_field:function(){return "ch4_efac"},
  },
  fsr_ch4_efac:{
    table:"fsr_ch4_efac",
    table_field:function(){return "ch4_efac"},
  },
  fsr_ch4_efac_dumping:{
    table:"fsr_dumping_pth",
    table_field:function(){return "ch4_efac"},
  },

  //BOD removed as sludge
  wwt_bod_slud:{
    table:"type_of_treatment",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},
    percent_of:function(){
      return Global.Waste.Treatment.wwt_bod_infl;
    },
  },

  fst_bod_slud:{
    table:"fst_type_tre",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},
    percent_of:function(){
      return Global.Waste.Onsite.fst_bod_infl;
    },
  },

  fsc_fdensity:{
    table:"fsc_type_tre",
    table_field:function(){return "fs_density"},
  },

  fsc_bod_conc_fs:{
    table:"fsc_type_tre",
    table_field:function(){return "BOD_conc_FS"},
  },

  fsr_bod_conc_fs:{
    table:"fsc_type_tre",
    table_field:function(){return "BOD_conc_FS"},
  },
};
