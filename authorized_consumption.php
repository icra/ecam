<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init(){
			Graphs.gauge('graph', Global.Water.ws_SL_auth_con()||0, translate("ws_SL_auth_con_descr"),Info.ws_SL_auth_con.unit,0,200); //with unit and limits
		}
	</script>
	<style>
		#auth_con_guide td {
			text-align:center;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1>Authorized consumption</h1>

<!--graph-->
<div id=graph>
	Loading...
</div>


<table id=auth_con_guide>
	<tr>
		<th>Too low
		<th>Acceptable
		<th>Good
		<th>Acceptable
		<th>Too high
	</tr>
	<tr>
		<td style=background:red>   0   &mdash; ??
		<td style=background:orange>??  &mdash; ??
		<td style=background:#af0>  ??  &mdash; ??
		<td style=background:orange>??  &mdash; 200
		<td style=background:red>   200 &mdash; &infin;
	</tr>
</table>

<div>
	TBD: discuss limits (Andrés?)
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>
	google.charts.load('current',{'packages':['corechart','gauge','bar']});
	google.charts.setOnLoadCallback(init)
</script>
