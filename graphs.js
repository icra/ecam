var Graphs={};

//utils
function scrollToItem(id) {
	//http://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
	var element = document.getElementById(id);
	//get position
	var rect=element.getBoundingClientRect();
	//get screen visibility
	var visible_area_start = window.pageYOffset;
	var visible_area_end = visible_area_start + window.innerHeight;
	//scroll if element is not in view
	if(rect.top < visible_area_start || rect.bottom > visible_area_end) {
		element.scrollIntoView()
	}
}
//delete html subscript tag
function replaceTags(str){
	str=str.replace(/<\/{0,1}sub>/g,'')
	return str;
}

//GHG 'By system'
Graphs.graph1=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	//emissions
	var ws=Global.Water.ws_KPI_GHG()
	var ww=Global.Waste.ww_KPI_GHG()

	//names
	var names = [ translate('ws_KPI_GHG_descr') , translate('ww_KPI_GHG_descr') ];

	//array graph data
	var data=google.visualization.arrayToDataTable([
		[ translate('stage'), translate('emissions')],
		[names[0],ws],
		[names[1],ww],
	]);

	//options
	var options={
		height:250,
		legend:{position:'left'},
		title:translate("ghg_emissions_by_system")+" ("+format(ws+ww)+" kg CO2e)",
		slices:{
			0:{color:'#00aff1'},
			1:{color:'#d71d24'},
		},
	}

	//empty the container element
	var con=document.getElementById(container)
	con.innerHTML='';

	//double click
	con.ondblclick=function(){
		var a=document.createElement('a');
		document.body.appendChild(a);
		a.href=chart.getImageURI();
		a.download="image.png";
		a.click();
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
			"<input type=checkbox "+checked+" onclick=Graphs.graph1("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
			"<button class=left onclick=Graphs.graph1("+withTable.toString()+",'"+container+"') disabled>"+translate('system')+"</button>"+
			"<button class=middle onclick=Graphs.ghg_by_source("+withTable.toString()+",'"+container+"')>"+translate('source')+"</button>"+
			"<button class=middle onclick=Graphs.ghgSources("+withTable.toString()+",'"+container+"')>"+translate('source_detailed')+"</button>"+
			"<button class=right  onclick=Graphs.unfccc("+withTable.toString()+",'"+container+"')>"+translate('unfccc_categories')+"</button>"+
		"";
	})();

	//create a table string
	if(withTable) {
		var table=""+
		"<table title=graph1>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('Code')+"<th>"+translate('graphs_value')+" (kg CO2)"+
			"<tr><td align=left>"+names[0]+"<td align=left><a href=variable.php?id=ws_KPI_GHG>ws_KPI_GHG</a><td align=right>"+format(ws)+
			"<tr><td align=left>"+names[1]+"<td align=left><a href=variable.php?id=ww_KPI_GHG>ww_KPI_GHG</a><td align=right>"+format(ww)+
		"</table>"+
		"";

		var div=document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

//GHG 'By source' (non-detailed: elec,co2,n2o,ch4)
Graphs.ghg_by_source=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	var elec = 0+
		Global.Water.Abstraction.wsa_KPI_GHG_elec()+
		Global.Water.Treatment.wst_KPI_GHG_elec()+
		Global.Water.Distribution.wsd_KPI_GHG_elec()+
		Global.Waste.Collection.wwc_KPI_GHG_elec()+
		Global.Waste.Treatment.wwt_KPI_GHG_elec()+
		Global.Waste.Discharge.wwd_KPI_GHG_elec()+
	0;
	var co2 = 0+
		Global.Water.Abstraction.wsa_KPI_GHG_fuel_co2()+
		Global.Water.Treatment.wst_KPI_GHG_fuel_co2()+
		Global.Water.Distribution.wsd_KPI_GHG_fuel_co2()+
		Global.Waste.Collection.wwc_KPI_GHG_fuel_co2()+
		Global.Waste.Treatment.wwt_KPI_GHG_fuel_co2()+
		Global.Waste.Discharge.wwd_KPI_GHG_fuel_co2()+

		Global.Water.Distribution.wsd_KPI_GHG_trck_co2()+
		Global.Waste.Discharge.wwd_KPI_GHG_trck_co2()+

		Global.Waste.Treatment.wwt_KPI_ghg_tsludge_co2()+
		Global.Waste.Treatment.wwt_KPI_GHG_dig_fuel_co2()+

		Global.Waste.Treatment.wwt_KPI_ghg_stock_co2eq()+
	0;

	var n2o = 0+
		Global.Water.Abstraction.wsa_KPI_GHG_fuel_n2o()+
		Global.Water.Treatment.wst_KPI_GHG_fuel_n2o()+
		Global.Water.Distribution.wsd_KPI_GHG_fuel_n2o()+
		Global.Waste.Collection.wwc_KPI_GHG_fuel_n2o()+
		Global.Waste.Treatment.wwt_KPI_GHG_fuel_n2o()+
		Global.Waste.Discharge.wwd_KPI_GHG_fuel_n2o()+

		Global.Water.Distribution.wsd_KPI_GHG_trck_n2o()+
		Global.Waste.Discharge.wwd_KPI_GHG_trck_n2o()+

		Global.Waste.Treatment.wwt_KPI_ghg_tsludge_n2o()+
		Global.Waste.Treatment.wwt_KPI_GHG_dig_fuel_n2o()+

		Global.Waste.ww_KPI_GHG_unt_n2o()+

		Global.Waste.Treatment.wwt_KPI_GHG_tre_n2o()+

		Global.Waste.Treatment.wwt_slu_composting_n2o()+
		Global.Waste.Treatment.wwt_slu_inciner_n2o()+
		Global.Waste.Treatment.wwt_slu_landapp_n2o()+
		Global.Waste.Treatment.wwt_slu_landfill_n2o()+

		Global.Waste.Discharge.wwd_KPI_GHG_tre_n2o()+
	0;
	var ch4 = 0+
		Global.Water.Abstraction.wsa_KPI_GHG_fuel_ch4()+
		Global.Water.Treatment.wst_KPI_GHG_fuel_ch4()+
		Global.Water.Distribution.wsd_KPI_GHG_fuel_ch4()+
		Global.Waste.Collection.wwc_KPI_GHG_fuel_ch4()+
		Global.Waste.Treatment.wwt_KPI_GHG_fuel_ch4()+
		Global.Waste.Discharge.wwd_KPI_GHG_fuel_ch4()+

		Global.Water.Distribution.wsd_KPI_GHG_trck_ch4()+
		Global.Waste.Discharge.wwd_KPI_GHG_trck_ch4()+

		Global.Waste.Treatment.wwt_KPI_ghg_tsludge_ch4()+
		Global.Waste.Treatment.wwt_KPI_GHG_dig_fuel_ch4()+

		Global.Waste.ww_KPI_GHG_unt_ch4()+

		Global.Waste.Treatment.wwt_KPI_GHG_tre_ch4()+

		Global.Waste.Treatment.wwt_KPI_GHG_biog()+

		Global.Waste.Treatment.wwt_slu_storage_ch4()+
		Global.Waste.Treatment.wwt_slu_composting_ch4()+
		Global.Waste.Treatment.wwt_slu_inciner_ch4()+
		Global.Waste.Treatment.wwt_slu_landfill_ch4()+
	0;

	//data
	var DATA=[
		['variable','emission'],
		['Electricity',elec],
		['CO2',co2],
		['N2O',n2o],
		['CH4',ch4],
	];

	//array graph data
	var data=google.visualization.arrayToDataTable(DATA);

	//options
	var options={
		height:250,
		legend:{position:'left'},
		title:translate("ghg_emissions_by_source")+" ("+format(Global.General.TotalGHG())+" kg CO2e)",
	}

	//empty the container element
	var con=document.getElementById(container);
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
      "<input type=checkbox "+checked+" onclick=Graphs.ghg_by_source("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
			"<button class=left onclick=Graphs.graph1("+withTable.toString()+",'"+container+"')>"+translate('system')+"</button>"+
			"<button class=middle onclick=Graphs.ghg_by_source("+withTable.toString()+",'"+container+"') disabled>"+translate('source')+"</button>"+
			"<button class=middle onclick=Graphs.ghgSources("+withTable.toString()+",'"+container+"')>"+translate('source_detailed')+"</button>"+
			"<button class=right  onclick=Graphs.unfccc("+withTable.toString()+",'"+container+"')>"+translate('unfccc_categories')+"</button>"+
		"";
	})();

	//create a table string
	if(withTable) {
		var table=""+
		"<table title=ghg_by_source>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('graphs_value')+" (kg CO2)"+
			"<tr><td align=left>Electricity   <td align=right>"+format(elec)+
			"<tr><td align=left>CO<sub>2</sub><td align=right>"+format(co2)+
			"<tr><td align=left>N<sub>2</sub>O<td align=right>"+format(n2o)+
			"<tr><td align=left>CH<sub>4</sub><td align=right>"+format(ch4)+
		"</table>"+
		"";

		var div=document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

//GHG 'By source (detailed)'
Graphs.ghgSources=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	/*
		sources: 
			elecWS, elecWW, fuel, fuel trucks, sludge wst, 
			ch4_unt, n2o_unt, ch4_tre, n2o_tre, biogas 
	*/
	var elecWS=(function(){
		return 0+
			Global.Water.Abstraction.wsa_KPI_GHG_elec()+
			Global.Water.Treatment.wst_KPI_GHG_elec()+
			Global.Water.Distribution.wsd_KPI_GHG_elec();
	})();
	var elecWW=(function(){
		return 0+
			Global.Waste.Collection.wwc_KPI_GHG_elec()+
			Global.Waste.Treatment.wwt_KPI_GHG_elec()+
			Global.Waste.Discharge.wwd_KPI_GHG_elec();
	})();
	var fuel=(function(){
		return 0+
			 Global.Water.Abstraction.wsa_KPI_GHG_fuel()+
				 Global.Water.Treatment.wst_KPI_GHG_fuel()+
			Global.Water.Distribution.wsd_KPI_GHG_fuel()+
				Global.Waste.Collection.wwc_KPI_GHG_fuel()+
				 Global.Waste.Treatment.wwt_KPI_GHG_fuel()+
				 Global.Waste.Discharge.wwd_KPI_GHG_fuel();
	})();
	var trck=(function(){
		return 0+
			Global.Water.Distribution.wsd_KPI_GHG_trck()+
				 Global.Waste.Discharge.wwd_KPI_GHG_trck();
	})();
	var ch4u=Global.Waste.ww_KPI_GHG_unt_ch4();
	var n2ou=Global.Waste.ww_KPI_GHG_unt_n2o();
	var ch4t=Global.Waste.Treatment.wwt_KPI_GHG_tre_ch4();
	var n2ot=Global.Waste.Treatment.wwt_KPI_GHG_tre_n2o();
	var biog=Global.Waste.Treatment.wwt_KPI_GHG_biog();
	var slud=Global.Waste.Treatment.wwt_KPI_GHG_slu();
	var digf=Global.Waste.Treatment.wwt_KPI_GHG_dig_fuel();
	var n2od=Global.Waste.Discharge.wwd_KPI_GHG_tre_n2o();

	//names
	var names = [
		"Electricity WS",
		"Electricity WW",
		"Fuel engines",
		"Truck transport",
		""+translate('ww_KPI_GHG_unt_ch4_descr'),
		""+translate('ww_KPI_GHG_unt_n2o_descr'),
		""+translate('wwt_KPI_GHG_tre_ch4_descr'),
		""+translate('wwt_KPI_GHG_tre_n2o_descr'),
		""+translate('wwt_KPI_GHG_biog_descr'),
		""+translate('wwt_KPI_GHG_slu_descr'),
		""+translate('wwt_KPI_GHG_dig_fuel_descr'),
		""+translate('wwd_KPI_GHG_tre_n2o_descr'),
	];

	//array graph data
	var data=google.visualization.arrayToDataTable([
		["Source",translate('emissions')],
		[replaceTags(names[0] ),elecWS],
		[replaceTags(names[1] ),elecWW],
		[replaceTags(names[2] ),fuel],
		[replaceTags(names[3] ),trck],
		[replaceTags(names[4] ),ch4u],
		[replaceTags(names[5] ),n2ou],
		[replaceTags(names[6] ),ch4t],
		[replaceTags(names[7] ),n2ot],
		[replaceTags(names[8] ),biog],
		[replaceTags(names[9] ),slud],
		[replaceTags(names[10]),digf],
		[replaceTags(names[11]),n2od],
	]);

	//options
	var options= 
	{ 
		height:250,
		legend:{position:'left'},
		title:translate('ghg_emissions_by_source_detailed')+" ("+format(Global.General.TotalGHG())+" kg CO2e)",
		slices:
		{
			/*
			0:{color:'#00aff1' },
			1:{color:'#d71d24' },
			*/
		},
	}

	//empty the container element
	var con = document.getElementById(container)
	con.innerHTML='';

	//double click
	con.ondblclick=function(){
		var a=document.createElement('a');
		document.body.appendChild(a);
		a.href=chart.getImageURI();
		a.download="image.png";
		a.click();
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
      "<input type=checkbox "+checked+" onclick=Graphs.ghgSources("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
			"<button class=left onclick=Graphs.graph1("+withTable.toString()+",'"+container+"')>"+translate('system')+"</button>"+
			"<button class=middle onclick=Graphs.ghg_by_source("+withTable.toString()+",'"+container+"')>"+translate('source')+"</button>"+
			"<button class=middle onclick=Graphs.ghgSources("+withTable.toString()+",'"+container+"') disabled>"+translate('source_detailed')+"</button>"+
			"<button class=right  onclick=Graphs.unfccc("+withTable.toString()+",'"+container+"')>"+translate('unfccc_categories')+"</button>"+
		"";
	})();

	var elecWS_formula = ""+
		"<a href=variable.php?id=wsa_KPI_GHG_elec>wsa_KPI_GHG_elec</a> + <br>"+
		"<a href=variable.php?id=wst_KPI_GHG_elec>wst_KPI_GHG_elec</a> + <br>"+
		"<a href=variable.php?id=wsd_KPI_GHG_elec>wsd_KPI_GHG_elec</a>"+
	"";
	var elecWW_formula = ""+
		"<a href=variable.php?id=wwc_KPI_GHG_elec>wwc_KPI_GHG_elec</a> + <br>"+
		"<a href=variable.php?id=wwt_KPI_GHG_elec>wwt_KPI_GHG_elec</a> + <br>"+
		"<a href=variable.php?id=wwd_KPI_GHG_elec>wwd_KPI_GHG_elec</a>"+
	"";
	var fuel_formula = ""+
		"<a href=variable.php?id=wsa_KPI_GHG_fuel>wsa_KPI_GHG_fuel</a> + <br>"+
		"<a href=variable.php?id=wst_KPI_GHG_fuel>wst_KPI_GHG_fuel</a> + <br>"+
		"<a href=variable.php?id=wsd_KPI_GHG_fuel>wsd_KPI_GHG_fuel</a> + <br>"+
		"<a href=variable.php?id=wwc_KPI_GHG_fuel>wwc_KPI_GHG_fuel</a> + <br>"+
		"<a href=variable.php?id=wwt_KPI_GHG_fuel>wwt_KPI_GHG_fuel</a> + <br>"+
		"<a href=variable.php?id=wwd_KPI_GHG_fuel>wwd_KPI_GHG_fuel</a>"+
	"";
	var trck_formula = ""+
		"<a href=variable.php?id=wsd_KPI_GHG_trck>wsd_KPI_GHG_trck</a> + <br>"+
		"<a href=variable.php?id=wwd_KPI_GHG_trck>wwd_KPI_GHG_trck</a>"+
	"";

	//create a table string
	if(withTable) {
		var table=""+
		"<style>"+
		"	table[title=ghgSources] td:nth-child(2){font-family:monospace}"+
		"</style>"+
		"<table title=ghgSources>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('Code')+"<th>"+translate('graphs_value')+" (kg CO2)"+
			"<tr><td align=left>"+names[0]+ "<td align=left>"+elecWS_formula+"<td align=right>"+format(elecWS)+
			"<tr><td align=left>"+names[1]+ "<td align=left>"+elecWW_formula+"<td align=right>"+format(elecWW)+
			"<tr><td align=left>"+names[2]+ "<td align=left>"+fuel_formula+"<td align=right>"+format(fuel)+
			"<tr><td align=left>"+names[3]+ "<td align=left>"+trck_formula+"<td align=right>"+format(trck)+
			"<tr><td align=left>"+names[4]+ "<td align=left><a href=variable.php?id=ww_KPI_GHG_unt_ch4 >ww_KPI_GHG_unt_ch4 </a><td align=right>"+format(ch4u)+
			"<tr><td align=left>"+names[5]+ "<td align=left><a href=variable.php?id=ww_KPI_GHG_unt_n2o >ww_KPI_GHG_unt_n2o </a><td align=right>"+format(n2ou)+
			"<tr><td align=left>"+names[6]+ "<td align=left><a href=variable.php?id=wwt_KPI_GHG_tre_ch4 >wwt_KPI_GHG_tre_ch4 </a><td align=right>"+format(ch4t)+
			"<tr><td align=left>"+names[7]+ "<td align=left><a href=variable.php?id=wwt_KPI_GHG_tre_n2o >wwt_KPI_GHG_tre_n2o </a><td align=right>"+format(n2ot)+
			"<tr><td align=left>"+names[8]+ "<td align=left><a href=variable.php?id=wwt_KPI_GHG_biog    >wwt_KPI_GHG_biog    </a><td align=right>"+format(biog)+
			"<tr><td align=left>"+names[9]+ "<td align=left><a href=variable.php?id=wwt_KPI_GHG_slu     >wwt_KPI_GHG_slu     </a><td align=right>"+format(slud)+
			"<tr><td align=left>"+names[10]+"<td align=left><a href=variable.php?id=wwt_KPI_GHG_dig_fuel>wwt_KPI_GHG_dig_fuel</a><td align=right>"+format(digf)+
			"<tr><td align=left>"+names[11]+"<td align=left><a href=variable.php?id=wwd_KPI_GHG_tre_n2o >wwd_KPI_GHG_tre_n2o </a><td align=right>"+format(n2od)+
		"</table>"+
		"";
		var div=document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

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
		title:translate('ghg_emissions_by_unfccc')+" ("+format(total_ghg)+" kg CO2e)",
	}

	//empty the container element
	var con = document.getElementById(container)
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
			"<tr><th>"+translate('Category')+"<th>"+translate('Code')+"<th>"+translate('Value')+" (kg CO2e)"+
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
	scrollToItem(container)
}

