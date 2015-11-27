<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
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
					//set input count to 0
					document.querySelector("[count='"+elements[i].id+"']").innerHTML=0
				}
			}

			//show or hide inputs corresponding to this level
			inputVisibility(id,checkbox.checked)

			//change the "<span count=id>number</span>" for this level
			var count = checkbox.checked ? document.querySelectorAll("[family='"+id+"']").length:0
			document.querySelector("[count='"+id+"']").innerHTML=count
		}

		/** Activate stages depending on cookies */
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
			var ret="<tr><td colspan=5 style='background:#eee;font-weight:bold'>"+name
			ret+=": <span count="+family+">0</span>"
			for(variable in object)
			{
				//only numbers
				if(typeof(object[variable])!="number")continue

				ret+="<tr style=display:none family='"+family+"'>"+
					"<td style='font-weight:bold'><a class=blue href=variable.php?id="+variable+">"+variable+"</a>"+
					"<td>"+Info[variable].description
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
<!--TITLE--><h2>Configuration of your system</h2>
<!--SUBTITLE--><h4>Activate stages which correspond to your system</h4><hr>

<!--SELECT LEVELS-->
<div class=inline style="width:20%">
	<h4>Activate Stages</h4>
	<table style=font-size:11px>
		<tr style=color:#444><th>Level 1<th>Level 2
		<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=water onchange=activate(this.id)> Water Supply	</label>
			<td>
				<label style=color:#ccc><input type=checkbox disabled id=waterAbs class=water onchange=activate(this.id)> Abstraction	</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=waterTre class=water onchange=activate(this.id)> Treatment		</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=waterDis class=water onchange=activate(this.id)> Distribution	</label> 
		<tr><td rowspan=3 style="text-align:center"> <label><input type=checkbox id=waste onchange=activate(this.id)> Wastewater	</label>
			<td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteCol class=waste onchange=activate(this.id)> Collection	</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteTre class=waste onchange=activate(this.id)> Treatment		</label> 
			<tr><td>
				<label style=color:#ccc><input type=checkbox disabled id=wasteDis class=waste onchange=activate(this.id)> Discharge		</label> 
	</table>
</div>

<!--AVAILABLE INPUTS-->
<div class=inline style="width:75%;text-align:left">
	<h4>All Active Inputs</h4>
	<table style="font-size:11px;display:inline-block;vertical-align:top;">
		<tr><th colspan=2>Level 1
		<script>
			document.write(tableRows(Global.Water,"Water Supply","water"))
			document.write(tableRows(Global.Waste,"Wastewater","waste"))
		</script>
	</table>
	<table style="font-size:11px;display:inline-block;vertical-align:top;">
		<tr><th colspan=2>Level 2
		<script>
			document.write(tableRows(Global.Water.Abstraction,	"Water Abstraction",	"waterAbs"))
			document.write(tableRows(Global.Water.Treatment,	"Water Treatment",		"waterTre"))
			document.write(tableRows(Global.Water.Distribution,	"Water Distribution",	"waterDis"))
			document.write(tableRows(Global.Waste.Collection,	"Wastewater Collection","wasteCol"))
			document.write(tableRows(Global.Waste.Treatment,	"Wastewater Treatment",	"wasteTre"))
			document.write(tableRows(Global.Waste.Discharge,	"Wastewater Discharge",	"wasteDis"))
		</script>
	</table>
</div><hr>

<!--SYSTEM DESCRIPTION QUESTIONNAIRE-->
<h3>System description (not implemented)</h3>
<table>
	<tr><td rowspan=3 style=background:#af0>Water supply
			<ul>
				<li>Is your system producing energy? 	<select><option>yes<option>no</select>
				<li>Question 2							<select><option>yes<option>no</select>
			</ul>
		<td style=background:#af0>Abstraction
			<ul>
				<li>Question 1 	<select><option>yes<option>no</select>
				<li>Question 2	<select><option>yes<option>no</select>
			</ul>
		<tr><td>Treatment
		<tr><td>Distribution
	<tr><td rowspan=3>Wastewater
		<td>Collection
		<tr><td>Treatment
		<tr><td>Discharge
</table>
