<!--GROUP OF BUTONS: NEW, LOAD, SAVE, CLEAR BUTTONS INSIDE INDEX.PHP--> <!--functions are defined inside sidebar.php-->

<!--menu-->
<div style=text-align:left;padding:0em class=inline>
	<!--new-->
	<button class="button add" onclick=newSystem()>New</button>

	<!--load-->
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button class="button edit" onclick=document.getElementById('loadfile').click()>Open</button> 
	<?php
		if(isset($_COOKIE['GLOBAL']))
		{ ?>
			<!--save-->
			<button class="button save" onclick=saveToFile()>Save
				<script>document.write("as '"+Global.General.Name+".json'")</script>
			</button>
			<!--clear-->
			<button class="button delete" onclick=clearSystem()>Clear</button>
			<br>
			<!--next button-->
			<button class="button next" onclick="event.stopPropagation();window.location='getStarted.php'">Next</button>
		  <?php 
		}
	?>
</div>
