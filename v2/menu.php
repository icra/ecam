<!--buttons new load save clear in index.php-->
<!--functions are defined in 'sidebar.php'-->
<div class=flex id=menu_buttons>
	<style>
		#menu_buttons button {
			display:block;
      margin-left:0;
      margin-top:0;
      margin-bottom:0;
		}
	</style>

	<!--new-->
  <div>
    <button class="button add" onclick=newSystem() style=margin-left:0>
      <?php write('#new')?>
    </button>
  </div>

	<!--load/open-->
  <div>
    <input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
    <button class="button edit" onclick=document.getElementById('loadfile').click()>
      <?php write('#open')?>
    </button>
  </div>

	<?php
		if(isset($_COOKIE['Global'])){ ?>
			<!--save-->
      <div>
        <button class="button save" onclick=saveToFile()>
          <?php write('#save_as')?>
          <span id=save_as_filename></span>
          <script>
            document.querySelector('#save_as_filename').innerHTML="'"+Global.General.Name+".json'";
          </script>
        </button>
      </div>

      <!--clear-->
			<div>
				<button class="button delete" onclick=clearSystem() style=margin-left:0>
					<?php write('#clear')?>
				</button>
      </div>

      <!--next-->
      <div>
        <button class="button next" onclick="event.stopPropagation();window.location='getStarted.php'">
          <?php write('#next')?>
        </button>
      </div>
		  <?php
		}
	?>
</div>
