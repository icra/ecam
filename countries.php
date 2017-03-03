<?php /*fuel information.php: information about the different fuels*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Countries</h1>

<!--fuel info-->
<table id=info> 
	<tr>
		<th rowspan=2>Country
		<th>Emission factor
		<th>Annual protein consumption
		<th>BOD5
	<tr>
		<th>kgCO<sub>2</sub>/kWh
		<th>kg/person/year
		<th>g/person/day
</table>
	<style>
		#info td:nth-child(n+2) {
			text-align:right;
		}
	</style>

<script>
	(function()
	{
		var table=document.querySelector('#info');
		for(var country in Countries)
		{
			var newRow=table.insertRow(-1);
			newRow.insertCell(-1).innerHTML="<b>"+country+"</b>";
			newRow.insertCell(-1).innerHTML=Countries[country].conv_kwh_co2;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_prot_con;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_bod_pday;
		}
	})();
</script>
