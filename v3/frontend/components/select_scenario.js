let select_scenario = new Vue({
  el:"#select_scenario",
  data:{
    visible:false,
    format,

    Global,
    Scenarios,
    Languages,
  },
  methods:{
    set_current_scenario(obj){
      ecam.set_current_scenario(obj);
    },
  },

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      Scenarios
      <button onclick="ecam.new_scenario()">new scenario</button>
      <table>
        <tr>
          <th>name</th>
          <th>start</th>
          <th>end</th>
          <th>GHG</th>
          <th>select</th>
        </tr>
        <tr v-for="scenario in Scenarios"
          :style="(scenario==Global)?'background:yellow':''"
        >
          <td><span v-html="scenario.General.Name"></span></td>
          <td><span v-html="scenario.General.AssessmentPeriodStart"></span></td>
          <td><span v-html="scenario.General.AssessmentPeriodEnd"></span></td>
          <td><span v-html="format(scenario.TotalGHG())"></span></td>
          <td>
            <button
              @click="set_current_scenario(scenario)"
              :disabled="scenario == Global"
              v-html="'select'"
            ></button>
          </td>
        </tr>
      </table>
    </div>
  `,
});
