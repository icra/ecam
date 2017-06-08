<?php /*fuel information.php: information about the different fuels*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#info td:nth-child(n+2) {
			text-align:right;
		}
		#references {
			margin-top:10px;
		}
		#references td {
			border:none;
			padding:2px;
			font-size:11px;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Countries</h1>

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
	<tr><td>1<td>José to provide this one
	<tr><td>2<td>FAO Statistics Division
	<tr><td>3<td>IPCC(2006)
</table>


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
