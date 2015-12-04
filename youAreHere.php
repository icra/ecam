<style>
	nav { background:#999; color: #fff; margin: 0; overflow: hidden; text-align:left}
	nav ul{ margin: 0; padding: 0; list-style: none; }
	nav ul li { margin: 0; display: inline-block; list-style-type: none; transition: all 0.1s; }
	nav > ul > li > a { color: #aaa; display: block; line-height: 2em; padding: 0.5em 2em; text-decoration:none; }
	nav a,nav a:visited{color:#000}
	nav a:hover { text-decoration:none; color:white}
	nav li > ul{ display:none; margin-top:1px; background-color: #999; }
	nav li > ul li{display:block;}
	nav li > ul li a { color: #111; line-height: 2em; padding: 0.5em 2em; text-decoration:none; }
	nav li:hover {background-color: #666;}
	nav li:hover > ul{ position:absolute; display : block;}
</style>

<nav id=navStages>
	<style>
		#navStages img{width:40px;vertical-align:middle;margin:0.5em}
	</style>
	<ul>
		<li id=water><a href=edit.php?level=Water>Water Supply</a>
			<ul>
				<li id=waterAbs><img src=img/waterAbs.png><a href=edit.php?level=Water&sublevel=Abstraction>Water Abstraction</a></li>
				<li id=waterTre><img src=img/waterTre.png><a href=edit.php?level=Water&sublevel=Treatment>Water Treatment</a></li>
				<li id=waterDis><img src=img/waterDis.png><a href=edit.php?level=Water&sublevel=Distribution>Water Distribution</a></li>
			</ul>
		</li>
		<li id=waste><a href=edit.php?level=Waste>Wastewater</a>
			<ul>
				<li id=wasteCol><img src=img/wasteCol.png><a href=edit.php?level=Waste&sublevel=Collection>Wastewater Collection</a></li>
				<li id=wasteTre><img src=img/wasteTre.png><a href=edit.php?level=Waste&sublevel=Treatment>Wastewater Treatment</a></li>
				<li id=wasteDis><img src=img/wasteDis.png><a href=edit.php?level=Waste&sublevel=Discharge>Wastewater Discharge</a></li>
			</ul>
		</li>
	</ul>
</nav>

<script>
	//get active stages
	function getNonActiveStages()
	{
		var stages=[];
		for(stage in Global.General["Active Stages"])
		{
			if(!Global.General["Active Stages"][stage])
				stages.push(stage)
		}
		return stages
	}
	var nonActive = getNonActiveStages()
	for(stage in nonActive)
	{
		var element = document.getElementById(nonActive[stage])
		console.log(element)
		element.parentNode.removeChild(element)
	}
</script>

