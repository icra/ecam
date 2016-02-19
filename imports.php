<!--utf8 and CSS-->
<meta charset="utf-8">
<link rel="stylesheet" href="css.css">

<!--things for mobiles-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">
<!--
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
-->
<meta name="msapplication-tap-highlight" content="no">
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="Comics">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Comics">
<meta name="theme-color" content="#2F3BA2">

<!--libraries here-->
<script src="js/lz-string.js"></script>

<!--the order of the imports is important. first global, then cookies-->
<script src="dataModel/global.js"></script>          <!--Default Global object here-->
<script src="dataModel/info.js"></script>            <!--All variable descriptions and units object here-->
<script src="dataModel/utils.js"></script>  <!--function to locate codes inside Global object-->
<script src="dataModel/dataQuality.js"></script>  <!--data quality-->
<script src="dataModel/level3variables.js"></script> <!--list of variables exclusive to level3-->
<script src="dataModel/level2warnings.js"></script>  <!--variables shown in level 2 with a warning-->
<script src="dataModel/level2only.js"></script>      <!--variables shown in level 2 but not in level 3-->
<script src="dataModel/formulas.js"></script>        <!--functions dealing with formulas-->
<script src="dataModel/units.js"></script>           <!--functions dealing with unit conversion in-->
<script src="dataModel/tables.js"></script>          <!--data regarding constants-->
<script src="dataModel/refValues.js"></script>		 <!--reference values for some kpis (good,acceptable,bad)-->
<script src="dataModel/exceptions.js"></script>		 <!--variables that have some special behaviour-->
<script src="js/cookies.js"></script>                <!--basic cookie functions here-->
<script src="js/updateGlobalFromCookies.js"></script><!--update Global object from cookie "GLOBAL" here-->

<!--title-->
<title>ECAM Web Tool</title>
