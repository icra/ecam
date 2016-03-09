/** Data Quality */

var DQ = { };

//newValue can be "Actual" or "Estimated"
DQ.update=function(field,newValue)
{
	Global.Configuration.DataQuality[field]=newValue;
	init();
}

//search if any input to calculate "field" has estimated data
DQ.hasEstimatedData = function(field)
{
	//locate variable
	var loc=locateVariable(field); //object with two fields: level and sublevel

	//if variable is not found, return false
	if(!loc) return false;

	//process loc object
	var stage = loc.sublevel ? Global[loc.level][loc.sublevel] : Global[loc.level];

	if(typeof(stage[field])=='number') return false;

	//default value
	Global.Configuration.DataQuality[field]=undefined;

	//get formula
	var formula=Formulas.prettify(stage[field].toString());

	//get list of inputs
	var inputs=Formulas.idsPerFormula(formula);

	//go over inputs
	for(var i=0; i<inputs.length; i++)
	{
		//check in data quality object
		if(Global.Configuration.DataQuality[inputs[i]]=="Estimated")
		{
			Global.Configuration.DataQuality[field]="Estimated";
			return true;
		}
		//note: if we check recursively, stack overflow is produced
	}
	return false;
}
