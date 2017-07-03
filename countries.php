<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#info td:nth-child(n+2) {
			text-align:right;
		}
		#references {
			margin-top:10px;
			margin-bottom:50px;
		}
		#references td {
			border:none;
			padding:2px;
			font-size:11px;
		}
	</style>
</head><body><center>
<?php 
	include'sidebar.php';
	include'navbar.php';
	include'linear.php';
?>
<h1>Countries</h1>

<!--fuel info-->
<table id=info> 
	<tr>
		<th rowspan=2>Country
		<th>Emission factor<sup>1</sup>
		<th>Annual protein consumption<sup>2</sup>
		<th>BOD<sub>5</sub><sup>3</sup>
	<tr>
		<th>kgCO<sub>2</sub>/kWh
		<th>kg/person/year
		<th>g/person/day
</table>

<table id=references>
	<tr><td colspan=2>References
	<tr><td>1<td>BRANDER, M. SOOD A. WYLIE, C. HAUGHTON, A. LOVELL, J., 2011,Technical Paper Electricity-specific emission factors for grid electricity, Ecometrica, 
	<tr><td>2<td>FAO Statistics Division, 2010, Food Balance Sheets
	<tr><td>3<td>IPCC, 2006, Guidelines for National Greenhouse Gas Inventories Volume 5 Waste
</table>

<script>
	(function() {
		var table=document.querySelector('#info');
		for(var country in Countries) {
			var newRow=table.insertRow(-1);
			newRow.insertCell(-1).innerHTML="<b>"+country+"</b>";
			newRow.insertCell(-1).innerHTML=Countries[country].conv_kwh_co2;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_prot_con;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_bod_pday;
		}
	})();
</script>