//GHG one stage only: (wsa|wst|wsd|wwc|wwt|wwd)
Graphs.ghg_by_stage=function(withTable,container,prefix) {
	withTable=withTable||false;
	container=container||"graph";
	prefix=prefix||"wsa"; //first 3 letters [wsa,wst,wsd,wwc,wwt,wwd]

	//check if prefix is correct
	if(-1==['wsa','wst','wsd','wwc','wwt','wwd'].indexOf(prefix)) {
		document.getElementById(container).innerHTML="NA";
		return //if prefix is not in this list, stop
	}

	//utils
	function getPointer(variable_code){
		var loc = locateVariable(variable_code);
		var pointer = loc.sublevel ? Global[loc.level][loc.sublevel] : Global[loc.level];
		return pointer;
	}
	function getValue(variable_code){
		var pointer = getPointer(variable_code);
		var total = pointer ? pointer[variable_code]() : 0;
		return total;
	}

	//complete code of w**_KPI_GHG
	var code = prefix+'_KPI_GHG'
	var value = getValue(code);

	//data
	var DATA=[ 
		['variable','emission'],
	];

	//get inputs for this function (works)
	var inputs = Formulas.idsPerFormula(getPointer(code)[code].toString());
	inputs.forEach(input=>{
		DATA.push( [translate(input+"_descr"),getValue(input)] );
	});

	//array graph data
	var data=google.visualization.arrayToDataTable(DATA);

	var stageName=(function(){
		return {
			"wsa":translate("Abstraction"),
			"wst":translate("Treatment"),
			"wsd":translate("Distribution"),
			"wwc":translate("Collection"),
			"wwt":translate("Treatment"),
			"wwd":translate("Discharge"),
		}[prefix];
	})();

	//options
	var options={ 
		height:250,
		legend:{position:'left'},
		title:translate('ghg_emissions_by_l2')+" "+stageName+" ("+format(value)+" kg CO2e)",
	}

	//empty the container element
	var con=document.getElementById(container);
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
      "<input type=checkbox "+checked+" onclick=Graphs.ghg_by_stage("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
		"";
	})();

	//create a table string
	if(withTable) {
		var table=""+
		"<table title=ghg_by_stage>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('Code')+"<th>"+translate('graphs_value')+" (kg CO2)";

		inputs.forEach(input=>{
			table+="<tr><td align=left>"+translate(input+"_descr")+"<td align=left><a href=variable.php?id="+input+">"+input+"</a><td align=right>"+format(getValue(input))
		});

		table+="</table>"+
		"";

		var div=document.createElement('div');
		div.style.fontSize="10px";
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

//GHG all stages (wsa+wst+wsd+wwc+wwt+wwd)
Graphs.graph4=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	//Values
	var slice_1 = Global.Water.Abstraction.wsa_KPI_GHG();
	var slice_2 = Global.Water.Treatment.wst_KPI_GHG();
	var slice_3 = Global.Water.Distribution.wsd_KPI_GHG();
	var slice_4 = Global.Waste.Collection.wwc_KPI_GHG();
	var slice_5 = Global.Waste.Treatment.wwt_KPI_GHG();
	var slice_6 = Global.Waste.Discharge.wwd_KPI_GHG();

	//sum
	var sum = slice_1+slice_2+slice_3+slice_4+slice_5+slice_6;

	//names
	var names=[
		"WS Abstraction",
		"WS Treatment",
		"WS Distribution",
		"WW Collection",
		"WW Treatment",
		"WW Discharge",
	];

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage','Emissions'],
		[names[0],slice_1],
		[names[1],slice_2],
		[names[2],slice_3],
		[names[3],slice_4],
		[names[4],slice_5],
		[names[5],slice_6],
	]);

	//options
	var options={
		height:250,
		legend:{position:'left'},
		title:translate('ghg_emissions_by_stage')+" ("+format(sum)+" kg CO2e)",
		slices:{
			0:{color:ColorsGHG.ws_KPI_GHG_elec      },
			1:{color:ColorsGHG.ws_KPI_GHG_ne        },
			2:{color:ColorsGHG.ww_KPI_GHG_elec      },
			3:{color:ColorsGHG.ww_KPI_GHG_ne_ch4_wwt},
			4:{color:ColorsGHG.ww_KPI_GHG_ne_n2o_tre},
			5:{color:ColorsGHG.ww_KPI_GHG_ne_tsludge},
		},
	};

	//empty the container
	var con = document.getElementById(container);
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
      "<input type=checkbox "+checked+" onclick=Graphs.graph4("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
		"";
	})();

	//create a table (string)
	if(withTable) {
		var table=""+
		"<table title=graph4>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('graphs_formula')+"<th>"+translate('graphs_value')+" (kg CO2)"+
			"<tr><td>"+names[0]+"<td><a href=variable.php?id=wsa_KPI_GHG>wsa_KPI_GHG</a> <td align=right>"+format(slice_1)+
			"<tr><td>"+names[1]+"<td><a href=variable.php?id=wst_KPI_GHG>wst_KPI_GHG</a> <td align=right>"+format(slice_2)+
			"<tr><td>"+names[2]+"<td><a href=variable.php?id=wsd_KPI_GHG>wsd_KPI_GHG</a> <td align=right>"+format(slice_3)+
			"<tr><td>"+names[3]+"<td><a href=variable.php?id=wwc_KPI_GHG>wwc_KPI_GHG</a> <td align=right>"+format(slice_4)+
			"<tr><td>"+names[4]+"<td><a href=variable.php?id=wwt_KPI_GHG>wwt_KPI_GHG</a> <td align=right>"+format(slice_5)+
			"<tr><td>"+names[5]+"<td><a href=variable.php?id=wwd_KPI_GHG>wwd_KPI_GHG</a> <td align=right>"+format(slice_6)+
		"</table>"+
		"";
		//extra options
		var div=document.createElement('div');
		document.getElementById(container).appendChild(div);
		div.style.fontSize="10px";
		div.innerHTML=table;
	}
	scrollToItem(container)
}

