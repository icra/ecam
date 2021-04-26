let tier_b=new Vue({
  el:"#tier_b",
  data:{
    visible:false,

    //show or hide outputs
    outputs_are_visible:false,

    //current stage or substage being edited
    level:'Water',
    sublevel:false,
    substage:null,

    //edit substage name
    are_you_editing_name:false,

    //highlight inputs and outputs arrays
    highlight:false,
    highlighted:{
      inputs: [],
      outputs:[],
    },

    //FILTERS (defined in "backend/filters.js")
    Filters,          //each filter is an array of variables
    filters_on:false, //all filters on
    filters_active:{  //each filter on/off
      "GHG Emissions"      :false,
      "Energy Performance" :false,
      "Pump Efficiency"    :false,
      "Sludge Management"  :false,
      "Costs"              :false,
      "Biogas"             :false,

      //Onsite sanitation
      "General":false,
      "Containment":false,
      "Treatment":false,
      "Disposal / Enduse":false,
      "Open Defecation":false,
    },

    //benchmark ui colors
    benchmark_colors:{
      "Good":           "green",
      "Acceptable":     "orange",
      "Unsatisfactory": "red",
      "Bad":            "red",
      "Out of range":   "red",
    },

    //selected unit in normalization
    normalization:{
      selected:"kgCO2eq",
      options:[
        "kgCO2eq",
        "kgCO2eq/year",
        "kgCO2eq/year/serv.pop.",
      ],
    },

    //frontend
    caption,  //vue object
    variable, //vue object

    //backend
    Global,
    Info,
    Units,
    Normalization,
    Formulas,
    Questions,
    Languages,
    Benchmarks,
  },

  methods:{
    translate,
    format,
    get_level_color,
    is_code_in_any_filter,
    get_output_value,
    get_sum_of_substages,

    //check if current substage belongs to this scenario
    check_substage(){
      let level    = this.level;    //string
      let sublevel = this.sublevel; //string
      let substage = this.substage; //object

      if(!sublevel || !substage) return true;

      let index = this.Global[level][sublevel].indexOf(substage);
      if(index+1){
        return true;
      }else{
        go_to(level,sublevel);
        return false;
      }
    },

    set_question(question, new_value){
      //set new question answer
      this.substage.Configuration.Questions[question] = new_value;

      //if answer is no:
      if(!new_value){
        //disable related questions recursively
        Questions[question].otherQuestions.forEach(key=>{
          this.set_question(key, false);
        });

        //reset values
        Questions.reset_values(question, this.substage);
      }
    },

    get_current_stage(){
      if(this.sublevel){
        return this.substage;
      }else{
        return this.Global[this.level];
      }
    },

    fold_question(key){
      if(!this.substage.Configuration.Questions[key]){return;}
      let index = this.substage.Configuration.FoldedQuestions.indexOf(key);
      if(index==-1){
        this.substage.Configuration.FoldedQuestions.push(key);
      }else{
        this.substage.Configuration.FoldedQuestions.splice(index,1);
      }
    },

    enable_all_filters(){
      if(this.filters_on){
        Object.keys(this.Filters).forEach(key=>{
          this.filters_active[key]=true;
        });
      }
    },

    disable_all_filters(){
      Object.keys(this.Filters).forEach(key=>{
        this.filters_active[key]=false;
      });
    },

    is_variable_visible(code){
      if(!this.filters_on) return true;
      //return true;
      let filters = Object.keys(this.Filters);
      for(let i=0;i<filters.length;i++){
        let key=filters[i];
        if(this.filters_active[key] && this.Filters[key].indexOf(code)>-1){
          return true;
        }
      }
      return false;
    },

    get_number_of_variables_shown_by_filter(filter){
      let n=0; //rv
      let level     = this.level;
      let sublevel  = this.sublevel;

      let inputs_and_questions = [];

      //count inputs
      let inputs = get_input_codes(level,sublevel);
      inputs.forEach(code=>{
        let count = 1;
        inputs_and_questions.push({code,count});
      });

      //count question variables that are inputs
      Questions.get_questions(this.substage).forEach(code=>{
        let count = 0;
        Questions[code].variables.forEach(key=>{
          if(inputs.indexOf(key)+1){
            count++;
          }
        });
        inputs_and_questions.push({code,count});
      });

      let filters = Filters[filter];
      inputs_and_questions.forEach(obj=>{
        let code = obj.code;
        if(filters.indexOf(code)+1){
          n += obj.count;
        }
      });
      return n;
    },

    get_number_of_variables_shown_by_active_filters(){
      let active_filters = Object.keys(this.filters_active).filter(key=>this.filters_active[key]);
      let n=0;
      active_filters.forEach(key=>{
        n += this.get_number_of_variables_shown_by_filter(key);
      });
      return n;
    },

    //Benchmark return string and color
    get_benchmark(key){
      if(!this.Benchmarks[key]) return false;
      let string = this.Benchmarks[key](this.substage, this.substage[key]());
      let color = this.benchmark_colors[string];
      return {string, color};
    },

    highlight_inputs(key,off){
      off=off||false;
      if(off){
        this.highlighted.inputs=[];
        return;
      }
      if(this.highlight){
        this.highlighted.inputs = Formulas.ids_per_formula(this.get_current_stage()[key]);
      }
    },
  },

  template:`
    <!--tier b VIEW-->
    <div id=tier_b v-if="visible && Languages.ready">
      <!--check substage--><div v-if="check_substage()"></div>

      <!--tier b title + tips-->
      <div id=title :style="{background:get_level_color(level)}">
        <h1 style="font-size:x-large;color:white;align-items:center">
          <span v-if="sublevel">
            <a onclick="go_to(tier_b.level)">{{translate(level)}}</a>
          </span>
          <span v-else>
            <span style="color:black">{{translate(level)}}</span>
          </span>
          <span v-if="sublevel">
            <span>
              <span>&rsaquo;</span>
              <span>{{translate(sublevel)}}</span>
            </span>
          </span>
          <span v-if="substage">
            <span>&rsaquo;</span>
            <span v-if="are_you_editing_name">
              <input v-model="substage.name" @blur="are_you_editing_name=false" @keyup.enter="are_you_editing_name=false" maxlength=20>
              <button @click="are_you_editing_name=false">ok</button>
            </span>
            <span v-else @click="are_you_editing_name=true">
              <a style="color:black">{{substage.name}}</a>
              <button>change name</button>
            </span>
          </span>
        </h1>

        <!--tier b context info-->
        <div id=context_info>
          <!--resident population-->
          <div>
            <a onclick="ecam.show('population')">
              <div v-if="level=='Water' || level=='General'">
                <b>{{translate('ws_resi_pop_descr')}}:</b>
                <span :warning="Global.Water.ws_resi_pop<=0">
                  {{format(Global.Water.ws_resi_pop)}}
                </span>
              </div>
              <div v-if="level=='Waste' || level=='General'">
                <b>{{translate('ww_resi_pop_descr')}}:</b>
                <span :warning="Global.Waste.ww_resi_pop<=0">
                  {{format(Global.Waste.ww_resi_pop)}}
                </span>
              </div>
            </a>
          </div>

          <!--serviced population-->
          <div>
            <div v-if="level=='Water'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wsd_serv_pop_descr')}}:</b>
                <span :warning="Global.Water.Distribution.map(s=>s.wsd_serv_pop).sum()<=0">
                  {{format( Global.Water.Distribution.map(s=>s.wsd_serv_pop).sum() )}}
                </span>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wwc_conn_pop_descr')}}:</b>
                <span :warning="Global.Waste.Collection.map(s=>s.wwc_conn_pop).sum()<=0">
                  {{format(Global.Waste.Collection.map(s=>s.wwc_conn_pop).sum())}}
                </span>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wwt_serv_pop_descr')}}:</b>
                <span :warning="Global.Waste.Treatment.map(s=>s.wwt_serv_pop).sum()<=0">
                  {{format(Global.Waste.Treatment.map(s=>s.wwt_serv_pop).sum())}}
                </span>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wwo_onsi_pop_descr')}}:</b>
                <span>
                  {{format(Global.Waste.Onsite.map(s=>s.wwo_onsi_pop).sum())}}
                </span>
              </a>
            </div>
            <div v-if="level=='Waste'">
              <a onclick="ecam.show('population')">
                <b>{{translate('wwo_open_pop_descr')}}:</b>
                <span>
                  {{format(Global.Waste.Onsite.map(s=>s.wwo_open_pop).sum())}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!--filters-->
      <div id=filters>
        <div>
          <button
            @click="disable_all_filters();filters_on=false"
            :disabled="filters_on==false"
            :title="filters_on ? 'Disable all filters':'You are viewing all inputs'"
            v-html="'Show all inputs'"
          ></button>
        </div>
        <div
          v-if="get_number_of_variables_shown_by_filter(key)"
          v-for="key in Object.keys(Filters)"
          class=filter
          @click="filters_on=true;disable_all_filters();filters_active[key]=true;"
        >
          <input
            type=checkbox
            :checked="filters_active[key]"
            @click.stop="filters_active[key]=$event.target.checked"
          >
          <span>
            {{key}} ({{get_number_of_variables_shown_by_filter(key)}})
          </span>
        </div>
      </div>

      <!--tier b inputs and outputs-->
      <div
        style="
          display:grid;
          grid-template-columns:50% 50%;
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
            <div style="margin-top:5px;display:flex;justify-content:space-between">
              <div>
                Enter the values for this stage
              </div>
              <div style="margin-right:10px" title="highlight related inputs/outputs">
                <label>
                  <input type=checkbox v-model="highlight">
                  <small>Highlight mode</small>
                </label>
              </div>
            </div>
          </div>

          <!--tier b input table-->
          <table style="width:100%">
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
              v-for="question in Questions.get_questions(substage)"
              v-if="substage && is_variable_visible(question)"
            >
              <tr
                :style="{
                  color:'white',
                  background:'var(--color-level-'+level+(Questions.is_question_hidden(question, substage)?'-secondary':'')+')',
                }"
              >
                <td colspan=3 :class="Questions.is_question_hidden(question, substage) ? 'disabled_question' : ''">
                  <div style="display:grid;grid-template-columns:50% 50%">
                    <!--question text-->
                    <div>
                      <a
                        class="question_container flex"
                        @click="fold_question(question)"
                        :style="{cursor:substage.Configuration.Questions[question]?'pointer':'auto',color:'white'}"
                      >
                        <div v-if="substage.Configuration.Questions[question]">
                          <!--question folded marker-->
                          <div :class="'question_fold_marker '+(substage.Configuration.FoldedQuestions.indexOf(question)+1 ? 'folded':'')">
                            ▼
                          </div>
                        </div>
                        <div
                          style="margin-left:5px"
                        >
                          <b v-html="translate(question)+'?'"
                            :class="substage.Configuration.Questions[question] ? 'question_text':''"
                          ></b>
                        </div>
                      </a>
                    </div>

                    <!--question set value button-->
                    <div :title="question">
                      <div v-if="!Questions.is_question_hidden(question, substage)">
                        <label>
                          <input type=radio v-model="substage.Configuration.Questions[question]" :value="false" @click="set_question(question, false)">
                          {{translate('no')}}
                        </label>
                        <label>
                          <input type=radio v-model="substage.Configuration.Questions[question]" :value="true">
                          {{translate('yes')}}
                        </label>
                      </div>

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
                  substage.Configuration.Questions[question]
                  &&
                  substage.Configuration.FoldedQuestions.indexOf(question)==-1
                  &&
                  typeof(substage[key])=='number'
                "
                :key="key"
                :code="key"
                :current_stage="substage"
                :level="level"
              ></input_ecam>
            </tbody>

            <tbody v-if="filters_on && get_number_of_variables_shown_by_active_filters()==0">
              <tr>
                <td style="padding-top:2em">
                  <i>~No inputs available for current filter</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--tier b outputs-->
        <div id=outputs>
          <div v-if="outputs_are_visible==false">
            <button
              @click="outputs_are_visible=true"
              v-html="'show outputs'"
              class="btn_show_outputs"
            ></button>
          </div>
          <div v-else>
            <!--level2 outputs: GHG emissions-->
            <div>
              <div class="table-title">
                <div>
                  <b>{{translate('OUTPUTS')}}</b>
                  &mdash;
                  <button @click="outputs_are_visible=false" class="btn_show_outputs">
                    hide outputs
                  </button>
                </div>
                <div style="margin-top:5px">
                  {{translate('GHG emissions')}}
                </div>
                <div style="text-align:left;margin-top:5px">
                  <span v-for="key in normalization.options">
                    <button
                      v-if="!sublevel || !(key=='kgCO2eq/year/serv.pop.' && !Normalization[level][sublevel])"
                      @click="normalization.selected=key"
                      v-html="key.prettify()"
                      class=norm_btn
                      :selected="normalization.selected==key"
                    ></button>
                  </span>
                </div>
              </div>

              <!--level2 outputs: GHG emissions-->
              <table style="width:100%">
                <thead :style="{background:'transparent'}">
                  <tr>
                    <th></th>
                    <th style="text-align:right">Value</th>
                    <th style="text-align:right" v-if="sublevel">
                      &Sigma;
                      sum
                      ({{Global[level][sublevel].length}} substages)
                    </th>
                    <th style="text-align:left">Unit</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="key in get_current_stage().equations"
                    v-if="
                      (key=='TotalGHG' || key.search('_KPI_GHG')+1)
                      &&
                      Questions.is_hidden(key, substage)==false
                    "
                    :class="highlighted.outputs.indexOf(key)+1 ? 'highlighted':''"
                    @mouseenter="highlight_inputs(key)"
                    @mouseleave="highlight_inputs(key,true)"
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

                    <!--ghg output value-->
                    <td
                      @mousemove="caption.show($event, Formulas.prettify(get_current_stage()[key]))"
                      @mouseout="caption.hide()"
                      style="text-align:right"
                    >
                      <div
                        v-if="normalization.selected=='kgCO2eq'"
                        v-html="format(get_output_value(key,get_current_stage()))"
                      ></div>
                      <div
                        v-if="normalization.selected=='kgCO2eq/year'"
                        v-html="format(get_output_value(key,get_current_stage())/Global.Years())"
                      ></div>
                      <div v-if="normalization.selected=='kgCO2eq/year/serv.pop.'">
                        <div
                          v-if="substage"
                          v-html="format(get_output_value(key,get_current_stage())/Global.Years()/Normalization[level][sublevel](substage))"
                        ></div>
                        <div
                          v-else
                          v-html="format(get_output_value(key,get_current_stage())/Global.Years()/Normalization[level].Total())"
                        ></div>
                      </div>
                    </td>

                    <!--sum of substages-->
                    <td v-if="sublevel">
                      <div class=number v-if="normalization.selected=='kgCO2eq'">
                        {{format(get_sum_of_substages(level,sublevel,key))}}
                      </div>
                      <div class=number v-if="normalization.selected=='kgCO2eq/year'">
                        {{format(get_sum_of_substages(level,sublevel,key)/Global.Years())}}
                      </div>
                      <div class=number v-if="normalization.selected=='kgCO2eq/year/serv.pop.'">
                        {{format(get_sum_of_substages(level,sublevel,key)/Global.Years()/Normalization[level].Total())}}
                      </div>
                    </td>

                    <!--unit-->
                    <td v-if="Info[key]" v-html="normalization.selected.prettify()" style="font-size:smaller"></td>
                    <td v-else style="color:#bbb"><b>no unit</b></td>
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
              <table style="width:100%">
                <thead :style="{background:'transparent'}">
                  <tr>
                    <th></th>
                    <th style="text-align:right">Value</th>
                    <th style="text-align:left">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="key in get_current_stage().equations"
                    v-if="
                      (key!='TotalGHG' && key.search('_KPI_GHG')==-1)
                      &&
                      Questions.is_hidden(key, substage)==false
                    "
                    :class="highlighted.outputs.indexOf(key)+1 ? 'highlighted':''"
                    @mouseenter="highlighted.inputs=Formulas.ids_per_formula(get_current_stage()[key])"
                    @mouseleave="highlighted.inputs=[]"
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
                      @mousemove="caption.show($event, Formulas.prettify(get_current_stage()[key]))"
                      @mouseout="caption.hide()"
                      style="text-align:right"
                    >
                      <div v-html="format(get_current_stage()[key]()/Units.multiplier(key))"></div>

                      <!--benchmark if any-->
                      <div v-if="Benchmarks[key]">
                        <div :style="{color:get_benchmark(key).color}">
                          {{
                            get_benchmark(key).string
                          }}
                        </div>
                      </div>
                    </td>

                    <!--unit-->
                    <td v-if="Info[key]" v-html="Info[key].unit.prettify()" style="font-size:smaller"></td>
                    <td v-else style="color:#bbb"><b>no unit</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #tier_b {
        padding-bottom:5em;
      }

      #tier_b #title {
        color           : white;
        display         : flex;
        flex-wrap       : wrap;
        justify-content : space-between;
        align-items     : center;
        padding-bottom  : 5px;
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
        border:none;
      }
      #tier_b #outputs {
        background:#fffae8; /*yellow*/
        padding:1em 5px;
      }

      #tier_b #outputs table th{
        border:none;
      }

      #tier_b #outputs table td {
        background:#FFF1BE;
        border:1px solid transparent;
      }

      #tier_b #inputs table td {
        border:1px solid transparent;
      }

      /*highlighted rows*/
      #tier_b #outputs table tr.highlighted td {
        background:gold;
        border:1px solid black;
      }
      #tier_b #inputs table tr.highlighted td {
        border:1px solid var(--color-level-generic-secondary);
      }

      /*old*/
      #tier_b [warning] {
        background:yellow;
        color:black;
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
        display:flex;
        flex-wrap:nowrap;
        text-decoration:none;
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
      #tier_b table a {
        color:var(--color-level-generic);
      }

      #tier_b #filters {
        display:flex;
        align-items:center;
        user-select:none;
        border-bottom:1px solid #ccc;
      }
      #tier_b #filters > div{
        padding:10px 5px;
      }
      #tier_b #filters > div.filter:hover {
        background:var(--color-level-generic);
        color:white;
        cursor:pointer;
      }
      #tier_b #outputs button.norm_btn {
        font-size:smaller;
        color:#666;
        border-color:#666;
      }
      #tier_b #outputs button.norm_btn[selected] {
        background:#666;
        color:white;
      }

      #tier_b #outputs button.btn_show_outputs:hover {
        background:#666;
        color:white;
      }
    </style>
  `,
});
