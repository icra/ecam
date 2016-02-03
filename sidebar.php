<!--menu bar at the right of the page-->
<script>
	var Sidebar = {
		toggleOnOff:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=="on")
			{
				element.className="off"
				Sidebar.set(0)
				document.querySelector('#sidecontent').style.display='none'
			}
			else
			{
				element.className="on"
				Sidebar.set(1)
				document.querySelector('#sidecontent').style.display=''
			}
		},

		set:function(newValue)
		{
			Global.Configuration.sidebar=newValue
			updateResult()
		},

		check:function()
		{
			if(Global.Configuration.sidebar)
				Sidebar.toggleOnOff()
		},
	}
</script>

<div id=sidebar class=off onclick=Sidebar.toggleOnOff()>
	<style>
		div#sidebar.off{width:35px;}
		div#sidebar.on{width:300px;}
		div#sidebar div{padding:0;margin:0}
		div#sidebar table{margin:0.7em}
		div#sidebar td, div#sidebar th {padding:0.3em}
		div#sidebar{
			position:fixed;
			top:0; right:0; bottom:0;
			z-index:999;
			background:#def4ff;
			overflow:hidden;
			padding:0;margin:0;
			box-shadow: 5px 5px 5px 5px #888;
			transition:all 0.05s;
		}
		#burger{color:#888}
		#burger:hover {color:black}
	</style>
	<span style=font-size:30px;cursor:pointer id=burger>&#9776;</span>
	<div id=sidecontent style=display:none>
		<table>
			<tr><th colspan=4> <script> document.write(Global.General.Name) </script>
			<tr><td align=center><button>New</button>
			<td align=center><button>Open</button>
			<td align=center><button>Save</button>
			<td align=center><button>Clear</button>
		</table>

		<div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
		<div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

		<table>
			<tr><th>General info
			<tr><td><a href=getStarted.php>Define system</a>
			<tr><td><a href=configuration.php>Configuration</a>
			<tr><td><a href=selection.php>Questions</a>
			<tr><th>Level 1
			<tr><td><a style=color:#00adef href=edit.php?level=Water>Water supply</a>
			<tr><td><a style=color:#d71d24 href=edit.php?level=Waste>Wastewater</a>
			<tr><th>Level 2
			<tr><td><a style=color:#00adef href=edit.php?level=Water&sublevel=General>Water energy</a>
			<tr><td><a style=color:#00adef href=edit.php?level=Water&sublevel=Abstraction>Water abstraction</a>
			<tr><td><a style=color:#00adef href=edit.php?level=Water&sublevel=Treatment>Water treatment</a>
			<tr><td><a style=color:#00adef href=edit.php?level=Water&sublevel=Distribution>Water distribution</a>
			<tr><td><a style=color:#d71d24 href=edit.php?level=Waste&sublevel=General>Wastewater energy</a>
			<tr><td><a style=color:#d71d24 href=edit.php?level=Waste&sublevel=Collection>Wastewater collection</a>
			<tr><td><a style=color:#d71d24 href=edit.php?level=Waste&sublevel=Treatment>Wastewater treatment</a>
			<tr><td><a style=color:#d71d24 href=edit.php?level=Waste&sublevel=Discharge>Wastewater discharge</a>
			<tr><th>Summary
			<tr><td><a href=summary.php?type=input>All Inputs</a>
			<tr><td><a href=summary.php?type=output>All Outputs</a>
			<tr><td><a href=graphs.php>Graphs</a>
			<tr><th>Other
			<tr><td><a href=todo.php>To do list</a>
		</table>
	</div>
</div>
