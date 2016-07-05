<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			document.querySelector('#idealServPop').value=Global.Waste.ww_serv_pop
			setServPop(Global.Waste.ww_serv_pop)
			document.querySelector('#idealNRW').value=Global.Water.ws_SL_non_revw()
			setNRW(Global.Water.ws_SL_non_revw())
			document.querySelector('#idealAuc').value=Global.Water.ws_vol_auth
			setAuc(Global.Water.ws_vol_auth)

			calculateGHG()
			findCriticGHG()
			drawCharts()
		}

		function findCriticGHG()
		{
			var max = 0
			var critic = false;
			var fields = document.querySelectorAll('#sources td[field]')
			for(var i=0;i<fields.length;i++)
			{
				var value = parseFloat(fields[i].getAttribute('value'))
				if(value>max)
				{
					max=value;
					critic=fields[i].getAttribute('field')
				}
			}
			if(!critic)return
			var element=document.querySelector("#sources td[field="+critic+"]")
			element.classList.add('critic')
			element.title="This is the highest GHG emission"
			element.previousSibling.classList.add('critic')
			element.previousSibling.title="This is the highest GHG emission"
		}

		function calculateGHG()
		{
			var fields = document.querySelectorAll('#sources [field]')
			for(var i=0;i<fields.length;i++)
			{
				var element = fields[i]
				var code = element.getAttribute('field')
				var level=(function()
				{
					if(code.substring(0,2)=="ws")
						return "Water"
					else
						return "Waste"
				})()
				var value=Global[level][code]();
				element.innerHTML=format(value);
				element.setAttribute('value',value);
			}
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
			var total = Global.Water.ws_KPI_GHG()+Global.Waste.ww_KPI_GHG();
			var reduction = Opps.unt(ideal);
			var percent = format(100*reduction/total);
			document.querySelector('#servPopReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)"
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
			document.querySelector('#nrwReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)";
		}

		function setAuc(ideal)
		{
			var reduction = Opps.auc(ideal);
			var total = Global.Water.ws_KPI_GHG();
			var percent = format(100*reduction/total);
			document.querySelector('#aucReduction').innerHTML=format(reduction)+" kg CO<sub>2</sub> ("+percent+"%)";
			var aucPerCapita = ideal*1000/Global.Water.ws_serv_pop/Global.General.Days();
			document.querySelector('#aucPerCapita').innerHTML=format(aucPerCapita)
		}
		
		function drawCharts()
		{
			Graphs.progress('nrwGraph',Global.Water.ws_SL_non_revw(),"Current "+translate("ws_SL_non_revw_descr"));
			Graphs.authCon('aucGraph');
			Graphs.progress('trtGraph',Global.Waste.ww_SL_treat_m3(),"Current serviced population");
		}
	</script>
	<style>
		@keyframes blink { from {background-color: white;} to {background-color: orange;} }
		#sources .critic {
			color:black;
			cursor:help;
			font-weight:bold;
			animation: blink 4s ease 0.5s infinite alternate;
		}

	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Opportunities to reduce GHG emissions</h1>

<div id=main>

<!--sources of ghg-->
<div class="card inline" style="width:28%"><?php cardMenu('Sources of GHG: Kg of CO<sub>2</sub> emitted') ?>
	<table id=sources>
		<style>
			table#sources{ margin: 10px 3px ; }
			table#sources td {max-width:70px}
		</style>
		
		<tr><th rowspan=9 style=font-weight:bold;background:lightgreen;color:black>T<br>O<br>T<br>A<br>L<br><br>G<br>H<br>G<br><br>
			(<span><script>document.write(format(Global.General.TotalGHG()))</script></span>)

		<th rowspan=2>Water<br>supply<br>(<span field=ws_KPI_GHG>0</span>)
			<td colspan=2>Electricity<td field=ws_KPI_GHG_elec>0
			<tr><td colspan=2>Fuel engines<td field=ws_KPI_GHG_ne>0

		<tr><th rowspan=7 class=red>Wastewater <br>(<span field=ww_KPI_GHG>0</span>)
			<td colspan=2>Electricity <td field=ww_KPI_GHG_elec>0
			<tr><td colspan=2>Fuel engines <td field=ww_KPI_GHG_ne_engines>0
			<tr><td colspan=2>Sludge transport <td field=ww_KPI_GHG_ne_tsludge>0
			<tr><td colspan=2>CH<sub>4</sub> in WWTP <td field=ww_KPI_GHG_ne_ch4_wwt>0
			<tr><td rowspan=2>Untreated wastewater<br>(<span field=ww_KPI_GHG_ne_unt>0</span>)
				<td>From CH<sub>4</sub> <td field=ww_KPI_GHG_ne_ch4_unt>0
				<tr><td>From N<sub>2</sub>O <td field=ww_KPI_GHG_ne_n2o_unt>0
	</table>
</div>

<!--Opportunities-->
<div class="card inline" id=opps style="width:70%"><?php cardMenu("Opportunities")?>
	<style>
		#opps > div.card {margin:1em}
		#opps > div.card > div.card {
			margin:0.7em;
		}
		#opps div.opp {padding:0.5em;text-align:left}
	</style>
	<!--Water-->
	<div class=card style="background:#0aaff1;"><?php cardMenu('Water supply')?>
			<div class=card><?php cardMenu("1. Non revenue water (NRW)")?>
				<div class=opp>
					Non revenue water is
					<b><script> document.write(format(Global.Water.ws_SL_non_revw())) </script>%</b>. 
					Its related emissions are
					<b><script> document.write(format(Global.Water.ws_SL_nrw_emis())) </script></b>
					kg CO<sub>2</sub>
					(<script> document.write(format(Global.Water.ws_SL_non_revw())) </script>% of Water supply emissions).
					<br> <br>
					If NRW was 
					<input type=number id=idealNRW onchange=setNRW(parseFloat(this.value)) style="width:40px"> %,
					it would reduce 
					<b><span id=nrwReduction>0</span></b> of Water supply emissions.
				</div>
				<div id=nrwGraph style=display:none>Loading...</div>
			</div>
			<div class=card><?php cardMenu("2. Authorized consumption")?>
				<div class=opp>
					Authorized consumption is
					<b><script>
						document.write(format(Global.Water.ws_vol_auth))
					</script></b> m<sup>3</sup> 
					(<script>
						document.write(format(Global.Water.ws_SL_auth_con()))
					</script> L/person/day).
					Its related emissions are
					<b><script>
						document.write(format(Global.Water.ws_SL_auc_emis()))
					</script></b> kg CO<sub>2</sub>.
					<br><br>If Authorized consumption was
					<input type=number style="width:50px" id=idealAuc onchange=setAuc(parseFloat(this.value))> m<sup>3</sup> 
						(<span id=aucPerCapita>0</span> L/person/day), it would reduce
						<b><span id=aucReduction>0</span></b> of Water supply emissions
				</div>
				<div id=aucGraph style=display:none>Loading...</div>
			</div>
	</div>

	<!--Wastewater-->
	<div class="card" style="background:#d71d24;">
		<?php cardMenu('Wastewater') ?>
			<div class=card><?php cardMenu("3. Untreated wastewater")?>
				<div class=opp>
					Connected population is <b><script>document.write(Global.Waste.ww_conn_pop)</script></b> people.<br>
					Serviced population is <b><script>document.write(Global.Waste.ww_serv_pop)</script></b> people
					(<script>
						(function(){
							var percentage = 100*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop;
							document.write(format(percentage));
						})();
					</script>%).
					<br><br>If serviced population was
					<input type=number id=idealServPop onchange=setServPop(parseFloat(this.value)) style=width:50px> people
					(<span id=idealServPop_prc></span>%),
					it would reduce 
					<b><span id=servPopReduction>0</span></b> of total emissions.
					<div id=trtGraph style=display:none>Loading...</div>
				</div>
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
