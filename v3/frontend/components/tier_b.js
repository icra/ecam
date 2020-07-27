let tier_b=new Vue({
  el:"#tier_b",

  data:{
    visible:false,
    level:'Water',
    sublevel:'Abstraction',

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
    Languages,
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
        Questions.reset_values(question, this.get_current_stage());
      }
    },

    get_current_stage(){
      if(this.sublevel){
        return this.Global[this.level][this.sublevel];
      }else{
        return this.Global[this.level];
      }
    },

    fold_question(key){
      if(!this.Global.Configuration.Questions[key]){
        return;
      }
      let index = this.Global.Configuration.FoldedQuestions.indexOf(key);
      if(index == -1){
        this.Global.Configuration.FoldedQuestions.push(key);
      }else{
        this.Global.Configuration.FoldedQuestions.splice(index,1);
      }
    },
  },

  template:`
    <!--tier b VIEW-->
    <div id=tier_b v-if="visible && Languages.ready">

      <!--tier b title + tips-->
      <div id=title class=flex>
        <h1 style=color:white>
          <a onclick="ecam.show('configuration')">{{Global.General.Name}}</a>
          <span>&rsaquo;</span>
          <a onclick="go_to(tier_b.level)">
            {{translate(level)}}
          </a>
          <span v-if="sublevel">
            <span>
              &rsaquo;
              {{translate(sublevel)}}
            </span>
          </span>
        </h1>

        <!--Tips
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
        -->

        <!--tier b context info-->
        <div class=flex
          style="
            font-family:monospace;
            font-size:smaller;
            padding:0.2em 2em;
          "
          id=context_info
        >
          <!--assessment period-->
          <div>
            <a onclick="ecam.show('configuration')">
              <span>
                {{translate('assessment_period')}}:
              </span>
              <b>
                <span :class="Global.Days()<=0 ? 'warning' : ''">
                  {{format(Global.Days())}}
                </span>
              </b>
              <span>
                {{translate('days')}}
              </span>
            </a>
          </div>

          <!--resident population-->
          <div>
            <a onclick="ecam.show('population')">
              <span>
                {{translate('ws_resi_pop_descr')}}:
              </span>
              <b v-if="level=='Water'">
                <span :class="Global.Water.ws_resi_pop<=0 ? 'warning' : ''">
                  {{format(Global.Water.ws_resi_pop)}}
                </span>
              </b>
              <b v-if="level=='Waste'">
                <span :class="Global.Waste.ww_resi_pop<=0 ? 'warning' : ''">
                  {{format(Global.Waste.ww_resi_pop)}}
                </span>
              </b>
              <b v-if="level=='Faecl'">
                <span :class="Global.Faecl.fs_resi_pop<=0 ? 'warning' : ''">
                  {{format(Global.Faecl.fs_resi_pop)}}
                </span>
              </b>
            </a>
          </div>

          <!--only ww: connected population-->
          <div v-if="level=='Waste'">
            <a onclick="ecam.show('population')">
              <span>
                {{translate('ww_conn_pop_descr')}}:
              </span>
              <b>
                <span :class="Global.ww_conn_pop()<=0 ? 'warning' : ''">
                  {{format(Global.ww_conn_pop())}}
                </span>
              </b>
            </a>
          </div>

          <!--serviced population-->
          <div>
            <div v-if="level=='Water'">
              <a onclick="ecam.show('population')">
                <span>
                  {{translate('ws_serv_pop_descr')}}:
                </span>
                <b>
                  <span :class="Global.Water.ws_serv_pop<=0 ? 'warning' : ''">
                    {{format(Global.Water.ws_serv_pop)}}
                  </span>
                </b>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <span>
                  {{translate('ww_serv_pop_descr')}}:
                </span>
                <b>
                  <span :class="Global.ww_serv_pop()<=0 ? 'warning' : ''">
                    {{format(Global.ww_serv_pop())}}
                  </span>
                </b>
              </a>
            </div>
            <div v-if="level=='Faecl'">
              <a onclick="ecam.show('population')">
                <span>
                  {{translate('fs_onsi_pop_descr')}}:
                </span>
                <b>
                  <span :class="Global[level].fs_onsi_pop<=0 ? 'warning' : ''">
                    {{format(Global[level].fs_onsi_pop)}}
                  </span>
                </b>
              </a>
            </div>
          </div>

          <!--conversion kwh to co2-->
          <div>
            <a onclick="ecam.show('configuration')">
              <span>
                {{translate('conv_kwh_co2_descr')}}:
              </span>
              <b>
                <span :class="Global.General.conv_kwh_co2<=0 ? 'warning' : ''">
                  {{format(Global.General.conv_kwh_co2)}}
                </span>
              </b>
              <span class=number v-html="Info.conv_kwh_co2.unit"></span>
            </a>
          </div>
        </div>
      </div>

      <!--tier b inputs and outputs-->
      <div
        style="
          margin-top:10px;
          display:grid;
          grid-template-columns:64.5% 35%;
          grid-gap:0.5%;
        "
      >
        <!--tier b inputs-->
        <div id=inputs
          style="
            background:#f6f6f6;
            min-width:50%;
            padding:1em 2em;
          "
        >
          <div class="table-title">
            <div>
              <b>{{translate('INPUTS') }}</b>
            </div>
            <p>
              {{translate('Enter values for') }}
              {{sublevel ? translate(sublevel) : translate(level) }}
              {{translate('stages') }}
            </p>
          </div>

          <!--tier b input table-->
          <table :level="level" style="width:100%">
            <!--tier b inputs header-->
            <thead>
              <tr>
                <td></td>
                <td>Substage 1
                  &emsp;
                  ull, editar, paperera
                </td>
                <td>Unit</td>
                <td>Stage value</td>
              </tr>
            </thead>

            <!--tier b inputs-->
            <tbody
              v-for="key in Object.keys(get_current_stage()).filter(key=>{return Questions.is_inside(key)==false})"
              v-if="typeof(get_current_stage()[key])=='number'"
            >
              <input_ecam
                :code="key"
                :current_stage="get_current_stage()"
              ></input_ecam>
            </tbody>

            <!--tier b questions-->
            <tbody v-for="question in Questions.get_questions(get_current_stage())">
              <tr
                style="
                  background:var(--color-level-generic-secondary);
                  color:white;
                "
              >
                <td colspan=3 :class="Questions.is_question_hidden(question) ? 'disabled_question' : ''">
                  <div style="display:grid;grid-template-columns:50% 50%">
                    <!--question text-->
                    <div
                      @click="fold_question(question)"
                      class="question_container flex"
                      :style="(Global.Configuration.Questions[question]?'cursor:pointer':'')"
                    >
                      <div v-if="Global.Configuration.Questions[question]">
                        <!--question folded marker-->
                        <div :class="'question_fold_marker '+(Global.Configuration.FoldedQuestions.indexOf(question)+1 ? 'folded':'')">
                          ▼
                        </div>

                      </div>
                      <div>
                        <b v-html="translate(question)+'?'"
                          :class="Global.Configuration.Questions[question] ? 'question_text':''"
                          style="margin-left:5px"
                        ></b>
                      </div>
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
                </td>
              </tr>

              <!--variables inside question-->
              <input_ecam
                v-for="key in Questions[question].variables"
                v-if="
                  Global.Configuration.Questions[question]
                  &&
                  Global.Configuration.FoldedQuestions.indexOf(question)==-1
                  &&
                  typeof(get_current_stage()[key])=='number'
                "
                :key="key"
                :code="key"
                :current_stage="get_current_stage()"
              ></input_ecam>
            </tbody>
          </table>
        </div>

        <!--tier b outputs-->
        <div id=outputs>
          <!--level2 outputs: GHG header-->
          <div class="table-title">
            <div>
              <b>{{translate('OUTPUTS') }}</b>
            </div>
            <p>
              {{translate('GHG emissions') }}
            </p>
          </div>

          <!--level2 outputs: GHG content-->
          <table :level="level" style="width:100%">
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
              <tr v-for="key in get_current_stage().equations"
                v-if="
                  (key=='TotalGHG' || key.search('_KPI_GHG')+1)
                  &&
                  Questions.is_hidden(key)==false
                "
              >
                <td
                  @mousemove="caption.show($event, translate(key+'_expla').prettify())"
                  @mouseout="caption.hide()"
                >
                  <div>
                    <b v-html="translate(key+'_descr').prettify()"></b>
                  </div>
                  <div>
                    <a @click="variable.view(key)">{{key}}</a>
                  </div>
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

          </table>

          <!--level2 outputs: NRG and SL-->
          <div class="table-title">
            <p>
              {{translate('Energy performance and Service Level indicators')}}
            </p>
          </div>
          <table :level="level" style="width:100%">
            <tr>
              <th>{{translate('edit_description')}}</th>
              <th>{{translate('edit_current_value')}}</th>
              <th>{{translate('edit_unit')}}</th>
            </tr>
            <tbody>
              <tr v-for="key in get_current_stage().equations"
                v-if="
                  (key!='TotalGHG' && key.search('_KPI_GHG')==-1)
                  &&
                  Questions.is_hidden(key)==false
                "
              >
                <td
                  @mousemove="caption.show($event, translate(key+'_expla').prettify())"
                  @mouseout="caption.hide()"
                >
                  <div>
                    <b v-html="translate(key+'_descr').prettify()"></b>
                  </div>
                  <div>
                    <a @click="variable.view(key)">{{key}}</a>
                  </div>
                </td>

                <!--output value-->
                <td
                  v-html="format(Global[key]()/Units.multiplier(key))"
                  @mousemove="caption.show($event, Formulas.prettify(Global[key]))"
                  @mouseout="caption.hide()"
                  style="text-align:right"
                ></td>
                <td v-html="Info[key].unit.prettify()"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #tier_b {
        margin:2em 4em;
      }

      #tier_b #title {
        background:var(--color-level-generic-secondary);
        justify-content:space-between;
        color:white;
        align-items:center;
      }
      #tier_b #title a {
        color:white;
        cursor:pointer;
      }
      #tier_b #context_info > div {
        padding:0 1em;
        border-left:1px solid white;
      }
      #tier_b #outputs {
        background:#fef7dc;
        padding:1em 2em;
      }
      #tier_b #outputs table th{
        background:var(--color-level-generic-secondary);
      }

      #tier_b #inputs table {
        border-collapse:separate;
        border-spacing:8px;
      }
      #tier_b #inputs table td {
        /*
        */
        border:none;
      }

      /*old*/
      #tier_b .warning {
        background:red;
        padding:2px 4px;
        border-radius:5px;
      }
      #tier_b div.table-title {
        color:#666;
        font-size:15px;
        padding:0.7em 0 0.2em 0;
        font-weight:normal;
        text-align:left;
      }
      #tier_b .input {
        text-align:right;
        background:white;
        cursor:cell;
        padding:0;
      }
      #tier_b .input input {
        width:95%;
        background:white;
        border:none;
        text-align:right;
        margin:0;
        padding:0 0.2em;
        height:45px;
        cursor:cell;
      }
      #tier_b .input input:focus {
        background:white;
      }

      /*tier b questions*/
      #tier_b .disabled_question {
        color:#aaa;
      }
      #tier_b .question_container {
        /**/
      }
      #tier_b .question_container:hover .question_text {
        text-decoration:underline;
      }
      #tier_b .question_fold_marker {
        transition: all 0.2s;
      }
      #tier_b .question_fold_marker.folded {
        transform: rotate(-90deg);
      }

      /*colors of links*/
      #tier_b table[level=Water] a { color: var(--color-level-Water) }
      #tier_b table[level=Waste] a { color: var(--color-level-Waste) }
      #tier_b table[level=Faecl] a { color: var(--color-level-Faecl) }

    </style>
  `,
});
