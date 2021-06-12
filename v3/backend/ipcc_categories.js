/*
  IPCC categories: grouping emissions based on origin
  ===================================================
  Based on table 8.2 from IPCC 2019, Volume 1, Chapter 8 "Reporting Guidance"

  ---------
  REPORTING
  ---------
    Discharge to Freshwater, estuarine or marine environments -- Volume 5, Chapter 6
    Discharge to Agricultural soils                           -- Volume 4, Chapter 11
    Land disposal of wastewater                               -- Volume 5, Chapter 3

    Sludge treatment offsite  -- Volume 5, Chapter 2
      Incineration            -- Volume 5, Chapter 5
      Composting              -- Volume 5, Chapter 4
      Landfilling             -- Volume 5, Chapter 3
      Land application        -- Volume 4, Chapter 11
    Sludge treatment at WWTPs -- volume 5, Chapter 6

  -----------------------------------------------------
  ALL ECAM EMISSIONS (not including grouping emissions)
  -----------------------------------------------------
    wsa_KPI_GHG_elec
    wsa_KPI_GHG_fuel
    wst_KPI_GHG_elec
    wst_KPI_GHG_fuel
    wsd_KPI_GHG_elec
    wsd_KPI_GHG_fuel
    wsd_KPI_GHG_trck
    wwc_KPI_GHG_elec
    wwc_KPI_GHG_fuel
    wwc_KPI_GHG_cso
    wwc_KPI_GHG_col
    wwt_KPI_GHG_elec
    wwt_KPI_GHG_fuel
    wwt_KPI_GHG_tre
    wwt_KPI_GHG_biog_flared TODO
    wwt_KPI_GHG_biog_valorized TODO
    wwt_KPI_GHG_biog_leaked TODO
    wwt_KPI_GHG_dig_fuel
    wwt_KPI_GHG_slu_storage
    wwt_KPI_GHG_slu_composting
    wwt_KPI_GHG_slu_incineration
    wwt_KPI_GHG_slu_land_application
    wwt_KPI_GHG_slu_landfilling
    wwt_KPI_GHG_slu_stockpilling
    wwt_KPI_GHG_slu_transport
    wwt_KPI_GHG_reus_trck
    wwt_KPI_GHG_disc
    wwo_KPI_GHG_elec
    wwo_KPI_GHG_fuel
    wwo_KPI_GHG_unt_opd
    wwo_KPI_GHG_containment
    wwo_KPI_GHG_tre
    wwo_KPI_GHG_dis
    wwo_KPI_GHG_biog_flared TODO
    wwo_KPI_GHG_biog_valorized TODO
    wwo_KPI_GHG_biog_leaked TODO
    wwo_KPI_GHG_dig_fuel
    wwo_KPI_GHG_landfil
    wwo_KPI_GHG_landapp
    wwo_KPI_GHG_dumping
    wwo_KPI_GHG_urine
    wwo_KPI_GHG_trck

  -------------------------------
  ALL IPCC CATEGORIES (table 8.2)
  -------------------------------
    1 - ENERGY
      1 A - Fuel Combustion Activities
        1 A 1 - Energy Industries
          1 A 1 a - Main Activity Electricity and Heat Production
            1 A 1 a i - Electricity Generation
            1 A 1 a ii - Combined Heat and Power (CHP)
            1 A 1 a iii - Heat Plants
          1 A 1 b - Petroleum Refining
          1 A 1 c - Manufacture of Solid Fuels and Other Energy Industries
            1 A 1 c i - Manufacture of Solid Fuels
            1 A 1 c ii - Other Energy Industries
        1 A 2 - Manufacturing Industries and Construction
          1 A 2 a - Iron and Steel
          1 A 2 b - Non-Ferrous Metals
          1 A 2 c - Chemicals
          1 A 2 d - Pulp, Paper and Print
          1 A 2 e - Food Processing, Beverages and Tobacco
          1 A 2 f - Non-Metallic Minerals
          1 A 2 g - Transport Equipment
          1 A 2 h - Machinery
          1 A 2 i - Mining (excluding fuels) and Quarrying
          1 A 2 j - Wood and Wood Products
          1 A 2 k - Construction
          1 A 2 l - Textile and Leather
          1 A 2 m - Non-specified Industry
        1 A 3 - Transport
          1 A 3 a - Civil Aviation
            1 A 3 a i - International Aviation (International Bunkers)
            1 A 3 a ii - Domestic Aviation
          1 A 3 b - Road Transportation
            1 A 3 b i - Cars
              1 A 3 b i 1 - Passenger Cars With 3-way Catalysts
              1 A 3 b i 2 - Passenger Cars Without 3-way Catalysts
            1 A 3 b ii - Light-duty Trucks
              1 A 3 b ii 1 - Light-duty Trucks With 3-way Catalysts
              1 A 3 b ii 2 - Light-duty Trucks Without 3-way Catalysts
            1 A 3 b iii - Heavy-duty Trucks and Buses
            1 A 3 b iv - Motorcycles
            1 A 3 b v - Evaporative Emissions from Vehicles
            1 A 3 b vi - Urea-based Catalysts
          1 A 3 c - Railways
          1 A 3 d - Water-borne Navigation
            1 A 3 d i - International Water-borne Navigation (International Bunkers)
            1 A 3 d ii - Domestic Water-borne Navigation
          1 A 3 e - Other Transportation
            1 A 3 e i - Pipeline Transport
            1 A 3 e ii - Off-road
        1 A 4 - Other Sectors
          1 A 4 a - Commercial/Institutional
          1 A 4 b - Residential
          1 A 4 c - Agriculture/Forestry/Fishing/Fish Farms
            1 A 4 c i - Stationary
            1 A 4 c ii - Off-road Vehicles and Other Machinery
            1 A 4 c iii - Fishing (mobile combustion)
        1 A 5 - Non-Specified
          1 A 5 a - Stationary
          1 A 5 b - Mobile
            1 A 5 b i - Mobile (Aviation Component)
            1 A 5 b ii - Mobile (Water-borne Component)
            1 A 5 b iii - Mobile (Other)
          1 A 5 c - Multilateral Operations
      1 B - Fugitive Emissions from Fuels
        1 B 1 - Solid Fuels
          1 B 1 a - Coal Mining and Handling
            1 B 1 a i - Underground Mines
              1 B 1 a i 1 - Mining
              1 B 1 a i 2 - Post-mining Seam Gas Emissions
              1 B 1 a i 3 - Abandoned Underground Mines
              1 B 1 a i 4 - Flaring of Drained Methane or Conversion of Methane to CO2
            1 B 1 a ii - Surface Mines
              1 B 1 a ii 1 - Mining
              1 B 1 a ii 2 - Post-mining Seam Gas Emissions
              1 B 1 a ii 3 - Abandoned Surface Mines
            1 B 1 a iii - Coal Exploration
          1 B 1 b - Uncontrolled Combustion, and Burning Coal Dumps
          1 B 1 c - Fuel Transformation
            1 B 1 c i - Charcoal and Biochar
            1 B 1 c ii - Coke Production
            1 B 1 c iii - Solid to Solid Fuel Production
            1 B 1 c iv - Gasification Transformation
        1 B 2 - Oil and Natural Gas
          1 B 2 a - Oil
            1 B 2 a i - Exploration
            1 B 2 a ii - Production and Upgrading
            1 B 2 a iii - Transport
            1 B 2 a iv - Refining
            1 B 2 a v - Distribution of oil products
            1 B 2 a vi - Other
              1 B 2 a vi i - Abandoned Oil Wells
          1 B 2 b - Natural Gas
            1 B 2 b i - Exploration
            1 B 2 b ii - Production and Gathering
            1 B 2 b iii - Processing
            1 B 2 b iv - Transmission and Storage
            1 B 2 b v - Distribution
            1 B 2 b vi - Gas Post-Meter
              1 B 2 b vi i - Other
              1 B 2 b vi ii - Abandoned Gas Wells
        1 B 3 - Other Emissions from Energy Production
      1 C - Carbon Dioxide Transport and Storage
        1 C 1 - Transport of CO2
          1 C 1 a - Pipelines
          1 C 1 b - Ships
          1 C 1 c - Other (please specify)
        1 C 2 - Injection and Storage
          1 C 2 a - Injection
          1 C 2 b - Storage
        1 C 3 - Other

    2 - INDUSTRIAL PROCESSES AND PRODUCT USE
      2 A - Mineral Industry
        2 A 1 - Cement Production Process-related emissions from the production of various
        2 A 2 - Lime Production
        2 A 3 - Glass Production
        2 A 4 - Other Process Uses of Carbonates
          2 A 4 a - Ceramics
          2 A 4 b - Other Uses of Soda Ash
          2 A 4 c - Non Metallurgical Magnesia
          2 A 4 d - Other (please specify)
        2 A 5 - Other (please specify)
      2 B - Chemical Industry
        2 B 1 - Ammonia Production
        2 B 2 - Nitric Acid Production
        2 B 3 - Adipic Acid Production
        2 B 4 - Caprolactam, Glyoxal and Glyoxylic Acid Production
        2 B 5 - Carbide Production
        2 B 6 - Titanium Dioxide Production
        2 B 7 - Soda Ash Production
        2 B 8 - Petrochemical and Carbon Black Production
          2 B 8 a - Methanol
          2 B 8 b - Ethylene
          2 B 8 c - Ethylene Dichloride and Vinyl Chloride Monomer
          2 B 8 d - Ethylene Oxide
          2 B 8 e - Acrylonitrile
          2 B 8 f - Carbon Black
        2 B 9 - Fluorochemical Production
          2 B 9 a - HCFC-22 Production
          2 B 9 b - HFC Production (specify HFC(s)
          2 B 9 c - PFC Production (specific PFC(s)
          2 B 9 d - SF6 Production Various F-gases emissions in SF6 Production
          2 B 9 e - NF3 Production Various F-gases emissions in NF3 Production 2E1 HFCs,
          2 B 9 f - Fluoropolymer Production (specify fluoropolymer produced)
          2 B 9 g - Other Fluorochemical Production (specify other fluorochemical produced)
        2 B 10 - Hydrogen Production
        2 B 11 - Other (Please specify)
      2 C - Metal Industry
        2 C 1 - Iron and Steel Production
        2 C 2 - Ferroalloys Production
        2 C 3 - Aluminium Production
        2 C 4 - Magnesium Production
        2 C 5 - Lead Production
        2 C 6 - Zinc Production
        2 C 7 - Rare Earths
        2 C 8 - Other (please specify)
      2 D - Non-Energy Products from Fuels and Solvent Use
        2 D 1 - Lubricant Use
        2 D 2 - Paraffin Wax Use
        2 D 3 - Solvent Use
        2 D 4 - Other (please specify)
      2 E - Electronics Industry
        2 E 1 - Integrated Circuit or Semiconductor Emissions
        2 E 2 - Displays
        2 E 3 - Photovoltaics
        2 E 4 - Microelectromechanical systems (MEMS)
        2 E 5 - Other (please specify)
      2 F - Product Uses as Substitutes for Ozone Depleting Substances
        2 F 1 - Refrigeration and Air Conditioning
          2 F 1 a - Refrigeration and Stationary Air
          2 F 1 b - Mobile Air Conditioning
        2 F 2 - Foam Blowing Agents
        2 F 3 - Fire Protection
        2 F 4 - Aerosols
        2 F 5 - Solvents
        2 F 6 - Other Applications (please specify)
      2 G - OTHER PRODUCT MANUFACTURE AND USE
        2 G 1 - Electrical Equipment
          2 G 1 a - Manufacture of Electrical Equipment
          2 G 1 b - Use of Electrical Equipment
          2 G 1 c - Disposal of Electrical Equipment
        2 G 2 - Halogenated Gases from Other Product Uses
          2 G 2 a - Military Applications
          2 G 2 b - Accelerators
          2 G 2 c - Waterproofing of Electronic Circuits
          2 G 2 d - Other (please specify)
        2 G 3 - N2O from Product Uses 3D N2O
          2 G 3 a - Medical Applications
          2 G 3 b - Propellant for Pressure and Aerosol Products
          2 G 3 c - Other (Please specify)
        2 G 4 - Other (Please specify)
      2 H - Other
        2 H 1 - Pulp and Paper Industry
        2 H 2 - Food and Beverages Industry
        2 H 3 - Other (please specify)

    3 - AGRICULTURE, FORESTRY, AND OTHER LAND USE
      3 A - Livestock
        3 A 1 - Enteric Fermentation
          3 A 1 a - Cattle
            3 A 1 a i - Dairy Cows
            3 A 1 a ii - Other Cattle
          3 A 1 b - Buffalo
          3 A 1 c - Sheep
          3 A 1 d - Goats
          3 A 1 e - Camels
          3 A 1 f - Horses
          3 A 1 g - Mules and Asses
          3 A 1 h - Swine
          3 A 1 j - Other (please specify)
        3 A 2 - Manure Management
          3 A 2 a - Cattle
            3 A 2 a i - Dairy Cows
            3 A 2 a ii - Other Cattle
          3 A 2 b - Buffalo
          3 A 2 c - Sheep
          3 A 2 d - Goats
          3 A 2 e - Camels
          3 A 2 f - Horses
          3 A 2 g - Mules and Asses
          3 A 2 h - Swine
          3 A 2 i - Poultry
          3 A 2 j - Other (please specify)
      3 B - Land
        3 B 1 - Forest Land
          3 B 1 a - Forest land Remaining Forest Land
          3 B 1 b - Land Converted to Forest Land
            3 B 1 b i - Cropland Converted to Forest Land
            3 B 1 b ii - Grassland Converted to Forest Land
            3 B 1 b iii - Wetlands Converted to Forest Land
            3 B 1 b iv - Settlements Converted to Forest Land
            3 B 1 b v - Other Land Converted to Forest Land
        3 B 2 - Cropland
          3 B 2 a - Cropland Remaining Cropland
          3 B 2 b - Land Converted to Cropland
            3 B 2 b i - Forest Land Converted to Cropland
            3 B 2 b ii - Grassland Converted to Cropland
            3 B 2 b iii - Wetlands Converted to Cropland
            3 B 2 b iv - Settlements Converted to Cropland
            3 B 2 b v - Other Land Converted to Cropland
        3 B 3 - Grassland
          3 B 3 a - Grassland Remaining Grassland
          3 B 3 b - Land Converted to Grassland
            3 B 3 b i - Forest Land Converted to Grassland
            3 B 3 b ii - Cropland Converted to Grassland
            3 B 3 b iii - Wetlands Converted to Grassland
            3 B 3 b iv - Settlements Converted to Grassland
            3 B 3 b v - Other Land Converted to Grassland
        3 B 4 - Wetlands
          3 B 4 a - Wetlands Remaining Wetlands
            3 B 4 a i - Peatlands Remaining peatlands
            3 B 4 a ii - Flooded Land Remaining Flooded Land
          3 B 4 b - Land Converted to Wetlands
            3 B 4 b i - Land Converted for Peat Extraction
            3 B 4 b ii - Land Converted to Flooded Land
            3 B 4 b iii - Land Converted to Other Wetlands
        3 B 5 - Settlements
          3 B 5 a - Settlements Remaining Settlements
          3 B 5 b - Land Converted to Settlements
            3 B 5 b i - Forest Land Converted to Settlements
            3 B 5 b ii - Cropland Converted to Settlements
            3 B 5 b iii - Grassland Converted to Settlements
            3 B 5 b iv - Wetlands Converted to Settlements
            3 B 5 b v - Other Land Converted to Settlements
          3 B 6 - Other Land
            3 B 6 a - Other Land Remaining Other Land
            3 B 6 b - Land Converted to Other Land
              3 B 6 b i - Forest Land Converted to Other Land
              3 B 6 b ii - Cropland Converted to Other Land
              3 B 6 b iii - Grassland Converted to Other Land
              3 B 6 b iv - Wetlands Converted to Other Land
              3 B 6 b v - Settlements Converted to Other Land
      3 C - Aggregate Sources and Non-CO2 Emissions Sources on Land
        3 C 1 - Emissions from Biomass Burning
          3 C 1 a - Biomass Burning in Forest Land
          3 C 1 b - Biomass Burning in Cropland
          3 C 1 c - Biomass Burning in Grassland
          3 C 1 d - Biomass Burning in All other lands
        3 C 2 - Liming
        3 C 3 - Urea Application
        3 C 4 - Direct N2O Emissions from Managed Soils
        3 C 5 - Indirect N2O Emissions from Managed Soils
        3 C 6 - Indirect N2O Emissions from Manure Management
        3 C 7 - Rice Cultivation
        3 C 8 - Other (please specify)
      3 D - Other
        3 D 1 - Harvested Wood Products
        3 D 2 - Other (please specify)

    4 - WASTE
      4 A - Solid Waste Disposal
        4 A 1 - Managed Waste Disposal Sites
        4 A 2 - Unmanaged Waste Disposal Sites
        4 A 3 - Uncategorised Waste Disposal Sites
      4 B - Biological Treatment of Solid Waste
      4 C - Incineration and Open Burning of Waste
        4 C 1 - Waste Incineration
        4 C 2 - Open Burning of Waste
      4 D - Wastewater Treatment and Discharge
        4 D 1 - Domestic Wastewater Treatment and Discharge
        4 D 2 - Industrial Wastewater Treatment and Discharge
      4 E - Other (please specify)

    5 - OTHER
      5 A - Indirect N2O Emissions from the Atmospheric Deposition of Nitrogen in NOx and NH3
      5 B - Other (please specify)

*/

let IPCC_categories={
  //1A1: Energy - Electricity and Heat TODO
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

  //1A3: Energy - Transport
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

  //4A: Waste - Solid Waste Disposal
  ipcc_4A:{
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

  //4B: Waste - Biological Treatment of Solid Waste
  ipcc_4B:{
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

  //4C: Waste - Incineration
  ipcc_4C:{
    description:"Waste - Incineration",
    color:"red",
    emissions(scenario){
      return [
        scenario.Waste.Treatment.map(ss=>ss.wwt_KPI_GHG_slu_incineration().total).sum(),
      ].sum();
    },
  },

  //4D: Waste - Wastewater treatment and Discharge
  ipcc_4D:{
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
