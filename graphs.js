var Graphs = {}

Graphs.graph1=function(withTable,container)
{
	//pointers
	var years = Global.General.Days()/365;

	//values
	var wsYes = Global.Water.ws_KPI_GHG_elec()/years;
	var wsNon = Global.Water.ws_KPI_GHG_ne()/years;
	var wwYes = Global.Waste.ww_KPI_GHG_elec()/years;
	var wwNon = Global.Waste.ww_KPI_GHG_ne()/years;

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage',                            'Emissions'],
		["From electricity (Water)",          wsYes],
		["From fuel engines (Water)",         wsNon],
		["From electricity (Wastewater)",     wwYes],
		["From non electricity (Wastewater)", wwNon],
	]);

	//options
	var options= 
	{ 
		title:"Greenhouse gas emissions (kg/year)",
		slices:
		{
			0:{color:'#bca613' },
			1:{color:'#453f1c' },
			2:{color:'#89375c' },
			3:{color:'#f08080' },
		},
		allowHtml:true,
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
			"<tr><th>Slice                             <th>Variable                                                    <th>Value (kgCO<sub>2</sub>/year)"+
			"<tr><td>From electricity  (Water)         <td><a href=variable.php?id=ws_KPI_GHG_elec>ws_KPI_GHG_elec</a>/years <td>"+format(wsYes)+
			"<tr><td>From fuel engines (Water)         <td><a href=variable.php?id=ws_KPI_GHG_ne>ws_KPI_GHG_ne</a>/years     <td>"+format(wsNon)+
			"<tr><td>From electricity (Wastewater)     <td><a href=variable.php?id=ww_KPI_GHG_elec>ww_KPI_GHG_elec</a>/years <td>"+format(wwYes)+
			"<tr><td>From non electricity (Wastewater) <td><a href=variable.php?id=ww_KPI_GHG_ne>ww_KPI_GHG_ne</a>/years     <td>"+format(wwNon)+
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
	var Days=Global.General.Days(); //TBD

	//values
	var ws=Global.Water.ws_nrg_cons;
	var ww=Global.Waste.ww_nrg_cons;

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage',       'Emissions'],
		["Water supply", ws],
		["Wastewater",   ww],
	]);

	//options
	var options= 
	{ 
		pieHole:0.4,
		title:"Energy consumption (kWh)",
		slices:
		{
			0:{ color: '#0aaeef' },
			1:{ color: '#bf5050' },
		},
		allowHtml:true,
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
			"<tr><th>Slice        <th>Variable <th>Value (kWh)"+
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

//BAR GRAPHS splitted
//graph 3(a,b,c,d) here
	//per year
	Graphs.graph3a=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Days()/365;

		//total kg 
		var ws_el = WS.ws_KPI_GHG_elec();
		var ws_ne = WS.ws_KPI_GHG_ne();
		var ww_el = WW.ww_KPI_GHG_elec();
		var ww_ne = WW.ww_KPI_GHG_ne();

		//per year
		var slice_1  = ws_el/years;
		var slice_2  = ws_ne/years;
		var slice_3  = ww_el/years;
		var slice_4  = ww_ne/years;

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', 
				'Electrical related (Water)', 
				'Non-electrical related (Water)', 
				'Electrical related (Wastewater)', 
				'Non-electrical related (Wastewater)', 
				{role:'annotation'} 
			],
			['Water'      , slice_1, slice_2, 0,       0,      ''],
			['Wastewater' , 0,       0,       slice_3, slice_4,''],
		]);

		//options
		var options=
		{
			title:"GHG emissions (kg/year)",
			legend:{position:'right',maxLines:100},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			allowHtml:true,
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
			"<button onclick=Graphs.graph3a(false,'"+container+"')>Hide table</button>"+
			"<table >"+
				"<tr><th>Stage                  <th>Water                 <th>kg/year            <th>Wastewater            <th>kg/year"+
				"<tr><th>Non electrical related <td>ws_KPI_GHG_ne  /years <td>"+format(slice_2)+"<td>ww_KPI_GHG_elec/years <td>"+format(slice_4)+
				"<tr><th>Electrical related     <td>ws_KPI_GHG_elec/years <td>"+format(slice_1)+"<td>ww_KPI_GHG_ne  /years <td>"+format(slice_3)+
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
			div.innerHTML="<button onclick=Graphs.graph3a(true,'"+container+"')>Show table</button>"
		}
	}

	//per serv pop per year
	Graphs.graph3b=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Days()/365;

		//total kg 
		var ws_el = WS.ws_KPI_GHG_elec();
		var ws_ne = WS.ws_KPI_GHG_ne();
		var ww_el = WW.ww_KPI_GHG_elec();
		var ww_ne = WW.ww_KPI_GHG_ne();

		//per year per serv population
		var slice_1 = ws_el/years/WS.ws_serv_pop;
		var slice_2 = ws_ne/years/WS.ws_serv_pop;
		var slice_3 = ww_el/years/WW.ww_serv_pop;
		var slice_4 = ww_ne/years/WW.ww_serv_pop;

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', 
				'Electrical related (Water)', 
				'Non-electrical related (Water)', 
				'Electrical related (Wastewater)', 
				'Non-electrical related (Wastewater)', 
				{role:'annotation'} 
			],
			['Water'      , slice_1, slice_2, 0,       0,      ''],
			['Wastewater' , 0,       0,       slice_3, slice_4,''],
		]);

		//options
		var options={
			title:"GHG emissions (kg/serv.pop./year)",
			legend:{position:'right',maxLines:100},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			allowHtml:true,
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
			"<button onclick=Graphs.graph3b(false,'"+container+"')>Hide table</button>"+
			"<table >"+
				"<tr><th>Stage                  <th>Water                             <th>kg/serv.pop./year  <th>Wastewater                        <th>kg/serv.pop./year"+
				"<tr><th>Non electrical related <td>ws_KPI_GHG_ne  /ws_serv_pop/years <td>"+format(slice_2)+"<td>ww_KPI_GHG_elec/ws_serv_pop/years <td>"+format(slice_4)+
				"<tr><th>Electrical related     <td>ws_KPI_GHG_elec/ww_serv_pop/years <td>"+format(slice_1)+"<td>ww_KPI_GHG_ne  /ww_serv_pop/years <td>"+format(slice_3)+
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
			div.innerHTML="<button onclick=Graphs.graph3b(true,'"+container+"')>Show table</button>"
		}
	}

	//per resi pop per year
	Graphs.graph3c=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Days()/365;

		//total kg 
		var ws_el = WS.ws_KPI_GHG_elec();
		var ws_ne = WS.ws_KPI_GHG_ne();
		var ww_el = WW.ww_KPI_GHG_elec();
		var ww_ne = WW.ww_KPI_GHG_ne();

		//per year per serv population
		var slice_1 = ws_el/years/WS.ws_resi_pop;
		var slice_2 = ws_ne/years/WS.ws_resi_pop;
		var slice_3 = ww_el/years/WW.ww_resi_pop;
		var slice_4 = ww_ne/years/WW.ww_resi_pop;

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', 
				'Electrical related (Water)', 
				'Non-electrical related (Water)', 
				'Electrical related (Wastewater)', 
				'Non-electrical related (Wastewater)', 
				{role:'annotation'} 
			],
			['Water'      , slice_1, slice_2, 0,       0,      ''],
			['Wastewater' , 0,       0,       slice_3, slice_4,''],
		]);

		//options
		var options={
			title:"GHG emissions (kg/resi.pop./year)",
			legend:{position:'right',maxLines:100},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			allowHtml:true,
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
			"<button onclick=Graphs.graph3c(false,'"+container+"')>Hide table</button>"+
			"<table >"+
				"<tr><th>Stage                  <th>Water                             <th>kg/resi.pop./year       <th>Wastewater                   <th>kg/resi.pop./year"+
				"<tr><th>Non electrical related <td>ws_KPI_GHG_ne  /ws_resi_pop/years <td>"+format(slice_2)+"<td>ww_KPI_GHG_elec/ws_resi_pop/years <td>"+format(slice_4)+
				"<tr><th>Electrical related     <td>ws_KPI_GHG_elec/ww_resi_pop/years <td>"+format(slice_1)+"<td>ww_KPI_GHG_ne  /ww_resi_pop/years <td>"+format(slice_3)+
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
			div.innerHTML="<button onclick=Graphs.graph3c(true,'"+container+"')>Show table</button>"
		}
	}

	//per AC and CW
	Graphs.graph3d=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;

		//total kg 
		var ws_el = WS.ws_KPI_GHG_elec();
		var ws_ne = WS.ws_KPI_GHG_ne();
		var ww_el = WW.ww_KPI_GHG_elec();
		var ww_ne = WW.ww_KPI_GHG_ne();

		//per AC and CW
		var slice_1  = ws_el/WS.ws_vol_auth;
		var slice_2  = ws_ne/WS.ws_vol_auth;
		var slice_3  = ww_el/WW.ww_vol_coll;
		var slice_4  = ww_ne/WW.ww_vol_coll;

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', 
				'Electrical related (Water)', 
				'Non-electrical related (Water)', 
				'Electrical related (Wastewater)', 
				'Non-electrical related (Wastewater)', 
				{role:'annotation'} 
			],
			['Water'      , slice_1, slice_2, 0,       0,      ''],
			['Wastewater' , 0,       0,       slice_3, slice_4,''],
		]);


		//options
		var options=
		{
			title:"GHG emissions (kg/m3)",
			legend:{position:'right',maxLines:100},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			allowHtml:true,
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
			"<button onclick=Graphs.graph3d(false,'"+container+"')>Hide table</button>"+
			"<table >"+
				"<tr><th>Stage                  <th>Water                       <th>kg/m3              <th>Wastewater                  <th>kg/m3"+
				"<tr><th>Non electrical related <td>ws_KPI_GHG_ne  /ws_vol_auth <td>"+format(slice_2)+"<td>ww_KPI_GHG_elec/ws_vol_auth <td>"+format(slice_4)+
				"<tr><th>Electrical related     <td>ws_KPI_GHG_elec/ww_vol_coll <td>"+format(slice_1)+"<td>ww_KPI_GHG_ne  /ww_vol_coll <td>"+format(slice_3)+
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
			div.innerHTML="<button onclick=Graphs.graph3d(true,'"+container+"')>Show table</button>"
		}
	}
