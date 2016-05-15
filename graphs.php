<script>
var Graphs = {}

function scrollTo(id)
{
	document.querySelector('#'+id).scrollIntoView();
}

Graphs.graph1=function(withTable,container)
//GHG
{
	//pointers
	var years = Global.General.Years();

	//values: 4 combinations with electricity/non & water/waste
	var wsYes = Global.Water.ws_KPI_GHG_elec()/years;
	var wsNon = Global.Water.ws_KPI_GHG_ne()/years;
	var wwYes = Global.Waste.ww_KPI_GHG_elec()/years;
	var wwNon = Global.Waste.ww_KPI_GHG_ne()/years;

	//names
	var names = [
		"<?php echo '[';write('#Water');echo '] ';write('#ws_KPI_GHG_elec_descr')?>",
		"<?php echo '[';write('#Water');echo '] ';write('#ws_KPI_GHG_ne_descr')?>  ",
		"<?php echo '[';write('#Waste');echo '] ';write('#ww_KPI_GHG_elec_descr')?>",
		"<?php echo '[';write('#Waste');echo '] ';write('#ww_KPI_GHG_ne_descr')?>",
	];

	//array graph data
	var data=google.visualization.arrayToDataTable([
		['<?php write('#stage')?>','<?php write('#emissions')?>'],
		[names[0],wsYes],
		[names[1],wsNon],
		[names[2],wwYes],
		[names[3],wwNon],
	]);

	//options
	var options= 
	{ 
		height:400,
		legend:{position:'left'},
		title:"<?php write('#graphs_graph1')?>",
		slices:
		{
			0:{color:'#bca613' },
			1:{color:'#453f1c' },
			2:{color:'#89375c' },
			3:{color:'#f08080' },
		},
	}

	//empty the container element
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	var yy='<?php write('#years')?>'; //string

	//create a table string
	if(withTable)
	{
		var table=""+
		"<table title=graph1>"+
		"<button onclick=Graphs.graph1(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
			"<tr><th><?php write('#graphs_slice')?>    <th><?php write('#graphs_formula')?>                                  <th><?php write('#graphs_value')?>"+
			"<tr><td>"+names[0]+"<td><a href=variable.php?id=ws_KPI_GHG_elec>ws_KPI_GHG_elec</a>/"+yy+" <td>"+format(wsYes)+
			"<tr><td>"+names[1]+"<td><a href=variable.php?id=ws_KPI_GHG_ne>ws_KPI_GHG_ne</a>/"+yy+"     <td>"+format(wsNon)+
			"<tr><td>"+names[2]+"<td><a href=variable.php?id=ww_KPI_GHG_elec>ww_KPI_GHG_elec</a>/"+yy+" <td>"+format(wwYes)+
			"<tr><td>"+names[3]+"<td><a href=variable.php?id=ww_KPI_GHG_ne>ww_KPI_GHG_ne</a>/"+yy+"     <td>"+format(wwNon)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
		"	<a href='graph.php?g=graph1'><?php write('#graphs_go_to')?></a>"+
		'</div>'+
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
		div.innerHTML="<button onclick=Graphs.graph1(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
	}
}

Graphs.graph4=function(withTable,container)
//GHG detailed
{
	//Pointers
	var ws = Global.Water;
	var ww = Global.Waste;
	var years = Global.General.Years();

	//Values
	var slice_1 = ws.ws_KPI_GHG_elec()/years;
	var slice_2 = ws.ws_KPI_GHG_ne()/years;
	var slice_3 = ww.ww_KPI_GHG_elec()/years;
	var slice_4 = ww.ww_KPI_GHG_ne_ch4_wwt()/years;
	var slice_5 = ww.ww_KPI_GHG_ne_n2o_tre()/years;
	var slice_6 = ww.ww_KPI_GHG_ne_tsludge()/years;
	var slice_7 = ww.ww_KPI_GHG_ne_ch4_unt()/years;
	var slice_8 = ww.ww_KPI_GHG_ne_n2o_unt()/years;
	var slice_9 = ww.ww_KPI_GHG_ne_engines()/years;

	//names
	var names=[
		"[<?php write('#Water')?>] <?php write('#ws_KPI_GHG_elec_descr')?>",
		"[<?php write('#Water')?>] <?php write('#ws_KPI_GHG_ne_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_elec_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_ch4_wwt_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_n2o_tre_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_tsludge_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_ch4_unt_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_n2o_unt_descr')?>",
		"[<?php write('#Waste')?>] <?php write('#ww_KPI_GHG_ne_engines_descr')?>",
	]

	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage','Emissions'],
		[names[0],slice_1],
		[names[1],slice_2],
		[names[2],slice_3],
		[names[3],slice_4],
		[names[4],slice_5],
		[names[5],slice_6],
		[names[6],slice_7],
		[names[7],slice_8],
		[names[8],slice_9],
	]);

	//options
	var options= 
	{ 
		height:400,
		legend:{position:'left'},
		title:"<?php write('#graphs_graph4')?>",
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
	};

	//empty the container
	document.getElementById(container).innerHTML='';

	//draw
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	var yy='<?php write('#years')?>'; //string

	//tables
	if(withTable)
	{
		//create a table (as a string)
		var table=""+
		"<button onclick=Graphs.graph4(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
		"<table title=graph4>"+
			"<tr><th><?php write('#graphs_slice')?><th><?php write('#graphs_formula')?><th><?php write('#graphs_value')?>"+
			"<tr><td>"+names[0]+"<td>ws_KPI_GHG_elec/"+yy+"	      <td>"+format(slice_1)+
			"<tr><td>"+names[1]+"<td>ws_KPI_GHG_ne/"+yy+"	      <td>"+format(slice_2)+
			"<tr><td>"+names[2]+"<td>ww_KPI_GHG_elec/"+yy+"	      <td>"+format(slice_3)+
			"<tr><td>"+names[3]+"<td>ww_KPI_GHG_ne_ch4_wwt/"+yy+" <td>"+format(slice_4)+
			"<tr><td>"+names[4]+"<td>ww_KPI_GHG_ne_n2o_tre/"+yy+" <td>"+format(slice_5)+
			"<tr><td>"+names[5]+"<td>ww_KPI_GHG_ne_tsludge/"+yy+" <td>"+format(slice_6)+
			"<tr><td>"+names[6]+"<td>ww_KPI_GHG_ne_ch4_unt/"+yy+" <td>"+format(slice_7)+
			"<tr><td>"+names[7]+"<td>ww_KPI_GHG_ne_n2o_unt/"+yy+" <td>"+format(slice_8)+
			"<tr><td>"+names[8]+"<td>ww_KPI_GHG_ne_engines/"+yy+" <td>"+format(slice_9)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
		"	<a href='graph.php?g=graph4'><?php write('#graphs_go_to')?></a>"+
		'</div>'+
		"";
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
		div.innerHTML="<button onclick=Graphs.graph4(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
	}
}

