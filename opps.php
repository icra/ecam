<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			document.querySelector('#idealServPop').value=Global.Waste.ww_serv_pop
			setServPop(Global.Waste.ww_serv_pop)
			document.querySelector('#idealNRW').value=Global.Water.ws_SL_non_revw()
			setNRW(Global.Water.ws_SL_non_revw())
			drawCharts()
		}

		//untreated wastewater
		function setServPop(ideal)
		{
			if(ideal>Global.Waste.ww_conn_pop)
			{
				alert("Serviced population cannot be greater than Connected Population!")
				document.querySelector('#idealServPop').value=Global.Waste.ww_conn_pop
				return;
			}
			//calculate total ghg
			var total = Global.Water.ws_KPI_GHG()+Global.Waste.ww_KPI_GHG();
			var reduction = Opps.unt(ideal);
			var percent = format(100*reduction/total);
			document.querySelector('#servPopReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)"
			document.querySelector('#idealServPop_prc').innerHTML=format(100*ideal/Global.Waste.ww_conn_pop);
		}

		function setNRW(ideal)
		{
			var reduction = Opps.nrw(ideal);
			var total = Global.Water.ws_KPI_GHG();
			var percent = format(100*reduction/total);
			document.querySelector('#nrwReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)";
		}

		function setAuc(ideal)
		{
			var reduction = Opps.auc(ideal);
			var total = Global.Water.ws_KPI_GHG();
			var percent = format(100*reduction/total);
			document.querySelector('#aucReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)";
		}
		
		function drawCharts()
		{
			Graphs.graph1(false,'ghgGraph');
			Graphs.progress('nrwGraph',Global.Water.ws_SL_non_revw(),"Current "+translate("ws_SL_non_revw_descr"));
			Graphs.authCon('aucGraph');
			Graphs.progress('trtGraph',Global.Waste.ww_SL_treat_m3(),"Current serviced population");
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Opportunities to reduce GHG emissions</h1>

<!--GHG graph-->
<div class=card style=display:none><?php cardMenu("")?>
	<div graph id=ghgGraph>Loading</div>
	<style>
		#ghgGraph {
			width:50%;
			margin:auto;
		}
	</style>
</div>

<!--Opportunities-->
<div class=card><?php cardMenu("Opportunities")?>

	<!--Water-->
	<div class="card inline" style="background:#0aaff1;width:45%">
		<?php cardMenu('Water supply') ?>
			<div class=card><?php cardMenu("1. Non revenue water")?>
				<div style=padding:1em;text-align:left>
					Current Water supply GHG emissions are
					<b><script>
						document.write(format(Global.Water.ws_KPI_GHG()))
					</script></b>
					kg CO<sub>2</sub>
					<br>
					Current NRW related emissions are
					<b><script>
						document.write(format(Global.Water.ws_SL_nrw_emis()))
					</script></b>
					kg CO<sub>2</sub>
					(<script>
						document.write(format(Global.Water.ws_SL_non_revw()))
					</script>%)
					<br>
					Reducing NRW to 
					<input type=number id=idealNRW onchange=setNRW(parseFloat(this.value)) style="width:40px"> % 
					would reduce 
					<b><span id=nrwReduction>0</span></b> of current Water supply emissions.
				</div>
				<div id=nrwGraph style=display:none>Loading...</div>
			</div>
			<div class=card><?php cardMenu("2. Authorized consumption")?>
				<div style=padding:1em;text-align:left>
					Current authorized consumption related emissions are
					<b><script>
						document.write(format(Global.Water.ws_SL_auc_emis()))
					</script></b> kg CO2.<br>
					Current authorized consumption is
					<b><script>
						document.write(format(Global.Water.ws_vol_auth))
					</script></b> m3 
					(<script>
						document.write(format(Global.Water.ws_SL_auth_con()))
					</script> L/person/day).<br>
					Reducing Authorized consumption per capita to 
					<input type=number style="width:50px" onchange=setAuc(parseFloat(this.value))> m3 (___ L/person/day) would reduce
					<span id=aucReduction>___</span> of current Water supply emissions
				</div>
				<div id=aucGraph style=display:none>Loading...</div>
			</div>
	</div>

	<!--Wastewater-->
	<div class="card inline" style="background:#d71d24;width:45%;">
		<?php cardMenu('Wastewater') ?>
			<div class=card><?php cardMenu("1. Serviced population: CH<sub>4</sub> and N<sub>2</sub>O emissions from untreated wastewater")?>
				<div style=padding:1em;text-align:left>
					Connected population is <b><script>document.write(Global.Waste.ww_conn_pop)</script></b> people.<br>
					Serviced population is <b><script>document.write(Global.Waste.ww_serv_pop)</script></b> people
					(<script>
						(function(){
							var percentage = 100*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop;
							document.write(format(percentage));
						})();
					</script>%).<br>
					Current total GHG is <b><script>document.write(format(Global.Water.ws_KPI_GHG()+Global.Waste.ww_KPI_GHG()))</script></b> kg CO<sub>2</sub>.<br>
					Increasing Serviced population to
					<input type=number min=0 id=idealServPop onchange=setServPop(parseFloat(this.value)) style=width:50px> people
					(<span id=idealServPop_prc></span>%),
					would reduce 
					<b><u><span id=servPopReduction>0</span></u></b> of current total emissions
					<div id=trtGraph style=display:none>Loading...</div>
				</div>
			</div>
	</div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>
	google.charts.load('current',{'packages':['corechart','gauge']});
	google.charts.setOnLoadCallback(init)
</script>
