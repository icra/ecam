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
		#info a {
			color:white;
		}
		#info tr.selected {
			background:yellow;
		}
	</style>
</head><body><center>
<?php 
	include'sidebar.php';
	include'navbar.php';
	include'linear.php';
?>
<h1><?php write('#Countries')?></h1>

<!--fuel info-->
<table id=info> 
	<tr>
		<th rowspan=2><?php write('#Country')?>
		<th>
			<?php write('#Emission_factor')?><sup>1</sup>
			<br><a href=variable.php?id=conv_kwh_co2>(conv_kwh_co2)</a>
		</th>
		<th>
			<?php write('#Annual_protein_consumption')?><sup>2</sup>
			<br><a href=variable.php?id=wwc_prot_con>(wwc_prot_con)</a>
		</th>
		<th>
			BOD<sub>5</sub><sup>3</sup>
			<br><a href=variable.php?id=wwc_bod_pday>(wwc_bod_pday)</a>
		</th>
	<tr>
		<th>kgCO<sub>2</sub>/kWh
		<th>kg/<?php write('#person')?>/<?php write('#year')?>
		<th>g/<?php write('#person')?>/<?php write('#day')?>
</table>

<table id=references>
	<tr><td colspan=2><?php write('#References')?>
	<tr><td>1<td>BRANDER, M. SOOD A. WYLIE, C. HAUGHTON, A. LOVELL, J., 2011,Technical Paper Electricity-specific emission factors for grid electricity, Ecometrica, 
	<tr><td>2<td>
		<a href="docs/FAO.xls" target=_blank>
			FAO Statistics Division, 2010, Food Balance Sheets
		</a>
	<tr>
	<tr><td>3<td>
		<a href="docs/IPCC_V5_6_Ch6_Wastewater.pdf" target=_blank>
			IPCC, 2006, Guidelines for National Greenhouse Gas Inventories 
			Volume 5 Waste, Chapter 6
		</a>
	</tr>
</table>

<script>
	(function() {
		var table=document.querySelector('#info');
		for(var country in Countries) {
			var newRow=table.insertRow(-1);
			if(country==Global.General.Country){
				newRow.classList.add('selected');
				newRow.title="Current selected country";
			}
			newRow.insertCell(-1).innerHTML="<b>"+country+"</b>";
			newRow.insertCell(-1).innerHTML=Countries[country].conv_kwh_co2;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_prot_con;
			newRow.insertCell(-1).innerHTML=Countries[country].wwc_bod_pday;
		}
	})();
</script>
