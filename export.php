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
			var t=document.querySelector('#table')
			t.rows[0].cells[0].innerHTML=name;

			if(name.search('Wastewater')>-1)
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
<!--TITLE--><h1>Export to excel</h1>
<h4>Click on a stage to view its variables. Then click on "Highlight text inside table" and paste to Excel</h4>
<!--buttons to select stage-->
<button class=button onclick=selectText(document.querySelector('#table'))>Highlight text inside table</button>

<div>
	<table style=margin:1em>
		<tr><td>GHG assessment<td>Energy performance
		<tr>
			<td>
				<button onclick="updateTable(Global.Water,              'GHG assessment - Water supply')"       class="button">Water supply</button>
				<button onclick="updateTable(Global.Waste,            'GHG assessment - Wastewater')"            class="button">Wastewater</button>
			<td>
				<button onclick="updateTable(Global.Energy,  'Energy summary')"  class="button l2">Energy summary</button>
				<br>
				<button onclick="updateTable(Global.Water.Abstraction,  'Energy performance - Water Abstraction')"  class="button l2">Abstraction</button>
				<button onclick="updateTable(Global.Water.Treatment,    'Energy performance - Water Treatment')"    class="button l2">Treatment</button>
				<button onclick="updateTable(Global.Water.Distribution, 'Energy performance - Water Distribution')" class="button l2">Distribution</button>
				<br>
				<button onclick="updateTable(Global.Waste.Collection, 'Energy performance - Wastewater Collection')" class="button l2">Collection</button>
				<button onclick="updateTable(Global.Waste.Treatment,  'Energy performance - Wastewater Treatment')"  class="button l2">Treatment</button>
				<button onclick="updateTable(Global.Waste.Discharge,  'Energy performance - Wastewater Discharge')"  class="button l2">Discharge</button>
	</table>
</div>

<!--info table-->
<table id=table>
	<tr><th colspan=6 style=font-size:18px>No stage selected
	<tr><th>Code<th>Type<th>Name<th>Formula or Default value<th>Unit<th>Description
	<tr><td colspan=6 style="text-align:center;">Click on a stage
</table>
<!--FOOTER--><?php include'footer.php'?>
