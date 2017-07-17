<!--utf8 and CSS-->
<meta charset="utf-8">
<link rel="stylesheet" href="css.css">
<link rel="icon" href="img/favicon.ico" type="image/x-icon">
<meta name="description" content="">
<!--libs-->
<script src="js/lz-string.js"></script>
<script src="js/charts/loader.js"></script>
<!--translation--><?php include'languages/write.php' ?>
<!--order is important: dataModel then cookies-->
<script src="dataModel/global.js"></script>
<script src="dataModel/substages.js"></script>
<script src="dataModel/info.js"></script>
<script src="dataModel/dataQuality.js"></script>
<script src="dataModel/level3variables.js"></script>
<script src="dataModel/level2warnings.js"></script>
<script src="dataModel/level2only.js"></script>
<script src="dataModel/questions.js"></script>
<script src="dataModel/formulas.js"></script>
<script src="dataModel/units.js"></script>
<script src="dataModel/tables.js"></script>
<script src="dataModel/refValues.js"></script>
<script src="dataModel/exceptions.js"></script>
<script src="dataModel/normalization.js"></script>
<script src="dataModel/averagedVariables.js"></script>
<script src="dataModel/constants.js"></script>
<script src="dataModel/tips.js"></script>
<script src="dataModel/countries.js"></script>
<script src="dataModel/gwp_reports.js"></script>
<script src="dataModel/estimations.js"></script>
<script src="js/cookies.js"></script>
<script src="js/updateGlobalFromCookies.js"></script>
<script src="utils.js"></script>
<!--graphs--><script src="graphs.js"></script>
<!--unfccc--><script src="dataModel/unfccc.js"></script>

<style>
	div.tab_buttons               { text-align:center;font-size:19px;padding:0.5em 0;display:flex;justify-content:center}
	div.tab_buttons button        { display:block;padding:0 5px;border:1px solid #ccc;background:#f5f5f5;outline:none;}
	div.tab_buttons button:hover  { background:#e6e6e6}
	div.tab_buttons button.left   { border-radius:0.5em 0.0em 0.0em 0.5em; border-right-style:none}
	div.tab_buttons button.right  { border-radius:0.0em 0.5em 0.5em 0.0em; }
	div.tab_buttons button.middle { border-right-style:none}

	div.tab_buttons button[disabled] { background-color:#ccc;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05);}
</style>

<?php /**php utils**/
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
<!--title--><title>ECAM Web Tool</title>
