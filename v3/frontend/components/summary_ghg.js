let summary_ghg=new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    see_emissions_disgregated:false,
    type_of_summary_table:"ghg",

    //folded sections
    unfolded_levels:['Water','Waste'],

    //current view selected
    current_view:"table",

    //current emissions unit
    current_unit_ghg:"kgCO2eq",
    current_unit_nrg:"kWh",

    //chart objects from chartjs library stored here
    charts:{},

    //frontend
    variable,
    Charts,

    //backend
    Global,
    Structure,
    Languages,
    UNFCCC,
    Formulas,
  },

  methods:{
    translate,
    format,
    go_to,
    get_sum_of_substages,

    //sorting function for emission sources order requested by elaine
    //https://github.com/icra/ecam/issues/362
    emission_sources_order(a,b){
      let codes=[
        //wwc
        "wwc_KPI_GHG_elec",
        "wwc_KPI_GHG_fuel",
        "wwc_KPI_GHG_col",
        "wwc_KPI_GHG_cso",

        //wwt
        "wwt_KPI_GHG_elec",
        "wwt_KPI_GHG_fuel",
        "wwt_KPI_GHG_dig_fuel",
        "wwt_KPI_GHG_tre",
        "wwt_KPI_GHG_slu",
        "wwt_KPI_GHG_biog",
        "wwt_KPI_GHG_disc",
        "wwt_KPI_GHG_reus_trck",

        //wwo
        "wwo_KPI_GHG_elec",
        "wwo_KPI_GHG_fuel",
        "wwo_KPI_GHG_dig_fuel",
        "wwo_KPI_GHG_containment",
        "wwo_KPI_GHG_tre",
        "wwo_KPI_GHG_biog",
        "wwo_KPI_GHG_dis",
        "wwo_KPI_GHG_trck",
        "wwo_KPI_GHG_dumping",
        "wwo_KPI_GHG_landapp",
        "wwo_KPI_GHG_landfil",
        "wwo_KPI_GHG_unt_opd",
        "wwo_KPI_GHG_urine",
      ];
      return codes.indexOf(a) - codes.indexOf(b);
    },

    get_summary_unit(){
      if(this.type_of_summary_table=='ghg'){
        return this.current_unit_ghg;
      }else{
        return this.current_unit_nrg;
      }
    },

    //emissions are in kg by default
    format_emission(number){
      let divisor = this.current_unit_ghg=='tCO2eq' ? 1000:1;
      let digits  = undefined;
      return format(number,digits,divisor);
    },

    format_energy(number){
      let divisor = this.current_unit_nrg=='MWh' ? 1000:1;
      let digits  = undefined;
      return format(number,digits,divisor);
    },

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
      //destroy all charts
      Object.values(this.charts).forEach(chart=>chart.destroy());

      //pie charts (d3js)
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
            let total_nrg = Global.TotalNRG();
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum()/total_nrg;
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
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

        Charts.draw_pie_chart('pie_chart_ws_serv_pop',
          [
            {label:translate('ws_serv_pop_descr'), value:    100*Global.Water.ws_serv_pop()/Global.Water.ws_resi_pop||0},
            {label:translate('ws_serv_pop_descr'), value:100-100*Global.Water.ws_serv_pop()/Global.Water.ws_resi_pop||0},
          ],
          colors=[
            "var(--color-level-Water)",
            "#eee",
          ],
        );

        Charts.draw_pie_chart('pie_chart_ww_serv_pop',
          [
            {label:translate('ww_serv_pop_descr'), value:    100*Global.Waste.ww_serv_pop()/Global.Waste.ww_resi_pop||0},
            {label:translate('ww_serv_pop_descr'), value:100-100*Global.Waste.ww_serv_pop()/Global.Waste.ww_resi_pop||0},
          ],
          colors=[
            "var(--color-level-Waste)",
            "#eee",
          ],
        );
      //--

      //Chart.js bar chart -- ghg by substage
      if(document.getElementById('bar_chart_ghg_substages')){
        this.charts.bar_chart_ghg_substages = new Chart('bar_chart_ghg_substages',{
          type:'bar',
          data:{
            labels: Structure.filter(s=>s.sublevel).map(s=>{
              return Global[s.level][s.sublevel].map(ss=>{
                return (s.prefix+" "+ss.name);
              });
            }).reduce((p,c)=>p.concat(c),[]),
            datasets:[
              ...['co2','ch4','n2o'].map(gas=>{
                return {
                  label:`${gas.toUpperCase()} (${this.current_unit_ghg})`,
                  data: Structure.filter(s=>s.sublevel).map(s=>{
                    return Global[s.level][s.sublevel].map(ss=>{
                      let divisor = this.current_unit_ghg=='tCO2eq'?1000:1;
                      return ss[s.prefix+'_KPI_GHG']()[gas]/divisor;
                    });
                  }).reduce((p,c)=>p.concat(c),[]),
                  backgroundColor:[Charts.gas_colors[gas]],
                  borderColor:[Charts.gas_colors[gas]],
                  borderWidth:1,
                };
              }),
            ],
          },
          options:{
            aspectRatio:4,
            scales:{
              x:{
                stacked:true,
              },
              y:{
                beginAtZero:true,
                borderWidth:2,
                stacked:true,
              },
            },
          },
        });
      }

      //Chart.js bar chart -- nrg by substage
      if(document.getElementById('bar_chart_nrg_substages')){
        this.charts.bar_chart_nrg_substages = new Chart('bar_chart_nrg_substages',{
          type:'bar',
          data:{
            labels: Structure.filter(s=>s.sublevel).map(s=>{
              return Global[s.level][s.sublevel].map(ss=>{
                return (s.prefix+" "+ss.name);
              });
            }).reduce((p,c)=>p.concat(c),[]),
            datasets:[
              {
                label:`Energy (${this.current_unit_nrg})`,
                data:Structure.filter(s=>s.sublevel).map(s=>{
                  return Global[s.level][s.sublevel].map(ss=>{
                    let divisor = this.current_unit_nrg=='MWh'?1000:1;
                    return ss[s.prefix+'_nrg_cons']/divisor;
                  });
                }).reduce((p,c)=>p.concat(c),[]),
                backgroundColor:["#ffbe54"],
                borderColor:["#ffbe54"],
                borderWidth:1,
              },
            ]
          },
          options:{
            aspectRatio:4,
            scales:{
              y:{
                beginAtZero:true,
                borderWidth:2,
              },
            },
          },
        });
      }
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <div> {{show_summaries_menu()}} </div>

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

        <hr style="border-color:#eee">

        <div
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
          "
        >
          <table
            style="
              border:1px solid #eee;
            "
          >
            <tr v-if="current_view=='table'">
              <!--select summary table type-->
              <td><b>Select summary table</b></td>
              <td>
                <label>
                  <input type=radio v-model="type_of_summary_table" value="ghg">
                  GHG
                </label>
              </td>
              <td>
                <label>
                  <input type=radio v-model="type_of_summary_table" value="nrg">
                  Energy
                </label>
              </td>
            </tr>
            <tr v-if="['table','charts_ghg','charts_nrg'].indexOf(current_view)+1">
              <!--select units-->
              <td><b>Select units</b></td>
              <td v-if="current_view=='table'||current_view=='charts_ghg'">
                <select v-model="current_unit_ghg">
                  <option>kgCO2eq</option>
                  <option>tCO2eq</option>
                </select>
              </td>
              <td v-if="current_view=='table'||current_view=='charts_nrg'">
                <select v-model="current_unit_nrg">
                  <option>kWh</option>
                  <option>MWh</option>
                </select>
              </td>
            </tr>
          </table>

          <div v-if="current_view=='table' && type_of_summary_table=='ghg'">
            <!--select see other ghgs-->
            <b v-html="'Show emissions in CO2, CH4 and N2O'.prettify()"></b></td>
            <span>
              <label>
                <input type=radio v-model="see_emissions_disgregated" :value="false">
                No
              </label>
            </span>
            <span>
              <label>
                <input type=radio v-model="see_emissions_disgregated" :value="true">
                Yes
              </label>
            </span>
          </div>

        </div>
      </div>

      <!--content-->
      <div>
        <!--tables-->
        <div v-if="current_view=='table'">
          <!--summary table 2.0-->
          <div style="margin-top:20px"></div>
          <div>
            <div
              style="
                display:grid;
                grid-template-columns: 15% ${85*0.15}% ${85*0.85*0.15}% ${85*0.85*0.85*0.28}% ${85*0.85*0.85*0.18}% ${85*0.85*0.85*0.18}% ${85*0.85*0.85*0.18}% ${85*0.85*0.85*0.18}%;
                text-align:center;
              "
            >
              <div>Total (<span class=unit v-html="get_summary_unit().prettify()"></span>)</div>
              <div>System (<span class=unit v-html="get_summary_unit().prettify()"></span>)</div>
              <div>Stage (<span class=unit v-html="get_summary_unit().prettify()"></span>)</div>

              <div v-if="type_of_summary_table=='ghg'">Emission source</div>
              <div v-if="type_of_summary_table=='nrg'">Substages (<span class=unit v-html="current_unit_nrg.prettify()"></span>)</div>

              <div>
                <span v-if="type_of_summary_table=='ghg'">Emission</span>
                <span v-if="type_of_summary_table=='nrg'">Energy consumption</span>
                (<span class=unit v-html="get_summary_unit().prettify()"></span>)
              </div>

              <div v-if="type_of_summary_table=='ghg' && see_emissions_disgregated">${'CO2'.prettify()}    (<span class=unit v-html="current_unit_ghg.prettify()"></span>)</div>
              <div v-if="type_of_summary_table=='ghg' && see_emissions_disgregated">${'CH4'.prettify()}    (<span class=unit v-html="current_unit_ghg.prettify()"></span>)</div>
              <div v-if="type_of_summary_table=='ghg' && see_emissions_disgregated">${'N2O'.prettify()}    (<span class=unit v-html="current_unit_ghg.prettify()"></span>)</div>
            </div>
            <div
              class=subdivision
              style="background:var(--color-level-generic)"
            >
              <div
                style="
                  color:white;
                  text-align:center;
                  font-size:large;
                "
              >
                <div
                  style="
                    font-weight:bold;
                  "
                >
                  <div v-if="type_of_summary_table=='ghg'">
                    Total<br>GHG emissions
                  </div>
                  <div v-if="type_of_summary_table=='nrg'">
                    Total<br>energy consumption
                  </div>
                </div>

                <br>

                <div v-if="type_of_summary_table=='ghg'">
                  {{format_emission(Global.TotalGHG().total)}}
                </div>
                <div v-if="type_of_summary_table=='nrg'">
                  {{format_energy(Global.TotalNRG())}}
                </div>
              </div>
              <div>
                <div
                  v-for="s in Structure.filter(s=>!s.sublevel)"
                  class=subdivision
                  :style="{background:s.color}"
                >
                  <div>
                    <div
                      style="
                        padding:1em;
                        text-align:center;
                        font-size:large;
                      "
                    >
                      <div>
                        {{translate(s.level)}}
                      </div>
                      <br>
                      <div v-if="type_of_summary_table=='ghg'">
                        {{format_emission(Global[s.level][s.prefix+'_KPI_GHG']().total)}}
                      </div>
                      <div v-if="type_of_summary_table=='nrg'">
                        {{format_energy(Global[s.level][s.prefix+'_nrg_cons']())}}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      v-for="ss in Structure.filter(ss=>ss.sublevel && ss.level==s.level)"
                      v-if="Global[ss.level][ss.sublevel].length"
                      class="subdivision"
                      :style="{background:ss.color}"
                    >
                      <div style="padding:1em;text-align:center">
                        {{ss.sublevel}}
                        <div v-if="type_of_summary_table=='ghg'">
                          {{format_emission(Global[ss.level][ss.sublevel].map(subs=>subs[ss.prefix+'_KPI_GHG']().total).sum())}}
                        </div>
                        <div v-if="type_of_summary_table=='nrg'">
                          {{format_energy(Global[ss.level][ss.sublevel].map(subs=>subs[ss.prefix+'_nrg_cons']).sum())}}
                        </div>
                      </div>

                      <div v-if="type_of_summary_table=='ghg'">
                        <div
                          v-for="key in
                            Formulas.ids_per_formula(
                              Global[ss.level][ss.sublevel][0][ss.prefix+'_KPI_GHG']
                            ).sort(emission_sources_order)
                          "
                          style="
                            display:grid;
                            grid-template-columns:28% 18% 18% 18% 18%;
                            font-size:smaller;
                            align-items:center;
                            padding:5px 0;
                          "
                        >
                          <div>
                            <span v-html="translate(key+'_descr').prettify()"></span>
                          </div>
                          <div
                            v-for="gas in ['total','co2','ch4','n2o']"
                            v-if="gas=='total' || see_emissions_disgregated"
                            style="text-align:center"
                          >
                            {{
                              format_emission(
                                Global[ss.level][ss.sublevel].map(ss=>ss[key]()[gas]).sum()
                              )
                            }}
                          </div>
                        </div>
                      </div>

                      <div v-if="type_of_summary_table=='nrg'">
                        <div
                          v-for="substage in Global[ss.level][ss.sublevel]"
                          style="
                            font-size:smaller;
                            align-items:center;
                            padding:5px 0;
                            display:grid;
                            grid-template-columns:28% 18% 18% 18% 18%;
                            text-align:center;
                          "
                        >
                          <div>
                            <span v-html="substage.name.prettify()"></span>
                          </div>
                          <div>
                            {{
                              format_energy(
                                substage[ss.prefix+'_nrg_cons']
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <table border=1 class=legend>
                  <tr>
                    <td style="background:var(--color-level-Water)"></td>
                    <td>{{translate('Water')}}</td>
                    <td>{{format_emission(Global.Water.ws_KPI_GHG().total)}}</td>
                    <td class=unit v-html="current_unit_ghg.prettify()"></td>
                  </tr>
                  <tr>
                    <td style="background:var(--color-level-Waste)"></td>
                    <td>{{translate('Waste')}}</td>
                    <td>{{format_emission(Global.Waste.ww_KPI_GHG().total)}}</td>
                    <td class=unit v-html="current_unit_ghg.prettify()"></td>
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
                <table border=1 class=legend>
                  <tr
                    v-for="stage in Structure.filter(s=>s.sublevel)"
                    v-if="Global[stage.level][stage.sublevel].length"
                  >
                    <td :style="{background:stage.color}"></td>
                    <td>
                      {{translate(stage.sublevel)}}
                    </td>
                    <td>
                      {{ format_emission(Global[stage.level][stage.sublevel].map(s=>s[stage.prefix+'_KPI_GHG']().total).sum()) }}
                    </td>
                    <td class=unit v-html="current_unit_ghg.prettify()"></td>
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
                <table border=1 class=legend>
                  <tr v-for="value,key in Global.TotalGHG()" v-if="key!='total'">
                    <td :style="{background:Charts.gas_colors[key]}"></td>
                    <td>
                      <div v-html="key.toUpperCase().prettify()"></div>
                    </td>
                    <td>
                      <div v-html="format_emission(value)"></div>
                    </td>
                    <td class=unit v-html="current_unit_ghg.prettify()"></td>
                  </tr>
                </table>
                <div id=chart_3></div>
              </div>
            </div>

            <div class=chart_container style="border-right:none">
              <div class=chart_title>
                <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
                GHG emissions by UNFCCC category
              </div>
              <div class=flex>
                <table border=1 class=legend>
                  <tr v-for="[key,obj] in Object.entries(UNFCCC)" :title="key">
                    <td :style="{background:obj.color}"></td>
                    <td>
                      {{obj.description}}
                    </td>
                    <td>
                      <div v-html="format_emission(obj.emissions(Global))"></div>
                    </td>
                    <td class=unit v-html="current_unit_ghg.prettify()"></td>
                  </tr>
                </table>
                <div id=chart_unfccc></div>
              </div>
            </div>
          </div>

          <!--bar chart ghg substages-->
          <div class="chart_container bar">
            <div class=chart_title style="justify-content:center">
              <img src="frontend/img/viti/select_scenario/icon-co2.svg" class=icon_co2>
              GHG emissions by substage
            </div>
            <div>
              <canvas id="bar_chart_ghg_substages" width="400" height="400"></canvas>
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
                <table border=1 class=legend>
                  <tr>
                    <td style="background:var(--color-level-Water)"></td>
                    <td>{{translate('Water')}}</td>
                    <td>{{format_energy(Global.Water.ws_nrg_cons())}}</td>
                    <td class=unit v-html="current_unit_nrg"></td>
                  </tr>
                  <tr>
                    <td style="background:var(--color-level-Waste)"></td>
                    <td>{{translate('Waste')}}</td>
                    <td>{{format_energy(Global.Waste.ww_nrg_cons())}}</td>
                    <td class=unit v-html="current_unit_nrg"></td>
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
                <table border=1 class=legend>
                  <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                    <td :style="{background:stage.color}">
                    </td>
                    <td>
                      {{translate(stage.sublevel)}}
                    </td>
                    <td>
                      {{ format_energy(Global[stage.level][stage.sublevel].map(s=>s[stage.prefix+'_nrg_cons']).sum()) }}
                    </td>
                    <td class=unit v-html="current_unit_nrg"></td>
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
              <canvas id="bar_chart_nrg_substages" width="400" height="400"></canvas>
            </div>
          </div>
        </div>

        <!--charts serviced population-->
        <div v-if="current_view=='charts_pop'">
          <div class="chart_container">
            <div class=chart_title>
              Serviced population in water supply and wastewater sanitation stages
            </div>
            <br><br>
            <div style="
              display:grid;
              grid-template-columns:50% 50%;
            ">
              <div class=flex>
                <table border=1 class=legend>
                  <tr>
                    <td :style="{background:'var(--color-level-Water)'}"></td>
                    <td>{{translate('ws_serv_pop_descr')}}</td>
                    <td>{{format(Global.Water.ws_serv_pop()) }}</td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                  <tr>
                    <td :style="{background:'#eee'}"></td>
                    <td>Non-{{translate('ws_serv_pop_descr')}}</td>
                    <td>{{format(Global.Water.ws_resi_pop - Global.Water.ws_serv_pop())}}</td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                </table>
                <div id=pie_chart_ws_serv_pop></div>
              </div>
              <div class=flex>
                <table border=1 class=legend>
                  <tr>
                    <td :style="{background:'var(--color-level-Waste)'}"></td>
                    <td>{{translate('ww_serv_pop_descr')}}</td>
                    <td>{{format(Global.Waste.ww_serv_pop()) }}</td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                  <tr>
                    <td :style="{background:'#eee'}"></td>
                    <td>Non-{{translate('ww_serv_pop_descr')}}</td>
                    <td>{{format(Global.Waste.ww_resi_pop - Global.Waste.ww_serv_pop()) }}</td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                </table>
                <div id=pie_chart_ww_serv_pop></div>
              </div>
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
      #summary_ghg div.chart_container table.legend {
        width:38%;
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
        border:1px solid #ccc;
        text-align:center;
      }

      #summary_ghg div.subdivision{
        display:grid;
        align-items:center;
        grid-template-columns:15% 85%;
      }
    </style>
  `,
});
