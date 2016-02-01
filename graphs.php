<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
</head><body><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<div>
	<h2>GHG1 graph 1</h2>
	<canvas id="ghg1" width="400" height="200"></canvas>
	<script>
		var ctx = document.getElementById("ghg1").getContext("2d");
		var wGHG1 = Global.Water.wGHG1()
		var wwGHG1 = Global.Waste.wwGHG1()
		var data = [
			{
				value: wGHG1,
				color: "#af0",
				highlight: "#af0",
				label: "wGHG1"
			},
			{
				value: wwGHG1,
				color: "#f00",
				highlight: "#f00",
				label: "wwGHG1"
			},
		];
		var pie = new Chart(ctx).Pie(data);
	</script>
</div>

<div>
	<h2>GHG1 graph 2</h2>

	<canvas id="ghg2" width="400" height="200"></canvas>
	<script>
		/*
		The bar graph for GHG emissions per type: 
		use only 1 graph and show two vertical axis (not shown here): 
		one per serviced population and the other one per m3. 
		(The proportions remain the same whether you present the indicator with one or the other denominator)
		Serviced population: wGHG4, wGHG6, wwGHG6, wwGHG4						 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 
		Authorized consumption values: wGHG5, wGHG7, wwGHG7, wwGHG5<br>
		*/
		var ctx=document.getElementById("ghg2").getContext("2d");
		var data = {
			labels: ["Serviced Population", "Authorized consumption"],
			datasets:[
				{
					fillColor: "rgba(220,220,220,0.5)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data: [65, 59]
				},
				{
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: [28, 48]
				}
			],
		};

		new Chart(ctx).Bar(data,{});
	</script>
</div>

<!--FOOTER--><?php include'footer.php'?>
