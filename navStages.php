<style>
	nav {display:none;font-size:14px;background:#999;color:#fff;margin:0;text-align:center;}
	nav li {text-align:left}
	nav ul{margin:0;padding:0;list-style:none;}
	nav ul li {margin:0;display:inline-block;list-style-type:none;}
	nav ul > li > a {display:inline-block;padding:0.7em 1.5em 0.5em 0.5em;text-decoration:none;}
	nav a, nav a:visited, nav a:hover {color:#000;text-decoration:none;margin:0;}
	nav li > ul {position:absolute;display:none;margin-top:1px;margin-right:1px;background-color:#999;}
	nav li > ul li {display:block;}
	nav li:hover {background-color: #666;}
	nav li:hover > ul {display:block;}
	/**level3*/
	nav ul > li > ul > li > ul {
		left:100%;
		transform:translateY(-3.6em) translateX(1px); /**move level3 menu*/
	}
	nav ul > li > ul > li > ul > li > a {
		width:125px;
		padding:1.3em;
	}
</style>

<?php
	//print a level2 stage in menu
	function navL2stage($alias,$level,$sublevel)
	{
		echo "
			<li stage=$alias>
				<a href=edit.php?level=$level&sublevel=$sublevel>
				<img src=img/$alias.png>
				$sublevel</a>
				<ul> 
					<li>
						<a href=level3.php?level=$level&sublevel=$sublevel>
							Substages
							(<script>
								document.write(Global.Level3.$level.$sublevel.length)
							</script>)</a>
				</ul>";
	}
?>

<!--this nav get its items hidden depending on the cookie "GLOBAL" inside "General"/"Active Stages"-->
<nav id=navStages>
	<style>
		#navStages img{width:40px;vertical-align:middle;margin:0.5em}
		#navStages span.navDivisor{margin:2em;color:#ccc}
	</style>
	<ul>
		<span class=navDivisor>SYSTEM</span>
		<li stage=uws><a href=edit.php?level=UWS>UWS</a>
		<li stage=water><a href=edit.php?level=Water>Water Supply</a>
			<ul>
				<?php 
					navL2stage("waterAbs","Water","Abstraction");
					navL2stage("waterTre","Water","Treatment");
					navL2stage("waterDis","Water","Distribution");
				?>
			</ul>
		</li>
		<li stage=waste><a href=edit.php?level=Waste>Wastewater</a>
			<ul>
				<?php 
					navL2stage("wasteCol","Waste","Collection");
					navL2stage("wasteTre","Waste","Treatment");
					navL2stage("wasteDis","Waste","Discharge");
				?>
			</ul>
		</li>
		<li>
			<a href=#>Summary</a>
			<ul>
				<li><a href="summary.php?type=input">All inputs</a>
				<li><a href="summary.php?type=output">All outputs</a>
			</ul>
		</li>
	</ul>
</nav>

<?php
	/** HIDE NAV ELEMENTS DEPENDING ON COOKIES*/
	//go through cookies with php instead of javascript. 
	//REASON: if javascript, the inactive links blink when page loads
	$global=json_decode($_COOKIE['GLOBAL'],true);
	$stages=$global['Configuration']["Active Stages"];
	//idea: set the css property "display:none" to <li> elements of the menu that are not active inside Global/Active Stages
	echo "<style>";
		foreach($stages as $name=>$active) 
			if($active==0)
				echo "li[stage=$name]{display:none};";
	echo "</style>";
?>