Graphs.graph2=function(withTable,container)
//NRG
{
	//values
	var ws=Global.Water.ws_nrg_cons;
	var ww=Global.Waste.ww_nrg_cons;

	var names=[
		"<?php write('#Water')?>",
		"<?php write('#Waste')?>",
	]

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['<?php write('#stage')?>','<?php write('#emissions')?>'],
		[names[0], ws],
		[names[1], ww],
	]);

	//options
	var options= 
	{ 
		height:400,
		legend:{position:'left'},
		pieHole:0.4,
		title:"<?php write('#graphs_graph2')?>",
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
		"<button onclick=Graphs.graph2(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
		"<table title=graph2>"+
			"<tr><th><?php write('#graphs_slice')?><th><?php write('#graphs_formula')?><th><?php write('#graphs_value')?>"+
			"<tr><td>"+names[0]+"<td><a href=variable.php?id=ws_nrg_cons>ws_nrg_cons</a><td>"+format(ws)+
			"<tr><td>"+names[1]+"<td><a href=variable.php?id=ww_nrg_cons>ww_nrg_cons</a><td>"+format(ww)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
		"	<a href='graph.php?g=graph2'><?php write('#graphs_go_to')?></a>"+
		'</div>'+
		"";
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
		div.innerHTML="<button onclick=Graphs.graph2(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
	}
}

