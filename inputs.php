<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script src="js/cookies.js"></script>
	<script src="dataModel/global.js"></script>
	<script src="dataModel/info.js"></script>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h2 onclick=window.location.reload() style="cursor:pointer">Inputs</h2>
<!--active levels--><?php include'activeLevels.php'?>

<a href=sankey.php>Sankey Example</a>

<br>

<div>
these buttons take you to pages that display all inputs for selected level (like global.php)
</div>

<table>
	<tr><th colspan=7>Edit level inputs
	<tr>
		<td rowspan=2><a href=global.php>Global</a>
		<td colspan=3><a href=#>Water Supply</a>
			<button>Volumes</button>
			<button>Energy</button>
			<button>Emissions</button>
		<td colspan=3><a href=#>Wastewater</a>
			<button>Volumes</button>
			<button>Energy</button>
			<button>Emissions</button>
	<tr>
		<td><a href=#>Abstraction</a> 	<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href=#>Treatment</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href=#>Distribution</a>	<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href=#>Collection</a>	<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href=#>Treatment</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href=#>Discharge</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
</table>
