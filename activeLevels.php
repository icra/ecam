<table style="font-size:12px">
	<tr><th colspan=6>Current Active Levels | <a href=configuration.php>Configuration</a>
	<tr>
		<!--LEVEL 1-->
		<td colspan=3 style="text-align:center;color:#ccc" cookie=water>Water Supply
		<td colspan=3 style="text-align:center;color:#ccc" cookie=waste>Wastewater
	<tr>
		<!--LEVEL 2-->
		<td cookie=waterAbs style=color:#ccc>Abstraction
		<td cookie=waterTre style=color:#ccc>Treatment
		<td cookie=waterDis style=color:#ccc>Distribution
		<td cookie=wasteCol style=color:#ccc>Collection
		<td cookie=wasteTre style=color:#ccc>Treatment
		<td cookie=wasteDis style=color:#ccc>Discharge
</table>

<script>
	//color the table according to cookies
	function colorSelectedLevels()
	{
		//go over elements that have the cookie attribute
		var elements=document.querySelectorAll("[cookie]")
		for(var i=0;i<elements.length;i++)
		{
			if(getCookie(elements[i].getAttribute('cookie'))) 
			{
				elements[i].style.backgroundColor="#af0"
				elements[i].style.color=""
			}
		}
	}
	colorSelectedLevels()

</script>
