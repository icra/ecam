<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
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
	<style>
		#main table {
			display:inline-block;
			vertical-align:top;
			margin:2px 1px;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Tasks and problem finder (debug mode)</h1></center>

<div id=main style=margin-bottom:3em>

<!--to do-->
<div class=inline style="max-width:30%;border:1px solid #ccc;padding:0.5em;margin:2px">
	<h3>Tasks</h3>
	<ul>
		<li> BACK-END <ul>
				<li><a href=benchmark.php>Benchmark</a> 
				<li>Calculated variables, need to separate from inputs
				<li>Translation of new features of the tool
			</ul>
		<li> FRONT-END <ul>
			<li>Footer should remain in the bottom of the page always
			<li>Help resources
		</ul>
	</ul>
</div>

<!--problems-->
<div class=inline style="max-width:68%;border:1px solid #ccc;padding:0.5em;margin:2px">
	<h3 style=padding-left:2px>Problems found</h3>
	<table>
		<tr><td colspan=3 style=font-weight:bold>Problem 1: NOT USED INPUTS in any equation
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

	<table id=problem4>
		<tr><th>Problem 4: ?
		<tr><td>Code it here
	</table>
</div>

</div>
<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
