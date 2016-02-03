<!--selection.php: menus of options selected-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateFuelInfo();
			updateCountryInfo();
			updateResult();
		}

		//modify Global
		function updateField(object,field,newValue)
		{
			if(typeof(object[field])=="number"){newValue=parseFloat(newValue)}
			/*update the object*/object[field]=newValue;
			/*update views*/init();
		}

		//redisplay
		function updateFuelInfo()
		{
			var table=document.querySelector('#fuelInfo');
			while(table.rows.length>2){table.deleteRow(-1)}
			var newRow=table.insertRow(-1);
			for(var field in Tables['Fuel types'][Global.Configuration.Selected['Fuel type']])
			{
				if(field=="EFCH4" || field=="EFN2O")
				{
					newRow.insertCell(-1).innerHTML='<td>'+Tables['Fuel types'][Global.Configuration.Selected['Fuel type']][field].engines;
					newRow.insertCell(-1).innerHTML='<td>'+Tables['Fuel types'][Global.Configuration.Selected['Fuel type']][field].vehicles;
				}
				else
					newRow.insertCell(-1).innerHTML='<td>'+Tables['Fuel types'][Global.Configuration.Selected['Fuel type']][field];
			}
		}

		//redisplay
		function updateCountryInfo()
		{
			var table=document.querySelector('#countryInfo');
			while(table.rows.length>1){table.deleteRow(-1)}
			var newRow=table.insertRow(-1)
			newRow.insertCell(-1).innerHTML='<td>'+Tables['Countries'][Global.Configuration.Selected['Country']];
		}
	</script>
	<style>
		th{vertical-align:middle}
		table{margin:1em}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--title--><h1>Advanced questions</h2>

<!--FUEL TYPE-->
<div class=inline style="padding:2em;border:1px solid #666;margin:1em">
	<div><b>FUEL</b></div> Select fuel type:
	<!--select fuel type-->
	<select onchange="updateField(Global.Configuration.Selected,'Fuel type',this.value)">
		<script>
			(function(){
				for(var type in Tables['Fuel types'])
				{
					var selected = (type==Global.Configuration.Selected['Fuel type']) ? "selected":"";
					document.write('<option '+selected+'>'+type);
				}
			})();
		</script>
	</select>
	<!--fuel info-->
	<table id=fuelInfo> 
		<tr>
			<th colspan=2>EFCH4 (kg/TJ)
			<th colspan=2>EFN2O (kg/TJ)
			<th rowspan=2>EFCO2          (kg/TJ)
			<th rowspan=2>FD             (kg/L)
			<th rowspan=2>NCV            (TJ/Gg)
		<tr>
			<th>engines
			<th>vehicles
			<th>engines
			<th>vehicles
	</table>
</div>

<!--COUNTRY - BOD-->
<div class=inline style="padding:2em;border:1px solid #666;margin:1em">
	<div><b>BOD</b></div> Select country:
	<!--select country-->
	<select onchange="updateField(Global.Configuration.Selected,'Country',this.value)">
		<script>
			(function(){
				for(var type in Tables['Countries'])
				{
					var selected = type==Global.Configuration.Selected['Country'] ? "selected=true" : ""
					document.write('<option '+selected+'>'+type);
				}
			})();
		</script>
	</select>
	<!--bod info-->
	<table id=countryInfo><tr><th>BOD (g/person/day)</table>
</div>

<!--Technologies-->
<div class=inline style="padding:2em;border:1px solid #666;margin:1em">
	<div><b>Water treatment & Wastewater treatment</b></div>
	Select treatment:
	<script>
		['Water','Waste'].forEach(function(stage)
		{
			document.write("<select onchange=\"updateField(Global.Configuration.Selected.Technologies,'"+stage+"',this.value)\">");
			for(var tech in Tables.Technologies[stage])
			{
				var selected=(Global.Configuration.Selected.Technologies[stage]==tech) ? "selected" : "";
				document.write('<option '+selected+'>'+tech);
			}
			document.write('</select> ');
		});
	</script>
	<table> <tr><td style=background:lightcoral>Info about what modifies each technology</table>
</div>

<!--Y/N questions-->
<div class=inline style="padding:2em;border:1px solid #666;margin:1em">
<table><tr><th colspan=2>Yes/No questions
	<script>
		for(var question in Global.Configuration["Yes/No"])
		{
			var currentAnswer = Global.Configuration["Yes/No"][question];
			var checked = currentAnswer ? "checked":"";
			document.write("<tr><td>"+question+"?<td>")
			document.write("<label>No  <input name='"+question+"' type=radio value=0 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" checked></label> ")
			document.write("<label>Yes <input name='"+question+"' type=radio value=1 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" "+checked+"></label> ")
			document.write("<td style=background:lightcoral>List of variables to hide needed");
		}
	</script>
</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--JSON--><?php include'currentJSON.php'?>
