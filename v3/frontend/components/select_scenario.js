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
          All systems ({{Scenarios.length}})
        </h1>

        <!--select scenario table-->
        <table style="margin:10px auto">
          <tr>
            <th>
              System {{translate('getStarted_table_name')}}
            </th>
            <th>
              Assessment period
            </th>
            <th>
              {{translate('getStarted_table_comments')}}
            </th>
            <th title="energy consumed and GHG emissions">summary</th>
            <th>current system</th>
            <th>options</th>
            <th v-if="Scenarios.length>1">compare systems</th>
          </tr>
          <tr v-for="scenario in Scenarios"
            :style="(scenario==Global)?'background:yellow':''"
          >
            <td>
              <span v-html="scenario.General.Name"></span>
            </td>
            <td class=number>
              <div>
                <div>
                  From:
                  <span v-html="scenario.General.AssessmentPeriodStart"></span>
                </div>
                <div>
                  To:
                  <span v-html="scenario.General.AssessmentPeriodEnd"></span>
                </div>
              </div>
              <div>
                (<span v-html="format(scenario.Days())"></span>
                <span class=unit>{{translate('days')}}</span>)
              </div>
            </td>
            <td>
              <details>
                <summary>
                  (comments icon)
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
                <span v-html="format(scenario.TotalGHG())"></span>
                <span class=unit v-html="Info.TotalGHG.unit.prettify()"></span>
              </div>
              <div>
                <span v-html="format(scenario.TotalNRG())"></span>
                <span class=unit>kWh</span>
              </div>
            </td>
            <td style="text-align:center">
              <button
                @click="set_current_scenario(scenario)"
                v-html="'select'"
                v-if="scenario != Global"
                style="font-weight:bold;width:100%;padding:1em 2em"
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
                load from file...
              </button>
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
            <td style="text-align:center" v-if="Scenarios.length>1">
              <button @click="add_scenario_to_compared(scenario)">
                <span v-if="scenarios_compared.indexOf(scenario)==-1" style="color:green">
                  include to comparison
                </span>
                <span v-else style="color:red">
                  remove from comparison
                </span>
              </button>
            </td>
          </tr>
        </table>

        <!--new system and save buttons-->
        <div style="text-align:center">
          <button onclick="ecam.new_scenario()"
            style="
              font-size:large;
            "
            class="button add"
            v-html="'create new system'"
            :title="'create new blank system'"
          ></button>
          <button onclick="alert('TODO')"
            style="
              font-size:large;
            "
            class="button save"
            v-html="'save to JSON file'"
            title="save all systems to a JSON file"
          ></button>
        </div>
      </div>

      <!--prev next buttons-->
      <div class=flex style="margin:1em;justify-content:center">
        <button class="button prev"
          onclick="event.stopPropagation();ecam.show('landing')">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();ecam.show('configuration')">
          {{translate('next')}}
        </button>
      </div>

      <!--compare scenarios-->
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
      #select_scenario details summary {
        cursor:pointer;
      }
    </style>
  `,
});
