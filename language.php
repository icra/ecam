<!--menu inside navbar.php-->
<style>
	/**container element*/
	#lang{
		cursor:pointer;
		margin-left:1em;
	}
	
	#lang > img {
		display:block;
	}

	/**select element*/
	#lang #select{
		position:absolute;
		top:3%;
		right:1%;
		visibility:hidden;
		border:1px solid #ccc;
		width:200px;
		background:#eeece4;
		box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 5px 10px 15px 5px rgba(0,0,0,.1);
		text-align:left;
		z-index:999;
		transition:all 0.4s;
		font-size:12px;
	}

	/**show select element*/
	#lang:hover #select {
		visibility:visible;
		height:auto;
		transition:all 0s;
	}

	/**languages*/
	#lang #select div[lang] {
		color:black;
		display:block;
		padding:0.5em;
	}

	/**languages mouse over*/
	#lang #select div[lang]:hover {
		background:orange;
	}
</style>

<!--container for language options-->
<div id=lang>

	<!--current language-->
	<?php
		//$lang is a global variable defined in languages/write.php
		echo "<img id=currentLang src='img/flags/$lang.png'";
	?>

	<!--all languages-->
	<div id=select> 
		<!--en--><div lang=en><img style=width:20px src="img/flags/en.png"> en</div>
		<!--es--><div lang=es><img style=width:20px src="img/flags/es.png"> es (under development)</div>
		<!--th--><div lang=th><img style=width:20px src="img/flags/th.png"> th (under development)</div>

		<!--null (no lang, only codes)-->
		<div lang=null>
			<img src="img/flags/null.png">
			null - only codes (development)	
		</div>
	</div> 
</div>

<script>
	//Add an onclick listener to each language
	(function() {
		var langs = document.querySelectorAll('#lang #select div[lang]');
		for(var i=0; i<langs.length; i++) {
			var lang=langs[i].getAttribute('lang');
			langs[i].setAttribute('onclick',"Language.set('"+lang+"')")
		}
	})();
	var Language = {}; //namespace
	Language.set = function(lang) {
		setCookie('lang',lang);
		window.location.reload();
	}
</script>