//NRG global
Graphs.graph2=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	//values
	var ws=Global.Water.ws_nrg_cons();
	var ww=Global.Waste.ww_nrg_cons();

	var names=[ ""+translate('Water')+"", ""+translate('Waste')+"" ];

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		[translate('stage'),translate('emissions')],
		[names[0], ws],
		[names[1], ww],
	]);

	//options
	var options={
		height:250,
		legend:{position:'left'},
		pieHole:0.4,
		title:""+translate('graphs_graph2')+" ("+format(ws+ww)+" kWh)",
		slices:{
			0:{ color: '#0aaeef' },
			1:{ color: '#d71d24' },
		},
	};

	//empty the container element
	var con=document.getElementById(container);
	con.innerHTML='';

	//double click
	con.ondblclick=function(){
		var a=document.createElement('a');
		document.body.appendChild(a);
		a.href=chart.getImageURI();
		a.download="image.png";
		a.click();
	}

	//draw
	var chart=new google.visualization.PieChart(con);
	chart.draw(data,options);

	//buttons
	(function(){
		var buttons=document.createElement('div');
		buttons.classList.add('tab_buttons');
		document.getElementById(container).appendChild(buttons);
    var checked=withTable ? "checked" : "";
		buttons.innerHTML=""+
      "<label>"+
      "<input type=checkbox "+checked+" onclick=Graphs.graph2("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
		"";
	})();

	//table
	if(withTable) {
		//create a table string
		var table=""+
		"<table title=graph2>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('graphs_formula')+"<th>"+translate('graphs_value')+" (kWh)"+
			"<tr><td>"+names[0]+"<td><a href=variable.php?id=ws_nrg_cons>ws_nrg_cons</a><td>"+format(ws)+
			"<tr><td>"+names[1]+"<td><a href=variable.php?id=ww_nrg_cons>ww_nrg_cons</a><td>"+format(ww)+
		"</table>"+
		"";
		var div=document.createElement('div');
		div.style.fontSize="10px";
		document.getElementById(container).appendChild(div);
		div.innerHTML=table;
	}
	scrollToItem(container);
}

