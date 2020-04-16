<!--utf8 and CSS-->
<meta charset="utf-8">
<link rel="stylesheet" href="css.css">
<link rel="icon" href="img/favicon.ico" type="image/x-icon">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ECAM v2</title>

<!--libs-->
  <!--string compression lib -->
  <script src="js/lz-string.js"></script>
  <!--google charts lib-->
  <script src="js/charts/loader.js"></script>
  <!--vue js lib
    development version, includes helpful console warnings
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    production version, optimized for size and speed
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!--/libs-->

<!--backend-->
  <!--translation--><?php include'languages/write.php' ?>
  <!--order is important: dataModel then cookies-->
  <script src="dataModel/structure.js"></script>
  <script src="dataModel/global.js"></script>
  <script src="dataModel/substages.js"></script>
  <script src="dataModel/info.js"></script>
  <script src="dataModel/level3variables.js"></script>
  <script src="dataModel/level2only.js"></script>
  <script src="dataModel/questions.js"></script>
  <script src="dataModel/formulas.js"></script>
  <script src="dataModel/units.js"></script>
  <script src="dataModel/tables.js"></script>
  <script src="dataModel/refValues.js"></script>
  <script src="dataModel/exceptions.js"></script>
  <script src="dataModel/normalization.js"></script>
  <script src="dataModel/constants.js"></script>
  <script src="dataModel/tips.js"></script>
  <script src="dataModel/countries.js"></script>
  <script src="dataModel/gwp_reports.js"></script>
  <script src="dataModel/estimations.js"></script>
  <script src="dataModel/sumable_magnitudes.js"></script>
  <script src="dataModel/recommendations.js"></script>
  <script src="js/cookies.js"></script>
  <script src="js/updateGlobalFromCookies.js"></script>
  <script src="utils.js"></script>
  <!--graphs--><script src="graphs.js"></script>
  <!--unfccc--><script src="dataModel/unfccc.js"></script>
<!--/backend-->

<?php /*php utils*/
	//create a menu for folding the parent div.card element
	function cardMenu($name){
		echo "
		<div class=menu onclick=this.parentNode.classList.toggle('folded')>
			<button></button>
			$name
		</div>
		";
	}
?>
