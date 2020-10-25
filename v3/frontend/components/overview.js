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

    draw_everything(){
      draw_sankey_ghg()
      draw_charts()
    },
  },

  updated(){
    this.$nextTick(()=>{
      try{
        overview.draw_everything();
      }catch(e){
      }
    })
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
      <!--title-->
      <div>
        <h2 style="text-align:center">
          Overview
        </h2>

        <p style=text-align:center>
          in development
        </p>
      </div>

      <!--sankey ghg-->
      <div style="text-align:center;">
        <h3> GHG emissions sankey diagram </h3>
        <div id=sankey_ghg></div>
      </div><hr>

      <!--charts-->
      <div style="text-align:center;">
        <h3>GHG emissions pie chart</h3>
        <div id=pie_chart></div>
      </div><hr>

      <!--diagram stages-->
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
      #overview {
        padding-bottom:5em;
      }
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

function draw_sankey_ghg() {
  let colors={
    'ws':Structure.find(s=>s.prefix=='ws').color,
    'ww':Structure.find(s=>s.prefix=='ww').color,
    'fallback':'#9f9fa3'
  };

  let json = {};
  json.nodes=[
    //layer 1: water supply or wastewater level
    {name:'Total GHG'        , id:"total"} ,
    {name:translate("Water") , id:"ws"}    ,
    {name:translate("Waste") , id:"ww"}    ,
    //layer 2: urban water cycle stages
    {name:translate("Abstraction")  , id:"wsa"} ,
    {name:translate("Treatment")    , id:"wst"} ,
    {name:translate("Distribution") , id:"wsd"} ,
    {name:translate("Collection")   , id:"wwc"} ,
    {name:translate("Treatment")    , id:"wwt"} ,
    {name:translate("Onsite")       , id:"wwo"} ,
    //layer 3: emission source
    {name:translate("Electricity indirect emissions")        , id:"elec"} ,
    {name:translate("Fuel combustion direct emissions")      , id:"fuel"} , //sum of fuel combustion
    {name:translate("Untreated wastewater direct emissions") , id:"untr"} ,
    {name:translate("Biogas direct emissions")               , id:"biog"} ,
    {name:translate("Treatment process direct emissions")    , id:"wwtr"} ,
    {name:translate("Sludge management direct emissions")    , id:"slud"} ,
    {name:translate("Discharged water direct emissions")     , id:"disc"} ,
    //layer 4: gas type
    {name:"CO2" , id:"co2"} ,
    {name:"N2O" , id:"n2o"} ,
    {name:"CH4" , id:"ch4"} ,
  ];
  function get_index(node_id){
    let node = json.nodes.find(n=>n.id==node_id);
    return json.nodes.indexOf(node);
  }
  json.links=[
    //capa 1
    {source:get_index('total'), target:get_index('ws'), value:Global.Water.ws_KPI_GHG()||1},
    {source:get_index('total'), target:get_index('ww'), value:Global.Waste.ww_KPI_GHG()||1},
    //capa 2
    {source:get_index('ws'), target:get_index('wsa'), value:Global.Water.ws_KPI_GHG_abs()||1},
    {source:get_index('ws'), target:get_index('wst'), value:Global.Water.ws_KPI_GHG_tre()||1},
    {source:get_index('ws'), target:get_index('wsd'), value:Global.Water.ws_KPI_GHG_dis()||1},
    {source:get_index('ww'), target:get_index('wwc'), value:Global.Waste.ww_KPI_GHG_col()||1},
    {source:get_index('ww'), target:get_index('wwt'), value:Global.Waste.ww_KPI_GHG_tre()||1},
    {source:get_index('ww'), target:get_index('wwo'), value:Global.Waste.ww_KPI_GHG_ons()||1},
    //capa 3
    {source:get_index('wsa'), target:get_index('elec'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_elec()        ).sum()||1},
    {source:get_index('wsa'), target:get_index('fuel'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_fuel()  .total).sum()||1},
    {source:get_index('wst'), target:get_index('elec'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_elec()          ).sum()||1},
    {source:get_index('wst'), target:get_index('fuel'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_fuel()    .total).sum()||1},
    {source:get_index('wsd'), target:get_index('elec'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_elec()       ).sum()||1},
    {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel() .total).sum()||1},
    {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck() .total).sum()||1},
    {source:get_index('wwc'), target:get_index('elec'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_elec()         ).sum()||1},
    {source:get_index('wwc'), target:get_index('fuel'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_fuel()   .total).sum()||1},
    {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso()    .total).sum()||1},
    {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_col()    .total).sum()||1},
    {source:get_index('wwt'), target:get_index('elec'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_elec()          ).sum()||1},
    {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_fuel()    .total).sum()||1},
    {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_dig_fuel().total).sum()||1},
    {source:get_index('wwt'), target:get_index('wwtr'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre()     .total).sum()||1},
    {source:get_index('wwt'), target:get_index('biog'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog()    .total).sum()||1},
    {source:get_index('wwt'), target:get_index('slud'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu()     .total).sum()||1},
    {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwd_KPI_GHG_trck()    .total).sum()||1},
    {source:get_index('wwt'), target:get_index('disc'), value:Global.Waste.Treatment.map(s=>s.wwd_KPI_GHG_disc()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('elec'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_elec()             ).sum()||1},
    {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_fuel()       .total).sum()||1},
    {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_opd()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_ons()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_cont()       .total).sum()||1},
    {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_trck()       .total).sum()||1},
    {source:get_index('wwo'), target:get_index('biog'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_biog()       .total).sum()||1},
    {source:get_index('wwo'), target:get_index('wwtr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_tre()        .total).sum()||1},
    {source:get_index('wwo'), target:get_index('disc'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dis()        .total).sum()||1},
    {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landapp()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landfil()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dumping()    .total).sum()||1},
    {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_urine  ()    .total).sum()||1},
    //capa 4
    {source:get_index('elec'), target:get_index('co2'), value:Global.TotalNRG()*Global.General.conv_kwh_co2||1},
    {source:get_index('fuel'), target:get_index('co2'), value:Global.fuel_GHG().co2||1},
    {source:get_index('fuel'), target:get_index('ch4'), value:Global.fuel_GHG().ch4||1},
    {source:get_index('fuel'), target:get_index('n2o'), value:Global.fuel_GHG().n2o||1},
    {source:get_index('untr'), target:get_index('co2'), value:Global.untr_GHG().co2||1},
    {source:get_index('untr'), target:get_index('ch4'), value:Global.untr_GHG().ch4||1},
    {source:get_index('untr'), target:get_index('n2o'), value:Global.untr_GHG().n2o||1},
    {source:get_index('biog'), target:get_index('co2'), value:Global.biog_GHG().co2||1},
    {source:get_index('biog'), target:get_index('ch4'), value:Global.biog_GHG().ch4||1},
    {source:get_index('biog'), target:get_index('n2o'), value:Global.biog_GHG().n2o||1},
    {source:get_index('wwtr'), target:get_index('co2'), value:Global.wwtr_GHG().co2||1},
    {source:get_index('wwtr'), target:get_index('ch4'), value:Global.wwtr_GHG().ch4||1},
    {source:get_index('wwtr'), target:get_index('n2o'), value:Global.wwtr_GHG().n2o||1},
    {source:get_index('slud'), target:get_index('co2'), value:Global.slud_GHG().co2||1},
    {source:get_index('slud'), target:get_index('ch4'), value:Global.slud_GHG().ch4||1},
    {source:get_index('slud'), target:get_index('n2o'), value:Global.slud_GHG().n2o||1},
    {source:get_index('disc'), target:get_index('co2'), value:Global.disc_GHG().co2||1},
    {source:get_index('disc'), target:get_index('ch4'), value:Global.disc_GHG().ch4||1},
    {source:get_index('disc'), target:get_index('n2o'), value:Global.disc_GHG().n2o||1},
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
    let id = node.id.replace(/(_score)?(_\d+)?$/, '');
    if (colors[id]){
      return colors[id];
    }else if(depth > 0 && node.targetLinks && node.targetLinks.length == 1){
      return color(node.targetLinks[0].source, depth-1);
    }else{
      return null;
    }
  }
}

function draw_charts() {
  var w = 400;
  var h = 400;
  var r = h/2;
  var aColor = [
    Structure.find(s=>s.level=='Waste'&&s.color).color,
    Structure.find(s=>s.level=='Water'&&s.color).color,
  ]

  //nothing to draw
  if(Global.TotalGHG()==0) return;

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
      d.innerRadius = 100; /* Distance of label to the center*/
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";}
     )
    .attr("text-anchor", "middle")
    .text( function(d, i){
      let value = data[i].value ? format(data[i].value) : 0;
      return translate(data[i].label)+" "+value+ '%';
    })
  ;
}
