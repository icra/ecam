<!--CURRENT GLOBAL OBJECT IN JSON--><div style="display:
;
margin-top:4em;"> 

	<!--l1 & l2-->
	<div class=inline style="margin-top:4em;text-align:left;border:1px solid #ccc;width:30%;background:#fafafa">
		<pre><b>Current System</b><br><span id=currentGlobal></span></pre>
	</div>
</div>

<script>
	/** Stringify Global object and display it */
	function updateResult()
	{
		document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"    ")

		//compress global (LZString library)
		var uncompressed = JSON.stringify(Global);
		var compressed   = LZString.compressToUTF16(uncompressed); 

		//modify cookies
		setCookie("GLOBAL",compressed);

		//check if cookie is full
		if(getCookie('GLOBAL').length>=4000)
		{
			alert("ERROR: memory is full. Please remove some substages.")
		}

		/*
			test to check compression
				console.log(global)
				console.log(compressed)
				console.log(decompressed)
				console.log(global==decompressed)
		*/
	}

	/** Display an ascii table in Console to summarize all cookie sizes */
	function cookieSummary()
	{
		if(getCookie('GLOBAL'))
		{
			console.log(
						" Cookie GLOBAL      | Length (max is 4000)\n"+
						"--------------------+--------------------------------   \n"+
						" Uncompressed       | "+JSON.stringify(Global).length+" \n"+
						" Compressed         | "+getCookie('GLOBAL').length+"\n"+
						"--------------------+--------------------------------   \n"+
						""
			);
		}
	}

	cookieSummary();
</script>
