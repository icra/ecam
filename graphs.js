var Graphs = {}

Graphs.graph1=function(withTables,container)
{
	//pointers
	var ws = Global.Water;
	var ww = Global.Waste;
	var Days = Global.General.Days();
	//values
	var wsNon=ws.ws_KPI_GHG_ne();
	var wsYes=ws.ws_KPI_GHG_elec();

	var wwNon=ww.ww_KPI_GHG_ne_ch4_wwt()+ww.ww_KPI_GHG_ne_n2o_tre()+ww.ww_KPI_GHG_ne_tsludge()+ww.ww_KPI_GHG_ne_ch4_unt()+ww.ww_KPI_GHG_ne_n2o_unt()+ww.ww_KPI_GHG_ne_engines();
	var wwYes=ww.ww_KPI_GHG_elec();

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage', 'Emissions'],
		["ws electrical",     wsYes],
		["ws non electrical", wsNon],
		["ww electrical",     wwYes],
		["ww non electrical", wwNon],
	]);
	//options
	var options= 
	{ 
		//width:800,
		//height:400,
		title:"L1 GHG",
		slices:
		{
			0:{ color: '#00aff1' },
			1:{ color: '#66cef5' },
			2:{ color: '#bf5050' },
			3:{ color: 'lightcoral' },
		},
	}
	//empty container
	document.getElementById(container).innerHTML='';
	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);
	//create a table (as a string)
	if(withTables)
	{
		var table=""+
		"<table>"+
			"<tr><th>Slice             <th>Formula                                              <th>Value (kgCO2/year)"+
			"<tr><td>ws non electrical <td>c_ws51*365/Days                                      <td>"+format(wsNon)+
			"<tr><td>ws     electrical <td>ws5*uw1*365/Days                                     <td>"+format(wsYes)+
			"<tr><td>ww non electrical <td>(c_ww57+c_ww55+c_ww53+c_ww51+c_ww52+c_ww54)*365/Days <td>"+format(wwNon)+
			"<tr><td>ww     electrical <td>ww3*uw1*365/Days                                     <td>"+format(wwYes)+
		"</table>";
		var div=document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph2=function(withTables,container)
{
	//pointer
	var Days=Global.General.Days();
	//values
	var ws=Global.Water.ws5*365/Days;
	var ww=Global.Waste.ww3*365/Days;
	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage', 'Emissions'],
		["Water supply", ws],
		["Wastewater",   ww],
	]);
	var options= 
	{ 
		pieHole:0.4,
		//width:800,
		//height:400,
		title:"L1 Energy consumption",
		slices:
		{
			0:{ color: '#0aaeef' },
			1:{ color: '#bf5050' },
		},
	};
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);
	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>Slice        <th>Formula                                      <th>Value (kWh/year)"+
			"<tr><td>Water supply <td><a href=variable.php?id=ws5>ws5</a>*365/Days <td>"+format(ws)+
			"<tr><td>Wastewater   <td><a href=variable.php?id=ww3>ww3</a>*365/Days <td>"+format(ww)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph3=function(withTables,container)
{
	//pointers
	var WS = Global.Water;
	var WW = Global.Waste;
	var Days = Global.General.Days();
	var uw1 = Global.UWS.uw1;
	//data: 3 graphs: 2 bars each = 6 bars
	//BAR 1
	var slice_1  = WS.ws5*uw1*365/Days/WS.ws2;
	var slice_2  = WS.c_ws51()*365/Days/WS.ws2;
	//BAR 2
	var slice_3  = WW.ww3*uw1*365/Days/WW.ww5;
	var slice_4  = (WW.c_ww57()+WW.c_ww55()+WW.c_ww53()+WW.c_ww51()+WW.c_ww52()+WW.c_ww54())*365/Days/WW.ww5||0;
	//BAR 3
	var slice_5  = WS.wGHG6();
	var slice_6  = WS.wGHG4();
	//BAR 4
	var slice_7  = WW.wwGHG4();
	var slice_8  = WW.wwGHG6();
	//BAR 5
	var slice_9 = WS.wGHG7();
	var slice_10  = WS.wGHG5();
	//BAR 6
	var slice_11 = WW.wwGHG5();
	var slice_12 = WW.wwGHG7();
	//actual graph
	var data=google.visualization.arrayToDataTable
	([
		[ 
			'Emission type', 
			'Electrical related', 
			'Non-electrical related', 
			{role:'annotation'} 
		],

		['WS per capita', slice_1 , slice_2 , ''],
		['WW per capita', slice_3 , slice_4 , ''],
		['WS per SP',     slice_5 , slice_6 , ''],
		['WW per SP',     slice_7 , slice_8 , ''],
		['WS per AC',     slice_9 , slice_10, ''],
		['WW per CW',     slice_11, slice_12, ''],
	]);
	var options=
	{
		title:"L1 GHG",
		//width:1000,
		height:500,
		legend:{position:'right',maxLines:100},
		isStacked:true,
		colors: ['#bca613','#00aeef', '#f3a000', '#89375c'],
	};
	var view=new google.visualization.DataView(data);
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.ColumnChart(document.getElementById(container));
	chart.draw(view, options);

	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>GHG           <th>Non electrical (formula)                                 <th>Value               <th>Electrical (formula) <th>Value"+
			"<tr><th>WS per capita <td>c_ws51*365/Days/ws2                                      <td>"+format(slice_1 )+"<td>ws5*uw1*365/Days/ws2 <td>"+format(slice_2 )+
			"<tr><th>WW per capita <td>(c_ww57+c_ww55+c_ww53+c_ww51+c_ww52+c_ww54)*365/Days/ww5 <td>"+format(slice_3 )+"<td>ww3*uw1*365/Days/ww5 <td>"+format(slice_4 )+
			"<tr><th>WS per SP     <td>wGHG4                                                    <td>"+format(slice_5 )+"<td>wGHG6                <td>"+format(slice_6 )+
			"<tr><th>WW per SP     <td>wwGHG6                                                   <td>"+format(slice_7 )+"<td>wwGHG4               <td>"+format(slice_8 )+
			"<tr><th>WS per AC     <td>wGHG5                                                    <td>"+format(slice_9 )+"<td>wGHG7                <td>"+format(slice_10)+
			"<tr><th>WW per CW     <td>wwGHG7                                                   <td>"+format(slice_11)+"<td>wwGHG5               <td>"+format(slice_12)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph4=function(withTables,container)
{
	//Pointers
	var ws   = Global.Water
	var wsg  = Global.Water.General
	var ww   = Global.Waste
	var wwg  = Global.Waste.General
	var Days = Global.General.Days()
	//Values
	var slice_1 = ww.c_ww54()*365/Days;
	var slice_2 = (wsg.c_wsg50()*Global.UWS.uw1-wsg.wsg4)*365/Days;
	var slice_3 = ws.c_ws51()*365/Days;
	var slice_4 = (ww.ww3-wwg.wwg2-wwg.wwg4)*Global.UWS.uw1*365/Days;
	var slice_5 = ww.c_ww57()*365/Days; 
	var slice_6 = ww.c_ww55()*365/Days;
	var slice_7 = (ww.c_ww51()+ww.c_ww52())*365/Days;
	var slice_8 = ww.Treatment.c_wwt55()*365/Days;
	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage','Emissions'],
		['GHG from sludge transport             ', slice_1],
		['GHG electricyty (water)               ', slice_2],
		['GHG from fuel engines (water)         ', slice_3],
		['GHG from electricity (wastewater)     ', slice_4],
		['GHG from fuel engines (wastewater)    ', slice_5],
		['GHG from biogas handling (wastewater) ', slice_6],
		['GHG from untreated effluent discharge ', slice_7],
		['GHG from treated effluent discharge   ', slice_8],
	]);
	var options= 
	{ 
		width:800,
		height:400,
		title:"L2 GHG",
		slices:
		{
			0:{color:'#d0afbe'},
			1:{color:'#bca613'},
			2:{color:'#453f1c'},
			3:{color:'#89375c'},
			4:{color:'#451c2e'},
			5:{color:'#b8879d'},
			6:{color:'#672945'},
			7:{color:'#a15f7d'},
		},
	};
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>Field                                 <th>Formula                      <th>Value (kgCO2/year)"+
			"<tr><td>GHG from sludge transport             <td>c_ww54*365/Days              <td>"+format(slice_1)+
			"<tr><td>GHG electricyty (water)               <td>(c_wsg50*uw1-wsg4)*365/Days  <td>"+format(slice_2)+
			"<tr><td>GHG from fuel engines (water)         <td>c_ws51*365/Days              <td>"+format(slice_3)+
			"<tr><td>GHG from electricity (wastewater)     <td>(ww3-wwg2-wwg4)*uw1*365/Days <td>"+format(slice_4)+
			"<tr><td>GHG from fuel engines (wastewater)    <td>c_ww57*365/Days              <td>"+format(slice_5)+
			"<tr><td>GHG from biogas handling (wastewater) <td>c_ww55*365/Days              <td>"+format(slice_6)+
			"<tr><td>GHG from untreated effluent discharge <td>(c_ww51+c_ww52)*365/Days     <td>"+format(slice_7)+
			"<tr><td>GHG from treated effluent discharge   <td>c_wwt55*365/Days             <td>"+format(slice_8)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph5=function(withTables,container)
{
	//pointers
	var Days=Global.General.Days();
	//values
	var slice_1 = Global.Water.Abstraction.wsa1 *365/Days;
	var slice_2 = Global.Water.Treatment.wst2   *365/Days;
	var slice_3 = Global.Water.Distribution.wsd1*365/Days;
	var slice_4 = Global.Waste.Collection.wwc2  *365/Days;
	var slice_5 = Global.Waste.Treatment.wwt9   *365/Days;
	var slice_6 = Global.Waste.Discharge.wwd3   *365/Days;
	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage', 'Emissions'],
		["Water Abstraction",     slice_1],
		["Water Treatment",       slice_2],
		["Water Distribution",    slice_3],
		["Wastewater Collection", slice_4],
		["Wastewater Treatment",  slice_5],
		["Wastewater Discharge",  slice_6],
	]);
	var options= 
	{ 
		pieHole:0.4,
		width:800,
		height:400,
		title:"L2 Energy consumption",
		slices:
		{
			0:{ color: '#66cef5' },
			1:{ color: '#0083b3' },
			2:{ color: '#cceffc' },
			3:{ color: '#b67800' },
			4:{ color: '#f8c666' },
			5:{ color: '#fad999' },
		},
	};
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>Slice                 <th>Formula                                        <th>Value (kWh/m<sup>3</sup>)"+
			"<tr><td>Water Abstraction     <td><a href=variable.php?id=wsa1>wsa1</a>*365/Days <td>"+format(slice_1)+
			"<tr><td>Water Treatment       <td><a href=variable.php?id=wst2>wst2</a>*365/Days <td>"+format(slice_2)+
			"<tr><td>Water Distribution    <td><a href=variable.php?id=wsd1>wsd1</a>*365/Days <td>"+format(slice_3)+
			"<tr><td>Wastewater Collection <td><a href=variable.php?id=wwc2>wwc2</a>*365/Days <td>"+format(slice_4)+
			"<tr><td>Wastewater Treatment  <td><a href=variable.php?id=wwt9>wwt9</a>*365/Days <td>"+format(slice_5)+
			"<tr><td>Wastewater Discharge  <td><a href=variable.php?id=wwd3>wwd3</a>*365/Days <td>"+format(slice_6)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph6=function(withTables,container)
{
	//pointers
	var ws   = Global.Water;
	var ww   = Global.Waste;
	var wsg  = Global.Water.General;
	var wwg  = Global.Waste.General;
	var uw1  = Global.UWS.uw1;
	var Days = Global.General.Days();
	//3 graphs * 8 slices per graph = 24 slices. 2 bars per graph = 6 bars
	//BAR 1
	var slice_1 = (ws.ws5-wsg.wsg2-wsg.wsg4)*uw1*365/Days/ws.ws2;
	var slice_2 = (ws.c_ws51()-wsg.c_wsg52())*365/Days/ws.ws2;
	//BAR 2
	var slice_3 = ((ww.ww3-wwg.wwg2-wwg.wwg4)*uw1-wwg.c_wwg52())*365/Days/ww.ww5;
	var slice_4 = ww.c_ww57()*365/Days/ww.ww5;
	var slice_5 = ww.c_ww55()*365/Days/ww.ww5;
	var slice_6 = ww.c_ww53()*365/Days/ww.ww5;
	var slice_7 = (ww.c_ww51()+ww.c_ww52())*365/Days/ww.ww5;
	var slice_8 = ww.c_ww54()*365/Days/ww.ww5;
	//BAR 3
	var slice_9  = wsg.wGHG6_L2();
	var slice_10 = wsg.wGHG4_L2();
	//BAR 4
	var slice_11 = wwg.wwGHG4_L2()
	var slice_12 = wwg.wwGHG8()
	var slice_13 = wwg.wwGHG10()
	var slice_14 = wwg.wwGHG12()
	var slice_15 = wwg.wwGHG14()
	var slice_16 = wwg.wwGHG16()
	//BAR 5
	var slice_17 = wsg.wGHG7_L2();
	var slice_18 = wsg.wGHG5_L2();
	//BAR 6
	var slice_19 = wwg.wwGHG5_L2();
	var slice_20 = wwg.wwGHG9();
	var slice_21 = wwg.wwGHG11();
	var slice_22 = wwg.wwGHG13();
	var slice_23 = wwg.wwGHG15();
	var slice_24 = wwg.wwGHG17();
	//actual graph data
	var data=google.visualization.arrayToDataTable([
		[ 'Emission type', 
				'From electricity', 
				'Fuel used in engines',
				'Biogas production flared or released',
				'Treated sewage discharged to river',
				'Untreated sewage',
				'Sludge transport',
				{role:'annotation'} 
		],
		['WS per capita',
			slice_1,
			slice_2,
			0, 0, 0, 0, ''
		],
		['WW per capita',
			slice_3,
			slice_4,
			slice_5,
			slice_6,
			slice_7,
			slice_8,
			''
		],
		['WS per SP',
			slice_9 ,
			slice_10,
			0, 0, 0, 0, ''
		],
		['WW per SP', 
			slice_11,
			slice_12,
			slice_13,
			slice_14,
			slice_15,
			slice_16,
			''
		],
		['WS per AC',     
			slice_17,
			slice_18,
			0, 0, 0, 0, ''
		],
		['WW per SP', 
			slice_19,
			slice_20,
			slice_21,
			slice_22,
			slice_23,
			slice_24,
			''
		],
	]);
	var options=
	{
		title:"L2 GHG",
		width:1000,
		height:500,
		legend:{position:'right',maxLines:100},
		isStacked:true,
		colors: [
			'#bca613', 
			'#aaa',
			'#451c2e',
			'#672945',
			'#a15f7d',
			'#b8879d',
			'#d0afbe',
		],
	}
	var view=new google.visualization.DataView(data);
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.ColumnChart(document.getElementById(container));
	chart.draw(view, options);

	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>Bar		   <th>From electricity (formula)                 <th>From electricity (value) <th>Fuel used in engines (formula) <th>Fuel used in engines (value) <th>Biogas (formula)    <th>Biogas (value)      <th>Treated (formula)   <th>Treated (value)     <th>Untreated (formula)          <th>Untreated (value)   <th>Sludge transport (formula) <th>Sludge transport (value)"+
			"<tr><th>WS per capita <td>(ws5-wsg2-wsg4)*uw1*365/Days/ws2           <td>"+format(slice_1 )+     "<td>(c_ws51-c_wsg52)*365/Days/ws2  <td>"+format(slice_2 )+
			"<tr><th>WW per capita <td>((ww3-wwg2-wwg4)*uw1-c_wwg52)*365/Days/ww5 <td>"+format(slice_3 )+     "<td>c_ww57*365/Days/ww5            <td>"+format(slice_4 )+         "<td>c_ww55*365/Days/ww5 <td>"+format(slice_5 )+"<td>c_ww53*365/Days/ww5 <td>"+format(slice_6) +"<td>(c_ww51+c_ww52)*365/Days/ww5 <td>"+format(slice_7) +"<td>c_ww54*365/Days/ww5        <td>"+format(slice_8) +
			"<tr><th>WS per SP     <td>wGHG6_L2                                   <td>"+format(slice_9 )+     "<td>wGHG4_L2                       <td>"+format(slice_10)+
			"<tr><th>WW per SP     <td>wwGHG4_L2                                  <td>"+format(slice_11)+     "<td>wwGHG8                         <td>"+format(slice_12)+         "<td>wwGHG10             <td>"+format(slice_12)+"<td>wwGHG12             <td>"+format(slice_13)+"<td>wwGHG14                      <td>"+format(slice_14)+"<td>wwGHG16                    <td>"+format(slice_15)+
			"<tr><th>WS per AC     <td>wGHG7_L2                                   <td>"+format(slice_17)+     "<td>wGHG5_L2                       <td>"+format(slice_18)+
			"<tr><th>WW per CW     <td>wwGHG5_L2                                  <td>"+format(slice_19)+     "<td>wwGHG9                         <td>"+format(slice_20)+         "<td>wwGHG11             <td>"+format(slice_21)+"<td>wwGHG13             <td>"+format(slice_22)+"<td>wwGHG15                      <td>"+format(slice_23)+"<td>wwGHG17                    <td>"+format(slice_24)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.graph7=function(withTables,container)
{
	//pointers to objects
	var wsa1 = Global.Substages.Water.Abstraction
	var wst2 = Global.Substages.Water.Treatment
	var wsd1 = Global.Substages.Water.Distribution
	var wwc2 = Global.Substages.Waste.Collection
	var wwt9 = Global.Substages.Waste.Treatment
	var wwd3 = Global.Substages.Waste.Discharge
	//array of pointers to objects
	var stages = [ wsa1 , wst2 , wsd1 , wwc2 , wwt9 , wwd3];
	var names =  ["wsa1","wst2","wsd1","wwc2","wwt9","wwd3"];
	//variable DATA will be inserted into the graph
	var DATA = 
	[
		['Stage', 'Emissions'],
		//['name', value],
	]

	//push data to DATA
	for(var s in stages)
	{
		for(var i in stages[s])
		{
			var name = stages[s][i].name
			var value = stages[s][i][names[s]]
			DATA.push([ names[s]+" substage "+(parseInt(i)+1) +" ("+name+")", value])
		}
	}

	var data=google.visualization.arrayToDataTable(DATA);
	var options= 
	{ 
		pieHole:0.4,
		width:800,
		height:400,
		title:"L3 Energy consumption per substage",
		/*
		slices:{
			0:{ color: '#66cef5' },
			1:{ color: '#0083b3' },
			2:{ color: '#cceffc' },
			3:{ color: '#b67800' },
			4:{ color: '#f8c666' },
			5:{ color: '#fad999' },
		}
		*/
		slices: { },
	};

	var colors = [ '#66cef5', '#0083b3', '#cceffc', '#b67800', '#f8c666', '#fad999' ];

	var current_slice = 0;
	for(var s in stages)
	{
		for(var i in stages[s])
		{
			options.slices[current_slice++]={color:colors[s],offset:0.1}
		}
	}
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	if(withTables)
	{
		//create a table (as a string)
		var table="<table><tr><th>Formula <th colspan=30>Values for each substage";
			for(var s in stages)
			{
				table+="<tr><td><a href=variable.php?id="+names[s]+">"+names[s]+"</a>";
				for(var i in stages[s])
					table+="<td>"+stages[s][i][names[s]];
			}
		table+="</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
}

Graphs.sankey=function(withTables,container)
{
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'From');
	data.addColumn('string', 'To');
	data.addColumn('number', 'Weight');
	data.addRows([
		['Abstraction', 	     'Water treatment', 	 Global.Water.Abstraction.wsa2||1  ],
		['Water treatment',	     'Distribution',         Global.Water.Treatment.wst1||1    ],
		['Distribution', 	     'Users in',             Global.Water.Distribution.wsd7||1 ],
		['Users in',             'Users out',            Global.Water.Distribution.wsd20||1],
		['Users out',	         'Collection',           Global.Waste.Collection.wwc1||1   ],
		['Collection',	         'Wastewater treatment', Global.Waste.Treatment.wwt8||1    ],
		['Wastewater treatment', 'Discharge',            Global.Waste.Discharge.wwd1||1    ],
	]);
	// Sets chart options.
	var colors = ['#00aaf1', 'lightcoral']; 

	var options = 
	{
		width:"900", height: 400,
		sankey: 
		{
			node: {
				colors: colors,
				nodePadding:100,
			},
			link: {
				colorMode: 'gradient',
				colors: colors
			}
		}
	};
	// Instantiates and draws our chart, passing in options.
	document.getElementById(container).innerHTML='';
	var chart = new google.visualization.Sankey(document.getElementById(container));
	chart.draw(data,options);
}
