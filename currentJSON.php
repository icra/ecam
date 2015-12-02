
<hr>

FOR TESTING PURPOSES:
<!--CURRENT GLOBAL OBJECT IN JSON-->
<div style="text-align:left;border:1px solid #ccc;margin:1em;width:30%;background:#fafafa">
	<pre><b>Raw Data</b><br><span id=currentGlobal></span></pre>
</div>

<script>
	/** Stringify Global object and display it */
	function updateResult()
	{
		document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"    ")
		setCookie("GLOBAL",JSON.stringify(Global))
	}
</script>
