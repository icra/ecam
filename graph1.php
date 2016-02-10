<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>
<h2>Graph 1: GHG per capita</h2>

<!--graph--><canvas id="ghg1" width="400" height="200"></canvas>

<script>
	var ctx = document.getElementById("ghg1").getContext("2d");

	var wGHG1 = Global.Water.wGHG1();
	var wwGHG1 = Global.Waste.wwGHG1();
	var data = [
		{
			value: wGHG1||1,
			color: "#af0",
			highlight: "#af0",
			label: "wGHG1 (kgCO2/inhab/year)"
		},
		{
			value: wwGHG1||1,
			color: "#d00",
			highlight: "#f00",
			label: "wwGHG1 (kgCO2/inhab/year)"
		},
	];
	var pie = new Chart(ctx).Pie(data);
</script>

<div>
Still not implemented, pending more precise explanation
</div>
