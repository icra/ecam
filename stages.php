<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script src="js/cookies.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
	<script>
		/** Color the edit table according to cookies */
		function turnOffLinks()
		{
			//go over elements that have the cookie attribute
			var elements=document.querySelectorAll("[cookie]")
			for(var i=0;i<elements.length;i++)
			{
				//Select non active stages
				if(!getCookie(elements[i].getAttribute('cookie'))) 
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
<!--HELP--><h4>Click the stage you want to work on. To activate stages go to <a href=configuration.php>Configuration</a>.</h4>

<!--GO TO EDIT.PHP TABLE-->
<table style="text-align:center" id=editingTable>
	<style>
		#editingTable td{padding:1em;font-size:22px}
	</style>
	<tr>
		<td rowspan=7>					<a title="Active Stage"	href="edit.php?level=Global">Global</a>
		<th style="font-size:13px">Level 1
		<th style="font-size:13px">Level 2
	<tr>
		<td rowspan=3 cookie=water>		<a title="Active Stage" href="edit.php?level=Water"							>Water Supply</a>
			    <td cookie=waterAbs>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Abstraction"	>Abstraction</a> 
			<tr><td cookie=waterTre>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Treatment"		>Treatment</a>	
			<tr><td cookie=waterDis>	<a title="Active Stage" href="edit.php?level=Water&sublevel=Distribution"	>Distribution</a>
	<tr>
		<td rowspan=3 cookie=waste>		<a title="Active Stage" href="edit.php?level=Waste"							>Wastewater</a>
			    <td cookie=wasteCol>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Collection"		>Collection</a>
			<tr><td cookie=wasteTre>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Treatment"		>Treatment</a>
			<tr><td cookie=wasteDis>	<a title="Active Stage" href="edit.php?level=Waste&sublevel=Discharge"		>Discharge</a>
</table>

<!--TODO--><div> TBD: diagram in SVG here </div>
