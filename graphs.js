var Graphs = {}

Graphs.graph1=function(withTables)
{
	//pointers
	var ws = Global.Water;
	var ww = Global.Waste;
	var uw1 = Global.UWS.uw1;
	var Days = Global.General.Days();
	//values
	var wsNon=ws.c_ws51()*365/Days;
	var wsYes=ws.ws5*uw1*365/Days;
	var wwNon=(ww.c_ww57()+ww.c_ww55()+ww.c_ww53()+ww.c_ww51()+ww.c_ww52()+ww.c_ww54())*365/Days;
	var wwYes=ww.ww3*uw1*365/Days;

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage', 'Emissions'],
		["ws electrical",     wsYes],
		["ws non electrical", wsNon],
		["ww electrical",     wwYes],
		["ww non electrical", wwNon],
	]);

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
	};
	document.querySelector('#graph1').innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById('graph1'));
	chart.draw(data,options);
	
	if(withTables)
	{
		//create a table (as a string)
		var table=""+
		"<table>"+
			"<tr><th>Slice             <th>Formula                                              <th>Value (kgCO2/year)"+
			"<tr><td>ws non electrical <td>c_ws51*365/Days                                      <td>"+format(wsNon)+
			"<tr><td>ws     electrical <td>ws5*uw1*365/Days                                     <td>"+format(wsYes)+
			"<tr><td>ww non electrical <td>(c_ww57+c_ww55+c_ww53+c_ww51+c_ww52+c_ww54)*365/Days <td>"+format(wwNon)+
			"<tr><td>ww     electrical <td>ww3*uw1*365/Days                                     <td>"+format(wwYes)+
		"</table>";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById('graph1').appendChild(div);
	}
}

Graphs.graph2=function(withTables)
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
	document.querySelector('#graph2').innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById('graph2'));
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
		document.getElementById('graph2').appendChild(div);
	}
}

Graphs.graph3=function(withTables)
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
	var chart=new google.visualization.ColumnChart(document.getElementById("graph3"));
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
		document.getElementById('graph3').appendChild(div);
	}
}

Graphs.graph4=function(withTables){}
Graphs.graph5=function(withTables){}
Graphs.graph6=function(withTables){}
Graphs.graph7=function(withTables){}
Graphs.sankey=function(withTables){}
