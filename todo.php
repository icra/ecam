<!--todo.php: to do list-->
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style> #todo td.taskgroup{background:#ccc;text-align:center;} </style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--> <?php include'navbar.php'?>
<!--linear--> <?php include'linear.php'?>
<!--TITLE--><h1><?php write('#todo')?></h1>
<!--TO DO LIST-->
<table id=todo>
	<tr><th><?php write('#todo_task')?><th><?php write('#todo_status')?>
	<tr><td colspan=2 class=taskgroup>BACK-END
		<tr><td>Finish questions variable hidings<td>Pending (difficult)</td>
		<tr><td>Wrong benchmarking<td>Need more info</td>
	<tr><td colspan=2 class=taskgroup>FRONT-END
</table>

<!--FOOTER--><?php include'footer.php'?>
<script>
	//go over all cells: color them according to status
	(function()
	{
		var newColor;
		var coll=document.querySelectorAll("#todo td");
		for(var i=0; i<coll.length; i++)
		{
			switch(coll[i].textContent)
			{
				case "Pending": newColor='orange'; break;
				case "Wait":    newColor='#af0';   break;
				default:        newColor='';       break;
			}
			coll[i].style.backgroundColor=newColor;
		}
	})();
</script>
