<!--CURRENT GLOBAL OBJECT IN JSON-->
<div style="height:250px;overflow-y:scroll;text-align:left;border:1px solid #ccc;margin:1em;width:30%">
	<pre><b>Raw Data</b><br><span id=global></span></pre>
</div>

<script>
	/** Stringify Global object and display it */
	function updateResult()
	{
		document.getElementById('global').innerHTML=JSON.stringify(Global,null,"    ")
		setCookie("GLOBAL",JSON.stringify(Global))
	}
</script>
