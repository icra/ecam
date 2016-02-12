/** update Global object without overwriting functions, since JSON.stringify does not stringify fields that are functions */
function copyFieldsFrom(object_from,object_to)
{
	for(var field in object_from)
	{
		//this is for level 3
		if(object_from[field].constructor===Array)
		{
			object_to[field] = object_from[field];
			continue;
		}
		//if field is not defined at target object, continue

		if(object_to[field]===undefined){continue;}
		/**
		   field is never a function because of JSON.stringify
		   if field is object, recursive call.
		   if field is number or string, copy it
		*/
		if(typeof(object_from[field])=="object")
		{
			copyFieldsFrom(object_from[field],object_to[field]);
		}
		else 
		{
			object_to[field] = object_from[field];
		}
	}
}

/**
  *
  * OVERWRITE GLOBAL AND SUBSTAGES
  *
  */
if(getCookie("GLOBAL")) 
{
	//decompress cookie global
	var compressed = getCookie('GLOBAL');
	var decompressed = LZString.decompressFromUTF16(compressed);

	console.log(decompressed);
	console.log(JSON.parse(decompressed));

	//update Global
    copyFieldsFrom(JSON.parse(decompressed),Global)
}

