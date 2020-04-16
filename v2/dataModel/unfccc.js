/*
 * Formulas for UNFCCC categories (requested by RANJIN)
 */
let UNFCCC={
  unfccc_1A1(){
    return Global.Water.Abstraction.wsa_KPI_GHG_elec()+
           Global.Water.Treatment.wst_KPI_GHG_elec()+
           Global.Water.Distribution.wsd_KPI_GHG_elec()+
           Global.Waste.Collection.wwc_KPI_GHG_elec()+
           Global.Waste.Treatment.wwt_KPI_GHG_elec()+
           Global.Waste.Discharge.wwd_KPI_GHG_elec()+
           Global.Faecl.Containment.fsc_KPI_GHG_elec()+
           Global.Faecl.Treatment.fst_KPI_GHG_elec()+
           Global.Faecl.Reuse.fsr_KPI_GHG_elec()+
           Global.Water.Abstraction.wsa_KPI_GHG_fuel()+
           Global.Water.Treatment.wst_KPI_GHG_fuel()+
           Global.Water.Distribution.wsd_KPI_GHG_fuel()+
           Global.Waste.Collection.wwc_KPI_GHG_fuel()+
           Global.Waste.Treatment.wwt_KPI_GHG_fuel()+
           Global.Waste.Discharge.wwd_KPI_GHG_fuel()+
           Global.Faecl.Treatment.fst_KPI_GHG_fuel()+
           Global.Faecl.Reuse.fsr_KPI_GHG_fuel()+
           Global.Waste.Treatment.wwt_KPI_GHG_dig_fuel();
  },
  unfccc_1A3(){
    return Global.Water.Distribution.wsd_KPI_GHG_trck()+
    Global.Waste.Treatment.wwt_KPI_ghg_tsludge()+
    Global.Waste.Discharge.wwd_KPI_GHG_trck()+
    Global.Faecl.Containment.fsc_KPI_GHG_trck()+
    Global.Faecl.Treatment.fst_KPI_GHG_trck()+
    Global.Faecl.Reuse.fsr_KPI_GHG_trck();
  },
  unfccc_5A(){
    return Global.Waste.Treatment.wwt_KPI_ghg_app_co2eq()+
           Global.Waste.Treatment.wwt_KPI_ghg_land_co2eq()+
           Global.Waste.Treatment.wwt_KPI_ghg_stock_co2eq()+
           Global.Waste.Treatment.wwt_KPI_ghg_sto_co2eq()+
           Global.Faecl.Reuse.fsr_KPI_GHG_landapp()+
           Global.Faecl.Reuse.fsr_KPI_GHG_dumping()+
           Global.Faecl.Reuse.fsr_KPI_GHG_landfil();
  },
  unfccc_5B(){
    return Global.Waste.Treatment.wwt_KPI_ghg_comp_co2eq()+
           Global.Waste.Treatment.wwt_KPI_GHG_biog()+
           Global.Faecl.Treatment.fst_KPI_GHG_biog();
  },
  unfccc_5C(){
    return Global.Waste.Treatment.wwt_KPI_ghg_inc_co2eq();
  },
  unfccc_5D(){
    return Global.Waste.ww_KPI_GHG_unt()+
           Global.Waste.Treatment.wwt_KPI_GHG_tre()+
           Global.Faecl.Treatment.fst_KPI_GHG_tre()+
           Global.Waste.Discharge.wwd_KPI_GHG_tre()+
           Global.Faecl.Reuse.fsr_KPI_GHG_tre()+
           Global.Faecl.Reuse.fsr_KPI_GHG_urine()+
           Global.Faecl.Containment.fsc_KPI_GHG_cont();
  },
}

//put it inside "Global"
Global.UNFCCC=UNFCCC;
