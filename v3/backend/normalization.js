//data structure to perform normalization: this means kg of CO2 divided by
//different variables (for example, kgCO2/inhabitant/year, kgCO2/m3)
//variables normalized are in the first output table in tier b
//TODO
let Normalization={
  Water:{
    "kgCO2eq/year/serv.pop.":function(code){
      return Global.Water[code]()/Global.Years()/Global.Water.ws_serv_pop()||0;
    },
    Abstraction:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return -1;
      },
    },
    Treatment:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return -1;
      },
    },
    Distribution:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return substage[code]()/Global.Years()/substage.wsd_serv_pop||0;
      },
    },
  },

  Waste:{
    "kgCO2eq/year/serv.pop.":function(code){
      return Global.Waste[code]()/Global.Years()/Global.Waste.ww_serv_pop()||0;
    },
    Collection:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return substage[code]()/Global.Years()/substage.wwc_conn_pop||0;
      },
    },
    Treatment:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return substage[code]()/Global.Years()/substage.wwt_serv_pop||0;
      },
    },
    Onsite:{
      "kgCO2eq/year/serv.pop.":function(substage, code){
        return substage[code]()/Global.Years()/substage.wwo_onsi_pop||0;
      },
    },
  },
};
