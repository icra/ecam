<!--inside configuration.php-->

<!--select assessment report-->
<fieldset>
	<legend>Select source for global warming potential
		<select id=select_gwp onchange=selectGWP(this)>
			<option value="false">--select--</option>
			<!--fill with options-->
			<script>
				GWP_reports.forEach((rep,i)=>{
					if(i==Global.Configuration.Selected.gwp_reports_index){
						document.write("<option selected value="+i+">"+rep.report); 
					}
					else{
						document.write("<option value="+i+">"+rep.report); 
					}
				});
			</script>
		</select>
		<a href=gwp_table.php>Info</a>
		<script>
			function selectGWP(select) {
				var index=select.value;
				if(index=="false") return;
				Global.Configuration.Selected.gwp_reports_index=index;

				Cts.ct_ch4_eq.value=GWP_reports[index].ct_ch4_eq;
				Cts.ct_n2o_eq.value=GWP_reports[index].ct_n2o_eq;

				init();
			}

			//view
			function showGWPconstants(){
				document.querySelector('#ct_ch4_eq').innerHTML=Cts.ct_ch4_eq.value;
				document.querySelector('#ct_n2o_eq').innerHTML=Cts.ct_n2o_eq.value;
			}
		</script>
	</legend>
	<div style="padding:0.5em 0">
		GWP values relative to CO<sub>2</sub> for a 100 year time horizon
	</div>
	<table id=gwp_inputs>
		<tr>
			<td>Carbon dioxide (CO<sub>2</sub>)
			<td>1
			<td>CO<sub>2</sub> equivalents
		<tr>
			<td>Methane (CH<sub>4</sub>)
			<td><span id=ct_ch4_eq>loading...</span>
			<td>CO<sub>2</sub> equivalents
		<tr>
			<td>Nitrous Oxide (N<sub>2</sub>O)
			<td><span id=ct_n2o_eq>loading...</span>
			<td>CO<sub>2</sub> equivalents
	</table>
</fieldset>
