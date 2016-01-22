<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateFuelInfo();
			updateCountryInfo();
			updateResult();
		}

		/**
		 * Update a field from the Global object
		 * @param {object} object - Object that is being updated
		 * @param {string} field - field of the object
		 * @param {string} newValue - The new value of the field
		 */
		function updateField(object,field,newValue)
		{
			/*update the object*/object[field]=newValue;
			/*update views*/init()
		}

		function updateFuelInfo()
		{
			var table=document.querySelector('#fuelInfo')
			while(table.rows.length>1){table.deleteRow(-1)}
			var newRow=table.insertRow(-1)
			for(var field in Tables['Fuel types'][Global.Configuration.Selected['Fuel']])
			{
				newRow.insertCell(-1).innerHTML='<td>'+Tables['Fuel types'][Global.Configuration.Selected['Fuel']][field];
			}
		}

		function updateCountryInfo()
		{
			var table=document.querySelector('#countryInfo')
			while(table.rows.length>1){table.deleteRow(-1)}
			var newRow=table.insertRow(-1)
			newRow.insertCell(-1).innerHTML='<td>'+Tables['BOD'][Global.Configuration.Selected['Country']];
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>

<!--title--><h1>Options that define variables</h2>
<h3>I need to know where to put these menus</h3>

<!--FUEL TYPE-->
<div style="padding:2em;border:1px solid #666;max-width:50%;margin:1em">
	Fuel type
	<select onchange=updateField(Global.Configuration.Selected,"Fuel",this.value)>
		<script>
			(function(){
				for(var type in Tables['Fuel types'])
				{
					if(type==Global.Configuration.Selected['Fuel'])
						document.write('<option selected=true>'+type);
					else
						document.write('<option>'+type);
				}
			})();
		</script>
	</select>

	<table id=fuelInfo><tr><th>EFCO2 (kg/TJ)<th>EFCH4 (kg/TJ)<th>EFN2O (kg/TJ)<th>NCV (TJ/Gg)</table>
</div>

<!--COUNTRY/BOD-->
<div style="padding:2em;border:1px solid #666;max-width:50%;margin:1em">
	BOD
	<select onchange=updateField(Global.Configuration.Selected,"Country",this.value)>
		<script>
			(function(){
				for(var type in Tables['BOD'])
				{
					if(type==Global.Configuration.Selected['Country'])
						document.write('<option selected=true>'+type);
					else
						document.write('<option>'+type);
				}
			})();
		</script>
	</select>
	<table id=countryInfo><tr><th>BOD (g/person/day)</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--JSON--><?php include'currentJSON.php'?>
