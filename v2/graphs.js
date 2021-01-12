var Graphs={};

//GHG UNFCCC categories
Graphs.unfccc=function(withTable,container){
  withTable=withTable||false;
  container=container||"graph";

  var DATA=[
    ['category', translate('emissions')],
  ]

  var total_ghg = 0;

  for(var func in UNFCCC){
    DATA.push([translate(func),UNFCCC[func]()]);
    total_ghg += UNFCCC[func]();
  }

  //array graph data
  var data=google.visualization.arrayToDataTable(DATA);

  //options
  var options={
    height:250,
    legend:{position:'left'},
    title:translate('ghg_emissions_by_unfccc')+" ("+format(total_ghg)+" kg CO2eq)",
  }

  //empty the container element
  var con = document.getElementById(container);
  con.setAttribute('current_graph','unfccc');
  con.innerHTML='';

  //double click
  con.ondblclick=function(){
    var a=document.createElement('a');
    document.body.appendChild(a);
    a.href=chart.getImageURI()
    a.download="image.png"
    a.click()
  }

  //draw
  var chart=new google.visualization.PieChart(con);
  chart.draw(data,options);

  (function(){
    var buttons=document.createElement('div');
    buttons.classList.add('tab_buttons');
    document.getElementById(container).appendChild(buttons);
    var checked=withTable ? "checked" : "";
    buttons.innerHTML=""+
      "<label>"+
      "<input type=checkbox "+checked+" onclick=Graphs.unfccc("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
      "<button class=left  onclick=Graphs.graph1("+withTable.toString()+",'"+container+"')>"+translate('system')+"</button>"+
      "<button class=middle  onclick=Graphs.ghg_by_source("+withTable.toString()+",'"+container+"')>"+translate('source')+"</button>"+
      "<button class=middle  onclick=Graphs.ghgSources("+withTable.toString()+",'"+container+"')>"+translate('source_detailed')+"</button>"+
      "<button class=right   onclick=Graphs.unfccc("+withTable.toString()+",'"+container+"') disabled>"+translate('unfccc_categories')+"</button>"+
    "";
  })();


  //create a table string
  if(withTable){
    var table=""+
    "<table title=unfccc>"+
      "<tr><th>"+translate('Category')+"<th>"+translate('Code')+"<th>"+translate('Value')+" (kg CO2eq)"+
    "";
    for(var func in UNFCCC){
      table+="<tr><td align=left>"+translate(func)+"<td align=left><a href=variable.php?id="+func+">"+func+"</a><td align=right>"+format(UNFCCC[func]());
    }

    table+="</table>"+
    "";

    var div=document.createElement('div');
    div.style.fontSize="10px";
    div.innerHTML=table;
    document.getElementById(container).appendChild(div);
  }
  //scrollToItem(container)
};

//Water flows picture
Graphs.sankey=function(withTable,container) {
  withTable=withTable||false;
  container=container||"graph";
  //data
  var flow_1 = Global.Water.Abstraction.wsa_vol_conv;
  var flow_2 = Global.Water.Treatment.wst_vol_trea;
  var flow_3 = Global.Water.Distribution.wsd_vol_dist;
  var flow_4 = Global.Waste.Collection.wwc_vol_conv;
  var flow_5 = Global.Waste.Treatment.wwt_vol_trea;
  var flow_6 = Global.Waste.Discharge.wwd_vol_disc;

  //data
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'From');
  data.addColumn('string', 'To');
  data.addColumn('number', 'Volume');
  data.addRows([ //if flows are zero, problems. add a ||1 in case this happens
    //ws flows
    ['wsa', 'wst', flow_1||1],
    ['wst', 'wsd', flow_2||1],
    ['wsd', 'injected volume', flow_3||1],
    ['injected volume', 'billed consumption', Global.Water.Distribution.wsd_bill_con],
    ['injected volume', 'non revenue water', Global.Water.Distribution.wsd_vol_dist-Global.Water.Distribution.wsd_bill_con],
    //ww flows
    ['wwc', 'wwt', flow_4||1],
    ['wwt', 'wwd', flow_5||1],
    ['wwd', 'out', flow_6||1],
  ]);

  //options
  var colors=['#00aff1','#bf5050'];
  var options={
    legend:{position:'left'},
    sankey:{
      iterations:32,
      node:{
        colors:colors,
        nodePadding:20,
      },
      link:{
        colorMode: 'gradient',
        colors: colors
      }
    },
  };

  //empty the container
  document.getElementById(container).innerHTML='';

  //draw
  var chart = new google.visualization.Sankey(document.getElementById(container));
  chart.draw(data,options);

  //tables
  if(true) {
    //create a table (as a string)
    var table=""+
    "<table title=sankey>"+
      "<tr><th>Stage        <th>Variable                                              <th>Volume (m3)"+
      "<tr><td>Abstraction  <td><a href=variable.php?id=wsa_vol_conv>wsa_vol_conv</a> <td>"+flow_1+
      "<tr><td>Treatment    <td><a href=variable.php?id=wst_vol_trea>wst_vol_trea</a> <td>"+flow_2+
      "<tr><td>Distribution <td><a href=variable.php?id=wsd_vol_dist>wsd_vol_dist</a> <td>"+flow_3+
      "<tr><td>Collection   <td><a href=variable.php?id=wwc_vol_conv>wwc_vol_conv</a> <td>"+flow_4+
      "<tr><td>Treatment    <td><a href=variable.php?id=wwt_vol_trea>wwt_vol_trea</a> <td>"+flow_5+
      "<tr><td>Discharge    <td><a href=variable.php?id=wwd_vol_disc>wwd_vol_disc</a> <td>"+flow_6+
    "</table>"+
    "";
    var div = document.createElement('div');
    div.style.fontSize="10px";
    div.innerHTML=table;
    document.getElementById(container).appendChild(div);
  }
};

