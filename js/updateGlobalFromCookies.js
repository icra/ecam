//OVERWRITE GLOBAL OBJECT IF GLOBAL COOKIE IS SET
if(getCookie("GLOBAL")) 
{
	//copy updated fields from cookie "GLOBAL" (stringified) to Global object
	copyFieldsFrom(JSON.parse(getCookie("GLOBAL")),"Global")
}

/** Way to update Global object, since JSON.stringify does not stringify fields that are functions */
function copyFieldsFrom(object,name)
{
	//go over all fields, which will be always strings or numbers
	for(var field in object)
	{
		if(object[field]===undefined)
		{
			console.log(field+" does not exist");
			continue;
		}

		if(object[field].constructor===Array)
		{
			eval(name+"['"+field+"']="+JSON.stringify(object[field]));
		}
		//if field is object, recursive call
		else if(typeof(object[field])=="object") 
		{
			copyFieldsFrom(object[field],name+"['"+field+"']")
		}
		else //means is a normal field (string or number)
		{
			//update the field
			//if the field is a number, don't use quotes
			if(typeof(object[field])=="number")
				eval(name+"['"+field+"']="+object[field])
			else
				eval(name+"['"+field+"']='"+object[field]+"'")
		}
	}
}

//TODO
function refactor_copyFieldsFrom(object_from,object_to)
{
	object_to=object_to||Global;

	//go over all fields: strings, numbers or arrays
	for(var field in object_from)
	{
		if(object_from[field]===undefined)
		{
			console.log(field+" does not exist");
			continue;
		}

		if(object_from[field].constructor===Array)
		{
			eval(name+"['"+field+"']="+JSON.stringify(object[field]));
		}
		//if field is object, recursive call
		else if(typeof(object_from[field])=="object") 
		{
			copyFieldsFrom(object_from[field],object_to)
		}
		else //means is a normal field (string or number)
		{
			//update the field
			object_to[field]=object_from[field];
		}
	}

}