Graphs.graph5=function(withTable,container)
//NRG detailed
{
	//values
	var slice_1 = Global.Water.Abstraction.wsa_nrg_cons;
	var slice_2 = Global.Water.Treatment.wst_nrg_cons;
	var slice_3 = Global.Water.Distribution.wsd_nrg_cons;
	var slice_4 = Global.Waste.Collection.wwc_nrg_cons;
	var slice_5 = Global.Waste.Treatment.wwt_nrg_cons;
	var slice_6 = Global.Waste.Discharge.wwd_nrg_cons;

	var names=[
		"[<?php write('#Water')?>] <?php write('#Abstraction')?>",
		"[<?php write('#Water')?>] <?php write('#Treatment')?>",
		"[<?php write('#Water')?>] <?php write('#Distribution')?>",
		"[<?php write('#Waste')?>] <?php write('#Collection')?>",
		"[<?php write('#Waste')?>] <?php write('#Treatment')?>",
		"[<?php write('#Waste')?>] <?php write('#Discharge')?>",
	]

	//actual graph data
	var data=google.visualization.arrayToDataTable
	([
		['Stage','Emissions'],
		[names[0],slice_1],
		[names[1],slice_2],
		[names[2],slice_3],
		[names[3],slice_4],
		[names[4],slice_5],
		[names[5],slice_6],
	]);

	//options
	var options= 
	{ 
		height:400,
		legend:{position:'left'},
		pieHole:0.3,
		title:"<?php write('#graphs_graph5')?>",
		slices:
		{
			0:{color:'#66cef5'},
			1:{color:'#0083b3'},
			2:{color:'#cceffc'},
			3:{color:'#b67800'},
			4:{color:'#f8c666'},
			5:{color:'#fad999'},
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
		"<button onclick=\"Graphs.graph5(false,'"+container+"');scrollTo('"+container+"')\"><?php write('#graphs_hide_table')?></button>"+
		"<table title=graph5>"+
			"<tr><th><?php write('#graphs_slice')?><th><?php write('#graphs_formula')?><th><?php write('#graphs_value')?>"+
			"<tr><td>"+names[0]+"<td><a href=variable.php?id=wsa_nrg_cons>wsa_nrg_cons</a> <td>"+format(slice_1)+
			"<tr><td>"+names[1]+"<td><a href=variable.php?id=wst_nrg_cons>wst_nrg_cons</a> <td>"+format(slice_2)+
			"<tr><td>"+names[2]+"<td><a href=variable.php?id=wsd_nrg_cons>wsd_nrg_cons</a> <td>"+format(slice_3)+
			"<tr><td>"+names[3]+"<td><a href=variable.php?id=wwc_nrg_cons>wwc_nrg_cons</a> <td>"+format(slice_4)+
			"<tr><td>"+names[4]+"<td><a href=variable.php?id=wwt_nrg_cons>wwt_nrg_cons</a> <td>"+format(slice_5)+
			"<tr><td>"+names[5]+"<td><a href=variable.php?id=wwd_nrg_cons>wwd_nrg_cons</a> <td>"+format(slice_6)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
		"	<a href='graph.php?g=graph5'><?php write('#graphs_go_to')?></a>"+
		'</div>'+
		"";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=\"Graphs.graph5(true,'"+container+"');scrollTo('"+container+"')\"><?php write('#graphs_show_table')?></button>"+
			"<button onclick=\"Graphs.graph7(false,'"+container+"');scrollTo('"+container+"')\"><?php write('#substages')?></button>";
	}
}

Graphs.graph7=function(withTable,container)
//NRG detailed substages
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
		var title;
		switch(names[s])
		{
			case 'wsa_nrg_cons': title="<?php write('#Abstraction')?>";break;
			case 'wst_nrg_cons': title="<?php write('#Treatment')?>";break;
			case 'wsd_nrg_cons': title="<?php write('#Distribution')?>";break;
			case 'wwc_nrg_cons': title="<?php write('#Collection')?>";break;
			case 'wwt_nrg_cons': title="<?php write('#Treatment')?>";break;
			case 'wwd_nrg_cons': title="<?php write('#Discharge')?>";break;
			default:break;
		}
		//special case: if there are zero substages:
		if(stages[s].length==0)
		{
			var loc = locateVariable(names[s]);
			var value = Global[loc.level][loc.sublevel][names[s]]
			DATA.push([title,value])
		}
		//go over substages
		for(var i in stages[s])
		{
			var name = stages[s][i].name;
			var value = stages[s][i][names[s]];
			DATA.push([ title+" "+(parseInt(i)+1) +" ("+name+")", value])
		}
	}

	var data=google.visualization.arrayToDataTable(DATA);
	var options= 
	{ 
		height:400,
		legend:{position:'left'},
		pieHole:0.3,
		title:"<?php write('#graphs_graph7')?>",
		slices:{},
	};
	var colors = [ '#66cef5', '#0083b3', '#cceffc', '#b67800', '#f8c666', '#fad999' ];
	var current_slice = 0;
	for(var s in stages)
	{
		if(stages[s].length==0)
		{
			options.slices[current_slice++]={color:colors[s],offset:0.1}
			continue;
		}
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
		var table=""+
		"<table title=graph7>"+
		"<button onclick=\"Graphs.graph7(false,'"+container+"');scrollTo('"+container+"')\"><?php write('#graphs_hide_table')?></button>"+
		"<tr><th><?php write('#graphs_slice')?><th><?php write('#graphs_formula')?><th colspan=30>kWh <?php write('#substages')?>";
			for(var s in stages)
			{
				var title;
				switch(names[s])
				{
					case 'wsa_nrg_cons': title="<?php write('#Abstraction')?>";break;
					case 'wst_nrg_cons': title="<?php write('#Treatment')?>";break;
					case 'wsd_nrg_cons': title="<?php write('#Distribution')?>";break;
					case 'wwc_nrg_cons': title="<?php write('#Collection')?>";break;
					case 'wwt_nrg_cons': title="<?php write('#Treatment')?>";break;
					case 'wwd_nrg_cons': title="<?php write('#Discharge')?>";break;
					default:break;
				}
				table+=""+
					"<tr><td>"+title+
					"<td><a href=variable.php?id="+names[s]+">"+names[s]+"</a>";
				for(var i in stages[s])
					table+="<td>"+stages[s][i][names[s]];
			}
		table+="</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
		"	<a href='graph.php?g=graph7'><?php write('#graphs_go_to')?></a>"+
		'</div>'+
		"";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	else
	{
		//button "show table"
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.innerHTML="<button onclick=\"Graphs.graph7(true,'"+container+"');scrollTo('"+container+"')\"><?php write('#graphs_show_table')?></button>"+
			"<button onclick=\"Graphs.graph5(false,'"+container+"');scrollTo('"+container+"')\"><?php write('#substages')?></button>";
	}
}

