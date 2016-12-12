<?php /*fuel information.php: information about the different fuels*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#configuration_fuel_options')?></h1>
<img src=img/fuel.png>
<!--description--><h4><?php write('#fuelInfo_description')?></h4>

<div id=main>

<!--fuel info-->
<table id=fuelInfo style="font-size:20px;margin-bottom:3em"> 
	<tr><th colspan=8 style=text-align:center><?php write('#fuelInfo_eeff')?>
	<tr>
		<th rowspan=2><?php write('#fuelInfo_type')?>
		<th colspan=2>EF<sub>CH<sub>4</sub></sub> (kg/TJ)
		<th colspan=2>EF<sub>N<sub>2</sub>O</sub> (kg/TJ)
		<th rowspan=2>EF<sub>CO<sub>2</sub></sub> (kg/TJ)
		<th rowspan=2 style=cursor:help title="<?php write('#fuelInfo_fd')?>">FD   (kg/L)
		<th rowspan=2 style=cursor:help title="<?php write('#fuelInfo_ncv')?>">NCV (TJ/Gg)
	<tr>
		<th><?php write('#fuelInfo_engines')?><th><?php write('#fuelInfo_vehicles')?>
		<th><?php write('#fuelInfo_engines')?><th><?php write('#fuelInfo_vehicles')?>
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
