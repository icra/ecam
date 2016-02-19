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

		//make sidebar active
		activate:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=='off')
			{
				this.toggle();
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
			var length = getCookie('GLOBAL') ? getCookie('GLOBAL').length : 0;
			progress.value = length;
			progress.title = "Used memory: "+(100*length/4000)+" %";
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
		link.href="data:text/json;charset=utf-8,"+JSON.stringify(Global);
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
			copyFieldsFrom(JSON.parse(reader.result),Global);
			updateResult();
			window.location.reload();
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

<div id=sidebar 
	 class="<?php if(isset($_COOKIE['sidebar']) && $_COOKIE['sidebar']==1){echo "on";}else{echo "off";}?>" 
	 onmouseover=Sidebar.activate() 
	 onclick="event.stopPropagation()";
	 >
	 <script>
	 	document.documentElement.onclick=function(){Sidebar.hide()};
	 </script>
	<style>
		div#sidebar
		{
			position:fixed;
			top:0;right:0;z-index:999;
			background:white;
			overflow:hidden;
			padding:0;margin:0;
			box-shadow: 5px 5px 50px 5px #888;
			overflow-y:auto;
		}
		div#sidebar.off{width:50px;bottom:94%}
		div#sidebar.on{width:260px;bottom:0;transition:all 0.15s}
		div#sidebar.on  div#sidecontent{display:block}
		div#sidebar.off div#sidecontent{display:none}
		div#sidebar div{padding:0;margin:0}
		div#sidebar table{margin:0.7em}
		div#sidebar td, div#sidebar th {padding:0.3em}

		#sidebar th {text-align:left;border:none}
		#sidebar td {border-top:none;border-left:none;border-right:none}

		#sidebar #burger{color:#888;}
		#sidebar #burger:hover{color:black;}
		/*links*/
		#sidebar a.water{color:#00adef} 
		#sidebar a.waste{color:#d71d24} 
		#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none} 
	</style>
	<span style=font-size:30px;cursor:pointer id=burger onclick=Sidebar.toggle()>&#9776;</span>
	<div id=sidecontent>
		<table id=menu>
			<style>#sidebar #sidecontent #menu td{border-bottom:none}</style>
			<tr><th colspan=4 id=Name> <script> document.write(Global.General.Name) </script>
			<tr>
			<td align=center><button onclick=newSystem()>New</button>
			<input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
			<td align=center><button onclick=document.getElementById('loadfile').click()>Open</button>
			<td align=center><button onclick=saveToFile()>Save</button>
			<td align=center><button onclick=clearSystem()>Clear</button>
		</table>

		<!--USED MEMORY-->
		<style>
			progress {margin:0.5em;cursor:help}
		</style>
		<progress id=progress title="Used memory" value=0 max=4000></progress>

		<!--red/blue separator bars-->
		<div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
		<div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

		<table>
			<tr><th>General
			<tr><td><a href=getStarted.php>General info</a>
			<tr><td><a href=configuration.php>Configuration</a>
			<tr><th>Level 1
			<tr><td><a class=water stage=water    href=edit.php?level=Water>Water supply</a>
			<tr><td><a class=waste stage=waste    href=edit.php?level=Waste>Wastewater</a>
			<tr><th>Level 2
			<tr><td><a class=water stage=waterGen href=edit.php?level=Water&sublevel=General>Water energy</a>
			<tr><td><a class=water stage=waterAbs href=edit.php?level=Water&sublevel=Abstraction>Water abstraction</a>
			<tr><td><a class=water stage=waterTre href=edit.php?level=Water&sublevel=Treatment>Water treatment</a>
			<tr><td><a class=water stage=waterDis href=edit.php?level=Water&sublevel=Distribution>Water distribution</a>
			<tr><td><a class=waste stage=wasteGen href=edit.php?level=Waste&sublevel=General>Wastewater energy</a>
			<tr><td><a class=waste stage=wasteCol href=edit.php?level=Waste&sublevel=Collection>Wastewater collection</a>
			<tr><td><a class=waste stage=wasteTre href=edit.php?level=Waste&sublevel=Treatment>Wastewater treatment</a>
			<tr><td><a class=waste stage=wasteDis href=edit.php?level=Waste&sublevel=Discharge>Wastewater discharge</a>
			<tr><th>Summary
			<tr><td><a href=summary.php?type=input>All Inputs</a>
			<tr><td><a href=summary.php?type=ccvv>All Calculated variables</a>
			<tr><td><a href=summary.php?type=output>All Performance Indicators (PIs)</a>
			<tr><th>Graphs
			<tr><td><a href=graph1.php>1. L1 - GHG per capita</a>
			<tr><td><a href=graph2.php>2. L1 - GHG per serviced population & authorized consumption</a>
			<tr><td><a href=graph3.php>3. L1 - Energy consumption per capita</a>

			<tr><td><a href=graph4.php>4. L2 - GHG per capita</a>
			<tr><td><a href=graph5.php>5. L2 - GHG per serviced population & authorized consumption</a>
			<tr><td><a href=graph6.php>6. L2 - Energy consumption per capita</a>

			<tr><td><a href=sankey.php>Sankey diagram</a>
			<tr><th>Other
			<tr><td><a href=todo.php>To do list</a>
			<tr><td><a href=export.php>Export variables, descriptions and formulas</a>
		</table>
	</div>
</div>

<script>Sidebar.update()</script>

<style>
#sidebar td.sidebar_selected {background:linear-gradient(#eee,#fefefe,#ddd);}
</style>

<script>
	//make the current page on the navbar be highlighted
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
				break;
			}
		}
	})();
</script>
