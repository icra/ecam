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
        'ws':Structure.find(s=>s.prefix=='ws').color,
        'ww':Structure.find(s=>s.prefix=='ww').color,
        'fallback':            '#9f9fa3'
      };

      let json = {};
      json.nodes=[
        {name:'Total GHG'        , id:"total"} ,
        {name:translate("Water") , id:"ws"}    ,
        {name:translate("Waste") , id:"ww"}    ,

        {name:translate("Abstraction")  , id:"wsa"} ,
        {name:translate("Treatment")    , id:"wst"} ,
        {name:translate("Distribution") , id:"wsd"} ,
        {name:translate("Collection")   , id:"wwc"} ,
        {name:translate("Treatment")    , id:"wwt"} ,
        {name:translate("Onsite")       , id:"wwo"} ,

        {name:translate("Electricity")                 , id:"elec"} ,

        {name:translate("Fuel")                        , id:"fuel"} , //sum of fuel combustion

        {name:translate("Untreated wastewater")        , id:"untr"} ,

        {name:translate("Biogas")                      , id:"biog"} ,
        {name:translate("Treatment")                   , id:"wwtr"} ,
        {name:translate("Sludge managment")            , id:"slud"} ,
        {name:translate("Discharged ww")               , id:"disc"} ,

        {name:"CO2" , id:"co2"} ,
        {name:"N2O" , id:"n2o"} ,
        {name:"CH4" , id:"ch4"} ,
      ];
      function get_index(node_id){
        let node = json.nodes.find(n=>n.id==node_id);
        return json.nodes.indexOf(node);
      }
      json.links=[
        {source:get_index('total'), target:get_index('ws'), value:Global.Water.ws_KPI_GHG()},
        {source:get_index('total'), target:get_index('ww'), value:Global.Waste.ww_KPI_GHG()},

        {source:get_index('ws'), target:get_index('wsa'), value:Global.Water.ws_KPI_GHG_abs()},
        {source:get_index('ws'), target:get_index('wst'), value:Global.Water.ws_KPI_GHG_tre()},
        {source:get_index('ws'), target:get_index('wsd'), value:Global.Water.ws_KPI_GHG_dis()},
        {source:get_index('ww'), target:get_index('wwc'), value:Global.Waste.ww_KPI_GHG_col()},
        {source:get_index('ww'), target:get_index('wwt'), value:Global.Waste.ww_KPI_GHG_tre()},
        {source:get_index('ww'), target:get_index('wwo'), value:Global.Waste.ww_KPI_GHG_ons()},

        {source:get_index('wsa'), target:get_index('elec'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_elec()).sum()},
        {source:get_index('wsa'), target:get_index('fuel'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_fuel().total).sum()},

        {source:get_index('wst'), target:get_index('elec'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_elec()).sum()},
        {source:get_index('wst'), target:get_index('fuel'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_fuel().total).sum()},

        {source:get_index('wsd'), target:get_index('elec'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_elec()).sum()},
        {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel().total).sum()},
        {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck().total).sum()},

        {source:get_index('wwc'), target:get_index('elec'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_elec()).sum()},
        {source:get_index('wwc'), target:get_index('fuel'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_fuel().total).sum()},
        {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso ().total).sum()},
        {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_col ()).sum()},

        {source:get_index('wwt'), target:get_index('elec'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_elec    ()).sum()},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_fuel    ().total).sum()},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_dig_fuel().total).sum()},
        {source:get_index('wwt'), target:get_index('wwtr'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre     ().total).sum()},
        {source:get_index('wwt'), target:get_index('biog'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog    ()).sum()},
        {source:get_index('wwt'), target:get_index('slud'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu     ().total).sum()},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwd_KPI_GHG_trck    ().total).sum()},
        {source:get_index('wwt'), target:get_index('disc'), value:Global.Waste.Treatment.map(s=>s.wwd_KPI_GHG_disc    ().total).sum()},
        {source:get_index('wwo'), target:get_index('elec'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_elec()).sum()},
        {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_fuel   ().total).sum()},
        {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_opd().total).sum()},
        {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_ons().total).sum()},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_cont   ()).sum()},
        {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_trck   ().total).sum()},
        {source:get_index('wwo'), target:get_index('biog'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_biog   ()).sum()},
        {source:get_index('wwo'), target:get_index('wwtr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_tre    ().total).sum()},
        {source:get_index('wwo'), target:get_index('disc'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dis    ().total).sum()},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landapp()).sum()},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landfil().total).sum()},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dumping().total).sum()},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_urine  ()).sum()},

        {source:get_index('elec'), target:get_index('co2'), value:Global.TotalNRG()*Global.General.conv_kwh_co2},

        {source:get_index('fuel'), target:get_index('co2'), value:1},
        {source:get_index('fuel'), target:get_index('ch4'), value:1},
        {source:get_index('fuel'), target:get_index('n2o'), value:1},

        {source:get_index('untr'), target:get_index('co2'), value:1},
        {source:get_index('untr'), target:get_index('ch4'), value:1},
        {source:get_index('untr'), target:get_index('n2o'), value:1},

        {source:get_index('biog'), target:get_index('co2'), value:1},
        {source:get_index('biog'), target:get_index('ch4'), value:1},

        {source:get_index('wwtr'), target:get_index('co2'), value:1},
        {source:get_index('wwtr'), target:get_index('ch4'), value:1},
        {source:get_index('wwtr'), target:get_index('n2o'), value:1},

        {source:get_index('slud'), target:get_index('co2'), value:1},
        {source:get_index('slud'), target:get_index('ch4'), value:1},
        {source:get_index('slud'), target:get_index('n2o'), value:1},

        {source:get_index('disc'), target:get_index('co2'), value:1},
        {source:get_index('disc'), target:get_index('ch4'), value:1},
        {source:get_index('disc'), target:get_index('n2o'), value:1},
      ];

      let chart = d3.select("#sankey_ghg").append("svg").chart("Sankey.Path");
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
    },
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Overview
      </h2>

      <p style=text-align:center>
        in development
      </p>

      <!--sankey ghg-->
      <div style="text-align:center;margin-top:10px">
        <h3> GHG emissions </h3>
        <button onclick="overview.draw_sankey_ghg();this.disabled=true">draw ghg sankey diagram</button>
        <div id=sankey_ghg></div>
      </div><hr>

      <!--diagram of stages rework for v3-->
      <div style=text-align:center>
        <h3> Water and sludge flows </h3>
        <img
          src="frontend/diagram/map.dot.svg"
          style="display:block;margin:auto;width:90%;border:1px solid black"
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
    </div>
  `,

  style:`
    <style>
      #overview #sankey_ghg {
        padding: 10px;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
        height: 400px;
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


