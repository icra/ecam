//charts library
let Charts={
  //colors for gas charts
  gas_colors:{
    "co2":"#dadada",
    "n2o":"#ff8d54",
    "ch4":"#ffaa6e",
  },

  //create a pie chart inside "id_container"
  draw_pie_chart(id_container, data, colors, width, height) {
    let container = document.getElementById(id_container);
    if(!container) return;
    container.innerHTML="";

    //nothing to draw
    if(data.length==0) return;

    //sizes
    var w = width  || 200;
    var h = height || 200;
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
        d.innerRadius = w/5; /* Distance of label to the center*/
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
      )
      .attr("text-anchor", "middle")
      .attr("class", "small")
      .text( function(d, i){
        let value = data[i].value ? format(data[i].value,0) : 0;
        return value >=5 ? value+'%' : '';
      })
    ;
  },

  //create a bar chart inside "id_container"
  draw_bar_chart(id_container, data, colors, yUnit){
    let el = document.getElementById(id_container);
    if(!el) return;
    el.innerHTML="";

    if(data.length==0) return;

    //legend: remove first key (name)
    let keys = Object.keys(data[0]).slice(1);

    //debugging info
    //console.log({data});

    //UNIT CHANGE from kg to Tons
    if(yUnit=='kgCO2eq'){
      //check if max value is > 1e6
      let total_values = data.map(obj=>{
        let sum=0;
        keys.forEach(key=>{
          sum += obj[key];
        });
        return sum;
      });
      let max_value=Math.max(...total_values);

      //convert kg to tons
      if(max_value >= 1e6){
        data.forEach(obj=>{
          keys.forEach(key=>{
            obj[key] /= 1000;
          });
        });
        yUnit="t CO2eq";
      }
    }

    //calculate legend width based on names of "data"
    var legend_width = (function(){
      let max = 100; //default length
      keys.forEach(key=>{
        let len = get_text_width(key);
        if(len > max) max = len;
      });
      return max;
    })();

    var margin = {top:20, right:160, bottom:35, left:30};
    var width  = window.innerWidth - margin.left - margin.right - legend_width;
    var height = 500-margin.top-margin.bottom;
    var svg = d3.select(`#${id_container}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right + legend_width)
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
      .tickFormat(function(d){
        if(d>9999){
          return d.toExponential(0);
        }else{
          return d;
        }
      })
    ;

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
        tooltip.select("text").text(format(d.y.toFixed(0)));
      });

    // Draw legend
    var legend = svg.selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return `translate(30,${i*19})` });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {return colors.slice()[i];});

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .style("text-anchor", "start")
      .text((d,i)=>{
        return keys[i]+" ("+yUnit+")";
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

  draw_sankey_ghg(selector){
    selector=selector||"#sankey";

    let el = document.querySelector(selector);
    if(!el) return;

    el.innerHTML="";

    let colors={
      'ws':Structure.find(s=>s.prefix=='ws').color,
      'ww':Structure.find(s=>s.prefix=='ww').color,
      'fallback':'#9f9fa3'
    };

    let json={};
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
      {source:get_index('wsa'), target:get_index('elec'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_elec()   .total).sum()||1e-3},
      {source:get_index('wsa'), target:get_index('fuel'), value:Global.Water.Abstraction.map(s=>s.wsa_KPI_GHG_fuel()   .total).sum()||1e-3},

      {source:get_index('wst'), target:get_index('elec'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_elec()     .total).sum()||1e-3},
      {source:get_index('wst'), target:get_index('fuel'), value:Global.Water.Treatment.map(s=>s.wst_KPI_GHG_fuel()     .total).sum()||1e-3},

      {source:get_index('wsd'), target:get_index('elec'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_elec()  .total).sum()||1e-3},
      {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_fuel()  .total).sum()||1e-3},
      {source:get_index('wsd'), target:get_index('fuel'), value:Global.Water.Distribution.map(s=>s.wsd_KPI_GHG_trck()  .total).sum()||1e-3},

      {source:get_index('wwc'), target:get_index('elec'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_elec()    .total).sum()||1e-3},
      {source:get_index('wwc'), target:get_index('fuel'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_fuel()    .total).sum()||1e-3},
      {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_cso()     .total).sum()||1e-3},
      {source:get_index('wwc'), target:get_index('untr'), value:Global.Waste.Collection.map(s=>s.wwc_KPI_GHG_col()     .total).sum()||1e-3},

      {source:get_index('wwt'), target:get_index('elec'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_elec()     .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_fuel()     .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_dig_fuel() .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('wwtr'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_tre()      .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('biog'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_biog()     .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('slud'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_slu()      .total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('fuel'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_reus_trck().total).sum()||1e-3},
      {source:get_index('wwt'), target:get_index('disc'), value:Global.Waste.Treatment.map(s=>s.wwt_KPI_GHG_disc()     .total).sum()||1e-3},

      {source:get_index('wwo'), target:get_index('elec'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_elec()        .total).sum()||1e-3},
      {source:get_index('wwo'), target:get_index('fuel'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_fuel()        .total).sum()||1e-3},
      {source:get_index('wwo'), target:get_index('untr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_unt_opd()     .total).sum()||1e-3},
      {source:get_index('wwo'), target:get_index('wwtr'), value:Global.Waste.Onsite.map(s=>s.wwo_KPI_GHG_containment() .total).sum()||1e-3},
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

    let chart = d3.select(selector).append("svg").chart("Sankey.Path");
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
};

//utils: calculate width of text in svg
function get_text_width(text){
  var canvas = get_text_width.canvas || (get_text_width.canvas = document.createElement("canvas"));
  var context  = canvas.getContext("2d");
  context.font = "10px sans-serif";
  var metrics  = context.measureText(text);
  return metrics.width;
  //test
  //console.log(get_text_width("hello there!"));  // close to 86
}
