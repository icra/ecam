let report = new Vue({
  el:"#report",

  data:{
    visible:false,
    pdf_visible:true,

    Charts,
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

    draw_all_charts(){
      if(this.Global.TotalGHG().total==0) return;

      //draw pie charts
        Charts.draw_pie_chart('chart_1',
          [
            {"label":"", "value":100*Global.Water.ws_KPI_GHG().total/Global.TotalGHG().total},
            {"label":"", "value":100*Global.Waste.ww_KPI_GHG().total/Global.TotalGHG().total},
          ],[
            "var(--color-level-Water)",
            "var(--color-level-Waste)",
          ],
          width=150, height=150,
        );

        Charts.draw_pie_chart('chart_2',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum()/Global.TotalGHG().total;
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
          width=150, height=150,
        );

        Charts.draw_pie_chart('chart_3',
          [
            {"label":"", "value":100*Global.TotalGHG().co2/Global.TotalGHG().total},
            {"label":"", "value":100*Global.TotalGHG().n2o/Global.TotalGHG().total},
            {"label":"", "value":100*Global.TotalGHG().ch4/Global.TotalGHG().total},
          ],
          [
            Charts.gas_colors.co2,
            Charts.gas_colors.n2o,
            Charts.gas_colors.ch4,
          ],
          width=150, height=150,
        );

        Charts.draw_pie_chart('chart_nrg_levels',
          [
            {"label":"", "value":100*Global.Water.ws_nrg_cons()/Global.TotalNRG()},
            {"label":"", "value":100*Global.Waste.ww_nrg_cons()/Global.TotalNRG()},
          ],
          [
            "var(--color-level-Water)",
            "var(--color-level-Waste)",
          ],
          width=150, height=150,
        );

        Charts.draw_pie_chart('chart_nrg_stages',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum()/Global.TotalNRG();
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
          width=150, height=150,
        );
      //--

      //draw bar charts
        Charts.draw_bar_chart(
          'bar_chart_ghg_substages',
          Structure.filter(s=>s.sublevel).map(s=>{
            return Global[s.level][s.sublevel].map(ss=>{
              let name     = s.prefix+" "+ss.name;
              let emission = ss[s.prefix+'_KPI_GHG']();
              let CO2 = emission.co2;
              let N2O = emission.n2o;
              let CH4 = emission.ch4;
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
          'bar_chart_nrg_substages',
          Structure.filter(s=>s.sublevel).map(s=>{
            return Global[s.level][s.sublevel].map(ss=>{
              let name   = s.prefix+" "+ss.name;
              let Energy = ss[s.prefix+'_nrg_cons'];
              return {name, Energy};
            });
          }).reduce((p,c)=>p.concat(c),[]),
          colors=[
            "#ffbe54",
          ],
          'kWh',
        );
      //--

      Charts.draw_sankey_ghg();
    },
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
    <div id=report v-if="visible">
      <div>{{show_summaries_menu()}}</div>
      <!--title-->
      <h1 style="text-align:center">
        Report
        <button @click="pdf_visible^=1">show/hide pdf</button>
      </h1>

      <!--grid 50 50-->
      <div
        style="
          display:grid;
          grid-template-columns:50% 50%;
        "
      >
        <!--report in html-->
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
              margin-bottom:1em;
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
              <table class=summary style="width:100%">
                <thead>
                  <tr style="color:var(--color-level-generic)">
                    <th>Stage</th>
                    <th>
                      <div
                        style="
                          display:flex;
                          align-items:center;
                          justify-content:center;
                        "
                      >
                        <img src="frontend/img/viti/select_scenario/icon-co2.svg" style="height:30px;margin-right:1em">
                        <span>
                          GHG emissions
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style="
                          display:flex;
                          align-items:center;
                          justify-content:center;
                        "
                      >
                        <img src="frontend/img/viti/select_scenario/icon-energy.svg" style="height:30px;margin-right:1em">
                        <span>
                          Energy consumption
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="level in Structure.filter(s=>!s.sublevel)"
                  :style="{color:'var(--color-level-'+level.level+')'}"
                >
                  <tr v-for="s in Structure.filter(s=>s.level==level.level &&s.sublevel)">
                    <td>{{translate(s.sublevel)}}</td>
                    <td class=number>
                      <span>
                        {{format( Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum() )}}
                      </span>
                      <span>kgCO<sub>2</sub>eq</span>
                    </td>
                    <td class=number>
                      {{format( Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum() )}}
                      kWh
                    </td>
                  </tr>
                  <tr style="font-weight:bold">
                    <td>Total {{translate(level.level)}}</td>
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
                <tbody>
                  <tr style="color:var(--color-level-generic);font-weight:bold;font-size:larger">
                    <td>Total</td>
                    <td class=number>
                      {{format(Global.TotalGHG().total)}}
                      <span>kgCO<sub>2</sub>eq</span>
                    </td>
                    <td class=number>
                      {{format(Global.TotalNRG())}}
                      <span>kWh</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class=heading>SUMMARY - Charts - GHG emissions</div>
            <!--pie charts ghg-->
            <div
              style="
                display:grid;
                grid-template-columns:50% 50%;
              "
            >
              <div class=chart_container>
                <div class=chart_title>
                  GHG emissions
                </div>
                <div>
                  <div id=chart_1></div>
                  <table class=legend>
                    <tr>
                      <td style="background:var(--color-level-Water)"></td>
                      <td>{{translate('Water')}}</td>
                    </tr>
                    <tr>
                      <td style="background:var(--color-level-Waste)"></td>
                      <td>{{translate('Waste')}}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class=chart_container>
                <div class=chart_title>
                  GHG emissions by stage
                </div>
                <div>
                  <div id=chart_2></div>
                  <table class=legend>
                    <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                      <td :style="{background:stage.color}"></td>
                      <td>
                        {{translate(stage.level)}}
                        {{translate(stage.sublevel)}}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class=chart_container>
                <div class=chart_title>
                  GHG emissions by gas emitted
                </div>
                <div>
                  <div id=chart_3></div>
                  <table class=legend>
                    <tr v-for="value,key in Global.TotalGHG()" v-if="key!='total'">
                      <td :style="{background:Charts.gas_colors[key]}"></td>
                      <td>
                        <div v-html="key.toUpperCase().prettify()"></div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class=chart_container>
                <div class=chart_title>
                  GHG emissions by UNFCC category
                </div>
                <table class=legend>
                  <tr><td>TODO</td></tr>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div class=heading>SUMMARY - Charts - Energy performance</div>
            <!--pie charts nrg-->
            <div
              style="
                display:grid;
                grid-template-columns:50% 50%;
              "
            >
              <div class=chart_container>
                <div class=chart_title>
                  Energy consumption
                </div>
                <div>
                  <div id=chart_nrg_levels></div>
                  <table class=legend>
                    <tr>
                      <td style="background:var(--color-level-Water)"></td>
                      <td>{{translate('Water')}}</td>
                    </tr>
                    <tr>
                      <td style="background:var(--color-level-Waste)"></td>
                      <td>{{translate('Waste')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class=chart_container>
                <div class=chart_title>
                  Energy consumption by stage
                </div>

                <div>
                  <div id=chart_nrg_stages></div>
                  <table class=legend>
                    <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                      <td :style="{background:stage.color}"></td>
                      <td>
                        {{translate(stage.level)}}
                        {{translate(stage.sublevel)}}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class=heading>SUMMARY - Sankey diagram</div>
            <div id=sankey></div>
          </div>

          <div>
            <div class=heading>INPUTS</div>
            TODO
          </div>

          <div>
            <div class=heading>OUTPUTS</div>
            TODO
          </div>
        </div>

        <!--report from VITI in PDF-->
        <div v-if="pdf_visible" style="text-align:center">
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
        padding-top:30px;
      }

      #report table.summary th,
      #report table.summary td {
        border:none;
        border-bottom:1px solid #ccc;
      }

      #report table.legend th,
      #report table.legend td {
        border:none;
        font-size:smaller;
      }

      #report div.chart_container div.chart_title{
        color:var(--color-level-generic);
        font-weight:bold;
        margin-top:15px;
        margin-bottom:10px;
      }

      #report #sankey {
        padding:10px 0;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
        height: 400px;
        font: 13px sans-serif;
      }
      #report #sankey .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
      }
      #report #sankey .node text {
        text-shadow: 0 1px 0 #fff;
      }
      #report #sankey .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .2;
      }
    </style>
  `,
});
