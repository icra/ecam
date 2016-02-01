<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<style>
		td.taskgroup{
			background:#ccc;
			text-align:center;
		}
		td.priority{
			background:lightcoral;
			text-align:center;
		}
		b{background:#af0}
	</style>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>TO DO LIST</h1>
<!--mail me--><div> Send mail to Lluis Bosch <a href=mailto:lbosch@icra.cat>lbosch@icra.cat</a> </div>
<!--TO DO LIST-->
<table>
	<tr><th>Task																	   <th>Status
	<tr><td colspan=2 class=taskgroup>BACK-END
	<tr><td>Add a longer description to each input/CV/PI (file called "<a href=dataModel/Info.js>Info.js</a>") <td><b>Done</b>
	<tr><td>Option to switch m3 to m3/day (assessment period) (ie ws6)				   <td>Pending
	<tr><td>Option to have BOD in kg or mg/L (dividing by another variable)			   <td>Pending
	<tr><td>Be able to select the general location from the same dropdown menu as BOD  <td>Pending
	<tr><td>Check server limit for cookies											   <td>Pending
	<tr><td>Level 3 technology selection											   <td>Not sure how to proceed
	<tr><td>Questions and selections put them in correct place						   <td>Not sure how to proceed
	<tr><td colspan=2 class=taskgroup>FRONT-END
	<tr><td>Round number decimals (2 or 3?)<td>Pending
	<tr><td>wS1, wS2, wS3 and wwS3 in L1 should have a warning that only work when L3 is edited <td>Pending
	<tr><td>Merge calculated variables with inputs in summary						   <td>Pending
	<tr><td>Merge calculated variables with inputs in L3							   <td>Pending
	<tr><td>Create Warning in new system											   <td>Pending
	<tr><td>Configuration for hiding codes											   <td>Pending
	<tr><td>See names of L3 substages in L2											   <td>Pending
	<tr><td>Input types in L3                                                          <td>Pending
	<tr><td>Toy graphs (bars and rings) from charts.js library                         <td><b>Started</b>
</table>
<!--FOOTER--><?php include'footer.php'?>
