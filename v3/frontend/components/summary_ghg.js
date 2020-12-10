let summary_ghg = new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    //folded sections
    unfolded_levels:['Water','Waste'],

    current_view:"charts", //table or charts

    gas_colors:{
      "co2":"#dadada",
      "n2o":"#ff8d54",
      "ch4":"#ffaa6e",
    },

    //backend
    Global,
    Structure,
    Languages,
  },

  methods:{
    translate,
    format,
    go_to,

    toggle_folded_level(level){
      let index = this.unfolded_levels.indexOf(level);
      if(index==-1){
        this.unfolded_levels.push(level);
      }else{
        this.unfolded_levels.splice(index,1);
      }
    },

    draw_pie_chart(id_container, data, colors) {
      //nothing to draw
      if(data.length==0) return;

      let container = document.getElementById(id_container);
      if(!container) return;
      container.innerHTML="";

      //sizes
      var w = 200;
      var h = 200;
      var r = h/2;

      var vis = d3.select(`#${id_container}`).append("svg:svg").data([data]).attr("width",w).attr("height",h).append("svg:g").attr("transform","translate("+r+","+r+")");
      var pie = d3.layout.pie().value(function(d){return d.value});
      var arc = d3.svg.arc().outerRadius(r);//declare an arc generator function

      //select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
        .attr("fill", function(d, i){return colors[i];})
        .attr("d", function (d) {return arc(d);})
      ;

      //add the text
      arcs.append("svg:text")
        .attr("transform", function(d){
          d.innerRadius = 40; /* Distance of label to the center*/
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";}
        )
        .attr("text-anchor", "middle")
        .text( function(d, i){
          let value = data[i].value ? format(data[i].value) : 0;
          return value+'%';
        })
      ;
    },

    draw_all_charts(){
      if(this.Global.TotalGHG().total==0) return;

      //pie charts
        this.draw_pie_chart('chart_1',
          [
            {"label":"", "value":100*Global.Waste.ww_KPI_GHG().total/Global.TotalGHG().total},
            {"label":"", "value":100*Global.Water.ws_KPI_GHG().total/Global.TotalGHG().total},
          ],[
            "var(--color-level-Waste)",
            "var(--color-level-Water)",
          ]
        );

        this.draw_pie_chart('chart_2',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum()/Global.TotalGHG().total;
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
        );

        this.draw_pie_chart('chart_3',
          [
            {"label":"", "value":100*Global.TotalGHG().co2/Global.TotalGHG().total},
            {"label":"", "value":100*Global.TotalGHG().n2o/Global.TotalGHG().total},
            {"label":"", "value":100*Global.TotalGHG().ch4/Global.TotalGHG().total},
          ],
          [
            this.gas_colors.co2,
            this.gas_colors.n2o,
            this.gas_colors.ch4,
          ],
        );

        this.draw_pie_chart('chart_nrg_levels',
          [
            {"label":"", "value":100*Global.Waste.ww_nrg_cons()/Global.TotalNRG()},
            {"label":"", "value":100*Global.Water.ws_nrg_cons()/Global.TotalNRG()},
          ],
          [
            "var(--color-level-Waste)",
            "var(--color-level-Water)",
          ],
        );

        this.draw_pie_chart('chart_nrg_stages',
          Structure.filter(s=>s.sublevel).map(s=>{
            let label = "";
            let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_nrg_cons']).sum()/Global.TotalNRG();
            return {label,value};
          }),
          Structure.filter(s=>s.sublevel).map(s=>s.color),
        );

      //bar charts
        this.draw_bar_chart(
          'bar_chart_ghg_substages',
          Structure.filter(s=>s.sublevel).map(s=>{
            return Global[s.level][s.sublevel].map(ss=>{
              let name     = s.prefix+" "+ss.name;
              let emission = ss[s.prefix+'_KPI_GHG'](); 
              let co2 = emission.co2;
              let n2o = emission.n2o;
              let ch4 = emission.ch4;
              return {name, co2, ch4, n2o};
            });
          }).reduce((p,c)=>p.concat(c),[]),
          colors=[
            this.gas_colors.co2,
            this.gas_colors.ch4,
            this.gas_colors.n2o,
          ],
        );

        this.draw_bar_chart(
          'bar_chart_nrg_substages',
          Structure.filter(s=>s.sublevel).map(s=>{
            return Global[s.level][s.sublevel].map(ss=>{
              let name = s.prefix+" "+ss.name;
              let kWh  = ss[s.prefix+'_nrg_cons']; 
              return {name, kWh};
            });
          }).reduce((p,c)=>p.concat(c),[]),
          colors=[
            "#ffbe54",
          ],
        );
    },

    draw_bar_chart(id_container,data,colors){
      if(data.length==0) return;
      let keys = Object.keys(data[0]).slice(1);//llegenda

      var margin = {top:20,right:160,bottom:35,left:30};
      var width  = window.innerWidth-margin.left-margin.right;
      var height = 500-margin.top-margin.bottom;
      var svg = d3.select(`#${id_container}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Transpose the data into layers
      var dataset = d3.layout.stack()(keys.map(function(key) {
        return data.map(d=>{
          return {x: d.name, y: +d[key]};
        });
      }));

      // Set x, y and colors
      var x = d3.scale.ordinal()
        .domain(dataset[0].map(function(d) { return d.x; }))
        .rangeRoundBands([10, width-10], 0.02);

      var y = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d3.max(d, function(d){return d.y0 + d.y; }); })])
        .range([height, 0]);

      // Define and draw axes
      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat( function(d) { return d } );

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Create groups for each series, rects for each segment 
      var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) {
          return colors[i]; }
        );

      var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand())
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d.y);
        });


      // Draw legend
      var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
      
      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {return colors.slice()[i];});
      
      legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text((d,i)=>{
          return keys[i].toUpperCase();
        });


      // Prep the tooltip bits, initial display is hidden
      var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
          
      tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

      tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <!--title-->
      <h1 style="padding-left:0">
        Summary: GHG emissions and energy consumption
      </h1>

      <!--select tables or charts-->
      <div style="padding:1em;border:1px solid #ccc">
        <button @click="current_view='table'" :selected="current_view=='table'">
          Table
        </button>
        <button @click="current_view='charts'" :selected="current_view=='charts'">
          Charts
        </button>
      </div>

      <!--content-->
      <div>
        <!--tables-->
        <div v-if="current_view=='table'">
          <table style="margin:auto;width:85%;border-spacing:1px">
            <!--total ghg and nrg-->
            <tbody style="background:var(--color-level-generic);color:white">
              <tr>
                <td colspan=2 style="font-size:large;text-align:center;padding:2em;vertical-align:center">
                  Total
                </td>
                <!--total emissions-->
                <td style="background:inherit;">
                  <div style="
                    display:flex;
                    justify-content:center;
                    text-align:center;
                    padding-left:1em;
                    padding-right:1em;
                  ">
                    <div>
                      <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                      <div class=number_placeholder v-html="format(Global.TotalGHG().total)"></div>
                    </div>
                  </div>
                </td>

                <!--total energy consumption-->
                <td style="text-align:center">
                  <div style="color:white">kWh</div>
                  <div class=number_placeholder style="margin:auto">
                    {{format(Global.TotalNRG())}}
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
                  <div style="font-size:large">
                    <a @click="go_to(l1.level)" style="color:white;">
                      {{ translate(l1.level) }}
                    </a>
                  </div>
                  <div>
                    <img :src="'frontend/img/'+l1.icon" style="width:50px;background:white;border-radius:50%">
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
                  ">
                    <div>
                      <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                      <div
                        class=number_placeholder
                        :style="{color:l1.color,borderColor:l1.color}"
                        v-html="format(Global[l1.level][l1.prefix+'_KPI_GHG']().total)"
                      ></div>
                    </div>
                  </div>
                </td>

                <!--level 1 energy consumption-->
                <td :style="{background:'inherit',textAlign:'center'}">
                  <div style="color:white">kWh</div>
                  <div
                    class=number_placeholder
                    :style="{color:l1.color, borderColor:l1.color, margin:'auto'}"
                    v-html="format(Global[l1.level][l1.prefix+'_nrg_cons']())"
                  ></div>
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
                  <div style="font-size:large">
                    <a @click="go_to(l2.level,l2.sublevel)" :style="{color:l1.color}">
                      {{translate(l2.sublevel)}}
                    </a>
                  </div>
                  <div>
                    <img :src="'frontend/img/'+l2.icon" style="width:45px;">
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
                    "
                  >
                    <div>
                      <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                      <div
                        class=number_placeholder
                        :style="{color:l1.color, borderColor:l1.color}"
                        v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_KPI_GHG']().total).sum())">
                      </div>
                    </div>
                  </div>
                </td>

                <!--level 2 energy consumption-->
                <td :style="{background:'white', color:l1.color, textAlign:'center'}">
                  <div style="color:black">kWh</div>
                  <div
                    class=number_placeholder
                    :style="{color:l1.color,borderColor:l1.color,margin:'auto'}"
                  >
                    <div
                      v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_nrg_cons']).sum() )"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--charts-->
        <div v-if="current_view=='charts'">
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
                    <td :style="{background:gas_colors[key]}">
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

          <!--progress bars-->
          <div>
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
      </div>
    </div>
  `,

  updated(){
    let _this=this;
    this.$nextTick(()=>{
      try{
        _this.draw_all_charts();
      }catch(e){
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
      }
      #summary_ghg div.number_placeholder {
        width:150px;
        font-size:large;
        font-weight:bold;
        padding:0.5em 0;
        background:white;
        border:1px solid var(--color-level-generic);
        color:var(--color-level-generic);
        margin:0 1px;
      }

      #summary_ghg button[selected]{
        background:var(--color-level-generic);
        color:white;
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
    </style>
  `,
});

//view for a horitzontal bar with the % of serviced population
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
        <progress :value="stage[code]()"
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
