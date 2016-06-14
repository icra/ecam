<!--menu bar at the right of the page-->
<script>
	var Sidebar = //Namespace
	{
		toggle:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=="on")
			{
				setCookie('sidebar',0)
				element.className="off"
			}
			else
			{
				setCookie('sidebar',1)
				element.className="on"
			}
		},

		hide:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=='on')
			{
				this.toggle();
			}
		},

		update: function()
		{
			var collection = document.querySelectorAll("#sidebar a[stage]")
			//go over links <a stage> to deactivate the ones inactive according to user
			for(var i=0;i<collection.length;i++)
			{
				var stage = collection[i].getAttribute('stage');
				var isActive = Global.Configuration['Active Stages'][stage];
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

	function removeAllCookies()
	{
		removeCookie("GLOBAL");
	}

	/** New system */
	//simply remove cookie and default values will load
	function newSystem()
	{
		removeAllCookies();
		window.location="getStarted.php";
	}

	/** Generate a json/text file of the Global object */
	function saveToFile()
	{
		var link=document.createElement('a');

		var SavedFile = 
		{
			"Global":Global,
			"Substages":Substages,
		}

		link.href="data:application/json;charset=utf-8,"+JSON.stringify(SavedFile);
		link.download=Global.General.Name+".json";
		link.click();
	}

	/** Update Global object with loaded file parsed to JSON */
	function loadFile(evt)
	{
		var file = evt.target.files[0];
		var reader = new FileReader();
		var contents;
		reader.onload=function()
		{
			var SavedFile = JSON.parse(reader.result);
			copyFieldsFrom(SavedFile.Global,Global);
			copyFieldsFrom(SavedFile.Substages,Substages);
			updateResult();
			window.location='birds.php';
		}
		reader.readAsText(file);
	}

	function clearSystem()
	{
		//simply remove cookie and default values will load
		removeAllCookies();
		window.location='index.php';
	}
</script>

<?php
	//Default class for sidebar depending on cookies
	$sbd = (isset($_COOKIE['sidebar']) && $_COOKIE['sidebar']==1) ? "on":"off";
?>

<div id=sidebar class="<?php echo $sbd ?>" onclick="event.stopPropagation()">
	<script>
		//if you click anywhere except the sidebar, it will hide the sidebar
		document.documentElement.onclick=function(){Sidebar.hide()};
		//if you press escape, the sidebar will hide
		document.documentElement.onkeydown=function(e){if(e.which==27){Sidebar.hide()}};
	</script>
	<style>
		div#sidebar
		{
			position:fixed;
			/*dreta*/top:0;right:0;z-index:999;
			/*esquerra*/top:57px;left:0;z-index:999;
			background:white;
			padding:0;margin:0;
			box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
			overflow:auto;
			border-right:2px solid #ccc;
		}
		div#sidebar.off{width:0;height:0;top:0;display:none}
		div#sidebar.on{width:255px;bottom:0;transition:all 0s}
		div#sidebar.on  div#sidecontent{display:block}
		div#sidebar.off div#sidecontent{display:none}
		div#sidebar div{padding:0;margin:0}
		div#sidebar table{width:100%;margin:0;}
		div#sidebar td, div#sidebar th {border-left:0;border-right:0;padding:0.2em;padding-left:1em;}
		div#sidebar table#menu td {border-bottom:0}
		div#sidebar a.water{color:#00adef} 
		div#sidebar a.waste{color:#d71d24} 
		div#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none} 
		div#sidebar div#sidecontent th {text-align:left;border:none} 
	</style>
	<div id=sidecontent>
		<table id=menu>
			<tr><th style="padding:5px 5px 5px 5px">Main menu <span id=Name style="float:right"> <script>document.write(Global.General.Name)</script>
			<tr>
				<td align=center style="padding:0.7em">
				<input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
				<button onclick=newSystem()><?php write('#new')?></button>
				<button onclick=document.getElementById('loadfile').click()><?php write('#open')?></button>
				<button onclick=saveToFile()><?php write('#save')?></button>
				<button onclick=clearSystem()><?php write('#clear')?></button>
		</table>

		<!--red/blue separator bars--> 
		<div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
		<div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

		<!--USED MEMORY-->
		<style>
			progress {margin:0.5em;cursor:help}
		</style>

		<div style="padding-top:0.2em"><?php write('#memory')?></div>

		<progress id=progress title="<?php write('#memory')?>" value=0 max=8100></progress>

		<table>
			<tr><th><?php write('#sidebar_general')?>
			<tr><td><a href=getStarted.php><?php write('#getStarted_general_info')?></a>
			<tr><td><a href=configuration.php><?php write('#configuration')?></a>
			<tr><td><a href=dashboard.php>Dashboard</a>
			<tr><th><?php write('#ghg_assessment')?>
			<tr><td><a href=birds.php><?php write('#quick_assessment')?></a>
			<tr><td><a class=water stage=water    href=edit.php?level=Water><?php write('#Water')?></a>
			<tr><td><a class=waste stage=waste    href=edit.php?level=Waste><?php write('#Waste')?></a>
			<tr><th><?php write('#energy_performance')?>
			<tr><td><a class=water stage=waterAbs href=edit.php?level=Water&sublevel=Abstraction><?php write('#Abstraction')?></a>
			<tr><td><a class=water stage=waterTre href=edit.php?level=Water&sublevel=Treatment><?php write('#Treatment')?></a>
			<tr><td><a class=water stage=waterDis href=edit.php?level=Water&sublevel=Distribution><?php write('#Distribution')?></a>
			<tr><td><a class=waste stage=wasteCol href=edit.php?level=Waste&sublevel=Collection><?php write('#Collection')?></a>
			<tr><td><a class=waste stage=wasteTre href=edit.php?level=Waste&sublevel=Treatment><?php write('#Treatment')?></a>
			<tr><td><a class=waste stage=wasteDis href=edit.php?level=Waste&sublevel=Discharge><?php write('#Discharge')?></a>
			<tr><td><a href=edit.php?level=Energy><?php write('#energy_summary')?></a>
			<tr><th><?php write('#summary')?>
			<tr><td><a href=summary.php?type=input><?php write('#sidebar_all_inputs')?></a>
			<tr><td><a href=summary.php?type=ccvv><?php write('#sidebar_all_ccvv')?></a>
			<tr><td><a href=summary.php?type=output><?php write('#sidebar_all_kpis')?></a>
			<tr><th><?php write('#sidebar_other')?>
			<tr><td><a href=graph.php?g=graph1><?php write('#sidebar_graphs')?></a>
			<tr><td><a href=export.php><?php write('#sidebar_export')?></a>
			<tr><td><a href=todo.php><?php write('#sidebar_todo')?></a>
			<tr><td><a href=problems.php><?php write('#sidebar_problems')?></a>
			<tr><td><a href=constants.php><?php write('#constants')?></a>
		</table>
	</div>
</div>

<script>Sidebar.update()</script>

<script>
	//make the current page on the sidebar be highlighted
	(function()
	{
		<?php
			$requri=$_SERVER['REQUEST_URI'];
			echo "var requri='$requri';";
		?>
		var links=document.querySelectorAll('#sidebar a');
		for(var i=0;i<links.length;i++)
		{
			var href=links[i].getAttribute('href');
			if(encodeURIComponent(requri).search(encodeURIComponent(href)+"$")!=-1)	
			{
				links[i].parentNode.classList.add('sidebar_selected');
				links[i].style.color="black";
				links[i].style.fontWeight="";
				break;
			}
		}
	})();
</script>
<style> #sidebar td.sidebar_selected {background:linear-gradient(lightgreen,white,lightgreen);} </style>
