<!--utf8 and CSS-->
<meta charset="utf-8">
<link rel="stylesheet" href="css.css">
<link rel="icon" href="img/favicon.ico" type="image/x-icon">

<!--things for mobiles-->
<meta name="description" content="">

<!--libraries here-->
<script src="js/lz-string.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!--translation related-->
<?php include'languages/write.php'; //loads all strings ?>

<!--the order of the imports is important. first global, then cookies-->
<script src="dataModel/global.js"></script>          <!--Default Global object here-->
<script src="dataModel/substages.js"></script>
<script src="dataModel/info.js"></script>            <!--All variable descriptions and units object here-->
<script src="dataModel/dataQuality.js"></script>  <!--data quality-->
<script src="dataModel/level3variables.js"></script> <!--list of variables exclusive to level3-->
<script src="dataModel/level2warnings.js"></script>  <!--variables shown in level 2 with a warning-->
<script src="dataModel/level2only.js"></script>      <!--variables shown in level 2 but not in level 3-->
<script src="dataModel/questions.js"></script>
<script src="dataModel/formulas.js"></script>        <!--functions dealing with formulas-->
<script src="dataModel/units.js"></script>           <!--functions dealing with unit conversion in-->
<script src="dataModel/tables.js"></script>          <!--data regarding constants-->
<script src="dataModel/refValues.js"></script>		 <!--reference values for some kpis (good,acceptable,bad)-->
<script src="dataModel/exceptions.js"></script>		 <!--variables that have some special behaviour-->
<script src="js/cookies.js"></script>                <!--basic cookie functions here-->
<script src="js/updateGlobalFromCookies.js"></script><!--update Global object from cookie "GLOBAL" here-->
<script src="dataModel/normalization.js"></script>		 <!--variables that have some special behaviour-->
<script src="dataModel/averagedVariables.js"></script>

<!--graphs functions: import after translation!-->
<?php include'graphs.php'?>

<!--utils: format numbers and locate variables-->
<script>
	/** Find a variable code, e.g 'gV2' inside 'Global' and tell where it is */
	function locateVariable(code)
	{
		var localization={}; //e.g {"level":"Water","sublevel":"Abstraction"}
		localization['toString']=function()
		{
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
						default: 
							return localization.sublevel;
							break;
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
					}
				}
			}
		}
		return false;
	}

	/** return 3.999,4 instead of 3999.4*/
	function format(number)
	{
		var str = new Intl.NumberFormat('en-EN',{maximumFractionDigits:2}).format(number);
		if(str=="NaN" || !isFinite(number)) return "<span style=color:#666>[<?php write('#missing_inputs')?>]</span>";
		return str;
	}

	/** make a row from a table element inactive. used to inactivate rows according to Questions**/
	function disableRow(row)
	{
		//row.style.display='none';
		//Change color
		row.style.background='#eee';
		row.style.color='#aaa';
		//get the name of the field (variable)
		var field = row.getAttribute('field');
		//create a new css element
		var style = document.createElement('style');
		document.body.appendChild(style);
		style.innerHTML="tr[field="+field+"] * {pointer-events:none;font-size:10px;font-style:italic;cursor:not-allowed}"
	}
</script>

<!--title-->
<title>ECAM Web Tool</title>
