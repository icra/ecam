<!--todo.php: to do list-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#todo td.taskgroup{background:#ccc;text-align:center;}
		#todo td.priority{background:lightcoral;text-align:center;font-weight:bold}
		#todo b{background:#af0}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>TO DO LIST</h1>
<!--mail me--><div> Send mail to Lluis Bosch <a href=mailto:lbosch@icra.cat>lbosch@icra.cat</a> </div>
<!--TO DO LIST-->
<table id=todo>
	<tr><th>Task																	<th>Status

	<tr><td colspan=2 class=taskgroup>BACK-END
	<tr><td>Create option to switch m3 to m3/day (assessment period) (ie ws6)<td class=priority>Need further explanation</td>
	<tr><td>Create option to have BOD in kg or mg/L (dividing by another variable)<td class=priority>Need further explanation</td>
	<tr><td>Variables wsa11 and wsa12 not clear (pump size and motor type)<td class=priority>Need further explanation</td>
	<tr><td>If you add more than 20 substages they disappear. Find out why<td>Pending</td>
	<tr><td colspan=2 class=taskgroup>FRONT-END
	<tr><td>Summary for KPIs<td>Pending</td>
	<tr><td>Merge calculated variables with inputs in L3<td>Pending</td>
	<tr><td>Create Warning in new system button<td>Pending</td>
	<tr><td>Configuration for hiding codes<td>Pending</td>
	<tr><td>Implement graphs<td>Pending</td>
	<tr><td>Export summary table button<td>Pending</td>
	<tr><td>(comment 13 corinne) Default value for wwt8 should be ww15<td>Pending</td>
</table>
<!--FOOTER--><?php include'footer.php'?>

<script>
	//go through all cells "Pending" and color them yellow
	var coll = document.querySelectorAll("td");
	for(var i=0;i<coll.length;i++)
	{
		if(coll[i].textContent=="Pending") coll[i].style.backgroundColor='orange'
	}
</script>
