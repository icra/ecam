<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function showVarName(code){
			document.write("<a href=variable.php?id="+code+">"+code+"</a> : "+translate(code+'_descr'))
			document.write(" ("+Info[code].unit+")")
		}
		var EstimatedInputs = {
			"Setting the 'main treatment type' estimates":[
				"wwt_bod_infl",
				"wwt_bod_effl",
				"wwt_bod_slud",
				"wwt_ch4_efac",
			],
			"Setting the 'sludge disposal method estimates":[
				"wwt_mass_slu",
				"wwt_dryw_slu",
				"wwt_mass_slu_comp",
				"wwt_mass_slu_inc",
				"wwt_mass_slu_app",
				"wwt_mass_slu_land",
				"wwt_mass_slu_stock",
				"wwt_temp_inc",
			]
		};
	</script>
	<style>
		#root {
			margin:1em;
			text-align:left;
			font-family:monospace;
		}
		code {
			padding:8px 5px;
			background:#eee;
			display:block;
			margin:10px 0;
		}
		li.estimation {
			padding-bottom:10px;
			margin-bottom:20px;
			border-bottom:1px solid #ccc;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1>Summary of estimations at Initial GHG assessment</h1>

<div id=root>
<b><u>Index:</u></b>
<ul>
	<script>
		for (var estimation in EstimatedInputs){
			document.write("<li>"+estimation);
			document.write("<ul>");
			EstimatedInputs[estimation].forEach(input=>{
				document.write("<li>");
				showVarName(input);
				document.write("</li>");
			});
			document.write("</ul>");
			document.write("</li>");
		}
	</script>
</ul>

<hr>
<b><u>Detailed equations for input estimations:</u></b>

<h3>1. Estimations performed when the main treatment type is chosen</h3>
<ul>
	<li class=estimation>
		<script>showVarName('wwt_bod_infl')</script>
		<code>
			wwt_bod_infl = wwc_bod_pday / 1000 · ww_serv_pop · Days
		</code>
		where,
		<ul>
			<li><script>showVarName('wwc_bod_pday')</script>
			<li><script>showVarName('ww_serv_pop')</script>
			<li><script>showVarName('Days')</script>
		</ul>
	</li>

	<li class=estimation>
		<script>showVarName('wwt_bod_effl')</script>
		<div>
			This estimation assumes 90% removal:
		</div>
		<code>
		wwt_bod_effl = 0.10 · wwt_bod_infl
		</code>
	</li>

	<li class=estimation>
		<script>showVarName('wwt_bod_slud')</script>
		<code>
			wwt_bold_slud = percent · wwt_bod_infl
		</code>
		where, "percent" variable comes from this table
		<table>
			<tr>
				<th>Main treatment type options
				<th title="Percent of wwt_bod_infl removed as sludge">Percent (%)
				<th>wwt_ch4_efac
			</tr>
			<script>
				(function(){
					for(var type in Tables.wwt_type_tre)
					{
						document.write("<tr><td>"+type);
						document.write("<td align=right>"+100*Tables.wwt_type_tre[type].bod_rmvd_as_sludge_estm);
						document.write("<td align=right>"+Tables.wwt_type_tre[type].ch4_efac);
					}
				})();
			</script>
		</table>
	</li>

	<li class=estimation>
		<script>showVarName('wwt_ch4_efac')</script>
		<div>
			This variable is set from the above table
		</div>
	</li>
</ul>

<h3>2. Estimations performed when the sludge disposal method is chosen</h3>
<ul>
	<li class=estimation>
		<script>showVarName('wwt_mass_slu')</script>
		<code>
			wwt_mass_slu = 0.55 · wwc_bod_pday · ww_serv_pop · (1-0.1) · 1e-3 · 1.176 · Days;
		</code>
		where,
		<ul>
			<li>0.55 : ratio of g volatile suspended solids to g of substrate (BOD) removed per Metcalf and Eddy (2003).
			<li>0.1: Assumes 10% of the influent BOD load escapes treatment and leaves the wwtp in the effluent  
			<li>1e-3: Unit conversion factor kg/g
			<li>1.176: Conversion factor, ratio of total suspended solids to volatile suspended solids (g TSS/ g VSS )in typical activated sludge per Metcalf and Eddy (2003).  
			<li>Days: Assessment period in days
		</ul>
		if we are producing biogas, we add a 0.6 factor:
		<code>
			wwt_mass_slu = 0.6 · 0.55 · wwc_bod_pday · ww_serv_pop · (1-0.1) · 1e-3 · 1.176 · Days;
		</code>
	</li>
	<li class=estimation>
		<script>showVarName('wwt_dryw_slu')</script>
		<code>
			wwt_dryw_slu = 0.04 · wwt_mass_slu
		</code>
	</li>
	<li class=estimation>
		Depending on the sludge disposal method, the corresponding variable is set equal to wwt_dryw_slu:
		<table>
			<tr><th>Sludge disposal method chosen<th>Estimation
			<tr><td> Composting      </td> <td><code>wwt_mass_slu_comp  = wwt_dry_slu </code>
			<tr><td> Incineration    </td> <td><code>wwt_mass_slu_inc   = wwt_dry_slu </code>
			<tr><td> Land application</td> <td><code>wwt_mass_slu_app   = wwt_dry_slu </code>
			<tr><td> Landfilling     </td> <td><code>wwt_mass_slu_land  = wwt_dry_slu </code>
			<tr><td> Stockpiling     </td> <td><code>wwt_mass_slu_stock = wwt_dry_slu </code>
		</table>
	</li>
	<li class=estimation>
		<script>showVarName('wwt_temp_inc')</script>
		<p>
			If incineration is chosen, the temperature is set to 1023 K
		</p>
		<code>
			wwt_temp_inc = 1023
		</code>
	</li>
</ul>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
