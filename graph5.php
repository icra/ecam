<?php /*graphs.php: different graphs about ghg emissions */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>L2 - Energy consumption</h1>

<table>
	<script>
		//pointers
		var Days=Global.General.Days();

		//values
		var slice_1 = Global.Water.Abstraction.wsa1 *365/Days;
		var slice_2 = Global.Water.Treatment.wst2   *365/Days;
		var slice_3 = Global.Water.Distribution.wsd1*365/Days;
		var slice_4 = Global.Waste.Collection.wwc2  *365/Days;
		var slice_5 = Global.Waste.Treatment.wwt9   *365/Days;
		var slice_6 = Global.Waste.Discharge.wwd3   *365/Days;
	</script>
	<tr><th>Slice                 <th>Formula                                        <th>Value (kWh/m<sup>3</sup>)
	<tr><td>Water Abstraction     <td><a href=variable.php?id=wsa1>wsa1</a>*365/Days <td><script>document.write(format(slice_1))</script>
	<tr><td>Water Treatment       <td><a href=variable.php?id=wst2>wst2</a>*365/Days <td><script>document.write(format(slice_2))</script>
	<tr><td>Water Distribution    <td><a href=variable.php?id=wsd1>wsd1</a>*365/Days <td><script>document.write(format(slice_3))</script>
	<tr><td>Wastewater Collection <td><a href=variable.php?id=wwc2>wwc2</a>*365/Days <td><script>document.write(format(slice_4))</script>
	<tr><td>Wastewater Treatment  <td><a href=variable.php?id=wwt9>wwt9</a>*365/Days <td><script>document.write(format(slice_5))</script>
	<tr><td>Wastewater Discharge  <td><a href=variable.php?id=wwd3>wwd3</a>*365/Days <td><script>document.write(format(slice_6))</script>
</table>

<!--graph starts here-->
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() 
		{
			var data=google.visualization.arrayToDataTable
			([
				['Stage', 'Emissions'],
				["Water Abstraction",     slice_1],
				["Water Treatment",       slice_2],
				["Water Distribution",    slice_3],
				["Wastewater Collection", slice_4],
				["Wastewater Treatment",  slice_5],
				["Wastewater Discharge",  slice_6],
			]);
			var options= 
			{ 
				pieHole:0.4,
				width:800,
				height:400,
				title:"L2 Energy consumption",
				slices:
				{
					0:{ color: '#66cef5' },
					1:{ color: '#0083b3' },
					2:{ color: '#cceffc' },
					3:{ color: '#b67800' },
					4:{ color: '#f8c666' },
					5:{ color: '#fad999' },
				},
			};
			var chart=new google.visualization.PieChart(document.getElementById('graph'));
			chart.draw(data,options);
		}
	</script>
	<div id=graph></div>
<!--graph ends here-->

<?php include'currentJSON.php'?>
