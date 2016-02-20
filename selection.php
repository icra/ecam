<div>
	<h1>Remaining things</h1>
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
	</div>
</div>