// end bar graphs

//TODO
Graphs.graph4=function(withTable,container)
{
	//Pointers
	var ws = Global.Water;
	var ww = Global.Waste;
	var years = Global.General.Days()/365;

	//Values: 2 bars
	//bar 1
	var slice_1 = ws.ws_KPI_GHG_elec()/years;
	var slice_2 = ws.ws_KPI_GHG_ne()/years;
	//bar 2
	var slice_3 = ww.ww_KPI_GHG_elec()/years;
	var slice_4 = ww.ww_KPI_GHG_ne_ch4_wwt()/years;
	var slice_5 = ww.ww_KPI_GHG_ne_n2o_tre()/years;
	var slice_6 = ww.ww_KPI_GHG_ne_tsludge()/years;
	var slice_7 = ww.ww_KPI_GHG_ne_ch4_unt()/years;
	var slice_8 = ww.ww_KPI_GHG_ne_n2o_unt()/years;
	var slice_9 = ww.ww_KPI_GHG_ne_engines()/years;

	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage',                             'Emissions'],
		['From electricity (Water)',           slice_1],
		['From fuel engines (Water)',          slice_2],
		['From electricity (Wastewater)',      slice_3],
		['From CH4 from WWTP (Wastewater)',    slice_4],

		['From N2O treated (Wastewater)',      slice_5],
		['From sludge transport (Wastewater)', slice_6],
		['From CH4 untreated (Wastewater)',    slice_7],
		['From N2O untreated (Wastewater)',    slice_8],
		['From fuel engines (Wastewater)',     slice_9],
	]);

	//options
	var options= 
	{ 
		title:"Greenhouse gas emissions (kg/year)",
		slices:
		{
			0:{color:'#bca613' },
			1:{color:'#453f1c'},
			2:{color:'#89375c'},
			3:{color:'#b8879d'},
			4:{color:'#a15f7d'},
			5:{color:'#d0afbe'},
			6:{color:'#672945'},
			7:{color:'#451c2e'},
		},
		allowHtml:true,
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
			"<tr><th>Field                              <th>Variable              <th>Value (kgCO2/year)"+
			"<tr><td>From electricity (Water)           <td>ws_KPI_GHG_elec/years       <td>"+format(slice_1)+
			"<tr><td>From fuel engines (Water)          <td>ws_KPI_GHG_ne/years         <td>"+format(slice_2)+
			"<tr><td>From electricity (Wastewater)      <td>ww_KPI_GHG_elec/years       <td>"+format(slice_3)+
			"<tr><td>From CH4 from WWTP (Wastewater)    <td>ww_KPI_GHG_ne_ch4_wwt/years <td>"+format(slice_4)+
			"<tr><td>From N2O treated (Wastewater)      <td>ww_KPI_GHG_ne_n2o_tre/years <td>"+format(slice_5)+
			"<tr><td>From sludge transport (Wastewater) <td>ww_KPI_GHG_ne_tsludge/years <td>"+format(slice_6)+
			"<tr><td>From CH4 untreated (Wastewater)    <td>ww_KPI_GHG_ne_ch4_unt/years <td>"+format(slice_7)+
			"<tr><td>From N2O untreated (Wastewater)    <td>ww_KPI_GHG_ne_n2o_unt/years <td>"+format(slice_8)+
			"<tr><td>From fuel engines (Wastewater)     <td>ww_KPI_GHG_ne_engines/years <td>"+format(slice_9)+
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
		['Stage',                 'Emissions'],
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
		title:"Energy consumption (kWh)",
		slices:
		{
			0:{color:'#66cef5'},
			1:{color:'#0083b3'},
			2:{color:'#cceffc'},
			3:{color:'#b67800'},
			4:{color:'#f8c666'},
			5:{color:'#fad999'},
		},
		allowHtml:true,
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
			"<tr><th>Slice                 <th>Variable                                              <th>Value (kWh/m<sup>3</sup>)"+
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
		title:"Greenhouse gas emissions(TBD)",
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
		allowHtml:true,
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
			"<tr><th>Bar		   <th>From electricity            <th>Value                <th>Fuel used in engines     <th>Value  <th>Biogas <th>Value <th>Treated <th>Value <th>Untreated <th>Value <th>Sludge transport <th>Value"+
			"<tr><th>WS per capita <td>ws_KPI_GHG_elec/ws_resi_pop <td>"+format(slice_1 )+ "<td> <td>"+format(slice_2 )+
			"<tr><th>WW per capita <td>ww_KPI_GHG_elec/ww_resi_pop <td>"+format(slice_3 )+ "<td> <td>"+format(slice_4 )+"<td> <td>"+format(slice_5 )+"<td> <td>"+format(slice_6) +"<td> <td>"+format(slice_7) +"<td> <td>"+format(slice_8) +
			"<tr><th>WS per SP     <td>ws_KPI_GHG_elec/ws_serv_pop <td>"+format(slice_9 )+ "<td> <td>"+format(slice_10)+
			"<tr><th>WW per SP     <td>ww_KPI_GHG_elec/ww_serv_pop <td>"+format(slice_11)+ "<td> <td>"+format(slice_12)+"<td> <td>"+format(slice_12)+"<td> <td>"+format(slice_13)+"<td> <td>"+format(slice_14)+"<td> <td>"+format(slice_15)+
			"<tr><th>WS per AC     <td>ws_KPI_GHG_elec/ws_vol_auth <td>"+format(slice_17)+ "<td> <td>"+format(slice_18)+
			"<tr><th>WW per CW     <td>ww_KPI_GHG_elec/ww_vol_wwtr <td>"+format(slice_19)+ "<td> <td>"+format(slice_20)+"<td> <td>"+format(slice_21)+"<td> <td>"+format(slice_22)+"<td> <td>"+format(slice_23)+"<td> <td>"+format(slice_24)+
		"</table>";
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
		div.innerHTML="<button onclick=Graphs.graph6(true,'"+container+"')>Show table</button>"
	}
}

