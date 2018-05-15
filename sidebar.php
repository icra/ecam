<!--menu bar at the right of the page-->
<?php
	//Default class for sidebar depending on cookies
	$sbd = (isset($_COOKIE['sidebar']) && $_COOKIE['sidebar']==1) ? "on":"off";
?>

<div id=sidebar class="<?php echo $sbd ?>" onclick="event.stopPropagation()">
	<script>
		//if you click anywhere hide the sidebar
		document.documentElement.onclick=function(){Sidebar.hide()};
		//if you press escape, the sidebar will hide
		document.documentElement.onkeydown=function(e){if(e.which==27){Sidebar.hide()}};
	</script>
	<script>
		var Sidebar = {

			toggle:function() {
				var element=document.querySelector('#sidebar')
				if(element.className=="on") {
					setCookie('sidebar',0)
					element.className="off"
				} else {
					setCookie('sidebar',1)
					element.className="on"
				}
			},

			hide:function() {
				var element=document.querySelector('#sidebar')
				if(element.className=='on') {
					this.toggle();
				}
			},

			update: function() {
				var collection = document.querySelectorAll("#sidebar a[stage]")
				//go over links <a stage> to deactivate the ones inactive according to user
				for(var i=0;i<collection.length;i++) {
					var stage = collection[i].getAttribute('stage');
					var isActive = Global.Configuration.ActiveStages[stage];
					if(!isActive)
						collection[i].classList.add('inactive');
					else
						collection[i].classList.remove('inactive');
				}

				//update the memory used in the progress bar
				var progress = document.querySelector('#sidebar #progress')
				var length = getCookie('GLOBAL') ? document.cookie.length : 0;
				progress.value = length;
				progress.title = format(100*length/8100)+"%";
			}
		}

		function removeAllCookies() {
			removeCookie("GLOBAL");
		}

		/** New system */
		//simply remove cookie and default values will load
		function newSystem() {
			removeAllCookies();
			window.location="getStarted.php";
		}

		/** Generate a json/text file of the Global object */
		function saveToFile() {
			var SavedFile = {
				"Global":Global,
				"Substages":Substages,
			}

			var link=document.createElement('a');
			link.href="data:text/json;charset=utf-8,"+JSON.stringify(SavedFile,null,'  ');
			link.download=Global.General.Name+".json";

      link.style.display='none';
      document.body.appendChild(link);

			link.click();
		}

		/** Update Global object with loaded file parsed to JSON */
		function loadFile(evt) {
				var file = evt.target.files[0];
				var reader = new FileReader();
				reader.onload=function() {
					var SavedFile = JSON.parse(reader.result);
					copyFieldsFrom(SavedFile.Global,Global);
					copyFieldsFrom(SavedFile.Substages,Substages);
					updateResult();
					window.location='birds.php';
				}
				try{
					reader.readAsText(file);
				}catch(e){alert(e)}
		}

		function clearSystem() {
			//simply remove cookie and default values will load
			removeAllCookies();
			window.location='index.php';
		}
	</script>

	<div id=sidecontent>
		<table id=menu>
			<tr><th style="padding:5px"><?php write("#sidebar_mainMenu")?><span id=Name style="float:right">
				<script>document.write(Global.General.Name)</script>
			<tr>
				<td align=center style="padding:0.7em">
				<input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
				<div class=tab_buttons>
					<button class=left   onclick=newSystem()><?php write('#new')?></button>
					<button class=middle onclick=document.getElementById('loadfile').click()><?php write('#open')?></button>
					<button class=middle onclick=saveToFile()><?php write('#save')?></button>
					<button class=right  onclick=clearSystem()><?php write('#clear')?></button>
				</div>
		</table>

		<!--red/blue separator bars-->
		<div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
		<div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

		<!--USED MEMORY-->
		<div style="padding:0.2em;text-align:center">
			<?php write('#memory')?><br>
			<progress id=progress title="<?php write('#memory')?>" value=0 max=8100></progress>
			<style>
				progress {margin:0.5em;cursor:help}
			</style>
		</div>

		<table>
			<tr><th><?php write('#main')?>
			<tr><td><a href=getStarted.php>   <?php write('#getStarted_general_info')?></a>
			<tr><td><a href=configuration.php><?php write('#configuration')?></a>
			<tr><td><a href=inhabitants.php>  <?php write('#population')?></a>
			<tr><td><a href=birds.php>        <?php write('#quick_assessment')?></a>
			<tr><th><?php write('#energy_performance')?>
			<tr><td><a class=water stage=waterAbs href=edit.php?level=Water&sublevel=Abstraction><?php write('#Abstraction')?></a>
			<tr><td><a class=water stage=waterTre href=edit.php?level=Water&sublevel=Treatment><?php write('#Treatment')?></a>
			<tr><td><a class=water stage=waterDis href=edit.php?level=Water&sublevel=Distribution><?php write('#Distribution')?></a>
			<tr><td><a class=waste stage=wasteCol href=edit.php?level=Waste&sublevel=Collection><?php write('#Collection')?></a>
			<tr><td><a class=waste stage=wasteTre href=edit.php?level=Waste&sublevel=Treatment><?php write('#Treatment')?></a>
			<tr><td><a class=waste stage=wasteDis href=edit.php?level=Waste&sublevel=Discharge><?php write('#Discharge')?></a>
			<tr><th><?php write('#summaries')?>
			<tr><td><a href=sources.php><?php write('#ghg_summary')?></a>
			<tr><td><a href=energy_summary.php><?php write('#nrg_summary')?></a>
			<tr><td><a class=water stage=water href=edit.php?level=Water><?php write('#Water')?></a>
			<tr><td><a class=waste stage=waste href=edit.php?level=Waste><?php write('#Waste')?></a>
			<tr><td><a href=edit.php?level=UNFCCC><?php write('#unfccc_categories')?></a>
      <tr><td><a href=substages.php><?php write('#all_substages')?></a>
			<tr><td><a href=summary.php?type=input><?php write('#all_inputs')?></a>
			<tr><td><a href=summary.php?type=output><?php write('#all_outputs')?></a>
			<tr><td><a href=summary.php?type=ccvv><?php write('#all_ccvv')?></a>
      <tr><td><a href=questions.php>All questions</a>
			<tr><td><a href=constants.php><?php write('#all_constants')?></a>
      <tr><td><a href=edit.php?level=Estimations><?php write('#all_estimations_tier_A')?></a>
			<tr><td><a href=benchmark.php><?php write('#all_benchmarks')?></a>
			<tr><th><?php write('#other')?>
			<tr><td><a href=opps.php><?php write("#opportunities")?></a>
			<tr><td><a href=export.php><?php write('#sidebar_export')?></a>
      <tr><td><a href=sankey.php>Sankey diagram</a>
			<!--go to variable-->
			<tr><th><?php write('#go_to_variable_code')?>
			<tr><td>
				<form id=go_to method=GET action="variable.php">
					<input name=id list=variables placeholder="ws_KPI_GHG" autocomplete=off>
					<button><?php write('#go')?></button>
				</form>
        <datalist id=variables></datalist>
        <script>
          (function(){
            //add all tags to the datalist
            var dl=document.querySelector('#sidebar #variables');
            [
              Global.Water,
              Global.Water.Abstraction,
              Global.Water.Treatment,
              Global.Water.Distribution,
              Global.Waste,
              Global.Waste.Collection,
              Global.Waste.Treatment,
              Global.Waste.Discharge,
            ].forEach(stage=>{
              Object.keys(stage).filter(key=>{
                return 'object' != typeof stage[key]; //filter only non-objects
              }).forEach(key=>{
                dl.appendChild((function(){
                  var option=document.createElement('option');
                  option.value=key;
                  option.innerHTML=translate(key+'_descr');
                  return option;
                })());
              });
            });
          })();
        </script>
				<style>
					#go_to{
						display:flex;
					}
					#go_to button {
						display:block;
						margin-left:-1px;
					}
				</style>
			</tr>
      <tr><th>Cache
      <tr><td><button onclick="window.location.reload(true)">Reset cache</button>
		</table>
		<ul style="
			text-align:left;
			padding:0.5em;
			">
			<li><a href=development.php><?php write('#dev')?></a></li>
			<li><a href="http://www.iwa-network.org/water-climate-energy-solutions/public/">Catalogue of Solutions [External]</a></li>
		</ul>
	</div>