//BAR GRAPHS
//graphs 3{a,b,c,d}
	//per year
	Graphs.graph3a=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Years();

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

		var names=[
			"<?php write('#ws_KPI_GHG_elec_descr')?>",
			"<?php write('#ws_KPI_GHG_ne_descr')?>",
			"<?php write('#ww_KPI_GHG_elec_descr')?>",
			"<?php write('#ww_KPI_GHG_ne_descr')?>",
		]

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', names[0], names[1], names[2], names[3], 
				{role:'annotation'} 
			],
			['<?php write('#Water')?>',slice_1,slice_2,0,0,''],
			['<?php write('#Waste')?>',0,0,slice_3,slice_4,''],
		]);

		//options
		var options=
		{
			title:"kg CO2/year",
			height:400,
			legend:{position:'top'},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			bar: { groupWidth: '75' },
		};

		//empty container element
		document.getElementById(container).innerHTML='';

		//draw
		var view=new google.visualization.DataView(data);
		var chart=new google.visualization.ColumnChart(document.getElementById(container));
		chart.draw(view, options);

		var yy='<?php write('#years')?>';

		//tables
		if(withTable)
		{
			//create a table string
			var table=""+
			"<button onclick=Graphs.graph3a(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
			"<table title=graph3a>"+
				"<tr><th><?php write('#graphs_slice')?><th><?php write('#Water')?><th>kg CO2/<?php write('#year')?><th><?php write('#Waste')?><th>kg CO2/<?php write('#year')?>"+
				"<tr><th><?php write('#ww_KPI_GHG_ne_descr')?><td>ws_KPI_GHG_ne/"+yy+"<td>"+format(slice_2)+"<td>ww_KPI_GHG_ne/"+yy+" <td>"+format(slice_4)+
				"<tr><th><?php write('#ww_KPI_GHG_elec_descr')?><td>ws_KPI_GHG_elec/"+yy+" <td>"+format(slice_1)+"<td>ww_KPI_GHG_elec/"+yy+" <td>"+format(slice_3)+
			"</table>"+
			'<div class=options>'+
			'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
			"	<a href='graph.php?g=graph3a'><?php write('#graphs_go_to')?></a>"+
			'</div>'+
			"";
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
			div.innerHTML="<button onclick=Graphs.graph3a(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
		}
	}

	//per serv pop per year
	Graphs.graph3b=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Years();

		//total kg 
		var ws_el = WS.ws_KPI_GHG_elec();
		var ws_ne = WS.ws_KPI_GHG_ne();
		var ww_el = WW.ww_KPI_GHG_elec();
		var ww_ne = WW.ww_KPI_GHG_ne() - WW.ww_KPI_GHG_ne_ch4_unt() - WW.ww_KPI_GHG_ne_n2o_unt();

		//per year per serv population
		var slice_1 = ws_el/years/WS.ws_serv_pop;
		var slice_2 = ws_ne/years/WS.ws_serv_pop;
		var slice_3 = ww_el/years/WW.ww_serv_pop;
		var slice_4 = ww_ne/years/WW.ww_serv_pop;

		var names = [
			"<?php write('#ws_KPI_GHG_elec_descr')?>",
			"<?php write('#ws_KPI_GHG_ne_descr')?>",
			"<?php write('#ww_KPI_GHG_elec_descr')?>",
			"<?php write('#ww_KPI_GHG_ne_descr')?>",
		]

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', 
				names[0], names[1], names[2], names[3], {role:'annotation'} 
			],
			['<?php write('#Water')?>', slice_1, slice_2,       0,       0,''],
			['<?php write('#Waste')?>',       0,       0, slice_3, slice_4,''],
		]);

		//options
		var options=
		{
			title:"kg CO2/year per serviced population",
			height:400,
			legend:{position:'top'},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			bar: { groupWidth: '75' },
		};

		//empty container element
		document.getElementById(container).innerHTML='';

		//draw
		var view=new google.visualization.DataView(data);
		var chart=new google.visualization.ColumnChart(document.getElementById(container));
		chart.draw(view, options);

		var yy='<?php write('#years')?>';

		//tables
		if(withTable)
		{
			//create a table string
			var table=""+
			"<button onclick=Graphs.graph3b(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
			"<table title=graph3b>"+
				"<tr><th><?php write('#graphs_slice')?><th><?php write('#Water')?><th>kg CO2/serv.pop./"+yy+"  <th><?php write('#Waste')?><th>kg CO2/serv.pop./"+yy+""+
				"<tr><th><?php write('#ww_KPI_GHG_ne_descr')?><td>ws_KPI_GHG_ne/ws_serv_pop/"+yy+" <td>"+format(slice_2)+"<td>(ww_KPI_GHG_ne-ww_KPI_GHG_ch4_unt-ww_KPI_GHG_n2o_unt)/ws_serv_pop/"+yy+" <td>"+format(slice_4)+
				"<tr><th><?php write('#ww_KPI_GHG_elec_descr')?><td>ws_KPI_GHG_elec/ww_serv_pop/"+yy+" <td>"+format(slice_1)+"<td>ww_KPI_GHG_elec/ww_serv_pop/"+yy+"                                       <td>"+format(slice_3)+
			"</table>"+
			'<div class=options>'+
			'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
			"	<a href='graph.php?g=graph3b'><?php write('#graphs_go_to')?></a>"+
			'</div>'+
			"";
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
			div.innerHTML="<button onclick=Graphs.graph3b(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
		}
	}

	//per resi pop per year
	Graphs.graph3c=function(withTable,container)
	{
		//pointers
		var WS = Global.Water;
		var WW = Global.Waste;
		var years = Global.General.Years();

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

		var names=[
			"<?php write('#ws_KPI_GHG_elec_descr')?>",
			"<?php write('#ws_KPI_GHG_ne_descr')?>",
			"<?php write('#ww_KPI_GHG_elec_descr')?>",
			"<?php write('#ww_KPI_GHG_ne_descr')?>",
		]

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', names[0], names[1], names[2], names[3], {role:'annotation'} 
			],
			['<?php write('#Water')?>', slice_1, slice_2, 0,       0,      ''],
			['<?php write('#Waste')?>', 0,       0,       slice_3, slice_4,''],
		]);

		//options
		var options=
		{
			title:"kg CO2/year per resident population",
			height:400,
			legend:{position:'top'},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			bar: { groupWidth: '75' },
		};

		//empty container element
		document.getElementById(container).innerHTML='';

		//draw
		var view=new google.visualization.DataView(data);
		var chart=new google.visualization.ColumnChart(document.getElementById(container));
		chart.draw(view, options);

		var yy='<?php write('#years')?>';

		//tables
		if(withTable)
		{
			//create a table string
			var table=""+
			"<button onclick=Graphs.graph3c(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
			"<table title=graph3c>"+
				"<tr><th><?php write('#graphs_slice')?><th><?php write('#Water')?><th>kg CO2/resi.pop./"+yy+" <th><?php write('#Waste')?><th>kg CO2/resi.pop./"+yy+""+
				"<tr><th><?php write('#ww_KPI_GHG_ne_descr')?>  <td>ws_KPI_GHG_ne/ws_resi_pop/"+yy+"   <td>"+format(slice_2)+"<td>ww_KPI_GHG_ne/ws_resi_pop/"+yy+"   <td>"+format(slice_4)+
				"<tr><th><?php write('#ww_KPI_GHG_elec_descr')?><td>ws_KPI_GHG_elec/ww_resi_pop/"+yy+" <td>"+format(slice_1)+"<td>ww_KPI_GHG_elec/ww_resi_pop/"+yy+" <td>"+format(slice_3)+
			"</table>"+
			'<div class=options>'+
			'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
			"	<a href='graph.php?g=graph3c'><?php write('#graphs_go_to')?></a>"+
			'</div>'+
			"";
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
			div.innerHTML="<button onclick=Graphs.graph3c(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
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
		var ww_ne = WW.ww_KPI_GHG_ne() - WW.ww_KPI_GHG_ne_ch4_unt() - WW.ww_KPI_GHG_ne_n2o_unt();

		//per AC and CW
		var slice_1  = ws_el/WS.ws_vol_auth;
		var slice_2  = ws_ne/WS.ws_vol_auth;
		var slice_3  = ww_el/WW.ww_vol_coll;
		var slice_4  = ww_ne/WW.ww_vol_coll;

		var names=[
			"<?php write('#ws_KPI_GHG_elec_descr')?>",
			"<?php write('#ws_KPI_GHG_ne_descr')?>",
			"<?php write('#ww_KPI_GHG_elec_descr')?>",
			"<?php write('#ww_KPI_GHG_ne_descr')?>",
		]

		//data
		var data=google.visualization.arrayToDataTable
		([
			[ 
				'Emission type', names[0], names[1], names[2], names[3], {role:'annotation'} 
			],
			['<?php write('#Water')?>', slice_1, slice_2, 0,       0,      ''],
			['<?php write('#Waste')?>', 0,       0,       slice_3, slice_4,''],
		]);

		//options
		var options=
		{
			title:"kg CO2 per m3",
			height:400,
			legend:{position:'top'},
			isStacked:true,
			colors: ['#bca613','#453f1c', '#89375c', '#f08080'],
			bar: { groupWidth: '75' },
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
			"<button onclick=Graphs.graph3d(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
			"<table title=graph3d>"+
				"<tr><th><?php write('#graphs_slice')?><th><?php write('#Water')?><th>kg CO2/m3<th><?php write('#Waste')?><th>kg CO2/m3"+
				"<tr><th><?php write('#ww_KPI_GHG_ne_descr')?>  <td>ws_KPI_GHG_ne/ws_vol_auth   <td>"+format(slice_2)+"<td>(ww_KPI_GHG_ne-ww_KPI_GHG_ch4_unt-ww_KPI_GHG_n2o_unt)/ws_vol_coll <td>"+format(slice_4)+
				"<tr><th><?php write('#ww_KPI_GHG_elec_descr')?><td>ws_KPI_GHG_elec/ww_vol_auth <td>"+format(slice_1)+"<td>ww_KPI_GHG_elec/ww_vol_coll                                       <td>"+format(slice_3)+
			"</table>"+
			'<div class=options>'+
			'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable><?php write('#graphs_printable_version')?></a> | '+
			"	<a href='graph.php?g=graph3d'><?php write('#graphs_go_to')?></a>"+
			'</div>'+
			"";
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
			div.innerHTML="<button onclick=Graphs.graph3d(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
		}
	}
//end bar graphs

Graphs.sankey=function(withTable,container)
//Water volumes
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
		legend:{position:'left'},
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
		"<button onclick=Graphs.sankey(false,'"+container+"')><?php write('#graphs_hide_table')?></button>"+
		"<table title=sankey>"+
			"<tr><th>Stage        <th>Variable                                              <th>Volume (m3)"+
			"<tr><td>Abstraction  <td><a href=variable.php?id=wsa_vol_conv>wsa_vol_conv</a> <td>"+slice_1+
			"<tr><td>Treatment    <td><a href=variable.php?id=wst_vol_trea>wst_vol_trea</a> <td>"+slice_2+
			"<tr><td>Distribution <td><a href=variable.php?id=wsd_vol_dist>wsd_vol_dist</a> <td>"+slice_3+
			"<tr><td>Consumption  <td><a href=variable.php?id=wsd_auth_con>wsd_auth_con</a> <td>"+slice_4+
			"<tr><td>Collection   <td><a href=variable.php?id=wwc_vol_conv>wwc_vol_conv</a> <td>"+slice_5+
			"<tr><td>Treatment    <td><a href=variable.php?id=wwt_vol_trea>wwt_vol_trea</a> <td>"+slice_6+
			"<tr><td>Discharge    <td><a href=variable.php?id=wwd_vol_disc>wwd_vol_disc</a> <td>"+slice_7+
		"</table>"+
		'Printable version not available for Sankey diagram'+
		"";
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
		div.innerHTML="<button onclick=Graphs.sankey(true,'"+container+"')><?php write('#graphs_show_table')?></button>"
	}
}
</script>
