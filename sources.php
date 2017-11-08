<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init(){
			calculateGHG();
			findCriticGHG();
			Caption.listeners();
			addDetailedListeners();
			updateResult();
			//onclick listeners for substage counters: link to substages.php
			var tds=document.querySelectorAll('td.ss');
			for(var i=0;i<tds.length;i++) {
				tds[i].onclick=function(){window.location='substages.php'}
			}
		}

		function drawCharts(){ }

		function calculateGHG() {
			//kg, kg per year, or kg per serviced population
			var divisor=(function() {
				var ret=1;//return value
				var select=document.querySelector('#ghg_divisor');
				switch(select.value) {
					case 'years':
						ret=Global.General.Years();
						break;
					case 'serv_pop':
						ret=function(code)
						{
							var ye=Global.General.Years();
							var ws=ye*Global.Water.ws_serv_pop;
							var ww=ye*Global.Waste.ww_serv_pop;
							var To=ye*(ws+ww);
							switch(code.substring(0,2))
							{
								case "ws": return ws; break;
								case "ww": return ww; break;
								case "To": return To; break;
								default:   return ye; break;
							}
						};
						break;
					default:
						break;
				}
				return ret;
			})();

			var fields=document.querySelectorAll('#sources [field]');
			for(var i=0;i<fields.length;i++) 
			{
				var element=fields[i];
				var code=element.getAttribute('field');
				var divisor_value = typeof(divisor)=="function" ? divisor(code) : divisor;
				var loc=locateVariable(code);
				var value=loc.sublevel ? (Global[loc.level][loc.sublevel][code]()/divisor_value) : (Global[loc.level][code]()/divisor_value);
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
			element.setAttribute('cap',translate("This is the highest GHG emission of your system"));

			//substages number
			element.previousSibling.classList.add('critic');
			element.previousSibling.setAttribute('caption',element.getAttribute('cap'));

			//name
			element.previousSibling.previousSibling.classList.add('critic');
			element.previousSibling.previousSibling.setAttribute('caption',element.getAttribute('cap'));
		}

		function addDetailedListeners() {
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
		function fillSources(td,ev) {
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
		#sources td.ss {text-align:center;cursor:pointer} /*substages counter*/
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
	<?php write("#GHG Emissions Summary (Overview)")?>
</h1>
<h4>
	<?php write("#assessment_period")?>
	<b>
		<script>document.write(Global.General.Days())</script> <?php write("#days")?>
		(<script>document.write(Global.General.Years())</script> <?php write("#years")?>)
	</b>
</h4>
<h4>
	<?php write("#move_the_mouse")?>
</h4>

<!--mobile div detailed sources-->
<div id=container_detailed style=display:none>
	<div><b>
		<?php write("#Detailed GHG sources")?>
	</b></div>
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
	
	<!--tab buttons-->
	<div class=tab_buttons id=ghg_summary_tabs>
		<button class=left onclick="tabs_show_tables()" disabled>
			<?php write("#Tables")?>
		</button>
		<button class=right onclick="tabs_show_graphs()">
			<?php write("#Charts")?>
		</button>
		<script>
			function tabs_show_graphs(){
				document.getElementById('tables').style.display='none'
				document.getElementById('graphs_container').style.display=''
				Graphs.graph4(false,'graph_1');
				Graphs.graph1(false,'graph_2');
				document.querySelector('#ghg_summary_tabs button.right').setAttribute('disabled',true)
				document.querySelector('#ghg_summary_tabs button.left').removeAttribute('disabled')
			}
			function tabs_show_tables(){
				document.getElementById('tables').style.display=''
				document.getElementById('graphs_container').style.display='none'
				document.querySelector('#ghg_summary_tabs button.right').removeAttribute('disabled')
				document.querySelector('#ghg_summary_tabs button.left').setAttribute('disabled',true)
			}
		</script>
	</div>
	
	<!--tables: left tab-->
	<div id=tables>
		<!--sources of ghg-->
		<div>
			<div>
				<table id=sources>
					<tr><td colspan=5 style=text-align:center>
						<?php write("#GHG emissions")?>
						<!--select divisor-->
						<select id=ghg_divisor onchange=init()>
							<option value=none>Kg CO2 eq
							<option value=years>Kg CO2 eq / <?php write("#year")?>
							<option value=serv_pop>Kg CO2 eq / <?php write("#year")?> / Serviced population
						</select>
						<!--legend-->
						<span style=float:right>
							<span class=circle style=background:orange></span> 
							<?php write("#highest emission")?>
						</span>
					<tr><th rowspan=9 style="font-weight:bold;background:rgb(64,83,109);color:white">
						<?php write('#TOTAL GHG')?>
						<br><br><span field=TotalGHG>
						<?php write("#Loading")?>...
					</span>

					<th rowspan=3>
						<a href="edit.php?level=Water" style=color:white>
							<?php write("#Water")?>
							(<script> 
								document.write(Global.Water.ws_serv_pop)
							</script> 
							<?php write("#people")?>
							)
						</a>
						<br><br><span field=ws_KPI_GHG>
							<?php write("#Loading")?>...
						</span>
					</th>
						<!--wsa-->
						<td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'><?php write('#Abstraction')?></a> 
							<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Abstraction.length)</script> 
							<td field=wsa_KPI_GHG level=Water sublevel=Abstraction onmouseenter=fillSources(this,event)><?php write('#Loading')?>...

						<!--wst-->
						<tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'><?php write('#Treatment')?></a> 
							<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Treatment.length)</script> 
							<td field=wst_KPI_GHG level=Water sublevel=Treatment onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
						</tr>

						<!--wsd-->
						<tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'><?php write('#Distribution')?></a> 
							<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Distribution.length)</script> 
							<td field=wsd_KPI_GHG level=Water sublevel=Distribution onmouseenter=fillSources(this,event)>
								<?php write('#Loading')?>...
						<tr>
					<th rowspan=3 class=red>
						<a href="edit.php?level=Waste" style=color:white>
							<?php write("#Waste")?>
							(<script> 
								document.write(Global.Waste.ww_serv_pop)
							</script> <?php write("#people")?>)
						</a>
						<br><br>
						<span field=ww_KPI_GHG>
							<?php write('#Loading')?>...
						</span>
					</th>

					<!--wwc-->
					<td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'><?php write('#Collection')?></a> 
						<td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Collection.length)</script>
						<td field=wwc_KPI_GHG level=Waste sublevel=Collection onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
					</td>

					<!--wwt-->
					<tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'><?php write('#Treatment')?></a> 
						<td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Treatment.length)</script> 
						<td field=wwt_KPI_GHG level=Waste sublevel=Treatment onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
					</tr>

					<!--wwd-->
					<tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'><?php write('#Discharge')?></a> 
						<td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Discharge.length)</script> 
						<td field=wwd_KPI_GHG level=Waste sublevel=Discharge onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
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

		<!--emissions outside boundaries-->
		<div>
			<table id=outside style="width:95%;margin:1.5em 0">
				<tr>
					<th rowspan=2 style=background:purple>
						<?php write("#GHG emissions")?>
						<br>
						<?php write("#outside utility boundaries")?>
						<br>
						(kg CO2 eq)
					</th>
					<td>
						<?php write("#wwc_SL_ghg_unc_descr")?>
					(<a href=variable.php?id=wwc_SL_ghg_unc>wwc_SL_ghg_unc</a>)
					<td field=wwc_SL_ghg_unc>
						<script>
							document.write(format(Global.Waste.Collection.wwc_SL_ghg_unc()))
						</script>
					</td>
				</tr>
				<tr>
					<td>
						<?php write("#wwc_SL_ghg_ons_descr")?>
						(<a href=variable.php?id=wwc_SL_ghg_ons>wwc_SL_ghg_ons</a>)
					<td field=wwc_SL_ghg_ons>
						<script>
							document.write(format(Global.Waste.Collection.wwc_SL_ghg_ons()))
						</script>
					</td>
				</tr>
			</table>
			<style>
				table#outside td[field] {text-align:right}
			</style>
		</div>
	</div>

	<!--graph 1: right tab-->
	<div id=graphs_container style=display:none>
		<div id=graph_1><?php write('#Loading')?>...</div>
		<div style="border-top:1px solid #ccc"></div>
		<div id=graph_2><?php write('#Loading')?>...</div>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
	google.charts.load('current',{'packages':['corechart','gauge','bar']});
</script>
