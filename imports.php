<!--utf8 and CSS-->
<meta charset="utf-8">
<link rel="stylesheet" href="css.css">
<link rel="icon" href="img/favicon.ico" type="image/x-icon">

<!--things for mobiles-->
<meta name="description" content="">

<!--libraries here-->
<script src="js/lz-string.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!--the order of the imports is important. first global, then cookies-->
<script src="dataModel/global.js"></script>          <!--Default Global object here-->
<script src="dataModel/substages.js"></script>
<script src="dataModel/info.js"></script>            <!--All variable descriptions and units object here-->
<script src="dataModel/utils.js"></script>  <!--function to locate codes inside Global object-->
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

<!--translation related-->
<?php include'languages/write.php'; //loads all strings?>
<script>
	function translate(id)
	{
		var sol = new XMLHttpRequest()	
		sol.open('GET','languages/translate.php?id='+id,false)
		sol.send()
		return sol.response;
	}
</script>

<!--graphs functions-->
<?php include'graphs.php'?>

<!--title-->
<title>ECAM Web Tool</title>
