let tier_b = new Vue({
  el:"#tier_b",

  data:{
    visible:false,
    level:'Water',
    sublevel:'Abstraction',
    current_stage:Global.Water.Abstraction,
    caption,
    variable,

    Global,
    Info,
    Structure,
    Tips,
    Units,
    Tables,
    Recommendations,
    Exceptions,
    Normalization,
    Formulas,
    Questions,
  },

  methods:{
    translate,
    format,
    get_level_color,

    set_question(question, new_value){
      //set new question answer
      this.Global.Configuration.Questions[question] = new_value;

      //if answer is no:
      if(!new_value){
        //disable related questions recursively
        Questions[question].otherQuestions.forEach(key=>{
          this.set_question(key, false);
        });

        //reset values
        Questions.reset_values(question, this.current_stage);

        //reset folding
        Questions[question].folded = 0;
        Questions[question].otherQuestions.forEach(key=>{
          Questions[key].folded = 0;
        });
      }
    },
  },

  template:`
    <!--tier b VIEW-->
    <div id=tier_b v-if="visible">
      <!--tier b title + tips-->
      <div class=flex
        style="
          justify-content:space-between;
        "
      >
        <h1>
          <a onclick="ecam.show('get_started')">{{Global.Name}}</a>
          <span style="color:black">&rsaquo;</span>
          <a onclick="linear_menu.go_to(tier_b.level)"
            :style="'cursor:pointer;color:'+get_level_color(level)"
          >
            {{translate(level)}}
          </a>
          <span v-if="sublevel">
            <span style="color:black">&rsaquo;</span>
            <span style="font-size:larger;color:black">
              {{translate(sublevel)}}</span>
          </span>
        </h1>

        <!--Tips-->
        <div @click="Tips.random()"
          style="
            font-size:12px;
            color:#666;
            cursor:pointer;
            padding:0.5em;
            line-height:3em;
          "
        >
          <svg style="vertical-align:text-bottom" viewBox="0 0 12 16" width="12" height="16" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"
            ></path>
          </svg>
          <strong>{{translate('Tip')}}!</strong>
          <span v-html="translate(Tips.current)"></span>
          &emsp; &#9654;
        </div>
      </div>

      <!--tier b context info-->
      <div class=flex
        style="
          background:#fafafa;
          font-family:monospace;
          font-size:smaller;
          justify-content:space-between;
          padding:0.2em 2em;
          margin-bottom:10px;
        "
      >
        <!--assessment period-->
        <div>
          <a onclick="ecam.show('get_started')">
            {{translate('assessment_period')}}:
            <b style=color:black>
              <span :class="Global.Days()==0 ? 'warning' : ''">
                {{format(Global.Days())}}
              </span>
            </b>
            &emsp;
            <span>
              {{translate('days')}}
            </span>
          </a>
        </div>

        <!--resident population-->
        <div>
          <a onclick="ecam.show('population')">
            {{translate('ws_resi_pop_descr')}}:
            <b v-if="level=='Water'" style=color:black>
              <span :class="Global.Water.ws_resi_pop==0 ? 'warning' : ''">
                {{format(Global.Water.ws_resi_pop)}}
              </span>
            </b>
            <b v-if="level=='Waste'" style=color:black>
              <span :class="Global.Waste.ww_resi_pop==0 ? 'warning' : ''">
                {{format(Global.Waste.ww_resi_pop)}}
              </span>
            </b>
            <b v-if="level=='Faecl'" style=color:black>
              <span :class="Global.Faecl.fs_resi_pop==0 ? 'warning' : ''">
                {{format(Global.Faecl.fs_resi_pop)}}
              </span>
            </b>
          </a>
        </div>

        <!--connected population only ww-->
        <div v-if="level=='Waste'">
          <a onclick="ecam.show('population')">
            {{translate('ww_conn_pop_descr')}}:
            <b style=color:black>
              <span :class="Global.ww_conn_pop()==0 ? 'warning' : ''">
                {{format(Global.ww_conn_pop())}}
              </span>
            </b>
          </a>
        </div>

        <!--serviced population-->
        <div>
          <div v-if="level=='Water'">
            <a onclick="ecam.show('population')">
              {{translate('ws_serv_pop_descr')}}:
              <b style=color:black>
                <span :class="Global.Water.ws_serv_pop==0 ? 'warning' : ''">
                  {{format(Global.Water.ws_serv_pop)}}
                </span>
              </b>
            </a>
          </div>

          <div v-if="level=='Waste'">
            <a onclick="ecam.show('population')">
              {{translate('ww_serv_pop_descr')}}:
              <b style=color:black>
                <span :class="Global.ww_serv_pop()==0 ? 'warning' : ''">
                  {{format(Global.ww_serv_pop())}}
                </span>
              </b>
            </a>
          </div>

          <div v-if="level=='Faecl'">
            <a onclick="ecam.show('population')">
              {{translate('fs_onsi_pop_descr')}}:
              <b style=color:black>
                <span :class="Global[level].fs_onsi_pop==0 ? 'warning' : ''">
                  {{format(Global[level].fs_onsi_pop)}}
                </span>
              </b>
            </a>
          </div>
        </div>

        <!--kwh to co2 conversion-->
        <div>
          <a onclick="ecam.show('configuration')">
            {{translate('conv_kwh_co2_descr')}}:
            <b style=color:black>
              <span :class="Global.conv_kwh_co2==0 ? 'warning' : ''">
                {{format(Global.conv_kwh_co2)}}
              </span>
            </b>
            <span class=number v-html="Info.conv_kwh_co2.unit"></span>
          </a>
        </div>
      </div>

      <!--tier b inputs and outputs-->
      <div style="display:grid;grid-template-columns:66% 34%;padding:0 5px 0 8px">
        <!--tier b inputs-->
        <div style="padding-right:5px">
          <div class="table-title">
            {{translate('INPUTS') }} &mdash;
            {{translate('Enter values for') }}
            {{sublevel ? translate(sublevel) : translate(level) }}
            {{translate('stages') }}
          </div>

          <!--tier b input table-->
          <table
            :level="level"
            style="width:100%"
          >
            <!--tier b inputs header-->
            <thead>
              <tr :style="'background:'+get_level_color(level)">
                <td>
                  <div style="display:grid;grid-template-columns:60% 30% 10%">
                    <div style="background:inherit;color:white;text-align:center">{{translate('Description')   }}</div>
                    <div style="background:inherit;color:white;text-align:center">{{translate('Current value') }}</div>
                    <div style="background:inherit;color:white;text-align:center">{{translate('edit_unit')     }}</div>
                  </div>
                </td>
              </tr>
            </thead>

            <!--tier b inputs-->
            <tbody>
              <tr
                v-for="key in Object.keys(current_stage).filter(key=>{return Questions.is_inside(key)==false})"
                v-if="typeof(current_stage[key])=='number'"
              >
                <td>
                  <input_ecam :code="key" :current_stage="current_stage">
                  </input_ecam>
                </td>
              </tr>
            </tbody>

            <!--tier b questions-->
            <tbody v-for="question in Questions.get_questions(current_stage)">
              <tr
                :style="'background:'+(Global.Configuration.Questions[question]?'lightgreen':'#eee')"
              ><td
                :class="Questions.is_question_hidden(question) ? 'disabled_question' : ''"
              >
                <div style="display:grid;grid-template-columns:50% 50%">
                  <!--question text-->
                  <div
                    @click="Questions[question].folded^= Global.Configuration.Questions[question]"
                    class="question_container flex"
                    :style="(Global.Configuration.Questions[question]?'cursor:pointer':'')"
                  >
                    <div
                      v-if="Global.Configuration.Questions[question]"
                    >
                      <!--question folded marker-->
                      <div :class="'question_fold_marker '+(Questions[question].folded?'folded':'')">
                        ▼
                      </div>
                    </div>
                    <div v-html="translate(question)+'?'"
                      :class="Global.Configuration.Questions[question] ? 'question_text':''"
                      style="margin-left:5px"
                    ></div>
                  </div>

                  <!--question set value button-->
                  <div :title="question">
                    <label>
                      <input type=checkbox
                        :disabled="Questions.is_question_hidden(question)"
                        @change="set_question(question, $event.target.checked)"
                        :checked="Global.Configuration.Questions[question]"
                      >
                      <span v-html="translate('yes')"></span>
                    </label>
                  </div>
                </div>
              </td></tr>
              <tr
                v-for="key in Questions[question].variables"
                v-if="
                  Global.Configuration.Questions[question]
                  &&
                  typeof(current_stage[key])=='number'
                  &&
                  (!Questions[question].folded)
                "
              >
                <td>
                  <input_ecam
                    :code="key"
                    :question="question"
                    :current_stage="current_stage"
                  >
                  </input_ecam>
                </td>
              </tr>
            </tbody>

            <!--decoration bottom table-->
            <tfoot>
              <tr :style="'background:'+get_level_color(level)">
                <th style="background:inherit;border-bottom:none" colspan=4></th>
              </tr>
            </tfoot>
          </table>
        </div>

        <!--tier b outputs-->
        <div>
          <!--level2 outputs: GHG header-->
          <div class="table-title">
            {{translate('OUTPUTS') }} &mdash;
            {{translate('GHG emissions') }}
          </div>

          <!--level2 outputs: GHG content-->
          <table
            :level="level"
            style=width:100%
          >
            <thead>
              <tr>
                <th>{{translate('Origin')}}
                <th>kg CO<sub>2</sub>eq<br>{{translate('assessment period')}}
                <th v-if="Normalization[level] && Normalization[level].serv_pop">
                  kg CO<sub>2</sub>eq<br>per {{translate('year')}} <br>per {{translate('serv.pop.')}}
                </th>
                <th v-if="Normalization[level] && Normalization[level].volume">
                  kg CO<sub>2</sub>eq<br>per m<sup>3</sup>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="key in current_stage.equations"
                v-if="
                  (key.search('_KPI_GHG')+1)
                  &&
                  Questions.is_hidden(key)==false
                "
              >
                <td
                  @mousemove="caption.show($event, translate(key+'_expla').prettify())"
                  @mouseout="caption.hide()"
                >
                  <div v-html="translate(key+'_descr').prettify()"></div>
                  (<a @click="variable.view(key)">{{key}}</a>)
                </td>

                <!--output value-->
                <td
                  v-html="format(Global[key]())"
                  @mousemove="caption.show($event, Formulas.prettify(Global[key]))"
                  @mouseout="caption.hide()"
                  style="text-align:right"
                ></td>

                <!--emission per year and serviced population-->
                <td
                  v-if="Normalization[level] && Normalization[level].serv_pop"
                  v-html="format( Normalization[level].serv_pop(Global[key]()))"
                  style="text-align:right"
                ></td>

                <!--emission per m3 of water treated-->
                <td
                  v-if="Normalization[level] && Normalization[level].volume && sublevel"
                  v-html="format( Normalization[level][sublevel].volume(Global[key]()))"
                  style="text-align:right"
                ></td>
                <td
                  v-else-if="Normalization[level] && Normalization[level].volume && !sublevel"
                  v-html="format( Normalization[level].volume(Global[key]()))"
                  style="text-align:right"
                ></td>
              </tr>
            </tbody>
            <!--decoration bottom table-->
            <tfoot>
              <tr>
                <th style="border-bottom:none" colspan=4></th>
              </tr>
            </tfoot>
          </table>

          <!--level2 outputs: NRG and SL-->
          <div class="table-title">
            {{translate('OUTPUTS')}} &mdash;
            {{translate('Energy performance and Service Level indicators')}}
          </div>
          <table
            :level="level"
            style=width:100%
          >
            <tr>
              <th>{{translate('edit_description')}}</th>
              <th>{{translate('edit_current_value')}}</th>
              <th>{{translate('edit_unit')}}</th>
            </tr>
            <tbody>
              <tr
                v-for="key in current_stage.equations"
                v-if="
                  key.search('_KPI_GHG')==-1
                  &&
                  Questions.is_hidden(key)==false
                "
              >
                <td
                  @mousemove="caption.show($event, translate(key+'_expla').prettify())"
                  @mouseout="caption.hide()"
                >
                  <div v-html="translate(key+'_descr').prettify()"></div>
                  (<a @click="variable.view(key)">{{key}}</a>)
                </td>

                <!--output value-->
                <td
                  v-html="format(Global[key]())"
                  @mousemove="caption.show($event, Formulas.prettify(Global[key]))"
                  @mouseout="caption.hide()"
                  style="text-align:right"
                ></td>
                <td v-html="Info[key].unit.prettify()"></td>
              </tr>
            </tbody>
            <!--decoration bottom table-->
            <tfoot>
              <tr>
                <th style="border-bottom:none" colspan=4></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!--tier b substages "level 3"-->
      <div
        v-if="sublevel"
        style="
          margin-top: 10px;
          padding: 10px;
          border: 1px solid;
        "
      >
        <details>
          <summary
            style="
              cursor:pointer;
              font-weight:bold;
              outline:none;
            "
          >
            {{ translate('Advanced Assessment: Substages') }}
          </summary>

          <div style="margin-top:10px">
            substages interface goes here
            <ul>
              <li>
                waiting for redesign/rework with VITI
              </li>
              <li>
                data structure:
                {{
                  Global.Substages[level][sublevel]
                }}
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  `,

});
