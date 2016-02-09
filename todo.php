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
	<tr><td>Create option to switch m3 to m3/day (assessment period) (ie ws6)<td>Need further explanation
	<tr><td>Create option to have BOD in kg or mg/L (dividing by another variable)<td>Need further explanation
	<tr><td>Variables wsa11 and wsa12 not clear (pump size and motor type)<td>Need further explanation
	<tr><td>If you add more than 20 substages they disappear. Find out why<td>Pending

	<tr><td colspan=2 class=taskgroup>FRONT-END
	<tr><td>Summary for calculated variables<td>Pending
	<tr><td>Summary for KPIs<td>Pending
	<tr><td>Merge calculated variables with inputs in L3<td>Pending
	<tr><td>Create Warning in new system button<td>Pending
	<tr><td>Configuration for hiding codes<td>Pending
	<tr><td>Implement graphs<td>Pending
	<tr><td>Export summary table button<td>Pending
	<tr><td>Remove c_ww51 from level 3 and show only in level 2<td>Pending
	<tr><td>Default value for wwt8 should be ww15<td>Pending
	<tr><td>Show at level 2 for  wdE3 and wdE5 which says “level 3 data is required"<td>Pending
</table>
<!--FOOTER--><?php include'footer.php'?>
