/*
  IPCC categories: grouping emissions based on origin
  ------------------------------
  ipcc_1A1: Energy - Electricity and Heat
  ipcc_1A3: Energy - Transport
  ipcc_5A:  Waste - Solid Waste Disposal
  ipcc_5B:  Waste - Biological Treatment of Solid Waste
  ipcc_5C:  Waste - Incineration
  ipcc_5D:  Waste - Wastewater treatment and Discharge

  NEW TBD TODO WORK IN PROGRESS
  volume 5, chapter 6  -- freshwater
  volume 4, chapter 11 -- agricultural soils
  volume 5, chapter 3  -- land disposal of wastewater
  volume 5, chapter 2  -- sludge treatment offsite
  volume 5, chapter 5  -- incineration
  volume 5, chapter 4  -- composting
  volume 5, chapter 3  -- landfilling
  volume 4, chapter 11 -- land application

  1A
    1A4 Fuel combustion activities
    1A3 Truck
  2B
  3C
    3C4
  4D
    4D1
    4A
    4B
    4C1
*/
let IPCC_categories={
  //1A1: Energy - Electricity and Heat
  ipcc_1A1:{
    description:"Energy - Electricity and Heat",
    color:"rgba(247,165,7,0.47)",
    emissions(scenario){
      return[
        scenario.Water.Abstraction  .map(ss=>ss.wsa_KPI_GHG_elec().total).sum(), //wsa electricity
        scenario.Water.Treatment    .map(ss=>ss.wst_KPI_GHG_elec().total).sum(), //wst electricity
        scenario.Water.Distribution .map(ss=>ss.wsd_KPI_GHG_elec().total).sum(), //wsd electricity
        scenario.Waste.Collection   .map(ss=>ss.wwc_KPI_GHG_elec().total).sum(), //wsd electricity
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_elec().total).sum(), //wsd electricity
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_elec().total).sum(), //wsd electricity

        scenario.Water.Abstraction  .map(ss=>ss.wsa_KPI_GHG_fuel().total).sum(), //wsa fuel engines
        scenario.Water.Treatment    .map(ss=>ss.wst_KPI_GHG_fuel().total).sum(), //wst fuel engines
        scenario.Water.Distribution .map(ss=>ss.wsd_KPI_GHG_fuel().total).sum(), //wsd fuel engines
        scenario.Waste.Collection   .map(ss=>ss.wwc_KPI_GHG_fuel().total).sum(), //wwc fuel engines
        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_fuel().total).sum(), //wwt fuel engines
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_fuel().total).sum(), //wwo fuel engines

        scenario.Waste.Treatment    .map(ss=>ss.wwt_KPI_GHG_dig_fuel().total).sum(), //wwt digestor fuel
        scenario.Waste.Onsite       .map(ss=>ss.wwo_KPI_GHG_dig_fuel().total).sum(), //wwo digestor fuel
      ].sum();
    },
  },

  //ipcc_1A3: Energy - Transport
  ipcc_1A3:{
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

  //ipcc_5A: Waste - Solid Waste Disposal
  ipcc_5A:{
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
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_urine()               .total).sum(), //wwo land application of urine
      ].sum();
    },
  },

  //ipcc_5B: Waste - Biological Treatment of Solid Waste
  ipcc_5B:{
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

  //ipcc_5C: Waste - Incineration
  ipcc_5C:{
    description:"Waste - Incineration",
    color:"red",
    emissions(scenario){
      return [
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_incineration().total).sum(),
      ].sum();
    },
  },

  //ipcc_5D: Waste - Wastewater treatment and Discharge
  ipcc_5D:{
    description:"Waste - Wastewater treatment and Discharge",
    color:"#85077c",
    emissions(scenario){
      return [
        //untreated ww
        scenario.Waste.Collection.map(ss=>ss.wwc_KPI_GHG_col()    .total).sum(), //wwc collected water
        scenario.Waste.Collection.map(ss=>ss.wwc_KPI_GHG_cso()    .total).sum(), //wwc sewer overflow
        scenario.Waste.Onsite    .map(ss=>ss.wwo_KPI_GHG_unt_opd().total).sum(), //wwo open defecation

        //treatment
        scenario.Waste.Treatment .map(ss=>ss.wwt_KPI_GHG_tre().total).sum(), //wwt treatment
        scenario.Waste.Onsite    .map(ss=>ss.wwo_KPI_GHG_tre().total).sum(), //wwo treatment
        scenario.Waste.Onsite    .map(ss=>ss.wwo_KPI_GHG_containment().total).sum(), //wwo treatment

        //discharge
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_disc() .total).sum(), //wwt discharge
        scenario.Waste.Onsite   .map(ss=>ss.wwo_KPI_GHG_dis()  .total).sum(), //wwo discharge
      ].sum();
    },
  },
};
