let report = new Vue({
  el:"#report",

  data:{
    visible:false,

    Global,
    Configuration,
    Structure,
    GWP_reports,
  },

  methods:{
    format,
    translate,
    show_summaries_menu(){
      summaries_menu.visible=true;
    },
  },

  template:`
    <div id=report v-if="visible">
      <div>
        {{show_summaries_menu()}}
      </div>

      <h1 style="text-align:center">Report (in development)</h1>

      <div
        style="
          display:grid;
          grid-template-columns:50% 50%;
        "
      > 

        <!--report-->
        <div
          style="
            padding:2em;
            border:1px solid #ccc;
          "
        >
          <!--title-->
          <div
            style="
              font-weight:bold;
              color:var(--color-level-generic);
              border-bottom:3px solid var(--color-level-generic);
              padding-bottom:5px;
            "
          >
            <span style="font-size:larger">ECAM</span>
            <span style="font-size:smaller">Energy Performance and Carbon Emissions Assessment and Monitoring Tool</span>
          </div>

          <!--scenario name and details-->
          <div
            style="
              background:#EEF4FA;
              padding:1em 1.5em;
              margin-top:1em;
              margin-bottom:2em;
            "
          >
            <b style="color:var(--color-level-generic)">{{Global.General.Name}}</b>
            <ul
              style="
                list-style:none;
                padding-left:0;
                margin-bottom:0;
              "
            >
              <li><b>Assessment period:</b> {{Global.General.AssessmentPeriodStart}} to {{Global.General.AssessmentPeriodEnd}} ({{format(Global.Days())}} days)</li>
              <li><b>Country:</b> {{Global.General.Country}}</li>
              <li><b>Currency:</b> {{Global.General.Currency}}</li>
              <li><b>Global Warming Potential Source:</b> {{ GWP_reports[Configuration.gwp_reports_index].report }}</li>
            </ul>
          </div>

          <!--summary-->
          <div>
            <div class=heading>SUMMARY</div>
            <div>
              <table border=1>
                <thead>
                  <tr style="color:var(--color-level-generic)">
                    <th>Stage</th>
                    <th>
                      <img src="frontend/img/viti/select_scenario/icon-co2.svg">
                      Total GHG emissions
                    </th>
                    <th>
                      <img src="frontend/img/viti/select_scenario/icon-energy.svg">
                      Total Energy consumption
                    </th>
                  </tr>
                </thead>
                <tbody v-for="level in Structure.filter(s=>!s.sublevel)"
                  :style="{color:'var(--color-level-'+level.level+')'}"
                >
                  <tr v-for="s in Structure.filter(s=>s.level==level.level &&s.sublevel)">
                    <td>{{s.sublevel}}</td>
                    <td class=number>
                      <span>
                        {{format( Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum() )}}
                      </span>
                      <span>
                        kgCO<sub>2</sub>eq
                      </span>
                    </td>
                    <td class=number>
                      {{format( Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum() )}}
                      kWh
                    </td>
                  </tr>
                  <tr style="font-weight:bold">
                    <td>Total {{level.level}}</td>
                    <td class=number>
                      <span>
                        {{format( Global[level.level][level.prefix+'_KPI_GHG']().total )}}
                      </span>
                      <span>
                        kgCO<sub>2</sub>eq
                      </span>
                    </td>
                    <td class=number>
                      {{format( Global[level.level][level.prefix+'_nrg_cons']() )}}
                      kWh
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          in development
        </div>

        <!--VITI PDF-->
        <div style="text-align:center">
          <embed src="dev/report_disseny.pdf" width="100%" height="2100px">
        </div>
      </div>

    </div>
  `,

  style:`
    <style>
      #report div.heading {
        color:var(--color-level-generic);
        font-weight:bold;
        border-bottom:2px solid var(--color-level-generic);
        padding-bottom:5px;
      }
    </style>
  `,
});
