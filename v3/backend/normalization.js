//data structure to perform normalization: this means kg of CO2 divided by
//different variables (for example, kgCO2/inhabitant/year, kgCO2/m3)
//variables normalized are in the first output table in tier b

let Normalization={
  Water:{
    "kgCO2eq/year/serv.pop.":function(emission){
      return emission/Global.Years()/Global.Water.Distribution.wsd_serv_pop||0;
    },
    Abstraction:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Water.Distribution.wsd_serv_pop||0;
      },
    },
    Treatment:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Water.Distribution.wsd_serv_pop||0;
      },
    },
    Distribution:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Water.Distribution.wsd_serv_pop||0;
      },
    },
  },

  Waste:{
    "kgCO2eq/year/serv.pop.":function(emission){
      return emission/Global.Years()/Global.ww_serv_pop()||0;
    },
    Collection:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Waste.Collection.wwc_conn_pop||0;
      },
    },
    Treatment:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Waste.Treatment.wwt_serv_pop||0;
      },
    },
    Onsite:{
      "kgCO2eq/year/serv.pop.":function(emission){
        return emission/Global.Years()/Global.Waste.Onsite.wwo_onsi_pop||0;
      },
    },
  },
};
