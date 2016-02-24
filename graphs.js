
var Graphs = {}

Graphs.graph1=function()
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

	console.log(google.visualization)

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage', 'Emissions'],
		["ws non electrical", wsNon],
		["ws electrical",     wsYes],
		["ww non electrical", wwNon],
		["ww electrical",     wwYes],
	]);

	var options= 
	{ 
		width:800,
		height:400,
		title:"L1 GHG",
		slices:
		{
			0:{ color: '#0aaeef' },
			1:{ color: '#bca613' },
			2:{ color: '#f3a000' },
			3:{ color: '#89375c' },
		},
	};
	var chart=new google.visualization.PieChart(document.getElementById('graph'));
	chart.draw(data,options);
	
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
	document.getElementById('graph').appendChild(div);
}

Graphs.graph2=function(){}
Graphs.graph3=function(){}
Graphs.graph4=function(){}
Graphs.graph5=function(){}
Graphs.graph6=function(){}
Graphs.graph7=function(){}
Graphs.sankey=function(){}
