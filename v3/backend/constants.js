/*constants*/
let Cts={
  ct_ch4_eq:{
    value:34,
    descr:"Conversion of CH4 emissions to CO2 equivalent emissions",
    unit:"kgCO2eq/kgCH4",
  },
  ct_n2o_eq:{
    value:298,
    descr:"Conversion of N2O emissions to CO2 equivalent emissions",
    unit:"kgCO2eq/kgN2O",
  },

  ct_C_to_CH4_16_12:{
    value:16/12,
    descr:"Organic C to CH4 conversion factor (=16/12)",
    unit:"gCH4/gOC"
  },
  ct_N_to_N2O_44_28:{
    value:44/28,
    descr:"N2O-N to N2O conversion factor (=44/28)",
    unit:"gN2O/gN2O-N",
  },
  ct_C_to_CO2_44_12:{
    value:44/12,
    descr:"C to CO2 conversion (=44/12)",
    unit:"gCO2/gC",
  },

  ct_N_reused_credit:{value:4, descr:"Credit for N recovered replacing commercial N fertilizer (Recycled Organics Unit, 2006)", unit:"kgCO2eq/kgN"},
  ct_P_reused_credit:{value:2, descr:"Credit for P recovered replacing commercial P fertilizer (Recycled Organics Unit, 2006)", unit:"kgCO2eq/kgP"},

  ct_ch4_nrg:{
    value:10,
    descr:"Energy content in 1 Nm3 of CH4",
    unit:"kWh/Nm3",
  },

  ct_VS_to_OC:{
    value:0.56,
    descr:"Organic Carbon content in Volatile Solids",
    unit:"gOC/gVS",
  },

  ct_F_NPR:{
    value:0.16,
    descr:"Nitrogen in proteins (F_NPR)",
    unit:"kgN/kgProtein",
  },

  ct_gravit:{
    value:9810,
    descr:"Specific weight of H2O",
    unit:"kg/(s2·m2)",
  },

  /*
  ct_unused:{
    value:0,
    descr:"not used constant on purpose to test the code that detects unused constants",
    unit:"unit",
  },
  */
};
