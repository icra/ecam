let report = new Vue({
  el:"#report",

  data:{
    visible:false,

    Global,
    Info,
    Languages,
  },

  methods:{
    format,
    translate,

    get_ghg_emissions_by_level(){
      //Water, Waste
      return 0;
    },

    get_ghg_emissions_by_source(){
      //electricity, CO2, N2O, CH4
      return 0;
    },

    get_ghg_emissions_by_source_detailed(){
      //v2
    }
  },


  template:`
    <div id=report v-if="visible && Languages.ready">
      <summaries current_view=report></summaries>

      <h1>
        {{Global.General.Name}}
        &mdash;
        Report (under development: placeholder code for graphs, replacement for tier A in v2.2)
      </h1>

      <ul v-if=false>
        <li>
          <details>
            <summary>
              figure 1: ghg emissions by level (pie chart)
            </summary>
            <pre v-html="JSON.stringify(get_ghg_emissions_by_level(),null,'  ')"></pre>
          </details>
        </li>

        <li>
          <details>
            <summary>
              figure 2: ghg emissions by source (CO2, N2O, CH4)
            </summary>
            <pre v-html="JSON.stringify(get_ghg_emissions_by_source(),null,'  ')"></pre>
          </details>
        </li>

        <li>figure 3: ghg emissions by compound (detailed)</li>
        <li>figure 4: ghg emissions by UNFCCC categories</li>

        <li>figure 5: energy consumption by level</li>

        <li>figure 6:water total running costs</li>
        <li>figure 7:waste total running costs</li>

        <li>figure 8: serviced population in water supply (%)</li>
        <li>figure 9: total ghg water supply (kg/year/serv.pop)</li>

        <li>figure10: serviced population in wastewater (%)</li>
        <li>figure11: total ghg wastewater (kg/year/serv.pop)</li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #report details summary {
        cursor:pointer;
      }
    </style>
  `,
});
