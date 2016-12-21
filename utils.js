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
