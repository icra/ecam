<!doctype html><html><head>
	<?php include'imports.php'?>
	<script src="//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
	<style>
		h1{background:white}
		div.bm {
			border:1px solid #ccc;
			margin:1px;
			padding:1px;
		}
		div.card {margin:10px}
		pre.prettyprint {border:none;margin:1px;padding:1px}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><a href=development.php>
	<?php write('#dev')?></a> &rsaquo; 
	<?php write('#Benchmarking summary')?>
</h1>
<!--root-->
<div id=root style="text-align:left">
	<div style="margin-top:1em;text-align:center">
		<button onclick=foldAll()>
			<?php write('#Fold all')?>
		</button>
		<button onclick=unfoldAll()>
			<?php write('#Expand all')?>
		</button>
		<script>
			function unfoldAll() {
				var elements = document.querySelectorAll('div.card.folded');
				for(var i=0;i<elements.length;i++)
					elements[i].classList.remove('folded');
			}
			function foldAll()
			{
				var elements = document.querySelectorAll('div.card');
				for(var i=0;i<elements.length;i++)
					elements[i].classList.add('folded');
			}
		</script>
	</div>
	<script>
		var Bm = {};
		Bm.getCodes = function(prefix)
		{
			var codes = new Array();
			for(var f in RefValues)
				if(f.search("^"+prefix)>-1) 
					codes.push(f);
			return codes
		}
		function printDiv(prefix)
		{
			var stage;
			switch(prefix)
			{
				case "wsa": stage=translate("Abstraction");break;
				case "wst": stage=translate("Treatment");break;
				case "wsd": stage=translate("Distribution");break;
				case "wwc": stage=translate("Collection");break;
				case "wwt": stage=translate("Treatment");break;
				case "wwd": stage=translate("Discharge");break;
				case "wsg": stage=translate("Water");break;
				case "wwg": stage=translate("Waste");break;
			}

			document.write("<div class='card '>"+
				"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
				stage+"</span></div>"+
				"");

			var codes = Bm.getCodes(prefix);
			codes.forEach(function(code)
			{
				document.write("<div class='card folded'>"+
					"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
						translate(code+"_descr")+
						" (<a href='variable.php?id="+code+"' onclick=\"event.stopPropagation()\">"+code+"</a>) "+
					"</span></div>"+
					"<pre class='prettyprint'>"+
					RefValues[code].toString()+
					"</pre>"+
				"</div>")
			});
			if(codes.length==0){document.write('empty')}
			document.write("</div>")
		}
		function printLevel(prefixArray,name)
		{
			document.write("<div class='card'>"+
				"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
				name+"</span></div>");
			prefixArray.forEach(function(prefix){printDiv(prefix)});
			document.write("</div>")
		}
		function printAll()
		{
			printLevel(['wsa','wst','wsd'],translate("Water"));
			printLevel(['wwc','wwt','wwd'],translate("Waste"));
			printLevel(['wsg','wwg'],translate("Energy"));
		}
	</script>
	<script>printAll()</script>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
