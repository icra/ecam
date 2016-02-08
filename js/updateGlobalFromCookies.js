//OVERWRITE GLOBAL OBJECT IF GLOBAL COOKIE IS SET
if(getCookie("GLOBAL")) 
{
	//update Global from cookie GLOBAL
	copyFieldsFrom(JSON.parse(getCookie("GLOBAL")),Global)
}


/** update Global object without overwriting functions, since JSON.stringify does not stringify fields that are functions */
function copyFieldsFrom(object_from,object_to)
{
	for(var field in object_from)
	{
		//check if field is not defined at target object
		if(object_to[field]===undefined){console.log(field+" does not exist in "+object_to.toString());continue;}

		//check if field is a function
		if(typeof(object_to[field])=="function"){continue;}

		//in case is an array, copy it directly
		if(object_from[field].constructor===Array)
			object_to[field] = object_from[field];
		//in case is object (array would fit in this), recursive call
		else if(typeof(object_from[field])=="object") 
			copyFieldsFrom(object_from[field],object_to[field]);
		//otherwise it will be a number or a string
		else 
			object_to[field] = object_from[field];
	}
}
