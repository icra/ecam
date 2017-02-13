<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		table#substages, table#substage {margin:auto}
		th[waste]{background:rgb(215,29,36)}
		td[level][sublevel] {vertical-align:top}
		td[level][sublevel] table {margin:auto}
		table#substages > tbody > tr > th {width:200px}
	</style>
	<script>
		/** Update all */
		function init() {
			displaySubstages();
			updateResult();
		}

		//create table to see all substages
		function displaySubstages() {
			var stages = document.querySelectorAll("#substages td[level][sublevel]");
			for(var i=0;i<stages.length;i++)
			{
				var sta=stages[i];
				var level=sta.getAttribute('level');
				var sublevel=sta.getAttribute('sublevel');
				var newTable = document.createElement('table');
				sta.appendChild(newTable);

				var pointer = Substages[level][sublevel];
				for(var j=0;j<pointer.length;j++)
				{
					newTable.insertRow(-1).insertCell(-1).innerHTML=(function()
					{
						var str=""+
							(j+1)+". "+
							"<a href='substage.php?level="+level+"&sublevel="+sublevel+"&index="+j+"'>"+
							pointer[j].name+
							"</a>";
						return str;
					})()
				}
			}
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>
<!--TITLE--><h1>Substages Overview</h1></center>

<!--main-->
<div>
	<table id=substages>
	<tr>
		<th>              Abstraction  &rarr;
		<th>       &rarr; Treatment    &rarr;
		<th>       &rarr; Distribution &rarr;
		<th waste> &rarr; Collection   &rarr;
		<th waste> &rarr; Treatment    &rarr;
		<th waste> &rarr; Discharge    
	<tr>
		<td level=Water sublevel=Abstraction>
		<td level=Water sublevel=Treatment>
		<td level=Water sublevel=Distribution>
		<td level=Waste sublevel=Collection>
		<td level=Waste sublevel=Treatment>
		<td level=Waste sublevel=Discharge>
	</table>
</div>

<div style="text-align:center;margin:1em 0">
flow diagram here? (TBD)
</div>

<!--selected substage
<div style=margin-top:1em>
	<table id=substage>
		<tr><th>substage selected 
		<tr><td>work in progress
	</table>
</div>
-->

<!--CURRENT JSON--><?php include'currentJSON.php'?>
