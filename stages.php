<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		td{vertical-align:middle;padding:1.5em;font-size:15px}
	</style>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		/** Color the edit table according to cookies */
		function turnOffLinks()
		{
			//go over elements that have the stage attribute
			var elements=document.querySelectorAll("[stage]")
			for(var i=0;i<elements.length;i++)
			{
				//Select non active stages
				if(!Global.General["Active Stages"][elements[i].getAttribute('stage')]) 
				{
					//remove link inside
					elements[i].innerHTML=elements[i].textContent
					elements[i].style.color="#aaa"
					elements[i].style.backgroundColor="#efefef"
					elements[i].style.fontSize="12px"
					//add title attribute
					elements[i].setAttribute('title','Inactive Stage')
					elements[i].style.cursor='not-allowed'
					//substages
					var nextSibling = elements[i].nextSibling
					nextSibling.innerHTML="Substages"
					nextSibling.style.fontSize="12px"
					nextSibling.style.color="#aaa"
					nextSibling.style.backgroundColor="#efefef"
				}
			}
		}

		function init()
		{
			turnOffLinks()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--LOAD SAVE CLEAR--><?php include"menu.php"?>
<!--TITLE--><h2>STAGES OF YOUR SYSTEM</h2>
<!--HELP--><h4>Click the stage you want to work on. To activate stages go to <a href=configuration.php>Configuration</a>.</h4>

<!--NAVIGATION TABLE-->
<table style="text-align:center" id=navigationTable>
	<!--this table styles--><style>
		#navigationTable img{width:40px;vertical-align:middle}
	</style>
	<tr>
		<th style="font-size:13px" colspan=2>Level 1
		<th style="font-size:13px">Level 2
		<th style="font-size:13px">Level 3
	<tr>
		<td rowspan=6>					
				<img src=img/waterAbs.png>
				<a title="Active Stage"	href="edit.php?level=Global">Global</a>
		<td rowspan=3 stage=water>		
				<img src=img/waterAbs.png>
				<a title="Active Stage" href="edit.php?level=Water"							>Water Supply</a>
			<td stage=waterAbs>	
				<img src=img/waterAbs.png>
			   	<a title="Active Stage" href="edit.php?level=Water&sublevel=Abstraction"	>Abstraction</a> 
			   	<td><a href=level3.php?level=Water&sublevel=Abstraction>Substages</a>
			   	(<script>
			   		document.write(Global.Level3.Water.Abstraction.length)	
			   	</script>)
			<tr><td stage=waterTre>	
				<img src=img/waterTre.png>
				<a title="Active Stage" href="edit.php?level=Water&sublevel=Treatment"		>Treatment</a>	
				<td><a href=level3.php?level=Water&sublevel=Treatment>Substages</a>
			<tr><td stage=waterDis>	
				<img src=img/waterDis.png>
				<a title="Active Stage" href="edit.php?level=Water&sublevel=Distribution"	>Distribution</a>
				<td><a href=level3.php?level=Water&sublevel=Distribution>Substages</a>
	<tr>
		<td rowspan=3 stage=waste>		
				<img src=img/wasteCol.png>
				<a title="Active Stage" href="edit.php?level=Waste"							>Wastewater</a>
			<td stage=wasteCol>	
				<img src=img/wasteCol.png>
				<a title="Active Stage" href="edit.php?level=Waste&sublevel=Collection"		>Collection</a>
				<td><a href=level3.php?level=Waste&sublevel=Collection>Substages</a>
			<tr><td stage=wasteTre>	
				<img src=img/wasteTre.png>
				<a title="Active Stage" href="edit.php?level=Waste&sublevel=Treatment"		>Treatment</a>
				<td><a href=level3.php?level=Waste&sublevel=Treatment>Substages</a>
			<tr><td stage=wasteDis>	
				<img src=img/wasteDis.png>
				<a title="Active Stage" href="edit.php?level=Waste&sublevel=Discharge"		>Discharge</a>
				<td><a href=level3.php?level=Waste&sublevel=Discharge>Substages</a>
</table>

<div style=margin:1em> 
	<!--PREV--><button class="button prev" onclick=window.location='configuration.php'>Previous</button> 
	<!--NEXT--><button class="button next" onclick=window.location='summary.php'>Next</button>
</div>


<!--CURRENT JSON--><?php include'currentJSON.php'?>
