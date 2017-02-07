var Cts = 
{
	ct_bod_kg:{
		descr:"Ratio BOD entering the plant / dry weight of organic matter in the sludge collected",
		value:0.8,
		unit:"g VS / g BOD load",
	},

	ct_biog_g:{
		descr:"Biogas produced (NL) per g of organic matter contained in the sludge",
		value:0.4,
		unit:"NL / gVS",
	},

	ct_ch4_lo:{
		descr:"Percentage of methane losses",
		value:2,
		unit:"%",
	},

	ct_ch4_m3:{
		descr:"Kg CH4/m3",
		value:0.66,
		unit:"kg CH4/m3",
	},

	ct_ch4_eq:{
		descr:"Conversion for CH4 emissions to CO2 equivalent emissions",
		value:34,
		unit:"kg CO2 / kg CH4",
	},

	ct_fra_np:{
		descr:"Fraction of nitrogen in proteins",
		value:0.16,
		unit:"kg N/kg protein",
	},

	ct_fac_nc:{
		descr:"Factor for non consumed protein added to the wastewater",
		value:1.1,
		unit:"adimensional",
	},

	ct_fac_ic:{
		descr:"Factor for industrial and commercial co-discharged protein into the sewer",
		value:1.25,
		unit:"adimensional",
	},

	ct_ef_eff:{
		descr:"EF effluent (tabled value)",
		value:0.005,
		unit:"kg N2O-N / kg N2O",
	},

	ct_n2o_co:{
		descr:"Conversion factor N2O-N to N2O (=44/28)",
		value:44/28,
		unit:"kg N2O / kg N2O-N",
	},

	ct_n2o_eq:{
		descr:"Conversion for N2O emissions to CO2 equivalent emissions",
		value:298,
		unit:"kg CO2 / kg N2O",
	},

	ct_ch4_ef:{
		descr:"EF. This comes from the multiplication of Bo (kg CH4/kg BOD) (=0.6) x MCFj (=0.1, for direct discharge into a river, lake or sea)",
		value:0.06,
		unit:"kg CH4 / kg BOD",
	},
	ct_gravit:{
		descr:"Specific weight of H2O",
		value:9810,
		unit:"kg/(s2*m2)",
	},
}
