<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		.blue{color:#00AFF2;font-size:1.5em}
		td{text-align:left}
	</style>
	<script src="js/cookies.js"></script>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//element that we are modifying
			var checkbox  = document.getElementById(id)

			//set or remove cookie
			if(checkbox.checked) 	
				setCookie(id,"true",10)
			else 					
				removeCookie(id)

			//background color = green or white depending on checkbox
			checkbox.parentNode.parentNode.style.backgroundColor=checkbox.checked?"#af0":""

			//sub elements: they have className=checkbox.id
			var elements=document.getElementsByClassName(id)
			for(var i=0;i<elements.length;i++)
			{
				if(checkbox.checked)
				{
					elements[i].removeAttribute('disabled')
					elements[i].parentNode.style.color=""
				}
				else
				{
					elements[i].checked=false
					elements[i].setAttribute('disabled',true)
					elements[i].parentNode.style.color="#ccc"
					elements[i].parentNode.parentNode.style.backgroundColor=""
					removeCookie(elements[i].id)
				}
			}
		}

		/** Activate levels depending on cookies */
		function activateLevels()
		{
			var Levels =
			{
				"water":
				[
					"waterAbs",
					"waterTre",
					"waterDis",
				],
				"waste":
				[
					"wasteCol",
					"wasteTre",
					"wasteDis",
				]
			}
			//go over Levels
			for(level in Levels)
			{
				console.log("Level '"+level+"': "+getCookie(level))
				if(getCookie(level))
				{
					//check level checkbox
					document.getElementById(level).checked=true
					activate(level)
					//go over sublevels
					Levels[level].forEach(function(sublevel)
					{
						console.log("	Sublevel '"+sublevel+"': "+getCookie(sublevel))
						if(getCookie(sublevel))
						{
							//check sublevel checkbox
							document.getElementById(sublevel).checked=true
							activate(sublevel)
						}
					})
				}
			}
		}

		function init()
		{
			activateLevels()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE AND SUBTITLE-->
<h1 class=blue onclick=window.location.reload() style="font-size:2em;cursor:pointer">ECAM</h1>
	<h3>
		<span class=blue>E</span>nergy performance and
		<span class=blue>C</span>arbon emissions
		<span class=blue>A</span>ssessment and 
		<span class=blue>M</span>onitoring Tool
	</h3>
<hr>

<!--SELECT LEVEL-->
<div>Select stage of stages which system compromises</div>
<table>
	<tr>
		<!--LEVEL 1-->
		<th>LEVEL 1 - <a href=global.php>Global</a>
		<td colspan=3 style="text-align:center;"><label><input type=checkbox id=water onchange=activate(this.id)> <b>Water Supply</b>	</label>
		<td colspan=3 style="text-align:center;"><label><input type=checkbox id=waste onchange=activate(this.id)> <b>Wastewater</b>		</label>
	<tr>
		<!--LEVEL 2-->
		<th rowspan=2 style="vertical-align:middle">LEVEL 2 - Stages
		<td><label style=color:#ccc><input type=checkbox disabled id=waterAbs class=water onchange=activate(this.id)> Abstraction	</label> 
		<td><label style=color:#ccc><input type=checkbox disabled id=waterTre class=water onchange=activate(this.id)> Treatment		</label> 
		<td><label style=color:#ccc><input type=checkbox disabled id=waterDis class=water onchange=activate(this.id)> Distribution	</label> 
		<td><label style=color:#ccc><input type=checkbox disabled id=wasteCol class=waste onchange=activate(this.id)> Collection	</label> 
		<td><label style=color:#ccc><input type=checkbox disabled id=wasteTre class=waste onchange=activate(this.id)> Treatment		</label> 
		<td><label style=color:#ccc><input type=checkbox disabled id=wasteDis class=waste onchange=activate(this.id)> Discharge		</label> 
	<tr>
		<!--FLOW-->
		<td colspan=6><img src=img/flow.png>
</table>

<!--DIAGRAM 
<img src="img/diagram.png" style="border:1px solid #ccc;width:35%;cursor:zoom-in" onclick=window.location=this.src>
-->
