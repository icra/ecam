let select_scenario=new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    scenarios_compared:[],

    variable,

    Global,
    Scenarios,
    Languages,
    Info,
    Structure,
  },
  methods:{
    set_current_scenario(obj){
      ecam.set_current_scenario(obj);
    },

    set_scenario_and_go_to_configuration(scenario){
      ecam.set_current_scenario(scenario);
      ecam.show('configuration');
    },

    delete_scenario(obj){
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

    load_json_file(evt, replace){
      replace = replace || false;

      //get json file contents
      let file = evt.target.files[0];
      let reader = new FileReader();
      let _this = this;

      reader.onload=function(){
        let saved_file = JSON.parse(reader.result);

        if(replace){
          Scenarios=[];
          _this.Scenarios = Scenarios;
        }

        saved_file.forEach(obj=>{
          Scenarios.push(
            Ecam.from(obj)
          );
        });

        //select first scenario
        if(Scenarios.length){
          ecam.set_current_scenario(Scenarios[0]);
        }
      }
      try{
        reader.readAsText(file);
      }catch(e){alert(e)}
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
        <h2 style="text-align:center">
          All systems ({{Scenarios.length}})
        </h2>
        <p style="text-align:center;color:#666">
          <b>
            Here you can create, edit, load, save and compare systems
          </b>
        </p>
      </div>

      <!--load save buttons-->
      <div id=load_save_btns style="
          display:flex;
          justify-content:center;
          align-items:center;
        "
      >
        <!--load file replace-->
        <div>
          <button
            onclick="document.querySelector('#loadfile').click()"
            title="load a file"
            style="padding:15px"
          >
            <span>
              Load file (replace current systems)...
            </span>
          </button>
          <input
            id="loadfile"
            type="file"
            accept=".json"
            onchange="select_scenario.load_json_file(event,true)"
            style="display:none"
          >
        </div>

        <!--load file append-->
        <div>
          <button
            onclick="document.querySelector('#loadfile_append').click()"
            title="load a file"
            style="padding:15px"
          >
            <span>
              Load file (append to current systems)...
            </span>
          </button>
          <input
            id="loadfile_append"
            type="file"
            accept=".json"
            onchange="select_scenario.load_json_file(event)"
            style="display:none"
          >
        </div>

        <!--save file-->
        <div>
          <button @click="save_to_file()" title="save all systems to a JSON file">
            <div style="display:flex;align-items:center">
              <img
                class=icon
                src="frontend/img/viti/select_scenario/icon-save.svg"
              >
              <span>Save all systems to a file</span>
            </div>
          </button>
        </div>
      </div>

      <!--select scenario table-->
      <div>
        <table style="margin:20px auto" id=main_table>
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td>Assessment period</td>
              <td>Days</td>
              <td>GHG (kgCO<sub>2</sub>eq)</td>
              <td>Energy (kWh)</td>
              <td>Compare</td>
              <td>Options</td>
              <td></td>
            </tr>
          </thead>

          <tr v-for="scenario in Scenarios">
            <!--select current system-->
            <td style="background:white">
              <img
                @click="set_current_scenario(scenario)"
                class=icon
                :src="'frontend/img/viti/select_scenario/icon-edit-system'+(scenario==Global?'':'-grey')+'.svg'"
                style="cursor:pointer"
              >
            </td>

            <!--system name-->
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
            </td>

            <!--days-->
            <td>
              <span v-html="format(scenario.Days())"></span>
            </td>

            <!--ghg-->
            <td class=ghg>
              <div>
                <span v-html="format(scenario.TotalGHG())"></span>
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
                @click="set_scenario_and_go_to_configuration(scenario)"
                :disabled="scenario != Global"
                v-html="'edit'"
              ></button>

              <button
                onclick="ecam.show('report')"
                :disabled="scenario!=Global"
                v-html="'report'"
              ></button>

              <button
                @click="delete_scenario(scenario)"
                :disabled="scenario==Global"
                :style="{color:(scenario==Global?'':'red')}"
                v-html="'delete'"
              ></button>
            </td>
          </tr>

          <tr>
            <td style=background:white></td>
            <td style="background:white;text-align:left" colspan=7>
              <button onclick="ecam.new_scenario()"
                style="font-size:large"
                v-html="'+ create new system'"
              ></button>
            </td>
          </tr>
        </table>
      </div>

      <!--compare scenarios table-->
      <div v-if="Scenarios.length>1" style="margin-top:2em">
        <h1 style="text-align:center">
          Compare systems
        </h1>

        <p style="text-align:center;color:#666">
          <b>
            Select 'compare' on your system and it will appear in the following
            table.  The darker column is the current system you are editing.
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
          v-html="'~No scenarios included to comparison'"
        ></div>
      </div>
    </div>
  `,

  style:`
    <style>
      #select_scenario {
        padding:0 6em;
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
        max-width:300px;
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
      }
      #select_scenario #load_save_btns > div {
        padding:0.5px;
      }
    </style>
  `,
});
