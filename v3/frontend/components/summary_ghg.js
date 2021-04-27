let summary_ghg=new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    //folded sections
    unfolded_levels:['Water','Waste'],

    //current view selected
    current_view:"table",

    //current emissions unit
    current_unit:"kgCO2eq",

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
  },

  methods:{
    translate,
    format,
    go_to,

    //deal with unit changes
    set_emissions_unit(){
      if(Global.TotalGHG().total>1000){ this.current_unit="t CO2eq"; }
      else{                             this.current_unit="kgCO2eq"; }
    },
    //get divisor for emissions with unit changed
    get_divisor(){
      if(this.current_unit=="t CO2eq"){ return 1000; }
      return false;
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
                  label:`${gas.toUpperCase()} (kgCO2eq)`,
                  data: Structure.filter(s=>s.sublevel).map(s=>{
                    return Global[s.level][s.sublevel].map(ss=>{
                      return ss[s.prefix+'_KPI_GHG']()[gas];
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
                label:'Energy (kWh)',
                data:Structure.filter(s=>s.sublevel).map(s=>{
                  return Global[s.level][s.sublevel].map(ss=>{
                    return ss[s.prefix+'_nrg_cons'];
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
          <div>{{set_emissions_unit()}}</div>

          <table id=table_summary style="width:85%;border-spacing:1px">
            <tr>
              <td colspan=2></td>
              <th><b>Total GHG emissions</b></th>
              <th><b>Total energy consumed</b></th>
            </tr>

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
                      <div class=number_placeholder v-html="format(Global.TotalGHG().total,0,get_divisor())"></div>
                    </div>
                    <div style="font-size:x-small;">
                      <span v-html="current_unit.prettify()"></span>
                    </div>
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
                    {{ unfolded_levels.indexOf(l1.level)+1 ? '-':'+' }}
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
                      v-html="format(Global[l1.level][l1.prefix+'_KPI_GHG']().total,0,get_divisor())"
                    ></div>
                    <div style="font-size:x-small;">
                      <span v-html="current_unit.prettify()"></span>
                    </div>
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
                      v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_KPI_GHG']().total).sum(),0,get_divisor())">
                    </div>
                    <div style="font-size:x-small;">
                      <span v-html="current_unit.prettify()"></span>
                    </div>
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
            <!--
              <tbody class=avoided_emissions v-if="true || Global.Waste.ww_GHG_avoided()">
                <tr>
                  <td style="border:none"></td>
                  <td style="border:none">
                    Avoided GHG emissions in Sanitation (TBD)
                  </td>
                  <td style="border:none">
                    <div
                      style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                      "
                    >
                      <div
                        class=number_placeholder
                        style="border-color:#666;color:#666"
                        v-html="Global.Waste.ww_GHG_avoided() ? format( Global.Waste.ww_GHG_avoided() ) : 0"
                      ></div>
                      <div style="font-size:x-small;">
                        <span v-html="current_unit.prettify()"></span>
                      </div>
                    </div>
                  </td>
                  <td style="border:none">
                    <button @click="variable.view('ww_GHG_avoided')">more info</button>
                  </td>
                </tr>
              </tbody>
            -->
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
                <table border=1 class=legend>
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
                <table border=1 class=legend>
                  <tr v-for="value,key in Global.TotalGHG()" v-if="key!='total'">
                    <td :style="{background:Charts.gas_colors[key]}"></td>
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
                      <div v-html="format(obj.emissions(Global))"></div>
                    </td>
                    <td class=unit v-html="'kgCO2eq'.prettify()"></td>
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
                <table border=1 class=legend>
                  <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                    <td :style="{background:stage.color}">
                    </td>
                    <td>
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
                    <td :style="{background:'var(--color-level-Water)'}">
                    </td>
                    <td>
                      {{translate('ws_serv_pop_descr')}}
                    </td>
                    <td>
                      {{ format(Global.Water.ws_serv_pop()) }}
                    </td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      {{translate('ws_resi_pop_descr')}}
                    </td>
                    <td>
                      {{ format(Global.Water.ws_resi_pop) }}
                    </td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                </table>
                <div id=pie_chart_ws_serv_pop></div>
              </div>
              <div class=flex>
                <table border=1 class=legend>
                  <tr>
                    <td :style="{background:'var(--color-level-Waste)'}">
                    </td>
                    <td>
                      {{translate('ww_serv_pop_descr')}}
                    </td>
                    <td>
                      {{ format(Global.Waste.ww_serv_pop()) }}
                    </td>
                    <td class=unit v-html="'people'"></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      {{translate('ww_resi_pop_descr')}}
                    </td>
                    <td>
                      {{ format(Global.Waste.ww_resi_pop) }}
                    </td>
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
    </style>
  `,
});
