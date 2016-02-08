<!--selection.php: menus of options selected-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		/** Modify any field of Global and init() */
		function updateField(object,field,newValue)
		{
			if(typeof(object[field])=="number"){newValue=parseFloat(newValue);}
			object[field]=newValue;
			init();
		}

		function updateUW1(newValue)
		{
			document.querySelector('#uw1').value=newValue;
			updateField(Global.UWS,'uw1',newValue);
		}

		function updateFuelSelectionVisibility()
		{
			var display = Global.Configuration["Yes/No"]["Do you have fuel engines to run pumps"] ? "" : "none";
			document.querySelector('#fuel').style.display=display;
		}

		function redisplayUW1menu()
		{
			//input element
			document.querySelector('#uw1').value=Global.UWS.uw1;
			//select element
			var select = document.querySelector('#countryUW1');
			//go over options and select the one with same value as uw1
			for(var i=1;i<select.childNodes.length;i++)
			{
				if(parseFloat(select.childNodes.item(i).value)==Global.UWS.uw1)
				{
					select.childNodes.item(i).setAttribute('selected','true');
					return;
				}
			}
			//if we go out of the list make it custom
			select.value="custom";
		}

		function updateFuelSelection()
		{
			['water','waste','wasteTre'].forEach(function(stage)
			{
				var row = document.querySelector('#fuelSelection tr[stage='+stage+']')
				while(row.cells.length>1){row.deleteCell(-1);}
				//new select menu
				var select = document.createElement('select');
				row.insertCell(-1).appendChild(select);
				select.setAttribute('onchange',"updateField(Global.Configuration.Selected['Fuel type'],'"+stage+"',this.value)");
				if(Global.Configuration["Active Stages"][stage]==0)
				{
					select.disabled=true;
					select.parentNode.parentNode.title="Inactive stage";
				}
				//go over fuel types
				for(var fuel in Tables['Fuel types'])
				{
					var option = document.createElement('option');
					option.innerHTML=fuel;
					if(fuel==Global.Configuration.Selected["Fuel type"][stage])
					{
						option.setAttribute('selected','true')
					}
					select.appendChild(option)
				}
			});
		}

		function init()
		{
			redisplayUW1menu();
			updateFuelSelectionVisibility();
			updateFuelSelection();
			updateResult();
		}
	</script>
	<style>
		th{vertical-align:middle}
		table{margin-bottom:1em;margin-left:1em}
		#main {padding-left:20em;text-align:left}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--title--><h1>Additional system info</h2>

<div id=main>
	<!--uw1-->
	<h4>Conversion factor for grid electricity (<a href=variable.php?id=uw1>info</a>)</h4>
	<table> <tr> <th>
		<select id=countryUW1 onchange=updateUW1(this.value)>
			<option value=0>--enter value or select country predefined--
			<option value=1>Peru
			<option value=2>Thailand
			<option value=3>Mexico
			<option value=custom>--CUSTOM--
		</select>
		<td>
		Current value <input style=width:40px id=uw1 value=0 onchange=updateUW1(this.value)> (kg CO2)/kWh
	</table>

	<!--Y/N questions-->
	<h4>Yes/no questions</h4>
	<table>
		<script>
			for(var question in Global.Configuration["Yes/No"])
			{
				var currentAnswer = Global.Configuration["Yes/No"][question];
				var checked = currentAnswer ? "checked":"";
				document.write("<tr><td>"+question+"?<td>")
				document.write("<label>No  <input name='"+question+"' type=radio value=0 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" checked></label> ")
				document.write("<label>Yes <input name='"+question+"' type=radio value=1 onclick=\"updateField(Global.Configuration['Yes/No'],'"+question+"',this.value)\" "+checked+"></label> ")
			}
		</script>
	</table>

	<!--fuel-->
	<div id=fuel style="display:none;padding:0">
		<h4>Fuel options</h4>
		<table id=fuelSelection class=inline>
			<tr><th>Stage<th>Selected Fuel type
			<tr stage=water>   <td style=font-weight:bold>Level 1 Water supply (engines)
			<tr stage=waste>   <td style=font-weight:bold>Level 1 Wastewater (engines)
			<tr stage=wasteTre><td style=font-weight:bold>Level 2 Wastewater treatment (vehicles)
		</table>

		<table id=fuelInfo class=inline> 
			<tr><th colspan=8 style=text-align:center>Emission Factors for different fuel types (table 6.3 IPCC vol 6)
			<tr>
				<th rowspan=2>Fuel type
				<th colspan=2>EFCH4 (kg/TJ)
				<th colspan=2>EFN2O (kg/TJ)
				<th rowspan=2>EFCO2          (kg/TJ)
				<th rowspan=2>FD             (kg/L)
				<th rowspan=2>NCV            (TJ/Gg)
			<tr>
				<th>engines <th>vehicles <th>engines <th>vehicles
			<script>
				(function()
				{
					var table=document.querySelector('#fuelInfo');
					for(var fuel in Tables['Fuel types'])
					{
						var newRow=table.insertRow(-1);
						newRow.insertCell(-1).innerHTML="<b>"+fuel+"</b>";
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCH4.engines;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCH4.vehicles;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFN2O.engines;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFN2O.vehicles;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].EFCO2;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].FD;
						newRow.insertCell(-1).innerHTML=Tables['Fuel types'][fuel].NCV;
					}
				})();
			</script>
		</table>
	</div>
</div>

<!--HIDDEN THINGS-->
<div style="display:none">
	<!--Technologies-->
	<div>
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
</div>

<!--PREV & NEXT BUTTONS-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='configuration.php'>Previous</button> 
	<script>
		//find first available stage to start entering data
		function nextPage()
		{
			//first: level 1
			if(Global.Configuration['Active Stages'].water==1){window.location="edit.php?level=Water";return;}
			if(Global.Configuration['Active Stages'].waste==1){window.location="edit.php?level=Waste";return;}

			//then: level 2
			alert("There are no active stages, go to Configuration and enable them");
		}
	</script>
	<button class="button next" onclick=nextPage()>Next</button>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--JSON--><?php include'currentJSON.php'?>

