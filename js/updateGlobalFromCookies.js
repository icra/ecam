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
	for(field in object)
	{
		if(object[field].constructor===Array)
		{
			eval(name+"['"+field+"']="+JSON.stringify(object[field]));
		}
		//if field is also object, recursive call
		else if(typeof(object[field])=="object") 
		{
			copyFieldsFrom(object[field],name+"['"+field+"']")
		}
		else //means is a normal field
		{
			//update the field
			//if the field is a number, don't use single quotes
			if(typeof(object[field])=="number")
				eval(name+"['"+field+"']="+object[field])
			else
				eval(name+"['"+field+"']='"+object[field]+"'")
		}
	}
}
