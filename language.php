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
    <style>#lang #select div[lang] img {width:20px}</style>
		<!--en--><div lang=en><img src="img/flags/en.png"> en</div>
    <!--de--><div lang=de><img src="img/flags/de.png"> de</div>
    <!--es--><div lang=es><img src="img/flags/es.png"> es</div>
		<!--fr--><div lang=fr><img src="img/flags/fr.png"> fr</div>
    <!--th--><div lang=th><img src="img/flags/th.png"> th</div>

    <!--arabic under development-->
    <!--ar--><div lang=ar><img src="img/flags/ar.png"> ar</div>

    <!--null (only language tags)-->
		<div lang=null> <img src="img/flags/null.png"> null (only tags)	</div>
    <!--go to problems summary-->
    <div lang="<?php echo $lang?>"><a href=translation_problems.php style=color:blue>language debugging tool</a></div>
	</div> 
</div>

<script>
	//Add an onclick listener to each language
	(function() {
    document.querySelectorAll('#lang #select div[lang]').forEach(div=>{
      let lang=div.getAttribute('lang');
      //div lang click listener
      div.addEventListener('click',function(){
        if(lang=='ar'){
          alert('الترجمة إلى اللغة العربية هي قيد التطوير. شكرا لك على صبرك. The translation to the arabic language it is in development. thank your for your patience.');
          lang='en';
        }
        Language.set(lang)
      });
		});
	})();
	var Language={};//namespace
	Language.set=function(lang){
		setCookie('lang',lang);
		window.location.reload();
	}
</script>