</div>
<script>Sidebar.update()</script>
<script>
	//make the current page on the sidebar be highlighted
	(function() {
		<?php
			$requri=$_SERVER['REQUEST_URI'];
			echo "var requri='$requri';";
		?>
		var links=document.querySelectorAll('#sidebar a');
		for(var i=0;i<links.length;i++) {
			var href=links[i].getAttribute('href');
			if(encodeURIComponent(requri).search(encodeURIComponent(href)+"$")!=-1)	{
				links[i].parentNode.classList.add('sidebar_selected');
				links[i].style.color="black";
				links[i].style.fontWeight="";
				break;
			}
		}
	})();
</script>
<style>
	div#sidebar {
		position:absolute;
		top:51px;
		left:0;
		z-index:999;
		background:white;
		padding:0;
		margin:0;
		box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
		overflow:auto;
		border-right:2px solid #ccc;
		border-top:1px solid #ccc;
	}
	div#sidebar td.sidebar_selected {background:linear-gradient(lightgreen,white,lightgreen)}
	div#sidebar.off{width:0;height:0;top:0;z-index:-1;display:none}
	div#sidebar.on{width:255px;bottom:0;display:block}
	div#sidebar.on  div#sidecontent{display:block}
	div#sidebar.off div#sidecontent{display:none}
	div#sidebar div{padding:0;margin:0}
	div#sidebar table{width:100%;margin:0;}
	div#sidebar td, div#sidebar th {border-left:0;border-right:0;padding:0.2em;padding-left:1em;}
	div#sidebar td:hover {background:#f5f5f5}
	div#sidebar th {border-top:0;}
	div#sidebar table#menu td {border-bottom:0}
	div#sidebar a.water{color:#00adef}
	div#sidebar a.waste{color:#d71d24}
	div#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none}
	div#sidebar div#sidecontent th {text-align:left;border:none}
</style>
