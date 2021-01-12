let summary_ghg=new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    //folded sections
    unfolded_levels:['Water','Waste'],

    //current view selected
    current_view:"table",

    //frontend
    variable,
    Charts,

    //backend
    Global,
    Structure,
    Languages,
  },

  methods:{
    translate,
    format,
    go_to,

    show_summaries_menu(){
      summaries_menu.visible=true;
    },

    //fold/unfold a level in the summary table
    toggle_folded_level(level){
      let index = this.unfolded_levels.indexOf(level);
      if(index==-1){
        this.unfolded_levels.push(level);
      }else{
        this.unfolded_levels.splice(index,1);
      }
    },

    //call chart drawing functions
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
          ]
        );

        Charts.draw_pie_chart('chart_2',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum()/Global.TotalGHG().total;
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
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
        );

        Charts.draw_pie_chart('chart_nrg_stages',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum()/Global.TotalNRG();
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
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
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <div>
        {{show_summaries_menu()}}
      </div>

      <!--title-->
      <h1 style="padding-left:0">
        Summary: GHG emissions and energy consumption
      </h1>

      <!--select tables or charts-->
      <div style="padding:1em;border:1px solid #ccc">
        <button @click="current_view='table'"      :selected="current_view=='table'"     >Table</button>
        <button @click="current_view='charts_ghg'" :selected="current_view=='charts_ghg'">Charts GHG</button>
        <button @click="current_view='charts_nrg'" :selected="current_view=='charts_nrg'">Charts Energy</button>
        <button @click="current_view='charts_pop'" :selected="current_view=='charts_pop'">Charts Serviced Population</button>
      </div>

      <!--content-->
      <div>
        <!--tables-->
        <div v-if="current_view=='table'">
          <table id=table_summary style="width:85%;border-spacing:1px">
            <!--total ghg and nrg-->
            <tbody style="background:var(--color-level-generic);color:white">
              <tr>
                <td colspan=2 style="font-size:large;text-align:center;padding:1em;vertical-align:center">
                  Total
                </td>

                <!--total emissions-->
                <td style="background:inherit;">
                  <div style="
                    display:flex;
                    justify-content:center;
                    text-align:center;
                    align-items:center;
                  ">
                    <div>
                      <div class=number_placeholder v-html="format(Global.TotalGHG().total)"></div>
                    </div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                  </div>
                </td>

                <!--total energy consumption-->
                <td style="text-align:center">
                  <div
                    style="
                      display:flex;
                      justify-content:center;
                      align-items:center;
                    "
                  >
                    <div class=number_placeholder>
                      {{format(Global.TotalNRG())}}
                    </div>
                    <div style="color:white;font-size:x-small">kWh</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)">
              <!--level 1-->
              <tr :style="{background:l1.color,color:'white'}">
                <td style="background:inherit;text-align:center">
                  <button @click="toggle_folded_level(l1.level)">
                    {{ unfolded_levels.indexOf(l1.level) ? '+':'-' }}
                  </button>
                </td>

                <!--level 1 name and icon-->
                <td style="background:inherit;text-align:center">
                  <div 
                    style="
                      display:flex;
                      align-items:center;
                    "
                  >
                    <img :src="'frontend/img/'+l1.icon" style="width:50px;background:white;border-radius:50%">
                    &nbsp;
                    <a @click="go_to(l1.level)" style="color:white;">
                      {{ translate(l1.level) }}
                    </a>
                  </div>
                </td>

                <!--level 1 emissions-->
                <td style="background:inherit;">
                  <div style="
                    display:flex;
                    justify-content:center;
                    text-align:center;
                    padding-left:1em;
                    padding-right:1em;
                    align-items:center;
                  ">
                    <div
                      class=number_placeholder
                      :style="{color:l1.color, borderColor:l1.color}"
                      v-html="format(Global[l1.level][l1.prefix+'_KPI_GHG']().total)"
                    ></div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                  </div>
                </td>

                <!--level 1 energy consumption-->
                <td :style="{background:'inherit',textAlign:'center'}">
                  <div
                    style="
                      display:flex;
                      justify-content:center;
                      align-items:center;
                    "
                  >
                    <div
                      class=number_placeholder
                      :style="{color:l1.color, borderColor:l1.color}"
                      v-html="format(Global[l1.level][l1.prefix+'_nrg_cons']())"
                    ></div>
                    <div style="color:white;font-size:x-small">kWh</div>
                  </div>
                </td>
              </tr>

              <!--level 2-->
              <tr
                v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
                v-if="Global[l2.level][l2.sublevel].length && unfolded_levels.indexOf(l1.level)>-1"
              >
                <!--level 2 name and icon-->
                <td
                  :style="{background:'var(--color-level-'+l1.level+'-secondary)'}"
                ></td>
                <td
                  :style="{textAlign:'center',background:'var(--color-level-'+l1.level+'-secondary)'}"
                >
                  <div 
                    style="
                      display:flex;
                      align-items:center;
                    "
                  >
                    <img :src="'frontend/img/'+l2.icon" style="width:45px;">
                    &nbsp;
                    <a @click="go_to(l2.level,l2.sublevel)" :style="{color:l1.color}">
                      {{translate(l2.sublevel)}}
                    </a>
                  </div>
                </td>

                <!--level 2 ghg emissions-->
                <td style=background:white>
                  <div
                    style="
                      display:flex;
                      justify-content:center;
                      text-align:center;
                      padding-left:1em;
                      padding-right:1em;
                      align-items:center;
                    "
                  >
                    <div
                      class=number_placeholder
                      :style="{color:l1.color, borderColor:l1.color}"
                      v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_KPI_GHG']().total).sum())">
                    </div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                  </div>
                </td>

                <!--level 2 energy consumption-->
                <td :style="{background:'white', color:l1.color, textAlign:'center'}">
                  <div
                    style="
                      display:flex;
                      justify-content:center;
                      align-items:center;
                    "
                  >
                    <div
                      class=number_placeholder
                      :style="{color:l1.color,borderColor:l1.color,}"
                      v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_nrg_cons']).sum() )"
                    ></div>
                    <div style="color:black;font-size:x-small">kWh</div>
                  </div>
                </td>
              </tr>
            </tbody>

            <!--avoided ghg emissions-->
            <tbody class=avoided_emissions v-if="true || Global.Waste.ww_GHG_avoided()">
              <tr>
                <td></td>
                <td>
                  Avoided GHG emissions (TBD)
                </td>
                <td>
                  <div
                    style="
                      display:flex;
                      justify-content:center;
                      align-items:center;
                    "
                  >
                    <div
                      class=number_placeholder
                      v-html="Global.Waste.ww_GHG_avoided() ? format( Global.Waste.ww_GHG_avoided() ) : 0"
                    ></div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                  </div>
                </td>
                <td>
                  <button @click="variable.view('ww_GHG_avoided')">more info</button>
                </td>
              </tr>
            </tbody>
          </table>

          <table id=table_avoided_ghg style="width:85%;">
          </table>
        </div>

        <!--charts ghg-->
        <div v-if="current_view=='charts_ghg'">
          <!--pie charts ghg-->
          <div
            style="
              display:grid;
              grid-template-columns:50% 50%;
            "
          >
            <div class=chart_container style="border-right:none">
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
                GHG emissions
              </div>
              <div class=flex>
                <table border=1 class=ghg_table>
                  <tr>
                    <td style="background:var(--color-level-Water)"></td>
                    <td>{{translate('Water')}}</td>
                    <td>{{format(Global.Water.ws_KPI_GHG().total)}}</td>
                    <td class=unit v-html="'kgCO2eq'.prettify()"></td>
                  </tr>
                  <tr>
                    <td style="background:var(--color-level-Waste)"></td>
                    <td>{{translate('Waste')}}</td>
                    <td>{{format(Global.Waste.ww_KPI_GHG().total)}}</td>
                    <td class=unit v-html="'kgCO2eq'.prettify()"></td>
                  </tr>
                </table>
                <div id=chart_1></div>
              </div>
            </div>

            <div class=chart_container>
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
                GHG emissions by stage
              </div>
              <div class=flex>
                <table border=1 class=ghg_table>
                  <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                    <td :style="{background:stage.color}">
                    </td>
                    <td>
                      {{translate(stage.level)}}
                      {{translate(stage.sublevel)}}
                    </td>
                    <td>
                      {{ format(Global[stage.level][stage.sublevel].map(s=>s[stage.prefix+'_KPI_GHG']().total).sum()) }}
                    </td>
                    <td class=unit v-html="'kgCO2eq'.prettify()"></td>
                  </tr>
                </table>
                <div id=chart_2></div>
              </div>
            </div>

            <div class=chart_container style="border-right:none">
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
                GHG emissions by gas emitted
              </div>
              <div class=flex>
                <table border=1 class=ghg_table>
                  <tr v-for="value,key in Global.TotalGHG()" v-if="key!='total'">
                    <td :style="{background:Charts.gas_colors[key]}">
                    </td>
                    <td>
                      <div v-html="key.toUpperCase().prettify()"></div>
                    </td>
                    <td>
                      <div v-html="format(value)"></div>
                    </td>
                    <td class=unit v-html="'kgCO2eq'.prettify()"></td>
                  </tr>
                </table>
                <div id=chart_3></div>
              </div>
            </div>

            <div class=chart_container>
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
                GHG emissions by UNFCC category
              </div>
              <table border=1 class=ghg_table>
                <tr><td>TODO</td></tr>
              </table>
            </div>
          </div>

          <!--bar chart ghg substages-->
          <div class="chart_container bar">
            <div class=chart_title style="justify-content:center">
              <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
              GHG emissions by substage
            </div>
            <div>
              <div id=bar_chart_ghg_substages></div>
            </div>
          </div>
        </div>

        <!--charts nrg-->
        <div v-if="current_view=='charts_nrg'">
          <!--pie charts nrg-->
          <div
            style="
              display:grid;
              grid-template-columns:50% 50%;
            "
          >
            <div class=chart_container style="border-right:none">
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-energy.svg" class=icon_nrg>
                Energy consumption
              </div>

              <div class=flex>
                <table border=1 class=nrg_table>
                  <tr>
                    <td style="background:var(--color-level-Water)"></td>
                    <td>{{translate('Water')}}</td>
                    <td>{{format(Global.Water.ws_nrg_cons())}}</td>
                    <td class=unit v-html="'kWh'"></td>
                  </tr>
                  <tr>
                    <td style="background:var(--color-level-Waste)"></td>
                    <td>{{translate('Waste')}}</td>
                    <td>{{format(Global.Waste.ww_nrg_cons())}}</td>
                    <td class=unit v-html="'kWh'"></td>
                  </tr>
                </table>
                <div id=chart_nrg_levels></div>
              </div>
            </div>

            <div class=chart_container>
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-energy.svg" class=icon_nrg>
                Energy consumption by stage
              </div>

              <div class=flex>
                <table border=1 class=nrg_table>
                  <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                    <td :style="{background:stage.color}">
                    </td>
                    <td>
                      {{translate(stage.level)}}
                      {{translate(stage.sublevel)}}
                    </td>
                    <td>
                      {{ format(Global[stage.level][stage.sublevel].map(s=>s[stage.prefix+'_nrg_cons']).sum()) }}
                    </td>
                    <td class=unit v-html="'kWh'"></td>
                  </tr>
                </table>
                <div id=chart_nrg_stages></div>
              </div>
            </div>
          </div>

          <!--bar chart nrg substages-->
          <div class="chart_container bar">
            <div class=chart_title style="justify-content:center">
              <img src="frontend/img/viti/select_scenario/icon-energy.svg" class=icon_nrg>
              Energy consumption by substage
            </div>
            <div>
              <div id=bar_chart_nrg_substages></div>
            </div>
          </div>
        </div>

        <!--charts pop-->
        <div v-if="current_view=='charts_pop'">
          <div class=chart_container>
            <div class=chart_title>
              Serviced population
            </div>

            <div style="">
              <serv_pop_bar v-if="Global.Water.ws_resi_pop" :stage="Global.Water" code="ws_SL_serv_pop"></serv_pop_bar>
              <serv_pop_bar v-if="Global.Waste.ww_resi_pop" :stage="Global.Waste" code="ww_SL_serv_pop"></serv_pop_bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

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

  style:`
    <style>
      #summary_ghg {
        padding:1em;
      }
      #summary_ghg table {
        border-collapse:separate;
        border-spacing:3px;
      }
      #summary_ghg table th,
      #summary_ghg table td {
        border:none;
        background:inherit;
        padding:10px;
      }
      #summary_ghg div.number_placeholder {
        width:150px;
        font-size:large;
        font-weight:bold;
        padding:0.5em 0;
        background:white;
        border:1px solid var(--color-level-generic);
        color:var(--color-level-generic);
        margin:0 5px;
      }

      #summary_ghg button[selected]{
        background:var(--color-level-generic);
        color:white;
        outline:none;
      }

      /*pie chart*/
      #summary_ghg div.chart_container {
        background:white;
        border:1px solid #ccc;
        padding:1em;
        border-top:none;
      }
      #summary_ghg div.chart_container div.chart_title{
        color:var(--color-level-generic);
        font-size:large;
        font-weight:bold;
        display:flex;
        align-items:center;
      }
      #summary_ghg div.chart_container div.chart_title img.icon_co2,
      #summary_ghg div.chart_container div.chart_title img.icon_nrg{
        width:50px;
        display:block;
        margin-right:5px;
        margin-bottom:5px;
      }
      #summary_ghg div.chart_container table.ghg_table,
      #summary_ghg div.chart_container table.nrg_table {
        margin-right:10px;
      }

      #summary_ghg div.chart_container div.bar_background {
        background:#dadada;
        width:100%;
        height:2em;
      }
      #summary_ghg div.chart_container div.bar_background div.progress{
        text-align:center;
        height:2em;
      }

      /*bar chart css*/
      #summary_ghg div.chart_container.bar svg {
        font: 10px sans-serif;
        shape-rendering: crispEdges;
      }

      #summary_ghg div.chart_container.bar .axis path,
      #summary_ghg div.chart_container.bar .axis line {
        fill: none;
        stroke: #000;
      }

      #summary_ghg div.chart_container.bar path.domain {
        stroke: none;
      }

      #summary_ghg div.chart_container.bar .y .tick line {
        stroke: #ddd;
      }

      #summary_ghg tbody.avoided_emissions td {
        background:lightgreen;
        border:1px solid #ccc;
        text-align:center;
      }
    </style>
  `,
});

//serviced population % progress bar
Vue.component('serv_pop_bar',{
  props:[
    "stage",
    "code",
  ],
  methods:{
    translate,
    format,
  },
  template:`
    <div
      style="
        display:grid;
        grid-template-columns:50% 30% 10%;
        align-items:center;
      "
    >
      <div style="font-weight:bold">
        {{translate(code+'_descr')}}
      </div>
      <div>
        <progress
          :value="stage[code]()"
          style="height:2.5em;width:100%"
          max=100
        ></progress>
      </div>
      <div style="text-align:center">
        {{ format(stage[code]()) }} %
      </div>
    </div>
  `,
});
