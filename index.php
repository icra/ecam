<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		.blue{color:#00AFF2;font-size:1.5em}
	</style>
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
	</script>
</head><body><center>

<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE AND SUBTITLE-->
<h1 class=blue onclick=window.location.reload() style=font-size:2em>ECAM <span style=font-size:16px>(under construction)</span></h1>
<h3>
	<span class=blue>E</span>nergy performance and
	<span class=blue>C</span>arbon emissions
	<span class=blue>A</span>ssessment and 
	<span class=blue>M</span>onitoring Tool
</h3>

<div style="text-align:left;width:30%;display:inline-block;vertical-align:top">

<!--LEVELS-->
<table>
	<tr><td><b>LEVEL 1</b> - <a href=global.php>Global</a>
	<tr><td><b>LEVEL 2</b> - Stage Indicators
	<tr><td><b>LEVEL 3</b> - Substages
</table>

<!--SUMMARY-->
<div style="text-align:left;">
	<b>Summary</b> | <a href=# onclick=openAll()>Open all</a> | <a href=# onclick=collapseAll()>Collapse all</a>
	<ul id=summary>
		<li><button onclick=toggleDisplay('globalIndicators',this)>+</button>GLOBAL INDICATORS 	
			<ul id=globalIndicators style=display:none>
				<li><button onclick=toggleDisplay('waterSupply',this)>+</button>WATER SUPPLY
					<ul id=waterSupply style=display:none>
						<li>S1:		Quality of suplied water
						<li>S2:		Pressure of supply adequacy
						<li>S3:		Continuity of supply
						<li>S4:		Resident population connected to supply system
						<li>gE2w:	Per capita energy consumption for the Urban Drinking Water System 
						<li>wGHG:	Drinking water GHG emissions per authorized consumption
					</ul>
				<li><button onclick=toggleDisplay('wastewater',this)>+</button>WASTEWATER
					<ul id=wastewater style=display:none>
						<li>wS1:	Resident population connected to sewer system
						<li>wS2:	Treated Wastewater in WWTP
						<li>wS3:	WWTP compliance with discharge consents 
						<li>gE2ww:	Per capita energy consumption for the Urban Wastewater System
						<li>wwGHG1:	Wastewater GHG emissions per discharged wastewater volume 
						<li>wwGHG2:	Wastewater GHG emissions per BOD eliminated 
					</ul>
				<li><button onclick=toggleDisplay('global',this)>+</button>GLOBAL
					<ul id=global style=display:none>
						<li>gE1:	Energy costs ratio
						<li>gE2:	Per capita energy consumption 
						<li>GHG:	Per capita GHG emissions
					</ul>
			</ul>
		<li><button onclick=toggleDisplay('stageIndicators',this)>+</button>STAGE INDICATORS 	
			<ul id=stageIndicators style=display:none>
				<li> <button onclick=toggleDisplay('waterAbstraction',this)>+</button> WATER ABSTRACTION
					<ul id=waterAbstraction style=display:none>
						<li>aE1:	Energy consumption per conveyed water 
						<li>aE2:	Energy consumption of abstracted water per total energy consumption
						<li>aE3:	Standardised Energy Consumption
						<li>aE4:	Energy recovery per conveyed water
						<li>aE5:	Standardized energy recovery
						<li>aE6:	Water losses per mains length 
						<li>aE7:	Unit head loss 
					</ul>
				<li> <button onclick=toggleDisplay('waterTreatment',this)>+</button> WATER TREATMENT
					<ul id=waterTreatment style=display:none>
						<li>tE0:	Treatment type (volume per type) 
							<ul>
								<li>tE0.1:	WTPs with Pre-ox/C/F/S/Filt/Des
								<li>tE0.2:	WTPs with Pre-ox/C/F/Filt/Des
								<li>tE0.3:	WTPs with C/F/S/Filt/Des
								<li>tE0.4:	WTPs with C/F/Filt/Des
								<li>tE0.5:	WTPs with Des
								<li>tE0.6:	WTPs with other sequence
							</ul>
						<li>tE1:	Energy consumption per treated water 
						<li>tE2:	Energy consumption of WTPs per total energy consumption 
						<li>tE3:	Sludge production
						<li>tE4:	Capacity utilisation 
					</ul>
				<li> <button onclick=toggleDisplay('waterDistribution',this)>+</button> WATER DISTRIBUTION	
					<ul id=waterDistribution style=display:none>
						<li>dE1:	Energy consumption per authorized consumption 
						<li>dE2:	Energy consumption of authorized consumption per total energy consumption
						<li>dE3:	Standardised Energy Consumption
						<li>dE4:	Global water distribution energy efficiency
						<li>dE5:	Percentage of topographic energy
						<li>dE6:	Water losses per mains length 
						<li>dE7:	Unit head loss 
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterCollection',this)>+</button> WASTEWATER COLLECTION	
					<ul id=wastewaterCollection style=display:none>
						<li>wcE1:	Energy consumption per collected wastewater 
						<li>wcE2:	Energy consumption of collected wastewater per total energy consumption
						<li>wcE3:	Standardised Energy Consumption
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterTreatment',this)>+</button> WASTEWATER TREATMENT
					<ul id=wastewaterTreatment style=display:none>
						<li>wtE0:	Treatment type (volume per type) 
							<ul>
								<li>wtE0.1:	WWTPs with trickling filters (TF)
								<li>wtE0.2:	WWTPs with activated sludge (AS)
								<li>wtE0.3:	WWTPs with AS and Coagulation/Filtration (C/F)
								<li>wtE0.4:	WWTPs with AS nitrification and C/F 
								<li>wtE0.5:	WWTPs with Lagoons
								<li>wtE0.6:	WWTPs with other type of treatment
							</ul>
						<li>wtE1:	Energy consumption per treated wastewater 
						<li>wtE2:	Energy consumption of WWTPs per total energy consumption 
						<li>wtE3:	Energy consumption per mass removed  
						<li>wtE4:	Energy production 
						<li>wtE5:	Sludge production
						<li>wtE6:	Dry weight in sludge production
						<li>wtE7:	Capacity utilisation 
					</ul>
				<li> <button onclick=toggleDisplay('wastewaterDischarge',this)>+</button> WASTEWATER DISCHARGE
					<ul id=wastewaterDischarge style=display:none>
						<li>wdE1:	Energy consumption per discharged wastewater 
						<li>wdE2:	Energy consumption of discharged wastewater per total energy consumption
						<li>wdE3:	Standardised Energy Consumption
						<li>wdE4:	Energy recovery per discharged water
						<li>wdE5:	Standardized energy recovery
					</ul>
			</ul>
		<li><button onclick=toggleDisplay('emissions',this)>+</button>EMISSIONS 			
			<ul id=emissions style=display:none>
				<li><button onclick=toggleDisplay('direct',this)>+</button>DIRECT
					<ul id=direct style=display:none>
						<li>g-dGHG:		Total direct GHG Emissions per capita 
						<li>s-dGHG:		Direct GHG Emissions in water supply stages per volume authorized consumption of drinking water 
						<li>ws-dGHG:	Direct GHG emissions in wastewater stages per volume of treated wastewater 
						<li>wt-dGHG:	Direct GHG emissions in wastewater treatment per BOD eliminated 
					</ul>
				<li><button onclick=toggleDisplay('indirect',this)>+</button>INDIRECT
					<ul id=indirect style=display:none>
						<li>wt-iGHG1: Sludge transport indirect GHG Emissions per dry weight of sludge
						<li>wt-iGHG1: Wastewater effluent N2O indirect GHG emissions per volume of wastewater treatet
					</ul>
			</ul>
	</ul>
</div>

</div>

<!--IMG--><img src=img/diagram.png style="border:1px solid #ccc;box-shadow:0 9px 5px -5px rgba(0,0,0,0.5);">
