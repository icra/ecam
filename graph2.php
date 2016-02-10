<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>
<h2>Graph 2: GHG per stage</h2>

<!--graph--><canvas id="graph" width="400" height="200"></canvas>

<script>
	/*
		The bar graph for GHG emissions per type: 
		use only 1 graph and show two vertical axis (not shown here): 
		one per serviced population and the other one per m3. 
		(The proportions remain the same whether you present the indicator with one or the other denominator)
		Serviced population: wGHG4, wGHG6, wwGHG6, wwGHG4						 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 
		Authorized consumption values: wGHG5, wGHG7, wwGHG7, wwGHG5<br>
	*/
	var ctx=document.getElementById("graph").getContext("2d");
	var data = {
		labels: ["Serviced Population", "Authorized consumption"],
		datasets:[
			{
				fillColor: "repeating-linear-gradient(-55deg,#222,#222 5px,#333 10px,#333 15px)",
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
	var graph = new Chart(ctx).Bar(data,{});
</script>

<br>

<a href="https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts">https://google-developers.appspot.com/chart/interactive/docs/gallery/columnchart#stacked-column-charts</a>

<div>
Still not implemented, pending more precise explanation
</div>
