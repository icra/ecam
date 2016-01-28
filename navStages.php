<style>
	nav {color:white;margin:0;text-align:center;display:inline-block}
	nav li {text-align:left;cursor:pointer;transition:all 0.4s}
	nav ul ul li:hover {background-color:#666;}
	nav ul{margin:0;padding:0;list-style:none;}
	nav ul li {margin:0;display:inline-block;list-style-type:none;}
	nav li > ul {position:absolute;display:none;border:1px solid #ccc;border-bottom:3px solid #0aaff1;background-color:#999;}
	nav li:hover > ul {display:block;}
	nav li > ul li {display:block;}
	/**level3*/
	nav ul > li > ul > li > ul {
		left:100%;
		transform:translateY(-1.2em); /**move level3 menu up*/
	}
</style>

<!--this nav get its items hidden depending on the cookie "GLOBAL" inside "General"/"Active Stages"-->
<nav id=navStages>
	<ul>
		<li><a href=stages.php>Input data</a><ul>
			<li><a href=edit.php?level=UWS>UWS</a></li>
			<li><a href=edit.php?level=Water>Water Supply</a><ul>
				<li><a href=edit.php?level=Water&sublevel=General>Energy</a>
				<li><a href=edit.php?level=Water&sublevel=Abstraction>Abstraction</a>
				<li><a href=edit.php?level=Water&sublevel=Treatment>Treatment</a>
				<li><a href=edit.php?level=Water&sublevel=Distribution>Distribution</a>
			</ul>
			</li>
			<li><a href=edit.php?level=Waste>Wastewater</a><ul>
				<li><a href=edit.php?level=Waste&sublevel=General>Energy</a>
				<li><a href=edit.php?level=Waste&sublevel=Collection>Collection</a>
				<li><a href=edit.php?level=Waste&sublevel=Treatment>Treatment</a>
				<li><a href=edit.php?level=Waste&sublevel=Discharge>Discharge</a>
			</ul>
		</li>
		</ul>
		</li>
	</ul>
</nav>
