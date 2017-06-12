<div id=currentJson style="display:
none;"> 
	<!--global-->
	<div class=inline style="text-align:left;border:1px solid #ccc;width:50%;background:#fafafa">
		<pre><span id=currentGlobal></span></pre>
	</div>
</div>

<script>
	/** Stringify Global object and display it */
	/** COOKIE SIZE LIMIT FOR GOOGLE CHROME IS CLOSE TO 8170 CHARACTERS */
	function updateResult() {
		document.getElementById('currentGlobal').innerHTML=JSON.stringify(Global,null,"  ");

		/**
		  *
		  * Compress Global (using LZString library)
		  *
		  */

		//JSON as a string
		var uncompressed = JSON.stringify(Global);

		//Compress the string
		var compressed = LZString.compressToEncodedURIComponent(uncompressed); 

		//Set cookie GLOBAL as compressed
		setCookie("GLOBAL",compressed);

		//set 6 cookies for Substages
		setCookie("waterAbs",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Water.Abstraction))); 
		setCookie("waterTre",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Water.Treatment))); 
		setCookie("waterDis",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Water.Distribution))); 
		setCookie("wasteCol",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Waste.Collection))); 
		setCookie("wasteTre",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Waste.Treatment))); 
		setCookie("wasteDis",LZString.compressToEncodedURIComponent(JSON.stringify(Substages.Waste.Discharge))); 

		//summary (debug mode)
		//cookieSummary();
	}

	/** Display an ascii table in Console to summarize all cookie sizes */
	function cookieSummary(){
		if(getCookie('GLOBAL')){
			console.log( ""+
				"[*] Global chars length (max is 4000)\n"+
				" |--* Uncompressed : "+JSON.stringify(Global).length+" \n"+
				" |--* Compressed   : "+getCookie('GLOBAL').length+"\n"+
				" |--* waterAbs   : "+getCookie('waterAbs').length+"\n"+
				" |--* waterTre   : "+getCookie('waterTre').length+"\n"+
				" |--* waterDis   : "+getCookie('waterDis').length+"\n"+
				" |--* wasteCol   : "+getCookie('wasteCol').length+"\n"+
				" |--* wasteTre   : "+getCookie('wasteTre').length+"\n"+
				" |--* wasteDis   : "+getCookie('wasteDis').length+"\n"+
			"");
		}
	}
</script>
