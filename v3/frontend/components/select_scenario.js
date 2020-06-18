let select_scenario = new Vue({
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
      <!--select scenario-->
      <div>
        <h1 style="text-align:center">
          Systems
        </h1>

        <button onclick="ecam.new_scenario()"
          style="
            font-size:large;
            display:block;
            margin:auto;
          "
          class="button add"
          v-html="'create new system'"
          :title="'create new blank system'"
        ></button>

        <!--select scenario table-->
        <table style="margin:10px auto">
          <tr>
            <th>
              System {{translate('getStarted_table_name')}}
            </th>
            <th>
              {{translate('getStarted_table_start')}}
            </th>
            <th>
              {{translate('getStarted_table_end')}}
            </th>
            <th>
              {{translate('getStarted_table_period')}}
            </th>
            <th>
              {{translate('getStarted_table_comments')}}
            </th>
            <th title="energy consumed and GHG emissions">summary</th>
            <th>select current system</th>
            <th>options</th>
            <th>compare systems</th>
          </tr>
          <tr v-for="scenario in Scenarios"
            :style="(scenario==Global)?'background:yellow':''"
          >
            <td>
              <input v-model="scenario.General.Name">
            </td>
            <td class=number>
              <input type=date v-model="scenario.General.AssessmentPeriodStart">
            </td>
            <td class=number>
              <input type=date v-model="scenario.General.AssessmentPeriodEnd">
            </td>
            <td class=number>
              <span v-html="format(scenario.Days())"></span>
              <span class=unit>{{translate('days')}}</span>
            </td>
            <td>
              <details>
                <summary>
                  add comments
                </summary>
                <div>
                  <textarea
                    v-model="scenario.General.Comments"
                    :placeholder="translate('getStarted_max_200')"
                    rows=5 cols=50 maxlength=200
                  ></textarea>
                </div>
              </details>
            </td>
            <td>
              <div>
                <span v-html="format(scenario.TotalNRG())"></span>
                <span class=unit>kWh</span>
              </div>
              <div>
                <span v-html="format(scenario.TotalGHG())"></span>
                <span class=unit v-html="Info.TotalGHG.unit.prettify()"></span>
              </div>
            </td>
            <td style="text-align:center">
              <button
                @click="set_current_scenario(scenario)"
                v-html="'select'"
                v-if="scenario != Global"
                style="font-weight:bold"
              ></button>
              <span v-if="scenario==Global"
                style="font-size:smaller;font-style:italic;"
                v-html="'~this is the current system'"
              ></span>
            </td>
            <td>
              <button
                onclick="ecam.show('configuration')"
                :disabled="scenario != Global"
                v-html="'edit'"
              ></button>
              <button onclick="alert('TODO')">
                duplicate
              </button>
              <button onclick="alert('TODO')">
                load from json file
              </button>
              <button
                onclick="alert('TODO: see reports of ecam v2.2 tier A')"
                v-html="'see report'"
              ></button>
              <button
                @click="delete_scenario(scenario)"
                :disabled="scenario == Global"
                v-html="'delete'"
                style="color:red"
              ></button>
            </td>
            <td style="text-align:center">
              <button @click="add_scenario_to_compared(scenario)">
                <span v-if="scenarios_compared.indexOf(scenario)==-1" style="color:green">
                  include
                </span>
                <span v-else style="color:red">
                  remove
                </span>
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div><hr></div>

      <!--compare scenarios-->
      <div>
        <h1 style="text-align:center">
          Compare systems
          (TBD: I would move this part to its own page)
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
});
