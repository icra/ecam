<?php /* getStarted.php: page for inserting general information about the system */ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		th{vertical-align:middle}
		#form th,#form td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
	<script>
		function updateField(field,newValue)
		{
			Global.General[field]=newValue
			init()
		}

		function createLocationSelection()
		{
			var select = document.createElement('select');
			select.setAttribute('onchange','updateField("Location",this.value)');
			for(var country in Tables.Countries)
			{
				var option = document.createElement('option');
				if(country==Global.General.Location)
				{
					option.setAttribute('selected','true');
				}
				option.innerHTML=country;
				select.appendChild(option);
			}
			return select;
		}

		function init()
		{
			Sidebar.update();
			updateResult();
			document.querySelector('#form #Name').value=Global.General.Name;
			document.querySelector('#form #Start').value=Global.General.AssessmentPeriodStart;
			document.querySelector('#form #End').value=Global.General.AssessmentPeriodEnd;
			document.querySelector('#form #Days').innerHTML=Global.General.Days();
			document.querySelector('#form #Comments').value=Global.General.Comments;
			document.querySelector('#form #Location').innerHTML="";
			document.querySelector('#form #Location').appendChild(createLocationSelection());
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#getStarted_general_info')?></h1>
<!--SUBTITLE--><h4><?php write('#getStarted_subtitle')?></h4>

<div id=main>

<!--FORM-->
	<table id=form style="text-align:left;">
		<tr>
			<th><?php write('#getStarted_table_name')?>
			<td><input id=Name onchange=updateField('Name',this.value)>
		<tr>
			<th><?php write('#getStarted_table_location')?>
			<td id=Location>
		<tr>
			<th><?php write('#getStarted_table_start')?>
			<td><input id=Start type=date onchange="updateField('AssessmentPeriodStart',this.value)">
		<tr>
			<th><?php write('#getStarted_table_end')?>
			<td><input id=End type=date onchange="updateField('AssessmentPeriodEnd',this.value)">
		<tr>
			<th><?php write('#getStarted_table_period')?>
			<td><span id=Days>0</span> <?php write('#days')?>
		<tr>
			<th><?php write('#getStarted_table_comments')?>
			<td>
				<textarea 
					id=Comments
					onchange="updateField('Comments',this.value)"
					placeholder='<?php write('#getStarted_max_200')?>' rows=5 cols=50 maxlength=200></textarea>
	</table>

<!--PREV&NEXT-->
	<div style=margin:1em>
		<button class="button prev" onclick="event.stopPropagation();window.location='index.php'"><?php write('#previous')?></button><!--
		--><button class="button next" onclick="event.stopPropagation();window.location='configuration.php'"><?php write('#next')?></button>
	</div>

</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
