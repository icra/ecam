/*
  REFERENCES / DOCUMENTATION

  for:
    equations
    constants
    tables

  from documents, include title and page

  This part is not translated by frontend

  TODO add all references we have to this file
*/
let References={
  //template
  code:{
    ref:``,    //description in plain text
    link:``,   //link to doi for example
    pdf:{      //link to pdf "www.example.com/file.pdf#page=14" | https://helpx.adobe.com/acrobat/kb/link-html-pdf-page-acrobat.html
      text:``,
      link:``,
    },
  },

  wwt_tn_effl:{
    ref:`Table 6.10C from 2019 IPCC revision`,
    link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=43",
  },

  wwt_bod_effl:{
    ref:`Table 6.6B from 2019 IPCC revision`,
    link:"frontend/docs/2019-ipcc/5_Volume5/19R_V5_6_Ch06_Wastewater.pdf#page=28",
  },

  wwt_biog_pro:{
    ref:`
      The estimation is based on the dry mass of sludge produced (equations
      from section 2.2 - GHG calculations of Bridle model process sludge
      digestion, Laura Snip PhD thesis, page 19).
      Volume of biogas produced per kg of VSS destroyed
      estimated according to Andreoli et al.
    `,
    link:``,   //link to doi for example
  },

  wwt_KPI_GHG_slu_storage:{
    ref:`
      0.03 = emission factor due to storage between 5 and 20 days.
      0.05 = emission factor due to storage more than 20 days.
    `,
    link:``,
  },

  wwt_KPI_GHG_slu_composting:{
    ref:`
      For N2O:
        0.03  = % N.
        0.015 = N2O emissions for low C: N [% of initial N in solids (1.5%)].
    `,
    link:``,
  },

  wwt_KPI_GHG_slu_landfilling:{
    ref:`
      For CO2 ratio:
        0.02 = % of CO2 emission to the atmosphere form the sludge sent to the land application (page 158, beam methodology document).
      For CH4:
        0.9  = model uncertainty factor (from UNFCCC/CCNUC, 2008).
        0.5  = % of CH4 in landfill (50%).
        0.8  = % of the decomposable organic fraction of raw wastewater solids (80%).
        0.69 = % decomposed in first 3 years (69.9).
      For N2O:
        0.03  = % N (sludge not digested).
        0.015 = N2O emissions for low C: N (% of initial N in solids).
        0.04  = % N (sludge digested).
    `,
    link:`
    `,
  },

  wwt_KPI_GHG_slu_land_application:{
    ref:`
      0.023 = % of N that goes to N2O, for fine-textured soils (2.3%).
      0.005 = % of N that goes to N2O, for coarse textured soils (0.05%).
    `,
    link:"",
  },

  wwt_KPI_GHG_slu_incineration:{
    ref:`
      η = 161.3-0.140Tf,
      Where η is the % of total N that is volatilized as N2O and Tf is the average highest freeboard
      temperatures from the fluidized bed facilities. This equation can be used to estimate the N2O
      emission factor of a given incinerator from its long-term average freeboard temperature.
    `,
    link:"",
  },

  wwt_mass_slu:{
    ref:"'S_mass' in eq.6.3B from IPCC 2019. The values of gISS/inhabitant were extracted from 'Andreoli et al', table 2.2",
    link:"",
  },

  wwt_KPI_GHG_slu_stockpilling:{
    ref:"Majumder, R., Livesley, S., Gregory, D., & Arndt, S. (2014, 05 15). Biosolids stockpiles are a significant point source for greenhouse gas emissions. Journal of Environmental Management, 143, pp. 34-43.",
    link:"http://dx.doi.org/10.1016/j.jjenvman.2014.04.2016",
  },

  wwo_KPI_GHG_urine:{
    ref:"IPCC-2006, Chapter 11, page 11, table 11.1: 'Default emission factors to estimate direct N2O emissions from managed soils'.",
    link:"frontend/docs/2006-ipcc/4_Volume4/V4_11_Ch11_N2O&CO2.pdf#page=11",
  },
};
