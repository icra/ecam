let report = new Vue({
  el:"#report",

  data:{
    visible:false,
  },

  methods:{
  },

  template:`
    <div id=report v-if="visible">
      <h1 style="text-align:center">
        Report (charts are being moved to summary GHG)
      </h1>
      List of charts
      <ul>
        <li>figure 1: ghg emissions by level (pie chart)</li>
        <li>figure 2: ghg emissions by source (CO2, N2O, CH4)</li>
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
});
