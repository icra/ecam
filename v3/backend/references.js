/*
  REFERENCES / DOCUMENTATION
  direct links to pdf documents (to specific pages)

  for:
    equations
    estimations
    tables
    constants (TODO)

  Each "code" is an array of objects "{ref,link}" with "link" being optional

  "wxx_code_xxx":[
    {
      ref:"description in plain text",
      link:"url to pdf and page (local or remote resource)",
    },
  ]

*/
let References={
  //Tables
    "type_of_sewer":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.3 updated (page 20)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=20`,
    }],
    "type_of_treatment":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.3 updated (page 20)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=20`,
    }],
    "type_of_water_body":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.3 updated (page 20)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=20`,
    }],

    "N2O EF plants (Table 6.8A)":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.8A (page 39)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=39`,
    }],
    "N2O EF effluent (Table 6.8A)":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.8A (page 39)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=39`,
    }],

    "type_of_treatment_KREM":[{
      ref:`IPCC 2006 (2019 revision), Volume 5, Chapter 6: Wastewater, Table 6.6A (page 27)`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=27`,
    }],

    "Sludge characteristics in each stage of the treatment process":[{
      ref:`Andreoli et al (2007), Table 2.2 (page 21)`,
      link:`frontend/docs/ANDREOLI%20et%20al%202007%20Sludge%20Treatment%20and%20Disposal.pdf#page=21`,
    }],

    "Fuel type":[
      {
        ref:`Introduction`,
        link:`https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf`,
      },
      {
        ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,
        link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`,
      },
      {
        ref:`IPCC 2006, Volume 2, Chapter 3: Mobile Combustion, Table 3.2.2 (page 21)`,
        link:`frontend/docs/2006-ipcc/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf#page=21`,
      },
      {
        ref:`GHG Protocol`,
        link:`https://ghgprotocol.org/sites/default/files/Emission_Factors_from_Cross_Sector_Tools_March_2017.xlsx`,
      },
    ],

    "WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)":[
      {
        ref:`Table 6.6B from 2019 IPCC revision`,
        link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=28",
      },
      {
        ref:`Table 6.10C from 2019 IPCC revision`,
        link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43",
      },
    ],

    "WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)":[
      {
        ref:`Table 6.6B from 2019 IPCC revision`,
        link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=28",
      },
      {
        ref:`Table 6.10C from 2019 IPCC revision`,
        link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43",
      },
    ],
  //Tables (end)

  //Equations and Estimations
    wst_treatment:[
      {ref:"Pre-oxidation (Pre-ox)"},
      {ref:"Coagulation (C)"},
      {ref:"Flocculation (F)"},
      {ref:"Sedimentation (S)"},
      {ref:"Filtration (Filt)"},
      {ref:"Desinfection (Des)"},
    ],
    wsa_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],
    wst_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],
    wsd_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],
    wwc_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],
    wwt_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],
    wwo_KPI_std_nrg_cons:[{ref:"wOp19 (IWA)"}],

    wwt_ghg_avoided_sequestration_landfil:[{
      ref:"Beam page 156 (page 178 in PDF)",
      link:`frontend/docs/beam_final_report_1432.pdf#page=178`,
    }],
    wwo_ghg_avoided_landfil:[{
      ref:"Beam page 156 (page 178 in PDF)",
      link:`frontend/docs/beam_final_report_1432.pdf#page=178`,
    }],

    wwt_ghg_avoided_sequestration_composting:[{
      ref:"Beam page 149 (page 171 in PDF)",
      link:`frontend/docs/beam_final_report_1432.pdf#page=171`,
    }],

    wwt_KPI_GHG_biog:[
      {
        ref:`Sum of emissions from biogas production (biogas flared, valorized and leaked)`
      },
      {
        ref:"IPCC 2006, Volume 5, Chapter 4 Biological treatment of solid waste, equation 4.1, page 5",
        link:"frontend/docs/2006-ipcc/5_Volume5/V5_4_Ch4_Bio_Treat.pdf#page=5",
      },
    ],

    wwt_KPI_GHG_tre:[
      {
        ref:`IPCC 2019 revision, Volume 5, Chapter 6 Wastewater: equation 6.1`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=17`,
      },
      {
        ref:`IPCC 2019 revision, Volume 5, Chapter 6 Wastewater: equations 6.9`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=37`,
      },
    ],

    //total emissions
    wsa_KPI_GHG:[{ref:`Sum of emissions from this substage`}],
    wst_KPI_GHG:[{ref:`Sum of emissions from this substage`}],
    wsd_KPI_GHG:[{ref:`Sum of emissions from this substage`}],
    wwc_KPI_GHG:[{ref:`Sum of emissions from this substage`}],
    wwt_KPI_GHG:[{ref:`Sum of emissions from this substage`}],
    wwo_KPI_GHG:[{ref:`Sum of emissions from this substage`}],


    //indirect electricity
    wsa_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],
    wst_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],
    wsd_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],
    wwc_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],
    wwt_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],
    wwo_KPI_GHG_elec:[{ref:`Conversion from kWh to kgCO2eq using the emission factor for grid electricity`}],

    //fuel engines
    wsa_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],
    wst_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],
    wsd_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],
    wwc_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],
    wwt_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],
    wwo_KPI_GHG_fuel:[{ref:`IPCC 2006, Volume 2, Chapter 2: Stationary Combustion, Table 2.2 (page 16)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf#page=16`}],

    //truck engines
    wsd_KPI_GHG_trck         :[{ref:`IPCC 2006, Volume 2, Chapter 3: Mobile Combustion, Table 3.2.2 (page 21)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf#page=21`}],
    wwt_KPI_GHG_reus_trck    :[{ref:`IPCC 2006, Volume 2, Chapter 3: Mobile Combustion, Table 3.2.2 (page 21)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf#page=21`}],
    wwt_KPI_GHG_slu_transport:[{ref:`IPCC 2006, Volume 2, Chapter 3: Mobile Combustion, Table 3.2.2 (page 21)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf#page=21`}],
    wwo_KPI_GHG_trck         :[{ref:`IPCC 2006, Volume 2, Chapter 3: Mobile Combustion, Table 3.2.2 (page 21)`,link:`frontend/docs/2006-ipcc/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf#page=21`}],

    //misc: service levels indicators
    wsa_nrg_per_abs_watr:[{ref:`Ratio: [total kWh consumed]/[m3 abstracted water]`}],
    wsa_nrg_per_pmp_watr:[{ref:`Ratio: [kWh consumed by pumps]/[m3 pumped water]`}],
    wst_nrg_per_m3:[{ref:`Ratio: [total kWh consumed]/[m3 treated water]`}],
    wst_KPI_slu_per_m3:[{ref:`Ratio: [kg sludge produced]/[m3 treated water]`}],

    wwt_tn_effl:[{
      ref:`Table 6.10C from 2019 IPCC revision`,
      link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43",
    }],

    wwt_bod_effl:[{
      ref:`Table 6.6B from 2019 IPCC revision`,
      link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=28",
    }],

    wwo_bod_effl:[{
      ref:`Table 6.6B from 2019 IPCC revision`,
      link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=28",
    }],

    wwt_biog_pro:[{
      ref:`
        The estimation is based on the dry mass of sludge produced (equations
        from section 2.2 - GHG calculations of Bridle model process sludge
        digestion, Laura Snip thesis, page 19).
        Volume of biogas produced per kg of VSS destroyed
        estimated according to Andreoli et al.
      `,
      link:``,   //link to doi for example
    }],

    wwt_slu_sto_EF:[
      {ref:`3% = emission factor due to storage between 5 and 20 days.`},
      {ref:`5% = emission factor due to storage more than 20 days.`},
    ],

    wwt_KPI_GHG_slu_composting:[
      {
        ref:`Section 12.8 "Composting", Beam page 147 (page 169 in PDF)`,
        link:`frontend/docs/beam_final_report_1432.pdf#page=169`,
      },
    ],

    wwt_KPI_GHG_slu_land_application:[
      {
        ref:`Section 12.11 "Land application", Beam page 166 (page 188 in PDF)`,
        link:`frontend/docs/beam_final_report_1432.pdf#page=188`,
      },
    ],

    wwt_KPI_GHG_slu_landfilling:[
      {
        ref:`Section 12.9 "Landfill disposal", page 153, Beam methodology document (page 175 in PDF)`,
        link:`frontend/docs/beam_final_report_1432.pdf#page=175`,
      },
    ],

    wwt_KPI_GHG_slu_incineration:[{
      ref:`Section 12.10 "Combustion (Incineration)", Beam, page 161 (page 183 in PDF)`,
      link:`frontend/docs/beam_final_report_1432.pdf#page=183`,
    }],

    wwt_mass_slu:[{
      ref:"'S_mass' in eq.6.3B from IPCC 2006 (2019 revision)",
      link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=27",
    }],

    wwt_bod_slud:[{
      ref:"'Sj' in eq.6.1 from IPCC 2006 (2019 revision)",
      link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=17",
    }],

    wwt_KPI_GHG_slu_stockpilling:[{
      ref:"Majumder, R., Livesley, S., Gregory, D., & Arndt, S. (2014, 05 15). Biosolids stockpiles are a significant point source for greenhouse gas emissions. Journal of Environmental Management, 143, pp. 34-43.",
      link:"https://doi.org/10.1016/j.jenvman.2014.04.016",
    }],

    wwo_KPI_GHG_urine:[{
      ref:"IPCC-2006, Chapter 11, page 11, table 11.1: 'Default emission factors to estimate direct N2O emissions from managed soils'.",
      link:"frontend/docs/2006-ipcc/4_Volume4/V4_11_Ch11_N2O&CO2.pdf#page=11",
    }],
    wwo_N_urine_EF:[{
      ref:"Default value 0.01 from IPCC-2006, Chapter 11, page 11, table 11.1: 'Default emission factors to estimate direct N2O emissions from managed soils'.",
      link:"frontend/docs/2006-ipcc/4_Volume4/V4_11_Ch11_N2O&CO2.pdf#page=11",
    }],

    wwt_slu_lf_low_CN_EF:[{ref:"1.5% from Brown et al, 2008"}],
    wwt_slu_comp_low_CN_EF:[{ref:"1.5% from Brown et al, 2008"}],
    wwo_lf_low_CN_EF:[{ref:"1.5% from Brown et al, 2008"}],

    wwt_slu_lf_uncertainty:[{ref:"0.9 from UNFCCC/CCNUC, 2008"}],
    wwo_lf_uncertainty:[{ref:"0.9 from UNFCCC/CCNUC, 2008"}],

    wwt_slu_comp_uncovered_pile_EF:[{ref:"2.5% from Brown et al, 2008"}],
    wwt_slu_lf_CH4_in_gas:[{ref:"50% from Clean Development Mechanism, 2008"}],
    wwo_lf_CH4_in_gas:[{ref:"50% from Clean Development Mechanism, 2008"}],

    wwt_slu_lf_decomp_3yr:[{ref:"69.9% from CDM equation (UNFCCC/CCNUC, 2008) for warm, wet conditions (landiflls creates warm, wet conditions)"}],
    wwo_lf_decomp_3yr:[{ref:"69.9% from CDM equation (UNFCCC/CCNUC, 2008) for warm, wet conditions (landiflls creates warm, wet conditions)"}],

    wwt_slu_lf_DOCf:[{ref:"80% from Brown et al., 2008 and Metcalf & Eddy, 2003"}],
    wwo_lf_DOCf:[{ref:"80% from Brown et al., 2008 and Metcalf & Eddy, 2003"}],

    wwt_slu_la_seqst_rate:[{ref:"0.25 from BEAM authors estimate based on data from BC reclamation site"}],
    wwt_slu_comp_seqst_rate:[{ref:"0.25 from BEAM authors estimate based on data from BC reclamation site"}],
    wwo_la_seqst_rate:[{ref:"0.25 from BEAM authors estimate based on data from BC reclamation site"}],

    wwc_tn:[{
      ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
    }],
    wwt_tn_infl:[{
      ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
    }],
    wwo_opd_tn:[{
      ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
    }],

    wwc_bod:[{
      ref:`Equation 6.3, Total Organically degradable material in domestic wastewater`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=21`,
    }],
    wwt_bod_infl:[{
      ref:`Equation 6.3, Total Organically degradable material in domestic wastewater`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=21`,
    }],
    wwo_bod_cont:[{
      ref:`Equation 6.3, Total Organically degradable material in domestic wastewater`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=21`,
    }],

    conv_kwh_co2:[{
      ref:`EIB Methodologies for the Assessment of Project GHG Emissions and Emission Variations, 2020`,
      link:`https://www.eib.org/attachments/strategies/eib_project_carbon_footprint_methodologies_en.pdf#page=36`,
    }],
    prot_con:[{
      ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
    }],
    bod_pday:[
      {
        ref:`Equation 6.3, Total Organically degradable material in domestic wastewater`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=21`,
      },
      {
        ref:`Table 6.4 'ESTIMATED BOD5 VALUES IN DOMESTIC WASTEWATER FOR SELECTED REGIONS AND COUNTRIES'`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=22`,
      }
    ],

    F_NON_CON:[
      {
        ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
      },
      {
        ref:"Table 6.10A 'DEFAULT FACTORS FOR DOMESTIC WASTEWATER', IPCC 2006, 2019 revision, Volume 5, Chapter 6 Wastewater",
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=41`,
      },
      {
        ref:"Table 6.11 'N2O METHODOLOGY DEFAULT DATA', IPCC 2006, 2019 revision, Volume 5, Chapter 6 Wastewater",
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43`,
      },
    ],
    F_IND_COM:[
      {
        ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
      },
      {
        ref:"Table 6.11 'N2O METHODOLOGY DEFAULT DATA', IPCC 2006, 2019 revision, Volume 5, Chapter 6 Wastewater",
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43`,
      },
    ],
    N_HH:[
      {
        ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
      },
      {
        ref:"Table 6.10A 'DEFAULT FACTORS FOR DOMESTIC WASTEWATER', IPCC 2006, 2019 revision, Volume 5, Chapter 6 Wastewater",
        link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=41`,
      },
    ],
    ct_F_NPR:[{
      ref:`Equation 6.10, Total Nitrogen in domestic wastewater by treatment pathway`,
      link:`frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=40`,
    }],

    ct_N_reused_credit:[{ref:"Recycled Organics Unit, 2006"}],
    ct_P_reused_credit:[{ref:"Recycled Organics Unit, 2006"}],
    ct_ch4_nrg:[{
      ref:"The Physics Hypertextbook, Chemical Potential Energy",
      link:"https://physics.info/energy-chemical",
    }],

    wwt_nrg_biog:[{
      ref:`
        The estimation assumes a 43% of efficiency with respect to the
        theoretical maximum energy. Page 2857 from Corominas, L., Flores-Alsina, X., Snip,
        L., Vanrolleghem, P.A., 2012.  Comparison of Different Modeling
        Approaches to Better Evaluate Greenhouse Gas Emissions From Whole
        Wastewater Treatment Plants. Biotechnol. Bioeng.  109, 1–10.
      `,
      link:"https://doi.org/10.1002/bit.24544",
    }],
  //Equations and Estimations (end)
};
