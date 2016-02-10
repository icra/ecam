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
		}
	}

	/** Clear all user inputted data */
	//simply remove cookie and default values will load
	function newSystem()
	{
		removeCookie("GLOBAL");
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
		removeCookie("GLOBAL");
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
			top:0;right:0;bottom:0;z-index:999;
			background:white;
			overflow:hidden;
			padding:0;margin:0;
			box-shadow: 5px 5px 10px 5px #888;
			transition:all 0.15s;
		}
		div#sidebar.off{width:40px;}
		div#sidebar.on{width:260px;}
		div#sidebar.on  div#sidecontent{display:block}
		div#sidebar.off div#sidecontent{display:none}
		div#sidebar div{padding:0;margin:0}
		div#sidebar table{margin:0.7em}
		div#sidebar td, div#sidebar th {padding:0.3em}
		#sidebar #burger{color:#888;}
		#sidebar #burger:hover{color:black;}
		/*links*/
		#sidebar a.water{color:#00adef} 
		#sidebar a.waste{color:#d71d24} 
		#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none} 
	</style>
	<span style=font-size:30px;cursor:pointer id=burger onclick=Sidebar.toggle()>&#9776;</span>
	<div id=sidecontent>
		<table>
			<tr><th colspan=4 id=Name> <script> document.write(Global.General.Name) </script>
			<tr>
			<td align=center><button onclick=newSystem()>New</button>
			<input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
			<td align=center><button onclick=document.getElementById('loadfile').click()>Open</button>
			<td align=center><button onclick=saveToFile()>Save</button>
			<td align=center><button onclick=clearSystem()>Clear</button>
		</table>

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
			<tr><td><a href=graphs.php>Graphs</a>
			<tr><th>Other
			<tr><td><a href=todo.php>To do list</a>
		</table>
		<div style=color:#999> Click outside to minimize this menu <br>(or click on the symbol on top)</div>
	</div>
</div>

<script>Sidebar.update()</script>

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
				links[i].parentNode.style.backgroundColor="yellow";
				links[i].style.color="black";
				break;
			}
		}
	})();
</script>
