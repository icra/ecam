<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		// Opportunities: potential GHG reductions
		var Opps = [
		];

		//render opportunities table
		function renderOpps(){
			//TODO
		}

		function init(){
			//renderOpps();
			document.getElementById('TotalGHG').innerHTML=format(Global.General.TotalGHG());
			updateResult();
		}
	</script>
	<style>
		#root #container_TotalGHG {
			font-size:18px;
		}
	</style>
</head><body onload=init()><center>
<!--includes-->
	<!--sidebar--><?php include'sidebar.php'?>
	<!--navbar--><?php include'navbar.php'?>
	<!--linear--><?php include'linear.php'?>
<!--/includes-->
<h1>Opportunities to reduce GHG emissions (in development)</h1>

<div id=root>

	<!--total ghg indicator-->
	<p id=container_TotalGHG>
		System wide GHG emissions: 
		<span id=TotalGHG>Loading...</span> 
		kg CO<sub>2</sub>e
	</p>

	<!--opps table-->
	<div>
		<table id=opps>
			<tr>
				<th>Opportunities
				<th>Related variable
				<th>Current value
				<th>Unit
				<th>kg CO<sub>2</sub>e reduction <br> per 1% reduction
			</tr>

			<!--example 1-->
			<tr>
				<script>
					//name
					document.write("<td>Reduce Non revenue water volume <td><a href=variable.php?id=wsd_SL_nr_water>wsd_SL_nr_water</a>");
					var val=Global.Water.Distribution.wsd_SL_nr_water();
					var unit=Info.wsd_SL_nr_water.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * Global.Water.Distribution.wsd_SL_ghg_attr();
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			</tr>
			<!--example 2-->
			<tr>
				<script>
					//name
					document.write("<td>Reduce End user consumption <td><a href=variable.php?id=wsd_auth_con>wsd_auth_con</a>");
					var val=Global.Water.Distribution.wsd_auth_con;
					var unit=Info.wsd_auth_con.unit;
					//value + unit
					document.write("<td align=right>"+format(val)+"<td>"+unit);
					//1% change in emissions
					var emissions = 0.01 * val * Global.Water.Distribution.wsd_KPI_nrg_per_m3() * Global.General.conv_kwh_co2;
					document.write("<td align=right>"+format(emissions)+" kg CO<sub>2</sub>e");
				</script>
			</tr>

		</table>
	</div>
</div>

<ul style=text-align:left;display:inline-block;margin:auto;margin-top:10px>
	<li>
		Implementation fields:
		<ul>
			<li>name
			<li>relatedVariable
			<li>currentValue
			<li>unit
			<li>reduction
		</ul>
	</li>
	<li>
		All opportunities to be implemented
		<ul>
			<li>Non-revenue water volume
			<li>End user consumption
			<li>Water reuse (to replace potable water for non-potable purposes)
			<li>Drinking water grid energy consumption
			<li>Infiltration inflow
			<li>Wastewater grid energy consumption
			<li>Biogas production / recovery
			<li>Sludge disposal
			<li>Wastewater treatment coverage
			<li>Wastewater reuse (avoid discharge to water body)
		</ul>
	</li>
</ul>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
