/** update Global object without overwriting functions, since JSON.stringify does not stringify fields that are functions */
function copyFieldsFrom(object_from,object_to)
{
	for(var field in object_from)
	{
		if(object_from[field].constructor===Array)
		{
			object_to[field] = object_from[field];
			continue;
		}

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
			try
			{
				object_to[field]=object_from[field];
			}
			catch(e){alert(e)}
		}
	}
}

/**
  *
  * OVERWRITE GLOBAL AND SUBSTAGES
  *
  */
if(getCookie("GLOBAL")!==null) 
{
	/**
	*
	* Decompress cookie global
	*
	*/

	//compressed is a string with weird symbols
	var compressed=getCookie('GLOBAL');

	//decompressed now is the JSON structure of Global as a string
	var decompressed=LZString.decompressFromEncodedURIComponent(compressed);

	//parsed now is an object
	var parsed=JSON.parse(decompressed);

	//now we can copy the fields from decompressed to Global
	copyFieldsFrom(parsed,Global);

	//Now decompress and parse Substages
	Substages.Water.Abstraction  = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterAbs')));
	Substages.Water.Treatment    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterTre')));
	Substages.Water.Distribution = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('waterDis')));
	Substages.Waste.Collection   = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteCol')));
	Substages.Waste.Treatment    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteTre')));
	Substages.Waste.Discharge    = JSON.parse(LZString.decompressFromEncodedURIComponent(getCookie('wasteDis')));
}
