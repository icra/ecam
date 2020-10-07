Vue.component('emission',{
  props:[
    'code',
    'obj',
  ],

  data(){
    return {
      Global,
      variable,
    };
  },

  methods:{
    format,
    translate,
  },

  template:`
    <details>
      <summary>
        <b v-html="code"></b>
        (<span v-html="format(Global[code]())"></span>)
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
        },
        wst_KPI_GHG:{
        },
        wsd_KPI_GHG:{
        },
      },
      ww_KPI_GHG:{
        wwc_KPI_GHG:{
        },
        wwt_KPI_GHG:{
        },
        wwo_KPI_GHG:{
        },
      },
    },
    Global,
    Languages,
  },

  template:`
    <div id=emission_tree v-if="visible && Languages.ready">
      <summaries current_view=emission_tree></summaries>

      <h1>All GHG emissions (kgCO<sub>2</sub> eq)</h1>
      <div style=margin-left:8px>
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
    </div>
  `,

  style:`
    <style>
      #emission_tree {
      }
      #emission_tree details {
        padding-left:10px;
      }
      #emission_tree details summary {
        cursor:pointer;
      }
    </style>
  `,
});
