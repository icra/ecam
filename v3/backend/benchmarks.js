/*
  BENCHMARKS:
  each function return "good","acceptable","bad" according to rules
*/
let Benchmarks={
  //biogas usage
  wwt_biogas_usage(stage, value){
    return value==100 ? "Good" : "Unsatisfactory";
  },

  //standarized energy consumption (kWh/m3/100m)
  wsa_KPI_std_nrg_cons(stage, value){
    //type and size of pump
    let pmp_type = Tables.get_row("Pump type",stage.wsa_pmp_type).name;
    let pmp_size = Tables.get_row("Pump size",stage.wsa_pmp_size).name;

    if(pmp_type=="Submersible") {
      if(pmp_size=="5.6 - 15.7 kW") {
        if      (value  >= 0.7877)                  return "Unsatisfactory";
        else if (0.7877 >  value && value > 0.5013) return "Acceptable";
        else if (value  <= 0.5013)                  return "Good";
      }else if(pmp_size=="15.7 - 38 kW") {
        if      (value  >= 0.5866)                  return "Unsatisfactory";
        else if (0.5866 >  value && value > 0.4447) return "Acceptable";
        else if (value  <= 0.4447)                  return "Good";
      }else if(pmp_size=="39 - 96 kW") {
        if      (value  >= 0.4837)                  return "Unsatisfactory";
        else if (0.4837 >  value && value > 0.4115) return "Acceptable";
        else if (value  <= 0.4115)                  return "Good";
      }else if(pmp_size=="> 96 kW") {
        if      (value  >= 0.4673)                  return "Unsatisfactory";
        else if (0.4673 >  value && value > 0.4054) return "Acceptable";
        else if (value  <= 0.4054)                  return "Good";
      }else return "pump size error";
    }else if(pmp_type=="External") {
      if(pmp_size=="5.6 - 15.7 kW") {
        if      (value  >= 0.5302)                  return "Unsatisfactory";
        else if (0.5302 >  value && value > 0.3322) return "Acceptable";
        else if (value  <= 0.3322)                  return "Good";
      }else if(pmp_size=="15.7 - 38 kW") {
        if      (value  >= 0.4923)                  return "Unsatisfactory";
        else if (0.4923 >  value && value > 0.3169) return "Acceptable";
        else if (value  <= 0.3169)                  return "Good";
      }else if(pmp_size=="39 - 96 kW") {
        if      (value  >= 0.4595)                  return "Unsatisfactory";
        else if (0.4595 >  value && value > 0.3080) return "Acceptable";
        else if (value  <= 0.3080)                  return "Good";
      }else if(pmp_size=="> 96 kW") {
        if      (value  >= 0.4308)                  return "Unsatisfactory";
        else if (0.4308 >  value && value > 0.3080) return "Acceptable";
        else if (value  <= 0.3080)                  return "Good";
      }else return "pump size error";
    }else return "pump type error";
  },

  wsd_KPI_std_nrg_cons(stage, value){
    //pump size
    let pmp_size = Tables.get_row("Pump size",stage.wsd_pmp_size).name; //string

    //different values depending on pump size
    if(pmp_size=="5.6 - 15.7 kW") {
      if      (value  >= 0.5302)                    return "Unsatisfactory";
      else if (0.5302 >  value && value > 0.3322)   return "Acceptable";
      else if (value  <= 0.3322)                    return "Good";
    }
    else if(pmp_size=="15.7 - 38 kW") {
      if      (value  >= 0.4923)                    return "Unsatisfactory";
      else if (0.4923 >  value && value > 0.3169)   return "Acceptable";
      else if (value  <= 0.3169)                    return "Good";
    }
    else if(pmp_size=="39 - 96 kW") {
      if      (value  >= 0.4595)                    return "Unsatisfactory";
      else if (0.4595 >  value && value > 0.3080)   return "Acceptable";
      else if (value  <= 0.3080)                    return "Good";
    }
    else if(pmp_size=="> 96 kW") {
      if      (value  >= 0.4308)                    return "Unsatisfactory";
      else if (0.4308 >  value && value > 0.3080)   return "Acceptable";
      else if (value  <= 0.3080)                    return "Good";
    }
    else return "Out of range";
  },

  wwc_KPI_std_nrg_cons(stage, value){
    if      (0.2725 <= value && value <= 0.45) return "Good";
    else if (0.45   <  value && value <= 0.68) return "Acceptable";
    else if (value  > 0.68)                    return "Unsatisfactory";
    else                                       return "Out of range";
  },

  wwt_KPI_std_nrg_cons(stage, value){
    if      (0.2725 <= value && value <= 0.40) return "Good";
    else if (0.40   <  value && value <= 0.54) return "Acceptable";
    else if (value  > 0.54)                    return "Unsatisfactory";
    else                                       return "Out of range";
  },

  //unit head loss (m/km) (only in Abstraction and Distribution)
  wsa_KPI_un_head_loss(stage, value){
    if      (value <= 2)                   return "Good";
    else if (2     <  value && value <= 4) return "Acceptable";
    else if (value >  4)                   return "Unsatisfactory";
    else                                   return "Out of range";
  },

  wsd_KPI_un_head_loss(stage, value){
    if      (value <= 2)                   return "Good";
    else if (2     <  value && value <= 4) return "Acceptable";
    else if (value >  4)                   return "Unsatisfactory";
    else                                   return "Out of range";
  },

  //capacity utilization (%) (Water Treatment)
  wst_KPI_capac_util(stage, value){
    if      (70 <= value && value <= 90)                                   return "Good";
    else if ((90 <  value && value <= 100) || (50 <= value && value < 70)) return "Acceptable";
    else if ((value > 100)||(value < 50))                                  return "Unsatisfactory";
    else                                                                   return "Out of range";
  },

  wwt_KPI_capac_util(stage, value) {
    if     (70 <= value && value <= 95)                                  return "Good";
    else if((95 < value && value <= 100) || (50 < value && value < 70) ) return "Acceptable";
    else if(value > 100 || value < 50)                                   return "Unsatisfactory";
    else                                                                 return "Out of range";
  },

  //kwh of energy consumption per m3 of treated water
  wst_KPI_nrg_per_m3(stage, value){
    // WTP with Pre-ox >  5000 m3/d - Good: tE1 ≤ 0.055; Acceptable: 0.055 < tE1 ≤ 0.07;  Unsatisfactory: tE1 > 0.07
    // WTP with Pre-ox <= 5000 m3/d - Good: tE1 ≤ 0.07;  Acceptable: 0.07  < tE1 ≤ 0.085; Unsatisfactory: tE1 > 0.085
    // WTP             >  5000 m3/d - Good: tE1 ≤ 0.025; Acceptable: 0.025 < tE1 ≤ 0.04;  Unsatisfactory: tE1 > 0.04
    // WTP             <= 5000 m3/d - Good: tE1 ≤ 0.04;  Acceptable: 0.04  < tE1 ≤ 0.055; Unsatisfactory: tE1 > 0.055
    // WTP (with raw and treated water pumping) - Good: tE1 ≤ 0.4; Acceptable: 0.4 < tE1 ≤ 0.5; Unsatisfactory: tE1 > 0.5
    let tre = Tables.get_row('Potabilization chain',stage.wst_treatment).name; //type of treatment
    let m3_per_day = stage.wst_vol_trea/Global.Days(); //m3 per day
    if     (m3_per_day> 5000 && (tre.search("Pre-ox")+1) && value<=0.055)                 return "Good";
    else if(m3_per_day> 5000 && (tre.search("Pre-ox")+1) && value> 0.055 && value<=0.07 ) return "Acceptable";
    else if(m3_per_day> 5000 && (tre.search("Pre-ox")+1) && value> 0.07)                  return "Unsatisfactory";
    else if(m3_per_day<=5000 && (tre.search("Pre-ox")+1) && value<=0.07)                  return "Good";
    else if(m3_per_day<=5000 && (tre.search("Pre-ox")+1) && value> 0.07  && value<=0.085) return "Acceptable";
    else if(m3_per_day<=5000 && (tre.search("Pre-ox")+1) && value> 0.085)                 return "Unsatisfactory";
    else if(m3_per_day> 5000 &&                             value<=0.025)                 return "Good";
    else if(m3_per_day> 5000 &&                             value> 0.025 && value<=0.04 ) return "Acceptable";
    else if(m3_per_day> 5000 &&                             value> 0.04)                  return "Unsatisfactory";
    else if(m3_per_day<=5000 &&                             value<=0.04)                  return "Good";
    else if(m3_per_day<=5000 &&                             value> 0.04  && value<=0.055) return "Acceptable";
    else if(m3_per_day<=5000 &&                             value> 0.055)                 return "Unsatisfactory";
    else return "Unknown";
  },

  //kg of sludge production per m3 of treated water
  wst_KPI_slu_per_m3(stage, value){
    if      (value <= 0.06)                   return "Good";
    else if (0.06  <  value && value <= 0.10) return "Acceptable";
    else if (value >  0.10)                   return "Unsatisfactory";
    else                                      return "Out of range";
  },

  //m3 of non revenue water per km of mains length per year
  wsd_KPI_water_losses(stage, value){
    if     (value <= 6)                   return "Good";
    else if(6     < value && value <= 12) return "Acceptable";
    else if(value > 12)                   return "Unsatisfactory";
    else                                  return "Out of range";
  },

  //kwh of energy per kg BOD removed
  wwt_KPI_nrg_per_kg(stage, value){
    if     (value <= 2)                   return "Good";
    else if(2     < value && value <= 10) return "Acceptable";
    else if(value > 10)                   return "Unsatisfactory";
    else                                  return "Out of range";
  },

  //kwh of energy from biogas per m3 treated
  wwt_KPI_nrg_biogas(stage, value){
    if     (value  >= 0.0009)                  return "Good";
    else if(0.0009 > value && value >= 0.0007) return "Acceptable";
    else if(value  < 0.0007)                   return "Unsatisfactory";
    else                                       return "Out of range";
  },

  //kg sludge prouced per m3 treated
  wwt_KPI_sludg_prod(stage, value){
    if     (value <= 0.8)                  return "Good";
    else if(0.8   < value && value <= 1.5) return "Acceptable";
    else if(value > 1.5)                   return "Unsatisfactory";
    else                                   return "Out of range";
  },

  //% of energy produced per total available energy in biogas
  wwt_KPI_nrg_x_biog(stage, value) {
    if     (value < 15)                    return "Unsatisfactory";
    else if(15   <=  value && value <= 25) return "Acceptable";
    else if(value > 25)                    return "Good";
    else                                   return "Out of range";
  },

  //test if the function that locates not used benchmarks works
  //not_used_benchmark(){return false},
};
