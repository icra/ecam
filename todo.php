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
	<tr><th>Task																	   <th>Status
	<tr><td colspan=2 class=taskgroup>BACK-END
	<tr><td>Option to switch m3 to m3/day (assessment period) (ie ws6)				   <td>Pending
	<tr><td>Option to have BOD in kg or mg/L (dividing by another variable)			   <td>Pending
	<tr><td>wsa11 and wsa12 not clear (pump size and motor type)                       <td>Not sure how to proceed
	<tr><td colspan=2 class=taskgroup>FRONT-END
	<tr><td>Merge calculated variables with inputs in summary						   <td><b>Started</b>
	<tr><td>Merge calculated variables with inputs in L3							   <td>Pending
	<tr><td>Create Warning in new system											   <td>Pending
	<tr><td>Configuration for hiding codes											   <td>Pending
	<tr><td>Check for colors&patterns in google charts							       <td><b>Done</b>
	<tr><td>Button update l2 only for "non l3 only"							       <td>Pending
</table>
<!--FOOTER--><?php include'footer.php'?>
