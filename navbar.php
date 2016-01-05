<?php include'currentSystem.php'?>
<?php
	/** void: echo a link if the current web page is not the one in the link's href */
	function nlink($href,$name)
	{
		if(strtoupper($href)==strtoupper($_SERVER['PHP_SELF'])) 
			echo "<div class=active-tab><a href='$href' style=color:black>$name</a></div>";
		else 
			echo "<div class=inactive-tab><a href='$href'>$name</a></div>";
	}
?>

<div id=navbar style="text-align:center;background:#00aff1;color:white;padding:0.2em 0em 0em 0em;font-size:18px">
	<?php
		echo "&#9776; "; //menu symbol (3 horizontal bars)
		nlink("/ecam/index.php","&#8962; HOME");
		if(isset($_COOKIE['GLOBAL']))
		{
			nlink("/ecam/getStarted.php",   "Get started");
			nlink("/ecam/configuration.php","Configuration");
			nlink("/ecam/stages.php",       "Input data");
			nlink("/ecam/resources.php",    "Resources");
			nlink("/ecam/about.php",        "About");
			echo "<div class=inactive-tab><a href=# onclick=summaryMenu(event)>Summary</a></div>";
		}
	?>
</div>

<script>
	/** make appear a menu for navigate to summary: inputs/outputs */
	function summaryMenu(ev)
	{
		//first hide all other posible summaryMenus
		var other=document.querySelectorAll("div.summaryMenu");
		for(var i=0;i<other.length;i++){other[i].style.display='none';}
		var div=document.createElement('div');
		document.querySelector("#navbar").appendChild(div);
		div.className="summaryMenu";
		div.onclick=function(){div.style.display='none'}
		//get mouse coordinates
		div.style.top=event.pageY+"px";
		div.style.left=event.pageX+"px";
		div.innerHTML="<div class=close><span style=cursor:pointer><button>x</button></span></div>"+
			"<div><a href=summary.php?type=input>All inputs</a></div>"+
			"<div><a href=summary.php?type=output>All outputs</a></div>";
	}
</script>

<style>
	#navbar .active-tab, #navbar .inactive-tab
	{
		margin:0 0 0;
		display:inline-block;
	}
	#navbar .active-tab{
		background:white;
	}
	#navbar a {
		color:white;	
	}
	div.summaryMenu{
		background:#00aff1;
		border:1px solid #ccc;
		position:absolute;
		box-shadow: 5px 5px 5px #888;
		padding:0;
		margin:0;
	}
	div.summaryMenu div{padding:0.3em;text-align:left;}
	div.summaryMenu div.close{ color:black; padding:0; margin:0; text-align:right; }
</style>
