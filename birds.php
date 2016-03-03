<!--birds eye view-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init()
		{
			updateInputs();
			drawCharts();
			Exceptions.apply();
			updateResult();
		}

		//Wrapper for "updateTable"
		function updateInputs()
		{
			var t=document.getElementById('inputs');
			//reset table
			while(t.rows.length>0){t.deleteRow(-1)}
			//WATER inputs
			var newCell=t.insertRow(-1).insertCell(-1)
			newCell.setAttribute('colspan',5);
			newCell.innerHTML="Inputs WS &rarr; <a style=color:white href=edit.php?level=Water>Go</a>";
			newCell.style.color='white'
			newCell.style.backgroundColor='#0aaeef'
			updateTable(Global.Water,'inputs');
			//WASTEWATER inputs
			var newCell=t.insertRow(-1).insertCell(-1)
			newCell.setAttribute('colspan',5);
			newCell.innerHTML="Inputs WW &rarr; <a style=color:white href=edit.php?level=Waste>Go</a>";
			newCell.style.color='white'
			newCell.style.backgroundColor='#bf5050'
			updateTable(Global.Waste,'inputs');
		}

		/** Redisplay table */
		function updateTable(obj,id_table)
		{
			var t=document.getElementById(id_table);
			for(var field in obj)
			{
				/*first check if function*/
				if(typeof(obj[field])!="number") continue;
				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) continue;
				/*check if field is level3 specific*/if(Level3.isInList(field)) continue;
				/*new row*/var newRow=t.insertRow(-1);
				/*highlight outputs*/
				var pointer = field.search('^ww')==-1 ? "Global.Water" : "Global.Waste";
				newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'","'+pointer+'",1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'","'+pointer+'",0)');
				/*attribute field==field>*/newRow.setAttribute('field',field);
				/*description*/ var newCell=newRow.insertCell(-1);
				/*hotfix for non-existing variables (for example: when structure is updated)*/
				if(Info[field]===undefined)
				{
					obj[field]=undefined; //remove it
					continue;
				}
				newCell.setAttribute('title',Info[field].explanation);
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = Info[field]?Info[field].description:"<span style=color:#ccc>no description</span>";
					var code = "<a href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				newCell.className="input";
				newCell.setAttribute('onclick','transformField(this,'+pointer+')');

				/*value*/
				newCell.innerHTML=format(obj[field]/Units.multiplier(field));

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}

					var str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
					if(Info[field]===undefined)
					{
						return "<span style=color:#ccc>no unit</span>";
					}
					if(Units[Info[field].magnitude]===undefined)
					{
						return Info[field].unit
					}
					var currentUnit = Global.Configuration.Units[field] || Info[field].unit
					for(var unit in Units[Info[field].magnitude])
					{
						if(unit==currentUnit)
							str+="<option selected>"+unit+"</option>";
						else
							str+="<option>"+unit+"</option>";
					}
					str+="</select>"
					return str
				})();

				//data quality
				newRow.insertCell(-1).innerHTML=(function()
				{
					var select=document.createElement('select');
					select.setAttribute('onchange','DQ.update("'+field+'",this.value)');
					['Actual','Estimated'].forEach(function(opt)
					{
						var option=document.createElement('option');
						select.appendChild(option);
						option.innerHTML=opt;
						if(Global.Configuration.DataQuality[field]==opt)
							option.setAttribute('selected',true);
							
					});
					return select.outerHTML;
				})();
			}
		}

		function drawCharts()
		{
			Graphs.graph1(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.graph3(false,'graph3');
		}

		function transformField(element,obj)
		{
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.classList.add('input')
			input.autocomplete='off'
			input.onblur=function(){updateField(field,obj,input.value)}
			input.onkeypress=function(event){if(event.which==13){input.onblur()}}
			//value converted
			var multiplier=Units.multiplier(field);
			var currentValue=obj[field]/multiplier;
			input.value=currentValue;
			input.onkeydown=function(event)
			{
				switch(event.which)
				{
					case 38:input.value++;break;
					case 40:input.value--;break;
				}
			}
			element.appendChild(input);
			input.select();
		}

		function updateField(field,obj,newValue)
		{
			if(typeof(obj[field])=="number") newValue=parseFloat(newValue);
			//if a unit change is set, get it
			var multiplier=Units.multiplier(field);
			//update
			obj[field]=multiplier*newValue;
			init();
		}
	</script>
	<style>
		td.input input { margin:0;padding:0;width:95%;}
		td.input       { width:80px;text-align:right;color:#666;background-color:#eee;cursor:cell}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE--><h1>Bird's eye view (Level 1) of <script>document.write(Global.General.Name)</script></h1>
<!--description--><h4>Water supply system (WS) and Wastewater system (WW)</h4>
</center>

<!--tables-->
<div class=inline style="margin-left:5px;width:40%;">
	<table id=inputs></table>
</div>

<!--graphs-->
<div id=graphs class=inline style="width:55%;">
	<style> 
		#graphs table{margin:auto}
		#graphs button{display:block;margin:auto} 
	</style>
	<div id=graph1 class=inline style=max-width:45%></div>
	<div id=graph2 class=inline style=max-width:45%></div>
	<div id=graph3 style=margin-top:2px></div>
	<script>
		google.charts.load('current',{'packages':['corechart']});
		google.charts.setOnLoadCallback(init)
	</script>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
