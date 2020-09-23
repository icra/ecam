let tier_b=new Vue({
  el:"#tier_b",
  data:{
    visible:false,
    level:'Water',
    sublevel:false,
    caption,  //vue object
    variable, //vue object

    //FILTERS (see "backend/filters.js")
    Filters,          //definition (list of variables for each filter)
    filters_active:{  //each filter on/off
      //default active filters
      "Population":true,
      "Water volumes":true,
      "Operational parameters":true,
      "Emission factors":true,
      "Fuel consumption":true,
      "Energy performance":true,
      "Discharge":true,
      "Sludge management":true,
    }, 

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
    is_code_in_any_filter,

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
      if(!this.Global.Configuration.Questions[key]){return;}
      let index = this.Global.Configuration.FoldedQuestions.indexOf(key);
      if(index == -1){
        this.Global.Configuration.FoldedQuestions.push(key);
      }else{
        this.Global.Configuration.FoldedQuestions.splice(index,1);
      }
    },

    enable_all_filters(){
      Object.keys(this.Filters).forEach(key=>{
        this.filters_active[key]=true;
      });
    },

    disable_all_filters(){
      Object.keys(this.Filters).forEach(key=>{
        this.filters_active[key]=false;
      });
    },

    is_variable_visible(code){
      let filters = Object.keys(this.Filters);
      for(let i=0;i<filters.length;i++){
        let key=filters[i];
        if(this.filters_active[key] && this.Filters[key].indexOf(code)>-1){
          return true;
        }
      }
      return false;
    },
  },

  template:`
    <!--tier b VIEW-->
    <div id=tier_b v-if="visible && Languages.ready">
      <!--tier b title + tips-->
      <div id=title :style="{background:get_level_color(level)}">
        <h1 style="font-size:x-large;color:white">
          <a onclick="ecam.show('configuration')">{{Global.General.Name}}</a>
          <span>&rsaquo;</span>
          <span v-if="sublevel">
            <a onclick="go_to(tier_b.level)">{{translate(level)}}</a>
          </span>
          <span v-else>
            <b style="color:black">{{translate(level)}}</b>
          </span>
          <span v-if="sublevel">
            <span>
              <span>&rsaquo;</span>
              <b style="color:black">{{translate(sublevel)}}</b>
            </span>
          </span>
        </h1>

        <!--tier b context info-->
        <div id=context_info>
          <!--assessment period-->
          <div>
            <a onclick="ecam.show('configuration')">
              <b>{{translate('assessment_period')}}:</b>
              <span :class="Global.Days()<=0 ? 'warning' : ''">
                {{format(Global.Days())}}
              </span>
              <span v-html="translate('days')"></span>
            </a>
          </div>

          <!--resident population-->
          <div>
            <a onclick="ecam.show('population')">
              <b>{{translate('ws_resi_pop_descr')}}:</b>
              <span v-if="level=='Water'">
                <span :class="Global.Water.ws_resi_pop<=0 ? 'warning' : ''">
                  {{format(Global.Water.ws_resi_pop)}}
                </span>
              </span>
              <span v-if="level=='Waste'">
                <span :class="Global.Waste.ww_resi_pop<=0 ? 'warning' : ''">
                  {{format(Global.Waste.ww_resi_pop)}}
                </span>
              </span>
            </a>
          </div>

          <!--only ww: connected population-->
          <div v-if="level=='Waste'">
            <a onclick="ecam.show('population')">
              <b>{{translate('wwc_conn_pop_descr')}}:</b>
              <span :class="Global.Waste.Transport.wwc_conn_pop<=0 ? 'warning' : ''">
                {{format(Global.Waste.Transport.wwc_conn_pop)}}
              </span>
            </a>
          </div>

          <!--serviced population-->
          <div>
            <div v-if="level=='Water'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wsd_serv_pop_descr')}}:</b>
                <span :class="Global.Water.Distribution.wsd_serv_pop<=0 ? 'warning' : ''">
                  {{format(Global.Water.Distribution.wsd_serv_pop)}}
                </span>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wwt_serv_pop_descr')}}:</b>
                <span :class="Global.Waste.Treatment.wwt_serv_pop<=0 ? 'warning' : ''">
                  {{format(Global.Waste.Treatment.wwt_serv_pop)}}
                </span>
              </a>
            </div>
          </div>

          <!--conversion kwh to co2-->
          <div>
            <a onclick="ecam.show('configuration')">
              <b>{{translate('conv_kwh_co2_descr')}}:</b>
              <span :class="Global.General.conv_kwh_co2<=0 ? 'warning' : ''">
                {{format(Global.General.conv_kwh_co2)}}
              </span>
              <span class=number v-html="Info.conv_kwh_co2.unit"></span>
            </a>
          </div>
        </div>
      </div>

      <!--filters-->
      <div id=filters>
        <div
          class=filter
          @click="enable_all_filters()" 
          title="Enable all filters"
        ><b><code>Filters</code></b>
        </div>
        <div>&rarr;</div>
        <div
          v-for="key in Object.keys(Filters)"
          class=filter
          @click="disable_all_filters();filters_active[key]=true;"
        >
          <input type=checkbox
            :checked="filters_active[key]"
            @click.stop="filters_active[key]=$event.target.checked"
          >
          <span>{{key}}</span>
        </div>
      </div>

      <!--tier b inputs and outputs-->
      <div
        style="
          display:grid;
          grid-template-columns:64.5% 35%;
          grid-gap:1px;
        "
      >
        <!--tier b inputs-->
        <div id=inputs
          style="
            min-width:50%;
            padding-top:1em;
            padding-left:8px;
          "
        >
          <div class="table-title">
            <div>
              <b>{{translate('INPUTS') }}</b>
            </div>
            <div style="margin-top:5px">
              {{translate('Enter values for') }}
              {{sublevel ? translate(sublevel) : translate(level) }}
              {{translate('stages') }}
            </div>
          </div>

          <!--tier b input table-->
          <table :level="level" style="width:100%">
            <!--tier b inputs header-->
            <thead>
              <tr>
                <td></td>
                <td>
                  <div v-if="sublevel">
                    Substage 1
                    &emsp;
                    (eye icon, edit icon, delete icon)
                  </div>
                </td>
                <td style="text-align:center">Unit</td>
              </tr>
            </thead>

            <!--tier b inputs-->
            <tbody
              v-for="key in Object.keys(get_current_stage()).filter(key=>{return Questions.is_inside(key)==false})"
              v-if="is_variable_visible(key) && typeof(get_current_stage()[key])=='number'"
            >
              <input_ecam
                :code="key"
                :current_stage="get_current_stage()"
                :level="level"
              ></input_ecam>
            </tbody>

            <!--tier b questions-->
            <tbody
              v-for="question in Questions.get_questions(get_current_stage())"
              v-if="is_variable_visible(question)"
            >
              <tr
                :style="{
                  color:'white',
                  background:'var(--color-level-'+level+(Questions.is_question_hidden(question)?'-secondary':'')+')',
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
                        <span v-if="Global.Configuration.Questions[question]" v-html="translate('yes')"></span>
                        <span v-else v-html="translate('no')"></span>
                      </label>
                      
                      <!--indicator of "variable not filtered"-->
                      <span v-if="!is_code_in_any_filter(question)" style="float:right">
                        <code style="background:yellow;color:black">[warning:no-filter: {{question}}]</code>
                      </span>
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
          <!--level2 outputs: GHG emissions-->
          <div>
            <div class="table-title">
              <div>
                <b>{{translate('OUTPUTS') }}</b>
              </div>
              <div style="margin-top:5px">
                {{translate('GHG emissions') }}
              </div>
            </div>

            <!--level2 outputs: GHG content-->
            <table :level="level" style="width:100%">
              <thead :style="{background:'transparent'}">
                <tr>
                  <th></th>
                  <th>kg CO<sub>2</sub>eq<br>{{translate('assessment period')}}</th>
                  <th v-if="Normalization[level] && Normalization[level].serv_pop">
                    kg CO<sub>2</sub>eq / {{translate('year')}} / {{translate('serv.pop.')}}
                  </th>
                  <th v-if="Normalization[level] && Normalization[level].volume">
                    kg CO<sub>2</sub>eq / m<sup>3</sup>
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
                      <small><a @click="variable.view(key)">{{key}}</a></small>
                    </div>
                  </td>

                  <!--ghg output values-->
                  <td
                    @mousemove="caption.show($event, Formulas.prettify(Global[key]))"
                    @mouseout="caption.hide()"
                    v-html="format(Global[key]())"
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
          </div>

          <!--level2 outputs: NRG and SL-->
          <div>
            <div class="table-title">
              <p>
                {{translate('Energy performance and Service Level indicators')}}
              </p>
            </div>
            <table :level="level" style="width:100%">
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
                      <small><a @click="variable.view(key)">{{key}}</a></small>
                    </div>
                  </td>

                  <!--output value-->
                  <td
                    v-html="format(Global[key]()/Units.multiplier(key))"
                    @mousemove="caption.show($event, Formulas.prettify(Global[key]))"
                    @mouseout="caption.hide()"
                    style="text-align:right"
                  ></td>
                  <td v-if="Info[key]" v-html="Info[key].unit.prettify()"></td>
                  <td v-else style="color:#bbb"><b>no unit</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #tier_b {
      }

      #tier_b #title {
        color:white;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        align-items:center;
        padding-bottom:5px;
      }
      #tier_b #title a {
        color:white;
        cursor:pointer;
      }

      #tier_b #context_info {
        display:flex;
        flex-wrap:wrap;
        font-family:monospace;
        font-size:smaller;
      }
      #tier_b #context_info > div {
        padding:0 1em;
      }

      #tier_b #context_info > div:not(:first-child) {
        border-left:1px solid white;
      }
      #tier_b table {
        border-collapse:separate;
        border-spacing:1px 1px;
        border-left:none;
      }
      #tier_b #inputs table td {
        /*
        */
        border:none;
      }
      #tier_b #outputs {
        background:#fffae8; /*yellow*/
        padding:1em 5px;
      }

      #tier_b #outputs table td {
        background:#FFF1BE;
      }
      #tier_b #outputs table th,
      #tier_b #outputs table td {
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
        font-weight:normal;
        text-align:left;
        padding-left:3px;
      }
      #tier_b .input {
        text-align:right;
        cursor:cell;
        padding:0;
      }
      #tier_b .input input {
        width:98%;
        background:transparent;
        border:none;
        text-align:right;
        margin:0;
        padding:0 0.2em;
        height:45px;
        cursor:cell;
      }
      #tier_b .input input:focus {background:white;}
      #tier_b .input input[equal_to_zero]{color:#aaa;}
      #tier_b .input input[equal_to_zero]:focus{color:black;}

      /*tier b questions*/
      #tier_b .disabled_question {
        color:#bbb;
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

      #tier_b #filters {
        display:flex;
        align-items:center;
        user-select:none;
        border-bottom:1px solid #ccc;
      }
      #tier_b #filters > div.filter{
        padding:10px 5px;
      }
      #tier_b #filters > div.filter:hover {
        background:var(--color-level-generic);
        color:white;
        cursor:pointer;
      }
    </style>
  `,
});
