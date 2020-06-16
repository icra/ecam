let tier_a = new Vue({
  el:"#tier_a",

  data:{
    visible:false,

    Global,
    Info,
    Structure,
    Questions,
    Tables,
    Languages,
  },

  methods:{
    translate,
    format,
    get_current_unit,
  },

  template:`
    <div id=tier_a v-if="visible && Languages.ready">
      <h1>
        {{translate('quick_assessment')}} &mdash;
        {{translate('initial_estimation_description')}}
      </h1>

      <!--context info below tier a title-->
      <div class=flex
        style="
          background:#fafafa;
          box-shadow: 0 1px 2px rgba(0,0,0,.5);
          color:#666;
          font-size:smaller;
          justify-content:space-between;
          padding:0.5em 2em;
        ">
        <!--assessment period-->
        <div>
          <a onclick="ecam.show('get_started')">
            {{translate('assessment_period')}}
          </a>:
          <span>
            {{ format(Global.Days()) }}
          </span>
          <span>
            {{ translate('days') }}
          </span>
        </div>

        <!--conv_co2_kwh-->
        <div>
          <a onclick="ecam.show('configuration')">
            {{translate('conversion_factor')}}
          </a>:
          <span>
            {{format(Global.General.conv_kwh_co2)}}
          </span>
          <span>
            kg CO<sub>2</sub>eq/kWh
          </span>
        </div>

        <!--prot_cont-->
        <div>
          <a onclick="ecam.show('configuration')">
            {{translate('Annual_protein_consumption')}}
          </a>:
          <span>
            {{format(Global.General.prot_con)}}
          </span>
          <span>
            kg/{{ translate('person') }}/{{ translate('year') }}
          </span>
        </div>

        <!--bod_pday-->
        <div>
          <a onclick="ecam.show('configuration')">
            {{translate('bod_pday_descr')}}
          </a>:
          <span>
            {{format(Global.General.bod_pday)}}
          </span>
          <span>
            kg/{{ translate('person') }}/{{ translate('day') }}
          </span>
        </div>
      </div>

      <!--tier a inputs and outputs-->
      <div class=flex style="padding:10px 2px;justify-content:space-between;">
        <!--tier a inputs-->
        <div>
          <table>
            <tbody v-for="level,key in Global.Tier_A">
              <tr :style="'color:white;background:'+Structure.find(s=>s.level==key).color">
                <td colspan=3>
                  <img :src="'frontend/img/'+Structure.find(s=>s.level==key).alias+'.png'"
                    style="width:25px;line-height:4em;vertical-align:middle"
                  >
                  {{translate(key)}}
                </td>
              </tr>

              <!--stage not active indicator-->
              <tr v-if="!Global.Configuration.ActiveStages[Structure.find(s=>s.level==key).alias]">
                <td colspan=3 style="color:#999;background:#eee;font-size:smaller">
                  {{translate('birds_stage_not_active')}}
                </td>
              </tr>

              <!--tier a inputs-->
              <tr
                v-if="(typeof(val)=='number' || typeof(val)=='boolean') && Global.Configuration.ActiveStages[Structure.find(s=>s.level==key).alias]"
                v-for="val,code in level"
              >
                <!--tier a input description-->
                <td :colspan="(Info[code] && Info[code].magnitude=='Option') ? 3 : 1">
                  <div>
                    <!--tier a input description-->
                    <div>
                      <div v-if="Questions[code]">
                        {{ translate(code) }}?
                      </div>
                      <div v-else>
                        {{ translate(code+'_descr') }}
                      </div>
                    </div>
                    <!--options select element-->
                    <div v-if="Info[code] && Info[code].magnitude=='Option'">
                      <select v-model="level[code]">
                        <option v-for="obj,key in Tables[code]" :value="obj.value">
                          {{translate(key)}}
                        </option>
                      </select>
                    </div>
                  </div>
                </td>

                <!--tier a input value: only questions and non-options-->
                <td
                  v-if="Questions[code] || (Info[code] && Info[code].magnitude!='Option')"
                  :colspan="Questions[code] ? 2 :1"
                  style="padding:0"
                >
                  <div v-if="Questions[code]">
                    <label>
                      <input type=checkbox v-model="level[code]">
                      {{translate('yes')}}
                    </label>
                  </div>
                  <div v-else>
                    <input type=number v-model.number="level[code]">
                  </div>
                </td>

                <!--tier a input unit-->
                <td v-if="!Questions[code] && !(Info[code] && Info[code].magnitude=='Option')">
                  <span v-html="get_current_unit(code).prettify()"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--tier a outputs-->
        <div>
          <b>Tier A outputs (for drawing charts TODO)</b>:

          <table>
            <tbody v-for="obj,level in Global.Tier_A"
              v-if="Global.Configuration.ActiveStages[Structure.find(s=>s.level==level).alias]"
            >
              <tr>
                <th colspan=3>{{ translate(level) }}</th>
              </tr>
              <tr v-for="fx,key in Global.Tier_A[level]" v-if="typeof(fx)=='function'">
                <td>
                  <b>
                    {{key}}:
                  </b>
                </td>
                <td>
                  <span v-html="format(Global.Tier_A[level][key]())"></span>
                </td>
                <td>
                  <span v-html="Info[key] ? Info[key].unit.prettify() : 'no unit'"></span>
                </td>
              </tr>
            </tbody>
          </table>

          figures here TODO
          <ul>
            <li>ghg emissions by system</li>
            <li>ghg emissions by source</li>
            <li>ghg emissions by source (detailed)</li>
            <li>ghg emissions by UNFCCC categories</li>

            <li>energy consumption by system</li>

            <li>water supply total running costs</li>
            <li>wastewater total running costs</li>

            <li>serviced population in water supply (%)</li>
            <li>total ghg water supply (kg/year/serv.pop)</li>

            <li>serviced population in wastewater (%)</li>
            <li>total ghg wastewater (kg/year/serv.pop)</li>

            <li>serviced population in fsm (%)</li>
            <li>total ghg fsm (kg/year/serv.pop)</li>
          </ul>
        </div>
      </div>

      <!--tier a prev next buttons-->
      <div>
        <button class="button prev"
          onclick="event.stopPropagation();ecam.show('population')">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();ecam.show('tier_b')">
          {{translate('next')}}
        </button>
      </div>
    </div>
  `,
});
