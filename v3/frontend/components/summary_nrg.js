let summary_nrg = new Vue({
  el:"#summary_nrg",

  data:{
    visible:false,
    Global,
    Structure,
  },

  methods:{
    translate,
    format,
    go_to,
  },

  template:`
    <!--summary nrg VIEW-->
    <div id=summary_nrg v-if="visible">
      <!--summary nrg title-->
      <h1 style="text-align:center">
        <div>
          <span>{{ Global.General.Name }}                               </span> &mdash;
          <span>{{ translate("Energy consumption Summary (Overview)") }}</span> &mdash;
          <span>{{ translate("assessment_period") }}:                   </span>
          <span>
             <span>{{format(Global.General.Days( )) }}</span> {{ translate("days")  }}
            (<span>{{format(Global.General.Years()) }}</span> {{ translate("years") }})
          </span>
        </div>
      </h1>

      <!--summary nrg table-->
      <div style="padding:0 2px">
        <table border=1 style="margin:auto">
          <!--total nrg-->
          <tr>
            <td
              style="
                background:var(--color-level-generic);
                color:white;
                font-size:large;
              "
            >
              <!--summary nrg icon-->
              <div style="text-align:center">
                <img src="frontend/img/energy.png" style="width:100px">
              </div>
              {{ translate("TOTAL ENERGY CONSUMED") }}
              <ul>
                <!--summary nrg total-->
                <li>
                  {{format( Global.General.TotalNRG()) }}
                  <span class=unit>kWh</span>
                </li>
                <!--summary nrg total per year-->
                <li>
                  {{format( Global.General.TotalNRG()/Global.General.Years() )}}
                  <span class=unit>kWh/{{translate('year')}}</span>
                </li>
              </ul>
            </td>
            <td style="padding:0">
              <table border=1 style=margin:-1px>
                <tr>
                  <th>{{translate('stage')}}</th>
                  <th>kWh</th>
                  <th>kWh/{{translate('year')}}</th>
                  <th>kWh/{{translate('year')}}/{{translate('serv.pop.')}}</th>
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
                        Global[l1.level][l1.prefix+'_nrg_cons']()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.level][l1.prefix+'_nrg_cons']() / Global.General.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l1.level][l1.prefix+'_nrg_cons']() / Global.General.Years() / get_variable_value(l1.prefix+'_serv_pop')
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
                        Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons']
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons'] / Global.General.Years()
                      )
                    "></td>
                    <td class=number v-html="format(
                        Global[l2.level][l2.sublevel][l2.prefix+'_nrg_cons'] / Global.General.Years() / get_variable_value(l1.prefix+'_serv_pop')
                      )
                    "></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
});
