<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			document.querySelector('#idealServPop').value=Global.Waste.ww_serv_pop
			setServPop(Global.Waste.ww_serv_pop)
		}

		//untreated wastewater
		function setServPop(idealServPop)
		{
			if(idealServPop>Global.Waste.ww_conn_pop)
			{
				alert("Serviced population cannot be greater than Connected Population!")
				document.querySelector('#idealServPop').value=Global.Waste.ww_conn_pop
				return;
			}
			var reduction = 0;
			reduction +=Opps.Waste.ww_ch4_unt(idealServPop);
			reduction +=Opps.Waste.ww_n2o_unt(idealServPop);
			document.querySelector('#servPopReduction').innerHTML=format(reduction)
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<h1>Opportunities to reduce GHG emissions</h1>

<div class="card inline" style="background:#0aaff1;width:45%">
	<?php cardMenu('Water supply') ?>
	<ul style=margin:1em;text-align:left>
		<li>N/A (i.e. increase serviced population to P to reduce N kg CO2)
	</ul>
</div>

<div class="card inline" style="background:#d71d24;width:45%;">
	<?php cardMenu('Wastewater') ?>
		<div class=card><?php cardMenu("1. Increase Serviced Population: this reduces CH<sub>4</sub> and N<sub>2</sub>O emissions from untreated wastewater")?><div style=padding:1em;text-align:left>
			Connected population is <b><script>document.write(Global.Waste.ww_conn_pop)</script></b> people.<br>
			Serviced population is <b><script>document.write(Global.Waste.ww_serv_pop)</script></b> people 
			(<script>
				(function(){
					var percentage = 100*Global.Waste.ww_serv_pop/Global.Waste.ww_conn_pop;
					document.write(format(percentage));
				})();
			</script> %).<br>
			If Serviced population was:
			<input type=number min=0 id=idealServPop onchange=setServPop(parseFloat(this.value)) style=width:50px> people,
			GHG emissions would be reduced by
			<b><u><span id=servPopReduction>0</span></u></b> kg CO<sub>2</sub>
		</div></div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
