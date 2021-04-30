let report = new Vue({
  el:"#report",

  data:{
    visible:false,
    pdf_visible:true,
    summaries_menu_visible:true,
    printable_version:false,

    Charts,
    Global,
    Configuration,
    Structure,
    GWP_reports,
    Languages,
    UNFCCC,
  },

  methods:{
    format,
    translate,
    get_input_codes,
    get_output_codes,
    get_output_value,
    get_base_unit,

    show_summaries_menu(){
      if(this.printable_version==false){
        summaries_menu.visible=true;
      }
    },

    draw_all_charts(){
      if(this.Global.TotalGHG().total==0) return;

      //draw pie charts
        //size of circles of pie charts
        let width  = 200; //px
        let height = 200; //px

        Charts.draw_pie_chart('chart_1',
          [
            {"label":"", "value":100*Global.Water.ws_KPI_GHG().total/Global.TotalGHG().total},
            {"label":"", "value":100*Global.Waste.ww_KPI_GHG().total/Global.TotalGHG().total},
          ],[
            "var(--color-level-Water)",
            "var(--color-level-Waste)",
          ],
          width, height,
        );

        Charts.draw_pie_chart('chart_2',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum()/Global.TotalGHG().total;
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
          width, height,
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
          width, height,
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
          width, height,
        );

        Charts.draw_pie_chart('chart_nrg_stages',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum()/Global.TotalNRG();
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
          width, height,
        );

        Charts.draw_pie_chart('chart_unfccc',
          Object.keys(UNFCCC).map(key=>{
            let total_ghg = Global.TotalGHG().total;
            let label = "";
            let value = 100*UNFCCC[key].emissions(Global)/total_ghg;
            return {label,value};
          }),
          Object.values(UNFCCC).map(obj=>obj.color),
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

      if(_this.visible){
        ecam_logo.visible            = !_this.printable_version;
        summaries_menu.visible       = !_this.printable_version;
        linear_menu.visible          = !_this.printable_version;
        _this.summaries_menu_visible = !_this.printable_version;
        _this.pdf_visible            = !_this.printable_version;
      }
    });

  },

  template:`
    <div id=report v-if="visible && Languages.ready">
      <div>{{show_summaries_menu()}}</div>

      <!--title-->
      <h1 v-if="!printable_version" style="text-align:center">
        <div>
          Report
        </div>
        <div style="text-align:center;font-size:smaller">
          Double-click the report to enable/disable a printable view. Then press CTRL+P to generate a PDF file.
        </div>
      </h1>

      <!--grid 50 50-->
      <div>
        <!--report in PDF-->
        <!--
        <div v-if="false" style="text-align:center">
          <embed src="dev/report_disseny.pdf" width="100%" height="500px">
        </div>
        -->

        <!--report in html-->
        <div
          style="
            padding-top:1em;
            padding-bottom:1em;
          "
          :dark_background="printable_version==false"
        >
          <div
            @dblclick="printable_version^=1"
            style="
              padding:3em 2em 2em 3em;
              background:white;
            "
            :with_border="printable_version==false"
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
                      <th style="text-align:left">Stage</th>
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
                  <div class=flex>
                    <table class=legend>
                      <tr>
                        <td style="color:var(--color-level-Water)">
                          {{translate('Water')}}
                        </td>
                      </tr>
                      <tr>
                        <td style="color:var(--color-level-Waste)">
                          {{translate('Waste')}}
                        </td>
                      </tr>
                    </table>
                    <div id=chart_1></div>
                  </div>
                </div>

                <div class=chart_container>
                  <div class=chart_title>
                    GHG emissions by stage
                  </div>
                  <div class=flex>
                    <table class=legend>
                      <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                        <td :style="{color:stage.color}">
                          {{translate(stage.level)}}
                          {{translate(stage.sublevel)}}
                        </td>
                      </tr>
                    </table>
                    <div id=chart_2></div>
                  </div>
                </div>

                <div class=chart_container>
                  <div class=chart_title>
                    GHG emissions by gas emitted
                  </div>
                  <div class=flex>
                    <table class=legend>
                      <tr v-for="value,key in Global.TotalGHG()" v-if="key!='total'">
                        <td :style="{color:Charts.gas_colors[key]}">
                          <div v-html="key.toUpperCase().prettify()"></div>
                        </td>
                      </tr>
                    </table>
                    <div id=chart_3></div>
                  </div>
                </div>

                <div class=chart_container>
                  <div class=chart_title>
                    GHG emissions by UNFCCC category
                  </div>
                  <div class=flex>
                    <table class=legend>
                      <tr v-for="[key,obj] in Object.entries(UNFCCC)">
                        <td :style="{color:obj.color}">
                          <div>{{ obj.description }}</div>
                        </td>
                      </tr>
                    </table>
                    <div id=chart_unfccc></div>
                  </div>
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
                  <div class=flex>
                    <table class=legend>
                      <tr>
                        <td style="color:var(--color-level-Water)">
                          <div>{{translate('Water')}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:var(--color-level-Waste)">
                          <div>{{translate('Waste')}}</div>
                        </td>
                      </tr>
                    </table>
                    <div id=chart_nrg_levels></div>
                  </div>
                </div>

                <div class=chart_container>
                  <div class=chart_title>
                    Energy consumption by stage
                  </div>

                  <div class=flex>
                    <table class=legend>
                      <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                        <td :style="{color:stage.color}">
                          <div>
                            {{translate(stage.level)}}
                            {{translate(stage.sublevel)}}
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div id=chart_nrg_stages></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class=heading>SUMMARY - Sankey diagram</div>
              <div id=sankey></div>
            </div>

            <!--inputs-->
            <div>
              <div class=heading>INPUTS</div>
              <div>
                <div v-for="stage in Structure.filter(s=>s.sublevel)">
                  <div :style="{color:stage.color, fontWeight:'bold', marginTop:'20px'}">
                    {{translate(stage.level)}}
                    &rsaquo;
                    {{translate(stage.sublevel)}}
                  </div>

                  <table class=substages style="border-collapse:separate" v-if="Global[stage.level][stage.sublevel].length">
                    <tr>
                      <th></th>
                      <th v-for="ss in Global[stage.level][stage.sublevel]">
                        <b>{{ss.name}}</b>
                      </th>
                      <th>Unit</th>
                    </tr>
                    <tr v-for="code in get_input_codes(stage.level,stage.sublevel)">
                      <td
                        :style="{background:stage.color}"
                      >
                        <small v-html="translate(code+'_descr').prettify()"></small>
                      </td>
                      <td
                        v-for="ss in Global[stage.level][stage.sublevel]"
                        class=number
                      >
                        {{format(ss[code])}}
                      </td>
                      <td class=unit>
                        <span v-html="get_base_unit(code).prettify()"></span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <!--outputs-->
            <div>
              <div class=heading>OUTPUTS</div>
              <div>
                <div v-for="stage in Structure.filter(s=>s.sublevel)">
                  <div :style="{color:stage.color, fontWeight:'bold', marginTop:'20px'}">
                    {{translate(stage.level)}}
                    &rsaquo;
                    {{translate(stage.sublevel)}}
                  </div>

                  <table class=substages style="border-collapse:separate" v-if="Global[stage.level][stage.sublevel].length">
                    <tr>
                      <th></th>
                      <th v-for="ss in Global[stage.level][stage.sublevel]">
                        <b>{{ss.name}}</b>
                      </th>
                      <th>Unit</th>
                    </tr>
                    <tr v-for="code in get_output_codes(stage.level,stage.sublevel)">
                      <td
                        :style="{background:stage.color}"
                      >
                        <small v-html="translate(code+'_descr').prettify()"></small>
                      </td>
                      <td
                        v-for="ss in Global[stage.level][stage.sublevel]"
                        class=number
                      >
                        <div v-html="format(get_output_value(code,ss))"></div>
                      </td>
                      <td class=unit>
                        <span v-html="get_base_unit(code).prettify()"></span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      div.grid_50_50 {
        display:grid;
        grid-template-columns:50% 50%;
      }
      #report div.heading {
        color:var(--color-level-generic);
        font-weight:bold;
        border-bottom:2px solid var(--color-level-generic);
        padding-bottom:5px;
        padding-top:30px;
      }

      #report table th,
      #report table td {
        border:none;
      }

      #report table.summary th,
      #report table.summary td {
        border-bottom:1px solid #ccc;
      }

      #report table.legend {
        width:38%;
      }

      #report table.legend th,
      #report table.legend td {
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

      #report table.substages td.number {
        background:#eee;
      }

      #report div[dark_background]{
        background:#999;
      }
      #report div[with_border]{
        box-shadow:2px 2px 1px black;
        width:740px;
        margin:auto;
      }
    </style>
  `,
});
