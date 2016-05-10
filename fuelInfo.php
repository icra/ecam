<?php /*fuel information.php: information about the different fuels*/?>

<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Fuel info</h1>


<h4>Depending on which fuel you select in your stages, the following emission factors will be applied</h4>

<!--fuel info-->
<table id=fuelInfo class=inline> 
	<tr><th colspan=8 style=text-align:center>Emission Factors for different fuel types (table 6.3 IPCC vol 6)
	<tr>
		<th rowspan=2>Fuel type
		<th colspan=2>EF CH<sub>4</sub> (kg/TJ)
		<th colspan=2>EF N<sub>2</sub>O (kg/TJ)
		<th rowspan=2>EF CO<sub>2</sub>          (kg/TJ)
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

<!--FOOTER--><?php include'footer.php'?>