//NRG by stage
Graphs.graph5=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

	//values
	var slice_1 = Global.Water.Abstraction.wsa_nrg_cons;
	var slice_2 = Global.Water.Treatment.wst_nrg_cons;
	var slice_3 = Global.Water.Distribution.wsd_nrg_cons;
	var slice_4 = Global.Waste.Collection.wwc_nrg_cons;
	var slice_5 = Global.Waste.Treatment.wwt_nrg_cons;
	var slice_6 = Global.Waste.Discharge.wwd_nrg_cons;

	var names=[
		""+translate('Abstraction')+"",
		""+translate('Treatment')+"",
		""+translate('Distribution')+"",
		""+translate('Collection')+"",
		""+translate('Treatment')+"",
		""+translate('Discharge')+"",
	]

	//actual graph data
	var data=google.visualization.arrayToDataTable([
		['Stage','Emissions'],
		[names[0],slice_1],
		[names[1],slice_2],
		[names[2],slice_3],
		[names[3],slice_4],
		[names[4],slice_5],
		[names[5],slice_6],
	]);

	//options
	var options={
		height:300,
		legend:{position:'left'},
		pieHole:0.3,
		title:translate('Energy consumption')+" ("+format(Global.General.TotalNRG())+" kWh)",
		slices: {
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

	(function(){
		var buttons=document.createElement('div');
		buttons.classList.add('tab_buttons');
		document.getElementById(container).appendChild(buttons);
    var checked=withTable ? "checked" : "";
		buttons.innerHTML=""+
      "<label>"+
      "<input type=checkbox "+checked+" onclick=Graphs.graph5("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
			"<button class=left onclick=Graphs.graph5("+withTable.toString()+",'"+container+"') disabled>"+translate('stage')+"</button>"+
			"<button class=right  onclick=Graphs.graph7("+withTable.toString()+",'"+container+"')>"+translate('substage')+"</button>"+
		"";
	})();

	//tables
	if(withTable) {
		//create a table (as a string)
		var table=""+
		"<table title=graph5>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('graphs_formula')+"<th>"+translate('graphs_value')+" (kWh)"+
			"<tr><td align=left>"+names[0]+"<td align=left><a href=variable.php?id=wsa_nrg_cons>wsa_nrg_cons</a> <td align=right>"+format(slice_1)+
			"<tr><td align=left>"+names[1]+"<td align=left><a href=variable.php?id=wst_nrg_cons>wst_nrg_cons</a> <td align=right>"+format(slice_2)+
			"<tr><td align=left>"+names[2]+"<td align=left><a href=variable.php?id=wsd_nrg_cons>wsd_nrg_cons</a> <td align=right>"+format(slice_3)+
			"<tr><td align=left>"+names[3]+"<td align=left><a href=variable.php?id=wwc_nrg_cons>wwc_nrg_cons</a> <td align=right>"+format(slice_4)+
			"<tr><td align=left>"+names[4]+"<td align=left><a href=variable.php?id=wwt_nrg_cons>wwt_nrg_cons</a> <td align=right>"+format(slice_5)+
			"<tr><td align=left>"+names[5]+"<td align=left><a href=variable.php?id=wwd_nrg_cons>wwd_nrg_cons</a> <td align=right>"+format(slice_6)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable>Save as image</a> '+
		'</div>'+
		"";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

//NRG by substage
Graphs.graph7=function(withTable,container) {
	withTable=withTable||false;
	container=container||"graph";

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
	var DATA = [
		['Stage', 'Emissions'],
		//['name', value],
	]

	//push data to DATA
	for(var s in stages) {
		var title;
		switch(names[s]) {
			case 'wsa_nrg_cons': title=""+translate('Abstraction')+"";break;
			case 'wst_nrg_cons': title=""+translate('Treatment')+"";break;
			case 'wsd_nrg_cons': title=""+translate('Distribution')+"";break;
			case 'wwc_nrg_cons': title=""+translate('Collection')+"";break;
			case 'wwt_nrg_cons': title=""+translate('Treatment')+"";break;
			case 'wwd_nrg_cons': title=""+translate('Discharge')+"";break;
			default:break;
		}
		//special case: if there are zero substages:
		if(stages[s].length==0) {
			var loc = locateVariable(names[s]);
			var value = Global[loc.level][loc.sublevel][names[s]]
			DATA.push([title,value])
		}
		//go over substages
		for(var i in stages[s]) {
			var name = stages[s][i].name;
			var value = stages[s][i][names[s]];
			DATA.push([title+" S"+(parseInt(i)+1)+": "+name, value])
		}
	}

	var data=google.visualization.arrayToDataTable(DATA);
	var options= { 
		height:300,
		legend:{position:'left'},
		pieHole:0.3,
		title:translate('Energy consumption by substage')+" ("+format(Global.General.TotalNRG())+" kWh)",
		slices:{},
	};
	var colors = [ '#66cef5', '#0083b3', '#cceffc', '#b67800', '#f8c666', '#fad999' ];
	var current_slice = 0;
	for(var s in stages) {
		if(stages[s].length==0) {
			options.slices[current_slice++]={color:colors[s],offset:0.1}
			continue;
		}
		for(var i in stages[s]) {
			options.slices[current_slice++]={color:colors[s],offset:0.1}
		}
	}
	document.getElementById(container).innerHTML='';
	var chart=new google.visualization.PieChart(document.getElementById(container));
	chart.draw(data,options);

	(function(){
		var buttons=document.createElement('div');
		buttons.classList.add('tab_buttons');
		document.getElementById(container).appendChild(buttons);
    var checked=withTable ? "checked" : "";
		buttons.innerHTML=""+
      "<label>"+
      "<input type=checkbox "+checked+" onclick=Graphs.graph7("+(!withTable).toString()+",'"+container+"')>"+translate('table')+
      "</label>"+
      "&emsp;"+
			"<button class=left  onclick=Graphs.graph5("+withTable.toString()+",'"+container+"')>"+translate('stage')+"</button>"+
			"<button class=right onclick=Graphs.graph7("+withTable.toString()+",'"+container+"') disabled>"+translate('substage')+"</button>"+
		"";
	})();

	if(withTable) {
		//create a table (as a string)
		var table=""+
		"<table title=graph7>"+
		"<tr><th>"+translate('graphs_slice')+"<th>"+translate('graphs_formula')+"<th colspan='"+stages.length+"'>"+translate('substages')+" (kWh)";
			for(var s in stages) {
				var title;
				switch(names[s]) {
					case 'wsa_nrg_cons': title=""+translate('Abstraction')+"";break;
					case 'wst_nrg_cons': title=""+translate('Treatment')+"";break;
					case 'wsd_nrg_cons': title=""+translate('Distribution')+"";break;
					case 'wwc_nrg_cons': title=""+translate('Collection')+"";break;
					case 'wwt_nrg_cons': title=""+translate('Treatment')+"";break;
					case 'wwd_nrg_cons': title=""+translate('Discharge')+"";break;
					default:break;
				}
				table+=""+
					"<tr><td align=left>"+title+
					"<td align=left><a href=variable.php?id="+names[s]+">"+names[s]+"</a>";
				for(var i in stages[s])
					table+="<td align=right>"+format(stages[s][i][names[s]]);
			}
		table+="</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable>Save as image</a> '+
		'</div>'+
		"";
		var div = document.createElement('div');
		div.innerHTML=table;
		document.getElementById(container).appendChild(div);
	}
	scrollToItem(container)
}

//BAR GRAPHS
//graphs 3{a,b,c,d} not used
/*
Graphs.graph3a=function(withTable,container) {
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
		""+translate('ws_KPI_GHG_elec_descr')+"",
		""+translate('ws_KPI_GHG_ne_descr')+"",
		""+translate('ww_KPI_GHG_elec_descr')+"",
		""+translate('ww_KPI_GHG_ne_descr')+"",
	]

	//data
	var data=google.visualization.arrayToDataTable
	([
		[ 
			'Emission type', names[0], names[1], names[2], names[3], 
			{role:'annotation'} 
		],
		[translate('Water'),slice_1,slice_2,0,0,''],
		[translate('Waste'),0,0,slice_3,slice_4,''],
	]);

	//options
	var options=
	{
		title:"kg CO2/year",
		height:300,
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

	var yy=translate('years');

	//tables
	if(withTable) {
		//create a table string
		var table=""+
		"<button onclick=Graphs.graph3a(false,'"+container+"')>"+translate('graphs_hide_table')+"</button>"+
		"<table title=graph3a>"+
			"<tr><th>"+translate('graphs_slice')+"<th>"+translate('Water')+"<th>kg CO2/"+translate('year')+"<th>"+translate('Waste')+"<th>kg CO2/"+translate('year')+""+
			"<tr><th>"+translate('ww_KPI_GHG_ne_descr')+"<td>ws_KPI_GHG_ne/"+yy+"<td>"+format(slice_2)+"<td>ww_KPI_GHG_ne/"+yy+" <td>"+format(slice_4)+
			"<tr><th>"+translate('ww_KPI_GHG_elec_descr')+"<td>ws_KPI_GHG_elec/"+yy+" <td>"+format(slice_1)+"<td>ww_KPI_GHG_elec/"+yy+" <td>"+format(slice_3)+
		"</table>"+
		'<div class=options>'+
		'	<a href="'+chart.getImageURI()+'" download="image.png" class=printable>'+translate('graphs_printable_version')+'</a> | '+
		"	<a href='graph.php?g=graph3a'>"+translate('graphs_go_to')+"</a>"+
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
		div.innerHTML="<button onclick=Graphs.graph3a(true,'"+container+"')>"+translate('graphs_show_table')+"</button>"
	}
}
*/

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
}

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
}

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
}

