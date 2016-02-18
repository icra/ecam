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
		<tr><td>Change code: 23 repeated PI codes (<a href=dataModel/repeatedPIs.txt>list here</a>)<td>Wait</td>
		<tr><td>Prepare a list of variables that need to be visible in L2 from L1<td>Wait</td>
		<tr><td>Link questions to calculations / variables <td>Pending</td>
	<tr><td colspan=2 class=taskgroup>FRONT-END
		<tr><td>PI units be changed by user via dropdown menu<td>Pending</td>
		<tr><td>Create Warning in new system button<td>Pending</td>
		<tr><td>Add a flag if a KPI contains estimated data<td>Pending</td>
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
				case "Pending": 	   newColor='orange';    break;
				case "Wait":           newColor='#af0';      break;
				case "Need more info": newColor='lightcoral';break;
				default:               newColor='';          break;
			}
			coll[i].style.backgroundColor=newColor;
		}
	})();
</script>
