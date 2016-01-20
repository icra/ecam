<style>
	nav {display:} /*provisional*/
	nav {background:#999;color:#fff;margin:0;text-align:center;display:inline-block}
	nav li {text-align:left;cursor:pointer;}
	nav li:hover {background-color:#666;}
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
		<li>Input data (testing)<ul>
			<li>UWS</li>
			<li>Water supply<ul>
				<li>Energy
				<li>Abstraction
				<li>Treatment
				<li>Distribution
			</ul>
			</li>
			<li>Wastewater<ul>
				<li>Energy
				<li>Collection
				<li>Treatment
				<li>Discharge
			</ul>
		</li>
		</ul>
		</li>
	</ul>
</nav>
