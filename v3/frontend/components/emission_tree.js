Vue.component('emission',{
  props:[
    'code',
    'obj',
  ],

  data(){
    return {
      variable,
    };
  },

  methods:{
    format,
    translate,
    get_variable_value,
  },

  template:`
    <details>
      <summary>
        <b v-html="code"></b>
        (<span v-html="format(get_variable_value(code))"></span>)
        &mdash;
        <small v-html="translate(code+'_descr')"></small>
        &mdash;
        <button @click="variable.view(code)">view</button>
      </summary>

      <div>
        <emission
          v-if="Object.keys(obj).length"
          v-for="(o,c) in obj"
          :obj="o"
          :code="c"
          :key="c"
        ></emission>
      </div>
    </details>
  `,
});

let emission_tree = new Vue({
  el:"#emission_tree",

  methods:{
    format,
    translate,
    expand_all_nodes(){
      document.querySelectorAll('#emission_tree details').forEach(d=>{d.setAttribute('open',true)});
    },
    collapse_all_nodes(){
      document.querySelectorAll('#emission_tree details').forEach(d=>{d.removeAttribute('open')});
    },
  },

  data:{
    visible:false,
    emission_tree:{
      ws_KPI_GHG:{
        wsa_KPI_GHG:{
          wsa_KPI_GHG_elec:{/*end*/},
          wsa_KPI_GHG_fuel:{
            wsa_KPI_GHG_fuel_co2:{/*end*/},
            wsa_KPI_GHG_fuel_n2o:{/*end*/},
            wsa_KPI_GHG_fuel_ch4:{/*end*/},
          },
        },
        wst_KPI_GHG:{
          wst_KPI_GHG_elec:{/*end*/},
          wst_KPI_GHG_fuel:{
            wst_KPI_GHG_fuel_co2:{/*end*/},
            wst_KPI_GHG_fuel_n2o:{/*end*/},
            wst_KPI_GHG_fuel_ch4:{/*end*/},
          },
        },
        wsd_KPI_GHG:{
          wsd_KPI_GHG_elec:{/*end*/},
          wsd_KPI_GHG_fuel:{
            wsd_KPI_GHG_fuel_co2:{/*end*/},
            wsd_KPI_GHG_fuel_n2o:{/*end*/},
            wsd_KPI_GHG_fuel_ch4:{/*end*/},
          },
          wsd_KPI_GHG_trck:{
            wsd_KPI_GHG_trck_co2:{/*end*/},
            wsd_KPI_GHG_trck_n2o:{/*end*/},
            wsd_KPI_GHG_trck_ch4:{/*end*/},
          },
        },
      },
      ww_KPI_GHG:{
        wwc_KPI_GHG:{
          wwc_KPI_GHG_elec:{/*end*/},
          wwc_KPI_GHG_fuel:{
            wwc_KPI_GHG_fuel_co2:{/*end*/},
            wwc_KPI_GHG_fuel_n2o:{/*end*/},
            wwc_KPI_GHG_fuel_ch4:{/*end*/},
          },
        },
        wwt_KPI_GHG:{
          wwt_KPI_GHG_elec:{/*end*/},
          wwt_KPI_GHG_fuel:{
            wwt_KPI_GHG_fuel_co2:{/*end*/},
            wwt_KPI_GHG_fuel_n2o:{/*end*/},
            wwt_KPI_GHG_fuel_ch4:{/*end*/},
          },
          wwt_KPI_GHG_tre:{
            wwt_KPI_GHG_tre_n2o:{}, //end
            wwt_KPI_GHG_tre_ch4:{}, //end
          },
          wwt_KPI_GHG_dig_fuel:{
            wwt_KPI_GHG_dig_fuel_co2:{}, //end
            wwt_KPI_GHG_dig_fuel_n2o:{}, //end
            wwt_KPI_GHG_dig_fuel_ch4:{}, //end
          },
          wwt_KPI_GHG_biog:{}, //end
          wwt_KPI_GHG_slu:{
            wwt_KPI_ghg_sto_co2eq:{
              wwt_slu_storage_ch4:{}, //end
            },
            wwt_KPI_ghg_comp_co2eq:{
              wwt_slu_composting_ch4:{}, //end
              wwt_slu_composting_n2o:{}, //end
            },
            wwt_KPI_ghg_inc_co2eq:{
              wwt_slu_inciner_ch4:{}, //end
              wwt_slu_inciner_n2o:{}, //end
            },
            wwt_KPI_ghg_app_co2eq:{
              wwt_slu_landapp_n2o:{}, //end
            },
            wwt_KPI_ghg_land_co2eq:{
              wwt_slu_landfill_ch4:{}, //end
              wwt_slu_landfill_n2o:{}, //end
            },
            wwt_KPI_ghg_stock_co2eq:{}, //end
            wwt_KPI_ghg_tsludge:{
              wwt_KPI_ghg_tsludge_co2:{}, //end
              wwt_KPI_ghg_tsludge_n2o:{}, //end
              wwt_KPI_ghg_tsludge_ch4:{}, //end
            },
          },
        },
        wwd_KPI_GHG:{
          wwd_KPI_GHG_elec:{}, //end
          wwd_KPI_GHG_fuel:{
            wwd_KPI_GHG_fuel_co2:{/*end*/},
            wwd_KPI_GHG_fuel_n2o:{/*end*/},
            wwd_KPI_GHG_fuel_ch4:{/*end*/},
          },
          wwd_KPI_GHG_trck:{
            wwd_KPI_GHG_trck_co2:{}, //end
            wwd_KPI_GHG_trck_n2o:{}, //end
            wwd_KPI_GHG_trck_ch4:{}, //end
          },
          wwd_KPI_GHG_tre:{
            wwd_KPI_GHG_tre_n2o:{}, //end
            wwd_KPI_GHG_tre_ch4:{}, //end
          }
        },
        ww_KPI_GHG_unt:{
          ww_KPI_GHG_unt_n2o:{}, //end
          ww_KPI_GHG_unt_ch4:{}, //end
        },
      },
      fs_KPI_GHG:{
        fsc_KPI_GHG:{
          fsc_KPI_GHG_elec:{}, //end
          fsc_KPI_GHG_trck:{
            fsc_KPI_GHG_trck_co2:{}, //end
            fsc_KPI_GHG_trck_n2o:{}, //end
            fsc_KPI_GHG_trck_ch4:{}, //end
          },
          fsc_KPI_GHG_cont:{}, //end
        },
        fst_KPI_GHG:{
          fst_KPI_GHG_elec:{}, //end
          fst_KPI_GHG_trck:{
            fst_KPI_GHG_trck_co2:{}, //end
            fst_KPI_GHG_trck_n2o:{}, //end
            fst_KPI_GHG_trck_ch4:{}, //end
          },
          fst_KPI_GHG_biog:{}, //end
          fst_KPI_GHG_fuel:{
            fst_KPI_GHG_fuel_co2:{}, //end
            fst_KPI_GHG_fuel_n2o:{}, //end
            fst_KPI_GHG_fuel_ch4:{}, //end
          },
          fst_KPI_GHG_tre:{
            fst_KPI_GHG_tre_ch4:{}, //end
            fst_KPI_GHG_tre_n2o:{}, //end
          },
        },
        fsr_KPI_GHG:{
          fsr_KPI_GHG_elec:{}, //end
          fsr_KPI_GHG_fuel:{
            fsr_KPI_GHG_fuel_co2:{}, //end
            fsr_KPI_GHG_fuel_n2o:{}, //end
            fsr_KPI_GHG_fuel_ch4:{}, //end
          },
          fsr_KPI_GHG_trck:{
            fsr_KPI_GHG_trck_co2:{}, //end
            fsr_KPI_GHG_trck_n2o:{}, //end
            fsr_KPI_GHG_trck_ch4:{}, //end
          },
          fsr_KPI_GHG_landapp:{}, //end
          fsr_KPI_GHG_landfil:{
            fsr_KPI_GHG_landfil_n2o:{}, //end
            fsr_KPI_GHG_landfil_ch4:{}, //end
          },
          fsr_KPI_GHG_dumping:{
            fsr_KPI_GHG_dumping_n2o:{}, //end
            fsr_KPI_GHG_dumping_ch4:{}, //end
          },
          fsr_KPI_GHG_tre:{
            fsr_KPI_GHG_tre_ch4:{}, //end
            fsr_KPI_GHG_tre_n2o:{}, //end
          },
          fsr_KPI_GHG_urine:{}, //end
        },
      },
    },
    Global,
    Languages,
  },

  template:`
    <div id=emission_tree v-if="visible && Languages.ready">
      <h1>All GHG emissions (kgCO<sub>2</sub> eq)</h1>
      <p>
        This tree contains all GHG emissions grouped by origin. Click on each
        emission see the other emissions that form it. Click on "view" to see all the other details.
      </p>
      <p>
        <button @click="expand_all_nodes">expand all nodes</button>
        <button @click="collapse_all_nodes">collapse all nodes</button>
      </p>

      <div>
        <emission :key="'TotalGHG'" :code="'TotalGHG'" :obj="emission_tree" ></emission>
      </div>

    </div>
  `,
});