Graphs.ws_cost=function(container) {
	container=container||'graph';

	//values
	var nrg = Global.Water.ws_nrg_cost;
	var run = Global.Water.ws_run_cost-nrg;

	//names
	var names = [
		translate("Energy"),
		translate("Other"),
	];

	//array graph data
	var data=google.visualization.arrayToDataTable([
		['type','cost [currency]'],
		[names[0],nrg],
		[names[1],run],
	]);

	//options
	var options={ 
		height:225,
		legend:{position:'left'},
		title:translate('water_supply_costs')+" ("+format(run+nrg)+" "+Global.General.Currency+")",
		slices: {
			0:{color:'#0aaff1' },
			1:{color:'#aaa' },
		},
	}
	//empty container and draw chart
	var con=document.getElementById(container)
	con.innerHTML='';
	var chart=new google.visualization.PieChart(con);
	chart.draw(data,options);

	//double click
	con.ondblclick=function(){
		var a=document.createElement('a');
		document.body.appendChild(a);
		a.href=chart.getImageURI();
		a.download="image.png";
		a.click();
	}
}

Graphs.ww_cost=function(container) {
	container=container||'graph';

	//values
	var nrg = Global.Waste.ww_nrg_cost;
	var run = Global.Waste.ww_run_cost-nrg;

	//names
	var names = [
		translate("Energy"),
		translate("Other"),
	];

	//array graph data
	var data=google.visualization.arrayToDataTable([
		['type','cost [currency]'],
		[names[0],nrg],
		[names[1],run],
	]);

	//options
	var options={ 
		height:225,
		legend:{position:'left'},
		title:translate('waste_supply_costs')+" ("+format(run+nrg)+" "+Global.General.Currency+")",
		slices:{
			0:{color:'#d71d24'},
			1:{color:'#aaa'},
		},
	}
	//empty container and draw chart
	var con=document.getElementById(container)
	con.innerHTML='';
	var chart=new google.visualization.PieChart(con);
	chart.draw(data,options);

	//double click
	con.ondblclick=function(){
		var a=document.createElement('a');
		document.body.appendChild(a);
		a.href=chart.getImageURI();
		a.download="image.png";
		a.click();
	}
}

