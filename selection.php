<!--selection.php: menus of options selected-->
<!doctype html><html><head>
</head><body><center>

<!--HIDDEN THINGS-->
<h1>Remaining things</h1>
<div>
	<!--Technologies-->
	<div>
		<div><b>Water treatment & Wastewater treatment</b></div>
		Select treatment:
		<script>
			['Water','Waste'].forEach(function(stage)
			{
				document.write("<select onchange=\"updateField(Global.Configuration.Selected.Technologies,'"+stage+"',this.value)\">");
				for(var tech in Tables.Technologies[stage])
				{
					var selected=(Global.Configuration.Selected.Technologies[stage]==tech) ? "selected" : "";
					document.write('<option '+selected+'>'+tech);
				}
				document.write('</select> ');
			});
		</script>
		<table> <tr><td style=background:lightcoral>Info about what modifies each technology</table>
	</div>
</div>
