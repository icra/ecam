let summary_ghg = new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    //folded sections
    unfolded_levels:['Water','Waste'],

    current_view:"charts", //table or charts

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

      var vis = d3.select(`#${id_container}`).append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d){return d.value;});
      var arc = d3.svg.arc().outerRadius(r); // Declare an arc generator function

      //select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
        .attr("fill", function(d, i){return colors[i];})
        .attr("d", function (d) {return arc(d);})
      ;

      //add the text
      arcs.append("svg:text")
        .attr("transform", function(d){
          d.innerRadius = 50; /* Distance of label to the center*/
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
      //GHG Water/Wastewater percentage
      if(this.Global.TotalGHG()==0) return;

      this.draw_pie_chart('chart_1',
        [
          {"label":"", "value":100*Global.Waste.ww_KPI_GHG()/Global.TotalGHG()},
          {"label":"", "value":100*Global.Water.ws_KPI_GHG()/Global.TotalGHG()},
        ],[
          "var(--color-level-Waste)",
          "var(--color-level-Water)",
        ]
      );

      this.draw_pie_chart('chart_2',
        Structure.filter(s=>s.sublevel).map(s=>{
          let label = "";
          let value = 100*Global[s.level][s.sublevel].map(ss=>ss[s.prefix+'_KPI_GHG']().total).sum()/Global.TotalGHG();
          console.log(value);
          return {label,value};
        }),[
          "#55C3DC",
          "#84D6E8",
          "#B2EBF7",
          "#EE6D56",
          "#F59382",
          "#F5B6AB",
        ]
      );
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <!--title-->
      <div>
        <b style=font-size:large>Summary GHG</b>
        <p>
          All GHG emissions and energy consumed are summarized in this page.
        </p>
      </div>

      <!--select current view-->
      <div style="border:1px solid">
        Tabs (TODO)
        <ul>
          <li>
            <button @click="current_view='table'">
              Table
            </button>
          </li>
          <li>
            <button @click="current_view='charts'">
              Charts
            </button>
          </li>
        </ul>
      </div>

      <!--current view-->
      <div>
        <!--current_view==table-->
        <div v-if="current_view=='table'">
          <table style="margin:auto;width:70rem;border-spacing:1px">
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
                      <div class=number_placeholder v-html="format(Global.TotalGHG())"></div>
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
                        v-html="format(Global[l1.level][l1.prefix+'_KPI_GHG']())"
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

        <!--current_view table-->
        <div v-if="current_view=='charts'">
          <!--donuts-->
          <div
            style="
              display:grid;
              grid-template-columns:50% 50%;
            "
          >
            <div class=chart_container>
              GHG emissions
              <div id=chart_1></div>
              <table border=1>
                <tr>
                  <td>{{translate('Water')}}</td>
                  <td>{{format(Global.Water.ws_KPI_GHG())}}</td>
                </tr>
                <tr>
                  <td>{{translate('Waste')}}</td>
                  <td>{{format(Global.Waste.ww_KPI_GHG())}}</td>
                </tr>
              </table>
            </div>

            <div class=chart_container>
              GHG emissions by stage
              <div id=chart_2></div>
              <table border=1>
                <tr v-for="stage in Structure.filter(s=>s.sublevel)">
                  <td>
                    {{translate(stage.level)}}
                    {{translate(stage.sublevel)}}
                  </td>
                  <td>
                    {{ format(Global[stage.level][stage.sublevel].map(s=>s[stage.prefix+'_KPI_GHG']().total).sum()) }}
                  </td>
                </tr>
              </table>
            </div>

            <div class=chart_container>
              GHG emissions by gas emitted
              <table border=1>
                <tr><td>N2O</td><td>TODO</td></tr>
                <tr><td>CH4</td><td>TODO</td></tr>
                <tr><td>CO2</td><td>TODO</td></tr>
              </table>
            </div>

            <div class=chart_container>
              GHG emissions by UNFCC category
              <table border=1>
                <tr><td>TODO</td></tr>
              </table>
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

      #summary_ghg div.chart_container {
        background:white;
        border:1px solid #ccc;
        padding:1em;
      }
      #summary_ghg div.chart_container table {
      }
    </style>
  `,
});
