let select_scenario = new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    format,
    translate,

    scenarios_compared:[],
    compared_variables:[
      'Name',
      'AssessmentPeriodStart',
      'AssessmentPeriodEnd',
    ],

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
  },

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      <!--select scenario-->
      <div>
        <h1 style="text-align:center">
          Scenarios
        </h1>

        <button onclick="ecam.new_scenario()"
          style="
            font-size:large;
            display:block;
            margin:auto;
          "
          class="button add"
          v-html="'create new scenario'"
          :title="'create new blank scenario'"
        ></button>

        <!--select scenario table-->
        <table style="margin:10px auto">
          <tr>
            <th>scenario name</th>
            <th>assessment period start</th>
            <th>assessment period end</th>
            <th>days</th>
            <th>GHG (kgCO<sub>2</sub>eq)</th>
            <th>energy (kWh)</th>
            <th>select current scenario</th>
            <th>options</th>
            <th>compare scenarios</th>
          </tr>
          <tr v-for="scenario in Scenarios"
            :style="(scenario==Global)?'background:yellow':''"
          >
            <td><span v-html="scenario.General.Name"></span></td>
            <td class=number><span v-html="scenario.General.AssessmentPeriodStart"></span></td>
            <td class=number><span v-html="scenario.General.AssessmentPeriodEnd"></span></td>
            <td class=number><span v-html="format(scenario.Days())"></span></td>
            <td class=number><span v-html="format(scenario.TotalGHG())"></span></td>
            <td class=number><span v-html="format(scenario.TotalNRG())"></span></td>
            <td>
              <button
                @click="set_current_scenario(scenario)"
                v-if="scenario != Global"
                v-html="'select'"
              ></button>

              <span v-if="scenario==Global"
                style="
                  font-size:smaller;
                  font-style:italic;
                "
                v-html="'current scenario'"
              ></span>
            </td>
            <td>
              <button onclick="alert('TODO')">
                duplicate
              </button>
              <button onclick="alert('TODO')">
                load from json file
              </button>
              <button
                @click="delete_scenario(scenario)"
                :disabled="scenario == Global"
                v-html="'delete'"
              ></button>
            </td>
            <td>
              <button @click="add_scenario_to_compared(scenario)">
                <span v-if="scenarios_compared.indexOf(scenario)==-1">
                  include
                </span>
                <span v-else>
                  remove
                </span>
              </button>
            </td>
          </tr>
        </table>
      </div>

      <!--compare scenarios-->
      <div>
        <h1 style="text-align:center">Compare scenarios</h1>

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
