let Units={
  /* return a multiplier for a field */
  multiplier(field){
    //if magnitude is not inside Units, multiplier is 1
    if(Info[field]===undefined){return 1}
    if(Units[Info[field].magnitude]===undefined){return 1}
    //look for current unit: first inside configuration, if not, in Info[field]
    let currentUnit = Global.Configuration.Units[field] || Info[field].unit;
    //multiplier is in Units[magnitude][unit]
    return Units[Info[field].magnitude][currentUnit] || 1;
  },

  /* CONVERSION BETWEEN MAGNITUDES */
  "Mass":{
    "g":0.001,
    "kg":1, //base unit
    "t":1e3,
  },
  "Distance":{
    "cm":0.01,
    "m" :1, //base unit
    "km":1000,
  },
  "Time":{
    "sec":1, //base unit
    "min":60,
    "hour":3600,
    "day":86400,
    "month":365*86400/12,
  },

  //derived magnitudes from mass,distance and time
  "Volume":{
    "L"   :0.001,
    "m3"  :1, //base unit
    "dam3":1e3,
    "hm3" :1e6,
    "km3" :1e9,
  },
  "Flow":{
    "m3/day":1/86400,
    "m3/s":1, //base unit
    "L/s":0.001,
    "L/day":0.001/86400,
  },
  "Energy":{
    "Joule":1/3600000,
    "kWh"  :1, //base unit
    "MWh"  :1e3,
    "GWh"  :1e6,
    "TJ"   :1e7/36,
  },

  //special case for biogas where unit has to have the word "normal" "N" in front
  "Volume of biogas":{
    "NL" :0.001,
    "Nm3":1, //base unit
  },
};
