let population = new Vue({
  el:"#population",

  data:{
    visible:false,
    caption,

    Global,
    Structure,
    Languages,

    population:[ //population structure
      {level:'Water', sublevel:false,          code:'ws_resi_pop'},
      {level:'Water', sublevel:"Distribution", code:'wsd_serv_pop'},

      {level:'Waste', sublevel:false,          code:'ww_resi_pop'},
      {level:'Waste', sublevel:"Collection",   code:'wwc_conn_pop'},
      {level:'Waste', sublevel:"Treatment",    code:'wwt_serv_pop'},
      {level:'Waste', sublevel:"Onsite",       code:'wwo_onsi_pop'},
      {level:'Waste', sublevel:"Onsite",       code:'wwo_open_pop'},
    ],
  },

  methods:{
    translate,
    format,
    focus_input(stage, code, event){
      let input = event.target;
      input.value = stage[code]
      input.select();
    },
    blur_input(stage, code, event){
      let input = event.target;
      let value = parseFloat(input.value) || 0;
      stage[code] = value;
      input.value=format(stage[code]);
    },
  },

  template:`
    <div id=population v-if="visible && Languages.ready">
      <h1 style="text-align:center">{{translate('population')}}</h1>

      <h4 style="text-align:center;margin:0;margin-bottom:1em">
        Population living at each stage of the urban water cycle
      </h4>

      <table style="font-size:16px;margin:auto;width:50%">
        <tbody v-for="l1 in Structure.filter(s=>s.sublevel==false)">
          <tr>
            <th colspan=3 :style="{background:l1.color,textAlign:'left',color:'white'}">
              <img :src="'frontend/img/'+l1.alias+'.png'" width=25 style="line-height:4em;vertical-align:middle">
              {{translate(l1.level)}}
            </th>
          </tr>

          <tr v-for="pop in population.filter(p=>p.level==l1.level)">
            <td
              @mousemove="caption.show($event, translate(pop.code+'_expla'))"
              @mouseout="caption.hide()"
            >{{translate(pop.code+'_descr')}}
            </td>

            <td class=input_container>
              <div v-if="!pop.sublevel">
                <input
                  :value="format(Global[pop.level][pop.code])"
                  @focus="focus_input(Global[pop.level], pop.code, $event)"
                  @blur =" blur_input(Global[pop.level], pop.code, $event)"
                  :tabindex="population.indexOf(pop)+1"
                  style="text-align:right"
                >
              </div>
              <div v-else>
                <div v-for="ss in Global[pop.level][pop.sublevel]">
                  <input
                    :value="format(ss[pop.code])"
                    @focus="focus_input(ss, pop.code, $event)"
                    @blur =" blur_input(ss, pop.code, $event)"
                    :tabindex="population.indexOf(pop)+1"
                    style="text-align:right"
                    :title="ss.name"
                  >
                </div>
                <div v-if="Global[pop.level][pop.sublevel].length>1" style="background:white;font-size:smaller">
                  total:
                  {{
                    Global[pop.level][pop.sublevel].map(s=>s[pop.code]).sum()
                  }}
                </div>
              </div>
            </td>

            <td><small>{{translate('people')}}</small></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,

  style:`
    <style>
      #population td[inactive]{
        color:#999;
        background:#eee;
        font-size:smaller;
      }
      #population td.input_container {
        width:70px;
        border:1px solid #aaa;
        color:#666;
        background:#eee;
        padding:0 !important;
        text-align:right;
        cursor:cell;
      }
      #population td.input_container input {
        background:inherit;
        border:none;
        text-align:right;
        line-height:1em;
        width:70px;
        height:24px;
      }
      #population td.input_container input:focus {
        background:white;
      }
    </style>
  `,
});
