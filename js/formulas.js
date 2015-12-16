/*
	return array of strings corresponding to variables matched in formula string
	example: "this.sV1+this.aV2" returns ['sV1','aV2']
*/
function idsPerFormula(formula)
{
	var matches=[]
	var match
	for(field in Info)
	{
		var reg=new RegExp('\\W'+field+'\\D')
		match=formula.search(reg) //will return -1 if not found
		if(match==-1)continue
		else matches.push(field)
	}
	return matches
}

function prettify(formula)
{
	var result = formula.replace(/function/,"")
	result = result.replace(/this./g,"")
	result = result.replace(/\|\|0/g,"")
	result = result.replace(/return/g,"")
	result = result.replace(/\(\)/g,"")
	result = result.replace(/[{}]/g,"")
	result = result.replace(/ /g,"")
	return result
}
