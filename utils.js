//UTILS: functions for the visual part of the web app
function propietats(obj) /*totes les propietats d'un objecte*/
{	
	var str=""
	for(var field in obj) 
	{
		if(typeof(obj.field!="function"))
			str+="<th>"+field
	}
	return str
}
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
