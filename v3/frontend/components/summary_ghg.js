let summary_ghg = new Vue({
  el:"#summary_ghg",

  data:{
    visible:false,

    //avoided ghg - list of variables
    ghg_avoided:[
      {level:'Waste', sublevel:'Treatment', code:'wwt_SL_GHG_avoided'},
      {level:'Waste', sublevel:'Treatment', code:'wwt_wr_C_seq_slu'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo_d'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_SL_ghg_non'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo'},
      {level:'Faecl', sublevel:'Treatment', code:'fst_SL_GHG_avoided'},
      {level:'Faecl', sublevel:'Reuse',     code:'fsr_ghg_avoided_land'},
      {level:'Faecl', sublevel:'Reuse',     code:'fsr_ghg_avoided_reuse'},
    ],

    //frontend
    variable,
    caption,

    //backend
    Global,
    Structure,
    Languages,
  },

  methods:{
    translate,
    format,
    go_to,
    get_variable_value,

    put_detailed_ghg_sources_on_caption(level, sublevel){
      //get #caption element
      let cap = document.querySelector('#caption');
      cap.innerHTML ="";

      //create new div
      let div = document.createElement('div');
      cap.appendChild(div);
      div.innerHTML=`<div><b>${translate(level)} ${translate(sublevel)}</b></div>`;

      //get emission code
      let code = this.Structure.find(s=>(s.level==level && s.sublevel==sublevel)).prefix + '_KPI_GHG';

      //get stage of emission
      let stage = this.Global[level][sublevel];

      //if no emission, end
      if(!this.Global[code]()){
        div.innerHTML += "<div><small>~"+translate('No emissions')+"</small></div>";
        return;
      }

      div.innerHTML += "<code>"+translate('Detailed GHG sources')+"<code>";

      //create new table
      let table = document.createElement('table');
      table.style.width = "100%";
      div.appendChild(table);

      stage.equations.forEach(field=>{
        if(field.search('_KPI_GHG_')==-1) return;

        //get value
        let value = this.Global[field](); //kgCO2eq
        if(!value) return;

        //create new row
        let newRow = table.insertRow(-1);
        newRow.insertCell(-1).innerHTML = translate(field+"_descr").prettify();
        newRow.insertCell(-1).innerHTML = format(value);
      })
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <summaries current_view=summary_ghg></summaries>

      <!--summary ghg title-->
      <h1 style="color:black;text-align:center">GHG emissions</h1>

      <!--summary ghg 3 tables-->
      <div>
        <table style="margin:auto;width:80rem">
          <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)">
            <!--level 1-->
            <tr>
              <td colspan=2 :style="{background:l1.color,color:'white',padding:'2em 0'}">
                <div style="display:flex;justify-content:center;align-items:center;font-size:large;">
                  <div style="margin-right:2em">
                    <a @click="go_to(l1.level)" style="color:white;">
                      {{ translate(l1.level) }}
                    </a>
                  </div>
                  <div style="
                    display:grid;
                    grid-template-columns:30% 30% 30%;
                    grid-gap:5px;
                    text-align:center;
                    min-width:50%;
                  ">
                    <div style="font-size:small;">kgCO<sub>2</sub>eq</div>
                    <div style="font-size:small;">kgCO<sub>2</sub>eq/{{translate('year')}}</div>
                    <div style="font-size:small;">kgCO<sub>2</sub>eq/{{translate('year')}}/serv.pop.</div>
                    <div
                      class=l1_number_placeholder :style="{color:l1.color}"
                      v-html="format(
                        Global[l1.prefix+'_KPI_GHG']()
                      )
                    "></div>
                    <div
                      class=l1_number_placeholder :style="{color:l1.color}"
                      v-html="format(
                        Global[l1.prefix+'_KPI_GHG']() / Global.Years()
                      )
                    "></div>
                    <div
                      class=l1_number_placeholder :style="{color:l1.color}"
                      v-html="format(
                        Global[l1.prefix+'_KPI_GHG']() / Global.Years() / get_variable_value(l1.prefix+'_serv_pop')
                      )
                    "></div>
                  </div>
                </div>
              </td>
            </tr>

            <!--level 2-->
            <tr v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
              v-if="Global.Configuration.ActiveStages[l2.alias]"
              @mouseenter="put_detailed_ghg_sources_on_caption(l2.level, l2.sublevel)"
              @mousemove="caption.show($event)"
              @mouseout="caption.hide()"
            >
              <td :style="{background:'var(--color-level-'+l1.level+'-secondary)'}">
                <img :src="'frontend/img/'+l2.alias+'.svg'" style="width:100px;display:block;margin:auto">
              </td>
              <td>
                <div style="display:flex;align-items:center;font-size:large;">
                  <div :style="{color:l1.color, marginRight:'1em', width:'20%'}">
                    {{translate(l2.sublevel)}}
                  </div>
                  <div
                    style="
                      display:grid;
                      grid-template-columns:30% 30% 30%;
                      grid-gap:5px;
                      min-width:50%;
                      text-align:center;
                    "
                  >
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq/{{translate('year')}}</div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq/{{translate('year')}}/serv.pop.</div>
                    <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.prefix+'_KPI_GHG']())"></div>
                    <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.prefix+'_KPI_GHG']() / Global.Years())"></div>
                    <div class=l2_number_placeholder :style="{color:l1.color, border:'1px solid '+l1.color}" v-html="format(Global[l2.prefix+'_KPI_GHG']() / Global.Years() / get_variable_value(l1.prefix+'_serv_pop'))"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!--emissions avoided-->
        <div style="margin:10px 0">
          <table border=1 style="width:70%;margin:auto">
            <tr>
              <th style=background:#bbb :rowspan="ghg_avoided.length+1">
                <a @click="variable.view('ww_GHG_avoided')" style="color:white" title="ww_GHG_avoided">
                  {{ translate("ww_GHG_avoided_descr") }}
                </a>
                <div>
                  <span v-html="format( Global.ww_GHG_avoided() )">
                  </span>
                </div>
                <small>
                  kgCO<sub>2</sub>eq
                </small>
              </th>
            </tr>
            <tr v-for="obj in ghg_avoided">
              <td>
                <a @click="variable.view(obj.code)" :title="obj.code">
                  {{ translate(obj.code+'_descr') }}
                  <span v-if="obj.code.search('fs')==0">
                    (FSM)
                  </span>
                </a>
              </td>
              <td>
                <span v-html="format( Global[obj.code]() )">
                </span>
              </td>
            </tr>
          </table>
          <div style="font-size:smaller;text-align:center">
            {{ translate('Note: the emissions above have not been subtracted in the totals presented in the GHG emissions summary')}}
          </div>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #summary_ghg {
        background:#f6f6f6;
      }
      #summary_ghg table {
        border-collapse:separate;
        border-spacing:3px;
      }
      #summary_ghg table th,
      #summary_ghg table td {
        border:none;
        background:white;
      }
      #summary_ghg div.l1_number_placeholder {
        font-weight:bold;
        background:white;
        padding:0.5em 0;
      }
      #summary_ghg div.l2_number_placeholder {
        font-weight:bold;
        padding:0.5em 0;
      }
    </style>
  `
});
