<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		function init()
		{
			updateResult()
		}

		//** Create rows and columns for a table with specified object
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
			document.write(ret)

			//show or hide inputs corresponding to this level
			var active = Global.General["Active Stages"][family]
			inputVisibility(family,active)
			//change the "<span count=id>number</span>" for this level
			var count = active ? document.querySelectorAll("[family='"+family+"']").length:0
			document.querySelector("[count='"+family+"']").innerHTML=count

		}

		//** Display or hide inputs of the specified family (string) and display (true or false) */
		function inputVisibility(family,display)
		{
			//style.display string
			display=display?"":"none"
			//select elements: <tr family=family>
			var elements=document.querySelectorAll("tr[family='"+family+"']")
			//go over "elements"
			for(var i=0;i<elements.length;i++)
				elements[i].style.display=display
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--MENU--><?php include"menu.php"?>
<!--TITLE--><h2>ALL ACTIVE INPUTS (SUMMARY)</h2>

<!--AVAILABLE INPUTS-->
<div class=inline style="width:75%;text-align:left">
	<h4>Enabled Inputs Sorted By Stage (Summary)</h4>
	<div class=inline style="font-size:11px;width:35%;padding:0">
	<table style=width:100%>
		<tr><th colspan=2>Level 1 Inputs
		<script>
			tableRows(Global.Global,"Global","global")
			tableRows(Global.Water,"Water Supply","water")
			tableRows(Global.Waste,"Wastewater","waste")
		</script>
	</table>
	</div>
	<div class=inline style="font-size:11px;width:55%;padding:0">
		<table style=";width:100%">
			<tr><th colspan=2>Level 2 Inputs
			<script>
				tableRows(Global.Water.Abstraction,	"Water Abstraction",	"waterAbs")
				tableRows(Global.Water.Treatment,	"Water Treatment",		"waterTre")
				tableRows(Global.Water.Distribution,	"Water Distribution",	"waterDis")
				tableRows(Global.Waste.Collection,	"Wastewater Collection","wasteCol")
				tableRows(Global.Waste.Treatment,	"Wastewater Treatment",	"wasteTre")
				tableRows(Global.Waste.Discharge,	"Wastewater Discharge",	"wasteDis")
			</script>
		</table>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
