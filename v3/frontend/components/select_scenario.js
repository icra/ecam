let select_scenario=new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    scenarios_compared:[],
    loadfile_replace:true,
    is_configuration_open:true,
    are_you_editing_name:false,

    variable,

    Global,
    Languages,
    Scenarios,
    Info,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },
  methods:{
    set_current_scenario(obj){
      ecam.set_current_scenario(obj);
    },

    set_scenario_and_go_to_tier_b(scenario){
      ecam.set_current_scenario(scenario);
      ecam.show('tier_b');
    },

    delete_scenario(obj){
      if(!confirm("continue?")) return;

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

      //variables in Global.to be changed:
      [ 'conv_kwh_co2',
        'prot_con',
        'bod_pday',
        'bod_pday_fs'
      ].forEach(key=>{
        //put bod_pday value in faecal sludge as well
        let key2 = key;
        if(key=="bod_pday_fs"){ key2="bod_pday"; }
        this.Global.General[key]=Countries[country][key2];
      });

      //set currency
      this.Global.General.Currency=Countries[country].currency;
    },

    //set constants from selected gwp report
    set_constants_from_gwp_report(){
      let index = this.Global.General.gwp_reports_index;
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

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      <!--title-->
      <div>
        <h2 style="text-align:center;margin-bottom:0">
          Configuration ({{Scenarios.length}} assessments)
        </h2>
        <p style="text-align:center;color:#666">
          <b>
            Create, edit, load, save and compare assessments.
          </b>
        </p>
      </div>

      <!--load save buttons-->
      <div id=load_save_btns
        style="
          display:flex;
          justify-content:center;
          align-items:center;
        "
      >
        <!--load file replace-->
        <div
          style="
            border:1px solid #ccc;
            padding:0.5em 1em;
            border-radius:1em;
            margin-right:20px;
          "
        >
          <div style="
            display:flex;
            justify-content:space-between;
          "
          >
            <div style="font-size:larger">
              <b>Load file</b>
            </div>
            <div style="font-size:smaller">
              <!--load mode radio btns-->
              <label title="append json file to current list of assessments">
                <input type=radio v-model="loadfile_replace" :value='false'>Append
              </label>
              <label title="replace current assessments with json file">
                <input type=radio v-model="loadfile_replace" :value='true'>Replace
              </label>
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
        </div>

        <!--save file-->
        <div>
          <button @click="save_to_file()" title="save all assessments to a JSON file">
            <div style="display:flex;align-items:center">
              <img
                class=icon
                src="frontend/img/viti/select_scenario/icon-save.svg"
              >
              <span>Save all assessments</span>
            </div>
          </button>
        </div>
      </div>

      <!--select scenario table-->
      <div>
        <table style="margin:20px auto;width:90%;" id=main_table>
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
              <td style="background:white;text-align:right">
                <img
                  @click="is_configuration_open=(scenario==Global)?is_configuration_open^1:true;set_current_scenario(scenario)"
                  class=icon
                  :src="'frontend/img/viti/select_scenario/icon-edit-system'+(scenario==Global?'':'-grey')+'.svg'"
                  style="cursor:pointer"
                >
              </td>

              <!--scenario name-->
              <td
                @click="set_current_scenario(scenario)"
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
                <button
                  @click="set_scenario_and_go_to_tier_b(scenario)"
                  v-html="'edit inventory'"
                ></button>
                <button
                  @click="delete_scenario(scenario)"
                  :disabled="scenario==Global"
                  v-html="'delete'"
                ></button>
              </td>
            </tr>
            <transition name="fade">
              <tr v-if="is_configuration_open && scenario==Global" class=configuration>
                <td style="background:white"></td>
                <td colspan=7>
                  <!--edit name-->
                  <div style="padding:20px 10px">
                    <div v-if="are_you_editing_name" style="text-align:left">
                      <input
                        @blur="are_you_editing_name=false"
                        v-model="Global.General.Name"
                        @keyup.enter="are_you_editing_name=false"
                        maxlength=50
                        placeholder="Assessment name"
                        style="border:1px solid #ccc"
                      >
                      <button @click="are_you_editing_name=false">ok</button>
                    </div>
                    <div v-else style="display:flex;">
                      <div style="font-size:x-large;padding-right:8px">{{Global.General.Name}}</div>
                      <div>
                        <button @click="are_you_editing_name=true">
                          change name
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--edit parameters (configuration)-->
                  <div 
                    style="
                      text-align:left;
                      display:grid;
                      grid-template-columns:49% 49%;
                      grid-gap:2% 20px;
                      padding-bottom:2em;
                    "
                  >
                    <!--assessment period-->
                    <fieldset>
                      <legend>Assessment period</legend>
                      <div>
                        <b>
                          From:
                          <input type=date v-model="Global.General.AssessmentPeriodStart">
                        </b>
                        <b>
                          To:
                          <input type=date v-model="Global.General.AssessmentPeriodEnd">
                        </b>
                        <span>
                          <span :class="Global.Days()<=0 ? 'warning':''" v-html="format(Global.Days())"></span>
                          <span>{{translate('days')}}</span>
                        </span>
                      </div>
                    </fieldset>

                    <!--select currency-->
                    <fieldset>
                      <legend>
                        <span v-html="translate('currency')"></span>
                      </legend>
                      <div>
                        <b>
                          {{translate('configuration_new_currency')}}
                        </b>
                        <input
                          v-model="Global.General.Currency"
                          size=3 maxlength=3 placeholder="ccc"
                        >
                      </div>
                    </fieldset>

                    <!--select country-->
                    <fieldset>
                      <legend> Country </legend>
                      <div>
                        <div>
                          <b>Select</b>&emsp;
                          <select
                            v-model="Global.General.Country"
                            @change="set_variables_from_selected_country()"
                          >
                            <option value="false">--select--</option>
                            <option v-for="country in Object.keys(Countries)">
                              {{country}}
                            </option>
                          </select>
                          &emsp;
                          <button onclick="ecam.show('countries')">
                            More info
                          </button>
                        </div><hr>

                        <table style="width:100%;text-align:left">
                          <tr :class="Global.General.conv_kwh_co2<=0?'warning':''">
                            <td v-html="translate('conv_kwh_co2_descr')">
                            <td>
                              <input type=number class=number v-model.number="Global.General.conv_kwh_co2" style="width:95%" min=0>
                            </td>
                            <td>
                              kg<sub>CO<sub>2</sub></sub>/kWh
                            </td>
                          </tr>
                          <tr :class="Global.General.prot_con<=0?'warning':''">
                            <td v-html="translate('prot_con_descr')">
                            <td>
                              <input type=number class=number v-model.number="Global.General.prot_con" style="width:95%" min=0>
                            </td>
                            <td>
                              kg/{{translate('person')}}/{{translate('year')}}
                            </td>
                          </tr>
                          <tr :class="Global.General.bod_pday<=0?'warning':''">
                            <td v-html="translate('bod_pday_descr')">
                            <td>
                              <input type=number class=number v-model.number="Global.General.bod_pday" style="width:95%" min=0>
                            </td>
                            <td>
                              g/{{translate('person')}}/{{translate('day')}}
                            </td>
                          </tr>
                          <tr :class="Global.General.bod_pday_fs<=0?'warning':''">
                            <td v-html="translate('bod_pday_fs_descr')">
                            <td>
                              <input type=number class=number v-model.number="Global.General.bod_pday_fs" style="width:95%" min=0>
                            </td>
                            <td>
                              g/{{translate('person')}}/{{translate('day')}}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </fieldset>

                    <!--select assessment report-->
                    <fieldset>
                      <legend>
                        Global Warming Potential Source
                      </legend>
                      <div>
                        <div>
                          <!--select gwp report which defines gwp values-->
                          <b>Select</b>&emsp;
                          <select
                            v-model="Global.General.gwp_reports_index"
                            @change="set_constants_from_gwp_report()"
                          >
                            <option v-for="report,i in GWP_reports" :value="i">
                              {{report.report}}
                            </option>
                          </select>
                          &emsp;
                          <button onclick="ecam.show('gwp_table')">
                            More info
                          </button>
                        </div><hr>

                        <!--description of gwp values-->
                        <p>
                          <b style="padding:0.5em 0"
                            v-html="translate('gwp_values_relative_to').prettify()"
                          ></b>
                        </p>

                        <!--actual gwp values-->
                        <table>
                          <tr>
                            <td>
                              {{translate('carbon_dioxide')}} (CO<sub>2</sub>)
                            </td>
                            <td align=right>1</td>
                            <td>
                              CO<sub>2</sub> {{translate('equivalents')}}
                            </td>
                          <tr>
                            <td>
                              {{translate('methane')}} (CH<sub>4</sub>)
                            </td>
                            <td align=right>
                              {{Cts.ct_ch4_eq.value}}
                            </td>
                            <td>
                              CO<sub>2</sub> {{translate('equivalents')}}
                            </td>
                          <tr>
                            <td>
                              {{translate('nitrouns_oxide')}} (N<sub>2</sub>O)
                            </td>
                            <td align=right>
                              {{Cts.ct_n2o_eq.value}}
                            </td>
                            <td>
                              CO<sub>2</sub> {{translate('equivalents')}}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </fieldset>

                    <!--comments-->
                    <fieldset style="grid-column-start:1;grid-column-end:3">
                      <legend>
                        <span v-html="translate('Comments')"></span>
                      </legend>
                      <div>
                        <textarea
                          v-model="Global.General.Comments"
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
                style="font-size:large"
                v-html="'+ create new assessment'"
              ></button>
            </td>
          </tr>
        </table>
      </div>

      <!--compare scenarios table-->
      <div v-if="Scenarios.length>1" style="margin-top:2em;background:#eff5fb">
        <h1 style="text-align:center">
          Compare assessments
        </h1>

        <p style="text-align:center;color:#666">
          <b>
            Select 'compare' on two or more assessments and they will appear in the
            following table.  The darker column is the current assessment you are
            editing.
          </b>
        </p>

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
        padding:0 1em;
      }
      #select_scenario details summary {
        cursor:pointer;
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
    </style>
  `,
});
