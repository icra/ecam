<!--CURRENT GLOBAL OBJECT IN JSON--><div style="display:
;
margin-top:4em;"> 

	<!--l1 & l2-->
	<div class=inline style="margin-top:4em;text-align:left;border:1px solid #ccc;width:30%;background:#fafafa">
		<pre><b>Current System</b><br><span id=currentGlobal></span></pre>
	</div>

	<!--l3-->
	<div class=inline style="margin-top:4em;text-align:left;border:1px solid #ccc;width:30%;background:#fafafa">
		<pre><b>Current L3</b><br><span id=currentSubstages></span></pre>
	</div>
</div>

<script>
	/** Stringify Global object and display it */
	function updateResult()
	{
		document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"    ")
		document.getElementById('currentSubstages').innerHTML=JSON.stringify(Substages,null,"    ")

		//modify cookies
		setCookie("GLOBAL",            JSON.stringify(Global))
		setCookie("SUBSTAGES_waterAbs",JSON.stringify(Substages.Water.Abstraction))
		setCookie("SUBSTAGES_waterTre",JSON.stringify(Substages.Water.Treatment))
		setCookie("SUBSTAGES_waterDis",JSON.stringify(Substages.Water.Distribution))
		setCookie("SUBSTAGES_wasteCol",JSON.stringify(Substages.Waste.Collection))
		setCookie("SUBSTAGES_wasteTre",JSON.stringify(Substages.Waste.Treatment))
		setCookie("SUBSTAGES_wasteDis",JSON.stringify(Substages.Waste.Discharge))

		//cookie summary
		cookieSummary();

	}

	function cookieSummary()
	{
		console.log("GLOBAL: "   +getCookie('GLOBAL').length   +"/4000 full")
		console.log(" SUBSTAGES_waterAbs: "+getCookie('SUBSTAGES_waterAbs').length+"/4000 full")
		console.log(" SUBSTAGES_waterTre: "+getCookie('SUBSTAGES_waterTre').length+"/4000 full")
		console.log(" SUBSTAGES_waterDis: "+getCookie('SUBSTAGES_waterDis').length+"/4000 full")
		console.log(" SUBSTAGES_wasteCol: "+getCookie('SUBSTAGES_wasteCol').length+"/4000 full")
		console.log(" SUBSTAGES_wasteTre: "+getCookie('SUBSTAGES_wasteTre').length+"/4000 full")
		console.log(" SUBSTAGES_wasteDis: "+getCookie('SUBSTAGES_wasteDis').length+"/4000 full")

		var total=0;

		[
			"GLOBAL",
			"SUBSTAGES_waterAbs",
			"SUBSTAGES_waterTre",
			"SUBSTAGES_waterDis",
			"SUBSTAGES_wasteCol",
			"SUBSTAGES_wasteTre",
			"SUBSTAGES_wasteDis",
		].forEach(function(cookie){total+=getCookie(cookie).length});
		console.log("Total length: "+total)
	}
</script>
