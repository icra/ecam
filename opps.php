<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		// Opportunities: potential GHG reductions
		var Opps = [
			{
				name:"Non-revenue water volume",
			},{
				name:"End user consumption",
			},{
				name:"Water reuse (to replace potable water for non-potable purposes",
			},{
				name:"Drinking water grid energy consumption",
			},{
				name:"Infiltration inflow",
			},{
				name:"Wastewater grid energy consumption",
			},{
				name:"Biogas production / recovery",
			},{
				name:"Sludge disposal",
			},{
				name:"Wastewater treatment coverage",
			},{
				name:"Wastewater reuse (avoid discharge to water body)",
			},
		];

		//render opportunities table
		function renderOpps(){
			var t=document.getElementById('opps');
			Opps.forEach(op=>{
				var newRow=t.insertRow(-1);
				//name
				newRow.insertCell(-1).innerHTML=op.name;
			});
		}

		function init(){
			//renderOpps();
			document.getElementById('TotalGHG').innerHTML=format(Global.General.TotalGHG());
			updateResult();
		}
	</script>
	<style>
		#root #container_TotalGHG {
			font-size:20px;
		}
	</style>
</head><body onload=init()><center>
<!--includes-->
	<!--sidebar--><?php include'sidebar.php'?>
	<!--navbar--><?php include'navbar.php'?>
	<!--linear--><?php include'linear.php'?>
<!--/includes-->
<h1>Opportunities to reduce GHG emissions (in construction)</h1>

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
				<th>Name
				<th>Current value
				<th>Unit
				<th>Related GHG emissions (kg CO2e)
				<th>kg CO2e change per 1% change
			</tr>

			<!--example-->
			<tr id=wsa_>
				<td>
					Non revenue water volume
				</td>
				<td>
				</td>
			</tr>
		</table>
	</div>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
