//meaning of serviced population for each stage
let Normalization={
  Water:{
    Total:function(){return Global.Water.ws_serv_pop()}, //sum of serviced populations in Distribution
    Abstraction:false,
    Treatment:false,
    Distribution:function(substage){return substage.wsd_serv_pop}, //serviced population
  },
  Waste:{
    Total:     function(        ){return Global.Waste.ww_serv_pop()}, //sum of serviced populations in Treatment and Onsite
    Collection:function(substage){return substage.wwc_conn_pop}, //connected population
    Treatment: function(substage){return substage.wwt_serv_pop}, //serviced population
    Onsite:    function(substage){return substage.wwo_onsi_pop}, //serviced population
  },
};
