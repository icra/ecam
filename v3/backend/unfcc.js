/*
  TODO NOT FINISHED
  Formulas for UNFCCC categories (requested by RANJIN)

  unfccc_1A1: Energy - Electricity and Heat                
  unfccc_1A3: Energy - Transport                           
  unfccc_5A:  Waste - Solid Waste Disposal                 
  unfccc_5B:  Waste - Biological Treatment of Solid Waste  
  unfccc_5C:  Waste - Incineration                         
  unfccc_5D:  Waste - Wastewater treatment and Discharge   
*/

let UNFCCC={
  //unfccc_1A1: Energy - Electricity and Heat                
  unfccc_1A1(scenario){
    return scenario.Water.Abstraction.wsa_KPI_GHG_elec()+
           scenario.Water.Treatment.wst_KPI_GHG_elec()+
           scenario.Water.Distribution.wsd_KPI_GHG_elec()+
           scenario.Waste.Collection.wwc_KPI_GHG_elec()+
           scenario.Waste.Treatment.wwt_KPI_GHG_elec()+
           scenario.Waste.Discharge.wwd_KPI_GHG_elec()+
           scenario.Faecl.Containment.fsc_KPI_GHG_elec()+
           scenario.Faecl.Treatment.fst_KPI_GHG_elec()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_elec()+
           scenario.Water.Abstraction.wsa_KPI_GHG_fuel()+
           scenario.Water.Treatment.wst_KPI_GHG_fuel()+
           scenario.Water.Distribution.wsd_KPI_GHG_fuel()+
           scenario.Waste.Collection.wwc_KPI_GHG_fuel()+
           scenario.Waste.Treatment.wwt_KPI_GHG_fuel()+
           scenario.Waste.Discharge.wwd_KPI_GHG_fuel()+
           scenario.Faecl.Treatment.fst_KPI_GHG_fuel()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_fuel()+
           scenario.Waste.Treatment.wwt_KPI_GHG_dig_fuel();
  },

  //unfccc_1A3: Energy - Transport                           
  unfccc_1A3(scenario){
    return scenario.Water.Distribution.wsd_KPI_GHG_trck()+
           scenario.Waste.Treatment.wwt_KPI_ghg_tsludge()+
           scenario.Waste.Discharge.wwd_KPI_GHG_trck()+
           scenario.Faecl.Containment.fsc_KPI_GHG_trck()+
           scenario.Faecl.Treatment.fst_KPI_GHG_trck()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_trck();
  },

  //unfccc_5A:  Waste - Solid Waste Disposal                 
  unfccc_5A(scenario){
    return scenario.Waste.Treatment.wwt_KPI_ghg_app_co2eq()+
           scenario.Waste.Treatment.wwt_KPI_ghg_land_co2eq()+
           scenario.Waste.Treatment.wwt_KPI_ghg_stock_co2eq()+
           scenario.Waste.Treatment.wwt_KPI_ghg_sto_co2eq()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_landapp()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_dumping()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_landfil();
  },

  //unfccc_5B:  Waste - Biological Treatment of Solid Waste  
  unfccc_5B(scenario){
    return scenario.Waste.Treatment.wwt_KPI_ghg_comp_co2eq()+
           scenario.Waste.Treatment.wwt_KPI_GHG_biog()+
           scenario.Faecl.Treatment.fst_KPI_GHG_biog();
  },

  //unfccc_5C:  Waste - Incineration                         
  unfccc_5C(scenario){
    return scenario.Waste.Treatment.wwt_KPI_ghg_inc_co2eq();
  },

  //unfccc_5D:  Waste - Wastewater treatment and Discharge   
  unfccc_5D(scenario){
    return scenario.Waste.ww_KPI_GHG_unt()+
           scenario.Waste.Treatment.wwt_KPI_GHG_tre()+
           scenario.Faecl.Treatment.fst_KPI_GHG_tre()+
           scenario.Waste.Discharge.wwd_KPI_GHG_tre()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_tre()+
           scenario.Faecl.Reuse.fsr_KPI_GHG_urine()+
           scenario.Faecl.Containment.fsc_KPI_GHG_cont();
  },
}
