
var Formulas = {
	/*
		return array of strings corresponding to variables matched in formula string
		example: "this.sV1+this.aV2" returns ['sV1','aV2']
	*/
	idsPerFormula:function(formula)
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

	/*
		return array of codes of outputs matched in input id
		example: "sV1" returns ['c_wwt1','c_aV2']
	*/
	outputsPerInput:function(id,object)
	{
		object=object||Global;
		var matches=[];
		var match;
		var reg=new RegExp(id);
		for(field in object)
		{
			if(typeof object[field]=="object")
			{
				matches=matches.concat(this.outputsPerInput(id,object[field]));
			}
			if(typeof object[field]=="function")
			{
				match=object[field].toString().search(reg); //will return -1 if not found
				if(match!=-1){matches.push(field);}
			}
		}
		return matches
	},

	prettify:function(formula)
	{
		var result = formula.replace(/function/,"")
		result = result.replace(/this./g,"")
		result = result.replace(/\|\|0/g,"")
		result = result.replace(/return/g,"")
		result = result.replace(/\r/g,"")
		result = result.replace(/Global./g,"")
		result = result.replace(/Water./g,"")
		result = result.replace(/Waste./g,"")
		result = result.replace(/General./g,"")
		result = result.replace(/Abstraction./g,"")
		result = result.replace(/Treatment./g,"")
		result = result.replace(/Distribution./g,"")
		result = result.replace(/Collection./g,"")
		result = result.replace(/Discharge./g,"")
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
	hlFields:function(formula,hl)
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
