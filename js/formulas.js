
var Formulas = {
	/*
		return array of strings corresponding to variables matched in formula string
		example: "this.sV1+this.aV2" returns ['sV1','aV2']
	*/
	idsPerFormula: function(formula)
	{
		var matches=[]
		var match
		for(field in Info)
		{
			var reg=new RegExp('\\W'+field+'\\D');
			match=formula.search(reg); //will return -1 if not found
			if(match!=-1){matches.push(field);}
		}
		return matches
	},

	prettify: function(formula)
	{
		var result = formula.replace(/function/,"")
		result = result.replace(/this./g,"")
		result = result.replace(/\|\|0/g,"")
		result = result.replace(/return/g,"")
		result = result.replace(/\(\)/g,"")
		result = result.replace(/[{}]/g,"")
		result = result.replace(/ /g,"")
		return result
	},

	/**
	 * Hihghlight a field <tr field=field>
	 * @param {array of strings} fields - the variable codes we want to highlight e.g. ['sV1','sV2']
	 * @param {boolean} hl - turn on/off highlighting
	 */
	hlFields: function(formula,hl)
	{
		var fields=Formulas.idsPerFormula(formula)
		for(field in fields)
		{
			var element=document.querySelector('[field='+fields[field]+']')
			if(element)
				element.style.backgroundColor=hl?"#af0":""
		}
	}

}
