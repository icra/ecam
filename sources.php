<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init() {
			calculateGHG();
			findCriticGHG();
			Caption.listeners();
			updateResult();
		}

		function calculateGHG() {
			var fields=document.querySelectorAll('#sources [field]');
			for(var i=0;i<fields.length;i++) {
				var element=fields[i];
				var code=element.getAttribute('field');
				var loc=locateVariable(code);
				var value=loc.sublevel ? Global[loc.level][loc.sublevel][code]() : Global[loc.level][code]();
				element.innerHTML=format(value)+" kg CO<sub>2</sub>";
				element.setAttribute('value',value);
			}
		}

		function findCriticGHG() {
			var max=0;
			var critic=false;
			var fields=document.querySelectorAll('#sources td[field]');
			for(var i=0;i<fields.length;i++) {
				var value=parseFloat(fields[i].getAttribute('value'));
				if(value>max) {
					max=value;
					critic=fields[i].getAttribute('field')
				}
			}
			if(!critic)return;
			var element=document.querySelector("#sources td[field="+critic+"]");

			//CO2
			element.classList.add('critic');
			element.setAttribute('caption',"This is the highest GHG emission of your system");

			//substages number
			element.previousSibling.classList.add('critic');
			element.previousSibling.setAttribute('caption',element.getAttribute('caption'));

			//name
			element.previousSibling.previousSibling.classList.add('critic');
			element.previousSibling.previousSibling.setAttribute('caption',element.getAttribute('caption'));
		}
	</script>
	<style>
		#sources td.ss {text-align:center}
	</style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--> <?php include'navbar.php'?>
<!--linear--> <?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--title-->
<h1>
	<script>document.write(Global.General.Name)</script> 
	&mdash; 
	GHG Emissions Summary
</h1>

<!--content-->
<div style=width:60%>
	<!--sources of ghg-->
	<div>
		<div>
			<h4>
				Overview &mdash; Kg of CO<sub>2</sub> emitted in <script>document.write(Global.General.Days())</script> days
				&mdash;
				<span class=circle style=background:orange></span> highest emission
			</h4>
			<table id=sources>
				<tr><th rowspan=9 style="font-weight:bold;background:rgb(64,83,109);color:white">TOTAL GHG<br>(<span field=TotalGHG>0</span>)

				<th rowspan=3><a href="edit.php?level=Water" style=color:white>Water supply</a><br>(<span field=ws_KPI_GHG>0</span>)

					<td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'>Abstraction </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Abstraction.length)</script> 
						<td field=wsa_KPI_GHG>0

					<tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'>Treatment   </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Treatment.length)</script> 
						<td field=wst_KPI_GHG>0

					<tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'>Distribution</a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Distribution.length)</script> 
						<td field=wsd_KPI_GHG>0

				<tr><th rowspan=3 class=red><a href="edit.php?level=Waste" style=color:white>Wastewater</a><br>(<span field=ww_KPI_GHG>0</span>)

					<td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'>Collection</a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Collection.length)</script>
						<td field=wwc_KPI_GHG>0

					<tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'>Treatment </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Treatment.length)</script> 
						<td field=wwt_KPI_GHG>0

					<tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'>Discharge </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Discharge.length)</script> 
						<td field=wwd_KPI_GHG>0
				</tr>
			</table>
		</div>

		<style>
			@keyframes blink { from {background-color: white;} to {background-color: orange;} }
			table#sources .critic {
				color:black;
				cursor:help;
				font-weight:bold;
				animation:blink 3s ease 0.5s infinite alternate;
			}
			#sources a {color:black;font-weight:bold}
			table#sources td[field][value].critic:before {
				content:'\26a0 ';
				float:left;
				color:red;
			}
			table#sources{ 
				margin:10px 0; 
				width:95%;
			}
			table#sources td {padding:1.2em 0.5em;max-width:70px}
			table#sources td[field] {text-align:right}
			table#sources img {vertical-align:middle;width:30px;margin-right:10px}
		</style>
	</div>

	<!--Catalog of Solutions-->
	<div class=card id=CoS style=display:none><?php cardMenu("IWA Catalogue of solutions")?>
		<div style="text-align:left;padding:1.0em">
		This catalogue offers inspiring water, climate and energy solutions for each stage.
		</div>
		<a href="http://www.iwa-network.org/water-climate-energy-solutions/public/" target=_blank>
			IWA Catalogue of solutions
		</a>
		<style>
			#CoS a{
				display:block;
				margin:0.5em;
				color:white;
				font-weight:bold;
				border:1px solid #ccc;
				padding:1em;
				background:#0aaff1;
				border-radius:0.5em;
			}
		</style>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
