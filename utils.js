/** Find a variable code inside 'Global'*/
function locateVariable(code)
{
	var localization={};//e.g {"level":"Water","sublevel":"Abstraction"}
	localization.toString=function() {
		var levelName=(function()
		{
			switch(localization.level)
			{
				case "Water": return translate('Water');break;
				case "Waste": return translate('Waste');break;
				default: return localization.level;break;
			}
		})();

		if(localization.sublevel)
		{
			var sublevelName=(function()
			{
				switch(localization.sublevel)
				{
					default: return localization.sublevel; break;
				}
			})(); 
			return levelName+"/"+sublevelName
		}
		else
			return levelName;
	};

	for(var level in Global)
	{
		for(var field in Global[level])
		{
			if(typeof(Global[level][field])=='object')
			{
				for(var subfield in Global[level][field])
				{
					if(code==subfield)
					{
						localization["level"]=level;
						localization["sublevel"]=field;
						return localization;
						break;
					}
				}
			}
			else
			{
				if(code==field)
				{
					localization["level"]=level;
					localization["sublevel"]=0;
					return localization;
					break;
				}
			}
		}
	}
	return false;
}

/** return 3.999,4 instead of 3999.4*/
function format(number)
{
	//for non applicable
	if(number=="NA")return "<span style=color:#ccc>NA</span>"

	//for work in progess formulas: -999 (bad practice)
	if(number==-999){return "<span style=background:yellow>Formula under development</span>";}

	var str=new Intl.NumberFormat('en-EN',{maximumFractionDigits:2}).format(number);
	//display error if "NaN" or "Infinity"
	if(str=="NaN" || !isFinite(number)) return "<span style=color:#666;font-size:10px>~"+translate('missing_inputs')+"</span>";
	return str;
}

/** Colors for GHG emissions */
var ColorsGHG = {
	ws_KPI_GHG_elec      :"#3366CC", //electricity
	ws_KPI_GHG_ne        :"#DC3912", //fuel
	ww_KPI_GHG_elec      :"#FF9900", //electricity
	ww_KPI_GHG_ne_ch4_wwt:"#109618", //methane treated
	ww_KPI_GHG_ne_n2o_tre:"#990099", //nitrogen treated
	ww_KPI_GHG_ne_tsludge:"#0099C6", //transport
	ww_KPI_GHG_ne_ch4_unt:"#DD4477", //methane untreated
	ww_KPI_GHG_ne_n2o_unt:"#66AA00", //nitrogen untreated
	ww_KPI_GHG_ne_engines:"#B82E2E", //fuel
}

var Utils={};//namespace
//return array of codes that use "code" in its formula
Utils.usedInBenchmarks=function(code)
{
	var benchmarks=[];
	for(var bm in RefValues)
	{
		var bm_formula=RefValues[bm];
		if(bm_formula.toString().indexOf(code)+1)
		{
			benchmarks.push(bm);
		}
	}
	return benchmarks;
}
