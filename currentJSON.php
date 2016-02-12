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

		/**
		  *
		  * Compress Global (using LZString library)
		  *
		  */

		//JSON as a string
		var uncompressed = JSON.stringify(Global);

		//Compress the string
		var compressed = LZString.compressToEncodedURIComponent(uncompressed); 

		//Check if compressed exceeds 4k characters
		if(compressed.length>=4000)
		{
			alert("ERROR: memory is full. Please remove some substages.")
			return;
		}

		//Set cookie GLOBAL as compressed
		setCookie("GLOBAL",compressed);

		//summary
		cookieSummary();
	}

	/** Display an ascii table in Console to summarize all cookie sizes */
	function cookieSummary()
	{
		if(getCookie('GLOBAL'))
		{
			console.log( "[+] Global chars length (max is 4000)\n"+
						 " |--* Uncompressed : "+JSON.stringify(Global).length+" \n"+
						 " |--* Compressed   : "+getCookie('GLOBAL').length+"\n"+
						 "");
		}
	}
</script>
