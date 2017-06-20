
<!--select country-->
<fieldset>
	<legend>Select source for global warming potential
		<select id=select_gwp onchange=selectGWP(this)>
			<option value="false">--select--</option>
		</select>
		<a href=gwp_table.php>Info</a>
		<script>
		function selectGWP(select) {
			var gwp=select.value
				if(gwp=="false") return;
			//[.. TODO ..]
			init();
		}
var GWP=[
{
report:"5th AR (2014/2013)",
				 ct_ch4_eq:34, ct_n2o_eq:298, comment:"With climate-carbon feedbacks",
},
{
report:"5th AR (2014/2013)",
			 ct_ch4_eq:28, ct_n2o_eq:265, comment:"Without climate-carbon feedbacks",
},
{
report:"4th AR (2007)",
			 ct_ch4_eq:25, ct_n2o_eq:298, comment:"",
},
{
report:"3th AR (2001)",
			 ct_ch4_eq:23, ct_n2o_eq:296, comment:"",
},
{
report:"2nd AR (1995)",
			 ct_ch4_eq:21, ct_n2o_eq:310, comment:"",
},
{
report:"1st AR (1990)",
			 ct_ch4_eq:21, ct_n2o_eq:310, comment:"",
},
	];

//view
function showGWPconstants(){
	document.querySelector('#ct_ch4_eq').innerHTML=Cts.ct_ch4_eq.value;
	document.querySelector('#ct_n2o_eq').innerHTML=Cts.ct_n2o_eq.value;
}
		</script>
	</legend>

	<table id=gwp_inputs>
		<tr>
			<td>Carbon dioxide (CO<sub>2</sub>)
			<td>1
		<tr>
			<td>Methane (CH<sub>4</sub>)
			<td><span id=ct_ch4_eq>loading...</span>
		<tr>
			<td>Nitrous Oxide (N<sub>2</sub>O)
			<td><span id=ct_n2o_eq>loading...</span>
	</table>

</fieldset>
