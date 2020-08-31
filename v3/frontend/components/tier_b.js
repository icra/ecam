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
      <div id=title class=flex :style="{background:'var(--color-level-'+level+')'}">
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
                  {{translate('wsd_serv_pop_descr')}}:
                </span>
                <b>
                  <span :class="Global.Water.Distribution.wsd_serv_pop<=0 ? 'warning' : ''">
                    {{format(Global.Water.Distribution.wsd_serv_pop)}}
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
                  {{translate('fsc_onsi_pop_descr')}}:
                </span>
                <b>
                  <span :class="Global.Faecl.Containment.fsc_onsi_pop<=0 ? 'warning' : ''">
                    {{format(Global.Faecl.Containment.fsc_onsi_pop)}}
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
                  (
                    eye icon,
                    edit icon,
                    delete icon
                  )
                </td>
                <td>Unit</td>
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
                :level="level"
              ></input_ecam>
            </tbody>

            <!--tier b questions-->
            <tbody v-for="question in Questions.get_questions(get_current_stage())">
              <tr
                :style="{
                  color:'white',
                  background:'var(--color-level-'+level+')',
                }"
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
                :level="level"
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
            <thead :style="{background:'var(--color-level-'+level+')'}">
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
            <thead :style="{background:'var(--color-level-'+level+')'}">
              <tr>
                <th>{{translate('edit_description')}}</th>
                <th>{{translate('edit_current_value')}}</th>
                <th>{{translate('edit_unit')}}</th>
              </tr>
            </thead>
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
      #tier_b #inputs table {
        border-collapse:separate;
        border-spacing:8px;
      }
      #tier_b #inputs table td {
        /*
        */
        border:none;
      }
      #tier_b #outputs {
        background:#fef7dc; /*yellow*/
        padding:1em 2em;
      }
      #tier_b #outputs table th {
        color:white;
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
        /*TODO*/
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
