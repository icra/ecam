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
      div.innerHTML += `<div><b>${translate(level)} ${translate(sublevel)}</b></div>`;

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

      for(let field in stage.equations){
        if(field.search('_KPI_GHG_')+1) {
          let value = this.Global[field](); //kgCO2
          if(!value){continue}
          let newRow = table.insertRow(-1);
          newRow.insertCell(-1).innerHTML = translate(field+"_descr").prettify();
          newRow.insertCell(-1).innerHTML = format(value);
        }
      }

    },

  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <!--summary ghg title-->
      <h1 style="text-align:center">
        <div>
          <span>{{ Global.General.Name }}</span> &mdash;
          <span>{{ translate("GHG Emissions Summary (Overview)") }}</span> &mdash;
          <span>{{ translate("assessment_period") }}:</span>
          <span>
             <span>{{format(Global.Days( )) }}</span> {{ translate("days")  }}
            (<span>{{format(Global.Years()) }}</span> {{ translate("years") }})
          </span>
        </div>
      </h1>

      <!--summary ghg 3 tables-->
      <div style="padding:0 2px">
        <table border=1 style="width:70%;margin:auto">
          <!--total ghg-->
          <tr>
            <td
              style="
                background:var(--color-level-generic);
                color:white;
                font-size:large;
              "
            >
              <!--summary ghg co2 icon-->
              <div style="text-align:center">
                <img src="frontend/img/sources.png" style="width:100px">
              </div>
              {{ translate("TOTAL GHG") }}
              <ul>
                <!--summary ghg total kg CO2-->
                <li>
                  {{format( Global.TotalGHG()) }}
                  <span class=unit>kgCO<sub>2</sub>eq</span>
                </li>
                <!--summary ghg kg CO2 per year-->
                <li>
                  {{format( Global.TotalGHG()/Global.Years() )}}
                  <span class=unit>kgCO<sub>2</sub>eq/{{translate('year')}}</span>
                </li>
              </ul>
            </td>
            <td style="padding:0;vertical-align:top">
              <table border=1 style="width:100%;">
                <tr>
                  <th>{{translate('stage')}}</th>
                  <th style="text-align:right">kgCO<sub>2</sub>eq</th>
                  <th style="text-align:right">kgCO<sub>2</sub>eq/{{translate('year')}}</th>
                  <th style="text-align:right">kgCO<sub>2</sub>eq/{{translate('year')}}/{{translate('serv.pop.')}}</th>
                </tr>
                <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)"
                  v-if="Global.Configuration.ActiveStages[l1.alias]"
                >
                  <!--level 1-->
                  <tr :style="'background:'+l1.color+';color:white'">
                    <td>
                      <div class=flex style="align-items:center">
                        <div>
                          <img :src="'frontend/img/'+l1.alias+'.png'" style="width:25px">
                        </div>
                        <div style="margin-left:5px">
                          <a @click="go_to(l1.level)" style="color:white;">
                            {{ translate(l1.level) }}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td class=number v-html="format(
                        Global[l1.prefix+'_KPI_GHG']()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.prefix+'_KPI_GHG']() / Global.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.prefix+'_KPI_GHG']() / Global.Years() / get_variable_value(l1.prefix+'_serv_pop')
                      )
                    "></td>
                  </tr>

                  <!--level 2-->
                  <tr v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
                    v-if="Global.Configuration.ActiveStages[l2.alias]"
                    @mouseenter="put_detailed_ghg_sources_on_caption(l2.level, l2.sublevel)"
                    @mousemove="caption.show($event)"
                    @mouseout="caption.hide()"
                  >
                    <td>
                      <div class=flex style="align-items:center;">
                        <div>
                          <img :src="'frontend/img/'+l2.alias+'.png'" style="width:20px">
                        </div>
                        <div style="margin-left:20px">
                          <a @click="go_to(l2.level, l2.sublevel)" style="cursor:pointer">
                            {{translate(l2.sublevel)}}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td class=number v-html="format(
                        Global[l2.prefix+'_KPI_GHG']()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.prefix+'_KPI_GHG']() / Global.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.prefix+'_KPI_GHG']() / Global.Years() / get_variable_value(l1.prefix+'_serv_pop')
                      )
                    "></td>
                  </tr>

                  <!--untreated wastewater-->
                  <tr v-if="l1.level=='Waste'">
                    <td>
                      <a @click="variable.view('ww_KPI_GHG_unt')">
                        {{translate("ww_KPI_GHG_unt_descr")}}
                      </a>
                    </td>
                    <td class=number v-html="format(
                        Global.ww_KPI_GHG_unt()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global.ww_KPI_GHG_unt() / Global.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global.ww_KPI_GHG_unt() / Global.Years() / Global.ww_serv_pop()
                      )
                    "></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>

        <!--emissions outside boundaries-->
        <div style="margin:10px 0">
          <table border=1 style="width:70%;margin:auto">
            <tr>
              <th style="background:purple">
                {{translate("GHG emissions")}}
                <br>
                {{translate("outside utility boundaries")}}
              </th>
              <th style="background:purple;text-align:right">kgCO<sub>2</sub>eq</th>
              <th style="background:purple;text-align:right">kgCO<sub>2</sub>eq/{{translate('year')}}</th>
              <th style="background:purple;text-align:right">kgCO<sub>2</sub>eq/{{translate('year')}}/{{translate('serv.pop.')}}</th>
            </tr>
            <tr>
              <td style="text-align:center">
                <a @click="variable.view('ww_SL_ghg_unc')" title="ww_SL_ghg_unc">
                  {{translate("ww_SL_ghg_unc_descr")}}
                </a>
              </td>
              <td class=number>
                <span v-html="format(Global.ww_SL_ghg_unc())"></span>
              </td>
              <td class=number>
                <span v-html="format(
                  Global.ww_SL_ghg_unc() / Global.Years()
                )"></span>
              </td>
              <td class=number>
                <span v-html="format(
                  Global.ww_SL_ghg_unc() / Global.Years() / Global.ww_serv_pop()
                )"></span>
              </td>
            </tr>
          </table>
          <div style="font-size:smaller;text-align:center">
            {{translate('Note: the emissions above have not been added in the totals presented in the GHG emissions summary')}}
          </div>
        </div>

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
});
