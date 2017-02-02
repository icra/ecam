<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			document.querySelector('#idealServPop').value=Global.Waste.ww_serv_pop
			setServPop(Global.Waste.ww_serv_pop)
			document.querySelector('#idealNRW').value=Global.Water.ws_SL_non_revw()||0;
			setNRW(Global.Water.ws_SL_non_revw())
			document.querySelector('#idealAuc').value=Global.Water.Distribution.wsd_auth_con;
			setAuc(Global.Water.Distribution.wsd_auth_con)

			Caption.listeners();
		}

		function setServPop(ideal) //ideal serviced pop for untreated wastewater
		{
			if(ideal>Global.Waste.ww_conn_pop)
			{
				alert("Serviced population cannot be greater than Connected Population!")
				document.querySelector('#idealServPop').value=Global.Waste.ww_conn_pop
				return;
			}
			if(ideal<0)
			{
				alert("Serviced population cannot be lower than 0!")
				document.querySelector('#idealServPop').value=0
				return;
			}
			//calculate total ghg
			var total = Global.Waste.ww_KPI_GHG();
			var reduction = Opps.unt(ideal);
			var percent = format(100*reduction/total);
			document.querySelector('#servPopReduction').innerHTML=format(reduction)+" kg<sub>CO<sub>2</sub></sub> ("+percent+"%)"
			document.querySelector('#idealServPop_prc').innerHTML=format(100*ideal/Global.Waste.ww_conn_pop);
		}

		function setNRW(ideal) //ideal non revenue water for nrw emissions
		{
			if(ideal<0)
			{
				alert("Non revenue water cannot be lower than 0 %")
				document.querySelector('#idealNRW').value=0
				return;
			}
			var reduction = Opps.nrw(ideal);
			var total = Global.Water.ws_KPI_GHG();
			var percent = format(100*reduction/total);
			document.querySelector('#nrwReduction').innerHTML=format(reduction)+" kg<sub>CO<sub>2</sub></sub> ("+percent+"%)";
		}

		function setAuc(ideal)
		{
			var reduction = Opps.auc(ideal);
			var total = Global.Water.ws_KPI_GHG();
			var percent = format(100*reduction/total);
			document.querySelector('#aucReduction').innerHTML=format(reduction)+" kg<sub>CO<sub>2</sub></sub> ("+percent+"%)";
			var aucPerCapita = ideal*1000/Global.Water.ws_serv_pop/Global.General.Days();
			document.querySelector('#aucPerCapita').innerHTML=format(aucPerCapita)
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<h1>Opportunities to reduce GHG emissions</h1>

<div id=main>

<!--Opportunities column-->
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
			<div class=card><?php cardMenu("1. Non revenue water (NRW)")?>
				<div class=opp>
					Non revenue water is
					<b><script> document.write(format(Global.Water.ws_SL_non_revw())) </script>%</b>. 
					Its related emissions are
					<b><script> document.write(format(Global.Water.ws_SL_nrw_emis())) </script></b>
					kg<sub>CO<sub>2</sub></sub>
					(<script> document.write(format(Global.Water.ws_SL_non_revw())) </script>% of Water supply emissions).
					<br> <br>
					If NRW was 
					<input type=number id=idealNRW onchange=setNRW(parseFloat(this.value))> %,
					it would reduce 
					<b><span id=nrwReduction>0</span></b> of Water supply emissions.
				</div>
			</div>
			<div class=card><?php cardMenu("2. Authorized consumption per capita")?>
				<div class=opp>
					Authorized consumption is
					<b><script>
						document.write(format(Global.Water.Distribution.wsd_auth_con))
					</script></b> m<sup>3</sup> 
					(<script>
						document.write(format(Global.Water.ws_SL_auth_con()))
					</script> L/person/day).
					Its related emissions are
					<b><script>
						document.write(format(Global.Water.ws_SL_auc_emis()))
					</script></b> kg<sub>CO<sub>2</sub></sub>.
					<br><br>If Authorized consumption was
					<input type=number id=idealAuc onchange=setAuc(parseFloat(this.value))> m<sup>3</sup> 
						(<span id=aucPerCapita>0</span> L/person/day), it would reduce
						<b><span id=aucReduction>0</span></b> of Water supply emissions
				</div>
			</div>
			<div class=card><?php cardMenu("3. Energy efficiency")?>
				<div class=opp>
					Energy consumption is
					<b><script>
						document.write(format(Global.Water.ws_nrg_cons))
					</script></b> kWh
					(<script>
						document.write(format(Global.Water.ws_nrg_cost)+" ")
						document.write(Global.General.Currency)
					</script>).
					Its related emissions are
					<b><script>
						document.write(format(Global.Water.ws_KPI_GHG_elec()))
					</script></b> kg<sub>CO<sub>2</sub></sub>.
					<br><br>
					If you reduce energy consumption by
					<input value=0 onchange=setNrgCons(parseFloat(this.value)) type=number id=ideal_ws_nrg_cons_percent> %,
					you can reduce GHG emissions by <b><span id=ws_KPI_GHG_elec_reduction>0</span></b> kg<sub>CO<sub>2</sub></sub>
					(<span id=ws_KPI_GHG_elec_reduction_prc>0</span>% of Water supply emissions)
					<br>
					and save <b><span id=ws_KPI_GHG_elec_reduction_money>0</span></b>
					<script>document.write(Global.General.Currency)</script>
					(<span id=ws_KPI_GHG_elec_reduction_money_prc>0</span>% of energy costs).
					<script>
						function setNrgCons(ideal)
						{
							var current = Global.Water.ws_nrg_cons;
							var newCons = (100-ideal)/100*current;
							var newGHGs = newCons*Global.General.conv_kwh_co2;
							var reduction = Global.Water.ws_KPI_GHG_elec()-newGHGs;
							document.querySelector('#ws_KPI_GHG_elec_reduction').innerHTML=format(reduction);
							var reduction_prc = 100*reduction/Global.Water.ws_KPI_GHG();
							document.querySelector('#ws_KPI_GHG_elec_reduction_prc').innerHTML=format(reduction_prc);
							//money reduction
							var factor = Global.Water.ws_nrg_cost / current; 
							var newCost = newCons*factor;
							var reduction_money = Global.Water.ws_nrg_cost-newCost;
							document.querySelector('#ws_KPI_GHG_elec_reduction_money').innerHTML=format(reduction_money);
							var reduction_money_prc = 100*reduction_money/Global.Water.ws_nrg_cost;
							document.querySelector('#ws_KPI_GHG_elec_reduction_money_prc').innerHTML=format(reduction_money_prc);
						}
					</script>
				</div>
			</div>
	</div>

	<!--Wastewater-->
	<div class="card" style="background:#d71d24;">
		<?php cardMenu('Wastewater') ?>
			<div class=card><?php cardMenu("1. Untreated wastewater")?>
				<div class=opp>
					Connected population is <b><script>document.write(Global.Waste.ww_conn_pop)</script></b> people.
					Serviced population is <b><script>document.write(Global.Waste.ww_serv_pop)</script></b> people
					(<script>
						(function(){
							var percentage = 100*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop;
							document.write(format(percentage));
						})();
					</script>%).
					<br><br>If serviced population was
					<input type=number id=idealServPop onchange=setServPop(parseFloat(this.value))> people
					(<span id=idealServPop_prc></span>%),
					it would reduce 
					<b><span id=servPopReduction>0</span></b> of Wastewater emissions.
				</div>
			</div>
			<div class=card><?php cardMenu("2. Energy efficiency")?>
				<div class=opp>
					Energy consumption is
					<b><script>
						document.write(format(Global.Waste.ww_nrg_cons))
					</script></b> kWh
					(<script>
						document.write(format(Global.Waste.ww_nrg_cost)+" ")
						document.write(Global.General.Currency)
					</script>).
					Its related emissions are
					<b><script>
						document.write(format(Global.Waste.ww_KPI_GHG_elec()))
					</script></b> kg<sub>CO<sub>2</sub></sub>.
					<br><br>
					If you reduce energy consumption by
					<input value=0 onchange=setNrgCons_ww(parseFloat(this.value)) type=number id=ideal_ww_nrg_cons_percent> %,
					you can reduce GHG emissions by <b><span id=ww_KPI_GHG_elec_reduction>0</span></b> kg<sub>CO<sub>2</sub></sub>
					(<span id=ww_KPI_GHG_elec_reduction_prc>0</span>% of Wastewater emissions)
					<br>
					and save <b><span id=ww_KPI_GHG_elec_reduction_money>0</span></b>
					<script>document.write(Global.General.Currency)</script>
					(<span id=ww_KPI_GHG_elec_reduction_money_prc>0</span>% of energy costs).
					<script>
						function setNrgCons_ww(ideal)
						{
							var current = Global.Waste.ww_nrg_cons;
							var newCons = (100-ideal)/100*current;
							var newGHGs = newCons*Global.General.conv_kwh_co2;
							var reduction = Global.Waste.ww_KPI_GHG_elec()-newGHGs;
							document.querySelector('#ww_KPI_GHG_elec_reduction').innerHTML=format(reduction);
							var reduction_prc = 100*reduction/Global.Waste.ww_KPI_GHG();
							document.querySelector('#ww_KPI_GHG_elec_reduction_prc').innerHTML=format(reduction_prc);
							//money reduction
							var factor = Global.Waste.ww_nrg_cost / current; 
							var newCost = newCons*factor;
							var reduction_money = Global.Waste.ww_nrg_cost-newCost;
							document.querySelector('#ww_KPI_GHG_elec_reduction_money').innerHTML=format(reduction_money);
							var reduction_money_prc = 100*reduction_money/Global.Waste.ww_nrg_cost;
							document.querySelector('#ww_KPI_GHG_elec_reduction_money_prc').innerHTML=format(reduction_money_prc);
						}
					</script>
				</div>
			</div>
	</div>
</div>

</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
