var Graphs = {}

Graphs.graph1=function(withTable,container)
{
	//pointers
	var Days = Global.General.Days();

	//values
	var wsNon = Global.Water.ws_KPI_GHG_ne();
	var wsYes = Global.Water.ws_KPI_GHG_elec();
	var wwNon = Global.Waste.ww_KPI_GHG_ne();
	var wwYes = Global.Waste.ww_KPI_GHG_elec();

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
		title:"L1 Greenhouse gas emissions (kg CO2 eq)",
		slices:
		{
			0:{ color: '#00aff1' },
			1:{ color: '#66cef5' },
			2:{ color: '#bf5050' },
			3:{ color: 'lightcoral' },
		},
	}

	//do empty the container element
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	//create a table string
	if(withTable)
	{
		var table=""+
		"<table>"+
		"<button onclick=Graphs.graph1(false,'"+container+"')>Hide table</button>"+
			"<tr><th>Slice             <th>Variable         <th>Value (kgCO2)"+
			"<tr><td>ws     electrical <td><a href=variable.php?id=ws_KPI_GHG_elec>ws_KPI_GHG_elec</a> <td>"+format(wsYes)+
			"<tr><td>ws non electrical <td><a href=variable.php?id=ws_KPI_GHG_ne>ws_KPI_GHG_ne</a>     <td>"+format(wsNon)+
			"<tr><td>ww     electrical <td><a href=variable.php?id=ww_KPI_GHG_elec>ww_KPI_GHG_elec</a> <td>"+format(wwYes)+
			"<tr><td>ww non electrical <td><a href=variable.php?id=ww_KPI_GHG_ne>ww_KPI_GHG_ne</a>     <td>"+format(wwNon)+
		"</table>"+
		"";
		var div=document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph1(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph2=function(withTable,container)
{
	//pointer
	var Days=Global.General.Days();

	//values
	var ws=Global.Water.ws_nrg_cons;
	var ww=Global.Waste.ww_nrg_cons;

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage', 'Emissions'],
		["Water supply", ws],
		["Wastewater",   ww],
	]);

	//options
	var options= 
	{ 
		pieHole:0.4,
		//width:800,
		//height:400,
		title:"L1 Energy consumption (kWh)",
		slices:
		{
			0:{ color: '#0aaeef' },
			1:{ color: '#bf5050' },
		},
	};

	//empty the container element
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	//table
	if(withTable)
	{
		//create a table string
		var table=""+
		"<button onclick=Graphs.graph2(false,'"+container+"')>Hide table</button>"+
		"<table>"+
			"<tr><th>Slice        <th>Formula <th>Value (kWh)"+
			"<tr><td>Water supply <td><a href=variable.php?id=ws_nrg_cons>ws_nrg_cons</a><td>"+format(ws)+
			"<tr><td>Wastewater   <td><a href=variable.php?id=ww_nrg_cons>ww_nrg_cons</a><td>"+format(ww)+
		"</table>";
		var div = document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph2(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph3=function(withTable,container)
{
	//pointers
	var WS = Global.Water;
	var WW = Global.Waste;
	var Days = Global.General.Days();
	var ws_el = WS.ws_KPI_GHG_elec();
	var ws_ne = WS.ws_KPI_GHG_ne();
	var ww_el = WW.ww_KPI_GHG_elec();
	var ww_ne = WW.ww_KPI_GHG_ne();

	//data: 3 graphs: 2 bars each = 6 bars
	//BAR 1
	var slice_1  = ws_el/WS.ws_resi_pop;
	var slice_2  = ws_ne/WS.ws_resi_pop;
	//BAR 2
	var slice_3  = ww_el/WW.ww_resi_pop;
	var slice_4  = ww_ne/WW.ww_resi_pop;
	//BAR 3
	var slice_5  = ws_el/WS.ws_serv_pop;
	var slice_6  = ws_ne/WS.ws_serv_pop;
	//BAR 4
	var slice_7  = ww_el/WW.ww_serv_pop;
	var slice_8  = ww_ne/WW.ww_serv_pop;
	//BAR 5
	var slice_9  = ws_el/WS.ws_vol_auth;
	var slice_10 = ws_ne/WS.ws_vol_auth;
	//BAR 6
	var slice_11 = ww_el/WW.ww_vol_wwtr;
	var slice_12 = ww_ne/WW.ww_vol_wwtr;

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

	//options
	var options=
	{
		title:"L1 GHG",
		//width:1000,
		height:500,
		legend:{position:'right',maxLines:100},
		isStacked:true,
		colors: ['#bca613','#00aeef', '#f3a000', '#89375c'],
	};

	//empty container element
	document.getElementById(container).innerHTML='';

	//draw
	var view=new google.visualization.DataView(data);
	var chart=new google.visualization.ColumnChart(document.getElementById(container));
	chart.draw(view, options);

	//tables
	if(withTable)
	{
		//create a table string
		var table=""+
		"<button onclick=Graphs.graph3(false,'"+container+"')>Hide table</button>"+
		"<table >"+
			"<tr><th>Emission      <th>From non electrical (formula) <th>Value               <th>From electricity (formula)    <th>Value"+
			"<tr><th>WS per capita <td>ws_KPI_GHG_ne / ws_resi_pop   <td>"+format(slice_1 )+"<td>ws_KPI_GHG_elec / ws_resi_pop <td>"+format(slice_2 )+
			"<tr><th>WW per capita <td>ww_KPI_GHG_ne / ww_resi_pop   <td>"+format(slice_3 )+"<td>ww_KPI_GHG_elec / ww_resi_pop <td>"+format(slice_4 )+
			"<tr><th>WS per SP     <td>ws_KPI_GHG_ne / ws_serv_pop   <td>"+format(slice_5 )+"<td>ws_KPI_GHG_elec / ws_serv_pop <td>"+format(slice_6 )+
			"<tr><th>WW per SP     <td>ww_KPI_GHG_ne / ww_serv_pop   <td>"+format(slice_7 )+"<td>ww_KPI_GHG_elec / ww_serv_pop <td>"+format(slice_8 )+
			"<tr><th>WS per AC     <td>ws_KPI_GHG_ne / ws_vol_auth   <td>"+format(slice_9 )+"<td>ws_KPI_GHG_elec / ws_vol_auth <td>"+format(slice_10)+
			"<tr><th>WW per CW     <td>ww_KPI_GHG_ne / ww_vol_wwtr   <td>"+format(slice_11)+"<td>ww_KPI_GHG_elec / ww_vol_wwtr <td>"+format(slice_12)+
		"</table>";
		var div = document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph3(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph4=function(withTable,container)
{
	//Pointers
	var ws   = Global.Water
	var ww   = Global.Waste
	var wsg  = Global.Water.General
	var wwg  = Global.Waste.General

	var Days = Global.General.Days();

	//Values
	var slice_1 = ws.ws_KPI_GHG_elec();
	var slice_2 = ws.ws_KPI_GHG_ne();
	var slice_3 = ww.ww_KPI_GHG_elec();
	var slice_4 = ww.ww_KPI_GHG_ne_engines();
	var slice_5 = ww.ww_KPI_GHG_ne_tsludge();
	var slice_6 = ww.ww_KPI_GHG_ne_ch4_wwt();
	var slice_7 = ww.ww_KPI_GHG_ne_n2o_tre();
	var slice_8 = ww.ww_KPI_GHG_ne_ch4_unt()+ww.ww_KPI_GHG_ne_n2o_unt();

	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage','Emissions'],
		['From electricyty (water)                       ', slice_1],
		['From fuel engines (water)                      ', slice_2],
		['From electricity (wastewater)                  ', slice_3],
		['From fuel engines (wastewater)                 ', slice_4],
		['From sludge transport (wastewater)             ', slice_5],
		['From CH4 in plants (wastewater)                ', slice_6],
		['From treated effluent discharge (wastewater)   ', slice_7],
		['From untreated effluent discharge (wastewater) ', slice_8],
	]);

	//options
	var options= 
	{ 
		//width:800,
		//height:400,
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

	//empty the container
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	//tables
	if(withTable)
	{
		//create a table (as a string)
		var table=""+
		"<button onclick=Graphs.graph4(false,'"+container+"')>Hide table</button>"+
		"<table >"+
			"<tr><th>Field                                          <th>Formula                                        <th>Value (kgCO2/year)"+
			"<tr><td>From electricity (water)                       <td>ws_KPI_GHG_elec                                <td>"+format(slice_1)+
			"<tr><td>From fuel engines(water)                       <td>ws_KPI_GHG_ne                                  <td>"+format(slice_2)+
			"<tr><td>From electricity (wastewater)                  <td>ww_KPI_GHG_elec                                <td>"+format(slice_3)+
			"<tr><td>From fuel engines (wastewater)                 <td>ww_KPI_GHG_ne_engines                          <td>"+format(slice_4)+
			"<tr><td>From sludge transport (wastewater)             <td>ww_KPI_GHG_ne_tsludge                          <td>"+format(slice_5)+
			"<tr><td>From CH4 in plants (wastewater)                <td>ww_KPI_GHG_ne_ch4_wwt                          <td>"+format(slice_6)+
			"<tr><td>From treated effluent discharge (wastewater)   <td>ww_KPI_GHG_ne_n2o_tre                          <td>"+format(slice_7)+
			"<tr><td>From untreated effluent discharge (wastewater) <td>ww_KPI_GHG_ne_ch4_unt+ww.ww_KPI_GHG_ne_n2o_unt <td>"+format(slice_8)+
		"</table>";
		var div = document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph4(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph5=function(withTable,container)
{
	//pointers
	var Days=Global.General.Days();

	//values
	var slice_1 = Global.Water.Abstraction.wsa_nrg_cons;
	var slice_2 = Global.Water.Treatment.wst_nrg_cons;
	var slice_3 = Global.Water.Distribution.wsd_nrg_cons;
	var slice_4 = Global.Waste.Collection.wwc_nrg_cons;
	var slice_5 = Global.Waste.Treatment.wwt_nrg_cons;
	var slice_6 = Global.Waste.Discharge.wwd_nrg_cons;

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

	//options
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

	//empty the container
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	//tables
	if(withTable)
	{
		//create a table (as a string)
		var table=""+
		"<button onclick=Graphs.graph5(false,'"+container+"')>Hide table</button>"+
		"<table >"+
			"<tr><th>Slice                 <th>Formula                                        <th>Value (kWh/m<sup>3</sup>)"+
			"<tr><td>Water Abstraction     <td><a href=variable.php?id=wsa_nrg_cons>wsa_nrg_cons</a> <td>"+format(slice_1)+
			"<tr><td>Water Treatment       <td><a href=variable.php?id=wst_nrg_cons>wst_nrg_cons</a> <td>"+format(slice_2)+
			"<tr><td>Water Distribution    <td><a href=variable.php?id=wsd_nrg_cons>wsd_nrg_cons</a> <td>"+format(slice_3)+
			"<tr><td>Wastewater Collection <td><a href=variable.php?id=wwc_nrg_cons>wwc_nrg_cons</a> <td>"+format(slice_4)+
			"<tr><td>Wastewater Treatment  <td><a href=variable.php?id=wwt_nrg_cons>wwt_nrg_cons</a> <td>"+format(slice_5)+
			"<tr><td>Wastewater Discharge  <td><a href=variable.php?id=wwd_nrg_cons>wwd_nrg_cons</a> <td>"+format(slice_6)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph5(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph6=function(withTable,container)
{
	//pointers
	var ws   = Global.Water;
	var ww   = Global.Waste;
	var wsg  = Global.Water.General;
	var wwg  = Global.Waste.General;
	var Days = Global.General.Days();

	//3 graphs * 8 slices per graph = 24 slices. 2 bars per graph = 6 bars
	//BAR 1
	var slice_1 = ws.ws_KPI_GHG_elec()/ws.ws_resi_pop;
	var slice_2 = ws.ws_KPI_GHG_ne()/ws.ws_resi_pop;
	//BAR 2
	var slice_3 = ww.ww_KPI_GHG_elec()/ww.ww_resi_pop;
	var slice_4 = ww.ww_KPI_GHG_ne_engines()/ww.ww_resi_pop;
	var slice_5 = ww.ww_KPI_GHG_ne_ch4_wwt()/ww.ww_resi_pop;
	var slice_6 = ww.ww_KPI_GHG_ne_n2o_tre()/ww.ww_resi_pop;
	var slice_7 = ww.ww_KPI_GHG_ne_tsludge()/ww.ww_resi_pop;
	var slice_8 = (ww.ww_KPI_GHG_ne_ch4_unt()+ww.ww_KPI_GHG_ne_n2o_unt())/ww.ww_resi_pop;

	//BAR 3
	var slice_9  = ws.ws_KPI_GHG_elec()/ws.ws_serv_pop;
	var slice_10 = ws.ws_KPI_GHG_ne()/ws.ws_serv_pop;
	//BAR 4                                                                                
	var slice_11 = ww.ww_KPI_GHG_elec()/ww.ww_serv_pop;
	var slice_12 = ww.ww_KPI_GHG_ne_engines()/ww.ww_serv_pop;
	var slice_13 = ww.ww_KPI_GHG_ne_ch4_wwt()/ww.ww_serv_pop;
	var slice_14 = ww.ww_KPI_GHG_ne_n2o_tre()/ww.ww_serv_pop;
	var slice_15 = ww.ww_KPI_GHG_ne_tsludge()/ww.ww_serv_pop;
	var slice_16 = (ww.ww_KPI_GHG_ne_ch4_unt()+ww.ww_KPI_GHG_ne_n2o_unt())/ww.ww_serv_pop;

	//BAR 5
	var slice_17 = ws.ws_KPI_GHG_elec()/ws.ws_vol_auth;
	var slice_18 = ws.ws_KPI_GHG_ne()/ws.ws_vol_auth;
	//BAR 6                                                                                
	var slice_19 = ww.ww_KPI_GHG_elec()/ww.ww_vol_wwtr;
	var slice_20 = ww.ww_KPI_GHG_ne_engines()/ww.ww_vol_wwtr;
	var slice_21 = ww.ww_KPI_GHG_ne_ch4_wwt()/ww.ww_vol_wwtr;
	var slice_22 = ww.ww_KPI_GHG_ne_n2o_tre()/ww.ww_vol_wwtr;
	var slice_23 = ww.ww_KPI_GHG_ne_tsludge()/ww.ww_vol_wwtr;
	var slice_24 = (ww.ww_KPI_GHG_ne_ch4_unt()+ww.ww_KPI_GHG_ne_n2o_unt())/ww.ww_vol_wwtr;

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		[ 'Emission type', 
				'From electricity', 
				'Fuel used in engines',
				'Biogas production flared or released',
				'Treated sewage discharged to river',
				'Sludge transport',
				'Untreated sewage',
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

	//empty the container
	document.getElementById(container).innerHTML='';

	//draw
	var view=new google.visualization.DataView(data);
	var chart=new google.visualization.ColumnChart(document.getElementById(container));
	chart.draw(view, options);

	//tables
	if(withTable)
	{
		//create a table (as a string)
		var table=""+
		"<button onclick=Graphs.graph6(false,'"+container+"')>Hide table</button>"+
		"<table>"+
			"<tr><th>Bar		   <th>From electricity (formula)  <th>From electricity (value) <th>Fuel used in engines (formula) <th>Fuel used in engines (value) <th>Biogas (formula)    <th>Biogas (value)      <th>Treated (formula)   <th>Treated (value)     <th>Untreated (formula)          <th>Untreated (value)   <th>Sludge transport (formula) <th>Sludge transport (value)"+
			"<tr><th>WS per capita <td>ws_KPI_GHG_elec/ws_resi_pop <td>"+format(slice_1 )+     "<td> <td>"+format(slice_2 )+
			"<tr><th>WW per capita <td>ww_KPI_GHG_elec/ww_resi_pop <td>"+format(slice_3 )+     "<td> <td>"+format(slice_4 )+       "<td> <td>"+format(slice_5 )+"<td> <td>"+format(slice_6) +"<td> <td>"+format(slice_7) +"<td> <td>"+format(slice_8) +
			"<tr><th>WS per SP     <td>ws_KPI_GHG_elec/ws_serv_pop <td>"+format(slice_9 )+     "<td> <td>"+format(slice_10)+
			"<tr><th>WW per SP     <td>ww_KPI_GHG_elec/ww_serv_pop <td>"+format(slice_11)+     "<td> <td>"+format(slice_12)+       "<td> <td>"+format(slice_12)+"<td> <td>"+format(slice_13)+"<td> <td>"+format(slice_14)+"<td> <td>"+format(slice_15)+
			"<tr><th>WS per AC     <td>ws_KPI_GHG_elec/ws_vol_auth <td>"+format(slice_17)+     "<td> <td>"+format(slice_18)+
			"<tr><th>WW per CW     <td>ww_KPI_GHG_elec/ww_vol_wwtr <td>"+format(slice_19)+     "<td> <td>"+format(slice_20)+       "<td> <td>"+format(slice_21)+"<td> <td>"+format(slice_22)+"<td> <td>"+format(slice_23)+"<td> <td>"+format(slice_24)+
		"</table>";
		var div = document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph6(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph7=function(withTable,container)
{
	//pointers to objects
	var wsa = Global.Substages.Water.Abstraction
	var wst = Global.Substages.Water.Treatment
	var wsd = Global.Substages.Water.Distribution
	var wwc = Global.Substages.Waste.Collection
	var wwt = Global.Substages.Waste.Treatment
	var wwd = Global.Substages.Waste.Discharge
	//array of pointers to objects
	var stages = [ wsa , wst , wsd , wwc , wwt , wwd];
	var names =  ["wsa_nrg_cons", "wst_nrg_cons", "wsd_nrg_cons", "wwc_nrg_cons", "wwt_nrg_cons", "wwd_nrg_cons" ];
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
			var name = stages[s][i].name;
			var value = stages[s][i][names[s]];
			DATA.push([ names[s].replace('_nrg_cons','')+" Ss"+(parseInt(i)+1) +" ("+name+")", value])
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

	if(withTable)
	{
		//create a table (as a string)
		var table="<table>"+
		"<button onclick=Graphs.graph7(false,'"+container+"')>Hide table</button>"+
		"<tr><th>Variable <th colspan=30>kWh for each substage";
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
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.graph7(true,'"+container+"')>Show table</button>"
	}
}

Graphs.sankey=function(withTable,container)
{
	//data
	var slice_1 = Global.Water.Abstraction.wsa_vol_conv
	var slice_2 = Global.Water.Treatment.wst_vol_trea
	var slice_3 = Global.Water.Distribution.wsd_vol_dist
	var slice_4 = Global.Water.Distribution.wsd_auth_con
	var slice_5 = Global.Waste.Collection.wwc_vol_conv
	var slice_6 = Global.Waste.Treatment.wwt_vol_trea
	var slice_7 = Global.Waste.Discharge.wwd_vol_disc

	//data
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'From');
	data.addColumn('string', 'To');
	data.addColumn('number', 'Weight');
	data.addRows([
		['Abstraction', 	     'Water treatment', 	 slice_1 || 0.01 ],
		['Water treatment',	     'Distribution',         slice_2 || 0.01 ],
		['Distribution', 	     'Users in',             slice_3 || 0.01 ],
		['Users in',             'Users out',            slice_4 || 0.01 ],
		['Users out',	         'Collection',           slice_5 || 0.01 ],
		['Collection',	         'Wastewater treatment', slice_6 || 0.01 ],
		['Wastewater treatment', 'Discharge',            slice_7 || 0.01 ],
	]);
	// Sets chart options.
	var colors = ['#00aaf1', 'lightcoral']; 

	//options
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

	//empty the container
	document.getElementById(container).innerHTML='';

	//draw
	var chart = new google.visualization.Sankey(document.getElementById(container));
	chart.draw(data,options);

	//tables
	if(withTable)
	{
		//create a table (as a string)
		var table=""+
		"<button onclick=Graphs.sankey(false,'"+container+"')>Hide table</button>"+
		"<table>"+
			"<tr><th>Stage<th>Volume (m3)"+
			"<tr><td><a href=variable.php?id=wsa_vol_conv>wsa_vol_conv</a> <td>"+slice_1+
			"<tr><td><a href=variable.php?id=wst_vol_trea>wst_vol_trea</a> <td>"+slice_2+
			"<tr><td><a href=variable.php?id=wsd_vol_dist>wsd_vol_dist</a> <td>"+slice_3+
			"<tr><td><a href=variable.php?id=wsd_auth_con>wsd_auth_con</a> <td>"+slice_4+
			"<tr><td><a href=variable.php?id=wwc_vol_conv>wwc_vol_conv</a> <td>"+slice_5+
			"<tr><td><a href=variable.php?id=wwt_vol_trea>wwt_vol_trea</a> <td>"+slice_6+
			"<tr><td><a href=variable.php?id=wwd_vol_disc>wwd_vol_disc</a> <td>"+slice_7+
		"</table>";
		var div = document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=Graphs.sankey(true,'"+container+"')>Show table</button>"
	}
}

