<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
		.blue{color:#00AFF2;font-size:1.5em}
	</style>
	<script>
		function openAll()
		{
			var elements=document.getElementsByTagName('ul')
			for(var i=0;i<elements.length;elements[i++].style.display='');
			var botons=document.getElementsByTagName('button')
			for(var i=0;i<botons.length;i++)
			{
				botons[i].innerHTML=botons[i].innerHTML=='+'?'-':botons[i].innerHTML
			}
		}
		function collapseAll()
		{
			var elements=document.getElementsByTagName('ul')
			for(var i=0;i<elements.length;elements[i++].style.display='none');
			document.getElementById('summary').style.display=''
			var botons=document.getElementsByTagName('button')
			for(var i=0;i<botons.length;i++)
			{
				botons[i].innerHTML=botons[i].innerHTML=='-'?'+':botons[i].innerHTML
			}
		}
		function fadeIn(element,val)
		{
			element.style.opacity=val
			if(val<1)
			{
				val+=0.1
				setTimeout(function(){fadeIn(element,val)},20)
			}
		}
		function toggleSymbol(button)
		{
			button.innerHTML=button.innerHTML=='+'?'-':'+'
		}
		function toggleDisplay(id,button)
		{
			var element=document.getElementById(id)
			if(element.style.display=='none')
			{
				element.style.display=''
				fadeIn(element,0)
			}
			else element.style.display='none'
			if(button)toggleSymbol(button)
		}
	</script>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>

<!--TITLE AND SUBTITLE-->
<h1 class=blue onclick=window.location.reload() style=font-size:2em>ECAM <span style=font-size:16px>(under construction)</span></h1>
<h3>
	<span class=blue>E</span>nergy performance and
	<span class=blue>C</span>arbon emissions
	<span class=blue>A</span>ssessment and 
	<span class=blue>M</span>onitoring Tool
</h3>

<!--FLOW-->
<img src=img/flow.png>

<!--STAGES (SCRIPT AND STYLE INSIDE)-->
fer en horitzontal
<table border=1>
	<script>
		/** Enable or disable <input type=checkbox class=class */
		function toggleDisabled(className,checkbox)
		{
			var elements=document.getElementsByClassName(className)
			for(var i=0;i<elements.length;i++)
			{
				if(checkbox.checked)
				{
					elements[i].removeAttribute('disabled')
					elements[i].parentNode.style.color=""
				}
				else
				{
					elements[i].checked=false
					elements[i].setAttribute('disabled',true)
					elements[i].parentNode.style.color="#ccc"
				}
			}
		}
	</script>
	<style>
		/* bigger checkboxes*/
		input[type=checkbox]{
			transform: scale(1.7);
		}
		td{text-align:left}
	</style>
	<tr><th>LEVEL 1<th>LEVEL 2<th>LEVEL 3
		<td rowspan=8><!--IMG--><img src=img/diagram.png>
	<tr>
		<td style="text-align:center"><a href=global.php>Global</a>
		<td style="text-align:center"><a>Stages</a>
		<td style="text-align:center"><a>Sub-Stages</a> 
	<tr><td rowspan=3><label><input type=checkbox onclick=toggleDisabled('water',this)> 		<b>Water Supply</b>		</label>
			<td><label style=color:#ccc><input type=checkbox disabled class=water> 				Abstraction		</label> <td style="text-align:center"><input type=checkbox class=water disabled>
		<tr><td><label style=color:#ccc><input type=checkbox disabled class=water> 				Treatment			</label> <td style="text-align:center"><input type=checkbox class=water disabled>
		<tr><td><label style=color:#ccc><input type=checkbox disabled class=water> 				Distribution		</label> <td style="text-align:center"><input type=checkbox class=water disabled>
	<tr><td rowspan=3><label><input type=checkbox onclick=toggleDisabled('wastewater',this)> 	<b>Wastewater</b>		</label>
			<td><label style=color:#ccc><input type=checkbox disabled class=wastewater> 		Collection	</label> <td style="text-align:center"><input type=checkbox class=water disabled>
		<tr><td><label style=color:#ccc><input type=checkbox disabled class=wastewater> 		Treatment	</label> <td style="text-align:center"><input type=checkbox class=water disabled>
		<tr><td><label style=color:#ccc><input type=checkbox disabled class=wastewater> 		Discharge	</label> <td style="text-align:center"><input type=checkbox class=water disabled>
</table>
