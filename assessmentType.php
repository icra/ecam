<!--inside level3.php-->

<table class=inline style="font-size:13px;margin-left:4em"><tr>
	<th><?php write('#assessment_type')?><td>

	<label>
		<input name=assessment type=radio 
			value=simple   
			onchange="updateAssessment(this.value)">
		<?php write('#assessment_simple')?>
	</label>
	&emsp;
	<label title="<?php write('#assessment_adv_descr')?>" style=cursor:help>
		<input name=assessment type=radio 
			value=advanced   
			onchange="updateAssessment(this.value)">
		<?php write('#assessment_advanced')?>
	</label>
</table>

<script>
	function updateAssessment(newValue)
	{
		<?php echo "var level='$level';\n" ?>
		<?php echo "var sublevel='$sublevel';\n" ?>
		Global.Configuration.Assessment[level][sublevel]=newValue;
		init();
	}
	function updateAssessmentMenu()
	{
		<?php echo "var level='$level';\n" ?>
		<?php echo "var sublevel='$sublevel';\n" ?>
		if(Global.Configuration.Assessment[level][sublevel]=='simple')
			document.querySelector('input[name=assessment][value=simple]').setAttribute('checked',true);
		else
			document.querySelector('input[name=assessment][value=advanced]').setAttribute('checked',true);
	}
</script>
