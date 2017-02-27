<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		/*opportunities page: has to be recoded again after v2 due to structure changes*/
		/**
		 * Opportunities:
		 * Equations that show to the user the potential GHG reductions
		 */
		function init()
		{
			Caption.listeners();
			updateResult();
		}
		var Opps = {}; //oportunities coded here
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<h1>Opportunities to reduce GHG emissions</h1>

<div id=root>

<!--Opportunities-->
<div id=opps>
	<style>
		#opps > div.card {margin:1em}
		#opps > div.card > div.card {
			margin:0.2em;
			opacity:0.99;
		}
		#opps div.opp {padding:0.5em;text-align:left}
		#opps input[type=number] {
			width:70px;
		}
	</style>

	<!--Water-->
	<div class=card style="background:#0aaff1;"><?php cardMenu('Water supply')?>
		<div class="card folded"><?php cardMenu("1. Non revenue water (NRW)")?>
			<div class=opp>
				Non revenue water is
				<b><script> document.write(format(0)) </script>%</b>.<br>
				Its related emissions are
				<b><script> document.write(format(0)) </script></b>
				kg<sub>CO<sub>2</sub></sub>
				(<script> document.write(format(0)) </script>% of Water supply emissions).
				<br><br>
				If NRW was 
				<input type=number> %,<br>
				it would reduce 
				<b><span>0</span></b> % of Water supply emissions.
			</div>
		</div>
		<div class="card folded"><?php cardMenu("2. Authorized consumption per capita")?>
			<div class=opp>
				Authorized consumption is
				<b><script> document.write(format(0)) </script></b> m<sup>3</sup> 
				(<script> document.write(format(0)) </script> L/person/day).<br>
				Its related emissions are
				<b><script> document.write(format(0)) </script></b> kg<sub>CO<sub>2</sub></sub>.
				<br><br>If Authorized consumption was
				<input type=number> m<sup>3</sup> (<span>0</span> L/person/day),<br>
				it would reduce <b><span>0</span> %</b> of Water supply emissions
			</div>
		</div>
		<div class="card folded"><?php cardMenu("3. Energy consumption")?>
			<div class=opp>
				Energy consumption is
				<b><script>document.write(format(0))</script></b> kWh
				(<script>
					document.write(format(0)+" ")
					document.write(Global.General.Currency)
				</script>).<br>
				Its related emissions are
				<b><script>document.write(format(0))</script></b> kg<sub>CO<sub>2</sub></sub>.
				<br><br>
				If you reduce energy consumption by
				<input value=0 type=number> %,<br>
				you can reduce GHG emissions by <b><span>0</span></b> kg<sub>CO<sub>2</sub></sub>
				(<span>0</span>% of Water supply emissions)
				<br>
				and save <b><span>0</span></b>
				<script>document.write(Global.General.Currency)</script>
				(<span>0</span>% of energy costs).
			</div>
		</div>
	</div>

	<!--Wastewater-->
	<div class="card" style="background:#d71d24;">
		<?php cardMenu('Wastewater') ?>
			<div class="card folded"><?php cardMenu("1. Untreated wastewater")?>
				<div class=opp>
					Connected population is <b><script>document.write(Global.Waste.ww_conn_pop)</script></b> people.<br>
					Serviced population is <b><script>document.write(Global.Waste.ww_serv_pop)</script></b> people.<br>
					<br>If serviced population was
					<input type=number> people
					(<span>0</span>%),<br>
					it would reduce 
					<b><span>0</span> %</b> of Wastewater emissions.
				</div>
			</div>
			<div class="card folded"><?php cardMenu("2. Energy consumption")?>
				<div class=opp>
					Energy consumption is
					<b><script>document.write(format(0))</script></b> kWh
					(<script>
						document.write(format(0)+" ")
						document.write(Global.General.Currency)
					</script>).<br>
					Its related emissions are
					<b><script>document.write(format(0))</script></b> kg<sub>CO<sub>2</sub></sub>.
					<br><br>
					If you reduce energy consumption by
					<input value=0 type=number> %,<br>
					you can reduce GHG emissions by 
					<b><span>0</span></b> kg<sub>CO<sub>2</sub></sub>
					(<span>0</span>% of Wastewater emissions)
					<br> and save 
					<b><span>0</span></b>
					<script>document.write(Global.General.Currency)</script>
					(<span>0</span>% of energy costs).
				</div>
			</div>
	</div>
</div>

</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
