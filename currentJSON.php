<!--CURRENT GLOBAL OBJECT IN JSON--><div style="display:
;
margin-top:9em;
text-align:left;border:1px solid #ccc;width:30%;background:#fafafa">
<pre><b>Current System</b><br><span id=currentGlobal></span></pre>
</div>

<script>
	/** Stringify Global object and display it */
	function updateResult()
	{
		document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"    ")
		setCookie("GLOBAL",JSON.stringify(Global))
	}
</script>
