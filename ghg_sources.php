
<!--TOTAL GHG BY SOURCE-->

<div class="card"><?php cardMenu('GHG emissions during the Assessment Period') ?>
	<h4>
		CO<sub>2</sub> emitted in <script>document.write(Global.General.Days())</script> days
		(<span class=circle style=background:orange></span> highest emission)
	</h4>

	<table id=sources>
		<tr><th rowspan=9 style=font-weight:bold;background:#d7bfaf;color:black>
			TOTAL GHG
			<br><br>
			<span><script>document.write(format(Global.General.TotalGHG()))</script></span>
			<br><br>
			kg CO<sub>2</sub>


		<th rowspan=2>Water<br>supply<br>(<span field=ws_KPI_GHG>0</span>)
			<td colspan=2>Electricity       <td field=ws_KPI_GHG_elec>0
			<tr><td colspan=2>Fuel engines  <td field=ws_KPI_GHG_ne>0

		<tr><th rowspan=7 class=red>Wastewater <br>(<span    field=ww_KPI_GHG>0</span>)
			<td colspan=2>Electricity                    <td field=ww_KPI_GHG_elec>0
			<tr><td colspan=2>Fuel engines               <td field=wwt_KPI_GHG_ne_fuel>0
			<tr><td rowspan=2>Untreated wastewater<br>(<span field=wwc_KPI_GHG_ne_unt>0</span>)
				<td>From CH<sub>4</sub>                  <td field=wwc_KPI_GHG_ne_unt_ch4>0
				<tr><td>From N<sub>2</sub>O              <td field=wwc_KPI_GHG_ne_unt_n2o>0
			</tr>
			<tr><td colspan=2>Sludge transport           <td field=wwt_KPI_GHG_ne_tsludge>0
			<tr><td rowspan=2>Treated wastewater<br>(  <span field=wwt_KPI_GHG_ne_tre>0</span>)
				<td>    From CH<sub>4</sub>              <td field=wwt_KPI_GHG_ne_tre_ch4>0
				<tr><td>From N<sub>2</sub>O              <td field=wwt_KPI_GHG_ne_tre_n2o>0
			</tr>
	</table>
</div>

<script>
	function calculateGHG()
	{
		var fields=document.querySelectorAll('#sources [field]')
		for(var i=0;i<fields.length;i++)
		{
			var element=fields[i]
			var code=element.getAttribute('field')
			var loc=locateVariable(code);
			var value = loc.sublevel ? Global[loc.level][loc.sublevel][code]() : Global[loc.level][code]();
			element.innerHTML=format(value);
			element.setAttribute('value',value);
		}
	}
	function findCriticGHG()
	{
		var max = 0
		var critic = false;
		var fields = document.querySelectorAll('#sources td[field]')
		for(var i=0;i<fields.length;i++)
		{
			var value = parseFloat(fields[i].getAttribute('value'))
			if(value>=max)
			{
				max=value;
				critic=fields[i].getAttribute('field')
			}
		}
		if(!critic)return
		var element=document.querySelector("#sources td[field="+critic+"]")
		element.classList.add('critic')
		element.title="This is the highest GHG emission of your system"
		element.previousSibling.classList.add('critic')
		element.previousSibling.title=element.title
	}
	calculateGHG()
	findCriticGHG()
</script>

<style>
	@keyframes blink { from {background-color: white;} to {background-color: orange;} }
	table#sources .critic {
		color:black;
		cursor:help;
		font-weight:bold;
		animation: blink 3s ease 0.5s infinite alternate;
	}
	table#sources{ 
		margin:10px 0; 
		width:95%;
	}
	table#sources td {max-width:70px}
	table#sources td:last-child {text-align:right}
</style>

