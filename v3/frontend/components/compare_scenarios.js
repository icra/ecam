let compare_scenarios=new Vue({
  el:"#compare_scenarios",
  data:{
    visible:false,
    scenarios_compared:[],

    variable,
    Global,
    Languages,
    Scenarios,
    Info,
    Structure,
  },

  methods:{
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

    get_input_codes,
    get_output_codes,
    get_variable_type,
    get_level_color,
    get_base_unit,
    format,
    translate,
  },

  template:`
    <div id=compare_scenarios v-if="visible && Languages.ready">
      <!--compare scenarios table-->
      <div style="padding-top:2em;background:#eff5fb">
        <h1 style="text-align:center">
          Compare assessments
        </h1>

        <p style="text-align:center;color:#666">
          <b>
            Select assessments to be compared. The darker column is the
            current assessment you are editing.
          </b>
        </p>

        <div>
          list of assessments
        </div>

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
    </style>
  `,
});
