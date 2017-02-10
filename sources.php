<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init() {
			calculateGHG();
			findCriticGHG();
			Caption.listeners();
			addDetailedListeners();
			updateResult();
		}

		function calculateGHG() {
			var fields=document.querySelectorAll('#sources [field]');
			for(var i=0;i<fields.length;i++) {
				var element=fields[i];
				var code=element.getAttribute('field');
				var loc=locateVariable(code);
				var value=loc.sublevel ? Global[loc.level][loc.sublevel][code]() : Global[loc.level][code]();
				element.innerHTML=format(value);
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
			element.setAttribute('cap',"This is the highest GHG emission of your system");

			//substages number
			element.previousSibling.classList.add('critic');
			element.previousSibling.setAttribute('caption',element.getAttribute('cap'));

			//name
			element.previousSibling.previousSibling.classList.add('critic');
			element.previousSibling.previousSibling.setAttribute('caption',element.getAttribute('cap'));
		}

		function addDetailedListeners()
		{
			var tds=document.querySelectorAll("td[field][level][sublevel]");
			for(var i=0;i<tds.length;i++)
			{
				tds[i].onmousemove=function(event)
				{
					var con=document.querySelector('#container_detailed');
					con.style.display=''
					con.style.left=(event.clientX+35)+"px"
					con.style.top=(event.clientY-50)+"px"
				}
			}
		}

		//fill table of detailed ghg sources
		function fillSources(td,ev)
		{
			//fill table
			var lvl=td.getAttribute('level');
			var sub=td.getAttribute('sublevel');
			var obj=Global[lvl][sub];
			var t=document.querySelector('table#detailed');
			while(t.rows.length>0)t.deleteRow(-1);
			for(var field in obj)
			{
				if(field.search('_KPI_GHG_')+1)
				{
					var newRow=t.insertRow(-1);
					newRow.insertCell(-1).innerHTML=translate(field+"_descr");
					var newCell=newRow.insertCell(-1)
					newCell.style.textAlign='right'
					newCell.innerHTML=format(obj[field]());
				}
			}

			//hide table
			td.onmouseout=function(){document.querySelector('#container_detailed').style.display='none'};
		}
	</script>
	<style>
		#sources td.ss {text-align:center} /*substages counter*/
		#sources td[field][level][sublevel]{cursor:help;padding-right:1em}
		#sources td[field][level][sublevel]:hover{background:rgba(64,83,109,0.2);transition:all 0.5s}
		#sources {
			box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
		}
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
<h4>
	Overview of all GHG emitted in <script>document.write(Global.General.Days())</script> days
</h4>
<h4>Move the mouse over the emissions to get a detailed view at each stage</h4>

<!--mobile div detailed sources-->
<div id=container_detailed style=display:none>
	<div><b> Detailed GHG sources </b></div>

	<table id=detailed></table>
	<style>
		div#container_detailed {
			font-size:11px;
			font-family:monospace;
			position:fixed;
			z-index:998;
			background:white;
			padding:0.3em 0.5em;
			box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
			border:1px solid #ccc;
			text-align:left;
		}
	</style>
</div>

<!--content-->
<div style=width:66%;>
	<!--sources of ghg-->
	<div>
		<div>
			<table id=sources>
				<tr><td colspan=5 style=text-align:center>
					GHG emissions &mdash; Kg CO<sub>2</sub>
					&mdash;
					<span class=circle style=background:orange></span> highest emission
				<tr><th rowspan=9 style="font-weight:bold;background:rgb(64,83,109);color:white">TOTAL GHG<br><br><span field=TotalGHG>0</span>

				<th rowspan=3><a href="edit.php?level=Water" style=color:white>Water supply</a><br><br><span field=ws_KPI_GHG>0</span>

					<!--wsa-->
					<td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'>Abstraction </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Abstraction.length)</script> 
						<td field=wsa_KPI_GHG level=Water sublevel=Abstraction onmouseenter=fillSources(this,event)>0

					<!--wst-->
					<tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'>Treatment   </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Treatment.length)</script> 
						<td field=wst_KPI_GHG level=Water sublevel=Treatment onmouseenter=fillSources(this,event)>0

					<!--wsd-->
					<tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'>Distribution</a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Distribution.length)</script> 
						<td field=wsd_KPI_GHG level=Water sublevel=Distribution onmouseenter=fillSources(this,event)>0

				<tr><th rowspan=3 class=red><a href="edit.php?level=Waste" style=color:white>Wastewater</a><br><br><span field=ww_KPI_GHG>0</span>

					<!--wwc-->
					<td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'>Collection</a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Collection.length)</script>
						<td field=wwc_KPI_GHG level=Waste sublevel=Collection onmouseenter=fillSources(this,event)>0

					<!--wwt-->
					<tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'>Treatment </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Treatment.length)</script> 
						<td field=wwt_KPI_GHG level=Waste sublevel=Treatment onmouseenter=fillSources(this,event)>0

					<!--wwd-->
					<tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'>Discharge </a> 
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Discharge.length)</script> 
						<td field=wwd_KPI_GHG level=Waste sublevel=Discharge onmouseenter=fillSources(this,event)>0
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
