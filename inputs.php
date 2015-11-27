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
<!--ACTIVE LEVELS--><?php include'activeLevels.php'?>

<!--LINKS TO LEVELS INPUTS-->
<table style="text-align:center">
	<tr><th colspan=6>EDIT 
	<tr>
		<td colspan=6><a href="edit.php?level=Global">Global</a>
			<br><button>Volumes</button> <button>Energy</button> <button>Emissions</button>
	<tr>
		<td colspan=3><a href="edit.php?level=Water">Water Supply</a>
			<br><button>Volumes</button> <button>Energy</button> <button>Emissions</button>
		<td colspan=3><a href="edit.php?level=Waste">Wastewater</a>
			<br><button>Volumes</button> <button>Energy</button> <button>Emissions</button>
	<tr>
		<td><a href="edit.php?level=Water&sublevel=Abstraction"		>Abstraction</a> 	<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href="edit.php?level=Water&sublevel=Treatment"		>Treatment</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href="edit.php?level=Water&sublevel=Distribution"	>Distribution</a>	<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href="edit.php?level=Waste&sublevel=Collection"		>Collection</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href="edit.php?level=Waste&sublevel=Treatment"		>Treatment</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
		<td><a href="edit.php?level=Waste&sublevel=Discharge"		>Discharge</a>		<br><button>Volumes</button><br><button>Energy</button><br><button>Emissions</button>
</table>

<a href=sankey.php>Sankey Example</a>
