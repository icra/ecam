<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#problems tr:hover {background:lightcoral}
		#main table {margin:0.5em;width:99%}
		#main {text-align:left}
	</style>
	<script>
		//get unused inputs
		function getUnused(obj)
		{
			var unused=[];
			for(var field in obj)
			{
				var type = typeof(obj[field]);
				switch(type)
				{
					case 'number':
						var n=Formulas.outputsPerInput(field).length;
						if(n==0) unused.push(field);
						break;
					case 'function':
						if(field.search(/^c_/)==0)
						{
							var n=Formulas.outputsPerInput(field).length;
							if(n==0) unused.push(field);
						}
						break;
					case 'object':
						unused=unused.concat(getUnused(obj[field]));
						break;
				}
			}
			return unused;
		}

		//count all variables (inputs and outputs)
		function countVariables(obj)
		{
			var n=0;
			for(var field in obj)
			{
				var type=typeof(obj[field]);
				switch(type)
				{
					case 'number':
					case 'function':
						n++
						break;
					case 'object':
						n+=countVariables(obj[field])
						break;
				}
			}
			return n;
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Automatic finding of potential sources of Problems (debug mode)</h1>

<div id=main style=display:table;margin-bottom:3em>

<!--todo-->
<div style="display:table-cell;">
	<table id=todo>
		<style> 
			#todo {margin:1em}
			#todo td.taskgroup{background:#ccc;text-align:center;} 
		</style>
		<tr><th><?php write('#todo_task')?><th><?php write('#todo_status')?>
		<tr><td colspan=2 class=taskgroup>BACK-END
			<tr><td><a href=benchmark.php>Benchmark</a> list of not implemented:
				<ul>
					<li>wst_KPI_nrg_per_m3
					<li>wsd_KPI_nrg_efficien
					<li>wsd_KPI_nrg_topgraph
					<li>wwt_KPI_capac_util
					<li>wwt_KPI_nrg_per_m3
				</ul>
				<td>Need more info</td>
		<tr><td colspan=2 class=taskgroup>FRONT-END
			<tr><td>Calculated variables are useless, need to separate from inputs<td>Need more info</td>
			<tr><td>Footer should remain in the bottom of the page always<td>Don't know how to do
			<tr><td>Translation of new features requested is not done<td>Wait at the end
			<tr><td>Help resources<td>Wait at the end
	</table>
</div>

<!--problems-->
<div id=problems style="display:table-cell;">
	<table>
		<tr><td colspan=3 style=font-weight:bold>Problem 1: NOT USED INPUTS in any formula
		<tr><th>Code<th>Stage
		<script>
			['Water','Waste'].forEach(function(level)
			{
				var unused=getUnused(Global[level])
				unused.forEach(function(field)
				{
					var color=field.search('ww')==-1 ? "" : "#bf5050";
					try{
						document.write("<tr><td>");
						document.write("<a title='"+Info[field].description+"' style=color:"+color+" href=variable.php?id="+field+">"+field+"</a>");
						document.write("<td>"+locateVariable(field).toString());
					}
					catch(e)
					{
						document.write("<tr><td colspan=3>"+field+" need to be removed. Reset chaché")
					}
				});
			});
			document.write("<tr><td colspan=3 style=text-align:center><i>End of table</i>");
		</script>
	</table>

	<table>
		<tr><td style=font-weight:bold>Problem 2: NOT USED DESCRIPTIONS
		<tr><th>Code
		<script>
			//find unused definitions in Info
			function getInfoUnused()
			{
				var uu=[];
				for(var field in Info)
				{
					if(locateVariable(field)==false)
						uu.push(field);
				}
				return uu;
			}

			var uu=getInfoUnused();
			if(uu.length==0)
			{
				document.write("<tr><td style=background:lightgreen><i>All descriptions used</i>")
			}
			else
				uu.forEach(function(field)
				{
					document.write("<tr><td>"+field)
				})
		</script>
	</table>

	<table id=problem3>
		<tr><td style=font-weight:bold>Problem 3: INEXISTING VARIABLES IN BENCHMARKING
		<tr><th>Code
		<script>
			(function()
			{
				var inex=[];
				for(var field in RefValues)
				{
					if(locateVariable(field)==false) inex.push(field);
				}
				return inex;
			})().forEach(function(field)
			{
				document.write("<tr><td>"+field);
			});
		</script>
	</table>
	<script>
		(function()
		{
			var t=document.querySelector('#problem3');
			if(t.rows.length==2)
			{
				var newCell=t.insertRow(-1).insertCell(-1);
				newCell.innerHTML="<i>All variables exist</i>"
				newCell.style.background='lightgreen'
			}
		})();
	</script>
</div>

</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
