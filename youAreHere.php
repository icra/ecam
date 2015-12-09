<style>
	nav { background:#999; color: #fff; margin: 0; overflow: hidden; text-align:left}
	nav ul{ margin: 0; padding: 0; list-style: none; }
	nav ul li { margin: 0; display: inline-block; list-style-type: none;}
	nav > ul > li > a { color: #aaa; display: block; line-height: 2em; padding: 0.5em 2em; text-decoration:none; }
	nav a,nav a:visited{color:#000}
	nav a:hover { text-decoration:none;}
	nav li > ul{ display:none; margin-top:1px; background-color: #999; }
	nav li > ul li{display:block;}
	nav li > ul li a { color: #111; line-height: 2em; padding: 0.5em 2em; text-decoration:none; }
	nav li:hover {background-color: #666;}
	nav li:hover > ul{ position:absolute; display : block;}
</style>

<!--this nav get its items hidden depending on the cookie "GLOBAL" inside "General"/"Active Stages"-->
<nav id=navStages>
	<style>
		#navStages img{width:40px;vertical-align:middle;margin:0.5em}
	</style>
	<ul>
		<li stage=water><a href=edit.php?level=Water>Water Supply <span style="font-size:16px;color:white;vertical-align:top">&#8964;</span></a>
			<ul>
				<li stage=waterAbs><img src=img/waterAbs.png><a href=edit.php?level=Water&sublevel=Abstraction>Water Abstraction</a></li>
				<li stage=waterTre><img src=img/waterTre.png><a href=edit.php?level=Water&sublevel=Treatment>Water Treatment</a></li>
				<li stage=waterDis><img src=img/waterDis.png><a href=edit.php?level=Water&sublevel=Distribution>Water Distribution</a></li>
			</ul>
		</li>
		<li stage=waste><a href=edit.php?level=Waste>Wastewater <span style="font-size:16px;color:white">&#8964;</span></a>
			<ul>
				<li stage=wasteCol><img src=img/wasteCol.png><a href=edit.php?level=Waste&sublevel=Collection>Wastewater Collection</a></li>
				<li stage=wasteTre><img src=img/wasteTre.png><a href=edit.php?level=Waste&sublevel=Treatment>Wastewater Treatment</a></li>
				<li stage=wasteDis><img src=img/wasteDis.png><a href=edit.php?level=Waste&sublevel=Discharge>Wastewater Discharge</a></li>
			</ul>
		</li>
	</ul>
</nav>

<?php
	/** hide nav elements depending on cookies*/
	//go through cookies with php instead of javascript
	$global=json_decode($_COOKIE['GLOBAL'],true);
	$stages=$global['General']["Active Stages"];
	//idea: set the css property "display:none" to <li> elements of the menu that are not active inside Global/Active Stages
	echo "<style>";
	foreach($stages as $name=>$active) 
		if($active==0)
			echo "li[stage=$name]{display:none}";
	echo "</style>";
?>
