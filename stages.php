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
				}
			}
		}

		function init()
		{
			turnOffLinks()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h2>Stages of your system</h2>
<!--HELP--><h3>Click the stage you want to work on. To activate stages go to <a href=configuration.php>Configuration</a>.</h3>

<!--NAVIGATION TABLE-->
<table style="text-align:center">
	<tr>
		<th style="font-size:13px">Level 0
		<th style="font-size:13px">Level 1
		<th style="font-size:13px">Level 2
	<tr>
		<td rowspan=6>					<a title="Active Stage"	href="edit.php?level=Global">Global</a>
		<td rowspan=3 stage=water>		<a title="Active Stage" href="edit.php?level=Water"							>Water Supply</a>
			    <td stage=waterAbs>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Abstraction"	>Abstraction</a> 
			<tr><td stage=waterTre>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Treatment"		>Treatment</a>	
			<tr><td stage=waterDis>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Distribution"	>Distribution</a>
	<tr>
		<td rowspan=3 stage=waste>		<a title="Active Stage" href="edit.php?level=Waste"							>Wastewater</a>
			    <td stage=wasteCol>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Collection"		>Collection</a>
			<tr><td stage=wasteTre>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Treatment"		>Treatment</a>
			<tr><td stage=wasteDis>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Discharge"		>Discharge</a>
</table><hr>

<!--TODO--><div> <b>TBD</b>: more navigational diagram in SVG here</div>
<img src=img/icon-stage.png width=5%>

