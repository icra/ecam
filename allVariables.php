<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script>
		/** Redisplay table id=all */
		function update()
		{
			var t=document.getElementById('all')
			while(t.rows.length>2)t.deleteRow(-1)
			var i=1
			for(field in Info)
			{
				var newRow=t.insertRow(-1)
				newRow.insertCell(-1).innerHTML=i
				newRow.insertCell(-1).innerHTML=field
				newRow.insertCell(-1).innerHTML=Info[field].description
				newRow.insertCell(-1).innerHTML=Info[field].unit
				i++
			}
		}
		function init()
		{
			update()
		}
	</script>
</head><body onload=init()><center>
<!--navbar--><?php include"navbar.php"?>

<!--title--><h2>All Variables</h2>

<!--all variables-->
<table id=all style=font-size:14px>
	<tr><th>Nº<th>Variable<th>Description<th>Unit
</table>

