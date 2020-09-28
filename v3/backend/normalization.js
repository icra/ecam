//data structure to perform normalization: this means kg of CO2 divided by
//different variables (for example, kgCO2/inhabitant/year, kgCO2/m3)
//variables normalized are in the first output table in tier b
let Normalization={
  Water:{
    resi_pop: function(emission){ return emission/Global.Water.ws_resi_pop/Global.Years()||0},
    serv_pop: function(emission){ return emission/Global.Water.Distribution.wsd_serv_pop/Global.Years()||0},
    volume:   function(emission){ return emission/Global.Water.Distribution.wsd_auth_con||0},
    energy:   function(emission){ return emission/Global.Water.ws_nrg_cons()||0},

    Abstraction:{
      volume: function(emission){return emission/Global.Water.Abstraction.wsa_vol_conv||0},
      energy: function(emission){return emission/Global.Water.Abstraction.wsa_nrg_cons||0},
    },

    Treatment:{
      volume: function(emission){return emission/Global.Water.Treatment.wst_vol_trea||0},
      energy: function(emission){return emission/Global.Water.Treatment.wst_nrg_cons||0},
    },

    Distribution:{
      volume: function(emission){return emission/Global.Water.Distribution.wsd_vol_dist||0},
      energy: function(emission){return emission/Global.Water.Distribution.wsd_nrg_cons||0},
    },
  },

  Waste:{
    resi_pop: function(emission){ return emission/Global.Waste.ww_resi_pop/Global.Years()||0},
    serv_pop: function(emission){ return emission/Global.Waste.Treatment.wwt_serv_pop/Global.Years()||0},
    volume:   function(emission){ return emission/Global.Waste.Treatment.wwt_vol_trea||0},
    energy:   function(emission){ return emission/Global.Waste.ww_nrg_cons()||0},

    Collection:{
      volume: function(emission){ return emission/Global.Waste.Collection.wwc_vol_coll||0},
      energy: function(emission){ return emission/Global.Waste.Collection.wwc_nrg_cons||0},
    },

    Treatment:{
      volume: function(emission){ return emission/Global.Waste.Treatment.wwt_vol_trea||0},
      energy: function(emission){ return emission/Global.Waste.Treatment.wwt_nrg_cons||0},
    },

    Onsite:{
      volume: function(emission){ return emission/Global.Waste.Onsite.wwd_total_m3||0}, //TODO
      energy: function(emission){ return emission/Global.Waste.Onsite.wwd_nrg_cons||0},
    },
  },
};