//Gauge for serviced population
Graphs.gauge=function(container,value,header,unit,lowerLimit,upperLimit) {
  container=container||'graph';
  value=value||0;
  header=header||'header not defined';
  unit=unit||"%";
  lowerLimit=lowerLimit||0;
  upperLimit=upperLimit||100;

  //format unit
  unit="<span style=font-size:20px> "+unit+"</span>";

  //empty container
  var element=document.getElementById(container)
  element.style.padding="1em 0"
  element.innerHTML="";

  //title
  var he=document.createElement('span')
  element.appendChild(he);
  he.innerHTML=header+"&emsp;";
  he.style.fontWeight='bold';

  //value
  var div=document.createElement('div');
  he.appendChild(div);
  div.innerHTML=format(value)+unit;
  div.style.fontSize="35px";
  div.style.verticalAlign='middle';

  //warning for out of limits
  if(value>upperLimit || value<lowerLimit) {
    div.style.color="red"
    div.innerHTML+=" &#9888;"
  }
};

//? not used
Graphs.progress=function(container,value,header,color) {
  container=container||'graph';
  value=value||0;
  header=header||'header';
  color=color||'white'

  //container
  var con = document.getElementById(container)
  con.style.textAlign="left"
  con.innerHTML=""
  //header
  var h=document.createElement('h3');
  h.innerHTML=header+" ("+format(value)+"%)"
  con.appendChild(h)
  //element
  var pro=document.createElement('progress');
  con.appendChild(pro)
  pro.value=value
  pro.max=100;
  //css
  pro.style.fontSize="30px"
  pro.style.cursor="default"
  pro.style.background="#fff"
};

Graphs.wsa_KPI_std_nrg_cons=function(withTable,container) {
  withTable=withTable||false;
  container=container||"graph";

  var DATA=[['Abstraction substage','kWh/m3/100m'],];
  var substages=Substages.Water.Abstraction;

  //copy all functions inside
  for(var field in Global.Water.Abstraction)
  {
    if(typeof(Global.Water.Abstraction[field])!="function"){continue;}
    for(var i in substages)
    {
      substages[i][field]=Global.Water.Abstraction[field];
    }
  }

  for(var i=0;i<substages.length;i++)
  {
    var name=substages[i].name;

    var value=substages[i].wsa_KPI_std_nrg_cons();
    if(isNaN(value))value=0;
    if(!isFinite(value))value=0;

    DATA.push([name,value]);
  }
  var options = {
    height:250,
    bar: {groupWidth: "95%"},
    chart: {title:translate('wsa_KPI_std_nrg_cons_descr')+" (kWh/m3/100m)"},
    legend:{position:'none'},
  };
  var chart=new google.charts.Bar(document.getElementById(container));
  var data=google.visualization.arrayToDataTable(DATA);
  chart.draw(data,options);
};
