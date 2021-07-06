let select_scenario=new Vue({
  el:"#select_scenario",
  data:{
    visible:false,

    loadfile_replace:true,
    are_settings_open:true,
    are_you_editing_name:false,

    //backend
    Global,
    Info,
    Configuration,
    Languages,
    Scenarios,
    Structure,
    Countries,
    GWP_reports,
    Cts,
  },

  methods:{
    toggle_settings_visibility_and_select(scenario){
      if(scenario==Global){
        this.are_settings_open ^= true;
      }
      this.set_current_scenario(scenario);
    },

    count_substages(scenario){
      return Structure.filter(s=>s.sublevel).map(s=>{
        return scenario[s.level][s.sublevel].length;
      }).sum();
    },

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
      ecam.delete_scenario(obj);
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

      //get json file contents
      let file   = event.target.files[0];
      let reader = new FileReader();
      let _this  = this; //vue object

      reader.onload=function(){
        //saved file should be an array of assessments
        let saved_file = null;
        try{
          saved_file = JSON.parse(reader.result);
        }catch(e){
          alert(e);
          throw(e);
        }

        if(replace){
          Scenarios=[];
          _this.Scenarios = Scenarios;
        }

        //load objects (assessments)
        saved_file.forEach(obj=>{
          Scenarios.push(
            Ecam.from(obj)
          );
        });

        //set first scenario as current scenario
        if(Scenarios.length){
          ecam.set_current_scenario(Scenarios[0]);
        }

        //reset scenario comparison
        compare_scenarios.scenarios_compared=[];
        Scenarios.forEach(obj=>{
          compare_scenarios.add_scenario_to_compared(obj);
        });

        //close settings
        _this.are_settings_open=false;

        //open list of assessments
        (function(){
          let el = document.querySelector('#list_of_assessments');
          if(el) el.setAttribute('open',true);
        })();
      };

      try{
        reader.readAsText(file);
      }catch(e){
        alert(e);
        throw(e);
      }
    },

    //duplicate scenario
    duplicate_scenario(obj){
      let str = JSON.stringify(obj);
      let par = JSON.parse(str);
      par.General.Name+=" (copy)";
      Scenarios.push(
        Ecam.from(par)
      );
      this.are_settings_open=false;
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
      ].forEach(key=>{
        this.Global.General[key]=Countries[country][key];
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

    format,
    translate,
  },

  mounted(){
    this.focus_input();
  },

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      <!--title-->
      <div>
        <h2 style="padding-left:0;margin-bottom:0">
          Configuration
        </h2>
      </div>

      <!--load save buttons-->
      <details>
        <summary
          style="font-size:large"
          title="Click here to load or save a file"
          v-html="'Load and save file'"
        ></summary>
        <div>
          <div id=load_save_btns
            style="
              display:grid;
              grid-template-columns:repeat(2,1fr);
              grid-gap:2px;
            "
          >
            <!--load file-->
            <div>
              <div style="margin-bottom:10px">
                <div style="font-size:larger">
                  Load file
                </div>
              </div>

              <!--input type file-->
              <div style="margin-bottom:10px">
                <input
                  type="file"
                  id="loadfile"
                  accept=".json"
                  onclick="this.value=''"
                  @change="load_json_file($event)"
                >
              </div>

              <!--load mode radio btns-->
              <div
                style="
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
            <div>
              <div style="margin-bottom:10px">
                <div style="font-size:larger">
                  Save current session as a JSON file
                </div>
              </div>
              <div>
                <button class=save_btn @click="save_to_file()" title="save the current list of assessments to a file">
                  <div style="display:flex;align-items:center">
                    <img
                      class=icon
                      src="frontend/img/viti/select_scenario/icon-save.svg"
                      style="margin-right:5px"
                    >
                    <div>Save file</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div style="display:flex">
            <tutorial_tip
              id   ="Load file"
              title="Load file"
              text ="If you already have a JSON file, you can load it using the menu above."
            ></tutorial_tip>
            <tutorial_tip
              id   ="Merge files"
              title="Merge files"
              text ="You can merge multiple JSON files into one file by using the button above 'Append'."
            ></tutorial_tip>
          </div>
        </div>
      </details>

      <!--scenarios table-->
      <details open id=list_of_assessments>
        <summary style="font-size:large">List of assessments</summary>

        <!--select gwp-->
        <div
          style="
            display:flex;
            align-items:center;
            background:linear-gradient(to right, white, #f6f6f6);
            padding:1em;
            justify-content:flex-end;
            font-size:smaller;
          "
        >
          <div style="padding-right:1em">
            <b>Select Global Warming Potential Report</b>
          </div>

          <!--select gwp report which defines gwp values-->
          <div style="padding-right:1em">
            <select
              v-model="Configuration.gwp_reports_index"
              @change="set_constants_from_gwp_report()"
            >
              <option v-for="report,i in GWP_reports" :value="i">
                {{report.report}}
              </option>
            </select>
          </div>

          <div style="padding-right:2em">
            <button onclick="ecam.show('gwp_table')">
              More info
            </button>
          </div>
        </div>

        <tutorial_tip
          id   ="List of assessments"
          title="List of assessments"
          text="
            Below you can see the list of assessments. You can only edit one
            assessment at a time. Click on the assessment that you would like
            to edit. It will turn blue once you have selected it. If you want
            to unfold country specific information, click on the assessment
            again or on the button 'settings'.
          "
        ></tutorial_tip>

        <!--assessments table-->
        <table style="width:100%;margin-top:1em" id=main_table>
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td>{{translate('Assessment period')}}</td>
              <td>GHG (kgCO<sub>2</sub>eq)</td>
              <td>Energy (kWh)</td>
              <td>Substages</td>
              <td>Options</td>
            </tr>
          </thead>

          <tbody v-for="scenario in Scenarios"
            :current_scenario="scenario==Global"
          >
            <tr>
              <!--select current scenario-->
              <td
                @click="toggle_settings_visibility_and_select(scenario)"
                style="background:white;padding:0;cursor:pointer"
              >
                <img
                  class=icon
                  :src="'frontend/img/viti/select_scenario/icon-edit-system'+(scenario==Global?'':'-grey')+'.svg'"
                >
              </td>

              <!--scenario name-->
              <td
                @click="toggle_settings_visibility_and_select(scenario)"
                style="padding:0;cursor:pointer"
              >
                <div>
                  <div class=scenario_name>
                    <div>
                      <b v-html="scenario.General.Name"></b>
                    </div>
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

              <!--count substages-->
              <td>
                <div>
                  <span v-html="format(count_substages(scenario))"></span>
                </div>
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
                    @click="duplicate_scenario(scenario)"
                    v-html="'duplicate'"
                  ></button>
                  <tutorial_tip
                    id   ="Duplicate assessment"
                    title="Duplicate assessment"
                    text="You can duplicate an assesment by clicking on the button above. You can use this feature if you want to create multiple assessments where the majority of inputs remain the same, but only a few of the inputs need to the adapted."
                    v-if="scenario==Scenarios[0]"
                  ></tutorial_tip>
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
                <td colspan=6>
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
                      <legend>{{translate('Assessment period')}}</legend>
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
                            <option value="">--select--</option>
                            <option v-for="country in Object.keys(Countries)">
                              {{country}}
                            </option>
                          </select>
                          <button onclick="ecam.show('countries')">
                            More info
                          </button>
                        </div>

                        <table style="width:100%;text-align:left;margin-top:10px">
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

                          <!--emission factor for grid electricity-->
                          <tr :class="scenario.General.conv_kwh_co2<=0?'warning':''">
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('conv_kwh_co2_descr')"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('conv_kwh_co2')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input id=conv_kwh_co2 type=number class=number @change="set_conv_kwh()" v-model.number="scenario.General.conv_kwh_co2" style="width:95%" min=0>
                            </td>
                            <td>
                              kg<sub>CO<sub>2</sub></sub>/kWh
                            </td>
                          </tr>

                          <!--protein consumption-->
                          <tr :class="scenario.General.prot_con<=0?'warning':''">
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('prot_con_descr')"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('prot_con')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input type=number class=number v-model.number="scenario.General.prot_con" style="width:95%" min=0>
                            </td>
                            <td>
                              kg/{{translate('person')}}/{{translate('year')}}
                            </td>
                          </tr>

                          <!--BOD per day-->
                          <tr :class="scenario.General.bod_pday<=0?'warning':''">
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('bod_pday_descr').prettify()"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('bod_pday')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input type=number class=number v-model.number="scenario.General.bod_pday" style="width:95%" min=0>
                            </td>
                            <td>
                              g/{{translate('person')}}/{{translate('day')}}
                            </td>
                          </tr>

                          <!--factors-->
                          <tr>
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('F_IND_COM_descr').prettify()"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('F_IND_COM')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input type=number class=number v-model.number="scenario.General.F_IND_COM" style="width:95%" min=0>
                            </td>
                            <td v-html="Info.F_IND_COM.unit.prettify()"></td>
                          </tr>
                          <tr>
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('F_NON_CON_descr').prettify()"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('F_NON_CON')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input type=number class=number v-model.number="scenario.General.F_NON_CON" style="width:95%" min=0>
                            </td>
                            <td v-html="Info.F_NON_CON.unit.prettify()"></td>
                          </tr>
                          <tr>
                            <td>
                              <div style="display:flex;justify-content:space-between">
                                <div v-html="translate('N_HH_descr').prettify()"></div>
                                <div style="font-size:smaller">
                                  <a href=# onclick="variable.view('N_HH')">more info</a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input type=number class=number v-model.number="scenario.General.N_HH" style="width:95%" min=0>
                            </td>
                            <td v-html="Info.N_HH.unit.prettify()"></td>
                          </tr>
                        </table>
                      </div>
                    </fieldset>

                    <button
                      @click="set_scenario_and_go_to_tier_b(scenario)"
                      title="Access inventory to insert input data"
                      style="
                        font-size:large;
                        display:block;
                        margin:auto;
                        background:var(--color-level-generic);
                        color:white;
                        padding-left:3em;
                        padding-right:3em;
                      "
                    >
                      Access inventory
                    </button>

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
            <td style="background:white"></td>
            <td style="background:white;text-align:left" colspan=6>
              <button onclick="ecam.new_scenario();select_scenario.are_settings_open=false"
                class=new_assessment
                style="font-size:large"
                v-html="'+ create new assessment'"
              ></button>

              <tutorial_tip
                id   ="Create new assessment"
                title="Create new assessment"
                text="
                  You can create as many assessments as you want. You can do
                  this by clicking the button above.
                "
              ></tutorial_tip>
            </td>
          </tr>
        </table>
      </details>

      <!--download empty template and load template-->
      <details>
        <summary style="font-size:large">Load assessment from Excel file</summary>
        <p>Steps:</p>
        <ol>
          <li>
            Download ECAM input template:
            <button onclick="ecam.generate_empty_excel_template()">
              Download "ecam-template.xlsx"
            </button>
          </li>
          <li style="margin-top:10px">Fill out template file.</li>
          <li style="margin-top:10px">
            Upload filled file:
            <input
              type="file"
              accept=".xlsx"
              onchange="ecam.import_excel_template_filled_by_user(event)"
            >
          </li>
        </ol>
      </details>

      <!--advanced settings
      <details>
        <summary style="font-size:large">Advanced settings</summary>
      </details>
      -->
    </div>
  `,

  style:`
    <style>
      #select_scenario {
        padding-left:2em;
        padding-bottom:1em;
        padding-right:1em;
        max-width:80%;
        margin:auto;
      }
      #select_scenario details {
        padding-bottom:1em;
      }
      #select_scenario details summary {
        cursor:pointer;
        font-size:larger;
      }
      #select_scenario #main_table thead td {
        background:white;
        font-size:smaller;
      }
      #select_scenario #main_table td {
        border-width:4px;
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
      #select_scenario #main_table div.scenario_name{
        padding-left:10px;
        border-left:4px solid #c6c6c6;
        text-align:left;
        line-height:43px;
        min-width:200px;
      }
      #select_scenario #main_table div.scenario_name:hover{
        text-decoration:underline;
      }
      #select_scenario #main_table tbody[current_scenario] > tr:first-child > td {
        box-shadow:0px 0px 1px var(--color-level-generic) inset;
      }
      #select_scenario #main_table tbody[current_scenario] div.scenario_name {
        border-color:var(--color-level-generic);
        color:var(--color-level-generic);
      }
      #select_scenario #load_save_btns > div {
        padding:1em 2em;
        border:1px solid #ddd;
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

      #select_scenario button.save_btn{
        padding:0.5em 3em;
      }

      #select_scenario button.save_btn:hover {
        cursor:pointer;
        color:var(--color-level-generic);
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
      #select_scenario div.options_container {
        padding:10px;
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