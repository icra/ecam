/*
	Functions to deal with formulas/equations
*/
var Formulas={
	/*
		return array of strings corresponding to variables matched in formula string
		example: "this.sV1+this.aV2" returns ['sV1','aV2']
	*/
	idsPerFormula:function(formula) {
		var match,matches=[];
		//normal inputs
		for(var field in Info)
		{
			/* 
				\W matches any non-word characters (short for [^a-zA-Z0-9_]). 
				\D matches any non-digit (short for [^0-9]).
			*/
			var reg=new RegExp("\\W"+field+"(\\W|$)");
			match=formula.search(reg); //will return -1 if not found
			if(match!=-1){matches.push(field);}
		}
		//constants
		for(var field in Cts)
		{
			var reg=new RegExp("\\W"+field+"(\\W|$)");
			match=formula.search(reg); //will return -1 if not found
			if(match!=-1){matches.push(field);}
		}
		//fuel selected
		for(var field in Global.Configuration.Selected.FuelType)
		{
			var reg=new RegExp("\\W"+field+"(\\W|$)");
			match=formula.search(reg); //will return -1 if not found
			if(match!=-1){matches.push(field);}
		}
		return matches;
	},

	/**
		return array of strings: outputs that use input
		example: "sV1" returns ['c_wwt1','c_aV2']
	*/
	outputsPerInput:function(id,object) {
		object=object||Global;
		var matches=[];
		var match;
		var reg=new RegExp('\\W'+id+"\\W");
		for(var field in object)
		{
			if(field==id)continue;
			if(typeof object[field]=="object")
			{
				matches=matches.concat(this.outputsPerInput(id,object[field]));
			}
			if(typeof object[field]=="function" || typeof object[field]=="number")
			{
				match=object[field].toString().search(reg); //will return -1 if not found
				if(match+1){matches.push(field);}
			}
		}
		return matches;
	},

	prettify:function(formula) {
		var result = formula.replace(/function/,"")
		result = result.replace(/this./g,"")
		result = result.replace(/var /g,"")
		result = result.replace(/\|\|0/g,"")
		result = result.replace(/return /g,"")
		result = result.replace(/[\r\n\t]/g,"")
		result = result.replace(/Global./g,"")
		result = result.replace(/Water./g,"")
		result = result.replace(/Waste./g,"")
		result = result.replace(/General./g,"")
		result = result.replace(/Abstraction./g,"")
		result = result.replace(/Treatment./g,"")
		result = result.replace(/Distribution./g,"")
		result = result.replace(/Collection./g,"")
		result = result.replace(/Discharge./g,"")
		result = result.replace(/Configuration./g,"")
		result = result.replace(/Yes\/No./g,"")
		result = result.replace(/\(\)/g,"")
		result = result.replace(/Cts./g,"")
		result = result.replace(/().value/g,"$1")
		result = result.replace(/fuel=Tables\[Fuel types\]\[Tables.find\(w.._...._typ,w.._...._typ\)\]; /g,"");
		result = result.replace(/}$/g,"")
		result = result.replace(/^ {/g," ")
		result = result.replace(/\*/g," * ")
		result = result.replace(/\+/g," + ")
		result = result.replace(/\(\./g,"(")
		result = result.replace(/\/\//g,"")
		result = result.replace(/\"\]\./g,"")
		result = result.replace(/\'\]\./g,"")
		return result;
	},

	/* highlight a single field*/
	hlField:function(field,hl) {
		var yesno=hl?"yes":"no";
		var elements=document.querySelectorAll('[field='+field+']');
		for(var i=0;i<elements.length;i++)
		{
			elements[i].setAttribute('hl',yesno);
		}
	},

	/**
	 * Hihghlight a field <tr field=field>
	 * @param {string} field - the variable codes we want to highlight e.g. 'c_ww50'
	 * @param {object} object - pointer to the DOM object
	 * @param {boolean} hl - turn on/off highlighting
	 */
	hlInputs:function(field,object,hl) {
		var formula=object[field].toString();
		formula=Formulas.prettify(formula);
		var inputs=this.idsPerFormula(formula);
		for(var i in inputs)
		{
			this.hlField(inputs[i],hl);
		}
		//field can also have outputs
		this.hlOutputs(field,object,hl);
	},

	/**
	 * Hihghlight a field <tr field=field>
	 * @param {array of strings} fields - the variable codes we want to highlight e.g. ['sV1','sV2']
	 * @param {object} object - pointer to the DOM object
	 * @param {boolean} hl - turn on/off highlighting
	 */
	hlOutputs:function(input,obj,hl) {
		var outputs=this.outputsPerInput(input,obj);
		for(var i in outputs)
		{
			var field=outputs[i];
			var yesno=hl?"yes":"no";
			var elements=document.querySelectorAll('[field='+field+']');
			for(var i=0;i<elements.length;i++)
			{
				elements[i].setAttribute('hl_output',yesno);
			}
		}
	},
}
