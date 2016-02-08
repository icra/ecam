<?php /*menu.php: new, load, save, clear buttons inside index.php*/?>

<!--MENU--><div style=text-align:left;padding:0em>
	<!--new-->
	<button class="button add" onclick=newSystem()>New system</button>
	<br>
	<!--load-->
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button class="button edit" onclick=document.getElementById('loadfile').click()>Open system</button> 
	<br>
	<?php
		if(isset($_COOKIE['GLOBAL']))
		{ ?>
			<!--save-->
			<button class="button save" onclick=saveToFile()>Save current system</button>
			<script>document.write("as '"+Global.General.Name+".json'")</script>
			<br>
			<!--clear-->
			<button class="button delete" onclick=clearSystem()>Clear system</button>
			<br>
		<?php 
		}
	?>
</div>
