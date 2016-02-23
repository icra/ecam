<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L3 - Energy consumption (per substage)</h1>

<table>
	<script>
		//pointers to objects
		var wsa1 = Global.Substages.Water.Abstraction
		var wst2 = Global.Substages.Water.Treatment
		var wsd1 = Global.Substages.Water.Distribution
		var wwc2 = Global.Substages.Waste.Collection
		var wwt9 = Global.Substages.Waste.Treatment
		var wwd3 = Global.Substages.Waste.Discharge
		//array of pointers to objects
		var stages = [ wsa1 , wst2 , wsd1 , wwc2 , wwt9 , wwd3];
		var names =  ["wsa1","wst2","wsd1","wwc2","wwt9","wwd3"];
	</script>
	<tr><th>Formula <th colspan=30>Values for each substage
	<script>
		for(var s in stages)
		{
			document.write("<tr><td><a href=variable.php?id="+names[s]+">"+names[s]+"</a>")
			for(var i in stages[s])
				document.write("<td>"+stages[s][i][names[s]])
		}
	</script>
</table>

	<script>
	</script>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var DATA = 
			[
				['Stage', 'Emissions'],
				//['name', value],
			]

			//push data to DATA
			for(var s in stages)
			{
				for(var i in stages[s])
				{
					var name = stages[s][i].name
					var value = stages[s][i][names[s]]
					DATA.push([ names[s]+" substage "+(parseInt(i)+1) +" ("+name+")", value||1 ])
				}
			}

			var data=google.visualization.arrayToDataTable(DATA);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"Energy consumption per stage",
				/*
				slices:{
					0:{ color: '#66cef5' },
					1:{ color: '#0083b3' },
					2:{ color: '#cceffc' },
					3:{ color: '#b67800' },
					4:{ color: '#f8c666' },
					5:{ color: '#fad999' },
				}
				*/
				slices: { },
			};

			var colors = [ '#66cef5', '#0083b3', '#cceffc', '#b67800', '#f8c666', '#fad999' ];

			var current_slice = 0;
			for(var s in stages)
			{
				for(var i in stages[s])
				{
					options.slices[current_slice++]={color:colors[s],offset:0.1}
				}
			}
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
