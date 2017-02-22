
<select id=main_treatment_type onchange=main_treatment_type()>
	<script>
		for(var type in Tables.wwt_type_tre)
		{
			var value=Tables.wwt_type_tre[type].value;
			document.write("<option value="+value+">"+type+"</option>");
		}
	</script>
</select>

<script>
	//here
	function main_treatment_type()
	{
		var value=document.querySelector('#main_treatment_type').value

		//set treatment type
		Global.Waste.Treatment.wwt_type_tre=parseInt(value);

		//BOD estimation: g/person/day * 0.001 * population * days
		Global.Waste.Treatment.wwt_bod_infl=Global.Waste.Collection.wwc_bod_pday*1e-3*Global.Waste.ww_serv_pop*Global.General.Days();

		init();
	}
</script>
