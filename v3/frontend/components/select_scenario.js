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
    delete_scenario(obj){
      ecam.delete_scenario(obj);
    },
  },

  template:`
    <div id=select_scenario v-if="visible && Languages.ready">
      <h1 style="text-align:center">Select scenario</h1>

      <button onclick="ecam.new_scenario()"
        style="
          font-size:large;
          display:block;
          margin:auto;
        "
        v-html="'add new scenario'"
      ></button>

      <!--select scnario table-->
      <table style="margin:10px auto">
        <tr>
          <th>scenario name</th>
          <th>assessment period start</th>
          <th>assessment period end</th>
          <th>days</th>
          <th>GHG (kgCO<sub>2</sub>eq)</th>
          <th>energy (kWh)</th>
          <th>select scenario to edit</th>
        </tr>
        <tr v-for="scenario in Scenarios"
          :style="(scenario==Global)?'background:yellow':''"
        >
          <td><span v-html="scenario.General.Name"></span></td>
          <td><span v-html="scenario.General.AssessmentPeriodStart"></span></td>
          <td><span v-html="scenario.General.AssessmentPeriodEnd"></span></td>
          <td><span v-html="format(scenario.Days())"></span></td>
          <td><span v-html="format(scenario.TotalGHG())"></span></td>
          <td><span v-html="format(scenario.TotalNRG())"></span></td>
          <td>
            <button
              @click="set_current_scenario(scenario)"
              v-if="scenario != Global"
              v-html="'select'"
            ></button>
            <button
              @click="delete_scenario(scenario)"
              v-if="scenario != Global"
              v-html="'delete'"
            ></button>
            <span v-if="scenario==Global"
              style="
                font-size:smaller;
                font-style:italic;
              "
              v-html="'you are currently editing this scenario'"
            ></span>
          </td>
        </tr>
      </table>
    </div>
  `,
});
