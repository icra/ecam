let sankey_ghg = new Vue({
  el:"#sankey_ghg",
  data:{
    visible:false,
    Languages,
  },

  methods:{
    draw_sankey_ghg(){
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
        {source:get_index('total'), target:get_index('ws'), value:Global.Water.ws_KPI_GHG().total||1e-3},
        {source:get_index('total'), target:get_index('ww'), value:Global.Waste.ww_KPI_GHG().total||1e-3},
        //capa 2
        {source:get_index('ws'), target:get_index('wsa'), value:Global.Water.ws_KPI_GHG_abs().total||1e-3},
        {source:get_index('ws'), target:get_index('wst'), value:Global.Water.ws_KPI_GHG_tre().total||1e-3},
        {source:get_index('ws'), target:get_index('wsd'), value:Global.Water.ws_KPI_GHG_dis().total||1e-3},
        {source:get_index('ww'), target:get_index('wwc'), value:Global.Waste.ww_KPI_GHG_col().total||1e-3},
        {source:get_index('ww'), target:get_index('wwt'), value:Global.Waste.ww_KPI_GHG_tre().total||1e-3},
        {source:get_index('ww'), target:get_index('wwo'), value:Global.Waste.ww_KPI_GHG_ons().total||1e-3},
        //capa 3
        {source:get_index('wsa'), target:get_index('elec'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_elec()         ).sum()||1e-3},
        {source:get_index('wsa'), target:get_index('fuel'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_fuel()   .total).sum()||1e-3},
        {source:get_index('wst'), target:get_index('elec'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_elec()           ).sum()||1e-3},
        {source:get_index('wst'), target:get_index('fuel'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_fuel()     .total).sum()||1e-3},
        {source:get_index('wsd'), target:get_index('elec'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_elec()        ).sum()||1e-3},
        {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel()  .total).sum()||1e-3},
        {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck()  .total).sum()||1e-3},
        {source:get_index('wwc'), target:get_index('elec'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_elec()          ).sum()||1e-3},
        {source:get_index('wwc'), target:get_index('fuel'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_fuel()    .total).sum()||1e-3},
        {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso()     .total).sum()||1e-3},
        {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_col()     .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('elec'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_elec()           ).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_fuel()     .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_dig_fuel() .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('wwtr'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre()      .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('biog'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog()     .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('slud'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu()      .total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_reus_trck().total).sum()||1e-3},
        {source:get_index('wwt'), target:get_index('disc'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_disc()     .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('elec'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_elec()              ).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_fuel()        .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_opd()     .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_cont()        .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_trck()        .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('biog'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_biog()        .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('wwtr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_tre()         .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('disc'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dis()         .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landapp()     .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_landfil()     .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_dumping()     .total).sum()||1e-3},
        {source:get_index('wwo'), target:get_index('slud'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_urine()       .total).sum()||1e-3},
        //capa 4
        {source:get_index('elec'), target:get_index('co2'), value:Global.TotalNRG()*Global.General.conv_kwh_co2||1e-3},
        {source:get_index('fuel'), target:get_index('co2'), value:Global.fuel_GHG().co2||1e-3},
        {source:get_index('fuel'), target:get_index('ch4'), value:Global.fuel_GHG().ch4||1e-3},
        {source:get_index('fuel'), target:get_index('n2o'), value:Global.fuel_GHG().n2o||1e-3},
        {source:get_index('untr'), target:get_index('co2'), value:Global.untr_GHG().co2||1e-3},
        {source:get_index('untr'), target:get_index('ch4'), value:Global.untr_GHG().ch4||1e-3},
        {source:get_index('untr'), target:get_index('n2o'), value:Global.untr_GHG().n2o||1e-3},
        {source:get_index('biog'), target:get_index('co2'), value:Global.biog_GHG().co2||1e-3},
        {source:get_index('biog'), target:get_index('ch4'), value:Global.biog_GHG().ch4||1e-3},
        {source:get_index('biog'), target:get_index('n2o'), value:Global.biog_GHG().n2o||1e-3},
        {source:get_index('wwtr'), target:get_index('co2'), value:Global.wwtr_GHG().co2||1e-3},
        {source:get_index('wwtr'), target:get_index('ch4'), value:Global.wwtr_GHG().ch4||1e-3},
        {source:get_index('wwtr'), target:get_index('n2o'), value:Global.wwtr_GHG().n2o||1e-3},
        {source:get_index('slud'), target:get_index('co2'), value:Global.slud_GHG().co2||1e-3},
        {source:get_index('slud'), target:get_index('ch4'), value:Global.slud_GHG().ch4||1e-3},
        {source:get_index('slud'), target:get_index('n2o'), value:Global.slud_GHG().n2o||1e-3},
        {source:get_index('disc'), target:get_index('co2'), value:Global.disc_GHG().co2||1e-3},
        {source:get_index('disc'), target:get_index('ch4'), value:Global.disc_GHG().ch4||1e-3},
        {source:get_index('disc'), target:get_index('n2o'), value:Global.disc_GHG().n2o||1e-3},
      ];

      document.querySelector('#sankey').innerHTML="";
      let chart = d3.select("#sankey").append("svg").chart("Sankey.Path");
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
    },
  },

  updated(){
    this.$nextTick(()=>{
      try{
        sankey_ghg.draw_sankey_ghg();
      }catch(e){
        if(this.visible) console.warn(e);
      }
    })
  },

  template:`
    <!--sankey diagram-->
    <div id=sankey_ghg v-if="visible && Languages.ready">
      <h1 style=text-align:center> Sankey diagram GHG</h1>
      <div id=sankey></div>
    </div>
  `,

  style:`
    <style>
      #sankey_ghg {
        padding-left:1em
        padding-right:1em
      }
      #sankey_ghg #sankey {
        padding: 10px;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
        height: 400px;
        font: 13px sans-serif;
      }
      #sankey_ghg #sankey .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
      }
      #sankey_ghg #sankey .node text {
        text-shadow: 0 1px 0 #fff;
      }
      #sankey_ghg #sankey .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .2;
      }
    </style>
  `,
});

