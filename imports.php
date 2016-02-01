<meta charset="utf-8">
<link rel="stylesheet" href="css.css">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">

<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Disable tap highlight on IE -->
<meta name="msapplication-tap-highlight" content="no">

<!-- Add to homescreen for Chrome on Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="Comics">

<!-- Add to homescreen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Comics">

<!-- Color the status bar on mobile devices -->
<meta name="theme-color" content="#2F3BA2">

<!--the order of the imports is important. first global, then cookies-->
<script src="dataModel/global.js"></script>          <!--Default Global object here-->
<script src="dataModel/info.js"></script>            <!--All variable descriptions and units object here-->
<script src="dataModel/locateVariable.js"></script>  <!--function to locate codes inside Global object-->
<script src="dataModel/level3variables.js"></script> <!--list of variables exclusive to level3-->
<script src="dataModel/formulas.js"></script>        <!--functions dealing with formulas-->
<script src="dataModel/units.js"></script>           <!--functions dealing with unit conversion in-->
<script src="dataModel/tables.js"></script>          <!--data regarding constants-->
<script src="js/cookies.js"></script>                <!--basic cookie functions here-->
<script src="js/updateGlobalFromCookies.js"></script><!--update Global object from cookie "GLOBAL" here-->

<!--for graphs-->
<script src="js/Chart.min.js"></script>
