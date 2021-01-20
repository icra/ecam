let compare_scenarios=new Vue({
  el:"#compare_scenarios",
  data:{
    visible:false,
    scenarios_compared:[],
    current_view:'table',
    include:{
      inputs:true,
      outputs:true,
    },

    variable,
    Global,
    Languages,
    Info,
    Structure,
  },

  methods:{
    //add scenario to comparison table
    add_scenario_to_compared(scenario){
      if(!scenario) return;
      if(scenario.constructor!==Ecam) return;

      let index=this.scenarios_compared.indexOf(scenario);
      if(index==-1){
        this.scenarios_compared.push(scenario);
      }else{
        this.scenarios_compared.splice(index,1);
      }
    },

    get_variables_and_values(level, sublevel){
      let input_codes  = this.include.inputs  ? get_input_codes( level, sublevel) : [];
      let output_codes = this.include.outputs ? get_output_codes(level, sublevel) : [];

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

      let outputs=[];
      output_codes.forEach(code=>{
        let scenario_values = null;
        if(sublevel){
          scenario_values = this.scenarios_compared.map(sce=>{
            return sce[level][sublevel].map(ss=> get_output_value(code,ss) ); //array
          });
        }else{
          scenario_values = this.scenarios_compared.map(sce=>{
            return [ get_output_value(code,sce[level]) ]; //array
          })
        }

        outputs.push({code, scenario_values});
      });

      return inputs.concat(outputs);
    },

    get_scenarios(){
      return Scenarios;
    },

    draw_all_charts(){
      //draw bar charts
        Charts.draw_bar_chart(
          'bar_chart_ghg_by_assessment',
          this.scenarios_compared.map((scenario,i)=>{
            let name     = `[${i+1}] `+scenario.General.Name;
            let emission = scenario.TotalGHG();
            let CO2 = emission.co2;
            let N2O = emission.n2o;
            let CH4 = emission.ch4;
            return {name, CO2, CH4, N2O};
          }),
          colors=[
            Charts.gas_colors.co2,
            Charts.gas_colors.ch4,
            Charts.gas_colors.n2o,
          ],
          'kgCO2eq',
        );

        Charts.draw_bar_chart(
          'bar_chart_nrg_by_assessment',
          this.scenarios_compared.map((scenario,i)=>{
            let name   = `[${i+1}] `+scenario.General.Name;
            let Energy = scenario.TotalNRG();
            return {name, Energy};
          }),
          colors=[
            "#ffbe54",
          ],
          'kWh',
        );

        Charts.draw_bar_chart(
          'bar_chart_ghg_by_stage',
          this.scenarios_compared.map((scenario,i)=>{

            return Structure.filter(s=>s.sublevel).map(s=>{
              let name = `[${i+1}] ${s.prefix}`;
              let CO2 = scenario[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().co2).sum();
              let N2O = scenario[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().n2o).sum();
              let CH4 = scenario[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().ch4).sum();
              return {name, CO2, CH4, N2O};
            });

          }).reduce((p,c)=>p.concat(c),[]),
          colors=[
            Charts.gas_colors.co2,
            Charts.gas_colors.ch4,
            Charts.gas_colors.n2o,
          ],
          'kgCO2eq',
        );

        Charts.draw_bar_chart(
          'bar_chart_ghg_by_substage',
          this.scenarios_compared.map((scenario,i)=>{
            return Structure.filter(s=>s.sublevel).map(s=>{
              return scenario[s.level][s.sublevel].map(ss=>{
                let name     = `[${i+1}]-${s.prefix}-${ss.name}`;
                let emission = ss[s.prefix+'_KPI_GHG']();
                let CO2 = emission.co2;
                let N2O = emission.n2o;
                let CH4 = emission.ch4;
                return {name, CO2, CH4, N2O};
              });
            }).reduce((p,c)=>p.concat(c),[]);
          }).reduce((p,c)=>p.concat(c),[]),
          colors=[
            Charts.gas_colors.co2,
            Charts.gas_colors.ch4,
            Charts.gas_colors.n2o,
          ],
          'kgCO2eq',
        );
      //--
    },

    get_level_color,
    get_base_unit,
    format,
    translate,
  },

  updated(){
    let _this=this;
    this.$nextTick(()=>{
      try{
        _this.draw_all_charts();
      }catch(e){
        console.warn(e);
      }
    })
  },

  template:`
    <div id=compare_scenarios v-if="visible && Languages.ready">

      <!--buttons select view-->
      <div
        style="
          display:grid;
          grid-template-columns:25% 25% 25% 25%;
          width:80%;
          margin:auto;
        "
      >
        <button :selected="current_view=='table'" @click="current_view='table'">Table</button>
        <div
          style="
            display:grid;
            grid-template-columns:100%;
          "
        >
          <button :selected="current_view=='bar_chart_ghg_by_assessment'" @click="current_view='bar_chart_ghg_by_assessment'">Bar chart: GHG by assessment</button>
          <button :selected="current_view=='bar_chart_nrg_by_assessment'" @click="current_view='bar_chart_nrg_by_assessment'">Bar chart: energy by assessment</button>
        </div>
        <button :selected="current_view=='bar_chart_ghg_by_stage'"      @click="current_view='bar_chart_ghg_by_stage'"     >Bar chart: GHG by stage</button>
        <button :selected="current_view=='bar_chart_ghg_by_substage'"   @click="current_view='bar_chart_ghg_by_substage'"  >Bar chart: GHG by substage</button>
      </div>

      <!--title-->
      <h1 style="text-align:center">Compare assessments</h1>

      <!--table comparison-->
      <div v-if="current_view=='table'">
        <p style="text-align:center;color:#666">
          <b>Select the assessments to be compared</b>
        </p>

        <!--list of assessments-->
        <div class=flex style="justify-content:center;text-align:center">
          <div class=selectable_scenario v-for="scenario in get_scenarios()">
            <label>
              <input
                type=checkbox
                @click="add_scenario_to_compared(scenario)"
                :checked="scenarios_compared.indexOf(scenario)+1"
              >
              <span>
                {{scenario.General.Name}}
              </span>
            </label>
          </div>
        </div>

        <!--choose inputs and/or outputs-->
        <div>
          <div style="text-align:center;margin-top:10px">
            <label> <input type=checkbox v-model="include.inputs">  Include inputs </label>
            <label> <input type=checkbox v-model="include.outputs"> Include outputs </label>
          </div>
        </div>

        <!--compare scenarios table-->
        <table style="margin:10px auto" v-if="scenarios_compared.length">
          <tbody>
            <tr>
              <td></td>
              <th v-for="scenario in scenarios_compared">
                <b>{{scenario.General.Name}}</b>
              </th>
            </tr>
          </tbody>
          <tbody v-for="stage in [{level:'General'}].concat(Structure)">
            <tr>
              <th
                :colspan="1+scenarios_compared.length"
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

                  <div style="font-size:smaller">
                    <a
                      @click="variable.view(v.code)"
                      style="color:white"
                    >
                      {{v.code}}
                    </a>
                  </div>
                </div>
              </th>

              <!--variable value-->
              <td
                v-for="arr,i in v.scenario_values"
                :style="scenarios_compared[i]==Global ? 'background:#f6f6f6':''"
              >
                <!--value and unit-->
                <div>
                  <div
                    v-if="arr.length"
                    style="text-align:right"
                  >
                    <div v-if="arr.length==1">{{ format(arr[0]) }}           </div>
                    <div v-else>              {{ arr.map(val=>format(val)) }}</div>
                  </div>
                  <div
                    class="unit"
                    style="text-align:right"
                    v-html="get_base_unit(v.code, get_scenarios[i]).prettify()"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--charts-->
      <div>
        <div
          v-if="current_view=='bar_chart_ghg_by_assessment'"
          class="chart_container bar"
        >
          <div id="bar_chart_ghg_by_assessment"></div>
        </div>

        <div
          v-if="current_view=='bar_chart_nrg_by_assessment'"
          class="chart_container bar"
        >
          <div id="bar_chart_nrg_by_assessment">hola</div>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_stage'"
          class="chart_container bar"
        >
          <div id="bar_chart_ghg_by_stage"></div>
        </div>

        <div
          v-if="current_view=='bar_chart_ghg_by_substage'"
          class="chart_container bar"
        >
          <div id="bar_chart_ghg_by_substage"></div>
        </div>
      </div>

      <!--notification: scenarios_compared is empty-->
      <div
        v-if="scenarios_compared.length==0"
        style="padding:1em;text-align:center;font-style:italic"
        v-html="'~No assessments included to comparison'"
      ></div>
    </div>
  `,

  style:`
    <style>
      #compare_scenarios {
        padding-left:1em;
        padding-top:2em;
        background:#eff5fb;
      }
      #compare_scenarios div.selectable_scenario{
        border:1px solid #ccc;
        padding:0.5em;
        background:white;
      }
      #compare_scenarios div.selectable_scenario:hover{
        color:var(--color-level-generic);
      }
      #compare_scenarios button[selected]{
        background:var(--color-level-generic);
        color:white;
      }

      /*bar chart css*/
      #compare_scenarios div.chart_container.bar svg {
        font: 10px sans-serif;
        shape-rendering: crispEdges;
      }
      #compare_scenarios div.chart_container.bar .axis path,
      #compare_scenarios div.chart_container.bar .axis line {
        fill: none;
        stroke: #000;
      }
      #compare_scenarios div.chart_container.bar path.domain {
        stroke: none;
      }
      #compare_scenarios div.chart_container.bar .y .tick line {
        stroke: #ddd;
      }
    </style>
  `,
});