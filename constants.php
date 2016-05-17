<?php /*constants.php: information about constants*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE--><h1>Constants</h1>

<h4>There are the "magic numbers" that appear in formulas, that are not explained anywhere on the tool which should get a description </h4>

<h4>Magic numbers are Unique values with unexplained meaning or multiple occurrences which could (preferably) be replaced with named constants</h4>

<!--constants-->
<table>
	<tr><th>Constant<th>Value<th>Unit
	<tr><td>N2O?<td>298<td>unit?
	<tr><td>CH4?<td>34<td>unit?
	<tr><td>gravity?<td>9810<td>unit?
	<tr><td>c_ww_biogas_flar?<td>0.9<td>unit?
	<tr><td>c_ww_biogas_flar?<td>0.4<td>unit?
	<tr><td>c_ww_nrg_engines?<td>0.25<td>unit?
	<tr><td>c_ww_nrg_engines?<td>0.84<td>unit?
	<tr><td>c_ww_nrg_engines?<td>43<td>unit?
	<tr><td>n2o treated?<td>44/28<td>unit?
	<tr><td>sludge transport?<td>74100<td>unit?
	<tr><td>sludge transport?<td>3.9<td>unit?
	<tr><td>ww_KPI_GHG_ne_ch4_wwt? <td>0.02, 0.59, 0.66<td>units?
	<tr><td>ww_KPI_GHG_ne_n2o_tre<td>0.005<td>units?
	<tr><td>ww_KPI_GHG_ne_tsludge<td>74100<td>units?
	<tr><td>ww_KPI_GHG_ne_ch4_unt<td>0.06<td>units?
	<tr><td>ww_KPI_GHG_ne_n2o_unt<td>0.16*1.1*1.25*0.005*44/28*298<td>units?
</table>


<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
