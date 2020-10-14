let overview = new Vue({
  el:"#overview",
  data:{
    visible:false,

    //frontend
    caption,

    //backend
    Global,
    Structure,
    Languages,

    diagram_legend:[
      {name:"Water",        colors:['blue']},
      {name:"Wastewater",   colors:['brown','blue']},
      {name:"Sludge",       colors:['brown']},
      {name:"GHG emission", colors:['grey']},
    ]
  },

  methods:{
    translate,
    format,
    go_to,

    draw_sankey_ghg(){
      var colors = {
        'environment':         '#edbd00',
        'social':              '#367d85',
        'animals':             '#97ba4c',
        'health':              '#f5662b',
        'research_ingredient': '#3f3e47',
        'fallback':            '#9f9fa3'
      };
      d3.json("//cdn.rawgit.com/q-m/d3.chart.sankey/master/example/data/product.json", function(error, json) {
          var chart = d3.select("#sankey_ghg").append("svg").chart("Sankey.Path");
          chart
          .name(label)
          .colorNodes(function(name, node) {
            return color(node, 1) || colors.fallback;
          })
          .colorLinks(function(link) {
            return color(link.source, 4) || color(link.target, 1) || colors.fallback;
          })
          .nodeWidth(15)
          .nodePadding(10)
          .spread(true)
          .iterations(0)
          .draw(json);

          function label(node) {
            return node.name.replace(/\s*\(.*?\)$/, '');
          }
          function color(node, depth){
            var id = node.id.replace(/(_score)?(_\d+)?$/, '');
            if (colors[id]){
              return colors[id];
            }else if(depth > 0 && node.targetLinks && node.targetLinks.length == 1){
              return color(node.targetLinks[0].source, depth-1);
            }else{
              return null;
            }
          }
      });
    },
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Overview
      </h2>

      <!--diagram of stages rework for v3-->
      <div style=text-align:center>
        <p>
          Stages' rework diagram for making ecam v3 ipcc 2019 compliant
        </p>
        <img
          src="frontend/diagram/map.dot.svg"
          style="display:block;margin:auto;width:99%;border:1px solid black"
        >
        <table border=1 style="margin:auto">
          <tr><th :colspan="diagram_legend.length">Legend</th></tr>
          <tr>
            <td v-for="obj in diagram_legend" style="width:100px">
              <div>{{obj.name}}</div>
              <div v-for="color in obj.colors" :style="{background:color,width:'99%',height:'2px'}"></div>
            </td>
          </tr>
        </table>
      </div>

      <!--sankey ghg-->
      <div style="text-align:center;margin-top:10px">
        <button @click="draw_sankey_ghg()">draw ghg sankey diagram</button>
        <div id=sankey_ghg></div>
      </div>
    </div>
  `,

  style:`
    <style>
      #overview #sankey_ghg {
        padding: 10px;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
        height: 500px;
        font: 13px sans-serif;
      }
      #overview #sankey_ghg .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
      }
      #overview #sankey_ghg .node text {
        text-shadow: 0 1px 0 #fff;
      }
      #overview #sankey_ghg .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .2;
      }
    </style>
  `,
});


