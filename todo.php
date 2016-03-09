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
<!--TO DO LIST-->
<table id=todo>
	<tr><th>Task<th>Status
	<tr><td colspan=2 class=taskgroup>BACK-END
		<tr><td>Finish questions variable hidings<td>DOING NOW</td>
		<tr><td>Implement benchmarks again<td>Wait</td>
		<tr><td>Level2warnings and Level2only variables<td>Wait</td>
		<tr><td>Remove GHG emissions from insight<td>Pending</td>
	<tr><td colspan=2 class=taskgroup>FRONT-END
		<tr><td>Service level indicators new table<td>Pending</td>
		<tr><td>Move graphs<td>Need more info</td>
		<tr><td>Create Warning in new system button<td>Pending</td>
		<tr><td>Next/back buttons at each stage<td>Pending</td>
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
