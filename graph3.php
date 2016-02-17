<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Graphs</h1>

<h2>Graph 3: Sankey diagram (water flow in the whole cycle)</h2>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!--graph--><div id="graph"></div>

<script>
	google.charts.load('current', {'packages':['sankey']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart()
	{
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'From');
		data.addColumn('string', 'To');
		data.addColumn('number', 'Weight');
		data.addRows([
			['Abstraction', 	     'Water treatment', 	 Global.Water.Abstraction.wsa2||1  ],
			['Water treatment',	     'Distribution',         Global.Water.Treatment.wst1||1    ],
			['Distribution', 	     'Users in',             Global.Water.Distribution.wsd7||1 ],
			['Users in',             'Users out',            Global.Water.Distribution.wsd20||1],
			['Users out',	         'Collection',           Global.Waste.Collection.wwc1||1   ],
			['Collection',	         'Wastewater treatment', Global.Waste.Treatment.wwt8||1    ],
			['Wastewater treatment', 'Discharge',            Global.Waste.Discharge.wwd1||1    ],
		]);
		// Sets chart options.
		var colors = ['#00aaf1', 'lightcoral']; 

		var options = 
		{
			width:"900", height: 400,
			sankey: 
			{
				node: {
					colors: colors,
					nodePadding:100,
				},
				link: {
					colorMode: 'gradient',
					colors: colors
				}
			}
		};
		// Instantiates and draws our chart, passing in options.
		var chart = new google.visualization.Sankey(document.getElementById('graph'));
		chart.draw(data,options);
	}
</script>

<a href="https://developers.google.com/chart/interactive/docs/gallery/sankey">https://developers.google.com/chart/interactive/docs/gallery/sankey</a>

<div>
display water losses in water and dilution in ww
</div>
