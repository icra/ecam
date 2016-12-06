<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			Inh.updateDefaults();
			Inh.showActive();
			updateResult();

			//add listeners for onclick
			(function(){
				var inputs = document.querySelectorAll("#inputs tr[stage] td.input input[id]")
				for(var i=0;i<inputs.length;i++)
				{
					inputs[i].onclick=function(){this.select()}
				}
			})();

			//first input click
			var first=document.querySelector('#inputs tr[stage] td.input input[id]');
			if(first.value=="0") first.click()
		}
	</script>
	<script>
		var Inh = {}; //namespace
		Inh.updateDefaults=function()
		{
			var inputs=document.querySelectorAll('#inputs tr[stage] input[id]');
			for(var i=0;i<inputs.length;i++)
			{
				var input = inputs[i];
				var field = input.id; 
				//set the longer description in the input <td> element
				input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');
				var L1 = field.search("ws")==0 ? "Water" : "Waste";
				//the value we are going to put in the input
				var value = Global[L1][field];
				value/=Units.multiplier(field);
				//set the value
				input.value=format(value);
			}
		};

		Inh.updateField=function(input)
		{
			//get info from the input element
			var field = input.id;
			var value = parseFloat(input.value.replace(",","")); //replace commmas for copy paste easyness
			value*=Units.multiplier(field);
			//if value is not a number, set to zero
			if(isNaN(value))value=0;
			//get L1 name: "Water" or "Waste"
			var L1 = field.search("ws")==0 ? "Water" : "Waste";
			//update
			if(Global[L1][field]===undefined){alert('field '+field+' undefined');return;}
			Global[L1][field]=value;
			init();
		};

		Inh.showActive=function()
		{
			['water','waste'].forEach(function(stage)
			{
				if(Global.Configuration.ActiveStages[stage])
				{
					var trs=document.querySelectorAll('#inputs tr[stage='+stage+']');
					for(var i=0;i<trs.length;i++)
						trs[i].classList.remove('hidden');
				}
				else
					document.querySelector('#inputs tr[indic='+stage+']').classList.remove('hidden');
			});
		}
	</script>
</head><body onload=init()>
<center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear diagram--><?php include'linear.php'?>

<h1>Population</h1>

<!--main-->
<div id=main> 
	<!--table-->
	<table id=inputs style="margin:1em;width:50%">
		<style>
			table#inputs th, #inputs td {text-align:left;}
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
			<tr stage=water class=hidden><td><?php write('#ws_resi_pop_descr')?> <td class=input><input id='ws_resi_pop' onchange="Inh.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=water class=hidden><td><?php write('#ws_serv_pop_descr')?> <td class=input><input id='ws_serv_pop' onchange="Inh.updateField(this)"> <td><?php write('#birds_people')?>
			<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>

		<!--WASTEWATER-->
		<tr><th colspan=3 style=background:#d71d24>
			<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
			<tr stage=waste class=hidden><td><?php write('#ww_resi_pop_descr')?><td class=input><input id='ww_resi_pop' onchange="Inh.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=waste class=hidden><td><?php write('#ww_conn_pop_descr')?><td class=input><input id='ww_conn_pop' onchange="Inh.updateField(this)"> <td><?php write('#birds_people')?>
			<tr stage=waste class=hidden>
				<td>Population serviced with wastewater treatment
				<td class=input><input id='ww_serv_pop' onchange="Inh.updateField(this)"> <td><?php write('#birds_people')?>
			<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
	</table>
</div>

<!--prev next-->
<div>
	<button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'">Prev</button>
	<button class="button next" onclick="event.stopPropagation();window.location='birds.php'">Next</button>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
