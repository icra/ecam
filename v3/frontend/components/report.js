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
    },

    draw_pie_chart() {
      //nothing to draw
      if(Global.TotalGHG()==0) return;

      let container = document.querySelector("#pie_chart");
      if(!container) return;
      container.innerHTML="";

      //sizes
      var w = 300;
      var h = 300;
      var r = h/2;
      var aColor = [
        "var(--color-level-Waste)",
        "var(--color-level-Water)"
      ];

      var data = [
        {"label":"Waste", "value":100*Global.Waste.ww_KPI_GHG()/Global.TotalGHG()},
        {"label":"Water", "value":100*Global.Water.ws_KPI_GHG()/Global.TotalGHG()},
      ];

      var vis = d3.select('#pie_chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d){return d.value;});
      var arc = d3.svg.arc().outerRadius(r); // Declare an arc generator function

      //select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
        .attr("fill", function(d, i){return aColor[i];})
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
          return translate(data[i].label)+" "+value+ '%';
        })
      ;
    },
  },

  updated(){
    this.$nextTick(()=>{
      try{
        report.draw_pie_chart();
      }catch(e){
      }
    })
  },


  template:`
    <div id=report v-if="visible && Languages.ready">
      <h1 style="text-align:center">
        Report
      </h1>

      <p style="text-align:center">
        (in development, report is being designed)
      </p>

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

      <!--charts-->
      <div style="text-align:center;">
        <h3>GHG emissions pie chart</h3>
        <div id=pie_chart></div>
        <div v-if="Global.TotalGHG()==0"><i>~total emissions are zero</i></div>
      </div>
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
