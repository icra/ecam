let select_scenario=new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    scenarios_compared:[],
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
      let input_codes  = get_input_codes(   level, sublevel);
      let output_codes = get_equation_codes(level, sublevel);

      let inputs=[]; //code, value
      input_codes.forEach(code=>{
        let scenario_values = null;
        if(sublevel){
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][sublevel][code];
          })
        }else{
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][code];
          })
        }
        inputs.push({code, scenario_values});
      });

      let outputs=[]; //code, value
      output_codes.forEach(code=>{
        let scenario_values = null;
        scenario_values = this.scenarios_compared.map(sce=>{
          return sce[code]();
        })
        outputs.push({code, scenario_values});
      });

      return inputs.concat(outputs);
    },

    get_input_codes,
    get_equation_codes,
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
        <h1 style="text-align:center">
          <b>All systems ({{Scenarios.length}})</b>
        </h1>
        <p style="text-align:center">
          Here you can create, edit, delete and compare systems
        </p>
      </div>

      <!--table select scenario-->
      <div>
        <!--select scenario table-->
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

            <!--system name and comments-->
            <td style="padding:0;background:white">
              <div class=scenario_name
                :current_scenario="scenario==Global"
              >
                <div>
                  <b v-html="scenario.General.Name"></b>
                </div>
                <div style="background:#c6c6c6">
                  <img
                    class=icon
                    src="frontend/img/viti/select_scenario/icon-comment.svg"
                  >
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
              <input type=checkbox @click="add_scenario_to_compared(scenario)">
            </td>

            <!--options-->
            <td>
              <button
                onclick="ecam.show('configuration')"
                :disabled="scenario != Global"
                v-html="'edit'"
              ></button>

              <button
                disabled
                onclick="alert('TODO')"
                v-html="'duplicate'"
              ></button>

              <button
                disabled
                onclick="alert('TODO')"
                v-html="'load from file...'"
              ></button>

              <button
                @click="delete_scenario(scenario)"
                :disabled="scenario == Global"
                v-html="'delete'"
                style="color:red"
              ></button>

              <button
                onclick="ecam.show('report')"
                :disabled="scenario != Global"
                v-html="'report'"
              ></button>
            </td>
          </tr>

          <tr>
            <td style=background:white></td>
            <td style="background:white;text-align:left" colspan=7>
              <button onclick="ecam.new_scenario()"
                style="
                  font-size:large;
                "
                v-html="'+ create new system'"
              ></button>
            </td>
          </tr>
        </table>

        <!--save button-->
        <div style="text-align:center">
          <button
            onclick="alert('TODO')"
            title="save all systems to a JSON file"
          >
            <div
              style="
                display:flex;
                align-items:center;
              "
            >
              <img
                class=icon
                src="frontend/img/viti/select_scenario/icon-save.svg"
              >
              <span>Save your systems</span>
            </div>
          </button>
        </div>
      </div>

      <!--table compare scenarios-->
      <div v-if="Scenarios.length>1">
        <h1 style="text-align:center">
          Compare systems
          (TBD: I would move this part to a new page)
        </h1>

        <!--compare scenarios table-->
        <table style="margin:10px auto" v-if="scenarios_compared.length">
          <tr>
            <td></td>
            <th v-for="scenario in scenarios_compared.filter(s=>Scenarios.indexOf(s)+1)">
              {{scenario.General.Name}}
            </th>
          </tr>

          <tbody v-for="stage in [{level:'General', sublevel:false}].concat(Structure)">
            <tr>
              <th :colspan="1+scenarios_compared.length"
                :style="'background:'+get_level_color(stage.level)"
              >
                <div style="text-align:left">
                  {{translate(stage.level)}}
                  <span v-if="stage.sublevel">
                    &mdash;
                    {{translate(stage.sublevel)}}
                  </span>
                </div>
              </th>
            </tr>
            <tr v-for="v in get_variables_and_values(stage.level, stage.sublevel)">
              <!--variable code and description-->
              <th :style="'background:'+get_level_color(stage.level)">
                <div>
                  {{v.code}}
                </div>
                <div v-if="Info[v.code]" style="font-size:smaller">
                  <div v-html="'('+translate(v.code+'_descr').prettify()+')'" >
                  </div>
                </div>
              </th>

              <!--variable value-->
              <td v-for="value,i in v.scenario_values"
                :style="scenarios_compared[i]==Global ? 'background:yellow':''"
              >
                <!--value and unit-->
                <div>
                  <div class=number>
                    <span v-html="typeof(value)=='number' ? format(value) : value"></span>
                  </div>
                  <div
                    class="unit"
                    v-html="get_base_unit(v.code, Scenarios[i])"
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
        max-width:300px;
        min-width:200px;
        padding-left:10px;
        border-left:4px solid #c6c6c6;
        background:#f6f6f6;
      }
      #select_scenario #main_table div.scenario_name[current_scenario] {
        border-color:var(--color-level-generic);
      }
    </style>
  `,
});
