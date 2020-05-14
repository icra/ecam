/*
  - 'exceptions' are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option.

  - each selection is stored in Configuration.Selected
*/

let Exceptions={

  //CH4 emission factors [OK]
  ww_ch4_efac_unt:{
    table:"ww_ch4_efac",
    table_field:function(){return "ch4_efac"},
  },
  ww_ch4_efac_unc:{
    table:"ww_ch4_efac",
    table_field:function(){return "ch4_efac"},
  },
  wwt_ch4_efac:{
    table:"wwt_type_tre",
    table_field:function(){return "ch4_efac"},
  },
  wwd_ch4_efac:{
    table:"ww_ch4_efac",
    table_field:function(){return "ch4_efac"},
  },
  fsc_ch4_efac:{ //depends on ch4_efac_flooding
    table:"fsc_type_tre",
    table_field:function(){
      if(Global.Faecl.Containment.fsc_flooding){
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
  wwt_bod_slud:{ //TODO difficult
    table:"wwt_type_tre",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},
    percent_of:function(){
      return Global.Waste.Treatment.wwt_bod_infl;
    },

    /*
    Object.keys(Tables.wwt_type_tre).forEach(key=>{
      option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
    });
    */
  },
  fst_bod_slud:{ //TODO difficult
    table:"fst_type_tre",
    table_field:function(){return "bod_rmvd_as_sludge_estm"},

    percent_of:function(){
      return Global.Faecl.Treatment.fst_bod_infl;
    },

    /*
    Object.keys(Tables.fst_type_tre).forEach(key=>{
      option.innerHTML=translate(key)+" ["+bod_rmvd_perc+"%] &rarr; ("+format(value)+")";
    });
    */
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

//save exceptions inside global to make them searchable for the function
//'outputsPerInput' (in 'formulas.js')
Global.Exceptions=Exceptions;

//default values for exceptions
Object.keys(Exceptions).forEach(key=>{Global.Configuration.Selected[key]=""});
Global.Configuration.Selected.ww_ch4_efac_unt="Sea and aerobic water bodies";
Global.Configuration.Selected.ww_ch4_efac_unc="Stagnant sewer and anaerobic water bodies";
