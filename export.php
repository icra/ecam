<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table{width:90%}
		button.button{margin:1px}
		button.l2{font-size:10px}
	</style>
	<script>
		function updateTable(obj,name)
		{
			var t=document.querySelector('#table')
			t.rows[0].cells[0].innerHTML=name;
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in obj)
			{
				//type of the field
				var type=typeof(obj[field]);
				//only this object
				if(type=='object')continue;
				//new row
				var newRow = t.insertRow(-1);

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
				newRow.insertCell(-1).innerHTML=Info[field].description;
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
				newRow.insertCell(-1).innerHTML=Info[field].explanation;
			}
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
<!--TITLE--><h1>Tables per stage</h1>
<h4>Click on a stage to view its variables. Then click on "Highlight text inside table" and paste to Excel</h4>
<!--buttons to select stage-->
<button class=button onclick=selectText(document.querySelector('#table'))>Highlight text inside table</button>
<div>
	<span style=background:#0aaff1>
		<button onclick="updateTable(Global.Water,              'L1 Water')"              class="button">L1 Water</button>
		<button onclick="updateTable(Global.Water.General,      'L2 Water Energy')"       class="button l2">L2 Energy</button>
		<button onclick="updateTable(Global.Water.Abstraction,  'L2 Water Abstraction')"  class="button l2">L2 Abstraction</button>
		<button onclick="updateTable(Global.Water.Treatment,    'L2 Water Treatment')"    class="button l2">L2 Treatment</button>
		<button onclick="updateTable(Global.Water.Distribution, 'L2 Water Distribution')" class="button l2">L2 Distribution</button>
	</span>
	&emsp;
	<span style=background:#bf5050>
		<button onclick="updateTable(Global.Waste,            'L1 Wastewater')"            class="button">L1 Wastewater</button>
		<button onclick="updateTable(Global.Waste.General,    'L2 Wastewater Energy')"     class="button l2">L2 Energy</button>
		<button onclick="updateTable(Global.Waste.Collection, 'L2 Wastewater Collection')" class="button l2">L2 Collection</button>
		<button onclick="updateTable(Global.Waste.Treatment,  'L2 Wastewater Treatment')"  class="button l2">L2 Treatment</button>
		<button onclick="updateTable(Global.Waste.Discharge,  'L2 Wastewater Discharge')"  class="button l2">L2 Discharge</button>
	</span>
</div>
<!--info table-->
<table id=table>
	<tr><th colspan=6 style=font-size:18px>No stage selected
	<tr><th>Code<th>Type<th>Name<th>Formula or Default value<th>Unit<th>Description
	<tr><td colspan=6 style="text-align:center;">Click on a stage
</table>
<!--FOOTER--><?php include'footer.php'?>
