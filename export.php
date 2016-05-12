<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table#table{width:90%}
		button.button{margin:1px}
		button.l2{font-size:10px}
		table.ww th{background:#bf5050}
	</style>
	<script>
		function updateTable(obj,name)
		{
			//make highlight button enabled
			document.querySelector('#highlight').removeAttribute('disabled')

			//get the table t
			var t=document.querySelector('#table')
			t.rows[0].cells[0].innerHTML=name;

			if(name.search('<?php write('#Waste')?>')>-1)
				t.classList.add('ww')
			else
				t.classList.remove('ww')
			
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in obj)
			{
				//type of the field
				var type=typeof(obj[field]);
				//only this object
				if(type=='object')continue;
				//new row
				var newRow=t.insertRow(-1);

				//code
				newRow.insertCell(-1).innerHTML=field
				//type
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(field.search("c_")>=0) return "Calculated variable";
					switch(type)
					{
						case "number":   return "Input"; break;
						case "function": return "PI";    break;
					}
				})();
				//name
				newRow.insertCell(-1).innerHTML=translate(field+'_descr');
				//formula or default value
				newRow.insertCell(-1).innerHTML=(function()
				{
					switch(type)
					{
						case "number":return obj[field];break;;
						case "function": 
							var formula=obj[field].toString();
							(function()
							{
								formula=Formulas.prettify(formula)
								
							})();
							return formula;
							break;
					}
				})();
				//unit
				newRow.insertCell(-1).innerHTML=Info[field].unit;
				//description
				newRow.insertCell(-1).innerHTML=translate(field+'_expla');
			}
			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}
		function selectText(el) 
		{
			var body = document.body, range, sel;
			if (document.createRange && window.getSelection) {
				range = document.createRange();
				sel = window.getSelection();
				sel.removeAllRanges();
				try {
					range.selectNodeContents(el);
					sel.addRange(range);
				} catch (e) {
					range.selectNode(el);
					sel.addRange(range);
				}
			} else if (body.createTextRange) {
				range = body.createTextRange();
				range.moveToElementText(el);
				range.select();
			}
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--> <?php include'linear.php'?>
<!--TITLE--><h1><?php write('#export_title')?></h1>
<h4><?php write('#export_description')?></h4>

<!--buttons to select stage-->
<div class=inline>
	<table>
		<tr><td><?php write('#ghg_assessment')?><td><?php write('#energy_performance')?>
		<tr><td>
			<button onclick="updateTable(Global.Water, '<?php write("#Water")?>')" class="button"><?php write('#Water')?></button>
			<td>
				<button onclick="updateTable(Global.Water.Abstraction,  '<?php write('#energy_performance')?> - Abstraction')"   class="button l2"><?php write('#Abstraction')?></button>
				<button onclick="updateTable(Global.Water.Treatment,    '<?php write('#energy_performance')?> - Treatment')"     class="button l2"><?php write('#Treatment')?></button>
				<button onclick="updateTable(Global.Water.Distribution, '<?php write('#energy_performance')?> - Distribution')"  class="button l2"><?php write('#Distribution')?></button> <br>
		<tr><td>
			<button onclick="updateTable(Global.Waste, '<?php write("#Waste")?>')" class="button"><?php write('#Waste')?></button>
			<td>
				<button onclick="updateTable(Global.Waste.Collection,   '<?php write('#energy_performance')?> - <?php write('#Collection')?>')" class="button l2"><?php write('#Collection')?></button>
				<button onclick="updateTable(Global.Waste.Treatment,    '<?php write('#energy_performance')?> - <?php write('#Treatment')?>')"  class="button l2"><?php write('#Treatment')?></button>
				<button onclick="updateTable(Global.Waste.Discharge,    '<?php write('#energy_performance')?> - <?php write('#Discharge')?>')"  class="button l2"><?php write('#Discharge')?></button>
		<tr><td><td><button onclick="updateTable(Global.Energy, '<?php write('#energy_summary')?>')" class="button l2"><?php write('#energy_summary')?></button> <br>
	</table>
</div>

<button id=highlight disabled class=button style="margin:2em;font-size:18px" onclick=selectText(document.querySelector('#table'))>
	<?php write('#export_highlight_button')?>
</button>

<!--info table-->
<table id=table style=margin-top:0.5em>
	<tr><th colspan=6 style=font-size:18px><?php write('#export_no_stage_selected')?>
	<tr>
		<th><?php write('#export_code')?>
		<th><?php write('#export_type')?>
		<th><?php write('#export_name')?>
		<th><?php write('#export_form')?>
		<th><?php write('#export_unit')?>
		<th><?php write('#export_desc')?>
	<tr><td colspan=6 style="text-align:center;">
		<?php write('#export_click_on_a_stage')?>
</table>

<!--FOOTER--><?php include'footer.php'?>
