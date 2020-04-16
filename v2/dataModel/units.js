let Units={
  /*modify or add a unit change in Global.Configuration.Units*/
  selectUnit:function(field,newUnit){
    Global.Configuration.Units[field]=newUnit;
    //call init if it exists (common function everywhere)
    if(typeof(init)=='function'){
      init();
    }
  },

  /* return a multiplier for a field */
  multiplier:function(field){
    //if magnitude is not inside Units, multiplier is 1
    if(Info[field]===undefined){return 1}
    if(Units[Info[field].magnitude]===undefined){return 1}
    //look for current unit: first inside configuration, if not, in Info[field]
    var currentUnit = Global.Configuration.Units[field] || Info[field].unit;
    //multiplier is in Units[magnitude][unit]
    return Units[Info[field].magnitude][currentUnit] || 1;
  },

  /* CONVERSION BETWEEN MAGNITUDES */
  "Distance":{
    "cm":0.01,
    "m":1, //base unit
    "km":1000,
  },
  "Mass":{
    "g":0.001,
    "kg":1, //base unit
    "t":1e3,
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
    L:0.001,
    m3:1, //base unit
    dam3:1000,
    hm3:1000000,
    km3:1000000000,
  },
  "Flow":{
    "L/s":0.001,
    "m3/day":1/86400,
    "m3/s":1, //base unit
  },
  "Energy":{
    Joule:1/3600000,
    kWh:1, //base unit
    MWh:1000,
    GWh:1000000,
    TJ:1e7/36,
  },
};
