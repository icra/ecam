/*constants*/
let Cts={
  ct_ch4_eq:{
    value:34,
    descr:"Conversion for CH4 emissions to CO2 equivalent emissions",
    unit:"kgCO2eq/kgCH4",
  },
  ct_n2o_eq:{
    value:298,
    descr:"Conversion for N2O emissions to CO2 equivalent emissions",
    unit:"kgCO2eq/kgN2O",
  },

  ct_ch4_oc:{
    value:16/12,
    descr:"Organic C to CH4 conversion factor (=16/12)",
    unit:"gCH4/gOC"
  },
  ct_n2o_co:{
    value:44/28,
    descr:"N2O-N to N2O conversion factor (=44/28)",
    unit:"gN2O/gN2O-N",
  },
  ct_co2_C:{
    value:44/12,
    descr:"C to CO2 conversion (=44/12)",
    unit:"gCO2/gC",
  },

  ct_ch4_lf:{  value:50,    unit:"%",            descr:"CH4 in landfill gas, from Clean Development Mechanism, 2008",},
  ct_DOCfra:{  value:80,    unit:"%",            descr:"Decomposable organic fraction of raw wastewater solids (80% from Brown et al., 2008 and Metcalf & Eddy, 2003)",},
  ct_d3y_lf:{  value:69.9,  unit:"%",            descr:"Decomposed % in first 3 years = 69.9%, calculated from CDM equation (UNFCCC/CCNUCC, 2008) for warm, wet conditions",},
  ct_C_seqst:{ value:0.25,  unit:"kgCO2eq/kg",   descr:"Carbon sequestration rate"},

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

  ct_ch4_nrg:{
    value:10,
    descr:"Energy content in 1 m3 of CH4",
    unit:"kWh/m3",
  },

  //constants for sludge management proposed by Girum
  ct_oc_vs:{
    value:0.56,
    descr:"Organic Carbon content in Volatile Solids",
    unit:"gOC/gTVS",
  },

  ct_ch4_up:{
    value:0.025,
    descr:"Percentage of CH4 emission for uncoverd pile",
    unit:"ratio",
  },

  ct_fra_np:{
    value:0.16,
    descr:"Nitrogen in proteins (F_NPR)",
    unit:"kgN/kgProtein",
  },

  ct_fac_nc:{
    value:1.1,
    descr:"Non consumed protein added to the wastewater (F_NON_CON)",
    unit:"adimensional",
  },

  ct_fac_ic:{
    value:1.25,
    descr:"Industrial and commercial co-discharged protein into the sewer (F_IND_COM)",
    unit:"adimensional",
  },

  ct_N_HH:{
    value:1.1,
    descr:"Additional nitrogen from household products added to the wastewater, default is 1.1 (some country data are in new Table 6.10a).",
    unit:"adimensional",
  },

  ct_gravit:{
    value:9810,
    descr:"Specific weight of H2O",
    unit:"kg/(s2*m2)",
  },

  //TODO remove at release
  ct_unused:{
    value:0,
    descr:"not used constant on purpose to test the code that detects unused constants",
    unit:"unit",
  },
};
