<!doctype html>
<html><head>
	<meta charset=utf-8>
	<title>ECAM</title>
	<link rel=stylesheet href="css.css">
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		function openAll()
		{
			var elements=document.getElementsByTagName('ul')
			for(var i=0;i<elements.length;elements[i++].style.display='');
			var botons=document.getElementsByTagName('button')
			for(var i=0;i<botons.length;i++)
			{
				botons[i].innerHTML=botons[i].innerHTML=='+'?'-':botons[i].innerHTML
			}
		}

		function collapseAll()
		{
			var elements=document.getElementsByTagName('ul')
			for(var i=0;i<elements.length;elements[i++].style.display='none');
			document.getElementById('summary').style.display=''
			var botons=document.getElementsByTagName('button')
			for(var i=0;i<botons.length;i++)
			{
				botons[i].innerHTML=botons[i].innerHTML=='-'?'+':botons[i].innerHTML
			}
		}

		function fadeIn(element,val)
		{
			element.style.opacity=val
			if(val<1)
			{
				val+=0.1
				setTimeout(function(){fadeIn(element,val)},20)
			}
		}

		function toggleSymbol(button)
		{
			button.innerHTML=button.innerHTML=='+'?'-':'+'
		}

		function toggleDisplay(id,button)
		{
			var element=document.getElementById(id)
			if(element.style.display=='none')
			{
				element.style.display=''
				fadeIn(element,0)
			}
			else element.style.display='none'
			if(button)toggleSymbol(button)
		}

		function init()
		{
			//openAll()
			updateResult()
		}

		/** Write the kpis (i.e., outputs/functions) of specified object, e.g. showKPI(Global.Water,'water') */
		function showKPI(object,objectName)
		{
			//if not specified, set to false
			objectName=objectName||false
			if(objectName && !Global.General["Active Stages"][objectName])
			{
				document.write('<li style=color:#aaa>Stage not active')
				return
			}
			for(field in object)
			{
				if(typeof(object[field])=="function")
				{
					document.write("<li>"+
							"<a href=\"variable.php?id="+field+"\">"+field+"</a>"+
							"&emsp;&emsp;"+Info[field].description+
							"&emsp;=&emsp;"+object[field]()+
							"&emsp;["+Info[field].unit+"]"
					)
				}
			}
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"menu.php"?>
<!--TITLE--><h2>KEY PERFORMANCE INDICATORS SUMMARY</h2>
<!--SUMMARY-->
<div style="text-align:left;width:70%;padding:3em">
	<a href=# onclick=openAll()>Open all</a> | <a href=# onclick=collapseAll()>Collapse all</a>
	<hr>
	<ul id=summary>
		<li><button onclick=toggleDisplay('globalIndicators',this)>+</button> <b>Level 1</b>
			<ul id=globalIndicators style=display:none>
				<li><button onclick=toggleDisplay('global',this)>+</button> Global
					<ul id=global style=display:none>
						<script>showKPI(Global.Global)</script>
					</ul>
				<li><button onclick=toggleDisplay('waterSupply',this)>+</button> Water Supply
					<ul id=waterSupply style=display:none>
						<script>showKPI(Global.Water,"water")</script>
					</ul>
				<li><button onclick=toggleDisplay('wastewater',this)>+</button> Wastewater
					<ul id=wastewater style=display:none>
						<script>showKPI(Global.Waste,"waste")</script>
					</ul>
			</ul>
		<li><button onclick=toggleDisplay('stageIndicators',this)>+</button> <b>Level 2</b>
			<ul id=stageIndicators style=display:none>
				<li> <button onclick=toggleDisplay('waterAbstraction',this)>+</button> Water Abstraction
					<ul id=waterAbstraction style=display:none>
						<script>showKPI(Global.Water.Abstraction,"waterAbs")</script>
					</ul>
				<li> <button onclick=toggleDisplay('waterTreatment',this)>+</button> Water Treatment
					<ul id=waterTreatment style=display:none>
						<script>showKPI(Global.Water.Treatment,"waterTre")</script>
					</ul>
				<li> <button onclick=toggleDisplay('waterDistribution',this)>+</button> Water Distribution 	
					<ul id=waterDistribution style=display:none>
						<script>showKPI(Global.Water.Distribution,"waterDis")</script>
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterCollection',this)>+</button> Wastewater Collection	
					<ul id=wastewaterCollection style=display:none>
						<script>showKPI(Global.Waste.Collection,"wasteCol")</script>
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterTreatment',this)>+</button> Wastewater Treatment
					<ul id=wastewaterTreatment style=display:none>
						<script>showKPI(Global.Waste.Treatment,"wasteTre")</script>
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterDischarge',this)>+</button> Wastewater Discharge
					<ul id=wastewaterDischarge style=display:none>
						<script>showKPI(Global.Waste.Discharge,"wasteDis")</script>
					</ul>
			</ul>
		<li><button onclick=toggleDisplay('emissions',this)>+</button> Emissions (not implemented)
			<ul id=emissions style=display:none>
				<li><button onclick=toggleDisplay('direct',this)>+</button> Direct
					<ul id=direct style=display:none>
						<script>showKPI(Global.Emissions.Direct)</script>
					</ul>
				<li><button onclick=toggleDisplay('indirect',this)>+</button> Indirect
					<ul id=indirect style=display:none>
						<script>showKPI(Global.Emissions.Indirect)</script>
					</ul>
			</ul>
	</ul>
</div>

<!--prev button-->
<div style=margin:1em> 
	<button class="button prev" onclick=window.location='allInputs.php'>Previous</button> 
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
