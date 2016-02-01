<link rel="stylesheet" href="css.css">
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
<link rel="icon" href="img/favicon.ico" type="image/x-icon">

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
