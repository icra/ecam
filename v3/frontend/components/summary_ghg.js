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
             <span>{{format(Global.General.Days( )) }}</span> {{ translate("days")  }}
            (<span>{{format(Global.General.Years()) }}</span> {{ translate("years") }})
          </span>
        </div>
      </h1>

      <!--summary ghg 3 tables-->
      <div style="padding:0 2px">
        <table border=1 style="margin:auto">
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
                  {{format( Global.General.TotalGHG()) }}
                  <span class=unit>kgCO<sub>2</sub>eq</span>
                </li>
                <!--summary ghg kg CO2 per year-->
                <li>
                  {{format( Global.General.TotalGHG()/Global.General.Years() )}}
                  <span class=unit>kgCO<sub>2</sub>eq/{{translate('year')}}</span>
                </li>
              </ul>
            </td>
            <td style="padding:0">
              <table border=1 style=margin:-1px>
                <tr>
                  <th>{{translate('stage')}}</th>
                  <th>kgCO<sub>2</sub>eq</th>
                  <th>kgCO<sub>2</sub>eq/{{translate('year')}}</th>
                  <th>kgCO<sub>2</sub>eq/{{translate('year')}}/{{translate('serv.pop.')}}</th>
                </tr>
                <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)">
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
                        Global[l1.level][l1.prefix+'_KPI_GHG']()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.level][l1.prefix+'_KPI_GHG']() / Global.General.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.level][l1.prefix+'_KPI_GHG']() / Global.General.Years() / get_variable_value(l1.prefix+'_serv_pop')
                      )
                    "></td>
                  </tr>

                  <!--level 2-->
                  <tr v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
                    v-if="Global.Configuration.ActiveStages[l2.alias]"
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
                        Global[l2.level][l2.sublevel][l2.prefix+'_KPI_GHG']()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.level][l2.sublevel][l2.prefix+'_KPI_GHG']() / Global.General.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.level][l2.sublevel][l2.prefix+'_KPI_GHG']() / Global.General.Years() / get_variable_value(l1.prefix+'_serv_pop')
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
                        Global.Waste.ww_KPI_GHG_unt()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global.Waste.ww_KPI_GHG_unt() / Global.General.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global.Waste.ww_KPI_GHG_unt() / Global.General.Years() / Global.Waste.ww_serv_pop()
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
          <table border=1 style="margin:auto">
            <tr>
              <th style=background:purple>
                {{translate("GHG emissions")}}
                <br>
                {{translate("outside utility boundaries")}}
                <br>
                (kg CO<sub>2</sub> eq)
              </th>
              <td>
                <a @click="variable.view('ww_SL_ghg_unc')" title="ww_SL_ghg_unc">
                  {{translate("ww_SL_ghg_unc_descr")}}
                </a>
              </td>
              <td>
                {{format(Global.Waste.ww_SL_ghg_unc())}}
              </td>
              <td>
                <span class=unit>kgCO<sub>2</sub>eq</span>
              </td>
            </tr>
          </table>
          <div style="font-size:smaller;text-align:center">
            {{translate('Note: the emissions above have not been added in the totals presented in the GHG emissions summary')}}
          </div>
        </div>

        <!--emissions avoided-->
        <div style="margin:10px 0">
          <table border=1 style="margin:auto">
            <tr>
              <th style=background:#bbb :rowspan="ghg_avoided.length+1">
                <a @click="variable.view('ww_GHG_avoided')" style="color:white" title="ww_GHG_avoided">
                  {{ translate("ww_GHG_avoided_descr") }}
                </a>
                <div>
                  <span v-html="format( Global.Waste.ww_GHG_avoided() )">
                  </span>
                </div>
                <small>
                  kg CO<sub>2</sub> eq / {{translate("assessment period")}}
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
                <span v-html="format( Global[obj.level][obj.sublevel][obj.code]() )">
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
