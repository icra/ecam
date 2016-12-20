<!--php file to import everywhere, at the end of document <body>-->
<div id=caption style=display:none>#caption</div>

<script>
	var Caption={};//namespace
	Caption.show=function(ev,element){
		var caption=document.querySelector("#caption")
		caption.style.display=''
		caption.style.left=(ev.clientX-10)+"px"
		caption.style.top=(ev.clientY+15)+"px"
		caption.innerHTML=element.getAttribute('caption');
	}
	Caption.hide=function(){document.querySelector("#caption").style.display='none';}
	//add mouse listeners. To call when page loads (<body onload>)
	Caption.listeners=function()
	{
		var els=document.querySelectorAll("[caption]");
		for(var i=0;i<els.length;i++)
		{
			els[i].onmouseout=function(){Caption.hide();}
			els[i].onmousemove=function(){Caption.show(event,this);}
		}
	}
</script>

<style>
	div#caption {
		position:fixed;
		z-index:999;
		background:white;
		padding:0.3em 0.5em;
		box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
		border:1px solid #ccc;
		color:#666;
	}
</style>
