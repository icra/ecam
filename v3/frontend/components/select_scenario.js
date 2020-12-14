let select_scenario=new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    scenarios_compared:[],
    loadfile_replace:true,

    are_settings_open:false,
    are_you_editing_name:false,

    variable,

    Global,
    Configuration,
    Languages,
    Scenarios,
    Info,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },

  methods:{
    show_input(){
      this.are_you_editing_name=true;
      this.$nextTick(function(){
        this.focus_input();
      });
    },

    focus_input(){
      let arr=this.$refs.scenario_name;
      if(arr){
        let el=arr.find(el=>el);
        if(el) el.select();
      }
    },

    set_conv_kwh(){
      Structure.filter(s=>s.sublevel).forEach(s=>{
        this.Global[s.level][s.sublevel].forEach(ss=>{
          ss[s.prefix+'_conv_kwh']=this.Global.General.conv_kwh_co2;
        });
      });
    },

    set_current_scenario(obj){
      ecam.set_current_scenario(obj);
    },

    set_scenario_and_go_to_tier_b(scenario){
      ecam.set_current_scenario(scenario);
      ecam.show('tier_b');
    },

    delete_scenario(obj){
      if(obj.TotalGHG().total){
        if(!confirm(`Confirm delete assessment "${obj.General.Name}"?`))
          return;
      }

      let index = this.scenarios_compared.indexOf(obj);
      if(index+1){
        this.scenarios_compared.splice(index,1);
      }
      ecam.delete_scenario(obj);
    },

    add_scenario_to_compared(scenario){
      if(!scenario) return;
      if(scenario.constructor!==Ecam) return;

      let index = this.scenarios_compared.indexOf(scenario);
      if(index==-1){
        this.scenarios_compared.push(scenario);
      }else{
        this.scenarios_compared.splice(index,1);
      }
    },

    get_variables_and_values(level, sublevel){
      let input_codes  = get_input_codes( level, sublevel);
      let output_codes = get_output_codes(level, sublevel);

      let inputs=[]; //code, value
      input_codes.forEach(code=>{
        let scenario_values = null;
        if(sublevel){
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][sublevel].map(ss=>ss[code]); //array
          });
        }else{
          scenario_values = this.scenarios_compared.map(sce=>{
            return [sce[level][code]]; //array
          })
        }
        inputs.push({code, scenario_values});
      });

      let outputs=[]; //code, value TODO
      //output_codes.forEach(code=>{
      //  let scenario_values = null;
      //  scenario_values = this.scenarios_compared.map(sce=>{
      //    return sce[code]();
      //  })
      //  outputs.push({code, scenario_values});
      //});

      return inputs.concat(outputs);
    },

    save_to_file(){
      //we want to save the variable "Scenarios"
      let content = JSON.stringify(Scenarios,null,'  ');
      let file = new Blob([content],{type:'text/plain'});

      //generate <a> link and click it
      let a      = document.createElement('a');
      a.href     = URL.createObjectURL(file);
      a.target   = '_blank';
      a.download = Scenarios.map(s=>s.General.Name).join('+')+'.json'; //filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    load_json_file(event){
      let filename = document.querySelector('#loadfile').value;
      if(filename=="") return;

      //mode: replace or append
      let replace = this.loadfile_replace;

      if(replace){
        /*
        if(!confirm("Current changes will be lost. Continue?")){
          return;
        }
        */
      }

      //get json file contents
      let file   = event.target.files[0];
      let reader = new FileReader();
      let _this  = this; //vue object

      reader.onload=function(){
        let saved_file = JSON.parse(reader.result);
        if(!saved_file){
          alert("error loading file");
          return;
        }

        if(replace){
          Scenarios=[];
          _this.Scenarios = Scenarios;
        }

        //load objects
        saved_file.forEach(obj=>{
          Scenarios.push(
            Ecam.from(obj)
          );
        });

        //set first scenario as current scenario
        if(Scenarios.length){
          ecam.set_current_scenario(Scenarios[0]);
        }
      }
      try{
        reader.readAsText(file);
      }catch(e){alert(e)}
    },

    //set variables from selected country
    set_variables_from_selected_country(){
      let country = this.Global.General.Country;
      this.Global.General.Currency=Countries[country].currency;

      //variables in Global.General to be changed:
      [ 
        'conv_kwh_co2',
        'prot_con',
        'bod_pday',
        'bod_pday_fs'
      ].forEach(key=>{
        //put bod_pday value in faecal sludge as well
        let key2 = key;
        if(key=="bod_pday_fs"){ key2="bod_pday"; }
        this.Global.General[key]=Countries[country][key2];
      });

      //trigger conv_kwh_co2 change for all substages
      this.set_conv_kwh();
    },

    //set constants from selected gwp report
    set_constants_from_gwp_report(){
      let index = Configuration.gwp_reports_index;
      this.Cts.ct_ch4_eq.value = this.GWP_reports[index].ct_ch4_eq;
      this.Cts.ct_n2o_eq.value = this.GWP_reports[index].ct_n2o_eq;
    },

    get_input_codes,
    get_output_codes,
    get_variable_type,
    get_level_color,
    get_base_unit,
    format,
    translate,
  },

  mounted(){
    this.focus_input();
  },

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      <!--container-->
      <div
        style="
          display:grid;
          grid-template-columns:70% 30%;
        "
      >
        <div
          style="
            padding-left:2em;
            padding-bottom:1em;
            padding-right:1em;
          "
        >
          <!--title-->
          <div>
            <h2 style="padding-left:0;margin-bottom:0">
              Configuration
            </h2>
            <div style="color:#666">
              Load, save, create, configure, edit and compare assessments
            </div>
          </div>

          <!--load save buttons-->
          <div style="margin-top:10px">
            <div id=load_save_btns
              style="
                display:grid;
                grid-template-columns:60% 40%;
                align-items:center;
              "
            >
              <!--load file-->
              <div
                style="
                  border:1px solid #ccc;
                  padding:0.5em 1em;
                  margin-right:20px;
                "
              >
                <div>
                  <div style="font-size:larger">
                    <b>Load file</b>
                    <small>(note: an ecam file consists of a list of assessments)</small>
                  </div>
                </div>

                <div style="margin-top:10px">
                  <input
                    type="file"
                    id="loadfile"
                    accept=".json"
                    @change="load_json_file($event)"
                  >
                </div>

                <!--load mode radio btns-->
                <div 
                  style="
                    margin-top:10px;
                    font-size:smaller;
                    display:grid;
                    grid-template-columns:50% 50%;
                  "
                >
                  <div>
                    <label class=load_mode :selected="loadfile_replace==true" title="replace the current list of assessments with the loaded file">
                      <input type=radio v-model="loadfile_replace" :value='true'>
                      <img class=icon src="frontend/img/viti/select_scenario/icon-replace.svg">
                      <div style=margin-left:5px>
                        <b>Replace</b><br>current list
                      </div>
                    </label>
                  </div>
                  <div>
                    <label class=load_mode :selected="loadfile_replace==false" title="append the loaded file to the current list of assessments">
                      <input type=radio v-model="loadfile_replace" :value='false'>
                      <img class=icon src="frontend/img/viti/select_scenario/icon-append.svg">
                      <div style=margin-left:5px>
                        <b>Append</b><br>to current list
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!--save file-->
              <div
                style="text-align:center"
              >
                <button class=save_btn @click="save_to_file()" title="save the current list of assessments to a file">
                  <div style="display:flex;align-items:center">
                    <img
                      class=icon
                      src="frontend/img/viti/select_scenario/icon-save.svg"
                      style="margin-right:5px"
                    >
                    <div>Save all assessments</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!--scenarios table-->
          <div style="margin-top:20px">
            <div
              style="
                margin-bottom:10px;
                font-size:large;
              "
            >
              Assessments list ({{format(Scenarios.length)}})
            </div>
            <table style="width:100%;" id=main_table>
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Assessment period</td>
                  <td>GHG (kgCO<sub>2</sub>eq)</td>
                  <td>Energy (kWh)</td>
                  <td>Compare</td>
                  <td>Options</td>
                </tr>
              </thead>

              <tbody v-for="scenario in Scenarios">
                <tr>
                  <!--select current scenario-->
                  <td style="background:white;padding:0">
                    <img
                      class=icon
                      :src="'frontend/img/viti/select_scenario/icon-edit-system'+(scenario==Global?'':'-grey')+'.svg'"
                    >
                  </td>

                  <!--scenario name-->
                  <td
                    @click="are_settings_open = (scenario==Global) ? are_settings_open=!are_settings_open: are_settings_open; set_current_scenario(scenario)"
                    style="padding:0;background:white;cursor:pointer"
                  >
                    <div
                      class=scenario_name
                      :current_scenario="scenario==Global"
                    >
                      <div>
                        <b v-html="scenario.General.Name"></b>
                      </div>
                    </div>
                  </td>

                  <!--assessment period-->
                  <td>
                    <div>
                      <span v-html="scenario.General.AssessmentPeriodStart"></span>
                    </div>
                    <div>
                      <span v-html="scenario.General.AssessmentPeriodEnd"></span>
                    </div>
                    <div style="font-size:smaller">
                      (<span v-html="format(scenario.Days())"></span>
                      <span>{{translate('days')}}</span>)
                    </div>
                  </td>

                  <!--ghg-->
                  <td class=ghg>
                    <div>
                      <span v-html="format(scenario.TotalGHG().total)"></span>
                    </div>
                  </td>

                  <!--energy-->
                  <td class=nrg>
                    <div>
                      <span v-html="format(scenario.TotalNRG())"></span>
                    </div>
                  </td>

                  <!--compare-->
                  <td class=compare>
                    <input type=checkbox :checked="scenarios_compared.indexOf(scenario)!=-1" @click="add_scenario_to_compared(scenario)">
                  </td>

                  <!--options-->
                  <td style="text-align:left">
                    <div class=options_container>
                      <button
                        @click="are_settings_open=(scenario==Global)?are_settings_open=!are_settings_open:true;set_current_scenario(scenario)"
                        v-html="'settings'"
                        :configuration_open="are_settings_open && scenario==Global"
                      ></button>
                      <button
                        @click="set_scenario_and_go_to_tier_b(scenario)"
                        v-html="'edit'"
                      ></button>
                      <button
                        @click="delete_scenario(scenario)"
                        v-if="scenario!=Global"
                        v-html="'delete'"
                      ></button>
                    </div>
                  </td>
                </tr>

                <!--settings-->
                <transition name="fade">
                  <tr v-if="are_settings_open && scenario==Global">
                    <td style="background:white"></td>
                    <td colspan=7>
                      <!--edit name-->
                      <div style="padding:20px 10px">
                        <div v-if="are_you_editing_name" style="text-align:left">
                          <input
                            ref="scenario_name"
                            v-model="Global.General.Name"
                            @keyup.enter="are_you_editing_name=false"
                            @blur="are_you_editing_name=false"
                            placeholder="Assessment name"
                            maxlength=50
                            style="border:1px solid #ccc"
                          >
                          <button @click="are_you_editing_name=false">ok</button>
                        </div>
                        <div v-else style="display:flex;align-items:center">
                          <div>
                            <button @click="show_input()">
                              change assessment name
                            </button>
                          </div>
                        </div>
                      </div>

                      <!--edit parameters (configuration)-->
                      <div style="text-align:left;padding-bottom:10px">
                        <!--assessment period-->
                        <fieldset>
                          <legend>Assessment period</legend>
                          <div>
                            <b>From: <input type=date v-model="scenario.General.AssessmentPeriodStart"></b>
                            <b>To:   <input type=date v-model="scenario.General.AssessmentPeriodEnd"></b>
                            <span>
                              <span :class="scenario.Days()<=0 ? 'warning':''" v-html="format(scenario.Days())"></span>
                              <span>{{translate('days')}}</span>
                            </span>
                          </div>
                        </fieldset>

                        <!--select country-->
                        <fieldset>
                          <legend> Country </legend>
                          <div>
                            <div>
                              <b>Select</b>
                              &nbsp;
                              <select
                                v-model="scenario.General.Country"
                                @change="set_variables_from_selected_country()"
                              >
                                <option value="false">--select--</option>
                                <option v-for="country in Object.keys(Countries)">
                                  {{country}}
                                </option>
                              </select>
                              <button onclick="ecam.show('countries')">
                                More info
                              </button>
                            </div>

                            <table style="width:100%;text-align:left;margin-top:10px">
                              <!--emission factor for grid electricity-->
                              <tr :class="scenario.General.conv_kwh_co2<=0?'warning':''">
                                <td v-html="translate('conv_kwh_co2_descr')">
                                <td>
                                  <input id=conv_kwh_co2 type=number class=number @change="set_conv_kwh()" v-model.number="scenario.General.conv_kwh_co2" style="width:95%" min=0>
                                </td>
                                <td>
                                  kg<sub>CO<sub>2</sub></sub>/kWh
                                </td>
                              </tr>

                              <!--protein consumption-->
                              <tr :class="scenario.General.prot_con<=0?'warning':''">
                                <td v-html="translate('prot_con_descr')">
                                <td>
                                  <input type=number class=number v-model.number="scenario.General.prot_con" style="width:95%" min=0>
                                </td>
                                <td>
                                  kg/{{translate('person')}}/{{translate('year')}}
                                </td>
                              </tr>

                              <!--BOD per day-->
                              <tr :class="scenario.General.bod_pday<=0?'warning':''">
                                <td v-html="translate('bod_pday_descr')">
                                <td>
                                  <input type=number class=number v-model.number="scenario.General.bod_pday" style="width:95%" min=0>
                                </td>
                                <td>
                                  g/{{translate('person')}}/{{translate('day')}}
                                </td>
                              </tr>
                              <tr :class="scenario.General.bod_pday_fs<=0?'warning':''">
                                <td v-html="translate('bod_pday_fs_descr')">
                                <td>
                                  <input type=number class=number v-model.number="scenario.General.bod_pday_fs" style="width:95%" min=0>
                                </td>
                                <td>
                                  g/{{translate('person')}}/{{translate('day')}}
                                </td>
                              </tr>

                              <!--currency-->
                              <tr>
                                <td>
                                  {{translate('configuration_new_currency')}}
                                </td>
                                <td>
                                  <input
                                    v-model="scenario.General.Currency"
                                    size=3 maxlength=3 placeholder="ccc"
                                    style="width:95%"
                                  >
                                </td>
                                <td>
                                  {{translate('currency')}}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </fieldset>

                        <!--comments-->
                        <fieldset>
                          <legend>
                            <span v-html="translate('Comments')"></span>
                          </legend>
                          <div>
                            <textarea
                              v-model="scenario.General.Comments"
                              style="width:100%;height:100px"
                              :placeholder="translate('Comments')"
                            ></textarea>
                          </div>
                        </fieldset>
                      </div>
                    </td>
                  </tr>
                </transition>
              </tbody>

              <tr>
                <td style=background:white></td>
                <td style="background:white;text-align:left" colspan=6>
                  <button onclick="ecam.new_scenario()"
                    class=new_assessment
                    style="font-size:large"
                    v-html="'+ create new assessment'"
                  ></button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!--select GWP assessment report-->
        <div
          style="
            padding-top:1em;
            padding-left:5px;
            background:#eff5fb;
            border-bottom:1px solid white;
            padding-right:1em;
          "
        >
          <div>
            <h1>
              Global settings (TBD)
            </h1>
          </div>
          <fieldset style="background:white">
            <legend>
              Global Warming Potential Source Report
            </legend>
            <div>
              <div>
                <!--select gwp report which defines gwp values-->
                <b>Select</b>
                &nbsp;
                <select
                  v-model="Configuration.gwp_reports_index"
                  @change="set_constants_from_gwp_report()"
                >
                  <option v-for="report,i in GWP_reports" :value="i">
                    {{report.report}}
                  </option>
                </select>
                <button onclick="ecam.show('gwp_table')">
                  More info
                </button>
              </div><hr>

              <!--description of gwp values-->
              <p>
                <span style="padding:0.5em 0"
                  v-html="translate('gwp_values_relative_to').prettify()"
                ></span>
              </p>

              <!--actual gwp values-->
              <table>
                <tr>
                  <td> {{translate('carbon_dioxide')}} (CO<sub>2</sub>) </td>
                  <td align=right>1</td>
                  <td> CO<sub>2</sub> {{translate('equivalents')}} </td>
                <tr>
                  <td> {{translate('methane')}} (CH<sub>4</sub>) </td>
                  <td align=right> {{Cts.ct_ch4_eq.value}} </td>
                  <td> CO<sub>2</sub> {{translate('equivalents')}} </td>
                <tr>
                  <td> {{translate('nitrouns_oxide')}} (N<sub>2</sub>O) </td>
                  <td align=right> {{Cts.ct_n2o_eq.value}} </td>
                  <td> CO<sub>2</sub> {{translate('equivalents')}} </td>
                </tr>
              </table>
            </div>
          </fieldset>
        </div>
      </div>

      <!--compare scenarios table-->
      <div v-if="Scenarios.length>1" style="padding-top:2em;background:#eff5fb">
        <h1 style="text-align:center">
          Compare assessments
        </h1>

        <p style="text-align:center;color:#666">
          <b>
            Select 'compare' on two or more assessments and they will appear
            below. The darker column is the current assessment you are editing.
          </b>
        </p>

        <div style="text-align:center" v-if="scenarios_compared.length">
          TODO
          <button style="color:white;background:var(--color-level-generic)">Table</button>
          <button>Bar chart: GHG by assessment</button>
          <button>Bar chart: GHG by stage</button>
          <button>Bar chart: GHG by substage</button>
        </div>

        <!--compare scenarios table-->
        <table style="margin:10px auto" v-if="scenarios_compared.length">
          <tr>
            <td></td>
            <th v-for="scenario in scenarios_compared.filter(s=>Scenarios.indexOf(s)+1)">
              {{scenario.General.Name}}
            </th>
          </tr>

          <tbody v-for="stage in [{level:'General'}].concat(Structure)">
            <tr>
              <th :colspan="1+scenarios_compared.length"
                :style="'background:'+get_level_color(stage.level)"
              >
                <div style="text-align:left;color:white;font-size:x-large;font-weight:bold">
                  {{translate(stage.level)}}
                  <span v-if="stage.sublevel">
                    &rsaquo;
                    {{translate(stage.sublevel)}}
                  </span>
                </div>
              </th>
            </tr>
            <tr v-for="v in get_variables_and_values(stage.level, stage.sublevel)">
              <!--variable code and description-->
              <th :style="{background:get_level_color(stage.level),paddingLeft:'20px'}">
                <div class=flex style="justify-content:space-between">
                  <div v-if="Info[v.code]">
                    <div
                      v-html="translate(v.code+'_descr').prettify()"
                      style="color:white"
                    ></div>
                  </div>
                  <div style="font-size:smaller" >
                    <a
                      @click="variable.view(v.code)"
                      style="color:white"
                    >{{v.code}}</a>
                  </div>
                </div>
              </th>

              <!--variable value-->
              <td v-for="arr,i in v.scenario_values"
                :style="scenarios_compared[i]==Global ? 'background:#f6f6f6':''"
              >
                <!--value and unit-->
                <div>
                  <div
                    v-if="arr.length"
                    style="text-align:right"
                  >
                    <div v-if="arr.length==1">
                      {{ format(arr[0]) }}
                    </div>
                    <div v-else>
                      {{ arr }}
                    </div>
                  </div>
                  <div
                    class="unit"
                    v-html="get_base_unit(v.code, Scenarios[i]).prettify()"
                    style="text-align:right"
                  >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!--notification: table is empty-->
        <div
          v-if="scenarios_compared.length==0"
          style="text-align:center;font-style:italic"
          v-html="'~No assessments included to comparison'"
        ></div>
      </div>
    </div>
  `,

  style:`
    <style>
      #select_scenario {
      }
      #select_scenario details summary {
        cursor:pointer;
      }
      #select_scenario #main_table {
        box-shadow:0px 0px 2px #ccc;
      }
      #select_scenario #main_table thead td {
        background:white;
        font-size:smaller;
      }
      #select_scenario #main_table td {
        border-width:5px;
        border-color:white;
        background:#f6f6f6;
        padding:0 0.35em;
        text-align:center;
      }
      #select_scenario #main_table td table td {
        text-align:left;
        border-width:1px;
        border-color:#eee;
        padding:0.35em;
      }
      #select_scenario img.icon{
        width:40px;
      }
      #select_scenario #main_table td.ghg {
        background:#35cb99;
        color:white;
        text-align:center;
      }
      #select_scenario #main_table td.nrg {
        background:#ffbe54;
        color:white;
        text-align:center;
        font-weight:bold;
      }
      #select_scenario #main_table td.compare {
        background:#98bde5;
        color:white;
        text-align:center;
        font-weight:bold;
      }
      #select_scenario #main_table div.scenario_name{
        display:flex;
        justify-content:space-between;
        align-items:center;
        height:45px;
        width:100%;
        min-width:200px;
        padding-left:10px;
        border-left:4px solid #c6c6c6;
        background:#f6f6f6;
      }
      #select_scenario #main_table div.scenario_name:hover{
        text-decoration:underline;
      }
      #select_scenario #main_table div.scenario_name[current_scenario] {
        border-color:var(--color-level-generic);
        color:var(--color-level-generic);
      }
      #select_scenario #load_save_btns > div {
        padding:0.5px;
      }

      #select_scenario fieldset {
        border:1px solid #ccc;
        margin-bottom:10px;
      }
      #select_scenario fieldset > legend {
        color:var(--color-level-generic);
        font-weight:bold;
        font-size:inherit;
      }

      #select_scenario .warning input {
        color:#aaa;
      }

      #select_scenario button[disabled] {
        color:#ccc;
      }

      #select_scenario button.new_assessment:hover {
        text-decoration:underline;
      }

      #select_scenario button[configuration_open] {
        background:var(--color-level-generic);
        color:white;
        outline:none;
      }

      #select_scenario button.save_btn:hover {
        text-decoration:underline;
        cursor:pointer;
      }

      #select_scenario label.load_mode {
        align-items:center;
        display:flex;
        border:1px solid #eee;
        padding:5px;
      }
      #select_scenario label.load_mode[selected] {
        border-color:var(--color-level-generic);
      }
      #select_scenario label.load_mode:hover {
        color:var(--color-level-generic);
      }
      #select_scenario div.options_container button {
        font-size:smaller;
      }
      #select_scenario div.options_container button:hover {
        color:white;
        background:var(--color-level-generic-secondary);
      }
    </style>
  `,
});
