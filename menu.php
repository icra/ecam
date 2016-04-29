<!--GROUP OF BUTONS: NEW, LOAD, SAVE, CLEAR BUTTONS INSIDE INDEX.PHP--> <!--functions are defined inside sidebar.php-->

<!--menu-->
<div style=text-align:left;padding:0em class=inline>
	<!--new-->
	<button class="button add" onclick=newSystem()>
	<?php write('#menu_new')?>
	</button>

	<!--load-->
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button class="button edit" onclick=document.getElementById('loadfile').click()>
	<?php write('#menu_open')?>
	</button> 
	<?php
		if(isset($_COOKIE['GLOBAL']))
		{ ?>
			<!--save-->
			<button class="button save" onclick=saveToFile()>
				<?php write('#menu_save_as')?>
				<script>document.write(" '"+Global.General.Name+".json'")</script>
			</button>
			<!--clear-->
			<button class="button delete" onclick=clearSystem()>
				<?php write('#menu_clear')?>
			</button>
			<br>
			<!--next button-->
			<button class="button next" onclick="event.stopPropagation();window.location='getStarted.php'">
				<?php write('#menu_next')?>
			</button>
		  <?php 
		}
	?>
</div>
