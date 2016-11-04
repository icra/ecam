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

		function createLocationSelection()
		{
			var select = document.createElement('select');
			select.setAttribute('onchange','updateField(Global.General,"Location",this.value)');
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
			redisplayUW1menu();
			updateCurrency();

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
<!--TITLE--><h1><?php write('#getStarted_general_info')?></1>
<!--SUBTITLE--><h4><?php write('#getStarted_subtitle')?></h4>

<div id=main>
	<!--form-->
	<table id=form style="text-align:left;">
		<tr>
			<th><?php write('#getStarted_table_name')?>
			<td><input id=Name onchange=updateField(Global.General,'Name',this.value)>
		<tr>
			<th><?php write('#getStarted_table_location')?>
			<td id=Location>
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
				function updateUW1(newValue)
				{
					document.querySelector('#uw1').value=newValue;
					updateField(Global.General,'conv_kwh_co2',newValue);
				}

				function redisplayUW1menu()
				{
					//input element
					document.querySelector('#uw1').value=Global.General.conv_kwh_co2;
					//select element
					var select = document.querySelector('#countryUW1');
					//go over options and select the one with same value as uw1
					for(var i=1;i<select.childNodes.length;i++)
					{
						if(parseFloat(select.childNodes.item(i).value)==Global.General.conv_kwh_co2)
						{
							select.childNodes.item(i).setAttribute('selected','true');
							return;
						}
					}
					//if we go out of the list make it custom
					select.value="custom";
				}

				function updateCurrency()
				{
					document.getElementById('currency').innerHTML=Global.General.Currency
				}
			</script>

			<th style=cursor:help title="<?php write('#conv_kwh_co2_expla')?>"><?php write('#conv_kwh_co2_descr')?>
			<td>
			<!--conv_kwh_co2-->
				<table><tr><td style=border:none;padding:0>
					<select id=countryUW1 onchange=updateUW1(this.value)>
						<option value=0>--<?php write('#configuration_enter_custom_value')?>--
						<option value=0.237721212>Peru
						<option value=0.626742612>Thailand
						<option value=0.452483345>Mexico
						<option value=custom>--<?php write('#configuration_custom')?>--
					</select>
					<td style=border:none><input id=uw1 value=0 style="width:80px" onchange=updateUW1(this.value)> kg<sub>CO<sub>2</sub></sub>/kWh
				</table>
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
				if(Global.General.conv_kwh_co2==0)
				{
					alert("<?php write('#configuration_conv_error')?>");
					document.getElementById('uw1').style.background='red'
					return;
				}
				window.location='configuration.php'
			}
		</script>
	</div>
</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
