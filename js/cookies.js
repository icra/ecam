/** 
	RAW COOKIES FUNCTIONS 
*/

/** New cookie */
function setCookie(name,value,days) 
{
	var d = new Date();
	d.setTime(d.getTime()+(days*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = name+"="+value+"; "+expires;
	console.log("Cookie '"+name+"' updated")
}

/** Read cookie */
function getCookie(name)
{
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++) 
	{
		var c=ca[i];
		while(c.charAt(0)==' ')c=c.substring(1,c.length);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/** Remove cookie */
function removeCookie(name)
{
	document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	console.log("Cookie '"+name+"' removed")
}
