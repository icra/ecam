/*constants*/
let Cts={
  ct_ch4_lf:{  value:50,    descr:"CH4 in landfill gas",                                    unit:"%", },
  ct_DOCfra:{  value:80,    descr:"Decomposable organic fraction of raw wastewater solids", unit:"%",},
  ct_d3y_lf:{  value:69.9,  descr:"Decomposed % in first 3 years",                          unit:"%"},
  ct_lf_unc:{  value:0.9,   descr:"Landfill uncertainty factor",                            unit:"adimensional"},
  ct_ch4_C: {  value:4/3,   descr:"C to CH4 conversion factor (16/12)",                     unit:"kgCH4/kgC"},
  ct_n2o_lf:{  value:1.5,   descr:"N2O landfill emissions for low C:N ratio",               unit:"%", },
  ct_co2_C:{   value:44/12, descr:"C to CO2 conversion (44/12)",                            unit:"kgCO2/kgC", },
  ct_u_org_f:{ value:0.2,   descr:"Undecomposable organic fraction",                        unit:"no unit", },
  ct_C_seqst:{ value:0.25,  descr:"Carbon sequestration rate",                              unit:"kgCO2eq/kg", },

  ct_cr_forN:{
    value:4,
    descr:"Credit for Nitrogen",
    unit:"kgCO2/kgN",
  },
  ct_cr_forP:{
    value:2,
    descr:"Credit for Phosphorus",
    unit:"kgCO2/kgP",
  },

  ct_fs_prod:{
    value:0.3,
    descr:"Faecal sludge production per person per day",
    unit:"kg/person/day",
  },

  ct_ch4_nrg:{
    value:10,
    descr:"Energy content of 1 m3 of CH4",
    unit:"kWh/m3",
  },

  ct_ch4_eq:{
    value:34,
    descr:"Conversion for CH4 emissions to CO2 equivalent emissions",
    unit:"kg CO2eq / kg CH4",
  },

  ct_n2o_eq:{
    value:298,
    descr:"Conversion for N2O emissions to CO2 equivalent emissions",
    unit:"kg CO2eq / kg N2O",
  },

  //constants for sludge management proposed by Girum
  ct_oc_vs:{value:0.56,descr:"Organic Carbon content in Volatile Solids",unit:"g OC / g TVS"},

  //TODO they are already in the table "wwt_slu_disp"
  ct_vs_dig:{value:0.51,descr:"Volatile Solids content in Digested Sludge",unit:"g TVS / g sludge"},
  ct_vs_slu:{value:0.70,descr:"Volatile Solids content in not Digested Sludge",unit:"g TVS / g sludge"},
  //TODO

  ct_ch4_oc:{value:1.3,descr:"C to CH4 conversion factor",unit:"g CH4 / g OC"},
  ct_ch4_up:{value:0.025,descr:"Percentage of CH4 emission for uncoverd pile",unit:"ratio"},

  ct_bod_kg:{
    value:0.8,
    descr:"Ratio BOD entering the plant / dry weight of organic matter in the sludge collected",
    unit:"g VS / g BOD load",
  },

  ct_biog_g:{
    value:0.4,
    descr:"Biogas produced (NL) per g of organic matter contained in the sludge",
    unit:"NL / gVS",
  },

  ct_ch4_lo:{
    value:2,
    descr:"Percentage of methane losses",
    unit:"%",
  },

  ct_ch4_m3:{
    value:0.66,
    descr:"Kg CH4/m3",
    unit:"kg CH4/m3",
  },

  ct_fra_np:{
    value:0.16,
    descr:"Fraction of nitrogen in proteins",
    unit:"kg N/kg protein",
  },

  ct_fac_nc:{
    value:1.1,
    descr:"Factor for non consumed protein added to the wastewater",
    unit:"adimensional",
  },

  ct_fac_ic:{
    value:1.25,
    descr:"Factor for industrial and commercial co-discharged protein into the sewer",
    unit:"adimensional",
  },

  ct_ef_eff:{
    value:0.005,
    descr:"EF effluent (tabled value)",
    unit:"kg N2O-N / kg N",
  },

  ct_n2o_co:{
    value:44/28,
    descr:"Conversion from N2O-N to N2O (=44/28)",
    unit:"kg N2O / kg N2O-N",
  },

  ct_gravit:{
    value:9810,
    descr:"Specific weight of H2O",
    unit:"kg/(s2*m2)",
  },
};