Graphs.untreatedww=function(container,header) {
	container=container||"graph";
	header=header||"kg CO2 equivalents from CH4 and N2O";

	var ch4 = Global.Waste.ww_KPI_GHG_unt_ch4()||0;
	var n2o = Global.Waste.ww_KPI_GHG_unt_n2o()||0;
	var DATA=[
		['Label','Value'],
		['CH4',ch4],
		['N2O',n2o],
		['CH4+N2O',ch4+n2o],
	];
	var data = google.visualization.arrayToDataTable(DATA);
	var options = {
		height:150,
		minorTicks: 5,
		max:Math.floor(Global.Waste.ww_KPI_GHG()),
	};
	var element = document.getElementById(container)
	var chart = new google.visualization.Gauge(element);
	chart.draw(data,options);
	var h = document.createElement('h3');
	h.innerHTML=header
	element.insertBefore(h,element.firstChild)
}

Graphs.authCon=function(container) {
	container=container||'graph';

	var DATA=[
		['Label','Value'],
		[Info["ws_SL_auth_con"].unit,Global.Water.ws_SL_auth_con()||0],
	];
	var data = google.visualization.arrayToDataTable(DATA);
	var options = {
		height:150,
		minorTicks: 5,
		max:500,
		greenFrom:0, greenTo: 225,
		yellowFrom:225, yellowTo:400,
		redFrom:400, redTo:600,
	};
	var element = document.getElementById(container)
	var chart = new google.visualization.Gauge(element);
	chart.draw(data,options);
	var h=document.createElement('h3');
	h.innerHTML="Current "+translate("ws_SL_auth_con_descr")+" ("+Info['ws_SL_auth_con'].unit+")"
	element.insertBefore(h,element.firstChild)
}

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
}
