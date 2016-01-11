<?php include'currentSystem.php'?>
<?php
	/** void: echo a link if the current web page is not the one in the link's href */
	function nlink($href,$name)
	{
		if(strpos($_SERVER['PHP_SELF'],$href)) 
			echo "<div class=active-tab><a href='$href' style=color:black>$name</a></div>";
		else 
			echo "<div class=inactive-tab><a href='$href'>$name</a></div>";
	}
?>

<div id=navbar style="text-align:center;background:#00aff1;color:white;padding:0.2em 0em 0em 0em;font-size:18px">
	<?php
		echo "&#9776; "; //"burger" symbol
		nlink("index.php","&#8962; HOME");
		if(isset($_COOKIE['GLOBAL']))
		{
			nlink("getStarted.php",   "Get started");
			nlink("configuration.php","Configuration");
			nlink("stages.php",       "Input data");
			echo "<div class=inactive-tab><a onclick=summaryMenu(event) style=cursor:pointer>Summary</a></div>";
			nlink("about.php",        "About");
		}
	?>
</div>

<?php
	//if we are in edit.php, make "input data" active
	if(strpos($_SERVER['PHP_SELF'],"edit.php") || strpos($_SERVER['PHP_SELF'],"level3.php"))
	{
		echo "
			<script>
				var link = document.querySelector('a[href=\'stages.php\']')
				link.style.color='black'
				link.parentNode.className='active-tab'
			</script>
		";
	}
?>

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
		div.innerHTML=""+
			"<div><a href=summary.php?type=input>All inputs</a></div></div>"+
			"<div><a href=summary.php?type=output>All outputs</a></div>"+
			"<div class=close><button style=width:100%>Close</button></div>"+
			"";
	}
</script>

<style>
	#navbar div.active-tab, #navbar div.inactive-tab { margin:0 0 0; display:inline-block; }
	#navbar div.inactive-tab:hover { background:#0aafff }
	#navbar div.active-tab{ background:white; }
	#navbar a {color:white;}
	#navbar a:hover {text-decoration:none;}
	div.summaryMenu{
		background:#00aff1;
		border:1px solid #ccc;
		position:absolute;
		box-shadow: 5px 5px 5px #888;
		padding:0;
		margin:0;
	}
	div.summaryMenu div{padding:0.3em;text-align:left;cursor:pointer}
	div.summaryMenu div:hover {background:#0aafff}
	div.summaryMenu div.close{color:black; padding:0; margin:0;}
</style>
