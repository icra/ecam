/** update Global object without overwriting functions, since JSON.stringify does not stringify fields that are functions */
function copyFieldsFrom(object_from,object_to)
{
	for(var field in object_from)
	{
		//check if field is not defined at target object
		if(object_to[field]===undefined){console.log(field+" does not exist in "+object_to.toString());continue;}

		//check if field is function, object or none of both
		if(typeof(object_to[field])=="function")
		{
			continue;
		}
		else if(typeof(object_from[field])=="object")
		{
			copyFieldsFrom(object_from[field],object_to[field]);
		}
		else 
			object_to[field] = object_from[field];
	}
}

//OVERWRITE GLOBAL AND SUBSTAGES
if(getCookie("GLOBAL")) 
{
	//update Global from cookie GLOBAL
	copyFieldsFrom(JSON.parse(getCookie("GLOBAL")),Global)

	Substages.Water.Abstraction  = JSON.parse(getCookie("SUBSTAGES_waterAbs"));
	Substages.Water.Treatment    = JSON.parse(getCookie("SUBSTAGES_waterTre"));
	Substages.Water.Distribution = JSON.parse(getCookie("SUBSTAGES_waterDis"));
	Substages.Waste.Collection   = JSON.parse(getCookie("SUBSTAGES_wasteCol"));
	Substages.Waste.Treatment    = JSON.parse(getCookie("SUBSTAGES_wasteTre"));
	Substages.Waste.Discharge    = JSON.parse(getCookie("SUBSTAGES_wasteDis"));
}


