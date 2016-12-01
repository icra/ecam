<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body {background:#F5ECCE}
		h1{background:white;border-bottom:1px solid #ccc}

		/*
			legend colors for graphs
		*/
		span.circle{display:none}
		span.circle{float:right}
	</style>
	<script>
		function init(detailed)
		{
			detailed=detailed||false;
			BEV.showActive();
			BEV.updateDefaults();
			drawCharts();
			if(detailed) Graphs.graph4(false,'graph1'); //make first graph detailed
			updateResult();
		}

		function drawCharts()
		{
			Graphs.graph1(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.ws_cost('graph3');
			Graphs.ww_cost('graph4');
			Graphs.gauge('graph5', Global.Water.ws_SL_serv_pop()||0, translate("ws_SL_serv_pop_descr"));
			Graphs.gauge('graph6', Global.Waste.ww_SL_serv_pop()||0, translate("ww_SL_serv_pop_descr"));
		}

		var BEV={}; //'Birds Eye View' namespace

		//Generic f for updating internal values
		BEV.update=function(obj,field,newValue)
		{
			if(obj[field]===undefined) { alert('field '+field+' undefined'); return; }
			//newValue may be a string from input.value, it should be a float
			newValue=parseFloat(newValue);
			obj[field]=newValue;
		}

		//Specific behaviour for each formula when user inputs data
		BEV.updateField=function(input)
		{
			//get info from the input element
			var field = input.id;
			var value = parseFloat(input.value.replace(",","")); //replace commmas for copy paste easyness

			value*=Units.multiplier(field);

			//if value is not a number, set to zero
			if(isNaN(value))value=0;

			//get L1 name: "Water" or "Waste"
			var L1 = field.search("ws")==0 ? "Water" : "Waste";
			var L2 = field.search("wsa_")==0 ? "Abstraction" : false;
			//TODO

			//update
			if(L2)
				this.update(Global[L1][L2],field,value);
			else
				this.update(Global[L1],field,value);
				
			//add a color to the field
			input.classList.add('edited');
			init(true);
		}

		//Display default values from the table
		BEV.updateDefaults=function()
		{
			var inputs = document.querySelectorAll('#inputs input');
			for(var i=0; i<inputs.length; i++)
			{
				var input = inputs[i];
				var field = input.id; 

				//set the longer description in the input <td> element
				input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');

				var L1 = field.search("ws")==0 ? "Water" : "Waste";
				var L2 = field.search("wsa_")==0 ? "Abstraction" : false;
				//TODO

				//the value we are going to put in the input
				var value = L2 ? Global[L1][L2][field] : Global[L1][field];

				value/=Units.multiplier(field);

				//set the value
				input.value=format(value);
			}
		}

		BEV.showActive=function() //only show water/wastewater inputs if active
		{
			['water','waste'].forEach(function(stage)
			{
				if(Global.Configuration.ActiveStages[stage]==1)
				{
					//show all rows with stage=stage
					var rows = document.querySelectorAll('#inputs tr[stage='+stage+']');
					for(var i=0; i<rows.length; rows[i++].classList.remove('hidden')){}
				}
				else //show "Stage not active"
				{
					document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
				}
			});
		}

		function makeInactive(input)
		{
			input.setAttribute('disabled',true)
			input.style.background="#eee"
			var tr = input.parentNode.parentNode;
			tr.style.background="#eee"
			tr.title="<?php write('#Inactive')?>"
			tr.style.color="#888"
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#quick_assessment')?> 
	<div style="font-size:13px;color:#666;margin-top:5px">
		<span><a href=variable.php?id=Days>        <?php write('#assessment_period')?></a>: <script>document.write(Global.General.Days())</script> <?php write('#days')?></span> 
		·
		<span><a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>: 
			<script>
				(function(){
					var c = Global.General.conv_kwh_co2;
					var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' title='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+" &#9888;</span>" : format(c); 
					document.write(str)
				})();
			</script> kg CO<sub>2</sub>/kWh
		</span> 
	</span>
</h1></center>

<!--content-->
<div>
	<!--inputs-->
	<div class="card inline" style="width:35%;"><?php cardMenu("Inputs &mdash; Operational Values during the assessment period")?>
		<!--table-->
		<table id=inputs style=width:100%>
			<style>
				table#inputs th, #inputs td {text-align:left;}
				#inputs th, #inputs td {border-left:none;border-right:none}
				#inputs input.edited {background:lightgreen;}
				#inputs td.input {
					width:70px;
					border:1px solid #aaa;
					color:#666;
					background:#eee;
					padding:0 !important;
				}
				#inputs td.input input {
					background:inherit;
					border:none;
					text-align:right;
					cursor: cell;
					line-height:1em;
					width:70px;
					height:24px;
					display:block;
					padding:0.2em;
				}
				#inputs td.input input:focus {
					background:white;
				}
				#inputs tr.hidden {display:none}
				/**indication "not active"**/
				#inputs tr[indic]{text-align:center;color:#999;background:#eee}
			</style>

			<!--WATER-->
			<tr><th colspan=3>
				<img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>

				<tr stage=water class=hidden><td><?php write('#ws_resi_pop_descr')?> <td class=input><input id='ws_resi_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
				<tr stage=water class=hidden><td><?php write('#ws_serv_pop_descr')?> <td class=input><input id='ws_serv_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>

				<tr stage=water class=hidden>
					<td>Total water abstracted
					<td class=input><input id='wsa_vol_conv' onchange="BEV.updateField(this)"> 
					<td>m<sup>3</sup>

				<tr stage=water class=hidden><td><?php write('#birds_ws_vol_auth')?> <td class=input><input id='ws_vol_auth' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
				<tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td class=input><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td class=input><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>

			<!--WASTEWATER-->
			<tr><th colspan=3 style=background:#d71d24>
				<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
				<tr stage=waste class=hidden><td><?php write('#ww_resi_pop_descr')?><td class=input><input id='ww_resi_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
				<tr stage=waste class=hidden><td><?php write('#ww_conn_pop_descr')?><td class=input><input id='ww_conn_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
				<tr stage=waste class=hidden>
					<td>Population serviced with WW treatment
					<td class=input><input id='ww_serv_pop' onchange="BEV.updateField(this)"> <td><?php write('#birds_people')?>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_vol_wwtr')?><td class=input><input id='ww_vol_wwtr' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
					<span class=circle style=background:#89375c></span>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cost')?><td class=input><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_run_cost')?><td class=input><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=waste class=hidden>
					<td><?php write('#birds_ww_n2o_effl')?> 
					<td class=input><input id='ww_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
						<span class=circle style=background:#b8879d></span>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_prot_con')?>
					<td class=input><input id='ww_prot_con' onchange="BEV.updateField(this)"> <td>kg/person/<?php write('#birds_year')?>
					<span class=circle style=background:#451c2e></span>

				<tr stage=waste class=hidden><td>
					<?php write("#producing_biogas")?>?
					<td>
						<label><?php write("#no")?>  
							<input name=producing_biogas ans=0 type=radio onclick="Global.Configuration['Yes/No'].producing_biogas=0;init(true)">
						</label>
					<td>
						<label><?php write("#yes")?> 
							<input name=producing_biogas ans=1 type=radio onclick="Global.Configuration['Yes/No'].producing_biogas=1;init(true)">
						</label>
						<script>
							(function(){
								var ans=Global.Configuration['Yes/No'].producing_biogas;
								document.querySelector('input[name=producing_biogas][ans="'+ans+'"]').checked=true;
							})();
						</script>
					<span class=circle style=background:#b8879d></span>
				<tr stage=waste class=hidden><td>
					<?php write("#valorizing_biogas")?>?
					<td>
						<label><?php write("#no")?>
						<input name=valorizing_biogas ans=0 type=radio onclick="Global.Configuration['Yes/No'].valorizing_biogas=0;init(true)">
						</label>
					<td>
						<label><?php write("#yes")?>
						<input name=valorizing_biogas ans=1 type=radio onclick="Global.Configuration['Yes/No'].valorizing_biogas=1;init(true)">
						</label>
					<script>
						(function(){
							var ans = Global.Configuration['Yes/No'].valorizing_biogas;
							document.querySelector('input[name=valorizing_biogas][ans="'+ans+'"]').checked=true;
						})();
					</script>
					<span class=circle style=background:#b8879d></span>
				<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
		</table>

		<script>
			(function(){
				var inputs = document.querySelectorAll("#inputs input")
				for(var i=0;i<inputs.length;i++)
				{
					if(inputs[i].type=="radio") continue;
					inputs[i].onclick=function(){this.select()}
				}
			})()
		</script>
	</div>

	<!--graphs-->
	<div class="card inline" style="width:63%"><?php cardMenu($lang_json['#graphs'])?>
		<div id=graphs>
			<style> 
				#graphs table{margin:auto !important;margin-bottom:0.5em !important}
				#graphs button{margin:0.5em;margin-top:0;font-size:10px} 
				#graphs div div {text-align:center;position:relative} 
				#graphs div.options {text-align:center;padding:1em}
				#graphs div[graph] {
					display:inline-block;
					text-align:center;
					vertical-align:top;
					width:50%;
					margin-left:-5px;
					margin-bottom:-1px;
					border:1px solid #ddd;
					padding:0;
				}
			</style>

			<div style=text-align:center>
				<div graph id=graph1><?php write('#loading')?></div>
				<div graph id=graph2><?php write('#loading')?></div>
				<!---->
				<div graph id=graph3><?php write('#loading')?></div>
				<div graph id=graph4><?php write('#loading')?></div>
				<!---->
				<div graph id=graph5></div>
				<div graph id=graph6></div>
				<div graph style="width:98%;padding:1em 0;margin-bottom:1em;border:none">
					For further details on energy consumption &amp; opportunities to reduce GHG emissions go to 
					<b>Detailed GHG Assessment</b> (<a href=#>&uarr;</a>)
				</div>
				<script>
					(function(){
						//hide inactive graphs
						if(Global.Configuration.ActiveStages.water==0)
						{
							document.querySelector("#graph3").style.display="none"
							document.querySelector("#graph5").style.display="none"
						}
						if(Global.Configuration.ActiveStages.waste==0)
						{
							document.querySelector("#graph4").style.display="none"
							document.querySelector("#graph6").style.display="none"
						}
					})();
				</script>
			</div>
			<script>
				google.charts.load('current',{'packages':['corechart','gauge']});
				google.charts.setOnLoadCallback(init)
			</script>
		</div>
	</div>

	<!--PREV & NEXT BUTTONS-->
	<div style=margin:1em;text-align:center> 
		<script>
			//find first available stage to start entering data
			function nextPage()
			{
				event.stopPropagation();
				//go to first active substage
				var location;
				if(Global.Configuration.ActiveStages.waterAbs)
					location = "edit.php?level=Water&sublevel=Abstraction";
				else if(Global.Configuration.ActiveStages.waterTre)
					location = "edit.php?level=Water&sublevel=Treatment";
				else if(Global.Configuration.ActiveStages.waterDis)
					location = "edit.php?level=Water&sublevel=Distribution";
				else if(Global.Configuration.ActiveStages.wasteCol)
					location = "edit.php?level=Waste&sublevel=Collection";
				else if(Global.Configuration.ActiveStages.wasteTre)
					location = "edit.php?level=Waste&sublevel=Treatment";
				else if(Global.Configuration.ActiveStages.wasteDis)
					location = "edit.php?level=Waste&sublevel=Discharge";
				else if(Global.Configuration.ActiveStages.water)
					location = "edit.php?level=Water";
				else if(Global.Configuration.ActiveStages.waste)
					location = "edit.php?level=Waste";
				else
				{
					alert("<?php write('#configuration_active_stages_error')?>");
					return;
				}
				window.location=location;
			}
		</script>
		<button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'"><?php write('#previous')?></button><!--
		--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
	</div>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
