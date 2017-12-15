<?php /* getStarted.php: page for inserting general information about the system */ ?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		th{vertical-align:middle}
		#form th,#form td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
	<script>
		/** Modify any field of Global and init() */
		function updateField(object,field,newValue)
		{
			if(typeof(object[field])=="number")
			{
				newValue=parseFloat(newValue);
				if(isNaN(newValue))newValue=0;
			}
			object[field]=newValue;
			init();
		}

		function init(selectName)
		{
			selectName=selectName||false;
			updateCurrency();
			Sidebar.update();
			updateResult();
			document.querySelector('#form #Name').value=Global.General.Name;
			document.querySelector('#form #Start').value=Global.General.AssessmentPeriodStart;
			document.querySelector('#form #End').value=Global.General.AssessmentPeriodEnd;
			document.querySelector('#form #Days').innerHTML=Global.General.Days();
			document.querySelector('#form #Comments').value=Global.General.Comments;

			//only when the page loads select first element of the form, not after
			if(selectName) document.querySelector('#form #Name').select()
		}
	</script>
</head><body onload=init(true)><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#getStarted_subtitle')?></h1>

<div id=main>
	<!--form-->
	<table id=form style="text-align:left;">
		<tr>
			<th><?php write('#getStarted_table_name')?>
			<td><input id=Name onchange=updateField(Global.General,'Name',this.value)>
		<tr>
			<th><?php write('#getStarted_table_start')?>
			<td><input id=Start type=date onchange="updateField(Global.General,'AssessmentPeriodStart',this.value)">
		<tr>
			<th><?php write('#getStarted_table_end')?>
			<td><input id=End type=date onchange="updateField(Global.General,'AssessmentPeriodEnd',this.value)">
		<tr>
			<th><?php write('#getStarted_table_period')?>
			<td><span id=Days>0</span> <?php write('#days')?>
		<tr>
			<script>
				function updateCurrency()
				{
					document.getElementById('currency').innerHTML=Global.General.Currency
				}
			</script>
		<tr>
			<!--currency: 3 letters-->
			<th><?php write("#currency")?>
			<td>
				<span id=currency style="color:black;font-weight:bold"></span><br>
				<?php write('#configuration_new_currency')?>:
				<input size=3 maxlength=3 placeholder="ccc" onchange=updateField(Global.General,"Currency",this.value)>
		<tr>
			<th><?php write('#getStarted_table_comments')?>
			<td>
				<textarea 
					id=Comments
					onchange="updateField(Global.General,'Comments',this.value)"
					placeholder='<?php write('#getStarted_max_200')?>' rows=5 cols=50 maxlength=200></textarea>
	</table>

	<!--PREV&NEXT-->
	<div style=margin:1em>
		<button class="button prev" onclick="event.stopPropagation();window.location='index.php'">
		<?php write('#previous')?></button><!--
		--><button class="button next" onclick="event.stopPropagation();nextPage()">
		<?php write('#next')?></button>
		<script>
			function nextPage()
			{
				window.location='configuration.php'
			}
		</script>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
