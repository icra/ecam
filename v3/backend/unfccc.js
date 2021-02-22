/*
  Formulas for UNFCCC categories
  ------------------------------
  unfccc_1A1: Energy - Electricity and Heat
  unfccc_1A3: Energy - Transport
  unfccc_5A:  Waste - Solid Waste Disposal
  unfccc_5B:  Waste - Biological Treatment of Solid Waste
  unfccc_5C:  Waste - Incineration
  unfccc_5D:  Waste - Wastewater treatment and Discharge
*/
let UNFCCC={
  //unfccc_1A1: Energy - Electricity and Heat
  unfccc_1A1:{
    description: "Energy - Electricity and Heat",
    color: "#efa922",
    emissions(scenario){
      return [
        scenario.Water.Abstraction  .map(ss=>ss.wsa_KPI_GHG_elec()).sum(), //wsa electricity
        scenario.Water.Treatment    .map(ss=>ss.wst_KPI_GHG_elec()).sum(), //wst electricity
        scenario.Water.Distribution .map(ss=>ss.wsd_KPI_GHG_elec()).sum(), //wsd electricity
        scenario.Waste.Collection   .map(ss=>ss.wwc_KPI_GHG_elec()).sum(), //wsd electricity
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_elec()).sum(), //wsd electricity
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_elec()).sum(), //wsd electricity

        scenario.Water.Abstraction  .map(ss=>ss.wsa_KPI_GHG_fuel().total).sum(), //wsa fuel engines
        scenario.Water.Treatment    .map(ss=>ss.wst_KPI_GHG_fuel().total).sum(), //wst fuel engines
        scenario.Water.Distribution .map(ss=>ss.wsd_KPI_GHG_fuel().total).sum(), //wsd fuel engines
        scenario.Waste.Collection   .map(ss=>ss.wwc_KPI_GHG_fuel().total).sum(), //wwc fuel engines
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_fuel().total).sum(), //wwt fuel engines
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_fuel().total).sum(), //wwo fuel engines

        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_dig_fuel().total).sum(), //wwt digestor fuel
      ].sum();
    },
  },

  //unfccc_1A3: Energy - Transport
  unfccc_1A3:{
    description:"Energy - Transport",
    color:"orange",
    emissions(scenario){
      return [
        scenario.Water.Distribution .map(ss=>ss.wsd_KPI_GHG_trck()         .total).sum(), //wsd trucks
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_reus_trck()    .total).sum(), //wwt reused water trucks
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_slu_transport().total).sum(), //wwt sludge transport
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_trck()         .total).sum(), //wwo transport of faecal sludge
      ].sum();
    },
  },

  //unfccc_5A: Waste - Solid Waste Disposal
  unfccc_5A:{
    description:"Waste - Solid Waste Disposal",
    color:"#30a5d8",
    emissions(scenario){
      return [
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_land_application().total).sum(), //wwt land application
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_landfilling()     .total).sum(), //wwt landfilling
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_stockpilling()    .total).sum(), //wwt stockpilling
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_storage()         .total).sum(), //wwt storage
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_landapp()             .total).sum(), //wwo land application
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_landfil()             .total).sum(), //wwo landfilling
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_dumping()             .total).sum(), //wwo dumping of faecal sludge
      ].sum();
    },
  },

  //unfccc_5B: Waste - Biological Treatment of Solid Waste
  unfccc_5B:{
    description:"Waste - Biological Treatment of Solid Waste",
    color:"#46ba55",
    emissions(scenario){
      return [
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_composting().total).sum(),
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_biog()          .total).sum(),
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_biog()          .total).sum(),
      ].sum();
    },
  },

  //unfccc_5C: Waste - Incineration
  unfccc_5C:{
    description:"Waste - Incineration",
    color:"red",
    emissions(scenario){
      return [
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_incineration().total).sum(),
      ].sum();
    },
  },

  //unfccc_5D: Waste - Wastewater treatment and Discharge
  unfccc_5D:{
    description:"Waste - Wastewater treatment and Discharge",
    color:"#85077c",
    emissions(scenario){
      return [
        //untreated ww
        scenario.Waste.Collection.map(ss=>ss.wwc_KPI_GHG_cso()    .total).sum(), //wwc sewer overflow
        scenario.Waste.Collection.map(ss=>ss.wwc_KPI_GHG_col()    .total).sum(), //wwc collected water
        scenario.Waste.Onsite    .map(ss=>ss.wwo_KPI_GHG_unt_opd().total).sum(), //wwo open defecation

        //treatment
        scenario.Waste.Treatment .map(ss=>ss.wwt_KPI_GHG_tre().total).sum(), //wwt treatment
        scenario.Waste.Onsite    .map(ss=>ss.wwo_KPI_GHG_tre().total).sum(), //wwo treatment

        //discharge
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_disc() .total).sum(), //wwt discharge
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_dis()  .total).sum(), //wwo discharge
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_urine().total).sum(), //wwo land application of urine
      ].sum();
    },
  },
};
