<!--todo.php: to do list-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#todo td.taskgroup{background:#ccc;text-align:center;}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>TO DO LIST</h1>
<!--mail me--><div> Send mail to Lluis Bosch <a href=mailto:lbosch@icra.cat>lbosch@icra.cat</a> </div>
<!--TO DO LIST-->
<table id=todo>
	<tr><th>Task<th>Status
	<tr><td colspan=2 class=taskgroup>BACK-END
		<tr><td>Create option to switch m3 to m3/day (assessment period) (ie ws6)<td class=priority>Need further explanation</td>
		<tr><td>Create option to have BOD in kg or mg/L (dividing by another variable)<td class=priority>Need further explanation</td>
		<tr><td>Variables wsa11 and wsa12 not clear (pump size and motor type)<td class=priority>Need further explanation</td>
	<tr><td colspan=2 class=taskgroup>FRONT-END
		<tr><td>Merge calculated variables with inputs in L3<td>Pending</td>
		<tr><td>Create Warning in new system button<td>Pending</td>
		<tr><td>Export summary table <td>DOING IT NOW</td>
		<tr><td>Implement graphs<td>Waiting for answer</td>
		<tr><td>(comment 13 corinne) Default value for wwt8 should be ww15<td>Waiting for answer</td>
		<tr><td>Change name of the 23 repeated PI codes (<a href=dataModel/repeatedPIs.txt>list</a>)<td>Waiting for answer</td>
		<tr><td>1000 separator<td>Pending</td>
		<tr><td>PI units be changed by user via dropdown menu<td>Pending</td>
		<tr><td>Add red flag if indicator contains estimated data<td>Pending</td>
		<tr><td>have L2 energy not in the same line<td>Need further explanation</td>
</table>
<!--FOOTER--><?php include'footer.php'?>
<script>
	//go through all cells and color them according to status
	(function()
	{
		var newColor;
		var coll=document.querySelectorAll("#todo td");
		for(var i=0;i<coll.length;i++)
		{
			switch(coll[i].textContent)
			{
				case "Pending": 		   newColor='orange'; break;
				case "Waiting for answer": newColor='#af0';   break;
				case "Need further explanation": newColor='lightcoral';break;
				default:                   newColor='';       break;
			}
			coll[i].style.backgroundColor=newColor;
		}
	})();
</script>
