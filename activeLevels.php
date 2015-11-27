<table style="font-size:12px">
	<tr><th colspan=6>Current Active Levels | <a href=configuration.php>Configuration</a>

	<tr>
		<td rowspan=3 style="text-align:center;color:#ccc" cookie=water>Water Supply
			<td cookie=waterAbs style=color:#ccc>Abstraction
			<tr><td cookie=waterTre style=color:#ccc>Treatment
			<tr><td cookie=waterDis style=color:#ccc>Distribution
	<tr>
		<td rowspan=3 style="text-align:center;color:#ccc" cookie=waste>Wastewater
		<td cookie=wasteCol style=color:#ccc>Collection
		<tr><td cookie=wasteTre style=color:#ccc>Treatment
		<tr><td cookie=wasteDis style=color:#ccc>Discharge
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
