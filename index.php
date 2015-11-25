<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		.blue{color:#00AFF2;font-size:1.5em}
		td{text-align:left}
	</style>
	<script src="js/cookies.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script>
		/** Enable or disable <input type=checkbox id=id> */
		function activate(id)
		{
			//input element that we are clicking
			var checkbox  = document.getElementById(id)

			//set or remove cookie
			if(checkbox.checked) 	setCookie(id,"true",10)
			else 					removeCookie(id)

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
					//hide inputs corresponding to sublevels
					inputVisibility(elements[i].id,checkbox.checked)
				}
			}

			//show or hide inputs corresponding to this level
			inputVisibility(id,checkbox.checked)
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

		//** Create rows for a table with specified object
		function tableRows(object,name,family)
		{
			//return string
			var ret="<tr><td colspan=5 style='background:#ccc;text-align:center;font-weight:bold'>"+name
			for(variable in object)
			{
				//only numbers
				if(typeof(object[variable])!="number")continue

				ret+="<tr style=display:none family='"+family+"'><td class=blue style='font-weight:bold'>"+
					variable+
					"<td>"+
					Info[variable].description+
					"<td><input value='"+object[variable]+"' style='width:3em'>"+
					"<td>"+Info[variable].unit+
					"<td>"+
						"<label><input type=radio name='"+variable+"' checked> Calculated 	</label>"+
						"<label><input type=radio name='"+variable+"'> Assumed 				</label>"
			}
			return ret
		}

		//** Display or hide inputs of the specified family (string) and display (true or false) */
		function inputVisibility(family,display)
		{
			//style.display string
			display=display?"":"none"
			//select elements: <tr family=family>
			var elements=document.querySelectorAll("tr[family='"+family+"']")
			//loop elements
			for(var i=0;i<elements.length;i++)
			{
				fadeIn(elements[i],0)
				elements[i].style.display=display
			}
		}

		function init()
		{
			activateLevels()
		}

		function fadeIn(element,val)
		{
			element.style.opacity=val
			if(val<1)
			{
				val+=0.1
				setTimeout(function(){fadeIn(element,val)},30)
			}
		}
	</script>
</head><body onload=init()><center>

<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE AND SUBTITLE-->
<h1 class=blue onclick=window.location.reload() style="font-size:2em;cursor:pointer">ECAM</h1>
	<h4>
		<span class=blue>E</span>nergy performance and
		<span class=blue>C</span>arbon emissions
		<span class=blue>A</span>ssessment and 
		<span class=blue>M</span>onitoring Tool
	</h4>

<!--DIAGRAM 
<img src="img/diagram.png" style="border:1px solid #ccc;width:35%;cursor:zoom-in" onclick=window.location=this.src>
-->

<hr>

<!--SELECT LEVEL-->
<div style=padding:0>
	Select stages of your system (<a href=sankey.php>Sankey Example</a>)
</div>
<table style=font-size:12px>
	<tr>
		<!--LEVEL 1-->
		<th>LEVEL 1 - <a href=global.php>Global</a>
		<td colspan=3 style="text-align:center;"><label><input type=checkbox id=water onchange=activate(this.id)> <b>Water Supply</b>	</label>
		<td colspan=3 style="text-align:center;"><label><input type=checkbox id=waste onchange=activate(this.id)> <b>Wastewater</b>		</label>
		<td>
			<label><input type=checkbox><b>Emissions</b></label>
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

<hr>

<!--INPUTS-->
<div>
	<h4>Available Inputs</h4>
	<table style="font-size:10px;display:inline-block;vertical-align:top;">
		<tr><th colspan=5>LEVEL 1 INPUTS
		<tr><th>Variable<th>Description<th>Value<th>Unit<th>Quality
		<script>
			document.write(tableRows(Water,"Water Supply","water"))
			document.write(tableRows(Waste,"Wastewater","waste"))
		</script>
	</table>
	<table style="font-size:10px;display:inline-block;vertical-align:top;">
		<tr><th colspan=5>LEVEL 2 INPUTS
		<tr><th>Variable<th>Description<th>Value<th>Unit<th>Quality
		<script>
			document.write(tableRows(Water.Stages.Abstraction,	"Water Abstraction",	"waterAbs"))
			document.write(tableRows(Water.Stages.Treatment,	"Water Treatment",		"waterTre"))
			document.write(tableRows(Water.Stages.Distribution,	"Water Distribution",	"waterDis"))
			document.write(tableRows(Waste.Stages.Collection,	"Wastewater Collection","wasteCol"))
			document.write(tableRows(Waste.Stages.Treatment,	"Wastewater Treatment",	"wasteTre"))
			document.write(tableRows(Waste.Stages.Discharge,	"Wastewater Discharge",	"wasteDis"))
		</script>
	</table>
</div>

<hr>

<!--logos--><?php include'logos.php'?>
