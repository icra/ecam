var Cts = {
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
    descr:"Conversion for CH<sub>4</sub> emissions to CO<sub>2</sub> equivalent emissions",
    unit:"kg CO<sub>2</sub>eq / kg CH<sub>4</sub>",
  },

  ct_n2o_eq:{
    value:298,
    descr:"Conversion for N<sub>2</sub>O emissions to CO<sub>2</sub> equivalent emissions",
    unit:"kg CO<sub>2</sub>eq / kg N<sub>2</sub>O",
  },

  //constants for sludge management proposed by Girum
  ct_oc_vs:{value:0.56,descr:"Organic Carbon content in Volatile Solids",unit:"g OC / g TVS"},
  ct_vs_dig:{value:0.51,descr:"Volatile Solids content in Digested Sludge",unit:"g TVS / g sludge"},
  ct_vs_slu:{value:0.70,descr:"Volatile Solids content in not Digested Sludge",unit:"g TVS / g sludge"},
  ct_ch4_oc:{value:1.3,descr:"C to CH<sub>4</sub> conversion factor",unit:"g CH<sub>4</sub> / g OC"},
  ct_ch4_up:{value:0.025,descr:"Percentage of CH<sub>4</sub> emission for uncoverd pile",unit:"ratio"},

  /*
    50:   % of CH<sub>4</sub> in landfill gas (ct_ch4_lf)
    80:   % DOCf -the decomposable organic fraction of raw wastewater solids (ct_slu_lafl_decp_%)
    69.9: % decomposed in first 3 years (ct_slu_lafl_decp_3yr)
  */

  ct_n2o_efp:{
    value:3.2,
    descr:"N<sub>2</sub>O emission factor",
    unit:"g N<sub>2</sub>O/person/year",
  },

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
    descr:"Kg CH<sub>4</sub>/m3",
    unit:"kg CH<sub>4</sub>/m3",
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
    unit:"kg N<sub>2</sub>O-N / kg N",
  },

  ct_n2o_co:{
    value:44/28,
    descr:"Conversion factor N<sub>2</sub>O-N to N<sub>2</sub> (=44/28)",
    unit:"kg N<sub>2</sub>O / kg N<sub>2</sub>O-N",
  },

  ct_gravit:{
    value:9810,
    descr:"Specific weight of H<sub>2</sub>O",
    unit:"kg/(s2*m2)",
  },
}