Graphs.graph7=function(withTable,container)
{
	//pointers to objects
	var wsa = Substages.Water.Abstraction
	var wst = Substages.Water.Treatment
	var wsd = Substages.Water.Distribution
	var wwc = Substages.Waste.Collection
	var wwt = Substages.Waste.Treatment
	var wwd = Substages.Waste.Discharge
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
			var title;
			switch(names[s])
			{
				case 'wsa_nrg_cons': title="Abst - ";break;
				case 'wst_nrg_cons': title="Trea - ";break;
				case 'wsd_nrg_cons': title="Dist - ";break;
				case 'wwc_nrg_cons': title="Coll - ";break;
				case 'wwt_nrg_cons': title="Trea - ";break;
				case 'wwd_nrg_cons': title="Disc - ";break;
				default:break;
			}
			DATA.push([ title+" S"+(parseInt(i)+1) +" ("+name+")", value])
		}
	}

	var data=google.visualization.arrayToDataTable(DATA);
	var options= 
	{ 
		pieHole:0.4,
		title:"Energy consumption per substage (kWh)",
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
		allowHtml:true,
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
	var slice_1 = Global.Water.Abstraction.wsa_vol_conv;
	var slice_2 = Global.Water.Treatment.wst_vol_trea;
	var slice_3 = Global.Water.Distribution.wsd_vol_dist;
	var slice_4 = Global.Water.Distribution.wsd_auth_con;
	var slice_5 = Global.Waste.Collection.wwc_vol_conv;
	var slice_6 = Global.Waste.Treatment.wwt_vol_trea;
	var slice_7 = Global.Waste.Discharge.wwd_vol_disc;

	var losses_1 = slice_1 - slice_2;
	var losses_2 = slice_2 - slice_3;
	var losses_3 = slice_3 - slice_4;
	var losses_4 = slice_4 - slice_5;
	var losses_5 = slice_5 - slice_6;
	var losses_6 = slice_6 - slice_7;
	var losses = losses_1 + losses_2 + losses_3 + losses_4 + losses_5 + losses_6;

	//data
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'From');
	data.addColumn('string', 'To');
	data.addColumn('number', 'Volume');
	data.addRows([
		['Abstraction', 	     'Water treatment', 	 slice_1 || 0.01 ],
		['Water treatment',	     'Distribution',         slice_2 || 0.01 ],
		['Water treatment',      'Losses1', losses_1 || 0.01 ],

		['Distribution', 	     'Users in',             slice_3 || 0.01 ],
		['Distribution', 	     'Losses2', losses_2 || 0.01 ],

		['Users in',             'Users out',            slice_4 || 0.01 ],
		['Users in', 	         'Losses3', losses_3 || 0.01 ],

		['Users out',	         'Collection',           slice_5 || 0.01 ],
		['Users out', 	         'Losses4', losses_4 || 0.01 ],

		['Collection',	         'Wastewater treatment', slice_6 || 0.01 ],
		['Collection', 	         'Losses5', losses_5 || 0.01 ],

		['Wastewater treatment', 'Discharge',            slice_7 || 0.01 ],
		['Wastewater treatment', 'Losses6', losses_6 || 0.01 ],

		['Losses1', 'Losses2', losses_1||0.01],
		['Losses2', 'Losses3', losses_1+losses_2||0.01],
		['Losses3', 'Losses4', losses_1+losses_2+losses_3||0.01],
		['Losses4', 'Losses5', losses_1+losses_2+losses_3+losses_4||0.01],
		['Losses5', 'Losses6', losses_1+losses_2+losses_3+losses_4+losses_5||0.01],
		['Losses6', 'Water Losses', losses||0.01],
	]);

	//options
	var colors=['#00aff1','#bf5050'];
	var options = 
	{
		sankey: 
		{
			iterations:32,
			node: {
				colors: colors,
				nodePadding:20,
			},
			link: {
				colorMode: 'gradient',
				colors: colors
			}
		},
		allowHtml:true,
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
			"<tr><th>Stage        <th>Variable                                              <th>Volume (m3)"+
			"<tr><td>Abstraction  <td><a href=variable.php?id=wsa_vol_conv>wsa_vol_conv</a> <td>"+slice_1+
			"<tr><td>Treatment    <td><a href=variable.php?id=wst_vol_trea>wst_vol_trea</a> <td>"+slice_2+
			"<tr><td>Distribution <td><a href=variable.php?id=wsd_vol_dist>wsd_vol_dist</a> <td>"+slice_3+
			"<tr><td>Consumption  <td><a href=variable.php?id=wsd_auth_con>wsd_auth_con</a> <td>"+slice_4+
			"<tr><td>Collection   <td><a href=variable.php?id=wwc_vol_conv>wwc_vol_conv</a> <td>"+slice_5+
			"<tr><td>Treatment    <td><a href=variable.php?id=wwt_vol_trea>wwt_vol_trea</a> <td>"+slice_6+
			"<tr><td>Discharge    <td><a href=variable.php?id=wwd_vol_disc>wwd_vol_disc</a> <td>"+slice_7+
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

